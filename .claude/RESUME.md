# RESUME — redesign-wave4 (preview only; NEVER push main without operator approval)

## State (2026-08-31)
20 passes committed. Head: c94ed56 (Pass-20b prettier). Operator verdict on preview: "overall love the website."
Booking system (/book, self-hosted Calendly replacement) built + unit-tested (scripts/busy-selftest.ts green).

**Env vars INSTALLED in Vercel (all 3 environments; Preview is branch-scoped to redesign-wave4):**
RESEND_API_KEY + BOOKING_CAL_ICS_URL. Preview add required branch-positional form:
`npx vercel env add NAME preview redesign-wave4 --value "$V" --yes --scope passioneer`.
Discovery: project had ZERO env vars before this — production contact/playbook/beta forms were silently
log-only since launch. Now fixed for production too (next prod deploy picks them up).

**Live-feed verification:** Google secret-ICS URL serves 200 (curl + Node, 10/10 after settling); endpoint
404s transiently after request bursts → Pass-20 added one retry in slotIsBusy (still fails open).

## In flight
- Preview build for c94ed56 (bg poll bgmx06buw) → when READY: mint share link (get_access_to_vercel_url on
  https://micahjonesconsulting-git-redesign-wave4-passioneer.vercel.app), hand to operator for booking retest.

## Operator queue (parked, operator-owned)
1. **SECRET ROTATION after booking retest passes** — both secrets were pasted into chat (transcript exposure):
   Resend: create new key, delete re_V6JggJBd…; Google Calendar: Settings → integrate → "Reset" secret address.
   Then update all 3 Vercel envs for both vars (same branch-positional CLI form for preview).
2. Ship decision: fold redesign-wave4 → main (CARD 1: push, re-alias BOTH domains, verify data-dpl-id parity).
3. Add www.micahjonesconsulting.com as Vercel project domain (LESSONS #5 kills the re-alias chore).
4. Postmates years for ledger row; ordani-work.jpg interim (swap when better shot exists).

## Approvals on record
- "yeah go with that next step" (2026-08-30) = preview push approved. Main/prod: NOT approved.

## Gotchas
- Share links (_vercel_share) die on every push — remint per build.
- Preview HTML greps: RSC chunking breaks exact-string matches; use loose greps.
- Secrets: never inline in commands — temp file + $(cat), delete after.
