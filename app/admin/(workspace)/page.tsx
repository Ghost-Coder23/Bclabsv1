import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Inbox, MessageSquareText, Sparkles } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatEnquiryDate, statusLabel, type Enquiry } from "@/lib/admin/enquiries";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const supabase = createAdminClient();

  const [totalResult, newResult, qualifiedResult, wonResult, recentResult] = await Promise.all([
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "qualified"),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "won"),
    supabase.from("contact_submissions")
      .select("id,created_at,name,email,service,status")
      .order("created_at", { ascending: false })
      .limit(7),
  ]);

  const recent = (recentResult.data ?? []) as unknown as Pick<Enquiry, "id" | "created_at" | "name" | "email" | "service" | "status">[];

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">OVERVIEW / BUSINESS DEVELOPMENT</span>
          <h1>Good morning. <em>Here&apos;s your pipeline.</em></h1>
          <p>A live view of project enquiries received through the BC Labs website.</p>
        </div>
        <Link href="/admin/enquiries" className="admin-primary-action">View all enquiries <ArrowUpRight size={16} /></Link>
      </div>

      <div className="admin-stat-grid">
        <article className="admin-stat-card">
          <span className="admin-stat-icon"><Inbox size={18} /></span>
          <span className="admin-stat-label">TOTAL ENQUIRIES</span>
          <strong>{totalResult.count ?? 0}</strong>
          <small>All website submissions</small>
        </article>
        <article className="admin-stat-card admin-stat-highlight">
          <span className="admin-stat-icon"><MessageSquareText size={18} /></span>
          <span className="admin-stat-label">NEW ENQUIRIES</span>
          <strong>{newResult.count ?? 0}</strong>
          <small>Awaiting first review</small>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-icon"><Sparkles size={18} /></span>
          <span className="admin-stat-label">QUALIFIED</span>
          <strong>{qualifiedResult.count ?? 0}</strong>
          <small>Potential opportunities</small>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-icon"><BadgeCheck size={18} /></span>
          <span className="admin-stat-label">WON</span>
          <strong>{wonResult.count ?? 0}</strong>
          <small>Marked as successful</small>
        </article>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div><span className="admin-eyebrow">LATEST ACTIVITY</span><h2>Recent enquiries</h2></div>
          <Link href="/admin/enquiries" className="admin-inline-link">Open pipeline <ArrowUpRight size={14} /></Link>
        </div>
        {recent.length === 0 ? (
          <div className="admin-empty-state">
            <span><Inbox size={22} /></span>
            <strong>No enquiries yet</strong>
            <p>When someone submits the public contact form, their details will appear here.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>CONTACT</th><th>SERVICE</th><th>RECEIVED</th><th>STATUS</th><th /></tr></thead>
              <tbody>
                {recent.map((item) => (
                  <tr key={item.id}>
                    <td><Link href={"/admin/enquiries/" + item.id} className="admin-contact-cell"><strong>{item.name}</strong><small>{item.email}</small></Link></td>
                    <td>{item.service}</td>
                    <td>{formatEnquiryDate(item.created_at)}</td>
                    <td><span className={"admin-status admin-status-" + item.status}>{statusLabel(item.status)}</span></td>
                    <td><Link href={"/admin/enquiries/" + item.id} className="admin-row-action" aria-label={"Open enquiry from " + item.name}><ArrowUpRight size={16} /></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <p className="admin-footnote">Enquiries are stored privately and are visible only to authorised BC Labs administrators.</p>
    </>
  );
}
