// app/actions/beta-signup.ts
//
// Server action for the Ordani beta signup form. Validates the email,
// sends a notification via Resend to micah@micahjonesconsulting.com,
// and returns ok. The user sees signups in real time in their inbox.
//
// Env var required: RESEND_API_KEY (set in Vercel dashboard).
// If the key is missing or sending fails, we still return ok to the
// user but log the failure — better to lose the lead-notification
// than to break the public form.
//
// Future hardening:
//   - Persist to a Supabase `beta_signups` table (schema in comment
//     below) so signups survive Resend outages.
//   - Add a basic rate-limit (e.g. 5 submissions per IP per hour).
//   - Add reCAPTCHA / Turnstile if spam becomes an issue.
"use server";

import { Resend } from "resend";

interface Result {
  ok: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOTIFICATION_TO = "micah@micahjonesconsulting.com";
const NOTIFICATION_FROM = "Ordani Beta <noreply@micahjonesconsulting.com>";

export async function submitOrdaniBetaSignup(email: string): Promise<Result> {
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return { ok: false, error: "That email doesn't look valid." };
  }

  const trimmedEmail = email.trim();

  // Fire-and-log notification. We don't block the user on this — if
  // Resend is down, the form should still feel like it worked.
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // eslint-disable-next-line no-console
      console.warn(
        "[ordani-beta-signup] RESEND_API_KEY not set — logging only",
        trimmedEmail,
      );
    } else {
      const resend = new Resend(apiKey);
      const result = await resend.emails.send({
        from: NOTIFICATION_FROM,
        to: NOTIFICATION_TO,
        subject: `Ordani beta signup — ${trimmedEmail}`,
        text: [
          "New Ordani beta signup.",
          "",
          `Email: ${trimmedEmail}`,
          `At:    ${new Date().toISOString()}`,
          "",
          "— micahjonesconsulting.com",
        ].join("\n"),
      });
      if (result.error) {
        // eslint-disable-next-line no-console
        console.error("[ordani-beta-signup] resend error", result.error);
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[ordani-beta-signup] unexpected error", err);
  }

  // Always log server-side so a missed Resend notification doesn't
  // erase the lead entirely.
  // eslint-disable-next-line no-console
  console.log(
    `[ordani-beta-signup] ${new Date().toISOString()} ${trimmedEmail}`,
  );

  return { ok: true };
}

// ----------------------------------------------------------------
// Supabase schema sketch for future persistence:
//
//   create table beta_signups (
//     id uuid primary key default gen_random_uuid(),
//     email text not null unique,
//     created_at timestamptz default now(),
//     source text default 'website'
//   );
//
//   create index beta_signups_created_at on beta_signups (created_at desc);
//
// Wire by adding @supabase/supabase-js import (already in deps) and
// inserting before the Resend call. Use the service-role key so RLS
// doesn't block the insert.
// ----------------------------------------------------------------
