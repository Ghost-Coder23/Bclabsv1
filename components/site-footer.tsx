import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { siteConfig, services } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div>
          <span className="eyebrow eyebrow-light">THE NEXT STEP STARTS HERE</span>
          <h2>Let&apos;s build what<br /><span>comes next.</span></h2>
        </div>
        <Link href="/contact" className="button button-white">
          Start a conversation <ArrowUpRight size={17} />
        </Link>
        <div className="footer-orbit" aria-hidden="true" />
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <BrandMark light />
          <p>Technology without boundaries. Thoughtful engineering for ambitious organisations.</p>
          <span className="footer-location">Working across Africa and beyond.</span>
        </div>
        <div className="footer-column">
          <h3>Explore</h3>
          {siteConfig.navigation.slice(1).map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </div>
        <div className="footer-column">
          <h3>Capabilities</h3>
          {services.slice(0, 5).map((service) => (
            <Link href="/services" key={service.title}>{service.title}</Link>
          ))}
        </div>
        <div className="footer-column footer-contact">
          <h3>Start a project</h3>
          <p>Have a challenge, an idea or a project in mind? Tell us what you&apos;re working towards.</p>
          <Link href="/contact" className="footer-text-link">Talk to BC Labs <MoveUpRight size={15} /></Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} BC Labs &amp; Consultancy. All rights reserved.</span>
        <span>Technology Without Boundaries.</span>
        <Link href="/contact">Get in touch <ArrowUpRight size={13} /></Link>
      </div>
    </footer>
  );
}
