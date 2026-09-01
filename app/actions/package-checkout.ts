// app/actions/package-checkout.ts
//
// Hosted Stripe Checkout for the self-serve packages (Pass-52). Same
// chapter-6 shape as the book checkout: hosted page only, nothing
// granted here or on the thanks page — the signature-verified webhook
// sends the kickoff email. The Audit captures its flavor as a Stripe
// custom field so the kickoff email needs one less round-trip.
//
// Not yet linked from /services: the cards keep their mailto CTAs
// until the pay-yourself-live ritual passes at go-live (the
// money-UI-ships-last rule; see docs/PACKAGES-RUNBOOK.md).
"use server";

import { headers } from "next/headers";

import { AUDIT_FLAVORS, SKUS } from "@/lib/catalog";
import { getPriceId, getStripe } from "@/lib/stripe";

type Result = { ok: true; url: string } | { ok: false; error: string };

const OWNER = "micah@micahjonesconsulting.com";
const FALLBACK = {
  ok: false as const,
  error: `Checkout isn't open yet — email ${OWNER} and I'll take care of you directly.`,
};

export async function createPackageCheckout(skuKey: string): Promise<Result> {
  const sku = SKUS[skuKey];
  if (!sku || sku.kind !== "package") {
    // eslint-disable-next-line no-console
    console.error("[package-checkout] unknown or non-package sku:", skuKey);
    return { ok: false, error: "That package doesn't exist." };
  }

  const stripe = getStripe();
  if (!stripe) {
    // eslint-disable-next-line no-console
    console.warn("[package-checkout] STRIPE_SECRET_KEY not set");
    return FALLBACK;
  }

  try {
    const priceId = await getPriceId(stripe, sku.lookupKey);
    if (!priceId) {
      // eslint-disable-next-line no-console
      console.error("[package-checkout] no active price for", sku.lookupKey);
      return FALLBACK;
    }

    const h = await headers();
    const host = h.get("host") ?? "www.micahjonesconsulting.com";
    const proto = h.get("x-forwarded-proto") ?? "https";
    const origin = `${proto}://${host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/services/thanks`,
      cancel_url: `${origin}/services#packages`,
      // Shared Stripe account: this tag is what our webhook delivers
      // against (see app/api/stripe/webhook/route.ts).
      metadata: { product: sku.lookupKey },
      ...(sku.lookupKey === "audit-2500"
        ? {
            custom_fields: [
              {
                key: "flavor",
                label: { type: "custom" as const, custom: "Audit flavor" },
                type: "dropdown" as const,
                dropdown: {
                  options: AUDIT_FLAVORS.map((f) => ({
                    label: f,
                    value: f.toLowerCase(),
                  })),
                },
              },
            ],
          }
        : {}),
    });

    if (!session.url) {
      // eslint-disable-next-line no-console
      console.error(
        "[package-checkout] session created without url",
        session.id,
      );
      return { ok: false, error: "Checkout hiccuped. Try again in a minute." };
    }
    return { ok: true, url: session.url };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[package-checkout] session create failed:", err);
    return { ok: false, error: "Checkout hiccuped. Try again in a minute." };
  }
}
