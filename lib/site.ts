export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const contact = {
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  airtelMoneyNumber: process.env.NEXT_PUBLIC_AIRTEL_MONEY_NUMBER ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
};

export const centipidPortalUrl = process.env.NEXT_PUBLIC_CENTIPID_PORTAL_URL ?? "";
export const portalEnabled = process.env.NEXT_PUBLIC_PORTAL_ENABLED === "true";

export const whatsappUrl = contact.whatsappNumber
  ? `https://wa.me/${contact.whatsappNumber}`
  : "/contact";

export const phoneUrl = contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : "/contact";

export const navigation = [
  { href: "/internet", label: "Internet" },
  { href: "/where-we-are", label: "Coverage" },
  { href: "/business-institutions", label: "Business & institutions" },
  { href: "/cctv", label: "CCTV" },
  { href: "/for-isps", label: "For ISPs" },
  { href: "/support", label: "Support" },
  { href: "/about", label: "About" },
] as const;

export const footerGroups = [
  { title: "Internet", links: [{ href: "/internet", label: "Hotspot & home internet" }, { href: "/pricing", label: "Hotspot vouchers" }, { href: "/where-we-are", label: "Where we are" }, { href: "/support", label: "Customer support" }] },
  { title: "Services", links: [{ href: "/business-institutions", label: "Business & institutions" }, { href: "/cctv", label: "CCTV installation" }, { href: "/for-isps", label: "MylesNet Managed" }, { href: "/partners", label: "Partners" }] },
  { title: "Company", links: [{ href: "/about", label: "About MylesNet" }, { href: "/advertise", label: "Advertise with us" }, { href: "/faq", label: "FAQs" }, { href: "/contact", label: "Contact" }, { href: "/terms", label: "Terms" }, { href: "/privacy", label: "Privacy" }] },
] as const;

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/mylescorptech" },
  { label: "Facebook", href: "https://www.facebook.com/mylescorptech" },
  { label: "Twitter", href: "https://www.twitter.com/mylescorptech" },
  { label: "YouTube", href: "https://www.youtube.com/@mylescorptech" },
  { label: "Instagram", href: "https://www.instagram.com/mylescorptech" },
  { label: "TikTok", href: "https://www.tiktok.com/@mylescorptech" },
] as const;

export const packages = [
  { name: "1.5 Hours", ugx: 300 },
  { name: "4 Hours", ugx: 500 },
  { name: "1 Day", ugx: 1000, featured: true },
  { name: "1 Week", ugx: 6000 },
  { name: "1 Month", ugx: 28000 },
] as const;
