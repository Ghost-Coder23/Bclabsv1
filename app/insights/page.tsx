import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Lightbulb, Radio } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Insights",
  description: "Ideas and practical perspectives on software engineering, ERP, education technology and digital transformation from BC Labs.",
};

const topics = [
  { icon: BookOpen, category: "BUSINESS TECHNOLOGY", title: "Making better decisions about business systems", description: "How to think about processes, people and platforms before choosing software." },
  { icon: Lightbulb, category: "SOFTWARE ENGINEERING", title: "When custom software makes sense", description: "A practical look at the signals that a tailored application may be the right investment." },
  { icon: Radio, category: "DIGITAL TRANSFORMATION", title: "Moving from disconnected tools to connected workflows", description: "Why integration and good information flow matter to everyday operations." },
];

export default function InsightsPage() {
  return (
    <>
      <PageIntro eyebrow="INSIGHTS & IDEAS" title="Ideas for a more" highlight="connected future." description="Practical perspectives on software, business technology and the decisions that help organisations make meaningful progress." />
      <section className="section-pad"><div className="container">
        <Reveal className="section-heading-row"><div><span className="eyebrow">TOPICS WE EXPLORE</span><h2>Useful thinking.<br /><em>Real-world context.</em></h2></div><div className="section-heading-aside"><p>Our editorial library is being prepared. These are the themes we will be exploring — not published articles or client case studies.</p></div></Reveal>
        <div className="insights-grid">{topics.map((item, index) => { const Icon = item.icon; return <Reveal key={item.title} delay={index * .08} className="insight-card"><span className="insight-icon"><Icon size={22} /></span><span className="eyebrow">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p><span className="insight-coming">EDITORIAL TOPIC / COMING SOON</span></Reveal>; })}</div>
        <div className="insights-contact"><p>Have a question or a topic you would like us to explore?</p><Link href="/contact" className="text-link">Share it with BC Labs <ArrowUpRight size={16} /></Link></div>
      </div></section>
    </>
  );
}
