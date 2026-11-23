import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, Lightbulb, ShieldCheck, Sparkles, Target } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about BC Labs & Consultancy — a technology partner focused on thoughtful engineering and practical digital solutions.",
};

const values = [
  { icon: Compass, title: "Clarity", description: "We make complex technology decisions easier to understand and act on." },
  { icon: Lightbulb, title: "Curiosity", description: "We keep exploring better ways to solve problems and create useful things." },
  { icon: ShieldCheck, title: "Responsibility", description: "We value honest communication, thoughtful delivery and dependable work." },
  { icon: Sparkles, title: "Craft", description: "We care about the details — from the architecture beneath a system to the experience around it." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="ABOUT BC LABS" title="Engineering with" highlight="purpose." description="We bring business understanding and software engineering together to help organisations make meaningful progress with technology." />
      <section className="section-pad">
        <div className="container about-story-grid">
          <Reveal><span className="eyebrow">WHO WE ARE</span><h2>Technology is the tool.<br /><em>Progress is the point.</em></h2></Reveal>
          <Reveal delay={0.12} className="about-story-copy">
            <p className="large-copy">BC Labs &amp; Consultancy is a full-service technology company focused on building practical digital solutions for real organisational needs.</p>
            <p>Our work spans custom software, business systems, education technology, cloud infrastructure and technology consultancy. We look beyond individual features to understand the wider process, people and goals a solution needs to support.</p>
            <p>We work with organisations at different stages of their digital journey — from exploring an idea to improving established systems.</p>
          </Reveal>
        </div>
      </section>
      <section className="about-purpose-section section-pad">
        <div className="container purpose-grid">
          <Reveal className="purpose-card"><span className="eyebrow eyebrow-light">OUR MISSION</span><Target size={28} /><h2>Make technology work harder for people.</h2><p>Design and deliver useful, dependable digital solutions that help organisations solve problems, work better and move forward.</p></Reveal>
          <Reveal delay={0.12} className="purpose-card purpose-card-alt"><span className="eyebrow eyebrow-light">OUR VISION</span><Sparkles size={28} /><h2>A world where better ideas can go further.</h2><p>Become a trusted technology partner known for thoughtful engineering, meaningful innovation and lasting client relationships.</p></Reveal>
        </div>
      </section>
      <section className="section-pad">
        <div className="container">
          <Reveal className="section-heading-row"><div><span className="eyebrow">WHAT GUIDES US</span><h2>Principles behind<br /><em>the work.</em></h2></div><div className="section-heading-aside"><p>The way we work matters as much as what we deliver. These values shape our decisions, collaboration and standards.</p></div></Reveal>
          <div className="values-grid">{values.map((value, index) => { const Icon = value.icon; return <Reveal key={value.title} delay={index * .07} className="value-card"><Icon size={23} /><h3>{value.title}</h3><p>{value.description}</p></Reveal>; })}</div>
        </div>
      </section>
      <section className="simple-cta"><div className="container simple-cta-inner"><div><span className="eyebrow">LET&apos;S WORK TOGETHER</span><h2>Bring us the challenge.<br /><em>Let&apos;s find the way forward.</em></h2></div><Link href="/contact" className="button button-dark">Start a conversation <ArrowUpRight size={16} /></Link></div></section>
    </>
  );
}
