# RESUME — REWRITE whole-file every task. Never append. Last rewrite: 2026-08-13

## Now
- SHIPPED 2026-08-15. Live on BOTH domains, both on dpl_G8qMQNerYSbnF2VQDmmkAzpikxfh.
  19 commits pushed (origin/main == local, db28290). Working tree clean (qa/ ignored).
- LIVE measured on www: perf 93 · a11y 96 · best-practices 100 · SEO 100 ·
  LCP 3017ms · CLS 0.0000 · TBT 10ms. All 7 routes 200 on both domains; branded
  404 confirmed; case pages carry no Source Serif; spec tables, weighted home
  card, logistics footers and sr-only h1 all verified live.
  (Was 80 / LCP 5115ms / CLS 0.068 before this arc.)
- SHIP-FLOW GOTCHA LEARNED: `git push` triggers Vercel's GitHub auto-deploy, which
  claims the .vercel.app production domain while www stays pinned to the manually
  aliased one -> the two domains served DIFFERENT builds. Fix: alias BOTH to the
  NEWEST deployment AFTER pushing, then confirm identical data-dpl-id on both.
  Folded into LESSONS #5 / CARD 1 as the push-then-realias ordering rule.

## Queue (operator-owned)
1. SHIP — operator chose option A (keep all three faces, ship at 92; D14). Say the
   word; CARD 1 flow: build -> deploy -> alias BOTH domains -> push 21 commits.
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
