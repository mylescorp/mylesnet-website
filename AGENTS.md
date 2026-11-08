# MylesNet Website and Operations Portal

## Product direction

This repository is being expanded from a public marketing site into the MylesNet web platform. The public site serves households and community users first, then businesses/institutions and small ISPs/resellers. A separate authenticated portal will support internal staff and approved client organizations. Use Convex for application data and server-side business logic, and WorkOS AuthKit for portal authentication.

## Website page map

- Public foundation: Home, Internet (hotspot, PPPoE/home internet, installation), Where We Are, Support, Contact, Terms, Privacy, and FAQ.
- Service pages: For ISPs / MylesNet Managed, CCTV, Business and Institutions, and About.
- Growth pages: Partners and Advertise. Clearly label any offering as planned until its service, economics, inventory, and operations are confirmed.
- Portal: separate from public marketing navigation. Existing hotspot customers continue to use the existing Centipid voucher/account system when its approved URL is configured. Do not duplicate checkout or voucher management in this app without an explicit product decision.

## Stack and architecture

- Next.js App Router, strict TypeScript, Tailwind CSS v4, Convex, WorkOS AuthKit, and Resend for configured email notifications.
- Keep public routes server-first and low-data. Add client interactivity only for a clear visitor task.
- Convex is the source of truth for leads, organizations, memberships, customers, service requests, subscriptions, invoices/payments, support tickets, integration metadata, webhook receipts, and audit history.
- Every tenant-owned Convex query and mutation must derive the actor from `ctx.auth.getUserIdentity()` and check an active organization membership and role on the server. Never trust a client-provided organization ID, role, email, or permission by itself.
- Apply least privilege and explicit role checks to every mutation. Record sensitive operational and financial changes in append-only audit records.
- Keep WorkOS authentication separate from tenant authorization. A valid WorkOS session does not itself grant access to any MylesNet or client organization.
- External network, payment, monitoring, and messaging systems must use provider adapters with stable internal contracts. Keep provider-specific behavior isolated so a new provider or client-specific integration can be added without rewriting service workflows.
- Never store provider API secrets, router passwords, VPN keys, or CCTV credentials in browser code, regular Convex documents, logs, or public environment variables. Store only secret references in Convex; use protected deployment secrets or an approved vault. Do not expose network configuration or camera streams in the marketing site.
- Verify webhook signatures, timestamps, provider identity, payload shape, and event idempotency before applying effects. Store redacted receipt metadata and hashes, not unnecessary raw personal or payment payloads.
- Represent money as positive safe integer minor units with an explicit ISO currency. Do not mark an invoice paid based only on a browser request. Reconcile provider callbacks and keep cash/Airtel Money in-person records distinct from online payments.
- Do not activate online checkout, RADIUS/PPPoE provisioning, Centipid sync, router control, monitoring, or payment integrations until the provider contract, credentials, environment, ownership, and rollback procedure are confirmed. Use typed adapter boundaries and clearly inactive configuration until then.
- Store CCTV recordings and high-volume network telemetry in fit-for-purpose external systems. Convex should hold authorized metadata, status, references, and workflow records, not video archives or raw high-frequency metrics.

## Content, pricing, and claims

- Current live MylesNet hotspot coverage is Tayari Market and Mundindi Market only. Busia Market and Mwembe Market are planned only. Do not imply other areas are serviceable without verified owner confirmation.
- Official hotspot prices are the values in `lib/site.ts` and are collected in UGX in person by cash or Airtel Money. KSh values are approximate and must come from `/api/exchange-rate`.
- Do not invent home internet, PPPoE, CCTV, Rescue, installation, or managed-service prices. Use survey/quote language until prices and inclusions are confirmed.
- Do not claim 24/7 support, response targets, uptime, speeds, subscriber counts, service coverage, certifications, hospital compliance, testimonials, case-study results, staff names, or team size without current evidence and any required consent.
- Do not publish a client name/logo, local photograph, technician identity, installation image, or operational detail without permission for the intended use.
- Existing hotspot customers use Centipid for voucher/account actions when the approved portal URL is configured. Do not create a competing account or checkout flow.
- Keep contact phone, WhatsApp, email recipients, support hours, portal links, canonical URLs, maps, and provider settings environment/configuration driven. Never fabricate contact details or social profiles.
- Show company, partner, and lender information factually and secondary to customer service paths. Mark platform capabilities and future integrations as coming soon only when an owner-approved follow-up path exists.

## Design system and accessibility

- `app/globals.css` is the single source of truth for MylesNet UI color tokens. Use semantic token classes, not raw component colors. Preserve the established palette: warm off-white backgrounds, navy structure, orange actions/highlights, and restrained teal connectivity/status cues.
- Preserve the supplied logo artwork; do not recolor, stretch, or redraw it. Create a separately approved reversed asset before using the logo on dark surfaces.
- Support light and dark themes with equivalent semantic contrast. Keep foreground colors theme-aware; do not put hard-coded dark text on dark surfaces or white text on a light surface.
- Use navy for brand structure, orange for primary actions and highlights, and teal for connectivity/status. Use the semantic on-action foreground token for orange buttons and avoid low-contrast orange body text.
- Mobile first, low-data, readable 16px body copy, minimum 48px touch targets, visible focus, reduced-motion support, labels/icons alongside status color, and accessible contrast for every state.
- Prefer local, permissioned service imagery over generic scenic images as evidence of local work.

## Forms and personal data

- Forms must state what happens next, request only details needed to respond, validate and normalize user input, provide accessible success/error feedback, and avoid storing unnecessary sensitive data.
- Public form requests require same-origin/CSRF protections, abuse controls appropriate for multi-instance deployment, validation on the server, and safe handling of notification failures.
- Keep privacy/terms content aligned with actual data flows and have jurisdiction-specific legal wording reviewed before production launch.

## Verification and delivery

- Read this file, relevant project guidance, and `git status` before changes. Preserve user documents/assets and unrelated edits; never include them in a code commit without explicit instruction.
- Run typecheck, lint, production build, dependency audit, and relevant route/mobile checks for website/backend changes. Add and run focused authorization, tenant-isolation, webhook-idempotency, and monetary correctness tests for affected backend features.
- Report existing failures separately from regressions. Do not claim a provider integration, sign-in, backup, deployment, or production workflow works unless verified against its real configured environment.
- Follow the user’s repository delivery instructions for branch, commit, pull request, review, merge, production, and cleanup gates. Production deployment requires an explicit authorized workflow and successful checks/review.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
