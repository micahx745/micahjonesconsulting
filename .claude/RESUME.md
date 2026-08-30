# RESUME — REWRITE whole-file every task. Never append. Last rewrite: 2026-08-30

## Now — REDESIGN, method pivot: real site only (D-R14)
Four style tiles refused ("the entire site looks like AI... current site way more
professional"). Verdict on the METHOD: standalone mockups cannot beat the live
site's embedded design system and always read as AI mockups. All work now happens
as surgical edits in the production codebase on branch `redesign-wave4`, judged as
production-build screenshots against the live site. NEVER push this branch or main
without operator approval — push fires auto-deploy (LESSONS #5).

## Branch redesign-wave4 — Pass-1..3 COMMITTED, awaiting operator verdict
Pass-1 (1511768): reveal system FIXED (dead @supports + RevealMount deleted, IO
path live, 24/24 below-fold hidden pre-scroll vs production's 0/24; timing
0.9s->0.55s). Hero rotating-word H1 untouched; locked thesis line in cw-sub.
Pass-2 (6799fe1): THE LEDGER replaces the espresso card grid — display names,
mono tabular outcomes, hairline color-mix rules, double-rule $20M+ total row.
4 rows link to case pages; SurveyMonkey row deliberately unlinked. Dead
cw-card/cw-cards/cw-shipped-also CSS excised (~180 lines). Title: "Every
figure is defensible on request." Caught by screenshot: mobile arrow orphaned
to its own grid row — explicit grid placement fixed it.
Pass-3 (13e08d5): home 615->559 rendered words. about-brief section DELETED
(duplicated hero thesis in the rejected symmetric-pair shape). Clients title
16 words -> "Three engagements." Rendered em-dashes 4-5 -> 0 prose (nav
overlay -> interpuncts, Neuton -> colon, AI desc -> period).
All gates per pass: pnpm build + copy-lint clean, production-server probe,
1440/390 no overflow, console clean. Server on :3000 STOPPED after last gate.
Operator is running Claude Design against the PUBLIC repo (main) in parallel —
main does NOT have these passes (14+ commits local-only, unpushed by design).

## Queued next passes (operator gates each)
4. Deeper cuts toward ~350: RevenueTick entry notes + Ordani lede are the
   remaining mass — both operator-reviewed copy, need his eyes before cutting.
5. Motion polish in the site's idiom (reveals now run; SplitReveal/counters).
6. Inner pages (/services merge D-R5, /about, /hire-me) per attack plan Wave 5.

## Taste ledger (do NOT re-violate)
D-R10 quiet luxury = ACCESS FOR ALL (warm, never austere). D-R11 his palette +
3 typefaces stay. D-R12 no symmetric-pair copy. D-R13 headline locked. D-R14 no
mockups. Handwriting fonts/tape/stitches = AI tells (tile 04 refusal). Full log:
`.planning/redesign-2026-08/DIRECTION.md`.

## Operator-owned queue (unchanged)
1. Vercel dashboard: add www as project domain (LESSONS #5).
2. Artifacts: Ordani screenshots (#1 visual win), /about portrait, RFP report.
3. Ordani origin sentence ("YOUR LINE" slot) — why he built it, one sentence.
4. Email: ImprovMX aliases + Gmail send-as DONE (confirmation received); Resend
   domain verified; lead forms now deliver.

## Pointers
Attack plan `.planning/REDESIGN-ATTACK-PLAN-2026-08.md` · DIRECTION (current state)
`.planning/redesign-2026-08/DIRECTION.md` · Defect proof
`.planning/DEFECT-reveal-system-2026-08-29.md` · Lessons `docs/LESSONS_LEARNED.md`
