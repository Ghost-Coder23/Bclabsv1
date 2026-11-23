import { ContentManager } from "@/components/admin/content-manager";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type ContentItem = {
  id: string;
  kind: "project" | "article";
  title: string;
  slug: string;
  category: string;
  summary: string;
  body: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
};

export default async function AdminContentPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("id,kind,title,slug,category,summary,body,status,created_at,updated_at")
    .order("updated_at", { ascending: false });

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">WEBSITE / CONTENT MANAGEMENT</span>
          <h1>Manage website content</h1>
          <p>Create project stories and insight articles, save drafts and publish when ready.</p>
        </div>
      </div>
      <ContentManager initialItems={(data ?? []) as ContentItem[]} loadError={error ? "Content storage is not available. Apply the site content migration in Supabase, then reload this page." : ""} />
      <p className="admin-footnote">Only authorised BC Labs administrators can create, edit or remove content. Published entries are publicly readable; drafts are private.</p>
    </>
  );
}
