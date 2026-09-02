// scripts/stripe-setup.mjs — idempotent Stripe catalog setup, per mode.
//
// Creates every product + price the site sells when they don't exist,
// keyed by lookup key; prints price ids (not secrets) either way. The
// mode follows STRIPE_SECRET_KEY, so the same script does test now and
// live at the go-live swap (prices are per mode — chapter 6's fourth
// silent swap).
//
// SOURCE OF TRUTH for names/amounts/descriptions: lib/catalog.ts.
// This .mjs mirrors it (can't import TS); a price change touches both,
// same commit (docs/PACKAGES-RUNBOOK.md rule).
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

// Mirrors lib/catalog.ts.
const CATALOG = [
  {
    lookupKey: "playbook-99",
    name: "The 80% Wall",
    amount: 9900,
    description:
      "A field manual for solo builders: the 69-page PDF plus the companion files, delivered by email.",
  },
  {
    lookupKey: "unstick-500",
    name: "The Unstick Session",
    amount: 50000,
    description:
      "90 minutes live on your stuck build plus a same-day written fix plan. Kickoff scheduling by email after checkout.",
  },
  {
    lookupKey: "audit-2500",
    name: "The Audit",
    amount: 250000,
    description:
      "Two-week fixed-scope audit (Build, Production, or Traction): written memo, prioritized fix sequence, one-hour debrief.",
  },
  {
    lookupKey: "sprint-7500",
    name: "The Sprint",
    amount: 750000,
    description:
      "One week embedded on one outcome, shipped. Kickoff scheduling by email after checkout.",
  },
];

for (const item of CATALOG) {
  const existing = await stripe.prices.list({
    lookup_keys: [item.lookupKey],
    active: true,
    limit: 1,
  });
  if (existing.data.length > 0) {
    const p = existing.data[0];
    console.log(
      `[${mode}] ${item.lookupKey}: exists — ${p.id} ($${p.unit_amount / 100})`,
    );
    continue;
  }
  const product = await stripe.products.create({
    name: item.name,
    description: item.description,
  });
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: item.amount,
    currency: "usd",
    lookup_key: item.lookupKey,
  });
  console.log(
    `[${mode}] ${item.lookupKey}: created product ${product.id}, price ${price.id} ($${item.amount / 100})`,
  );
}
