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
- $149 playbook "The 80% Wall": DECISIONS LOCKED (operator 2026-08-31 "stripe. go with
  recommendation") = Stripe rail + vibe-coder SEO audience + chapter drafting go. Chapter 1 BUILT
  (Pass-23) then REBUILT as v2 (Pass-25) on operator direction "less AI, more special": field-manual
  design system (62-char measure, marginalia rail, § codes, 2 line diagrams, spec cover, PRE-FLIGHT
  card, dated build-log entries, closing page w/ manual + hire-me paths). 9pp, all gates green.
  Persona review (buyer: maybe-leaning-yes on $99; "hire him" moment = dead-forms story) + expert
  review (claude-code-guide vs live docs; 3 fixes applied, 2 rejected w/ reasons) both done.
  APPROVED + SHIPPED 2026-08-31 ("approved - verified worked"): delivery live and VERIFIED end-to-end
  (live-form self-test → "Chapter 1 is on its way"; chapter emailed to micah@).
  HIPAA ruling: operator confirmed Ordani is HIPAA-compliant → "HIPAA-grade" swept everywhere,
  ledger NEVER-entry added. GSC: domain verified, TXT in Vercel DNS; sitemap submission = operator.
  Next: ch.2 "The spec is the moat", first SEO article (ch.1 topic), Stripe when manuscript done.

## Latest (2026-08-31 PM)
- MANUSCRIPT COMPLETE (Pass-38): all 10 chapters written, gate-clean (check.py: banned words,
  em-dash cap, fieldnote-collision — added Pass-37 after 4th recurrence; first run caught 3 latent
  defects in approved chapters; the regex fix script scrambled ch.2, repaired by hand). Ch.2-9
  operator-approved, ch.10 APPROVED. BOOK ASSEMBLED (Pass-39): 76pp single PDF, cover + queried
  TOC + edition switch (sampler colophon suppressed in book). VENDOR GATE now build-blocking (Pass-40: operator caught /playbook
  leak; 3 fixes live-verified; scripts/vendor-gate.mjs negative-tested). Companion files DONE
  (Pass-41: 26 files, zipped). REMAINING:
  Stripe checkout (operator owns account setup), launch email, /playbook page update at launch.
  (superseded: assembly (cover, TOC, single full PDF),
  companion files (prompt files, checklists, spec templates), Stripe checkout wiring, launch
  email to waitlist.)
- DOMAIN FIXED PERMANENTLY (2026-08-31 PM): after the LESSONS #9 loop incident, coordinated fix
  executed — alias dropped, operator added www at PROJECT Settings->Domains, no redirect. Verified:
  www 200 direct, apex 308->www one hop, build parity. RE-ALIAS CHORE IS DEAD — deploys move www
  automatically now. Optional parked: Vercel's recommended apex A-record IP update (216.150.1.1;
  legacy IP keeps working).
- Mobile polish SHIPPED + live-verified (Pass-30/30b): TitleCard static under 768px (no pin;
  pin-spacer inline styles had defeated CSS fixes — component-level matchMedia gate), 44px menu
  tap targets, footer link padding, spec-table swipe hint, end-matter gap 128->56. Desktop pin
  verified intact at 1440. Audit remnants (nitpicks, unfixed): home engagement-row numbering
  rhythm, ai-engineering intro tightness.
- GSC: domain verified + sitemap submitted successfully (operator confirmed "it worked").

## Workstream split (2026-08-31)
BOOK WORK MOVED to a dedicated session (operator request): product/playbook/HANDOFF.md is that
workstream's book-of-record (pipeline, gates, missions: harness research, perfection pass,
"life"/animation concept w/ DISCUSS lock). Spawn chip issued. THIS session keeps: site,
consulting, SEO arc, email/booking ops. Do not double-write product/playbook/ from here while
that session is active.

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
