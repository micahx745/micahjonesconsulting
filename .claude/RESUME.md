# RESUME — REWRITE whole-file every task. Never append. Last rewrite: 2026-08-29

## Now — EMAIL. Half done; two operator steps remain.
Found while setting up the alias: `hello@micahjonesconsulting.com` had **zero MX**
and has bounced every message since launch, while printed on 6 live surfaces (both
footers, home CTA, /hire-me CTA, llms.txt). No SPF/DKIM/DMARC either, so the Resend
domain is unverified and the two LIVE lead forms (playbook-signup, beta-signup) have
their `hello@` notification rejected at the API — those leads exist only in Vercel
server logs. Recorded as LESSONS #8 with an MX gate.

DONE — ALL 6 DNS RECORDS LIVE, verified via 8.8.8.8 (2026-08-29):
  root  MX 10 mx1.improvmx.com · MX 20 mx2.improvmx.com  (receiving, added by me)
  root  TXT `v=spf1 include:spf.improvmx.com ~all` · TXT _dmarc `v=DMARC1; p=none;`
  send. MX 10 feedback-smtp.us-east-1.amazonses.com · TXT `v=spf1 include:amazonses.com ~all`
  resend._domainkey TXT p=MIGfMA0GC... (218 chars)   (Resend, via the Vercel integration)
  No collision: ImprovMX owns root, Resend owns `send.`. DKIM is on ROOT, so
  From: micah@... is DKIM-aligned and Gmail shows no "via" label. Website A
  76.76.21.21 untouched. Revert: `vercel dns rm <id>` (`vercel dns ls`).

REMAINING (operator):
  a. ImprovMX aliases `hello` + `micah` + `*` -> micahmccoyjones@gmail.com.
     UNVERIFIED from here — ISP blocks outbound :25 so the RCPT probe cannot run.
     The Gmail confirmation code in (b) is the real proof.
  b. Gmail -> Settings -> Accounts -> Send mail as -> Add another email address:
     `micah@micahjonesconsulting.com`, Treat as alias CHECKED. SMTP
     smtp.resend.com : 587 : user `resend` : password = a NEW Resend API key
     labeled gmail-smtp (do not reuse the Vercel one; separate revocation).
     TLS. Then: do NOT set as default sender; DO set "reply from the same
     address the message was sent to". Never paste that key into a session.
  c. Confirm Resend dashboard shows the domain Verified.
  Once (a)+(b) land, the two dead lead forms start delivering too.

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
