You write one measurement script from a written spec. You do not decide what to measure.
Working directory: C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live

Read, in full, before writing:
- .claude/briefs/pass-118-tuned-font-fallbacks.md  (§10 overrides every earlier section where they
  conflict; §3.3 and §10.4-10.8 define the script)
- .planning/exec/perf118a.mjs and .planning/exec/type117.mjs  (house style: puppeteer-core loaded
  from C:/tmp/p101tools/package.json, the Chrome path, argument parsing, CDP use, request
  interception for fonts)
- app/layout.tsx and app/globals.css lines 80-130 (the font variables)

Write exactly one new file: .planning/exec/fallback118.mjs, an ES module implementing §3.3 as
amended by §10: the default mode (bite, search for Bricolage and Hanken, combined check,
geometry-before.json), --after, --compare, --verify --label before|after, and a --base flag
(default http://localhost:3200). Outputs go under .planning/qa/pass-118/ (create it).

Details that are easy to get wrong; follow them exactly:
- Bricolage's real family is "Bricolage Grotesque" and its variable is --font-bricolage; Hanken's is
  "Hanken Grotesk" and --font-hanken. The override is a style element with
  `:root:root { --font-bricolage: "CandNNNN"; }` (or --font-hanken), replaced for each S.
- The candidate FontFace descriptors take strings with a percent sign: sizeAdjust "S%",
  ascentOverride and descentOverride from the §3.2 formula (Bricolage: 88.21*105.43/S and
  25.61*105.43/S; Hanken: 99.07*100.94/S and 30.02*100.94/S), each to 2 decimals, lineGapOverride "0%".
- Reuse one page per page+width for the whole S sweep (load once, wait for document.fonts.ready,
  then 1000 ms, then record the REAL state, then sweep). Viewports per §10.4 via
  page.setViewport({ width, height, deviceScaleFactor, isMobile, hasTouch }). Reduced motion on
  (emulateMediaFeatures prefers-reduced-motion: reduce).
- The bite measures with the candidate at exactly S=105.43 (Bricolage) and S=100.94 (Hanken), one
  face at a time, on "/" at 412 and on "/services" at 412; print "bite mismatches: N" (sum) and exit 1
  with "bite: FAIL, the tuner cannot see the reflow" when N is 0. Do the bite before the search.
- Search S from 80.00 to 115.00 in 0.25 steps. Print a progress line per face, page and width
  ("Bricolage / 412 S 80.00..115.00 done, feasible count K"). Keep per-S mismatch counts.
- Feasible runs, chosen value, ties, and the "feasible: none" report exactly as §3.3 plus §10.6.
- Combined check: both candidates at their chosen values on both pages at all widths, printing
  "combined mismatches: N" and each mismatch.
- --verify: for each route in §10.8 and each width, load the page twice in fresh browser contexts:
  once with request interception aborting any URL containing ".woff2" or ".woff", once normally (wait
  for document.fonts.ready then 1000 ms). Measure elements of BOTH real faces (Bricolage and Hanken)
  per §10.5 in the first viewport, keyed by structural path; compare line count and 1px height; an
  element present in only one of the two loads counts as a mismatch. With fonts blocked the first
  computed family is still the real family name, so select by the declared family, not by which
  file rendered.
- --after writes geometry-after.json with the same REAL-state record as the default mode.
  --compare: rect values more than 0.5px apart, a different line count, or a key in one file only.
- Exit 0 on success. Exit 1 on bite fail, face load failure, or when the default mode finds no
  feasible S for a face (after printing the report).

You may run read-only shell commands to read files, and `node --check .planning/exec/fallback118.mjs`
to syntax-check (node.exe runs in PowerShell; npx does not). Do NOT run the script, npx, npm, git
add/commit/push, or any network command, and do not edit any other file.

Final report: DONE or NOT DONE, the node --check result, and a 12-line summary of the functions.
