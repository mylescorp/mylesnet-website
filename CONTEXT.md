# MylesNet Website and Operations Portal Context

## Purpose

This repository serves the MylesNet public website and is being expanded into a secure operations and customer portal for internet, hotspot, PPPoE, CCTV, installation, and managed network services.

## Audiences

- Households and community users checking hotspot coverage, voucher pricing, and home connectivity options.
- Businesses and institutions requesting site-survey-led connectivity and CCTV work.
- Small ISPs and resellers discussing MylesNet Managed network services.
- Internal staff and approved customer organizations using authenticated portal workflows.

## Technical direction

- Next.js App Router, strict TypeScript, Tailwind CSS v4, Convex, and WorkOS AuthKit.
- Resend is used for configured enquiry email notifications.
- Public routes remain server-first and mobile/low-data friendly.
- Convex is intended to store and coordinate leads, organizations, memberships, customers, requests, subscriptions, invoices/payments, support tickets, integration metadata, webhook receipts, and audit history.
- Authentication and authorization are separate: WorkOS establishes identity; Convex organization memberships and role permissions authorize data access.
- Provider-specific network, payment, monitoring, and messaging integrations remain behind client-specific adapters.

## Coverage and pricing facts

- Confirmed hotspot markets: Tayari Market and Mundindi Market, Busia District, Uganda.
- Busia Market and Mwembe Market are planned only.
- Hotspot voucher prices are the UGX amounts in `lib/site.ts`; customers pay in person by cash or Airtel Money.
- KSh values are approximate conversions from `/api/exchange-rate`.
- Other connectivity, home internet, PPPoE, CCTV, installation, Rescue, and managed-service scope/pricing require confirmation; do not invent availability or prices.
- Existing hotspot account and voucher actions remain in the approved Centipid system. Do not introduce competing checkout or voucher management.

## Trust and operations

- Do not claim 24/7 support, response-time targets, uptime, speed, user totals, certifications, compliance, customer testimonials, team details, or client results without current evidence and approval.
- Do not publish customer names, logos, site photos, or operational details without permission.
- Support hours, refund/cancellation terms, privacy retention periods, legal jurisdiction, and service-level terms require owner review before launch.
- Never put router credentials, provider secrets, CCTV credentials, payment secrets, or sensitive configuration into client code, ordinary Convex documents, or logs.
- Keep high-volume telemetry and CCTV recordings in systems designed for those workloads; store only the required metadata and workflow state in Convex.

## Environment gates

- Public enquiry persistence requires `NEXT_PUBLIC_CONVEX_URL`, matching `CONTACT_API_SECRET` values in Next.js and Convex, and the deployed `/public/contact` Convex HTTP action.
- Notifications require `RESEND_API_KEY`, `CONTACT_RECIPIENT_EMAIL`, and `CONTACT_FROM_EMAIL`.
- WorkOS portal sign-in requires WorkOS application credentials, cookie password, configured redirect/callback URLs, and a matching Convex JWT provider configuration.
- The public Centipid link and MylesNet portal navigation remain hidden unless their confirmed URLs/configuration are set.
- Production Convex, WorkOS, provider, and Vercel values must be configured separately for development and production. Never point local development at production.
