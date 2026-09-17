# Pass-120 motion approval (motion-engineer)

Written approval for brief `.claude/briefs/pass-120-work-page.md` §6.8 condition 1 and §1.4 return
condition 4. Date 2026-09-16. Two motions are up for approval: SETTLE and CLIP. Nothing else is
approved or added here.

This file is the only thing I wrote. I made no source edits and ran no build, no server start and
no git writes. Judged from the worktree's `.claude/brand.json` (the Pass-120 version; main's copy is
older, LESSONS #31).

**My own probe.** I ran a read-only puppeteer probe (Chrome 153.0.8010.47) against the running
:3200 build. It measured `document.getAnimations()` on direct loads and ran 2 reduced-motion loads
of /work/ordani at 1440. The :3200 server stopped partway through, before the probe's
client-navigation leg. I did not stop it and did not restart it. For the client-navigation
timeline I rely on the existing M4 line in `.planning/qa/pass-120/build/postfix/template120.txt:52`.

---

## 1. SETTLE: the study title settle entrance

### What I checked

- `components/TitleCard.tsx:1-39`
  - Server component. No `"use client"` and no animation import.
  - Lines render as `.cs-title__line`, keyed `${i}-${line}`, so the spans stay stable across re-renders.
  - The judge's F2 is at `:24-33`: a hyphenated word is wrapped in `.cs-title__nb`. This is markup only.
  - The served /work/ordani h1 (curl on :3200) is `<span class="cs-title__line">ORDANI: <span class="cs-title__nb">HIPAA-compliant</span></span> <span class="cs-title__line">CRM for birth workers</span>`. The h1 and the spans have no inline style.
- `app/globals.css`
  - `:654-656` `.cs-title__line { display: block }` and `:657-659` `.cs-title__nb { white-space: nowrap }`. Neither is animated.
  - `:720-731` is the only `animation:` declaration on `.cs-title__line`, inside `@media (prefers-reduced-motion: no-preference) and (scripting: enabled)`. The delay rules are at `:724-730`.
  - `:732-737` `@keyframes cs-settle` sets only a `from` frame: `opacity: 0; transform: translateY(12px)`.
- `lib/case-study-schema.ts:63`: `titleLines` is `.min(1).max(3)`. So `:nth-child(2):last-child`, `:nth-child(2):not(:last-child)` and `:nth-child(3)` cover every legal title.
- The F2 span sits inside a line, not beside one, so it doesn't change the `:nth-child` count. Comment nodes don't count either. Measured below: the line-2 delay is 200ms on /work/ordani, the only study with the span.
- `git diff 73dde08 -- .claude/brand.json`
  - `motion.signature` matches brief §4.6 word for word, and the files are `components/TitleCard.tsx` and `app/globals.css`.
  - `motion.view_transition` now reads 900ms, which matches `app/globals.css:310`.
- Brief §4 (lines 2496-2680): §4.1 timings, §4.2 fallbacks, §4.3 CLS, §4.4 removals, §4.5 forbidden list.
- Removals, by grep of `components app lib`:
  - No `ScrollTrigger`, `pin: true`, `PIN_DISTANCE_PX` or GSAP import remains in code, apart from the recorded `SplitReveal.tsx` exception.
  - The only hits are stale comments in `components/LenisProvider.tsx:14-30` about the retired TitleCard bridge.

### Measured timeline (the judge asked for `getAnimations()`, not screenshots)

The probe read `document.getAnimations()` at DOMContentLoaded on the served build:

| Route, width | combined media query | animations on `main h1` | line 1 | line 2 | after 1200ms |
|---|---|---|---|---|---|
| /work/guardicore 1440 | true | 2 | `cs-settle` 400ms, delay 0, fill backwards, 1 iteration | 400ms, delay 200 | 0 animations, both lines `1/none` |
| /work/ordani 1440 | true | 2 | 400 / 0 | 400 / 200 | 0, `1/none` |
| /work/ordani 390 | true | 2 | 400 / 0 | 400 / 200 | 0, `1/none` |

- **Keyframes.** Each animation's keyframes were `{0: opacity 0, translateY(12px)}` and `{1: opacity 1, none}`, each with easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Transitions.** The lines' computed transition was `all 0s`, so nothing else moves them.
- **Client navigation into a study.** M4 got `[[400,0],[400,200]]` (`postfix/template120.txt:52`).
- **No-JS finished frame.** T16 passes on all 10 route/width pairs, opacity 1 (`postfix/page120.txt:240-249`).

The spec holds line for line:
- Each line rises 12px and fades in over 400ms on cubic-bezier(0.16, 1, 0.3, 1).
- Line 2 starts at 200ms, so the entrance ends at 600ms.
- Only transform and opacity move. S4 confirms: filter, clip-path, font-size and letter-spacing each held one value.
- It is gated on both media features.
- There is no pin and no scroll coupling.
- It does not replay. S5 scrolled to the bottom and back and resized to 1200 and back: 0 non-final frames on all 10 pairs, both runs.
- CLS: S7 at most 0.0049.

The painted S2 windows (408-534ms) are shorter than 600ms because the curve lands within the
sampler's 0.5px / 0.01 tolerance before the animation ends. That is expected.

The judge's first-preview §2 describes "a 100ms delay on line 2 of a two-line title". The spec,
the CSS and the measurement all say 200ms. That sentence is a misreading. The code is right.

### S6 blip: my ruling

**Evidence.** Run 1 flagged 2 non-final frames of 175 on /work/ordani 1440 under reduced motion.
Nothing flagged in run 2, in the 3 reduced position-probe loads reported to me (I didn't see a
file for those), or in my own 2 reduced loads. My 2 loads read the combined media query as
`false`, found 0 animations on the h1 subtree at DOMContentLoaded, and found 0 non-final frames.

**Ruling: not the settle, and it doesn't block.** The reasons:

1. **The CSS can't run under reduced motion.** The only animation declaration is inside the gate
   at `globals.css:720-722`, and under `reduce` the gate measured `false` with 0 animations.
2. **The shape is wrong for the settle.** Its shortest run is 400ms, which painted 21-28
   non-final frames in S1 on every pair. Two frames is roughly 33ms.
3. **The sampler catches layout events, not just motion.**
   - It starts at DOMContentLoaded (`settle120.mjs:96`), before fonts resolve. My probe read
     `document.fonts.status === "loading"` at the first sampled frame on both reduced loads.
   - It flags any h1 descendant that moves more than 0.5px (`settle120.mjs:6-8`, `:140-141`).
   - All three faces use `display: "swap"` (`lib/fonts.ts:37,56,71`).
   - So a font swap or an early layout shift in the first frames trips it without any animation.
   - Run 1 was also the only run with CLS on /work/ordani 1440 (S7 0.0049 with 1 shift; run 2
     0.0000). That was a separate load, but it shows the route moved intermittently in run 1 with
     motion out of the picture.

The mechanism stays unidentified, and I am not claiming it. The most likely cause is a layout event
(a font swap or a shift), not motion.

### Notes (not conditions)

- The comments in `components/LenisProvider.tsx:14-30` still describe the retired
  Lenis↔ScrollTrigger bridge. Add them to the RC3 doc sweep, next to the stale `.claude/CLAUDE.md`
  GSAP lines the judge already listed.
- Arriving through the dim: see section 3. The judge accepted the veiled first line, and I agree.

### Conditions (these do not reopen the verdict)

- **S1 (follow-up gate, before the CARD 1 live re-run of settle120).** Give S6 a direct mechanism
  check so the next blip becomes a diagnosis:
  - Under reduced motion, at DOMContentLoaded, `matchMedia("(prefers-reduced-motion: no-preference) and (scripting: enabled)").matches` is `false`.
  - Also at DOMContentLoaded, `document.getAnimations()` filtered to `main h1` has length `0`.
  - Any non-final frame prints the element's class, its opacity, left and top deltas, and `document.fonts.status`.
  - Pass rule: the two mechanism checks decide S6. A non-final frame with 0 animations is reported
    as layout, not failed as motion.

APPROVED: settle

---

## 2. CLIP: the /work hero clip under the DESIGN_BAR R12 exception

### What I checked

- `components/color-worlds/WorkHeroClip.tsx:1-88` is identical to brief §3b.4 (lines 3314-3414).
  - Served tag, curl on :3200: `<video class="cw-wx-lead__clip" width="720" height="900" poster="/media/work-hero-poster-960.avif" preload="none" muted="" playsInline="" disablePictureInPicture="" disableRemotePlayback="" aria-hidden="true" tabindex="-1">`. It has no `autoplay`, `loop` or `controls`, and no `<track>`.
  - Gates: reduced motion `:31`, Save-Data `:34`, 2g and slow-2g `:35`. Arms only after `load` (`:59-60`).
  - One-shot IntersectionObserver with `threshold: 0` that disconnects on the first intersection (`:42-56`).
  - Once per document via the module flag (`:21`, `:30`, `:44`, `:47`). A refused `play()` is not retried (`:50-52`).
- `docs/DESIGN_BAR.md:204`: the R12 exception. /work only, plays once, muted, no loop, poster for no-JS, reduced motion and Save-Data, no caption, and this approval required.
- `brand.json` `motion.heroclip` (the diff above) and brief section 1 O6 (lines 54-72): the last 0.5s dissolves back to frame 0, giving 98 frames and 4.083s.
- Brief §3b.7 (lines 3866-3931): crop, byte budgets, preload strategy.
- `app/(foyer)/work/page.tsx:52-56`: `preload(HERO_POSTER, { as: "image", type: "image/avif", fetchPriority: "high" })`. Served in the head as `<link rel="preload" href="/media/work-hero-poster-960.avif" as="image" type="image/avif" fetchPriority="high"/>` (curl).
- Nothing else on /work moves.
  - The page imports only `OpeningWorld`, `PageFooter`, `WorkHeroClip` and `ViewTransitionLink` (`:16-24`).
  - No `animation` or `transition` is declared in any `cw-wx` rule in `app/globals.css`.
  - `[data-mode="cw"] .cw-wx-lead__media` (`:6276-6283`) is an exact 4:5 box on espresso. `.cw-wx-lead__clip` (`:6289-6297`) is `object-fit: cover` at `50% 50%`, so the browser doesn't crop a second time.

### What the evidence shows

**Plays once.** From `rc4/clip120.txt`:
- C3: the clip ended 4170.8ms (1440) and 4111.7ms (390) after load, with `played.length 1`, start 0, end 4.084.
- It rests after ending: max channel diff 0 over about 1.8s.

**Once per document across navigation.** From `rc4/clipnav120.txt`, N1-N8 all pass:
- One play event.
- After a client navigation to /work/rfp-engine and Back, in the same document, the remounted
  video read `{"played":0,"paused":true}`.

**Rests on the photograph.** `work-lead-hero-clip-lastframe-motion-1440.png` shows the real frame at
rest. The judge's F5 records the O6 end-state SSIM as 0.9928 / 0.9936 (threshold 0.97). The frame
held after play is frame 0, not a generated frame.

**Reduced motion and Save-Data.** C4 and C5 never play (`played.length 0`) and rest on the poster.

**No-JS (C6).** I agree with the judge's acceptance. The served element has no `controls`
attribute; Chrome shows its own controls when scripting is off. Any play is started by the user,
once, with no loop. That is not autoplay and not a replay.

**Bytes (C7).** WebM 115,333, MP4 210,176, poster 13,412, all inside the §3b.7 ceilings. C8 and C9
pass (no raw source committed, no caption).

**Checked against the refusals:**
- **Not a loop.** `loop` is false and `played.length` is 1. The O6 dissolve back to frame 0 returns
  the image to rest; it is not a cycle.
- **No scroll coupling.** The IntersectionObserver is a one-shot start trigger with no progress
  mapping and no scrub, and it disconnects after firing. At 390, where the frame can be below the
  fold, the clip starts once when it enters view. That is the same class of trigger as the
  recorded countup, not scroll-jacking.
- **No replay.** The module flag holds for the document's life. A full reload is a new document
  load, which is the ruled definition.
- **Not a second signature.** The signature is the study-page settle. The clip is media playback on
  /work only, recorded as an operator exception (`DESIGN_BAR.md:204`, `motion.heroclip`), and
  nothing else animates on /work. It is not a precedent. My standing answer to any further
  generated or animated imagery is no.

### Loading strategy: is anything wrong? No.

- **The poster is the LCP element and paints at first paint.** In all three build runs
  (`.planning/exec/lh120/work-{1,2,3}.json`, Lighthouse 13.4.1), unthrottled:
  - Observed LCP equals observed FCP: 223/223, 220/220 and 234/234ms.
  - `lcp-discovery-insight` reports the LCP node as `VIDEO`, with `fetchpriority=high applied: true`, `discoverable in initial document: true`, and `not lazy: true`.
  - The poster request ran at High priority and finished by 12ms.
  - The base's image preload got "fetchpriority=high should be applied: false", so the build is better on that item.
- **Playing the video creates no later LCP entry.**
  - The WebM request starts at 222-223ms, at Low priority.
  - Observed LCP stayed at FCP even in run 3, where the media request (222ms) came before FCP (234ms).
  - That matches the brief's reasoning: the first video frame is the same size as the poster.
- **`preload="none"` works.** The only media request is the one that starts at play time.
- **"After load" is the right gate.** On localhost, `load` (103-111ms) fired before first paint, so
  the WebM request landed in the first-paint frame. On a real network `load` comes well after first
  paint, and the request is Low priority either way. It never competes with the poster.
- **Lab LCP is not my gate.** The +70.8ms median (3083.9 vs 3013.1ms) is inside the base's own
  run-to-run spread (3002-3099ms). The operator's A4 rules on LCP, as instructed.
- Two small notes, not conditions:
  - The poster is AVIF only. A browser without AVIF (Safari before 16) shows the espresso box until
    the clip plays, and keeps it under reduced motion or Save-Data. The share is small.
  - The reduced-motion preference is read once, at mount (`:31`). If a visitor turns it on after
    load but before the frame scrolls into view, the clip would still play. Negligible, and the
    file is spec'd verbatim.

### Conditions (a record fix, not code; these do not reopen the verdict)

- **C1.** `.claude/brand.json` `motion.heroclip.description` says "the 4.04s image-to-video clip".
  That is the source's length (4.0417s, 97 frames). The served clip is 98 frames and 4.084s (C3),
  and its last 0.5s dissolves back to frame 0 (O6). The brand.json writer should correct it before
  the ship commit to: "the 4.08s image-to-video clip (98 frames; its last 0.5s dissolves back to
  frame 0, so the held last frame is the poster)".
- **C2.** The same description ends "Ships only with the motion-engineer's written approval and a
  measured mobile LCP within 1800ms". The operator's A4 ruling (Speed Insights p75 for /work after
  release) now governs LCP. The record should say so in the operator's wording, so that nobody
  reading brand.json blocks the ship on a lab number the operator has retired. I am not writing
  that wording; A4 decides it.

APPROVED: clip

---

## 3. Proposal, not a condition: arriving through the dim

This needs the operator's word. No approval above depends on it.

**Mechanism.** `components/view-transition-link.tsx:62` calls
`document.startViewTransition(() => router.push(target))`. The callback doesn't wait for the route
to commit. So `::view-transition-new(root)` becomes the live document, and the study's h1 is
inserted whenever its payload arrives.

**Effect.** Where the settle lands inside the 900ms cross-fade depends on the network and on
prefetch, not on a fixed timeline. The s8 sheet shows one case: line 1 lands under the double
exposure, and line 2 lands visibly between 346 and 450ms. On a prefetched production route the
whole settle can land under the veil. On a slow link it can land after the dim ends.

**The old-out-then-new-in sequence alone doesn't fix this.** Moving the two fades apart inside
900ms removes the legible double exposure at the midpoint. It still leaves the settle's start
tied to the commit.

**If the operator wants the title to settle visibly on every arrival,** there's a precedent in
this stylesheet. The retired WallChart held its scene during the dissolve (`app/globals.css:5357-5370`):

```css
html:active-view-transition .cs-title__line { animation-play-state: paused; }
```

- This holds each line at its start frame while the dim runs, then plays the unchanged 400ms/200ms
  settle once the dim ends.
- The dim stays 900ms and the settle stays 600ms. On a client arrival they run in sequence, so the
  title is complete within about 1.5s of the click.
- Direct loads have no active view transition and are unchanged.
- The visible change is that the band dims in before its title appears. That is a change to what
  the eye sees, so it is the operator's call.
- My recommendation is to ship Pass-120 as ruled and offer this as a follow-up option.
