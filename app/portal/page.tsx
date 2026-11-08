import type { Metadata } from "next";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { PortalConvexProvider } from "@/components/portal-convex-provider";
import { PortalWelcome } from "@/components/portal-welcome";

export const metadata: Metadata = { title: "Customer portal", robots: { index: false, follow: false } };

export default async function PortalPage() {
  const authConfigured = Boolean(process.env.WORKOS_CLIENT_ID && process.env.WORKOS_API_KEY && process.env.WORKOS_COOKIE_PASSWORD && process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI);
  if (!authConfigured) {
    return <section className="mx-auto max-w-3xl px-5 py-20 sm:px-6"><div className="rounded-2xl border border-net-border bg-net-surface p-8"><p className="text-sm font-bold uppercase tracking-[0.16em] text-net-accent">MylesNet portal</p><h1 className="mt-3 font-heading text-3xl font-bold text-net-accent">Portal sign-in is being prepared.</h1><p className="mt-4 leading-7 text-net-neutral-600">The secure sign-in service is not configured for this environment yet. Contact MylesNet for help with an existing account.</p><a href="/contact" className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-net-primary px-5 py-3 font-bold text-net-on-action">Contact MylesNet</a></div></section>;
  }
  const { user } = await withAuth({ ensureSignedIn: true });
  return <PortalConvexProvider><PortalWelcome name={user.firstName || user.email} configured={Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)} /></PortalConvexProvider>;
}
