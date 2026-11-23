"use client";

import { useState, type FormEvent } from "react";
import { Check, Save } from "lucide-react";
import { enquiryStatuses, type EnquiryStatus } from "@/lib/admin/enquiries";

type EnquiryEditorProps = {
  id: string;
  initialStatus: EnquiryStatus;
  initialNotes: string;
};

export function EnquiryEditor({ id, initialStatus, initialNotes }: EnquiryEditorProps) {
  const [status, setStatus] = useState<EnquiryStatus>(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const response = await fetch("/api/admin/enquiries/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, admin_notes: notes }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "The enquiry could not be saved.");
        return;
      }

      setSaved(true);
    } catch {
      setError("The update could not be completed. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="admin-editor-form" onSubmit={handleSubmit}>
      <label>
        Pipeline status
        <select value={status} onChange={(event) => setStatus(event.target.value as EnquiryStatus)}>
          {enquiryStatuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </label>
      <label>
        Internal notes
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={7}
          maxLength={8000}
          placeholder="Record follow-up actions, budget discussions, next steps or internal context. Only admins can see these notes."
        />
      </label>
      <div className="admin-editor-footer">
        <span>{notes.length.toLocaleString()} / 8,000 characters</span>
        <button className="admin-primary-action" type="submit" disabled={saving}>
          {saved ? <Check size={15} /> : <Save size={15} />}
          {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
        </button>
      </div>
      {error && <p className="admin-form-error" role="alert">{error}</p>}
      {saved && <p className="admin-save-confirmation" role="status">Your enquiry update has been saved.</p>}
    </form>
  );
}
