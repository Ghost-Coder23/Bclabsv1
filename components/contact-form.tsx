"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { systemModules } from "@/lib/system-builder";

const serviceOptions = [
  { slug: "custom-software", value: "Custom software development" },
  { slug: "erp-odoo", value: "ERP & Odoo solutions" },
  { slug: "education-technology", value: "Education technology" },
  { slug: "cloud-devops", value: "Cloud & DevOps" },
  { slug: "automation-integrations", value: "Automation & integrations" },
  { slug: "it-consultancy", value: "Technology consultancy" },
  { slug: "custom-solution", value: "Custom solution / multiple modules" },
  { slug: "not-sure", value: "Not sure yet" },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "error" | "ready">("idle");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const moduleSlugs = (params.get("modules") ?? "").split(",").filter(Boolean);
    const selectedModules = systemModules.filter((module) => moduleSlugs.includes(module.slug));

    if (selectedModules.length > 0) {
      setService("Custom solution / multiple modules");
      setMessage(
        "I would like to discuss a connected business system with these selected modules:\n" +
        selectedModules.map((module) => "- " + module.name).join("\n") +
        "\n\nA little about my organisation and the workflow I want to improve:\n"
      );
      return;
    }

    const requested = params.get("service");
    const match = serviceOptions.find((option) => option.slug === requested);
    if (match) setService(match.value);
  }, []);

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
    const moduleSlugs = (new URLSearchParams(window.location.search).get("modules") ?? "").split(",").filter(Boolean);
    const selectedModules = systemModules.filter((module) => moduleSlugs.includes(module.slug));
    const subject = encodeURIComponent("Project enquiry — " + String(data.get("name")));
    const body = encodeURIComponent(
      [
        "Name: " + data.get("name"),
        "Organisation: " + (data.get("organisation") || "Not provided"),
        "Email: " + data.get("email"),
        "Country: " + (data.get("country") || "Not provided"),
        "Service: " + data.get("service"),
        "Selected modules: " + (selectedModules.length ? selectedModules.map((module) => module.name).join(", ") : "Not specified"),
        "",
        "Project details:",
        String(data.get("message")),
      ].join("\n")
    );
    window.location.href = "mailto:" + email + "?subject=" + subject + "&body=" + body;
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
        <select name="service" value={service} onChange={(event) => setService(event.target.value)} required>
          <option value="" disabled>Select a service</option>
          {serviceOptions.map((option) => <option value={option.value} key={option.slug}>{option.value}</option>)}
        </select>
      </label>
      <label>
        Tell us about your project <span>*</span>
        <textarea name="message" rows={5} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What are you trying to achieve? What challenge should we help solve?" required />
      </label>
      {status === "error" && (
        <p className="form-notice form-notice-error" role="alert">
          The enquiry form is ready, but the company email has not been configured yet. Configure NEXT_PUBLIC_CONTACT_EMAIL before launch so visitors can send their enquiry.
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