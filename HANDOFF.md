# MylesNet Marketing Website Handoff

## Current State

- The static [[MylesNet]] marketing site is implemented with responsive pages, the supplied logo, shared contact handling, voucher conversion, metadata, sitemap, robots, security headers, canonical [[MylesCorp Technologies Ltd]] social footer links, and a server-issued CSRF check for the public form.
- `npm install`, typecheck, lint, and production build have completed locally. The current `npm audit` still reports three inherited high-severity advisories through [[Next.js]]; its only offered automatic fix is an unsafe downgrade and was not applied.

## Resume Steps

1. Configure the production `CSRF_COOKIE_DOMAIN` and `CSRF_HMAC_SECRET` values in deployment settings before enabling public contact submissions.
2. Configure [[Resend]] recipient settings, public phone values, and canonical production URL.
3. Resolve the inherited [[npm audit]] findings with a compatible supported [[Next.js]] update, not the suggested downgrade.

## Deployment Inputs Still Required

- `RESEND_API_KEY`, `CONTACT_RECIPIENT_EMAIL`, `CONTACT_FROM_EMAIL`.
- `CSRF_COOKIE_DOMAIN` and `CSRF_HMAC_SECRET`.
- Canonical production URL and public contact-number environment values.
