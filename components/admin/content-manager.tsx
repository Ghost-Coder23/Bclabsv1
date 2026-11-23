"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Check, FilePlus2, Pencil, Save, Trash2, X } from "lucide-react";

type ContentKind = "project" | "article";
type ContentStatus = "draft" | "published";
type ContentItem = {
  id: string; kind: ContentKind; title: string; slug: string; category: string;
  summary: string; body: string; status: ContentStatus; created_at: string; updated_at: string;
};
type FormValues = Omit<ContentItem, "id" | "created_at" | "updated_at">;
const emptyForm: FormValues = { kind: "project", title: "", slug: "", category: "", summary: "", body: "", status: "draft" };

function makeSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ContentManager({ initialItems, loadError = "" }: { initialItems: ContentItem[]; loadError?: string }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(loadError);
  const [notice, setNotice] = useState("");

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function startNew() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setNotice("");
  }

  function editItem(item: ContentItem) {
    setEditingId(item.id);
    setForm({
      kind: item.kind, title: item.title, slug: item.slug, category: item.category,
      summary: item.summary, body: item.body, status: item.status,
    });
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    const payload = { ...form, slug: makeSlug(form.slug || form.title) };

    try {
      const response = await fetch(editingId ? "/api/admin/content/" + editingId : "/api/admin/content", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(result.error ?? "The content could not be saved.");
        return;
      }
      const saved = result.item as ContentItem;
      setItems((current) => editingId
        ? current.map((item) => item.id === saved.id ? saved : item)
        : [saved, ...current]);
      setNotice(form.status === "published" ? "Content saved and published." : "Draft saved.");
      setEditingId(saved.id);
      setForm({
        kind: saved.kind, title: saved.title, slug: saved.slug, category: saved.category,
        summary: saved.summary, body: saved.body, status: saved.status,
      });
      router.refresh();
    } catch {
      setError("The update could not be completed. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function removeItem(item: ContentItem) {
    if (!window.confirm("Delete “" + item.title + "”? This cannot be undone.")) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/content/" + item.id, { method: "DELETE" });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(result.error ?? "The content could not be deleted.");
        return;
      }
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      if (editingId === item.id) startNew();
      setNotice("Content deleted.");
      router.refresh();
    } catch {
      setError("The delete request could not be completed. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="content-manager-layout">
      <section className="admin-panel content-editor-panel">
        <div className="admin-panel-heading">
          <div><span className="admin-eyebrow">{editingId ? "EDIT WEBSITE CONTENT" : "CREATE WEBSITE CONTENT"}</span><h2>{editingId ? "Edit content" : "New content"}</h2></div>
          {editingId && <button type="button" className="content-reset-button" onClick={startNew}><X size={14} /> New item</button>}
        </div>
        <form className="content-editor-form" onSubmit={save}>
          <div className="content-form-row">
            <label>Content type
              <select value={form.kind} onChange={(event) => update("kind", event.target.value as ContentKind)}>
                <option value="project">Project / case study</option>
                <option value="article">Insight article</option>
              </select>
            </label>
            <label>Publication status
              <select value={form.status} onChange={(event) => update("status", event.target.value as ContentStatus)}>
                <option value="draft">Draft — private</option>
                <option value="published">Published — public</option>
              </select>
            </label>
          </div>
          <label>Title
            <input value={form.title} onChange={(event) => {
              const title = event.target.value;
              setForm((current) => ({ ...current, title, slug: editingId ? current.slug : makeSlug(title) }));
            }} required maxLength={160} placeholder="e.g. School administration platform" />
          </label>
          <div className="content-form-row">
            <label>URL slug
              <input value={form.slug} onChange={(event) => update("slug", makeSlug(event.target.value))} required maxLength={180} placeholder="school-administration-platform" />
            </label>
            <label>Category
              <input value={form.category} onChange={(event) => update("category", event.target.value)} maxLength={100} placeholder="Education technology" />
            </label>
          </div>
          <label>Summary
            <textarea value={form.summary} onChange={(event) => update("summary", event.target.value)} rows={3} maxLength={600} placeholder="A short introduction shown on the public website." />
          </label>
          <label>Full content
            <textarea value={form.body} onChange={(event) => update("body", event.target.value)} rows={9} maxLength={30000} placeholder="Write the project story or article here. Separate paragraphs with a blank line." />
          </label>
          <div className="content-form-footer">
            <span>{form.body.length.toLocaleString()} / 30,000 characters</span>
            <button className="admin-primary-action" type="submit" disabled={busy}>
              {busy ? "Saving…" : editingId ? <><Save size={15} /> Save changes</> : <><FilePlus2 size={15} /> Save content</>}
            </button>
          </div>
          {error && <p className="admin-form-error" role="alert">{error}</p>}
          {notice && <p className="admin-save-confirmation" role="status"><Check size={14} /> {notice}</p>}
          <p className="content-editor-help">Drafts remain private. Published articles appear in Insights; published project stories appear in Our Work. Never include confidential client data without permission.</p>
        </form>
      </section>

      <section className="admin-panel content-library-panel">
        <div className="admin-panel-heading">
          <div><span className="admin-eyebrow">CONTENT LIBRARY</span><h2>Website entries</h2></div>
          <span className="content-library-count">{items.length} total</span>
        </div>
        {items.length === 0 ? (
          <div className="admin-empty-state content-empty-state">
            <span><FilePlus2 size={22} /></span>
            <strong>No content entries yet</strong>
            <p>Create a project story or insight article. You can keep it as a draft until it is ready to publish.</p>
          </div>
        ) : (
          <div className="content-library-list">
            {items.map((item) => (
              <article className="content-library-item" key={item.id}>
                <div className="content-library-item-top">
                  <span className="content-kind-label">{item.kind === "project" ? "PROJECT STORY" : "INSIGHT ARTICLE"}</span>
                  <span className={"admin-status " + (item.status === "published" ? "admin-status-won" : "admin-status-lost")}>{item.status}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary || "No summary added yet."}</p>
                <div className="content-library-item-actions">
                  <button type="button" onClick={() => editItem(item)}><Pencil size={13} /> Edit</button>
                  <button type="button" className="content-delete-button" disabled={busy} onClick={() => removeItem(item)}><Trash2 size={13} /> Delete</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
