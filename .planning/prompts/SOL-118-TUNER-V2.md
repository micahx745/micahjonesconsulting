You revise one measurement script to a written spec. You do not decide what to measure.
Working directory: C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live

Read, in full, before editing:
- .claude/briefs/pass-118-tuned-font-fallbacks.md. §13 is the newest ruling and overrides every
  earlier section where they conflict; §10.4-10.8, §11 and §12 still apply otherwise.
- .planning/exec/fallback118.mjs (the v1 tuner you wrote; keep its structure and house style)
- .planning/exec/ctarow118.mjs (the diagnosis that showed the v1 scope gap)

Edit exactly one file: .planning/exec/fallback118.mjs. Changes, all from §13:

1. Candidate = TWO FontFace objects per family under one unique family name, added in this order:
   (a) legacy: local("Arial"), no unicodeRange, next/font's generated values (Bricolage sizeAdjust
   105.43%, ascentOverride 88.21%, descentOverride 25.61%; Hanken 100.94%, 99.07%, 30.02%;
   lineGapOverride 0%); (b) tuned: local("Arial") at the swept S with the §3.2 overrides and
   unicodeRange = the §13 range list for that family (U+0030 excluded). Await both loads; exit 1
   with "candidate face failed to load from local Arial" if either is not loaded. Delete both after
   measuring. A third family, JetBrains Mono, has a single-face candidate only in the combined
   check: local("Courier New"), sizeAdjust 100%, ascentOverride 102%, descentOverride 30%,
   lineGapOverride 0%, overriding --font-jetbrains (exit 1 with "candidate face failed to load from
   local Courier New" if not loaded).
2. Scope: EVERY element whose getBoundingClientRect().top < window.innerHeight (scroll 0), except
   inside .sr-only or [hidden], and boxes 2px or less in width or height. Record for each: structural
   path (as before), top, left, width, height (rounded to 0.1), and, when it has its own non-empty
   text node, line count. A mismatch: top or height more than 1px apart, or line count differing,
   or an element present in only one state. Count left or width differences > 1px separately as
   "moved sideways N" and print them, but they are not mismatches.
   The search measures ALL such elements (not only the face under test); membership is the REAL
   state's list for that page and width.
3. Modes:
   - default: bite (v1 values: single-face candidate at 105.43 / 100.94 as before, must still read
     >= 1), then search Bricolage and Hanken with the two-face candidate over S 60.00-115.00 step
     0.25 (the other two families real), then the combined check with Bricolage and Hanken at their
     chosen values plus the JetBrains candidate. Print as before plus "moved sideways" counts. Do
     NOT write geometry files in default mode any more.
   - --geometry --label before|after [--base URL]: fonts loaded, all four viewports, routes "/" and
     "/services", writes .planning/qa/pass-118/geometry2-<label>.json.
   - --compare: compares geometry2-before.json and geometry2-after.json, prints each mismatch and
     "geometry diffs: N", plus "moved sideways: N".
   - --verify --label before|after [--base URL]: fonts blocked against fonts loaded, the §10.8 routes,
     all four viewports, the new scope; writes verify2-<label>.json; prints each mismatch line
     (route, width, path tail, text or tag, blocked vs loaded values), per route+width counts, and
     "verify total mismatches: N".
   - --base applies to every browser mode. With an https base, keep request interception working for
     fonts (URLs contain .woff2 with a ?dpl= query).
4. Print every mismatch with enough detail to act on: page, width, the last three path steps, the
   element's text (first 40 chars) or tag.class, and both states' top/height/lines.

You may run read-only shell commands to read files, and `node --check .planning/exec/fallback118.mjs`
(node.exe runs in PowerShell; npx does not). Do NOT run the script, npx, npm, git add/commit/push,
or any network command, and do not edit any other file.

Final report: DONE or NOT DONE, the node --check result, and a list of what changed per function.
