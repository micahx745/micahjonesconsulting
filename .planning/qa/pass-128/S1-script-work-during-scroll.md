# Pass-128 — Lens: script work during scroll (top of page -> "The Audit")

Evidence only. Nothing under app/, components/, lib/, content/, public/, scripts/, or any
config was edited. All measurements are against the LIVE site
(https://www.micahjonesconsulting.com/, deploy dpl_Bk18zCfBqPb2DjTrkozL2dBs7git) using the
shared probe (scroll-probe.mjs) plus three scratch diagnostics I wrote in this same folder to
get attribution the shared probe's trace summary can't give on its own (no target/property in
CDP's EventDispatch trace args — see "Diagnostics used" below). Three investigators were
running on this machine at the same time; absolute frame timings in a single run are
contaminated by CPU contention (disclosed inline below), but relative attribution (which
selector/property/function accounts for which share of the work) is not, since it's derived
from event counts and code-level facts, not wall-clock alone.

## Source files read for this lens

Hero.tsx, Nav.tsx, ExitScoreboard.tsx (+ its wrapper ExitRecord.tsx), LenisProvider.tsx,
WorldSwitcher.tsx, ScrollReveal.tsx, SplitReveal.tsx, MagneticArea.tsx, and
`app/(foyer)/page.tsx` for section order/imports. `app/globals.css` was read (not edited) to
find the CSS side of the mechanism in W1.

Confirmed home order matches the brief: Hero (terracotta) -> doors band section
(data-world="bone") -> Offer/"The Audit" section (data-world="terracotta", contains
`<SplitReveal id="cw-offer-title">` and `<PriceBox>`) -> espresso section (HowIWork,
RevenueFigure, ExitRecord/ExitScoreboard) -> petrol (Ordani). The scroll-probe's target
("The Audit") is the 3rd section, so ExitScoreboard's own section is BELOW the measured scroll
range, which matters for S2 below.

## Chunk map (grep-confirmed against the live site's actual `/_next/static/chunks/*.js`)

Fetched all chunk URLs the live home page's HTML references, then grepped each for a
distinctive string owned by each suspect component:

| Chunk | Bytes | Confirmed contents (string match) |
|---|---|---|
| `14u.~01e7g0-p.js` | 122,034 | GSAP core + `ScrollTrigger` + `cw-split__char` -> **SplitReveal.tsx** (GSAP/SplitText/ScrollTrigger) |
| `0cum8rnfth2b5.js` | 30,613 | `cw-hero__ground`, `cw-exits measureStates`, `cw-exits__deal`, `cw-exits__stage`, `MagneticArea`, `RevenueFigure` -> **Hero.tsx + ExitScoreboard.tsx/ExitRecord.tsx + MagneticArea.tsx + RevenueFigure.tsx bundled together** |
| `14-gvgs7j.1p9.js` | 4,655 | `-50% 0px -50% 0px`, `cw-js-reveals`, `is-scrolled` -> **WorldSwitcher.tsx + ScrollReveal.tsx + Nav.tsx bundled together** (small, cheap chunk) |
| `11dea~5dlc8v0.js` | 29,786 | `syncTouch`, `lerp` -> **LenisProvider.tsx** (the `lenis` package) |
| `0xxxi2p_-v-e~.js` | 227,315 | **no match** for PriceBox/HowIWork/`cw-offer`/`cw-hiw` strings I tried. Largest chunk on the page; contributed real FunctionCall time during the scroll (functions `fz`/`fO`/`O`, ~43ms combined in the one --trace run). Not attributed to a named suspect component here — flagged as an open gap, not guessed at. |

Notable: Hero (first thing the user sees) and ExitScoreboard (3+ screens below the fold, not
even inside the measured scroll range) are compiled into the SAME chunk. That chunk loads and
its components' mount-effects run together, early, regardless of scroll position (see S2).

## Diagnostics used (all in this folder, live-site-only, no repo writes)

- `scroll-probe.mjs --trace` (the shared, deliverable probe) — one run, cpu=4, produces
  `trace-attrib.run1.json` + the printed `topTraceEventsByDuration` summary.
- `transition-attrib.mjs` (new scratch diagnostic, same pattern as the existing
  `debug-gesture*.mjs`) — attaches capture-phase listeners for
  transitionrun/transitionstart/transitioncancel/transitionend at `document` level and logs
  `{type, target selector-ish, propertyName}` for every one, then runs the same manual
  touch-dispatch scroll as the shared probe. This exists because CDP's trace `EventDispatch`
  records for these events carry only `{type}` — no target or property — so the trace alone
  cannot say WHICH element/property is churning; this fills that gap. Output: `transition-attrib.log`.
- `worldwrite-count.mjs` (new scratch diagnostic) — counts raw (non-deduplicated)
  `MutationObserver` records on `[data-mode="cw"]`'s `style` attribute, and samples
  `window.innerHeight` every 50ms, during the same scroll. Tests two candidate explanations
  for W1 below (WorldSwitcher over-firing; mobile URL-bar viewport-height churn). Output:
  `worldwrite-count.log`.
- `idle-check.mjs` (new scratch diagnostic) — same transition listeners as
  `transition-attrib.mjs`, but the page is never scrolled or touched; just sits for 4s. Tests
  whether the transition storm in W1 is an idle/background loop or genuinely scroll(-crossing)-driven.
  Output: `idle-check.log`.
- `hover-artifact-check.mjs` (new scratch diagnostic) — walks `window.scrollTo` in 40px steps
  from top to the Audit section and records `document.elementFromPoint(195, 650)` (the shared
  probe's fixed touch-gesture coordinate) at each step, to check whether the synthetic touch
  point happens to ride over the elements implicated in W1 (an alternative, "this is a
  measurement artifact of our gesture mechanism" explanation). Output: `hover-artifact-check.log`.

None of these touch app/, components/, lib/, content/, public/, or scripts/; they are
standalone puppeteer-core scripts against the live URL, same pattern as the already-provided
`debug-gesture.mjs`/`debug-gesture2.mjs`.

## W1 — colour-switch-glitchy (root-caused, high confidence)

**Claim:** the world-switch "doesn't change smoothly, kind of glitchy" because several
elements that inherit `color` from the `[data-mode="cw"]` root — which itself runs a 0.7s
`color`/`background-color` transition — ALSO declare their OWN, separate, much shorter
`transition: color` on themselves. While the root's 0.7s transition is still in flight, the
descendant's *inherited* starting value keeps changing every style-recalc frame, so the
descendant's own transition keeps getting cancelled and restarted (never finishing) until the
root settles. That shows up as dozens of `transitioncancel` events per world-crossing on a
small number of elements, clustered in ~700ms-long bursts — the ones a user would actually
see, because they're links and headline-adjacent text, not the full-bleed background rect.

**Evidence:**
- CSS (`app/globals.css`, read-only):
  - `[data-mode="cw"]` root (~line 1242-1247): `background-color: var(--cw-bg); color:
    var(--cw-fg); transition: background-color 0.7s cubic-bezier(0.16,1,0.3,1), color 0.7s
    cubic-bezier(0.16,1,0.3,1);`
  - `.cw-mlink` (lines 3170-3184): `color: inherit; ... transition: color 0.2s, border-color
    0.2s;`
  - `.cw-section-cta` (lines 2832-2846): identical pattern — `color: inherit; ... transition:
    color 0.2s, border-color 0.2s;`
  - `.cw-exits.is-live .cw-exits__co` (lines 4182-4187): `transition: transform 0.6s
    cubic-bezier(...), color 0.3s ease;`
  - Same "own short color transition on an inherited value" shape in all three places I
    checked. This is a systemic pattern in the stylesheet, not a one-off.
- Measured (`transition-attrib.mjs`, cpu=4, one full top-to-Audit gesture, live site):
  868 total transition-lifecycle events for a scroll that has exactly 2 real world crossings.
  Top offenders (type | target | property -> count):
  - `a.cw-mlink | color`: 132 transitionrun, 132 transitionstart, **126 transitioncancel**
    (there are only 4 `.cw-mlink` elements on the whole page — confirmed by
    `document.querySelectorAll('.cw-mlink').length === 4` — so this is ~33 restart cycles
    PER ELEMENT for 2 real colour changes)
  - `a.cw-mlink.cw-offer__packages-link | color` (1 element on the page): 44/44/**42** cancel
  - `a.cw-section-cta | color` (1 element on the page): 44/44/**42** cancel
  - `p.cw-exits__co | color`: 20 run / 24 start / 24 end (smaller — fewer cancels here)
  - `p.cw-exits__val | color`: 12 run / 15 start / 15 end
  - Smaller, plausibly-legitimate counts (2-4 each) on `nav.cw-nav.is-scrolled`
    (background-color/color — matches its single real scroll-threshold crossing) and
    `div.cw-js-reveals` (background-color/color — this IS the real root transition itself).
- Ruled out, with direct measurement, two alternative explanations for "something is writing
  the colour vars more than twice":
  - **WorldSwitcher over-firing** (`worldwrite-count.mjs`): raw, non-deduplicated
    `MutationObserver` records on `[data-mode="cw"]`'s `style` attribute = exactly **6** for
    the whole scroll (2 real switches x 3 custom properties: `--cw-bg`/`--cw-fg`/`--cw-accent`).
    This matches the shared probe's own `worldSwitchCount: 2` exactly. `setWorld()` is not
    being called more than twice; the churn is downstream of two real, correctly-detected
    crossings, not extra IntersectionObserver noise.
  - **Mobile URL-bar viewport-height churn** (`worldwrite-count.mjs`, same run): `0`
    `window.innerHeight` change samples over the whole scroll (headless Chrome via CDP does
    not appear to simulate the dynamic toolbar here). Not the cause in this measurement,
    though I can't rule it out on a real device with a real collapsing toolbar — flagging as
    untested-not-ruled-out for a real-device pass.
  - **Idle/background loop, unrelated to scrolling** (`idle-check.mjs`): sitting on the page
    for 4s with zero scroll and zero touch input produced **0** transition events of any kind.
    The churn is tied to the scroll-driven world crossings, not a standing loop.
  - **Synthetic-touch-point artifact** (`hover-artifact-check.mjs`): walked
    `document.elementFromPoint(195, 650)` (the shared probe's fixed gesture coordinate) across
    the whole scroll range in 40px steps. It never lands on `.cw-mlink`/`.cw-section-cta`/
    `.cw-offer__packages-link` (it passes over `.cw-door__cta`/`.cw-door--sell` instead at this
    sampling resolution). This weakens (does not fully eliminate, since sampling was every
    40px, not continuous) the theory that a CDP-touch-dispatch hover artifact, rather than a
    real CSS mechanism, explains the storm.
- Timeline cross-check: in the `--trace` run's raw event stream, `transitioncancel` events
  cluster in two bursts — roughly 766ms-1230ms and 2250ms-3016ms into the scroll — each burst
  roughly 500-750ms long. That length matches the root's own 0.7s transition duration, and two
  bursts matches exactly two world crossings. This is consistent with (not separately proving
  beyond the CSS reading above, but corroborating it) the "child transition keeps restarting
  for as long as the parent's transition is still moving" mechanism.

**Neutralizer for a later A/B (CSS injection, no repo edit):**
```
css:[data-mode="cw"] .cw-mlink,[data-mode="cw"] .cw-section-cta,[data-mode="cw"] .cw-offer__packages-link,[data-mode="cw"] .cw-exits__co,[data-mode="cw"] .cw-exits__val{transition:none !important}
```
Expected if W1 is correct: `transitioncancel` count on these selectors collapses toward 0,
`UpdateLayoutTree`/`Paint` trace totals during the world-crossing windows drop, and a
side-by-side screen recording shows the crossfade reading as one smooth fade instead of a
flicker on the links/figures — while the background itself still fades over 0.7s (this CSS
does not touch the root's own transition, so it isolates the child-restart mechanism from the
background crossfade itself).

## S1 — scroll-not-smooth: GSAP/ScrollTrigger is the single largest attributed script cost

**Claim:** `SplitReveal.tsx` (the one recorded GSAP exception, per `.claude/CLAUDE.md`) is used
3 times on the home page, including on the "Audit" section's own `<h2>` — i.e. inside the
exact scroll range being measured — and GSAP's internal update routine is the single largest
named-function cost captured in the trace during the top-to-Audit scroll, well above any of
the site's own hand-rolled rAF handlers.

**Evidence** (`scroll-probe.mjs --trace`, cpu=4, one run; `trace-attrib.run1.json`):
- Trace-wide category totals: `UpdateLayoutTree` 510.04ms, `FunctionCall` 401.42ms,
  `EventDispatch` 356.5ms, `Paint` 323.1ms, `Layerize` 88.69ms, `FireAnimationFrame` 70.51ms,
  `PrePaint` 56.91ms, `Layout` 14.4ms (forced/synchronous layout), `IntersectionObserverController::computeIntersections` 13ms.
- Function-level attribution by chunk URL (`FunctionCall`/`EventDispatch`/`FireAnimationFrame`,
  summed by `(name, url/type, functionName)`):
  - `EventDispatch | scroll` (aggregate across every native scroll listener on the page):
    **278.69ms**
  - `FunctionCall | 14u.~01e7g0-p.js (GSAP chunk) | af`: **256.34ms** — the single largest
    named-function line in the whole trace, larger than every other component's own code
    combined
  - `FireAnimationFrame` (unattributed URL, aggregate rAF callbacks): 70.51ms
  - `FunctionCall | 14u.~01e7g0-p.js | t`: 34.72ms
  - `FunctionCall | 0xxxi2p_-v-e~.js | fz`: 30.04ms (unattributed chunk, see chunk map)
  - `EventDispatch | transitioncancel`: 26.34ms (see W1)
  - `pptr:evaluate;installRecorders ... tick`: 26.27ms + 4.16ms — **this is the shared probe's
    OWN per-frame recorder overhead, a measurement confound, not site cost.** Disclosing per
    the probe's own comments about instrumentation cost.
  - `FunctionCall | 11dea~5dlc8v0.js (Lenis) | onTouchMove`: 6.85ms; `| onNativeScroll`: 6.00ms;
    `| raf`: 3.81ms — Lenis's own handlers, real but modest.
  - `FunctionCall | 14-gvgs7j.1p9.js (WorldSwitcher+Nav+ScrollReveal) | n`: 4.71ms; `| r`: 3.72ms
    — modest.
  - `FunctionCall | 0cum8rnfth2b5.js (Hero+ExitScoreboard+MagneticArea+RevenueFigure) | W`:
    4.12ms + 1.75ms — modest, see S2 for why ExitScoreboard runs at all in this window.
  - `FunctionCall | 14u.~01e7g0-p.js | r.wheelHandler`: 1.19ms — a wheel handler shipping in
    the GSAP bundle (likely part of the Observer plugin bundled alongside ScrollTrigger/SplitText
    even though this page doesn't appear to use Observer directly) — flagged, not chased
    further in this evidence pass.
- Caveat on this run specifically: it had `longtaskCount: 1` (69ms) and `framesOver50ms: 1`,
  both worse than the 3-run calibration baseline (0 longtasks, 0 frames-over-50 at cpu=4). Per
  the brief's contamination warning (three investigators running concurrently), I'm not
  claiming this run's absolute frame numbers as clean; the ATTRIBUTION (which function/chunk
  dominates) is what I'm reporting from it, not the absolute ms.

**Neutralizer for a later A/B:**
```
block:14u.
```
(substring-matches the GSAP chunk's actual filename, `14u.~01e7g0-p.js`). Expected: the `af`
FunctionCall cost and a chunk of `UpdateLayoutTree`/`Paint` disappear from the trace. **Disclose
when running this:** blocking this chunk will also break `SplitReveal` (gsap is a hard, non-lazy
import per `SplitReveal.tsx`'s top-level `import { gsap } from "gsap"`), so the Audit/Ordani
section titles will likely fail to reveal or the page may throw — that's expected and is the
point of the A/B (isolate GSAP's scroll-time cost), not a bug in the neutralizer.

## S2 — a component 3+ screens below the fold still runs scroll-time work in this range

**Claim:** `ExitScoreboard.tsx` (mounted via `ExitRecord` in the espresso section, well below
"The Audit") sets up its own `window.addEventListener('scroll', ...)` + `resize` listener
**unconditionally on a normal top-of-page load**, not gated on the section actually being
near the viewport — so it is live and doing a `getBoundingClientRect()` read on every scroll
frame of the ENTIRE page, including the top-to-Audit range this lens is measuring, despite its
own section being off-screen the whole time.

**Evidence** (source read, `components/color-worlds/ExitScoreboard.tsx` lines 53-67):
```
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
if (!CSS.supports(...)) return;
if (
  !wentLiveThisLoad &&
  section.getBoundingClientRect().top < window.innerHeight
)
  return;
```
This guard only bails out when the section's top is ALREADY within one viewport height at
mount time (i.e., already visible or about to be) AND it hasn't gone live yet this page load.
On a normal fresh load at the top of the page, `ExitScoreboard`'s section (3 sections down) has
a `getBoundingClientRect().top` far larger than `window.innerHeight`, so this condition is
**false** and the function does NOT return — it proceeds straight into
`document.fonts.ready.then(...)`, which (once fonts resolve, normally within the first second)
attaches `scroll`/`resize` listeners and an `IntersectionObserver` that stay live for the rest
of the page's life, regardless of whether the section has ever been scrolled near.
`beatFor()`, called from the rAF-wrapped `onScroll`, does `section.getBoundingClientRect()` on
every scroll frame system-wide.

The chunk-map finding above compounds this: this component is bundled into the SAME chunk as
`Hero.tsx` (`0cum8rnfth2b5.js`), so it parses/compiles/mounts at the same time as the very
first thing on the page, not lazily when scrolled into view.

**Impact, honestly scoped:** the isolated per-call cost of `beatFor()`'s own
`getBoundingClientRect()` is cheap (not a large line item in the trace — see S1's function
list; ExitScoreboard's own chunk only shows 4.12+1.75ms of direct FunctionCall time in the one
--trace run), and `setCurrent()` no-ops once the computed beat is clamped to 0 (off-screen), so
this is NOT the dominant cost. It IS a genuine, source-confirmed contributor to
`EventDispatch | scroll` (278.69ms aggregate, S1) and `FireAnimationFrame` (70.51ms aggregate)
being aggregates of MULTIPLE listeners rather than one, and it is a real instance of
"a component runs meaningful scroll-time JS setup before it is anywhere near the viewport,"
worth naming even though I can't isolate its exact per-frame ms contribution further without
richer trace attribution than devtools' EventDispatch records provide (see "Diagnostics used").

**Neutralizer:** none available via CSS injection or URL blocking (it shares Hero's chunk, so
blocking the chunk breaks the hero) — this is a logic/gating issue, not a stylesheet or network
property. Flagging as "no neutralizer available in this evidence phase"; a real fix would need
a source change (out of scope here) to gate listener setup on actual proximity to viewport.

## Symptom: "the word loading slow" — NOT measured by this lens or the shared probe

The shared probe explicitly disclaims LCP/font-swap measurement as out of scope (see its own
header comment), and I did not build a separate instrument for it — that would need a
different probe (Resource Timing / LCP observer / font `loading`->`loaded` timestamps), which
this lens's brief did not ask me to build. The one fact from this investigation that's
adjacent (not proof) to it: the GSAP chunk backing `SplitReveal` is 122,034 bytes
(uncompressed-as-served; I did not check gzip/br wire size) and is not lazy-loaded, so it is
part of the JS the browser must fetch/parse/compile early regardless of whether any
GSAP-driven element is visible yet. I'm naming this as a data point, not a finding — reporting
a symptom this lens didn't build a probe for would be exactly the "call a surprising number
intended" mistake the brief warns against.

## Files in this folder from this pass

- `S1-script-work-during-scroll.md` — this file
- `transition-attrib.mjs` / `transition-attrib.log` — transition event attribution diagnostic
- `worldwrite-count.mjs` / `worldwrite-count.log` — raw style-mutation + viewport-height diagnostic
- `idle-check.mjs` / `idle-check.log` — no-scroll control
- `hover-artifact-check.mjs` / `hover-artifact-check.log` — synthetic-touch-point geometry check
- `trace-attrib.run1.json` / `trace-attrib.jsonl` — the one `--trace` run from the shared probe
  used for S1's function-level attribution
