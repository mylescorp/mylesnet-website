import { NextResponse } from "next/server";
import { createCsrfToken, csrfCookieName, csrfCookieOptions, getCsrfConfiguration } from "@/lib/csrf";

export const dynamic = "force-dynamic";

export async function GET() {
  const configuration = getCsrfConfiguration();
  if (!configuration) return NextResponse.json({ success: false, message: "We could not prepare the form securely. Please try again later." }, { status: 503 });

  const { token, signedToken } = createCsrfToken(configuration);
  const response = NextResponse.json({ success: true, token }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(csrfCookieName, signedToken, csrfCookieOptions(configuration));
  return response;
}
