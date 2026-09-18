You are the executor RESUMING Pass-121 STAGE A on micahjonesconsulting.com, in the git worktree
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live (W), branch `design/live-evolve`.
Your previous Stage A run stopped at the z.ai usage cap with its edits uncommitted. The main session has
reviewed them. Do NOT redo or re-edit what is listed as DONE.

Read first, in W: `AGENTS.md`; `.claude/briefs/pass-121-work-and-studies.md` section 5 (opening paragraphs,
standing clauses, visible-text helper, Stage A); `.claude/briefs/README.md` "Standing clauses".

## DONE and verified by the main session (leave these files' content exactly as they are)

- Every section 2.1 and 2.2 copy edit: `content/work/ordani.mdx`, `content-engine.mdx`, `birth-worker.mdx`,
  `rfp-engine.mdx`, `content/work-page.ts`, `app/llms.txt/route.ts`, the ORDANI paragraph in
  `app/(foyer)/page.tsx`. 20 of 20 exact strings present once; the home paragraph exact, no entities.
- A1 and A2: the phrases in `scripts/retired-phrases-gate.mjs`; `--self-test` exit 0; the edited tree reports
  clean, exit 0; the bite was proven on copies of the pre-edit HEAD files, which failed on exactly
  `ordani.mdx` lines 6, 7, 16, 20, 48, 58 and `llms.txt` line 42. Do not re-run the before-run.
- `lib/case-study-schema.ts`: `figurePhrase` optional; `entry.figure` required on order 1 and allowed
  elsewhere; the description cap 155 to 175. All three stand (the cap by operator ruling, LESSONS #3
  "ORDANI DESCRIPTION KEEPS HIPAA-COMPLIANT"). Change only the cap's comment, to cite that row in place of
  the sentence that begins "The operator-approved ORDANI description".
- `app/sitemap.ts` reading `content/lastmod.json`; `scripts/lastmod.mjs` (untracked, written by you).

## TO DO, in this order

1. `app/robots.ts`: keep the four named allow records. Replace their three-line comment with exactly:
   `// Pass-121 (audit-b item 3): named allow records for the AI assistants' fetchers, beside the`
   `// wildcard. Audit-b states it cannot show this changes how any assistant cites the site; it states`
   `// the policy per agent, nothing more.`
   The current comment's claim that bots "have been observed to skip a wildcard-only file" is unsourced.
2. `app/layout.tsx`: A5 exactly as the brief says (drop `mainEntityOfPage` from the Ordani Organization
   block, rewrite its comment). Touch nothing else in that file.
3. `.planning/exec/visible-text.mjs`: the helper exactly as brief section 5 describes it.
4. `node scripts/lastmod.mjs` to write `content/lastmod.json`.
5. `pnpm build`, then `pnpm start -p 3121` in the background; run A3, A4, A5 and A6's served checks exactly
   as written; stop the server.
6. Commit 1, subject `Pass-121: Stage A, the ORDANI claims retirement and the plumbing`, with an explicit
   pathspec of every Stage A file (the DONE files above, `app/robots.ts`, `app/layout.tsx`,
   `app/sitemap.ts`, `scripts/lastmod.mjs`, `content/lastmod.json`, `.planning/exec/visible-text.mjs`),
   ending `Co-Authored-By: GLM 5.3 via Claude Code <noreply@z.ai>`.
7. The commit just changed several routes' source files, so their git dates moved. Run
   `node scripts/lastmod.mjs` again, then commit 2, `Pass-121: Stage A, lastmod dates after the stage
   commit`, pathspec `content/lastmod.json` only. Then `node scripts/lastmod.mjs --check; echo EXIT=$?`
   expect `EXIT=0`.

HARD LIMITS: no other file; no copy written by you; no push, no deploy, no dev server; a `got` that differs
from its `expect` is a failure, never edit the work to pass a check (#37), never reinterpret an expect
(#25), never `grep -i` with `-F` (#34). If a check cannot pass, stop before committing and report the raw
output.

REPORT, under 35 lines: every A3 to A6 check and the `--check` as `command | expect | got | PASS/FAIL`,
verbatim; the First Load JS for `/work` and `/work/[slug]` from this build's route table; both commit hashes
and file lists; anything you could not do, named plainly.
