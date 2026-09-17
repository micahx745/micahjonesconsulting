# c-antonsten-home

Captured 2026-09-17. Primary URL live, no fallback needed.

## 1. Index shape

This is a solo-operator homepage, not a work index. It carries exactly ONE "Work" tile, not a
list, grid, or stacked set of entries. The tile has four data points: a client screenshot/mockup
image, the word "Work" as a small heading, one sentence of context ("For almost thirty years I've
designed products for Fortune 500 companies and for teams that fit in a mid-sized van."), and a
"See work" text link. Below the tile: a client logo band (4 logos, a different shape) then three
testimonial blocks (quote-as-heading, quote body, avatar plus name and role — a third shape). First
rhythm break: about 1 screen down, where the hero/intro gives way to the tile; second break
(testimonials) at roughly screen 1.7 of about 3.6 total screens at 1440.

## 2. Featured entry

Yes, there is one, and it is the only "entry" on the page. It is featured by being the sole large
visual block on the page: full content-width, split roughly 65/35 (image left, text right), sitting
directly below the hero heading, intro paragraph, and CTA button, about one screen down. Clickable
surface is narrow: only the "See work" text link is an anchor (confirmed by hover target
`a[href="/working-together/"]`), not the tile image or heading.

## 3. How a study opens

n/a — no case study page was opened in this capture; homepage only.

## 4. The visual device standing in for photographs

The work tile itself carries real product screenshots (phone mockups of client apps) set against a
flat color field that changes per client (green, yellow, near-black seen across three page states).
The H1 is set in a cursive/handwriting web font ("Scribo") against an otherwise plain sans-serif
page — that is the page's one authored, non-generic device. Both are authored to this content: the
screenshots are real client work, and the handwriting face is a personal signature, not a stock
choice.

## 5. Motion grammar

- **Intro paragraph words**: trigger in-view (ViewTimeline), duration "auto" (scroll-range driven,
  not a fixed ms), property color, iterations 1 (once per word as it crosses the view threshold),
  does not pin or hijack scroll. Sprinkle.
- **Work-tile images** (`IMG.h-full.w-full.object-cover`) and their background/border div: trigger
  load/continuous, duration 114000ms, DocumentTimeline (time-based, not scroll-linked), no stated
  iteration limit — a slow, continuous crossfade loop inside the tile.
- **`logo-cycle-swap`** (multiple `DIV` elements, unstyled class): trigger load/continuous,
  duration 20000ms, DocumentTimeline, no iteration limit. This is the signature motion: the single
  work tile auto-advances its entire client case (image, heading, dek, link) on a fixed 20-second
  timer, looping indefinitely. Confirmed by comparing three states of one page load: the fold-early
  shot (domcontentloaded+250ms) shows a yellow-background tile, the settled fold shot
  (~4.5s post-goto) shows a green-background tile ("Delightful convenience in every way, every
  day"), and the hover shot (taken after further dwell) shows a third, dark-background client case
  (weight-management app phone mockups). It does not pin or hijack page scroll — it advances on a
  clock, independent of scroll position — but it is a continuous, non-user-triggered loop.

## 6. Type scale and grid

From computed styles (2.2 snippet): 1440 active sizes `[72, 18, 16, 14]`; 390 active sizes
`[56, 18, 16, 14]`. Display (h1) 72px at 1440 / 56px at 390, in "Scribo" (cursive), `text-transform:
none` (sentence case, capitalized first letters, not uppercase). Body 18px in "Untitled Sans"
(sans-serif) at both widths, `text-transform: none`. Ratio 72:18 = 4:1 at 1440, 56:18 ≈ 3.1:1 at
390. Four active sizes ≥12px at both widths. Body column: single column for the hero paragraph,
roughly 60ch by line-length estimate (first line reads "I work hands-on with a few product teams at
a time, usually" — about 61 characters). Section layout at 1440: hero is one column; the work-tile
section is two columns (tile ~65%, text ~35%); testimonials are two columns (a short label column
~25%, the quote body ~75%). At 390 every section collapses to one column, full width.

## 7. Hand-made versus templated

Three things that could only belong to this site: (1) the cursive "Scribo" H1 face as a personal
signature voice, unusual for a consultancy homepage; (2) the single auto-cycling work tile itself —
a bespoke, purpose-built device rather than a generic card grid; (3) the footer line "This website
uses no tracking. I hope you're having a great day" with a heart emoji — an idiosyncratic, personal
close. No DESIGN_BAR never-list tells were observed on this page (no gradient mesh, no particle
field, no glassmorphism, no 3D). Verdict: **hand-made**, though the testimonial list, logo band, and
email-signup block are conventional and would read as plain on their own; the cursive headline and
the one crafted tile are what carry it past the tomcritchlow plain-calibration baseline.

## 8. The one mechanism worth taking

The single work tile swaps its entire client case (image, heading, dek, link) on a fixed 20000ms
timer, so one crafted showcase slot substitutes for a multi-entry case grid.

This differs from what section 1 expected. The brief's expected mechanism was "how a solo consultant
stacks proof types within one screen without a case-study page" — implying multiple static tiles
shown together. What the capture actually shows is a single tile whose content auto-advances on a
loop, not several stacked static tiles. The "stacking of proof types" on this page is really the
sequence of sections (tile, then logo band, then testimonials), not simultaneous tiles within one
screen.

## 9. What is budget

What this site has that micahjonesconsulting.com does not, as shown on this page: a client logo band
naming Google, Loom, Spotify, and IKEA; three testimonials from named CEOs/founders with headshots;
a stated 29-year run of experience; a newsletter claiming 3,000+ subscribers; a published book; and a
dedicated "Articles" section. This is testimonial and tenure budget, not a production or motion
budget.

## 10. Rule collision

The signature mechanism (a continuous, non-user-triggered, looping content swap every 20 seconds)
collides with DESIGN_BAR R15 (entrances run once — this one repeats indefinitely) and with the
CLAUDE.md motion-discipline ban on marquee-style, unprompted looping motion (`motion-discipline.sh`
blocks marquees; this is a one-slot marquee by another name). It is not taken as-is. The
authored-screenshot-in-a-color-field device (question 4) touches no rule as a static pattern.

## 11. Capture facts

- URL captured (final, after redirect): `https://www.antonsten.com/` (redirected from
  `https://antonsten.com`, same domain, not a fallback trigger).
- Date: 2026-09-17 (capturedAt `2026-09-17T15:15:31.657Z`).
- Viewports: 1440x900 and 390x844, device scale factor 2 for fold/hover shots, 1 for stitched full
  pages.
- Page height: 3205px at 1440; 3573px at 390. Neither stitched capture was truncated (frame caps of
  15/12 were not hit).
- Consent banner: none encountered at either viewport (`"consent": "none"`); the page itself states
  "This website uses no tracking."
- Entry text in initial HTML: yes. `curl -s` of the raw fetch (200, 43,929 bytes) contains the h1
  text "I work with teams who need clarity in their product design" and the first testimonial's
  heading "10/10 experience" verbatim — server-rendered, no JS required.
- Fallback used: no. Primary was live (page load status 304 on cached loads, 200 on the plain
  fetch).

## Snippet outputs (from capture JSON, 1440 viewport)

**Type** (`TYPE_SNIPPET`, 1440): `[72, 18, 16, 14]`
**Type** (`TYPE_SNIPPET`, 390): `[56, 18, 16, 14]`

**Animations** (`ANIMATIONS_SNIPPET`, 1440, afterLoad — unique shapes, with counts):
```
{ el: "P.small scroll-reveal", dur: "auto", iter: 1, name: "scroll-reveal-color", timeline: "ViewTimeline" }  x1
{ el: "P.body scroll-reveal", dur: "auto", iter: 1, name: "scroll-reveal-color", timeline: "ViewTimeline" }  x8
{ el: "IMG.h-full w-full object-cover", dur: 114000, iter: null, name: "Animation", timeline: "DocumentTimeline" }  x25
{ el: "DIV.bg-border flex items-center justify-center", dur: 114000, iter: null, name: "Animation", timeline: "DocumentTimeline" }  x6
```

**Animations** (`ANIMATIONS_SNIPPET`, 1440, afterScroll — unique shapes, with counts):
```
{ el: "P.small scroll-reveal", dur: "auto", iter: 1, name: "scroll-reveal-color", timeline: "ViewTimeline" }  x1
{ el: "DIV.", dur: 20000, iter: null, name: "logo-cycle-swap", timeline: "DocumentTimeline" }  x20
{ el: "P.body scroll-reveal", dur: "auto", iter: 1, name: "scroll-reveal-color", timeline: "ViewTimeline" }  x8
{ el: "IMG.h-full w-full object-cover", dur: 114000, iter: null, name: "Animation", timeline: "DocumentTimeline" }  x25
{ el: "DIV.bg-border flex items-center justify-center", dur: 114000, iter: null, name: "Animation", timeline: "DocumentTimeline" }  x6
```

Full, unabridged arrays are in `c-antonsten-home-capture.json` (`viewports.1440.animations` and
`viewports.390.animations`).

## Closing line

Mechanism to take (Q8): the single work tile swaps its entire client case (image, heading, dek,
link) on a fixed 20000ms timer, so one crafted showcase slot substitutes for a multi-entry case
grid. Rule it touches (Q10): DESIGN_BAR R15 (entrances run once) and the CLAUDE.md
motion-discipline marquee/loop ban — this mechanism is a continuous, non-user-triggered loop and is
not taken as-is; the static screenshot-in-a-color-field device (question 4) is the part worth
carrying forward.
