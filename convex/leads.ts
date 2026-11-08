import { mutation, query, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { requirePermission } from "./lib/auth";

const source = v.union(
  v.literal("contact"), v.literal("coverage-request"), v.literal("home-installation"),
  v.literal("survey-request"), v.literal("isp-quote"), v.literal("health-check"),
  v.literal("rescue"), v.literal("partner-application"), v.literal("advertising"),
);
const serviceType = v.union(v.literal("hotspot"), v.literal("pppoe"), v.literal("home-internet"), v.literal("business-internet"), v.literal("cctv"), v.literal("installation"), v.literal("other"));
const leadStatus = v.union(v.literal("new"), v.literal("contacted"), v.literal("qualified"), v.literal("converted"), v.literal("closed"));

export const acceptPublicContact = internalMutation({
  args: {
    name: v.string(), phone: v.string(), location: v.string(), organization: v.optional(v.string()),
    service: v.optional(v.string()), timeline: v.optional(v.string()), message: v.string(), source,
    serviceType, rateLimitKey: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const currentWindow = Math.floor(now / 60_000) * 60_000;
    const rate = await ctx.db.query("publicRateLimits").withIndex("by_key", (q) => q.eq("key", args.rateLimitKey)).unique();
    if (rate && rate.windowStartedAt === currentWindow && rate.count >= 5) return { limited: true as const };
    if (rate && rate.windowStartedAt === currentWindow) await ctx.db.patch(rate._id, { count: rate.count + 1 });
    else if (rate) await ctx.db.patch(rate._id, { windowStartedAt: currentWindow, count: 1 });
    else await ctx.db.insert("publicRateLimits", { key: args.rateLimitKey, windowStartedAt: currentWindow, count: 1 });
    const leadId = await ctx.db.insert("leads", {
      name: args.name, phone: args.phone, location: args.location, organizationName: args.organization,
      serviceRequested: args.service, timeline: args.timeline, message: args.message,
      source: args.source, serviceType: args.serviceType, status: "new", createdAt: now,
      updatedAt: now,
    });
    await ctx.db.insert("auditLogs", { action: "lead.created", entityType: "lead", entityId: leadId, createdAt: now, details: { newStatus: "new" } });
    return { limited: false as const };
  },
});

export const listForOrganization = query({
  args: { organizationId: v.id("organizations"), status: v.optional(leadStatus), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    await requirePermission(ctx, args.organizationId, "leads.read");
    const limit = Math.max(1, Math.min(args.limit ?? 50, 100));
    return args.status
      ? await ctx.db.query("leads").withIndex("by_org_status_created_at", (q) => q.eq("organizationId", args.organizationId).eq("status", args.status!)).order("desc").take(limit)
      : await ctx.db.query("leads").withIndex("by_org_and_created_at", (q) => q.eq("organizationId", args.organizationId)).order("desc").take(limit);
  },
});

export const listUnassignedForStaff = query({
  args: { organizationId: v.id("organizations"), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const { organization } = await requirePermission(ctx, args.organizationId, "leads.read");
    if (organization.type !== "internal") throw new Error("Forbidden");
    const limit = Math.max(1, Math.min(args.limit ?? 50, 100));
    return await ctx.db.query("leads")
      .withIndex("by_org_and_created_at", (q) => q.eq("organizationId", undefined))
      .order("desc")
      .take(limit);
  },
});

export const assignToOrganization = mutation({
  args: { organizationId: v.id("organizations"), leadId: v.id("leads") },
  handler: async (ctx, args) => {
    const { identity, organization } = await requirePermission(ctx, args.organizationId, "leads.write");
    if (organization.type !== "internal") throw new Error("Forbidden");
    const lead = await ctx.db.get(args.leadId);
    if (!lead || (lead.organizationId && lead.organizationId !== args.organizationId)) throw new Error("Lead unavailable");
    const now = Date.now();
    await ctx.db.patch(args.leadId, { organizationId: args.organizationId, updatedAt: now });
    await ctx.db.insert("auditLogs", { organizationId: args.organizationId, actorWorkosUserId: identity.subject, action: "lead.assigned", entityType: "lead", entityId: args.leadId, createdAt: now });
    return { ok: true };
  },
});

export const updateStatus = mutation({
  args: { organizationId: v.id("organizations"), leadId: v.id("leads"), status: leadStatus },
  handler: async (ctx, args) => {
    const { identity } = await requirePermission(ctx, args.organizationId, "leads.write");
    const lead = await ctx.db.get(args.leadId);
    if (!lead || lead.organizationId !== args.organizationId) throw new Error("Lead not found");
    const now = Date.now();
    await ctx.db.patch(args.leadId, { status: args.status, updatedAt: now });
    await ctx.db.insert("auditLogs", { organizationId: args.organizationId, actorWorkosUserId: identity.subject, action: "lead.status_changed", entityType: "lead", entityId: args.leadId, createdAt: now, details: { oldStatus: lead.status, newStatus: args.status } });
    return { ok: true };
  },
});
