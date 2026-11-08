"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { centipidPortalUrl, portalEnabled } from "@/lib/site";

const serviceLinks = [
  { href: "/business-institutions", label: "Business & institutions" },
  { href: "/cctv", label: "CCTV installation" },
  { href: "/for-isps", label: "For ISPs" },
  { href: "/partners", label: "Partners" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  const isCurrent = (href: string) => pathname === href || (href === "/internet" && pathname === "/pricing");
  const linkClass = (href: string) => `mn-nav-link${isCurrent(href) ? " is-current" : ""}`;

  return (
    <header className="mn-header">
      <div className="mn-header-row">
        <div className="mn-header-brand"><Brand compact /></div>

        <nav id="main-navigation" key={pathname} className="mn-navigation" data-open={open} aria-label="Main navigation">
          <Link href="/internet" className={linkClass("/internet")} aria-current={isCurrent("/internet") ? "page" : undefined} onClick={() => setOpenPath(null)}>Internet</Link>
          <Link href="/where-we-are" className={linkClass("/where-we-are")} aria-current={isCurrent("/where-we-are") ? "page" : undefined} onClick={() => setOpenPath(null)}>Coverage</Link>
          <details className={`mn-nav-group${serviceLinks.some((item) => isCurrent(item.href)) ? " is-current" : ""}`}>
            <summary>Services <ChevronDown className="mn-nav-chevron" aria-hidden="true" /></summary>
            <div className="mn-nav-submenu">
              {serviceLinks.map((item) => <Link key={item.href} href={item.href} className={linkClass(item.href)} aria-current={isCurrent(item.href) ? "page" : undefined} onClick={() => setOpenPath(null)}>{item.label}</Link>)}
            </div>
          </details>
          <Link href="/support" className={linkClass("/support")} aria-current={isCurrent("/support") ? "page" : undefined} onClick={() => setOpenPath(null)}>Support</Link>
          <Link href="/about" className={linkClass("/about")} aria-current={isCurrent("/about") ? "page" : undefined} onClick={() => setOpenPath(null)}>About</Link>
        </nav>

        {portalEnabled || centipidPortalUrl ? <div className="mn-account-actions" data-open={open} aria-label="Account access">
          {portalEnabled ? <Link href="/portal" className="mn-account-link" onClick={() => setOpenPath(null)}>Organization portal</Link> : null}
          {centipidPortalUrl ? <a href={centipidPortalUrl} target="_blank" rel="noopener noreferrer" className="mn-account-link" onClick={() => setOpenPath(null)}>Hotspot customer access<span className="sr-only"> (opens in a new tab)</span></a> : null}
        </div> : null}

        <div className="mn-header-actions">
          <Link href="/contact" className="mn-header-cta">Contact us</Link>
          <ThemeToggle />
          <button type="button" className="mn-menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpenPath(open ? null : pathname)}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
