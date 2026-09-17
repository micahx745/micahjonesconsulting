# SET-INDEX: the 15-reference set (Pass-121 G1 section 2.3)

Fifteen rows, one per slug. Source: the capture legs' JSON plus each slug's `.md`, which was
read to confirm the row before this table was written; no conflict was found between the two for
any of the fifteen. Plain markdown. No emoji. No em-dashes.

| Slug | URL captured | Status | Height 1440 | Height 390 | Display px (1440) | Body px (1440) | Signature motion (trigger, duration) | Q8: the mechanism worth taking | Q10: rule it would touch |
|---|---|---|---|---|---|---|---|---|---|
| a-locomotive-work | https://locomotive.ca/en/work | live | 3167px | 7067px | 115.2px (footer address block; probed h1 sentence is 26px) | 15px | hover-triggered, desktop only; settles by roughly 900ms (eye estimate, `document.getAnimations()` empty throughout) | A plain 3-column text-table index row reveals an authored project photograph on hover (fixed-position beside the row, not cursor-following), with a brief text-scramble on the neighboring cell before it resolves, giving a flat text table one authored image payoff per entry without a card grid. | None for the image-hover half (take-list item 6, already TAKE). The text-scramble half needs motion-engineer written approval and a non-GSAP implementation if taken separately, per the one-signature-motion line and the GSAP quarantine. |
| a-bakkenbaeck-work | https://bakkenbaeck.com/work | live | 10914px | 7482px | 50px | 14px | in-view, 500ms CSSTransition, ~100-200ms stagger per crop, DocumentTimeline, once per row | Vary the crop/element count of an otherwise identical repeated row (3 vs 4 images) to create an index rhythm break, rather than introducing a new element type or size. | None. Layout-density device on images, outside R2/R11/R15 and all named motion bans; the entrance fade fits the once-only in-view-reveal condition granted at G1 section 3 item 7. |
| a-iventions-home | https://iventions.com/ | live | 16544px | 12947px | 120px (statement/wordmark text; the h1 itself is 36px Soehne) | 10.5px uppercase label text (true reading paragraphs run larger, ~18-24px, not representative of body) | sticky-held service panels, scroll-linked/continuous, reversing on scroll-up | Service panels set position:sticky per section so each one holds for roughly one scroll screen while the next slides up and covers it, reversing on scroll-up; a pin/scroll-linked technique, so it is REJECTED as-is rather than taken. | CLAUDE.md's pin/parallax/cursor-follower line, and DESIGN_BAR's pin/parallax prohibition (R15 family, section 3 item 7). |
| a-portorocha-index | https://www.portorocha.com/ (no /work route; 404; fallback area17.com/work not needed) | live | 46191px reported by document.body.scrollHeight, likely inflated (internal scroll container, not document scroll); fold shots accurate | 844px reported (equals viewport; same internal-scroll caveat) | none (largest measured was 23px; h1 is an inline SVG wordmark) | 14px | live city-clock text tick, once per second, not WAAPI/CSS; a declared 0.5s hover transition on cards not visually confirmed | Contradicts what section 1 expected. What is actually there: a persistent, compact project-index card list (icon/mark + name + one-line outcome, 14-16px type, identical shape per entry) beside a separate, independently-scrolling press/news column, restraint and identical small cards rather than display-scale type or hover-revealed imagery. | None for the mechanism proposed to take (static, restrained compact list). The live clock or continuous press feed would collide with the project's no-continuous-motion posture if ever proposed, but neither is being proposed. |
| b-pudding-similes | https://pudding.cool/2026/05/similes/ | live | 23028px | 26205px | 56px h1, "Tiempos Text" serif, sentence case | 20px, "Atlas Grotesk" sans | none measurable; document.getAnimations() empty after load and after scroll; only interaction is a hover-only drag/swipe carousel, untriggered | Text sets matching colored, underlined spans on the three roles of one example sentence (tenor/ground/vehicle), beside a same-colored legend defined just above it, in normal document flow at load, no scroll trigger, no pin. | None as captured (static). Only a future animated draw-in on the spans would touch R15 and the animated-figure line. |
| b-pudding-essential-words | https://pudding.cool/2026/07/essential-words/ | live | 34432px | 35954px | 48px (h1, "Tiempos Text" serif) | 20px (paragraph, "Tiempos Text" serif) | in-view per word batch, 500ms CSSTransition, once each, DocumentTimeline (non-scroll-linked) | The scattered background-word field sets real corpus words in gray italic type, animating each word into place with a single 500ms CSS transition, then tags specific words inline with a colored +/- label beside prose stating the count of words dropped or added. | None for the tagged-word annotation (once-only, non-scroll-linked, fits the permitted in-view reveal). The page's separate pinned alluvial-diagram stepper, if taken instead, touches the CLAUDE.md pin/parallax line and R15. |
| b-cjrobinson-transmodel | https://cj-robinson.github.io/trans-model-leg/ (no redirect) | live | 26519px | 31915px | 57.6px (Libre Franklin sans-serif, real article h1) | 16px (Georgia, serif) | in-view, 2000ms zoom-in (class "zoom-in"), once, DocumentTimeline, never reverses; paired with a 750ms highlight sweep, also once | Quoted legislative text is set as a numbered, Courier-type document facsimile with its operative clause highlighted, and zooms in once when scrolled into view, for 2000ms. | None if trimmed to the 400ms once-only in-view-reveal cap (take-list item 7 condition). At its native 2000ms it is a named POPUP item (section 5 popup line: any motion over 400ms outside recorded exceptions). |
| b-pentagram-reddit | https://www.pentagram.com/work/reddit | live | 15288px | 10174px | 52px | 16px | none measured; document.getAnimations() empty at both viewports; only motion is native video playback in the hero (asset motion, not page chrome) | A full-bleed color or video panel alternates with a plain hanging pull-quote (one oversized outdented quotation mark beside sentence-case text set near display width) to mark a section break, static (0ms), used three times down the page. | None; the mechanism carries zero animation, touching no R9/R15, pin/parallax/cursor line, animated-figure line, or GSAP quarantine. |
| b-bloomberg-ai-deals | https://www.bloomberg.com/graphics/2026-ai-circular-deals/ (final response: bot-detection interstitial, not the article) | dead | n/a (900px is the interstitial's height, not the article's) | n/a (1017px is the interstitial's height, not the article's) | n/a (type snippet null; no article DOM) | n/a | none; document.getAnimations() empty on the interstitial | n/a, no content reached at either the primary or the fallback URL. | n/a |
| b-basecamp-shapeup | https://basecamp.com/shapeup/1.3-chapter-04 | live | 13248px, not truncated (15/15 frames) | 13340px, truncated true (12/12 frames; stitched 390 PNG may miss the tail) | 43.92px (h1, ff-meta-serif-web-pro) | 24px (ff-meta-serif-web-pro) | none; document.getAnimations() empty after load and after scroll; page fully static | A hand-drawn diagram sits inline in the reading column at full column width, uncaptioned, appearing roughly once every 1-2 paragraphs during a worked example (7 back-to-back in one section) rather than capped at one per section. | None as captured (static image). A drawn-in reveal mimicking the line appearing over time would touch R15 and the animated-figure/GSAP-quarantine line (section 3 item 10). |
| c-antonsten-home | https://www.antonsten.com/ | live | 3205px | 3573px | 72px | 18px | fixed 20000ms timer, DocumentTimeline, continuous loop | The single work tile swaps its entire client case (image, heading, dek, link) on a fixed 20000ms timer, so one crafted showcase slot substitutes for a multi-entry case grid. | DESIGN_BAR R15 (entrances run once) and the CLAUDE.md motion-discipline marquee/loop ban; the signature mechanism is a continuous, non-user-triggered loop and is not taken as-is. |
| c-tomcritchlow-home | https://tomcritchlow.com/ | live | 1447px | 1896px | 20px (no h1; largest visible text is the 20px paragraph body) | 20px, Libre Franklin | none; document.getAnimations() empty after load and after scroll at both viewports | A homepage sets one plain two-data-point list (title, date) for writing and one plain four-data-point list (icon, title, description, domain) for projects, with zero motion and zero imagery, an honest, low-craft index is itself the correct register for a personal, undesigned page. | None. At most confirms R11 already at work in the wild; no DESIGN_BAR rule, pin/parallax/cursor line, animated-figure line, or GSAP quarantine is touched. |
| c-buzzusborne-home | https://buzzusborne.com/ | live | 5020px | 3111px | 52px | 15px | continuous loop, JS-driven text swap, not tracked by document.getAnimations(); a sub-1s headline fade on load; hover underline on tile 1 | Tile 1 pairs an always-visible heading, one-sentence dek and a "View" link beside a small framed demo panel that auto-cycles a short first-person caption on load, while every other entry (6 of 7) is reduced to a bare screenshot on a solid color field with no visible text. | No pin/parallax/cursor-follower collision. The tile-1 auto-cycling demo caption, if ported as a standing on-load loop, reads as a second signature motion and needs motion-engineer sign-off under CLAUDE.md's no-second-signature line. |
| c-draftnu-home | https://draft.nu/ | live | 1519px | 1564px | 36px | 24px | none; document.getAnimations() empty after load and after scroll; fold and fold-early screenshots pixel-identical | Draft states its whole value proposition as a single second-person headline (h2, no h1) with no hero image, then substitutes inline linked proof phrases in body prose for a logo wall or case-study grid, for the entire first fold at both viewports; named offers live in the nav dropdown rather than the homepage body. | None. No motion, pin, parallax, cursor-follow, animated figure, or GSAP is involved; the mechanism is copy/structure. |
| c-emilkowalski-home | https://emilkowal.ski/ | live | 2480px | 2242px | none (no distinct display size; largest active text is 16px, same as body) | 14-16px | none; document.getAnimations() empty after load and after scroll (confirmed twice); hover background-swap is transition-duration:0s, no easing | Entry titles and descriptions sit at 16px/500 and 14px/400 beside no image, with hover swapping background colour at 0ms (no easing, no transform); hierarchy is carried by weight and colour, not size or motion, with zero display size and zero imagery anywhere on the page. | None. |

Count: 15 rows (A 4, B 6, C 5), one dead (b-bloomberg-ai-deals), 14 live.

## The three closest Q8 mechanisms

These three all take the same underlying idea (an entry's micro-interaction carries hierarchy
through weight, color, or a small state change rather than through size or motion), so G2 should
not take it three times:

1. **c-emilkowalski-home** — hierarchy carried by weight and colour alone, zero display size,
   zero motion; hover is an instant, non-eased background-colour swap.
2. **c-draftnu-home** — hierarchy carried by copy and inline linked proof phrases in prose, not
   size, motion, or imagery; a structural/copy device rather than a visual one, but the same
   restraint.
3. **b-pentagram-reddit** — the structural device (a plain hanging pull-quote marking a section
   break) is static, zero animation, and repeats identically three times; restraint used as the
   craft signal rather than motion.

A fourth near-neighbor worth naming: **c-tomcritchlow-home** is the calibration point for the
same restraint taken further (two plain lists, zero motion, zero imagery) and should not be
mistaken for a fourth distinct mechanism when G2 reads these three.

## References where the capture contradicted G1 section 1's expectation

- **a-locomotive-work** — Section 1 expected an inline award/outcome mono line inside the entry.
  No such line renders in any captured screenshot at either viewport, at rest or on hover; raw
  HTML has per-entry award counts as plain text but it is not visible in the rendered view. The
  hover-grammar half (image + text-scramble) is confirmed and taken instead.
- **a-iventions-home** — Section 1 hoped the one-project-at-a-time pacing was achieved without
  pin or snap. The capture shows it is achieved via position:sticky pinning with scroll-linked,
  reversing stacking, so per section 1's own fallback instruction it is recorded as REJECTED
  rather than taken. (The one expectation that held: no canvas/WebGL, 0 matches.)
- **a-portorocha-index** — Section 1 expected display-scale type in a list with image-on-hover.
  The live page is a compact 14-23px icon+name+description card list with no confirmed
  hover-triggered image reveal; the page's imagery belongs to an unrelated press/news feed
  column, not to project entries.
- **b-pudding-essential-words** — Section 1 expected "the small-multiples panel" and "the
  before/after device." The capture found no literal small-multiples grid, instead one
  alluvial/Sankey diagram repeated via a pinned scroll-stepper; the actual before/after device is
  the inline +/- tagged word annotation inside the scattered word field, not a separate panel.
- **b-cjrobinson-transmodel** — Two contradictions: (1) no separate "source line" caption under
  each bill facsimile as expected; the document's own official header serves as its own citation
  instead, sparer than a true source line (the RFP transfer will still need an explicit
  provenance line). (2) The mechanical type-measurement snippet first reported the h1 as 12px
  Courier New rather than the true 57.6px Libre Franklin display headline, a real markup quirk
  (seven per-facsimile header lines are each marked up as their own h1 before the real article
  h1), resolved by direct DOM measurement.
- **b-pentagram-reddit** — Section 1 expected a conversation-bubble motif doing structural work,
  used 3-4 times. Live inspection and a raw-HTML grep for "bubble" show the bubble is Reddit's
  own rebrand asset inside product-UI mockup imagery, client content Pentagram designed for
  Reddit, not a page-chrome device Pentagram uses on its own template. The actual structural
  device found is a plain typographic hanging pull-quote (used 3 times), matching the expected
  count but not the expected form.
- **b-bloomberg-ai-deals** — Two contradictions: (1) Section 1 expected either the graphic to
  render or a reachable Reuters fallback found with one search; Bloomberg returned a full
  bot/CAPTCHA block (403, "PRESS & HOLD") rather than a soft paywall, and the exact Reuters URL
  could not be found (401 on site-search, browser navigation denied, JS-only graphics index). (2)
  Section 1's expected mechanism (a static relationship diagram with mono labels) could not be
  verified at all; this reference contributes nothing and the set is one short (14 of 15), not a
  dropped-in substitute.
- **c-antonsten-home** — Section 1 expected several static tiles shown together to demonstrate
  proof-stacking. The page has exactly ONE work tile whose content auto-cycles through different
  client cases on a 20-second loop; proof types are sequenced across sections rather than stacked
  simultaneously, and the tile itself loops rather than sitting static.
- **c-buzzusborne-home** — Section 1 expected a "six-tile Recent Work" grid with per-tile hover
  states and a static-vs-video comparison. The live page shows 7 full-width, single-column
  stacked rows, not a grid; only tile 1 (not all tiles) carries visible heading/copy/CTA, and no
  "Recent Work" heading appears in this fold set; the other six entries are silent, unlabeled
  screenshots with no distinct hover behavior captured.
- **c-emilkowalski-home** — Section 1 expected "the micro-interaction grammar for index entries:
  one easing, one duration, transform and opacity only." No such motion exists on this page;
  document.getAnimations() is empty both after load and after scroll (verified twice, including
  a manual live re-check), and the only hover effect is an instant, non-eased background-colour
  swap with no transform. The mechanism actually worth taking is structural (a capped two-size
  type scale carrying hierarchy via weight/colour) rather than a motion grammar.

References confirmed WITHOUT contradiction: b-pudding-similes, b-basecamp-shapeup (confirmed on
mechanism, contradicted only on density, noted below), c-tomcritchlow-home, c-draftnu-home.

- **b-basecamp-shapeup** — partial: confirmed on the core mechanism (author's-hand diagram inside
  the reading column), contradicted on density. Section 1 expected "one per section at most"; the
  actual page runs a diagram per step of a worked example (7 in one section).
- **a-bakkenbaeck-work** — partial: Section 1 expected distributed size/shape variance down the
  page; the actual variance is a binary crop-count break (3 vs 4, never a different shape) that
  appears almost immediately (entry 2), stays uniform for a long middle stretch, clusters again
  late, and does not survive to 390 (mobile normalizes every entry to one carousel shape).
