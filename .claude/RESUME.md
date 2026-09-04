# RESUME — micahjonesconsulting (2026-09-04)

## READ THIS FIRST
Phase: **act on the research**. Brief: `.planning/handoff/PHASE-RESEARCH-ACTION.md`.
This file is state only; that file is the brief. History before 2026-09-03 lives in
`.planning/archive/RESUME-ARCHIVE-through-2026-09-03.md`. The claims ledger
(`docs/LESSONS_LEARNED.md` #3) outranks any memory of what the site says.

**Current task: the research-to-action map.** No page edits until the operator
rules on it. Nothing has been edited this session.

## BLOCKED ON THE OPERATOR
**The Reddit evidence package is still not on disk.** 5,456 posts, ten
subreddits. `.planning/research/reddit-seed.md` is the seed, not the findings.
It must land at `.planning/research/01-REDDIT-EVIDENCE.md` before any
market-language row of the map can be filled. Findings that need it are marked
NEEDS REDDIT EVIDENCE and left as open slots rather than guessed at.

## Verified this session (2026-09-04)
Live snapshot of 19 routes committed at `.planning/snapshots/2026-09-04/`
(`python scripts/snapshot-live.py` regenerates; raw HTML gitignored). This is
ground truth for every verbatim quote. Confirmed against it:
- All three stale artifacts are STILL LIVE: `/packages` "Pick one, email me"
  beside three Buy buttons (zero mailto); `/about` meta "A decade" against
  thirteen years in the body; `.claude/brand.json` `.audience.primary` still
  naming the pre-two-lane audience.
- Body copy carries ZERO em-dashes on every page. The two per page are the
  `<title>` and the nav. The voice rule is holding — protect it, do not "fix" it.
- **The book's Stripe rail is fully built and not connected to a button.**
  `playbook-99` in `lib/catalog.ts`, `app/actions/playbook-checkout.ts`,
  `lib/playbook-delivery.ts` all exist and are verified ahead of the gate. The
  action's own comment: the buy-button flip "is a launch-gate decision". The #2
  most-visited page cannot sell, and the only missing piece is a date ruling.

## Site state
Live, both domains re-aliased each deploy (LESSONS #5). Build gate = copy-lint +
vendor-gate + `next build` + render-gate (LINKS / META / GLUE / DASH). Never bypass.
15 routes. Two lanes, deliberately asymmetric: engagements book a call (`/book`),
packages buy first then book (`/book/kickoff`, noindex). `/contact` stays in nav.
The book lives in `Code/the-80-percent-wall`; `product/playbook/` here is a
FROZEN COPY — do not edit it. Book changes reach a buyer only via
`npm run publish:site` there, then a build and deploy here.

Traffic (7 days to 2026-09-04): 26 visitors, 146 views, 35% bounce. `/` 19,
`/playbook` 15, `/services` 9, `/about` 7, `/book` 6. Referrers: google.com 1,
checkout.stripe.com 1 (his own test). Directional only — 26 visitors cannot
evaluate copy. Zero revenue has ever passed through the site.

## OWED, in priority order
1. **Stripe webhook is NOT registered.** A real purchase today takes the money and
   sends nothing. Register the live destination for `/api/stripe/webhook`
   (`checkout.session.completed`, `checkout.session.async_payment_succeeded`,
   `charge.refunded`), put its `whsec_` in Vercel **Production**, redeploy, then
   one live buy + refund. Runbook: `docs/MONEY-RAIL-TEST.md`.
2. The three stale artifacts above.
3. Open operator decisions, none resolved: playbook launch date · the $149 raise
   trigger · chapter 10 (thin, per three reviewers) · the VA lane (N of 1) ·
   any further role/title sweep · itemising the birth worker's services (default: no).

## Standing traps
- **Stripe prefixes:** `sk_` secret, `pk_` publishable, `mk_` a key ID. Production
  shipped with `mk_`. Read the error; it names the prefix.
- **Vercel env vars only apply on a NEW deployment.** A correct fix looks broken
  until you redeploy.
- `grep -oiF` gives FALSE ZEROES on this tree. Verify page text with Python,
  decoding UTF-8 explicitly.
- The RSC payload repeats page prose; a `$` there is doubled. Strip `<script>`
  before counting.
- The copy-lint write hook rejects documents that merely QUOTE the banned words.
- **A review is a reader, not an oracle.** Two of six persona findings inverted
  under checking; one would have published a newly-wrong number.
- Two sessions run this tree. `git status` before the first write; stage by
  explicit path; never `git add -A`.
