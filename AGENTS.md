# MylesNet Marketing Website

## Purpose

Public marketing website for [[MylesNet]]. It informs visitors about live market coverage, voucher pricing, and in-person support.

## Local Contracts

- Keep the website static and server-first except where lightweight interactivity is necessary.
- Do not add authentication, databases, checkout, or hotspot-management features.
- Never claim a location is live unless it is Tayari Market or Mundindi Market.
- Use design tokens from `app/globals.css`; do not introduce component-level colour values.
- Do not invent testimonials, names, map coordinates, recipient emails, or social profiles.

## Verification

- Run typecheck, lint, build, audit, and mobile route checks before handoff.
- Confirm all forms target the shared `/api/contact` route and all conversion values originate from `/api/exchange-rate`.
