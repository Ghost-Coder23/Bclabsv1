import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const requiredEnvironment = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_EMAILS",
] as const;

export function getAdminSetupMissing() {
  return requiredEnvironment.filter((name) => !process.env[name]?.trim());
}

export async function getAdminAccess() {
  if (getAdminSetupMissing().length > 0) {
    return { user: null, reason: "configuration" as const };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user?.email) {
    return { user: null, reason: "unauthenticated" as const };
  }

  const allowedEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!allowedEmails.includes(data.user.email.toLowerCase())) {
    return { user: null, reason: "forbidden" as const };
  }

  return { user: data.user, reason: null };
}

export async function requireAdmin() {
  const access = await getAdminAccess();
  if (!access.user) {
    redirect(access.reason === "configuration" ? "/admin/login?setup=required" : "/admin/login");
  }
  return access.user;
}
