import Link from "next/link";
import { ArrowUpRight, Inbox, Search } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatEnquiryDate, statusLabel, type Enquiry } from "@/lib/admin/enquiries";

export const dynamic = "force-dynamic";

type EnquiriesPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function AdminEnquiriesPage({ searchParams }: EnquiriesPageProps) {
  const params = await searchParams;
  const query = (params.q ?? "").replace(/[^a-zA-Z0-9@._+\s-]/g, " ").trim().slice(0, 80);
  const supabase = createAdminClient();
  let request = supabase
    .from("contact_submissions")
    .select("id,created_at,name,email,organisation,country,service,selected_modules,message,status,admin_notes,updated_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (query) {
    const term = "%" + query + "%";
    request = request.or(
      "name.ilike." + term +
      ",email.ilike." + term +
      ",organisation.ilike." + term +
      ",service.ilike." + term
    );
  }

  const { data, error } = await request;

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
        <div className="admin-heading-count">{enquiries.length} <span>{query ? "matching records" : "recent records"}</span></div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div><span className="admin-eyebrow">INBOUND LEADS</span><h2>All enquiries</h2></div>
          <form method="get" action="/admin/enquiries" className="admin-search-form">
            <Search size={15} />
            <input type="search" name="q" defaultValue={query} placeholder="Search contacts or services" aria-label="Search enquiries" />
            <button type="submit">Search</button>
          </form>
        </div>
        {enquiries.length === 0 ? (
          <div className="admin-empty-state">
            <span><Inbox size={22} /></span>
            <strong>{query ? "No matching enquiries" : "Your enquiry pipeline is empty"}</strong>
            <p>{query ? "Try another name, email address, organisation or service." : "New submissions from the website contact page will appear here automatically."}</p>
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
      <p className="admin-footnote">Showing up to 200 recent submissions. Search by contact, organisation or service, then open a record to update its status or private notes.</p>
    </>
  );
}
