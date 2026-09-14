# Pass-118a — Speed diagnosis, measure only: what shifts the home headline, and what holds LCP

Written 2026-09-14 by the ruling tier (Opus 5). Worktree `.claude/worktrees/p106-live`, branch
`design/live-evolve`. Executor: a Sonnet leg or GLM 5.3 (it needs a browser, so not Sol). No
site code changes in this pass. Pass-118 (the fix) is ruled from this pass's findings.

## 0. Status

Operator 2026-09-14, verbatim: "measure, go with your recommendations, and push". The
recommendation was to measure home and /services and, if either missed the bar, brief a speed
pass. Measured the same day on production (dpl_BuNe67xzMiEGEEi4hKSXCSyHdrsw) with the local
Lighthouse 13.4.1 CLI, mobile, simulated throttling, 3 runs each:

| URL | Perf runs | Median LCP | CLS | TBT | LCP element |
|---|---|---|---|---|---|
| / | 89, 88, 94 | 3050ms | 0.145, 0.145, 0.000 | 3ms | `h1.cw-h1 > span.cw-line > span` (reveal span) |
| /services | 97, 97, 97 | 2563ms | 0.001 | 10ms | `a.cw-door__case.cw-sv-open__case` |

The bar (`.claude/CLAUDE.md` Definition of done): Performance >= 95, LCP <= 1800ms, CLS <= 0.05.
Home fails all three; /services fails LCP. The whole CLS is one source, `h1.cw-h1.cw-shift`, and
only in 2 of 3 runs. FCP is about 1065ms on both pages while the observed (unthrottled) LCP render
delay was about 0.3s, so the 2.5-3s LCP may be Lighthouse's simulation rather than what paints.

## 1. The ruling

Diagnose before fixing. The shift is intermittent, and the two likely LCP causes sit on recorded
motion: the hero entrance reveal (`globals.css` `.cw-js-reveals .cw-h1 .cw-line > span`, 0.35s,
R15) and the `.cw-js-reveals` root class that `components/color-worlds/ScrollReveal.tsx` adds on
mount. A fix picked now would guess, and a wrong guess removes approved motion. This pass answers
three questions with numbers, then stops.

## 2. Questions, each answered with a table

Probe: one script, `.planning/exec/perf118a.mjs`, puppeteer-core from
`C:/tmp/p101tools/package.json`, Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`.
Emulate Lighthouse mobile: viewport 412x823, deviceScaleFactor 1.75, mobile and touch on, CPU
throttle 4x (`Emulation.setCPUThrottlingRate`), network latency 150ms, 1.6 Mbps down, 750 Kbps up
(`Network.emulateNetworkConditions`), cache disabled. Each load records, from a
`PerformanceObserver` injected with `evaluateOnNewDocument` (buffered): every `layout-shift` entry
(value, startTime, hadRecentInput, each source's node selector, previousRect and currentRect);
every `largest-contentful-paint` entry (renderTime, size, element selector and first 40 chars);
the time `.cw-js-reveals` lands on the root (a `MutationObserver`); `document.fonts` loadingdone
time. Wait 6s after load before reading.

Q1. What moves `h1.cw-h1` on `/`? 10 loads per condition on the live URL:
- A baseline;
- B web fonts blocked (request interception aborts `*.woff2`);
- C JavaScript disabled (`page.setJavaScriptEnabled(false)`);
- D reduced motion (`prefers-reduced-motion: reduce`).
Table: condition, loads, CLS min / median / max, loads with CLS > 0.05, the top shift's source
selector, its rect delta (dy, dh), its startTime, and whether it lands within 100ms of the root
class mutation or of fonts loadingdone.

Q2. What paints LCP, and when, on `/` and `/services`? The same A to D conditions, 5 loads each:
LCP renderTime median and element. Then the Lighthouse CLI with real throttling, 3 runs per URL:
`node C:/tmp/p101tools/node_modules/lighthouse/cli/index.js <url> --only-categories=performance --throttling-method=devtools --output=json --output-path=<file> --chrome-path="C:/Program Files/Google/Chrome/Application/chrome.exe" --chrome-flags="--headless=new" --quiet`
Table: URL, method (simulate from §0, devtools), Perf, LCP, CLS, per run and median.

Q3. Is the hero reveal what holds LCP? Answer from Q2 in one line per page: LCP time with JS off
versus on, and with reduced motion versus baseline. A gap under 150ms means the reveal does not
hold LCP.

## 3. Verification of the probe itself (LESSONS #26: prove it bites)

Before any real run, point the script at `/` with an injected shift: `evaluateOnNewDocument`
inserts a 200px-tall block above `main` 800ms after DOMContentLoaded. Expected: CLS > 0.1 on
every one of 3 loads, with the injected block's neighbour named as the source. If it reads 0,
the probe is broken: stop and report.

## 4. Deliverable

- `.planning/reviews/PERF-118A-FINDINGS.md`: the bite proof line, the Q1 and Q2 tables, the Q3
  lines, and a last section "Mechanism" of at most 5 lines stating what the numbers show and
  nothing they do not. No fix proposals beyond naming the mechanism.
- `.planning/qa/pass-118a/probe.json`: the per-load records (small, not Lighthouse reports).
- Lighthouse JSON reports go to `.planning/exec/lh118a/`, which stays uncommitted.

## 5. Rejected

- Changing any site file in this pass.
- Removing or shortening the hero reveal, the `$20M+` count-up or ScrollReveal. Those are
  recorded motion; changing them needs a ruling on evidence.
- Preloading fonts, inlining CSS, or `content-visibility` before the mechanism is known.
- PageSpeed Insights as the measurement: a different Lighthouse build and hardware, so not
  comparable to §0.
- Estimating any number. A metric the tool does not report is written "not reported".

## 6. Return conditions and commit

The ruling tier reads the findings file and writes Pass-118 (the fix). Commit by explicit
pathspec after `git diff --cached --name-only` (LESSONS #23):
`git commit -F <msg> -- .planning/exec/perf118a.mjs .planning/reviews/PERF-118A-FINDINGS.md .planning/qa/pass-118a/probe.json`
Subject: `Pass-118a: speed diagnosis on / and /services (measure only)`. Do not push.

## 7. Parked operator decisions

- Field data: Vercel Speed Insights shows real-visitor LCP and CLS for these pages. Only the
  operator can read the dashboard; if he pastes the 75th-percentile LCP and CLS for `/` and
  `/services`, it outranks every lab number here.
