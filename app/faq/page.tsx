import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Frequently asked questions", description: "Plain answers to common questions about MylesNet WiFi, vouchers, coverage, and privacy." };

const faqs = [
  ["Do I need to pay online?", "No. MylesNet vouchers are paid for in person by cash or Airtel Money. There is no online checkout on this website, so you can get help from a local MylesNet point before you pay."],
  ["Is there a WiFi password?", "No password is needed to join the MylesNet network. Connect to MylesNet, then enter the voucher code you receive after payment."],
  ["What if my connection is weak or keeps dropping?", "Reconnect to MylesNet first. If the issue continues, contact us on WhatsApp or by phone so we can help check what is happening."],
  ["How can I check availability?", "Send us your city or area before you travel. We will share the most current availability information we can confirm."],
  ["Is my information safe when I use MylesNet?", "This website only uses the details you provide to respond to your message or coverage request. We do not ask for login details or take online payments here. Use normal care with your device and do not share voucher codes with people you do not trust."],
] as const;

export default function FaqPage() {
  return <><section className="bg-net-surface px-5 py-16 sm:py-24"><div className="mx-auto max-w-6xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-net-primary">FAQ</p><h1 className="mt-3 font-heading text-4xl font-bold text-net-accent sm:text-5xl">Straight answers about MylesNet.</h1></div></section><section className="mx-auto max-w-4xl px-5 py-16 sm:py-24"><div className="space-y-4">{faqs.map(([question, answer]) => <details key={question} className="group rounded-2xl border border-net-border bg-white p-5"><summary className="cursor-pointer list-none font-heading text-lg font-bold text-net-accent">{question}<span className="float-right text-net-primary group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl leading-7 text-net-neutral-600">{answer}</p></details>)}</div><p className="mt-10 text-center text-net-neutral-600">Still have a question? <Link href="/contact" className="font-bold text-net-primary hover:text-net-primary-dark">Contact MylesNet</Link>.</p></section></>;
}
