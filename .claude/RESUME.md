# RESUME — micahjonesconsulting (2026-09-03)

## READ THIS FIRST
New phase: **act on the research**, not on instinct. Three packages exist and the
next work is driven by them, not by fresh opinion. Start at
`.planning/handoff/PHASE-RESEARCH-ACTION.md` — it names the artifacts, the open
decisions and the traps. This file is state only; that file is the brief.

History before 2026-09-03 lives in
`.planning/archive/RESUME-ARCHIVE-through-2026-09-03.md`. The claims ledger
(`docs/LESSONS_LEARNED.md` #3) outranks any memory of what the site says.

## Current state
Site live, both domains re-aliased each deploy (LESSONS #5). Tree clean, nothing
unpushed. Build gate = copy-lint + vendor-gate + `next build` + render-gate
(LINKS / META / GLUE / DASH). Never bypass it.

15 routes. Two lanes, deliberately asymmetric: **engagements book a call**
(`/book`), **packages buy first then book** (`/book/kickoff`, noindex).
`/contact` stays in the nav for anyone who would rather write.

The book moved out: `Code/the-80-percent-wall`. `product/playbook/` here is a
FROZEN COPY — do not edit it. A book change reaches a buyer only via
`npm run publish:site` in that repo, then a build and deploy here.

## OWED, in priority order
1. **Stripe webhook is NOT registered.** A real purchase today takes the money and
   sends nothing. Register the live destination for
   `/api/stripe/webhook` (`checkout.session.completed`,
   `checkout.session.async_payment_succeeded`, `charge.refunded`), put its
   `whsec_` in Vercel **Production**, redeploy. Then one live buy + refund.
   Checkout authenticates; everything after the card is untested.
2. **Vercel Web Analytics was never enabled.** `<Analytics />` is mounted and the
   API 404s. Zero traffic data has ever been collected — every copy decision to
   date was made without one measured conversion. Enable it before judging any
   change.
3. Three stale artifacts: `/packages` intro still says "email me" beside Buy
   buttons; `/about` meta says "A decade" while the page says thirteen years;
   `.claude/brand.json` declares an audience the positioning has moved away from.

## Standing traps that cost time today
- **Stripe prefixes:** `sk_` secret, `pk_` publishable, `mk_` a key ID. Production
  shipped with `mk_`. Read the error; it names the prefix.
- **Vercel env vars only apply on a NEW deployment.** A correct fix looks broken
  until you redeploy.
- `grep -oiF` gives FALSE ZEROES on this tree. Verify page text with Python,
  decoding UTF-8 explicitly.
- The RSC payload repeats page prose; a `$` there is doubled. Strip `<script>`
  before counting anything.
- The copy-lint write hook rejects documents that merely QUOTE the banned words.
