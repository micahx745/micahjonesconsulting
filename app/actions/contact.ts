// app/actions/contact.ts
//
// Phase 6 — FOYER-07. The Server Action that the /contact form posts to.
//
// Pipeline:
//   1. Parse FormData with the Zod schema (lib/contact-form-schema.ts).
//      On fail → return { ok: false, fieldErrors }.
//   2. Send a transactional email via Resend (server-only, service key).
//      On fail → return { ok: false, formError: "..." }.
//   3. Insert a row into Supabase `contact_messages` for the archive.
//      On fail → log + still return ok (the email got out, the user shouldn't
//      see the archive plumbing).
//   4. Return { ok: true } so the client renders the inline thank-you.
//
// Env vars (lazy-read so build passes without them set):
//   RESEND_API_KEY          — Phase 1 DNS submitted; Phase 10 ops sets this in Vercel
//   SUPABASE_URL            — Phase 10 ops creates the project + table
//   SUPABASE_SERVICE_ROLE_KEY — Phase 10 ops sets in Vercel
//
// If env is missing at runtime, returns a structured error instead of throwing.
// This means: Phase 6 ships a code-complete form; Phase 10 wires the env vars
// + DNS verification + Supabase table to make it live.
//
// Source: REQUIREMENTS.md FOYER-07; blueprint §7 (two-business-day reply);
//         CLAUDE.md (Resend transactional + Supabase archive, service-role
//         key server-only).
"use server";

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { contactFormSchema, type ContactFormInput } from "@/lib/contact-form-schema";

export type ContactActionState =
  | { ok: true }
  | {
      ok: false;
      fieldErrors?: Partial<Record<keyof ContactFormInput, string>>;
      formError?: string;
    };

export async function contactAction(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  // 1. Parse
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "email" || key === "message") {
        fieldErrors[key] = issue.message;
      }
    }
    return { ok: false, fieldErrors };
  }

  const { name, email, message } = parsed.data;

  // 2. Env read (lazy — build passes without these)
  const resendKey = process.env.RESEND_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!resendKey) {
    return {
      ok: false,
      formError:
        "The contact pipeline is not yet wired up. Please email hello@micahjonesconsulting.com.",
    };
  }

  // 3. Send via Resend
  try {
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "Micah Jones <hello@micahjonesconsulting.com>",
      to: ["hello@micahjonesconsulting.com"],
      // Pass-76: was `replyTo: undefined`, so hitting reply in the inbox
      // answered the site's own address and the sender never heard back.
      replyTo: email,
      subject: `New note from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
  } catch (err) {
    console.error("[contact] Resend failed:", err);
    return {
      ok: false,
      formError:
        "Could not send the note right now. Please email hello@micahjonesconsulting.com.",
    };
  }

  // 4. Archive to Supabase (best-effort; do not fail the user on archive error)
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });
      const { error } = await supabase
        .from("contact_messages")
        .insert({ name, email, message, created_at: new Date().toISOString() });
      if (error) {
        console.error("[contact] Supabase insert failed:", error.message);
      }
    } catch (err) {
      console.error("[contact] Supabase archive crashed:", err);
    }
  }

  return { ok: true };
}
