# Pass 103 — The long-form copy edit (packages, engagements, about, Ordani, the case studies)

Operator, 2026-09-08: "Is there more wording on the site tho that can be changed? THe
description of the packages, engagements, my about part, descriving of ordani, the case
studies. Etc." Pass 102 rewrote only where the buyers' evidence showed a different word;
the long-form copy mostly came back KEEP for lack of a buyer-evidence reason, not because it
is as good as it can be. This pass edits it for voice and force, under the same gates.

## 0. Ground rules that do not move
- Facts, numbers, names, prices, dates and quotes are locked to the claims ledger
  (`docs/LESSONS_LEARNED.md` §3) and the case studies' `content/citations.ts`. An edit may
  cut, reorder, sharpen or shorten; it may not add a claim, soften a ledgered number into a
  vaguer one, or name the industry author.
- Voice (`.claude/CLAUDE.md` § Voice, `.claude/brand.json`): first person; ≤ 25 words average;
  active voice unless documenting an outcome; named numbers where the ledger has them; the
  banned words banned; em-dashes ≤ 1 per page. `copy-lint` at build is the judge.
- The buyers' words from Pass 102's readings (`.planning/copy/PASS-102-READING*.md`) are
  the preferred vocabulary wherever a sentence has a choice.
- Branch `design/room-and-ledger`, worktree `.claude/worktrees/p101-integrate`. Executors
  write; Fable or the GLM executor commits (LESSONS #18). Never push, never deploy.

## 1. Scope, in order
1. `/packages`: the intro, the three package descriptions and their feature lists, the
   engagements description, the "rules in plain terms" paragraph.
2. `/about`: the whole narrative, the "What I'm known for" block, the register rows.
3. `/work/ordani` and the other three case studies (`content/work/*.mdx` bodies and deks).
4. `/playbook`: the manual's pitch paragraphs and the chapter list copy.
5. `/call`: the intake copy and the takeaway.
Not in scope: the home (done in 102 and locked to its ruled strings), prices, the proof
line, metadata not already touched in 102.

## 2. Step A — the EDITOR (Codex at xhigh; or GLM when its window is open)
For each page in scope, produce `.planning/copy/PASS-103-EDIT-<page>.md`: a two-column
table `CURRENT (verbatim) · PROPOSED`, one row per paragraph or list item, with a third
column `why` in ≤ 12 words (shorter / active / buyer's word / cut repetition / number
named). Rows with no change are KEEP. Every ledgered number in a PROPOSED cell must appear
unchanged; the editor runs the NEVER-phrase grep on its own output before returning.

## 3. Step B — the JUROR (Codex / gpt-6-astra at ultra, `codex-exec.ps1 -Review`)
As in Pass 102 §4, against the edit tables and the pages' 390 screenshots: the buyer read
per page, ACCEPT / REJECT / REWORD-NEEDED per row with a one-sentence reason, and the three
sentences per page that carry the sale. Plus one added lens: does the about page read as a
person or as a résumé, and does each case study open on the problem the buyer recognises.

## 4. Step C — the OPERATOR ticks. Step D — the APPLIER applies ticked rows (as 102 §6),
`pnpm build` green, verify-room green, screenshots, Fable commits.

## 5. Return conditions
A proposal that changes a ledgered fact · a page whose average sentence length rises ·
a case study that loses its citation-rendered number · the copy gate rejecting a ticked row.
