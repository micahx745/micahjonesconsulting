You write three measurement scripts from a written spec. You do not decide what to measure.
Working directory: C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live

Read, in full, before writing:
- .claude/briefs/pass-119-gsap-after-load.md (§10 overrides earlier sections where they conflict)
- .planning/exec/type117.mjs and .planning/exec/perf118a.mjs (house style: puppeteer-core from
  C:/tmp/p101tools/package.json, Chrome at C:/Program Files/Google/Chrome/Application/chrome.exe,
  argument parsing, PASS/FAIL lines and a final failures line with exit code)

Write exactly these three new files and nothing else:

1. .planning/exec/chunks119.mjs  (brief §5.1 and §5.3)
   Usage: node .planning/exec/chunks119.mjs [base]  (default http://localhost:3200).
   For routes "/" and "/services": fetch the HTML (global fetch), collect every <script src="...">
   (decode &amp;), fetch each script, and print one line per chunk: size in bytes, the path without
   the query, and "gsap" when the body contains "GreenSock" or "gsap.registerPlugin". Then print
   "initial gsap chunks on /: N" and "initial gsap chunks on /services: M" as the last two lines.
   Exit 0 always (the brief's expectation is read from the printed counts).

2. .planning/exec/reveal119.mjs  (brief §5.3 R1-R4 as defined in §10.2, §10.3, §10.4)
   Usage: node .planning/exec/reveal119.mjs [base]. Exactly the setup, the five title ids, the
   timings and the PASS/FAIL rules in §10.2-§10.4. One fresh browser context per check. Print one
   PASS or FAIL line per check with the numbers behind it (for R1: loadEventEnd, each GSAP response's
   arrival time and URL tail; for R2: per title, char count, any char failing and its opacity and m42;
   for R3: char count per title; for R4: per title, bottom and char count). Last line
   "reveal119 failures: N"; exit 1 when N > 0. Scroll titles into view one at a time in document order.

3. .planning/exec/lh119-summary.mjs  (brief §10.6 and §10.5)
   Reads .planning/exec/lh119/{before,after}-{home,services}-{1,2,3}.json (report "missing" for any
   absent file). Per label and route print the three runs and the median of performance score
   (x100, rounded), largest-contentful-paint, first-contentful-paint and total-blocking-time
   (numericValue, ms, rounded). Then print the three §10.5 gate lines with PASS or FAIL and the numbers:
   "/ median LCP after < before", "/ median TBT after <= before + 10", "/services median performance
   within 1 point". Then print "target / median performance >= 95: MET or NOT MET (value)". Last line
   "lh119 gate failures: N"; exit 1 when N > 0 or any file is missing.

You may run read-only shell commands to read files and `node --check <file>` on each new file
(node.exe runs in PowerShell; npx does not). Do NOT run the scripts, npx, npm, git, or any network
command, and do not edit any other file.

Final report: DONE or NOT DONE per file, the node --check result for each, and a short summary.
