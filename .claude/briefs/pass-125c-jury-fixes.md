# Brief: Pass-125c, the jurors' fixes (preview branch, round 3)

Executor: Sol (`scripts/codex-exec.ps1 -Task`), worktree `.claude/worktrees/p124-cuts`, branch `preview/p125-full-time`.
HEAD check: `git log -1 --format=%h -- .claude/briefs/pass-125c-jury-fixes.md` must equal `git rev-parse --short HEAD`.
Standing rules from `.claude/briefs/pass-125-full-time.md` section 0 bind (no non-ASCII in any file you write, do not
edit `content/full-time.ts`, do not commit, never reinterpret an expected value, report mismatches verbatim and stop).
Pre-existing untracked folders `.planning/qa/pass-124/home-v2/` to `home-v6/` are not yours; leave them.

## What changed and why
Three jurors (Fable, Astra, DeepSeek v4-pro) read the round-2 preview; the main session's disposition is in
`.planning/reviews/PASS-125-JURY-DISPOSITION.md` on `design/live-evolve`. The main session already rewrote
`content/full-time.ts` (committed): principle bodies are now `Part[]` (a string, or `{ text, href }` for a link to a
study), the principles are reordered, the record is `recordHeading` + `recordLead` + `recordRows[]` + `recordClose`
(the old `record` string is gone), and the headings carry periods. The page does not type-check until you do step 1.

## 1. `app/(foyer)/full-time/page.tsx`
- Import `ViewTransitionLink` from `@/components/view-transition-link` (the site's foyer-to-study link, as in
  `app/(foyer)/work/page.tsx`) and `type Part` from `@/content/full-time`.
- Add a small local function `renderParts(parts: readonly Part[])` returning a fragment: a string part renders as text;
  a `{ text, href }` part renders as `<ViewTransitionLink href={href}>{text}</ViewTransitionLink>`. Keys by index.
- The principle `<ol>` gets `className="cw-principles cw-principles--steps cw-principles--ft"`. Each
  `cw-principle__text` renders `{renderParts(p.body)}`.
- After the `</ol>`, replace the record and contact markup with, in order:
  `<h2 id="cw-ft-record-title" className="cw-secttitle">{FULL_TIME.recordHeading}</h2>`
  `<div className="cw-about">` containing `<p>{FULL_TIME.recordLead}</p>`, then
  `<ul className="cw-about__list">` with one `<li>` per `FULL_TIME.recordRows` item, rendered exactly as
  `<strong>{r.company}</strong> {r.text}` (one literal space between the closing brace and the opening brace, on one
  line), key `r.company`; then `<p>{FULL_TIME.recordClose}</p>`; close the div.
  `<h2 id="cw-ft-contact-title" className="cw-secttitle">{FULL_TIME.contactHeading}</h2>`
  `<div className="cw-about">` containing the unchanged contact paragraph and `<PageFooter fullTimeLink={false} />`.
  The two old `cw-about__h` headings are gone.

## 2. `app/globals.css`
Directly after the block that starts `[data-mode="cw"] .cw-principle__text em {` and its closing brace, add exactly:
```css
/* Pass-125: /full-time's principle headlines run longer than the home's four steps, so on that page they
 * balance and stop at a measure (the jurors found "SOLD." and "HANDS." alone on a line and headlines running
 * the full width over a narrow body). Scoped to .cw-principles--ft; the home's How I work is unchanged. */
[data-mode="cw"] .cw-principles--ft .cw-principle__artifact {
  text-wrap: balance;
  max-width: 30ch;
}
```

## 3. `app/(foyer)/about/page.tsx`
The paragraph added in round 1 (it renders `FULL_TIME.about`) gets `style={{ margin: "1.25em 0" }}`. Nothing else.

## 4. Build, measure, capture (expected output in brackets)
1. `npx next build --webpack` [exit 0].
2. `npx next start -p 3125` in the background.
3. Update `.planning/qa/pass-125/measure.mjs` and run it; overwrite `measure.json`. New and changed expectations, per
   width 390 and 1440, on `/full-time`:
   h2 texts in order [`How I think.`, `The record.`, `Write to me.`]; `.cw-principle__name` texts in order [`Code`,
   `Positioning`, `Result`, `Scope`]; inside `main`, links with href `/work/ordani`, `/work/guardicore`,
   `/work/rfp-engine` [1 each]; `.cw-about__list li` count [4]; for every `.cw-principle__artifact`, whether its last
   word sits alone on its line (compare the top of the last word's client rect with the top of the word before it,
   using a Range over the text node) [false for all four at both widths]; em-dash count in `document.body.innerText`
   [0 at 1440; 1 at 390, the site-wide Nav "Menu" toggle]; horizontal overflow [0 or less]; axe serious+critical
   [0]. On `/about`: links with href `/full-time` [2], axe serious+critical [0]. Keep the other pages' checks as
   they were [1 each; nav 0].
4. Re-run `.planning/qa/pass-125/scroll-sheet.mjs` so it writes `scroll/ft-<width>-r3-<nn>.png` and the sheets
   `sheets/full-time-scroll-390-r3.png` and `sheets/full-time-scroll-1440-r3.png` (add an output-suffix argument;
   do not overwrite the round-2 files). Also capture `/about` with the new line in the upper third at 390x844 and
   1440x900 -> `about-currently-390-r3.png`, `about-currently-1440-r3.png`.
5. Stop the server. `git status --short` [the four files in sections 1 to 3, plus new files under
   `.planning/qa/pass-125/`, plus the pre-existing pass-124 folders].

## Report back (plain text)
Build tail (15 lines), measure.json verbatim, file list with sizes, git status, and every bracket that did not match,
quoted verbatim.
