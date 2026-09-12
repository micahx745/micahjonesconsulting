// app/actions/package-checkout.ts
//
// Hosted Stripe Checkout for the self-serve packages (Pass-52). Same
// chapter-6 shape as the book checkout: hosted page only, nothing
// granted here or on the thanks page — the signature-verified webhook
// sends the kickoff email.
//
// Pass-111b (decision 3): the page's area pick travels as
// metadata.area, server-validated here. With no pick, EVERY package
// SKU (not only the Audit) asks the same question as a required
// "Which area?" dropdown, so the area is captured on every Buy path.
//
// Not yet linked from /services: the cards keep their mailto CTAs
// until the pay-yourself-live ritual passes at go-live (the
// money-UI-ships-last rule; see docs/PACKAGES-RUNBOOK.md).
"use server";

import { headers } from "next/headers";

import { AREAS, isAreaValue, SKUS } from "@/lib/catalog";
import { getPriceId, getStripe } from "@/lib/stripe";

type Result = { ok: true; url: string } | { ok: false; error: string };

const OWNER = "micah@micahjonesconsulting.com";
const FALLBACK = {
  ok: false as const,
  error: `Checkout isn't open yet. Email ${OWNER} and I'll take care of you directly.`,
};

export async function createPackageCheckout(
  skuKey: string,
  area?: string,
): Promise<Result> {
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

    // Server-validated area pick (Pass-111b): metadata when the page's
    // picker made one, the required dropdown when it did not.
    const hasArea = isAreaValue(area);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/services/thanks`,
      // Pass-70: the packages moved to their own page; a cancelled checkout
      // used to land back on /services, which no longer shows them.
      cancel_url: `${origin}/packages`,
      // Shared Stripe account: these tags are what our webhook delivers
      // against (see app/api/stripe/webhook/route.ts).
      metadata: hasArea
        ? { product: sku.lookupKey, area }
        : { product: sku.lookupKey },
      ...(hasArea
        ? {}
        : {
            custom_fields: [
              {
                key: "area",
                label: { type: "custom" as const, custom: "Which area?" },
                type: "dropdown" as const,
                dropdown: {
                  options: AREAS.map((a) => ({
                    label: a.label,
                    value: a.value,
                  })),
                },
              },
            ],
          }),
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
    // A CONFIGURATION error is not transient, and telling a buyer to "try again
    // in a minute" sends them into a loop that can never succeed. This bit on
    // 2026-09-03: production had STRIPE_SECRET_KEY set to a key *ID* (the
    // "mk_..." identifier the dashboard lists) rather than the revealed
    // "sk_live_..." secret, so every click returned a StripeAuthenticationError
    // and every buyer was told to wait and retry. Auth and permission failures
    // now route to the same email path a missing key uses. Only genuinely
    // transient failures keep the retry wording.
    const type = (err as { type?: string } | null)?.type;
    if (
      type === "StripeAuthenticationError" ||
      type === "StripePermissionError" ||
      type === "StripeInvalidRequestError"
    ) {
      return FALLBACK;
    }
    return { ok: false, error: "Checkout hiccuped. Try again in a minute." };
  }
}
