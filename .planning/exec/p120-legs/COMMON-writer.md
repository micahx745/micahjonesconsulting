# Pass-120 build: rules for every WRITER leg

You are a WRITER leg of the Pass-120 build of micahjonesconsulting.

- Worktree root (run every command from here, in Git Bash):
  `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live` — branch `design/live-evolve`.
- The brief is `.claude/briefs/pass-120-work-page.md` (5,523 lines). **Section 1 (lines 1-156) rules
  over sections 2-6.** Read lines 24-114 first. The main session has already decided how section 1
  (and two operator rulings made today) apply to your files: they are listed under OVERRIDES in your
  leg file and they win over the brief text.
- Helper: `node .planning/exec/brief-block.mjs <line>` prints, exactly, the fenced code block whose
  opening fence is on or after `<line>`. Use it to copy "exactly this" blocks and to diff what you
  wrote, e.g. `node .planning/exec/brief-block.mjs 238 > "$TEMP/b.txt" && diff "$TEMP/b.txt" lib/case-study-schema.ts`.

## Hard rules

1. **One writer per file.** Touch ONLY the files listed under YOUR FILES in your leg file. Other
   agents are editing other files in this same worktree at the same time. If a change you need is in
   someone else's file, report it; do not make it.
2. **No git writes.** Never run `git add`, `git commit`, `git stash`, `git checkout`, `git reset`,
   `git rm`, `git restore` or `git clean`. Read-only git (`status`, `diff`, `log`, `show`, `archive`)
   is fine. The main session commits. Delete files with plain `rm`.
3. **Hooks must fire.** Write source files with the Write or Edit tool so the PreToolUse hooks run.
   Never write a source file through Bash (heredoc, `sed -i`, `cp`, a node script) to get around a
   hook. The one exception is where the brief itself specifies a `sed -i` line-range deletion. If a
   hook refuses a write, STOP that file and report the refusal verbatim. (LESSONS #31:
   `motion-discipline.sh` reads the MAIN checkout's `.claude/brand.json`, so a motion refusal may be
   that trap; still stop and report, never route around it.) A PostToolUse warning (for example
   `design-tokens.sh` on a hex) is not a refusal: note it in the report and continue.
4. **Byte for byte.** Place "exactly this" code blocks byte for byte, apart from the listed
   OVERRIDES. Do not reformat, rename, re-comment or improve. Line numbers the brief quotes for TODAY's
   files may have drifted: locate every target by its quoted text. If quoted text is not found exactly,
   stop that edit and report.
5. **Never reinterpret an expected value** (LESSONS #25). If a check prints anything other than its
   expected output, report the raw output. Do not edit the check or the expectation.
6. **No build, no server.** Do not run `pnpm build`, `next build`, `next dev`, `next start`,
   `pnpm typecheck` or `tsc` (the tree will not compile until every leg lands; the main session runs
   those). Running node scripts, `tsx -e`, grep, ffprobe and puppeteer against PRODUCTION is fine where
   your leg says so. Never hit localhost.
7. Read only the brief line ranges your leg file names (plus section 1). Do not read the whole brief.
8. Large files (`app/globals.css` is ~7,600 lines): never Read whole; use `grep -n` and Read with
   offset and limit.

## Report (your final message, plain text, no preamble)

- For each file: created / rewritten / edited / deleted, and one line on what changed.
- Every place you departed from the brief text, and why (the listed overrides included, by id).
- Every hook message, verbatim.
- Every check you ran: the command and its raw output, and the brief's expected value.
- Anything you could not do, or any brief text you believe is wrong (with the evidence).
