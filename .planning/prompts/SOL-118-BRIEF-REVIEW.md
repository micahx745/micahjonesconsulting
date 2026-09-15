You are reviewing an execution brief before anyone runs it. Read-only: do not edit any file and
do not run network commands. Working directory:
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live

Brief: .claude/briefs/pass-118-tuned-font-fallbacks.md
Evidence it rests on: .planning/reviews/PERF-118A-FINDINGS.md, .planning/reviews/SOL-118A-READ.md
Files it changes: lib/fonts.ts, app/globals.css; new tuner .planning/exec/fallback118.mjs
Related: node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md (next/font
options in THIS Next.js version), app/layout.tsx (where the font variables are applied),
app/globals.css lines ~80-130 (how --font-bricolage and --font-hanken feed --font-cw-display and
--font-cw-body), .planning/exec/perf118a.mjs and perf118a-tables.mjs (the probe reused in §5).

PREMISES AND COLLISIONS, not taste. Check with file:line evidence:
1. next/font in this version: does `adjustFontFallback: false` plus `fallback: ["Bricolage Tuned
   Fallback"]` on next/font/google produce a CSS variable whose stack is the real family followed by
   that fallback name, and remove the generated "Bricolage Grotesque Fallback" face? Anything in the
   docs or in node_modules/next (font loader source) that contradicts this?
2. The §3.2 override formula: next/font's generated ascent-override etc. are expressed relative to
   its size-adjust. Is rescaling by old_size_adjust / new_size_adjust the right way to keep the same
   absolute ascent and descent? Quote the next/font source that computes them if you can find it.
3. Does anything else in the codebase depend on the generated fallback family names ("Bricolage
   Grotesque Fallback", "Hanken Grotesk Fallback") or on --font-bricolage / --font-hanken containing them?
4. §3.3 tuner design: can overriding `--font-bricolage` on `:root:root` actually take effect, given
   where next/font's variable class is applied (html or body)? Could elements set a font-family
   that does not read these variables (for example `--font-display`, `--font-sans`, inline styles,
   the OG image routes), so the tuner misses them or the swap still reflows them?
5. §3.3 and §5: ambiguities an executor would have to resolve by judgement (for example what
   `--after` runs, the selector path definition, how "first viewport height" is measured at 412 with
   deviceScaleFactor 1.75, what happens when a local "Arial" is not installed). Name each.
6. §5.1 local bite: can the probe reproduce the font-swap shift against localhost given its CDP
   throttling (150ms latency, 1.6 Mbps)? Any reason fonts would already be in memory or cached across
   fresh browser contexts (disk cache, service worker) so the shift cannot appear locally?
7. Gate collisions: would retired-phrases-gate, accent-states-lint, copy-lint, type117, render-gate,
   axe-worlds, layout-gate or card1 fail or be affected by these edits?
8. Anything in the brief that contradicts the findings it cites.

Output: numbered findings tagged PREMISE-OK, PREMISE-WRONG, or RISK, each with file:line evidence
and one sentence of consequence. PREMISE-WRONG and RISK first. Under 55 lines.
