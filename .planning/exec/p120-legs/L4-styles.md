# Leg L4: `app/globals.css` and `.claude/brand.json` (opus)

The two shared files, in the order brief O11 fixes. Read brief lines 24-114 (section 1), 1513-2303
(template CSS and removals), 2341-2358 (where the CSS goes), 2583-2602 (settle CSS), 2654-2677
(brand.json signature), 3416-3850 (/work CSS), 4003-4024 (brand.json heroclip), and the C5-C10 checks
at lines 2698-2716.

## YOUR FILES

- `app/globals.css`
- `.claude/brand.json`

## ORDER for app/globals.css (O11), exactly

1. **§3b.5 deletions FIRST, on the unedited file**: Block B, then Block A. Each runs only after its
   `sed -n` boundary print matches the brief exactly; if either differs, stop and report. These two
   `sed -i` line-range deletions are the one place you edit through Bash, because the brief specifies
   them. Then `grep -c "cw-lot\|cw-wk" app/globals.css` must print `0`.
2. **§3.7 selector-based removals** (by selector, never by line number), plus §3.6.5's deletion of every
   `[data-mode="theater"] .case-study-pull-quote*` rule, plus §3.4 atmosphere steps 1 and 2 (the
   `:root { --grain-theater: ... }` rule directly above `[data-mode="theater"]::before`, with the two
   `url(...)` layers moved byte for byte, and the `::before` rule's `background-image` pointing at
   `var(--grain-theater)`). Record the C5 count before you start (the brief measured `101`) and after
   (want `0`).
3. **§3b.5's `.cw-wx*` insert** (block at line 3459), above the Pass-110 comment, located by grep as
   §3b.5 says.
4. **§3's contiguous block**, inserted where the deleted `CASE STUDY (THEATER) — Phase 7` header comment
   stood (record where that was before step 2 removes it), in the §3.9 order: the header comment
   (lines 1524-1530), §3.5 type tokens (block at 1650), §3.4 surface tokens (lines 1531-1558, with O-f,
   O-h, O-i), §3.4 atmosphere step 3 (block at 1577) and the footer rules (block at 1604, with O-g),
   §3.6.1 band (block at 1689), §4.1 settle CSS (block at 2583), §3.6.2 body (block at 1830), §3.6.4
   blocks (block at 2017), §3.6.5 pull quote (block at 2214), the §3.6.6 line
   `.cw-area { scroll-margin-top: 96px; }`, then on its own line `/* END PASS-120 STUDY TEMPLATE */`.

Use the Edit tool for every change except the two `sed -i` deletions.

## OVERRIDES (decided; they replace the brief text)

- **O-f** (brief O8, one paper ground). In the rule `[data-mode="theater"] .cs [data-surface="paper"]`:
  `--cs-bg: var(--color-foyer-paper);` becomes `--cs-bg: var(--color-cw-bone);`.
- **O-g** (O8 applied to the footer, which §3.4 paints "so the page ends on one ground"). In
  `[data-mode="theater"]:has([data-surface="paper"]) [data-footer-root]`:
  `background-color: var(--color-foyer-paper);` becomes `background-color: var(--color-cw-bone);`.
- **O-h** (DESIGN_BAR R3 ruling, operator 2026-09-16, "Ink text, sage accents"). In
  `[data-mode="theater"] .cs[data-case="ordani"] [data-surface="paper"]`:
  `--cs-link: var(--color-ordani-sage);` becomes `--cs-link: var(--color-foyer-ink);`. Its
  `--cs-accent: var(--color-ordani-sage);` line stays.
- **O-i** (DESIGN_BAR R3 ruling, operator 2026-09-16, "Old lighter cream"). In the paper rule:
  `--cs-tint: var(--color-bone);` becomes `--cs-tint: var(--color-foyer-paper);`.

No other departure from the CSS blocks.

## .claude/brand.json, ONE edit pass (O11)

§4.6's `motion.signature` replacement (block at line 2658) and the `view_transition` `description`
(block at line 2668), and §3b.11's `motion.heroclip` (block at line 4009) directly after `countup` and
before `banned`. Validate: `node -e 'JSON.parse(require("fs").readFileSync(".claude/brand.json","utf8"));console.log("json ok")'`.

## HOOKS

Rules that carry `animation:` or `transition:` keep the brief's `/* motion-ok: ... */` comments. If
`motion-discipline.sh` refuses anyway, stop and report verbatim (LESSONS #31).

## CHECKS (paste raw output)

- C5, C6, C7, C8 (base commit in `.planning/exec/p120-base.txt`), C9, and the second half of C10
  (`grep -c '^\.cw-area { scroll-margin-top: 96px; }$' app/globals.css`, want `1`).
- `grep -c "cw-lot\|cw-wk" app/globals.css` (want `0`).
- X6 (brief line 5431).
- The four override lines, each by `grep -n`.
- `grep -n "PASS-120 STUDY TEMPLATE\|END PASS-120 STUDY TEMPLATE\|Pass-120 - /work index\|Pass-110 — the /services doors died\|--grain-theater" app/globals.css`.
- Brace balance: count of `{` and count of `}` in `app/globals.css` (report both numbers).
- `git diff --stat -- app/globals.css .claude/brand.json`.
