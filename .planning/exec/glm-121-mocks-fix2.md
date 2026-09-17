You are the executor running FIX ROUND 2 on the Pass-121 mock set you just built, in the git worktree
C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live (W). The main session opened every
capture and measured the CSS. Seven defects below are confirmed by measurement or by an opened image, not
by opinion. Fix all seven, re-measure, re-capture.

HARD LIMITS, unchanged: write ONLY under W/.planning/mock/pass-121/set/. Never edit app/, components/,
content/, lib/, public/, docs/ or .claude/. No pnpm build, no dev server, no commit, no push. No emoji, no
em-dashes, no icons, no fills, no people. Every copy string already in the mocks is exact and approved:
do not reword one. You are changing typography, colour, geometry and markup only, plus the two label
strings named in D.

## D1. The 0.6 opacity rest state fails WCAG AA everywhere. This is the blocking one.

`.flow .hl { opacity:.6 }` in all four files puts every highlighted element and its label below even the
3:1 graphical-object bar, at rest, on both grounds. Measured by the main session:

| as built                          | effective colour | ratio | 4.5:1 text | 3:1 graphic |
|-----------------------------------|------------------|-------|------------|-------------|
| copper on paper at opacity 0.6    | #d39676          | 2.19  | FAIL       | FAIL        |
| sage on paper at opacity 0.6      | #9aa390          | 2.29  | FAIL       | FAIL        |
| copper on theater dark at 0.6     | #793c21          | 2.24  | FAIL       | FAIL        |

Reference values at full strength: copper `#bd5a2d` on paper 3.93 (graphic PASS, text FAIL);
copper-deep `#8a3d24` on paper 6.62 (both PASS); sage `#5e7158` on paper 4.61 (both PASS);
copper on theater dark 4.22 (graphic PASS, text FAIL).

Fix, in this order:
1. **Delete the 0.6 rest opacity.** Every highlighted stroke renders at opacity 1 at rest, on every page
   and both grounds. The rest state is now legible; that is the point.
2. **The hover grammar keeps its beat without opacity.** On `.doorway--hover` and `.entry--hover`, the
   highlight's SECOND (overshoot) pass `.p2` goes from opacity 0 to 1 over 200ms `--ease-hover`. So at
   rest the copper element is one clean pass, and on hover the hand goes over it a second time. Same
   200ms, same reversal on unhover, no new mechanism.
3. **Highlight TEXT never takes the accent at small size.** Any `text` element under 24px rendered size:
   on paper use `--copper-deep #8a3d24` (6.62), or `--sage #5e7158` (4.61) on the ORDANI drawing; on the
   theater dark band use the band's own ink `#ece3d0`. The accent stays on the STROKE, which is a
   graphical object and passes at 3:1. Never copper text under 24px on paper.
4. Prove it: for every `text` and every `.ln` stroke in every drawing, on both grounds, compute the
   composited colour against its actual ground and assert text >= 4.5 and strokes >= 3.0, at rest AND in
   the hover frame. Report the lowest ratio found per page. Run the check once against the current
   `opacity:.6` build first so you can show it fails; a check that cannot fail is not a check.

## D2. The ORDANI drawing is 45 words of body copy set in monospace. Rule violation.

Measured: `.flow text { font-family:'JetBrains Mono',monospace; font-size:19px }` applies to every string
in every drawing, including the ORDANI comparison's four full sentences. The project constitution allows
mono for labels, section codes and data only; mono body copy and the mono aesthetic are banned and
`motion-discipline.sh` enforces it. Four complete sentences at 19px are body copy.

Fix, in the ORDANI claims drawing only:
- The two COLUMN HEADS (`Filing it yourself or through a service`, `Filing it in Ordani`) stay mono. They
  are labels.
- The four SENTENCES move to `'Hanken Grotesk', sans-serif` at 17px, normal weight, `fill: var(--ink)`.
- The closing line `Hundreds of dollars per client stay with the practitioner.` moves to Hanken 17px in
  `var(--sage)` at opacity 1 (4.61, passes).
- Keep the hand-drawn boxes around the sentences; only the typeface changes.
Everywhere else the drawings' short mono labels are correct and stay mono: they are labels, not prose.

## D3. The Guardicore copper label is clipped at both ends.

In `drawing-guardicore-vis-1440.png` the string `east-west traffic, seen` starts at the right frame's left
edge and its final glyphs cross the frame's right edge. Two clipped ends, confirmed by opening the PNG.
Fix: the label sits BELOW the right frame's bottom edge, left-aligned to the frame, fully inside the
drawing's viewBox with at least 8px of clearance on every side. Re-run your label-overlap measurement over
EVERY label in EVERY drawing at both widths and report any box whose ink extends outside the viewBox or
crosses a stroke it does not belong to. LESSONS #36: "labels never collide" was claimed once on this
project and the capture showed five failures, so this one is measured, per label, with numbers.

## D4. The Guardicore workload boxes are an identical grid. Same tell the proof round removed.

Six boxes of identical width and height in two rows. FABLE-121-PROOF section 2 item 1 ruled that uniform
boxes on a grid are the first thing the eye reads and that they read as software; that ruling removed the
same tell from the RFP flow and it applies here.
Fix: vary the six boxes. At least four distinct widths across the six, widths ranging roughly 0.75x to
1.3x of the current width, heights varying slightly, and their vertical positions off a shared baseline by
a few px. They are hand-drawn workloads, not a table. The single `workloads` label and everything else in
the drawing stay as they are. Two rows and the viewBox do not change.

## D5. The two figure-move drawings disagree with each other.

They are the same device on two entries and must share one grammar.
- Birth worker: `bookings a month` is drawn INSIDE a hand box, which makes the unit read as a third node
  in the flow. The content engine's equivalent (`impressions in a month`) is correctly a plain line with
  no box. Fix: remove the box from `bookings a month`; set it as a plain line beneath the two nodes,
  matching the content engine exactly.
- Birth worker carries TWO copper elements (the arrow between the nodes AND the `+` tag); the content
  engine carries one (the `+` tag; its arrow is ink). One copper element per drawing is the rule. Fix:
  the birth worker's arrow becomes ink, the `+` tag stays the single accent, matching the content engine.

## D6. The heading's markup breaks its own verification and its accessible text.

`work.html` has `<h1 class="wx__head">The Work,<br>On The Record.</h1>` uppercased by CSS. Two problems:
the `<br>` yields the accessible and served string `The Work,On The Record.` with no space after the
comma; and title case is not this site's convention. The live site writes these strings sentence case in
the DOM and uppercases them in CSS (`"The receipts."`, `"How I work."` in the home, `Also on the record`
in `content/work-page.ts`), and `components/TitleCard.tsx` breaks display lines with spans that emit a
real space between lines rather than a `<br>`.
Fix in all four mock files, for every display heading:
- DOM text is sentence case: `The work, on the record.` and `Also on the record.` The rendered uppercase
  comes from `text-transform:uppercase`, which is already there.
- Replace each `<br>` inside a display heading with two `<span class="...__line">` elements and a literal
  space between them, the TitleCard pattern. Assert the h1's `textContent` is exactly
  `The work, on the record.` including the space after the comma.

## D7. The 390 doorway photograph crops the subject's head off.

`work-390-fold.png`: the 16:10 crop at 390 frames a raised arm and a hand and cuts the head at the top,
while the 1440 crop frames the face well. The doorway is the featured entry and this is the first
photograph a phone visitor sees.
Fix: change the 390 crop's focal point so the face that is centred in the 1440 crop is inside the 390
frame. Use `object-position` on the existing image; do not change the aspect ratio, the 358px width, or
the file. Open the recaptured `work-390-fold.png` and say in one line what is in frame.

## Three metric corrections. Read these before you re-measure.

Your round-1 report shows three measurements that pushed the design the wrong way. A metric you must
satisfy is not permission to change the design until it passes. If a check below cannot pass without
damaging the drawing or the page, STOP and report the raw numbers; the main session rules. Do not
reinterpret an expected value (LESSONS #25).

- **M14 is amended.** "At least four distinct box widths" applies to the three diagrams that have that
  many boxes: rfp-flow, guardicore-vis, ordani-claims. The two figure-move drawings (content-move,
  birth-move) are two nodes each by design and are EXEMPT from the width floor. You boxed
  `bookings a month` to reach four widths; that turned a unit into a third node. D5 removes that box. Do
  not add a box, a node or a tag to any drawing to satisfy a count.
- **M15 is amended.** The tenure-year pattern does not apply to the copyright line. Restore the footer
  row you deleted, exactly as the live site has it: `© 2013–2026 Micah Jones` (source:
  `components/color-worlds/PageFooter.tsx` line 34, read it). Exempt that one line from the tenure grep by
  excluding the literal string `© 2013–2026 Micah Jones` before the pattern runs, and say in the report that
  you did. A check that deletes real content to reach zero has failed, not passed.
- **The D3 overlap check measures both axes.** Round 1 measured the east-west label's vertical clearance
  and called it clear, while its horizontal ink ran past both frame edges; your own vision pass flagged
  it and the DOM number overruled it. For every label: its ink bounding box (use `getBBox()` on the
  `text` element, then map through `getScreenCTM()`) must sit inside the viewBox with at least 8px on
  left, right, top and bottom, and must not intersect any stroke's bounding box other than the box it is
  written inside. Report the four margins for the east-west label explicitly.
- **M13 stays as you ran it.** Your forcing of five type sizes onto the seven-size set is a real conflict
  inside G2 (section 3.1 against 3.2, 3.3 and 2). Do not change those sizes this round; the judge rules
  on it. Keep them exactly as round 1 left them so the comparison is clean.

## Re-measure and re-capture

Re-run every M1 to M15 check from the first round plus the D1 contrast check and the D3 per-label overlap
check, at 390 and 1440. Then recapture EVERY png in the set with the same names, so nothing stale is left
behind. Open every PNG you cite.

## Report, under 30 lines

Per defect D1 to D7: the measurement or the opened image that shows it is fixed. The lowest contrast ratio
found per page, per ground, at rest and hovered. Every M-check line verbatim per page and width. Anything
you could not do, named plainly. Claim nothing a measurement or an opened image did not show.
