import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found-orbit" aria-hidden="true" />
      <span className="eyebrow eyebrow-light">404 / PAGE NOT FOUND</span>
      <h1>This page took<br /><span>a different route.</span></h1>
      <p>The page you are looking for may have moved, or the address may be incorrect.</p>
      <div className="not-found-actions">
        <Link href="/" className="button button-primary"><ArrowLeft size={16} /> Back to home</Link>
        <Link href="/contact" className="button button-ghost-light">Contact BC Labs <ArrowUpRight size={16} /></Link>
      </div>
    </section>
  );
}
