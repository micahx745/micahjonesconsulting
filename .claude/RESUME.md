# RESUME — redesign SHIPPED to production (2026-08-31)

## Approval on record (verbatim)
Operator, 2026-08-31: "also just offer the full week reproduce thing and a part to take a look at
my website (make sure it live)" — in context of repeated ship-it prompts and his FYI that prod
still served the old design. Treated as production deploy approval for redesign-wave4.
Earlier: "yeah go with that next step" (2026-08-30) = preview push approval.

## State (2026-08-31)
21 passes. Head: 7a8f6ed (Pass-21: MJ favicon + home-footer LinkedIn). Build gate green.
Booking VERIFIED end-to-end by operator on preview: "booked and it worked - invite came through."
Env vars in all 3 Vercel environments (Preview branch-scoped; add via
`npx vercel env add NAME preview redesign-wave4 --value "$V" --yes --scope passioneer`).

## Ship COMPLETE (LESSONS #5 / CARD 1)
Merged db0b008 to main; prod deployment 6enhr2myp Ready; BOTH domains aliased and verified
parity (dpl_8uDfZYYBqZuxpH2nBWpqRKyNj4oX): hero, LinkedIn, /book, favicon 1174B, icon.svg 200,
apex 308→www. Booking live in production (env vars present).
REMEMBER: every future push to main needs the www re-alias (until operator adds www as
project domain).

## Active arcs (2026-08-31)
- SEO: technical sweep DONE (Pass-22 sitemap +/book/playbook/hire-me, live-verified; heads/JSON-LD/
  robots/llms.txt/canonicals all healthy; Lighthouse deployed-mobile baseline: home 95/100/100/100,
  playbook 97/100/100/100, LCP 2.9s home = next perf lever). Remaining: GSC (operator), content
  strategy (needs audience lock), chapter-article funnel.
- $149 playbook "The 80% Wall": landing live w/ working chapter-1 email capture; manuscript DOES NOT
  EXIST (no chapters, no ZIP, no payment rail). Plan: Chapter 1 first (promised to signups!) via
  Typst/PDFbuilder pipeline + wire form fulfillment; then ch.2-10; Lemon Squeezy recommended (MoR).

## Operator queue
1. SECRET ROTATION (was waiting on booking retest — retest PASSED, rotation now due):
   Resend new key + delete re_V6JggJBd…; Google Calendar Reset secret address; update 3 envs each.
2. Add www as Vercel project domain (Settings → Domains) to kill the re-alias chore.
3. Client outreach (Jamie Snitker, theboldlife.coach): email drafted (full-week remake offer,
   Google-folder file intake). Gmail signature re-issued: 3 lines (Micah Jones / Operator ·
   Oakland, CA / micahjonesconsulting.com hyperlinked).
4. Postmates years for ledger row; ordani-work.jpg interim.

## Gotchas
- Share links die per push; prod does NOT need them once domains alias.
- Google secret-ICS calendar endpoint 404s after bursts — slotIsBusy has one retry, fails open.
- Secrets never inline in commands; temp file + $(cat), delete after.
