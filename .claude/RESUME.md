# RESUME — micahjonesconsulting (2026-09-09)

## READ FIRST

**The dark rebuild is REJECTED; the LIVE site is being evolved instead.** Work is on
`design/live-evolve` (worktree `.claude/worktrees/p106-live`) off `main`.
`design/room-and-ledger` is parked intact, not reverted.

**`pnpm build` fails HERE only** — a Turbopack font error that also breaks untouched `main`;
Vercel builds the same branch fine. Locally use `npx next build --webpack`. **Workflow
ignores `CLAUDE_CODE_SUBAGENT_MODEL`** — name `model:` on every agent() call.

## PUSHED — preview live, production untouched

`design/live-evolve` at `b515706`, Vercel `dpl_CiB6Hjs` READY, branch alias on vercel.app
(Vercel login, or a 23h `_vercel_share` link — **never commit that token, repo is public**).
Production still serves `main`.

## Pass 106 — what changed

- **offer** (new, under hero): "The Audit. $2,500. Two weeks." + three ruled deliverable
  rows + a left, audit-specific link. First price above the fold ever.
- **receipts moved up**, now lead with **Ordani**; **Clients/Three engagements CUT**;
  **How I work inverted** (artifact large, verb small, named deal as proof).
- **exit record** (new): four deals, sum **$5.58B**, under-claim **$5B+** — all rendered
  from `content/citations.ts`, replacing the old one-row "$5B+ combined" badge.
- hero gains a buyer line, loses a CTA. `/packages`: the Audit is a hero card.

**Astra gate: BETTER.** All three of its changes applied. axe adds **no new violation**
(production has the same ones, plus one this branch removes). **Lighthouse mobile 94.**

## NEXT — operator decisions

1. Look at the preview. Retire the hero `$5B+`/`$20M+` chips now the exit record carries
   the number? (ruling 1, deferred; rotating H1 stays per ruling 2.)
2. Merge to `main` = production. Yours.

## OPEN

- `.cw-lede-link` contrast on `/packages` + `/services` — fails on `main` too.
- Global `settings.json` wildcard allow rules over-approve.
- Stripe live $500 buy/refund, then `PLAYBOOK_ON_SALE=1` = launch.

## Traps

push to main auto-deploys · **capture VIEWPORT, not full_page, and wait 11s for the hero
rotation** (a full-page frame made me report a clipped headline that does not exist, and
Astra repeated it back) · `python -P` · `grep -c` counts LINES · PS5.1 mangles quotes to
native exes and has no heredoc, use `git commit -F <file>` · prettier reflows anchors ·
**this page renders on MORE THAN ONE world** — a fixed accent or an opacity cannot carry
contrast here; axe caught 19 failures that way.
