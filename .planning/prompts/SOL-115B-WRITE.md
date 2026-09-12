You are the EXECUTOR (writer) for Pass-115b in the worktree
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live, branch design/live-evolve.
You never rule, never commit, never push, never deploy.

Read in full before any edit: .claude/briefs/pass-115b-loop-dash-length.md (all eight sections),
components/hand/HandCircle.tsx, .planning/exec/circle115.mjs, .planning/exec/countup114.mjs,
.claude/briefs/README.md.

This sandbox cannot build, serve, or launch a browser. Do NOT run next build, next start, node on
any puppeteer script, or open a browser. The ruling session runs every runtime step of brief §4
after you, in the brief's order, against the existing build first. Your job is to write the code
exactly as the brief specifies.

## Write

1. `.planning/exec/circle115.mjs`:
   - Add `--probe`: brief §1 exactly (1440x900 dpr 1, reduced motion, figure centred, per path
     `P1 path<i>: user=<u> screen=<s> ratio=<r>` with 400 samples through getScreenCTM), then
     exit 0 without running C1 to C11 or captures.
   - Add `--out <dir>` (default stays `.planning/qa/pass-115`) and write every capture into it.
   - Add C11 per brief §3 in the three labelled states `reduced`, `played`, `reduced-390`. The
     `played` state reuses countup114.mjs's real-run scroll (arm zone, hold 250ms, centre) with
     reduced motion OFF, then waits 3200ms. C11 lines include their state label. Keep C1 to C10
     exactly as they are. `circle failures` counts C1 to C11 across every state; exit 1 if not 0.
   - When `--out` is given, also write `home-rec-played-1440.png` in the `played` state, with
     the same framing as `home-rec-done-1440.png`.
   - Keep the existing measurement-bug fixes (full-frame screenshot then crop; DOMRect toJSON).
2. `components/hand/HandCircle.tsx`: brief §2 exactly, nothing else. `screenLength(el)` as
   specified; final frames clear the dash (`strokeDasharray = "none"`, `strokeDashoffset = "0"`,
   `transition = "none"`); hidden uses `${S} ${S}` and offset `${S}`; `drawIn` measures S when it
   runs, keeps the existing rAF, transition string, timing, easing and the `motion-ok` comment,
   and adds a one-shot `transitionend` listener that sets `strokeDasharray = "none"`. No path,
   prop, timing or geometry change.

## Static checks you run (report real output and exit codes, never through a pipe)

- `npx tsc --noEmit`
- `node scripts/gsap-quarantine-gate.mjs`
- `node scripts/accent-states-lint.mjs`
- `npx tsx lib/copy-lint-cli.ts`
- `node scripts/retired-phrases-gate.mjs`
- `node --check .planning/exec/circle115.mjs`
- `npx prettier --write components/hand/HandCircle.tsx` then
  `npx prettier --check components/hand/HandCircle.tsx`

If any fails, one honest fix, then report. End with: the files you changed, each check with its
exit code, and the full `git diff --stat`. Do not touch any other file.
