import { query } from "./_generated/server";
import { requireIdentity } from "./lib/auth";

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const identity = await requireIdentity(ctx);
    const memberships = await ctx.db
      .query("memberships")
      .withIndex("by_user", (q) => q.eq("workosUserId", identity.subject))
      .collect();
    const active = memberships.filter((membership) => membership.status === "active");
    const organizations = await Promise.all(active.map(async (membership) => {
      const organization = await ctx.db.get(membership.organizationId);
      if (!organization || organization.status !== "active") return null;
      return { id: organization._id, name: organization.name, role: membership.role };
    }));
    return organizations.filter((organization) => organization !== null);
  },
});
