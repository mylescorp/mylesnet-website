"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { packages } from "@/lib/site";

type RateResponse = { ugxPerKes: number; isFallback: boolean };
type Currency = "UGX" | "KES";

function formatAmount(ugx: number, currency: Currency, rate: number | null) {
  if (currency === "UGX" || !rate) return `${ugx.toLocaleString("en-UG")} UGX`;
  return `KSh ${Math.round(ugx / rate).toLocaleString("en-KE")}`;
}

export function PricingCards({ limit }: { limit?: number }) {
  const [currency, setCurrency] = useState<Currency>("UGX");
  const [rate, setRate] = useState<RateResponse | null>(null);
  const visiblePackages = limit ? packages.filter((entry) => entry.name === "4 Hours" || entry.name === "1 Day" || entry.name === "1 Week") : packages;

  useEffect(() => { void fetch("/api/exchange-rate").then(async (response) => response.ok ? response.json() as Promise<RateResponse> : null).then(setRate).catch(() => setRate(null)); }, []);

  return <div>
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-net-neutral-600">Official prices are collected in UGX in person.</p><div className="rounded-full border border-net-border bg-net-neutral-50 p-1" role="group" aria-label="Pricing currency">{(["UGX", "KES"] as const).map((unit) => <button key={unit} type="button" onClick={() => setCurrency(unit)} className={`rounded-full px-4 py-2 text-sm font-bold ${currency === unit ? "bg-net-accent text-net-on-primary" : "text-net-accent hover:bg-net-surface"}`}>{unit}</button>)}</div></div>
    {currency === "KES" ? <p className="-mt-5 mb-6 text-right text-xs text-net-neutral-600">Rates updated periodically{rate?.isFallback ? "; showing a temporary estimate" : ""}.</p> : null}
    <div className={`grid gap-5 ${visiblePackages.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-5"}`}>{visiblePackages.map((item) => { const isFeatured = item.name === "1 Day"; return <article key={item.name} className={`rounded-3xl border bg-net-neutral-50 p-6 shadow-sm ${isFeatured ? "border-net-primary ring-2 ring-net-primary/20" : "border-net-border"}`}><p className="font-heading text-lg font-bold text-net-accent">{item.name}</p><p className="mt-4 text-2xl font-bold text-net-neutral-900">{formatAmount(item.ugx, currency, rate?.ugxPerKes ?? null)}</p><div className="mt-5 flex items-center gap-2 text-sm text-net-neutral-600"><Check className="size-4 text-net-success" aria-hidden="true" />Simple voucher access</div><Link href="/coverage" className="mt-7 block rounded-xl bg-net-accent px-4 py-3 text-center text-sm font-bold text-net-on-primary hover:opacity-90">Check availability</Link></article>; })}</div>
  </div>;
}
