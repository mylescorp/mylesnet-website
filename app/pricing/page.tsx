import type { Metadata } from "next";
import { CreditCard, MapPin } from "lucide-react";
import { PricingCards } from "@/components/pricing-cards";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = { title: "Voucher pricing", description: "Simple MylesNet WiFi voucher prices in UGX, with approximate KSh estimates updated periodically." };

export default function PricingPage() {
  return <><section className="bg-net-surface px-5 py-16 sm:py-24"><div className="mx-auto max-w-6xl"><SectionHeading eyebrow="Voucher pricing" title="Pay for the time you need." description="All official prices are in UGX and are paid in person by cash or Airtel Money. KSh amounts are estimates, updated periodically." /></div></section><section className="mx-auto max-w-6xl px-5 py-16 sm:py-24"><PricingCards /><div className="mt-12 grid gap-5 md:grid-cols-2"><div className="rounded-3xl border border-net-border bg-net-surface p-6"><CreditCard className="size-8 text-net-primary" aria-hidden="true" /><h2 className="mt-4 font-heading text-xl font-bold text-net-accent">Pay in person</h2><p className="mt-2 leading-7 text-net-neutral-600">There is no online payment. Buy your voucher from MylesNet using cash or Airtel Money.</p></div><div className="rounded-3xl border border-net-border bg-net-surface p-6"><MapPin className="size-8 text-net-primary" aria-hidden="true" /><h2 className="mt-4 font-heading text-xl font-bold text-net-accent">Check availability</h2><p className="mt-2 leading-7 text-net-neutral-600">Contact MylesNet before you travel to confirm current availability and get help choosing a voucher.</p></div></div></section></>;
}
