# Pass 111b: /services as boxes, the area on the rail, the rename

Executor: GLM 5.3 via `scripts/claude-glm.ps1` (z.ai bucket), `-Batch` with a pointer prompt.
Worktree: `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`, branch
`design/live-evolve`. Do not touch the main checkout. Do not push. Do not deploy. Stage by
explicit path and commit with `git commit -F <abs msg> -- <paths>` after reading
`git diff --cached --name-only` (LESSONS #23).

Inputs you must read before the first edit: this brief; `.planning/design/DIRECTION-110.md`
sections 1.8, 1.9, 2.1 (the styling of the picker) and 8; `.planning/design/CRITIQUE-110.md`;
`docs/DESIGN_BAR.md`; `.claude/brand.json`; the Next.js guides under
`node_modules/next/dist/docs/` for `searchParams` (it is a Promise in this version) and for
server actions. Where this brief and DIRECTION-110 disagree, this brief wins; it already
carries every CRITIQUE-110 change that survived the operator's rulings.

## 0. The rulings (operator, 2026-09-11, via the decision queue)

1. **Pricing (decision 1): Advisory-only floor.** "From $5K a month" is true of Advisory and
   of nothing else. The page-level price line, the /services metadata clause, the /packages
   cross-link and the "On the price" paragraph all go. The scoped shapes lead with their
   live term at figure size, not the word "Scoped" three times (CRITIQUE H2).
2. **Commitments (decision 2): every proposed line is approved** (A1-A3, P1-P3, R1-R2,
   E1-E3, U1-U3, AU1, S1-S2). A4 (notice terms) and S3 (the Sprint remedy) wait for his
   wording and do not ship. ALL1 was withdrawn by the book ruling (Pass-112).
3. **The area (decision 3): wire it through.** The page's pick travels as Stripe
   `metadata.area`, server-validated, replaces the Audit's dropdown, and lands in the kickoff
   email. Where a Buy button has no picker (home, /packages), Stripe asks the same question
   with the same three names, so the area is captured on every path. **NC-X3: yes**, the
   "Ask about" links open `/call?shape=` and prefill the note.
4. **The rename (decision 9): "AI engineering."** "Frontier AI engineering" is retired
   everywhere it renders. "End-to-end product building" is trimmed to "Product building" so
   the three names sit in one picker (NC-N1; my call, he can veto).

Reason, one line: the page must say four true things (one price, its term, what each shape
promises, which area) once each, and the pick a buyer makes must survive to the invoice.

## 1. Page order after this pass (`app/(foyer)/services/page.tsx`)

1. `#engagements` (bone). Keep the kicker "For companies", the H2 "Engagements", the sell
   line and the Guardicore proof card exactly as they are. DELETE `.cw-sv-open__price` and
   its `<p>`. DELETE the paragraph beginning "Three areas of work, inside Engagements."
2. `#shapes`. DELETE its kicker, H2 and intro paragraph (CRITIQUE H5). The section keeps
   `aria-label="The four engagement shapes"`. Inside, in this order:
   - the shapes band: `<div className="cw-pband cw-pband--shapes">` with four `PriceBox`
     (`as="h3"`), copy in section 2;
   - the shared row (section 2.2), one ruled block, not a box;
   - the areas block (section 2.3) as three unboxed columns under one `h3`.
   DELETE the `<table className="cw-sv-table">`, its caption, and the "Not sure which
   shape?" foot. DELETE the `.cw-sv-svc-group` block and its three chapters; the SERVICES
   array stays as data (it feeds `SERVICES_LD`) with the two title edits in section 6.
3. `#packages`. No kicker (CRITIQUE H6: "For companies" is the page's one kicker). H2 and
   intro in section 2.4, then `<PackageBand />` (section 3), which renders the picker, the
   packages band and the footer row. DELETE the packages `<table>` and its Buy cells.
4. The objections: DELETE the "On the price" `<h2>` and its paragraph. Keep "Why one person"
   verbatim.
5. The espresso foot: unchanged, including its `.cw-cta` (section 8).

`SERVICES_LD` and `PACKAGES_LD` are unchanged except for the two renamed titles.

## 2. Exact copy

No em-dashes anywhere in new copy. Strings are placed, not paraphrased.

### 2.1 The four shape boxes (`PriceBox`, `as="h3"`, no `tag` on any of them)

`PriceBox` change first: make `area` optional (`area?: ReactNode`) and render
`<p className="cw-pbox__area">` only when it is provided. Wrap `price.fig` in
`<span className="cw-pbox__fig cw-nowrap">` so a range never splits (LESSONS #20).

| prop | Advisory | Project | Retainer | Embedded (`lead`) |
|---|---|---|---|---|
| `id` | `shape-advisory` | `shape-project` | `shape-retainer` | `shape-embedded` |
| `name` | `Advisory` | `Project` | `Retainer` | `Embedded` |
| `price.from` | `From` | (none) | (none) | (none) |
| `price.fig` | `$5K` | `6-20 weeks` | `6 months` | `3-8 months` |
| `price.per` | `a month` | (none) | `then month to month` | `3+ days a week` |
| `term` | `4-6 hours a month, ongoing` | `Fixed price, in writing after the call` | `Scoped and priced on the call` | `Scoped and priced on the call` |
| `fit` | `You want a second operator in the room for the big decisions.` | `One defined outcome with a start, an end, and a named deliverable.` | `I stay on after the project ships: the launch, the first customers, and what they break.` | `I act as your head of GTM, product, or AI engineering for the window.` |
| CTA | quiet, `Ask about Advisory`, `/call?shape=advisory` | quiet, `Ask about a project`, `/call?shape=project` | quiet, `Ask about a retainer`, `/call?shape=retainer` | filled, `Ask about Embedded`, `/call?shape=embedded` |

`list` per box, in this order:

- Advisory: `Two working sessions a month, booked when you need them.` ·
  `Send me a decision between sessions and get my read within one business day.` ·
  `A short written note after each session: what we decided and what happens next.`
- Project: `A fixed price for the agreed scope.` · `A written progress note every week.` ·
  `A handover at the end: documentation and a walkthrough, so your team runs it without me.`
- Retainer: `Same-day response on anything that breaks in production.` ·
  `A monthly written review of what shipped and what is next.`
- Embedded: `In your standups and leadership meetings as part of the team.` ·
  `A roadmap I own and report on to the CEO.` ·
  `Before I leave: help hiring the permanent head of the function, and a handover plan.`

CTA markup, quiet: `<a href="/call?shape=advisory" className="cw-buy cw-buy--quiet">Ask about Advisory <span aria-hidden>→</span></a>`; filled: the same without `cw-buy--quiet`.
No `area` prop on any shape box.

### 2.2 The shared row under the shapes band

```
<div className="cw-pband__incl" aria-labelledby="sv-incl-title">
  <h3 id="sv-incl-title" className="cw-pband__incl-h">Every engagement includes</h3>
  <ul className="cw-pband__incl-list">…six items…</ul>
</div>
```

Items, in order:

1. `Week one is a scoping session and an audit of where things stand, so the work starts on the right problem.`
2. `Something named ships in month one.`
3. `The scope and the price in writing before anything starts. No discovery fee.`
4. `Me, directly: strategy and software from the same person, with no hand-off.`
5. `A reply within one business day.`
6. `Any one of the three areas below, two of them, or all three.`

### 2.3 The areas block (inside `#shapes`, under the shared row)

```
<div className="cw-areas" aria-labelledby="sv-areas-title">
  <h3 id="sv-areas-title" className="cw-areas__h">Three areas of work</h3>
  <div className="cw-areas__grid">…three <article className="cw-area">…</div>
</div>
```

Each `article`: `<h4 className="cw-area__name">`, `<p className="cw-area__pain">`,
`<ul className="cw-area__list">` (three outcomes, verbatim from the SERVICES array),
`<p className="cw-area__proof">` holding the one receipt below and, where given, its link as
`<a className="cw-mlink">Read the case study <span aria-hidden>→</span></a>`. No numerals, no
"Proof" label (CRITIQUE H6). Order and the one receipt each (CRITIQUE M3):

1. **AI engineering** (SERVICES `ai-engineering`): pain and outcomes verbatim; receipt: the
   RFP receipt from that entry (`For an industry author: software that reads every new RFP each morning…`), link `/work/rfp-engine`.
2. **Product building** (`product-building`): pain and outcomes verbatim; receipt: the Ordani
   receipt, link `/work/ordani`.
3. **Positioning & GTM** (`positioning-gtm`): pain and outcomes verbatim; receipt: the birth
   worker receipt (`A birth worker: repositioned…`), no link.

Render these from the SERVICES array (reordered to AI, Product, Positioning; the `n` field
is no longer rendered) with a `proof` index per entry rather than duplicating strings.

### 2.4 Packages section head

- H2 (`.cw-service__title`, `id="cw-sv-pkgs-title"`): `Or start smaller. Three fixed prices, one area each.`
- Intro (`.cw-services__intro`): `No scoping call, no proposal. Buy one and the work starts within the week.`

### 2.5 The picker (inside `PackageBand`)

- Legend: `Pick the area first. A package covers one.`
- Options, in order, `name="pkg-area"`: value `production` label `AI engineering`; value
  `build` label `Product building`; value `traction` label `Positioning & GTM`.
- Error line (always rendered, text injected on demand, LOW-5): `Pick an area first, then buy.`
- Polite region text on change: `Packages now show {label}.`

### 2.6 The three package boxes (`PriceBox`, `as="h3"`)

| prop | The Unstick Session | The Audit (`lead`, `tag="Start here"`) | The Sprint |
|---|---|---|---|
| `id` | `pkg-unstick` | `pkg-audit` | `pkg-sprint` |
| `price.fig` | `$500` | `$2,500` | `$7,500` |
| `term` | `90 minutes · same-day plan` | `Two weeks · starts within the week` | `One week · embedded` |
| CTA | quiet `BuyButton` `Buy the Unstick Session` | filled `BuyButton` `Buy the Audit` | quiet `BuyButton` `Buy the Sprint` |

`fit` by picked area (none / production / build / traction):

- Unstick: none `Ninety minutes live on whatever is stuck. You leave with a written plan the same day.` · production `Ninety minutes live on your AI stack. You leave with a written plan the same day.` · build `Ninety minutes live on your stuck build. You leave with a written plan the same day.` · traction `Ninety minutes live on your positioning. You leave with a written plan the same day.`
- Audit: none `I go through your AI stack, your build, or your positioning top to bottom.` · production `I go through your AI stack, from the notebook to production, top to bottom.` · build `I go through your architecture, code, and deploy top to bottom.` · traction `I go through your positioning and go-to-market top to bottom.`
- Sprint: none `One week on one outcome, shipped. Not a plan. The thing, done.` · production `One week on the production push, shipped. Not a plan. The thing, done.` · build `One week on the feature, shipped. Not a plan. The thing, done.` · traction `One week on the repositioning, shipped. Not a plan. The thing, done.`

`list` (does not change with the pick):

- Unstick: `A 90-minute working call on the thing that is stuck.` · `A written fix plan the same day: what is wrong, in the order to fix it.` · `For builds, the prompts to fix it with.` · `The call is recorded and the recording comes with the plan.` · `One follow-up question by email within 7 days.` · `I work in your tools and your repo.`
- Audit: `An 8-10 page memo: what works, what is broken, and what to fix first.` · `A prioritized fix sequence, so you can start the morning it lands.` · `A one-hour debrief call where I walk you through it. You keep the memo either way.` · `A 30-day follow-up call after the memo.` · `A kickoff email the moment you buy: the intake questions and a link to book the debrief.`
- Sprint: `One outcome, agreed by email before day one.` · `One week embedded on that outcome.` · `Daily progress notes.` · `A mid-week check-in call.` · `The work lands in your repo and tools, with a handover note.` · `A debrief and a map of the next steps.`

`area` prop: omitted until a pick; after a pick, `Covers: {label}.` with the label in `<strong>`.
Unstick has no fallback row any more (U1 approved: it covers Positioning & GTM).

### 2.7 The band footer row (one ruled row under the packages band)

`Every fee credits toward the next package, or toward an engagement started within 60 days. Full refund any time before kickoff, none after. I reply within one business day.` then `{" "}` and `<a href="/packages" className="cw-mlink">Full details on the packages page <span aria-hidden>→</span></a>`.

### 2.8 Other surfaces

- `/services` metadata: in every string of `metadata` that contains `$5K`, replace the clause
  `Engagements from $5K a month: advisory, project, retainer, or embedded.` with
  `Four engagement shapes: advisory from $5K a month; project, retainer, and embedded priced on the call.` Keep the rest of each string verbatim.
- `/packages` cross-link (`.cw-pkg-page__cross`) becomes: `Hiring for a company rather than a build?{" "}<a href="/services" className="cw-lede-link">The engagements</a>{" "}are scoped and priced on the call. Tell me the problem and I will name the shape.`
- `/packages` Audit flavor sentence (line ~140): replace `Pick one flavor: Build (architecture and code), Production (security and deploy), or Traction (positioning and go-to-market).` with `Pick one area at checkout: AI engineering, product building, or positioning and GTM.` Keep the sentence after it.
- Home Audit box `area` prop (`app/(foyer)/page.tsx` ~184): `Covers one area: AI engineering, product building, or positioning and GTM. You pick it at checkout.`
- `app/llms.txt/route.ts` line 24: `Frontier AI engineering` → `AI engineering`. Grep the file for `End-to-end product building` and trim it the same way if present.
- `lib/catalog.ts` Audit `description`: `Two-week fixed-scope audit (Build, Production, or Traction): …` → `Two-week fixed-scope audit of one area (AI engineering, product building, or positioning and GTM): …`. This string only reaches Stripe on product creation; the LIVE product description is the operator's (section 10).
- `docs/LESSONS_LEARNED.md` #3 ledger, appended before the `**Gate:**` line, three bullets:
  - `- **Advisory-only floor** (operator 2026-09-11, decision 1). "From $5K a month" is Advisory's price and no other shape's; Project, Retainer and Embedded are scoped and priced on the call with no public floor. NEVER: "Engagements from $5K a month", "start at $5K a month", "standing rate", or any page-level price line on /services. Gate: retired-phrases-gate (Pass-111b).`
  - `- **Shape and package commitments approved as true** (operator 2026-09-11, decision 2): Advisory A1-A3, Project P1-P3, Retainer R1-R2, Embedded E1-E3, Unstick U1-U3, Audit AU1, Sprint S1-S2, wording as in .claude/briefs/pass-111b-services-boxes-and-rail.md §2. A4 (notice terms) and S3 (the Sprint remedy) are NOT approved; do not write them. ALL1 fell with the book (Pass-112).`
  - `- **"AI engineering"** is the third area's name (operator 2026-09-11, decision 9); "Product building" is the second's. NEVER: "Frontier AI engineering", "End-to-end product building", "Demo to production" as an area name. Gate: retired-phrases-gate (Pass-111b).`

## 3. Components and the rail

### 3.1 `lib/catalog.ts`

Replace `AUDIT_FLAVORS` with:

```ts
/** The three areas a package covers. Values are the Stripe-facing keys (kept from the
 *  old Audit dropdown so past sessions still parse); labels are what the buyer reads. */
export const AREAS = [
  { value: "production", label: "AI engineering" },
  { value: "build", label: "Product building" },
  { value: "traction", label: "Positioning & GTM" },
] as const;
export type AreaValue = (typeof AREAS)[number]["value"];
export function isAreaValue(v: unknown): v is AreaValue { … }
export function areaLabel(v: string | null | undefined): string | null { … }
```

### 3.2 `app/actions/package-checkout.ts`

Signature `createPackageCheckout(skuKey: string, area?: string)`. If `isAreaValue(area)`:
`metadata: { product: sku.lookupKey, area }` and NO `custom_fields`. Otherwise, for EVERY
package SKU (not only the Audit): `metadata: { product }` plus one required dropdown
`{ key: "area", label: { type: "custom", custom: "Which area?" }, type: "dropdown", dropdown: { options: AREAS.map(a => ({ label: a.label, value: a.value })) } }`.
Log nothing new. `app/actions/` shows a diff in exactly this file.

### 3.3 `app/api/stripe/webhook/route.ts`

Resolve the area once: `session.metadata?.area`, else the `area` custom field's
`dropdown.value`, else the legacy `flavor` custom field's `dropdown.value`, else `null`.
Pass `areaLabel(area)` to `deliverPackageKickoff`. Nothing else in the webhook changes.

### 3.4 `lib/package-delivery.ts`

Rename the `flavor` parameter to `area` (a label or null). The payment line becomes
`Payment received: ${sku.name}, ${dollars}.${area ? ` Area: ${area}.` : ""}` and the sale note
`Package: ${sku.name} (${sku.lookupKey})${area ? ` — ${area}` : ""}` (that em-dash is
existing note text, not page copy).

### 3.5 `components/BuyButton.tsx`

Add `area?: string` and `guard?: () => boolean`. In `go()`: `if (guard && !guard()) return;`
before `startTransition`, then `createPackageCheckout(skuKey, area)`. Keep
`disabled={pending}` (CRITIQUE LOW-6).

### 3.6 `components/color-worlds/PackageBand.tsx` (`"use client"`, new)

State `area: AreaValue | null`, initial `null`. On mount read `new URLSearchParams(location.search).get("area")` and set it if `isAreaValue`. On change: set state,
`history.replaceState(null, "", "?area=" + v + "#packages")`, set the polite region text.
Renders, in order: the `<fieldset className="cw-pick">` (markup exactly as DIRECTION §2.1,
copy from section 2.5, error `<p className="cw-pick__err" role="alert">` always in the DOM
with empty text until the guard fires), `<div className="cw-pband cw-pband--pkgs">` with the
three `PriceBox`es (section 2.6; `fit` and `area` derived from state), then the footer row
`<p className="cw-pband__foot">` (section 2.7). The `guard` passed to each `BuyButton`:
if `area` is null, set the error text, `focus()` the first radio, return `false`; else `true`.
No modal, no scroll library call.

### 3.7 `/call?shape=`

`app/(foyer)/call/page.tsx`: `searchParams` is a Promise; await it, read `shape`, accept only
`advisory | project | retainer | embedded`, map to `Advisory | Project | Retainer | Embedded`,
and pass `<BookCallForm defaultNote={shape ? \`Shape: ${Label}.\` : undefined} />`.
`components/color-worlds/BookCallForm.tsx`: accept `defaultNote?: string` and set
`defaultValue={defaultNote}` on the note `<textarea>`. Nothing else on the form changes.

## 4. Layout (classes to add in `app/globals.css`, tokens that already exist)

Every colour rule follows LESSONS #19: text is `inherit` or `var(--cw-fg)`; the only fill
that carries text is `var(--cw-fg)` with `var(--cw-bg)` text; never `--cw-accent` under or
behind text; never `opacity` on text; never a hex or a fixed palette token in these blocks.

- `[data-mode="cw"] .cw-sv { max-width: 1440px; }` (DIRECTION §1.8). Prose blocks keep
  their own caps. No `100vw` math.
- `.cw-pband { display: grid; gap: 16px; }`
  - `.cw-pband--shapes`: `≥1360px` → `grid-template-columns: repeat(3, minmax(0,1fr)) minmax(0,1.3fr)`; `768-1359px` → `repeat(2, minmax(0,1fr))`; below → one column.
  - `.cw-pband--pkgs`: `≥1200px` → `minmax(0,1fr) minmax(0,1.3fr) minmax(0,1fr)` with `.cw-pband--pkgs .cw-pbox__name { min-height: 1.96em }`; below → one column.
  - The wide box variant is already selected by `@container (min-width: 640px)` on
    `.cw-pbox__in` (Pass-111a). Do not add a second mechanism.
- `.cw-pband__incl`: full-strength top rule (`border-top: 1px solid currentColor`), padding
  `32px 0 8px`, margin-top 40px. `.cw-pband__incl-h`: Bricolage 800, `clamp(20px,1.6vw,24px)`.
  `.cw-pband__incl-list`: two columns from 768px (`columns: 2; column-gap: 40px`), the
  existing `.cw-pbox__list` marker style reused by giving the `ul` both classes.
- `.cw-areas`: margin-top 64px, `max-width: none`. `.cw-areas__h` as `.cw-pband__incl-h`.
  `.cw-areas__grid`: `≥769px` → `grid-template-columns: minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr)`, full-strength top rule on the grid, columns divided by
  `border-left: 1px solid color-mix(in srgb, currentColor 22%, transparent)` with 32px
  padding-left on columns 2-3; `≤768px` → one column, dividers become `border-top`.
  `.cw-area__name`: Bricolage 800 uppercase `clamp(22px,2vw,30px)`. `.cw-area__pain`:
  Hanken 17px. `.cw-area__list`: 16px, reuse the `.cw-pbox__list` marker. `.cw-area__proof`:
  Hanken 600 16px, margin-top 20px.
- `.cw-pick` exactly as DIRECTION §2.1 "Styling" (12px radius, `1.5px solid currentColor`
  border, 52px min-height segments, columns from 640px, checked = `--cw-fg` fill with
  `--cw-bg` text, hover = inset 1px ring, focus = 2px outline on the group + underline on
  the focused span, error text weight 700 inheriting colour). The input uses the clip
  pattern, never `display: none`.
- `.cw-pband__foot`: top rule as `.cw-pband__incl`, Hanken 16px, margin-top 24px.
- Delete nothing from the `.cw-sv-table*` rules; they stay until a measured purge.

Motion: none. The pick swaps instantly. No transition, no reveal on the new blocks.

## 5. The gate additions (same day, LESSONS #21)

`scripts/retired-phrases-gate.mjs`: add to `PHRASES`: `"Engagements from $5K a month"`,
`"start at $5K a month"`, `"standing rate"`, `"Frontier AI engineering"`,
`"End-to-end product building"`. Add one header comment block for the three rulings.
Self-test: plant each on a tsx string line; near misses: `"advisory from $5K a month"` (must
NOT hit) and `"AI engineering"` alone (must NOT hit). Update the printed counts.

## 6. The SERVICES array edits

- `product-building.title`: `End-to-end product building` → `Product building`.
- `ai-engineering.title`: `Frontier AI engineering` → `AI engineering`.
- Reorder the array to `ai-engineering`, `product-building`, `positioning-gtm`. Add a
  `proof: number` (index into `receipts`) per entry: AI → the RFP receipt, Product → Ordani,
  Positioning → the birth worker. Every receipt string stays in the array untouched so
  `SERVICES_LD` still carries them.

## 7. Battery: `.planning/exec/gates111b.sh` from `gates112.sh`

Same guard, `MSYS_NO_PATHCONV=1`, `Q=.planning/qa/pass-111b`, every exit code read
directly. Order: tsc · copy-lint · vendor · retired self-test · retired gate · accent
self-test + lint · gsap self-test + gate · a colour grep over every NEW selector
(`.cw-pband`, `.cw-pick`, `.cw-areas`, `.cw-area` and their children: expect no hex, no
`--color-cw-`, no `--cw-accent`, no `opacity`) · prettier on every touched file · build
(`npx next build --webpack`, `$Q/build.log`) · server on 3200 · then:

```
echo "=== served checks ==="
S=http://localhost:3200
echo "  $5K on /services (expect 1): $(curl -s $S/services | grep -o '\$5K' | wc -l)"
echo "  'From' spans on /services (expect 1): $(curl -s $S/services | grep -o 'cw-pbox__from' | wc -l)"
echo "  Scoped at figure size (expect 0): $(curl -s $S/services | grep -o 'cw-pbox__fig">Scoped' | wc -l)"
echo "  standing rate (expect 0): $(curl -s $S/services | grep -ci 'standing rate')"
echo "  Frontier anywhere (expect 0 0 0): $(curl -s $S/services | grep -c Frontier) $(curl -s $S/ | grep -c Frontier) $(curl -s $S/llms.txt | grep -c Frontier)"
echo "  AI engineering on /services (expect >=3): $(curl -s $S/services | grep -o 'AI engineering' | wc -l)"
echo "  cw-pbox on /services (expect 7): $(curl -s $S/services | grep -o 'class=\"cw-pbox ' | wc -l)"
echo "  pick options (expect 3): $(curl -s $S/services | grep -o 'name=\"pkg-area\"' | wc -l)"
echo "  Ask about links (expect 4): $(curl -s $S/services | grep -o 'href=\"/call?shape=' | wc -l)"
echo "  tables left on /services (expect 0): $(curl -s $S/services | grep -c '<table')"
echo "  /packages \$5K (expect 0): $(curl -s $S/packages | grep -c '\$5K')"
echo "  /call?shape=advisory prefill (expect 1): $(curl -s '$S/call?shape=advisory' | grep -c 'Shape: Advisory.')"
echo "  /call?shape=bogus prefill (expect 0): $(curl -s '$S/call?shape=bogus' | grep -c 'Shape:')"
echo "  book mentions on /services (expect 0): $(curl -s $S/services | grep -ciE '80% wall|/playbook|field manual')"
```

Then render-gate; axe-worlds on `/ /services /packages`; layout-gate (default routes plus
`/services` is already in them); `shots111b.mjs` (copy `shots112.mjs`) with PLAN:

```
["/services", "sv-open", null, ["1440", "390"]],
["/services", "sv-shapes", ".cw-pband--shapes", ["1440", "1280", "1024", "768", "390"]],
["/services", "sv-incl", ".cw-pband__incl", ["1440", "390"]],
["/services", "sv-areas", ".cw-areas", ["1440", "768", "390"]],
["/services", "sv-pick", ".cw-pick", ["1440", "768", "390"]],
["/services", "sv-pkgs", ".cw-pband--pkgs", ["1440", "1024", "768", "390"]],
["/packages", "pk-cross", ".cw-pkg-page__cross", ["1440"]],
["/call?shape=embedded", "call-prefill", "textarea", ["1440"]],
```

Plus two scripted states on `/services` at 1440 and 390: (a) click "Buy the Audit" with no
pick, settle 300ms, capture `sv-guard-{w}` (the error text visible, focus on the first
radio); (b) click the "Product building" radio, settle 300ms, capture `sv-picked-{w}` and
assert the polite region reads `Packages now show Product building.` and the Audit fit
reads the `build` sentence. Record each shape box's height at 1440 in `shots.json`; every
box must be at most 700px (CRITIQUE H1).

Also, headless: `node -e` or a small script that calls `createPackageCheckout` is NOT
possible without a Stripe key; instead unit-check the pure helpers: `isAreaValue("build")`
true, `isAreaValue("Build")` false, `areaLabel("production")` = `AI engineering`,
`areaLabel(null)` = null. Print the four results.

## 8. Expected results

| Check | Expected |
|---|---|
| tsc, copy-lint, vendor, retired self-test + gate, accent ×2, gsap ×2, prettier | exit 0 each; retired prints `clean` |
| colour grep over new selectors | 0 findings |
| build | exit 0 |
| served checks | every line matches its `(expect …)` |
| render-gate, axe-worlds, layout-gate | exit 0, nothing outside KNOWN |
| shots | 23 PNGs + `shots.json`; all seven box heights at 1440 ≤ 700 |
| helper checks | `true false AI engineering null` |

## 9. Commit

Two commits, explicit paths, `-F` with an absolute message file, `--` pathspec:
1. `Pass-111b: /services as boxes, the area on the rail, "AI engineering" (operator 2026-09-11)`
   with the touched files, `gates111b.sh`, `shots111b.mjs`, the GLM log and `.planning/qa/pass-111b/`.
2. `.claude/RESUME.md` alone (≤2500 bytes, `wc -c` printed).
Do not push.

## 10. Rejected

- "Scoped" as the figure in three boxes (CRITIQUE H2): the live term leads instead.
- A popularity tag on Embedded: the word is on the banned list and is a claim with no ledger; `lead` styling carries the emphasis.
- Prefilling the Audit dropdown with `default_value`: the page pick is authoritative; a prefilled second question invites a different answer. The dropdown exists only where no picker does.
- Removing the espresso foot's `.cw-cta` for `.cw-buy` (CRITIQUE M6): that makes three filled pills; the foot stays as it is.
- `/packages` adopting `PackageBand` and the home box switching to `/services#packages` (CRITIQUE H4): deferred to its own pass now that every Buy path captures the area through the rail; only the two copy fixes in §2.8 land here.
- The A4 notice line and the S3 remedy line: not approved; not written.
- Any `80% Wall` line, and the band's second footer line: the book is off the site (Pass-112).
- Case-study copy (decision 5) and the count-up exception (decision 4): separate passes.
- A section kicker on `#packages` and index numerals on boxes or areas (CRITIQUE H6).
- Running an Astra look before the battery passes: Astra sees the finished captures once.

## 11. Return conditions (judge, ≤5 calls)

`sv-shapes-1440`, `sv-shapes-390`, `sv-pkgs-1440`, `sv-picked-1440`, `sv-guard-390`, the
served-check block, the box heights, and `git diff --stat`. Any expected-result miss stops
the pass before commit. After the judge passes: ONE Astra review (`codex-exec.ps1 -Review
-Model gpt-6-astra -Effort ultra`) with `sv-shapes-1440`, `sv-pkgs-1440`, `sv-areas-1440`,
`sv-shapes-390` attached and the question "does this page sell four shapes and three
packages as a buyer reads it, and where does it fail the DESIGN_BAR" — its findings go to a
fix-list here, not to a second execution pass on Astra.

## 12. Parked (operator)

A4 notice terms · S3 Sprint remedy · update the LIVE Stripe Audit product description to the
three area names (the setup script skips existing prices) · push · merge to `main`.
