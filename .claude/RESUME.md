# RESUME — micahjonesconsulting (2026-09-06)

## READ THIS FIRST

Fable 5.1 main, **Opus subagents**. Direction: `.planning/PHASE-MAP-2026-09-04.md`.
**Passes 97 + 98 LIVE on both domains** (operator 2026-09-04: "deploy it"; verify `448cbb2`).
**Book chat shares this tree** — stage by path.

## Pass 101 — "Room and Ledger" on the real site. **NO push, NO deploy.**

Branch `design/room-and-ledger`; brief `.claude/briefs/pass-101-room-and-ledger-site.md`;
ruling `WINNING-BRIEF-2026-09-05` §14–§18. All three phases are now on the branch.

- **P1** `313709a`…`03b3c36`: Anybody + Hanken, mono retired; tokens, width ladder, label
  style; both clips as files in `public/video/`.
- **P2, the home** `646c1e8`…`2d444e6`: `app/room.css` + `components/room/*`, nine sections
  in the template's order; Hero and the six dropped sections retired.
- **P3, the rest** `936bca8`…`0252b34`: /packages /work /call /about /playbook
  /work/[slug] — same URLs, no Color Worlds chrome, §16.3 items 2–5 and 7.
- **INTEGRATED**: both phases wrote `app/(room)/layout.tsx` and `RoomMotion.tsx`. The home
  now serves `/` from its own group `app/(home)/`; `(room)` keeps P3's layout; P3's engine
  is `components/room/SiteMotion.tsx`; `verify-room.py` repointed at
  `app/(room)/packages/page.tsx`. No live string, price, fact or link moved.
- **Verified on the merge**: build green (render-gate, 15 routes) · `tsc` clean · prettier
  clean · `verify-room.py` **60/60** vs `pnpm start` · 15/15 routes 200 · axe **0**
  serious/critical and 0 banned faces, 9 routes × 2 widths.
- **OPEN**: /contact and /services unported (Color Worlds, Bricolage). 9 legacy @keyframes
  still declared site-wide, none reachable from a ported page, so §16.3's ceiling of 3 is
  unmet. LCP 3.1–3.5s vs the 1800ms bar — the headline, not the film. /packages reads
  "From $5K a month"; the sentence read "start at $5K a month". **NEXT:** wording (§15.8).

## Ship gate (operator-owned)

1. Stripe webhook + `whsec_` in Production + one live $500 buy/refund. 2. Then
   `PLAYBOOK_ON_SALE=1` + redeploy = launch.

## Standing traps

Stripe prefixes · Vercel env only on a NEW deploy · every push auto-deploys · `grep -oiF`
false zeroes, python utf-8 · copy-lint rejects docs QUOTING banned words · scratchpad
`copy.py` shadows stdlib (`python -P`) · a review is a reader, not an oracle · a stale
`next start` on :3000 serves OLD chunks · axe before `document.fonts.ready` invents
contrast failures (53 here, 0 after).
