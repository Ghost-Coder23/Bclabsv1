import { NextResponse } from "next/server";
import { getAdminAccess } from "@/lib/admin/access";
import { createAdminClient } from "@/lib/supabase/admin";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const kinds = new Set(["project", "article"]);
const statuses = new Set(["draft", "published"]);

type RouteContext = { params: Promise<{ id: string }> };

function validate(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const value = body as Record<string, unknown>;
  const kind = typeof value.kind === "string" ? value.kind : "";
  const title = typeof value.title === "string" ? value.title.trim() : "";
  const slug = typeof value.slug === "string" ? value.slug.trim().toLowerCase() : "";
  const category = typeof value.category === "string" ? value.category.trim() : "";
  const summary = typeof value.summary === "string" ? value.summary.trim() : "";
  const content = typeof value.body === "string" ? value.body.trim() : "";
  const status = typeof value.status === "string" ? value.status : "draft";

  if (!kinds.has(kind) || !statuses.has(status) ||
      title.length < 1 || title.length > 160 ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      category.length > 100 || summary.length > 600 || content.length > 30000) return null;

  return { kind, title, slug, category, summary, body: content, status };
}

async function authorised() {
  const access = await getAdminAccess();
  if (access.user) return null;
  return NextResponse.json({ error: "You are not authorised to manage website content." }, { status: access.reason === "unauthenticated" ? 401 : 403 });
}

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await authorised();
  if (denied) return denied;

  const { id } = await context.params;
  if (!uuidPattern.test(id)) return NextResponse.json({ error: "Invalid content identifier." }, { status: 400 });

  let parsed: unknown;
  try { parsed = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid content request." }, { status: 400 });
  }
  const content = validate(parsed);
  if (!content) return NextResponse.json({ error: "Check the title, URL slug, category, summary and content fields." }, { status: 400 });

  const supabase = createAdminClient();
  const { data, error } = await supabase.from("site_content").update(content).eq("id", id).select("*").maybeSingle();
  if (error) {
    const duplicate = error.code === "23505";
    return NextResponse.json({ error: duplicate ? "That URL slug is already in use. Choose another." : "The content could not be updated." }, { status: duplicate ? 409 : 500 });
  }
  if (!data) return NextResponse.json({ error: "Content entry not found." }, { status: 404 });
  return NextResponse.json({ item: data });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await authorised();
  if (denied) return denied;

  const { id } = await context.params;
  if (!uuidPattern.test(id)) return NextResponse.json({ error: "Invalid content identifier." }, { status: 400 });

  const supabase = createAdminClient();
  const { data, error } = await supabase.from("site_content").delete().eq("id", id).select("id").maybeSingle();
  if (error) return NextResponse.json({ error: "The content could not be deleted." }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Content entry not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
