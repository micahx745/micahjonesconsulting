# Task (Sol): Pass-124 homepage proposal, recapture v3

Written 2026-09-20 by the main session. You are Sol, executing; you decide nothing and write no copy.
Workspace: `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p124-cuts`, branch
`pass-124/home-proposal`, HEAD `807893d` (variant B v3). Preview only, never merges. You cannot commit
here; leave edits uncommitted. Never push, deploy, bypass a hook, or touch another worktree.

The only change since your last run is one CSS rule at the end of `app/globals.css`
(`.cw-ord-grid--copy-only .cw-ord-copy { max-width: 560px; }`). Make NO source edit except the A swap in
step 2.

1. Gates on HEAD as before (every command of package.json's `build` script by hand, `npx next build
   --webpack` for the Next build, exit codes checked directly). Serve on 3241, capture B clean and
   annotated at 390 and 1440 with your existing `.planning/qa/pass-124/home-v2/capture-home-v2.mjs`.
2. A swap: replace the whole `<p className="cw-prose-lede cw-reveal">Four companies...</p>` element with
   exactly these two lines, then gates, build, serve, capture A clean and annotated at 390 and 1440:
   ```
           <RevenueFigure />
           <ExitRecord />
   ```
   Leave the working tree in the A state.
3. Write all outputs to `.planning/qa/pass-124/home-v3/` (copy `live-390.png` and `live-1440.png` in
   from `home-v2/`; do not recapture production), then compose `sheet-390.png` and `sheet-1440.png` with
   your existing `compose-sheets.mjs`, same three columns and NEW outlines as v2.
4. axe-core serious + critical for A and B at both widths.

Final message: step results, every gate command with its exit code, the home-v3 file list, axe counts,
and anything that renders oddly (an empty block, a narrow column, over-long lines, an orphaned word, text
over text). Plain facts.
