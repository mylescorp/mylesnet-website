# MylesNet Website and Portal Handoff

## Current implementation state

- Public website routes cover Home, Internet, voucher Pricing, Where We Are, legacy Coverage, Support, Contact, FAQ, Terms, Privacy, Business & Institutions, CCTV, For ISPs / MylesNet Managed, About, Partners, and Advertise.
- The visual system returns to the existing repo palette: warm light surfaces, `#F57C00` orange actions, `#1A395B` navy structure, and semantic dark-mode equivalents. See `DESIGN_SYSTEM.md` and `app/globals.css`.
- WorkOS AuthKit routes and a protected portal landing view are scaffolded. Convex schema covers organizations, memberships, leads, customers, service requests, subscriptions, invoices, payments, tickets, integrations, webhook receipts, rate-limit records, and audit logs.
- Public enquiries can be stored through a secret-protected Convex HTTP action and notified through configured Resend. In-memory Next.js throttling is retained as a first filter; Convex also applies per-window limiting.
- Current hotspot voucher prices and in-person payment terms remain unchanged.

## Live truth and content gates

- Confirmed hotspot coverage: Tayari Market and Mundindi Market, Busia District, Uganda.
- Other locations and home internet/PPPoE availability require confirmation.
- No online payment, CCTV/Rescue/managed-service pricing, 24/7 claim, response target, customer case study, or technical provider integration is activated or asserted.
- Centipid voucher/account actions remain separate; the public link is shown only after an approved URL is configured.
- Draft Terms and Privacy pages need owner/legal review before production launch.

## Development and production configuration still required

- Convex dev/prod deployments and generated code configuration.
- Matching server-only `CONTACT_API_SECRET` values in Next.js and Convex, plus `CONVEX_SITE_URL` and `NEXT_PUBLIC_CONVEX_URL`.
- WorkOS development and production application IDs, API keys, cookie passwords, allowed redirect/callback URLs, and matching Convex auth configuration.
- Verified internal MylesNet organization bootstrap and staff membership provisioning; client roles should be granted explicitly.
- Resend key, sender and recipient; canonical site URL; CSRF domain and HMAC secret; public contact channels.
- Exact provider contracts and per-client secrets for network/RADIUS/PPPoE, Centipid, payment, monitoring, and messaging integrations.
- Agreed organization/member administration, privacy retention/legal basis, payment reconciliation, support workflow, backup/restore plan, and operational response ownership.

## Delivery verification

Run `npm run typecheck`, `npm run lint`, `npm run build`, and `npm audit --audit-level=moderate`. Verify public routes and mobile navigation in a browser. Convex deployment, WorkOS login, provider webhooks, production contact persistence, and production hosting cannot be claimed verified until their development/production credentials and environments are configured.
