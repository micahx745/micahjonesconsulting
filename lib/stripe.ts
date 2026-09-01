// lib/stripe.ts — the one place the Stripe client is constructed.
//
// Chapter 6 rules apply to this rail end to end: hosted checkout only,
// money truth comes from signature-verified webhooks, events are
// deduped, refunds echo. Keys are read lazily inside the factory so
// builds pass without secrets (house pattern, see app/actions/contact.ts).
// Test and live mode are separated by environment: sk_test_ lives in
// Development/Preview, sk_live_ goes to Production only at go-live.
import Stripe from "stripe";

export const PRICE_LOOKUP_KEY = "playbook-99";

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

// Resolve any catalog price by lookup key so no per-mode price id is
// hardcoded (price ids differ between test and live mode).
export async function getPriceId(
  stripe: Stripe,
  lookupKey: string,
): Promise<string | null> {
  const prices = await stripe.prices.list({
    lookup_keys: [lookupKey],
    active: true,
    limit: 1,
  });
  return prices.data[0]?.id ?? null;
}

// Back-compat name used by the book checkout (Pass-49).
export async function getPlaybookPriceId(
  stripe: Stripe,
): Promise<string | null> {
  return getPriceId(stripe, PRICE_LOOKUP_KEY);
}
