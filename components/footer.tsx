import Link from "next/link";
import { Facebook, Instagram, Linkedin, Music2, Twitter, Youtube } from "lucide-react";
import { Brand } from "@/components/brand";
import { contact, footerGroups, phoneUrl, socialLinks, whatsappUrl } from "@/lib/site";

const socialIcons = { LinkedIn: Linkedin, Facebook, Twitter, YouTube: Youtube, Instagram, TikTok: Music2 } as const;

export function Footer() {
  return <footer className="border-t border-net-border bg-net-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.3fr_2fr_1fr] lg:px-8 lg:py-16">
      <div><Brand compact /><p className="mt-4 max-w-sm text-sm leading-6 text-net-footer-text/75">Internet access, local installation, and network services with clear next steps.</p><div className="mt-5 flex gap-2">{socialLinks.map((social) => { const Icon = socialIcons[social.label]; return <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Follow MylesCorp on ${social.label}`} className="flex size-10 items-center justify-center rounded-full border border-net-footer-text/20 text-net-footer-text/80 hover:border-net-primary hover:bg-net-primary hover:text-net-on-action"><Icon className="size-4" aria-hidden="true" /></a>; })}</div></div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{footerGroups.map((group) => <div key={group.title}><h2 className="font-heading text-sm font-bold uppercase tracking-wider text-net-footer-text/65">{group.title}</h2><div className="mt-4 grid gap-3">{group.links.map((link) => <Link key={link.href} href={link.href} className="text-sm text-net-footer-text/80 hover:text-net-primary">{link.label}</Link>)}</div></div>)}</div>
      <div><h2 className="font-heading text-sm font-bold uppercase tracking-wider text-net-footer-text/65">Talk to us</h2><div className="mt-4 grid gap-3 text-sm text-net-footer-text/80"><a href={phoneUrl} className="hover:text-net-primary">Call {contact.phone || "MylesNet"}</a>{contact.email ? <a href={`mailto:${contact.email}`} className="break-all hover:text-net-primary">Email MylesNet</a> : null}<a href={whatsappUrl} className="hover:text-net-primary">WhatsApp MylesNet</a></div><Link href="/contact" className="mt-5 inline-flex rounded-lg bg-net-primary px-4 py-3 text-sm font-bold text-net-on-action hover:bg-net-primary-dark">Send an enquiry</Link></div>
    </div>
    <div className="border-t border-net-border px-5 py-5 text-center text-xs text-net-neutral-600">© {new Date().getFullYear()} <a href="https://mylescorptech.com/" target="_blank" rel="noopener noreferrer" className="font-semibold underline">MylesCorp Technologies Ltd</a>. All rights reserved. <span className="mx-2">·</span><Link href="/terms" className="underline">Terms</Link><span className="mx-2">·</span><Link href="/privacy" className="underline">Privacy</Link></div>
  </footer>;
}
