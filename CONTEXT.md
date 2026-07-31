# MylesNet Marketing Website Context

## Purpose

This repository contains the public marketing website for [[MylesNet]], the WiFi hotspot reselling business operated by [[MylesCorp Technologies Ltd]] in Busia District, Uganda.

## Audience

Market vendors, shoppers, residents, and prospective market communities in the Busia region who need clear information about MylesNet coverage, voucher pricing, and in-person payment.

## Technical Scope

- Next.js 16.2 App Router with strict TypeScript.
- Tailwind CSS v4 design tokens.
- Static pages with one Resend-backed contact route and one server-cached exchange-rate route.
- Vercel Analytics.
- No database, authentication, user accounts, online payment, or operational hotspot controls.

## Coverage Contract

- Live now: Tayari Market and Mundindi Market in Busia District, Uganda.
- Coming soon: Busia Market and Mwembe Market.
- Busia County, Kenya is expansion planned only.
- Exact market coordinates and real customer testimonials are pending owner supply and must not be invented.

## Permanent Decisions

- Official pricing is collected in UGX in person by cash or Airtel Money.
- KSh values are approximate conversions from a cached live exchange rate, never a permanent UI rate.
- The supplied MylesNet logo is the public identity asset.
- Resend recipient configuration and map embed configuration remain environment-only values.

## Known Delivery Gates

- `CONTACT_RECIPIENT_EMAIL` and `RESEND_API_KEY` are required to send leads.
- `GOOGLE_MAPS_EMBED_URL` requires MylesNet's exact approved market map before launch.
- Customer testimonials remain intentionally absent until real consented quotes are supplied.
