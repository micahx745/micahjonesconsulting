---
phase: 02-root-layout-lenis-transitions
plan: E
status: complete
completed: 2026-05-14
requirements:
  - COPY-04
  - COPY-05
---

# 02-E copy-discipline policy reinforcement

## Outcome

Augmented the `## Voice` section of `.claude/CLAUDE.md` with a new `### Enforcement (Phase 2)` subsection that documents the two-layer enforcement contract:
1. **Automated layer** (Plan 02-D's build-time scanner + write-boundary `copy-lint.sh` hook).
2. **Manual subagent layer** (the `copy-editor` subagent enforces COPY-04 sentence cap / first person / active voice / named numbers, and COPY-05 em-dash cap of one per file).

## Files modified

- `.claude/CLAUDE.md` — added 19 lines of policy documentation immediately after the existing Phase 1 Voice bullets, before the `## Definition of done` heading. The five Phase 1 bullets remain byte-identical.

## REQ coverage

- **COPY-04** documented as subagent-enforced (sentence length, first person, active voice, named numbers).
- **COPY-05** documented as subagent-enforced (em-dash cap of one per page).

Both REQ-IDs cross-referenced explicitly in the new subsection.

## No code introduced

This is pure policy documentation per the orchestrator prompt and RESEARCH.md treating COPY-04 / COPY-05 as "OUT OF SCOPE for code." The optional `countEmDashes(text) → number` helper from RESEARCH was deliberately DEFERRED (the prompt classifies it as nice-to-have, subagent-enforced).

## Verification

- Grep: `### Enforcement (Phase 2)`, `copy-editor`, `Em-dashes capped`, `COPY-04`, `COPY-05`, `First person`, `Sentence length` all present.
- Other CLAUDE.md sections (`## Two modes`, `## One accent`, `## One signature motion`, `## Stack`, `## What not to do`, `## Content`, `## Definition of done`, `## How to ask for things`) byte-identical to pre-edit.

## Note on banned-word audit of new content

The new content includes the strings `meaningful results` and `growth metrics` inside a negative-example quote ("never 'significant impact', 'meaningful results', 'growth metrics.'") — these strings are NOT in the 30-word banned list, so they would not trigger the scanner. The new section contains zero matches against `lib/banned.ts`.

## Forward-references

- The `copy-editor` subagent is referenced but not yet invoked from any deploy gate. Phase 10 (hardening + deploy) will wire `/premium audit` to call this subagent alongside `design-director`, `motion-engineer`, `perf-auditor`, `a11y-reviewer`, etc.
