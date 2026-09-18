# FABLE-121-G4: the Pass-121 brief before it commits as final

Fable 5.1, 2026-09-18. Read: `FABLE-121-G4-INPUT.md`, the brief in full, the five `entry:` blocks in
`content/work/*.mdx`, `components/hand/HandCircle.tsx` (stroke lines), `home-circle-ratios.json`,
G2's heading list and §4.2, G3 R7, `app/globals.css` at `.cw-wx-lead__h1`, the G1 §2.2 snippet.

## Verdict: FIX FIRST

Twenty-three exact replacements. No copy string changes; every string the operator approved stands.
The fixes remove every line that would have made the executor guess, close one conflict inside G3 as
folded (R9 against R3), remove one permission that the brief's own contrast check would fail (sage
text), and record the stroke ruling in the brief. Opus applies them verbatim, then the brief commits.

Each old text is quoted exactly as it appears; where a line begins with two spaces of list indent,
the quote starts after the indent and matches as a substring.

### 1. Header, status line
Old:
```
**Status: FOR G4, 2026-09-18, Opus 5 (main session).**
```
New:
```
**Status: FINAL, G4 passed with fixes applied 2026-09-18 (`.planning/reviews/FABLE-121-G4.md`), Opus 5 (main session).**
```

### 2. Header, the "Next" sentence
Old:
```
Next: Fable reads this at G4, then it commits as final. Nothing here is executed before G4. One
```
New:
```
Next: Stage A, after the G4 fixes are applied. The one
```

### 3. Header, the following line
Old:
```
conflict inside G3 is resolved here and flagged for G4: see 3.3, "The circle".
```
New:
```
conflict inside G3, the circle's stroke, is confirmed at G4: see 3.3, "The circle".
```

### 4. Section 2.4, margin notes: the executor chose the phrases
Old:
```
from; D2 checks each is a substring of its section, compared case-insensitively.
```
New:
```
from, and it places only the notes that `.claude/briefs/pass-121-margin-notes.md` lists: one note per h2 section of every study, each with its source line, written by the main session and committed before Stage D starts (section 7 stops Stage D without it). The executor chooses no phrase. D2 checks each listed note is a substring of its section, compared case-insensitively.
```

### 5. Section 3.1, description: the measure loop had no stop
Old:
```
moves in 1ch steps between 58ch and 62ch until it does (G3 R3, N10).
```
New:
```
moves in 1ch steps between 58ch and 62ch until it does (G3 R3, N10); if none of the five measures does, stop and report (section 7).
```

### 6. Section 3.1, four entries at 1440: context line missing from the order; "cap line" had no number
Old:
```
under it, service label), the exhibit in columns 8 to 12, max 400 wide, its top on the figure's cap line.
```
New:
```
under it, service label; the context line sits between the folio and the figure line, as on the doorway), the exhibit in columns 8 to 12, max 400 wide, its top on the figure's cap line. The cap line is measured once, never eyeballed: at 1440 the executor reads the figure's baseline as the `getBoundingClientRect().top` of a zero-height `display: inline-block` probe span inside the figure, and the cap height as `measureText('H').actualBoundingBoxAscent` on a canvas 2d context whose `font` is `getComputedStyle(figure).font`; cap line = baseline minus cap height. The offset from the figure's line-box top to that cap line is stored once as an em value (`--wx-cap`) and quoted in the Stage C commit, and C1 reads the exhibit's top against the cap line and reports them within 2px.
```

### 7. Section 3.1, four entries at 390: context line missing
Old:
```
390: folio and figure line, the exhibit at full width (max 240 tall, 300 for ORDANI's stacked drawing),
```
New:
```
390: folio, context line and figure line, the exhibit at full width (max 240 tall, 300 for ORDANI's stacked drawing),
```

### 8. Section 3.1, both occurrences (doorway and entries): the weight was undefined
Old (replace both):
```
at the words-figure's weight
```
New:
```
at weight 600 (the live `cw-wx-lead__h1` weight, `app/globals.css`)
```

### 9. Section 3.1, the words figure
Old:
```
`entry.line` at 36px. No circle on any of the four entries
```
New:
```
`entry.line` at 36px, weight 600. No circle on any of the four entries
```

### 10. Section 3.1, type sizes: the sr-only h2 would break the exact set; weights unnamed
Old:
```
line and the footer keep their live sizes outside the scope.
```
New:
```
line and the footer keep their live sizes outside the scope. The `sr-only` h2 renders no text and is outside the set. Weights: the h1 and the record heading take the weight of the home's uppercase display heading (`THE RECEIPTS.`; the executor reads it once from `app/globals.css` and quotes it in the Stage C commit); the record rows keep `.cw-ledger`'s live weights; every other Bricolage size on /work is 600, the live `cw-wx-lead__h1` weight; Hanken and mono weights as live.
```

### 11. Section 3.2, text size per placement: "about 600" cannot meet a 0.5px tolerance
Old:
```
on the 1440 band and Guardicore's body break (560 to about 600 wide), 11px at 390 (358 wide);
```
New:
```
on the 1440 band and Guardicore's body break (two placements: each rendered width is read once from the 1440 layout as the SVG's `getBoundingClientRect().width`, the user-unit font-size is computed from that reading, and both numbers per placement are quoted in the Stage D commit), 11px at 390 (358 wide);
```

### 12. Section 3.2, text in drawings: sage text fails the brief's own 4.5 check
Old:
```
copper on paper: labels are ink, or `--color-accent-copper-deep`, or sage on ORDANI; on the band they
```
New:
```
copper on paper: labels are ink, or `--color-accent-copper-deep`, never sage (sage text is 3.62:1 on the band and 4.14:1 on bone, under 4.5); on the band they
```

### 13. Section 3.2, exhibit sentence: a 15px sentence on /work breaks R3's exact set
Old:
```
Hanken 15px, max 48ch, server-rendered beneath the drawing,
```
New:
```
Hanken 15px, max 48ch, server-rendered beneath the drawing in the study only (the RFP engine's band, Guardicore's body break); no entry on /work carries a sentence, so R3's seven sizes hold;
```

### 14. Section 3.3, band media: cap line by the same method
Old:
```
its top on the title's cap line, the sentence 24 to
```
New:
```
its top on the title's cap line (measured as in 3.1, against the h1's first line at its band size), the sentence 24 to
```

### 15. Section 3.3, hand marks: three studies had no named turn
Old:
```
figure, a bracket or arrow at the story's turn, an underline under the close's link. Use the existing
```
New:
```
figure, a bracket or arrow at the story's turn, an underline under the close's link. The turn is named or it gets no mark: Guardicore's bracket on the paragraph named below; the RFP engine's arrow at the comparison table's one row whose text contains `gap` (zero or two such rows: stop and report); ORDANI, the content engine and the birth worker carry the circle and the underline only, unless `.claude/briefs/pass-121-margin-notes.md` names their turn paragraph by its first and last words. The executor never picks a paragraph. Use the existing
```

### 16. Section 3.3, figure moment: the numeral must not wrap under its circle
Old:
```
with the static circle around all of it (`Up to 800,000` is circled as one claim, qualifier included),
```
New:
```
with the static circle around all of it (`Up to 800,000` is circled as one claim, qualifier included, the figure `white-space: nowrap`),
```

### 17. Section 3.3, the circle: the stroke, recorded
Old:
```
proof's rule: the circle is 2px at 1440 and 1.5px at 390, `vector-effect: non-scaling-stroke`, like every
```
New:
```
proof's rule, confirmed at G4: the circle's loop is 2px at 1440 and 1.5px at 390, its overshoot stroke 0.85 of that (1.7px and 1.275px, `HandCircle`'s own ratio), `vector-effect: non-scaling-stroke` as `HandCircle` already sets, like every
```

### 18. Section 3.3, the circle: the flag closed
Old:
```
other hand mark. G4 confirms or reverses.
```
New:
```
other hand mark. Confirmed at G4 (`.planning/reviews/FABLE-121-G4.md`): `HandCircle` never scaled its stroke, and under `preserveAspectRatio="none"` a scaled stroke would draw a different pen for each figure.
```

### 19. Stage B3: the count
Old:
```
`identical=5/5`.
```
New:
```
`identical=7/7` (the five drawings and the two stacked 390 variants).
```

### 20. Stage C1: two specs had no check
Old:
```
- Exhibits server-rendered: raw HTML `grep -c 'cs-exhibit'` expect `>= 4`.
```
New:
```
- Exhibits server-rendered: raw HTML `grep -c 'cs-exhibit'` expect `>= 4`.
- Page height at 390: `document.documentElement.scrollHeight` expect `< 4600`.
- Exhibit top against the figure's cap line at 1440 (3.1), each of the four entries: expect within `2px`, both readings quoted.
```

### 21. Stage F, type sizes: the snippet counts the sr-only h2
Old:
```
the G1 section 2.2 snippet, scoped from the h1 to the record's last row;
```
New:
```
the G1 section 2.2 snippet, scoped from the h1 to the record's last row and with `.sr-only` elements filtered out (`!e.closest('.sr-only')`, they render no text);
```

### 22. Section 7: the margin-notes stop
Old:
```
- A false positive in A1's before-run.
```
New:
```
- A false positive in A1's before-run.
- Stage D reached with no `.claude/briefs/pass-121-margin-notes.md` committed: stop; the main session writes it.
```

### 23. Tail section (three lines: heading, blank, body)
Old:
```
## G3 ruling (appended after Fable's look)

(empty until G3)
```
New:
```
## G4 ruling (appended after Fable's look)

FIX FIRST, applied; commits as final. The circle's stroke is the page's pen, 2px at 1440 and 1.5px at 390, non-scaling, as `HandCircle` already draws it. Full text: `.planning/reviews/FABLE-121-G4.md`.
```

## The circle's stroke: PROOF §2 item 3 confirmed, R7 reversed on this point

One pen per page. The circle's loop is 2px at 1440 and 1.5px at 390, the overshoot 0.85 of that,
`vector-effect: non-scaling-stroke`. The numbers:

- `HandCircle` already sets `vectorEffect="non-scaling-stroke"` (its line 40 comment, kept since
  Pass-115) with strokes `3` and `2.55` in `home-circle-ratios.json`; under non-scaling those are
  screen pixels. The home's own mark never scaled its stroke, so R7's premise was wrong: "the home's
  mark" is a fixed-pixel pen on a stretched path, and the brief renders exactly that.
- Under `preserveAspectRatio="none"` the path is stretched by width / 180 across and height / 60
  down. The width follows the numeral's ink (1.1885 x its text width); the height follows the em
  (1.243 x font-size). At 72px the vertical stretch is 1.49 for every figure, but the horizontal
  stretch is about 0.9 for `$3M` and about 3.4 for `Up to 800,000`. A stroke that scaled with the
  path would render 3px on the top and bottom runs of both circles and about 1.7px on `$3M`'s sides
  against about 6.8px on `Up to 800,000`'s sides: a different pen for each figure on one page, one of
  them a broad nib turned sideways. Non-scaling gives 2px on every run of every circle.
- Relative weight: the home's 3px on a 298px-tall mark is 1.0 percent; 2px on the 72px figure's
  89px mark is 2.2 percent; 2px on the 36px words-figure phrase (45px mark) is 4.5 percent, and 1.5px
  at 390 is 3.4 percent. The circle reads heavier the smaller the figure. That is the pen not
  changing, which is the point: beside 2px drawings and a 2px bracket, a lighter circle would read as
  a second source. If the 36px phrase circle looks heavy at the first preview, the answer is a
  smaller circle, not a thinner pen.

## Executable verbatim

After the fixes, yes. The lines that forced a judgement, now closed: the exhibit's "cap line" with
no number (6, 14, 20); "the words-figure's weight" defined nowhere (8, 9, 10); the margin notes, where
the executor would have chosen a phrase per section for some twenty sections (4, 22); "the story's
turn" for three studies and "the gap row" (15); "560 to about 600 wide" against a 0.5px tolerance (11);
the description loop with no exit (5); the entries' context line absent from both orders (7, 6).

## Against G2, PROOF and G3 as folded

- R9 against R3: a 15px sentence under the RFP flow on /work would have put an eighth size in the
  exact set. Ruled: the sentence renders in the study only (13).
- Sage text: the brief allowed it "on ORDANI"; it is 3.62:1 on the band and 4.14:1 on bone, and E3
  expects 4.5. Removed before a check could fail on it (12).
- The G1 §2.2 snippet counts any leaf with `innerText`; the new `sr-only` h2 has one, at a size not
  in the set (10, 21).
- The rest holds: the JSON's bases over my read (R7 placement), `--cs-accent`'s fallback (R4), the
  verbatim §01 note and G2 §4.2's paraphrase dropped, the ORDANI band correction to G2 §7, R6's
  facts-gate scope, R8's figure split (the five `entry:` blocks confirm every substring: `hundreds of
  dollars`, `five to ten`, `$3M`, `Up to 800,000`), R11's fallback, R13's band order, R14's stacks.

## For the operator

The brief is sound and commits after twenty-three exact fixes; none touches a word you approved, they only stop the executor guessing where a drawing sits, which margin phrase to lift, and which paragraph gets a bracket.
The circle around each figure uses the same pen as the drawings beside it, 2px, which is how the home's own circle already works; a circle that changed weight with its size would have drawn a different pen for $3M than for the 800,000.
Before the studies build, Opus writes and commits the list of margin notes, one lifted phrase per section; that list and the first preview at 390 and 1440 are your next two looks, and push and deploy stay yours.
