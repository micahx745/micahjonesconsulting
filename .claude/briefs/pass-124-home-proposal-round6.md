# Task (Sol): Pass-124 homepage proposal, round 6 — build and capture only

Written 2026-09-21 by the main session. You are Sol; you decide nothing and you edit NO copy.
Workspace `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p124-cuts`, branch
`pass-124/home-proposal`, HEAD `0cf8596` (variant B v6: How I work is back as four steps). Preview only,
never merges. You cannot commit here; leave edits uncommitted. Never push, deploy, bypass a hook, or touch
another worktree. You write NO non-ASCII character anywhere (LESSONS #46: your shell turned a U+2019 into
"?" last time). If you see "?" or U+FFFD inside a word in any capture, that is a defect: report it.

1. Gates on HEAD: every command of package.json's `build` script by hand, `npx next build --webpack` for the
   Next build, exit codes checked directly. EXPECT all 0.
2. Serve on 3241. Capture B clean and annotated at 390 and 1440 with
   `.planning/qa/pass-124/home-v3/capture-home-v2.mjs` into `.planning/qa/pass-124/home-v6/`. The annotated
   NEW set now ALSO covers the How I work section: the visible "How I work." h2, each of the four steps (its
   `.cw-principle__name`, `.cw-principle__artifact`, `.cw-principle__text`) and the `.cw-principles__more`
   link. Update the script's selector list for that; the old li-1-lede selectors no longer exist.
3. Rendered-text check at 1440: every match of `[A-Za-z][?\uFFFD][a-z]` in `document.body.innerText`.
   EXPECT none. Also confirm these four strings render, exactly: "Week one is an audit and a scope.",
   "I name the trade-offs before I build.", "I build the real thing, not a prototype.",
   "I stay for launch and what customers break." (text-transform may uppercase them on screen; compare
   case-insensitively against innerText).
4. A swap (ASCII only): replace the whole `<p className="cw-prose-lede cw-reveal">...Four companies...</p>`
   element with exactly these two lines, then gates, serve, capture A the same way, rendered-text check.
   Leave the tree in A.
   ```
           <RevenueFigure />
           <ExitRecord />
   ```
5. Copy `live-390.png` and `live-1440.png` from `home-v5/`; compose `sheet-390.png` and `sheet-1440.png` with
   `home-v4/compose-sheets.mjs`. axe-core serious + critical for A and B at both widths.

Final message: step results · every gate command with its exit code · rendered-text results · the home-v6
file list · axe counts · anything that renders oddly in How I work (a step headline wrapping badly, a
cramped or empty column, the link far from the steps). Plain facts.
