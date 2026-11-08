import type { GenericMutationCtx, GenericQueryCtx } from "convex/server";
import type { Id } from "../_generated/dataModel";
import type { DataModel } from "../_generated/dataModel";
import { permissions, type InternalRole } from "../model";

export type AuthCtx = GenericQueryCtx<DataModel> | GenericMutationCtx<DataModel>;

export async function requireIdentity(ctx: AuthCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthenticated");
  return identity;
}

export async function requireMembership(ctx: AuthCtx, organizationId: Id<"organizations">) {
  const identity = await requireIdentity(ctx);
  const membership = await ctx.db
    .query("memberships")
    .withIndex("by_org_and_user", (q) => q.eq("organizationId", organizationId).eq("workosUserId", identity.subject))
    .unique();
  if (!membership || membership.status !== "active") throw new Error("Forbidden");
  const organization = await ctx.db.get(organizationId);
  if (!organization || organization.status !== "active") throw new Error("Organization unavailable");
  return { identity, membership, organization };
}

export async function requirePermission(ctx: AuthCtx, organizationId: Id<"organizations">, permission: string) {
  const access = await requireMembership(ctx, organizationId);
  const role = access.membership.role as InternalRole;
  const allowed = permissions[role].includes("*") || permissions[role].includes(permission as never);
  if (!allowed) throw new Error("Forbidden");
  return access;
}
