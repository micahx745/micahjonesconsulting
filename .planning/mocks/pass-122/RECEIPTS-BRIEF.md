# Pass-122 build brief: the home receipts section, evolved (2026-09-18)

**Scope: FEEDS the existing theme. Changes ONE section of ONE page: the receipts part of the home page's
espresso section (`app/(foyer)/page.tsx`: the `The receipts.` h3, `<RevenueFigure />`, `<ExitRecord />`,
and the CSS those use). Everything else on the home page and on every other page stays exactly as it is.**
(LESSONS #39: a direction is never built without its scope.)

## Why
The operator rejected Pass-121 as "bland, word heavy, weak". Pass-122's research proposed three whole-site
directions; he picked Kinetic Editorial, then ruled (LESSONS #3 "PASS-122 SCOPE", verbatim): "i didnt want
to change the entire site. I wanted to take the best themes from these designs and incoporate them in our
existing theme. even if it breaks some of the existing rules etc." He ticked four themes for it and picked
this section first (LESSONS #3 "PASS-122 THEMES AND FIRST PAGE"):
1. **Poster-size numbers**: "$20M+ ... and the exit values set far bigger, each the image of its section,
   in Bricolage and your colours."
2. **Numbers that move**: "Each big number assembles once as you scroll to it, and the four exits step
   through like a scoreboard. Reduced motion shows them finished."
3. **Clip inside $20M+**: "The Tel Aviv clip plays inside the $20M+ numerals for one beat, then they settle
   into your copper."
4. **Fewer words**: "Paragraphs cut down to one-line captions under the numbers. Every cut shown to you
   before it's made; no rewording."
The bar before any rule: would this section stop a skeptical founder scrolling on a phone? It must be
unmistakably LOUDER than today, and unmistakably the same site.

## The existing theme (keep it)
Color Worlds (`app/globals.css`): this section's world is `espresso` (`--color-cw-espresso #2a1f18`);
copper is the accent (`--accent-copper #C8542B`, and the tokens around it). Faces: Bricolage Grotesque
(display, `lib/fonts.ts`, today variable weight + `opsz`), Hanken Grotesk (body), JetBrains Mono (labels
only, via the existing label classes). No new font, no new colour: every colour is an existing token. The
existing `HandCircle` around $20M+ is part of the theme: keep it if it still earns its place after the clip,
drop it only if it fights the clip, and say which.

## Reference (ideas, not code to copy)
`.planning/mocks/pass-122/tile-1-numeral/` (judged best of three; `review/sheet-390-bricolage.png`,
`review/sheet-1440-bricolage.png`) shows $20M+ edge to edge with the clip inside and the exits as a
scoreboard. The judges' findings on it are the traps to avoid here:
- The dark parts of the footage vanished into a dark ground, so the numerals broke apart. Lift the footage
  inside the letters (e.g. `grayscale(1) contrast(.5) brightness(1.6)` or equivalent) so every glyph reads
  as a whole shape at >= 3:1 against espresso through the whole beat, and in the fallback frame.
- The "+" read as an orphan beside a huge M: "M+" is one unit.
- Squeezed inactive exit values became unreadable ("$600IVI"): every value reads as its string in every
  frame (floor any squash at ~0.6; never below the font's width floor).
- Half a phone screen of empty ground while the ledger waited: no 390 frame in the run is more than ~25%
  empty ground.
- One exit (SurveyMonkey) never got a frame: all four get a comfortable scroll range as the current one.

## What to build
- **$20M+** at poster size: at 390 it fills the content width (two lines `$20` / `M+` is fine), at 1440 it
  spans the content width on one line. `In revenue behind my work` sits directly under it as one unit.
- **Arrival**: when the figure comes into view, the Tel Aviv clip (`public/media/work-hero-720.mp4` /
  `.webm`, poster `work-hero-poster-960.avif`) plays ONCE, muted, inline, inside the numerals (an SVG/CSS
  mask or a multiply knockout inside an isolated box; LESSONS #7), then the numerals settle to solid copper.
  The video is not fetched until the figure is near (preload none, start on intersection); the home hero's
  LCP must not move. This REPLACES the Pass-114 count-up (`RevenueFigure`, brand.json `motion.countup`);
  the new arrival is the one hero-number move for this section.
- **The four exits** (`ExitRecord`, data from `content/citations.ts` EXITS_COMBINED_VALUE, sorted as
  today): a scoreboard. The block holds (sticky) while the visitor scrolls through four beats; in each beat
  one exit is current at poster size with its company and outcome, and the others stay legible as a
  ledger. Driven by scroll position only: no snap, no speed change, no autoplay. Each value assembles once
  as it becomes current (Bricolage weight and, if you add the `wdth` axis to the font load, width; measure
  the font bytes added and report them).
- **Fewer words**: this section is already mostly numbers. Make NO cut. Instead list, in your report, every
  string in the section you would cut and why. The operator decides; nothing is reworded.
- Engine: CSS and vanilla JS in client components. No GSAP (the quarantine gate stays), no new dependency.
  Transform, opacity, font-variation-settings, clip/mask only; no layout thrash.
- **Reduced motion** and **no JS**: the finished frame. Solid copper $20M+ (no video), the four exits as a
  static legible ledger, nothing pins. Every real number is in the server HTML.
- Accessibility: the figure keeps an accessible name equal to what is on screen (LESSONS #33); the video is
  decorative (`aria-hidden`), no captions (operator ruling); the scoreboard reads in DOM order as the four
  exits.

## Hard bans
- No new copy. Every visible string in the section is one that is live there today, verbatim.
- No retired figures in any spelling (the retired-phrases gate enforces it); no "$610.4M", no "behind the
  work".
- No gradients, glow, purple; no cursor followers, marquees, idle loops; the clip never loops.
- No change outside the scope above. If a shared CSS rule must change, scope the change to this section.
- A check can fail the work; never edit content or design to pass a check (LESSONS #37). Report raw numbers.

## Verification (report measured numbers)
1. Before editing: `node .planning/exec/route-js-bytes.mjs` for `/` against the current `.next` (record as
   BEFORE). After: `pnpm build` must pass every gate; record `/` JS bytes AFTER and the font bytes added.
2. `pnpm start -p 3231` (your own port; stop it when done). Capture at 390x844 (DPR 2, mobile) and 1440x900:
   the section at arrival, at 0.5s, 2s and 3.5s into the clip, after the settle, and at each of the four
   scoreboard beats; plus reduced-motion and JS-disabled frames. Open every frame and fix what is wrong.
3. Contrast: glyph interior vs espresso on the three clip frames (>= 3:1), copper numerals on espresso,
   and every text string in the section at rest (>= 4.5 body, >= 3 large).
4. 4x CPU throttle at 390 through the clip and the scoreboard: frames over 16.7ms and over 50ms.
5. `scrollWidth` at 390 is 390 at every stop. Zero console errors.
