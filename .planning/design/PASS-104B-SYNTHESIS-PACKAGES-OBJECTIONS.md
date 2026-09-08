# Pass 104b — packages and objections: the design synthesis (Workflow wf_265102ca-797, 2026-09-08)

Re-run of areas 05 and 06, whose direction leg was truncated in wf_0cc6cbf6-ff3. 6 agents:
2 direction legs (3 options each, web + corpus), 3 juries, 1 synthesist.


## Packages and Engagements — home section 05 (components/room/Packages.tsx + app/room.css:775–948), and the same card family on /packages

**PICK.** THE POSTER AND ITS SEAM — the price becomes the display line, every card reads figure / rule / caption, and the section opens on one copper 1px rule. This is the standing PASS-104B §05 pick ("THE PRICE IS THE POSTER") plus exactly one graft from the option round: the section-opening copper seam, drawn with the house's own scaleX mechanism. HELD AS THE NAMED ESCALATION: option A, the marquee. KILLED: option B, the plinth (constitution lens). MOSTLY STRUCK: option C's three devices, for the reasons in `grafts`.

### Spec

WHY NOT A OR C AS DRAWN. Option B is killed and stays killed: WINNING-BRIEF §3 is literal — "No section declares a background" — with two named exceptions (the ask's copper field, the foot), and §1 has the light travel once. A 694px full-bleed espresso band is a section ground whatever the CSS calls it. Only the operator can reverse that (see operator_questions). Option A is held, not built, because its 1440 spec makes the figure a SIBLING of `.card` while its 390 spec puts the figure inside the card's 22px-padded interior; one node cannot be both. `15.5-cards-mobile` (verify-room.py:1979) measures only `.card`, so it would pass green while the phone renders a naked, unpadded figure above a bordered box. A also takes the price slot out of three of the four objects §18 made equivalent, and it silently breaks a THIRD gate its own list never names: `16.3-4-hairlines` builds `drawn0` from fixed selectors including `pall('.card .pblock','::after')` (verify-room.py:2212) and asserts `len(drawn0) == 13`; move `.pblock` off `.card` and the count drops to 10.

LAYOUT AT 1440 (content 1376; three tracks of (1376−48)/3 = 442.67 at x 32 / 498.67 / 965.33; gap 24; card padding 28; interior 384.67; --d = clamp(52px, 9.4vw, 136px) = 135.36, --d2 = 0.76·--d = 102.87).

1. THE PRICE GOES TO --d2. `.rl-home .card .pr` (room.css:855) `font-size: 72px` → `var(--d2)`. Everything else on that rule is unchanged: `var(--display)`, weight 300, `line-height: 1`, `font-variation-settings: "wdth" var(--dw-fit)` (106), `letter-spacing: -0.02em`, `font-variant-numeric: tabular-nums`, `color: var(--ink)`. No new register: --d2 is the section head's own size. §14.4's reservation of --d for the hero and the ask is untouched. The three prices become the loudest objects in the light half of the page — 72px → 102.87px is +43% linear and roughly double the area — which is the only reading of "most spectacular" that spends no new material.

2. THE CARD INTERIOR REORDERS to figure / rule / caption. Present DOM order (Packages.tsx) is `.nmrow` → `.pblock` → `.one` → `.cta`. New order: `.pblock` FIRST (its existing `border-bottom: 1px solid var(--hair-12)`, room.css:853, now sits UNDER the figure and becomes the caption rule), then `.nmrow` (name 24px Hanken 500 + the Audit's `Start here` pill), then `.one` at 17px, then `.cta` at `margin-top:auto`, chip full interior width, 48px. `.pblock` padding becomes `0 0 20px`; `.nmrow` gains `margin-top: 16px`. `.pblock` STAYS INSIDE `.card` — that is the whole reason this pick costs one selector-free integer where A costs three gates.

3. THE AUDIT KEEPS BOTH §18 DEVICES UNCHANGED: 1px copper on all four sides (`.card.mark`, room.css:812) and the `Start here` pill on the name line (12px, `--ink-72` label, 1px copper border, radius 999). `tagOnNameLine` tests that the pill's box overlaps the name's vertically and sits to its right; the reorder preserves both.

4. THE SEAM — the one graft. A new `<div class="seam" aria-hidden="true">` as the first child of `.price` after `.sec`: 1px tall, `background: var(--color-rl-copper)`, full content width (x 32 → 1408 at 1440), 40px under the head block and 40px above `.cards`. No `.seam` class exists in room.css today, so the name is free. This is §3's licensed copper use — "the 1px seam rules" — and it belongs to ALL THREE cards. It must never be drawn per-column and the Audit must never gain a second copper line: a copper rule on one cell is the rank-on-one-edge device §18 deleted by name (room.css:775–790). It is what makes this section the second instance of the hero sign's FIGURE / RULE / CAPTION grammar rather than a bigger pricing table.

5. ENGAGEMENTS takes the same reorder: `From $5K a month` at --d2 bone FIRST, then its existing 1px bone-12% rule, then `Engagements` at 24px Hanken 500 bone left, the descriptor at 17px bone-80, the inverted chip right. Geometry untouched — 1376 wide, 24px above, 8px radius, 28px padding, espresso ground, one `<a>` with 0 links inside, `hdX < mid`, `chipRight > mid`.

MEASUREMENT THAT IS A GO/NO-GO, AND NOBODY NAMED IT. --d2 scales with the viewport: 102.87 at 1440, 91.44 at 1280, 73.16 at 1024, 64.30 at 900 (the narrowest three-column width; the stack begins at ≤899). Card interiors at those widths are 384.67 / 331.33 / 246.0 / 204.67. `$7,500` at wdth 106 measures roughly 330 / 293 / 235 / 206px. The 900 case overflows by ~1px. MEASURE `$7,500` and `$2,500` against the interior at 1440, 1280, 1024 and 900 BEFORE the commit. If 900 or 1024 overflows, the two legal fixes are (a) `font-size: min(var(--d2), 72px)` below 1025 — 72px stays a live register because the hero sign takes it for `$5B+` — or (b) drop the price to the label axis value `"wdth" 80` at ≤1024. A new size register is not available.

LAYOUT AT 390 (content 326; --s = 64 and must stay 64, asserted). Price at 52px explicitly, NOT --d2, which floors to 39.52 on a phone and would be SMALLER than today. 52px is §14.5's own mobile price size. Same interior order. One seam at 326px, 24px under the head, 32px above the stack. Cards stack at 326 wide, 20px gap, 22px padding, 8px radius. CORRECTION TO CARRY: PASS-104B §05 says the Audit's phone mark "stays the 2px copper LEFT rule". That is STALE. `15.5-cards-mobile` (verify-room.py:1980) asserts `bd.startswith("1px") and "200, 84, 43" in bd` for ALL FOUR of the Audit's borders at 390. Build the four-sided 1px copper border on the phone. Engagements stacks with its figure at 52px, 4 rows in 1 column (both asserted). If `From $5K a month` will not hold at 52px in a 282px interior, narrow the wdth axis or let it wrap to two lines — do NOT drop to 44px or 40px. 44px is a new register and 40px inverts the ladder against the packages' 52px.

MOTION. Trigger is the existing `#price` `data-anim="0.9"` → `#price.in`. Zero JavaScript change, zero new `@keyframes` (room.css declares none), transitions only, house curve `cubic-bezier(.4,0,0,1)`, every beat once, all pre-states behind `html.rl-js`.
- t=0 THE SEAM DRAWS `transform: scaleX(0)` → `scaleX(1)`, `transform-origin: left`, 500ms. Use scaleX, NOT clip-path: every ledger rule in this house draws with scaleX (item 4), and two mechanisms for one visual idea is the defect the motion lens flagged in both A and C.
- t=0/60/120ms the three card price rules draw scaleX — the EXISTING `#price.in .card .pblock::after` selectors at room.css:1694, unchanged.
- t=0/90/180ms each figure fills `opacity: .28` → `1` over 260ms, each behind its own rule. /* motion-ok: §16.3-1, the figure takes current — the page's one lighting language. */ The figures FADE. They never count up.
- t=0/70/140ms the cards rise 20px + fade, 500ms (existing, room.css:1707–1731). t=210ms Engagements rises (existing). t=270ms its figure fills. Chain ends ≈530ms, every beat on screen.
- Hovers unchanged (item 7): chip ground 300ms, `→` 6px in 200ms, card border → copper 300ms.
- REST STATE = the finished frame. With JavaScript off or `prefers-reduced-motion: reduce`, the seam is drawn, the figures are at opacity 1 and the cards sit at translateY(0). Add `.rl-home .price .seam` and `.rl-home .price .pr` to the reduced-motion `transition:none` / `opacity:1` / `transform:none` groups at room.css:2300–2360 as belt-and-braces.

/packages TAKES THE SAME REORDER through the `[data-rl]` engine's own selectors. The `.rl-list` feature ledger slots between the sentence and the chip; the meta label (`90 minutes + same-day memo`) moves off the price baseline to a 14px label directly under the figure. No seam on /packages — the seam is the home section's opening, not a card device.


### Copy

ZERO NEW STRINGS, AND ZERO NEW ATTRIBUTES. The three names, the three prices, the three sentences, the three chip labels, `Engagements`, `From $5K a month` and the descriptor are all unchanged; only the order of existing children inside `.card` and inside `.eng` moves. `14.7-chip-labels-are-the-live-buttons` (which diffs the chips against app/(room)/packages/page.tsx), `14.3-copy-gate`, `14.3-no-figures` and `14.3-no-years` are all untouched. The seam is `aria-hidden="true"` with no text node.

AN ATTRIBUTE THE ENGINEER MUST NOT ADD: option C's "superior dollar" (moving the `$` into a 28px child span so the digits carry the full --d2). I tested it against the live gate and it FAILS, and C's claim that "nothing the copy gate reads is different" is wrong. `14.3-copy-gate` and `14.3-no-figures` walk TEXT NODES, not concatenations (verify-room.py:2578–2585): splitting `$500` yields two distinct nodes, `"$"` and `"500"`, and `"500"` is not in ALLOWED_FIGURES (`["$500","$2,500","$7,500","$99","$5K","$5B+"]`, verify-room.py:109). The gate then substitutes each ALLOWED_DIGIT_TOKEN, and the `%02d` list contributes `"00"`, leaving `"5 "`, so `re.findall(r"\S*\d\S*")` returns `5` and the check fails. Buying a smaller dollar sign by widening the figures allow-list is a bad trade on this repo: that gate exists to hold the operator's own no-figures ruling.


### Gates

PASS UNMODIFIED, and each is a stop-and-report if it does not: `18-audit-copper-border-and-pill` in full (if the reorder breaks a §18 device the commit is wrong); `15.5-cards-mobile` in full; `14.7-chip-labels-are-the-live-buttons`; `14.3-copy-gate`, `14.3-no-figures`, `14.3-no-years`, `14.3-two-rewrites`; `16.3-5-rises` (`cardDelay == ['0s','0.07s','0.14s']`, `engDelay == '0.21s'`, `qDelay == ['0s','0.07s']` — all untouched because no delay moves and no `.q` is added); `16.3-3-heads` (`len(heads) == 4`).

WITHIN `15.5-cards`, everything but one number is unmodified: widths ((content−48)/3), `rowX == gutter`, `rowW == content`, 8px radius, 28px padding, name 24px / Hanken / 500, `hair_ok` (the string test `bd.startswith("1px") and "0.15" in bd` on cards 1 and 3 — nothing changes the border tokens here), `chipW == inner`, `chipTops` spread ≤ 2.0.

EDITS, ALL IN THE SAME COMMIT AS THE CSS — four numbers and one added probe, no selector moves:
1. `15.5-cards` (verify-room.py ~1218): `all(abs(f - 72) < 0.6 for f in cd["pr"])` → assert against the page's COMPUTED --d2, read the way `18-engagements` already reads `eb["d2"]`. Do not hard-code 102.87.
2. `18-engagements-is-the-fourth-card` (~1327): `abs(eb["vFs"] - 72) < 0.6` → the same computed --d2 assertion. `eb` already carries `d2`.
3. `15.5-cards-mobile`: ADD a price assertion — the three card figures and the Engagements figure are 52px ± 0.6 at 390. This check carries NO price assertion today, so this is an ADD, not an edit (PASS-104B §05's "and 52px in 15.5-cards-mobile" is imprecise on that point).
4. `16.3-4-hairlines` (~2212, ~2222): add `one('.price .seam','transform')` to `drawn0`/`drawn1` and change `len(drawn0) == 13` → `14`, so the new drawn rule is gated rather than invisible. Its duration joins the 0.5s set.
5. ADD one check, `05-the-price-is-the-poster`: at 1440 every card figure and the Engagements figure computes to --d2 and reaches opacity 1 after `#price.in`; with JavaScript disabled all four are already at opacity 1 and the seam is at scaleX(1); the seam is 1px, spans the content width ± 1.0, computes `rgb(200, 84, 43)`, and is the ONLY copper element in `#price` besides the Audit's four borders, the Audit's pill border and the four aria-hidden chip arrows. Assert the figures are NOT copper (`color !== 'rgb(200, 84, 43)'`) — a figure set in copper is a kill.

MEASURE-AND-REPORT (not assertions, but the commit does not land without the numbers): `$7,500` and `$2,500` ink width against the card interior at 1440, 1280, 1024 and 900; `From $5K a month` against the 282px interior at 390.

THE COUNT MOVES. RESUME's "61/61" is stale the moment this lands; restate it with the new number in the same commit.


### Grafts

FROM OPTION A (held as the escalation, not built): the section-opening full-width copper seam, which is the one device from the round that survives the buyer, constitution and motion lenses at once. Taken with A's own guardrail — it spans all three cards and belongs to none — and with the motion lens's correction: drawn with scaleX like every other house rule, not clip-path.

FROM THE HERO SIGN (this session's decision, area 01/02): the FIGURE / RULE / CAPTION grammar and the .28 → 1 fill. This is the graft that matters. It is what makes the page one instrument rather than six well-made sections, and it is why the 72px register can leave the cards for the hero's `$5B+` without the system losing a size.

STRUCK FROM OPTION C, WITH REASONS ON THE RECORD SO THEY ARE NOT RE-PROPOSED. (1) The superior dollar: fails `14.3-no-figures` and `14.3-copy-gate` on the node split — see `copy`. (2) Right-aligned figures: the hero sign sets its figure LEFT with the four company names right-aligned. Right-aligning the package figures CONTRADICTS the grammar this section exists to quote, and the buyer lens found it reads as misalignment to anyone who has not seen a financial statement set well. (3) The accountant's double total rule: Engagements is not the sum of $500, $2,500 and $7,500 — it is a different product, so the device asserts false arithmetic. It also required two pseudo-elements on GRID containers (`.cards` and `.eng`), each of which becomes a grid ITEM unless explicitly `position:absolute` over a `position:relative` parent — a fourth column, not a line in the gap.

STRUCK FROM BOTH A AND C: the "44px on one line" phone fallback for the Engagements figure. 44px is a new type register and the brief locks the ladder.

ESCALATION LADDER, IN ORDER, SO NOBODY IMPROVISES. (1) Ship this. (2) If he still reads it as underwhelming, escalate to A's marquee — and only after its 390 DOM is resolved (the figure cannot be a sibling of `.card` at 1440 and a child of it at 390), its `15.5-cards` `pr` selector is moved to `.pkg .pr` in the same commit (verify-room.py:1183 `c.querySelector('.pr')` THROWS rather than fails once the figure leaves the card), its `16.3-4-hairlines` count is re-derived from 13, and its figure-lighting delays are re-derived against `cubic-bezier(.4,0,0,1)`, which front-loads the wipe so the seam's edge passes 70% of 1376px inside the first ~250ms of a 560ms transition — the published 180/270/360ms ladder does not track the edge. (3) Only then reach for content, per PASS-104B §05: one "what you get" line per card at 21px, from the §15.8 wording round, operator-gated. Do not reach for a second accent, a fill, a shadow, a ribbon, a popularity claim or a fourth equal column. All six are on §9's rejected list and the popularity claim has already been caught once on this repo.



## Home section 07, the objections (components/room/Objections.tsx + app/room.css:1203–1272; mobile block ~2103; motion 1595–1740; reduced-motion kill list 2300–2360)

**PICK.** RESTORE THE REGISTER AND ADD THE DOOR — §14.4's own 28/19, one Rule C chip in the measured void under the head, two rows kept, ZERO new copy this commit; then the §15.8 wording round run FIRST of all the parked copy, operator-gated, with two drafted rows and one drafting rule carried in from the killed options. ALL THREE OPTIONS ARE KILLED: the constitution lens killed A, B and C, and the buyer lens independently killed A and B.

### Spec

WHY ALL THREE DIED, VERIFIED AGAINST THE LIVE FILES, so none of it is re-proposed.

SHARED, ALL THREE: each ships FOUR rows against `18-objections-one-lane-from-the-seam` (verify-room.py:1388), which asserts `fq["n"] == 2`, and `18-objections-mobile` (~2009), which asserts `len(set(qTops)) == 2`. Each ships new sentences against `14.3-copy-gate` (~2558), which fails the BUILD on one text node without provenance. PASS-104B §06 rules this section's copy OPERATOR-GATED through the §15.8 round. None of the three gate lists names any of this.

A, ADDITIONALLY: its whole device is a §14.3-banned figure column. §14.3 is an operator ruling and `ALLOWED_FIGURES` at verify-room.py:109 is exhaustive — `$500, $2,500, $7,500, $99, $5K, $5B+`. `8-10 pages` hard-fails `14.3-no-figures`: the allow-list clears `10`, leaves `8-`, and the regex catches it. `90 minutes` and `60 days` survive only through the `%02d` count hole, and the live card copy reads "Ninety minutes live on your stuck build" — spelled out precisely so §14.3 holds. It also breaks `16.3-5-rises` (`qDelay == ['0s','0.07s']`) and `16.3-4-hairlines` (`len(drawn0) == 13`), and its `<a>` as a sibling of `<dt>`/`<dd>` inside `<dl>` is invalid markup.

B, ADDITIONALLY: it rebuilds the object §18 deleted and the operator named twice (§17, verbatim: "I still feel like the home page has parts that feel unorganized like the box"; §14: "The list of packages and engagements look very unorganized"). room.css:783–788 names those boxes as "the page's two loudest seams". Its row 1 answer carries `8 to 10 pages`, which fails `14.3-no-figures` the same way. It strands `See the packages` and forces an edit to Ask.tsx in a pass not scoped to touch the ask.

C, ADDITIONALLY: it deletes the one section the operator praised. It takes out `18-objections-one-lane-from-the-seam`, `18-objections-mobile` and `14.7-faq-full-stop` (which asserts `bool(tp['faq'])`), and drops `16.3-3-heads` from its asserted `len(heads) == 4` to 3. Its worst unnamed consequence: the settle selectors are `html.rl-js .rl-home #faq.in .q` — delete `#faq` and the bare-`.q` pre-states (`opacity:0; translateY(20px)`) stay live with nothing to clear them, shipping four permanently invisible rows. Its gate checks that `#faq` is ABSENT, not that the rows are opaque.

A FABRICATED DEFECT TO DISCARD, NOT TO FORWARD. Both objections-A's risk block and its recommendation claim `app/(room)/packages/page.tsx:303` reads "Full refund any time before kickoff. None after, because the work has started." I read the live file. It reads: "Full refund any time before the kickoff call. After it, you pay for the work done and nothing more." That IS the prorated policy. The contradiction does not exist and must not reach the operator.

WHAT SHIPS — THE STRUCTURAL COMMIT.

THE DIAGNOSIS, MEASURED. The question is 24px and the answer 17px (room.css:1240, 1264), so the closing argument of the page is set in the smallest reading size it owns — smaller than the receipts' 19px captions and the how-I-work 21px sentences. §14.4 already ruled otherwise, in the brief's own words at line 404: "FAQ questions at 28px, answers 19px." §18's recompose quietly took them to 24/17. Restoring 28/19 is a RETURN TO A RULING, not an invention, and it is the loudest legal move that changes no word.

LAYOUT AT 1440. The §18 geometry is KEPT in full: `.faq` a 12-col grid, `--s` 120 top and bottom, head + eyebrow in `.sec` at cols 1–5 (559.33px), the list `.qs` at cols 6–13 opening on the Rule B seam at x = 615.33 with a 792.67px lane, `.q` a `24px | 8px gap | 1fr` grid, the copper `→` in `.q::after` at 20px display in cell 1.
1. `.q dt` 24px → 28px, `line-height: 1.2`, Hanken 500, `letter-spacing: -0.01em`, `text-wrap: balance` kept.
2. `.q dd` 17px → 19px, `line-height: 1.5`, `--ink-80`, `max-width` 60ch → 56ch (at 19px, 56ch is the lane's own measure), `margin-top` 12px → 14px.
3. `.q` padding 30px 0 → 36px 0; `.q:first-child { padding-top: 0 }` stays; the 1px `var(--hair)` bottom stays.
4. RE-MEASURE THE ARROW. `.q::after` is `grid-row: 1; align-self: start`, 20px display glyph at `line-height: 1.4`. With `dt` at 28px/1.2 (33.6px line) the glyph's optical cap-alignment shifts. Fix with `line-height` on the glyph, never with a new size — 20px display is the licensed cell.
5. THE DOOR, and it is what fills the measured void. `.faq .sec` gains `align-self: stretch; display: flex; flex-direction: column` and takes ONE Rule C chip with `margin-top: auto`, so its bottom edge lands on the list's last hairline. Label `Book a free intro call` + the arrow, linking `/call` — VERBATIM from Ask.tsx:46, and deliberately not `Get a reality check`, which already appears twice on the page. The section now ends on a way out instead of on a rule.

LAYOUT AT 390. Content 326, `--s` 64 (asserted, must not move). Question 24px, answer 18px/1.5 — 19px is permitted if the measure holds at 326px; the builder measures and reports. The chip goes full width, 48px, 24px after the last row's hairline. CORRECTION TO PASS-104B §06, which must not be built: its mobile line says "40px between rows". `18-objections-mobile` asserts `all(abs(g) <= 2 for g in qGaps)` and its own comment reads "§18 supersedes §15.3's 40px gap ... the rule IS the separation." Consecutive rows meet on their shared hairline. Do not open a gap.

MOTION — NOTHING NEW, and that is the ruling. `#faq` `data-anim="0.9"` already drives item 4 (`#faq.in .q::before`, the row hairlines drawing with a 60ms stagger, room.css:1693) and item 5 (`#faq.in .q`, the rows rising 20px, room.css:1732). Two rows stay two rows, so `16.3-4-hairlines` (`len(drawn0) == 13`) and `16.3-5-rises` (`qDelay == ['0s','0.07s']`) are both untouched. THE CHIP GETS NO ENTRANCE OF ITS OWN: the head already reveals with clip-path and the rows already rise; a third entrance in a two-row section is noise, and §16.3's rest-state-is-the-finished-frame makes a static chip correct. Hover only (item 7, already declared): ground swaps 300ms, `→` slides 6px in 200ms. The operator's complaint about this section is WORDS, and a section whose copy is weak does not get louder by moving more.

THE COPY ROUND, WHICH IS THE ACTUAL FIX. Run §15.8 on this section FIRST of all the parked copy, sourced from `.planning/research/01-REDDIT-EVIDENCE.md` and the attested phrase bank the operator named. THE DRAFTING RULE, so the round has a spec: every question is the objection in the buyer's own words, verbatim from the phrase bank where one exists; every answer opens by conceding the objection, is SETTLEABLE IN FOUR WORDS BEFORE IT EXPLAINS ITSELF, and closes on ONE checkable term — a price in `ALLOWED_FIGURES`, a named artifact, or a window spelled out in letters. Two rows stay two unless the operator rules otherwise. Nothing in the round ships without his approval AND an allowlist row in the PASS_102/103 tables.


### Copy

THIS COMMIT SHIPS ZERO NEW STRINGS. The two live rows stay verbatim, at the new register:

ROW 1 — dt: "Is this for me if I built it with AI coding tools?"  dd: "You built something real with Cursor, Claude Code, Lovable, v0 or Bolt. It works. Nobody is using it yet, or the next change keeps breaking it. Then yes."
ROW 2 — dt: "Hiring for a company rather than a build?"  dd: "The engagements start at $5K a month. Tell me the problem and I will scope it."
THE DOOR CHIP — "Book a free intro call" + "→". Verbatim from Ask.tsx:46, so `uniq` (the gate's set of DISTINCT text nodes) gains nothing and `14.3-copy-gate` never sees a new node. Verify that with `curl -s localhost:3000 | grep -c 'Book a free intro call'` returning 2 before the commit; if the ask's label has drifted, the chip needs an allowlist row.

PROPOSED FOR THE §15.8 ROUND — PENDING THE OPERATOR'S APPROVAL AND AN ALLOWLIST ROW. Not to be committed on a subagent's judgement. Both rows are gate-clean as written: every figure is in `ALLOWED_FIGURES`, no year, no em-dash, no word from the 35-item banned list, first person, longest sentence 22 words.

ROW 1 (replaces the current row 1 in the same slot).
  Q: "I built it with Claude Code and it works. Now I cannot change one thing without rewriting half of it."
  A: "The tool does not change the work. I read the build top to bottom and write down what is load bearing, what is broken, and what to fix first. That is the Audit, $2,500."
  Provenance: threads 1r5u6qu and 1r5pb34 carry "claude code" inside the 37-post intersection; 1psez8u is the rewrite-it objection. I confirmed all three ids resolve in `.planning/research/01-APPENDIX-intersection-37.json`. "Vibe-coded" is not used; the phrase bank kills it.

ROW 2 (replaces "Hiring for a company rather than a build?", which PASS-104B §06 already named as the first candidate for replacement because it duplicates the Engagements block two sections up).
  Q: "Last time I paid for help, it took so much back and forth that I did most of it myself."
  A: "One person reads it, writes it and ships it, and that person is me. No account manager, no status meeting, no brief for you to write."
  Provenance: thread 1qgfqeh. I read the excerpt in `01-APPENDIX-intersection-37.json` and it contains, verbatim, "required so much back-and-forth that I ended up doing most of it myself." This is the objection a $500-to-$7,500 page most needs and the live page never answers — both the buyer and constitution lenses flagged it as the best material in the whole round.

UNVERIFIED, AND NOT USED: thread 1vxre48 ("A report about a file is not a file"), cited by two options. I could not find that id anywhere under `.planning/research/`. Do not carry it into the round as attested. Publishing an attributed Reddit quotation is separately forbidden; these are objections in the buyer's register, not quotations.


### Gates

PASS UNMODIFIED: `18-objections-mobile` (verify-room.py ~2009 — it asserts stacking, full width and `abs(gap) <= 2`, and carries NO font-size assertion, so PASS-104B §06's "18-objections-mobile takes the phone's new sizes" is imprecise; it needs no edit); `16.3-4-hairlines` (`len(drawn0) == 13`, unchanged because two rows stay two); `16.3-5-rises` (`qDelay == ['0s','0.07s']`, same reason); `16.3-3-heads` (`len(heads) == 4`, the h2 stays); `14.7-faq-full-stop`; `14.3-copy-gate`, `14.3-no-figures`, `14.3-no-years`; `104a-manual-and-refund-question-absent`.

EDITS — TWO INTEGERS, one commit. `18-objections-one-lane-from-the-seam` (verify-room.py ~1388): `all(abs(x - 24) < 0.6 for x in fq["dt"])` → 28, and `all(abs(x - 17) < 0.6 for x in fq["dd"])` → 19. Everything else in that check stands as written and must still pass: `fq["n"] == 2`, stacked, equal row widths, `listX == wantSeam` (615.33), `listW == wantLane`, `headW == wantHead`, `1px solid` on every row, `"200, 84, 43" in arrowColor`.

ADD ONE, `06-the-door`: at 1440, 1280 and 900 the chip sits inside cols 1–5 (its left edge on the gutter, its right edge ≤ the seam) and its bottom edge is within 2px of the last row's hairline; at 390 it is the full 326px content width and 48px tall; its accessible name is the label text, not a bare arrow; and with JavaScript disabled it is present and at opacity 1.

MEASURE-AND-REPORT: the answer's measure at 19px against the 792.67px lane at 1440 and against 326px at 390 (the phone may want 18px); and the `→` glyph's optical alignment against a 28px `dt` cap line at 1440, 1280 and 900.

The check count changes by zero and the two edited values change in place, so this is the cheapest commit in the pass — but RESUME's "61/61" is already stale from the Packages commit and is restated once for both.


### Grafts

FROM OPTION A (killed): its two thread-sourced questions, and only those. They are the best material anyone produced in this round — real buyer sentences with ids that resolve in the live corpus — and they go into the §15.8 round with EVERY digit-bearing figure struck and every CAPTION kept without its FIGURE, which is A's own stated fallback. Its FIGURE column, its four-row structure, its 19px-plus-28px value cell and its `<a>`-inside-`<dl>` markup are not grafted.

FROM OPTION B (killed): the drafting discipline, and nothing else. "Every answer must be settleable in four words before it explains itself" is the single sharpest copy instruction in either area and it is the real fix for "the responses are weak" — a response cannot be weak if it has to survive four words before the reasoning arrives. It enters the §15.8 spec as a rule. The bordered box, the visible verdict column and the stranded `See the packages` chip do not.

FROM OPTION C (killed): a finding for the record, not a build. With the book gone, the tail reads Packages → Receipts → Objections → Ask, so the last thing before the loudest object on the site is a list of the buyer's doubts. Packages → Receipts → Ask is the better close. That is a separate question to MEASURE after the book removal lands and the page is re-measured without it — never braided into it, and never as this section's fix. C's own risk 3 says the same thing.

FROM THE PASS-104B OPERATOR PICK: the promotion principle — the strongest sentence in a section is not set in that section's smallest type. Applied there to the offer line, here to 24/17 → 28/19.

NOT GRAFTED, ON THE RECORD: anything from §15.3's three-column objections. Those columns produced the three ragged feet §18 measured and replaced; the one-lane-from-the-seam geometry stays.



## Decisions only the operator can make

- THE PLINTH (Packages option B) — a ruled device being reversed, and the only person who can reverse it is you. It proposes a full-bleed espresso band mid-page with the three cards standing on it, which would make the Audit's copper mark legible for the first time (3.85:1 on bone becomes 4.41:1 on espresso). It is the loudest move in the round and two of three jurors ranked it top-two. It is killed under the current lock because WINNING-BRIEF §3 says, literally, "No section declares a background," with exactly two exceptions named in the same paragraph (the ask's copper field and the foot), and §1 has the light travel once from the dark half to the light half. A 694px espresso band makes the tail read bone -> dark -> bone -> copper -> dark. Do you want it built as an option to look at, or is §3 standing? There is no partial retreat once it is in: the band is on or off. Ask for a rendered screenshot at 1440 before ruling.

- THE OBJECTIONS ROW COUNT — §18 composed this section as TWO rows and the verifier asserts two at both widths. Every option in the round wanted four. The one row worth adding is a buyer sentence the live page never answers: "Last time I paid for help, it took so much back and forth that I did most of it myself" (attested verbatim in the research corpus, thread 1qgfqeh). Adding it is a third row, which edits two gates and lengthens the section. Two rows, or three?

- THE §15.8 WORDING ROUND FOR THE OBJECTIONS — your call on the two drafted rows in the `copy` field above, verbatim as written. Both are gate-clean (every figure inside the allow-list, no year, no em-dash, no banned word, first person, longest sentence 22 words). Row 2 replaces "Hiring for a company rather than a build?", which repeats the Engagements block two sections up. Nothing ships without your yes and an allowlist row; one unapproved sentence fails the build.

- THE PAGE'S TAIL, AFTER THE BOOK REMOVAL LANDS — with the book gone the home closes Packages, Receipts, Objections, Ask, so the last thing before the ask is a list of the buyer's doubts. Objections option C argued for Packages, Receipts, Ask instead, with the objections folded in beside the prices they object to. I am not recommending it this pass: it deletes the section you called smart, it makes the packages band ~1,900px, and it is the most invasive change in the set at the moment the book removal is in flight in this worktree. But the tail argument is sound. Do you want it measured as its own question once the book removal has landed?


## Risks

"1. THE PRICE MAY NOT FIT AT 900 AND 1024, AND NOBODY IN THE ROUND MEASURED IT. --d2 is 0.76 * clamp(52px, 9.4vw, 136px), so it falls to 73.16px at 1024 and 64.30px at 900 (the narrowest three-column width; the stack begins at <=899), while the card interiors fall to 246.0 and 204.67. `$7,500` at wdth 106 measures roughly 235 and 206px against those. The 900 case overflows by about a pixel. This is measured before the CSS is accepted, not after; the two legal fixes are a `min(var(--d2), 72px)` floor below 1025 or the label axis value wdth 80 at <=1024. A new size register is not available and must not be improvised.\n\n2. TWO 102.87px MASSES CAN STACK. The section head is two lines at --d2 and the three figures are now --d2 as well. If the head and the figure rank read as one wall the section gains height without hierarchy. The copper seam is deliberately placed between them to separate them; measure at 1440 and 1280 before accepting, and cap the head at one line if it does not resolve.\n\n3. THE COPPER SEAM IS THE ONLY NEW MATERIAL IN THE SET AND IT MUST NEVER BE DRAWN PER-COLUMN. It spans all three cards and belongs to none. A copper rule under a single cell is the rank-on-one-edge device §18 deleted by name at room.css:775-790, and PASS-104B already refused once to graft it back. The Audit must never gain a second copper line.\n\n4. THE STANDING PASS-104B DOCUMENT CARRIES TWO STALE INSTRUCTIONS THAT WILL FAIL THE VERIFIER IF BUILT. §05 says the Audit's phone mark stays a 2px copper LEFT rule; `15.5-cards-mobile` at verify-room.py:1980 asserts 1px copper on ALL FOUR sides at 390. §06 says \"40px between rows\" at 390; `18-objections-mobile` at ~2010 asserts consecutive rows meet on their shared hairline with `abs(gap) <= 2`, and its own comment says the rule IS the separation. Build the gate, not the prose.\n\n5. THE OBJECTIONS COMMIT DOES NOT FIX THE OPERATOR'S ACTUAL COMPLAINT, AND SAYING OTHERWISE WOULD BE DISHONEST. His sentence is that the structure is smart and the WORDS are weak. This commit fixes the register and adds the door; the words are parked with him because `14.3-copy-gate` fails the build on one unapproved sentence and PASS-104B §06 rules the copy operator-gated. If the round does not run, the section is better-set and still weakly worded. Report it that way.\n\n6. SELF-CERTIFIED PENDING TWO THINGS. Everything above was read against the live files in this worktree, read-only: verify-room.py's checks and line numbers, Packages.tsx, Objections.tsx, Ask.tsx, app/room.css, app/globals.css, app/(room)/packages/page.tsx:303, the brief's §3 and §14.4, and the four Reddit thread ids used in the drafted copy. NOTHING WAS RENDERED AND NOTHING WAS MEASURED IN A BROWSER — every pixel figure here is arithmetic from the tokens, not a screenshot, and the ink-width estimates for `$7,500`, `$2,500` and `From $5K a month` are estimates. The optical alignment of the copper arrow against a 28px question, and whether 19px answers hold their measure at 390, are both unresolved until someone measures them. Thread 1vxre48, cited by two options, does not resolve anywhere under .planning/research/ and is excluded.\n\n7. ANOTHER PROCESS IS EDITING THIS WORKTREE AND THE BOOK REMOVAL IS IN FLIGHT. Every line number above is from the tree as it stood at this reading and must be re-confirmed before the first edit. Neither commit here depends on the book, and neither should be braided into the removal."

