# Brief: Pass-126b, the jurors' design fixes (preview branch, round 4)

Executor: Sol (`scripts/codex-exec.ps1 -Task`), worktree `.claude/worktrees/p124-cuts`, branch `preview/p126-how-i-work`.
HEAD check: `git log -1 --format=%h -- .claude/briefs/pass-126b-jury-fixes.md` must equal `git rev-parse --short HEAD`.
Standing rules of `.claude/briefs/pass-126-how-i-work.md` section 0 bind (no non-ASCII, do not edit
`content/how-i-work.ts`, do not commit, never reinterpret an expected value, stop on a mismatch). The main session
already changed the Plan body in `content/how-i-work.ts` (operator's pick); you touch no copy.
Disposition behind every item: `.planning/reviews/PASS-126-JURY-DISPOSITION.md`.

## Fixes (code: `components/color-worlds/HowIWork.tsx`, `app/(foyer)/services/page.tsx`, `app/globals.css` only)
1. "See the work" sits directly under Stay's body at every width, left-aligned to Stay's text. At min-width 1100px
   replace the grid's last template row `"y y y y y y y y y m m m"` with two rows `"y y y y y y y y y . . ."` and
   `"k k k k k k k k k . . ."`; `.cw-hiw__more { grid-area:k; margin-top:28px; align-self:start }`; remove the
   `last baseline` alignment from Stay and the link. Below 1100 it already follows Stay; keep `margin-top:28px`.
   On /services the link takes the home's treatment: remove any copper or copper-deep colour rule for the
   /services link so `.cw-mlink` renders in `currentColor` exactly as on the home.
2. Home and /services at min-width 1100px, three bands with one row gap: template rows become
   `"t t t t t . s s s s s s"`, `". p p p p p b b b b b b"`, `"y y y y y y y y y . . ."`, `"k k k k k k k k k . . ."`.
   Plan and Build share the second row (Build starts on Scope's column, 7). Row gap 72px everywhere: `--plan
   { margin-top:72px }`, `--build { margin-top:72px }`, `--stay { margin-top:72px }` (the /services variant uses 56px for
   all three). Keep every body `max-width` as it is.
3. /services: the note leaves the How I work block. In `HowIWork.tsx` delete the `servicesNote` paragraph (the
   component renders no note). In `app/(foyer)/services/page.tsx`, directly after the
   `<h3 id="sv-areas-title" className="cw-areas__h">` element, add `<p className="cw-areas__note">
   {HOW_I_WORK.servicesNote}</p>` (import `HOW_I_WORK` from `@/content/how-i-work`). CSS: `.cw-areas__note {
   font-family: var(--font-cw-body); font-size:16px; line-height:1.5; margin:12px 0 24px; max-width:640px; }`.
   Remove the note's grid row and `.cw-hiw__note` rules.
4. /services spacing: `.cw-hiw--services { margin-top:64px }` (48px below 760px), and the gap before "Three areas of
   work" doubles: `[data-mode="cw"] .cw-hiw--services + .cw-areas { margin-top:128px }` (96px below 760px).
5. Below 1100px: no indents. Delete the inner-`<div>` `padding-left` rules for plan and build; every step shares one
   text edge. The copper rule stays 48px.
6. Home below 1100px: `.cw-hiw--home { padding-top:48px }` so the heading has air under the section above.

## Build and verify (brackets are the expected output)
1. `node .planning/exec/prepush-gates.mjs` [last line `PREPUSH: all gates and the build passed`]. Once. No bash.
2. `npx next start -p 3125` in the background.
3. Extend `.planning/qa/pass-126/measure.mjs` (keep every existing check; the Plan body is read from
   `content/how-i-work.ts` as before, so its new text is checked automatically) and run it at 390x844 and 1440x900; write
   `measure.json`. New checks on `/` and `/services`:
   - `.cw-hiw__more` top is below the Stay body's bottom [true], and its left edge equals the Stay body's left edge
     within 2px [true], at both widths;
   - at 1440: Plan and Build `.cw-hiw__step` tops differ by 2px or less [true];
   - at 390: every `.cw-hiw__step > div` has computed `padding-left` `0px` [true x4];
   - no text inside `.cw-hiw` has computed colour `rgb(189, 90, 45)` or `rgb(138, 61, 36)` [0 elements];
   - on `/services`: `.cw-hiw__note` count [0]; `.cw-areas__note` text equals `HOW_I_WORK.servicesNote` [true] and it
     comes after `#sv-areas-title` in document order [true]; the vertical gap from the How I work block's bottom to
     `#sv-areas-title`'s top at 1440 [>= 120].
   Every earlier bracket stays as it was (copy byte-exact, digits 0, sticky 0, reveal 4/4, axe 0, overflow <= 0).
4. Stop the server. `git status --short` [the three code files plus `measure.mjs`/`measure.json`, and the pre-existing
   untracked items named in the first brief].

## Report back (plain text)
Prepush tail (10 lines), measure.json verbatim, git status, and every bracket that did not match, quoted verbatim.
(The main session runs the layout-shift, contrast and capture legs itself afterwards.)
