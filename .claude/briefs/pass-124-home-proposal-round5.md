# Task (Sol): Pass-124 homepage proposal, round 5 — the gap, and a clean recapture

Written 2026-09-20 by the main session. You are Sol, executing; you decide nothing. Workspace
`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p124-cuts`, branch `pass-124/home-proposal`,
HEAD `429dda1` (variant B v4, clean). Preview only, never merges. You cannot commit here; leave edits
uncommitted. Never push, deploy, bypass a hook, or touch another worktree.

## READ THIS FIRST: an encoding defect in your last run
Round 4 told you to write `Neuton.AI’s` with a literal U+2019. Your shell wrote a literal `?` instead,
and your report described the resulting "Neuton.AI?s" as mandated. It was a defect, and the main session
has corrected it. So in THIS run: **you write no copy and no non-ASCII character anywhere.** Every edit
below is ASCII-only CSS or an ASCII-only JSX swap. If any step would need a non-ASCII character, STOP.
If anything you capture shows a `?` or `\uFFFD` inside a word, that is a defect: report it, never
explain it as intended.

## E3b. Halve the gap after the Audit (round 4's E3, now with both sides of the gap)
Round 4 measured the gap from the bottom edge of the Audit card to the top of "The story comes first." at
281px (390) and 352px (1440) in v3, and showed the next section's top padding alone cannot halve it at
390. Now you may change exactly TWO declarations, appended at the end of `app/globals.css` under
`[data-mode="cw"]`: the `padding-bottom` of the Audit section (`#offer`) and the `padding-top` of
`section:has(.cw-principles--prose)`. Use media queries or clamp() as needed. Target: the measured gap is
126-169px at 390 and 158-211px at 1440 (45-60% of v3). Change nothing else. Record the exact CSS you added
in `.planning/qa/pass-124/home-v5/e3b.css` as well.

## Capture B, swap, capture A
1. Gates on the edited B tree: every command of package.json's `build` script by hand, `npx next build
   --webpack` for the Next build, exit codes checked directly. EXPECT all 0.
2. Serve on 3241, measure the gap (E3b) at both widths with `home-v4/measure-home.mjs`, capture B clean and
   annotated at 390 and 1440 with `home-v3/capture-home-v2.mjs` into `.planning/qa/pass-124/home-v5/`.
3. RENDERED-TEXT CHECK, for B and later for A: read `document.body.innerText` at 1440 and report every match
   of the regex `[A-Za-z][?\uFFFD][a-z]`. EXPECT none.
4. Swap to A: replace the whole `<p className="cw-prose-lede cw-reveal">...Four companies...</p>` element
   with exactly these two ASCII lines, then gates, serve, measure, capture A the same way, rendered-text
   check. Leave the tree in A.
   ```
           <RevenueFigure />
           <ExitRecord />
   ```
5. Copy `live-390.png` and `live-1440.png` from `home-v4/`; compose `sheet-390.png` and `sheet-1440.png` with
   `home-v4/compose-sheets.mjs` (same three columns and NEW outlines). axe-core serious + critical for A and
   B at both widths.

## Final message
E3b APPLIED or STOPPED, with the gap before/after at both widths for A and B · the e3b.css contents · every
gate command with its exit code · the rendered-text check results · the home-v5 file list · axe counts ·
anything that still renders oddly. Plain facts.
