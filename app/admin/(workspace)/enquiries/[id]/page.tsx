import Link from "next/link";
import { ArrowLeft, Building2, Globe2, Mail, Package, UserRound } from "lucide-react";
import { notFound } from "next/navigation";
import { EnquiryEditor } from "@/components/admin/enquiry-editor";
import { formatEnquiryDate, statusLabel, type Enquiry } from "@/lib/admin/enquiries";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type EnquiryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEnquiryDetailPage({ params }: EnquiryPageProps) {
  const { id } = await params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) notFound();

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  const enquiry = data as unknown as Enquiry;

  return (
    <>
      <Link href="/admin/enquiries" className="admin-back-link"><ArrowLeft size={15} /> Back to enquiries</Link>
      <div className="admin-page-heading admin-detail-heading">
        <div>
          <span className="admin-eyebrow">ENQUIRY / {enquiry.id.slice(0, 8).toUpperCase()}</span>
          <h1>{enquiry.name}</h1>
          <p>Received {formatEnquiryDate(enquiry.created_at)}</p>
        </div>
        <span className={"admin-status admin-status-large admin-status-" + enquiry.status}>{statusLabel(enquiry.status)}</span>
      </div>

      <div className="admin-detail-grid">
        <div className="admin-detail-main">
          <section className="admin-panel admin-message-panel">
            <div className="admin-panel-heading"><div><span className="admin-eyebrow">PROJECT BRIEF</span><h2>What they need</h2></div></div>
            <p className="admin-enquiry-message">{enquiry.message}</p>
            {enquiry.selected_modules?.length > 0 && (
              <div className="admin-module-list">
                <span>SELECTED SYSTEM MODULES</span>
                <div>{enquiry.selected_modules.map((module) => <span key={module}><Package size={13} /> {module.replaceAll("-", " ")}</span>)}</div>
              </div>
            )}
          </section>
          <section className="admin-panel">
            <div className="admin-panel-heading"><div><span className="admin-eyebrow">FOLLOW-UP</span><h2>Manage enquiry</h2></div></div>
            <EnquiryEditor id={enquiry.id} initialStatus={enquiry.status} initialNotes={enquiry.admin_notes ?? ""} />
          </section>
        </div>

        <aside className="admin-detail-aside">
          <section className="admin-panel">
            <div className="admin-panel-heading"><div><span className="admin-eyebrow">CONTACT DETAILS</span><h2>Enquirer</h2></div></div>
            <div className="admin-detail-fact"><UserRound size={16} /><div><small>NAME</small><strong>{enquiry.name}</strong></div></div>
            <div className="admin-detail-fact"><Mail size={16} /><div><small>EMAIL</small><a href={"mailto:" + enquiry.email}>{enquiry.email}</a></div></div>
            <div className="admin-detail-fact"><Building2 size={16} /><div><small>ORGANISATION</small><strong>{enquiry.organisation || "Not provided"}</strong></div></div>
            <div className="admin-detail-fact"><Globe2 size={16} /><div><small>COUNTRY</small><strong>{enquiry.country || "Not provided"}</strong></div></div>
          </section>
          <section className="admin-panel admin-service-panel">
            <span className="admin-eyebrow">INTERESTED IN</span>
            <h3>{enquiry.service}</h3>
            <p>Last updated {formatEnquiryDate(enquiry.updated_at)}</p>
          </section>
        </aside>
      </div>
    </>
  );
}
