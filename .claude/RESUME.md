# RESUME — REWRITE whole-file every task. Never append. Last rewrite: 2026-08-13

## Now
- PERF PASS in flight. Pass-40 committed (37e5307): home 87->91, work 90->92,
  guardicore 86->91; CSS chunk 156,177 -> 80,659 B; home transfer 504K -> 431K.
  Purged 4,291 dead CSS lines (52% of globals.css) + dead direction tokens, dropped
  Bricolage `wdth` axis (131K -> 77K), moved Zod off the client (TitleCard type-only
  import; MOT-02 validation now server-side), favicon 25,931 -> 5,821 B.
- PROOF OF SAFETY: scripts/visual-baseline.mjs (new, committed) captured 33 shots
  (11 routes x 390/768/1440) before and after under reduced-motion for determinism,
  then per-pixel diffed: 30 pixel-identical, 3 differ by 1/2/4 px of grain
  antialiasing. Captures are gitignored (48MB); regenerate with the script.
- IN FLIGHT: motion-engineer replacing `motion/react` in MagneticArea with a
  hand-rolled rAF spring (-40KB on /, /services, /services/ai-engineering). Also
  fixes a standing constitution violation — CLAUDE.md forbids Framer Motion.

## The 95 question (evidence, not opinion)
- Budget is Lighthouse mobile >=95 + LCP <=1800ms SIMULATED. Current 91/92/91.
- /work scores 92 carrying ZERO project JS — its 157KB is the irreducible React +
  Next App Router runtime. Add the 3 brand fonts (144KB: Bricolage 77 + Hanken 35 +
  JetBrains 32) and the floor is ~300KB, which is ~1.9s of transfer alone at
  Lantern's 1.6Mbps. LCP <=1800ms is therefore likely unreachable while the site
  loads three custom faces. NEXT STEP: run the ceiling experiment (temporarily
  build with system fonts, measure) to give the operator a real number before
  asking for a brand tradeoff.

## Queue (operator-owned)
1. DECIDE: ship now (13+ commits, all verified) or keep chasing 95.
2. Wordmark teal blend at top-of-page: keep, or solid cream? (asked twice, unanswered)
3. Vercel dashboard: add www as project domain (kills per-deploy re-alias, LESSONS #5).
4. Artifacts (D12): Ordani screenshots (#1), /about portrait, redacted RFP report.
5. Deferred, 0 bytes, small visual change: add Hanken 700 + JetBrains 600 weights —
   both are currently requested by CSS with no matching face and get synthesized.

## LIVE / MUST-RECONCILE
- [2026-06-18] www is a PER-DEPLOY ALIAS — every deploy re-aliases BOTH (CARD 1).
- [2026-08-13] 14 commits unpushed/undeployed — operator gate.

## Pointers
- Decisions: .planning/reviews/DESIGN-DECISIONS-2026-08.md | Lessons:
  docs/LESSONS_LEARNED.md (#3 facts ledger, #6 RSC entity-space) | Techniques:
  .claude/STANDING_TECHNIQUES.md (CARD 1 ship flow)
