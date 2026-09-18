You are the executor for Pass-121 STAGE A on micahjonesconsulting.com, in the git worktree
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live (W), branch `design/live-evolve`.

Read first, in W: `AGENTS.md`; then `.claude/briefs/pass-121-work-and-studies.md` sections 2 (all of it: the
exact copy), 5 (the opening paragraphs, the standing clauses and the visible-text helper) and "Stage A"
(A1 to A6); then `.claude/briefs/README.md` "Standing clauses". The brief is FINAL (G4 passed). Execute
Stage A exactly as written. Do not start Stage B or any later stage.

HARD LIMITS
- Touch only the files Stage A names: `scripts/retired-phrases-gate.mjs`, `content/work/ordani.mdx`,
  `content/work/content-engine.mdx`, `content/work/birth-worker.mdx`, `content/work/rfp-engine.mdx` (only
  its `entry.figure` and `entry.line`), `content/work-page.ts` (only the `RECORD.heading` value and the three
  new exports in section 2.1), `app/llms.txt/route.ts`, `app/(foyer)/page.tsx` (only the ORDANI `cw-lede`
  paragraph and the Pass-82 comment above it), `app/robots.ts`, `app/sitemap.ts`, `app/layout.tsx` (only the
  Ordani `Organization` block's `mainEntityOfPage` and its comment), the new `scripts/lastmod.mjs`, the new
  `content/lastmod.json`, the new `.planning/exec/visible-text.mjs`, and `lib/case-study-schema.ts` only if
  the new optional `entry.figurePhrase` field needs declaring there for the build to accept it.
- Every string you place is copied from brief section 2 character for character. You write no copy.
- No push, no deploy, no dev server. The production build (`pnpm build`) and `pnpm start -p 3121` are
  allowed and required; stop the server when the checks are done.
- A check whose `got` differs from its `expect` is a failure. Never edit the work to make a check pass
  (LESSONS #37), never reinterpret an expected value (#25), never combine `grep -i` with `-F` (#34). If a
  check cannot pass, stop before committing and report the raw output.
- A1's before-run MUST fail first, listing the ORDANI and llms.txt lines the brief names. If it lists any
  other file or line, stop and report it: a false positive is the judge's call.

COMMIT
One commit for Stage A, subject `Pass-121: Stage A, the ORDANI claims retirement and the plumbing`, made with
an explicit pathspec of exactly the files you changed (`git commit -m "..." -- <paths>`, LESSONS #23),
ending with the line `Co-Authored-By: GLM 5.3 via Claude Code <noreply@z.ai>`. Nothing else committed.

REPORT, under 40 lines
Every check A1 to A6 as `command | expect | got | PASS/FAIL`, verbatim. The First Load JS for `/work` and
`/work/[slug]` from this build's route table (Stage C and D compare against it). The commit hash and its
file list. Anything you could not do, named plainly.
