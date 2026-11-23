import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Code2, Database, GraduationCap, Workflow } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Explore the engineering capabilities and project areas BC Labs brings to business technology, software and digital transformation.",
};

const capabilities = [
  { label: "Business systems", detail: "ERP workflows, process improvements and connected operational tools.", icon: Database, code: "SYSTEMS / 01" },
  { label: "Education platforms", detail: "Digital administration and academic workflows for education providers.", icon: GraduationCap, code: "EDTECH / 02" },
  { label: "Custom applications", detail: "Web applications and software shaped around specific organisational needs.", icon: Code2, code: "SOFTWARE / 03" },
  { label: "Integrated workflows", detail: "APIs, automation and data exchange between the tools teams rely on.", icon: Workflow, code: "INTEGRATION / 04" },
];

export default function WorkPage() {
  return (
    <>
      <PageIntro eyebrow="OUR WORK" title="Engineering ideas" highlight="into impact." description="The best way to understand what technology can do is to see how it solves a real problem. We are building out our public project portfolio; in the meantime, explore the capability areas we bring to client engagements." />
      <section className="section-pad"><div className="container">
        <Reveal className="section-heading-row"><div><span className="eyebrow">CAPABILITY SHOWCASE</span><h2>Where our work<br /><em>takes shape.</em></h2></div><div className="section-heading-aside"><p>Our project stories will be added as client work is approved for public sharing. We do not publish confidential information or unverified results.</p></div></Reveal>
        <div className="capability-work-grid">{capabilities.map((item, index) => { const Icon = item.icon; return <Reveal key={item.code} delay={index * .07} className="capability-work-card"><div className="capability-work-top"><span>{item.code}</span><Icon size={24} /></div><h3>{item.label}</h3><p>{item.detail}</p><span className="capability-work-index">0{index + 1}</span></Reveal>; })}</div>
      </div></section>
      <section className="work-note"><div className="container work-note-inner"><span className="eyebrow eyebrow-light">HAVE A PROJECT IN MIND?</span><h2>Let&apos;s make your next<br />success story.</h2><p>Tell us about your goals and the challenge you want to solve.</p><Link href="/contact" className="button button-white">Discuss a project <ArrowUpRight size={16} /></Link></div></section>
    </>
  );
}
