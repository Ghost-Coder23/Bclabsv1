import Link from "next/link";
import { Activity, ArrowUpRight, Inbox, LayoutDashboard, LogOut, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { signOutAdmin } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/access";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminWorkspaceLayout({ children }: Readonly<{ children: ReactNode }>) {
  const admin = await requireAdmin();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-sidebar-brand">
          <span className="admin-sidebar-mark">BC</span>
          <span><strong>BC LABS</strong><small>ADMIN WORKSPACE</small></span>
        </Link>
        <div className="admin-sidebar-label">WORKSPACE</div>
        <nav className="admin-sidebar-nav" aria-label="Admin navigation">
          <Link href="/admin" className="admin-nav-link"><LayoutDashboard size={17} /> Overview</Link>
          <Link href="/admin/enquiries" className="admin-nav-link"><Inbox size={17} /> Enquiries</Link>
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-security-note"><ShieldCheck size={16} /><span>Private owner access</span></div>
          <div className="admin-user">
            <span className="admin-avatar">{(admin.email ?? "A").slice(0, 1).toUpperCase()}</span>
            <span className="admin-user-copy"><strong>Administrator</strong><small>{admin.email}</small></span>
          </div>
          <form action={signOutAdmin}>
            <button className="admin-signout" type="submit"><LogOut size={15} /> Sign out</button>
          </form>
          <Link href="/" className="admin-public-link">View public website <ArrowUpRight size={14} /></Link>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div><span className="admin-topbar-dot" /> BC LABS / ADMIN</div>
          <span><Activity size={14} /> Private workspace</span>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
