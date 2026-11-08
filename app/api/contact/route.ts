import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contactFormSchema } from "@/lib/contact-schema";
import { csrfCookieName, expiredCsrfCookieOptions, getCsrfConfiguration, isValidCsrfToken } from "@/lib/csrf";

const contactSchema = contactFormSchema.extend({
  source: z.enum(["contact", "coverage-request", "home-installation", "survey-request", "isp-quote", "health-check", "rescue", "partner-application", "advertising"]),
});
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;

function json(status: number, message: string) {
  return NextResponse.json({ success: false, message }, { status });
}

function clearCsrfCookie(response: NextResponse, configuration: NonNullable<ReturnType<typeof getCsrfConfiguration>>) {
  response.cookies.set(csrfCookieName, "", expiredCsrfCookieOptions(configuration));
  return response;
}

function isRateLimited(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) { attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS }); return false; }
  if (entry.count >= MAX_ATTEMPTS) return true;
  entry.count += 1;
  return false;
}

function serviceType(service?: string): "hotspot" | "pppoe" | "home-internet" | "business-internet" | "cctv" | "installation" | "other" {
  const value = service?.toLowerCase() ?? "";
  if (value.includes("hotspot") || value.includes("voucher")) return "hotspot";
  if (value.includes("pppoe")) return "pppoe";
  if (value.includes("home internet")) return "home-internet";
  if (value.includes("business") || value.includes("institution") || value.includes("school") || value.includes("clinic")) return "business-internet";
  if (value.includes("cctv") || value.includes("camera")) return "cctv";
  if (value.includes("install")) return "installation";
  return "other";
}

async function saveLeadToConvex(lead: z.infer<typeof contactSchema>, request: NextRequest) {
  const convexUrl = process.env.CONVEX_SITE_URL;
  const apiSecret = process.env.CONTACT_API_SECRET;
  if (!convexUrl || !apiSecret) return { configured: false as const };
  const response = await fetch(new URL("/public/contact", convexUrl), {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiSecret}`,
      "X-Forwarded-For": request.headers.get("x-forwarded-for") ?? "unknown",
    },
    body: JSON.stringify({ ...lead, serviceType: serviceType(lead.service) }),
    signal: AbortSignal.timeout(5_000),
  });
  const data = await response.json().catch(() => null) as { success?: boolean; message?: string } | null;
  return { configured: true as const, success: response.ok && data?.success === true, status: response.status, message: data?.message };
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) return json(403, "We could not send your message. Please try again from the MylesNet website.");
  if (isRateLimited(request)) return json(429, "Too many attempts. Please wait a moment and try again.");

  const configuration = getCsrfConfiguration();
  if (!configuration) return json(503, "We could not prepare the form securely. Please try again later.");
  const csrfCookie = (await cookies()).get(csrfCookieName)?.value;
  if (!isValidCsrfToken(csrfCookie, request.headers.get("x-csrf-token"), configuration)) {
    return clearCsrfCookie(json(403, "We could not verify this form submission. Please try again."), configuration);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 12_000) return clearCsrfCookie(json(413, "Please shorten your message and try again."), configuration);
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return clearCsrfCookie(json(400, "We could not save your message. Please check the form and try again."), configuration);
  if (parsed.data.company) return clearCsrfCookie(NextResponse.json({ success: true, message: "Thanks. We will get back to you shortly." }), configuration);

  const convexResult = await saveLeadToConvex(parsed.data, request).catch(() => ({ configured: true as const, success: false, status: 503, message: "Contact service temporarily unavailable" }));
  if (convexResult.configured && !convexResult.success) {
    return clearCsrfCookie(json(convexResult.status === 429 ? 429 : 503, convexResult.message ?? "We could not save your enquiry right now. Please try again later."), configuration);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (apiKey && recipient && from) {
    try {
      const lead = parsed.data;
      const result = await new Resend(apiKey).emails.send({
        from,
        to: recipient,
        subject: `MylesNet ${lead.source.replaceAll("-", " ")}`,
        text: `Name: ${lead.name}\nPhone: ${lead.phone}\nLocation: ${lead.location}\nOrganization: ${lead.organization || "Not supplied"}\nService: ${lead.service || "Not supplied"}\nTimeline: ${lead.timeline || "Not supplied"}\nSource: ${lead.source}\n\nMessage:\n${lead.message}`,
      });
      if (result.error) console.error("MylesNet lead saved, but the email notification failed.");
    } catch {
      console.error("MylesNet lead saved, but the email notification failed.");
    }
  } else if (!convexResult.configured) {
    return clearCsrfCookie(json(503, "Enquiry delivery is not configured yet. Please contact MylesNet by phone or WhatsApp."), configuration);
  }

  const response = NextResponse.json({ success: true, message: "Thanks. Your enquiry has been received." });
  return clearCsrfCookie(response, configuration);
}
