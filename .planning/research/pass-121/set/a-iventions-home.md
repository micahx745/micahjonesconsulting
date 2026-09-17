# a-iventions-home

URL captured: https://iventions.com (final https://iventions.com/) | Status: 200 (live, primary used, no fallback needed)

## 1. Index shape

Not a list/grid/card index in the studio-work sense: this is the homepage, and the "index" the
brief points at is the four-item service breakdown (Events, Exhibits, Congresses, Sports), each
numbered 01-04. Entries visible in the first fold at 1440: 0 (the fold is the hero: heading,
video-poster card, intro line -- no service entries yet). At 390: 0 for the same reason, the fold
is hero-only.

Data points per service entry: 4 -- number (01-04), title, one descriptive line, "See what we
create" link, plus a photograph. So effectively 4 data points (number+title counted as one,
description, CTA, image).

Rhythm break: yes, and it is the whole mechanism. Each service entry is NOT the same shape --
each one is a full-viewport-height panel in its own background colour (cream/black-ish, pale
blue, violet, peach) that sticks in place while the next panel's card slides up and covers most
of it (see the stacked "Exhibits" card overlapping "Events" and "Congresses" overlapping
"Exhibits" in the full-page stitch). First break: about 3 screens down from the top (after hero,
the "Designed to be remembered" statement, and the UEFA client-logos band).

## 2. Featured entry

No single featured entry inside the service list -- all four (Events/Exhibits/Congresses/Sports)
are equal-weight, same treatment, differentiated only by number and colour. The closest thing to
"featured" on the page is the top-of-page hero: a rounded video card ("Where experiences take
center stage") sitting dead centre of the fold, on a triangulated violet/cream background, with a
"Showreel" mute/play control revealed on interaction. Clickable surface for the hero card is the
whole card (video play). It sits below the H1 and above the intro paragraph, roughly centred
between them.

## 3. How a study opens

There is no separate "study" page in this capture (home only, per the brief's URL). The homepage
itself opens, in reading order at 1440: nav (menu, wordmark, "GOT A PROJECT?" CTA) -> H1 "Step
into the Spotlight" (left) -> video card (center) -> intro paragraph (right) -> giant outlined
wordmark "IVENTIONS" bleeding off the fold. At 390 the same elements stack top to bottom: nav,
H1, video card, paragraph, wordmark. Subject ("Iventions", an events/experience agency) is named
at both widths above the fold; no quantified result is stated above the fold at either width --
the first fold is pure positioning copy, not a result. First thing below the fold: the
"Designed to be remembered" mixed-media statement (image-masked headline text).

## 4. The visual device standing in for photographs

Photographs are present throughout (video card, client-work stills in each service panel), so
this question is more "what stands alongside the photos": (a) an oversized outline/duotone
wordmark repeated at hero and footer, (b) a large statement headline where the display type is
filled with an image/video texture rather than a solid colour (image-clipped type), (c) a
diagonal, hard-edged triangular colour-field background behind the hero (cream/violet/lime
facets) that recolours per section. All three are authored to this brand specifically (custom
colour system, own wordmark, own client photography) rather than generic.

## 5. Motion grammar

`document.getAnimations()` returned an empty array at both viewports, after load and after one
scroll -- the stacking/reveal effects are driven by CSS `position: sticky` (5 occurrences in the
DOM) plus opacity/transform transitions that were not mid-flight at capture time, not by the Web
Animations API, so the snippet caught nothing running at those instants.

Motions observed visually across the two fold captures (early vs +1.5s) and the full-page stitch:
- Hero content (heading, card, paragraph, wordmark): trigger load, appears to fade/slide in
  (blank at domcontentloaded+250ms, fully present at +1.5s) -- duration bucket 400ms-1s, property
  opacity+transform, once, no loop, no pin.
- Service panels (Events/Exhibits/Congresses/Sports): trigger scroll (in-view / scroll position),
  each panel becomes `position: sticky` and holds while the next panel's card slides over it --
  duration bucket continuous (tied to scroll distance, not a fixed ms), property transform, this
  DOES pin (each section is held fixed in the viewport while the following one stacks on top),
  and it is scroll-linked (reverses if you scroll back up).
- Hover on `a[href="/projects/filter"]` (the nav/filter link nearest 30% scroll): no visible hover
  transform captured in the still; treat as "none found" for that specific selector.

Signature motion: the sticky-stack panel reveal (Events -> Exhibits -> Congresses -> Sports).
Sprinkle: the hero fade-in, the image-masked headline text.

## 6. Type scale and grid

From the computed-style snippet (largest-to-smallest, deduped):

- 1440: sizes = 120, 60, 36, 27, 18, 16.5, 13.5, 12, 10.5, 9 (10 active sizes >=9px, 9 of them
  >=12px). Display 120px, body/paragraph 10.5px (uppercase, "Soehne" -- this reads like a label
  or eyebrow line caught by the query, not the main reading paragraph; the true body copy visible
  in the screenshots runs closer to 18-24px). Ratio largest:body(sampled) = 120:10.5 = ~11.4:1.
  h1 font: Soehne / "Soehne Fallback", 36px, not uppercase (the 120px belongs to the giant
  wordmark/statement text, not the h1 element itself).
- 390: sizes = 83.2, 52, 49.9, 33.28, 29.12, 24.96, 22.88, 18.72, 18.71, 16.64, 14.56, 12.48 (12
  active sizes). h1: Soehne, 49.9px, not uppercase. Paragraph: ABCArizonaMix, 22.88px, not
  uppercase -- so body text at mobile uses a second, serif-adjacent face distinct from the
  display face, a two-typeface system.
- Columns: single centered column with a wide flanking margin at 1440 (three-zone layout: H1
  left, card center, copy right, not a strict grid column count); collapses to one full-width
  stacked column at 390, as expected.
- Display case: mixed -- the wordmark and giant statement type are set in sentence/mixed case
  with stylised lowercase forms (custom lettering, not a CSS text-transform), not uniform
  uppercase.

## 7. Hand-made versus templated

Three things that could only belong to this site:
1. The custom wordmark treatment where "IVeNTIONS" uses a stylised lowercase "e" inside an
   otherwise capital logotype, repeated as an oversized graphic element.
2. The diagonal hard-edged triangular colour-field system (cream/violet/lime facets) as the page's
   only background texture, not a photo, not a gradient.
3. Image-masked/duotone headline type ("Designed to be remembered") where the letterforms are
   filled with event photography rather than flat colour.

DESIGN_BAR never-list items present: the sticky/stacking scroll panel is the kind of scroll-tied
motion the never-list and CLAUDE.md's pin/parallax line target directly (pixel reference: the
Exhibits black panel visibly overlapping the Events cream panel in `a-iventions-home-1440.png`,
roughly y=1420-1620 of the 6750px-tall stitch).

Verdict: hand-made (distinctive type treatment, custom colour system, real event photography) --
not templated, not plain.

## 8. The one mechanism worth taking

As expected by section 1, the pacing device does NOT clear on its own terms: "The service panels
set `position: sticky` per section, so each panel holds in the viewport for roughly one scroll
screen while the next panel's card slides up and covers it, reversing on scroll-up." This differs
from section 1's hoped-for outcome ("one entry at a time... only if achieved without pin or
snap") -- it IS a pin-family technique (sticky-held sections + scroll-tied cover reveal), so per
the brief's own instruction it is recorded as rejected, not taken, with the reason: it pins/holds
sections in place tied to scroll position and reverses on scroll-up, which is exactly the
CLAUDE.md "nothing pins, sticks... without motion-engineer's written approval" line and the
DESIGN_BAR pin/parallax prohibition R15 protects against.

## 9. What is budget

Team size and production budget for original event photography and video (the showreel, the
"Built by people" cast photography) at a scale this site does not have; a roster of enterprise
clients (UEFA, Turkish Airlines, Pfizer, FedEx, Adidas) shown as a logo/name band; four
service-line businesses under one brand (Events, Exhibits, Congresses, Sports) rather than one
consulting practice; a custom type/lettering system commissioned for the wordmark.

## 10. Rule collision

The mechanism in question 8 (sticky-held, scroll-tied panel stacking) collides with the CLAUDE.md
pin/parallax/cursor-follower line and with DESIGN_BAR's pin/parallax prohibition (recorded in
FABLE-121-G1 section 3 item 7 as the same family: "A scroll-scrubbed reveal is coupled to scroll
position and reverses on scroll-up; that is the parallax family... REJECT the scrubbed form").
Nothing on this page is usable as-is without that collision; the once-only in-view reveal
(IntersectionObserver + CSS, never reverses) that FABLE-121-G1 item 7 allows is the closest
in-bounds cousin, but it is a different, gentler mechanism than what iventions.com actually does.

## 11. Capture facts

- URL captured (final, after redirects): https://iventions.com/
- Date: 2026-09-17 (capturedAt 2026-09-17T04:41:19.066Z)
- Viewport: 390x844 and 1440x900, device scale factor 2 (fold shots), 1 (full-page stitch)
- Page height: 1440 = 16544px; 390 = 12947px
- Consent banner: none encountered (script reports `"consent": "none"` at both viewports; no
  cookie/consent UI visible in any capture)
- Blocker: none; both viewports returned status 200
- Entry text in initial HTML: yes -- `grep -o "Events" _raw/a-iventions-home.html` returns 3
  hits (server-rendered), and the h1 is present verbatim in the raw HTML:
  `<h1 class="css-bex63m">...Step into / the Spotlight...</h1>` (Next.js SSR, emotion-css
  classes)
- Fallback used: no (primary live and healthy)
- Other: full-page stitch truncated at both widths (`frames.truncated: true`, capped at
  15 frames / 1440 and 12 frames / 390) -- the stitched PNGs run through the footer band
  ("Inside Iventions") but may clip the last ~2000px of true page height; no `<canvas>` element
  found in the raw HTML (0 matches), so the site is DOM/CSS-driven, not canvas or WebGL.

## Snippet outputs (from capture JSON)

Animations (both viewports, both passes):
```
afterLoad: []
afterScroll: []
```

Type sizes:
```
1440: [120, 60, 36, 27, 18, 16.5, 13.5, 12, 10.5, 9]
390:  [83.2, 52, 49.8916, 33.28, 29.12, 24.96, 22.88, 18.72, 18.7094, 16.64, 14.56, 12.48]
```

## Mechanism to take and the rule it touches

Nothing from this reference clears cleanly: the page's one real pacing device -- sticky-held
service panels that stack and cover one another on scroll, reversing on scroll-up -- is a
pin/scroll-linked technique and collides with the CLAUDE.md pin/parallax/cursor-follower ban and
DESIGN_BAR's pin/parallax prohibition (R15 family). Rejected as-is, per section 1's own
instruction for this slug. The only exportable idea beneath the rejected mechanism is the
gentler cousin already permitted elsewhere in FABLE-121-G1 (item 7): a once-only, non-reversing,
in-view reveal on section entry, done with IntersectionObserver + CSS rather than sticky/pin.
