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
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setStatus("submitting");
    setErrorMessage("");

    const data = new FormData(form);
    const moduleSlugs = (new URLSearchParams(window.location.search).get("modules") ?? "").split(",").filter(Boolean);
    const selectedModules = systemModules.filter((module) => moduleSlugs.includes(module.slug));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          organisation: data.get("organisation"),
          country: data.get("country"),
          service: data.get("service"),
          message: data.get("message"),
          selected_modules: selectedModules.map((module) => module.slug),
          website: data.get("website"),
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrorMessage(result.error ?? "Your enquiry could not be sent. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      setService("");
      setMessage("");
    } catch {
      setErrorMessage("We could not connect to the enquiry service. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Your name <span>*</span>
          <input name="name" autoComplete="name" placeholder="e.g. Alex Morgan" required maxLength={140} />
        </label>
        <label>
          Work email <span>*</span>
          <input name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Organisation
          <input name="organisation" autoComplete="organization" placeholder="Your company or organisation" maxLength={180} />
        </label>
        <label>
          Country
          <input name="country" autoComplete="country-name" placeholder="Where are you based?" maxLength={100} />
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
        <textarea name="message" rows={5} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What are you trying to achieve? What challenge should we help solve?" required maxLength={8000} />
      </label>
      <div className="contact-honeypot" aria-hidden="true">
        <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {status === "error" && (
        <p className="form-notice form-notice-error" role="alert">{errorMessage}</p>
      )}
      {status === "success" && (
        <p className="form-notice form-notice-success" role="status">
          Thank you. Your enquiry has been received by BC Labs. We will review the details and follow up using the email address you provided.
        </p>
      )}
      <div className="form-submit-row">
        <p>We&apos;ll use your details only to respond to this enquiry.</p>
        <button className="button button-dark" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : status === "success" ? "Send another enquiry" : "Send enquiry"} <Send size={16} />
        </button>
      </div>
    </form>
  );
}
