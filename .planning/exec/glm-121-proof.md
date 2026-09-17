You are the GLM executor for Pass-121 on micahjonesconsulting.com, working in the git worktree at
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live (call it W). This is a QUALITY PROOF,
not the build. The operator asked whether hand-drawn diagrams for his case studies can be made at real
quality in code, or whether it will look like clip-art. Your job is to produce the best honest answer: two
static HTML mocks and their screenshots.

HARD LIMITS
- Write ONLY under W/.planning/mock/pass-121/proof/. Never edit app/, components/, content/, lib/, public/,
  docs/, .claude/. Never run pnpm build or a dev server. Never commit, push or deploy.
- No emoji, no em-dashes, no stock images, no icons, no people drawn, no fills in drawings, no gradients,
  no rough.js or any sketch library (its look reads as a template). Hand-author the SVG paths.
- Copy strings exactly as given below. Do not write new copy.

READ FIRST (in W)
1. .planning/reviews/FABLE-121-G2.md sections 3.1, 3.2, 3.3, 4.1, 4.3 and 7 (Direction C). This is the spec.
2. components/hand/HandCircle.tsx: how the site's hand-drawn circle gets its hand quality (two overlapping
   passes, a primary stroke plus a shorter overshoot stroke at 0.85x width and 0.55 opacity, slight path
   irregularity, an feTurbulence fractalNoise baseFrequency 0.85 + feDisplacementMap scale 0.9 filter,
   non-scaling stroke). Copy its circle path data for the $14M circle, and use the SAME technique for every
   line in the diagram: boxes are open single strokes that overshoot a little at one corner, lines wobble
   slightly (never ruler-straight, never cartoonish), arrows are a line plus a two-stroke head.
3. app/globals.css: tokens. Use these values: paper #f5efe4, ink #1a1816, ink-soft #3a3631, theater ground
   #12100e, theater ink #ece3d0, copper #bd5a2d, copper-deep #8a3d24, rule #d9d2c4, hover 200ms
   cubic-bezier(0.2, 0.8, 0.2, 1).

FONTS: Google Fonts link for Bricolage Grotesque (opsz axis, weights 400-800), Hanken Grotesk (400-600),
JetBrains Mono (400-500).

MOCK 1: W/.planning/mock/pass-121/proof/work-fold.html (the top of the new /work page)
- Bone paper ground #f5efe4 with a subtle grain (an SVG feTurbulence noise overlay at low opacity is fine).
- A minimal nav line like the live site: "MICAH/JONES" left; SERVICES WORK ABOUT CONTACT right, mono, small.
- Heading, uppercase Bricolage at max opsz, weight 800, 96px at 1440 / 48px at 390, tight leading:
  THE WORK, ON THE RECORD.
- Description, Hanken 20px (17px at 390), max 60ch:
  Four client engagements and the company I founded: $14M in revenue for a security company, $3M in contracts from an RFP engine, a content engine that peaked at 800,000 impressions in a month, a birth worker's practice rebuilt, and ORDANI. Each page says what I found, what I built, and what changed.
- The featured doorway (G2 section 3.2), one block, hairlines above and below in #d9d2c4, no border, no card:
  mono 14px: Guardicore, acquired by Akamai
  $14M at 56px Bricolage with the hand circle around it (static)
  22px: in revenue, sourced and closed, at a $1.2M average enterprise deal.
  18px: I ran the research that found what those buyers were actually signing for, moved the story from honeypots to east-west visibility, and sat in the deals.
  mono 14px: Positioning & GTM
  mono 14px uppercase: READ THIS ONE FIRST →
  Image at right, 320x400, object-fit cover: file:///C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/public/media/guardicore-band-960.jpg
  (at 390: image first, full width, 16:10 crop, then the text)
- The first index entry (G2 section 7, Direction C, 1440 text in columns 1-6, drawing in columns 8-12):
  mono folio: 02
  mono 14px: An award-winning author and leadership consultant who teaches government bodies and corporations
  $3M at 72px Bricolage on its own line, then 28px: in signed contracts across eleven awards.
  18px: It finds the RFPs worth answering, weighs each one against twenty years of their own work, and has a drafted response waiting by morning.
  mono 14px: AI engineering
  the RFP six-step flow drawing at index scale (max 400px wide), ink #1a1816, the gap node in copper.
- Also render a second copy of the entry in its HOVER state below it (label it with a small mono note
  "hover state" outside the design): the lower hairline in copper full width, the $3M line in #8a3d24, the
  drawing's copper element at full opacity (at rest it is 0.6).

MOCK 2: W/.planning/mock/pass-121/proof/rfp-flow.html (the drawing on its own, both grounds)
- Section A, dark band #12100e, full width, like a study's opening band: mono context "Client name protected",
  the drawing at band scale (about 560px wide at 1440) in theater ink #ece3d0 with the gap node in copper.
- Section B, bone paper, the drawing at body scale in the 68ch column (1440) with its sentence beneath in
  Hanken 15px:
  Nightly checks on procurement portals feed a library of more than 300 pieces of the client's own work. Each request is scored bid or no-bid, drafted against the buyer's criteria with any gap marked, and a person approves every response.
- The drawing (G2 section 4.3): six nodes in one row, left to right, joined by arrows; at 390 two rows of
  three with the arrow turning down at the end of row one. Node labels, mono 11px, sentence case, beneath
  each node, exactly:
  portals, checked nightly | library, 300+ pieces | bid or no-bid score | draft, on the buyer's criteria | the gap, marked | a person approves
  The "the gap, marked" node box and the arrow into it are copper. Line 1.5px at 1440, 1.25px at 390.
  One viewBox, scaled only. Each node is a small hand-drawn box (open stroke with corner overshoot); give
  each box a tiny distinct wobble so no two are identical copies. No icons inside the boxes.

CAPTURE
Write W/.planning/mock/pass-121/proof/capture.mjs using puppeteer-core required from
C:/tmp/p101tools/package.json (createRequire), Chrome at C:/Program Files/Google/Chrome/Application/chrome.exe,
headless. For each mock, at 1440x900 and 390x844, deviceScaleFactor 2: a full-page screenshot
(fullPage: true is fine for these short static pages; wait for document.fonts.ready and 800ms first).
Name them work-fold-1440.png, work-fold-390.png, rfp-flow-1440.png, rfp-flow-390.png.

SELF-CHECK (required, up to three rounds)
Open (Read) each PNG. Judge the drawing honestly against this checklist and fix what fails:
1. Does it read as drawn by a careful human pen, like the site's $20M+ circle, not as clip-art, not as a
   flowchart tool, not as a wobbly cartoon?
2. Are all six labels legible at 390 and not colliding?
3. Is the copper used once (the gap node and its arrow) and nowhere else in the drawing?
4. Does the /work fold read as one designed page (heading dominant, doorway one object, entry clearly
   second), with nothing overlapping at 390?
5. Are all strings exactly as given?

REPORT (your final message, under 25 lines): the files written, what each round changed, your honest
verdict on question 1 with the specific weaknesses you could not fix, and the exact capture commands run.
