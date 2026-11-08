"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { centipidPortalUrl, navigation, portalEnabled, whatsappUrl } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return <header className="sticky top-0 z-50 border-b border-net-border bg-net-neutral-50/95 backdrop-blur">
    <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
      <Brand compact />
      <nav className="hidden items-center gap-3 xl:flex" aria-label="Main navigation">
        {navigation.map((item) => <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-lg px-2 py-2 text-sm font-semibold text-net-accent hover:bg-net-surface">{item.label}</Link>)}
      </nav>
      <div className="hidden items-center gap-2 xl:flex">
        {portalEnabled ? <Link href="/portal" className="whitespace-nowrap rounded-lg border border-net-border px-3 py-2.5 text-sm font-semibold text-net-accent hover:bg-net-surface">MylesNet portal</Link> : null}
        {centipidPortalUrl ? <a href={centipidPortalUrl} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap rounded-lg border border-net-border px-3 py-2.5 text-sm font-semibold text-net-accent hover:bg-net-surface">Customer portal</a> : null}
        <a href={whatsappUrl} className="whitespace-nowrap rounded-lg bg-net-primary px-4 py-3 text-sm font-bold text-net-on-action hover:bg-net-primary-dark">Talk to MylesNet</a>
        <ThemeToggle />
      </div>
      <div className="flex items-center gap-2 xl:hidden"><ThemeToggle /><button type="button" className="flex size-12 items-center justify-center rounded-lg text-net-accent hover:bg-net-surface" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div>
    </div>
    <nav className={`${open ? "grid" : "hidden"} gap-1 border-t border-net-border bg-net-neutral-50 px-4 py-3 xl:hidden`} aria-label="Mobile navigation">
      {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-net-accent hover:bg-net-surface">{item.label}</Link>)}
      {portalEnabled ? <Link href="/portal" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-net-accent hover:bg-net-surface">MylesNet portal</Link> : null}
      {centipidPortalUrl ? <a href={centipidPortalUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg px-3 py-3 font-semibold text-net-accent hover:bg-net-surface">Customer portal</a> : null}
      <a href={whatsappUrl} className="mt-1 rounded-lg bg-net-primary px-3 py-3 text-center font-bold text-net-on-action">Talk to MylesNet</a>
    </nav>
  </header>;
}
