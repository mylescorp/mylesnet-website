"use client";

import Link from "next/link";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { Authenticated, Unauthenticated, useConvexAuth, useQuery } from "convex/react";
import { CircleAlert, LogOut, MessageCircle, ShieldCheck } from "lucide-react";
import { api } from "../convex/_generated/api";
import { whatsappUrl } from "@/lib/site";

export function PortalWelcome({ name, configured }: { name: string; configured: boolean }) {
  const { signOut } = useAuth();
  return <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-net-primary">MylesNet portal</p><h1 className="mt-3 font-heading text-4xl font-bold text-net-accent">Welcome, {name}.</h1><p className="mt-3 max-w-2xl leading-7 text-net-neutral-600">You are signed in with WorkOS. Your portal data is limited to organizations where MylesNet has granted you an active role.</p></div><button type="button" onClick={() => void signOut({ returnTo: "/" })} className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-net-border px-4 py-3 font-semibold text-net-accent hover:bg-net-surface"><LogOut className="size-4" />Sign out</button></div><div className="mt-10 rounded-2xl border border-net-border bg-net-neutral-50 p-6 sm:p-8">{configured ? <PortalOrganizations /> : <><CircleAlert className="size-8 text-net-warning" /><h2 className="mt-4 font-heading text-2xl font-bold text-net-accent">Portal services are not connected yet.</h2><p className="mt-3 max-w-2xl leading-7 text-net-neutral-600">Your account is authenticated, but the secure data service has not been configured for this environment. Contact MylesNet for assistance.</p></>}<a href={whatsappUrl} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg bg-net-primary px-5 py-3 font-bold text-net-on-action"><MessageCircle className="size-4" />Contact MylesNet</a><Link href="/privacy" className="ml-5 text-sm font-semibold text-net-primary underline">Privacy information</Link></div></section>;
}

function PortalOrganizations() {
  const { isAuthenticated } = useConvexAuth();
  const organizations = useQuery(api.organizations.listMine, isAuthenticated ? {} : "skip");
  return <><ShieldCheck className="size-8 text-net-accent-teal" /><h2 className="mt-4 font-heading text-2xl font-bold text-net-accent">Your organizations</h2>{organizations === undefined ? <p className="mt-3 text-net-neutral-600">Checking your portal access...</p> : organizations.length ? <ul className="mt-4 grid gap-3 sm:grid-cols-2">{organizations.map((organization) => <li key={organization.id} className="rounded-xl border border-net-border bg-net-surface p-4"><p className="font-semibold text-net-accent">{organization.name}</p><p className="mt-1 text-sm capitalize text-net-neutral-600">{organization.role}</p></li>)}</ul> : <p className="mt-3 max-w-2xl leading-7 text-net-neutral-600">No active organization access is linked to this account yet. Contact MylesNet to verify your organization and request the right role.</p>}<Authenticated><p className="sr-only">Authenticated portal access.</p></Authenticated><Unauthenticated><p className="sr-only">Sign in required.</p></Unauthenticated></>;
}
