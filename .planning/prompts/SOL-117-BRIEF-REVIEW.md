You are reviewing an execution brief before anyone runs it. Read-only: do not edit any file.
Working directory: the worktree C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live

The brief: .claude/briefs/pass-117-services-type-ladder.md
The gate it relies on: .planning/exec/type117.mjs
Files it changes: app/globals.css (append one block at the end) and app/(foyer)/services/page.tsx

Your job is PREMISES AND COLLISIONS, not taste. Do not propose design changes, new copy, or a
different ladder. Check, with file:line evidence from the repo:

1. Every selector in the §3.1 CSS block exists in app/globals.css or in the /services markup
   (page.tsx, components/color-worlds/PriceBox.tsx, components/color-worlds/PackageBand.tsx,
   components/PageFooter or wherever the page footer lives). Name any selector that matches
   nothing on /services.
2. Specificity: for each property the block sets, find any existing rule in app/globals.css that
   would still WIN on /services over `[data-mode="cw"] main.cw-sv .<class>` placed at the end of
   the file (higher specificity, !important, inline style, or a later rule). Quote it.
3. Visible text on /services that the block does NOT cover and that would render at a size
   outside the ladder (390: 12,16,22,32,44; 1440: 12,16,22,44,68). Include header, main, the
   package picker, PageFooter, and any state visible on first load. Name element, class, the
   rule that sets its size, and the size it would render.
4. §3.2 and §3.3: do the quoted current lines (298-299 proof link, 485-497 foot CTA row) and the
   MagneticArea import exist as described? Is MagneticArea used anywhere else in page.tsx?
5. Does any existing gate collide with the change: scripts/render-gate.mjs, scripts/layout-gate.mjs,
   scripts/axe-worlds.mjs, scripts/accent-states-lint.mjs, scripts/retired-phrases-gate.mjs,
   lib/copy-lint-cli.ts, .planning/exec/card1-115.sh, .planning/exec/shots111b.mjs. For example a
   check that expects .cw-cta on /services, a mono font on a class, a size, or the old proof string.
6. type117.mjs: any way it can PASS on a broken page or FAIL on a correct one (for example the
   header/main scope missing PageFooter, overlay menu text counted, the R13 string compare
   tripped by whitespace or the arrow, T6 counting a hidden button).
7. Any step in §5 whose command would not run as written on Windows Git Bash with
   MSYS_NO_PATHCONV=1, or whose expected output is wrong for that script.

Output: numbered findings, each tagged PREMISE-OK, PREMISE-WRONG, or RISK, each with file:line
evidence and one sentence on the consequence. Put PREMISE-WRONG and RISK first. Under 50 lines.
If everything checks, say so in one line per numbered item above.
