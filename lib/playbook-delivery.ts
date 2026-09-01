// lib/playbook-delivery.ts — the purchase delivery, shared by the
// Stripe webhook route (production path) and the verification scripts.
//
// One email carries the whole purchase: the 68-page book PDF plus the
// companion ZIP, exactly as the book's own End page promises ("they
// arrived alongside this PDF with your purchase"). The Resend
// idempotency key is derived from the checkout session id, so Stripe
// webhook retries (welcome, per chapter 6) cannot double-send.
// Owner notification is fire-and-log, never blocking (house pattern,
// see app/actions/playbook-signup.ts).
import { Resend } from "resend";

import { BOOK_FILENAME, BOOK_PDF_BASE64 } from "@/lib/book-pdf";
import { COMPANION_FILENAME, COMPANION_ZIP_BASE64 } from "@/lib/companion-zip";

const OWNER = "micah@micahjonesconsulting.com";
const NOTIFICATION_TO = "hello@micahjonesconsulting.com";

export type DeliveryResult = { ok: boolean; error?: string };

export async function deliverPlaybook(
  buyerEmail: string,
  sessionId: string,
): Promise<DeliveryResult> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    // eslint-disable-next-line no-console
    console.error(
      "[playbook-delivery] RESEND_API_KEY not set — cannot deliver",
      sessionId,
    );
    return { ok: false, error: "RESEND_API_KEY not set" };
  }

  const resend = new Resend(resendKey);
  try {
    const sent = await resend.emails.send(
      {
        from: `Micah Jones <${OWNER}>`,
        to: buyerEmail,
        replyTo: OWNER,
        subject: "The 80% Wall — your book and companion files",
        text: [
          "Thank you for buying The 80% Wall.",
          "",
          "Attached to this email:",
          `- ${BOOK_FILENAME} — the full manual, ten chapters, 68 pages.`,
          `- ${COMPANION_FILENAME} — the working files: prompt files,`,
          "  pre-flight checklists, spec templates.",
          "",
          "Start with chapter 1 even if you have read the free copy; the",
          "pre-flight cards are meant to be run, not read. The companion",
          "ZIP has every checklist as a file you can drop into your repo.",
          "",
          "Hit reply if anything is broken, confusing, or wrong. I read",
          "every response.",
          "",
          "— Micah",
          "micahjonesconsulting.com/playbook",
        ].join("\n"),
        attachments: [
          { filename: BOOK_FILENAME, content: BOOK_PDF_BASE64 },
          { filename: COMPANION_FILENAME, content: COMPANION_ZIP_BASE64 },
        ],
      },
      // Session-scoped idempotency: a retried webhook re-sends nothing.
      { idempotencyKey: `playbook-delivery-${sessionId}` },
    );
    if (sent.error) {
      // eslint-disable-next-line no-console
      console.error("[playbook-delivery] send failed:", sessionId, sent.error);
      return { ok: false, error: sent.error.message };
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[playbook-delivery] send threw:", sessionId, err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "send failed",
    };
  }

  await notifyOwner(
    resend,
    `Playbook sold — ${buyerEmail}`,
    [
      `Buyer:   ${buyerEmail}`,
      `Session: ${sessionId}`,
      `At:      ${new Date().toISOString()}`,
      "",
      "Delivered: book PDF + companion ZIP.",
      "",
      "— micahjonesconsulting.com/playbook",
    ],
    `playbook-sale-note-${sessionId}`,
  );

  // eslint-disable-next-line no-console
  console.log(
    `[playbook-delivery] ${new Date().toISOString()} delivered ${buyerEmail} (${sessionId})`,
  );
  return { ok: true };
}

// Refund echo (chapter 6): the click in the dashboard fires
// charge.refunded, and this records it where the operator looks.
// Delivery was an email, so there is no access to revoke; the echo is
// the owner notification plus the archive row the webhook writes.
export async function notifyRefund(
  buyerEmail: string,
  chargeId: string,
  amountRefunded: number,
  productName = "The 80% Wall",
): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;
  const resend = new Resend(resendKey);
  await notifyOwner(
    resend,
    `Refund: ${productName} — ${buyerEmail}`,
    [
      `Buyer:    ${buyerEmail}`,
      `Product:  ${productName}`,
      `Charge:   ${chargeId}`,
      `Refunded: $${(amountRefunded / 100).toFixed(2)}`,
      `At:       ${new Date().toISOString()}`,
      "",
      "— micahjonesconsulting.com",
    ],
    `playbook-refund-note-${chargeId}`,
  );
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
        from: "The 80% Wall <noreply@micahjonesconsulting.com>",
        to: NOTIFICATION_TO,
        subject,
        text: lines.join("\n"),
      },
      { idempotencyKey },
    );
    if (r.error) {
      // eslint-disable-next-line no-console
      console.error("[playbook-delivery] owner notification failed:", r.error);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[playbook-delivery] owner notification threw:", err);
  }
}
