export const internalRoles = ["owner", "admin", "network", "sales", "support", "finance", "technician", "viewer"] as const;
export type InternalRole = (typeof internalRoles)[number];

export const permissions = {
  owner: ["*"],
  admin: ["organization.manage", "members.manage", "leads.read", "leads.write", "services.read", "services.write", "billing.read", "billing.write", "support.read", "support.write", "integrations.manage", "audit.read"],
  network: ["services.read", "services.write", "integrations.manage", "support.read", "support.write"],
  sales: ["leads.read", "leads.write", "services.read"],
  support: ["services.read", "support.read", "support.write"],
  finance: ["billing.read", "billing.write", "audit.read"],
  technician: ["services.read", "services.write", "support.read", "support.write"],
  viewer: ["leads.read", "services.read", "billing.read", "support.read"],
} satisfies Record<InternalRole, string[]>;

export type Permission = (typeof permissions)[InternalRole][number];
