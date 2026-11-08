import { NextResponse, type NextRequest } from "next/server";
import { handleAuth } from "@workos-inc/authkit-nextjs";

const authConfigured = Boolean(process.env.WORKOS_CLIENT_ID && process.env.WORKOS_API_KEY && process.env.WORKOS_COOKIE_PASSWORD && process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI);
const handleWorkOSCallback = handleAuth({ returnPathname: "/portal" });

export function GET(request: NextRequest) {
  if (!authConfigured) return NextResponse.redirect(new URL("/portal", request.url));
  return handleWorkOSCallback(request);
}
