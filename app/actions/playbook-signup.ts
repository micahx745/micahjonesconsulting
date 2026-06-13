// app/actions/playbook-signup.ts
//
// Server action for the playbook sample-chapter capture (/playbook).
// Mirrors beta-signup: validate the email, notify
// hello@micahjonesconsulting.com via Resend, return ok. The buyer asked
// for Chapter 1 ("Why your build broke at 80%"); the operator sees the
// request in the inbox and sends the sampler.
//
// Env var required: RESEND_API_KEY (set in Vercel dashboard).
// If the key is missing or sending fails, we still return ok to the
// user but log the failure — better to lose the lead-notification than
// to break the public form.
//
// Future hardening (same as beta-signup): persist to a Supabase
// `playbook_signups` table; rate-limit per IP; wire Kit (ConvertKit)
// for the five-email sequence once the funnel goes live.
"use server";

import { Resend } from "resend";

interface Result {
  ok: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOTIFICATION_TO = "hello@micahjonesconsulting.com";
const NOTIFICATION_FROM = "The 80% Wall <noreply@micahjonesconsulting.com>";

export async function submitPlaybookSignup(email: string): Promise<Result> {
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
        "[playbook-signup] RESEND_API_KEY not set — logging only",
        trimmedEmail,
      );
    } else {
      const resend = new Resend(apiKey);
      const result = await resend.emails.send({
        from: NOTIFICATION_FROM,
        to: NOTIFICATION_TO,
        subject: `Playbook sample-chapter request — ${trimmedEmail}`,
        text: [
          "New playbook sample-chapter request (Chapter 1).",
          "",
          `Email: ${trimmedEmail}`,
          `At:    ${new Date().toISOString()}`,
          "",
          "— micahjonesconsulting.com/playbook",
        ].join("\n"),
      });
      if (result.error) {
        // eslint-disable-next-line no-console
        console.error("[playbook-signup] resend error", result.error);
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[playbook-signup] unexpected error", err);
  }

  // Always log server-side so a missed Resend notification doesn't
  // erase the lead entirely.
  // eslint-disable-next-line no-console
  console.log(
    `[playbook-signup] ${new Date().toISOString()} ${trimmedEmail}`,
  );

  return { ok: true };
}

// ----------------------------------------------------------------
// Supabase schema sketch for future persistence:
//
//   create table playbook_signups (
//     id uuid primary key default gen_random_uuid(),
//     email text not null unique,
//     created_at timestamptz default now(),
//     source text default 'playbook-sampler'
//   );
//
// Wire by inserting before the Resend call with the service-role key.
// ----------------------------------------------------------------
