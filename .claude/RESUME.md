# RESUME — SHIPPING redesign-wave4 → main (production)

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

## Ship flow in progress (LESSONS #5 / CARD 1)
1. Merge redesign-wave4 → main, push (auto prod deploy). ← current step
2. Re-alias BOTH: micahjonesconsulting.vercel.app + www.micahjonesconsulting.com to new deployment.
3. Verify parity via data-dpl-id on both domains; smoke: /, /book, /work/ordani, favicon.ico
   (1174 bytes), LinkedIn in footer.

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
