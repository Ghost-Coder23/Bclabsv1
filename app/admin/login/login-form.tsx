"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError("Sign-in failed. Check your email and password, then try again.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("The sign-in service is unavailable. Check the Supabase configuration.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <label>
        Admin email
        <input
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin@yourcompany.com"
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your admin password"
          required
        />
      </label>
      {error && <p className="admin-form-error" role="alert">{error}</p>}
      <button className="admin-login-submit" type="submit" disabled={submitting}>
        <LockKeyhole size={16} />
        {submitting ? "Signing in…" : "Sign in securely"}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
