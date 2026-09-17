You are the GLM executor for Pass-121 on micahjonesconsulting.com, working in the git worktree
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live (W). This is FIX ROUND 2 of the quality
proof you built in W/.planning/mock/pass-121/proof/ (work-fold.html, rfp-study.html, capture-proof.mjs).
Your first report said the labels never collide. The main session opened the captures: they collide, some
are clipped, and the $14M circle is in the wrong place. This round fixes those defects and proves each fix
with a MEASUREMENT printed by the capture script, not by eye.

HARD LIMITS (unchanged): write only under W/.planning/mock/pass-121/proof/. Never touch app/, components/,
content/, lib/, public/, docs/, .claude/. No build, no dev server, no commit. No emoji, no em-dashes, no
sketch libraries, no fills, no icons. Copy strings exactly as they already are in the two HTML files.

DEFECTS SEEN IN THE CAPTURES, AND THE FIX FOR EACH

D1. The $14M circle (work-fold, both widths) is a small rounded shape over the dollar sign, not around
the figure. At 390 it reads as a strike-through. FIX: the circle must enclose the whole $14M figure the way
the home page's $20M+ circle does. Read W/components/hand/HandCircle.tsx again, including the Pass-115
preserveAspectRatio none option and how the container insets it. Size the SVG box from the figure's box: the
circle's drawn stroke must clear the figure's glyph box by 6 to 16px on the left and right and 4 to 12px on
top and bottom, at 1440 and at 390. Same fix for the $3M figure moment circle in rfp-study.html if it has one.

D2. The RFP six-step flow is illegible at 1440, at /work index scale and at band scale: labels run into
each other (300+ piecesno-bid, the buyer'smarked) and the last labels are clipped (a per, appro).
FIX: use ONE layout at every size, the two-rows-of-three layout you already drew for 390 (row one: portals,
library, score; the arrow turns down and back; row two: draft, gap, approve). One viewBox, scaled only, so
the /work-to-study morph stays a pure scale. Break each label onto lines with tspans at the commas, exactly:
  portals, / checked nightly
  library, / 300+ pieces
  bid or no-bid / score
  draft, on the / buyer's criteria
  the gap, / marked
  a person / approves
Give each node column enough width that its longest label line fits with at least 8px to spare on each
side. Rendered label size: at least 11px at /work index scale (max 440px wide, columns 8 to 12 at 1440),
at least 12px at band scale. Keep the hand quality you had at 390 (the open boxes with corner overshoot and
the curved return arrow read well); do not make the lines straighter.

D3. The index entry at 1440 leaves the drawing small and floating high in its column. FIX: vertically align
the drawing's top with the top of the $3M figure line, and let it take the column width up to 440px.

MEASUREMENT (required; add to capture-proof.mjs and print the results)
After fonts are ready, for each page and width, in the page:
M1. For every SVG label text element: its getBoundingClientRect. Print PASS if no two label boxes on the same
drawing intersect and every label box sits fully inside its SVG's box; else print FAIL with the pair or the
label.
M2. Rendered font size of one label per drawing (getBoundingClientRect height of a single-line tspan is fine,
or computed font-size times the SVG scale): print it; FAIL if under 11px at index scale or under 12px at band
scale.
M3. For each circled figure: the figure text element's box and the circle SVG path's box
(getBoundingClientRect on the path). Print the four margins (left, right, top, bottom) and PASS only if
they fall in D1's ranges.
M4. Page width equals the viewport width (390 or 1440): PASS or FAIL.
Then take the same four full-page PNGs as before (deviceScaleFactor 2), overwriting them.

Iterate until M1 to M4 all print PASS at both widths on both pages (at most four rounds). Then open each PNG
once and describe in one line what the drawing looks like, honestly.

REPORT (final message, under 20 lines): the M1 to M4 output lines verbatim for each page and width, what
changed per defect, and any defect you could not fix. Do not claim anything the measurement did not print.
