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
