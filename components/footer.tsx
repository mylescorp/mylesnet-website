import { ArrowRight, Mail, MapPin, MessageCircle, Phone, Wifi } from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { contact, footerGroups, phoneUrl, whatsappUrl } from "@/lib/site";

const footerHeadings: Record<(typeof footerGroups)[number]["title"], string> = {
  Internet: "Get online",
  Services: "Plan a service",
  Company: "About MylesNet",
};

export function Footer() {
  const hasDirectContact = Boolean(contact.phone || contact.email || contact.whatsappNumber);

  return (
    <footer className="mn-footer">
      <div className="mn-footer-inner">
        <div className="mn-footer-prompt">
          <div>
            <p className="mn-footer-eyebrow">MYLESNET · LOCAL CONNECTIVITY</p>
            <h2>Connecting communities,<br />one mile at a time.</h2>
            <p>Hotspot Wi-Fi is currently confirmed in Tayari and Mundindi Markets. Home, business, installation, and network services start with an area or site check.</p>
            <div className="mn-footer-service-line">
              <span><Wifi aria-hidden="true" />Hotspot Wi-Fi</span>
              <span><MapPin aria-hidden="true" />Tayari · Mundindi</span>
              <span>Vouchers in UGX, paid in person</span>
            </div>
          </div>
          <div className="mn-footer-prompt-actions">
            <Link href="/where-we-are" className="mn-footer-cta">Check your area <ArrowRight aria-hidden="true" /></Link>
            <Link href="/contact" className="mn-footer-contact-link">Ask about a service</Link>
          </div>
        </div>

        <div className={`mn-footer-grid${hasDirectContact ? " has-contact" : ""}`}>
          <div className="mn-footer-brand">
            <div className="mn-footer-logo"><Brand compact /></div>
            <p>From marketplace Wi-Fi to site-planned links and installations, each request starts with a direct availability check.</p>
          </div>

          {footerGroups.map((group) => (
            <div className="mn-footer-group" key={group.title}>
              <h2>{footerHeadings[group.title]}</h2>
              <ul>{group.links.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
            </div>
          ))}

          {hasDirectContact ? <div className="mn-footer-group mn-footer-contact">
            <h2>Talk to us</h2>
            <ul>
              {contact.phone ? <li><a href={phoneUrl}><Phone aria-hidden="true" />Call {contact.phone}</a></li> : null}
              {contact.email ? <li><a href={`mailto:${contact.email}`}><Mail aria-hidden="true" />Email MylesNet</a></li> : null}
              {contact.whatsappNumber ? <li><a href={whatsappUrl}><MessageCircle aria-hidden="true" />WhatsApp MylesNet</a></li> : null}
            </ul>
          </div> : null}
        </div>

        <div className="mn-footer-bottom">
          <span>© {new Date().getFullYear()} <a href="https://mylescorptech.com/" target="_blank" rel="noopener noreferrer">MylesCorp Technologies Ltd</a>. All rights reserved.</span>
          <div><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link></div>
        </div>
      </div>
    </footer>
  );
}
