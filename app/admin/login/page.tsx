import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "@/app/admin/login/login-form";
import { getAdminAccess, getAdminSetupMissing } from "@/lib/admin/access";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin sign in | BC Labs",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ setup?: string; error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const missing = getAdminSetupMissing();
  const access = await getAdminAccess();
  if (access.user) redirect("/admin");

  const params = await searchParams;

  return (
    <main className="admin-login-page">
      <div className="admin-login-glow" />
      <div className="admin-login-card">
        <Link href="/" className="admin-back-link"><ArrowLeft size={15} /> Back to BC Labs website</Link>
        <div className="admin-login-brand">
          <span className="admin-login-brand-mark">BC</span>
          <span><strong>BC LABS</strong><small>PRIVATE WORKSPACE</small></span>
        </div>
        <div className="admin-login-heading">
          <span className="admin-eyebrow"><ShieldCheck size={14} /> RESTRICTED ACCESS</span>
          <h1>Admin sign in</h1>
          <p>Sign in with an authorised BC Labs administrator account.</p>
        </div>

        {missing.length > 0 ? (
          <div className="admin-setup-notice">
            <strong>Dashboard setup required</strong>
            <p>Configure the following deployment environment variables before signing in:</p>
            <ul>{missing.map((name) => <li key={name}><code>{name}</code></li>)}</ul>
            <p>Then create your admin user in Supabase Authentication and add its email to <code>ADMIN_EMAILS</code>.</p>
          </div>
        ) : (
          <>
            {params.error === "unauthorised" && (
              <p className="admin-form-error" role="alert">This account is not on the BC Labs admin allowlist.</p>
            )}
            <AdminLoginForm />
            <p className="admin-login-footnote">Access is limited to email addresses configured by the site owner.</p>
          </>
        )}
      </div>
    </main>
  );
}
