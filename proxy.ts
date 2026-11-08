import { authkitProxy } from "@workos-inc/authkit-nextjs";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

const authkit = authkitProxy();
const authConfigured = Boolean(
  process.env.WORKOS_CLIENT_ID &&
  process.env.WORKOS_API_KEY &&
  process.env.WORKOS_COOKIE_PASSWORD &&
  process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI,
);

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  if (!authConfigured) return NextResponse.next();
  return authkit(request, event);
}

export const config = {
  matcher: ["/portal/:path*", "/sign-in", "/auth/callback"],
};
