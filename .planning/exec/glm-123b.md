# Pass-123b (GLM batch): the RFP contract count comes out; study-band BEFORE captures; home CLS attribution

Scope: part 1 changes exactly three files: `content/work/rfp-engine.mdx` (three strings, straight cuts),
`scripts/work-entry-gate.mjs` (its fixture strings) and `scripts/retired-phrases-gate.mjs` (new phrases).
Parts 2 and 3 only read the live site and write under `.planning/qa/pass-123/` and `.planning/exec/`.

Working dir: `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`. Do NOT commit, push,
deploy, stash, or run any git command that changes the index or HEAD. Do not edit `.claude/RESUME.md`,
`docs/`, or any other source file. The four files already modified in the tree (`app/globals.css`,
`components/view-transition-link.tsx`, `app/(foyer)/work/page.tsx`, `app/(foyer)/page.tsx`) are Pass-123a
work awaiting commit: leave them exactly as they are.

Your FINAL message (the one you end the run with; batch mode prints only that message) must BEGIN with
the marker on this prompt's LAST line, on its own line (LESSONS #36: it proves the whole prompt arrived).

Rules (LESSONS #25, #37): a check can fail the work; never pass it by editing the work. If an expected value
is not met, STOP and report the raw output. Never reinterpret an expected value. Port 3250 for every local
server (confirm it is free first; stop it when each step ends). Chrome and puppeteer-core as in
`.planning/exec/scrollbar-fit.mjs`.

## Part 1: retire the RFP contract count (operator 2026-09-19, verbatim: "lets not number the contracts in this story sorry. no need to say 11 contracts won, just say the overall amount.")

1. BEFORE text: `pnpm start -p 3250` on the current `.next`; save
   `curl -s http://localhost:3250/work | node .planning/exec/visible-text.mjs > .planning/qa/pass-123/rfp/text-before-work.txt`
   and the same for `/work/rfp-engine` to `text-before-study.txt`. Stop the server.
2. Prove the gate bites first. In `scripts/retired-phrases-gate.mjs`, append to the end of `PHRASES` (before
   the closing `];`):
```js
  // Pass-123 (operator 2026-09-19, LESSONS #3 "RFP CONTRACT COUNT RETIRED"):
  // no count of the RFP client's contracts or awards, in any spelling.
  "eleven awards",
  "eleven contracts",
  "eleven signed",
  "eleven of them",
  "11 awards",
  "11 contracts",
```
   Run `node scripts/retired-phrases-gate.mjs; echo "exit=$?"`. EXPECT `exit=1` with findings naming
   `content/work/rfp-engine.mdx` at lines 18, 23 and 76, and nothing else. If it names any other file or
   line, STOP.
3. In `content/work/rfp-engine.mdx`, make exactly these three replacements (whole strings, nothing else):
   - line 18: `  lead: "$3M in signed contracts across eleven awards."` becomes `  lead: "$3M in signed contracts."`
   - line 23: `  line: "in signed contracts across eleven awards."` becomes `  line: "in signed contracts."`
   - line 76: `- $3M in signed contracts through the platform, across eleven awards.` becomes
     `- $3M in signed contracts through the platform.`
4. In `scripts/work-entry-gate.mjs`: header comment line 5, change `line "in signed contracts across eleven
   awards."` to `line "in signed contracts."` (Pass-123 cut the count); in `selfTest()`, `expectedRfp`
   becomes `"$3M in signed contracts."`, `defectiveHtml`'s h3 text becomes `in signed contracts.`, and
   `correctHtml`'s h3 text becomes `$3M in signed contracts.`. Change nothing else.
5. `node scripts/retired-phrases-gate.mjs; echo "exit=$?"` EXPECT `exit=0`.
   `node scripts/work-entry-gate.mjs --self-test; echo "exit=$?"` EXPECT PASS and `exit=0`.
6. `pnpm build 2>&1 | tee .planning/qa/pass-123/rfp/build.log` EXPECT exit 0 and the line
   `work-entry-gate: PASS rfp-engine (1x) "$3M in signed contracts."`.
7. `grep -ci "eleven" .next/server/app/work.html .next/server/app/work/rfp-engine.html` EXPECT `:0` for both
   (this counts the RSC payload and JSON-LD too).
8. AFTER text: server on 3250, save `text-after-work.txt` and `text-after-study.txt` the same way, stop it.
   `diff text-before-work.txt text-after-work.txt` and the same for the study. EXPECT the only changed lines
   are the ones carrying the three strings above; paste both diffs verbatim.

## Part 2: study-band BEFORE captures (the live site, read only)

For each slug in [guardicore, rfp-engine, ordani, content-engine, birth-worker], load
`https://www.micahjonesconsulting.com/work/<slug>` at 390x844 (DPR 2, isMobile, hasTouch) and at 1440x900
(DPR 1), waitUntil networkidle2, then:
- wait 2500ms (the title settles in 600ms), viewport PNG to `.planning/qa/pass-123/study-before/<slug>-<W>-band.png`
- full-page PNG to `<slug>-<W>-full.png`
- a fresh load with `prefers-reduced-motion: reduce`, viewport PNG to `<slug>-<W>-rm.png`
- record to `study-before/geometry.json` per slug and width: `.cs-band` rect height; computed font-size and
  font-weight of `.cs-band__context`, the TitleCard's lines (the elements inside `.cs-band__head` that hold
  the title text), `.cs-band__dek`, `.cs-glance__result`; the `.cs-band__media` rect if present; and
  `document.documentElement.scrollHeight`.
Write the script as `.planning/exec/study-before-123.mjs`. Do not describe any capture as looking fine.

## Part 3: where does the home page's CLS come from? (the live site, read only)

Pass-123a measured CLS on `/` as the sum of every layout-shift entry during load plus a scripted scroll:
0.33 at 390 (mobile) and 0.20 at 1440, the same before and after its fix. Find the sources. Write
`.planning/exec/cls-attrib-123.mjs`: the same load and scroll as `.planning/exec/cls-123.mjs` against
`https://www.micahjonesconsulting.com/`, but record every entry: value, startTime, `window.scrollY` when
the observer callback ran, hadRecentInput, and each source's node as a short selector (tag plus classes,
up to 3 ancestors) with previousRect and currentRect. Also compute CLS the way Chrome does (session windows:
entries less than 1s apart, window capped at 5s; the metric is the largest window). Save
`.planning/qa/pass-123/cls-attrib-390.json` and `cls-attrib-1440.json`, and print per width: the total, the
largest session window, and the top 12 entries by value with their sources.

## Report
Write `.planning/qa/pass-123/REPORT-123B.md`: part 1 every command with its raw output and both diffs;
part 2 the capture paths and `geometry.json` as a table; part 3 the totals, the largest window and the top
entries per width. Then reply with a short PASS/FAIL list for part 1's steps 2 and 5-8.

LAST LINE MARKER: pass123b-harbor-31
