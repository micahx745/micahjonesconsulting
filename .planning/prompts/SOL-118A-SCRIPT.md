You write one measurement script from a written spec. You do not decide what to measure.
Working directory: C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live

Read, in full, before writing:
- .claude/briefs/pass-118a-perf-diagnosis.md  (§8 overrides §2 and §3 where they conflict)
- .planning/exec/type117.mjs  (house style: how puppeteer-core is loaded from
  C:/tmp/p101tools/package.json, the Chrome path, argument parsing)

Write exactly one new file: .planning/exec/perf118a.mjs, an ES module that implements §2 (Q1 and
the /services part of Q2), §3 (--bite) and §8 (the CDP PerformanceTimeline domain for every
condition, DOM.describeNode for node names, progress lines, probe.json written after each
condition, flags).

Requirements the spec implies; follow them exactly:
- Lighthouse-like mobile emulation per §2 through page.createCDPSession(): device metrics override
  412x823, deviceScaleFactor 1.75, mobile true; touch emulation on; CPU throttling rate 4; the
  Network domain switched on with the cache disabled; network conditions offline false, latency 150,
  downloadThroughput 1.6 * 1024 * 1024 / 8, uploadThroughput 750 * 1024 / 8.
- A FRESH page (and CDP session) per load, so no cache or state carries over. One browser for the
  whole run is fine.
- Conditions: A baseline; B fonts blocked (request interception, abort any request whose URL
  contains ".woff2" or ".woff"); C JavaScript disabled on the page; D prefers-reduced-motion: reduce
  through emulated media features.
- Per load: navigate with waitUntil "load" (timeout 90000), then wait 6000 ms, then read. CLS for a
  load = sum of layout-shift values with hadRecentInput false. LCP = the last
  largest-contentful-paint event's renderTime (fall back to loadTime when renderTime is 0), its
  size and node name. Keep every shift's value, time, and sources (node name, previousRect,
  currentRect, and dy = currentRect.y - previousRect.y, dh = currentRect.height - previousRect.height).
- For A, B, D also record, via page script injected with evaluateOnNewDocument: the
  performance.now() time at which an element first gains the class "cw-js-reveals" (a
  MutationObserver on the document, subtree, attributeFilter class), and the time
  document.fonts.ready resolves. For C write "not reported".
- Times in ms relative to navigation start: for JS-on conditions read performance.timeOrigin from
  the page and convert each CDP event time (seconds since epoch) as time * 1000 - timeOrigin; for C
  use the Date.now() captured immediately before page.goto.
- --bite: 3 loads of "/" in condition A with an injected script (evaluateOnNewDocument) that, 800 ms
  after DOMContentLoaded, inserts a div of height 200px as the first child of <main>. Print
  "bite load k: cls=X top-source=Y" and a final line "bite: PASS" if CLS > 0.1 on all 3 loads,
  otherwise "bite: FAIL", and exit 1 on FAIL.
- --q1: path "/" x conditions A B C D x 10 loads (or --loads). --q2: path "/services" x A B C D x 5
  loads (or --loads). With neither flag and no --bite, print usage and exit 0.
- Output .planning/qa/pass-118a/probe.json: { base, startedAt, conditions: { "q1-A": [ load records ], ... } }
  (create the directory; rewrite the file after each condition). After each condition print:
  "q1 A loads=10 cls min/med/max=a/b/c over0.05=n lcp med=m top-shift=<node> dy=.. dh=.. t=.. near=class|fonts|none"
  where near says whether the top shift starts within 100 ms of the class time or the fonts time.
- One progress line per load, printed immediately: "q1 A 3/10 cls=0.000 lcp=1234".
- Close every page; close the browser at the end; exit 0 unless --bite failed or loads threw 3
  times in a row (then exit 1 with the error).

You may run read-only shell commands to read files, and `node --check .planning/exec/perf118a.mjs`
to syntax-check (node.exe runs in PowerShell; npx does not). Do NOT run the script, npx, npm,
git add/commit/push, or any network command, and do not edit any other file.

Final report: DONE or NOT DONE, the node --check result, and a 10-line summary of the script's
structure (functions and what each returns).
