# Pass-127c: build the home doors band as direction 6, "The Copy Gets Eaten"

Executor: Sol (`codex-exec.ps1 -Task`) in `.claude/worktrees/p124-cuts` on a NEW branch `preview/p127-doors` cut from
`design/live-evolve`. Written by the main session (Opus) 2026-09-21. DO NOT DISPATCH until Pass-128c (the jank fix) is
merged into `design/live-evolve`: section 4b (filled 2026-09-21) builds on it, and the band sits where he saw the glitch.

## 1. The ruling
Operator 2026-09-21 (LESSONS #3 "DOORS: BUILD 6"): "Yes, build 6 (Recommended)". Unanimous jury (Fable, Astra, DeepSeek
v4-pro): the sell door's terracotta plane consumes the build sentence as the reader scrolls, then both doors settle at
poster scale. Reason: the only direction with a real moment, poster scale, the site's own petrol/terracotta pair, and
zero dead phone swipes. Reference mock (visual spec, not code to paste):
`.planning/mocks/pass-127/doors-r2/mocks/6.html`; its GIFs `shots/6-390.gif`, `shots/6-1440.gif`.

## 2. Copy: EXACT strings, unchanged from live (no new words anywhere, no kickers, no labels)
- Build door h2: `The demo took a weekend. The last 20% is eating your month.`
- Build door body: `That last 20% is my daily work. Want me on your build? Three fixed prices start at $500.`
- Build door link (to `/packages`): `See the three packages` + `<span aria-hidden>→</span>` (keep the live JSX arrow as is)
- Sell door h2: `An agency is too broad. A hire is too early.`
- Sell door body: `I build what your growing business needs next, from the product to the way you sell it. You get me directly.`
- Sell door (the whole door links to `/services`) label: `See the engagements` + the same arrow span.
- Section `aria-label="Which door fits"`, `id="doors"`. Line-break spans (if used) are `aria-hidden` with the full
  sentence as the h2's accessible name, exactly as the mock does; the visible text must still read as the sentence.
NON-ASCII: the arrow already exists in `app/(foyer)/page.tsx`; do not retype it. You write no non-ASCII (LESSONS #46).

## 3. Layout (existing tokens only: `--color-cw-petrol`, `--color-cw-terracotta`, `--color-cw-bone`, `--font-cw-display`,
`--font-cw-body`, `--font-cw-mono`; no new colours, no saffron, no copper in this band)
Files: `app/(foyer)/page.tsx` (the `<section className="cw-doors-band">` block, lines ~127-170) and `app/globals.css`
(the `.cw-doors-band` / `.cw-door*` rules at ~1933-2031 and the phone block at ~8520-8540; replace, do not duplicate).
Finished frame (the only frame without scroll-timeline support, with reduced motion, and without JS): both doors side
by side at >= 761px (petrol left, terracotta right, split at 50%), stacked at <= 760px (petrol top, terracotta bottom),
each door full-height of the stage, headline in Bricolage 800 opsz 96, body Hanken, link JetBrains Mono caps.
Jury must-fixes that are LAYOUT (all required):
- F1 Body and link pinned to each panel's FOOT at >= 761px so the halves fill their height (Fable graft; the mock floats
  each block mid-panel).
- F2 Phone headings use the full panel width: no forced line spans narrower than the panel at 390; the heading may
  wrap naturally at <= 760px (Astra).
- F3 Both complete choices readable on short phones: at 390x720 and 390x844 the settled stage shows both doors, both
  bodies and both links, links not crowded (Astra, DeepSeek).
- F4 No overlap between headline and body in any state (Astra).
- F5 761-1100px: no horizontal overflow; no `white-space: nowrap` span wider than its panel (check 768, 1024).

## 4. Motion
Allowed (Pass-122 amendment): scroll-driven, CSS only: `view-timeline` + `animation-timeline` on the band, a sticky
stage, `clip-path` on the sell door, `transform` for the headline contraction. Gate ALL of it on
`@supports (animation-timeline: view())` AND `@media (prefers-reduced-motion: no-preference)`; outside the gate the
finished frame of section 3 renders (that is also the no-JS state). No JS, no GSAP (quarantine gate), no scroll
listeners, no idle loops, no font-variation animation.
Jury must-fixes that are MOTION (all required):
- M1 Sharp type: lay headlines out at their LARGEST size and `transform: scale()` DOWN to rest, never up (Fable: iOS
  rasterises at rest size and blurs when scaled up).
- M2 The build heading contracts ONCE at 390 (the mock shrinks it twice, steps 03 and 04).
- M3 Phone hold: the band's sticky stretch is at most 60svh of scroll at <= 760px (band height 160svh), and at most
  100svh at >= 761px (band height 200svh). Every half-screen swipe inside it must visibly change (dead-swipe gate, 5).
- M4 The band's full height is in the server HTML (the band's height is CSS, not measured by JS), so CLS stays <= 0.05.

## 4b. World and scroll performance (filled 2026-09-21 from `.planning/qa/pass-128/`)
- WORLD: `data-world="terracotta"` (operator 2026-09-21, LESSONS #3 "THE DOORS WORLD IS TERRACOTTA"). Pass-128c already
  sets it on the live band; the rebuilt band keeps it. The hero-to-Audit stretch has NO world switch; do not add one.
- WHY: each world switch started ~450 colour transitions page-wide (336 on `a.cw-mlink`); forcing terracotta took
  frames over 33 ms at 4x CPU from 45 to 2 (LESSONS #51). The band must not add colour transitions of its own.
- BUILD ON Pass-128c: cut `preview/p127-doors` from `design/live-evolve` only after Pass-128c is merged there, and
  restore the Pass-127 mocks this brief cites (commits `f8a8589`, `3b13ef2`, on `preview/p126-how-i-work` only):
  `git checkout preview/p126-how-i-work -- .planning/mocks/pass-127` then commit them on the new branch.
- GATE for step 5.9: `scroll-probe.mjs --cpu 4 --runs 1`, three runs interleaved against the Pass-128c build: median
  `framesOver33ms` <= 5, median `droppedFrames` within +8 of Pass-128c's PREVIEW median, median `transitionEvents`
  within +20 of it, `worldSwitchCount` 0 on every run.

## 5. Verification (commands with expected output; a `got` that differs from `want` is a failure, never reinterpreted)
Run in `p124-cuts` after the build, server on 3126 (`preview-p124-cuts`):
1. `node .planning/exec/prepush-gates.mjs` -> last line `PREPUSH: all gates and the build passed`.
2. `bash .planning/exec/card1-126.sh http://localhost:3126` (main session runs it; Sol cannot run bash) -> `FAILURES: 0`.
3. `node .planning/qa/pass-126/hiw-wrap-gate.mjs http://localhost:3126` -> `HIW-WRAP-GATE: 0 failures`.
4. Visible text of `/` contains each section-2 string exactly once inside `#doors` (strip head and scripts; LESSONS #24).
5. Dead-swipe gate on the REAL page: adapt `.planning/mocks/pass-127/doors-r2/capture-127b.mjs` + `sheets-127b.py` to
   take `--url http://localhost:3126/ --band "#doors"`; at 390x844 and 390x720 -> `dead swipes: 0`; self-test PASS first.
6. Reduced motion and unsupported state: with `prefers-reduced-motion: reduce`, and separately with the
   `animation-timeline` gate forced off (inject `@supports` override or test in a browser without it), the finished frame
   of section 3 renders: both doors, all six strings visible. Screenshot at 390 and 1440.
7. CLS on `/` at 390 and 1440 <= 0.05 (`.planning/qa/pass-126/cls-page.mjs`); axe serious/critical 0 on `/`.
8. Contrast: bone on petrol and bone on terracotta at every body size >= 4.5:1 (bone/terracotta is 4.68:1; no tint,
   no opacity on the grounds).
9. The pass-128 scroll probe (`.planning/qa/pass-128/scroll-probe.mjs`) against the preview vs live: no regression in
   the hero-to-Audit stretch beyond its calibrated noise floor (numbers set in 4b).

## 6. Rejected (do not re-propose without a new dated ruling)
Round one A-E (still panels; operator "None yet: another round"). Round two: 1 The Doors Open (dead first swipe,
all-petrol finish), 2 The Sentence Arrives (ghost overlaps, diagonal cut foreign to the grid), 3 The 20% Event (a second
number moment above $20M+; duplicated "The last 20%"), 4 Two Posters (empty grounds, dead swipe, saffron 2.56:1 fails
AA), 5 Doors Ajar (no words render; glow; saffron on bone 2.05:1). DeepSeek's saffron leading edge on the plane (a
second accent). Video inside type or a scoreboard here (the $20M+ section's signature). Any new words.

## 7. Return conditions
Fable returns once at the first preview (390 and 1440 GIFs + the reduced frame). The operator tries the preview on his
phone before any push. Stop and report (do not improvise) if: any section-2 string cannot render exactly; the dead-swipe
gate cannot reach 0 within the M3 hold; CLS > 0.05; any gate in step 1 fails.

## 8. Parked operator decisions
The push (his words, recorded verbatim before the command). The exits phone fix, the exits title and Neuton's
"Undisclosed" are separate queued items, not this pass.
