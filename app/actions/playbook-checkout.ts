// app/actions/playbook-checkout.ts
//
// Creates the hosted Stripe Checkout session for The 80% Wall ($99
// launch price via the playbook-99 lookup key) and hands the client the
// redirect URL. Chapter 6 rules: hosted checkout only (no card form of
// ours), and NOTHING is granted here or on the success page — delivery
// happens exclusively in the signature-verified webhook
// (app/api/stripe/webhook/route.ts).
//
// Not yet linked from the page: the /playbook buy-button flip is a
// launch-gate decision (see product/playbook/HANDOFF.md). Wired and
// verified ahead of it, same precedent as contactAction.
"use server";

import { headers } from "next/headers";

import { getPlaybookPriceId, getStripe } from "@/lib/stripe";

type Result = { ok: true; url: string } | { ok: false; error: string };

const OWNER = "micah@micahjonesconsulting.com";

export async function createPlaybookCheckout(): Promise<Result> {
  const stripe = getStripe();
  if (!stripe) {
    // eslint-disable-next-line no-console
    console.warn("[playbook-checkout] STRIPE_SECRET_KEY not set");
    return {
      ok: false,
      error: `Checkout isn't open yet — email ${OWNER} and I'll take care of you directly.`,
    };
  }

  try {
    const priceId = await getPlaybookPriceId(stripe);
    if (!priceId) {
      // eslint-disable-next-line no-console
      console.error("[playbook-checkout] no active price for lookup key");
      return {
        ok: false,
        error: `Checkout isn't open yet — email ${OWNER} and I'll take care of you directly.`,
      };
    }

    const h = await headers();
    const host = h.get("host") ?? "www.micahjonesconsulting.com";
    const proto = h.get("x-forwarded-proto") ?? "https";
    const origin = `${proto}://${host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/playbook/thanks`,
      cancel_url: `${origin}/playbook`,
    });

    if (!session.url) {
      // eslint-disable-next-line no-console
      console.error("[playbook-checkout] session created without url", session.id);
      return { ok: false, error: "Checkout hiccuped. Try again in a minute." };
    }
    return { ok: true, url: session.url };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[playbook-checkout] session create failed:", err);
    return { ok: false, error: "Checkout hiccuped. Try again in a minute." };
  }
}
