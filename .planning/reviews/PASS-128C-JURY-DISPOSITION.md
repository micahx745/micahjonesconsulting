# Pass-128c jury disposition (2026-09-21 night, main session)

Three independent reads, each blind to the others. Inputs: `.planning/prompts/PASS-128C-QUALITY-READ.md` (Astra and
Fable, six images: live and fixed scroll sheets, doors at 390 and 1440, the Audit at 1440, doors at 390 reduced motion)
and `.planning/prompts/PASS-128C-DSPRO-EVIDENCE.md` (DeepSeek, text only: the brief's verification, RESULTS.md, the main
session's additions). Build under review: `preview/p128-jank` at `ece8ab4` (source `099c07a`).

| Reader | Verdict | Output |
|---|---|---|
| Astra (`gpt-6-astra`) | SHOW HIM AS IS | `ASTRA-128C-QUALITY.md` |
| DeepSeek (`deepseek-v4-pro`) | NOT YET (item 5: dropped frames 49 against the brief's <=45) | `DSPRO-128C-EVIDENCE.md` |
| Fable (`claude-fable-5-1`, one call) | ONE MORE FIX (give the terracotta door an edge) | below, verbatim |

## Fable's return, verbatim
VERDICT: ONE MORE FIX (give the terracotta door an edge)

1. Image 4, right half, y 255 to 645 and below; images 3 and 6, from "SEE THE ENGAGEMENTS" down to "TWO WEEKS". The
terracotta door has lost its shape: the door's fill and the band's ground are now the same colour, so at 1440 the teal
card ends on a hard line at y 645 while the right column is loose type on the page, and at 390 the second door runs
straight into the Audit heading with no boundary. The copy is written as a matched pair of doors; the page now shows
one card plus copy. Not in BEFORE (there the door sat on bone and had an edge). Fix, inside the ruling: give the
terracotta door the Audit box's hairline (bone at the same alpha as the box in image 5) or a one-step deeper terracotta
fill from the existing tokens. Ground and nav stay as ruled.

2. Image 4, the blank bottom 255 px (y 645 to 900); image 5, the blank band under the nav down to the heading at y 250.
The doors' bottom padding and the Audit's top padding now share one colour, so from the panels' bottom edge to "TWO
WEEKS" there is a single unbroken terracotta gap of at least 255 px at 1440 (the heading is still below the fold in
image 4), and the heading only fades in once it enters, so a desktop scroller can meet a near-empty screen. In BEFORE
the same space read as two paddings because it split into bone then terracotta. At 390 the gap is about 125 px and
fine, so this is not a phone blocker. Fix: measure the panel-to-heading gap at 1440 (both sheets are 390 only); if it
exceeds roughly 300 px, trim the doors' bottom padding.

## Premise checks (verified before adopting or dismissing)
- DeepSeek 1, item 5 fails as written: TRUE. Recorded as FAIL; never called a pass.
- DeepSeek 2, the attribution was not run under item-5 conditions: FALSE. Same probe, flags, local server and
  interleave, n=3 (`fix-ab/attrib/`); arm P reproduced item 5 (50/49/50). Its own falsifier, a fade-off arm landing
  near 49/50, was tested: 36/36/37.
- DeepSeek 3a, bucket totals not comparable: FALSE. Each total is the probe's whole-trace `DroppedFrame` count; the
  bucket count differs by one late drop.
- DeepSeek 3b, the A/B disabled the wrong heading: FALSE. "The Audit" h3 sits inside `.cw-offer__box.cw-reveal`, whose
  fade is unchanged from live and runs in both arms; the A/B disabled `#cw-offer-title`, the one entrance this pass
  changed.
- DeepSeek 4 and 5: agreed.
- Fable 1, the terracotta door lost its edge: TRUE (shots 3, 4, 6). The same holds for the Pass-127c rebuild, which
  puts a full-height terracotta plane on the terracotta world; its brief does not address it.
- Fable 2, the empty band at 1440: its own trim rule (above ~300 px) is not met. The reduced-motion 1440 shot puts the
  heading ~185 px below the panels; the empty band is the heading waiting for ScrollReveal's 18% threshold. No change.
- Astra 1-3: agreed, no fix.

## Main session's tie-break
Ship-ready as ruled (the fade kept), subject to his phone check. DeepSeek's item-5 gap is exactly the heading fade he
chose (36 without it). Fable's edge is a real design consequence of the terracotta ruling and goes to him as a call;
recommended: solve it in the Pass-127c doors rebuild, which carries the same problem, rather than an interim edge.

LEGS: fable=1 astra=1 dspro=1 dsflash=0 gemini=0 sol=1 glm=0 sonnet=0
