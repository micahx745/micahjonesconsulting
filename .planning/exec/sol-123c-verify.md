# Pass-123c verification (Sol): finish the scoreboard checks GLM could not

You are a grunt executor. Do exactly what is below; rule on nothing.

Working dir: `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live` (a git worktree).
Do NOT run any git command that changes the index or HEAD (no add, commit, stash, checkout, restore).
Read-only `git status` / `git diff` are fine. Do NOT edit `app/`, `components/`, `content/`, `lib/`,
`scripts/`, `docs/`, `.claude/`. You may create and edit files ONLY under `.planning/exec/` and
`.planning/qa/pass-123/`. Never push or deploy.

## Where things stand
The fix is already implemented and uncommitted in `app/globals.css` and
`components/color-worlds/ExitScoreboard.tsx`. Its brief is `.claude/briefs/pass-123c-scoreboard-cls.md`;
read §3 (the mechanism) and §5 (the checks V1-V10). The previous executor ran the build and the geometry
pass, then hit its provider's usage cap. What is missing: V2 (the comparison), V3 (CLS), V4 (frames and
sheets), V10 (prettier, tsc, build, route bytes) and the report.

**Its frame capture is broken and must be replaced.** In `.planning/qa/pass-123/scoreboard/` the files
`before-1440-b0/b1/b2/b3/mid1/mid3.png` are byte-identical to each other (md5
`b9919321a50e6e62f9b0bb02df3bf48d`), and five of six at 390 likewise: the capture never framed different
beats. Treat `.planning/exec/scoreboard-frames-123c.mjs` as suspect; fix or rewrite it.

## What to run (report every command's raw output)
Port 3250 for every server; confirm it is free first and stop the server when each step ends.
Tools: puppeteer-core via `createRequire("C:/tmp/p101tools/package.json")`, Chrome at
`C:/Program Files/Google/Chrome/Application/chrome.exe`, headless, no `--disable-gpu`.
Viewports: 390x844 (DPR 2, isMobile, hasTouch) and 1440x900 (DPR 1).

1. `pnpm build 2>&1 | tee .planning/qa/pass-123/scoreboard/build-after.log` (so the server serves the
   current tree). EXPECT exit 0 and every gate passing.
2. `pnpm exec prettier --check app/globals.css components/color-worlds/ExitScoreboard.tsx` EXPECT
   `All matched files use Prettier code style!`; `pnpm exec tsc --noEmit` EXPECT exit 0, no output.
3. `node .planning/exec/route-js-bytes.mjs .next/server/app/index.html` EXPECT a `files=N bytes=B` line;
   report it beside the pre-fix value `files=12 bytes=808864`.
4. Start the server on 3250. Re-run the geometry pass AFTER against `http://localhost:3250`
   (`.planning/exec/scoreboard-geom-123c.mjs`, output `.planning/qa/pass-123/geom-123c-after.json`), so it
   matches this build.
5. V2: run `.planning/exec/scoreboard-geom-compare-123c.mjs` with the BEFORE file
   (`.planning/qa/pass-123/geom-123c-before.json`, measured against the live site) and the AFTER file.
   EXPECT every text rect and divider within 1.5px per edge, the same visible set, the same current index
   per beat, and the stage top equal to the nav height at every beat, at both widths. Print PASS/FAIL per
   item and a final count. Then PROVE IT BITES: copy the AFTER file, move one value's rect by 3px in the
   copy, run the comparator against the copy, EXPECT a FAIL naming that item, and paste both outputs.
6. V3: `node .planning/exec/cls-attrib-123.mjs http://localhost:3250 .planning/qa/pass-123/cls-123c`
   EXPECT the largest session window <= 0.05 at 390 and at 1440 (the live site reads 0.3298 and 0.1990).
   Paste the printed totals, largest windows, and any remaining shift sources.
7. V4 frames, with a script that asserts its own work: for each width, capture the scoreboard stage at
   beat 0, 1, 2, 3 (scroll to `Y0 + (b + 0.5) * 0.5 * innerHeight` where `Y0` is the section top minus the
   nav height, wait 1500ms), plus one frame 250ms after crossing into beat 1 and into beat 3, plus a
   reduced-motion frame and a JavaScript-disabled frame. Do this for BEFORE
   (`https://www.micahjonesconsulting.com`) and AFTER (`http://localhost:3250`), into
   `.planning/qa/pass-123/scoreboard/`, overwriting the broken files.
   The script MUST fail (exit 1) if any two of the four beat frames of one width and run are byte-identical,
   and MUST record, per frame, the scroll position, the index of the deal carrying `is-current`, and the
   value text that deal shows. Paste that table.
8. Compose `.planning/qa/pass-123/scoreboard/sheet-390.png` and `sheet-1440.png`: row 1 the four BEFORE
   beats, row 2 the four AFTER beats, each cell labelled with the width, the run and the beat
   (`.planning/exec/compose-pass122-sheet.mjs` is a working model). Report each sheet's path and pixel size.
   Do not say how anything looks: the main session opens them.
9. Stop the server; confirm port 3250 is free.

## Rules
A `got` that differs from its `expect` is a FAIL. Never make a check pass by editing the implementation, a
tolerance, or the brief: if V2 or V3 fails, STOP after printing the raw numbers and say which check failed.
Do not describe any image. Do not rule on whether the fix is good.

Write `.planning/qa/pass-123/REPORT-123C.md`: every command with its raw output, the V2 table per width and
beat, the V3 numbers beside 0.3298 / 0.1990, the frame table from step 7, the sheet paths, the byte and
prettier/tsc/build lines, and anything you could not run.

Begin your FINAL message with this marker on its own line: sol123c-beacon-44
