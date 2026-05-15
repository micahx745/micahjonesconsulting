// app/(foyer)/contact/page.tsx
//
// Phase 6 — FOYER-07.
//
// Client component (because of useActionState for the inline thank-you).
// Two-field form per blueprint §7:
//   - "Your name"
//   - "What you are working on"
// Submits to app/actions/contact.ts.
//
// Below form: direct email link as alternate per blueprint §7.
//
// "use client" is required for useActionState; the Server Action import is
// fine — Next.js will mark the action as RPC and only ship a serialized
// reference to the client.
//
// Source: blueprint §7 (Contact wireframe + header copy);
//         REQUIREMENTS.md FOYER-07; React 19 useActionState pattern.
"use client";

import { useActionState } from "react";
import { contactAction, type ContactActionState } from "@/app/actions/contact";

const INITIAL_STATE: ContactActionState = { ok: false };

export default function ContactPage() {
  const [state, formAction, pending] = useActionState<ContactActionState, FormData>(
    contactAction,
    INITIAL_STATE,
  );

  if (state.ok) {
    return (
      <div className="foyer-page">
        <section className="foyer-section foyer-section--contact-thanks">
          <div className="thank-you-state">
            <h1 className="foyer-hero foyer-hero--secondary">Got it.</h1>
            <p className="foyer-prose">
              I read every message and reply inside two business days. Talk soon.
            </p>
            <p className="foyer-prose">
              <a href="mailto:hello@micahjonesconsulting.com" className="foyer-link">
                hello@micahjonesconsulting.com
              </a>
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="foyer-page">
      <section className="foyer-section foyer-section--contact-hero">
        <h1 className="foyer-hero foyer-hero--secondary">
          Tell me what you are working on.
        </h1>
        <p className="foyer-prose">
          I read every message and reply inside two business days.
        </p>
      </section>

      <section className="foyer-section foyer-section--contact-form">
        <form action={formAction} className="contact-form" noValidate>
          <div className="contact-form__field">
            <label htmlFor="contact-name" className="contact-form__label">
              Your name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              className="contact-form__input"
              aria-invalid={Boolean(!state.ok && state.fieldErrors?.name)}
              aria-describedby={
                !state.ok && state.fieldErrors?.name ? "contact-name-error" : undefined
              }
            />
            {!state.ok && state.fieldErrors?.name ? (
              <p id="contact-name-error" className="contact-form__error" role="alert">
                {state.fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div className="contact-form__field">
            <label htmlFor="contact-message" className="contact-form__label">
              What you are working on
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={6}
              className="contact-form__input contact-form__input--textarea"
              aria-invalid={Boolean(!state.ok && state.fieldErrors?.message)}
              aria-describedby={
                !state.ok && state.fieldErrors?.message
                  ? "contact-message-error"
                  : undefined
              }
            />
            {!state.ok && state.fieldErrors?.message ? (
              <p id="contact-message-error" className="contact-form__error" role="alert">
                {state.fieldErrors.message}
              </p>
            ) : null}
          </div>

          {!state.ok && state.formError ? (
            <p className="contact-form__error contact-form__error--form" role="alert">
              {state.formError}
            </p>
          ) : null}

          <button type="submit" disabled={pending} className="contact-form__submit">
            {pending ? "sending…" : "→ send"}
          </button>
        </form>

        <p className="foyer-prose foyer-prose--alt">
          Or email me directly:{" "}
          <a href="mailto:hello@micahjonesconsulting.com" className="foyer-link">
            hello@micahjonesconsulting.com
          </a>
        </p>
      </section>
    </div>
  );
}
