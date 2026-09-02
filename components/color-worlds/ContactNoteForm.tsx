// components/color-worlds/ContactNoteForm.tsx
//
// Pass-76. The note form for /contact.
//
// The site had a complete contactAction sitting in app/actions/ since an early
// phase with no form mounted on it — "Contact" in the nav pointed at /book, so
// the only way to reach Micah was to give up a calendar slot. That is a large
// ask for someone with one question. This is the small ask.
//
// Three fields and no more: name, email, what you are working on. No budget
// dropdown, no company size, no "how did you hear about us" — every extra
// field is a reason to close the tab and none of them change the reply.
//
// It borrows .cw-book's classes rather than defining its own. The site has one
// form grammar; a second set of input styles that merely looked similar would
// be two things to keep in sync forever.
"use client";

import { useActionState } from "react";
import { contactAction, type ContactActionState } from "@/app/actions/contact";

const INITIAL: ContactActionState = { ok: false };

export function ContactNoteForm() {
  const [state, formAction, isPending] = useActionState(contactAction, INITIAL);

  // Success replaces the form instead of sitting above it: a filled-in form
  // left on screen after a successful send invites a second send.
  if (state.ok) {
    return (
      <div className="cw-book__done" role="status">
        <p className="cw-book__donehead">Sent.</p>
        <p>
          It is in my inbox. I answer from there, usually within one business
          day.
        </p>
      </div>
    );
  }

  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="cw-book" noValidate>
      <label className="cw-book__field">
        <span className="cw-book__lbl">Your name</span>
        <input
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={fieldErrors.name ? true : undefined}
        />
      </label>
      {fieldErrors.name ? (
        <p className="cw-book__warn">{fieldErrors.name}</p>
      ) : null}

      <label className="cw-book__field">
        <span className="cw-book__lbl">Where I reply</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={fieldErrors.email ? true : undefined}
        />
      </label>
      {fieldErrors.email ? (
        <p className="cw-book__warn">{fieldErrors.email}</p>
      ) : null}

      <label className="cw-book__field">
        <span className="cw-book__lbl">What you are working on</span>
        <textarea
          name="message"
          rows={7}
          maxLength={2000}
          required
          aria-invalid={fieldErrors.message ? true : undefined}
        />
      </label>
      {fieldErrors.message ? (
        <p className="cw-book__warn">{fieldErrors.message}</p>
      ) : null}

      {state.formError ? (
        <p className="cw-book__warn" role="alert">
          {state.formError}
        </p>
      ) : null}

      <button type="submit" className="cw-book__btn" disabled={isPending}>
        {isPending ? "Sending…" : "Send the note →"}
      </button>
    </form>
  );
}
