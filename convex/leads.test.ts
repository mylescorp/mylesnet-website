import { convexTest } from "convex-test";
import { beforeEach, describe, expect, test } from "vitest";
import { api } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import schema from "./schema";
import { modules } from "./test.setup";

async function seedOrganizations() {
  const db = convexTest(schema, modules);
  const ids = await db.run(async (ctx) => {
    const internal = await ctx.db.insert("organizations", { name: "MylesNet", slug: "mylesnet", type: "internal", status: "active", createdAt: 1, updatedAt: 1 });
    const clientA = await ctx.db.insert("organizations", { name: "Client A", slug: "client-a", type: "client", status: "active", createdAt: 1, updatedAt: 1 });
    const clientB = await ctx.db.insert("organizations", { name: "Client B", slug: "client-b", type: "client", status: "active", createdAt: 1, updatedAt: 1 });
    const suspended = await ctx.db.insert("organizations", { name: "Suspended", slug: "suspended", type: "client", status: "suspended", createdAt: 1, updatedAt: 1 });
    await ctx.db.insert("memberships", { organizationId: clientA, workosUserId: "active-admin", role: "admin", status: "active", createdAt: 1, updatedAt: 1 });
    await ctx.db.insert("memberships", { organizationId: clientA, workosUserId: "inactive-admin", role: "admin", status: "suspended", createdAt: 1, updatedAt: 1 });
    await ctx.db.insert("memberships", { organizationId: clientA, workosUserId: "viewer", role: "viewer", status: "active", createdAt: 1, updatedAt: 1 });
    await ctx.db.insert("memberships", { organizationId: clientA, workosUserId: "suspended-org-user", role: "admin", status: "active", createdAt: 1, updatedAt: 1 });
    await ctx.db.insert("memberships", { organizationId: suspended, workosUserId: "suspended-org-user", role: "admin", status: "active", createdAt: 1, updatedAt: 1 });
    await ctx.db.insert("memberships", { organizationId: internal, workosUserId: "staff", role: "admin", status: "active", createdAt: 1, updatedAt: 1 });
    return { internal, clientA, clientB, suspended };
  });
  return { db, ids };
}

async function seedLead(db: ReturnType<typeof convexTest>, organizationId: Id<"organizations"> | undefined, createdAt: number) {
  return await db.run(async (ctx) => await ctx.db.insert("leads", {
    name: "Test lead", phone: "+256700000001", location: "Tayari Market", message: "Interested in service",
    source: "contact", serviceType: "hotspot", status: "new", createdAt, updatedAt: createdAt,
    ...(organizationId ? { organizationId } : {}),
  }));
}

describe("Convex lead access", () => {
  let db: ReturnType<typeof convexTest>;
  let ids: Awaited<ReturnType<typeof seedOrganizations>>["ids"];

  beforeEach(async () => {
    ({ db, ids } = await seedOrganizations());
  });

  test("requires an authenticated identity", async () => {
    await expect(db.query(api.leads.listForOrganization, { organizationId: ids.clientA })).rejects.toThrow("Unauthenticated");
  });

  test("rejects an inactive membership", async () => {
    await expect(db.withIdentity({ subject: "inactive-admin" }).query(api.leads.listForOrganization, { organizationId: ids.clientA })).rejects.toThrow("Forbidden");
  });

  test("rejects members of suspended organizations", async () => {
    await expect(db.withIdentity({ subject: "suspended-org-user" }).query(api.leads.listForOrganization, { organizationId: ids.suspended })).rejects.toThrow("Organization unavailable");
  });

  test("denies a role without write permission", async () => {
    const leadId = await seedLead(db, ids.clientA, 1);
    await expect(db.withIdentity({ subject: "viewer" }).mutation(api.leads.updateStatus, { organizationId: ids.clientA, leadId, status: "contacted" })).rejects.toThrow("Forbidden");
  });

  test("scopes lead reads and status changes to the active organization", async () => {
    const ownLead = await seedLead(db, ids.clientA, 2);
    const otherLead = await seedLead(db, ids.clientB, 1);
    const client = db.withIdentity({ subject: "active-admin" });

    const visibleLeads = await client.query(api.leads.listForOrganization, { organizationId: ids.clientA });
    expect(visibleLeads.map((lead) => lead._id)).toEqual([ownLead]);
    await expect(client.query(api.leads.listForOrganization, { organizationId: ids.clientB })).rejects.toThrow("Forbidden");
    await expect(client.mutation(api.leads.updateStatus, { organizationId: ids.clientA, leadId: otherLead, status: "contacted" })).rejects.toThrow("Lead not found");
  });

  test("returns unassigned leads even when more than 100 newer assigned leads exist", async () => {
    for (let index = 1; index <= 101; index += 1) await seedLead(db, ids.clientA, index + 1);
    const oldUnassigned = await seedLead(db, undefined, 1);
    const staff = db.withIdentity({ subject: "staff" });

    const unassigned = await staff.query(api.leads.listUnassignedForStaff, { organizationId: ids.internal, limit: 10 });
    expect(unassigned.map((lead) => lead._id)).toEqual([oldUnassigned]);
  });
});
