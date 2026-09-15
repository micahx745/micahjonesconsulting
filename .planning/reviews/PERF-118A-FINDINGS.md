# Pass-118a findings: what shifts the home headline, and what holds LCP

Measured 2026-09-14 on production (dpl_GTqjwEgFe6NZoLCrTa7mmAfjLeAC, Pass-117 live) with
`.planning/exec/perf118a.mjs` (written by Sol from brief §2, §3, §8) and the local Lighthouse
13.4.1 CLI. Probe emulation: 412x823 at 1.75x, mobile, touch, CPU 4x, 150ms latency, 1.6 Mbps
down, cache off, a fresh browser context per load, 6s settle after load.

## Bite proof

`bite: PASS`: a planted 200px block read CLS 0.243 on 3 of 3 loads, source `header#top`
(`.planning/qa/pass-118a/bite.log`).

## A correction to the probe's own CLS line

The probe's printed summaries read CLS 0.000 everywhere. That number is wrong for this purpose.
It excluded every shift Chrome flagged `hadRecentInput: true`, and under device emulation Chrome
flags the font-swap shifts that way although no input is sent. The same shift reads 0.14702 in the
probe and 0.147024 in Lighthouse's `layout-shifts` audit, which counts it. The tables below come
from `.planning/exec/perf118a-tables.mjs`, which reads `probe.json` directly and counts every
shift. Probe CLS is the sum of all shifts; Lighthouse uses session windows, so its totals are
lower (0.182 against 0.290) while the source and the top shift match.

## Q1 and Q2: probe, 10 loads per condition on `/`, 5 on `/services`

A baseline · B web fonts blocked · C JavaScript off · D reduced motion. Times in ms from navigation start.

| cond | loads | CLS all shifts min/med/max | loads >0.05 | flagged-input shifts | top source (dy) | shift t med | class t med | fonts t med | LCP med | LCP node |
|---|---|---|---|---|---|---|---|---|---|---|
| q1-A | 10 | 0.290 / 0.290 / 0.290 | 10 | 30 | h1.cw-h1.cw-shift (dy 12) x10 | 2189 | 2917 | 2679 | 2184 | span x10 |
| q1-B | 10 | 0.000 / 0.000 / 0.000 | 0 | 0 | none | none | 2309 | 2048 | 1952 | span x10 |
| q1-C | 10 | 0.121 / 0.292 / 0.297 | 10 | 22 | h1.cw-h1.cw-shift (dy 12) x7; div.cw-cta-row (dy -31) x2 | 1963 | not reported | not reported | 1935 | span x10 |
| q1-D | 10 | 0.290 / 0.290 / 0.290 | 10 | 30 | h1.cw-h1.cw-shift (dy 12) x10 | 2170 | 2843 | 2665 | 2164 | span x10 |
| q2-A | 5 | 0.037 / 0.037 / 0.037 | 0 | 15 | div.cw-sv-open__proof (dy -33) x5 | 1641 | 2247 | 2203 | 1628 | a.cw-door__case.cw-sv-open__case x5 |
| q2-B | 5 | 0.000 / 0.000 / 0.000 | 0 | 0 | none | none | 1538 | 1381 | 1380 | a.cw-door__case.cw-sv-open__case x5 |
| q2-C | 5 | 0.037 / 0.037 / 0.037 | 0 | 15 | div.cw-sv-open__proof (dy -33) x5 | 1052 | not reported | not reported | 1055 | a.cw-door__case.cw-sv-open__case x5 |
| q2-D | 5 | 0.037 / 0.037 / 0.037 | 0 | 14 | div.cw-sv-open__proof (dy -33) x5 | 1643 | 2255 | 2214 | 1648 | a.cw-door__case.cw-sv-open__case x5 |

On `/` the top shift moves `h1.cw-h1` 12px down while `p.cw-sub` and `div.cw-cta-row` move 12px up
in the same event (raw record, q1-A load 1).

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

- `/`: reduced motion 2164 against baseline 2184 (20ms). JavaScript off 1935 (249ms earlier).
  Fonts blocked 1952 (232ms earlier). The reveal does not hold LCP.
- `/services`: reduced motion 1648 against 1628 (20ms later). JavaScript off 1055 (573ms
  earlier). Fonts blocked 1380 (248ms earlier). The reveal does not hold LCP; JavaScript costs
  about 0.57s here.

## Mechanism

1. The home CLS is the web-font swap: 10 of 10 normal loads shift (0.290), 10 of 10 with web fonts blocked do not (0.000), and the shift survives JavaScript off and reduced motion.
2. It lands at about 2.19s, with LCP (2.18s): the hero block changes height when Bricolage and Hanken replace their Arial fallbacks, so the centred headline drops 12px and the lines under it rise 12px.
3. Fonts load with `display: swap` and next/font `adjustFontFallback` (`lib/fonts.ts`); the generated Arial override (Bricolage size-adjust 105.43%) does not hold the hero's Bricolage 800 display setting. `/services` has the same cause at 0.037, under the bar.
4. The entrance reveal and the `$20M+` count-up are not the cause of either metric (reduced motion changes LCP by 20ms and CLS by 0).
5. LCP is held by the fonts (about 0.23s on both pages) and by JavaScript (0.25s on `/`, 0.57s on `/services`).
