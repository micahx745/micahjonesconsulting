# Pass-123d (GLM batch): cut the RFP day-three FAQ (operator 2026-09-19)

Scope: exactly two files change: `content/work/rfp-engine.mdx` (one line removed) and
`scripts/retired-phrases-gate.mjs` (one phrase added). New files only under `.planning/qa/pass-123/faq/`.

Working dir: `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`. Do NOT commit, push,
deploy, stash, or run any git command that changes the index or HEAD. Do not edit any other file. The
Pass-123c edits in `app/globals.css` and `components/color-worlds/ExitScoreboard.tsx` are awaiting commit:
leave them exactly as they are. Port 3250 (free before start; stop the server after).

The ruling (LESSONS #3 "RFP DAY-THREE FAQ CUT"): the operator picked "Cut the whole FAQ (Recommended)". The
FAQ said RFPs were "scored for fit" by day three; the page and his 09-16 confirmation say scoring came after.

1. BEFORE text: `pnpm start -p 3250` on the current `.next`; save
   `curl -s http://localhost:3250/work/rfp-engine | node .planning/exec/visible-text.mjs > .planning/qa/pass-123/faq/text-before.txt`;
   stop the server.
2. Bite first: append to the end of `PHRASES` in `scripts/retired-phrases-gate.mjs` (before `];`):
```js
  // Pass-123 (operator 2026-09-19, LESSONS #3 "RFP DAY-THREE FAQ CUT"): the RFP engine
  // scored nothing by day three.
  "scored for fit",
```
   `node scripts/retired-phrases-gate.mjs; echo "exit=$?"` EXPECT `exit=1` with exactly one finding,
   `content/work/rfp-engine.mdx:91`.
3. In `content/work/rfp-engine.mdx` delete line 91, exactly this line:
   `**What was working after three days?** Real RFPs arriving, scored for fit. The library, the drafting and the tuning came after.`
   and the blank line that follows it, so exactly one blank line stays between the previous FAQ and the
   `## If your experts read the same document every week` heading. Change nothing else.
4. `node scripts/retired-phrases-gate.mjs; echo "exit=$?"` EXPECT `exit=0`.
5. `pnpm build 2>&1 | tee .planning/qa/pass-123/faq/build.log` EXPECT exit 0 and every gate passing.
6. `grep -c "scored for fit" .next/server/app/work/rfp-engine.html` EXPECT `0` (RSC and JSON-LD included).
   `grep -c "What was working after three days" .next/server/app/work/rfp-engine.html` EXPECT `0`.
7. AFTER text (server on 3250, then stop it) to `faq/text-after.txt`;
   `diff .planning/qa/pass-123/faq/text-before.txt .planning/qa/pass-123/faq/text-after.txt` EXPECT only the
   FAQ's text removed; paste the diff verbatim.
8. `git diff --stat -- content scripts` EXPECT exactly the two files.

Report to `.planning/qa/pass-123/faq/REPORT-123D.md` with every command's raw output. Rules: never pass a check
by editing the work; if an expectation is not met, stop and report the raw output.

Your FINAL message (batch mode prints only that message) must BEGIN with the marker on this prompt's LAST
line, on its own line (LESSONS #36).

LAST LINE MARKER: pass123d-quill-15
