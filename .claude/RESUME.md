# RESUME — micahjonesconsulting (2026-09-05)

## READ THIS FIRST
Fable 5.1 main, **Opus default subagent**. Direction: `.planning/PHASE-MAP-2026-09-04.md`.
**Passes 97 + 98 LIVE on both domains, verified.** Deploy approved — Operator,
2026-09-04, verbatim: "deploy it". Live verify `448cbb2`; cross-review `6eb543e`; Codex on
`gpt-6-astra` ultra (`381e519`). **The book chat shares this tree.** Stage
by path. Its brief: `.planning/handoff/NEXT-CHAT-PROMPT-BOOK.md` + `04-BOOK-MATERIALS.md`.

## Design (2026-09-05) — three mocks; two are superseded (a398fb1a, 1d43593f)
Video: `design/video/` + `COMPOSITE-BRIEF-2026-09-06.md`. The two cut clips now live at
`public/video/` (that README carries the encodes and the fingertip measurement).
**"Room and Ledger"** WON — `WINNING-BRIEF-2026-09-05.md` is the ruling; §14–§17 are the
operator's own reviews and supersede §1–§13 wherever they touch it. The verified mock is
`.planning/design/winning/room-and-ledger.template.html` + `verify.py`; its comments carry
every measured number.

## Pass 101 — the real site (`.claude/briefs/pass-101-…`), NO push, NO deploy
Branch `design/room-and-ledger`. Phase 1 DONE (`313709a` type, `9ad2181` tokens, `03b3c36`
clips as files). **Phase 2 DONE** — worktree `wf_0cc599f0-660-2`, base `03b3c36`, tip
`6854fd8`, a strict fast-forward: `646c1e8` room.css · `4961601` components/room + the new
`app/(room)/` group that owns `/` (Hero retired; (foyer) keeps the unported routes) ·
`540618b` scripts/verify-room.py + the `--dw` width ladder it caught missing (the copper row
was clipped 103px at 390) · `6854fd8` QA. verify-room.py 60/60 vs `pnpm start`; build green;
axe 0 at 1440 + 390. Receipts = THREE rows (§17 binds this pass), not §15.6's two.
DEBT: 9 legacy @keyframes still ship site-wide (Color Worlds + WallChart) — the room
declares and runs 0; phase 3's to clear. NEXT: phase 3 (packages, playbook, work, call,
about), then the wording round (Reddit data + copy-editor + ledger).

## Ship gate (operator-owned)
1. Stripe webhook + `whsec_` in Production + one live $500 buy/refund. 2. Then
`PLAYBOOK_ON_SALE=1` + redeploy = launch.

## Housekeeping (one Opus pass): XR-1/2/3/6/7 (2026-09-04 cross-review). LESSONS #5:
auto-deploys moved both domains 5× with no alias; confirm www first.

## Standing traps
Stripe prefixes · Vercel env only on a NEW deploy · every push auto-deploys · `grep -oiF`
false zeroes, python utf-8 · copy-lint hook rejects docs that QUOTE banned words · scratchpad
copy.py shadows stdlib (run verifiers with `python -P`) · a review is a reader, not an oracle.
