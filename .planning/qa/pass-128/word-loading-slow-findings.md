# Pass-128 — investigator lens: "the word loading slow"

EVIDENCE ONLY. Nothing under `app/`, `components/`, `lib/`, `content/`, `public/`, or
`scripts/` was edited. Live site only: `https://www.micahjonesconsulting.com/`
(deploy `dpl_Bk18zCfBqPb2DjTrkozL2dBs7git`). Three investigators ran on this
machine at the same time; absolute wall-clock numbers below are contaminated
by CPU contention where noted, but the **relative** comparisons this report
rests on (same run, same page, headings measured the same way) are not.

## Instrument

New script, `word-timing-probe.mjs` (this folder) — the shared `scroll-probe.mjs`
explicitly disclaims this measurement in its own header comment ("This probe
does NOT measure 'the word loading slow' … out of scope"). It:

- Injects an `evaluateOnNewDocument` script that starts an rAF sampling loop
  before the page's own JS runs, polling `getBoundingClientRect()` +
  `getComputedStyle().opacity/.transform` for every heading between the top
  of the page and "The Audit" every frame, plus a `MutationObserver` that
  timestamps the exact moment `ScrollReveal.tsx`'s `.cw-js-reveals` class and
  `Hero.tsx`'s `--reveal-i` / `.is-in` writes land in the DOM (so reveal start
  times are measured directly, not inferred).
- Deliberately does **not** wait for `document.fonts.ready` (the opposite of
  `scroll-probe.mjs`) — the whole point here is to see what's on screen while
  fonts/JS are still arriving.
- Scrolls with the same manual touch-dispatch gesture as `scroll-probe.mjs`
  (copied, not reinvented — see that file's GESTURE MECHANISM SUBSTITUTION
  note).
- Ran twice at cpu=4/net=4g (`word-timing-raw.run1.json`,
  `word-timing-raw2.run1.json`, the second with the mutation-timestamp
  instrumentation added) and once at cpu=1/no network throttle
  (`word-timing-cpu1.run1.json`), n=1 each — treat single-run numbers as
  indicative, not final; the cpu1-vs-cpu4 comparison below is the important
  one because it reproduces almost exactly across throttle levels.
- `analyze-word-timing.mjs` (this folder) turns a raw run into per-heading
  `t_enter` (first sample where the element has any pixel in the viewport)
  and `t_settled` (first of 3+ consecutive samples where opacity/transform
  both match their own final value) plus the delta.

Headings censused, in page order (`app/(foyer)/page.tsx`, verified by direct
read, and PASS-124's current copy):

1. Hero H1, two lines ("It works." / "It just does not sell.") — `Hero.tsx`
2. Hero sub ("I shape the product…")
3. Door 1 h2 ("The demo took a weekend…") — `page.tsx:141`
4. Door 2 h2 ("An agency is too broad…") — `page.tsx:159`
5. Offer h2 ("Two weeks to know what to fix first.") — `page.tsx:219-221`,
   wrapped in `<SplitReveal>`
6. "The Audit" h3 (`.cw-pbox__name`, `PriceBox.tsx:51`) — inside
   `.cw-offer__box.cw-reveal` (`page.tsx:222`)

## Finding W2 (PRIMARY, HIGH CONFIDENCE) — the offer h2's GSAP char-cascade is 15-30x slower than every other heading in the same span, and it is by design, not by throttle

**Symptom:** words-loading-slow.

**Claim:** The one heading between the hero and "The Audit" that visibly takes
over a second to finish appearing is "Two weeks to know what to fix first.",
because it alone uses `<SplitReveal>` (GSAP SplitText, char-by-char), while
every other heading in the same span (both door h2s and "The Audit" itself)
uses the plain CSS `.cw-reveal` fade and is fully settled in well under a
tenth of that time. This reproduces almost identically whether the CPU is
throttled 4x or not, so it is not a throttling artifact — it is the coded
duration.

**Evidence:**

- `components/color-worlds/SplitReveal.tsx:56` — default `stagger = 0.012`
  (seconds per character).
- `components/color-worlds/SplitReveal.tsx:82-96` — the tween: `duration: 0.65`,
  `ease: "expo.out"`, `scrollTrigger: { start: "top 75%", once: true }`.
  "Two weeks to know what to fix first." is 29 non-space characters, so the
  declared total is `(29-1) * 0.012 + 0.65 ~= 0.99s` before any trigger-detection
  or throttle overhead.
- `app/globals.css:4530-4547` — the competing `.cw-reveal` system used by the
  door headings and "The Audit": a single `opacity`/`transform` CSS
  transition, `0.55s cubic-bezier(0.16, 1, 0.3, 1)`, IntersectionObserver
  threshold 0.18 (`components/color-worlds/ScrollReveal.tsx:30`). Declared
  total <= 0.65s including the second door's 100ms `transitionDelay`
  (`app/(foyer)/page.tsx:157`).
- Measured, `t_enter` to `t_settled` (first-visible-pixel to fully-opaque/
  in-place), same measurement method for every heading in the same run:

  | heading | cpu=4/net=4g (run A) | cpu=4/net=4g (run B) | cpu=1, no net throttle |
  |---|---|---|---|
  | door1 h2 | 71ms | 72ms | 39ms |
  | door2 h2 | 39ms | 39ms | 38ms |
  | **offer h2 first char** | **1151ms** | **1117ms** | **1114ms** |
  | **offer h2 last char** | **1172ms** | **1138ms** | **1147ms** |
  | "The Audit" h3 | 39ms | -- | 38ms |

  Raw: `word-timing-raw.run1.json`, `word-timing-raw2.run1.json`,
  `word-timing-cpu1.run1.json` (this folder).

  The offer h2's own container element never changes opacity/transform at
  all — only its dynamically created `.cw-split__char` children do, and
  those children do not exist in the DOM until GSAP's `SplitText.create()`
  has run (`SplitReveal.tsx:70-80`), which is itself a separate, later event
  (see W3).

- The near-identical duration at cpu=1 (1114-1147ms) vs cpu=4 (1117-1172ms)
  is the key piece of evidence that this is a **design** duration, not a
  throttle-induced slowdown: a mechanism whose timing actually depends on the
  CPU throttle would show a large gap between cpu=1 and cpu=4, the way
  `scroll-probe.mjs`'s own calibration shows for scroll frame timing
  (intervalMsP95 33.4ms @ cpu4 vs 16.8ms @ cpu1, a ~2x gap). Here there is
  essentially no gap.

**Neutralizer** (for a later A/B test, no repo edit):

```
css:#cw-offer-title .cw-split__char { animation: none !important; opacity: 1 !important; transform: none !important; transition: none !important; }
```

This leaves GSAP/SplitText running (so any JS-cost effects are unchanged) but
forces every character to its resting state instantly, isolating the
*visual* cascade from everything else. Compare felt/measured "slow word"
impression with and without this rule injected via
`scroll-probe.mjs --inject-css` or an equivalent on the word-timing probe.

## Finding W3 (SUPPORTING, MEDIUM CONFIDENCE) — the GSAP+ScrollTrigger bundle is ~50KB gzipped, loads unconditionally on the home route, and its arrival gates every reveal on the page, not just its own

**Symptom:** words-loading-slow (compounding factor).

**Claim:** The chunk carrying GSAP core + ScrollTrigger is one of the two
largest JS payloads shipped on first load of `/`, and it is not deferred or
route-scoped away from pages that don't need it (it is present in the initial
resource list). Confirmed by direct content inspection of the deployed chunk,
not by filename guessing (chunk names are content-hashed and carry no
readable substring — searching resource names for "gsap" returned zero
matches; grepping the downloaded bytes was necessary).

**Evidence:**

- Chunk `.../_next/static/chunks/14u.~01e7g0-p.js?dpl=dpl_Bk18zCfBqPb2DjTrkozL2dBs7git`
  — 50,100 bytes transferred (gzip) / 122,034 bytes decoded. Downloaded
  content contains the literal strings `gsap` and `ScrollTrigger` (verified
  by `grep` on the fetched file; saved at
  `.planning/qa/pass-128/chunks/2_14u.~01e7g0-p.js` in this run). It did NOT
  contain the literal string `SplitText` (case-insensitive) even though
  `SplitReveal.tsx:24` imports `SplitText` from `gsap/SplitText` — that
  plugin appears to ship in a different, smaller chunk not captured in this
  run's top-10-by-size sweep; not conclusively located, flagged as an open
  thread rather than asserted.
- Network timing (cpu=4/net=4g): this chunk starts at ~239ms, finishes at
  ~656ms — i.e. it is requested immediately, in the same wave as every other
  core chunk, not lazy-loaded.
- The MutationObserver instrumentation shows the reveal-gating classes
  (`.cw-js-reveals` on `[data-mode="cw"]`, written by
  `components/color-worlds/ScrollReveal.tsx:19`; `--reveal-i` / `.is-in`,
  written by `components/color-worlds/Hero.tsx:87-92`) land at:
  - cpu=1: **t=668ms** (page `load` event at 634ms — 34ms after load)
  - cpu=4/net=4g: **t=1375ms** (page `load` event at 1205ms — 170ms after load)

  Both numbers are "after `load`, plus a roughly proportional hydration
  tax," consistent with a throttled main thread working through a JS payload
  that includes this ~50KB piece (among others) before ANY heading's reveal,
  including the fast plain-CSS ones, is even armed. This is a page-wide
  compounding factor on top of the per-heading W2 finding above, not a
  separate mechanism.

**Neutralizer** (deployment-specific — re-identify the hash on a new deploy
by re-running the "download top-10 JS chunks by size, grep for
`ScrollTrigger`" check this report used):

```
block:14u.~01e7g0-p
```

Blocking it will make `SplitReveal.tsx`'s `gsap.registerPlugin(...)` /
`useGSAP` calls throw (there is no try/catch around them) — read
`consoleErrors` in the A/B run's output alongside the timing, not just the
timing alone.

## Finding W1 (CHECKED, RULED OUT — reported per the lens brief's own candidate list) — hero H1 entrance and web-font swap are NOT meaningfully contributing

**Symptom:** words-loading-slow (candidate mechanism named in the task brief;
checked and not supported by the evidence).

**Claim:** The two named "could be words-loading-slow" mechanisms other than
SplitReveal — late web-font arrival causing reflow, and the hero's own CSS
entrance — were both directly measured and neither shows a meaningful delay.

**Evidence:**

- Font swap: `lib/fonts.ts:38,57,73` sets `adjustFontFallback: false` with
  named tuned fallbacks specifically to avoid a swap-driven reflow (Pitfall
  A1, already fixed per that file's own comment). Measured: the hero H1's
  `getBoundingClientRect().top` is byte-identical (207.3px) across the exact
  sample where `document.fonts.status` flips from `"loading"` to `"loaded"`
  (t=1205 to 1222ms in the cpu=4 run) — no layout shift at the font-swap
  boundary. The fix holds.
- Hero H1 entrance: the two-line slide-up (`app/globals.css:2105-2119`,
  `cw-hero-line-up` keyframe, declared `0.35s` duration + `animation-delay:
  calc(0.08s + i*0.08s)`, so nominal completion is 430ms (line 1) / 510ms
  (line 2) after the class/style writes land) settles in:
  - cpu=1: 504ms / 593ms after the writes land (t=668ms) — 74-83ms over
    nominal.
  - cpu=4/net=4g: 550ms / 629ms after the writes land (t=1375ms) — 120-119ms
    over nominal.

  The overshoot is a small, roughly-constant 75-120ms in both conditions
  (consistent with one or two extra throttled paint frames), not a
  throttle-multiplied blowup, and the whole entrance is done well under a
  second either way. This does not match "the word[s] loading slow" the way
  W2 does.

  (Caution for whoever picks this up next: an earlier, less careful pass of
  this same analysis — using "time since first sample" instead of the actual
  mutation-observed write time as the zero point — made this look like a
  ~900ms, 2x overshoot. That was an artifact of not knowing when the
  reveal-triggering classes actually landed; the corrected, instrumented
  measurement above is the one to trust. Recorded here as a caught
  mis-analysis, not swept away, per the "evidence before assertions" rule.)

## Finding W4 (LOW CONFIDENCE, UNCONFIRMED IN THESE RUNS) — a possible flash-then-hide on the offer h2 under a faster scroll or slower JS

**Symptom:** words-loading-slow (edge case).

**Claim:** `SplitReveal.tsx:70-80` only hides the split characters
(`gsap.set(split.chars, { yPercent: 110, opacity: 0 })`) once GSAP has
mounted and run `SplitText.create()`. Until that happens, the plain SSR text
node sits fully opaque in the DOM with no hiding CSS of its own. If a reader
scrolls the offer heading into view faster than GSAP finishes mounting (or on
a connection/device where that takes longer than it did here), they would see
the plain heading appear at normal speed, then visibly disappear, then
slow-cascade back in — worse than a uniformly slow reveal.

**Evidence:** In all three runs here, the char-hiding happened well before
the heading reached the viewport (chars hidden at t=1444-1507ms; heading's
own top entered the viewport at t=3171-3358ms), so the flash was **not
observed** in this evidence. This is a plausible risk given the code
structure, not a confirmed defect — reported as an open thread, not a
finding.

**Neutralizer:**

```
block:14u.~01e7g0-p
```

With GSAP blocked entirely, the split never happens and the heading stays
plain, visible text throughout — a later A/B test comparing "GSAP present"
vs "GSAP blocked" under a faster synthetic scroll speed than this report used
would be the way to actually confirm or rule out W4.

## Out-of-lens observations (for the scroll-smoothness / colour-switch investigators — not independently verified against their own lens's methodology)

These came up while reading the code for this lens and are included for
completeness, not as this report's primary claims:

- `components/color-worlds/Nav.tsx:68-103` (rAF-batched `scroll` listener)
  and `components/color-worlds/ExitScoreboard.tsx:402-440` (a second,
  independent rAF-batched `scroll` listener, gated live only past fonts-ready
  and only below "The Audit" but still attached to `window` for the whole
  page once live) plus `components/LenisProvider.tsx:61-86` (a persistent
  Lenis rAF loop, `syncTouch: false`) are three separate scroll-triggered
  main-thread consumers active at once. A `--trace` run of `scroll-probe.mjs`
  (cpu=4/net=4g, n=1, `.planning/qa/pass-128/trace128.run1.json`) attributes
  the scroll-to-Audit window's engine time as `UpdateLayoutTree` 485ms,
  `FunctionCall` 372ms, `EventDispatch` 315ms, `Paint` 289ms out of a
  3937.8ms scroll — consistent with (not proof of) several independent
  handlers competing for main-thread time during scroll, on top of
  `WorldSwitcher.tsx`'s own inline-style writes on the shared
  `[data-mode="cw"]` root (`WorldSwitcher.tsx:68-70`), which is the kind of
  write that can trigger a style recalc of every descendant using
  `var(--cw-*)`. Per the task's own caution, these are attribution numbers
  from a single, contended run, not final frame numbers.
- The colour cross-fade itself is `app/globals.css:1246-1248`,
  `background-color 0.7s cubic-bezier(0.16, 1, 0.3, 1)` — a single shared
  duration for every world transition; not something this lens measured
  independently.

## Files in this folder from this pass

- `word-timing-probe.mjs` — the instrument (new, purpose-built; does not
  duplicate `scroll-probe.mjs`, which explicitly disclaims this measurement).
- `analyze-word-timing.mjs` — post-processes a raw run into per-heading
  timings.
- `word-timing-raw.run1.json`, `word-timing-raw2.run1.json` — cpu=4/net=4g
  raw samples (run2 adds the mutation-timestamp instrumentation).
- `word-timing-cpu1.run1.json` — cpu=1, no network throttle, same page, same
  method.
- `trace128.run1.json` — one `--trace` run of the shared `scroll-probe.mjs`
  at cpu=4/net=4g, used only for the attribution note above.
- `js-chunk-urls.txt`, `chunks/` — the top-10-by-size JS chunks fetched
  directly from the live deployment and grepped for `gsap` / `ScrollTrigger`
  / `SplitText` / `lenis` to identify W3's chunk without guessing from
  filenames (content-hashed, unreadable by name).
