import Link from "next/link";
import { Facebook, Instagram, Linkedin, Music2, Twitter, Youtube } from "lucide-react";
import { Brand } from "@/components/brand";
import { navigation, phoneUrl, socialLinks, whatsappUrl } from "@/lib/site";

const socialIcons = {
  LinkedIn: Linkedin,
  Facebook,
  Twitter,
  YouTube: Youtube,
  Instagram,
  TikTok: Music2,
} as const;

export function Footer() {
  return (
    <footer className="bg-net-accent-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div><Brand compact /><p className="mt-4 max-w-xs text-sm leading-6 text-white/75">WiFi access with clear voucher pricing and direct support.</p></div>
        <div><h2 className="font-heading text-sm font-bold uppercase tracking-wider text-white/65">Explore</h2><div className="mt-4 grid gap-3">{navigation.map((item) => <Link key={item.href} href={item.href} className="text-sm text-white/80 hover:text-white">{item.label}</Link>)}</div></div>
        <div><h2 className="font-heading text-sm font-bold uppercase tracking-wider text-white/65">Talk to us</h2><div className="mt-4 grid gap-3 text-sm text-white/80"><a href={phoneUrl} className="hover:text-white">Call MylesNet</a><a href={whatsappUrl} className="hover:text-white">WhatsApp MylesNet</a></div></div>
        <div><h2 className="font-heading text-sm font-bold uppercase tracking-wider text-white/65">Follow MylesCorp</h2><div className="mt-4 flex flex-wrap gap-2">{socialLinks.map((social) => { const Icon = socialIcons[social.label]; return <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Follow MylesCorp on ${social.label}`} className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-net-primary hover:bg-net-primary hover:text-white"><Icon className="size-4" aria-hidden="true" /></a>; })}</div></div>
      </div>
      <div className="border-t border-white/15 px-5 py-5 text-center text-xs text-white/65">© 2026 Powered by <a href="https://mylescorptech.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">MylesCorp Technologies Ltd</a> · All rights reserved.</div>
    </footer>
  );
}
