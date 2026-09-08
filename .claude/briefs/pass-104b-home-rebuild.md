# Pass 104b — the home rebuild (executor: Codex xhigh, then a Sonnet measure leg)

The operator's six notes of 2026-09-08 are the brief, verbatim: "for the hero: there is alot of
wasted black space. the 5 billion is exit is super weak - maybe be something special like a unquie
sign that lights up after the go to market part lights up after the finger points it way? ther
operator not consultant part still feels like alot of wasted space. The video is too big (its sort
of pixelated. the how i work part feels weak. and also lacks any special animation or design that
makes it enticing and triggers someone to want to work with me. the packages part still looks
underwhelming - we need this part to be the most spectcular. the objections part is smart but the
questions and response are weak."

Two design workflows produced the specs: `wf_0cc6cbf6-ff3` (16 agents) and `wf_265102ca-797`
(6 agents). READ BOTH SYNTHESES BEFORE YOU START — they carry the measured numbers this brief
summarises and they are the authority on anything this file leaves implicit:
`.planning/design/PASS-104B-SYNTHESIS.md` (hero, proof, operator, how-I-work, build order, risks)
and `.planning/design/PASS-104B-SYNTHESIS-PACKAGES-OBJECTIONS.md` (packages, objections, gates).

Branch `design/room-and-ledger`, this worktree. Executors write; Fable commits (LESSONS #18).
Never push, never deploy, never bypass a hook. Commit boundaries are the sections below.

## 0. Facts that are load-bearing. Getting one wrong breaks the pass.
1. The hero's copper word lights at **2.54s** (`components/room/RoomMotion.tsx` declares
   `ARRIVAL = 2.54`, measured at frame 61). Any document saying 3.4 is stale. Every new beat is
   timed off that constant or off the section's own IntersectionObserver, never off a guess.
2. `<source media="...">` is **NOT honoured on `<video>`**. A naive responsive-source
   implementation ships the wrong file to one of the two widths. Select the source in the existing
   client script, and prove it in the network panel at 390 and at 1440.
3. `.planning/design/video/A2-hold.mp4` and `.webm` are already **1920x1080**;
   `.planning/design/video/B-loop.mp4` is **1440x1440**. The site serves 1280x720 and 720x720
   downscales. The masters are on disk; nothing needs regenerating from the model.
4. `app/room.css:531-536` applies `transform: scale(1.3)` about `50% 6%` plus
   `filter: brightness(1.45) contrast(1.2)` to the operator film. Both lines are **deleted**;
   framing comes from the crop instead. This is a third of the pixelation on its own.
5. `components/room/HowIWork.tsx` contains **zero `<a>` elements**. It is the only section on the
   page with no destination, which is why motion alone cannot fix "feels weak".
6. The copy gate walks **text nodes**, not concatenations. Splitting `$500` into a `$` span and a
   `500` span fails `14.3-no-figures`. Do not split a figure.
7. `ALLOWED_FIGURES` in `scripts/verify-room.py` is exhaustive: `$500, $2,500, $7,500, $99, $5K,
   $5B+`. New copy carrying any other figure fails the build.

## 1. The encodes and the CSS-zoom deletion (commit 1; unlocks 2 and 3)
Produce, into `public/video/`, with ffmpeg at
`C:/Users/micah/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.0.1-full_build/bin/ffmpeg.exe`:
- `a2-hold-1080.webm` and `a2-hold-1080.mp4` from the 1920x1080 masters (webm may be a straight
  copy of `A2-hold.webm`; mp4 re-encoded `-crf 24 -preset slow -movflags +faststart`).
- `b-band-1440.mp4` / `.webm` from `B-loop.mp4` with `crop=1440:640:0:280`.
- `b-tall-1080.mp4` / `.webm` from `B-loop.mp4` with `crop=1152:1440:144:0,scale=1080:1350`, for
  <=899px.
**RENDER ONE FRAME OF EACH CROP AND LOOK AT IT BEFORE ACCEPTING THE ENCODE.** The band crop must
contain the table, the papers, both hands and his face in three-quarter. If the offset is wrong,
change it and say so; `object-position: 50% 42%` leaves latitude to re-aim without re-encoding.
Then delete `app/room.css:531-536` (fact 0.4).
GATE: exactly one video file requested per element at 390 and at 1440 in the network panel;
Lighthouse mobile Performance not below 86; report every file's bytes.

## 2. The hero sign (commit 2 — areas 01 and 02 are ONE object)
Keep the 16:9 stage, `--fx 19.375%`, `--fy 38.2407%` and every existing hero check unmodified.
1. `.hero-copy .base-row`: `margin-top: auto` becomes `margin-top: 40px`.
2. `.proof` leaves `.base-row`; the 14px grey footnote register is retired from the hero.
3. NEW `.sign` inside `.stagewrap`: `left: calc(var(--fx) - 48px)` (the headline's own left edge,
   and the ONLY left edge in the hero), `right: var(--g)`, `bottom: 40px`. Three parts:
   (a) a 1px copper rule across the full width;
   (b) one baseline row, `display:flex; align-items:baseline; justify-content:space-between`. LEFT,
   keeping the id `heroproof`, the existing sentence set as a ledger sum:
   `<span class="l">Four exits,</span><span class="fig">$5B+</span><span class="l">combined.</span>`
   — labels 14px Anybody 500 wdth 80 uppercase .04em bone 60%; the figure 72px Anybody 300,
   `"wdth" 106`, tabular, **BONE 100%, never copper**;
   (c) RIGHT, right-aligned to the gutter on the same baseline, four separate spans —
   `Postmates` `SurveyMonkey` `Guardicore` `Neuton.AI` — 19px Hanken 500 bone 80%, separated by a
   CSS `::after{content:" · "}` so no separator enters the DOM. No years, no "(Akamai)".
MOTION, a third beat on the existing chain. At ARRIVAL + ~0.26s the copper rule draws
`clip-path: inset(0 100% 0 0)` to `inset(0)` over 560ms on the house curve, starting under the
letter the finger touched so the light visibly leaves the word and runs right. At +300ms into that
draw the figure fills opacity .28 to 1 over 260ms (the same fill as the copper word, so it reads as
one event in two places). At +420ms the label and the names rise 12px and fade in over 400ms, 60ms
apart. Rest state is the finished frame; with no JS or reduced motion the rule is fully drawn and
everything is at opacity 1.
AT 390: the sign replaces the dead espresso between the proof line and the operator film. Copper
rule at content width, `$5B+` at 52px (§14.5's own mobile price size), the label under it, then the
names on two lines at 17px.
GATES: every existing hero and fingertip check still passes UNMODIFIED. Add three: the sign's left
edge equals the headline's, the rule's computed colour is `rgb(200, 84, 43)`, and the §8.9
first-screen copper count ceiling rises from 4 to 5.

## 3. The operator band (commit 3)
The film becomes a full-bleed band and the heading sits across it.
- Band `width: 100vw; margin-left: calc(50% - 50vw)`, **height 440px** (not 480). Source
  `b-band-1440`, `object-fit: cover; object-position: 50% 42%`. Height falls 44% from 782.67 while
  the picture area holds (+3.6%), which is the answer to "too big" and "pixelated" at once.
- Move the 17px paragraph OFF the film. That paragraph is the only reason the veil has to reach
  opaque (`app/room.css:568-570`): 17px body needs 4.5:1, the 102.87px heading is large text and
  needs 3:1. With the paragraph off the film the blackout ends without reversing §14.2's ruling
  that the film is the focus. The heading stays ON the film.
- The right-hand column becomes a horizontal three-track ledger beneath the band. Cut the three
  label keys (zero new copy in this commit).
- 64px of espresso above the band, down from 120.
**HARD CONTRAST GATE, and it is a stop.** Sample the composited luminance behind every glyph run at
loop frames 0, 96 and 192 and require >= 3:1. If a frame fails, raise the veil's 84% stop in .05
steps. **If it will not clear 3:1 at .70, STOP AND REPORT.** Do not take the band solid: that puts
the section back where it started and is a silent revert dressed as a fix.
FALLBACK, named and specified in the synthesis, if the operator dislikes the full-bleed band on the
preview: option C, the 5:4 square, 15% shorter, nothing reversed, sharing ~80% of this work.

## 4. How I work: the spine and the doors (commit 4)
Geometry stays exactly as §18 Rule B set it. Two changes.
- THE SPINE: `.steps { position: relative }` and `.steps::before` draws a 1px `var(--hair)` (ink
  15%, **not copper**) vertical at `calc(var(--lane) + var(--gap))`, the full height of the three
  rows. No other section on the page has a vertical.
  GATE: its computed x equals the computed left edge of the objections list and of the receipts'
  caption column at 1440, 1280, 900 and 390.
- THE DOORS: each row becomes a link with a copper arrow glyph, which is the grammar the objections
  and receipts already use. Diagnose points at `#price`, Build at `/work`, Position at `/call` —
  confirm each target exists before wiring it.
EXPLICITLY REJECTED, do not reintroduce: copper node squares stamped on the rule (a bullet from an
icon kit in all but name), step links set in copper on type (copper on type is the hero noun's
alone), a copper spine, and flush-right display type on a page that is flush-left everywhere.
MOTION: the rows already rise on the section's observer. Add the spine drawing `scaleY(0)` to 1,
transform-origin top, 600ms, starting with row 1's rise. Nothing else.

## 5. Packages: the poster, the seam and THE BAND (commit 5 — the operator's loudest note)
**A DESIGN LOCK IS REVERSED HERE BY THE OPERATOR HIMSELF.** Asked directly, 2026-09-08, he chose
"Reverse the rule, build the band" over shipping the safe poster alone. So WINNING-BRIEF §3's "No
section declares a background" gains a THIRD named exception, alongside the ask's copper field and
the foot: the packages section. Record the amendment in `.claude/CLAUDE.md` and in the WINNING-BRIEF
with his words and the date, in the same commit. It is an exception, not a repeal: no other section
may declare a ground on the strength of it.
1. THE BAND: a full-bleed espresso band the three cards stand on. The Audit's 1px copper border
   moves from 3.85:1 on bone to 4.41:1 on espresso, which is the second reason he chose it.
   Every card's ink-on-bone type inverts to bone-on-espresso; **re-measure every text colour in the
   section against the new ground and report each ratio.** Nothing below 4.5:1 for body, 3:1 for
   the display figures.
2. THE POSTER, inside the band: `.rl-home .card .pr` `font-size: 72px` becomes `var(--d2)`
   (102.87 at 1440). No new register — that is the section head's own size, and §14.4's reservation
   of `--d` for the hero and the ask is untouched.
   **MEASURED RISK, and nobody in the round measured it: at 1024 `--d2` is 73.16px against a 246px
   card interior, and at 900 it is 64.30px against 204.67px. `$7,500` at wdth 106 measures roughly
   235 and 206. The 900 case overflows by about a pixel.** Measure at 900, 1024, 1280 and 1440
   before accepting. The two legal fixes are a `min(var(--d2), 72px)` floor below 1025 or wdth 80
   at <=1024. A new size register is NOT available and must not be improvised.
3. THE CARD INTERIOR reorders to figure / rule / caption: `.pblock` first (its existing
   `border-bottom` becomes the caption rule), then the name row with the Audit's pill, then the
   sentence, then the chip at `margin-top: auto`. `.pblock` STAYS INSIDE `.card` — moving it out
   breaks `16.3-4-hairlines` (`len(drawn0) == 13`) and renders an unpadded figure at 390.
4. THE SEAM: one 1px copper rule spanning all three cards at the section's opening, drawn with the
   house scaleX mechanism. **It must NEVER be drawn per-column** — a copper rule under a single
   cell is the rank-on-one-edge device §18 deleted at `app/room.css:775-790`.
5. ENGAGEMENTS keeps its geometry and reorders to the same grammar, figure first. It must read as
   the top of the ladder and stay connected to the three cards, which is the operator's standing
   ruling from 2026-09-06.
6. TWO 102.87px MASSES CAN STACK: the section head is two lines at `--d2` and the figures are now
   `--d2`. The seam sits between them to separate them. Measure at 1440 and 1280; if the head and
   the figure rank read as one wall, cap the head at one line.
DO NOT ADD option C's "superior dollar" (a smaller `$` in its own span). It fails `14.3-no-figures`
for the reason in fact 0.6; the synthesis records the test.
GATES that must pass unmodified: `18-audit-copper-border-and-pill` in full, `15.5-cards-mobile`,
`14.7-chip-labels-are-the-live-buttons`, `14.3-copy-gate`, `14.3-no-figures`, `14.3-no-years`,
`16.3-5-rises`, `16.3-3-heads`. Within `15.5-cards` only the price size changes; if the band
requires the `hair_ok` border test to change, name it and argue it.

## 6. Objections: three rows, the operator's approved copy (commit 6)
He chose "Three rows: keep one, add both new", and approved this copy verbatim. Ship it exactly.
- ROW 1 — Q: "I built it with Claude Code and it works. Now I cannot change one thing without
  rewriting half of it." A: "The tool does not change the work. I read the build top to bottom and
  write down what is load bearing, what is broken, and what to fix first. That is the Audit,
  $2,500."
- ROW 2 — Q: "Last time I paid for help, it took so much back and forth that I did most of it
  myself." A: "One person reads it, writes it and ships it, and that person is me. No account
  manager, no status meeting, no brief for you to write."
- ROW 3 — the existing AI-tools row, unchanged: "Is this for me if I built it with AI coding
  tools?" / "You built something real with Cursor, Claude Code, Lovable, v0 or Bolt. It works.
  Nobody is using it yet, or the next change keeps breaking it. Then yes."
The replaced "Hiring for a company rather than a build?" row is DELETED: it repeats the Engagements
block two sections up.
REGISTER, restoring §14.4's own ruling: `.q dt` 24px to 28px/1.2, `.q dd` 17px to 19px/1.5 with the
measure capped at 56ch, row padding 30px to 36px. At 390 the answer is 18px unless 19px holds at a
326px lane — measure and report.
THE DOOR: `.faq .sec` becomes a full-height flex column and takes one Rule C chip at
`margin-top: auto`, so its bottom edge aligns with the list's last hairline. Label
`Book a free intro call →` linking `/call`, verbatim from `Ask.tsx` so the copy gate sees no new
text node. Verify `curl -s localhost:3000 | grep -c 'Book a free intro call'` returns 2 before the
commit; if the ask's label has drifted, add an allowlist row instead.
GATE EDITS, all of them named: `18-objections-one-lane-from-the-seam` `fq["n"] == 2` becomes 3, its
`dt` size 24 becomes 28 and `dd` 17 becomes 19; `18-objections-mobile` `len(set(qTops)) == 2`
becomes 3; `16.3-4-hairlines` `len(drawn0)` rises by 1; `16.3-5-rises` `qDelay` becomes
`['0s','0.07s','0.14s']`. Add the three new strings to the copy gate's allowlist citing
"PASS-104B operator-approved 2026-09-08".

## 7. The footer (commit 7 — a defect Pass 104a exposed)
With the book block gone, `.foot .nav` spans columns 7 to 13 but its links sit at the column's left
edge, so the right third of the footer is visibly empty. Rebalance inside the existing system:
either right-align the nav column to the gutter, or split the links across two tracks. No new
material, no new copy. Report the before and after at 1440 and 390.

## 8. Gates and record for the whole pass
`pnpm build` green · `python -P scripts/verify-room.py` green (a `16.2-arrival` FAIL saying ffmpeg
is missing is your sandbox; note it and continue, Fable re-runs it outside) · axe on `/` at 390 and
1440 with zero serious or critical · Lighthouse mobile Performance not below 86 · every contrast
ratio this brief asks for, reported as a number · screenshots at 390 and 1440 of the home and of
each rebuilt section to `.planning/qa/pass-104b/` with `verification.md` carrying every command,
every measurement and every gate edit with its reason. Before each 1440 capture wait for
`document.fonts.ready` plus 3s so `<WallChart />`-style load animations are in their finished
frame. DO NOT COMMIT. Do not push.

## 9. Return conditions
The operator band failing 3:1 at a .70 veil · the packages price overflowing at 900 or 1024 with no
legal fix · a gate edit this brief does not name · any change to a price, a fact, a ledgered number
or a string a Pass 102/103/104a tick table names · the copper seam drawn under a single card · a
new type register · Lighthouse mobile falling below 86.
