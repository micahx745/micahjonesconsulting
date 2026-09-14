You are the executor for one brief. You place code exactly as written; you do not design,
reword, or improve anything. Working directory: the worktree
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live (branch design/live-evolve).

Read the brief first, all of it: .claude/briefs/pass-117-services-type-ladder.md
Section 10 overrides earlier sections where they conflict. The §0 block is satisfied: the
operator approved the §2.1 string on 2026-09-14 ("yes to the Guardicore line"), recorded in
.claude/RESUME.md.

Do ONLY these steps, in order, and stop at the first mismatch:

1. §5.1: run `npx prettier --check "app/(foyer)/services/page.tsx" app/globals.css`. Record the
   exit code. If it is not 0, stop and report.
2. §3.1: append the CSS block, byte for byte, at the very end of app/globals.css.
3. §3.2: in app/(foyer)/services/page.tsx, change the proof link text so the link reads the §2.1
   string exactly. Keep href, both class names and the arrow span unchanged.
4. §3.3: same file, replace the MagneticArea element and the .cw-cta link inside it with the
   exact JSX in §3.3, and delete the MagneticArea import line.
5. Run `npx prettier --write "app/(foyer)/services/page.tsx" app/globals.css`, then
   `npx prettier --check "app/(foyer)/services/page.tsx" app/globals.css` (expect exit 0).
6. Run and record the raw output of each of these (§5.2 with §10.2 and §10.4):
   - git diff --name-only -- . ':(exclude).planning'        (expect exactly the two files)
   - git diff -U0 app/globals.css | grep -c '^@@'           (expect 1)
   - git diff -U0 app/globals.css | grep -cE '^\+.*(#[0-9a-fA-F]{3,8}\b|!important)'   (expect 0)
   - grep -c MagneticArea "app/(foyer)/services/page.tsx"   (expect 0)
   - grep -c 'className="cw-cta"' "app/(foyer)/services/page.tsx"   (expect 0)
   For the three grep -c lines the printed count is the check; grep exits 1 when it prints 0.
7. Print `git diff -- "app/(foyer)/services/page.tsx"` in full.

Do NOT build, start a server, run a browser, stage, commit, or push. Do not touch any other file,
including the gate .planning/exec/type117.mjs. If any expected value differs from what you get,
do not reinterpret it: stop and report the raw output and your reason.

Final report: each step number with PASS or FAIL and the raw output, then the page.tsx diff.
