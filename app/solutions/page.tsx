import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Workflow, PanelsTopLeft } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { solutionAreas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Explore the solution areas BC Labs works across, from education technology and ERP workflows to custom digital platforms.",
};

const icons = [GraduationCap, Workflow, PanelsTopLeft];

export default function SolutionsPage() {
  return (
    <>
      <PageIntro eyebrow="OUR SOLUTIONS" title="Designed around" highlight="your world." description="Technology should fit the work, not force the work into a template. We shape solutions around the people, processes and outcomes that matter to your organisation." />
      <section className="section-pad"><div className="container">
        <Reveal className="section-heading-row"><div><span className="eyebrow">AREAS OF FOCUS</span><h2>Practical ideas.<br /><em>Purpose-built systems.</em></h2></div><div className="section-heading-aside"><p>These are the problem spaces and product directions where our capabilities can create meaningful value. Discuss your requirements with us to explore fit and scope.</p></div></Reveal>
        <div className="solution-list">{solutionAreas.map((item, index) => { const Icon = icons[index]; return <Reveal key={item.code} delay={index * .08} className={`solution-detail solution-detail-${item.tone}`}><div className="solution-detail-art"><div className="solution-detail-orbit" /><Icon size={46} strokeWidth={1.2} /></div><div className="solution-detail-copy"><span className="eyebrow">{item.eyebrow} / {item.code}</span><h2>{item.title}</h2><p>{item.description}</p><Link href="/contact" className="text-link">Discuss this solution <ArrowUpRight size={16} /></Link></div></Reveal>; })}</div>
      </div></section>
      <section className="simple-cta"><div className="container simple-cta-inner"><div><span className="eyebrow">HAVE SOMETHING SPECIFIC IN MIND?</span><h2>Let&apos;s shape a solution<br /><em>around your needs.</em></h2></div><Link href="/contact" className="button button-dark">Talk to our team <ArrowUpRight size={16} /></Link></div></section>
    </>
  );
}
