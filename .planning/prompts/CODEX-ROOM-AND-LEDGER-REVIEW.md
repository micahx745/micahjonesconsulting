You are reviewing a design mock for a one-person go-to-market consultancy site
(micahjonesconsulting.com). The operator's brief for it, verbatim: "I want something unique,
award winning looking, premium." It is a mock, not the live site. Judge it as the design lead
of a studio whose work wins Awwwards Site of the Day, and as the buyer it is for: a founder or
product lead whose product is stuck at the 80% wall, on a phone, thirty seconds.

## What you are looking at
- The page source: `.planning/design/winning/room-and-ledger.template.html` (image and video
  assets are placeholders `{{IMG_*}}` / `{{VID_*}}`; the built file inlines them).
- Screenshots attached to this prompt: the first screen at 1440 and at 390, the person
  section, the numbers, the price column, the copper ask field, the record at 390.
- The ruling behind it: `.planning/design/WINNING-BRIEF-2026-09-05.md` (read §1, §2, §4, §5,
  §9, §11). The evidence corpus it was ruled from: `.planning/design/research/client-work/
  CLIENT-WORK-SYNTHESIS.md` (14 live client builds by Studio Freight / darkroom.engineering)
  and `.planning/design/research/STUDIO-ETHOS-SYNTHESIS.md`.
- Two real video clips of the operator play in it: a hero loop (him at a laptop turning to
  point at a whiteboard) as the fixed ground of the first screen, and a square/4:5 loop of him
  mid-conversation in the person section. Both are monochrome with a gradient to the page's
  espresso baked in.

## Constraints that are NOT up for review
Every visible sentence is copied from the live site and verified against a claims ledger; do
not propose new copy, numbers, names, logos or quotes. The industry author is never named. One
accent (copper #C8542B), espresso #0D0D0F and bone #F5EFE4. No stock, illustration, 3D, icon
kits, marquees, cursor effects, preloaders or logo walls. Type: Anybody (display and labels),
Hanken Grotesk (text), no mono.

## What I want from you, in this order
1. THE JURY READ, in five sentences: would this win SOTD as it stands; what is the single
   thing a juror would point at first; what is the tell, if any, that it was assembled rather
   than designed.
2. THE BUYER READ at 390, in five sentences: in thirty seconds, what do they know, believe,
   and do; where do they lose the thread.
3. THE TEN CHANGES a top studio would make before shipping, ranked by impact, each with the
   concrete fix (values, not adjectives: px, %, weights, positions) and the reason. Composition,
   type, rhythm, motion, the two clips, the header behaviour, the copper field, the mobile hero.
4. WHAT TO KEEP, five items, so the changes do not sand off what works.
5. THE HONEST CHECK: does any of it read as AI-generated design (the 2024–26 template look:
   cream + serif + terracotta, blurred pill nav, Inter/Space Grotesk, gradient text, glass,
   card-on-everything, centred everything)? Name what and where, or say none.
Be specific to the pixel and cite the screenshot or the template line. Do not restate the
brief back to me. Write the review to stdout as Markdown with those five headings.
