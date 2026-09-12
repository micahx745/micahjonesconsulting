**Buyer read**

At the captured shapes band, **mostly yes**. `sv-shapes-1440` distinguishes decision support, a defined deliverable, post-launch support, and an acting functional head. Advisory’s monthly floor and the other shapes’ pricing process are explicit. See [services/page.tsx](C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/app/(foyer)/services/page.tsx):320,335,349,364.

**Not on the initial landing screen.** The opening precedes the band; page padding is 96px and the shapes margin is 128px, before adding the opening’s height and the recorded 764px cards. The attached shapes capture is already scrolled. Evidence: `app/globals.css:3137,6214`; `.planning/qa/pass-111b/shots.json:317`.

For packages, **deliverables are clear; the immediate next step is incomplete**:

- `sv-pkgs-1440`, left: Unstick supplies a call, plan, recording and follow-up. It never explains how the buyer schedules the paid call.
- Centre: Audit explicitly supplies “A kickoff email the moment you buy…” with intake questions and debrief booking.
- Right: Sprint says “One outcome, agreed by email before day one,” but not what arrives immediately after payment.

Evidence: [PackageBand.tsx](C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/components/color-worlds/PackageBand.tsx):29–47. Adding either missing instruction requires **OPERATOR** wording.

`sv-areas-1440` distinguishes notebook-to-production, product construction and enterprise selling through the three opening paragraphs (`page.tsx:68,102,134`). The picker uses the same names and guards Buy (`PackageBand.tsx:99,113`). **The picker is absent from `sv-pkgs-1440`; the shared row is absent from `sv-areas-1440`. Neither receives visual clearance here.**

**The bar**

- **Overflow:** `sv-shapes-1440`, Project’s “6-20 weeks” crosses its right frame near x665. The figure uses 56px viewport-based sizing inside roughly 240px of content width. `app/globals.css:2755`; `PriceBox.tsx:60`. The term is approved; its overflow is not.
- **Residual repetition, H1/H5:** Project repeats fixed pricing in its term and first bullet, then again in the shared row (`page.tsx:335,226,243`). Advisory’s one-business-day response repeats the shared response promise (`:222,245`). “Strategy and software from the same person” repeats opening/shared/product-area promises (`:288,244,104`). Week-one scoping and month-one shipment repeat in “Why one person” (`:241,242,456,458`).
- **Package repetition, H5:** `sv-pkgs-1440`, Unstick repeats duration/plan in its term, fit and first two bullets (`PackageBand.tsx:146,52,30`). Sprint repeats one week/one outcome in its term, fit and first two bullets (`:198,68,44`). Audit’s start timing repeats the section introduction (`:173`; `page.tsx:438`). “One area each” repeats the picker legend (`page.tsx:435`; `PackageBand.tsx:115`). These are **approved-copy conflicts**, not executor deviations. Critique: `.planning/design/CRITIQUE-110.md:55–63`.
- **Excess height, target miss rather than gate failure:** `sv-shapes-1440`, Embedded has roughly 165px between its last benefit and button; Project roughly 100px. `sv-pkgs-1440`, Sprint has roughly 80px. Recorded heights are 764px/771px. The brief explicitly accepts ≤800px and retains 700px only as a target: `.claude/briefs/pass-111b-services-boxes-and-rail.md:532–534`.
- **Extra faded section kicker, H6:** source-only “Why one person” is 12px mono, tracked uppercase, opacity `.75`: `page.tsx:451`; `app/globals.css:7063–7069`. H6 permits one section kicker outside the foot (`CRITIQUE-110.md:74`).
- **Body leading, R3:** all seven fit paragraphs use `line-height:1.45`, below 1.5. Visible in both desktop box captures and Retainer in `sv-shapes-390`. `app/globals.css:2790–2792`; `docs/DESIGN_BAR.md:170`.
- **Type proliferation, R2:** the captures use 12,15,16,17,19,23.04,28.8,33.12 and56px, among other page sizes. The 15/16,16/17 and17/19 steps are also within 15%. `app/globals.css:2776,2844,2806,7293,2790,7256,7285,2742,2755`; `DESIGN_BAR.md:168–169`.
- **Retained literal bar conflicts:** mono carries prose links and pricing sentences beyond R1’s numeral/data exception (`app/globals.css:3292,2775`); the opening is “Engagements” plus two sentences, not R7’s single assertion (`page.tsx:285,288`); its Guardicore proof has no figure-bearing result under R13 (`:298`); the retained footer introduces `.cw-cta` alongside `.cw-buy`, contrary to literal R17 (`:487`). Footer text also remains faded (`app/globals.css:3482,3498`). The brief preserves these surfaces; disposition is **OPERATOR**.

**Not defects established here:** figure-sized durations are expressly approved; “Start here” and the seven term lines are retained, not extra section kickers. Each captured band has one filled pill. No one-word orphan or horizontal clipping is visible in the supplied 390 crop. No banned-copy or new-motion violation was established.

**FIX**

1. **`app/globals.css` — Project figure:** at ≥1360px, set `#shape-project .cw-pbox__fig` to `44px`; retain the approved string and nowrap. Resolve the visible overflow while preserving H2.
2. **OPERATOR — `PackageBand.tsx` — Unstick/Sprint:** approve an immediate post-payment instruction for each before inserting copy. Preserve the §14 four-item lists until ruled.
3. **`app/globals.css` — “Why one person”:** set display family, 24px, weight800, line-height1.1, normal tracking, `text-transform:none`, `opacity:1`. Preserve its words. H6.
4. **`app/globals.css` — all box fit paragraphs:** change `line-height:1.45` to `1.5`. R3.
5. **`app/globals.css` — narrow box spacing on `/services`:** use inner padding24px/lead23px; list margin-top16px, padding-top0; item vertical padding8px; action padding-top20px. Preserve aligned buttons and every approved commitment. Recheck heights both before and after selection against the 800px gate; pursue H1’s 700px target.
6. **OPERATOR — `page.tsx` and `PackageBand.tsx` — repetitions enumerated above:** approve exact deletions or replacements in the brief before changing them. H1/H5.
7. **OPERATOR — `app/globals.css` and `page.tsx` — retained R1/R2/R7/R13/R17 conflicts:** record explicit exceptions or approve replacement specifications. Do not silently rewrite the locked opening, proof or footer.

No file was written: no `-Out` path was supplied, and this session’s filesystem permissions are read-only.