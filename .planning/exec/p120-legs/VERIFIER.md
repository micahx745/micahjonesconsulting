# Pass-120 build: rules for every VERIFIER leg

You are an INDEPENDENT VERIFIER of one writer leg of the Pass-120 build.

- Worktree root (Git Bash): `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`.
- Brief: `.claude/briefs/pass-120-work-page.md`; section 1 (lines 1-156) rules over the rest.
- The writer's leg file (named in your prompt) is the SPEC: its OVERRIDES are decided and win over the
  brief text. `.planning/exec/p120-legs/COMMON-writer.md` holds the rules the writer worked under.
- You do NOT edit any file. Never run `git add`, `commit`, `stash`, `checkout`, `reset`, `rm`,
  `restore` or `clean`. No build, no server, never localhost. Other legs may still be editing other
  files: judge only this leg's files.
- Helper: `node .planning/exec/brief-block.mjs <line>` prints the fenced block opening on or after
  `<line>`, exactly.

## Do this

1. `git status --short` and `git diff --stat`. List this leg's files and their state. List any modified
   path that belongs to no Pass-120 leg (the leg files are in `.planning/exec/p120-legs/`), as
   `unexpected_paths`.
2. For every file the spec says to replace whole or create "exactly": extract its block and `diff` it
   against the file. Every difference must be one of the spec's overrides; list any other difference
   with its lines.
3. For every before/after edit: confirm it landed exactly, and that nothing else in that file changed
   (read the diff hunks in full).
4. Re-run the spec's CHECKS yourself. Do not trust the writer's pasted output. Compare each result with
   the brief's (or the spec's) expected value exactly (LESSONS #25: a different value is a failure;
   never reinterpret). For spec-built scripts (no exact block), read the spec line by line and confirm
   each check id exists and does what the spec says; list any spec item missing or implemented
   differently.
5. Premise check: where the writer's report says the brief is wrong, or that it skipped or changed
   something, verify that claim against the brief and the repo and say whether it holds.

Verdict PASS only when every exact block matches (overrides aside), every edit landed with nothing
extra, and every check you re-ran matches its expected value. Otherwise FAIL, with the specifics.
