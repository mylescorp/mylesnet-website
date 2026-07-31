import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contactFormSchema } from "@/lib/contact-schema";
import { csrfCookieName, expiredCsrfCookieOptions, getCsrfConfiguration, isValidCsrfToken } from "@/lib/csrf";

const contactSchema = contactFormSchema.extend({
  source: z.enum(["contact", "coverage-request"]),
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

  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return clearCsrfCookie(json(400, "We could not save your message. Please check the form and try again."), configuration);
  if (parsed.data.company) return clearCsrfCookie(NextResponse.json({ success: true, message: "Thanks. We will get back to you shortly." }), configuration);

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !recipient || !from) return clearCsrfCookie(json(503, "We could not send your message right now. Please use WhatsApp or call us instead."), configuration);

  try {
    const resend = new Resend(apiKey);
    const lead = parsed.data;
    const response = await resend.emails.send({
      from,
      to: recipient,
      subject: `MylesNet ${lead.source === "coverage-request" ? "coverage request" : "contact message"}`,
      text: `Name: ${lead.name}\nPhone: ${lead.phone}\nMarket or location: ${lead.location}\nSource: ${lead.source}\n\nMessage:\n${lead.message}`,
    });
    if (response.error) return clearCsrfCookie(json(503, "We could not send your message right now. Please use WhatsApp or call us instead."), configuration);
    return clearCsrfCookie(NextResponse.json({ success: true, message: "Thanks. We will get back to you shortly." }), configuration);
  } catch {
    return clearCsrfCookie(json(503, "We could not send your message right now. Please use WhatsApp or call us instead."), configuration);
  }
}
