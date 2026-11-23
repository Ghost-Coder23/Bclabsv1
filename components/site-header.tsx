"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <BrandMark />
        <nav className={`main-nav ${open ? "main-nav-open" : ""}`} aria-label="Main navigation">
          {siteConfig.navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={active ? "nav-link nav-link-active" : "nav-link"}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Link className="nav-mobile-cta" href="/contact" onClick={() => setOpen(false)}>
            Start a project <ArrowUpRight size={16} />
          </Link>
        </nav>
        <div className="nav-actions">
          <Link href="/contact" className="button button-dark button-nav">
            Start a project <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
