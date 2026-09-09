# RESUME — micahjonesconsulting (2026-09-07)

## READ THIS FIRST

Fable 5.1 main, **Opus subagents**. Direction: `.planning/PHASE-MAP-2026-09-04.md`.
**Passes 97 + 98 LIVE on both domains** (operator 2026-09-04: "deploy it"; verify `448cbb2`).
**Book chat shares this tree** — stage by path.

## Pass 101 — "Room and Ledger" on the real site. **NO push, NO deploy.**

Branch `design/room-and-ledger` (**46 commits ahead of main, NOT pushed**); worktree
`.claude/worktrees/p101-integrate`; brief `.claude/briefs/pass-101-room-and-ledger-site.md`;
ruling `WINNING-BRIEF-2026-09-05` §14–§18. Three build phases, a verifier's return, a repair
round `7d51d8e`…`1ebddea`, then the integrate QA `747ee52`.

- **`931fee0` the reply promise is large text.** §18 ran it 19px regular espresso on copper
  = **4.40:1** — AA for LARGE text only, and 19px regular is not large. Now **24px/1.3
  Hanken 500, max 22ch**, right-aligned in the field's right third; below 900 it wraps
  rather than shrink. Measured on the built page: 1440 → 24px/500/Hanken, 4.40:1, right edge
  1407.98 on the field's 1408.00, last line **0.33px** off the headline's (a measured
  desktop-only `margin-bottom:-8px`); 390 → 2 lines, scrollWidth 390 = innerWidth 390.
- **Verified now:** build green · prettier clean · `verify-room.py` **61/61**, STALE as of
  Pass-104b (see below) · axe-core 4.10.2 after `fonts.ready` + 600ms + a Lenis wheel walk,
  **13 routes x 2 widths**: **0 serious/critical on all 12 ported routes.** The prior run's
  one serious finding was this promise.
- **Pass-104b in progress on this same branch/worktree, section 5 of 8 (packages) done.**
  `python -P scripts/verify-room.py http://localhost:3000/` now **85 checks, 84 pass, 1
  fail** — the count moved (61→85) across sections 1-5; the one fail
  (`14.7-sentence-and-chips-share-the-left-edge`) is section 2's own hero-sign consequence,
  named and unfixed in `.planning/qa/pass-104b/verification.md`, not section 5's. axe: 0
  serious/critical on `/` at 390 and 1440 (re-verified after section 5's edits) and on
  `/packages` at both widths. Sections 6, 7, 8 (objections, footer, whole-pass gates) not
  yet run by any leg as of this commit.
- **NEW OPEN DEFECT:** `/services` shows **1 serious** contrast at both widths —
  `.cw-lede-link` (12px) once SCROLLED. `a9a57c6` fixed the top ground (5.94:1); scrolled,
  the ground darkens to `#2a1f18` where copper-deep is **1.95:1**. Fails on main too (old
  accent 2.86:1) — not introduced here, but made worse. /services is unported. **The earlier
  "9 routes, 0 serious" claim was measured unscrolled and does not survive a wheel walk.**
- **OPEN / operator-owned:** Lighthouse mobile `/` **Performance 86, LCP 4.2s simulated**
  (observed 225ms; last run `a9a57c6`, not re-run) — clears brief §6 (≥70), not the DoD, and
  will not with a video hero. The dark hand below the fingertip and the mobile stage's ~134px
  tail are §16.2/§14.7's pinned geometry: **rulings, not fixes**. /contact + /services still
  Color Worlds. **NEXT:** §15.8.
- **Preview:** `git push -u origin design/room-and-ledger` — **the operator's call.**

## Ship gate (operator-owned)

1. Stripe webhook + `whsec_` in Production + one live $500 buy/refund. 2. Then
   `PLAYBOOK_ON_SALE=1` + redeploy = launch.

## Standing traps

Stripe prefixes · Vercel env only on a NEW deploy · every push auto-deploys · `grep -oiF`
false zeroes, python utf-8 · copy-lint rejects docs QUOTING banned words · scratchpad
`copy.py` shadows stdlib (`python -P`) · a review is a reader, not an oracle · **a stale
`next start` on :3000 serves OLD chunks — it cost a run again this pass** · axe before
`document.fonts.ready` invents contrast failures, and axe WITHOUT a wheel walk MISSES the
ones a scrolled ground creates · **a motion gate added on mount plays backwards first
(LESSONS #17)** · **moving a block onto its own element is a specificity change first
(LESSONS #18)**.
