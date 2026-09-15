# Pass-119 — LCP: GSAP loads after the page, not before its first paint

Written 2026-09-15 by the ruling tier (Opus 5). Worktree `.claude/worktrees/p106-live`, branch
`design/live-evolve`. Production at writing: `main` = `c2ffb36`, `dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23`.
Executor: GLM 5.3 (`scripts/claude-glm.ps1 -Batch`), weekly quota reset 2026-09-15.

## 0. Status

- Operator 2026-09-15, verbatim: "do the LCP pass".
- Deploy is not approved by this ruling. Push, merge to `main` and deploy each need his words.

## 1. The ruling

Production Lighthouse (2026-09-15, `.planning/qa/pass-118/prod/`) shows first paint and LCP are the
same event: observed FCP = LCP = 396ms on `/` and 276ms on `/services`, unthrottled. On both routes
that paint lands after every async script has downloaded (by 168ms and 65ms) and run, so
Lighthouse's simulated mobile run charges the JavaScript to LCP: 3.1s on `/` (score 93-94) and
2.56s on `/services` (score 97). Nothing in `<head>` is render-blocking; the cost is script work
before the first frame. The only JavaScript `/` ships that `/services` does not is GSAP: chunk
`0rwchz6jjabm~.js` (114KB, GreenSock) and `0nyitqiydwg3n.js` (35KB, `useGSAP`), pulled in by
`components/color-worlds/SplitReveal.tsx`'s static imports. `/` uses `SplitReveal` for five section
titles, all below the hero. Load GSAP after the page instead: after `load`, when the browser is idle.
The animation, its timings and its trigger positions do not change. Reason: it removes the only
home-only script cost with no visible change, and `/services` shows where that leaves the score.

What this pass does not claim: LCP <= 1800ms in the simulated run. `/services` has no GSAP and sits at
2.56s; the remaining pre-paint cost is the framework bundle both routes share (react-dom 227KB and
the Next chunks). That is a separate ruling (§8).

## 2. Copy

None.

## 3. Spec

3.1 `components/color-worlds/SplitReveal.tsx` only. Keep the component's name, export, props,
defaults and rendered element exactly as they are. Replace how GSAP arrives:
- Delete the four static imports (`gsap`, `gsap/SplitText`, `gsap/ScrollTrigger`, `@gsap/react`)
  and the module-level `registerPlugin` block.
- A module-level loader, shared by every instance, returns one promise:
  `Promise.all([import("gsap"), import("gsap/SplitText"), import("gsap/ScrollTrigger")])`, then
  `gsap.registerPlugin(SplitText, ScrollTrigger)` once, resolving to `{ gsap, SplitText, ScrollTrigger }`.
  It is started only after `document.readyState === "complete"` (or the window `load` event, once),
  then inside `requestIdleCallback` with `{ timeout: 2000 }` (fall back to `setTimeout(fn, 1)` where
  `requestIdleCallback` is missing).
- In a `useEffect` (the component stays `"use client"`): if
  `matchMedia("(prefers-reduced-motion: reduce)").matches`, do nothing (static title, as today).
  Otherwise await the loader. If the component unmounted meanwhile, stop.
- Already-passed check, then the unchanged animation: parse the `start` prop's `top N%` form (the only
  form used: default `"top 75%"`, and `"top 85%"` on `#cw-build-title`). If
  `el.getBoundingClientRect().top <= window.innerHeight * N / 100`, the reader is already past the
  trigger: leave the title static and stop. Otherwise run exactly today's code: `SplitText.create(el,
  { type: "chars,words", charsClass: "cw-split__char", wordsClass: "cw-split__word" })`,
  `gsap.set(split.chars, { yPercent: 110, opacity: 0 })`, `gsap.to(split.chars, { yPercent: 0,
  opacity: 1, duration: 0.65, stagger, delay, ease: "expo.out", scrollTrigger: { trigger: el, start,
  once: true } })`.
- Cleanup on unmount: kill the tween and its ScrollTrigger, and `split.revert()`.
- Keep the file's header comment and add one line saying GSAP now loads after `load` and idle
  (Pass-119), and why. No other file changes.

## 4. Motion

No new motion and no timing change. The split reveal plays the same way when a title reaches its
trigger. Two deliberate differences, both toward less motion: a title the reader has already scrolled
past before GSAP loads stays static, and on a very fast first scroll a title can appear static instead
of animating. Reduced motion is unchanged (static). The home `$20M+` count-up is not touched.

## 5. Verification

Git Bash with `export MSYS_NO_PATHCONV=1`; exit codes read directly. The standing clauses in
`.claude/briefs/README.md` apply. Server lifecycle as in `pass-117-services-type-ladder.md` §10.3
(PowerShell `Start-Process npx.cmd`, `Stop-Process` by port). Never build while a server serves.

5.1 Before editing (baseline on the current branch):
- `npx next build --webpack` exit 0; start the server.
- `node .planning/exec/chunks119.mjs http://localhost:3200` → prints, per route (`/`, `/services`),
  every initial `<script src>` chunk with its size and whether it contains `GreenSock` or
  `gsap.registerPlugin`; last line `initial gsap chunks on /: N`. Expected on the baseline: N >= 1
  (this is the bite: the check sees today's defect).
- Lighthouse simulated, 3 runs each for `/` and `/services`, the local Lighthouse CLI:
  `node C:/tmp/p101tools/node_modules/lighthouse/cli/index.js <url> --only-categories=performance --output=json --output-path=<file> --chrome-path="C:/Program Files/Google/Chrome/Application/chrome.exe" --chrome-flags="--headless=new" --quiet`
  into `.planning/exec/lh119/before-<route>-<n>.json`. Record performance, LCP, FCP, TBT per run.
- Stop the server.

5.2 Edit per §3. Static, each exit 0: `npx tsc --noEmit` (after the build in 5.3),
`npx tsx lib/copy-lint-cli.ts`, `node scripts/gsap-quarantine-gate.mjs --self-test`,
`node scripts/gsap-quarantine-gate.mjs`, `npx prettier --check components/color-worlds/SplitReveal.tsx`.
`git diff --name-only -- . ':(exclude).planning' ':(exclude).claude'` → exactly
`components/color-worlds/SplitReveal.tsx`.

5.3 Build, serve, and check:
- `npx next build --webpack` exit 0; `npx tsc --noEmit` exit 0; start the server.
- `node .planning/exec/chunks119.mjs http://localhost:3200` → `initial gsap chunks on /: 0`.
- `node .planning/exec/reveal119.mjs http://localhost:3200` → last line `reveal119 failures: 0`. It
  checks, at 1440 with motion allowed: (R1) 3s after `load`, a GSAP chunk has been requested
  (a resource entry whose response contains GreenSock, or `.cw-split__char` appears after scrolling);
  (R2) scrolling each of the five titles on `/` to its trigger line leaves every `.cw-split__char`
  at opacity 1 and no transform 1.5s later; (R3) with `prefers-reduced-motion: reduce`, no
  `.cw-split__char` exists after scrolling all five; (R4) jumping to the bottom of `/` at
  DOMContentLoaded, before GSAP loads, then waiting 4s: the titles above the viewport have no
  `.cw-split__char` (they stayed static). Run it once on the 5.1 baseline build first and record which
  checks fail there (R1 and R4 are expected to differ).
- Lighthouse simulated, 3 runs each, into `.planning/exec/lh119/after-<route>-<n>.json`.
  Expected: `/` median performance >= 95, `/` median LCP lower than its 5.1 median, `/services`
  median performance within 1 point of its 5.1 median.
- `node .planning/exec/type117.mjs http://localhost:3200` → `type117 failures: 0`;
  `node scripts/render-gate.mjs` exit 0; `node scripts/axe-worlds.mjs http://localhost:3200 / /services /packages`
  exit 0; `node scripts/layout-gate.mjs http://localhost:3200` exit 0;
  `bash .planning/exec/card1-115.sh http://localhost:3200` → `card1 failures: 0`;
  `node .planning/exec/circle115.mjs --p116 --out .planning/qa/pass-119/circle` → its failures line 0.
- Stop the server.

The two scripts (`chunks119.mjs`, `reveal119.mjs`) are written from this section by Sol before
execution; the executor does not change them.

## 6. Rejected

- Deferring Lenis. `useLenis` is consumed by `components/TitleCard.tsx` and
  `components/CaseStudySidebar.tsx`; mounting it later changes their scroll bridge.
- Replacing SplitReveal with a CSS animation. That is a motion change, and GSAP-after-load removes the
  cost without one.
- Removing Vercel Analytics or Speed Insights. They already load after `load` (324ms on production),
  so they do not sit before the first paint.
- Dropping `experimental.viewTransition`, or moving Nav, WorldSwitcher or ScrollReveal to server
  components. Possible later levers on the shared framework cost, each a design or motion ruling (§8).
- `next/dynamic` with `ssr: false` around each title. It would drop the server-rendered heading text.
- Claiming or chasing LCP <= 1800ms simulated in this pass.

## 7. Return conditions

The executor commits by explicit pathspec (`components/color-worlds/SplitReveal.tsx`, the two scripts,
`.planning/qa/pass-119`) after `git diff --cached --name-only`, subject
`Pass-119: GSAP loads after load and idle (home LCP)`, and does not push. The judge reads the
Lighthouse medians before and after and the reveal checks. Astra takes one look only if a capture
shows a visible difference. Deploy on the operator's words, then production Lighthouse simulated x3 on
`/` and `/services` and the chunk check on both domains.

## 8. Parked operator decisions

- LCP <= 1800ms in the simulated run needs work on the framework bundle both routes share (client
  components in the layouts, the view-transition runtime). Each option changes design, motion or
  architecture. Field LCP from Vercel Speed Insights is the better arbiter of whether it is worth it.
