You are the executor for one brief. You place code exactly as written; you do not design,
reword, or improve anything. Working directory: the worktree
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live (branch design/live-evolve).

Round 2. Round 1 stopped correctly at its first command: this machine's PowerShell blocks
npx.ps1, so shell commands are now run by the judge in Git Bash, not by you. The judge already
ran brief §5.1 (`npx prettier --check` on both files): exit 0, "All matched files use Prettier
code style!".

Read the brief first, all of it: .claude/briefs/pass-117-services-type-ladder.md
Section 10 overrides earlier sections where they conflict. The §0 block is satisfied: the
operator approved the §2.1 string on 2026-09-14 ("yes to the Guardicore line").

Make ONLY these three file edits, with your file-editing tool. Run NO shell commands at all
(no npx, no prettier, no git, no grep, no build):

1. §3.1: append the CSS block from the brief, byte for byte, at the very end of app/globals.css,
   after the current last rule (`.cw-sv-pkgs .cw-pband__foot`), separated by one blank line.
2. §3.2: in app/(foyer)/services/page.tsx, change the proof link text (the two text lines inside
   the `cw-door__case cw-sv-open__case` anchor) so the link reads the §2.1 string exactly:
   See how I helped Guardicore, a Tel Aviv security company, break into the North American market with $14M in revenue and get acquired by Akamai
   Wrap the text across lines the way the surrounding JSX does (lines under 80 characters).
   Keep href, both class names and the `<span aria-hidden> &rarr;</span>` unchanged.
3. §3.3: same file, replace the `<MagneticArea>` element and the `.cw-cta` link inside it with the
   exact JSX from brief §3.3 (the comment and the `cw-buy` anchor), and delete the line that
   imports MagneticArea. Keep the `cw-mlink` "Back to home" link after it unchanged.

Do not touch any other file or any other line. Do not stage, commit, or push.

Final report: the three step numbers with DONE or NOT DONE and one line each on what you changed.
