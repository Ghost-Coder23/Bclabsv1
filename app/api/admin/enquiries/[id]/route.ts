import { NextResponse } from "next/server";
import { getAdminAccess } from "@/lib/admin/access";
import { createAdminClient } from "@/lib/supabase/admin";

const allowedStatuses = new Set(["new", "reviewing", "qualified", "won", "lost", "spam"]);

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const access = await getAdminAccess();

  if (!access.user) {
    return NextResponse.json(
      { error: access.reason === "configuration" ? "Admin is not configured." : "You are not authorised." },
      { status: access.reason === "unauthenticated" ? 401 : 403 }
    );
  }

  const { id } = await context.params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: "Invalid enquiry identifier." }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Invalid update request." }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid update request." }, { status: 400 });
  }

  const status = typeof body.status === "string" ? body.status : "";
  const adminNotes = typeof body.admin_notes === "string" ? body.admin_notes.trim() : "";

  if (!allowedStatuses.has(status) || adminNotes.length > 8000) {
    return NextResponse.json({ error: "Choose a valid status and keep notes under 8,000 characters." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .update({ status, admin_notes: adminNotes })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Admin enquiry update failed:", error.message);
    return NextResponse.json({ error: "The enquiry could not be updated." }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
