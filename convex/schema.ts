import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const serviceType = v.union(
  v.literal("hotspot"),
  v.literal("pppoe"),
  v.literal("home-internet"),
  v.literal("business-internet"),
  v.literal("cctv"),
  v.literal("installation"),
  v.literal("other"),
);

export default defineSchema({
  organizations: defineTable({
    name: v.string(),
    slug: v.string(),
    type: v.union(v.literal("internal"), v.literal("client")),
    status: v.union(v.literal("active"), v.literal("suspended")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  memberships: defineTable({
    organizationId: v.id("organizations"),
    workosUserId: v.string(),
    email: v.optional(v.string()),
    role: v.union(
      v.literal("owner"), v.literal("admin"), v.literal("network"),
      v.literal("sales"), v.literal("support"), v.literal("finance"),
      v.literal("technician"), v.literal("viewer"),
    ),
    status: v.union(v.literal("active"), v.literal("invited"), v.literal("suspended")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org_and_user", ["organizationId", "workosUserId"])
    .index("by_user", ["workosUserId"]),

  leads: defineTable({
    name: v.string(),
    phone: v.string(),
    location: v.string(),
    organizationName: v.optional(v.string()),
    serviceRequested: v.optional(v.string()),
    timeline: v.optional(v.string()),
    message: v.string(),
    source: v.union(v.literal("contact"), v.literal("coverage-request"), v.literal("home-installation"), v.literal("survey-request"), v.literal("isp-quote"), v.literal("health-check"), v.literal("rescue"), v.literal("partner-application"), v.literal("advertising")),
    serviceType,
    status: v.union(v.literal("new"), v.literal("contacted"), v.literal("qualified"), v.literal("converted"), v.literal("closed")),
    createdAt: v.number(),
    updatedAt: v.number(),
    assignedTo: v.optional(v.string()),
    organizationId: v.optional(v.id("organizations")),
  })
    .index("by_created_at", ["createdAt"])
    .index("by_status_and_created_at", ["status", "createdAt"])
    .index("by_org_and_created_at", ["organizationId", "createdAt"])
    .index("by_org_status_created_at", ["organizationId", "status", "createdAt"])
    .index("by_phone", ["phone"]),

  publicRateLimits: defineTable({
    key: v.string(),
    windowStartedAt: v.number(),
    count: v.number(),
  }).index("by_key", ["key"]),

  customers: defineTable({
    organizationId: v.id("organizations"),
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    location: v.string(),
    externalCustomerId: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("inactive")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org_and_phone", ["organizationId", "phone"])
    .index("by_org_and_external_id", ["organizationId", "externalCustomerId"]),

  serviceRequests: defineTable({
    organizationId: v.optional(v.id("organizations")),
    customerId: v.optional(v.id("customers")),
    leadId: v.optional(v.id("leads")),
    contactName: v.string(),
    phone: v.string(),
    location: v.string(),
    serviceType,
    description: v.string(),
    status: v.union(v.literal("new"), v.literal("triaged"), v.literal("scheduled"), v.literal("in-progress"), v.literal("completed"), v.literal("cancelled")),
    scheduledAt: v.optional(v.number()),
    assignedTo: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org_and_status", ["organizationId", "status"])
    .index("by_created_at", ["createdAt"])
    .index("by_lead", ["leadId"]),

  subscriptions: defineTable({
    organizationId: v.id("organizations"),
    customerId: v.id("customers"),
    serviceType,
    providerKey: v.string(),
    externalSubscriptionId: v.optional(v.string()),
    planName: v.string(),
    status: v.union(v.literal("pending"), v.literal("active"), v.literal("suspended"), v.literal("cancelled")),
    startedAt: v.optional(v.number()),
    endsAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org_and_customer", ["organizationId", "customerId"])
    .index("by_provider_and_external_id", ["providerKey", "externalSubscriptionId"]),

  invoices: defineTable({
    organizationId: v.id("organizations"),
    customerId: v.id("customers"),
    subscriptionId: v.optional(v.id("subscriptions")),
    reference: v.string(),
    amountMinor: v.number(),
    currency: v.string(),
    status: v.union(v.literal("draft"), v.literal("due"), v.literal("paid"), v.literal("void"), v.literal("overdue")),
    dueAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org_and_reference", ["organizationId", "reference"])
    .index("by_org_and_status", ["organizationId", "status"])
    .index("by_customer", ["customerId"]),

  payments: defineTable({
    organizationId: v.id("organizations"),
    invoiceId: v.optional(v.id("invoices")),
    customerId: v.optional(v.id("customers")),
    providerKey: v.string(),
    externalReference: v.optional(v.string()),
    idempotencyKey: v.string(),
    amountMinor: v.number(),
    currency: v.string(),
    status: v.union(v.literal("pending"), v.literal("succeeded"), v.literal("failed"), v.literal("refunded")),
    method: v.string(),
    receivedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_org_and_idempotency", ["organizationId", "idempotencyKey"])
    .index("by_provider_and_reference", ["providerKey", "externalReference"])
    .index("by_invoice", ["invoiceId"]),

  supportTickets: defineTable({
    organizationId: v.id("organizations"),
    customerId: v.optional(v.id("customers")),
    title: v.string(),
    description: v.string(),
    category: v.union(v.literal("connectivity"), v.literal("billing"), v.literal("installation"), v.literal("cctv"), v.literal("other")),
    priority: v.union(v.literal("low"), v.literal("normal"), v.literal("high"), v.literal("urgent")),
    status: v.union(v.literal("open"), v.literal("in-progress"), v.literal("waiting"), v.literal("resolved"), v.literal("closed")),
    assignedTo: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org_and_status", ["organizationId", "status"])
    .index("by_customer", ["customerId"]),

  integrations: defineTable({
    organizationId: v.id("organizations"),
    category: v.union(v.literal("network"), v.literal("payments"), v.literal("monitoring"), v.literal("messaging")),
    providerKey: v.string(),
    displayName: v.string(),
    status: v.union(v.literal("planned"), v.literal("configured"), v.literal("active"), v.literal("paused"), v.literal("error")),
    secretReference: v.optional(v.string()),
    publicConfiguration: v.optional(v.object({ endpoint: v.optional(v.string()), accountReference: v.optional(v.string()), region: v.optional(v.string()) })),
    lastCheckedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org_and_category", ["organizationId", "category"])
    .index("by_org_and_provider", ["organizationId", "providerKey"]),

  webhookReceipts: defineTable({
    providerKey: v.string(),
    externalEventId: v.string(),
    organizationId: v.optional(v.id("organizations")),
    payloadHash: v.string(),
    status: v.union(v.literal("received"), v.literal("processed"), v.literal("rejected"), v.literal("failed")),
    receivedAt: v.number(),
    processedAt: v.optional(v.number()),
  })
    .index("by_provider_and_event", ["providerKey", "externalEventId"])
    .index("by_status_and_received_at", ["status", "receivedAt"]),

  auditLogs: defineTable({
    organizationId: v.optional(v.id("organizations")),
    actorWorkosUserId: v.optional(v.string()),
    action: v.string(),
    entityType: v.string(),
    entityId: v.optional(v.string()),
    createdAt: v.number(),
    details: v.optional(v.object({ summary: v.optional(v.string()), oldStatus: v.optional(v.string()), newStatus: v.optional(v.string()) })),
  })
    .index("by_org_and_created_at", ["organizationId", "createdAt"])
    .index("by_entity", ["entityType", "entityId"]),
});
