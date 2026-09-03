// app/actions/playbook-signup.ts
//
// Server action for the playbook sample-chapter capture (/playbook).
//
// Pass-24: the sampler is real. Chapter 1 exists (product/playbook/,
// operator-approved 2026-08-31), so the form now DELIVERS it: the
// signer gets the PDF attached, the operator gets the lead
// notification. The PDF ships embedded (lib/chapter1-pdf.ts, generated
// by product/playbook/embed-ch1.mjs) so no filesystem tracing config
// is needed.
//
// Delivery is a hard promise — the form says "Chapter 1 is on its
// way" — so a failed signer-send returns an honest error instead of a
// fake success. The operator notification stays fire-and-log.
//
// Env var required: RESEND_API_KEY.
//
// Future hardening: persist to a Supabase `playbook_signups` table;
// rate-limit per IP; launch-day announce list.
"use server";

import { Resend } from "resend";
import { CHAPTER1_PDF_BASE64, CHAPTER1_FILENAME } from "@/lib/chapter1-pdf";

interface Result {
  ok: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OWNER = "micah@micahjonesconsulting.com";
const NOTIFICATION_TO = "micah@micahjonesconsulting.com";

export async function submitPlaybookSignup(email: string): Promise<Result> {
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return { ok: false, error: "That email doesn't look valid." };
  }

  const trimmedEmail = email.trim();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.warn(
      "[playbook-signup] RESEND_API_KEY not set — logging only",
      trimmedEmail,
    );
    return {
      ok: false,
      error: `Sending isn't wired up right now — email ${OWNER} and I'll reply with the chapter.`,
    };
  }

  const resend = new Resend(apiKey);

  // 1. The promise: Chapter 1 to the signer, PDF attached.
  try {
    const sent = await resend.emails.send({
      from: `Micah Jones <${OWNER}>`,
      to: trimmedEmail,
      replyTo: OWNER,
      subject: "Chapter 1 of The 80% Wall — why your build broke at 80%",
      text: [
        "Here it is — the real chapter, not a teaser.",
        "",
        "It covers the mechanism behind the wall: what the context",
        "window actually remembers, why the break hits at 80% and not",
        "sooner, and the five habits that stop the bleeding tonight.",
        "",
        "The full manual is ten chapters plus the companion files",
        "(prompt files, pre-flight checklists, spec templates). I'll",
        "email you the day it ships — launch price $99.",
        "",
        "Hit reply if the chapter lands, or if it doesn't. I read",
        "every response.",
        "",
        "— Micah",
        "micahjonesconsulting.com/playbook",
      ].join("\n"),
      attachments: [
        { filename: CHAPTER1_FILENAME, content: CHAPTER1_PDF_BASE64 },
      ],
    });
    if (sent.error) {
      // eslint-disable-next-line no-console
      console.error("[playbook-signup] chapter send failed", sent.error);
      return {
        ok: false,
        error: `Could not send it just now — email ${OWNER} and I'll reply with the chapter.`,
      };
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[playbook-signup] unexpected error", err);
    return {
      ok: false,
      error: `Could not send it just now — email ${OWNER} and I'll reply with the chapter.`,
    };
  }

  // 2. The lead notification. Fire-and-log; never blocks the user.
  try {
    const note = await resend.emails.send({
      from: `The 80% Wall <noreply@micahjonesconsulting.com>`,
      to: NOTIFICATION_TO,
      subject: `Chapter 1 delivered — ${trimmedEmail}`,
      text: [
        "New playbook sampler signup. Chapter 1 was emailed to them.",
        "",
        `Email: ${trimmedEmail}`,
        `At:    ${new Date().toISOString()}`,
        "",
        "— micahjonesconsulting.com/playbook",
      ].join("\n"),
    });
    if (note.error) {
      // eslint-disable-next-line no-console
      console.error("[playbook-signup] notify error", note.error);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[playbook-signup] notify unexpected error", err);
  }

  // eslint-disable-next-line no-console
  console.log(
    `[playbook-signup] ${new Date().toISOString()} delivered ${trimmedEmail}`,
  );

  return { ok: true };
}
