import type { Metadata } from "next";
import { CoverageMap } from "@/components/coverage-map";
import { ServicePage } from "@/components/service-page";

export const metadata: Metadata = { title: "Where we are", description: "See MylesNet's confirmed hotspot markets and request a check for your area." };

export default function WhereWeArePage() {
  return <>
    <section className="border-b border-net-border bg-net-surface"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8"><p className="text-sm font-bold uppercase tracking-[0.16em] text-net-primary">Coverage</p><h1 className="mt-3 max-w-4xl font-heading text-4xl font-bold tracking-tight text-net-accent sm:text-6xl">Check your exact area before making plans.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-net-neutral-600">MylesNet confirms hotspot service in Tayari Market and Mundindi Market, Busia District, Uganda. Other areas require a direct check.</p></div></section>
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8"><CoverageMap /></section>
    <ServicePage eyebrow="Area request" title="Request a coverage check." intro="Tell us where you need service and what you need it for. We will review the request and contact you with the information we can confirm." audience="A request does not mean coverage is available. Home internet, PPPoE, business links, CCTV and installations are confirmed individually." outcomes={[{ title: "Hotspot availability", description: "Check whether you are within a currently operating MylesNet market." }, { title: "Home or business request", description: "Tell us the area and service you need so the team can assess if a site visit is useful." }]} process={["Share a nearby market, town, or area name.", "Choose hotspot, home internet, business, or another service.", "Wait for the team to confirm what is currently possible."]} formTitle="Send your area request" formIntro="Share only the location and service details needed to check availability." source="coverage-request" services={["Hotspot Wi-Fi", "Home internet", "PPPoE", "Business or institution", "CCTV or installation", "Other"]} />
  </>;
}
