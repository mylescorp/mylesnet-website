import Link from "next/link";
import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import { ContactForm, type ContactSource } from "@/components/contact-form";
import { phoneUrl, whatsappUrl } from "@/lib/site";

type ServicePageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  audience: string;
  outcomes: { title: string; description: string }[];
  process: string[];
  caveat?: string;
  formTitle: string;
  formIntro: string;
  source: ContactSource;
  services: string[];
  showOrganization?: boolean;
  showTimeline?: boolean;
};

export function ServicePage({ eyebrow, title, intro, audience, outcomes, process, caveat, formTitle, formIntro, source, services, showOrganization, showTimeline }: ServicePageProps) {
  return <>
    <section className="border-b border-net-border bg-net-surface"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8"><p className="text-sm font-bold uppercase tracking-[0.16em] text-net-accent">{eyebrow}</p><h1 className="mt-3 max-w-4xl font-heading text-4xl font-bold tracking-tight text-net-accent sm:text-6xl">{title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-net-neutral-600">{intro}</p><p className="mt-5 max-w-3xl text-sm leading-6 text-net-neutral-600">{audience}</p><div className="mt-7 flex flex-wrap gap-3"><a href="#enquiry" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-net-primary px-5 py-3 font-bold text-net-on-action hover:bg-net-primary-dark">Request a conversation <ArrowRight className="size-4" /></a><a href={whatsappUrl} className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-net-border bg-net-neutral-50 px-5 py-3 font-bold text-net-accent hover:bg-net-neutral-50"><MessageCircle className="size-4 text-net-accent-teal" />WhatsApp</a></div>{caveat ? <p className="mt-6 max-w-3xl border-l-2 border-net-orange pl-4 text-sm leading-6 text-net-neutral-600">{caveat}</p> : null}</div></section>
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{outcomes.map((item, index) => <article key={item.title} className="rounded-2xl border border-net-border bg-net-neutral-50 p-6"><span className="flex size-10 items-center justify-center rounded-full bg-net-surface font-heading font-bold text-net-accent">0{index + 1}</span><h2 className="mt-5 font-heading text-xl font-bold text-net-accent">{item.title}</h2><p className="mt-2 leading-7 text-net-neutral-600">{item.description}</p></article>)}</div></section>
    <section className="border-y border-net-border bg-net-surface"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-net-accent">How we start</p><h2 className="mt-3 font-heading text-3xl font-bold text-net-accent">A clear process, starting with your requirements.</h2><p className="mt-4 leading-7 text-net-neutral-600">We confirm the area, intended use, and site requirements before recommending a solution or price.</p></div><ol className="grid gap-3 sm:grid-cols-3">{process.map((step, index) => <li key={step} className="rounded-xl border border-net-border bg-net-neutral-50 p-5"><span className="text-xs font-bold text-net-accent">STEP 0{index + 1}</span><p className="mt-3 font-semibold leading-6 text-net-accent">{step}</p></li>)}</ol></div></div></section>
    <section id="enquiry" className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[.85fr_1.15fr] lg:px-8"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-net-accent">Make an enquiry</p><h2 className="mt-3 font-heading text-3xl font-bold text-net-accent">{formTitle}</h2><p className="mt-4 leading-7 text-net-neutral-600">{formIntro}</p><div className="mt-6 grid gap-3 text-sm"><p className="flex items-center gap-2 text-net-neutral-600"><Check className="size-4 text-net-accent-teal" />We will review the area and details you provide.</p><p className="flex items-center gap-2 text-net-neutral-600"><Check className="size-4 text-net-accent-teal" />We will contact you using the details you share.</p><a href={phoneUrl} className="mt-3 inline-flex min-h-12 items-center gap-2 font-bold text-net-accent"><Phone className="size-4" />Call MylesNet</a></div><Link href="/privacy" className="mt-5 inline-block text-sm text-net-neutral-600 underline hover:text-net-accent">Read how we handle enquiry details</Link></div><ContactForm source={source} serviceOptions={services} showOrganization={showOrganization} showTimeline={showTimeline} /></section>
  </>;
}
