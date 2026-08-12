# RESUME — REWRITE whole-file every task. Never append. Last rewrite: 2026-08-11

## Now
- Design-elevation arc COMPLETE in code + audited. 11 commits local, NOTHING pushed
  or deployed. Working tree clean at b7872f0.
- Waves: 60bc53a W1 case re-port · d76276d W2 spec tables + weighted home · a55e29e W3
  P1 batch · 868dffe W4 P2 polish · 8e3cb3b Pass-37 delete /v1-/v4 (9 fonts -> 3;
  31 routes -> 17) · 31695b6 Pass-38 a11y contrast · b7872f0 Pass-39 visual-QA fixes.
- /premium audit run (4 legs, prod build on :3000):
  MOTION 13/13 PASS (rotator one-shot parks at -4em, marquee scroll-coupled + returns,
  entrance 0.35s, nav chip, underline draw 867ms, reduced-motion zero animations, CLS 0).
  A11Y: 17 real serious -> all fixed in Pass-38, each re-probed by computed style
  (4.56-8.16:1). Discarded false positive: /work nav "white on cream" — axe reads the
  pre-blend #fff; screenshot shows dark legible nav.
  VISUAL: 2 real mobile defects -> fixed in Pass-39. NOTE: the Cowork hero-clip finding
  I discarded on 2026-08-11 was REAL (52px clamp floor forced a wrap at <=416px) —
  correction logged.
  PERF: FAILS the >=95 gate (87 / 90 / 86; LCP 3.6-4.2s simulated mobile) BUT beats the
  live baseline probed identically (80, LCP 5115ms, CLS 0.068 -> 0.0003). Named levers:
  render-blocking CSS ~450ms, 82-103KB unused JS, 128KB woff2.

## Queue (operator-owned)
1. DECIDE: ship now (strict improvement, perf gate unmet) or fix perf first. Recommend
   ship — live is worse on every metric incl. a CLS budget violation.
2. Wordmark teal blend at top-of-page: keep, or solid cream everywhere? (asked, unanswered)
3. Vercel dashboard: add www as project domain (kills per-deploy re-alias, LESSONS #5).
4. Artifacts (D12): Ordani screenshots (#1), /about portrait, redacted RFP report.

## Verification gaps (self-certified, name them before claiming done)
- Axe + the 9-shot visual sweep were NOT re-run after Pass-38/39; fixes verified by
  targeted computed-style probes + measurements + one eyeballed 390 screenshot.
- Perf not re-measured after Pass-37's font cut (6 fewer families should help LCP).

## LIVE / MUST-RECONCILE
- [2026-06-18] www is a PER-DEPLOY ALIAS — every deploy re-aliases BOTH (CARD 1).
- [2026-08-11] 11 commits unpushed/undeployed — operator gate.

## Pointers
- Decisions: .planning/reviews/DESIGN-DECISIONS-2026-08.md | Review:
  REVIEW-DESIGN-2026-08-10-COWORK.md | Lessons: docs/LESSONS_LEARNED.md (#3 ledger,
  #6 RSC space bug) | Techniques: .claude/STANDING_TECHNIQUES.md (CARD 1 ship flow)
