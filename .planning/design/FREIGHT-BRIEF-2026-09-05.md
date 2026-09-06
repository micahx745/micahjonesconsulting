# Freight — the second design exploration (2026-09-05)

Operator: "I have found inspiration: https://studiofreight.com/ Dont feel restricted. Create
something for me that studio freight would build 100%." Then, mid-turn: "also look at their
work examples not just their site. I like their design ethos - when I tell you to research I
want you to find a collection of the best design studios like this and take the best parts."

A mock, published as a real scrolling page (an Artifact), not a change to the live site.
Constitution released; facts and anonymity not. Every sentence is one the site publishes.

## 1. The research (2026-09-05)

Fourteen sites verified live and torn down with one rubric; Studio Freight's own home read
four ways including two client case pages. Corpus: `.planning/design/research/00-THE-SET.md`,
`research/studios/*.md` (18 files), `research/STUDIO-ETHOS-SYNTHESIS.md`. Contact sheets in
the session scratchpad (`studios/CONTACT-SHEET-home.png`, `-work.png`).

The set: studiofreight, darkroom, unseen, antinomy, exoape, 14islands, upperquad, obys,
malvah, collins, basement, immersive-garden, matthias-ott, sara-soueidan (two individual
operators), plus Studio Freight client work (METTLE, Perplexity Comet, and two more).

### What effectively all of them share
- 12/14 light ground, 7 of those a tinted off-white. 2/14 black, and both are the two sites
  flagged for tells (darkroom's terminal skin, basement's logo wall).
- 12/14 render no accent at all. 0/14 have a second accent. 4/14 declare an accent token
  that is referenced zero times.
- 14/14 track display negatively, clustering −0.02 to −0.03em. 12/14 treat uppercase as a
  label property only. 10/14 one weight per face. 9/14 one or two families.
- 12/14 show no testimonial on the home page. 0/14 run a carousel. 2/14 ship a logo wall.
- 13/14 self-host every face; no site in the set renders a CDN webfont.
- Studio Freight itself: three font files (JJannon regular, Publico Text Mono roman and
  semibold), no sans; two type sizes on the page; the thesis set inside a cleared cell of a
  24-tile mosaic; case studies close on a client quote under the heading "Receipt"; Lenis
  and three.js, no GSAP; the motion budget is a typewriter caret.

### Where they split
Serif display (4) vs grotesk (9). Display over 100px (5) vs under 90px (8). Grid (4) vs
list-index (3) vs interleaved feed (3). Three make the work the first screen. Five publish
an explicit count of the body of work.

## 2. The ruling — the best parts, and what each maps onto

| From | The mechanism | His material |
| --- | --- | --- |
| Studio Freight | The thesis sits in a cleared cell of the work mosaic | Six real artifacts as the mosaic; "Operator, not consultant." in the gap |
| Upperquad | The work index is sentences: "Client: one clause" | His /work and /about already hold every sentence; seven receipts as sentences |
| Collins /programs | Named engagements, each with a promise line and a price | The three packages, already named and priced; the live one-liner is the promise |
| Matthias Ott | Hiring is one question forking into two offers | His live question: "Hiring for a company rather than a build?" → the two doors |
| Malvah | The fact stated as a sentence, not parked in a badge | "Four companies I worked inside reached an exit." replaces every stat tile |
| Studio Freight | Case studies close on a client quote under "Receipt" | The one real quote closes the page under his own word |
| Antinomy, Collins, Immersive Garden | One modest sentence carries a whole white screen | The thesis at 40–72px, not 160; white space does the shouting |
| The set | Achromatic paper, one weight per face, uppercase as label only | Paper `#F7F4EE`, ink `#121110`, one grey; EB Garamond 400 only; Xanh Mono 400 only |

What the research overturned in the first sketch: the 160px thesis (cut to 40–72), the black
package cards (0/14 put prices on black; they sit on paper with hairlines now), the giant
footer wordmark (0/14 do it; cut), the velocity skew and letter-spacing scrub (the pages
worth hiring barely move; cut), tracked-out mono kickers at 0.18em (4/14 ban it; labels now
track 0.01–0.05em).

### The system
- **Ground** paper `#F7F4EE`, second paper `#EFEBE3` for the empty tile and hover wash,
  ink `#121110`, soft ink `#4A4642`, grey `#8B857C`, hairlines at ink 12% / 32%. **No
  accent.** The artifacts carry the colour. Black appears only where an artifact is dark.
- **Type** EB Garamond 400 (the Garamond class, as JJannon is) for display, sentences and
  body; Xanh Mono 400 + italic for all chrome — the monospaced-serif move. Five sizes on
  the page: thesis `clamp(40px, 5vw, 72px)`, head 30, line 26, body 19, mono 13.
- **Chrome** fixed to the four corners in mono, `mix-blend-mode: difference` so it reads
  on paper, on the photograph and on the dark tile alike.
- **Order** mosaic with thesis → one sentence → the record (seven sentences) → the manual
  (two tiles, the three pain lines) → the fork (one question, two doors) → programs (three
  named, priced rows) → engagements → about (facts as a sentence) → Receipt → foot.
- **Motion** Lenis smooth scroll; a load settle on the mosaic from a visible state; a slow
  transform-only parallax inside each tile. Nothing else. Reduced motion: static.

## 3. Rejected
- Black ground with acid green or vermilion; both "one pop on black" clusters, and not what
  the set does.
- A WebGL object, a CSS 3D book, a marquee, a cursor, velocity skew: the quiet pages win.
- Fraunces, Inter, Space Grotesk, Geist: template faces.
- Stat tiles ($5B+ / $20M+ / 13 years as big numbers): the set states facts as sentences.
- Any testimonial, logo, count or sentence not already on the site. The mosaic count line
  ("Four case studies · one field manual · seven receipts") is chrome counting the live
  index (4 entries), the live product (1) and the live record (7 rows).
- Naming the industry author; itemising the birth worker's services; any Ordani count.

## 4. Build
`the-receipts.template.html` + `build.py` (inlines the six downsampled artifacts) →
`<scratchpad>/the-receipts.html` → Artifact "The Receipts". gsap 3.12.5 + ScrollTrigger
(cdnjs), lenis 1.3.4 (jsdelivr); the page degrades to native scroll, no motion, if either
fails. Google Fonts is the artifact CSP's one font host; the set self-hosts, which a mock
cannot.
