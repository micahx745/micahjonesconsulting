# Design review — micahjonesconsulting.com (Cowork, 2026-08-10)

> Provenance: produced by Cowork (Mac, logged-in Chrome) from
> `.planning/prompts/cowork-design-review-prompt.md`, graded against the R1–R20 rubric in
> `docs/DESIGN_BAR.md`. Evidence-locked: every finding traces to §5's evidence log +
> screenshots captured that session. Pasted verbatim by the operator 2026-08-10.
> Screenshots live in the Cowork session, NOT in this repo — findings cite them by name.

**Reviewed live:** 2026-08-10 · all routes loaded in-browser this session at 1440px and ~390px (device mode) · every finding below traces to the Evidence Log (§5) and the referenced screenshots.

**Capture note:** full-page screenshots freeze the site's scroll-driven palette transitions in "hero rust" state; where that mattered, findings were verified against in-viewport captures at scroll positions (`home-ordani-viewport.png`, `home-scroll-42/52.png`, `home-footer-viewport.png`). No finding below rests on a full-page-capture color artifact.

---

## §1 · Verdict

**Raw rubric score: 9 / 20 criteria passing site-wide.**
**Load-bearing check: R1 FAIL + R6 FAIL → per the rubric's own rule, two load-bearing failures cap the site at template tier.**

That cap deserves one sentence of candor: the main-site surfaces (/, /about, /services, /playbook, /hire-me) are *far* above template tier in felt quality — the rust/cream Bricolage voice, the grain, the hand-drawn ellipse around $20M+, and the copy discipline are attributable at a glance and pass the R20 screenshot test easily. The cap is triggered by two *systemic build decisions*, not by taste: the case-study template is a second, unrelated design system, and every like-item grid on the site is a uniform symmetric card wall. Both are fixable without touching a word of copy.

- **Biggest design failure:** The three case pages — the exact surfaces where a $100K+ buyer goes to verify the claims — abandon the brand. They swap Bricolage/Hanken/rust-cream for Inter body + Source Serif 4 drop caps on near-black, a different wordmark ("□□ MICAH JONES" vs "MICAH/JONES"), a different nav, and three different per-page accent colors, two of which fail AA badly (2.01:1 green labels on /work/hr-equity-author). The proof layer reads like a different site than the promise layer.
- **Sharpest fix:** Port the case template into the master system — Hanken body, Bricolage display, the site's rust/cream/ink palette on the dark ground, one wordmark, one nav — and in the same pass the AA label failures, the one-side accent-border card, and the type-scale sprawl on those pages disappear. One template file; three pages fixed; the load-bearing R1 clears.
- **The one thing to protect:** The homepage's editorial confidence — the left-aligned one-sentence hero, the scroll-driven rust→cream→teal→brown palette shifts, the hand-drawn marks, and copy like "Operator, not consultant." and "Send the role. I'll send the receipts." Nothing in the backlog below is permission to sand that down. Also protect: motion fully stops under `prefers-reduced-motion` (verified — zero running animations) — keep that behavior through every fix.

---

## §2 · Rubric scorecard

| R# | Criterion (short) | Site verdict | Where the failure was observed (screenshot ref) |
|----|---|---|---|
| R1 | ≤2 typefaces + mono third; display has character | **FAIL** | /work/guardicore, /work/ordani, /work/hr-equity-author: Bricolage + **Inter body + Source Serif 4** = 3 non-mono faces; site-wide 5 families / two systems (`work_guardicore-1440-s1of2.png` vs `home-1440-s1of5.png`) |
| R2 | Scale contrast ≥4×; no adjacent levels within 15%; ≤5 active sizes | **FAIL** | Contrast clause passes everywhere (230px vs 15px on /). Size count fails on /, /services, /hire-me, /playbook, all /work/*: e.g. / runs ~12 active sizes (230/180/92/64/30/28/22/21/19/15/13/12/11); adjacent-level crowding 21↔22 (/), 13↔13.6 and 11.2↔11.52 (case pages), 48↔51.84 (/hire-me) |
| R3 | Body ≥16px, ≤75ch, 1.5–1.7 leading, AA everywhere | **FAIL** | 13px card body ×36 on /services (`services-1440-s1of2.png`), 13px on /hire-me cards, 15px case blurbs on /; 10px mono labels ("SCOPE") on /services + /hire-me; AA: "Custom software · client-confidential" 2.01:1 (/work/hr-equity-author), "Private beta" 3.42:1 (/work/ordani), "Protected by NDA · 2018-2021" 4.01:1 (/work/guardicore); "$20M+" ink-on-rust 2.39:1 vs 3:1 needed (`home-1440-s1of5.png`) |
| R4 | One accent doing real work; zero purple/cyan gradients, gradient text, glow | **PASS** | No gradients, no gradient text, no glow anywhere. Note (not a fail): / runs three section accents — teal wordmark/email, gold Ordani block, rust — see backlog #7 |
| R5 | No glass, one-side accent-border cards, cards-in-cards, radius >16 | **FAIL** (one instance) | /work/guardicore NDA artifact card has a left-side rust accent border (`work_guardicore-1440-s2of2.png`). Elsewhere clean; 46px pills are buttons, not containers |
| R6 | No symmetric icon-grids; like-item grids weighted/broken | **FAIL** | Zero icon-grids (good). But every like-item grid is uniform + symmetric: 3× four-up card grids on /services (`services-1440-s1of2.png`, `-s2of2.png`), four-up on /services/ai-engineering, 3-up engagement cards on / (`home-1440-s4of5.png`), 3+1 orphan grid on /hire-me (`hire-me-1440-s1of2.png`) |
| R7 | Left/asymmetric hero, ONE sentence, ~2s | **PASS** | "I BUILD THE PRODUCT." + one-line qualifier, left-aligned, no badge-pill stack (`home-1440-s1of5.png`). Mobile clipping of the rotating word is logged under R15/bugs |
| R8 | Vertical rhythm varies; ≥1 quiet/full-bleed; gaps generous | **PASS** | Palette-shifting full-bleed sections, huge quiet zones on / (`home-1440-s2of5.png`). /about's dead right half logged as layout debt, not an R8 fail |
| R9 | Exactly one signature gesture, deployed at moments | **FAIL** | / has three competing gestures (palette cross-fade + infinite marquee + hero word rotator); /about, /services, /work, /playbook, /hire-me have none; case pages run a different one (SVG mark-draw). "Not sprinkled, not absent" fails in both directions |
| R10 | Nav ≤5 incl. bare Work; contact plain; no dropdowns | **PASS** | MICAH/JONES + CLIENTS / ORDANI / WORK / CONTACT. IA note: all four are homepage anchors even from subpages; /services, /about, /hire-me, /playbook absent from nav; case pages swap to a second nav ("← back to home") |
| R11 | Index entries ≤4 data points; curate, don't sell | **FAIL** | /work entries pack 5–6 data points each (author entry: 8K→290K, +doubled close rate, +two six-figure retainers, +years/role/status) (`work-1440-s1of1.png`); same density on /'s engagement cards (`home-1440-s4of5.png`) |
| R12 | Every image a real artifact; zero stock/AI | **PASS*** | Zero stock, zero AI, zero 3D anywhere; hand-drawn SVG accents are one consistent authored voice. *Zero raster images exist site-wide — placeholder frames are the known condition; the urgency ranking is in backlog #13 |
| R13 | No logo wall w/o outcomes; named cos. carry figures | **FAIL** (two lines) | "Also at **Flexport**, **Cuebiq**, and **Postmates** — growth, GTM, and platform strategy" on / (`home-footer-viewport.png`) and "Engagements with Guardicore, TechValidate, **Flexport, Cuebiq, Postmates**" on /about carry no figure-bearing results. No logo walls, carousels, ratings, or counters anywhere |
| R14 | ≥1 metric WITH mechanism a CFO could interrogate | **PASS** (exemplary) | Guardicore: repositioning research → $80M pipeline / $14M revenue / deal size +$150K; Ordani: intake redesigned as one flow → 40%→91% completion; author: two-platform overinvestment → 36× reach, RFP-to-close doubled |
| R15 | Motion is punctuation; nothing idle; ≤400ms once | **FAIL** | / marquee `cw-scroll 22s infinite` — motion confirmed by frame-diff (`home-marquee-t0/t1.png`); hero word rotator cycles idly and **clips at 390px** ("GO-TO-" cut mid-word, `home-390-s1of5.png`); hero entrance 850ms. Credit: `prefers-reduced-motion` verified fully respected (zero running animations); case-page mark-draws run once |
| R16 | Copy specificity; zero hype; time-depth as numbers | **PASS** | "I generated $80M in pipeline and $14M in revenue"; "2013–2023"; "I talked to 22 birth workers before writing a line of code." No hype vocabulary, no emoji found on any route |
| R17 | One CTA style/page; no urgency devices, popups, chat | **FAIL** | / mixes four CTA treatments (filled dark pill, outline pills, gold pill, underlined mono links) (`home-1440-s1of5.png`, `home-ordani-viewport.png`); /playbook: "The first hundred buyers get it at $99" is a scarcity device (`playbook-1440-s2of3.png`). No popups, chat widgets, or floating bars anywhere |
| R18 | Footer logistics only | **FAIL** | /about, /work, /playbook, /hire-me have **no footer at all** (pages end on a back-link); /services + /services/ai-engineering embed a "NEXT STEP / DISCOVERY CALL…" pitch inside `<footer>`. Case-page footer is the model: "I read every message and reply inside two business days." |
| R19 | Authored POV surface under operator's name | **PASS** | The 80% Wall — priced ($149), chaptered, named field manual (`playbook-1440-s1of3.png`) |
| R20 | Screenshot test: attributable at 50% zoom | **PASS** | Rust grain + Bricolage + hand-drawn ellipse + palette-shift one-pager is identifiable from across the room (`home-1440-s1of5.png`). Case pages are the least attributable surfaces — another cost of the second system |

---

## §3 · Per-page punch list

### / — 11/19 applicable

1. **[Marquee: "POSITIONING RESEARCH✦SHIPPED PRODUCTS✦ENTERPRISE GTM✦…" loops continuously; frame-diff `home-marquee-t0/t1.png` confirms 22s infinite animation]** → Idle motion is the exact sin R15 names; it also cheapens an otherwise editorial hero band. → Freeze it: render the strip as a static full-bleed rule of mono keywords, or advance it only on scroll (scroll-linked transform). Delete `animation-iteration-count: infinite`.
2. **[Hero rotator cycles GO-TO-MARKET. / PRODUCT. / DATA PLATFORM. / RFP ENGINE.; at 390px the word clips: "I BUILD THE GO-TO-" with the rest cut — `home-390-s1of5.png`]** → Idle motion (R15) plus a visible mobile rendering bug in the first two seconds of the site. → Pick the strongest single word ("I build the product.") or run the sequence once on load and stop; fix the mobile mask/line-height so no state ever clips.
3. **["$20M+" renders near-black on rust at 2.39:1 (needs 3:1 large) — `home-1440-s1of5.png`]** → Fails AA-large on the page's single biggest proof number (R3). → Set it in the section's cream (as "TWENTY MILLION DOLLARS OR MORE" beside it already is); keep the hand-drawn ellipse.
4. **[Engagement cards carry 5+ data points each: "Monthly reach grew from 8K to 290K. RFP-to-close rate doubled. … Two six-figure retainers closed in the window." — `home-1440-s4of5.png`]** → Index surfaces should curate, not sell (R11); three dense selling cards blur into noise. → Cut each card to headline + one metric + date/role; the case page carries the rest.
5. **[Three symmetric outlined cards, equal width/height — `home-1440-s4of5.png`]** → Uniform like-item grid (R6). → Weight it: lead engagement at 2× column width with the metric at display size, two minor cards stacked; or break one card off-grid.
6. **[Four CTA treatments on one page: filled dark "See the work ↓", outlined "Hire me →" / "Book a call ↗", gold "Join the beta →", underlined mono "SEE FULL SERVICES →" — `home-1440-s1of5.png`, `home-ordani-viewport.png`]** → R17 wants one CTA grammar; four styles dilute the hierarchy of the one action that matters. → One filled pill per page for the primary action; every other link is the underlined mono treatment. (The gold pill may stay gold *inside* the Ordani zone if the pill geometry/typography matches the system.)
7. **[Sticky wordmark collides with content: "MICAH/JONES" overprints "Also at Flexport, Cuebiq…" — `home-footer-viewport.png`]** → Transparent sticky header with no scrim = guaranteed collisions on a long multi-palette page; reads as broken craft at exactly footer/contact moment. → Fade the wordmark out after the hero, or give the header a per-section background/blend rule.
8. **["Also at Flexport, Cuebiq, and Postmates — growth, GTM, and platform strategy across a decade of enterprise software."]** → Named companies with zero figure-bearing result (R13). → Attach one figure to the line collectively, or cut the names and keep "a decade of enterprise software."
9. **[~12 active type sizes measured]** → Scale sprawl (R2); 21px and 22px intros coexist within 5%. → Consolidate to ≤5 + the one 230px Ordani moment; kill near-duplicates (21/22, 12/13, 28/30).
10. **[Hero entrance `cw-hero-line-up` 850ms]** → Over the 400ms budget (R15). → 350ms, ease-out, transform/opacity — it will feel sharper, not cheaper.

### /about — 12/17 applicable

1. **["$20M+in client revenue (2013–2023)." and "End-to-end product builds.Ordani —" — `about-1440-s1of1.png`]** → Two missing spaces on the receipts page of a positioning consultant; buyers notice. → Fix both strings.
2. **[Entire page is one ~680px left column; the right half of a 1440px canvas is empty grain]** → The one page where a buyer looks for the human, and the layout spends half its canvas on nothing (layout debt; also the natural home of the missing portrait — see backlog #13). → Two-column composition: portrait or a scanned artifact (positioning memo page, annotated) right, receipts left.
3. **["Engagements with Guardicore, TechValidate, Flexport, Cuebiq, Postmates, and others"]** → Second instance of named companies without figures (R13). → Same fix as home #8.
4. **[Page ends "← BACK TO HOME" — no footer]** → No contact, no ©, no logistics (R18). → Append the standard logistics footer.
5. **[No signature gesture anywhere on the page]** → R9's "not absent" clause. → Bring one quiet instance of the system gesture (a single palette shift into the RECEIPTS block, or one hand-drawn underline on "$20M+").

### /services — 11/17 applicable

1. **[Three identical four-up card grids (12 uniform cards), each card "SCOPE / DURATION / FIRST-MONTH DELIVERABLE" — `services-1440-s1of2.png`, `-s2of2.png`]** → The like-item-grid failure (R6) at its largest; on mobile it becomes a 6,889px wall of near-identical cards (`services-390-s2of4.png`). → Rebuild each service's four shapes as ONE comparative spec table (shapes as columns, mono data), with the recommended shape visually weighted; or a 1-large + 3-small asymmetric composition. Reuse across all three services and the AI page.
2. **[Card body is 13px ×36 elements; "SCOPE"/"DURATION" labels are 10px mono — `services-1440-s1of2.png`]** → R3 hard fail; the deliverables copy is the best sales copy on the site and it's set at caption size. → Body 16px min; labels 11–12px mono.
3. **[Footer contains "NEXT STEP / DISCOVERY CALL BEFORE ANY ENGAGEMENT. / Every engagement starts with a 30-minute call…"]** → Marketing copy inside `<footer>` (R18). → Move the closing CTA into a page section; footer gets the standard logistics block.
4. **[~10 active sizes; 13/14/15px cluster]** → R2. → Fold into the consolidated scale.
5. **[No gesture]** → R9 "absent." → The section palette-shift already exists site-wide — one shift between the three numbered services would carry it here.

### /services/ai-engineering — 12/17 applicable

1. **[Same four-up uniform grid — `services_ai-engineering-1440-s1of2.png`]** → R6. → Inherits the /services table rebuild (one fix, two routes).
2. **[Same 13px card body / 10px labels]** → R3. → Inherits the type fix.
3. **[Footer carries "DISCOVERY CALL FOR AI ENGAGEMENTS." pitch]** → R18. → Same footer fix.
4. **[Strong differentiator buried: "eval infrastructure that fires on every change, continuous deployment of prompts (not just model versions)…"]** → Not a rubric fail — a curation note: this paragraph is the page's proof-of-depth and it sits in plain body under section "B". → Give "What 'production-grade' means here" the weighted treatment the cards currently get.

### /work — 14/17 applicable

1. **[Each entry's full summary paragraph is underlined as one link block, five lines of underline — `work-1440-s1of1.png`]** → Default-link styling over body copy reads unfinished at this tier and wrecks the reading texture. → Underline titles only; the row is the hit area.
2. **[Entries carry 5–6 data points: "$80M in pipeline generated. $14M in revenue. … Deployed behind a global systemically important bank, the world's largest public biomedical-research funder, and a white-shoe Wall Street law firm." + meta row]** → R11 — the index is doing the case page's job. → One metric per entry ("$80M pipeline → Akamai acquisition"), title, years/role. Depth defers.
3. **[Page ends "← MORE ABOUT HOW I WORK · BACK TO HOME" — no footer]** → R18. → Standard logistics footer.
4. **[No imagery/thumbnail on any entry]** → Fine as pure text list *if* typography carries it — currently underlines undercut that (see #1). When real artifacts land (backlog #13), a small artifact thumbnail per row is the cheapest attributability win on this page.

### /work/guardicore — 13/17 applicable

1. **[Template swaps systems: Inter 18px body, Source Serif italic lede "$80M in pipeline generated. $14M in revenue…", serif drop caps "T"/"R", wordmark "□□ MICAH JONES", nav reduced to "← back to home" — `work_guardicore-1440-s1of2.png`]** → R1 load-bearing fail; the proof layer breaks brand with the promise layer. → Port to master system (backlog #1).
2. **["PROTECTED BY NDA · 2018-2021" rust label measures 4.01:1 on near-black]** → Just under AA (R3). → Falls out of the re-port; if the dark ground stays, lift the label color.
3. **[NDA artifact card has a left-side rust accent border — `work_guardicore-1440-s2of2.png`]** → The exact card pattern R5 bans. → Full hairline border (as the Ordani frames already do) or no border.
4. **[Caption duplication: "Visibility + microsegmentation positioning framework" inside the frame, then verbatim again as caption directly below]** → Redundant furniture; reads as template scaffolding. → Frame carries the label OR the caption — once.
5. **[Role/tools/year rendered three times: under the lede, in the right ENGAGEMENT rail, and again at page bottom]** → Same data thrice on one page. → Once (the rail), plus the bottom "next work ↘" block without the repeat.
6. **[MOBILE: page canvas is 401px wide at a 390px viewport — horizontal scroll; "NARRATIVE." overflows the right edge — `work_guardicore-390-s1of3.png`]** → A layout bug on the flagship case study. → Clamp the display stack (`clamp()` + `overflow-wrap`) so no word exceeds the viewport; kill the overflow.
7. **[Roughly a viewport-height of empty black between "ACQUIRED." and the "$80M in pipeline generated" lede at 390px — `work_guardicore-390-s1of3.png`]** → Quiet is good; a dead screen on mobile before any content is attrition. → Halve the mobile hero spacer.

### /work/ordani — 14/17 applicable

1. **[Same second-system template (Inter + Source Serif; sage accent)]** → R1. → Backlog #1.
2. **["Private beta" / "On this page" sage labels measure 3.42–3.68:1]** → R3 AA fail. → Same re-port/color fix.
3. **[Three placeholder frames "The intake — one screen, not fifteen", each with its caption duplicated verbatim below — `work_ordani-1440-s2of3.png`]** → Dedupe captions (same as guardicore #4). This page is also **artifact-urgency #1** (backlog #13): the software is live with 14 practices — real screenshots exist and this is the only case where nothing is NDA-bound.
4. **[Content column ~646px with the right rail empty below the ENGAGEMENT block for thousands of pixels]** → Same single-column-on-wide-canvas debt as /about. → When real screenshots land, alternate them into the right field.

### /work/hr-equity-author — 14/17 applicable

1. **[Same second-system template]** → R1. → Backlog #1.
2. **["Custom software · client-confidential · 2024-2025" and "On this page" in dark green measure 2.01–2.17:1 on near-black]** → Worst AA failure on the site — effectively invisible labels (R3). → Immediate color lift even before the re-port.
3. **[Lede text exists twice in the DOM on all three case pages — measured as two live text blocks at 26px/646px and 22px/717px with identical copy ("I built the content engine and the software beneath it…")]** → Duplicate lede node (one presumably a breakpoint variant); fragile — one CSS regression away from rendering twice, and it double-counts in extraction/SEO. → One lede element, responsive by CSS, not duplicated markup.
4. **[Single placeholder frame "The morning RFP report — live opportunities ranked…" — `work_hr-equity-author-1440-s2of3.png`]** → Artifact-urgency #3: a redacted screenshot of that morning report would be the most CFO-legible proof object on the site.

### /playbook — 12/17 applicable

1. **["Launching soon. The first hundred buyers get it at $99." — `playbook-1440-s2of3.png`]** → Scarcity device (R17) on an otherwise pressure-free page. → "Launch price $99; $149 after release." States the same fact as pricing, not a countdown.
2. **[Email input renders with no visible border/underline; placeholder "you@email.com" floats next to "Send me Chapter 1 →" — `playbook-1440-s2of3.png`]** → The page's only conversion control has no affordance. → Bordered or underlined field matching the Ordani-section input (which does it right).
3. **[Chapter blurbs at 15px; ~10 active sizes on page]** → R3/R2 marginal. → 16px blurbs; fold sizes into the scale.
4. **[No footer]** → R18. → Standard logistics footer.
5. **[List dashes alternate rust and brown arbitrarily in "WHAT SHIPS WITH IT" — `playbook-1440-s2of3.png`]** → Accent should mean something (R4 note). → One color for list furniture.

### /hire-me — 12/17 applicable

1. **[FOUR SHAPES grid: three cards in row one, ADVISORY orphaned alone in row two — `hire-me-1440-s1of2.png`]** → Accidental asymmetry ≠ weighted grid (R6); it reads as a bug, not a choice. → 2×2, or deliberately weight one shape (the one he most wants to sell) at 2× and stack the rest.
2. **[Card body 13px; "SCOPE / FIT / BEST FOR" labels 10px mono]** → R3. → Same 16px/11px fix as services.
3. **[48px "Send the role…" heading vs 51.84px section headings — within 8%]** → Adjacent-level crowding (R2). → Merge to one size.
4. **[No footer after the CTA pair]** → R18. → Standard logistics footer.
5. **[Numbered receipts rows 01–05 — `hire-me-1440-s1of2.png`]** → Protect this. Best-structured proof block on the site (R14 pass): each row is a figure + mechanism. No change.

---

## §4 · Prioritized backlog (work orders)

### P0 — load-bearing

**P0-1 · Re-port the case-study template into the master design system.**
Routes: /work/guardicore, /work/ordani, /work/hr-equity-author.
Replace Inter → Hanken Grotesk (body 17–18px/1.6), Source Serif 4 → delete (ledes become Hanken 21–22px or Bricolage; drop caps deleted), headings stay Bricolage; wordmark → "MICAH/JONES"; nav → the site nav; labels/eyebrows → JetBrains Mono 12px in system colors at ≥4.5:1; dark ground may stay but recolor to the system's ink/cream/rust (one accent, not per-page sage/green). Delete the duplicated lede block, the triplicate role/tools/year, and the duplicate frame captions while in the file. **Satisfies R1 (load-bearing), and clears the R3 label-contrast fails, R5, and most case-page R2 sprawl in one template.**

**P0-2 · Break the uniform like-item grids.**
Routes: /services, /services/ai-engineering, /hire-me, / (engagements row).
Services + AI page: replace each four-up card grid with one comparative spec table per service — shapes as columns, JetBrains Mono for scope/duration/deliverable data, recommended shape weighted (wider column or filled header). Hire-me: 2×2 or 1-weighted+3. Home: lead engagement card at 2× width with its metric at display size. **Satisfies R6 (load-bearing); the table treatment simultaneously fixes the services R3 body-size fail by resetting that text at 16px.**

### P1 — fails that cost the tier

**P1-1 · Type-scale consolidation.** All routes. Define the scale (e.g., mono-12 · body-17 · lede-22 · h3-28 · h2-40/56 · display-92, plus the reserved 230 Ordani moment) and eliminate near-duplicates: 21/22 (/), 13/13.6 + 11.2/11.52 (/work/*), 48/51.84 (/hire-me), 28/30 (/). ≤5 active sizes per page. **R2.**
**P1-2 · Body and label sizes up; contrast fixes.** 13px→16px card body (/services, /services/ai-engineering, /hire-me); 15px→16px (/ case blurbs, /playbook chapter blurbs); 10px→11–12px mono labels; "$20M+" → cream on rust (/); case-page labels ≥4.5:1 (interim color lift on /work/hr-equity-author's 2.01:1 greens even before P0-1 lands). **R3.**
**P1-3 · Kill idle motion.** / marquee → static strip or scroll-linked; hero word rotator → static strongest word or one-cycle-then-stop; hero entrance 850ms→≤400ms ease-out. Preserve the verified reduced-motion behavior. **R15.**
**P1-4 · Mobile bugs.** /work/guardicore: eliminate 401px canvas overflow (clamp display stack); halve the mobile hero void. /: fix rotator clipping at 390 ("GO-TO-" cut). **R15/craft; both are first-viewport bugs.**
**P1-5 · Index curation.** /work entries and / engagement cards → headline + ONE metric + years/role (≤4 data points); /work: underline titles only, not five-line paragraphs. **R11.**
**P1-6 · One CTA grammar per page.** Site-wide: one filled pill = the page's primary action; all secondary actions = underlined mono links; /playbook: reword "The first hundred buyers get it at $99" → plain launch pricing. **R17.**
**P1-7 · Footer system.** Add logistics footer (email · LinkedIn · ©) to /about, /work, /playbook, /hire-me; on /services + /services/ai-engineering move the "NEXT STEP" pitch out of `<footer>` into a closing section. Model: the case-page footer line. **R18.**
**P1-8 · Sticky-nav collision.** Fade the wordmark after hero or give the header a background rule per palette zone (verified collision: `home-footer-viewport.png`). **Craft/R3-adjacent.**
**P1-9 · Figures for named companies.** / "Also at Flexport, Cuebiq, and Postmates…" and /about "Engagements with…" → attach one collective figure or cut the names. Facts are locked — use existing locked figures only, or drop names. **R13.**

### P2 — polish

**P2-1 · Real-artifact insertion order (the WHERE, per scope):** (1) **/work/ordani + / Ordani section** — live product, no NDA: the three named frames ("The intake — one screen, not fifteen", "What a doula sees on a Tuesday morning", "Every read is logged…") become real screenshots first; (2) **/about** — portrait into the empty right half; (3) **/work/hr-equity-author** — redacted "morning RFP report" screenshot; (4) **/work/guardicore** — redacted/abstracted framework document scan; (5) /work index row thumbnails last. **R12 condition → asset.**
**P2-2 · Copy spacing bugs.** /about: "$20M+in client revenue", "product builds.Ordani".
**P2-3 · Gesture discipline.** Declare the scroll palette-shift THE signature (R9): extend one quiet instance to /about and /services; align case-page mark-draws to the brand's hand-drawn voice (the ellipse/arrow family) rather than a separate system.
**P2-4 · One brand mark.** "MICAH/JONES" everywhere; retire "□□ MICAH JONES" (case pages) — absorbed by P0-1 but check favicons/OG.
**P2-5 · Nav IA.** Keep ≤5 items, but point WORK at /work (not /#products) from subpages, and decide whether /services deserves the CONTACT slot's neighbor; today /services, /about, /hire-me, /playbook are reachable only inline. **R10 note.**
**P2-6 · Brand the 404.** Currently default "404 — This page could not be found." (`contact-404-1440.png`); a one-line system-styled 404 with the logistics footer is cheap and on-voice.
**P2-7 · /playbook email input affordance** (visible border/underline).
**P2-8 · Home accent discipline.** Teal appears only as wordmark/email-link; either give teal a real job or fold it into rust/ink. Gold stays inside the Ordani zone only. **R4 note.**

---

## §5 · EVIDENCE LOG

| URL | HTTP status | Viewport(s) | Verbatim line proving live read | Screenshot ref(s) |
|---|---|---|---|---|
| / | 200 | 1440, 390 | "Three companies I helped build reached an exit — an IPO and two acquisitions." | home-1440-s1of5…s5of5.png, home-390-s1of5…s5of5.png, home-ordani-viewport.png, home-scroll-42/52.png, home-footer-viewport.png, home-marquee-t0/t1.png, home-reduced-hero.png |
| /about | 200 | 1440, 390 | "Most consultants don't ship. Most builders don't sell. I do both, on the same engagement, for the same fee." | about-1440-s1of1.png, about-390-full.png |
| /services | 200 | 1440, 390 | "Three services — positioning & GTM, end-to-end product building, frontier AI engineering." | services-1440-s1of2/s2of2.png, services-390-s1of4…s4of4.png |
| /services/ai-engineering | 200 | 1440, 390 | "The engagement bar is 'deployed, observed, iterated.'" | services_ai-engineering-1440-s1of2/s2of2.png, services_ai-engineering-390-full.png |
| /work | 200 | 1440, 390 | "I built the content engine and the software beneath it for an industry-authority author." | work-1440-s1of1.png, work-390-full.png, work-reduced-hero.png |
| /work/guardicore | 200 | 1440, 390 | "The security market was saturated with honeypots in 2018–2020." | work_guardicore-1440-s1of2/s2of2.png, work_guardicore-390-s1of3…s3of3.png |
| /work/ordani | 200 | 1440, 390 | "I talked to 22 birth workers before writing a line of code." | work_ordani-1440-s1of3…s3of3.png, work_ordani-390-full.png |
| /work/hr-equity-author | 200 | 1440, 390 | "The platform scans new RFPs, weighs each against the author's own work via retrieval, and drafts a partial response every morning." | work_hr-equity-author-1440-s1of3…s3of3.png, work_hr-equity-author-390-full.png |
| /playbook | 200 | 1440, 390 | "A field manual for solo builders stuck between demo and production." | playbook-1440-s1of3…s3of3.png, playbook-390-full.png |
| /hire-me | 200 | 1440, 390 | "Email me the seat you're filling and I'll reply with a full CV and the closest fit. A call comes after the paper, not before." | hire-me-1440-s1of2/s2of2.png, hire-me-390-s1of2/s2of2.png |
| /work-with-me | **404** (status only, per instruction) | — | — | — |
| /contact | **404** (status only; rendered for evidence: "This page could not be found.") | 1440 | "404 · This page could not be found." | contact-404-1440.png |
| /work/passioneer | **404** (status only) | — | — | — |
| /work/akamai | **308 → /work/guardicore** (Location: /work/guardicore; destination verified 200) | — | — | — |

**Method note for traceability:** statuses were recorded from the browser's main-document responses (and a no-follow request client for the redirect chain); all quoted lines are verbatim from `document.body.innerText` dumps captured this session on the live www host; contrast ratios were computed from rendered `getComputedStyle` colors against effective backgrounds; animation facts from computed `animation-*` properties plus frame-diffing; the reduced-motion claim from a `prefers-reduced-motion: reduce` context showing zero running animations.
