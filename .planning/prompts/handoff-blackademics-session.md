# Blackademics website — Session handoff

You're picking up a paused project. Bootstrap your context from the project files before doing any work — do not assume state from training data.

## Project root

```
C:\Users\micah\blackademics-site
```

Open the session there. If Claude Code opens in a parent directory and the `.claude/` config isn't loading, navigate down to that exact path.

## What this is

**Blackademics.org** — an Astro-built nonprofit website. Sister site to the KOK project. Operator is Micah Jones (the same operator who runs the consulting site at `micahjonesconsulting.com`). Pass 1 foundation shipped on 2026-05-17. Pass 2 has not been planned yet; that's part of what you're picking up.

## Your first three actions (in order, before any edits)

1. **Read `docs/strategic-brief.md`** — the canonical statement of what Blackademics is, who it serves, what tone it carries, and what Pass 1 was supposed to land.

2. **Read the planning files** — look for `PROJECT.md`, `STATE.md`, `ROADMAP.md`, and the `.planning/` directory if present. Find out:
   - What Pass 1 actually shipped (which routes, which copy, which design)
   - What's in the backlog / "out of scope for Pass 1" lists
   - Any reviews queued in `.planning/reviews/`

3. **Check git state** — `git status`, `git log --oneline -20`, confirm the branch and whether the last build deployed cleanly. Note any uncommitted work.

After those three reads, **think hard** about what Pass 2 should be. Then come back to the operator with:

- A 4-6 sentence summary of where Pass 1 landed
- A short proposed Pass 2 plan: 2-4 concrete items, in execution order, with file paths
- One question (if any) where you couldn't tell from the planning files which direction to take

**Wait for the operator's confirmation** before executing Pass 2.

## Harness — preserve, do not modify

This project shares the same Claude Code harness foundation as the consulting site. The operator was clear: maintain the harness, do not modify it without confirmation. Specifically:

- **Skill system**: invoke `using-superpowers`, `executing-plans`, `writing-plans`, `verification-before-completion`, `copy-lint-rules` (if available) before any creative work. The system reminders that fire on session start surface the full skill list.
- **Project `.claude/` config**: if hooks, brand.json, or settings.json exist in this repo, treat them as authoritative. If the consulting site has a hook this project doesn't have and the absence is hurting a write, flag it to the operator before adding.
- **Copy-lint behavior** (if wired): if a write is rejected for banned words, rewrite to satisfy. Never bypass.
- **Premium Web plugin** (if wired): use `copy-lint-rules`, `case-study-writer`, and other plugin skills when writing prose.

If the harness in this repo is thinner than the consulting site's (likely — Blackademics is newer), flag the deltas as a possible follow-up. Do not port them over without operator approval.

## Voice + brand rules

Read `.claude/brand.json` if it exists. Otherwise, match the voice already established in Pass 1 by reading every shipped page before writing new copy.

Default rules until the brand file says otherwise:

- **First-person operator voice** for narrative sections. If Blackademics speaks as an organization, lean on "we" for org-voice sections and "I / Micah" for founder-voice sections — confirm from Pass 1.
- **Sentence cap: 25 words.** Anything longer is a defect.
- **No consultant-jargon / AI-slop register.** You know the list — verbs and nouns every nonprofit homepage reaches for when it has nothing concrete to say. Avoid them.
- **Real receipts only.** No invented metrics, no fabricated quotes.
- **Editorial restraint.** Reference voices: Monocle magazine, Bloomberg Businessweek feature page, a well-edited annual report. Not consultancy deck.
- **Pain-led or stakes-led openings.** Lead with what the reader is feeling, not with what Blackademics IS.

## Out of scope for this session

- The consulting site (`C:\Users\micah\Code\micahjonesconsulting`) — running in a separate session.
- Ordani — separate product, separate site.
- KOK (the sister project) — if Blackademics has shared dependencies with KOK, note the coupling but do not modify KOK from here.

## First message back to the operator

After the three bootstrap reads + Pass 2 proposal: short message with the summary and the 2-4 item plan. Ask if they want all of it or a subset. Wait for go-ahead before executing.
