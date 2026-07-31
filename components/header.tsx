"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { navigation, whatsappUrl } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-net-border/70 bg-net-neutral-50/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Brand compact />
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href} className="text-sm font-semibold text-net-accent hover:text-net-primary">{item.label}</Link>)}
          <a href={whatsappUrl} className="rounded-full bg-net-primary px-4 py-2 text-sm font-bold text-white hover:bg-net-primary-dark">WhatsApp Us</a>
        </nav>
        <button type="button" className="rounded-lg p-2 text-net-accent md:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open ? <nav className="border-t border-net-border bg-white px-5 py-4 md:hidden" aria-label="Mobile navigation">{navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-semibold text-net-accent hover:bg-net-surface">{item.label}</Link>)}<a href={whatsappUrl} className="mt-2 block rounded-lg bg-net-primary px-3 py-3 text-center font-bold text-white">WhatsApp Us</a></nav> : null}
    </header>
  );
}
