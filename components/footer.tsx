import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { contact, footerGroups, phoneUrl, whatsappUrl } from "@/lib/site";

export function Footer() {
  const hasDirectContact = Boolean(contact.phone || contact.email || contact.whatsappNumber);

  return (
    <footer className="mn-footer">
      <div className="mn-footer-inner">
        <div className="mn-footer-prompt">
          <div>
            <p className="mn-footer-eyebrow">A clearer next step</p>
            <h2>Let’s talk about what you need.</h2>
            <p>Share your area and the service you have in mind. We’ll help confirm availability, requirements, and what to do next.</p>
          </div>
          <Link href="/contact" className="mn-footer-cta">Talk with MylesNet <ArrowRight aria-hidden="true" /></Link>
        </div>

        <div className={`mn-footer-grid${hasDirectContact ? " has-contact" : ""}`}>
          <div className="mn-footer-brand">
            <div className="mn-footer-logo"><Brand compact /></div>
            <p>Internet access and network services, clearly explained and planned around your needs.</p>
            <p className="mn-footer-location"><MapPin aria-hidden="true" /> Hotspot access in Tayari and Mundindi Markets</p>
          </div>

          {footerGroups.map((group) => (
            <div className="mn-footer-group" key={group.title}>
              <h2>{group.title}</h2>
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
