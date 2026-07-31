import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const csrfCookieName = "__mylesnet_csrf";
const csrfLifetimeSeconds = 900;

type CsrfConfiguration = {
  cookieDomain: string;
  secret: string;
};

export function getCsrfConfiguration(): CsrfConfiguration | null {
  const cookieDomain = process.env.CSRF_COOKIE_DOMAIN;
  const secret = process.env.CSRF_HMAC_SECRET;
  return cookieDomain && secret ? { cookieDomain, secret } : null;
}

function signToken(token: string, secret: string) {
  return createHmac("sha256", secret).update(token).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function createCsrfToken(configuration: CsrfConfiguration) {
  const token = randomBytes(32).toString("base64url");
  return { token, signedToken: `${token}.${signToken(token, configuration.secret)}` };
}

export function isValidCsrfToken(cookieValue: string | undefined, headerToken: string | null, configuration: CsrfConfiguration) {
  if (!cookieValue || !headerToken) return false;
  const [cookieToken, cookieSignature, extra] = cookieValue.split(".");
  if (!cookieToken || !cookieSignature || extra || !safeEqual(cookieToken, headerToken)) return false;
  return safeEqual(cookieSignature, signToken(cookieToken, configuration.secret));
}

export function csrfCookieOptions(configuration: CsrfConfiguration) {
  return {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
    path: "/",
    domain: configuration.cookieDomain,
    maxAge: csrfLifetimeSeconds,
  };
}

export function expiredCsrfCookieOptions(configuration: CsrfConfiguration) {
  return { ...csrfCookieOptions(configuration), maxAge: 0, expires: new Date(0) };
}
