import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { systemModules } from "@/lib/system-builder";

export const runtime = "nodejs";

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid enquiry." }, { status: 400 });
  }

  // Honeypot field: quietly accept bot submissions without storing them.
  if (text(body.website, 200)) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const name = text(body.name, 140);
  const email = text(body.email, 254).toLowerCase();
  const organisation = text(body.organisation, 180);
  const country = text(body.country, 100);
  const service = text(body.service, 180);
  const message = text(body.message, 8000);
  const requestedModules = Array.isArray(body.selected_modules) ? body.selected_modules : [];
  const validSlugs = new Set(systemModules.map((module) => module.slug));
  const selectedModules = requestedModules
    .filter((value): value is string => typeof value === "string" && validSlugs.has(value as never))
    .slice(0, systemModules.length);

  if (!name || !service || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Enter your name, a valid email address, a service and project details." },
      { status: 400 }
    );
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "The enquiry service is not configured yet. Please contact BC Labs directly." },
      { status: 503 }
    );
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      organisation,
      country,
      service,
      selected_modules: selectedModules,
      message,
      status: "new",
    });

    if (error) {
      console.error("Contact submission insert failed:", error.message);
      return NextResponse.json(
        { error: "We could not save your enquiry. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact API configuration error:", error);
    return NextResponse.json(
      { error: "The enquiry service is temporarily unavailable." },
      { status: 503 }
    );
  }
}
