import type { Metadata } from "next";
import { ArrowRight, Building2, Camera, Check, Home, MapPin, Network, ShieldCheck, Wifi } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Internet, installations and network services",
  description: "MylesNet provides hotspot access, connectivity installations, CCTV, and network services. Check coverage or request a survey.",
};

const services = [
  { icon: Wifi, number: "01", title: "Hotspot internet", text: "Straightforward WiFi access, with clear voucher pricing and in-person payment.", href: "/internet", action: "Explore internet" },
  { icon: Building2, number: "02", title: "Business & institutions", text: "Plan WiFi and wired connectivity around your workplace, school, or facility.", href: "/business-institutions", action: "Plan a site visit" },
  { icon: Camera, number: "03", title: "CCTV installation", text: "Talk through camera placement, recording, cabling, and your property needs.", href: "/cctv", action: "Explore CCTV" },
  { icon: ShieldCheck, number: "04", title: "Network services", text: "Discuss managed network support and service options for internet providers.", href: "/for-isps", action: "Explore network services" },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="mn-home-hero">
        <div className="mn-home-hero-inner">
          <div className="mn-home-copy">
            <p className="mn-home-eyebrow"><span aria-hidden="true" /> Local connectivity & installation</p>
            <h1>Good connections <span>start here.</span></h1>
            <p className="mn-home-intro">From market WiFi to planned home and business installations, get clear advice on what fits your place and what to do next.</p>
            <div className="mn-home-actions">
              <Link href="/internet" className="mn-button-primary">Explore internet <ArrowRight aria-hidden="true" /></Link>
              <Link href="/where-we-are" className="mn-button-secondary"><MapPin aria-hidden="true" /> Check coverage</Link>
            </div>
            <p className="mn-home-caption">Local service information, with availability confirmed for your area.</p>
          </div>

          <div className="mn-connection-card" aria-label="MylesNet connects homes, businesses, and communities">
            <div className="mn-connection-card-top"><span>MADE FOR YOUR CONNECTION</span><span className="mn-live-dot" aria-hidden="true" /></div>
            <div className="mn-connection-art" aria-hidden="true">
              <div className="mn-orbit mn-orbit-one" />
              <div className="mn-orbit mn-orbit-two" />
              <div className="mn-orbit mn-orbit-three" />
              <div className="mn-link-line mn-link-home" />
              <div className="mn-link-line mn-link-business" />
              <div className="mn-link-line mn-link-community" />
              <span className="mn-connection-node mn-node-home"><Home /></span>
              <span className="mn-connection-node mn-node-business"><Building2 /></span>
              <span className="mn-connection-node mn-node-community"><Wifi /></span>
              <span className="mn-connection-center"><Wifi /></span>
            </div>
            <div className="mn-connection-card-bottom"><div><span>One local network</span><strong>Connecting communities, one mile at a time.</strong></div><Network aria-hidden="true" /></div>
          </div>

          <div className="mn-home-proof" aria-label="MylesNet service details">
            <div><span className="mn-proof-icon"><MapPin aria-hidden="true" /></span><span><small>HOTSPOT MARKETS</small><strong>Tayari & Mundindi</strong></span></div>
            <div><span className="mn-proof-icon"><Check aria-hidden="true" /></span><span><small>VOUCHER PAYMENT</small><strong>In person, in UGX</strong></span></div>
            <div><span className="mn-proof-icon"><Network aria-hidden="true" /></span><span><small>INSTALLATIONS</small><strong>Planned around your site</strong></span></div>
          </div>
        </div>
      </section>

      <section className="mn-home-services" aria-labelledby="home-services-heading">
        <div className="mn-home-section-head">
          <div><p className="mn-section-eyebrow">HOW WE CAN HELP</p><h2 id="home-services-heading">One place to start.<br /><span>Clear paths to what you need.</span></h2></div>
          <p>Choose a service to see how it works. We’ll confirm availability, requirements, and the next step with you.</p>
        </div>
        <div className="mn-service-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return <Link key={service.href} href={service.href} className="mn-service-card">
              <div className="mn-service-card-top"><span className="mn-service-icon"><Icon aria-hidden="true" /></span><span className="mn-service-number">{service.number}</span></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="mn-service-link">{service.action}<span aria-hidden="true"><ArrowRight /></span></span>
            </Link>;
          })}
        </div>
      </section>

      <section className="mn-home-coverage">
        <div className="mn-coverage-inner">
          <div className="mn-coverage-copy">
            <p className="mn-section-eyebrow">CHECK AVAILABILITY</p>
            <h2>Start with your area.<br /><span>We’ll help with the rest.</span></h2>
            <p>Hotspot access is currently confirmed in Tayari Market and Mundindi Market. Other locations and installation services need an area or site check first.</p>
            <Link href="/where-we-are" className="mn-button-primary">See coverage details <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="mn-coverage-panel">
            <div className="mn-coverage-panel-head"><span className="mn-coverage-pin"><MapPin aria-hidden="true" /></span><div><small>CONFIRMED HOTSPOT MARKETS</small><strong>Busia District, Uganda</strong></div></div>
            <div className="mn-market-row"><span><span className="mn-market-dot" />Tayari Market</span><span className="mn-market-status">Hotspot access</span></div>
            <div className="mn-market-row"><span><span className="mn-market-dot" />Mundindi Market</span><span className="mn-market-status">Hotspot access</span></div>
            <p>For home internet, installations, and other areas, availability is confirmed after a conversation or site review.</p>
          </div>
        </div>
      </section>

      <section className="mn-home-next-step" aria-labelledby="mn-next-step-heading">
        <div className="mn-next-step-heading"><p className="mn-section-eyebrow">A SIMPLE WAY FORWARD</p><h2 id="mn-next-step-heading">From your first question to a clear next step.</h2></div>
        <div className="mn-next-steps">
          <div><span>01</span><strong>Choose what you need</strong><p>Explore internet, installation, security, or network services.</p></div>
          <div><span>02</span><strong>Share your area</strong><p>Tell us where you are and what you want to connect.</p></div>
          <div><span>03</span><strong>Confirm the plan</strong><p>Check availability, requirements, and next steps with MylesNet.</p></div>
        </div>
        <Link href="/faq" className="mn-next-faq">Browse common questions <ArrowRight aria-hidden="true" /></Link>
      </section>
    </>
  );
}
