You are the GLM executor for Pass-121 on micahjonesconsulting.com, in the worktree
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live (W). PROOF ROUND 4, after Fable's quality
look. Same hard limits: write only in W/.planning/mock/pass-121/proof/; no build, no dev server, no commit; no
emoji, no em-dashes, no sketch libraries, no fills, no icons.

READ FIRST: W/.planning/reviews/FABLE-121-PROOF.md in full. Its verdict is ADJUST FIRST. Section 1 says why the
drawing reads as a wireframe in a nice hand; section 2 items 1 to 8 are the changes; section 3 has the /work
items; section 5 lists the checks. Apply ALL of section 2 items 1 to 8 and section 3 to work-fold.html and
rfp-study.html. Summary of what that means (Fable's file wins on any difference):

1. Words inside the boxes: each of the six labels moves INSIDE its box, mono, split exactly as
   portals, / checked nightly | library, / 300+ pieces | bid or no-bid / score | draft, on the / buyer's criteria |
   the gap, / marked | a person / approves. Each box sized to its own words with 8px padding, so widths differ.
2. The whiteboard snake: row one left to right (portals, library, score); ONE short down arrow from the bottom
   of the score box to the top of the draft box, which sits directly under it; row two runs right to left
   (draft at right, the gap in the middle, a person approves at left) with left-pointing arrows. No routed or
   orthogonal connector anywhere.
3. One stroke weight for every hand mark on a page: 2px at 1440, 1.5px at 390 (circles, flow, margin arrow,
   brackets, underlines).
4. Emphasis by a second pass: the copper gap box and the arrow into it are drawn twice, two visibly offset
   passes, like the home circle. No fill, no glow.
5. Wobble that varies: more displacement near the start, end and corners of each stroke, cleaner through the
   middle. If one filter cannot do it, build each box from four strokes so every corner is a stroke end.
6. Scale and placement: on the RFP band at 1440 the drawing fills columns 8 to 12 (about 560px wide), its top
   aligned to the title's cap line, its sentence beneath at 15px, max 48ch; no empty band area taller than
   120px under the sentence. On /work at 1440 the drawing is max 400px wide, top aligned to the numeral's cap
   line. At 390 the entry order is: figure line, drawing, did-line, service label.
7. The circle: measure the LIVE home circle. With puppeteer (require from C:/tmp/p101tools/package.json, Chrome
   at C:/Program Files/Google/Chrome/Application/chrome.exe), open https://www.micahjonesconsulting.com/ at
   1440x900 with prefers-reduced-motion: reduce emulated (so the circle is at its finished frame), find the
   $20M+ figure and the SVG of its hand circle, and record: circle width / figure width, circle height / figure
   cap height, and the horizontal offset of the circle's left edge from the figure's left edge as a fraction of
   figure width. Save those numbers in proof/home-circle-ratios.json. Rebuild the $14M (56px) and $3M (72px)
   circles with THOSE ratios, the stroke grazing the cap line and baseline, the overshoot loop at the left. No
   even clearance.
8. The index context line for the anonymous client is set in Hanken 14px, color #3a3631, two lines max at
   1440, not three lines of mono. Mono stays for the folio and the service label.
9. The /work description, exact new punctuation (operator approved 2026-09-17): Four client engagements and
   the company I founded. $14M in revenue for a security company, $3M in contracts from an RFP engine, a
   content engine that peaked at 800,000 impressions in a month, a birth worker's practice rebuilt, and
   ORDANI. Each page says what I found, what I built, and what changed.
10. The doorway did-line runs to its column edge (no 440px cap).

MEASUREMENTS: keep M1 (labels do not intersect each other and sit inside the SVG), M2 (label size: at least
11px on /work, at least 12px on the band), M4 (page width), M5 (no arrow path crosses a label box). REPLACE M3
and ADD, printing PASS or FAIL with the numbers:
M3. Each circle's ratios vs home-circle-ratios.json: all three within 10 percent.
M6. Every label's box sits inside its own node box (inflate the node box by 2px), and the six node boxes have
    at least four distinct widths (round to whole px).
M7. The down connector's length is shorter than the tallest node box; no path in the drawing has a straight
    horizontal-then-vertical elbow (sample points; FAIL if any 90-degree turn with both legs over 20px).
M8. Stroke weight: rendered stroke width of the circle path, one node box path and the margin arrow path on
    the same page differ by no more than 0.5px (use getComputedStyle strokeWidth times the SVG scale, or
    non-scaling strokes).
M9. RFP band at 1440: the vertical gap between the bottom of the exhibit sentence and the bottom of the band is
    at most 120px, OR the band's other column extends lower (report both bottoms).
M10. At 390 on work-fold: DOM order and rendered top positions of the entry are figure line < drawing <
    did-line < service label.
M11. Ledger grep over both HTML files: none of 40%, 91%, intake completion, 290,000, 36x, $80M, Luna,
    per claim, or an em-dash character.
Iterate until all print PASS at both widths on both pages (at most four rounds). Re-take the four full-page
PNGs at deviceScaleFactor 2 and one crop of each drawing (work-fold-flow-crop.png, rfp-study-flow-crop.png).

REPORT (under 25 lines): every M line verbatim per page and width, the home-circle-ratios.json values, and a
one-line honest description of what the drawing now looks like. Claim nothing a measurement did not print.
