// components/color-worlds/PlaybookSignupForm.tsx
//
// Sample-chapter capture for /playbook. Client form posts to the
// submitPlaybookSignup server action; on success it swaps the inputs
// for a confirmation. Mirrors OrdaniBetaForm's structure + the cw-signup
// visual treatment (transparent inputs, currentColor border).
//
// Waitlist phase: there is no Lemon Squeezy checkout yet. This captures
// the email for the free Chapter 1 sampler ("Why your build broke at
// 80%") and seeds the list for the funnel.
"use client";

import { useState, useTransition } from "react";
import { submitPlaybookSignup } from "@/app/actions/playbook-signup";

type Status =
  | { kind: "idle" }
  | { kind: "ok"; email: string }
  | { kind: "error"; message: string };

export function PlaybookSignupForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [isPending, startTransition] = useTransition();

  // Same regex on client + server so the UX never gets stuck submitting
  // an email the server will reject.
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!EMAIL_RE.test(email)) {
      setStatus({ kind: "error", message: "That email doesn't look valid." });
      return;
    }
    startTransition(async () => {
      const result = await submitPlaybookSignup(email);
      if (result.ok) {
        setStatus({ kind: "ok", email });
      } else {
        setStatus({
          kind: "error",
          message: result.error ?? "Something went wrong.",
        });
      }
    });
  }

  if (status.kind === "ok") {
    return (
      <div className="cw-signup cw-reveal is-in" aria-live="polite">
        <p className="cw-msg" style={{ width: "100%" }}>
          Chapter 1 is on its way. Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <form className="cw-signup cw-reveal" onSubmit={onSubmit} noValidate>
      <input
        type="email"
        name="email"
        placeholder="you@email.com"
        aria-label="Email"
        autoComplete="email"
        required
        disabled={isPending}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Sending…" : "Send me Chapter 1 →"}
      </button>
      {status.kind === "error" ? (
        <p className="cw-msg" aria-live="polite">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
