import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { HeroVisual } from "@/components/hero-visual";
import ServiceViz from "@/components/service-viz";
import SystemBuilder from "@/components/system-builder";
import { Reveal } from "@/components/reveal";
import { BrandMark } from "@/components/brand-mark";
import { ProductShowcase } from "@/components/product-showcase";
import { services, processSteps, solutionAreas } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-noise" />
        <div className="hero-container">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="live-dot" /> INDEPENDENT TECHNOLOGY PARTNER</div>
            <h1>We build<br />software that moves<br /><span>business forward.</span></h1>
            <p className="hero-lede">
              Custom software, Odoo ERP, school management systems and business automation — built around how your organisation works.
            </p>
            <div className="hero-actions">
              <Link href="#build" className="button button-primary">Build your solution <ArrowUpRight size={17} /></Link>
              <Link href="/services" className="button button-ghost-light">Explore our services <ArrowRight size={16} /></Link>
            </div>
            <div className="hero-proof">
              <div className="proof-mark"><BrandMark compact linked={false} light /></div>
              <div>
                <strong>Technology shaped around your business.</strong>
                <span>From the first idea to the systems that keep you moving.</span>
              </div>
            </div>
          </div>
          <HeroVisual />
        </div>
        <div className="hero-bottom container">
          <span>SOFTWARE ENGINEERING</span><i /><span>BUSINESS TECHNOLOGY</span><i /><span>DIGITAL INNOVATION</span>
          <a href="#intro" aria-label="Scroll to introduction"><ArrowDown size={17} /></a>
        </div>
      </section>

      <section className="intro-section section-pad" id="intro">
        <div className="container intro-grid">
          <Reveal>
            <span className="eyebrow">A PARTNER IN PROGRESS</span>
            <h2>Good technology<br />should make <em>work better.</em></h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="intro-copy">
              <p className="large-copy">The right technology does more than digitise a process. It gives people clarity, connects the work that matters and creates room for an organisation to grow.</p>
              <p>BC Labs brings software engineering and business thinking together to solve practical challenges — from modernising operations to creating entirely new digital products.</p>
              <Link href="/about" className="text-link">Get to know BC Labs <ArrowUpRight size={16} /></Link>
            </div>
          </Reveal>
        </div>
        <div className="container capability-strip">
          <div><span>01</span><strong>Understand the challenge</strong></div>
          <div><span>02</span><strong>Engineer the right solution</strong></div>
          <div><span>03</span><strong>Keep moving forward</strong></div>
        </div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="container">
          <Reveal className="section-heading-row">
            <div>
              <span className="eyebrow">WHAT WE DO</span>
              <h2>Technology for the<br /><em>real world.</em></h2>
            </div>
            <div className="section-heading-aside">
              <p>From a single workflow to a complete digital platform, we bring the right capabilities together around your goals.</p>
              <Link href="/services" className="text-link">Explore all services <ArrowUpRight size={16} /></Link>
            </div>
          </Reveal>
          <div className="service-grid">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.055} className="service-card-wrap">
                <Link href={`/services#${service.slug}`} className="service-card">
                  <div className="service-card-top">
                    <span>{service.number} / CAPABILITY</span>
                    <span className="service-card-indicator"><span className="live-dot" /> INTERACTIVE</span>
                  </div>
                  <ServiceViz slug={service.slug} icon={service.icon} title={service.title} />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <span className="service-arrow"><ArrowUpRight size={18} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="service-grid-note">
            <span>MOVE YOUR POINTER OVER A SERVICE VISUAL</span>
            <span>Each capability has its own 3D story</span>
          </div>
        </div>
      </section>

      <SystemBuilder />

      <ProductShowcase />

      <section className="solutions-section section-pad">
        <div className="container">
          <Reveal className="section-heading-row">
            <div>
              <span className="eyebrow eyebrow-light">SOLUTIONS THAT MAKE A DIFFERENCE</span>
              <h2>Built around the<br /><em>way you work.</em></h2>
            </div>
            <div className="section-heading-aside section-heading-aside-light">
              <p>Every organisation is different. We shape digital solutions around the people, processes and opportunities that make yours unique.</p>
              <Link href="/solutions" className="text-link text-link-light">Discover our solutions <ArrowUpRight size={16} /></Link>
            </div>
          </Reveal>
          <div className="solution-grid">
            {solutionAreas.map((solution, index) => (
              <Reveal key={solution.code} delay={index * 0.08}>
                <Link href="/solutions" className={`solution-card solution-${solution.tone}`}>
                  <div className="solution-card-top"><span>{solution.eyebrow}</span><span>{solution.code}</span></div>
                  <div className="solution-art" aria-hidden="true">
                    <div className="solution-art-ring" />
                    <div className="solution-art-core"><span>{String(index + 1).padStart(2, "0")}</span></div>
                    <div className="solution-art-lines" />
                  </div>
                  <div className="solution-card-copy">
                    <h3>{solution.title}</h3>
                    <p>{solution.description}</p>
                    <span className="solution-link">Explore solution <ArrowUpRight size={16} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="container">
          <Reveal className="section-heading-row">
            <div>
              <span className="eyebrow">HOW WE WORK</span>
              <h2>Clear thinking.<br /><em>Careful delivery.</em></h2>
            </div>
            <div className="section-heading-aside">
              <p>Good outcomes start with a shared understanding. Our process keeps the work focused, collaborative and grounded in your goals.</p>
            </div>
          </Reveal>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.08} className="process-step">
                <span className="process-number">{step.number}</span>
                <div className="process-line"><span /></div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section section-pad">
        <div className="container why-grid">
          <Reveal>
            <span className="eyebrow">WHY BC LABS</span>
            <h2>Business context.<br /><em>Engineering depth.</em></h2>
            <p className="why-lede">Technology only creates value when it works for the people and organisation behind it.</p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="why-points">
              {[
                ["Business-first thinking", "We begin with the outcome you need, not a technology looking for a problem."],
                ["Fit-for-purpose engineering", "We choose an approach that makes sense for your requirements, context and future plans."],
                ["Built for change", "We value maintainable systems that can evolve as your organisation grows."],
                ["A thoughtful partnership", "Clear communication and shared decisions stay part of the work from start to finish."],
              ].map(([title, body]) => (
                <div className="why-point" key={title}>
                  <span><Check size={16} /></span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-cta-section">
        <div className="container home-cta">
          <div className="cta-orb" aria-hidden="true" />
          <div className="cta-content">
            <span className="eyebrow eyebrow-light">YOUR NEXT CHAPTER STARTS HERE</span>
            <h2>Have a challenge?<br /><span>Let&apos;s engineer the solution.</span></h2>
            <p>Tell us what you&apos;re trying to achieve. We&apos;ll help you explore what the right technology could make possible.</p>
            <Link href="/contact" className="button button-white">Talk to BC Labs <ArrowUpRight size={17} /></Link>
          </div>
          <div className="cta-side-note">IDEAS<br />INTO IMPACT<span>BC / LABS</span></div>
        </div>
      </section>
    </>
  );
}
