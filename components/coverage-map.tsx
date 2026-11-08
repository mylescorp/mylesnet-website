import { CircleCheck, MapPin } from "lucide-react";

const markets = ["Tayari Market", "Mundindi Market"] as const;

export function CoverageMap() {
  return <div className="grid gap-5 md:grid-cols-2">
    {markets.map((market) => <article key={market} className="flex gap-4 rounded-2xl border border-net-border bg-net-neutral-50 p-6 sm:p-7"><span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-net-surface text-net-accent-teal"><CircleCheck className="size-6" aria-hidden="true" /></span><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-net-accent-teal">Confirmed hotspot coverage</p><h2 className="mt-2 font-heading text-xl font-bold text-net-accent">{market}</h2><p className="mt-2 leading-6 text-net-neutral-600">Busia District, Uganda. Ask our team for current availability at your exact location within the market.</p></div></article>)}
    <div className="rounded-2xl border border-dashed border-net-border bg-net-surface p-6 md:col-span-2 sm:p-7"><div className="flex gap-4"><MapPin className="mt-1 size-6 shrink-0 text-net-primary" aria-hidden="true" /><div><h2 className="font-heading text-lg font-bold text-net-accent">Outside these markets?</h2><p className="mt-2 max-w-3xl leading-7 text-net-neutral-600">We will check your area and service requirements. We cannot confirm home internet, PPPoE, CCTV, or installation availability without a service and site review.</p></div></div></div>
  </div>;
}
