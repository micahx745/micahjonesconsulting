# Pass-118a findings: what shifts the home headline, and what holds LCP

Measured 2026-09-14 on production (dpl_GTqjwEgFe6NZoLCrTa7mmAfjLeAC, Pass-117 live) with
`.planning/exec/perf118a.mjs` (written by Sol from brief §2, §3, §8) and the local Lighthouse
13.4.1 CLI. Probe emulation: 412x823 at 1.75x, mobile, touch, CPU 4x, 150ms latency, 1.6 Mbps
down, cache off, a fresh browser context per load, 6s settle after load. Round 2 of this file:
Sol's independent read (`.planning/reviews/SOL-118A-READ.md`) corrected round 1; every
correction below was re-verified against `probe.json` before adoption.

## Bite proof

`bite: PASS`: a planted 200px block read CLS 0.243 on 3 of 3 loads, source `header#top`
(`.planning/qa/pass-118a/bite.log`).

## Two corrections to how the numbers were read

1. The probe's printed CLS reads 0.000 everywhere, and every stored `cls` is 0. It excluded each
   shift Chrome flagged `hadRecentInput: true`. The probe sends no click, tap, key, mouse or scroll
   (only emulation and navigation), every natural shift is flagged, and the planted bite shift was
   not. Lighthouse counts the same event: 0.147024 on `h1.cw-h1` in both the probe (q1-A load 1)
   and `home-devtools-1.json`, whose culprit audit names web-font loading. So the tables count
   every shift. This is an emulated-lab estimate, not a standards-filtered CLS.
2. The probe total (0.290) is higher than Lighthouse's (0.182) because the later shifts differ,
   not because of session windows. q1-A load 1 has three shifts inside one 476ms window (2167.4,
   2427.5, 2643.0ms: 0.147024 + 0.001097 + 0.141678 = 0.2898). Lighthouse's run 1 records the
   matching 0.147 plus 0.026230 and 0.008280 (0.1815).

## Q1 and Q2: probe, 10 loads per condition on `/`, 5 on `/services`

A baseline · B web fonts blocked · C JavaScript off · D reduced motion. Times in ms from
navigation start. Medians are conventional (mean of the two middle values for 10 loads).

| cond | loads | CLS all shifts min/med/max | loads >0.05 | flagged-input shifts | top source (dy) | shift t med | class t med | fonts t med | LCP med | LCP min-max | LCP node |
|---|---|---|---|---|---|---|---|---|---|---|---|
| q1-A | 10 | 0.290 / 0.290 / 0.290 | 10 | 30 | h1.cw-h1.cw-shift (dy 12) x10 | 2194 | 2918 | 2679 | 2190 | 2156-2328 | span x10 |
| q1-B | 10 | 0.000 / 0.000 / 0.000 | 0 | 0 | none | none | 2310 | 2048 | 1954 | 1920-2012 | span x10 |
| q1-C | 10 | 0.121 / 0.292 / 0.297 | 10 | 22 | h1.cw-h1.cw-shift (dy 12) x7; div.cw-cta-row (dy -31) x2; h1 (dy 60) x1 | 1974 | not reported | not reported | 1939 | 1839-2060 | span x10 |
| q1-D | 10 | 0.290 / 0.290 / 0.290 | 10 | 30 | h1.cw-h1.cw-shift (dy 12) x10 | 2172 | 2844 | 2666 | 2166 | 2144-2228 | span x10 |
| q2-A | 5 | 0.037 / 0.037 / 0.037 | 0 | 15 | div.cw-sv-open__proof (dy -33) x5 | 1641 | 2247 | 2203 | 1628 | 1628-1644 | a.cw-door__case.cw-sv-open__case x5 |
| q2-B | 5 | 0.000 / 0.000 / 0.000 | 0 | 0 | none | none | 1538 | 1381 | 1380 | 1364-1404 | a.cw-door__case.cw-sv-open__case x5 |
| q2-C | 5 | 0.037 / 0.037 / 0.037 | 0 | 15 | div.cw-sv-open__proof (dy -33) x5 | 1052 | not reported | not reported | 1055 | 1035-1131 | a.cw-door__case.cw-sv-open__case x5 |
| q2-D | 5 | 0.037 / 0.037 / 0.037 | 0 | 14 | div.cw-sv-open__proof (dy -33) x5 | 1643 | 2255 | 2214 | 1648 | 1624-1672 | a.cw-door__case.cw-sv-open__case x5 |

The home sequence, q1-A load 1: at 2167.4ms `h1.cw-h1` moves down 12.3px, `p.cw-sub` moves down
12.3px while shrinking 24.6px, and `div.cw-cta-row` moves up 12.3px (0.147). At 2643.0ms the h1
moves down 47.6px while shrinking 38.3px and the CTA row shrinks 57px (0.142). In q1-C the same
geometry arrives batched differently (loads 4 and 6 split it 39ms apart; load 8 lands it in one
0.121 event). No image or hero-photo source appears in any shift. The probe kept only the tag name
of the home LCP node (`span`); Lighthouse identifies it as the headline "FROM DEMO TO PRODUCTION.".
`fonts t` is `document.fonts.ready`, which resolves after the last font; the final shift of each
load lands 15-23ms before it.

## Q2: Lighthouse, real (devtools) throttling, 3 runs per URL

| URL | method | run | Perf | LCP | CLS | FCP | TBT |
|---|---|---|---|---|---|---|---|
| / | devtools | 1 | 71 | 3341 | 0.182 | 3341 | 276 |
| / | devtools | 2 | 71 | 3353 | 0.182 | 3353 | 271 |
| / | devtools | 3 | 72 | 3245 | 0.182 | 3245 | 271 |
| /services | devtools | 1 | 92 | 2691 | 0.037 | 2691 | 48 |
| /services | devtools | 2 | 92 | 2692 | 0.037 | 2692 | 43 |
| /services | devtools | 3 | 91 | 2673 | 0.021 | 2673 | 115 |

Simulated throttling (brief §0, prod dpl_BuNe): `/` 89, 88, 94 with LCP 3050 median and CLS
0.145, 0.145, 0.000; `/services` 97, 97, 97 with LCP 2563. Lighthouse's devtools settings add
562.5ms request latency against the probe's 150ms, so absolute LCP differs by method; compare
conditions within one method.

## Q3: does the hero reveal hold LCP?

- `/`: reduced motion 2166 (2144-2228) against baseline 2190 (2156-2328): the ranges overlap.
  Fonts blocked 1954 (1920-2012) and JavaScript off 1939 (1839-2060) are earlier.
- `/services`: reduced motion 1648 (1624-1672) against 1628 (1628-1644): overlap. Fonts blocked
  1380 (1364-1404) and JavaScript off 1055 (1035-1131) are earlier and do not overlap baseline.
- The reveal class lands 652-744ms after the first shift on `/` and 593-614ms after it on
  `/services`, so it arrives after LCP. The reveal does not hold LCP in these page-load runs.

## Mechanism

1. The shifts are web-font arrivals: 10 of 10 normal home loads shift (0.290) and 10 of 10 with web fonts blocked do not; the shift survives JavaScript off and reduced motion, and Lighthouse's culprit audit names web-font loading.
2. The fonts arrive in steps about 0.5s apart: the first reflows the sub line and moves the headline 12px at ~2.19s (with LCP), a later one shrinks the headline 38px. `/services` shows the same cause at 0.037, under the bar.
3. Fonts load `display: swap` with next/font's generated Arial fallbacks (`lib/fonts.ts`). That those fallback metrics miss the hero's display settings is the likely reason, but these runs do not isolate it.
4. The entrance reveal does not hold LCP and moves no shift. The `$20M+` count-up was not exercised (the probe never scrolled), so it is untested here, not cleared.
5. LCP waits on the fonts (about 0.23s earlier with them blocked, both pages) and separately on JavaScript (0.25s on `/`, 0.57s on `/services`); which JavaScript work is not isolated.
