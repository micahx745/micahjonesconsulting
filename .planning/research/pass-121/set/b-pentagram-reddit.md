# b-pentagram-reddit

Primary URL: https://www.pentagram.com/work/reddit. Status: live, 200, no fallback used.

## 1. Index shape

n/a: single case study, not an index.

This is one long-scroll case-study page, not a listing of entries. It has no cards, grid, or
list of projects. The only index-like element is a single "Next Project" link at the very
bottom (see Q2). No rhythm-break question applies since there are no repeating entries.

## 2. Featured entry

n/a: page has no entry index.

There is one link that functions like a featured-entry pattern: at the foot of the page, a
"Next Project" label (small, grey, uppercase-ish) sits above the full project title "Bedrock
Ocean Exploration" set at h1 display size (52px), its dek, and its tag chips, then a media
grid begins immediately below with no visible gap. The whole title block reads as one
clickable surface leading to the next case study. It sits below all content, not near the
page heading.

## 3. How a study opens

Reading order at 1440, first fold: primary nav (Pentagram wordmark logo, Work / About / News
/ Contact / search icon / Archive), h1 "Reddit", dek line ("Brand identity transformation for
the 'heart of the internet.'"), three tag chips (Brand Identity, Brand Strategy, Technology),
an "About the project +" expandable button pinned top-right of the media block, then the top
edge of a full-bleed hero video begins right at the fold line (orange ground, Snoo mascot
render, "reddit" wordmark, native video controls visible: play button, timecode, scrub bar).

At 390: same stack order (hamburger nav replaces the link row), h1, dek (wraps to two lines),
tag chips wrap to two rows, "About the project" button sits below the chips as its own row,
then the hero video begins immediately below.

Subject is named above the fold at both widths (the h1 says "Reddit"). Result/outcome is NOT
named above the fold at either width — the dek describes the scope of engagement ("brand
identity transformation"), not a quantified outcome. There is no number, metric, or result
claim anywhere in the first fold.

First thing below the fold at both widths: continuation of the same full-bleed hero video
block (it is taller than one screen), not a new element.

## 4. The visual device standing in for photographs

The page is nearly all photography and motion (a hero video, product-UI mockups, a 3D Snoo
render, an apparel/denim photograph of a patch, a phone held showing the app icon), so most
of the page does not need a substitute device. Where there is no photograph, full-bleed flat
color panels stand in (seen repeatedly in the stitched capture and confirmed live: solid
orange/rust/tan/near-black rectangles at full column width, functioning as brand-color
swatches or motion-graphic color fields between photographic blocks). These read as authored
to this content — they are drawn from Reddit's specific rebrand palette, not a generic filler
color.

The one non-photographic textual device is the pull-quote (see Q7/Q8): large sentence-case
text with a single oversized hanging quotation mark, used three times as a section break.

## 5. Motion grammar

Measured via `document.getAnimations()` at both viewports, after load and after one scroll:
zero Web Animations API / CSS-animation entries at either breakpoint (see pasted snippet
output below). No scroll-linked, in-view, hover, or load-triggered CSS/JS animation was
detected anywhere on the page.

The only motion on the page is native `<video>` playback in the hero block: a play/pause
button, a running timecode ("00:01"), and a scrub bar were visible live (not from
getAnimations, since native video playback is not a Web Animation). This is asset motion
(a produced film), not page-chrome motion, so it does not pin, hijack scroll, loop
indefinitely as a UI element, or reverse on scroll-up. No CSS-driven signature motion exists
on this page to name.

## 6. Type scale and grid

**1440:** active font sizes (12px and up), computed: 52, 32, 19, 16, 13 — 5 sizes. Body
paragraph: 16px. h1 element itself (computed): 19px (see note below). Font family on both h1
and body paragraph: `Plain, Arial, sans-serif` — one custom licensed sans typeface for both
display and body text; no serif pairing (the serif "Pentagram" wordmark in the nav is a
logotype, not body type). Ratio of largest active size to body: 52/16 = 3.25. Display case:
sentence case (h1 reads "Reddit", not uppercase). Body/quote column: full content width, not
a narrow ch-constrained column — pull-quote lines run roughly 45-60 characters before
wrapping, close to the full 1440 content measure. Grid: media blocks alternate between one
full-width block and a 2-up grid (two roughly-square panels side by side); at 390 the 2-up
grid collapses to one column, full width.

**390:** active font sizes: 36, 24, 17, 16, 13 — 5 sizes. Body paragraph: 16px (same as
1440). h1 element itself (computed): 17px.

Note: the h1 element's own computed font-size (19px/17px) is smaller than the largest active
size on the page (52px/36px) and smaller than what the "Reddit" wordmark visually reads at in
the screenshots. This means the large visual "Reddit" heading text is very likely rendered by
a styled child node inside the h1 rather than the h1's own text run, so the 52px/36px figure
is the true visual display size and the h1's own 19px/17px is a base/reset value. Recorded as
measured, per protocol, with this discrepancy flagged rather than resolved by eye.

## 7. Hand-made versus templated

Three things that could only belong to this page/client: (1) the 3D-rendered Snoo mascot
specific to Reddit's brand, (2) the custom "Reddit Display" typeface and the letterform
detailing described and shown in the copy and imagery, (3) real product-UI mockups (the
Reddit app icon on a phone lock screen, a redesigned post card reading "Ewoks on the loose"
with "211" upvotes and "901 Comments"). None of DESIGN_BAR's never-list items are present:
zero measured animations means no cursor-follow, no scroll-jacking, no marquee; type is one
plain sans face, not a mono aesthetic.

Verdict: hand-made at the content layer (every asset is bespoke to Reddit and not reusable),
but the page's own scaffolding (hero + pull-quote + 2-up media grid + next-project foot) is
visibly Pentagram's shared case-study template, reused across their site with different
client assets dropped in. Not the tomcritchlow "plain" calibration — this page is
resourced and designed, just via a repeating agency template.

## 8. The one mechanism worth taking

**This differs from what section 1 expected.** Section 1 expected "a conversation-bubble
motif doing structural work: framing quotes, marking section breaks," used three or four
times per page. Live inspection (browser, scrolled through the full page) shows the
"conversation bubble" is Reddit's own rebrand asset — it is described in the pull-quote copy
("the design team introduced a conversation bubble as the new cornerstone of the brand's
visual identity") and shown inside product-UI imagery (a rounded comment-count icon on a
mocked post card). It is CONTENT Pentagram designed for Reddit, not a page-chrome UI device
Pentagram used on its own case-study template to frame quotes. No bubble-shaped quote
container exists anywhere on the page; grepping the raw HTML found the words "bubble" and
"conversation bubble" only inside body copy, never as a class name tied to a quote component.

The actual structural device, confirmed live and in the raw HTML/stitched capture, three uses
counted down the page:

**A full-bleed color or video panel alternates with a plain hanging pull-quote — one oversized
outdented quotation mark beside sentence-case text set near display width — to mark a section
break, for 0ms (no animation; static on render).**

## 9. What is budget

What this page has that micahjonesconsulting does not: a produced brand film with native
video playback, a bespoke 3D character render (Snoo), a custom licensed/drawn typeface
("Reddit Display"), styled product photography (apparel/patch shot), and full access to
mock up the client's own live product screens at production fidelity. This is agency-scale
motion, type-design and photography budget — several tiers above a solo consultancy's reach,
and not something to imitate directly; only the plain pull-quote-as-section-break device
(Q8) is budget-free to take.

## 10. Rule collision

None. The mechanism taken in Q8 carries zero animation (measured: `getAnimations()` returned
empty at both viewports and both scroll states), so it does not touch R9, R15, the
pin/parallax/cursor line, the animated-figure line, or the GSAP quarantine. As a static
typographic device it would only need to respect the existing one-em-dash-per-page copy cap
if the quoted text itself used one. The native video with playback controls seen in the hero
is a reference-site fact, not something taken for this site; it is unrelated to this site's
own `motion.heroclip` "no controls" rule, which audit (a) checks separately on the live
domain.

## 11. Capture facts

- URL captured (final, after redirects): https://www.pentagram.com/work/reddit (no redirect;
  finalUrl matches the primary URL at both viewports).
- Date: capture run 2026-09-17T04:41:25Z (script timestamp, UTC); session date 2026-09-16.
- Viewport: 390x844 and 1440x900, device-scale-factor 2 for fold shots, 1 for stitched
  full-page shots, per protocol.
- Page height: 1440 = 15288px; 390 = 10174px.
- Consent banner: none appeared; no "cookie" string anywhere in the raw fetched HTML, so
  nothing needed declining.
- Entry text in initial HTML: yes. `curl`-equivalent raw fetch (`_raw/b-pentagram-reddit.html`,
  213,589 bytes, status 200) contains `<h1 class="f-heading-1 md:w-10-cols lg:w-9-cols">Reddit
  </h1>` and the string "Reddit" 199 times — fully server-rendered, not client-injected.
- Fallback used: no. Primary URL is live and was used throughout.
- Stitched full-page frame count: 1440 = 15/15 frames (truncated flag true, page taller than
  the 15-frame cap); 390 = 12/12 frames (truncated flag true). The `-1440.png`/`-390.png`
  stitched images may not show the very end of the page (the closing "Next Project" block was
  confirmed instead via live browser scroll, not the stitched PNG).

## Pasted snippet outputs

**Animations** (`document.getAnimations()...`), 1440 and 390, after load and after scroll:

```
1440 afterLoad: []
1440 afterScroll: []
390 afterLoad: []
390 afterScroll: []
```

**Type** (distinct computed font-sizes across all leaf text nodes, descending):

```
1440: [52, 32, 19, 16, 13]
390:  [36, 24, 17, 16, 13]
```

## Closing line

**Mechanism to take (Q8):** a full-bleed color/video panel alternated with a plain hanging
pull-quote (one oversized outdented quotation mark beside sentence-case text) to mark a
section break, static, used three times down the page — not a literal conversation-bubble
UI device, which is Reddit's own brand content, not Pentagram's page chrome.
**Rule it touches (Q10):** none — zero animation, so no R9/R15/pin-parallax-cursor/
animated-figure/GSAP-quarantine collision.
