// lib/package-delivery.ts — the kickoff email for self-serve package
// purchases (The Unstick Session / The Audit / The Sprint), fired only
// from the signature-verified Stripe webhook.
//
// The email IS the fulfillment start: payment confirmation framing,
// the refund rule (full before kickoff, none after), the package's
// intake questions, the /book link for scheduling the kickoff call,
// and the book + companion ZIP (included with every package, per the
// /services fine print). Resend idempotency on the checkout session id
// makes webhook retries safe, same as the book delivery.
import { Resend } from "resend";

import { BOOK_FILENAME, BOOK_PDF_BASE64 } from "@/lib/book-pdf";
import type { Sku } from "@/lib/catalog";
import { COMPANION_FILENAME, COMPANION_ZIP_BASE64 } from "@/lib/companion-zip";

const OWNER = "micah@micahjonesconsulting.com";
const NOTIFICATION_TO = "micah@micahjonesconsulting.com";

export type DeliveryResult = { ok: boolean; error?: string };

export async function deliverPackageKickoff(
  buyerEmail: string,
  sessionId: string,
  sku: Sku,
  flavor: string | null,
): Promise<DeliveryResult> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    // eslint-disable-next-line no-console
    console.error(
      "[package-delivery] RESEND_API_KEY not set — cannot deliver",
      sessionId,
    );
    return { ok: false, error: "RESEND_API_KEY not set" };
  }

  const dollars = `$${(sku.amount / 100).toLocaleString("en-US")}`;
  const intake = (sku.intake ?? []).map((q, i) => `${i + 1}) ${q}`);

  const resend = new Resend(resendKey);
  try {
    const sent = await resend.emails.send(
      {
        from: `Micah Jones <${OWNER}>`,
        to: buyerEmail,
        replyTo: OWNER,
        subject: `${sku.name} — you're in. Two steps to kickoff.`,
        text: [
          `Payment received: ${sku.name}, ${dollars}.${flavor ? ` Flavor: ${flavor}.` : ""}`,
          "",
          "Two steps and the work starts:",
          "",
          "1. Reply to this email with:",
          ...intake.map((q) => `   ${q}`),
          "",
          "2. Grab the kickoff call here (my real calendar, invite lands",
          "   in your inbox): https://www.micahjonesconsulting.com/book/kickoff",
          "",
          "The rules, restated: full refund any time before the kickoff",
          "call, none after, because the work starts fast. And your fee",
          "credits toward the next package or an engagement started",
          "within 60 days.",
          "",
          "Attached: The 80% Wall (my field manual) and its companion",
          "files — included with every package.",
          "",
          "— Micah",
          "micahjonesconsulting.com/services",
        ].join("\n"),
        attachments: [
          { filename: BOOK_FILENAME, content: BOOK_PDF_BASE64 },
          { filename: COMPANION_FILENAME, content: COMPANION_ZIP_BASE64 },
        ],
      },
      { idempotencyKey: `package-kickoff-${sessionId}` },
    );
    if (sent.error) {
      // eslint-disable-next-line no-console
      console.error("[package-delivery] send failed:", sessionId, sent.error);
      return { ok: false, error: sent.error.message };
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[package-delivery] send threw:", sessionId, err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "send failed",
    };
  }

  await notifyOwner(
    resend,
    `${sku.name} sold (${dollars}) — ${buyerEmail}`,
    [
      `Buyer:   ${buyerEmail}`,
      `Package: ${sku.name} (${sku.lookupKey})${flavor ? ` — ${flavor}` : ""}`,
      `Session: ${sessionId}`,
      `At:      ${new Date().toISOString()}`,
      "",
      "Kickoff email sent (intake + /book link + book/ZIP).",
      "Runbook: docs/PACKAGES-RUNBOOK.md — log the buyer, watch for the",
      "intake reply, credit-bridge expiry is purchase date + 60 days.",
    ],
    `package-sale-note-${sessionId}`,
  );

  // eslint-disable-next-line no-console
  console.log(
    `[package-delivery] ${new Date().toISOString()} kickoff sent ${buyerEmail} (${sku.lookupKey}, ${sessionId})`,
  );
  return { ok: true };
}

async function notifyOwner(
  resend: Resend,
  subject: string,
  lines: string[],
  idempotencyKey: string,
): Promise<void> {
  try {
    const r = await resend.emails.send(
      {
        from: "Packages <noreply@micahjonesconsulting.com>",
        to: NOTIFICATION_TO,
        subject,
        text: lines.join("\n"),
      },
      { idempotencyKey },
    );
    if (r.error) {
      // eslint-disable-next-line no-console
      console.error("[package-delivery] owner notification failed:", r.error);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[package-delivery] owner notification threw:", err);
  }
}
