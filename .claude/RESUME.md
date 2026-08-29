# RESUME — REWRITE whole-file every task. Never append. Last rewrite: 2026-08-29

## Now — EMAIL. Half done; two operator steps remain.
Found while setting up the alias: `hello@micahjonesconsulting.com` had **zero MX**
and has bounced every message since launch, while printed on 6 live surfaces (both
footers, home CTA, /hire-me CTA, llms.txt). No SPF/DKIM/DMARC either, so the Resend
domain is unverified and the two LIVE lead forms (playbook-signup, beta-signup) have
their `hello@` notification rejected at the API — those leads exist only in Vercel
server logs. Recorded as LESSONS #8 with an MX gate.

DONE (me, `vercel dns add`; all four verified live via 8.8.8.8):
  MX 10 mx1.improvmx.com · MX 20 mx2.improvmx.com
  TXT @ `v=spf1 include:spf.improvmx.com ~all` · TXT _dmarc `v=DMARC1; p=none;`
  Website A 76.76.21.21 untouched. Revert: `vercel dns rm <id>` (`vercel dns ls`).

STEP 1 (operator, 2 min, free) — RECEIVING. improvmx.com signup, add domain, create
`hello@` + `micah@` + catch-all → micahmccoyjones@gmail.com. DNS is already green so
it verifies instantly. This alone gets mail flowing.

STEP 2 (operator, ~10 min, free) — SENDING AS the address. Do AFTER step 1: the Gmail
confirmation code needs forwarding live. Resend dashboard → add domain
`micahjonesconsulting.com` (ROOT, not a subdomain — keeps DKIM aligned so Gmail shows
no "via" label) → paste me the 3 records, I add them. Then Gmail → Settings → Accounts
→ Send mail as: smtp.resend.com : 587 : user `resend` : password = a Resend API key.
Fixes the two dead lead forms in the same move. Never paste that key into a session.

Registrar + DNS are Vercel (NS ns1/ns2.vercel-dns.com, expires 2026-12-02). Vercel
offers NO email — a third party is required for both halves.

## Queue (operator-owned, unchanged)
1. Vercel dashboard: add www as a project domain — retires the per-deploy re-alias
   AND the auto-deploy domain-split trap (LESSONS #5).
2. Artifacts (D12): Ordani screenshots (#1 visual win), /about portrait
   (public/README.md), redacted RFP report.
3. Optional: run `.planning/prompts/cowork-review-2026-08-premium-tier.md`.

## Site state
SHIPPED, all three addresses on one deployment (perf 93 · a11y 96 · SEO 100 · LCP
3017ms · CLS 0). Latest commit 91b7bd6. D14 = keep all three typefaces.

## Harnesses
`/cross-review plan|diff` (CARD 6) · `node scripts/visual-baseline.mjs [--reduced]`

## LIVE / MUST-RECONCILE
- [2026-06-18] www is a PER-DEPLOY ALIAS — re-alias BOTH after every push (CARD 1).
- [2026-08-29] Any new `mailto:` must answer MX before ship (LESSONS #8 has the cmd).

## Pointers
Decisions `.planning/reviews/DESIGN-DECISIONS-2026-08.md` (D1-D14) · Lessons
`docs/LESSONS_LEARNED.md` (#3 facts ledger, #5 www alias, #8 email MX)
