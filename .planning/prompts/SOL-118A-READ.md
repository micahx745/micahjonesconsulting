You are an independent reader of measurement data. Read-only: do not edit any file and do not
run network commands. Working directory:
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live

Another model (Claude Opus) wrote a findings file from these measurements. Your job is to check
it against the raw data, not to agree with it.

Read:
- .planning/reviews/PERF-118A-FINDINGS.md  (the claims, especially "Mechanism" 1-5 and the
  "correction" section about hadRecentInput)
- .planning/qa/pass-118a/probe.json  (raw per-load records: shifts with value, time,
  hadRecentInput, sources with nodeName, previousRect, currentRect, dy, dh; lcp; classTime; fontsTime)
- .planning/exec/perf118a-tables.mjs and .planning/exec/perf118a.mjs  (how the numbers were made)
- .planning/qa/pass-118a/lh-devtools.md and, if needed, .planning/exec/lh118a/home-devtools-1.json
  (audits "layout-shifts", "cls-culprits-insight", "largest-contentful-paint")
- lib/fonts.ts
- .claude/briefs/pass-118a-perf-diagnosis.md (what was asked)

Check, with evidence from the files (quote numbers, name the condition and load index):
1. Does every number in the findings tables match probe.json? Recompute at least q1-A, q1-B, q1-C, q2-A.
2. Is counting hadRecentInput shifts justified here? Is there any sign of real input, or any other
   explanation for the flag? Does the Lighthouse shift really match the probe shift?
3. Mechanism 1: is "web-font swap" the best-supported cause? Look at q1-C: why do 2 of 10 loads
   have a different top source (div.cw-cta-row dy -31) and a min of 0.121? Does anything in the raw
   shifts point at a second cause (image, hero photo, viewport/emulation, JS-inserted content)?
4. Mechanism 2 and 3: do the shift times and the fontsTime values support "lands with the font
   swap"? Note fontsTime (document.fonts.ready) is later than the shift; is that consistent?
5. Mechanism 4 and 5: are the LCP deltas and the "reveal does not hold LCP" conclusion supported
   at these sample sizes (10 and 5 loads)? State the spread, not only the median.
6. Anything the findings claim that the data does not show, or anything important the data shows
   that the findings omit.

Output: numbered answers matching 1-6, each starting CONFIRMED, CORRECTION, or UNSUPPORTED, with
the evidence. Then one line: your own statement of the mechanism in at most 40 words. Under 60 lines.
