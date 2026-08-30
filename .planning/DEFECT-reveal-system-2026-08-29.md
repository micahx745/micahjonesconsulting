# DEFECT — the scroll-reveal system is dead in production (2026-08-29)

Operator report: "animations arent working". CONFIRMED. Evidence below is from
Playwright against the LIVE site, `reducedMotion: 'no-preference'`, 1440x900.

## Measurement
```
supportsViewTimeline : true
wrapperHasJsReveals  : true
total .cw-reveal     : 24
withIsIn             : 0
belowFold            : 24
belowFoldWithIsIn    : 0
sample (1096px, 1300px, 2622px below the fold):
  opacity=1  animation-name=cw-scroll-reveal  animation-timeline=view()
```
Scroll sweep at 0 / 25 / 50 / 75 / 95%, both `reduce` and `no-preference`:
`hidden-reveals = 0/24` at EVERY position. Console errors: none.

## Diagnosis
Three overlapping reveal systems exist; two are inert.

1. **Native scroll-driven path** (`app/globals.css` ~3296, inside
   `@supports (animation-timeline: view())`). This is what is LIVE.
   `CSS.supports` is true in every modern browser, so this block always wins.
   The animation is attached but permanently resolves to its END state, so
   every element sits at `opacity: 1` and nothing ever fades in.
   Tested and REFUTED: `animation-duration: 1ms` -> `auto` changes nothing,
   so duration is not the cause. Suspect `view()` scroll-container
   resolution, possibly interacting with Lenis. UNRESOLVED — fix-time work.
2. **IntersectionObserver fallback** (`components/color-worlds/ScrollReveal.tsx`,
   `.cw-reveal` -> `.is-in`). Logic is CORRECT (`withIsIn: 0` proves it is not
   over-firing) but it is permanently overridden by (1).
3. **`components/RevealMount.tsx` — entirely DEAD CODE.** It queries
   `[data-reveal]` and adds `.scroll-reveal--shown`. There are ZERO
   `data-reveal` attributes in `app/` or `components/`; the only three grep
   hits are inside RevealMount's own source and comments. It mounts in the
   root layout on every page and does nothing but add a body class.

## NOT broken
The scroll-driven palette works: `--cw-bg` moves
`#9E3C25 -> #ECE3D0 -> #2A1F18 -> #9E3C25` across the page in both modes.

## Compounding factor on the operator's own machine
`HKCU:\Control Panel\Desktop\WindowMetrics\MinAnimate = 0` — Windows
"Show animations" is OFF, so every browser on that machine reports
`prefers-reduced-motion: reduce` and the site correctly suppresses motion
BY DESIGN. He is seeing the real defect AND his own OS setting at once.

## Design question this raises (for the redesign plan)
A meaningful share of real users browse with reduced motion on. A design whose
impact depends on motion fails all of them. The reduced-motion state must be
designed, not merely tolerated.

## Gate to add when fixed
`@supports` blocks that override a working fallback are invisible to every
static check — build, tsc, lint, and axe all pass. Any `@supports` override of
a motion path must be verified by MEASURING the overridden state in a real
browser at both `reduce` and `no-preference`, not by reading the CSS.
Same class as LESSONS #7 and #8: the probe reported identical results for the
working and the broken state.
