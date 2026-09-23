# Pass-129 mocks: the home `#offer`, three directions

Built 2026-09-23 by one Opus 5.5 subagent from `MOCK-BRIEF.md`. Only files under `.planning/mocks/pass-129/`
were written; no commits, nothing deployed, no server left running (checked: no listener on 8129, no
Python-owned listener, no Playwright browser process).

**View:** `python -m http.server 8129 --directory .planning/mocks/pass-129`, open `http://localhost:8129/`
(the index links each page, its clip, the sheet and this file). Ctrl+C stops it.

| | G1 Where is it stuck? | G2 The tab | G3 The ladder |
|---|---|---|---|
| Words in `#offer` at rest, raw tokens (the brief's method; live = 152) | **115** | **101** | **102** |
| Same, real words only (live = 149) | 111 | 97 | 95 |
| `[TODO]` | 0 | 0 | 0 |
| Clip at 390 | `shots/g1-390.webm`, 5.9 s | `shots/g2-390.webm`, 6.5 s | `shots/g3-390.webm`, 4.9 s |
| One-line mechanic | pick your problem; the box answers | the scroll prints your order | pick a rung; your fee carries up |

Word method: `#offer` innerText with screen-reader-only text hidden, split on whitespace. It gives 152 on live,
of which 3 are the `·` and `→` tokens.

## Operator ruling applied (coordinator message, 2026-09-23)

The 60-day window applies only to an engagement. Two strings replace the brief's, verbatim:
1. Fine print, all three: `Every fee credits toward the next package, or toward an engagement started within 60 days. Full refund before kickoff, none after.`
2. G3, Sprint picked: `Your $7,500 credits toward an engagement started within 60 days.`

## NOT YET APPROVED (G3)

The two derived prices: `$2,000 after the Unstick Session` and `$5,000 after the Audit`. The `$5,000` line is in
G3's default frame (the Audit picked), so it shows at rest.

## Base and fidelity

- Captured live www on 2026-09-23 with `tools/fetch_base.py`: deployment `dpl_Bk18zCfBqPb2DjTrkozL2dBs7git`. The
  brief says main e091a16; the HTML carries no commit hash, so the deployment id is the record. The HTML, both
  compiled stylesheets, all 13 font files and the hero photo are saved locally. Every `<script>` is stripped, the
  17 `.cw-reveal` elements plus the hero sub and CTA row are forced to `is-in`, and only
  `<section id="offer">` is replaced.
- `assets/base.js` ports the two live behaviours that change how the page looks: WorldSwitcher (same map,
  rootMargin and picker) and the nav's `is-scrolled` chip. Not ported: SplitReveal's word reveal, the receipts clip
  inside $20M+, the exits scoreboard, Lenis and the hero parallax. Those show their no-JS frames, which is what a
  reduced-motion visitor sees on live.
- Parity probe: `#offer` top is 1289 px at 1440 and 1362 at 390, the same on mock and live. Hero 900, doors 389,
  Ordani 794 and footer 658 px heights are identical. `#products` differs (live 4544 px, mock 2125 at 1440) because
  live JS adds the exits scoreboard's sticky beats. Side-by-side shots of the hero and How I work matched.

## G1 "Where is it stuck?" (choose; the box answers)

**Layout.** At 1440 the left side (7fr) holds the H2, the question in Bricolage and three answer rows: a native
radio ring, the answer, and its area in Mono at the row's end, with thin bone rules between rows. The right side
(5fr) holds the live PriceBox, shortened (the four short deliverables in two columns), with the size row under it.
At 390 the same stacks. The first screen holds everything at 1440; at 390 it holds the H2, question, rows and the
box's top.

**The moment.** Tap an answer and the ring fills, the text goes from weight 500 to 800, and a 3px bone rule draws
across the row (scaleX, 200 ms). An invisible 800-weight twin reserves the row's box, so nothing re-wraps. The box
answers: its fit line swaps to that area's `AUDIT_FIT` (160 ms opacity) and `Covers: <label>.` is written in
above the buy button (180 ms clip).

**Size row.** `$500 $2,500 $7,500` is the live `.cw-pick` segmented control, with $2,500 checked. A pick swaps
the box to that package. All three packages share one grid cell, so the frame never moves under the pointer. The
Audit's buy is `.cw-buy`; the Unstick Session and the Sprint use `.cw-buy--quiet`.

**Strings (verbatim).**
- The H2; `Where is it stuck?`; the three answers; the area labels.
- Audit: `Start here`, `The Audit`, `$2,500`, `Two weeks · starts within the week`, `AUDIT_FIT` (none plus the three areas).
- The four short deliverables; `Buy the Audit →`; the fine print (coordinator); `Covers: ` + label + `.` (PackageBand).
- `$500` `$2,500` `$7,500`.
- After a size pick: the Unstick Session and Sprint name, price, term, `*_FIT`, list and buy.
- `See all three packages →` to `/packages`.

**Reused, not invented.** The brief gives the size row no label. Its accessible name is G3's `Pick a package`,
screen-reader only. **Presentation only:** the answers break at the clause (`notebook, ⏎ not in production.` and
`works. ⏎ The last 20% does not.`); a space stays before each `<br>`, so the text is unchanged.

**Would change:** give the size row a visible label. Unlabelled, `$500 $2,500 $7,500` under the box only reads as
other packages once you use it, and the brief has no string for it.

## G2 "The tab" (accumulate; the scroll prints the order)

**Layout.** The Audit is an itemized bone slip on the terracotta ground (radius 6 px, no shadow; the site's grain
makes it paper). The slip scopes its world to the live bone pair (espresso ink), so `.cw-buy` prints as the bone
world's espresso pill. At 1440 the H2 and packages link are centred against the slip (the live offer grid's
grammar), with the slip on the right margin. The whole slip fits a 1440×900 first screen, and at 390 the first
screen reaches the stub's buy button.

**The moment.** A print line at 90% of the viewport is the print head. A row's ink shows only above it, so each row
prints top to bottom as the tab scrolls up through it. It is driven by position, not time, and progress never goes
back. The header and the stub are pre-printed, so the name and the buy button never wait. The total's `$2,500`
assembles once when its row is through the head: the live `cw-wx-assemble` keyframes, weight 200 to 800 behind a
clip rising off the baseline, 0.8 s. Picking an area writes its label into the row (180 ms wipe).

**Arrival rules.** A jump prints what lands in view: the hero's `Start the Audit` anchor, `g2.html#offer`, or any
scroll step longer than 3/4 of a screen. Focus entering the tab prints everything. The tab is armed only when rows
are still below the line at load, and never under reduced motion.

**Strings (verbatim).**
- The H2; `Start here`; `The Audit`; `Two weeks · starts within the week`.
- `The memo`/`8-10 pages` · `The fix sequence`/`in priority order` · `The debrief call`/`one hour` · `The 30-day follow-up call`/`after the memo` · `The kickoff email`/`the moment you buy`.
- `The area`/`pick one here or at checkout` plus the three area labels.
- `Total`/`$2,500`; `You keep the memo either way.`; `Buy the Audit →`; the fine print (coordinator); the link.

**Known limit.** While the doors band is centred, the live WorldSwitcher paints the page bone. The bone slip then
reads as a hairline frame for the ~0.7 s crossfade (visible in the clip's first second). Rows reach the print line
after the switch, so the print happens on terracotta.

**Would change:** set the three area chips in Mono like the printed values, so the slip's one control reads as part
of the receipt rather than a form.

## G3 "The ladder" (progress; your fee carries up)

**Layout.** The live four-exits idiom: the Mono kicker `Three fixed prices` over a bone rule, with the visible
radio-group name `Pick a package` at the rule's right end. Below it, three columns at 1440 (rows at 390) split by
hairlines, no cards: name, big figure, Mono term, buy (Audit lead, the others quiet). Under the board, the picked
package's `none` fit line sits under columns 1-2, with the fine print and link under column 3. The first screen
holds everything at 1440; at 390 it runs from the H2 to the default credit line.

**The moment.** The Audit's `$2,500` waits visible at weight 200 if it is below the fold at load, then assembles
once as it scrolls in (the live WorkFigures rule and keyframes, 0.8 s). Picking a rung thickens its top rule (drawn
across, 200 ms; the site's "the rule thickens" grammar) and swaps the fit line. It then prints under the NEXT rung
the Mono `Your fee credits toward this` and the net figure (200 ms clip plus a 14 px slide from the picked side).
The Sprint prints its own line under itself.

**Structure.** Three subgrid layers (the radio group, the buys, the credits), so the tab order is the group, then
the three buttons, then the text.

**Strings (verbatim).**
- The H2; `Three fixed prices`; `Pick a package`.
- The three names, prices and terms; `Buy the Unstick Session →` `Buy the Audit →` `Buy the Sprint →`.
- `Your fee credits toward this`; `$5,000 after the Audit` (default); `$2,000 after the Unstick Session`.
- `Your $7,500 credits toward an engagement started within 60 days.` (coordinator).
- The three `*_FIT.none` lines; the fine print; the link.

**Would change:** print the net figure directly under the next rung's price rather than under its buy button, so
`$7,500` and `$5,000 after the Audit` read as one step of the ladder.

## Rules kept (all three)

- **Colour:** only the active world's `--cw-fg`/`--cw-bg`, plus the live bone/espresso tokens for G2's slip. No new
  colour, gradient, glow, shadow, icon, emoji or card-in-card.
- **Radius:** 12 px (the live PriceBox and picker) and 6 px (G2's slip and chips). The pills are the live `.cw-buy`.
- **Motion:** user swaps are CSS at 200 ms or less, transform, opacity or clip-path only. The one exception is G1's
  200 ms weight change, which the brief asks for.
  - One number per section assembles once: G2's total and G3's Audit figure; none in G1.
  - No timer drives G2's print.
  - None of the banned list: cursor followers, speed changes, marquees, idle loops, confetti, points, badges,
    timers or urgency.
  - Reduced motion shows the finished frame: a catch-all in `assets/offer.css`, and the JS never arms.
- **Controls:**
  - Native radios everywhere. G1's rows and G3's rungs are rings restyled with `appearance: none`; G1's size row
    and G2's chips are clipped inputs (the live `.cw-pick` pattern).
  - Targets are 44 px or more, focus is visible, and each section has one polite region. Announcements use only
    verbatim strings plus punctuation (probed below).
  - Every buy is a `<button type="button">` with no handler, so it is inert.
- **Hooks:**
  - The plugin's `motion-token-lint` blocked my first `assets/offer.css` (a `border-width` transition, and an
    opacity-plus-translateY swap). Both were removed, not exempted. The two 0.8 s assembly lines carry `motion-ok`
    tags citing LESSONS #3 PASS-122, as the live CSS does.
  - `copy-lint` rejected a draft of this file for quoting the planted test word. The probes now name banned-list
    entries by number.

## Probes (every one run; output verbatim)

**Shots:** `shots/g{1,2,3}-{390,1440}-{rest,picked}.png` (the first screen, arrived at as the hero anchor does; 390
at 2x), `shots/g{1,2,3}-rm-390.png` (reduced motion, arrived at by scrolling), `shots/SHEET.png` (1878×1692) and
the focus shots `shots/probe/g{1,2,3}-focus-390.png`. I looked at every one; the fixes they caused are listed at the
end.

**Fonts.** My first fonts probe checked one fixed weight per family. It returned false for Hanken Grotesk 500 on
G1 and G3, because those sections render no Hanken 500 text and the browser never fetches that face. The final
probe checks every family and weight the section renders (`weight:check/loaded faces`). A loaded-face count is
included because `document.fonts.check` is also true when nothing matches.

**Banned list, shell grep** over `shots/probe/g{1,2,3}-offer-visible.txt`. Git Bash GNU grep 3.0 aborts on `-i`
with `-f`, so patterns and text are lower-cased and the command is `grep -cwF -f`:
```
patterns: 37 lines (brand.json voice.banned, lower-cased, LF)
sanity, entry 10 in mixed case inside a sentence (expect 1): 1
sanity, entry 2 + 'n' as one longer word (expect 0): 0
g1  planted copy (entry 28 appended): 1 line hit  |  real #offer visible text: 0 lines hit
g2  planted copy (entry 28 appended): 1 line hit  |  real #offer visible text: 0 lines hit
g3  planted copy (entry 28 appended): 1 line hit  |  real #offer visible text: 0 lines hit
```

**`tools/probes.py`, final run (also in `shots/probe/probes.txt`):**
```
Pass-129 probes, 2026-09-23 09:21, headless Chromium (Playwright 1.62.0)
  Chromium 151.0.7922.34

=== G1
[fonts 390] Bricolage Grotesque 500:true/1 700:true/1 800:true/1 | JetBrains Mono 400:true/1 500:true/1 | Hanken Grotesk 400:true/1 600:true/1
[words at rest 390] raw tokens=115 words=111 (live #offer: raw 152, words 149)
[overflow 390] {'scrollWidth': 390, 'innerWidth': 390, 'bodyScrollWidth': 390, 'offerBoxesPastEdge': 0, 'examples': []}
[console 390] after load + every radio + every buy button: zero errors; url still g1.html
[fonts 1440] Bricolage Grotesque 500:true/1 700:true/1 800:true/1 | JetBrains Mono 400:true/1 500:true/1 | Hanken Grotesk 400:true/1 600:true/1
[words at rest 1440] raw tokens=115 words=111 (live #offer: raw 152, words 149)
[console 1440] after load + every radio + every buy button: zero errors; url still g1.html
[keyboard 390]
  start: out a "An agency is too broad. A hire is too early. I b" focus-ring=true
  Tab  1: IN  input[radio name=g1-area value=production] "The AI works in the notebook, not in production." focus-ring=true
  Tab  2: IN  button "Buy the Audit →" focus-ring=true
  Tab  3: IN  input[radio name=g1-pkg value=audit checked] "$2,500" focus-ring=true
  Tab  4: IN  a "SEE ALL THREE PACKAGES →" focus-ring=true
  Tab  5: out a "SEE THE WORK →" focus-ring=true
  groups reached by Tab: ['g1-area', 'g1-pkg']  (expected ['g1-area', 'g1-pkg'])
  g1-area: ArrowDown none -> build | live: "I go through your architecture, code, and deploy top to bottom. Covers: Product building."
  g1-area: ArrowDown build -> traction | live: "I go through your positioning and go-to-market top to bottom. Covers: Positioning & GTM."
  focused after arrows: IN  input[radio name=g1-area value=traction checked] "It works. It just does not sell. POSITIONING & G" focus-ring=true
  g1-pkg: ArrowDown audit -> sprint | live: "The Sprint, $7,500. One week on the repositioning, shipped. Not a plan. The thing, done. Covers: Positioning & GTM."
  g1-pkg: ArrowDown sprint -> unstick | live: "The Unstick Session, $500. Ninety minutes live on your positioning. You leave with a written plan the same day. Covers: Positioning & GTM."
  console/page errors during keyboard run: none
[reduced motion 390]
  no-pref at load (top of page):   row underline transition=0.2s | answer weight transition=0.2s
  no-pref after scrolling in:     row underline transition=0.2s | answer weight transition=0.2s
  no-pref after one pick:          picked row underline transform=matrix(0.779641, 0, 0, 1, 0, 0) (at +50ms)
  reduce  at load (top of page):   row underline transition=0s | answer weight transition=0s
  reduce  after scrolling in:     row underline transition=0s | answer weight transition=0s
  reduce  after one pick:          picked row underline transform=matrix(1, 0, 0, 1, 0, 0) (at +50ms)
[banned] 37 entries from .claude/brand.json voice.banned (hits reported as entry numbers)
  planted entry #28 into #offer h2: hits=1 ['#28']
  plant removed, whole page visible text: hits=0 []
  #offer visible text: hits=0 | every string the section can show (S): hits=0
[provenance] 51 distinct visible #offer text nodes (rest + 6 picks); not verbatim in brief/PackageBand/coordinator: none
[provenance] 6 distinct polite-region announcements; left after removing every verbatim string: ['  .', ', .   .'] (must be punctuation/space only)
[todo] '[TODO' in g1.html: 0

=== G2
[fonts 390] Bricolage Grotesque 700:true/1 800:true/1 | JetBrains Mono 400:true/1 500:true/1 | Hanken Grotesk 400:true/1 500:true/1 600:true/1
[words at rest 390] raw tokens=101 words=97 (live #offer: raw 152, words 149)
[overflow 390] {'scrollWidth': 390, 'innerWidth': 390, 'bodyScrollWidth': 390, 'offerBoxesPastEdge': 0, 'examples': []}
[console 390] after load + every radio + every buy button: zero errors; url still g2.html
[fonts 1440] Bricolage Grotesque 700:true/1 800:true/1 | JetBrains Mono 400:true/1 500:true/1 | Hanken Grotesk 400:true/1 500:true/1 600:true/1
[words at rest 1440] raw tokens=101 words=97 (live #offer: raw 152, words 149)
[console 1440] after load + every radio + every buy button: zero errors; url still g2.html
[keyboard 390]
  start: out a "An agency is too broad. A hire is too early. I b" focus-ring=true
  Tab  1: IN  input[radio name=g2-area value=production] "AI engineering" focus-ring=true
  Tab  2: IN  button "Buy the Audit →" focus-ring=true
  Tab  3: IN  a "SEE ALL THREE PACKAGES →" focus-ring=true
  Tab  4: out a "SEE THE WORK →" focus-ring=true
  groups reached by Tab: ['g2-area']  (expected ['g2-area'])
  g2-area: ArrowDown none -> build | live: "The area: Product building"
  g2-area: ArrowDown build -> traction | live: "The area: Positioning & GTM"
  focused after arrows: IN  input[radio name=g2-area value=traction checked] "Positioning & GTM" focus-ring=true
  console/page errors during keyboard run: none
[reduced motion 390]
  no-pref at load (top of page):   armed=true | row --p=0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000 | total wght=normal clip=inset(100% -10% -25%)
  no-pref after scrolling in:     armed=false | row --p=1.0000,1.0000,1.0000,1.0000,1.0000,1.0000,1.0000,1.0000 | total wght=normal clip=none
  no-pref after one pick:          area value "Product building" animation=cw-o-write (at +50ms)
  reduce  at load (top of page):   armed=false | row --p=unset,unset,unset,unset,unset,unset,unset,unset | total wght=normal clip=none
  reduce  after scrolling in:     armed=false | row --p=unset,unset,unset,unset,unset,unset,unset,unset | total wght=normal clip=none
  reduce  after one pick:          area value "Product building" animation=none (at +50ms)
[banned] 37 entries from .claude/brand.json voice.banned (hits reported as entry numbers)
  planted entry #28 into #offer h2: hits=1 ['#28']
  plant removed, whole page visible text: hits=0 []
  #offer visible text: hits=0 | every string the section can show (S): hits=0
[provenance] 26 distinct visible #offer text nodes (rest + 3 picks); not verbatim in brief/PackageBand/coordinator: none
[provenance] 3 distinct polite-region announcements; left after removing every verbatim string: [': '] (must be punctuation/space only)
[todo] '[TODO' in g2.html: 0

=== G3
[fonts 390] Bricolage Grotesque 700:true/1 800:true/1 | JetBrains Mono 400:true/1 500:true/1 | Hanken Grotesk 400:true/1 600:true/1
[words at rest 390] raw tokens=102 words=95 (live #offer: raw 152, words 149)
[overflow 390] {'scrollWidth': 390, 'innerWidth': 390, 'bodyScrollWidth': 390, 'offerBoxesPastEdge': 0, 'examples': []}
[console 390] after load + every radio + every buy button: zero errors; url still g3.html
[fonts 1440] Bricolage Grotesque 700:true/1 800:true/1 | JetBrains Mono 400:true/1 500:true/1 | Hanken Grotesk 400:true/1 600:true/1
[words at rest 1440] raw tokens=102 words=95 (live #offer: raw 152, words 149)
[console 1440] after load + every radio + every buy button: zero errors; url still g3.html
[keyboard 390]
  start: out a "An agency is too broad. A hire is too early. I b" focus-ring=true
  Tab  1: IN  input[radio name=g3-pkg value=audit checked] "THE AUDIT $2,500 TWO WEEKS · STARTS WITHIN THE W" focus-ring=true
  Tab  2: IN  button "Buy the Unstick Session →" focus-ring=true
  Tab  3: IN  button "Buy the Audit →" focus-ring=true
  Tab  4: IN  button "Buy the Sprint →" focus-ring=true
  Tab  5: IN  a "SEE ALL THREE PACKAGES →" focus-ring=true
  Tab  6: out a "SEE THE WORK →" focus-ring=true
  groups reached by Tab: ['g3-pkg']  (expected ['g3-pkg'])
  g3-pkg: ArrowDown audit -> sprint | live: "One week on one outcome, shipped. Not a plan. The thing, done. Your $7,500 credits toward an engagement started within 60 days."
  g3-pkg: ArrowDown sprint -> unstick | live: "Ninety minutes live on whatever is stuck. You leave with a written plan the same day. Your fee credits toward this: The Audit, $2,000 after the Unstick Session."
  focused after arrows: IN  input[radio name=g3-pkg value=unstick checked] "THE UNSTICK SESSION $500 90 MINUTES · SAME-DAY P" focus-ring=true
  console/page errors during keyboard run: none
[reduced motion 390]
  no-pref at load (top of page):   fig classes=cw-g3__fig is-armed | wght="wght" 200 | animation=none
  no-pref after scrolling in:     fig classes=cw-g3__fig | wght=normal | animation=none
  no-pref after one pick:          credit printed under audit: "YOUR FEE CREDITS TOWARD THIS $2,000 after the Unstick Session" animation=cw-g3-print (at +50ms)
  reduce  at load (top of page):   fig classes=cw-g3__fig | wght=normal | animation=none
  reduce  after scrolling in:     fig classes=cw-g3__fig | wght=normal | animation=none
  reduce  after one pick:          credit printed under audit: "YOUR FEE CREDITS TOWARD THIS $2,000 after the Unstick Session" animation=none (at +50ms)
[banned] 37 entries from .claude/brand.json voice.banned (hits reported as entry numbers)
  planted entry #28 into #offer h2: hits=1 ['#28']
  plant removed, whole page visible text: hits=0 []
  #offer visible text: hits=0 | every string the section can show (S): hits=0
[provenance] 27 distinct visible #offer text nodes (rest + 3 picks); not verbatim in brief/PackageBand/coordinator: none
[provenance] 3 distinct polite-region announcements; left after removing every verbatim string: [' ', ' : ,  .'] (must be punctuation/space only)
[todo] '[TODO' in g3.html: 0
```

**Fixes the screenshot review caused:**
- G1: `text-wrap: balance` split `The demo works. The / last 20% does not.`, so the answers now break at the clause.
- G2: a left-to-right partial print read as a glitch in stills (`o either way.`), so the print became the top-down
  print-head model.
- G2: the slip overran 1440×900 and its buy button fell below 390's first screen, so its spacing was tightened.
- G3: the fine print and link fell below 1440's first screen, so the foot now shares the board's columns.
- Clips: a jump pre-positioned the G2 clip and pre-printed the tab, so the clips now pre-roll by scrolling.

## Files

- **Pages:** `index.html`, `g1.html`, `g2.html`, `g3.html`.
- **Assets:** `assets/` holds the live CSS and fonts; `base.js` (the WorldSwitcher and nav port); `offer.css`
  (shared); `g{1,2,3}.css` and `.js`.
- **Shots:** `shots/` holds the 12 shots, 3 reduced-motion shots, 3 clips and `SHEET.png`; `shots/probe/` holds
  `probes.txt`, the focus shots and each page's visible `#offer` text.
- **Tools (to regenerate):** `tools/fetch_base.py` re-captures live, so it would pick up newer live changes.
  `build.py` holds every string once, in `S`. Then `capture.py`, `probes.py` and `sheet.py`. `serve.py` is the
  throwaway server the scripts share, and `base.html` is the stripped live page.
