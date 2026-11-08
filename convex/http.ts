import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/public/contact",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const expectedSecret = process.env.CONTACT_API_SECRET;
    if (!expectedSecret) return Response.json({ success: false, message: "Contact intake is not configured." }, { status: 503 });
    const authorization = request.headers.get("authorization");
    if (authorization !== `Bearer ${expectedSecret}`) return Response.json({ success: false }, { status: 401 });
    const payload = await request.json().catch(() => null) as Record<string, unknown> | null;
    if (!payload || typeof payload.name !== "string" || typeof payload.phone !== "string" || typeof payload.location !== "string" || typeof payload.message !== "string") {
      return Response.json({ success: false, message: "Invalid contact request." }, { status: 400 });
    }
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const ipHashBytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(forwarded));
    const rateLimitKey = Array.from(new Uint8Array(ipHashBytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
    const result = await ctx.runMutation(internal.leads.acceptPublicContact, {
      name: payload.name,
      phone: payload.phone,
      location: payload.location,
      organization: typeof payload.organization === "string" ? payload.organization : undefined,
      service: typeof payload.service === "string" ? payload.service : undefined,
      timeline: typeof payload.timeline === "string" ? payload.timeline : undefined,
      message: payload.message,
      source: payload.source as "contact" | "coverage-request" | "home-installation" | "survey-request" | "isp-quote" | "health-check" | "rescue" | "partner-application" | "advertising",
      serviceType: classifyService(payload.service),
      rateLimitKey,
    });
    if (result.limited) return Response.json({ success: false, message: "Too many requests. Please wait and try again." }, { status: 429 });
    return Response.json({ success: true });
  }),
});

function classifyService(service: unknown): "hotspot" | "pppoe" | "home-internet" | "business-internet" | "cctv" | "installation" | "other" {
  const value = typeof service === "string" ? service.toLowerCase() : "";
  if (value.includes("hotspot") || value.includes("voucher")) return "hotspot";
  if (value.includes("pppoe")) return "pppoe";
  if (value.includes("home internet")) return "home-internet";
  if (value.includes("business") || value.includes("institution") || value.includes("school") || value.includes("clinic")) return "business-internet";
  if (value.includes("cctv") || value.includes("camera")) return "cctv";
  if (value.includes("installation") || value.includes("install")) return "installation";
  return "other";
}

export default http;
