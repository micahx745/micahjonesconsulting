# RESUME — REWRITE whole-file every task. Never append. Last rewrite: 2026-08-11

## Now
- DESIGN-ELEVATION arc: ALL FOUR WAVES DONE, none deployed. Commits:
  W1 60bc53a (case re-port) · W2 d76276d (spec tables + weighted home) · W3 a55e29e
  (motion/CTA/curation/footers/scale) · W4 868dffe (gesture ext, 404, input, OG).
  13 decisions in .planning/reviews/DESIGN-DECISIONS-2026-08.md all implemented.
  Review scorecard coverage: R1 R3 R5 R6 R9 R11 R13 R15 R17 R18 addressed + both
  mobile-canvas bugs (401px root-caused: TitleCard double-padding) + dup lede/meta/
  captions + sticky-nav. Discarded (didn't reproduce): rotator 390 clip, /work
  five-line underline. LESSONS #6 added (RSC entity-space bug + gate).

## Queue (operator decisions — all parked, none absorbed)
1. EYEBALL the wave screenshots (sent in chat) → approve or request changes.
2. After visual OK: /premium audit (a11y axe + Lighthouse + visual-qa + copy-editor)
   — NOT yet run this session; it gates the deploy per CLAUDE.md definition of done.
3. Then ship per CARD 1 (build → deploy → alias BOTH domains → push). 6 commits local.
4. Dashboard: add www as project domain (kills manual re-alias, LESSONS #5).
5. Supply artifacts (D12): Ordani screenshots (#1), /about portrait, redacted RFP
   report. /about right column stays empty until portrait lands.
6. Decide: legacy /v1-/v4 routes stay public? They keep Inter/SS4/Fraunces/etc.
   loading at root — full R1 clear needs them gone or font-scoped.
7. P2-8 taste call: nav wordmark renders teal-ish at hero (mix-blend artifact);
   scrolled state now solid. Keep top-of-page blend or fold to solid everywhere?

## LIVE / MUST-RECONCILE
- [2026-06-18] www is a PER-DEPLOY ALIAS — every deploy re-aliases BOTH (CARD 1).
- [2026-08-11] 6 commits committed NOT pushed/deployed — operator gate. Local prod
  build verified at 390/768/1440; OS forces reduced-motion in local browsers, so
  normal-motion paths (rotator one-shot, marquee scroll-link) were verified via
  matchMedia-shim probes, not eyeballed — flag for the audit.

## Pointers
- Decisions: .planning/reviews/DESIGN-DECISIONS-2026-08.md | Review:
  REVIEW-DESIGN-2026-08-10-COWORK.md | Bar: docs/DESIGN_BAR.md
- Lessons: docs/LESSONS_LEARNED.md (#3 ledger, #6 RSC space bug) | Techniques:
  .claude/STANDING_TECHNIQUES.md (CARD 1 ship flow)
