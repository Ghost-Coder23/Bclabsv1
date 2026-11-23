import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Code2, Database, GraduationCap, Workflow } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { getPublishedContent } from "@/lib/site-content";

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

export default async function WorkPage() {
  const projects = await getPublishedContent("project");

  return (
    <>
      <PageIntro eyebrow="OUR WORK" title="Engineering ideas" highlight="into impact." description="Explore the project stories BC Labs has approved for public sharing, and the capability areas we bring to client engagements." />
      {projects.length > 0 && <section className="section-pad"><div className="container"><Reveal className="section-heading-row"><div><span className="eyebrow">PUBLISHED PROJECTS</span><h2>Selected work.<br /><em>Real-world context.</em></h2></div><div className="section-heading-aside"><p>Project details are shared with permission and focus on the problem, approach and outcome.</p></div></Reveal><div className="published-content-grid">{projects.map((item) => <Link className="published-content-card" href={"/work/" + item.slug} key={item.id}><span>{item.category || "PROJECT STORY"}</span><h3>{item.title}</h3><p>{item.summary}</p><strong>Read project story <ArrowUpRight size={14} /></strong></Link>)}</div></div></section>}
      <section className="section-pad"><div className="container">
        <Reveal className="section-heading-row"><div><span className="eyebrow">CAPABILITY SHOWCASE</span><h2>Where our work<br /><em>takes shape.</em></h2></div><div className="section-heading-aside"><p>We share project stories only when the work is approved for public release. We do not publish confidential information or unverified results.</p></div></Reveal>
        <div className="capability-work-grid">{capabilities.map((item, index) => { const Icon = item.icon; return <Reveal key={item.code} delay={index * .07} className="capability-work-card"><div className="capability-work-top"><span>{item.code}</span><Icon size={24} /></div><h3>{item.label}</h3><p>{item.detail}</p><span className="capability-work-index">0{index + 1}</span></Reveal>; })}</div>
      </div></section>
      <section className="work-note"><div className="container work-note-inner"><span className="eyebrow eyebrow-light">HAVE A PROJECT IN MIND?</span><h2>Let&apos;s make your next<br />success story.</h2><p>Tell us about your goals and the challenge you want to solve.</p><Link href="/contact" className="button button-white">Discuss a project <ArrowUpRight size={16} /></Link></div></section>
    </>
  );
}
