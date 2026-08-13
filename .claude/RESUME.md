# RESUME — REWRITE whole-file every task. Never append. Last rewrite: 2026-08-13

## Now
- PERF + A11Y pass COMPLETE. 18 commits local, nothing pushed/deployed.
- Final: home 92 / work 93 / guardicore 92 (was 87/90/86). a11y 96/100/100,
  BP 96, SEO 100, CLS 0.0003/0/0. Contrast failures in true scroll state: 0.
- Pass-40 (37e5307): purged 4,291 dead CSS lines (52%), Bricolage `wdth` axis
  dropped (131K->77K), Zod off the client, favicon 26K->5.8K.
- Pass-41 (c042d8a): Framer Motion removed — MagneticArea reimplemented as a rAF
  spring on the same ODE/constants; deleted its last two dead importers
  (components/two-hands, lib/v2-motion.ts); `motion` out of package.json.
  Closes a standing CLAUDE.md violation. -39,891 B on 3 routes.
- Pass-42 (9f82101): wordmark regression fixed (Pass-38 put mix-blend-mode
  inside the nav's own stacking context -> flat white on cream, 1.28:1, only
  visible in a screenshot); 28 small-text opacities 0.5-0.85 -> 0.9; nav chip
  threshold 0.9*vh -> 40px so short-hero routes stop overprinting.

## The 95 question — ANSWERED with a measurement
Built once with custom fonts disabled: **97, LCP 2651ms, 245KB** vs today's
92 / 3407ms / 390KB. The three brand faces (144KB) ARE the 5-point gap.
`display: optional` tested and reverted — 92/3412ms, identical to swap, because
the bytes still travel. So >=95 costs a typeface; that is an operator brand
call, not an engineering one. /work already scores 93 carrying zero project JS.

## Queue (operator-owned)
1. DECIDE: ship (18 commits) or trade a typeface for >=95.
2. Vercel dashboard: add www as project domain (kills per-deploy re-alias, #5).
3. Artifacts (D12): Ordani screenshots (#1), /about portrait, redacted RFP report.
4. Wordmark question is now MOOT — the blend was broken and is gone (Pass-42).
5. Deferred, 0 bytes, small visual change: add Hanken 700 + JetBrains 600 —
   both are requested by CSS today with no matching face and get synthesized.
6. NOTE: components/PortraitImage.tsx is unreachable from every route AND its
   .portrait-slot CSS was purged. The documented portrait-drop flow in
   .claude/CLAUDE.md was already broken before the purge (nothing imports it) —
   when the portrait lands, /about needs the component wired AND styles added.

## Verification harness (new, reusable)
`node scripts/visual-baseline.mjs [--out DIR] [--reduced]` captures 33 shots
(11 routes x 390/768/1440); `--diff A B` does a real per-pixel compare with a
bounding box. `--reduced` makes captures deterministic. Captures gitignored.
Scratchpad has axe-verify.mjs — re-measures every axe hit AFTER scrolling it
into view, which is the only way to separate real failures from this site's
palette-shift false positives.

## LIVE / MUST-RECONCILE
- [2026-06-18] www is a PER-DEPLOY ALIAS — every deploy re-aliases BOTH (CARD 1).
- [2026-08-13] 18 commits unpushed/undeployed — operator gate.

## Pointers
- Decisions: .planning/reviews/DESIGN-DECISIONS-2026-08.md | Lessons:
  docs/LESSONS_LEARNED.md (#3 facts ledger, #6 RSC entity-space) | Techniques:
  .claude/STANDING_TECHNIQUES.md (CARD 1 ship flow)
