import type { Metadata } from "next";
import { CoverageMap } from "@/components/coverage-map";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = { title: "Availability", description: "Contact MylesNet to confirm current WiFi availability, voucher guidance, and direct support." };

export default function CoveragePage() {
  return <><section className="bg-net-surface px-5 py-16 sm:py-24"><div className="mx-auto max-w-6xl"><SectionHeading eyebrow="Availability" title="Reliable access starts with clear information." description="Contact MylesNet to confirm current service availability and get the support you need before you travel." /></div></section><section className="mx-auto max-w-6xl px-5 py-16 sm:py-24"><CoverageMap /></section><section className="bg-net-neutral-50 px-5 py-16 sm:py-24"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr]"><SectionHeading eyebrow="Request availability" title="Want MylesNet where you are?" description="Tell us your city or area, and our team will respond with the most relevant availability information." /><ContactForm source="coverage-request" serviceOptions={["Hotspot Wi-Fi", "Home internet", "PPPoE", "Business or institution", "CCTV or installation", "Other"]} /></div></section></>;
}
