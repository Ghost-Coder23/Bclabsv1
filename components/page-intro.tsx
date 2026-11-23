import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
};

export function PageIntro({ eyebrow, title, highlight, description }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="page-intro-grid" />
      <div className="container page-intro-inner">
        <span className="eyebrow eyebrow-light">{eyebrow}</span>
        <h1>{title}{highlight && <> <span>{highlight}</span></>}</h1>
        <p>{description}</p>
        <Link href="/contact" className="button button-white">Start a conversation <ArrowUpRight size={17} /></Link>
      </div>
    </section>
  );
}
