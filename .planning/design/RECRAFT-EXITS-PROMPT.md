# Recraft prompt — the four exits figure

## Settings — checked against Recraft's docs, 2026-09-09

**Model: Recraft V4.1 Pro Vector.** V4 shipped 2026-02-17, V4.1 on 2026-05-14 and is now
2x faster and 13-16% cheaper than launch. The `_vector` variants emit GENUINE SVG path data
as model output rather than auto-tracing a raster afterwards, which is the only reason to
use Recraft here at all. Pro is 2048x2048 native.

**Better still: Recraft V4 Styles Pro Vector, in `precise` mode.** It accepts 1-10
REFERENCE IMAGES and locks onto their visual language — palette, shapes, linework, texture,
rendering character — for every generation after. This is the strongest lever available for
"a real artist did this", because it stops describing a style in words and hands it the
style that already exists on the page.

Feed it three images already in this repo:

      .planning/qa/pass-106/before-1440-band01.png    the hero
      .planning/qa/pass-106/after-1440-band03.png     the ledger
      .planning/qa/pass-106/final-offer-1440.png      the offer section

`precise` holds every detail; `flexible` matches the general vibe with more liberty. Use
precise.

**Aspect: 3:2 landscape** for a hero-region figure, or **1:1** if it sits in the chip
cluster's corner.

**Colour: state the RGB values IN THE PROMPT.** Recraft V4 has no separate palette-lock
control; exact colours stated in the prompt is the documented method.

      #9E3C25   terracotta   the ground
      #ECE3D0   bone         the bars and rule
      #2A1F18   espresso     depth
      #C9982F   saffron      one accent only, on the single numeral

**CORRECTION to an earlier draft of this file: Recraft V4 documents no negative-prompt
field.** The exclusions below go INSIDE the prompt as plain statements, not in a separate
box. Also unsupported in V4: style creation, prompt-based editing, image sets, and
artistic-level control — so iterate by regenerating, not by editing.

**Export SVG, not Lottie.** Recraft offers Lottie and it is the wrong choice here: Lottie
needs a JS runtime (`lottie-web`) on a site whose entire motion discipline is CSS
transitions with GSAP quarantined to one file. The SVG animates for free.

## The prompt

> A flat editorial vector diagram, drawn by hand in the style of a 1970s annual-report
> infographic. Four solid vertical bars of unequal height stand on a single horizontal
> baseline, left to right, each bar a plain rectangle with slightly imperfect edges as if
> cut from paper. The bars are bone-coloured on a deep terracotta field. Above the tallest
> bar sits one large geometric numeral. A single thin rule runs the full width beneath the
> baseline. Screenprint texture: visible grain, faint mis-registration where two colours
> meet, ink density varying slightly across each shape. Limited palette of exactly four
> flat colours, no gradients, no glow, no drop shadows, no bevels. Composition is
> asymmetric and generous, weighted to the left, with wide empty field on the right.
> Confident, restrained, printed — like a page from a company report, not a slide.

## Append this to the SAME prompt — there is no negative field

> No 3D rendering, no gloss, no glass, no neon, no glow, no bloom, no lens flare, no
> gradient mesh, no drop shadows, no bevels, no embossing, no isometric perspective. No
> people, no mascots, no icons. No arrows of any kind, no upward-trending arrow, no rocket,
> no briefcase, no handshake, no skyline, no dollar-sign clip art. No legend, no gridlines,
> no axis labels, no watermark, no text of any kind except the single numeral.

The arrow and rocket exclusions carry the most weight — that family is the single strongest
"AI made this" tell in business graphics, and image models reach for it on almost any
prompt containing growth or exits. State them explicitly and more than once if the first
generations keep producing them.

## Why bars and one numeral, not a picture

Four bars of unequal height IS the fact: four exits of unequal size summing to a figure.
It is the only composition on this list that a viewer can read as data rather than as
decoration, and it is the one both reviews of this site asked for — the number should be
the sum of things shown, not a claim made first. It also animates naturally: bars grow
from the baseline, the numeral counts or fades in last.

## What I will do with the file

Hand me the SVG and I will:

1. **Strip and re-author the paths.** Recraft output carries junk — nested groups,
   clip-paths, inline styles, sometimes embedded raster. It gets flattened to plain
   `<path>`/`<rect>` with the colours swapped to the site's own CSS custom properties, so
   the figure inherits the palette instead of hard-coding it.
2. **Animate it in CSS**, in the existing vocabulary: bars scale up from the baseline on a
   `transform-origin: bottom`, staggered, then the numeral fades. Transform and opacity
   only, the house curve, runs once and terminates, rest state is the finished frame, and
   `prefers-reduced-motion: reduce` disables all of it. That is the same contract
   `<WallChart />` runs under.
3. **Gate it.** Contrast measured for every colour pair, axe at both widths, and the
   motion-engineer's written approval — because the constitution says a second animated
   figure is "the second-signature line," so this either gets its own written exception the
   way WallChart did, or it replaces WallChart rather than joining it.

## Two things to know before you spend credits

**This overrules your own R12.** *"Every image is a real artifact — actual screenshot,
document, photograph, or hand-made graphic tied to the work. Zero stock photos, stock 3D,
Undraw-style figures, AI-generated imagery."* You asked for it twice and it is your site;
recorded here so the next session finds the decision rather than the contradiction.

**The cheaper path is still open.** Four bars, a baseline and a numeral is roughly forty
lines of hand-authored SVG. I can draw it directly, in your exact tokens, with no
generation step, no credits, no R12 conflict, and no cleanup pass — and it would be a real
artifact by the rule's own definition. Say the word if you would rather see that first;
Recraft is still there if you do not like it.
