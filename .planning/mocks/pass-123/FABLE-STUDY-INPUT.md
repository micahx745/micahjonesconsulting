# Pass-123 study pages: the Fable design gate (input, 2026-09-19)

Scope: FEEDS the existing theme. Changes the case-study template's top band (`/work/[slug]`, all five studies
through one template) and, once the operator ticks them, the proposed cuts. Nothing else on the site.
(LESSONS #39.)

## Your job (one call; you are the quality tier for design and copy)
Write two files, then stop. Do not edit site code, run builds or captures, or touch git.
1. `.planning/mocks/pass-123/STUDY-BRIEF.md`: the build brief for the band, in the format of
   `.claude/briefs/README.md` (its eight sections in order, and its standing clauses in Verification). GLM 5.3
   executes it verbatim in small stages (one template change, then captures), so every check is a command with
   its expected output, and every string is exact.
2. `.planning/mocks/pass-123/CUTS-PROPOSED.md`: the "fewer words" list. Per study, the sentences you would cut,
   verbatim with `file:line`, each with a one-line reason, best first, at most six per study. Straight removals
   only: nothing reworded, no new words. Mark any cut that would remove a fact found nowhere else on that page.
   The operator ticks from this list; nothing is cut until he does.

## The ruling you design inside (LESSONS #3, verbatim)
PASS-123 STUDY PAGES SCOPE, operator 2026-09-19, by popup. He ticked:
- "Band number as a poster": "The top band's result ($14M, $3M, Up to 800,000, five to ten) set at poster size
  in copper, assembling once, like /work. Lifts the 56px cap from 09-16 for that one figure. ORDANI gets no
  number."
- "Fewer words": "I list each sentence I'd cut on each study and you tick the ones to go. Nothing is reworded."
- "Guardicore photo plays the clip": "On the Guardicore study only, the band photo becomes the Tel Aviv clip for
  one beat, then rests on the photo (the same clip as /work's featured entry)."
NOT ticked: "What changed as big numbers". The body's What changed list stays as it is.
Site-wide scope (PASS-122 SCOPE, 2026-09-18): "i didnt want to change the entire site. I wanted to take the best
themes from these designs and incoporate them in our existing theme. even if it breaks some of the existing
rules etc." DESIGN_BAR R2 is amended (2026-09-19): the band figure alone may run at poster size; every other
study type keeps the 56px (1440) / 36px (390) cap.

## Fixed (do not reopen)
- Copy and facts: every visible string comes from the study's frontmatter or MDX, verbatim. If a label seems
  needed, write `[NEW COPY NEEDED: what and why]` and list it under parked decisions; I put it to him.
- RFP CONTRACT COUNT RETIRED (2026-09-19): no count of the RFP client's contracts or awards anywhere. The RFP
  lines become "$3M in signed contracts." (results.lead), "in signed contracts." (entry.line), "$3M in signed
  contracts through the platform." (What changed). This edit is being made now; design against the new strings.
- ORDANI's band gets no figure. On /work its phrase "hundreds of dollars" stays inside its line
  (`POSTER_PHRASE_SLUGS` in `app/(foyer)/work/page.tsx` is birth-worker only). ORDANI's accent is sage `#5E7158`.
- No captions on any photo or clip (standing ruling, memory "no captions").
- The clip's conditions (R12 exception, 2026-09-16): plays once, muted, inline, never loops; the real photo is
  the poster and the no-JS, reduced-motion and save-data frame; decorative (`aria-hidden`); no caption.
- Motion (PASS-122 RULES ON TRIAL): one hero number per page or section may assemble once; reduced motion gets
  the finished frame; the number is in the server HTML. Banned: cursor followers, scroll that changes speed,
  marquees, idle loops, tickers, stat bars, a new pin/sticky/parallax. No GSAP (`scripts/gsap-quarantine-gate.mjs`),
  CSS plus vanilla-JS client components, no new dependency.
- The TitleCard's 600ms settle (`components/TitleCard.tsx`, CSS `cs-settle`) is the page's signature entrance.
  Say how the poster's assembly and, on Guardicore, the clip sit around it: order, delays, durations.
- Colour: existing tokens only. The band ground is `--color-theater-ground #12100E`, type `--color-theater-ink
  #ECE3D0`. Copper `#C8542B` on that ground computes to about 4.3:1: large text only. Measure, do not trust this.
- Fonts: Bricolage Grotesque (display), Hanken Grotesk (body), JetBrains Mono (labels only).

## The design problem as I read it (you rule)
- Three titles already carry their figure: Guardicore "Repositioning Guardicore:" / "$14M, then Akamai"; RFP
  "AI RFP software:" / "$3M in signed contracts"; content engine "AI content engine:" / "up to 800,000
  impressions". Birth worker's title has none ("Growing a" / "birth worker's practice"); its poster phrase is
  "five to ten". ORDANI: none. A band that says the same number twice at two sizes is the trap, and the title may
  not be reworded. Decide which element carries the poster role, and whether your cuts list proposes removing a
  repeat so each band says its number once.
- The band today: `app/(theater)/work/[slug]/page.tsx` lines 144-198 (context, TitleCard, dek, the at-a-glance
  list ending in Results, and Guardicore's photo). CSS: `.cs-band*`, `.cs-title*`, `.cs-glance*` in
  `app/globals.css` (from about line 500). Schema: `lib/case-study-schema.ts`.
- The /work grammar to carry: `components/color-worlds/WorkFigures.tsx` and the `.cw-wx-num*` CSS (weight 200
  to 800 once, copper, sized in `cqi` from its container; its waiting state is never empty, LESSONS #40; the
  IntersectionObserver never fires on an element clipped to nothing).
- The clip: `components/color-worlds/WorkHeroClip.tsx` (the /work featured entry), media
  `public/media/work-hero-720.{webm,mp4}`, poster `work-hero-poster-960.avif`. The Guardicore band photo is
  `public/media/guardicore-band-960.jpg` (960x1200, preloaded, likely the page's LCP image). Pass-120 ruled the
  band still is the clip's frame 0: check the framing and specify the crop. The photo must stay the LCP image;
  the video may not fetch before the page's load event.
- If the brief changes a content-model field, grep every consumer (LESSONS #38; `scripts/work-entry-gate.mjs`
  reads `entry`).

## Look at
- BEFORE, live today: `.planning/qa/pass-123/study-before/<slug>-{390,1440}-{band,full,rm}.png` and
  `geometry.json` (slugs: guardicore, rfp-engine, ordani, content-engine, birth-worker).
- The grammar he approved: `.planning/qa/pass-122/work/work-before-after-390.png`, `work-after-1440.png`,
  `work-assembly-390.png`, `work-assembly-1440.png`; the home receipts
  `.planning/qa/pass-122/receipts/receipts-before-after-390.png` and `receipts-after-1440.png`.
- Briefs to copy the shape of: `.planning/mocks/pass-122/WORK-BRIEF.md` and `RECEIPTS-BRIEF.md`.
- The five studies: `content/work/{guardicore,rfp-engine,ordani,content-engine,birth-worker}.mdx`.
- Ledger: `docs/LESSONS_LEARNED.md` #3 (the PASS-122 and PASS-123 rows and every study's rows) and lessons #37
  to #40. Voice: the Voice section of `.claude/CLAUDE.md`; banned words `.claude/brand.json` `voice.banned`.

## The bar
He rejected Pass-121 on sight ("bland, word heavy, weak"). The home receipts and /work passed because they were
unmistakably louder and unmistakably the same site. For each band at 390: would a skeptical founder scrolling on
a phone stop? A tasteful but quiet result fails. So does one that stops being this site.

## Verification the brief must carry (at least)
Route JS bytes before and after for one study (`node .planning/exec/route-js-bytes.mjs
.next/server/app/work/guardicore.html`); `pnpm build` with every gate; captures before and after at 390x844
(DPR 2, mobile) and 1440x900 for all five studies, including frames before and after the poster's trigger and
the clip's beat (LESSONS #40), plus reduced-motion and JS-disabled frames; contrast of every text string on its
real ground at rest (text 4.5, large 3.0; the copper figure measured); `scrollWidth` 390 at every stop; lab LCP
for `/work/guardicore` before and after (Lighthouse mobile, three runs, median); load CLS by Chrome's session
windows; zero console errors; the visible-text diff per study before and after shows only approved cuts; the
clip plays once and never loops and rests on the photo; ORDANI's band renders no figure.

## Return
Your final message: the design in five lines, the two file paths, and anything I must put to him (copy
questions with rewrites to pick from, LESSONS #35).
