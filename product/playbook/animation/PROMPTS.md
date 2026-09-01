# The 80% Wall — generation prompt pack (vibe-coding factory)

For Recraft / Krea / Freepik-class tools with top image + video models.
Written model-agnostic. The style block is the asset: it locks every
output to the book's own visual grammar so nothing reads as imported
clip-art.

## Workflow (do it in this order)

1. Generate STILLS first in the image model until the style locks.
   Keep the winner as your style/seed reference.
2. Feed the winning still into the video model as the first frame
   (image-to-video). Ask for a perfect loop with no visible cut.
3. Never ask models to render readable text — they garble it. All
   labels stay abstract tick-marks; real type gets overlaid later.
4. Master in 16:9. Also generate one 4:5 crop-safe variant for
   mobile. Target a 5–8 second clean loop.
5. PDFs do not animate: stills go in the book, motion goes on the
   landing page.

---

## STYLE BLOCK (paste at the start of every prompt)

Technical field-manual illustration, hand-drawn ink linework with
flat spot color. Blueprint meets midcentury industrial poster. Warm
cream paper background (#F7F3EA). Line art in dark espresso brown
(#2A1F18). Flat accent fills ONLY in terracotta rust (#9E3C25),
muted gold (#C9982F), and deep petrol teal (#1A4548). No gradients,
no soft shading; simple hatching only. Confident, slightly imperfect
engineer's-notebook linework. Tiny abstract annotation ticks and
measurement marks (illegible, decorative). Flat 2D isometric cutaway
view. Calm, crafted, quietly humorous.

## NEGATIVE / AVOID (paste at the end of every prompt)

No 3D render, no Pixar or claymation style, no neon, no cyberpunk,
no blue or purple, no gradients, no glow effects, no corporate stock
style, no readable text or letters, no logos, no watermark, no
photorealism.

---

## PROMPT 1 — the hero loop (landing page video)

[STYLE BLOCK] A whimsical software factory in cutaway view: a long
conveyor belt carries small glowing rectangular blocks (abstract
code tiles, terracotta and gold) from left to right. Along the belt,
small workers at drafting desks type on tiny keyboards, inspect
tiles with magnifying glasses, stamp them approved, and slot them
into a growing app-tower on the right side. Overhead: pulleys,
pipes, a hanging blueprint sheet. Gentle perpetual mechanical
motion: belt rolling, pulleys turning, papers fluttering, tiles
sliding into place. Loops perfectly with no visible cut, locked
camera. [NEGATIVE]

## PROMPT 2 — the 80% wall (narrative loop, landing page or social)

[STYLE BLOCK] The same factory conveyor runs left to right but stops
at a tall brick wall built across the belt at the four-fifths mark;
finished tiles pile up gently against it. One worker stands on a
ladder at the wall, consulting a large unrolled blueprint, while a
second worker passes tiles up and OVER the wall through a small
petrol-teal chute, where they continue to a finished glowing tower.
Loop: tiles arrive, pile, pass over, tower pulses. Locked camera,
loops with no visible cut. [NEGATIVE]

## PROMPT 3 — wide still (landing-page header / book interior spread)

[STYLE BLOCK] Wide cutaway poster of the entire software factory:
intake hopper of raw idea-scraps on the far left, drafting stations,
the conveyor of glowing tiles, the inspection desk with stamps, the
brick wall at the four-fifths mark with its over-the-wall chute, and
the finished app-tower shipping crates on the far right. Small
workers throughout, mid-task. Composition like a technical poster,
generous cream margins. [NEGATIVE]

## PROMPT 4 — vignette stills (chapter-opener accents, pick per chapter)

Each: [STYLE BLOCK] + one line + [NEGATIVE]

- A worker pinning one large sheet (the spec) to a corkboard while
  three others gather around it, pointing.
- A worker in a vault doorway checking tiles against a checklist;
  rejected tiles slide into a bin marked with an X tick.
- Two workers loading a crate onto a hand truck labeled with an
  up-arrow tick, factory doors open to daylight.
- A worker at a switchboard routing one glowing tile to a friendly
  visitor at a service window (money changes hands as a gold coin
  tick).
- A single worker calmly reading a manual in an armchair while the
  factory hums along without them.

## PROMPT 5 — texture variant (if the base style feels too clean)

Append to any prompt above: Risograph print texture, slight ink
misregistration, visible paper grain, two-color overprint feel.

---

## Delivery specs (hand these to whoever exports)

- Video: H.264 MP4 + WebM, muted, a 5–8s clean loop, under ~4MB
  for the web page; export a poster frame PNG (used as the
  prefers-reduced-motion and loading fallback).
- Stills: PNG at 2x display size; the book wants 2000px+ wide for
  full-bleed spreads.
- Keep the same seed / style reference across every generation so
  the set reads as one hand.
