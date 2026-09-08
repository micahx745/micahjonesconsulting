# Pass 104b — the home rebuild: the design synthesis (Workflow wf_0cc6cbf6-ff3, 2026-09-08)

16 agents: 6 research legs (web + the corpus), 6 direction legs (3 options each), 3 juries (buyer,
constitution, motion), 1 synthesist. The operator's six notes of 2026-09-08 are the brief. Areas 05
and 06 returned no options (a direction leg's reply was truncated) and were re-run as Workflow
wf_265102ca-797; this file carries areas 01-04 plus the build order and the risks.


## 01 Hero — the room (app/(room)/page.tsx, components/room/Room.tsx, app/room.css 347–492 desktop / 1939–2000 ≤899px)

**PICK.** HERO A — "The lit sign": keep the 16:9 stage and every fingertip constant, delete the 14px footnote, and close the stage on a copper rule + a bone figure + the four company names. Hero B ("the room returns", full-bleed film) is NOT built this round; Hero C (the price counter) is dead — the buyer jury killed it as a lifted SaaS pricing pattern that answers a question the operator did not ask, and the constitution jury found it reinstates the exact rank-on-one-edge copper rule §18 deleted (room.css:775-790).

### Spec

WHY A AND NOT B. Buyer 7/8, constitution 9/8, motion 9 for A. A keeps §14.1's stage, §14.7's --fx 19.375 / --fy 38.2407 and every hero verifier check unmodified; B needs the §8.6 composited-luminance sample re-run over live video under the bone row (room.css:408's ceiling ramp was hand-cut for the letterbox and does not transfer), an unmeasured aspect branch below ~940px, and it answers "the video is too big" by making the film the whole screen. B is A plus a geometry change: the sign below is specified identically in both, so B stays available later as a pure geometry commit once its two measurements land — it is not a rejected idea, it is a deferred one.

LAYOUT AT 1440 (stage 1440×810; --fx→279.0, --fy→309.75; hero-copy left = calc(var(--fx) - 48px) = 231, right = var(--g) = 32 → 1408). FOUR CHANGES, NOTHING ELSE MOVES:
1. `.rl-home .hero-copy .base-row` — `margin-top: auto` becomes `margin-top: 40px`. The chips stop being flung to the block's floor and sit 40px under the lede.
2. `.proof` leaves `.base-row` entirely; the 14px grey footnote register is retired from the hero.
3. NEW `.sign`, absolutely positioned inside `.stagewrap`: `left: calc(var(--fx) - 48px)` (231 — ONE left edge in the hero, the headline's), `right: var(--g)`, `bottom: 40px`. Three parts and no more:
   (a) a 1px copper rule across the full 1177px at y≈672;
   (b) ONE baseline row, `display:flex; align-items:baseline; justify-content:space-between`, cap-top 694 / baseline 746. LEFT GROUP is the existing sentence set as a ledger sum, in reading order, inside a container that KEEPS the id `heroproof`: `<span class="l">Four exits,</span><span class="fig">$5B+</span><span class="l">combined.</span>` — the labels 14px Anybody 500 wdth 80 uppercase (CSS, never in the DOM) .04em bone 60%; the figure 72px Anybody 300, `font-variation-settings:"wdth" 106`, `font-variant-numeric: tabular-nums`, BONE 100%, never copper.
   (c) RIGHT, right-aligned to 1408 on the same 746 baseline: `Postmates` `SurveyMonkey` `Guardicore` `Neuton.AI` as FOUR separate spans at 19px Hanken 500 bone 80%, separated by a CSS `::after{content:" · "}` (pseudo content is not a DOM text node, so the copy gate never sees a composed string).
   Block foot ≈758; 52px of espresso closes the stage at 810. Gap chips→rule ≈38px. The dead region under the lede is gone.
4. SHARPNESS: serve a 1080p pair to ≥900px only. `.planning/design/video/A2-hold.webm` is ALREADY 1920×1080 at 178,072 bytes — copy it to `public/video/a2-hold-1080.webm` (+95KB over the 720 webm) and encode the mp4 from `A2-hold.mp4` (574,430 bytes, 1920×1080): `ffmpeg -y -i A2-hold.mp4 -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -an a2-hold-1080.mp4`. Today a 1280-wide file stretches into a 1440-wide box (2.25× at DPR2); this makes it 1.5×.
   MECHANISM — DO NOT USE `<source media>`: the media attribute is not honoured on `<source>` inside `<video>`. Put a tiny inline script IMMEDIATELY AFTER the `<video>` in Room.tsx that, when `matchMedia('(min-width:900px)').matches`, rewrites the two `<source src>` to the 1080 files and calls `filmvid.load()`. It executes during parse, right after the element, so no paint is delayed and the hero keeps `preload="auto"`. With JS off everyone gets today's working 720 pair. GATE: the network panel must show EXACTLY ONE video file requested for #filmvid at 390 and at 1440, and Lighthouse mobile Performance must not fall below its current 86.

LAYOUT AT 390 (stage 4:3, --H min(75vw,292px), object-position 0% 50%, headline overlaid off --mfx/--mfy — ALL UNCHANGED). `.hero-copy` padding-bottom 56px → 40px. Below the chips, the same sign at content width 326px: 1px copper rule; 20px; the ledger row `FOUR EXITS,` / `$5B+` at 44px (deliberately under the 52px headline floor, so it is the second object on the screen and never the first) / `COMBINED.`; 16px; the four names left-aligned at 17px Hanken 500 bone 80%, wrapping naturally to two lines. Phones keep the 720 encodes — zero new bytes, zero new tap targets (the sign is not a link).

MOTION — three beats, transitions only, ZERO new @keyframes, each once and terminating. THE TRIGGER IS `#h1.on`, which RoomMotion already stamps at ARRIVAL = 2.54s (components/room/RoomMotion.tsx:31, measured at frame 61 of a2-hold-720.mp4). §16.3's "~3.4s" is superseded — any brief that repeats 3.40 fires the sign a full second late. The sign is a sibling of `#h1` inside `.hero-copy`, so `html.rl-js .rl-home #h1.on ~ .sign …` reaches the whole chain from CSS with transition-delay: ZERO JavaScript change, and it inherits RoomMotion's 1600ms and 6000ms fallbacks for free.
1. t=0 (clip plays): `I build the` rises 24px / 600ms — item 1, unchanged.
2. t=2.54s: `go-to-market.` fills opacity .28→1 / 260ms — item 1, unchanged.
3. t=2.80s THE LIGHT TRAVELS: the copper rule reveals `clip-path: inset(0 100% 0 0)` → `inset(0)` over 560ms. Its left end is at x=231, directly under the "g" the finger touched, so the light visibly leaves the word and runs right (item 4's hairline draw).
   +300ms into that draw (t≈3.10s): `$5B+` fills opacity .28→1 over 260ms — item 1's own numbers, so a viewer reads ONE event in two places.
   +420ms (t≈3.22s): the two label runs and the four names arrive as TWO objects, 60ms apart — `translateY(12px)→0` + opacity 0→1, 400ms each. The four names rise AS ONE GROUP; they are never staggered individually (four sequential wipes across company names is the ticker §9 bans by name, and it is what killed proof-line option A).
   Chain ends ≈3.62s. Every duration over 300ms carries the gate's own `/* motion-ok: §16.3-1 / §16.3-4, … */` opt-out comment.
REST STATE: all pre-states behind `html.rl-js`, which the boot script never sets under `prefers-reduced-motion`. Scripting off and reduced motion both render the finished sign, rule fully drawn, figure at opacity 1.

COPY: ZERO new strings. `Four exits, $5B+ combined.` is split into three inline parts IN READING ORDER inside `#heroproof`, so `verify-room.py` check `14.3-proof-row` (line ~1906, asserts the normalised textContent equals the sentence) PASSES UNMODIFIED — this is why the sentence is set as a ledger line rather than as C's four stacked fragments. The four names are verbatim substrings of the freight template's operator sentence (Operator.tsx:69-70), so the `14.3-copy-gate` clears them as "verbatim"; `(Akamai)` and every year are dropped per §14.3. Labels are sentence-case in the DOM and uppercased in CSS — norm() is case-sensitive and an uppercase DOM string would MISS the gate.

VERIFIER: add three checks in the same commit — the sign's left edge equals the headline's within 1.5px at 1440/1280/900; the rule's computed colour is rgb(200,84,43) and the figure's is bone (NOT copper); and, after seeking the clip past 2.54s + 900ms, the figure's computed opacity is 1, plus the same assertion with JavaScript disabled (the finished-frame proof). `14.3-proof-row`, `14.7-sentence-and-chips-share-the-left-edge` and `14.1-hero-clearance` stay green; re-run `16.2-hero-lighting` and `16.2-hero-lighting-390` after the 1080 swap because the encode changes the pixels the sample reads.


### Grafted from the runners-up

FROM HERO B: the whole encode/sharpness argument and its arithmetic (the 1920 master already on disk, the DPR-2 upscale falling from 2.25× to 1.5×) — it is the only honest answer to "its sort of pixelated", and it is the one part of B that carries no measurement risk. Hold B's geometry as a costed, deferred commit: it needs the §8.6 luminance re-sample at loop frames 0/48/96 and --fxs measured at 900/1024/1200/1280/1440/1680/1920, and it must be presented to the operator as the return of §1's own full-bleed ruling now that the fingertip math is solvable in pure CSS (`calc(50vw - 54.4444svh)` / `38.2407svh` returns exactly (372, 413) at 1920×1080), not as a new idea.
FROM PROOF-LINE C (the wall sign, otherwise killed): its BEAT STRUCTURE — the fixture and its frame take current together, resting at the .28 §16.3-1 already established, and the plate becomes legible last. That is what beat 3 above is. Its placement instinct (fill the measured 608×360px right-hand void) is honoured by the sign spanning 231→1408 with the names right-aligned to the gutter.
REJECTED FROM ALL THREE PROOF-LINE OPTIONS: copper on the figure, at any size. §3 gives copper on type to `go-to-market.` and nowhere else; a second copper noun on the first screen dissolves the signature the whole composition exists to deliver.



## 02 The $5B proof line (Room.tsx:70 `.proof`, room.css 462–490)

**PICK.** NO SEPARATE BUILD — THE AREA IS CLOSED BY THE HERO SIGN ABOVE, IN THE SAME COMMIT. All three dedicated options (A the posted ledger, B the third row, C the wall sign) are KILLED: every one of them sets `$5B+` in copper, which §3 forbids outright, and option A adds a four-name sequential wipe, which is the ticker §9 bans by name.

### Spec

THE RULING THAT ORDERS THIS AREA: the four names beat the figure. Any version that ships "Four exits, $5B+ combined." alone sets the page's softest claim in its second-loudest type with nothing attached that a stranger can check — Postmates and SurveyMonkey he knows, Guardicore and Neuton.AI he can verify in ten seconds. So the fix is not a bigger number, it is a number with its receipts on the same baseline, which is exactly the hero sign.

WHAT IS BUILT, RESTATED SO NOTHING IS LOST BETWEEN AREAS: the copper rule at the stage's floor (a licensed §3 seam rule, drawn left-to-right out of the lit word); `$5B+` at 72px Anybody 300 wdth 106 tabular in BONE — one word's difference from proof-line C and the entire reason it is legal; `FOUR EXITS,` / `COMBINED.` in the one label style at bone 60%; the four company names at 19px Hanken 500 bone 80%, right-aligned to the gutter on the figure's own baseline. 44px figure at 390.

THE 72px REGISTER, ON THE RECORD: 72px is not a new size. It is the price register the build already runs (`.card .pr`, room.css ~857). The Packages pick below moves the card price up to --d2, so 72px LEAVES the cards and ARRIVES in the hero. One size in, one size out; the page still runs --d (hero + ask), --d2 (section heads, the operator heading, the prices) and 72px (the hero's one figure). That is the ceiling — a fourth register spends §6's loudness budget.

MOTION, COPY, VERIFIER: as specified in area 01. Nothing else is built for this area, and no fourth option is needed.


### Grafted from the runners-up

FROM PROOF-LINE C: the beat (figure + rule take current together, then the plate becomes legible) and the insight that §4's original composition put the proof bottom-right, baseline-aligned with the chips — v3–v5 collapsed it into a footnote and that collapse is what the operator is calling weak.
FROM PROOF-LINE B: its one true finding — that claim, noun and receipt should read as one statement in one voice rather than as a boast plus a disclaimer. The sign achieves that horizontally, along the stage's floor, instead of by stacking a third display row under a 135px headline and spending the loudness budget twice.
FROM PROOF-LINE A: the four names, and nothing else about it.



## 03 Operator, not consultant (components/room/Operator.tsx, app/room.css 491–705 and the ≤899 block from ~2000)

**PICK.** OPERATOR A — "The Long Table": the film becomes a shallow full-bleed band, the heading becomes ONE display line across it, and the right-hand column rotates into a horizontal three-track ledger beneath. Operator B ("The Exhibit") is KILLED by both juries: it is a portrait beside text, it reverses §14.2's stated end ("The film is the focus: no band above, no heading below the frame") and the operator's own dated words (2026-09-06 "I want overlay, so the video is a direct focus"; 2026-09-05 "not like its own portrait"). Operator C ("The Room Opens") is the named fallback, not a rejection.

### Spec

THE FINDING THAT UNLOCKS IT, AND IT IS VERIFIABLE IN THE FILE: the veil has to reach solid (room.css:568-570, opaque at 82%) because a 17px paragraph sits ON the film (`.opover p`, room.css:596). 17px body needs 4.5:1, so the ground under it must be near-black. The heading is 102.87px — WCAG large text at 3:1 — and a .55–.62 scrim clears it over even the brightest table pixels. MOVE ONE SMALL PARAGRAPH OFF THE FILM AND THE BLACKOUT ENDS WITHOUT REVERSING ANYTHING. Second cause, also verifiable: room.css:531-536 applies `transform: scale(1.3)` about `50% 6%` plus `filter: brightness(1.45) contrast(1.2)` to a 720×720 source inside a 782.67px box — a 720px file asked to cover 1017.5 CSS px. Both lines are DELETED and the framing comes from the CROP instead. That pair is a third of the pixelation on its own.

LAYOUT AT 1440. 64px espresso air above (down from --s 120).
• THE BAND: `width:100vw; margin-left: calc(50% - 50vw)`, HEIGHT 440px (3.27:1) — NOT the 480px the option proposed. At 440 the film's area is 634k px against today's square's 612k (parity, +3.6%) while its height falls 44% from 782.67 to 440, so "the video is too big" is answered on both axes a viewer actually feels. Source: a 1440×640 crop of `.planning/design/video/B-loop.mp4` (1440×1440, 1.74MB) — `crop=1440:640:0:280` — displayed 1440 wide from a 1440-wide encode = 1:1 at DPR1 (today: 1.41× upscale at DPR1, 2.83× at DPR2). `object-fit:cover; object-position:50% 42%` leaves 200px of vertical latitude to re-aim without a re-encode. The builder RENDERS one frame of the crop and confirms the table, the papers, both hands and his face in three-quarter are in it before the encode is accepted; that offset is load-bearing.
  ```
  ffmpeg -y -i B-loop.mp4 -vf "crop=1440:640:0:280" -c:v libx264 -crf 21 -preset slow -pix_fmt yuv420p -movflags +faststart -an b-band-1440.mp4
  ffmpeg -y -i B-loop.mp4 -vf "crop=1440:640:0:280" -c:v libvpx-vp9 -b:v 0 -crf 30 -row-mt 1 -pix_fmt yuv420p -an b-band-1440.webm
  ffmpeg -y -i B-loop.mp4 -vf "crop=1152:1440:144:0,scale=1080:1350" -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -an b-tall-1080.mp4   # + the vp9 twin, for ≤899
  ```
  Keep it monochrome — do NOT regrade toward colour; 4:2:0 chroma subsampling is why this clip compresses at all (.planning/design/video/README.md measures mean chroma 0.91). #opvid keeps `preload="none"` and the 35% IntersectionObserver start; select the band vs tall pair with the same parse-time script pattern as the hero (`<source media>` is NOT honoured on `<video>`).
• THE VEIL IS A SCRIM AND NEVER SOLID: `linear-gradient(to bottom, transparent 0%, transparent 46%, rgba(13,13,15,.18) 60%, rgba(13,13,15,.38) 72%, rgba(13,13,15,.55) 84%, rgba(13,13,15,.62) 100%)`. The picture stays legible to the bottom edge.
• THE HEADING, ONE ROW: `Operator, not consultant.` at --d2 (102.87 at 1440), Anybody 300, `"wdth" 106`, line-height .92, left edge at the 32px gutter, cap-top at 70% of 440 = 308, baseline ≈382, row box closing ≈38px above the band's foot. MEASURED FIT: `not consultant.` renders 769px at this exact setting (~51.3px/glyph), so the 25-glyph row is ~1282px inside a 1376px content width — 94px of slack, and 1440 is the tight point of the ladder (1280 → ~1140 of 1216; 1920 → ~1290 of 1856). If a width misses, drop wdth to 100 then 96, NEVER the size (§2), and amend `14.7-op-heading-d2-wdth106` in the same commit.
• 40px, THE THESIS on espresso, cols 1-7 (782px): `I help you build it and sell it, on the same engagement, for the same fee.` at 28px/1.35 bone. This is the actual offer and it is currently set at 17px on a black gradient; 28px is an established size (§14.4).
• 48px, THE LEDGER, full 1376, `repeat(3, minmax(0,1fr))` with 48px gaps (tracks 426.67). Each track: a 1px hairline (bone 15%) on top, 18px, the claim at 21px/1.45 bone-80, ~34ch. The three claims are the three EXISTING sentences from `.opside .lead`, verbatim, one per track:
  1. `I joined Postmates, SurveyMonkey, Guardicore (Akamai) and Neuton.AI early.`
  2. `I built Ordani solo with Claude Code and Cursor: HIPAA-compliant, active paying users, in beta.`
  3. `I am taking new engagements now.`
  Claim 2 gets a full ledger column of its own instead of being the middle clause of a paragraph. It is the single highest-converting sentence on the page for the buyer this site is aimed at — someone who built a product with AI coding tools and cannot get it used — and it is currently buried at 19px in a right-hand column. Promoting it costs nothing and is the reason this pick beats a tuning round.
  THE THREE LABEL KEYS (`EARLY` / `SHIPPED` / `AVAILABLE`) ARE CUT FROM THIS ROUND. They are the option's only new strings; dropping them takes the copy-gate cost of the entire section to ZERO and lets it ship without a §15.8 approval. Record them as a §15.8 candidate.
• 40px, THE QUOTE ROW: one drawn full-width hairline; `Micah does the work that most strategy decks promise and never deliver.` at 28px/1.3 in cols 1-7; `The author, name protected · Receipt` in the label style, right-aligned in cols 10-12, baseline-aligned to the quote's last line.
• 88px espresso air. SECTION ≈1034px against today's 1022.67 — parity, roughly 2.2× the ink, and no run of dead espresso longer than 88px anywhere in it. The 545×771px right column carrying 144px of glyphs, with its three voids of 169/168/145px, ceases to exist rather than being tightened.

LAYOUT AT 390. Band full-bleed 390×420 from the 1080×1350 encode, `object-position: 58% 42%` (his face and the near hand) — 2.77× downsample at DPR1, 0.92× at DPR3, sharp on a phone for the first time. Heading returns to TWO rows at --d2 = 39.52px wdth 106 (`Operator,` / `not consultant.` ≈295px inside 326px), cap-top at 64% of 420. Scrim tops out at .58. Then 32px, thesis at 21px; 40px, the three ledger rows stack full width (drawn hairline, claim 18px, 22px padding); 36px, the quote at 21px + the meta line. `.rl-opside .m-first` and the duplicated `.opover p` BOTH GO — the thesis exists once at every width, which deletes a hidden `display:none` twin and a whole branch of conditional CSS. Section ~1160 against ~1055 (+10%); if he objects to the height the lever is the band at 380px.

MOTION — "the room lights, then the ledger writes itself", one left-to-right sweep, triggered ONCE by the existing `.opstage.in` (`data-anim="0.85"`, already on the element). NOTE THE ENGINE: the home runs `#h1.on` / `#work.in` / `.opstage.in` / `[data-rise].in` / `.sec h2.in`. The `[data-rl="head|rule|rise"]` selectors quoted in two of the options belong to app/room-and-ledger.css and the SUB-PAGES; used here they animate nothing.
1. 0ms: the veil `clip-path: inset(0 0 0 0)` → `inset(34% 0 0 0)` over 900ms on var(--e). The picture opens under the visitor. Because the finished scrim covers from 34% down and the heading's cap-top is at 70%, the dark RETREATS PAST the heading and never off it — the beat cannot create a mid-animation contrast failure the way a fade would. This REPLACES nothing in §16.3; it is item 6's territory, executed on the veil.
2. 0ms, parallel: the film settles `scale(1.06) → 1` over 1200ms — item 6 verbatim, the existing selector and the existing duration, so `16.3-6-operator` survives on that half.
3. 260ms: the heading row rises 20px + opacity 0→1, 500ms. ONE row at ≥900, so the 80ms pair in item 6 applies only at ≤899 where the heading is two rows — amend `16.3-6-operator` accordingly.
4. 640ms: the thesis rises 12px, 450ms.
5. 820ms: the three ledger hairlines draw `scaleX(0→1)` from the left, 500ms, 60ms stagger (item 4, first horizontal three-up use); each claim rises 12px 90ms behind its own rule.
6. 1240ms: the quote's hairline draws and the quote rises 10px.
Total ~1.74s, once, terminating. No hover state exists in this section and none is added. One 1440×440 clip-path transition promotes one layer for 900ms, once — check it at 390 on a mid-tier phone.

THE ONE GATE THAT MUST NOT BE SKIPPED: sample the composited luminance behind EVERY glyph run of the heading at loop frames 0, 96 and 192, exactly as §4 gates the hero, and require ≥3:1 (the heading is large text; 4.5 does not apply, and that is the whole reason the scrim can stay light). If a frame fails, raise the 84% stop in .05 steps. IF IT WILL NOT CLEAR 3:1 AT .70, STOP AND REPORT — do not take the band solid, because a solid veil puts the section back exactly where it started.

COPY: ZERO new strings with the keys cut. Every sentence reused verbatim; one duplicated DOM string DELETED.

VERIFIER DEBT, all in the same commit or the gate blocks the build: `14.2-op-square` (square → 3.27:1 band), `14.2-op-columns` (two columns → band + three-track ledger), `14.7-op-veil-62-82` (new stops), `14.2-op-mobile-overlay` (420px band), `16.3-6-operator` (one heading row at ≥900), and a NEW three-frame contrast leg for the band. `14.7-op-rows-auto-height` and `14.2-op-contrast` should be re-pointed at the ledger tracks.


### Grafted from the runners-up

FROM OPERATOR C ("The Room Opens"): (1) its veil-retract beat, which IS beat 1 above — C is the option that found it, and its contrast property (the dark retreats past the heading, never off it) is why the beat is safe; (2) its zero-copy discipline — cutting the three label keys is C's property imported into A, and it is what lets this section ship without an operator wording round; (3) its crop-not-CSS-zoom principle and the deletion of room.css:531-536, which A and C share and which no other proposal identified.
C IS ALSO THE NAMED FALLBACK, and it shares ~80% of this work: if the operator reads the full-bleed band as louder rather than smaller, revert to C's 782.67×626 5:4 square in cols 1-7 with the same encode, the same deleted transform/filter, the same veil retract, `align-items:start` + `justify-content:flex-start` on the right column (the three voids become one honest 105px foot) and the thesis moved off the film. That version is 15% SHORTER than today's section and reverses nothing at all.
FROM THE BUYER JURY, NOT FROM ANY OPTION: claim 2 (the Ordani sentence) gets its own ledger track. No option promoted it; it is the fastest route from stranger to call on the whole site.



## 04 How I work (components/room/HowIWork.tsx, app/room.css 706–775)

**PICK.** THE SPINE, WITH THE CONSTITUTION JURY'S SURGERY APPLIED AND THE T-ACCOUNT'S CONTENT GRAFTED IN A SECOND, GATED COMMIT. The spine ships in INK, not copper; the three copper node squares are DELETED; the doors are the ROWS themselves, not copper-on-type links; and the flush-right display alignment is dropped in favour of §18 Rule B's existing left-aligned geometry. What survives is the idea that made it worth an 8 from the buyer jury: one continuous vertical line, and a way out of every step.

### Spec

THE DIAGNOSIS, VERIFIED: HowIWork.tsx contains ZERO `<a>` elements. It is the only section on the page with no link, no arrow and no destination, so no amount of motion can make it "trigger someone to want to work with me". It is also the FIRST of three consecutive hairline-row stacks (how-I-work, receipts, objections), which is the "one composition applied regardless of content" tell §12 already recorded.

WHAT IS CUT FROM THE OPTION AND WHY (all four are constitution findings, not taste): (a) three 7px filled COPPER SQUARES stamping on the rule are decorative markers and §3's copper list is exhaustive — the `→` glyph, the 1px seam rules, the row wipe, the ask field. A stamped square is the closest thing on this page to a bullet from an icon kit. DELETED. (b) the step links set in copper on espresso / copper-deep on bone are copper on TYPE, which §3 gives to the hero noun alone; the home declares no link token. REPLACED by the row-as-link with a copper arrow GLYPH, which is licensed and is already the objections' and the receipts' grammar. (c) a full-height COPPER rule beside display type is the second-loudest copper object on the page and competes with the hero's one lit word. The spine is `--hair` (ink 15%). (d) flush-right display type is a new alignment on a page that is flush-left everywhere. DROPPED.

LAYOUT AT 1440 — GEOMETRY UNCHANGED FROM §18 RULE B, ONE ELEMENT ADDED. `.steps li` keeps `grid-template-columns: 28px minmax(0, calc(var(--lane) - 28px - var(--gap))) minmax(0, 1fr)`, `column-gap: var(--gap)`, `padding: 40px 0`, hairline top and a bottom hairline on `:last-child`. --lane is cols 1-5, so the sentence lane opens on the column-6 line at x = 32 + 559.33 + 24 = 615.33.
1. THE SPINE: `.steps { position: relative }` and `.steps::before { content:''; position:absolute; left: calc(var(--lane) + var(--gap)); top:0; bottom:0; width:1px; background: var(--hair); transform-origin: 50% 0 }`. Rule B's line, finally drawn. It runs the full height of the three rows and no other section on the page has a vertical. GATE: its computed x must equal the computed left edge of the objections list and of the receipts' caption column at 1440, 1280, 900 and 390 — the element that finally draws Rule B must not be the element that breaks it.
2. THE DOORS — ZERO NEW COPY. Each `<li>` wraps its contents in an `<a>` (the row is the link), and a 24px copper `→` cell sits at the right edge of the sentence lane on the name's cap line. Destinations, which also turn the section into the page's own table of contents: 01 Diagnose → `/call`; 02 Build → `#price`; 03 Position → `#proof`. The two in-page anchors are already handled by RoomMotion's Lenis click handler. No label string is added anywhere; the arrow is `aria-hidden`, and the accessible name is the row's own ordinal + name + sentence.
3. Row rhythm and type are otherwise untouched: ordinal 14px label ink-60 in the 28px cell, name at --d2 in cols 2, sentence 21px/1.45 ink-80 max 46ch.

LAYOUT AT 390. The spine rotates to the left gutter: `.steps::before { left: 0 }`, same 1px ink hairline, full height; each row indents 24px right of it (`padding-left: 24px`, single column). Order inside a row: ordinal (14px label, left), name at --d2 = 39.52px (`Diagnose` ≈164px in a 302px lane), sentence 19px/1.5, and the copper `→` right-aligned on the ordinal's line. Rows stay links; the tap target is the whole row, far above 44px. 40px between rows.

MOTION — the trigger is the existing `#work` `data-anim="0.9"` → `#work.in`. No JS change, zero @keyframes.
1. THE SPINE DRAWS DOWN: `transform: scaleY(0)` → `scaleY(1)`, `transform-origin: 50% 0`, 900ms var(--e), at 0ms. It descends as the section arrives. `/* motion-ok: §16.3-4, the seam draws once as the light arrives. */`
2. THE ROW HAIRLINES draw `scaleX(0→1)` from the left, 500ms, 60ms stagger — item 4, and the EXISTING selectors `#work.in .steps li::before` / `:last-child::after` (room.css:1689-1690) are already wired. Do not remove them.
3. THE NAMES LIGHT — a RESTORATION, not an invention: each `.nm` (with its ordinal) rests at opacity .42 and goes to 1 over 300ms, delays 0 / 90 / 180ms behind its own hairline. .42 is §16.3-9's rail value, written for this exact section and orphaned when §15.4 deleted the sticky rail. The sentence and the arrow follow their own name by 80ms: opacity 0→1 + `translateY(8px)→0`, 400ms.
4. HOVER/FOCUS on a row: the `→` slides 6px right in 200ms (item 7, the house rule, already declared). Nothing lifts, nothing changes colour, nothing couples to the cursor.
Rest state = finished frame: base CSS paints the spine at scaleY(1) and everything at opacity 1; all pre-states behind `html.rl-js`.

COPY: commit 1 adds ZERO strings.

COMMIT 2, GATED ON §15.8 (do not build before the operator clears the words): one CREDIT LINE per step in the sentence lane, 20px under the sentence, at 24px Hanken 500 full ink — what the buyer ends up HOLDING, beside what I do. This is the T-Account's content without its conceit. Drafts for the wording round, each under 25 words, first/second person, no banned word, no em-dash, no figure: 01 `You see the gap in writing, in a week.` · 02 `You get the thing shipped, not a plan for it.` · 03 `Your team sells it in your words, without me in the room.` Every one is a delivery promise and must clear the claims ledger before it enters the page.

VERIFIER: `15.4-work-ledger` and `18-work-head-split-eyebrow-and-one-line` should both survive (the grid, the lane and the head are unchanged); add checks for the spine's x against the other two lanes, for three `<a>` with the three hrefs, and for the .42 rest value lighting to 1 after `#work.in`.


### Grafted from the runners-up

FROM THE T-ACCOUNT: its content thesis — "the buyer does not buy the method, he buys what he ends up holding" — as commit 2's credit line. REJECTED from it: the double-entry conceit itself (a T-account because the system is called Ledger is the system performing its own name), the ink-8% third stroke value (the page declares 15% strokes and 4% card borders; `--hair-12` already exists if a lighter rule is wanted), the 90°-rotated arrow (the house always points and slides right, §16.3-7), and the phone fold that repeats I DO / YOU GET on every row — a double entry that only exists above 900px is half an idea on a page judged at 390 first.
FROM THE SPINE: the spine itself, the doors, and the observation that this section's geometry must stop matching the two stacks below it.



## 05 Packages and Engagements (components/room/Packages.tsx, app/room.css 775–948) — the operator's loudest note: "we need this part to be the most spectacular"

**PICK.** NO OPTIONS WERE DELIVERED FOR THIS AREA — the options document is truncated inside area 04, and neither jury received anything to score here. This pick is authored against the live code and §18. "THE PRICE IS THE POSTER": keep every §18 device untouched and change exactly two things — the price becomes a display line, and the card reads figure → rule → caption, the same grammar as the hero sign.

### Spec

WHY THIS AND NOT A RECOMPOSITION. The obvious move — take the boxes off and set three prices on a ruled counter — reverses §18 twice and fails two hard gates: `verify-room.py` `15.5-cards` asserts a 1px border at 15% ink on all four sides of cards 1 and 3 plus an 8px radius and 28px padding, and `18-audit-copper-border-and-pill` asserts the Audit's copper border on ALL FOUR sides plus the pill on the name line. §18 wrote those after the critique named the old boxes as the page's two loudest seams. Reversing that ruling to answer "underwhelming" would be the fourth recut of this section in three passes. Instead: leave the ruling standing, and spend the section's whole loudness budget on the one object a buyer is actually here for.

LAYOUT AT 1440 (content 1376; three tracks of (1376-48)/3 = 442.67; card padding 28; --d2 = 102.87).
1. THE PRICE GOES TO --d2. `.card .pr` font-size 72px → `var(--d2)`, keeping Anybody 300, `"wdth" var(--dw-fit)` (106), `tabular-nums`, `letter-spacing:-0.02em`, ink 100%. `$2,500` at 102.87/wdth 106 measures ≈330px inside a 386px interior; `$7,500` the same; `$500` ≈220px. NO new size is introduced — --d2 is the system's own second display size, already the section head's — and §14.4's "nothing at --d except the hero and the ask" is respected. The three prices become the loudest objects in the light half of the page, which is the only honest reading of "most spectacular" that does not require a new material.
2. THE CARD INTERIOR REORDERS TO THE LEDGER'S GRAMMAR: price block FIRST (with its existing `border-bottom: 1px solid var(--hair-12)` now sitting UNDER the figure), then the name row at 24px Hanken 500 carrying the Audit's `Start here` pill, then the sentence at 17px, then the chip at the foot (`margin-top:auto`, full interior width). Read down, every card is now figure → rule → caption — identical to the hero sign and to the Engagements block, so the page has ONE figure grammar in three places instead of three arrangements of the same parts. The section becomes scannable in one second: three prices across the page with their names as captions.
3. THE AUDIT KEEPS EXACTLY ITS TWO §18 DEVICES, UNCHANGED: the 1px copper border on all four sides, and the `Start here` pill on the name line (12px, ink-72 label, 1px copper border, radius 999 — the copper stays on the border, which is a UI component at 3:1, because copper text at 12px on bone is 3.85:1 and fails). `tagOnNameLine` still holds after the reorder.
4. ENGAGEMENTS takes the same reorder — price `From $5K a month` at --d2 in bone FIRST, then `Engagements` at 24px Hanken 500, then the descriptor at 17px, the inverted chip right-aligned and bottom-aligned. Its espresso ground stays the only filled block on the bone half; that is what makes it the top tier, and §3 forbids the only louder move available (a second copper ground belongs to the ask alone).

LAYOUT AT 390. Cards stack full width, unchanged. Price at 52px explicitly (NOT --d2, which floors to 39.52 on a phone and would be smaller than today) — 52px is §14.5's own mobile price size. The Audit's mark stays the 2px copper LEFT rule (§14.7's mobile ruling, so nothing bleeds). Same interior order: figure, rule, name + pill, sentence, chip. Engagements stacks with its price at 52px bone.

MOTION — the trigger is the existing `#price` `data-anim="0.9"` → `#price.in`; zero JS change, zero new @keyframes.
1. The card price rules draw `scaleX(0→1)` from the left, 500ms, 60ms stagger — item 4, and `#price.in .card .pblock::after` is ALREADY in the item-4 selector list (room.css:1694). Unchanged.
2. NEW, and it is the section's beat: each price FILLS opacity .28 → 1 over 260ms, delays 0 / 90 / 180ms, each behind its own rule. That is item 1's own numbers — the same "takes current" as the hero's copper word and the hero sign's figure — so the page has ONE lighting language and the packages section reads as the ledger being totted up rather than as three boxes appearing. `/* motion-ok: §16.3-1, the figure takes current — the page's one lighting language. */`
3. The cards rise 20px with the existing 70ms stagger and the Engagements block rises after them — item 5, existing selectors (room.css:1730-1732), unchanged. The Engagements price fills last, at 270ms, so the top tier is the final light in the light half of the page.
4. Hovers unchanged: chip ground swaps in 300ms, the `→` slides 6px, the card border turns copper (item 7, already declared).
Rest state = finished frame; all pre-states behind `html.rl-js`.

COPY: ZERO new strings. Names, prices, sentences and the three chip labels stay verbatim, so `14.7-chip-labels-are-the-live-buttons` (which diffs them against app/(room)/packages/page.tsx) is untouched.

VERIFIER: two edits in the same commit — `15.5-cards`'s `abs(f - 72) < 0.6` becomes an assertion against the computed --d2 at 1440 and 52px in `15.5-cards-mobile`; `18-engagements-is-the-fourth-card`'s `vFs` assertion the same. `18-audit-copper-border-and-pill` must still pass UNMODIFIED — if it does not, the reorder has broken a §18 device and the commit is wrong. Add one check: the three prices reach opacity 1 after `#price.in` and are already 1 with JavaScript disabled.

IF HE STILL READS IT AS UNDERWHELMING, the next lever is content, not decoration: one "what you get" line per card at 21px under the sentence, from the same §15.8 wording round as How I work's credit lines. Do not reach for a second accent, a fill, a shadow or a ribbon; all four are on §9's rejected list.


### Grafted from the runners-up

FROM THE HERO SIGN (area 01/02): the figure → rule → caption grammar and the .28→1 fill. This is the graft that matters — it is what turns three separate fixes into one system, and it is why the 72px register can leave the cards for the hero without the page losing a size.
FROM HERO OPTION C, the one idea worth salvaging from a killed option: that a cold buyer does arithmetic before admiration and wants the entry price visible early. Honoured where it belongs — the bar already carries `Packages from $500` from first paint on the phone (§18) and the hero's second chip points at `#price`. It is not honoured by putting a price strip on the first screen.
EXPLICITLY NOT GRAFTED: Hero C's copper rule under the middle cell. That is the rank-painted-on-one-edge device §18 deleted by name (room.css:775-790); it must not return here or in the hero.



## 06 The objections (components/room/Objections.tsx, app/room.css 1203–1272) — "the objections part is smart but the questions and response are weak"

**PICK.** NO OPTIONS WERE DELIVERED FOR THIS AREA EITHER. This pick is authored against the live code. "RESTORE THE REGISTER AND ADD THE DOOR" — a structural commit that ships now with zero new copy, plus a §15.8 wording round that is the actual fix and is OPERATOR-GATED. His own sentence says the structure is smart and the WORDS are weak; the honest split is to fix the register mechanically and to park the words with him rather than composing three answers this session.

### Spec

THE DIAGNOSIS, MEASURED IN THE FILE. (a) The question is 24px and the answer is 17px (room.css:1240, 1264) — the closing argument of the page is set in the smallest reading size the page owns, smaller than the receipts' 19px captions and the how-I-work 21px sentences. §14.4 already ruled otherwise, in the brief's own words: "FAQ questions at 28px, answers 19px"; §18's recompose quietly took them to 24/17. Restoring 28/19 is a return to a ruling, not an invention. (b) The head holds cols 1-5 and NOTHING sits under it, so the section repeats the same left-hand void the juries found in three other sections. (c) The section has no destination: three answers and then a hairline.

LAYOUT AT 1440 (the §18 two-column geometry is KEPT: head cols 1-5, one lane from the column-6 seam at x=615.33, lane width cols 6-12 = 792.67).
1. `.q dt` 24px → 28px/1.2 Hanken 500, `text-wrap: balance` kept.
2. `.q dd` 17px → 19px/1.5, ink-80, `max-width` 60ch → 56ch (at 19px, 56ch ≈ the lane's own measure), `margin-top` 12px → 14px.
3. Row padding 30px → 36px 0; the bottom hairline and the 24px copper `→` cell (`.q::after`, 20px display glyph) are unchanged — the arrow is licensed copper and it is the section's one accent.
4. THE DOOR, and it is what fills the void: `.faq .sec` becomes a full-height flex column (`align-self: stretch`, `display:flex; flex-direction:column`) and takes one Rule C chip with `margin-top: auto`, so its bottom edge aligns with the list's last hairline. Label `Book a free intro call →` linking `/call` — verbatim from Ask.tsx, and deliberately NOT `Get a reality check` (which already appears twice on the page). The section now ends on a way out instead of on a rule, and the measured hole under the head becomes the ask.

LAYOUT AT 390. The stack is unchanged (`18-objections-mobile` geometry). Question 24px, answer 18px/1.5 (a phone lane is narrower than a desktop lane; 19px is permitted if the measure holds at 326px — the builder measures and reports). The chip goes full width, 48px, after the last row's hairline. 40px between rows.

MOTION — unchanged, and that is deliberate. `#faq` `data-anim="0.9"` already drives item 4 (`#faq.in .q::before`, the row hairlines drawing with a 60ms stagger, room.css:1693) and item 5 (`#faq.in .q`, the rows rising 20px, room.css:1732). The chip rides the last row's rise. NOTHING NEW IS ADDED HERE: the operator's complaint about this section is words, and a section whose copy is weak does not get louder by moving more. Hover: the chip's ground swaps in 300ms and its `→` slides 6px (item 7, already declared).

COPY — THE ACTUAL FIX, AND IT IS GATED. Run the §15.8 wording round on this section FIRST of all the parked copy, sourced from `.planning/research/01-REDDIT-EVIDENCE.md` (the attested phrase bank the operator named: "the wording round will be using the data from the other reddit data scraping sessions data"), the copy-editor and the claims ledger. THE DRAFTING RULE, so the round has a spec and not a vibe: every question is the objection in the buyer's own words, verbatim from the phrase bank where one exists; every answer opens by conceding the objection, and closes on ONE checkable term — a price, a window, or a named artifact. Three specific notes for that round: (1) question 1 (`Is this for me if I built it with AI coding tools?`) is the single highest-leverage string on the page — it names this buyer exactly — and its answer currently ends on "Then yes", which concedes and then stops; it should end on what happens next. (2) Question 3 (`Hiring for a company rather than a build?`) duplicates the Engagements block two sections up; it is the first candidate for replacement. (3) A fourth objection is worth proposing, not composing here. NOTHING IN THIS PARAGRAPH SHIPS WITHOUT THE OPERATOR'S APPROVAL AND AN ALLOWLIST ROW — `14.3-copy-gate` fails the build on one unapproved sentence, and the PASS_102/103 tables are how approved strings enter.

VERIFIER: `18-objections-one-lane-from-the-seam` asserts `dt == 24` and `dd == 17`; both become 28 and 19 in the same commit. Add one assertion: the chip sits inside cols 1-5 and its bottom edge is within 2px of the last row's hairline at 1440, 1280 and 900. `18-objections-mobile` takes the phone's new sizes.


### Grafted from the runners-up

FROM THE HOW-I-WORK PICK: the row-as-door principle. This section gets one door rather than three because its rows are answers, not steps — but the principle that a section which cannot be acted on cannot convert is the same, and it is the finding that earned the Spine its 8.
FROM THE OPERATOR PICK: the promotion principle — the strongest sentence in a section should not be set in that section's smallest type. Applied there to the offer line (17px on a gradient → 28px on the ground) and here to the answers (17px → 19px) and the questions (24px → 28px).
NOT GRAFTED, AND ON THE RECORD: nothing from §15.3's three-column objections. Those columns produced the three ragged feet §18 measured and replaced; the one-lane-from-the-seam geometry stays.



## Build order

BUILD ORDER — five commits and one operator gate. Sequenced so the cheapest, most visible work banks first, the shared language is established before it is reused, and the one item that can stall the arc is last.

1. ENCODES AND THE CSS-ZOOM DELETION (unlocks areas 01, 02 and 03; nothing else can start without it). It is the only work with an external dependency (ffmpeg) and the only one whose failure mode is bytes rather than pixels. Ship: `a2-hold-1080.webm` (a straight copy of `.planning/design/video/A2-hold.webm`, already 1920x1080 at 178,072 bytes) + `a2-hold-1080.mp4` re-encoded from `A2-hold.mp4` at crf 24, selected for >=900px by a parse-time script placed immediately after the `<video>` in Room.tsx; `b-band-1440` and `b-tall-1080` pairs from `B-loop.mp4` with the crops named in area 03; and the DELETION of `transform: scale(1.3)` + `filter: brightness(1.45) contrast(1.2)` at app/room.css:531-536. GATES: exactly one video file requested per element at 390 and at 1440 (network panel — `<source media>` is NOT honoured on `<video>`, so a naive implementation ships the wrong file to one of the two widths), Lighthouse mobile Performance not below its current 86, and one rendered frame of each crop inspected before the encode is accepted.

2. THE HERO SIGN — areas 01 and 02 in ONE commit (they are one object). Lowest risk in the set: it keeps §14.1's stage, §14.7's fingertip constants and every existing hero check, adds zero copy, adds zero JavaScript, and it is the operator's own sentence executed ("a unique sign that lights up after the go to market part"). It is also THE UNLOCK FOR THE WHOLE SET's coherence: it establishes the page's lighting language (a rule draws out of the lit word, a figure takes current at .28->1) and the figure -> rule -> caption grammar that Packages then reuses. Build it before anything that quotes it.

3. PACKAGES (area 05). Depends on 2 for the language and on nothing else. Two verifier edits, zero copy, and it answers the operator's most emphatic sentence. Cheap to build, high visibility, no ruling reversed.

4. HOW I WORK (area 04) and OBJECTIONS (area 06), one commit each, in that order. Both are geometry-and-register only, both add zero strings, and both are independent of the video work — they can be built in parallel with 1 if a second executor is running. How I work first because the drawn seam has to be measured against the objections list's and the receipts' lanes at four widths, and it is cheaper to add the second lane's assertion while that gate is fresh.

5. PREVIEW + THE OPERATOR GATE. Push the branch for a Vercel preview with areas 01, 02, 04, 05 and 06 landed, and ask ONE question with it, quoting his own words and their dates: the operator section can go wide-and-shallow (a full-bleed 1440x440 band, the film 44% shorter and at parity on area, one 103px display line across it) or short-and-square (the 5:4 crop at 626px, the section 15% shorter, nothing reversed). His 2026-09-08 "The video is too big" and his 2026-09-06 "I want overlay, so the video is a direct focus" both bear on it, and the band is the one item in this set that amends a §14.2 geometry he has already reviewed twice.

6. THE OPERATOR SECTION (area 03) — LAST, and only after 5. It is the riskiest build in the set: six verifier rewrites, a §14.2 geometry amendment, and a composited-contrast gate that is a genuine stop-and-report. Sequencing it last means a stall there costs one section rather than the arc, and the other five are already in front of him.

7. THE COPY ROUND (§15.8), operator-gated and not on this critical path: the objections' three questions and answers first (his named complaint), then How I work's three credit lines, then the operator ledger's three optional keys. Every string goes to him before it enters the page; one unapproved sentence fails `14.3-copy-gate` and the build with it.

WHAT IS DELIBERATELY NOT IN THE ORDER: Hero B (the full-bleed film). It is costed and deferred, not rejected — it needs the §8.6 luminance re-sample over live video and --fxs measured at seven widths, and it is the same sign inside a different box, so it can land later as a pure geometry commit without touching anything built above.


## Risks

1. THE OPERATOR-BAND CONTRAST GATE IS A REAL STOP. Bone display type over a scrimmed bright table has to be measured, never assumed: sample the composited luminance behind every glyph run at loop frames 0, 96 and 192 and require >=3:1 (the heading is 102.87px, so it is large text and 4.5 does not apply — that is the whole reason the scrim can stay light). If a frame fails, raise the 84% stop in .05 steps. IF IT WILL NOT CLEAR 3:1 AT .70, STOP AND REPORT. Do not take the band solid: a solid veil puts the section back exactly where it started, and re-blackening it would be a silent revert dressed as a fix.

2. "THE VIDEO IS TOO BIG" VS A FULL-BLEED BAND. The recommended operator section makes the film wider than the content column. The defence is arithmetic — height 782.67 -> 440 (-44%), area 612k -> 634k (+3.6%, parity), source-to-display 1.41x upscale -> 1:1 at DPR1 — but it is a defence, not an agreement, and he may read a full-bleed band as louder. That is why it is gated behind the preview and why option C (the 5:4 square, 15% shorter, nothing reversed) is specified as a live fallback sharing ~80% of the work rather than as a discarded idea.

3. TWO STALE FACTS ARE CARRIED BY EVERY OPTION DOCUMENT AND WILL BREAK THE BUILD IF COPIED. (a) The copper word's arrival is 2.54s, not ~3.4s: RoomMotion.tsx:31 declares `const ARRIVAL = 2.54`, measured at frame 61 of a2-hold-720.mp4, and it supersedes §16.3's estimate. A brief that repeats 3.40 fires the sign a full second late in a chain whose entire point is that it is not late. (b) The `[data-rl="head" | "rule" | "rise"]` engine belongs to app/room-and-ledger.css and the SUB-PAGES. The home runs `#h1.on`, `#work.in`, `.opstage.in`, `[data-rise].in` and `.sec h2.in`. The beats are portable; the selectors are not, and an executor handed the wrong ones produces animations that never fire and a verifier that reports them missing.

4. VERIFIER DEBT MUST LAND IN THE SAME COMMIT AS THE CHANGE THAT CREATES IT. scripts/verify-room.py is currently 61/61 and encodes the rulings as assertions: `15.5-cards` and `18-engagements-is-the-fourth-card` pin the price at 72px; `18-objections-one-lane-from-the-seam` pins 24/17; `14.2-op-square`, `14.2-op-columns`, `14.7-op-veil-62-82`, `14.2-op-mobile-overlay` and `16.3-6-operator` all pin the operator square. Each rewrite ships with its own change or the gate blocks the build, and the check COUNT changes — the RESUME's "61/61" is stale the moment commit 2 lands and must be restated with the new number.

5. THE ONE GATE THAT MUST NOT MOVE: `14.3-proof-row` asserts `#heroproof`'s normalised textContent equals `Four exits, $5B+ combined.` exactly. The sign is specified as three inline parts IN READING ORDER inside that id precisely so the check passes unmodified — this is the difference between the recommended sign and proof-line option C, whose four stacked fragments would have forced both a verifier rewrite and a sentence the reader has to reassemble.

6. THE COPY GATE IS CASE-SENSITIVE AND SUBSTRING-BASED. `norm()` does not lowercase. Every label in this set is authored sentence-case in the DOM and uppercased in CSS; the four company names are four separate spans with CSS-generated separators (pseudo content is not a DOM text node); no composed string enters the page. The recommended set adds ZERO new strings on purpose, which is what lets five of six areas ship without an operator wording round. The one area whose real fix IS words — the objections — is parked with him rather than papered over, and that should be said plainly rather than reported as fixed.

7. BYTES AND LCP. Lighthouse mobile on `/` is already 86 with a simulated LCP of 4.2s and it will not reach the DoD with a video hero — a known, operator-owned open item. The 1080p pair is desktop-only by construction and the phone gains nothing heavier than the sign's type, so this set should not move that number; measure it anyway before and after commit 1, because a source-selection bug is exactly the kind of thing that ships both files to a phone.

8. THE LOUDNESS BUDGET IS NOW SPENT. After this set the page runs --d (hero, ask), --d2 (section heads, the operator heading, the three prices) and 72px (the hero's one figure, which LEAVES the cards as it arrives in the hero — one size in, one size out). A fourth register, a second copper ground, a second cursor-free motion language or a second accent all break §6, and there is nothing left to spend if the operator comes back a fourth time. The next lever after this set is CONTENT — the credit lines, the objection answers, a real product screen — not decoration.

9. COPPER DISCIPLINE ACROSS THE SET, since three of eleven options died on it: copper appears in this build only as the hero noun (unchanged), 1px seam rules, the `->` glyph, the Audit's border and pill border, the row wipe and the ask field. The hero figure is BONE. The how-I-work spine is INK at 15%, its node squares are deleted and its doors carry the arrow glyph rather than copper text. The mock's first-screen copper cap (<=4) rises to 5 with the sign's rule; the site verifier does not carry that check, so it is a note for the mock only.

10. THIS WORKTREE IS BEING WRITTEN BY ANOTHER PROCESS. Everything above is read-only analysis of `.claude/worktrees/p101-integrate` as of this session; line numbers (room.css:531-536, 1689-1694, 1730-1732; RoomMotion.tsx:31) must be re-grepped, not trusted, before the first edit, and the brief has to be applied on top of whatever that process lands. One writer per file.

