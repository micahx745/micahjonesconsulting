// scripts/stripe-setup.mjs — idempotent Stripe catalog setup, per mode.
//
// Creates "The 80% Wall" product and its $99 price under the
// playbook-99 lookup key when they don't exist; prints the price id
// (not a secret) either way. The mode follows the key in
// STRIPE_SECRET_KEY, so the same script does test now and live at the
// go-live swap (prices are per mode — chapter 6's fourth silent swap).
//
// Run from repo root:
//   node --env-file=.env.local scripts/stripe-setup.mjs
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("STRIPE_SECRET_KEY not set — pass --env-file=.env.local");
  process.exit(1);
}
const mode = key.startsWith("sk_test_") ? "TEST" : "LIVE";
const stripe = new Stripe(key);

const LOOKUP_KEY = "playbook-99";

const existing = await stripe.prices.list({
  lookup_keys: [LOOKUP_KEY],
  active: true,
  limit: 1,
});
if (existing.data.length > 0) {
  const p = existing.data[0];
  console.log(`[${mode}] price exists: ${p.id} (${p.unit_amount / 100} ${p.currency})`);
  process.exit(0);
}

const product = await stripe.products.create({
  name: "The 80% Wall",
  description:
    "A field manual for solo builders: the 68-page PDF plus the companion files, delivered by email.",
});
const price = await stripe.prices.create({
  product: product.id,
  unit_amount: 9900,
  currency: "usd",
  lookup_key: LOOKUP_KEY,
});
console.log(`[${mode}] created product ${product.id}, price ${price.id} ($99, lookup ${LOOKUP_KEY})`);
