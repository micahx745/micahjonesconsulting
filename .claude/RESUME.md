# RESUME — micahjonesconsulting (2026-09-06)

## READ THIS FIRST

Fable 5.1 main, **Opus default subagent**. Direction: `.planning/PHASE-MAP-2026-09-04.md`.
**Passes 97 + 98 LIVE on both domains** (operator 2026-09-04: "deploy it"; verify `448cbb2`).
**The book chat shares this tree.** Stage by path.

## Pass 101 — "Room and Ledger" on the real site

Branch `design/room-and-ledger`, worktrees, **NO push, NO deploy**. Brief
`.claude/briefs/pass-101-room-and-ledger-site.md`; ruling `WINNING-BRIEF-2026-09-05` §14–16.

- **Phase 1 DONE** (`313709a` `9ad2181` `03b3c36`): Anybody + Hanken, mono retired,
  Bricolage deprecated; tokens, width ladder, label style; both clips into `public/video/`.
- **Phase 3 DONE** (`936bca8`…`0252b34`): the other pages. New group `app/(room)/` — same
  URLs, no Color Worlds chrome — carrying the bar, the foot and §16.3 items 2/3/4/5/7 (one
  IntersectionObserver, zero @keyframes, pre-state behind `html.rl-js`, so scripting-off
  and reduced-motion both render the finished frame). `/packages` cards + Engagements tier ·
  `/work` receipts index · `/call` + `/about` register, clip B as a ground · `/playbook`
  §15.2 at page scale · `/work/[slug]` type + grounds only, TitleCard stays. Live copy,
  prices, links and the Stripe / booking / `PLAYBOOK_ON_SALE` paths untouched.
  Verified: build green, prettier clean, 0 stranded animations, no h-overflow, zero
  Bricolage/JetBrains computed, **axe 16 → 0** (8 routes × 2 widths); shots in
  `.planning/qa/pass-101/`. Lighthouse mobile 91–94, but **LCP 3.1–3.5s vs the 1800ms
  target — the display headline, not the film** (/packages has no video, same LCP).
- **Phase 2 (the home) NOT on the branch** at this write; phase 3 used none of its names
  (`components/room/{Bar,Room,…}`), so the two merge clean.
- **NEXT:** the wording round (§15.8). One departure to settle: /packages' Engagements
  figure reads "From $5K a month" where the sentence read "start at $5K a month".

## Ship gate (operator-owned)

1. Stripe webhook + `whsec_` in Production + one live $500 buy/refund. 2. Then
   `PLAYBOOK_ON_SALE=1` + redeploy = launch.

## Standing traps

Stripe prefixes · Vercel env only on a NEW deploy · every push auto-deploys · `grep -oiF`
false zeroes, python utf-8 · copy-lint rejects docs QUOTING banned words · scratchpad
`copy.py` shadows stdlib (`python -P`) · a review is a reader, not an oracle · **a stale
`next start` on a held port serves OLD chunk names and reads as "the CSS did not load"**.
