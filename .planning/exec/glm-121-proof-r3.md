You are the GLM executor for Pass-121 on micahjonesconsulting.com, in the worktree
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live (W). FIX ROUND 3 of the quality proof in
W/.planning/mock/pass-121/proof/. Same hard limits as before: write only in that folder; no build, no dev
server, no commit; no emoji, no em-dashes; copy strings unchanged.

The main session opened your round 2 captures. Two defects remain:

E1. The curved return arrow (from the end of row one down to row two) passes through the end of the label
bid or no-bid at every size (visible in work-fold-1440.png and rfp-study-1440.png). FIX: route the arrow so
its ink clears every label box by at least 10px in viewBox units: start it from the right edge of the third
box's vertical middle, swing it outside the label column, and bring it back to the top of the first box on
row two. Keep the same hand quality (one wobbling stroke, two-stroke head). EXTEND the measurement: M5 = for
each drawing, the bounding box of every arrow path against every label box; PASS only if none intersect
(sample the path with getTotalLength and getPointAtLength every 2 units, map points to screen with
getScreenCTM, and test each point against each label rect inflated by 4px).

E2. work-fold-1440.png shows a horizontal seam in the paper ground at about 795px from the top: the grain
layer stops there and the ground changes tone below it. FIX: the grain overlay must cover the whole page
height (position fixed with inset 0 on a full-height layer, or a background on body), so the ground is one
continuous tone at any capture height. Check the same on the 390 capture and on rfp-study.

Rerun capture-proof.mjs. Print M1 to M5 for both pages at both widths, then open work-fold-1440.png and
rfp-study-1440.png and confirm in one line each that the seam is gone and the arrow clears the label.

REPORT (under 15 lines): the M1 to M5 lines verbatim, and the two one-line confirmations. Claim nothing the
measurement or the image does not show.
