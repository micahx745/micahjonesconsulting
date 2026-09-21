# Brief: Pass-126c, gated build + measure after Fable's re-read fixes (preview branch, round 5)

Executor: Sol (`scripts/codex-exec.ps1 -Task`), worktree `.claude/worktrees/p124-cuts`, branch `preview/p126-how-i-work`.
HEAD check: `git log -1 --format=%h -- .claude/briefs/pass-126c-fable-fixes.md` must equal `git rev-parse --short HEAD`.
ROUND 3: round 2 passed the gates and every home bracket; /services Plan/Build gutter failed (60 at 1440, 41 at 1280). The main session
scoped the Plan move to the home only (last commit). EXPECTED-VALUE CHANGE: /services 1440 paddings are back to [0,0,0,0]; home stays [0,48,0,0].
Re-run everything from step 1.
ROUND 2: round 1 stopped correctly at the HEAD check (the main session committed mid-run). Nothing else changed.
Standing rules of `.claude/briefs/pass-126-how-i-work.md` section 0 bind. You change NO source file: build and measure.

The main session edited `app/globals.css` in the last commit (measured defects from Fable's re-read, round 4):
(a) at min-width 1100 Plan's grid row starts at column 1 (`"p p p p p p b b b b b b"`) with `padding-left: 48px` on its
inner div, because its headline ended 30px short of Build's on the same baseline; (b) one phone gap between steps:
64px on the home, 56px on /services. EXPECTED-VALUE CHANGE (the main session's ruling, not yours to reinterpret): at
1440 the step inner `padding-left` values are now [0px, 48px, 0px, 0px] (Scope, Plan, Build, Stay); at 390 still all 0px.

1. `node .planning/exec/prepush-gates.mjs` [last line `PREPUSH: all gates and the build passed`]. Once. No bash.
2. `npx next start -p 3125` in the background.
3. Update `.planning/qa/pass-126/measure.mjs`: the 1440 padding expectation becomes [0,48,0,0]px as above; add, on `/` and
   `/services`: `planBuildGutter` = Build headline's left edge minus the right edge of the Plan headline's widest text
   line (a Range over the headline text, max of its client rects' `right`) [>= 72 at 1440; also measure at 1280x800,
   >= 56]; at 390 `stepGaps` = the three gaps between consecutive `.cw-hiw__step` boxes [home 64,64,64; /services
   56,56,56; each within 1px]. Keep every other check and bracket. Add the 1280x800 viewport for the gutter check only.
   Run; overwrite `measure.json`.
4. Stop the server. `git status --short` [measure.mjs and measure.json modified; pre-existing untracked items].

Report: prepush tail (10 lines), measure.json verbatim, git status, every bracket that did not match, quoted verbatim.
