import Link from "next/link";
import { ArrowUpRight, Inbox } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatEnquiryDate, statusLabel, type Enquiry } from "@/lib/admin/enquiries";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("id,created_at,name,email,organisation,country,service,selected_modules,message,status,admin_notes,updated_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return <div className="admin-alert" role="alert">Enquiries could not be loaded. Confirm that the database migration has been applied.</div>;
  }

  const enquiries = (data ?? []) as unknown as Enquiry[];

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">BUSINESS DEVELOPMENT / PIPELINE</span>
          <h1>Project enquiries</h1>
          <p>Review requests, track opportunities and keep internal follow-up notes.</p>
        </div>
        <div className="admin-heading-count">{enquiries.length} <span>recent records</span></div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div><span className="admin-eyebrow">INBOUND LEADS</span><h2>All enquiries</h2></div>
        </div>
        {enquiries.length === 0 ? (
          <div className="admin-empty-state">
            <span><Inbox size={22} /></span>
            <strong>Your enquiry pipeline is empty</strong>
            <p>New submissions from the website contact page will appear here automatically.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>CONTACT</th><th>ORGANISATION</th><th>SERVICE</th><th>RECEIVED</th><th>STATUS</th><th /></tr></thead>
              <tbody>
                {enquiries.map((item) => (
                  <tr key={item.id}>
                    <td><Link href={"/admin/enquiries/" + item.id} className="admin-contact-cell"><strong>{item.name}</strong><small>{item.email}</small></Link></td>
                    <td>{item.organisation || "—"}</td>
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
      <p className="admin-footnote">Showing the latest 200 submissions. Use the enquiry record to update its status or add private notes.</p>
    </>
  );
}
