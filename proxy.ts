import { authkitProxy } from "@workos-inc/authkit-nextjs";

export default authkitProxy();

export const config = {
  matcher: ["/portal/:path*", "/sign-in", "/auth/callback"],
};
