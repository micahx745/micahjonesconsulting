# Pass 102 — The wording round (executors: Kimi K3 reads and drafts · Codex/Astra judges · GLM applies)

Operator, 2026-09-06: "WE NEED TO have a round for all the wording … the wording round will
be using the data from the other reddit data scraping sessions data." Fable ruled the shape;
this brief is executed by the executor tier (MODEL_ROUTING §8). Nothing in it enters a page
until the operator approves the proposal table.

## 0. Ground rules that do not move
- No string reaches a page without (a) an attestation source, (b) the claims-ledger check
  (`docs/LESSONS_LEARNED.md` §3; the NEVER-phrases), (c) the voice rules (`.claude/brand.json`
  voice; first person; ≤ 25 words average; no em-dash beyond one per page; the 35 banned
  words — the `copy-lint` gate is the judge), and (d) the operator's tick in the table.
- The industry author is never named. No new facts, numbers, names or quotes: the round
  rewrites HOW things are said, using the buyers' own words; it does not add claims.
- Work on branch `design/room-and-ledger` in `.claude/worktrees/p101-integrate`; commit per
  unit ("Pass-102: …" + the Fable trailer). Never push, never deploy, never bypass a hook.

## 1. Inputs (all on disk)
- The buyers' words: `.planning/research/01-REDDIT-EVIDENCE.md`,
  `.planning/research/01-APPENDIX-intersection-37.json`,
  `.planning/research/01-APPENDIX-phrase-bank-attested.json` (30 attested phrases, 8 killed),
  `.planning/research/02-BUSINESS-CONTEXT.md`, `.planning/research/02-APPENDIX-voice-rules.json`,
  and the scraping app's own reports: `C:/Users/micah/Code/reddit-research/reports/*.md`.
- The current strings: every visible text node on `/`, `/packages`, `/playbook`, `/work`,
  `/about`, `/call` of the branch (extract with Playwright from `pnpm start`; one row each).
- The ledger and the voice: `docs/LESSONS_LEARNED.md` §3, `.claude/brand.json`,
  `.claude/CLAUDE.md` Voice.

## 2. Step A — the READER (Kimi K3, 1M context; fallback: Sonnet in chunks)
Read every input in ONE pass. Produce `.planning/copy/PASS-102-READING.md`: for each page
section, the buyer's situation in the buyers' own attested words (quote + thread id), the
objection they raise, the phrase they use for the outcome, and the words they never use.
Rank the 30 attested phrases by frequency across the intersection set. Flag any phrase in
the killed list. No proposals yet.

## 3. Step B — the DRAFTER (Kimi K3; fallback: Sonnet)
For every current string, propose at most one rewrite, only where the reading shows the
buyers say it differently, in `.planning/copy/PASS-102-PROPOSALS.md` as a table:
`page · section · CURRENT (verbatim) · PROPOSED · attestation (phrase id + thread) · ledger
check (fact unchanged / no new claim) · voice check (words, person, length)`. Strings that
are already the buyers' words are marked KEEP. Prices, names, the proof line and the
ledgered numbers are never proposed.

## 4. Step C — the JUROR (Codex / gpt-6-astra at ultra, `scripts/codex-exec.ps1 -Review`)
Give Astra the proposal table, the reading, the brand voice and the branch's screenshots at
390. Ask for: the buyer read of each page in thirty seconds with the proposed copy; which
proposals it would reject and why; the three strings on each page that decide the click;
and whether any proposal reads as marketing rather than as the buyer's own words. Its
verdicts join the table as a column.

## 5. Step D — the OPERATOR
The table goes to the operator with the juror's column. He ticks. Only ticked rows proceed.

## 6. Step E — the APPLIER (GLM executor, `scripts/claude-glm.ps1 -Brief` this file, from §6)
Apply ticked rows verbatim to the branch's pages (the copy gate in `scripts/verify-room.py`
widens to the ticked list, cited by row). `pnpm build` green (copy-lint is the judge),
`verify-room.py` green, axe unchanged, screenshots at 390 and 1440 to `.planning/qa/pass-102/`.
Commit per page.

## 7. Verification (the applier runs; Fable looks once at the 390 screenshots)
`pnpm build` tail · verify-room summary · a diff of every changed string against the ticked
table (zero unticked changes) · em-dash count per page ≤ 1 · average sentence length per
page ≤ 25 · zero banned words.

## 8. Return conditions
A proposal that changes a fact or a number · a ticked row the copy gate rejects · the
reader unable to open an input · any string not traceable to the table.
