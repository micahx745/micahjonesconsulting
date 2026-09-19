# Pass-123a (GLM batch): three small fixes, measured before and after

Scope: FIXES ONLY, no design change. Exactly four source files change: `app/globals.css`,
`components/view-transition-link.tsx`, `app/(foyer)/work/page.tsx`, `app/(foyer)/page.tsx`.
New files only under `.planning/exec/` and `.planning/qa/pass-123/`. No copy change. On phones, macOS and
every browser with overlay scrollbars, every rendered size stays IDENTICAL.

Working dir: `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live` (git worktree, branch
`design/live-evolve`). Do NOT commit, push, deploy, stash, or run any git command that changes the index
or HEAD. Do not edit `.claude/RESUME.md`, `docs/`, or any brief. The main session verifies and commits.

The FIRST line of your reply must be the marker on this prompt's LAST line (it proves the whole prompt
arrived; LESSONS #36).

Rules (LESSONS #25, #37): a check can fail the work; it can never be passed by editing the work to fit
it. If an expected value is not met, do not change anything beyond the edits specified here: STOP, and
report the raw numbers and your reading of them. Never reinterpret an expected value.

## 0. Pre-flight
- `git status --short -- app components lib content` must print nothing. If it prints anything, STOP.
- Port 3250 must be free: `netstat -ano | findstr :3250` prints nothing. Use port 3250 for every server
  below, and stop the server (kill its process tree) when each phase ends.
- Tools: puppeteer-core via `createRequire("C:/tmp/p101tools/package.json")`; Chrome at
  `C:/Program Files/Google/Chrome/Application/chrome.exe`; `headless: true`; no `--disable-gpu`.

## 1. The measuring script (write it before any edit)
Write `.planning/exec/scrollbar-fit.mjs`. Usage: `node .planning/exec/scrollbar-fit.mjs <baseUrl>
<out.json> [--classic]`. `--classic` launches Chrome with `ignoreDefaultArgs: ["--hide-scrollbars"]`
(a real classic scrollbar takes layout width, as on Windows desktop); without it, puppeteer's defaults
(hidden scrollbar, the overlay case). For each width W in [390, 600, 680, 760, 761, 800, 899, 900, 1024,
1300, 1440], viewport W x 900, DPR 1, normal motion, load `<baseUrl>/` (waitUntil networkidle2), then:
- `sb` = `innerWidth - document.documentElement.clientWidth`.
- `$20M+`: scroll `.cw-rec` to the viewport centre (instant), wait 600ms. `recFs` = computed font-size of
  `.cw-rec__num`. `recColR` = `.cw-rec` getBoundingClientRect().right. `recInkR` = the max `right` over
  `Range.getClientRects()` of every text node inside `.cw-rec__box > .cw-rec__fig` (the visible numerals,
  the first `.cw-rec__fig` only). `recOver` = recInkR - recColR (px, 2 decimals; > 0 means the `+` runs
  into the gutter).
- Scoreboard: `sbLive` = whether `.cw-exits` has class `is-live`. If live: `Y0` = absolute top of
  `.cw-exits` minus the nav height (`--cw-nav-h`, read from computed style of `.cw-exits`, default 72).
  For beat b in 0..3: scroll to `Y0 + (b + 0.5) * 0.5 * innerHeight` (instant), wait 1200ms, then record
  `cur` = index (0-3, DOM order) of the `.cw-exits__deal.is-current` element; `curFs` = computed
  font-size of `.is-current .cw-exits__val`; `curOver` = max right of that value's text rects minus
  `.cw-exits` getBoundingClientRect().right; `allOver` = the same max over EVERY `.cw-exits__val`;
  `stageTop` = `.cw-exits__stage` getBoundingClientRect().top; `navH`.
Write one JSON object per width to out.json and print a one-line summary per width.

## 2. BEFORE (unmodified tree)
1. `pnpm build 2>&1 | tee .planning/qa/pass-123/build-before.log` (exit 0).
2. `node .planning/exec/route-js-bytes.mjs .next/server/app/index.html` and the same for
   `.next/server/app/work.html`. Record both.
3. `grep -o '<a[^>]*cw-wx-feat[^>]*>' .next/server/app/work.html` : record the output.
4. `pnpm start -p 3250` in the background. Then:
   - `node .planning/exec/scrollbar-fit.mjs http://localhost:3250 .planning/qa/pass-123/fit-before-hidden.json`
   - the same with `--classic` to `fit-before-classic.json`.
   - Captures, classic scrollbar, `prefers-reduced-motion: reduce` (the finished copper frame), W in
     [600, 1300, 1440] x 900: `.cw-rec` scrolled to the viewport centre, full-viewport PNG to
     `.planning/qa/pass-123/rec-before-classic-<W>.png`.
   - CLS: a small script (`.planning/exec/cls-123.mjs`) that registers a `layout-shift` PerformanceObserver
     (buffered) via evaluateOnNewDocument and sums EVERY entry, hadRecentInput included (LESSONS #29);
     loads `/`, waits 2s, scrolls down in 200px instant steps with 120ms waits to the bottom of
     `#products` plus one viewport, then prints the sum. Run at 390x844 (DPR 2, isMobile, hasTouch) and at
     1440x900. Record both.
   - `curl -s http://localhost:3250/ | node .planning/exec/visible-text.mjs > .planning/qa/pass-123/text-before-home.txt`
     and the same for `/work` to `text-before-work.txt`.
   - Stop the server.
5. EXPECT before editing: in `fit-before-classic.json`, `sb` is between 12 and 20 at every width (else
   the classic run is invalid: STOP), and `recOver` > 0 at one or more widths between 600 and 1300
   (the defect exists; if it is <= 0 everywhere, STOP and report: the review's premise is false).

## 3. The edits (exactly these)

### Fix A: size the two posters from their column, not the viewport (cross-review F5)
Facts (verified): `.cw-rec` (`components/color-worlds/RevenueFigure.tsx`) and `.cw-exits`
(`components/color-worlds/ExitScoreboard.tsx`) are block divs inside `section.cw-block`, whose side
padding is 20px at max-width 760px and 40px above. `--cw-rec-size`, `--cw-p`, `--cw-s` are CUSTOM
PROPERTIES: a later declaration always wins whatever its value, so a vw "fallback line" does not work for
them. The cqi values therefore go inside `@supports (width: 1cqi)`, and the existing vw declarations stay
untouched as the fallback. First confirm by grep that every `var(--cw-rec-size)` is used inside a
`.cw-rec` descendant selector and every `var(--cw-p)` / `var(--cw-s)` inside a `.cw-exits` descendant
selector; if not, STOP and report.
1. Add `container-type: inline-size;` to the existing `[data-mode="cw"] .cw-rec` rule (~line 3710) and
   to the existing `[data-mode="cw"] .cw-exits.is-live` rule (~line 3999).
2. Directly AFTER the `@media (min-width: 761px) { ... .cw-rec ... }` block (~line 3723), add:
```css
@supports (width: 1cqi) {
  [data-mode="cw"] .cw-rec {
    --cw-rec-size: calc(100cqi / 1.64);
  }
  @media (min-width: 600px) {
    [data-mode="cw"] .cw-rec {
      --cw-rec-size: calc(100cqi / 2.87);
    }
  }
}
```
3. Directly AFTER the `@media (min-width: 900px) { ... }` block that sets `--cw-p` / `--cw-s` for
   `.cw-exits.is-live` (~line 4185; add after that block's closing brace), add:
```css
@supports (width: 1cqi) {
  [data-mode="cw"] .cw-exits.is-live {
    --cw-p: min(calc(100cqi / 3.05), calc(var(--cw-stage-h) * 0.2));
    --cw-s: min(calc(100cqi / 5.6), calc(var(--cw-stage-h) * 0.085));
  }
  @media (min-width: 761px) and (max-width: 899px) {
    [data-mode="cw"] .cw-exits.is-live {
      --cw-p: min(calc((100cqi + 40px) / 3.05), calc(var(--cw-stage-h) * 0.2));
      --cw-s: min(calc((100cqi + 40px) / 5.6), calc(var(--cw-stage-h) * 0.085));
    }
  }
  @media (min-width: 900px) {
    [data-mode="cw"] .cw-exits.is-live {
      --cw-p: min(calc(100cqi * 0.68 / 3.05), calc(var(--cw-stage-h) * 0.4));
      --cw-s: min(calc(5.2cqi + 4.16px), calc(var(--cw-stage-h) * 0.085));
    }
  }
}
```
   (Why these numbers: 100cqi is the column, which is 100vw minus the gutters when no scrollbar takes
   width. From 761 to 899px today's base formula uses 100vw - 40px while the gutters total 80px, so its
   exact equivalent is 100cqi + 40px. 5.2vw = 0.052 x (100cqi + 80px) = 5.2cqi + 4.16px.)
4. In the comment above `.cw-rec` (~line 3699-3701, "each with a little slack so the ink never meets the
   gutter"), add one sentence: `Where container units exist the size comes from the column (cqi), so a
   classic scrollbar no longer pushes the "+" into the gutter; the vw lines are the fallback (Pass-123,
   cross-review F5).`

### Fix B: let ViewTransitionLink take anchor attributes
In `components/view-transition-link.tsx`: import `AnchorHTMLAttributes` from "react" (type import, next to
`MouseEvent, ReactNode`) and make the props type
```ts
type ViewTransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    className?: string;
  };
```
with a one-line comment above it: `// Anchor attributes (aria-label and the rest) reach <Link> through ...rest.`
Change nothing else in that file.
In `app/(foyer)/work/page.tsx` (~lines 162-168): delete the six-line `// ViewTransitionLinkProps only
widens ...` comment and replace `{...({ "aria-label": featured.entry.context } as any)}` with
`aria-label={featured.entry.context}`.

### Fix C: dead CSS and a stale comment
- `app/globals.css` ~lines 2318-2331: delete the comment `/* DENSITY FIX (home-pace pass, 2026-09-10):
  .cw-secttitle is a class- ... accessible name. */` and the rule `[data-mode="cw"] .cw-secttitle--sub
  { ... }` that follows it (nothing renders that class). Leave one blank line before
  `/* Clients hover-reveal list */`.
- `app/(foyer)/page.tsx` ~lines 523-528: delete the JSX comment `{/* DENSITY FIX (home-pace pass,
  2026-09-10): was 56px -- ... not space alone. */}` (it describes the h3's old margin and the deleted
  class). Keep the Pass-122 comment that follows it unchanged.
- Do NOT delete or edit `components/hand/HandCircle.tsx` (the operator decides that).

## 4. AFTER
1. `pnpm exec prettier --check app/globals.css components/view-transition-link.tsx "app/(foyer)/work/page.tsx" "app/(foyer)/page.tsx"`
   EXPECT `All matched files use Prettier code style!` (all four passed before the edits).
2. `pnpm exec tsc --noEmit` EXPECT exit 0, no output.
3. `pnpm build 2>&1 | tee .planning/qa/pass-123/build-after.log` EXPECT exit 0, every gate passing.
4. Bytes for `/` and `/work` as in step 2.2, and the `cw-wx-feat` grep as in 2.3. EXPECT the grep output
   contains `aria-label="Guardicore, acquired by Akamai"`.
5. `pnpm start -p 3250`, then the same fit runs to `fit-after-hidden.json` / `fit-after-classic.json`,
   the same captures to `rec-after-classic-<W>.png`, the same CLS runs, the same visible-text files
   (`text-after-home.txt`, `text-after-work.txt`), and:
   - `node .planning/exec/crossfade-contrast.mjs http://localhost:3250 .planning/qa/pass-123/crossfade`
   - `node .planning/exec/crossfade-contrast.mjs http://localhost:3250 .planning/qa/pass-123/crossfade-rm --reduced-motion`
   Then stop the server.
6. EXPECT:
   - E1 (hidden scrollbar, the overlay case): at every width `recFs` AFTER equals BEFORE within 0.01px,
     and for each beat `curFs` AFTER equals BEFORE within 0.01px. Nothing changes where no scrollbar
     takes width.
   - E2 (classic): `sb` between 12 and 20 at every width, both runs.
   - E3 (classic, AFTER): `recOver` <= 0.5 at every width; `allOver` <= 0.5 at every beat of every width.
   - E4 (sticky still holds): when `sbLive` is true, beats 0-3 each show a distinct `cur` (0,1,2,3), and
     `stageTop` is within 2px of `navH` at every beat, AFTER (report BEFORE beside it).
   - E5 CLS AFTER equals CLS BEFORE at 390 and 1440 (report both, 4 decimals).
   - E6 `diff text-before-home.txt text-after-home.txt` and the same for work: no output.
   - E7 both crossfade SUMMARY blocks: `"stepsUnder3to1": 0`.
   - E8 `grep -n "as any" "app/(foyer)/work/page.tsx"` prints nothing; `grep -rn "secttitle--sub" app components`
     prints nothing; `git diff --stat` lists exactly the four source files.

## 5. Report
Write `.planning/qa/pass-123/REPORT-123A.md`: a table per width (BEFORE/AFTER x hidden/classic: sb,
recFs, recOver, and per beat cur, curFs, curOver, allOver, stageTop), E1-E8 each PASS or FAIL with the
raw numbers, bytes and CLS before/after, both crossfade SUMMARY blocks pasted verbatim, the capture
paths, and the full `git diff` of the four files. Then reply with the same E1-E8 lines. Do not describe
any capture as looking fine; the main session opens them.

LAST LINE MARKER: pass123a-lantern-58
