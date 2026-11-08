import type { Metadata } from "next";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { PortalConvexProvider } from "@/components/portal-convex-provider";
import { PortalWelcome } from "@/components/portal-welcome";

export const metadata: Metadata = { title: "Customer portal", robots: { index: false, follow: false } };

export default async function PortalPage() {
  const { user } = await withAuth({ ensureSignedIn: true });
  return <PortalConvexProvider><PortalWelcome name={user.firstName || user.email} configured={Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)} /></PortalConvexProvider>;
}
