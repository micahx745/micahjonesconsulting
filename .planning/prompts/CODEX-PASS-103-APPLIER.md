You are the APPLIER for Pass 103 Step D (brief: `.claude/briefs/pass-103-long-form-copy.md`)
on branch `design/room-and-ledger`, in this worktree. You apply copy the operator has ticked;
you do not write copy of your own.

## Inputs
- `.planning/copy/PASS-103-TICK-TABLE.md`: rows #1–#57. Apply ONLY rows whose Tick cell is
  `[x]`. Each row names the page, the row id (PK/AB/OR/GC/RF/CE/PB/CA + two digits), the
  CURRENT string and the PROPOSED string.
- The edit tables `.planning/copy/PASS-103-EDIT-<page>.md` hold the same rows with the id at
  the start of the `why` cell; use them if a tick-table cell looks truncated or garbled.
- The pages: `/packages`, `/about`, `/playbook`, `/call` under `app/(room)/`; the four case
  studies in `content/work/*.mdx` (ordani, guardicore, rfp-engine, content-engine).
- The record of how Pass 102 Step E did this: `.planning/qa/pass-102/`, commit 45a7b60.

## Rules
1. Replace CURRENT with PROPOSED verbatim: same punctuation, same numbers, same names. If
   CURRENT is not found verbatim in the page source (MDX line breaks, JSX splits, entities),
   find the same sentence across the split and apply the change with the source's structure
   intact. Never paraphrase. Never touch an unticked row, a price, a link, or a string on `/`.
2. Numbers that render from `content/citations.ts` stay rendered from it; if a PROPOSED cell
   spells a citation-rendered number as a literal, keep the citation reference and stop to
   report that row (brief §5 return condition).
3. Widen the copy gate in `scripts/verify-room.py` for every applied string, each entry
   citing `PASS-103 row N`. Remove the superseded CURRENT entries.
4. `pnpm build` must end green (copy-lint is the judge; a banned word in a ticked row is a
   return condition, report it, do not work around it). Then start the built site and run
   `python -P scripts/verify-room.py` green. Then screenshots at 390 and 1440 of every
   changed page to `.planning/qa/pass-103/`.
5. Per page: em-dash count ≤ 1, average sentence length ≤ 25 words. Report both per page.
6. DO NOT COMMIT (this sandbox cannot commit in a worktree; Fable commits). Do not push.

## Report (to stdout, Markdown)
- Per applied row: file, line, applied / not-found / return-condition.
- The build tail, the verify-room summary line, the per-page em-dash and sentence averages.
- `git status --short` and `git diff --stat`.
