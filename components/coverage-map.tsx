import { CircleCheck, MessageCircle } from "lucide-react";
import Link from "next/link";

export function CoverageMap() {
  return <div className="rounded-3xl border border-net-border bg-net-surface p-6 sm:p-8"><div className="grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center"><CircleCheck className="size-10 text-net-primary" aria-hidden="true" /><div><h3 className="font-heading text-xl font-bold text-net-accent">Check availability before you travel</h3><p className="mt-2 max-w-2xl leading-7 text-net-neutral-600">Service availability can vary. Contact MylesNet for current coverage details, voucher guidance, and support.</p></div><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-net-primary px-5 py-3 font-bold text-white hover:bg-net-primary-dark"><MessageCircle className="size-4" aria-hidden="true" /> Contact us</Link></div></div>;
}
