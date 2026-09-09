# Recraft prompt — the four exits figure

## Settings before you paste anything

- **Output: VECTOR / SVG.** Not raster. This is the single most important setting. Flat
  separable paths animate in CSS, stay sharp at any size, weigh almost nothing, and read as
  authored rather than rendered. A raster PNG cannot be animated in the way described below
  and will look like a render no matter how good the prompt is.
- **Style: "Vector Illustration"**, sub-style flat / bold-shape. Avoid anything named 3D,
  realistic, glow, cinematic, or gradient-heavy.
- **Aspect: 3:2 landscape** for a hero-region figure, or **1:1** if it sits in the chip
  cluster's corner.
- **Palette lock (these are the site's real tokens — paste them in the colour control):**

      #9E3C25   terracotta   the ground
      #ECE3D0   bone         the lines and type
      #2A1F18   espresso     shadow / depth
      #C9982F   saffron      one accent only, used on the single number

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

## Add this to the negative / "avoid" field

> 3D render, glossy, glass, neon, glow, bloom, lens flare, gradient mesh, drop shadow,
> bevel, emboss, isometric, stock-vector people, flat-design mascots, icons, arrows,
> upward-trending arrow, rocket, briefcase, handshake, skyline, dollar-sign clip art,
> generic startup illustration, chart junk, legend, gridlines, watermark, text labels

The arrow/rocket exclusions matter — that family is the single strongest "AI made this"
tell in business graphics, and image models reach for it constantly on any prompt about
growth or exits.

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
