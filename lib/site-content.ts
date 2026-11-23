import "server-only";

import { createClient } from "@/lib/supabase/server";

export type SiteContentKind = "project" | "article";
export type SiteContentStatus = "draft" | "published";

export type SiteContent = {
  id: string;
  kind: SiteContentKind;
  title: string;
  slug: string;
  category: string;
  summary: string;
  body: string;
  status: SiteContentStatus;
  created_at: string;
  updated_at: string;
};

export async function getPublishedContent(kind: SiteContentKind) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return [] as SiteContent[];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("id,kind,title,slug,category,summary,body,status,created_at,updated_at")
      .eq("kind", kind)
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Published site content could not be loaded:", error.message);
      return [] as SiteContent[];
    }
    return (data ?? []) as SiteContent[];
  } catch (error) {
    console.error("Published site content is unavailable:", error);
    return [] as SiteContent[];
  }
}

export async function getPublishedContentBySlug(kind: SiteContentKind, slug: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("id,kind,title,slug,category,summary,body,status,created_at,updated_at")
      .eq("kind", kind)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      console.error("Published content could not be loaded:", error.message);
      return null;
    }
    return (data ?? null) as SiteContent | null;
  } catch (error) {
    console.error("Published content is unavailable:", error);
    return null;
  }
}
