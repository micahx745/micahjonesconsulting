# RESUME — micahjonesconsulting (2026-09-05)

## READ THIS FIRST
Fable 5.1 main, **Opus default subagent**. Direction: `.planning/PHASE-MAP-2026-09-04.md`.
**Passes 97 + 98 LIVE on both domains, verified.** Deploy approved — Operator,
2026-09-04, verbatim: "deploy it". Live verify `448cbb2`; cross-review `6eb543e`; Codex on
`gpt-6-astra` ultra (`381e519`). **The book chat shares this tree.** Stage by path; its brief
`.planning/handoff/NEXT-CHAT-PROMPT-BOOK.md`.

## Design explorations (2026-09-05) — mocks, nothing live changed
4. **"Room and Ledger"**, `WINNING-BRIEF-2026-09-05.md` (§11 = post-verify rulings):
   film as the hero ground, no header on screen one, one display size, Anybody wide/light,
   no mono, espresso→bone→copper. Built `design/winning/` (template + build.py + verify.py),
   48/48 checks, two verifiers, published:
   https://claude.ai/code/artifact/be9096fa-284f-4a73-ae9e-5e86a7172015
   Astra (§12) · his reviews (§14, §15). v4: 16:9 hero stage, words AT the finger (≤14px),
   operator overlay, no years/figures. v5 (§15) PUBLISHED: manual + objections recomposed, how-I-work ledger (no cards),
 Viewer plays data: video. v6 (§16: copper row AT the finger, lights at
   2.54s, motion set) and v7 (§18: border on the list, one seam x=600, one chip, three
   receipts, every section recomposed; 72/72 + independent) PUBLISHED · **Pass 101** (`.claude/briefs/pass-101-…`):
   the real site on `design/room-and-ledger` (worktree `.claude/worktrees/p101-integrate`):
   integrated + §18 ported + polish + fix-2 (token alias, skip link, case-study foot,
   /about + /packages seams); close round (promise 24px, axe 0) in flight. Lighthouse
   mobile 88 / LCP 4.0s (pre-existing). NO push/deploy — `git push -u origin
   design/room-and-ledger` is HIS. LESSONS: main #17 vs branch #17/#18, renumber at merge.
   NEXT: the wording round (Reddit data + copy-editor + ledger) on the branch's pages.

## Ship gate (operator-owned)
1. Stripe webhook + `whsec_` in Production + one live $500 buy/refund. 2. Then
`PLAYBOOK_ON_SALE=1` + redeploy = launch.


## Next
99: landing offer + packages reframe. 100: home spear, Search Console, sitemap lastmod.

## Standing traps
Stripe prefixes · Vercel env only on a NEW deploy · every push auto-deploys · `grep -oiF`
false zeroes, python utf-8 · copy-lint hook rejects docs that QUOTE banned words · scratchpad
copy.py shadows stdlib (`python -P`) · Bash heredocs collapse `\` — build escape bytes
from codes · a review is a reader, not an oracle.
