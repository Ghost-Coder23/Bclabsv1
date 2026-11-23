import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Code2, Layers3, GraduationCap, Cloud, Workflow, Compass, Check } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore BC Labs services: custom software, Odoo and ERP, education technology, cloud and DevOps, integrations and technology consultancy.",
};

const iconMap = { code: Code2, layers: Layers3, graduation: GraduationCap, cloud: Cloud, workflow: Workflow, compass: Compass };

const outcomes = [
  "A clearer picture of the problem and desired outcome",
  "A solution shaped around your actual requirements",
  "A practical plan for delivery and future improvement",
];

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="OUR SERVICES" title="The right technology," highlight="thoughtfully engineered." description="From custom applications to business-critical systems, we bring the skills and perspective to turn complex challenges into practical digital solutions." />
      <section className="section-pad">
        <div className="container">
          <Reveal className="section-heading-row"><div><span className="eyebrow">OUR CAPABILITIES</span><h2>One partner.<br /><em>Connected expertise.</em></h2></div><div className="section-heading-aside"><p>Choose a capability to explore how we can help. Many projects bring several of these disciplines together.</p></div></Reveal>
          <div className="service-detail-list">{services.map((service, index) => { const Icon = iconMap[service.icon as keyof typeof iconMap]; return <Reveal key={service.number} delay={index * .04} className="service-detail">
            <div className="service-detail-number">{service.number}</div>
            <div className="service-detail-icon"><Icon size={23} /></div>
            <div className="service-detail-copy"><h2>{service.title}</h2><p>{service.description}</p><div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            <Link href="/contact" className="round-link" aria-label={`Enquire about ${service.title}`}><ArrowUpRight size={19} /></Link>
          </Reveal>; })}</div>
        </div>
      </section>
      <section className="services-outcome section-pad"><div className="container outcome-grid"><Reveal><span className="eyebrow eyebrow-light">WHAT TO EXPECT</span><h2>Start with the<br /><em>outcome in mind.</em></h2><p>Every engagement starts by understanding what success should look like for your organisation.</p></Reveal><Reveal delay={.1}><div className="outcome-points">{outcomes.map((item) => <div key={item}><Check size={18} /><span>{item}</span></div>)}</div><Link href="/contact" className="button button-white">Discuss your requirements <ArrowUpRight size={16} /></Link></Reveal></div></section>
    </>
  );
}
