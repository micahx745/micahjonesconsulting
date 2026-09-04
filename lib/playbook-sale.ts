// lib/playbook-sale.ts
//
// Pass-98. The one switch that turns /playbook from a waitlist page into a
// storefront. OFF is the default and OFF is what ships today: the $99 rail
// (app/actions/playbook-checkout.ts) is built and test-verified, but the live
// Stripe webhook is not registered yet, so a buy button would take money the
// delivery path cannot honour (docs/MONEY-RAIL-TEST.md, brief §8.1).
//
// Read on the server only. `process.env` is inlined at BUILD time on Vercel,
// so flipping this is an env-var change PLUS a redeploy, never a live toggle.
// Both states are built and verified in the same pass; nothing about the ON
// state is discovered on launch day.
export const PLAYBOOK_ON_SALE = process.env.PLAYBOOK_ON_SALE === "1";
