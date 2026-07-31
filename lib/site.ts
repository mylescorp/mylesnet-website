export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const contact = {
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  airtelMoneyNumber: process.env.NEXT_PUBLIC_AIRTEL_MONEY_NUMBER ?? "",
};

export const whatsappUrl = contact.whatsappNumber
  ? `https://wa.me/${contact.whatsappNumber}`
  : "/contact";

export const phoneUrl = contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : "/contact";

export const navigation = [
  { href: "/pricing", label: "Pricing" },
  { href: "/coverage", label: "Coverage" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
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
