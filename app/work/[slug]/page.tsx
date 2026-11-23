import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getPublishedContentBySlug } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedContentBySlug("project", slug);
  return item ? { title: item.title, description: item.summary } : { title: "Project not found" };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPublishedContentBySlug("project", slug);
  if (!item) notFound();

  return (
    <section className="content-detail-section section-pad">
      <article className="content-detail-container">
        <span className="content-detail-meta">BC LABS / PROJECT STORY{item.category ? " / " + item.category.toUpperCase() : ""}</span>
        <h1>{item.title}</h1>
        {item.summary && <p className="content-detail-summary">{item.summary}</p>}
        <div className="content-detail-body">
          {item.body.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <Link href="/work" className="content-detail-back"><ArrowLeft size={14} /> Back to Our Work</Link>
      </article>
    </section>
  );
}
