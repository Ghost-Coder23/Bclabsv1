import type { Metadata } from "next";
import { Globe2, MessageSquareText } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with BC Labs & Consultancy about software development, ERP, education technology, cloud and digital transformation.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="CONTACT BC LABS" title="Tell us what you" highlight="want to make possible." description="Whether you have a defined project or are still exploring an idea, start with a conversation. We would like to understand what you are trying to achieve." />
      <section className="section-pad contact-section"><div className="container contact-grid">
        <Reveal className="contact-aside"><span className="eyebrow">START A CONVERSATION</span><h2>Good projects<br />start with <em>a question.</em></h2><p>Share a little about your organisation, the challenge you are facing and what a better outcome could look like.</p>
          <div className="contact-info-card"><span><MessageSquareText size={19} /></span><div><strong>Project enquiries</strong><p>Use the form to tell us about your requirements and the service area you are interested in.</p></div></div>
          <div className="contact-info-card"><span><Globe2 size={19} /></span><div><strong>A global outlook</strong><p>BC Labs works towards serving clients across Africa and international markets.</p></div></div>
          <div className="contact-aside-note">Not sure which service fits? Choose “Not sure yet” in the form. We can start by understanding the problem.</div>
        </Reveal>
        <Reveal delay={.12} className="contact-form-panel"><div className="contact-form-heading"><span className="eyebrow">PROJECT ENQUIRY</span><h2>Let&apos;s talk.</h2><p>Fields marked with * are required.</p></div><ContactForm /></Reveal>
      </div></section>
    </>
  );
}
