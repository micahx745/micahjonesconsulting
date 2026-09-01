// app/api/stripe/webhook/route.ts
//
// The load-bearing wall (chapter 6, § 06.3). This is the ONLY place a
// purchase is granted: Stripe calls here, the signature is verified
// against STRIPE_WEBHOOK_SECRET, and the verified event drives the
// delivery email (book PDF + companion ZIP). The /playbook/thanks page
// proves navigation, never payment.
//
// The four webhook rules, as implemented:
// - Verify the signature, every time: constructEventAsync below; an
//   unsigned or badly signed POST gets a 400 and nothing else.
// - Welcome retries; process events once: delivery is idempotent on
//   the checkout session id (Resend idempotency key inside
//   deliverPlaybook), so a retried event re-sends nothing.
// - Trust the event, not the order: the session is re-fetched from
//   Stripe and delivery only happens when its payment_status is
//   "paid" — the event is a doorbell, Stripe's record is the fact.
// - Answer fast, work after: the only work is one email; it completes
//   well inside Stripe's timeout at solo scale, so it runs inline.
//
// This is the repo's first app/api route by necessity: signature
// verification needs the raw request body, which Server Actions never
// expose.
import type Stripe from "stripe";

import { SKUS } from "@/lib/catalog";
import { deliverPackageKickoff } from "@/lib/package-delivery";
import { deliverPlaybook, notifyRefund } from "@/lib/playbook-delivery";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request): Promise<Response> {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    // eslint-disable-next-line no-console
    console.error("[stripe-webhook] env missing — endpoint not configured");
    return Response.json({ error: "not configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return Response.json({ error: "missing signature" }, { status: 400 });
  }

  const payload = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      payload,
      signature,
      webhookSecret,
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[stripe-webhook] signature verification failed:", err);
    return Response.json({ error: "invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const sessionId = (event.data.object as Stripe.Checkout.Session).id;
        // Trust the event, not the order: re-fetch the current state.
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        // Shared Stripe account: only sessions our checkout tagged with
        // a catalog SKU are ours (Pass-52: book + the three packages).
        // Anything else (e.g. Ordani's) is acknowledged and ignored —
        // delivering against a foreign checkout is the failure this
        // line exists to prevent.
        const sku = SKUS[session.metadata?.product ?? ""];
        if (!sku) {
          // eslint-disable-next-line no-console
          console.log(
            `[stripe-webhook] ${sessionId} is not a catalog session; ignoring`,
          );
          break;
        }
        if (session.payment_status !== "paid") {
          // eslint-disable-next-line no-console
          console.log(
            `[stripe-webhook] ${sessionId} not paid yet (${session.payment_status}); waiting for the paid event`,
          );
          break;
        }
        const email = session.customer_details?.email;
        if (!email) {
          // eslint-disable-next-line no-console
          console.error(
            `[stripe-webhook] ${sessionId} paid but has no customer email`,
          );
          break;
        }
        const flavor =
          session.custom_fields?.find((f) => f.key === "flavor")?.dropdown
            ?.value ?? null;
        const delivered =
          sku.kind === "book"
            ? await deliverPlaybook(email, sessionId)
            : await deliverPackageKickoff(email, sessionId, sku, flavor);
        if (!delivered.ok) {
          // Non-2xx makes Stripe retry — the retry is the recovery
          // path for a transient email failure, and idempotency makes
          // it safe.
          return Response.json({ error: "delivery failed" }, { status: 500 });
        }
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        // Shared account: only echo refunds of playbook purchases.
        // The charge itself carries no session metadata, so look up
        // the checkout session behind its payment intent.
        const pi =
          typeof charge.payment_intent === "string"
            ? charge.payment_intent
            : charge.payment_intent?.id;
        if (!pi) break;
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: pi,
          limit: 1,
        });
        const owningSession = sessions.data[0];
        const refundedSku = SKUS[owningSession?.metadata?.product ?? ""];
        if (!refundedSku) {
          // eslint-disable-next-line no-console
          console.log(
            `[stripe-webhook] refund ${charge.id} is not a catalog charge; ignoring`,
          );
          break;
        }
        const email =
          charge.billing_details?.email ??
          charge.receipt_email ??
          "unknown buyer";
        await notifyRefund(
          email,
          charge.id,
          charge.amount_refunded,
          refundedSku.name,
        );
        break;
      }
      default:
        // Registered events only; anything else is acknowledged and
        // ignored so a config change never causes a retry storm.
        break;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`[stripe-webhook] handler failed for ${event.type}:`, err);
    return Response.json({ error: "handler failed" }, { status: 500 });
  }

  return Response.json({ received: true });
}
