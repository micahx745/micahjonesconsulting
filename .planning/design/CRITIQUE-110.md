**Adversarial review: Pass-111/112 direction (pricing boxes, /services, receipts, Ordani)**

Most of the direction holds up. The colour table uses only world tokens and currentColor mixes, and the proposed copy has no em-dashes, no banned words and no "load-bearing". Premises 2 and 3 are correct. The refund, 60-day credit, one-business-day and 80% Wall lines all trace to `/packages` or the LESSONS #3 ledger, and "worked inside" is the ledger's approved wording.

The failures are mostly in what the boxes say and how `/services` is organised, which is where both of the operator's main complaints sit. Box heights below are my estimates from the spec's type scale. I rendered nothing, so Step 1 has to measure them.

## HIGH

**H1. The four engagement boxes carry the same list. (a)(f)**
- Passage: "the ship-now lists are identical by design… Recommendation: approve at least two per shape before the band ships."
- Problem: the operator asked for "a very compelling and enticing set of offerings in each thing." Instead, four boxes repeat five sentences.
  - At 1440 each box comes to about 1,000px, taller than the 900px viewport, so no box can be seen whole.
  - At 390 the band runs about 3,900px, and the reader meets the same five lines four times.
  - notion.com/pricing never repeats an item across cards ("Everything in Free, and:").
- Required change:
  - State the five common lines once, as a ruled "Every engagement includes" row under the band, not in a box.
  - Each box lists only lines specific to its shape, taken from live facts (Embedded: "3+ days a week, for 3 to 8 months" and "I act as your head of GTM, product, or AI engineering").
  - Make "at least 2 approved NCs per shape" a blocking gate, not a recommendation.
  - Keep each box to about 700px or less at 1440.

**H2. "Scoped" three times at display size, and a metadata contradiction. (a)(f)**
- Passage: "Scoped shapes: line 1 is `Scoped`… The unpriced line is never smaller and never lighter" (citing Linear).
- Problem:
  - linear.app/pricing shows one non-numeric price out of four tiers ("Custom", Enterprise only). This direction puts three of four at 44-56px weight 800. That makes the confusion the operator named ("that standing rate can be confusing") louder, not quieter.
  - Deleting the page's floor leaves two live lines contradicting the page: the `/services` metadata ("Engagements from $5K a month: advisory, project, retainer, or embedded.") and the `/packages` cross-link ("The engagements start at $5K a month.").
- Required change:
  - Move NC-ALL2 and NC-ALL3 into Step 0 as a blocking operator ruling. The loudest element in three of the four boxes depends on it.
  - If he declines, fix the metadata and the `/packages` line in the same pass. The scoped boxes then lead with the live term (for example "6-20 weeks") at figure size, not "SCOPED" three times.

**H3. The picker blocks Buy, but the pick goes nowhere. (f)(d)**
- Passages:
  - "The picked area is not sent anywhere… NC-X2"
  - the Buy guard
  - "You confirm the area again at checkout or in your kickoff intake."
- Problem:
  - `package-checkout.ts` sends only `metadata.product`.
  - The Audit's Stripe dropdown says Build / Production / Traction. The picker says different names.
  - The Unstick and Sprint intake questions in `lib/catalog.ts` never ask for the area, so the footer claim is false for two of the three packages.
  - Stripe supports `custom_fields[].dropdown.default_value` ("Default values are prefilled on the payment page"), and fields are required by default (docs.stripe.com, fetched).
- Required change:
  - Ship the guard only in the same release as NC-X2: pass the area into `metadata.area` for all three SKUs, pre-fill the Audit dropdown with `default_value`, and relabel it with the area names.
  - If NC-X2 is not approved in this arc, the picker must not block Buy, and the "kickoff intake" clause is cut.

**H4. One purchase path, three names for the areas and two Audit destinations. (f)**
- Problem:
  - The hero's "Start the Audit" (`Hero.tsx:241`) goes to `/packages`, which still says "Build (architecture and code), Production (security and deploy), or Traction".
  - The home box's "Buy the Audit" goes straight to Stripe with "You choose it at checkout".
  - `/services` forces the pick on the page with different names.
  - The operator said "people have to pick which one on the page." Home drops that.
- Required change:
  - Make Step 7's "/packages adopts PackageBand" mandatory in this pass.
  - The home box either uses the picker or links to `/services#packages`.
  - The hero pill and the home box go to one destination.

**H5. The same promise six times on one screen. (f)(a)**
- Problem:
  - "I name the shape on the call" appears in the opening body, the `#shapes` H2 ("Scope and price in writing."), the `#shapes` intro ("I choose the shape with you on the call, and put the scope and price in writing"), and line 3 of all four lists.
  - "A package covers one" appears in the areas intro, the packages H2, the packages intro, the legend, the error message and three area rows.
  - This is the "bunch of small sentences" pattern the operator already called out.
- Required change:
  - Delete the `#shapes` kicker, H2 and intro. The Engagements H2 and sell line already introduce the boxes.
  - Say "scope and price in writing" once, in the shared row.
  - Say "a package covers one" once, in the legend. Area rows stay blank until something is picked.

**H6. Too many small mono labels. (a)**
- Evidence:
  - DESIGN_BAR never-list: "Tracked-uppercase kicker labels on every section."
  - impeccable.style/slop (fetched): "Tiny numbers beside headings add clutter when there is no sequence to follow."
- Problem: the direction has four section kickers, the index numerals 01-04 and 01-03 in every box, area numerals, "What you get" seven times and a term line seven times. That is about 13 tracked-uppercase strings in one 1440 view of the band.
- Required change:
  - Drop `__idx`; neither group is a sequence.
  - Drop the `__sub` "What you get" label; the hairline already does that job.
  - Drop the area numerals.
  - Keep at most one section kicker on `/services`, not counting the foot.

**H7. Receipts stack three hero-metric layouts. (a)**
- Evidence: impeccable.style/slop (fetched): "A huge number with a small label and supporting stats is a familiar landing-page template."
- Problem: §5 stacks three of them: $20M+ at 240px with a small label, four 56px deal figures with small labels, then $5.58B at 104px with a small label. The operator asked to "make the exit part look more aesthically pleasing and premium" and has already rejected one redesign as "cheap".
- Required change:
  - Keep the circled $20M+ as the only big-number moment; that is his ask.
  - Set the exits company-first: company names at display size, with figure and outcome on one baseline.
  - The total becomes the row's last ruled line at deal-figure size, not a third display number.
  - Drop the "3px double… receipt's total rule". It plays on the "receipts" pun he just called cringe.

**H8. The new GSAP gate would break the build, because premise 1 missed a file.**
- Passage (Step 6): the gate `grep -rlE "from ['\"]gsap" app components | grep -v TitleCard` must return nothing.
- Problem: `components/color-worlds/SplitReveal.tsx:22-25` imports gsap, SplitText and ScrollTrigger. It is mounted on every home section title, including this direction's own new H2. The gate fails on its first run and blocks every build.
- Required change: correct premise 1. Either allowlist `SplitReveal.tsx` in the gate with a dated operator ruling, or open a separate arc to take SplitReveal off GSAP.

## MEDIUM

1. **Exits 2×2 below 900px is underspecified. (e)**
   - Problem:
     - If `li + li { border-left; padding-left: 24px }` is not scoped to ≥900px, the third cell gets a stray left hairline and indent, and row 2 has no top rule.
     - At 390, "SURVEYMONKEY" at 17px Bricolage 800 caps is about 139px in a cell of about 151px (estimate).
   - Required change: scope that rule to ≥900px. Below 900px use `:nth-child(2n)` for the divider and add a top hairline on items 3-4. Assert `scrollWidth` at 390.
2. **Opacity on text in classes the new sections reuse. (b)**
   - Problem:
     - `.cw-services__kicker { opacity: 0.9 }` (`globals.css:2998`), `.cw-services__intro { opacity: 0.85 }` (`:3014`) and `.cw-sv-shapes__foot { opacity: 0.9 }` (`:6170`).
     - The new areas and packages intros, the kickers and the band footer row would pick these up.
     - The Step 1 grep only scans `.cw-pbox`, `.cw-pband` and `.cw-pick`.
   - Required change: strip the opacity from those three rules in this pass, and widen the grep to every selector the new sections render.
3. **The areas are reordered, not consolidated, and a receipts fix regresses. (f)(d)**
   - Problem:
     - The operator said the areas "are basically describing the work that takes place within the 4 shapes." `#areas` still gets its own kicker and H2 as a peer section.
     - "One receipt per area" does not say which receipt survives. If Guardicore is kept, the operator-supplied consulting-era positioning receipts (birth worker, organic bookings up 30%) disappear. That reopens the defect recorded in Pass-109 ("section 01 proved positioning with two employment roles"), and Guardicore appears twice.
   - Required change:
     - Make areas an h3 block inside `#shapes`, directly under the band, with no kicker.
     - Name the receipts: birth worker for Positioning, Ordani for Product building, the RFP engine for the AI area.
     - Give `#areas` `max-width: none`. `.cw-sv-sec` caps at 760px; only `.cw-sv-shapes` and `.cw-sv-pkgs` override it.
4. **The per-area package copy is new, and the mapping is wrong. (d)**
   - Problem:
     - "Product building: I go through your architecture and code" and "One week on the AI feature, shipped" are tagged [L] but are recombinations of live copy.
     - The /services product-building buyer has "the idea, the budget… What you do not have is the team to build it." There is no build to audit.
     - "The AI feature" belongs to the AI area.
   - Required change: re-tag these lines as new copy needing approval. The operator rules whether packages map onto the three engagement areas; until he does, the picker uses the checkout's three names.
5. **"Demo to production" as an area name collides with the H1. (d)** The H1 sells the whole practice as demo to production. Naming one of three areas the same makes the other two read as off-offer. List this as a con of option 1 and get the ruling before any copy is written.
6. **Five buttons to one destination, and three filled pills. (c, R17)**
   - Problem: four "Ask about…" buttons go to `/call`, which ignores `?shape=` (NC-X3), and the espresso foot also goes to `/call`. Moving the foot to `.cw-buy` makes three filled pills on `/services`, not the two §8.2 counts.
   - Required change: ship NC-X3 with the band, or use one shared call button under the band. Recount the fills in §8.2 and get the ruling.
7. **Step 5 ties the receipts cleanup to the blocked motion ruling.** CLAUDE.md tells the motion-engineer "the answer there is no". Split the step:
   - 5a (static circled $20M+ plus the ExitRecord rebuild) ships unconditionally.
   - 5b (the count and draw) waits for the dated ruling.
8. **Ordani without NC-X1 is a re-crop, not a redesign. (f)** The operator said "we should figure out something with its design." The direction's own diagnosis, "A product section showing zero product", stays true after Step 6. Raise NC-X1 as the Ordani decision, with a capture path: the app repo at `C:/Users/micah/birthflowV2/ordani-ui-overhaul`, seeded demo data, no PII.
9. **"Week one is a scoping session and the audit" next to "The Audit $2,500". (d)** It reads as the $2,500 Audit being bundled into every engagement. Reword it ("an audit of where things stand"), or have the operator confirm that it is the same deliverable.

## LOW

1. `.cw-reveal` runs 550ms (`globals.css:4000`), over R15's 400ms. Don't claim compliance, and don't add it to the new exit cells without accepting that knowingly.
2. On the home page at 390 and 768, "See all three packages →" renders between the H2 and the box. Put it after the box.
3. From 1024 to 1440, the home box is about 850px tall beside a left column of about 400px (estimate). Measure it. If the box is more than 1.5× the column, move the fit sentence into the left column as the dek.
4. "You keep the memo either way." loses its meaning as a standalone list line. Attach it to the debrief line.
5. `<p role="alert" hidden>` announces inconsistently when un-hidden. Keep the element rendered and inject the text. The alert, the polite region and the focus move would announce the same error three times.
6. Keep `disabled={pending}` on the buy button. `.cw-buy` has no disabled-opacity rule (only `.cw-book__btn:disabled` does), and removing it lets a double click open two checkout sessions.
7. RevenueFigure: render the tick span with no React children, so a re-render never reconciles against the text node that `textContent` replaced.

## VERDICT: BUILD WITH THESE CHANGES

**Before any build:**
- Step 0 gets operator rulings on:
  - NC-ALL2 and NC-ALL3
  - NC-X2
  - at least 2 NCs per shape
  - the §7 rename
  - §8.1
- Steps 2-3 do not start until those rulings are in.

**Can proceed once their items are fixed:**
- The PriceBox primitive (§1, without the idx and sub labels).
- The home box (§4, with H4).
- The static circled figure (§5.1).
- The ExitRecord rebuild (§5.2, with H7).
- Ordani mobile (§6).
- The GSAP gate, corrected per H8.

If H1, H2 and H3 are not fixed, this becomes REWORK.

## References (all fetched this session, fetched=true)
- linear.app/pricing: one non-numeric tier of four ("Custom").
- notion.com/pricing: "Everything in Free, and:", no repeated items, "Recommended" on Business.
- impeccable.style/slop: the hero-metric entry and the tiny-numbered-labels entry.
- docs.stripe.com/payments/checkout/custom-components (stripe-hosted): "By default, customers must complete all fields…" and `dropdown.default_value`.

## Files read
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/app/(foyer)/services/page.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/app/(foyer)/page.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/app/(foyer)/packages/page.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/components/color-worlds/ExitRecord.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/components/color-worlds/SplitReveal.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/components/hand/HandCircle.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/components/BuyButton.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/app/actions/package-checkout.ts`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/lib/catalog.ts`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/content/citations.ts`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/app/globals.css` (grep only)
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/docs/DESIGN_BAR.md`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/docs/LESSONS_LEARNED.md` (#3, #19)
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/brand.json`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/briefs/pass-110-a11y-copy.md`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/qa/pass-109/*.png` (all 14)