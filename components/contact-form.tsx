"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Send } from "lucide-react";

const serviceOptions = [
  "Custom software development",
  "ERP & Odoo solutions",
  "Education technology",
  "Cloud & DevOps",
  "Automation & integrations",
  "Technology consultancy",
  "Not sure yet",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "error" | "ready">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
    if (!email) {
      setStatus("error");
      return;
    }

    const data = new FormData(form);
    const subject = encodeURIComponent(`Project enquiry — ${String(data.get("name"))}`);
    const body = encodeURIComponent(
      [
        `Name: ${data.get("name")}`,
        `Organisation: ${data.get("organisation") || "Not provided"}`,
        `Email: ${data.get("email")}`,
        `Country: ${data.get("country") || "Not provided"}`,
        `Service: ${data.get("service")}`,
        "",
        "Project details:",
        String(data.get("message")),
      ].join("\n")
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setStatus("ready");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Your name <span>*</span>
          <input name="name" autoComplete="name" placeholder="e.g. Alex Morgan" required />
        </label>
        <label>
          Work email <span>*</span>
          <input name="email" type="email" autoComplete="email" placeholder="alex@company.com" required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Organisation
          <input name="organisation" autoComplete="organization" placeholder="Your company or organisation" />
        </label>
        <label>
          Country
          <input name="country" autoComplete="country-name" placeholder="Where are you based?" />
        </label>
      </div>
      <label>
        What can we help you with? <span>*</span>
        <select name="service" defaultValue="" required>
          <option value="" disabled>Select a service</option>
          {serviceOptions.map((option) => <option value={option} key={option}>{option}</option>)}
        </select>
      </label>
      <label>
        Tell us about your project <span>*</span>
        <textarea name="message" rows={5} placeholder="What are you trying to achieve? What challenge should we help solve?" required />
      </label>
      {status === "error" && (
        <p className="form-notice form-notice-error" role="alert">
          The enquiry form is ready, but the company email has not been configured yet. Please contact BC Labs through your existing channel or configure NEXT_PUBLIC_CONTACT_EMAIL before launch.
        </p>
      )}
      {status === "ready" && (
        <p className="form-notice form-notice-success" role="status">
          Your email application should open with your enquiry prepared. Send it there to complete your message.
        </p>
      )}
      <div className="form-submit-row">
        <p>We&apos;ll use your details only to respond to this enquiry.</p>
        <button className="button button-dark" type="submit">Send enquiry <Send size={16} /></button>
      </div>
    </form>
  );
}
