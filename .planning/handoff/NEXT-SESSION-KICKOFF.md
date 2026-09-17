# Kickoff: micahjonesconsulting, after the Pass-120 release (2026-09-16)

`.claude/RESUME.md` is current state and outranks this file. This file supersedes the Pass-120 BUILD
kickoff (git history keeps it, commit `1143dda`).

## 0. Where things stand

- Pass-120 is LIVE: `main` = `c525329`, `dpl_4C69xGq9PfH9ujTHBjqZ2Ecw3tdg` on
  `www.micahjonesconsulting.com` and `micahjonesconsulting.vercel.app` (data-dpl-id match, checked
  2026-09-16). Revert: promote `dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23`. Never force-push `main`.
- Released on Micah's words of 2026-09-16 ("Override, release today"), which also overrode brief A4's
  lab LCP limit: on Vercel /work simulates 3311ms against 2711ms before, while observed LCP is
  265-300ms against 277ms. Speed Insights p75 for /work decides; Micah reads it.
- The record of the arc: brief `.claude/briefs/pass-120-work-page.md`; rulings
  `.planning/reviews/FABLE-120-FIRST-PREVIEW.md`, `RC2-COPY-120.md`, `FABLE-120-SHIP-GATE.md`,
  `MOTION-120-APPROVAL.md`; ledger rows in `docs/LESSONS_LEARNED.md` #3 dated 2026-09-16; LESSONS #34
  (grep -iF crashes) and #35 (no parked copy defects).

## 1. Boot, in order

1. `.claude/RESUME.md`.
2. `C:/Users/micah/.claude/CLAUDE.md`, `C:/Users/micah/.claude/ULTRACODE_OPERATING_PATTERNS.md`.
3. `grep -n '2026-09-16' docs/LESSONS_LEARNED.md` and read those ledger rows before any copy work.

## 2. What is open (none blocks anything)

- Speed Insights p75 LCP for /work, / and /services: Micah reads it in the Vercel dashboard.
- Parked in RESUME: delete the unmounted `components/EditorialTimestamp.tsx`; the settle120 S6
  cause check the motion-engineer asked for; the motion-engineer's offer to start the settle after the
  900ms dim on client navigation (needs Micah's word); the optional "eleven awards" wording.
- Any push to `main` deploys production, and both domains must then be re-aliased to the newest
  production deployment (LESSONS #5, STANDING_TECHNIQUES CARD 1). Micah's words that day first.

## 3. Working with Micah

Questions by AskUserQuestion popup (at most four, recommended option first, read his Other text
literally). Ledger every answer before an agent launches (#32). Raise any sentence that reads badly the
moment it is seen, with rewrites to pick from (#35). He wants captures at 390 and 1440 before
approving visual work.
