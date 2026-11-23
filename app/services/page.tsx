import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import ServiceViz from "@/components/service-viz";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore BC Labs services: custom software, Odoo and ERP, education technology, cloud and DevOps, integrations and technology consultancy.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="OUR SERVICES" title="The right technology," highlight="thoughtfully engineered." description="From custom applications to business-critical systems, we bring the skills and perspective to turn complex challenges into practical digital solutions." />
      <section className="services-catalog-section section-pad">
        <div className="container">
          <Reveal className="section-heading-row">
            <div>
              <span className="eyebrow">OUR CAPABILITIES</span>
              <h2>Six capabilities.<br /><em>One connected partner.</em></h2>
            </div>
            <div className="section-heading-aside">
              <p>Each service has its own character, but the best solutions often combine several disciplines. Explore what each capability can do for your organisation.</p>
            </div>
          </Reveal>
          <div className="services-catalog">
            {services.map((service, index) => (
              <Reveal
                key={service.slug}
                delay={index * 0.04}
                className={`service-feature ${index % 2 === 1 ? "service-feature-reverse" : ""}`}
              >
                <div className="service-feature-copy">
                  <span className="eyebrow">{service.number} / {service.title}</span>
                  <h2>{service.headline}</h2>
                  <p className="service-feature-lede">{service.description}</p>
                  <div className="service-feature-columns">
                    <div>
                      <h3>Problems we solve</h3>
                      <ul className="service-bullet-list">
                        {service.problems.map((problem) => (
                          <li key={problem}><span className="service-bullet-dot" />{problem}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3>What you gain</h3>
                      <ul className="service-bullet-list service-bullet-benefits">
                        {service.benefits.map((benefit) => (
                          <li key={benefit}><Check size={15} />{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="service-feature-includes">
                    <span>WHAT&apos;S INCLUDED</span>
                    <div className="service-tags">
                      {service.includes.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                  <Link href={`/contact?service=${service.slug}`} className="button button-dark service-feature-cta">
                    Discuss this service <ArrowUpRight size={16} />
                  </Link>
                </div>
                <div className="service-feature-visual">
                  <ServiceViz slug={service.slug} icon={service.icon} title={service.title} tall />
                  <div className="service-feature-caption">
                    <span>BC LABS / {service.number}</span>
                    <span>INTERACTIVE 3D VISUAL</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="services-outcome section-pad">
        <div className="container outcome-grid">
          <Reveal>
            <span className="eyebrow eyebrow-light">WHAT TO EXPECT</span>
            <h2>Start with the<br /><em>outcome in mind.</em></h2>
            <p>Every engagement starts by understanding what success should look like for your organisation.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="outcome-points">
              {[
                "A clearer picture of the problem and desired outcome",
                "A solution shaped around your actual requirements",
                "A practical plan for delivery and future improvement",
              ].map((item) => <div key={item}><Check size={18} /><span>{item}</span></div>)}
            </div>
            <Link href="/contact" className="button button-white">Discuss your requirements <ArrowUpRight size={16} /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
