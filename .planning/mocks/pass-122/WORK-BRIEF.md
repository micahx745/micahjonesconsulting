# Pass-122 build brief: /work, evolved in the existing theme (2026-09-18)

**Scope: FEEDS the existing theme. Changes ONE page: the /work index (`app/(foyer)/work/page.tsx`, the
`.cw-wx*` CSS it uses, and at most one new client component for the moving numbers). The study pages
(`/work/[slug]`), the home and every other page stay exactly as they are. Do not touch
`components/color-worlds/RevenueFigure.tsx`, `ExitRecord.tsx`, `ExitScoreboard.tsx`, or the `.cw-rec` /
`.cw-exits` CSS: they belong to the home receipts section, which is finished.** (LESSONS #39.)

## Why
The operator rejected Pass-121's /work design (the hand-drawn exhibits) on sight: "bland, word heavy, weak".
On 2026-09-18 he ruled that the redesign research feeds the EXISTING site: "I wanted to take the best
themes from these designs and incoporate them in our existing theme. even if it breaks some of the
existing rules". He approved the home receipts section built that way (`e2df56e`, before/after at
`.planning/qa/pass-122/receipts/receipts-before-after-390.png`) and asked for "the same treatment for /work
($14M, $3M, 800,000) with before/after for you" (LESSONS #3 "PASS-122 RECEIPTS VERDICT AND THE FIRST CUT").
Themes he ticked (LESSONS #3 "PASS-122 THEMES AND FIRST PAGE"): poster-size numbers; numbers that assemble
once as you scroll to them; fewer words (cuts PROPOSED to him, never made). The bar: louder than today,
unmistakably the same site. Look at the receipts section on the home first and carry its grammar here.

## Two standing rulings this page has never received (both ledgered, both binding)
1. **THE /WORK HEADER — operator 2026-09-16** (LESSONS #3), verbatim: "the header setence above the actual
   case studies looks weak ... Maybe we just replace that with a header ... I would ratehr have just a
   basic description of whats below with a small thing (beautiful design) to click to a featured case
   study." So: /work opens on a heading plus a plain description of what the page holds, and ONE small,
   designed entry into a featured study (Guardicore, the study the Tel Aviv clip belongs to). This
   supersedes today's opening (the lead study at hero scale beside the clip). The method line may no
   longer open /work.
2. **THE HEADING AND DESCRIPTION — operator 2026-09-17** (LESSONS #3 "PASS-121 DIRECTION AND /WORK
   HEADING"), exact, already in `content/work-page.ts`: `WORK_HEADING` = "The work, on the record."
   (renders uppercase via CSS, as the record heading "Also on the record." does) and `WORK_DESCRIPTION`.
   Render both from that file. Do NOT use `DOORWAY_LINK` ("Read this one first"): it was never approved
   and the doorway it belonged to was rejected. The featured entry's words come from the study's own
   approved `entry` fields (context, figure, line); if you believe it needs a new label, render
   `[NEW COPY NEEDED: what and why]` in the page and report it.

## What to build
- **The opening**: heading + description, then the small featured entry into Guardicore. The Tel Aviv
  clip (`WorkHeroClip`, the R12 exception of 2026-09-16: plays once, muted, never loops, the photo is the
  poster and the no-JS/reduced-motion/save-data frame, no caption) may stay as part of that featured entry,
  smaller than today. "Small" is his word; "beautiful design" is his bar.
- **The studies**: every published study's entry (from its frontmatter `entry`: context, figure + line,
  did, service label) gets the receipts grammar: its figure at poster size (`$14M`, `$3M`,
  `Up to 800,000`; for birth worker the line's own phrase `five to ten` may carry the poster role via
  `figurePhrase`; ORDANI has no numeral figure and must not be given one), assembling once as it arrives
  (Bricolage weight, as on the home), in copper where the ground allows AA large text (measure it), with
  the line under it as one unit. The whole entry stays a link to its study (`ViewTransitionLink`), and the
  existing work-entry gate must still find `figure + " " + line` in the page's visible text.
- **The record block** ("Also on the record.", the four exits with roles) and the closing cross-link
  line stay; restyle them only as far as the page needs to read as one piece.
- **Fewer words**: make NO cut. List, in your report, each string you would cut (verbatim) and why. The
  method line is the first candidate (its ruling says it may not open /work; it may stay lower or go).
- Engine: CSS and vanilla JS client components, no GSAP, no new dependency; transform, opacity,
  font-variation-settings, clip/mask only. Reduced motion and no JS: the finished frame, every number
  real in the server HTML, nothing pinned.
- The page's world stays `bone` (paper) unless a section clearly needs a darker ground from the EXISTING
  Color Worlds tokens; no new colours, no new fonts.

## Hard bans
- No new copy. Every visible string is from `content/work-page.ts` or the studies' frontmatter, verbatim.
- No diagrams of the work: no boxes, arrows, flows, node graphs (the 2026-09-18 hold).
- No retired figures in any spelling (the retired-phrases gate); no "$610.4M"; no "behind the work".
- No gradients, glow, purple; no cursor followers, marquees, idle loops.
- A check can fail the work; never edit content or design to pass a check (LESSONS #37).

## Verification (numbers, not adjectives)
1. Before editing: `node .planning/exec/route-js-bytes.mjs .next/server/app/work.html` (BEFORE; the
   Pass-121 baseline was 665757). After: `pnpm build` passes every gate (including work-entry-gate);
   record AFTER bytes.
2. `pnpm start -p 3234` (stop it after; confirm the port is free). Capture 390x844 (DPR 2, mobile) and
   1440x900 with puppeteer-core (`createRequire("C:/tmp/p101tools/package.json")`, Chrome at
   `C:/Program Files/Google/Chrome/Application/chrome.exe`, headless, no --disable-gpu): the opening, then
   every 0.5 viewport down to the footer, plus the moment each figure assembles; reduced-motion and
   JS-disabled frames at 390. Capture the LIVE https://www.micahjonesconsulting.com/work the same way as
   BEFORE. Save to `.planning/qa/pass-122/work/`; compose `work-before-after-390.png` (row 1 before, row 2
   after, labelled) and `work-after-1440.png`. Open every frame and every sheet.
3. Contrast of every text string against its real ground at rest (>= 4.5 body, >= 3 large); copper
   figures measured against the actual ground.
4. `scrollWidth` 390 at every stop; zero page errors (the two /_vercel 404s under next start are known).
5. The visible text of /work BEFORE vs AFTER: every string added or removed, verbatim.
