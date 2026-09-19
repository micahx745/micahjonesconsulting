# Cross-review, Pass-122 ship diff — Claude leg (same family, NOT independent)

Reviewer: Claude (Fable 5.1), read-only. This is the same-family leg; it does not break
the Claude-verifies-Claude monoculture and should be weighed as such next to the Codex/GLM legs.

Scope: `git diff 92095b7..HEAD -- app components content lib scripts package.json` in the
`p106-live` worktree (branch `design/live-evolve`). 9 files, +1402/−412. Design is not
re-litigated; this hunts defects only.

Method: every changed file read in full; the surrounding code each premise depends on was read
(root `[data-mode="cw"]` rule, `.cw-block`, `.cw-reveal`, nav CSS, `lib/fonts.ts`,
`ViewTransitionLink`, `WorkHeroClip`, `ScrollReveal`, `WorldSwitcher`, `LenisProvider`,
`lenis-react.mjs`, `next/link`, citations, the five MDX `entry` blocks). `npx tsc --noEmit` run
in the worktree: exit 0. No browser was run: anything below that needs a render is labelled
so. Line numbers are HEAD of the worktree.

## Verdict

No BLOCK. Five FIX-LATER defects, two verification gaps the ship gate should close in a real
browser before the CARD 1 flow. Hydration, effect hygiene, StrictMode (production), client
navigation, reduced motion, no-JS, and the `overflow-x: clip` page rule all check out; details
under "Verified clean" so the parent knows what was covered.

## Findings, highest severity first

### F1. FIX-LATER — Scoreboard "first look" gate fires at the first pixel, not at 35%
`components/color-worlds/ExitScoreboard.tsx:169-178`
```ts
const seen = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    visible = entry.isIntersecting;            // L172
    if (visible && current >= 0) assemble(current);
  }
}, { threshold: 0.35 });                       // L176
```
Scenario: stage scrolls up from below the fold. The IO callback fires whenever `isIntersecting`
flips as well as on threshold crossings (Intersection Observer spec, "queue an entry if
thresholdIndex OR isIntersecting changed"; Chromium matches). At the first intersecting pixel
the entry has `isIntersecting: true`, `intersectionRatio ≈ 0.01`, so `visible` becomes true and
`assemble(0)` starts the 0.8s weight climb while the Postmates value is still ~100-130px below
the fold (stage padding 20 + head 34 + gap 16 + company line). At ordinary scroll speed the
assembly is half over, or over, by the time the value is on screen; on a phone flick it is
missed. The 35% documented at L168 ("assembles when the stage is actually seen") is not
enforced. Not a broken state, a diminished first beat.
Verified: by spec and code reading, not a browser run.
Minimal fix: `visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;`
(RevenueFigure already does this correctly at `RevenueFigure.tsx:123` with an explicit ratio
check; WorkFigures' `threshold: 0` + `isIntersecting` is intended.)

### F2. FIX-LATER — Back-navigation to `/` can land the reader two viewports too far down
`components/color-worlds/ExitScoreboard.tsx:39` and `app/globals.css:3991`
Scenario: on `/`, scroll past the receipts (scoreboard was live, so the `#products` section
was `stage-h + 4 × 50svh` tall), click into a study, press Back. Next 16's App Router does not
manage `history.scrollRestoration` (grep of `next/dist/client/components/app-router*.js`:
only `ACTION_RESTORE` dispatch, no `scrollRestoration`), so the browser restores `scrollY`
natively at `popstate`, before React commits the home tree. When `ExitScoreboard`'s effect runs,
`scrollY` is already the saved value and the section is above the viewport, so L39 returns and
`.is-live` is never added. The page is now 4 × 50svh (about two phone viewports) shorter than
the layout the saved position came from: a reader who left at Ordani returns at the doors or
the footer. `RevenueFigure` has the same shape but no height consequence (its early return only
skips the clip).
Verified: mechanism by code reading; the exact restore ordering needs one browser run
(Chrome: `/` → scroll to Ordani → click Guardicore ledger row → Back → where do you land?).
Minimal fix: a module-level `wentLiveThisLoad` flag set at L74; on remount, if it is set, go
live unconditionally (the beat is scroll-position driven, so entering mid-section is already
handled by `beatFor()`; only the entrance needs the below-fold check).

### F3. FIX-LATER — WorkFigures never assembles under React StrictMode (dev only)
`components/color-worlds/WorkFigures.tsx:28,32,39,72-75`
Scenario: `next dev` (StrictMode is on by default in the App Router). Effect runs, sets
`armedThisLoad = true` (L39) before any figure has assembled; StrictMode's simulated unmount
runs the cleanup (L72-75, removes `.is-armed`); the re-run hits `if (armedThisLoad) return;`
(L32). Result in dev: `/work` figures render finished at 800 and never animate, so nobody
previewing in dev can see the motion the ship gate approved. Production has no double invoke,
so the live site is unaffected. `RevenueFigure` and `WorkHeroClip` avoid this by setting their
once-per-load flag only when playback actually starts.
Minimal fix: move `armedThisLoad = true` into the IO callback (first `is-assembling`), or reset
it in the cleanup when nothing assembled.

### F4. FIX-LATER — `svh` is used but not gated; Chrome 105-107 gets a broken pin
`components/color-worlds/ExitScoreboard.tsx:34-38`, `app/globals.css:3988,3991`
Scenario: a browser that passes `CSS.supports("overflow-x","clip")` and `:has()` but lacks
`svh` (Chrome 105-107, Aug-Nov 2022). `--cw-stage-h` is invalid at computed-value time, so the
section and stage fall back to `height: auto`; `measure()` gives `beatPx = max(1, 0) = 1`, and
`beatFor()` jumps to beat 3 the moment the section top passes the nav. Nothing pins, the last
exit is current at once, the other three never take the stage. Tiny share; cheap gate.
Minimal fix: add `|| !CSS.supports("height", "1svh")` to the L34-38 early return.

### F5. FIX-LATER — `100vw`-based poster sizes ignore a classic scrollbar (Windows/Linux desktop)
`app/globals.css:3711,3716,3721` (`.cw-rec`), `3989-3990, 4154-4158` (`.cw-exits.is-live`)
Scenario: desktop Chrome/Firefox with a 15-17px classic scrollbar. `100vw` includes the
scrollbar; the content column does not. The measured slack on `$20M+` (2.830em of a 2.87
divisor, 1.4%) is smaller than 17px below about 1300px viewport width, so the `+` runs 1-9px
into the 40px right gutter between roughly 600 and 1300px wide (worst at 600px: about 9px). The
scoreboard's `--cw-p`/`--cw-s` share the assumption. Phones (overlay scrollbars) and macOS are
unaffected; nothing is clipped, the ink meets the gutter the comment at L3715 says it never
will. `/work` avoids this with `100cqi` on `.cw-wx-study` (`globals.css:6822-6828`); the
home figure does not.
Verified: arithmetic only, not rendered.
Minimal fix: `container-type: inline-size` on `.cw-rec` (and `.cw-exits`) and size from
`100cqi`, keeping the `vw` line as the fallback, the /work approach.

## Verification gaps (not defects; close before CARD 1)

### G1. Safari `mix-blend-mode` on `<video>` — UNVERIFIED
`components/color-worlds/RevenueFigure.tsx:173-193`, `app/globals.css` `.cw-rec__video`
(`mix-blend-mode: multiply` + `filter`) and `.cw-rec__floor` (`lighten`). The knockout depends
on the video layer blending inside the isolated `.cw-rec__clip`. WebKit has a history of
ignoring blend modes on accelerated video layers; if that bites, iOS/macOS Safari shows a
graded video rectangle over the numerals for ~4s instead of footage inside the glyphs, then
fades to copper. I could not run Safari here. The `.planning/qa/pass-122/receipts/v2/`
measurements cited in the CSS comments are Chrome captures. One iPhone look at the clip (and
at Low Power Mode, where `play()` rejects and the settle path runs) belongs in the ship gate
under the project's own "verify in final form" rule.

### G2. F2's restore ordering — one Chrome run, described above.

## Verified clean (what was checked and found sound)

- Hydration / SSR-client divergence: `RevenueFigure` starts `phase="idle"` on both sides and
  mounts the clip box only after a state change; `ExitScoreboard` renders identical markup and
  mutates classes/inline vars only in effects; `WorkFigures` returns null; `ExitRecord`'s sort
  is deterministic; `WORK_HEADING.split(/(?<=,) /)` runs on the server only. No mismatch path.
- Effect hygiene: every observer, rAF, timer and `load` listener has a matching cleanup
  (`RevenueFigure.tsx:99-103,141,147,154`; `ExitScoreboard.tsx:183-189`;
  `WorkFigures.tsx:72-75`). Removing a playing `<video>` from the document pauses it per HTML;
  `playedThisLoad` (L37,125) prevents a second play on return. No duplicated video or observer
  survives a View Transition navigation away and back.
- StrictMode (production irrelevant, dev checked): `RevenueFigure` and `ExitScoreboard`
  re-arm correctly on the double invoke; only `WorkFigures` does not (F3).
- `overflow-x: clip` page rule (`globals.css:3984`): root has `overflow-x: hidden` at L1131,
  which made it a scroll container and is exactly why native sticky failed; the `:has()` rule
  (specificity 0,3,0) wins over the root rule (0,1,0). Side effects checked: `hidden` → `clip`
  drops the root's BFC, but on `/` the first/last in-flow descendants (`.cw-hero` flex +
  padding, `.cw-foot` padding only) carry no collapsible margins, and `ReactLenis root` adds no
  wrapper (`lenis-react.mjs:116`), so nothing shifts; fixed layers (nav z200, grain z9998,
  `::after` vignette z9997) are unaffected; `position: sticky` appears nowhere else in the
  stylesheet (grep), so no dormant sticky wakes up. Net behaviour change while live: the root
  can no longer be scrolled horizontally by `focus()`/`scrollIntoView` on an overflowing
  element, which is an improvement.
- Lenis: root mode drives `window.scrollTo` each frame, so native `scroll` events and native
  sticky both work; `syncTouch: false` leaves iOS on native scroll. `scroll` handler is
  rAF-throttled with one `getBoundingClientRect` per frame; the FLIP forces 2-3 synchronous
  layouts only on a beat change (four per pass). Acceptable.
- FLIP math (`ExitScoreboard.tsx:96-146`): "first" is measured with in-flight transforms
  (so a mid-flight retarget continues smoothly), rows invert by top, children by row-relative
  offset plus `scale(a.height/b.height)` from `transform-origin: 0 0`; the forced reflow at
  L139 comes before the transition is restored, which is the correct FLIP order.
  `el.style.transition = "none"` wipes React's inline `transitionDelay` on the deals, but
  `transition-delay: 0s !important` at `globals.css:4043` covers it and the component never
  leaves live mode without unmounting.
- CSS cascade: live deal rule (0,5,0) overrides `.cw-reveal:not(.is-in)` (0,3,0), the 479px
  phone ledger (0,2-3,0) and the 900px grid (0,3,0); `display:flex` on `ol[role=list]`
  keeps list semantics; `.cw-exits__outcome` stays in reading order (sr-only when not current).
- Fonts: `lib/fonts.ts` loads Bricolage with `weight: "variable"`, so
  `font-variation-settings: "wght" 200` and the 200→800 keyframes have a real axis to animate.
- Accessibility: `aria-label` reaches the `<a>` (Next's `Link` spreads `...restProps`,
  `link.js:100,371`); the split `$20`/`M+` spans sit inside an `aria-hidden` box beside a
  visible-to-AT `.cw-sr-only` "$20M+", so it is announced once; the in-glyph `<video>` is inside
  that `aria-hidden` box with `tabIndex={-1}` and is never focusable; the featured link's only
  visible content is aria-hidden media plus an arrow and its name comes from `aria-label`
  (`work/page.tsx:168`), no WCAG 2.5.3 conflict; heading order h2 → sr-only h3 → h4 holds.
- Reduced motion / no-JS: all three components gate on `matchMedia` in the effect; without JS
  the numerals keep the world foreground (`globals.css:3737` copper only under
  `.cw-js-reveals`), the ledger is static, the /work figures are at 800, and the home never
  renders a `<video>` so Chrome's forced no-JS controls cannot appear there.
- Deep link / loaded past the section: both home components return early on
  `top < innerHeight` and leave the finished frame (this is what makes F2 possible on Back).
  bfcache proper (DOM preserved) is fine: listeners and `.is-live` survive.
- Performance: the in-glyph video mounts only after `load` and only within one viewport of
  the figure (`RevenueFigure.tsx:91,96-97`), 115KB webm / 210KB mp4 / 13KB poster; the hero LCP
  never sees it. `preload(HERO_POSTER)` on /work is unchanged from Pass-120.
- `splitFigure` regex against every published `entry.figure`: `$14M` → numerals only,
  `Up to 800,000` → words "Up to" + numerals, `$3M` → numerals only; birth-worker's
  `figurePhrase` "five to ten" splits with tail "." joined as one string (LESSONS #38 case).
- Build: `pnpm build` runs no ESLint (Next 16; no eslint config in the repo), so the `as any`
  spread cannot fail a lint gate; `tsc --noEmit` passes.

## Notes below the fix line (not counted)

- `RevenueFigure.tsx:87-89`: the "arrived without arming" branch leaves the arming observer
  connected, so a reader who then scrolls a full viewport past and comes back up will arm and
  play the clip after all. Harmless, just not the "leave the finished frame alone" the comment
  promises. Disconnect there if the intent is literal.
- `.cw-exits.is-live` has no `@media print` reset (the `/work` figure does, `globals.css:6916`):
  printing `/` yields a 4 × 50svh-tall section with the stage at its top. Nobody prints the home.
- The ledger row at 320px-wide devices: `$2.65B` at `--cw-s` plus "SURVEYMONKEY" nowrap is
  about 12px wider than the 280px column by my glyph arithmetic (unrendered); clipped by the
  root, not scrolled. 360px and up fits.
