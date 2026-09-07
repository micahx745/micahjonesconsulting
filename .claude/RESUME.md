# RESUME — micahjonesconsulting (2026-09-06)

## READ THIS FIRST

Fable 5.1 main, **Opus subagents**. Direction: `.planning/PHASE-MAP-2026-09-04.md`.
**Passes 97 + 98 LIVE on both domains** (operator 2026-09-04: "deploy it"; verify `448cbb2`).
**Book chat shares this tree** — stage by path.

## Pass 101 — "Room and Ledger" on the real site. **NO push, NO deploy.**

Branch `design/room-and-ledger`; brief `.claude/briefs/pass-101-room-and-ledger-site.md`;
ruling `WINNING-BRIEF-2026-09-05` §14–§18. Three build phases, then a verifier's return,
then this repair round. Worktree `.claude/worktrees/p101-integrate`.

- **P1–P3 + integrate** `313709a`…`7ec42ec`: the type system, the home from the template,
  the other five routes, and the two engines merged (`/` from `app/(home)/`, the rest from
  `(room)`; `SiteMotion.tsx` is P3's engine).
- **REPAIR ROUND** `7d51d8e`…`1ebddea`, against the verifier's two failures and 15 visual
  findings:
  - `7d51d8e` **@keyframes ceiling MET.** 9 → 6 site-wide: `theater-ambient-drift`,
    `cw-pulse`, `cw-hero-line-up` deleted with their call sites. 4 are WallChart's
    (its written exception, running only on /playbook); 2 non-WallChart against a
    ceiling of 3. Measured in the browser on 9 routes.
  - `d9cf829` **§18, the recomposition** — the largest gap the verifier found, and it is
    now on the branch. Rules A (no border on a picture), B (one seam, `--lane`, col 6 at
    x=615), C (one chip: 48px, 8px radius, 19px Hanken 500, inline arrow). All nine
    sections re-cut; ONE foot for the whole site, no copyright range, LinkedIn kept.
    Six verifier checks rewritten to §18.
  - `d9272a1` **the hero reads.** Veil ramp opens at .38 (was 0) and the plateau holds to
    2px above the tip: the finger's step off the wall goes 17 → **37 levels**. §16.2's
    three pinned stops untouched.
  - `6bd7f10` §18 on the ported pages; **the invisible-chip defect** (`#rl-root a` beat a
    bare `.rl-chip`) caught and gated.
  - `a9a57c6` clip B to `preload="none"` (260KB off the critical path); the last AA
    failure on /services fixed → **9 routes, 0 serious/critical**.
  - `1ebddea` /packages joins the card system.
- **Verified now:** build green · prettier clean · `verify-room.py` **61/61** (a 61st check
  added: Rule C swept over 7 routes, 24 chips) · a11y **100 on 9 routes, 0 violations** ·
  reverse flash gone (rAF trace: frame 1 already at the rest state).
- **OPEN / operator-owned:** Lighthouse mobile `/` **Performance 86, LCP 4.2s simulated**
  (observed 225ms) — clears brief §6 (≥70), does NOT clear the DoD (≥95 / ≤1800ms) and
  will not with a video hero. The hand BELOW the fingertip stays dark on both widths and
  the mobile stage keeps a ~134px black tail: both are §16.2/§14.7's own pinned geometry,
  so changing them is a **ruling, not a fix**. /contact + /services still Color Worlds.
  /playbook is 15,787px at 1440 (the col-6 seam cost 1,691px). **NEXT:** wording (§15.8).

## Ship gate (operator-owned)

1. Stripe webhook + `whsec_` in Production + one live $500 buy/refund. 2. Then
   `PLAYBOOK_ON_SALE=1` + redeploy = launch.

## Standing traps

Stripe prefixes · Vercel env only on a NEW deploy · every push auto-deploys · `grep -oiF`
false zeroes, python utf-8 · copy-lint rejects docs QUOTING banned words · scratchpad
`copy.py` shadows stdlib (`python -P`) · a review is a reader, not an oracle · **a stale
`next start` on :3000 serves OLD chunks — it cost a whole verify run this round** · axe
before `document.fonts.ready` invents contrast failures · **a motion gate added on mount
plays the animation backwards first (LESSONS #17)** · **moving a block onto its own element
is a specificity change first (LESSONS #18)**.
