You are the EXECUTOR (writer) for Pass-116 in the worktree
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live, branch design/live-evolve.
You never rule, never commit, never push, never deploy.

Read in full before any edit: .claude/briefs/pass-116-fable-later-items.md (all eight
sections; section 7 is the judge's ruling and re-specifies C13), .claude/briefs/README.md,
components/color-worlds/RevenueFigure.tsx, components/hand/HandCircle.tsx,
components/hand/HandUnderline.tsx, content/work/postmates.mdx, app/(foyer)/page.tsx around
line 490, .planning/exec/circle115.mjs, .planning/exec/countup114.mjs,
.planning/exec/card1-115.sh, docs/LESSONS_LEARNED.md entry #3.

This sandbox cannot build, serve, or launch a browser. Do NOT run next build, next start, any
puppeteer script, or a browser. The ruling session runs every runtime step after you, and it
runs the bite gate against the existing, unchanged build before rebuilding.

## Write

1. `.planning/exec/circle115.mjs`: a previous run already added C12, C13 and C14 behind
   `--p116` (uncommitted). Keep C12 and C14 exactly as they are. Rewrite ONLY C13 to match
   brief section 7 exactly: start at /work/postmates, click `a.case-study__nav-link[href="/"]`,
   the docLoads checks, the `$0M` sanity check on the first play, scroll to 0, goBack, goForward,
   below-fold confirm, the final poll, and every invalid condition counted as a failure. Line
   format: `C13 texts after client back and forward: got [...], expect ["$20M+"]`.
2. Brief section 1, character for character: the `content/work/postmates.mdx` line 26
   replacement, the `app/(foyer)/page.tsx` line 490 replacement, and the LESSONS #3 bullet
   appended immediately before entry #3's `**Gate:**` line. The middle dot is U+00B7.
3. Brief section 2, items A to D, exactly as written: the `useIsoLayoutEffect` alias and the
   effect switched to it, `playedThisLoad` at module scope with the early return and the set at
   `playing`, the hidden branch dash `${S} ${S * 4}`, and `components/hand/strokeLength.ts` with
   `screenLength` moved unchanged plus the `HandUnderline.tsx` dash handling. No timing, easing,
   delay, geometry, or prop change. Keep every existing `motion-ok` comment.
4. `.planning/exec/card1-115.sh`, per brief section 3 step 4: an optional first argument (a base
   URL) that checks only that base and skips the two deployment-id checks; replace the
   `new postmates line` check; add `removed fraud sentence`, `neuton row tag` and
   `old neuton tag` exactly as specified.

## Static checks you run (report real output and exit codes, never through a pipe)

- `npx tsc --noEmit`
- `npx tsx lib/copy-lint-cli.ts`
- `node scripts/retired-phrases-gate.mjs`
- `node scripts/accent-states-lint.mjs`
- `node scripts/gsap-quarantine-gate.mjs`
- `node --check .planning/exec/circle115.mjs`
- `bash -n .planning/exec/card1-115.sh`
- `npx prettier --write components/hand/HandCircle.tsx components/hand/HandUnderline.tsx components/hand/strokeLength.ts components/color-worlds/RevenueFigure.tsx "app/(foyer)/page.tsx"`
  then the same with `--check`. Never prettier an mdx or md file.

If any fails, make one honest fix, then report. End with: the files you changed, each check
with its exit code, `git diff --stat`, and the exact new C13 block as written. Touch no other
file.
