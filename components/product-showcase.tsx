"use client";

import Link from "next/link";
import { ArrowUpRight, Lightbulb } from "lucide-react";

function SchoolPreview() {
  return (
    <div className="product-window" aria-label="Illustrative school management dashboard interface">
      <aside className="product-window-sidebar">
        <div className="product-window-brand"><span className="product-window-brand-mark">S</span> SCHOOL PORTAL</div>
        <span className="product-window-sidebar-label">WORKSPACE</span>
        <div className="product-window-nav">
          <span className="active"><i /> Overview</span>
          <span><i /> Students</span>
          <span><i /> Fees</span>
          <span><i /> Academics</span>
          <span><i /> Reports</span>
          <span><i /> Settings</span>
        </div>
      </aside>
      <div className="product-window-main">
        <div className="product-window-topbar"><strong>School overview</strong><span>ADMIN / TERM 2</span></div>
        <div className="product-kpi-row">
          <div className="product-kpi"><span>STUDENT RECORDS</span><strong>1,284</strong><small>↑ Sample data</small></div>
          <div className="product-kpi"><span>FEE COLLECTIONS</span><strong>$48.6k</strong><small>↑ Illustrative</small></div>
          <div className="product-kpi"><span>ATTENDANCE</span><strong>94.8%</strong><small>↑ Illustrative</small></div>
        </div>
        <div className="product-window-lower">
          <div className="product-window-panel">
            <div className="product-window-panel-title">Fee collections <small>TERM VIEW</small></div>
            <div className="product-chart"><i style={{height:"35%"}}/><i style={{height:"54%"}}/><i style={{height:"43%"}}/><i style={{height:"70%"}}/><i style={{height:"59%"}}/><i style={{height:"87%"}}/><i style={{height:"76%"}}/><i style={{height:"96%"}}/></div>
          </div>
          <div className="product-window-panel">
            <div className="product-window-panel-title">Recent activity</div>
            <div className="product-activity">
              <div className="product-activity-row"><span className="product-activity-dot">+</span><span className="product-activity-copy"><strong>New admission</strong><small>Student record</small></span></div>
              <div className="product-activity-row"><span className="product-activity-dot">✓</span><span className="product-activity-copy"><strong>Fee payment</strong><small>Receipt issued</small></span></div>
              <div className="product-activity-row"><span className="product-activity-dot">↗</span><span className="product-activity-copy"><strong>Report ready</strong><small>Academic record</small></span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessPreview() {
  return (
    <div className="product-window" aria-label="Illustrative ERP business operations dashboard interface">
      <aside className="product-window-sidebar">
        <div className="product-window-brand"><span className="product-window-brand-mark">B</span> BUSINESS ERP</div>
        <span className="product-window-sidebar-label">APPLICATIONS</span>
        <div className="product-window-nav">
          <span className="active"><i /> Dashboard</span>
          <span><i /> Sales</span>
          <span><i /> Accounting</span>
          <span><i /> Inventory</span>
          <span><i /> Purchasing</span>
          <span><i /> Employees</span>
        </div>
      </aside>
      <div className="product-window-main">
        <div className="product-window-topbar"><strong>Business overview</strong><span>COMPANY / FY 2026</span></div>
        <div className="product-kpi-row">
          <div className="product-kpi"><span>SALES ORDERS</span><strong>126</strong><small>Sample data</small></div>
          <div className="product-kpi"><span>INVOICES</span><strong>US$24.8k</strong><small>Illustrative</small></div>
          <div className="product-kpi"><span>STOCK ALERTS</span><strong>06</strong><small>Illustrative</small></div>
        </div>
        <div className="product-window-lower">
          <div className="product-window-panel">
            <div className="product-window-panel-title">Order activity <small>MONTH VIEW</small></div>
            <div className="product-chart"><i style={{height:"42%"}}/><i style={{height:"62%"}}/><i style={{height:"51%"}}/><i style={{height:"82%"}}/><i style={{height:"68%"}}/><i style={{height:"93%"}}/><i style={{height:"74%"}}/><i style={{height:"100%"}}/></div>
          </div>
          <div className="product-window-panel">
            <div className="product-window-panel-title">Workflow status</div>
            <div className="product-mini-table">
              <div className="product-mini-table-row"><span>Quotations</span><b>18</b></div>
              <div className="product-mini-table-row"><span>To invoice</span><b>07</b></div>
              <div className="product-mini-table-row"><span>Purchases</span><b>12</b></div>
              <div className="product-mini-table-row"><span>Payments</span><span className="product-mini-status">Tracked</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section className="product-showcase-section section-pad" id="product-experiences">
      <div className="container">
        <div className="product-showcase-heading">
          <div>
            <span className="eyebrow">SOFTWARE FOR EVERYDAY WORK</span>
            <h2>From a clear screen<br /><em>to a better workflow.</em></h2>
          </div>
          <p>Explore illustrative previews of the kinds of systems BC Labs builds — from school administration to connected business operations. Final interfaces are shaped around each organisation.</p>
        </div>
        <div className="product-showcase-grid">
          <article className="product-showcase-card">
            <div className="product-showcase-card-heading">
              <span className="eyebrow">EDUCATION / SCHOOL OPERATIONS</span>
              <h3>School management systems</h3>
              <p>Bring student records, fee management, academics and day-to-day administration into one organised workspace.</p>
              <span className="product-preview-label">ILLUSTRATIVE INTERFACE PREVIEW</span>
            </div>
            <SchoolPreview />
            <div className="product-showcase-actions">
              <Link href="/contact?service=education-technology" className="button button-dark">Discuss a school system <ArrowUpRight size={15} /></Link>
            </div>
          </article>
          <article className="product-showcase-card">
            <div className="product-showcase-card-heading">
              <span className="eyebrow">BUSINESS / ERP OPERATIONS</span>
              <h3>Odoo & business systems</h3>
              <p>Connect sales, finance, inventory, purchasing and approvals with workflows that match how your business operates.</p>
              <span className="product-preview-label">ILLUSTRATIVE INTERFACE PREVIEW</span>
            </div>
            <BusinessPreview />
            <div className="product-showcase-actions">
              <Link href="/contact?service=erp-odoo" className="button button-dark">Discuss an ERP project <ArrowUpRight size={15} /></Link>
            </div>
          </article>
        </div>
        <p className="product-showcase-note"><Lightbulb size={14} /> Screen figures and records are sample data for visual illustration, not real customer information or performance claims.</p>
      </div>
    </section>
  );
}
