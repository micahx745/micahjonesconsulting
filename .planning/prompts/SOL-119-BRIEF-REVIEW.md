You are reviewing an execution brief before anyone runs it. Read-only: do not edit any file and do
not run network commands. Working directory:
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live

Brief: .claude/briefs/pass-119-gsap-after-load.md
Files it rests on: components/color-worlds/SplitReveal.tsx, app/(foyer)/page.tsx (the five usages),
scripts/gsap-quarantine-gate.mjs, components/TitleCard.tsx (the other GSAP user),
next.config.* , package.json (gsap and @gsap/react versions), node_modules/gsap/package.json
(export paths for gsap/SplitText and gsap/ScrollTrigger), and the evidence in
.planning/qa/pass-118/prod/home-simulate-1.json (audits network-requests, metrics).

PREMISES AND COLLISIONS, not taste. Check with file:line evidence:
1. Does removing SplitReveal's static GSAP imports actually remove GSAP from the initial chunks of
   `/`? Could TitleCard.tsx, @gsap/react, or a shared chunk still put GSAP in the home route's
   first-load JavaScript (for example through a layout, a barrel import, or webpack/turbopack chunk
   merging)?
2. The dynamic import paths: are `import("gsap")`, `import("gsap/SplitText")`,
   `import("gsap/ScrollTrigger")` valid for the installed gsap version, and what do they resolve to
   (default vs named exports)? SplitText licensing/packaging in the installed version?
3. Does gsap-quarantine-gate.mjs allow dynamic imports inside SplitReveal.tsx, or will it fail?
4. Behavior parity: today `useGSAP` with `gsap.matchMedia()` runs at hydration and pre-hides chars
   below the trigger. Does the §3.1 spec reproduce the same visible result for a title that is below
   the fold at load? Is the "already passed" rule (top <= innerHeight * N/100) the right test for a
   ScrollTrigger `start: "top N%"`? Any title on `/` within the first viewport at 390 or 1440 where the
   new timing would show a static title that today animates?
5. Cleanup: is killing the tween + its ScrollTrigger + split.revert() complete, and safe under React
   19 strict-mode double effects and the site's View Transitions (app/layout.tsx wraps children)?
6. The expected results in §5.3: is "home median performance >= 95" a sound expectation from the
   evidence (/services has no GSAP and scores 97 with LCP 2.56s)? Any reason the local-build
   Lighthouse runs would not be comparable before/after?
7. Any step in §5 whose command would not run as written on Windows Git Bash with
   MSYS_NO_PATHCONV=1, or whose expected output is ambiguous. The two scripts chunks119.mjs and
   reveal119.mjs do not exist yet; check that §5.3's description of them is specific enough to write.

Output: numbered findings tagged PREMISE-OK, PREMISE-WRONG, or RISK, each with file:line evidence and
one sentence of consequence. PREMISE-WRONG and RISK first. Under 50 lines.
