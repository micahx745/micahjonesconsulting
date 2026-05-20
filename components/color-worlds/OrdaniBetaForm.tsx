// components/color-worlds/OrdaniBetaForm.tsx
//
// Ordani beta signup. Client form posts to the server action defined in
// app/actions/beta-signup.ts. On success, swap the inputs for a thank-you
// message. The form preserves the visual structure from the mockup —
// transparent inputs, currentColor border.
//
// The brief says: "leave it functional with a TODO for the real endpoint."
// The action logs the email and returns ok; user can wire a real Supabase
// table / Resend notification later.
"use client";

import { useState, useTransition } from "react";
import { submitOrdaniBetaSignup } from "@/app/actions/beta-signup";

type Status =
  | { kind: "idle" }
  | { kind: "ok"; email: string }
  | { kind: "error"; message: string };

export function OrdaniBetaForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!email || !email.includes("@")) {
      setStatus({ kind: "error", message: "Real email, please." });
      return;
    }
    startTransition(async () => {
      const result = await submitOrdaniBetaSignup(email);
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
          You&rsquo;re on the list. We&rsquo;ll be in touch.
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
        {isPending ? "Joining…" : "Join the beta →"}
      </button>
      {status.kind === "error" ? (
        <p className="cw-msg" aria-live="polite">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
