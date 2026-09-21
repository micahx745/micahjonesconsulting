# Pass-128 — WORLD GROUND lens (--cw-bg/--cw-fg/--cw-accent)

EVIDENCE ONLY. Nothing under app/, components/, lib/, content/, public/, scripts/, or any
config was edited. All numbers below are from the LIVE site
(https://www.micahjonesconsulting.com/, deploy dpl_Bk18zCfBqPb2DjTrkozL2dBs7git) via the
shared probe `.planning/qa/pass-128/scroll-probe.mjs`. Trace runs are n=1 each (attribution
only, per the task brief's own caution: three investigators run on this machine at once, so
absolute timings are contaminated by CPU contention — do not read single-run deltas as
confirmed effect sizes). Raw traces: `trace-w1.run1.json` (baseline), `trace-nograin.run1.json`
(grain/vignette hidden). Scratch trace-bucketing script: `analyze-trace.mjs` (not a deliverable).

## How --cw-bg/--cw-fg/--cw-accent reach pixels

- `components/color-worlds/WorldSwitcher.tsx:66-71` — `setWorld()` writes all three as
  **inline style properties on the single `[data-mode="cw"]` div**, which is the entire page's
  root wrapper (`app/(foyer)/layout.tsx:35,46-48` — one div wraps `<Grain/> <Nav/>
  <WorldSwitcher/> <ScrollReveal/> <main>{children}</main>`). Every page section, the fixed nav,
  and the grain/vignette overlays are descendants of this one element.
- `app/globals.css:1232-1250` — the root rule: `--cw-bg`/`--cw-fg`/`--cw-accent` declared with
  defaults, then `background-color: var(--cw-bg); color: var(--cw-fg);` with
  `transition: background-color 0.7s cubic-bezier(0.16,1,0.3,1), color 0.7s cubic-bezier(0.16,1,0.3,1);`
  — this is the ONE crossfade the code intends.
- `var(--cw-bg)`, `var(--cw-fg)`, `var(--cw-accent)` are then read again in **40+ separate
  selectors** across `app/globals.css` (buttons, focus rings, nav, footer, pill CTAs, labels,
  the exits scoreboard, etc. — see grep hits at lines 1547/1567/1571/1634-1635/2185-2287/2384/
  2485/3188-3189/3481/3679-3688/3876-3941/4239-4250/4476-4494/5117/5364/5481/6969-7543/8286-8294).
  Custom-property changes on an ancestor force style recalculation on every descendant that
  references the property — this is a page-wide invalidation, not a local one, every time
  WorldSwitcher writes.
- Full-viewport texture layers, all inside the SAME `[data-mode="cw"]` tree, all
  `position: fixed; inset: 0` (i.e. present and painting on every scroll frame of the ENTIRE
  page, not just at a world boundary):
  - `app/globals.css:1430-1471` — `.cw-grain` (coarse SVG feTurbulence, `mix-blend-mode: overlay`,
    opacity .16) + `.cw-grain__fine` (SVG feTurbulence, `mix-blend-mode: multiply`, opacity .42)
    + `.cw-grain__halftone` (CSS radial-gradient, `mix-blend-mode: multiply`, opacity .07). All
    three `100vw × 100vh`, `z-index: 9998`. Mounted once at `app/(foyer)/layout.tsx:39`
    (`<Grain />`, `components/color-worlds/Grain.tsx`).
  - `app/globals.css:1477-1489` — `[data-mode="cw"]::after`, a fourth full-viewport
    `position: fixed` layer (radial-gradient vignette, `mix-blend-mode: multiply`, `z-index: 9997`).
  - `components/color-worlds/Nav.tsx` + `app/globals.css` `.cw-nav` — the nav is also
    `position: fixed` (implied by "fixed top nav", `app/(foyer)/layout.tsx:19`) and uses
    `mix-blend-mode: difference` by default (wordmark inverts against the current world), only
    flattening to `mix-blend-mode: normal` past `scrollY > 40` (`Nav.tsx:81`, `.cw-nav.is-scrolled`
    at `app/globals.css:1629-1639`).
  - No section in the reported segment (hero → doors → Audit) paints a competing background of
    its own; sections rely on inheriting the root's `background-color`. One section elsewhere
    (ExitScoreboard's clip figure, further down at "espresso") DOES paint its own ground
    independently — see S2 below — same bug class, different location, not in the reported
    segment.

## Trace attribution (n=1, cpu=4 throttle, top→"The Audit")

Baseline run (`trace-w1.run1.json`), frames=283, worldSwitchCount=2
(`#9E3C25 → #ECE3D0 → #9E3C25`), framesOver33ms=46:

| event | totalMs |
|---|---|
| UpdateLayoutTree | 532.9 |
| FunctionCall | 421.08 |
| EventDispatch | 358.9 |
| Paint | 310.79 |
| Layerize | 82.9 |
| FireAnimationFrame | 72.51 |
| PrePaint | 55.45 |

Bucketing `UpdateLayoutTree`/`Paint`/`FunctionCall`/`EventDispatch` into 200ms windows
(`analyze-trace.mjs`) shows this cost is NOT one spike at each of the two world-switch moments —
it is a **sustained ~50-70ms-per-200ms-window** (i.e. roughly 10-14ms of style recalc on every
single frame) across two multi-hundred-ms bursts that track the two touch-swipe segments, with
individual `UpdateLayoutTree` events of 11-15ms recorded back-to-back, once per animation frame,
for the whole scroll gesture — not two isolated events. That per-frame recurrence, not a one-off
spike, is what a throttled phone would feel as continuous choppiness, independent of the color
switch itself.

## Hypotheses

**W1 — CSS-custom-property cascade off the world-switch write (scroll-not-smooth,
colour-switch-glitchy).**
Claim: `WorldSwitcher.tsx:66-71` writes 3 inherited custom properties on the single ancestor
that wraps the whole page; because 40+ descendant selectors reference `var(--cw-fg)`/
`var(--cw-bg)`/`var(--cw-accent)` (see file:line list above), each write is a page-wide style
invalidation, not a local one. Evidence: `UpdateLayoutTree` is the single largest bucket in the
trace (532.9ms of ~4s) and it recurs every frame during active scroll rather than only twice
(see bucketing above) — consistent with continuous forced recalculation, not two discrete
events. Confidence: MEDIUM (n=1 trace; the per-frame recurrence pattern is also consistent with
R1 below, and the two are not mutually exclusive — a small cascade recalculated every frame by
a forced synchronous layout is the more precise mechanism; see R1).
Neutralizer: `css:[data-mode="cw"] section[data-world] { content-visibility: auto; contain-intrinsic-size: 1200px; }`
— shrinks the subtree that must actually recompute per write to whatever's near-viewport; if
`UpdateLayoutTree` drops materially with this alone, it confirms the cost scales with total
descendant count, not with anything scroll-position-specific.

**R1 — Forced synchronous layout from an always-on, page-wide scroll listener whose own
section is off-screen (scroll-not-smooth).**
Claim: `components/color-worlds/ExitScoreboard.tsx:439` (`window.addEventListener("scroll",
onScroll, { passive: true })`) attaches unconditionally once the section "goes live" — and the
go-live guard (`ExitScoreboard.tsx:63-67`, `if (!wentLiveThisLoad && section.getBoundingClientRect().top < window.innerHeight) return;`)
only skips going live when the section is ALREADY on-screen at mount. On a fresh top-of-page
load (this probe's exact scenario) the section is far below the fold, so the guard evaluates
false and go-live proceeds anyway — meaning the listener is attached and firing
(`onScroll` → rAF → `beatFor()` → `section.getBoundingClientRect()`, `ExitScoreboard.tsx:393-396`)
on every scroll frame of the ENTIRE page, long before the user is anywhere near that section.
Any `getBoundingClientRect()` read forces the browser to complete a pending style/layout
computation synchronously rather than deferring it to the next paint; when this read is
interleaved, same frame, with WorldSwitcher's custom-property write on the shared ancestor
(W1), it forces that whole-page recalc to happen NOW, every single scroll frame, instead of
being batched once per rendering lifecycle. Evidence: same `UpdateLayoutTree` per-frame
recurrence as W1 — this is the more specific mechanism for why it happens on literally every
frame rather than only near the two switch moments. Confidence: MEDIUM — plausible from reading
the code path, not yet isolated in a trace (no clean CSS/URL neutralizer exists for a JS
listener; disclosed as a dead verification leg, not silently skipped).
Neutralizer: none available in `css:`/`block:` form — this is a JS event-listener behavior, not
a stylesheet or a fetchable resource, and production JS chunks aren't reliably named
`ExitScoreboard` in a blockable URL substring. A real A/B needs a repo-level change (out of
scope for this evidence-only pass); flagging for the fix-round brief instead of forcing a
poor-fit neutralizer.

**S1 — Full-viewport, fixed, mix-blend-mode grain/vignette stack recomposites every scroll
frame across the whole page (scroll-not-smooth, general — not specific to the world switch).**
Claim: `.cw-grain__coarse`, `.cw-grain__fine`, `.cw-grain__halftone` (`app/globals.css:1430-1471`)
and `[data-mode="cw"]::after` (`app/globals.css:1477-1489`) are four `position: fixed; inset: 0`
layers, `z-index` 9997-9998, each with a `mix-blend-mode`, present on every route under this
layout for the site's whole scroll. `mix-blend-mode` layers must be recomposited against
whatever is now visible beneath them as the page scrolls, every frame, for as long as they're
mounted — this is a permanent per-frame cost, not something that only fires at a color switch.
Evidence (n=1 A/B, `--inject-css` hiding these four layers, cpu=4): `Layerize` dropped
82.9ms → 66.87ms (~19% down) with the layers hidden; `Paint` was essentially flat (310.79 →
308.68) and `UpdateLayoutTree` was NOT lower (532.9 → 582.3, actually up) with n=1 each side —
given the disclosed CPU-contention caveat and n=1, this is a WEAK/PARTIAL signal: real
Layerize cost tied to these layers, but they are evidently not the dominant source of the
UpdateLayoutTree cost (that traces to W1/R1 instead). Report as unconfirmed pending an n=3 A/B.
Confidence: LOW-MEDIUM (single run each side).
Neutralizer: `css:[data-mode="cw"] .cw-grain, [data-mode="cw"] .cw-grain__coarse, [data-mode="cw"] .cw-grain__fine, [data-mode="cw"] .cw-grain__halftone, [data-mode="cw"]::after { display: none !important; }`
(saved as `.planning/qa/pass-128/ab-hide-grain.css` — reusable as-is with `--inject-css`).

**W2 — Nav's own colour crossfade runs at a different duration than the root's, plus a hard
(non-transitionable) blend-mode flip, right at the top of the page (colour-switch-glitchy).**
Claim: the fixed nav (`components/color-worlds/Nav.tsx`) tracks `window.scrollY > 40`
(`Nav.tsx:81`) and, once past it, swaps `mix-blend-mode: difference` for a solid chip:
`app/globals.css:1629-1639`, `.cw-nav.is-scrolled { ... background: var(--cw-bg, ...); color:
var(--cw-fg, ...); transition: background 0.25s ease-out, color 0.25s ease-out; }` — a
**0.25s** fade, versus the root's **0.7s cubic-bezier(0.16,1,0.3,1)** fade
(`app/globals.css:1246-1248`) for the SAME two CSS variables. `mix-blend-mode` itself cannot be
transitioned (it's a discrete property), so the difference→normal swap at the 40px threshold is
an instantaneous pop, not an eased change. 40px of scroll happens almost immediately on any
scroll gesture, meaning this nav-chip pop and duration mismatch are live for effectively the
entire "top → doors → Audit" segment the operator described. Two elements animating the same
color value on different clocks, one of them popping outright, reads exactly as "the background
color switching doesn't change smoothly... kind of glitchy" — and it is positioned at the very
top of the viewport, where a thumb-scrolling eye is anchored. Confidence: HIGH (directly
observable in the CSS, exact durations quoted, no trace needed to establish the mismatch itself
— though the trace's `EventDispatch`/`FunctionCall` totals are also consistent with Nav's rAF
scroll handler running throughout).
Neutralizer: `css::is([data-mode="cw"]) .cw-nav.is-scrolled { transition: background 0.7s cubic-bezier(0.16,1,0.3,1) !important, color 0.7s cubic-bezier(0.16,1,0.3,1) !important; }`
— aligns the nav chip's fade to the root's; A/B this against baseline and ask the operator
whether the perceived "glitch" changes.

**G1 — GSAP SplitText/ScrollTrigger char-reveal on the Audit section's own headline fires
concurrently with the world-switch crossfade back to terracotta, in the exact section the
operator named (colour-switch-glitchy, scroll-not-smooth, both at once).**
Claim: `components/color-worlds/SplitReveal.tsx` (the one recorded GSAP exception) is mounted
directly inside the `#offer` / `data-world="terracotta"` section — `app/(foyer)/page.tsx:219-221`,
`<SplitReveal as="h2" id="cw-offer-title">Two weeks to know what to fix first.</SplitReveal>` —
which is the SAME section the probe targets as "The Audit." `SplitReveal.tsx:62-96`: GSAP
`ScrollTrigger` (`start: "top 75%", once: true`) splits the heading into one `<span>` per
character and animates each (`yPercent 110→0, opacity 0→1`, 0.012s stagger, 0.65s duration,
`expo.out`) the first time the section nears the viewport — i.e. right as WorldSwitcher is also
mid-crossfade back to terracotta for this same section. Two independent animation systems
(GSAP's ticker + ScrollTrigger's own scroll listener, and the CSS custom-property crossfade)
are doing per-frame work on the same section at the same moment. Trace: `FunctionCall`
(421.08ms, 2nd-highest bucket) and `EventDispatch` (358.9ms) are concentrated in the SAME
200ms windows as the second `UpdateLayoutTree` burst (the one nearest the target, per
`analyze-trace.mjs` bucketing) — consistent with GSAP's ticker/ScrollTrigger contributing to
that FunctionCall total, though the trace does not attribute FunctionCall to a specific script
(disclosed limitation). Confidence: MEDIUM (mounting location and mechanism are certain; the
FunctionCall attribution to GSAP specifically is inferred from timing correlation, not proven).
Neutralizer: `block:gsap` — blocks any request whose URL contains "gsap"; TESTABLE BUT UNVERIFIED
whether Next.js's production build actually names a chunk with that substring (GSAP may be
inlined into a shared vendor chunk instead, in which case this neutralizer would fail closed —
i.e. either it 404s the whole vendor chunk, breaking the page, or it matches nothing and the
A/B shows no effect for the wrong reason). Check the chunk list in Network before trusting a
null result from this neutralizer.

**S2 — Same bug class as W2, different location, NOT in the reported segment (colour-switch-glitchy, low priority for this ticket).**
Claim: `app/globals.css:3936-3939`, `.cw-rec__floor { position: absolute; inset: 0; background:
var(--cw-bg); mix-blend-mode: lighten; }` (inside ExitScoreboard's clip-figure, "espresso"
section) declares NO `transition` of its own. CSS transitions are not inherited — if `--cw-bg`
changes while this element is on-screen, its background snaps instantly while the root fades
over 0.7s, the identical "seam" mechanism as W2. This section is further down the page (after
the Audit, at "espresso"/"$20M+"), so it is NOT part of the "between the top and the Audit"
segment the operator reported, but it is the same defect pattern and worth the same fix if the
fix-round touches this. Confidence: HIGH for the code fact, LOW relevance to THIS ticket's
segment.
Neutralizer: `css:[data-mode="cw"] .cw-rec__floor { transition: background 0.7s cubic-bezier(0.16,1,0.3,1) !important; }`

## "The word loading slow" — out of scope for this lens

No WORLD GROUND evidence (custom-property cascade, grain/vignette, nav crossfade, GSAP char
reveal) plausibly explains text appearing to load slowly — those are paint/composite/recalc
costs on already-rendered text, not text-visibility timing. The shared probe's own header
already scopes LCP/font-swap timing out as a separate instrument (`scroll-probe.mjs:20-24`).
Not investigated further here; flagging rather than guessing.

## Caveats / dead legs

- All trace numbers are n=1 per condition. The task's own calibration found a 1-frame /
  fractional-ms noise floor at n=3 identical runs; a single-run A/B (S1) cannot be read as
  confirmed — it needs an n=3 rerun before anyone treats "Layerize -19%" as real.
- Three investigators run on this machine concurrently (per task brief) — absolute ms values
  in any one trace are contaminated by CPU contention; only the relative bucket-to-bucket shape
  within one trace (used for W1/R1's "per-frame, not per-switch" finding) is safe to lean on.
- R1 has no `css:`/`block:` neutralizer — reported as a dead verification leg rather than forced
  into an ill-fitting one.
- G1's `block:gsap` neutralizer is unverified against the actual production chunk map; treat a
  null result from it as inconclusive, not as ruling G1 out, until the chunk name is confirmed.
