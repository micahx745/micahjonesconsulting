# Pass-117 — /services: one type ladder, terms and links out of mono, one CTA style, a figure on the Guardicore proof

Written 2026-09-14 by the ruling tier (Opus 5). Branch `design/live-evolve`, worktree
`.claude/worktrees/p106-live`. Executor: GLM 5.3 after its weekly reset (about 2026-09-14
20:57 Pacific), otherwise Sol writes and the main session builds, serves, checks and commits.

## 0. Status and gate

- Operator 2026-09-14, verbatim: "measure, go with your recommendations, and push". The
  recommendations were: fix R1, R2, R13, R17 on /services; record R7 as an exception.
- **BLOCKING: do not start until `.claude/RESUME.md` records the operator's yes on the exact
  §2.1 string.** He approved "add the $14M figure" and was promised the exact line to approve.
- Already done by the ruling tier, not by the executor: the R7 exception in
  `docs/DESIGN_BAR.md`, and the gate `.planning/exec/type117.mjs`. Its bite proof on production
  (dpl_BuNe67xzMiEGEEi4hKSXCSyHdrsw, 2026-09-14): `type117 failures: 12` (T1, T2, T4, T5, T6,
  T7 fail at both widths; T3, T8, T9 pass). A gate proven to bite; do not edit it.

## 1. The ruling

/services breaks four design-bar rules Astra listed in Pass-111b and the operator parked. It
renders 14 text sizes at 390 and 17 at 1440 (R2 allows 5, each step 15% or more apart). Price
terms and prose links are set in mono (R1 keeps mono for labels and data). The foot button is
`.cw-cta` while every other button is `.cw-buy`, and it alone follows the cursor (R17). The
Guardicore proof names a company with no figure (R13). Fix all four on /services only, with one
CSS block scoped to `main.cw-sv` and two JSX edits. Reason: a scoped fix settles the approved
items without moving the home page, /packages, the 404 or the case studies, which share
`.cw-mlink`, `.cw-buy` and `.cw-services__intro`.

The ladder, graded on visible text in `header` and `main` (the page footer is inside `main`):

| Step | Role | 390 | 1440 |
|---|---|---|---|
| L1 | mono labels: kickers, the proof label, box tags, nav, footer logistics | 12 | 12 |
| L2 | body: lists, terms, links, buttons, fit lines, pain lines, foot intro | 16 | 16 |
| L3 | leads and subheads: opening sentence, packages intro, proof link, band heads, area names, box names, "Why one person" | 22 | 22 |
| L4 | box figures, foot title | 32 | 44 |
| L5 | "Engagements", "Packages" | 44 | 68 |

R2's "largest display at least 4x body" is graded at 1440 (68/16 = 4.25). At 390 the column
bounds the display at 44, so that clause is not graded there; the step and count clauses are.

## 2. Final copy, exact strings

2.1 The Guardicore proof link text (`.cw-sv-open__case`), replacing "...break into the North
American market and get acquired by Akamai":

    See how I helped Guardicore, a Tel Aviv security company, break into the North American market with $14M in revenue and get acquired by Akamai

The arrow span after it is unchanged. Ledger (LESSONS #3): "$14M in revenue" is the public
Guardicore figure; Tel Aviv and North American buyers are ledgered 2026-09-02.

2.2 The foot button label is unchanged: `Book a free intro call`, arrow `→`.

No other copy changes. The opening ("Engagements" plus its two sentences) stays under the R7
exception.

## 3. Layout spec

3.1 Append this block, exactly, at the very end of `app/globals.css` (after the current last
rule, `.cw-sv-pkgs .cw-pband__foot`). It is the only change to that file.

```css
/* ================================================================
 * Pass-117 (operator 2026-09-14): the /services type ladder.
 * DESIGN_BAR R1, R2 and R17, scoped to main.cw-sv so the home page,
 * /packages and the case studies keep their own sizes.
 *   L1 12px mono labels . L2 16px body . L3 22px
 *   L4 32px at 390, 44px at 1440 . L5 44px at 390, 68px at 1440
 * Gate: .planning/exec/type117.mjs
 * ================================================================ */
[data-mode="cw"] main.cw-sv .cw-pbox__list li,
[data-mode="cw"] main.cw-sv .cw-pbox__per,
[data-mode="cw"] main.cw-sv .cw-pbox__from,
[data-mode="cw"] main.cw-sv .cw-pbox__fit,
[data-mode="cw"] main.cw-sv .cw-area__list li,
[data-mode="cw"] main.cw-sv .cw-area__pain,
[data-mode="cw"] main.cw-sv .cw-area__proof,
[data-mode="cw"] main.cw-sv .cw-pick__legend,
[data-mode="cw"] main.cw-sv .cw-sv-objection p,
[data-mode="cw"] main.cw-sv .cw-services__foot-intro,
[data-mode="cw"] main.cw-sv .cw-buy {
  font-size: 16px;
}
[data-mode="cw"] main.cw-sv .cw-pbox__term,
[data-mode="cw"] main.cw-sv .cw-mlink {
  font-family: var(--font-cw-body);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: normal;
  text-transform: none;
}
[data-mode="cw"] main.cw-sv .cw-sv-open__proof-lbl {
  font-size: 12px;
}
[data-mode="cw"] main.cw-sv .cw-sv-open__body,
[data-mode="cw"] main.cw-sv .cw-services__intro,
[data-mode="cw"] main.cw-sv .cw-sv-open__case,
[data-mode="cw"] main.cw-sv .cw-pband__incl-h,
[data-mode="cw"] main.cw-sv .cw-areas__h,
[data-mode="cw"] main.cw-sv .cw-area__name,
[data-mode="cw"] main.cw-sv .cw-sv-objection__h,
[data-mode="cw"] main.cw-sv .cw-pbox__name {
  font-size: 22px;
}
[data-mode="cw"] main.cw-sv .cw-pbox__fig,
[data-mode="cw"] main.cw-sv .cw-services__foot-title {
  font-size: clamp(32px, 3.06vw, 44px);
}
[data-mode="cw"] main.cw-sv .cw-sv-open__name,
[data-mode="cw"] main.cw-sv .cw-service__title {
  font-size: clamp(44px, 4.73vw, 68px);
}
```

No `!important`. No hex. No line-height, colour, spacing or weight change beyond the block.

3.2 `app/(foyer)/services/page.tsx`, the proof link (currently lines 298-299): replace the two
text lines so the link reads the §2.1 string. Keep `href`, both class names and the
`<span aria-hidden> &rarr;</span>` exactly as they are.

3.3 Same file, the foot CTA row (currently lines 485-497). Replace the `<MagneticArea>` element
and the `.cw-cta` link inside it with:

```tsx
          {/* Pass-117: one CTA style on the page (DESIGN_BAR R17). The
              cursor-following MagneticArea wrapper left with .cw-cta. */}
          <a href="/call" className="cw-buy">
            Book a free intro call <span aria-hidden>→</span>
          </a>
```

Keep the `cw-mlink` "Back to home" link after it unchanged. Delete the `MagneticArea` import
line; it has no other use in this file. `.cw-buy` fills with `--cw-fg` and labels with
`--cw-bg`, measured 12.59:1 on espresso, so no colour rule is needed.

## 4. Motion

Nothing new. One removal: the `MagneticArea` spring on the /services foot button (§3.3). The
home page's instances are untouched. The `.cw-buy` press and arrow-nudge transitions already
exist and apply.

## 5. Verification

Git Bash with `MSYS_NO_PATHCONV=1`. Read every exit code directly, never through a pipe. The
three standing clauses in `.claude/briefs/README.md` apply: count what renders, never
reinterpret an expected value (a `got` that differs from its `expect` is a failure: stop before
the commit and report the raw output), and measure the render. Any failure below stops the pass.

5.1 Before editing:
- `npx prettier --check "app/(foyer)/services/page.tsx" app/globals.css` → exit 0. If not,
  stop: the files were not clean before this pass.

5.2 After editing, static:
- `npx prettier --write "app/(foyer)/services/page.tsx" app/globals.css`, then the same with
  `--check` → exit 0.
- `git diff --name-only` → exactly `app/(foyer)/services/page.tsx` and `app/globals.css`.
- `git diff -U0 app/globals.css | grep -c '^@@'` → `1` (one hunk, at the end of the file).
- `git diff -U0 app/globals.css | grep -cE '^\+.*(#[0-9a-fA-F]{3,8}\b|!important)'` → `0`.
- `grep -c MagneticArea "app/(foyer)/services/page.tsx"` → `0`.
- `grep -c 'className="cw-cta"' "app/(foyer)/services/page.tsx"` → `0`.
- `npx tsx lib/copy-lint-cli.ts` → exit 0. `node scripts/retired-phrases-gate.mjs` → exit 0.
  `node scripts/accent-states-lint.mjs` → exit 0. `node scripts/gsap-quarantine-gate.mjs` → exit 0.

5.3 Build and serve:
- `npx next build --webpack` → exit 0. Then `npx tsc --noEmit` → exit 0 (tsc reads the build's
  `.next/types`, so it runs after the build).
- Start `npx next start --port 3200` detached, logging to `.planning/exec/server117.log`. Ready
  when `curl -s -o /dev/null -w '%{http_code}' http://localhost:3200/services` prints `200`.

5.4 Served:
- `node .planning/exec/type117.mjs http://localhost:3200` → last line `type117 failures: 0`,
  exit 0. All of T1 to T9 PASS at both widths, including T9 (no text past its frame). If a
  selector renders at the wrong size, report the element, its size and the rule that wins; do
  not raise specificity or add `!important` on your own.
- `node scripts/render-gate.mjs` → exit 0.
- `node scripts/axe-worlds.mjs http://localhost:3200 / /services /packages` → exit 0.
- `node scripts/layout-gate.mjs --self-test` → exit 0; then
  `node scripts/layout-gate.mjs http://localhost:3200` → exit 0. Paste its last 5 lines.
- `bash .planning/exec/card1-115.sh http://localhost:3200` → last line `card1 failures: 0`
  (home and case-study markers: proves nothing outside /services moved).
- `node .planning/exec/shots111b.mjs http://localhost:3200 .planning/qa/pass-117` → exit 0.
  List the PNG filenames in the report. The judge picks the Astra set.
- Stop the server: PowerShell `Stop-Process -Id (Get-NetTCPConnection -LocalPort 3200).OwningProcess`.

## 6. Rejected

- Changing `.cw-mlink`, `.cw-buy` or `.cw-services__intro` site-wide. Those classes carry the
  same R1 mono-link conflict on the home page, the 404 and PackageBand on the home page, but the
  operator approved five /services items. Parked in §8, not done here.
- Exceptions for R1, R2 or R17. The operator chose fixes.
- Rewriting the /services opening to one sentence for R7. The operator chose the exception.
- Rewording the acquisition clause ("get acquired by Akamai"). It is the operator's own door
  copy; R13 needs only the figure. The non-causal rule of decision 5 covers Postmates and
  Neuton.AI, not Guardicore.
- A separate figure element or stat block in the proof card. It would add a sixth size and a
  second proof register beside the ledger rows below it.
- Keeping `MagneticArea` on the new foot button. One CTA style includes behaviour; no other
  `.cw-buy` moves with the cursor, and no DESIGN_BAR or brand.json record approves the effect.
- Changing the faded footer text Astra noted in 111b. Measured 2026-09-14 on production: lowest
  foot and footer contrast 9.45:1 (opacity 0.85 on espresso). Passes AA; not a defect.
- Line-height changes. R3 leading was fixed in Pass-111b round 2.
- Any `!important`, any new token, any colour.

## 7. Return conditions

The executor commits (§9) and reports. The judge (Opus) then returns once: reads the §5 outputs,
views /services at 390 and 1440 (opening, shapes band, packages band, foot) from the pass-117
captures, and checks the rendered §2.1 line against LESSONS #3 by visible-DOM count. Astra takes
one look with the captures. Push, merge to `main` and deploy each need the operator's words that
day, quoted in RESUME.

## 8. Parked operator decisions

- The §2.1 string: yes, or his wording (blocking, §0).
- The same mono-link R1 conflict on the home page, the 404 and PackageBand on the home page: a
  follow-up pass or a recorded exception.
- `MagneticArea` on the home hero CTA: no motion record approves a cursor-following effect.
- R2 has not been graded on any page other than /services.

## 9. Commit

Explicit pathspec after reading `git diff --cached --name-only` (LESSONS #23):

    git add -- "app/(foyer)/services/page.tsx" app/globals.css .planning/qa/pass-117
    git commit -F <msg> -- "app/(foyer)/services/page.tsx" app/globals.css .planning/qa/pass-117

Subject: `Pass-117: /services type ladder, terms and links out of mono, one CTA style, Guardicore proof figure (DESIGN_BAR R1 R2 R13 R17)`.
Body: the §5 outputs that matter (type117 failures line, axe, card1). Do not push.
