# Pass-111/112 design direction: pricing boxes, /services consolidation, receipts, Ordani

Nothing in the repo was edited. This direction assumes Pass-110 (GLM, in flight) lands and is committed first. That pass rewrites `app/globals.css`, `components/color-worlds/Hero.tsx`, the /services proof card, the "load-bearing" strings and `lib/banned.ts`. Its edits are already shifting line numbers in `globals.css`, so every instruction below names selectors and never line numbers.

## 0. Premises checked this session (corrections to the research legs)

1. **`components/color-worlds/OrdaniSticky.tsx` is not mounted anywhere.** A grep of the tree finds it only in its own file and in planning docs. It is not a live pin. It is dead code that imports `gsap` outside `TitleCard.tsx`, which breaks the quarantine rule. The fix is to delete it. There is no pin to retire and nothing to override.
2. **`components/hand/HandCircle.tsx` is also not mounted.** It appears only in its own file and in CSS or PullQuote comments. The circled $20M is not live today, so bringing it back is a new motion exception. It is not a legacy one.
3. **The Audit checkout already asks for the area.** `app/actions/package-checkout.ts` adds a Stripe custom field, "Audit flavor", as a dropdown fed by `AUDIT_FLAVORS = ["Build","Production","Traction"]` in `lib/catalog.ts`. Stripe makes custom fields required by default. The Unstick Session and the Sprint have no such field.
4. **The operator liked a component called RevenueTick.** It was deleted in `83bcdb2` on 2026-08-30. It counted "$0.0M" up to "$20M+" over 2400ms with an ease-out cubic curve, started on an IntersectionObserver at threshold 0.4, and drew `HandCircle` with `color="currentColor"` and `delay={0.4}`. The spec in §5 keeps the gesture and fixes its flaws: it set React state on every frame, the layout shifted as the digits changed, and a fast flick past the figure meant the count never ran.
5. **Three leg claims failed my own fetch and are dropped:**
   - Mercury's homepage shows illustrated mockups. It does not bleed a dashboard off the edge.
   - Raycast Pro writes features as fragments, uses 16px icons and shows a struck-through annual price. It is a negative example, not a model.
   - The W3C APG radio page gives an ARIA pattern and says nothing about fieldset or legend. I cite it for the keyboard model only.

---

## 1. The pricing box: `PriceBox`

This is one component, `components/color-worlds/PriceBox.tsx`. It is a presentational server component and can be imported by client components. It is used for the four engagement shapes, the three packages and the home Audit.

### 1.1 Anatomy, top to bottom (DOM order is fixed)

```
article.cw-pbox[.cw-pbox--lead]        container-type: inline-size; aria-labelledby → name id
  div.cw-pbox__in                      flex column (narrow) | 2-col grid (wide, §1.8)
    p.cw-pbox__label                   span.cw-pbox__idx "02"  +  span.cw-pbox__tag "Start here" (lead only)
    h3.cw-pbox__name                   "The Audit"
    p.cw-pbox__price                   [span.cw-pbox__from "From"] span.cw-pbox__fig "$2,500" [span.cw-pbox__per "a month"]
    p.cw-pbox__term                    "Two weeks · starts within the week"   (data)
    p.cw-pbox__fit                     one sentence: who it is for / when it fits
    p.cw-pbox__sub                     "What you get"
    ul.cw-pbox__list > li              inclusion lines
    p.cw-pbox__area                    the one-area / all-areas row
    div.cw-pbox__act                   the CTA
    p.cw-pbox__fine                    optional, home box only
```

Props:

```ts
{ id: string; idx: string; tag?: string; lead?: boolean; name: string;
  price: { from?: string; fig: string; per?: string }; term?: string; fit: ReactNode;
  list: string[]; area: ReactNode; cta: ReactNode; fine?: string; as?: "h2" | "h3" }
```

In JSX the price spans must have `{" "}` between them, so a screen reader hears "From $5K a month" and "Scoped on the call" as one phrase.

### 1.2 Type scale (three faces, no opacity anywhere)

| Element | Face | Size | Weight / lh / tracking |
|---|---|---|---|
| `__label` (idx, tag) | JetBrains Mono | 12px uppercase | 500 / 1.2 / 0.16em |
| `__name` | Bricolage Grotesque | `clamp(26px, 2.3vw, 34px)` uppercase | 800 / 0.98 / -0.015em |
| `__fig` | Bricolage | `clamp(44px, 3.9vw, 56px)`, `font-variant-numeric: tabular-nums` | 800 / 0.95 / -0.025em |
| `__from`, `__per` | Hanken Grotesk | 16px | 500 / 1.3 |
| `__term` | JetBrains Mono (data) | 12px uppercase | 500 / 1.5 / 0.12em |
| `__fit` | Hanken | 19px fixed (keeps a gap of more than 15% to the 16px list) | 400 / 1.45, max 34ch |
| `__sub` | JetBrains Mono | 12px uppercase | 500 / 0.16em |
| `__list li` | Hanken | 16px | 400 / 1.5 |
| `__area` | Hanken | 16px; the area name in 700 | 600 / 1.45 |
| CTA | `.cw-buy` (Bricolage 700) | in-box override 15px, padding 13px 16px, `width:100%`, `justify-content:center` | existing |
| `__fine` | Hanken | 16px (R3 floor) | 400 / 1.5 |

### 1.3 Spacing, radius and borders

- **Box:** padding `clamp(24px, 2.2vw, 36px)`, radius **12px**, flat on the world. It has no shadow, no fill, no hover lift and no scale.
- **Vertical gaps:**
  - label to name 16px; name to price 20px; price to term 12px; term to fit 18px.
  - The `__sub` row has `margin-top: 26px; padding-top: 22px` and a top hairline.
  - sub to list 12px.
  - Each `li` has `padding: 12px 0` and a bottom hairline, except the last.
  - The `__area` row has `margin-top: 20px; padding-top: 16px` and a top hairline.
  - The act row has `margin-top: auto` (with a minimum of 26px), which pins the CTAs to one baseline across a row.
  - act to fine 14px.
- **Box border:** `1px solid color-mix(in srgb, currentColor 32%, transparent)`.
- **Lead box border:** `2px solid currentColor`. Its `__in` padding is reduced by 1px so the content does not shift.
- **Inside hairlines:** `1px solid color-mix(in srgb, currentColor 22%, transparent)`, the ledger's own convention.

### 1.4 Weighting the recommended box (R6)

There is exactly one lead box per group: Embedded among the shapes ("Recommended") and the Audit among the packages ("Start here"). Four things weight it:

1. A wider column: `1.3fr` against `1fr`.
2. A 2px full-strength frame.
3. The tag, set as a plain mono label preceded by the site's own kicker bar (`::before`, 38px × 1.5px, `currentColor`). This replaces the fixed terracotta sticker `.cw-sv-table__tag`.
4. The only filled `.cw-buy` in the group. The siblings get `.cw-buy--quiet`.

Nothing else changes: no tint, no ribbon, no lift. This follows Notion, which marks "Recommended" as plain text on Business, and Clay, which puts "Recommended" above the plan name. Both were fetched.

### 1.5 Inclusion lines

Each `li` is a flex row with a 12px gap. The marker is `li::before { content:""; flex: 0 0 12px; height: 2px; margin-top: 0.72em; background: currentColor }`, a short rule that belongs to the same family as the site's kicker bar. There are no numerals, no glyphs and no icon kit. Lines are complete sentences in the first person. Linear, Notion, Stripe and Clay (all fetched) keep plain text inside cards. Clay reserves checkmarks for the comparison matrix.

### 1.6 A number versus "Scoped on the call"

The price has two lines. The first line is always `__fig` at the identical size and weight. This follows Linear (Enterprise shows "Custom" in the price slot) and Vercel (Enterprise shows "Custom"), both fetched.

- **Advisory:** line 1 is `From` (the `__from` span, baseline-aligned) followed by `$5K`. Line 2 is `a month`.
- **Scoped shapes:** line 1 is `Scoped`. Line 2 is `on the call`. The operator-locked words are kept exactly; they are only split across two lines.
- **Packages:** line 1 is `$500`, `$2,500` or `$7,500`. There is no line 2. The cadence lives in `__term`.

The unpriced line is never smaller and never lighter.

### 1.7 CTA

- **Engagement boxes:** an `<a class="cw-buy cw-buy--quiet">` pointing to `/call?shape=<slug>`. Embedded uses the filled `.cw-buy`. Each label names its shape (§3), so four identical buttons never repeat.
- **Package boxes:** `BuyButton` with the Audit filled and the other two quiet, the existing Pass-109 rule.
- **Pending state:** use `aria-busy` plus the "Opening checkout" label that already exists. Never `disabled` with opacity. A disabled state would need opacity on text, which the colour rule bans.

### 1.8 Responsive behaviour

- **Width on /services.** `main.cw-services.cw-sv` is capped at 1200px, which leaves a 1120px measure at 1440. That is too narrow for four boxes. Scope the change to `/services` with `[data-mode="cw"] .cw-sv { max-width: 1440px; }`. The page then shares the home's and the nav's 40px gutters. Prose blocks keep their own caps: `.cw-sv-sec` at 760px, the objections at 62ch, the foot at 760px. Do not use `100vw` breakout math, because `100vw` includes the Windows scrollbar and causes horizontal overflow.
- **Shapes band (`.cw-pband--shapes`):**
  - At 1360px and wider: `repeat(3, minmax(0,1fr)) minmax(0,1.3fr)`. At 1440 the columns come out about 305, 305, 305 and 397px.
  - From 768 to 1359px: `repeat(2, minmax(0,1fr))`, a 2×2 grid.
  - Below 768px: one column.
  - The gap is 16px throughout. The 4-column breakpoint sits at 1360 because below it "Ask about a retainer →" no longer fits in the box's inner width.
- **Packages band (`.cw-pband--pkgs`):**
  - At 1200px and wider: `minmax(0,1fr) minmax(0,1.3fr) minmax(0,1fr)`, with `.cw-pbox__name { min-height: 1.96em }` so "The Unstick Session" can wrap to two lines without knocking the price row out of line.
  - Below 1200px: one column.
- **Wide variant.** It is chosen by the box's own width, `@container (min-width: 640px)` on `.cw-pbox__in`:
  - `grid-template-columns: minmax(0,5fr) minmax(0,6fr); column-gap: 40px`
  - rows `auto auto auto auto 1fr auto auto`
  - areas `"label sub" "name list" "price list" "term list" "fit list" "act area" "fine fine"`
  - The fit sentence is `align-self: start`.
  - This triggers for packages at 768 to 1199px (688px boxes) and for the home box at 768 to 1023px. DOM order never changes. The CTA is the only focusable element, so focus order holds.
- **390.** Boxes are full width (350px), use the narrow flex anatomy, keep a full-width CTA and sit 16px apart.
- **768.** Shapes run 2×2 at 336px each, narrow. Packages stack in the wide variant.

### 1.9 Where every colour comes from

| Selector | Property | Value | Source |
|---|---|---|---|
| `.cw-pbox` and all descendants' text | color | inherit (declare nothing) | `--cw-fg` via the root |
| `.cw-pbox` | background | transparent | `--cw-bg` shows through |
| `.cw-pbox` | border | `1px solid color-mix(in srgb, currentColor 32%, transparent)` | currentColor mix |
| `.cw-pbox--lead` | border | `2px solid currentColor` | currentColor |
| `__label .cw-pbox__tag::before` | background | currentColor | currentColor |
| `__sub`, `__area` | border-top | `1px solid color-mix(in srgb, currentColor 22%, transparent)` | mix |
| `__list li` | border-bottom | same 22% mix | mix |
| `__list li::before` | background | currentColor | currentColor |
| `.cw-buy` | background / color / border | `var(--cw-fg)` / `var(--cw-bg)` / `2px solid var(--cw-fg)` | world pair (existing) |
| `.cw-buy--quiet` | background / color, hover | transparent / `var(--cw-fg)`; hover `var(--cw-fg)` / `var(--cw-bg)` | world pair (existing) |
| `.cw-buy:focus-visible` | outline | `2px solid var(--cw-fg)` | existing |
| `.cw-pkg__cta-error` (BuyButton error) | color | inherit; remove any accent or opacity it carries | `--cw-fg` |

Banned inside these blocks, and grep-gated: any hex, any `--color-cw-*` token, `--cw-accent` in any state, and `opacity` on any text.

### 1.10 Motion

- **/services:** none. The file header says "Zero animation on this page beyond the site's palette shift", and that holds.
- **Home box:** the existing `.cw-reveal` only.

---

## 2. /services information architecture

The areas become the shared vocabulary between the two offers. They sit between the shapes and the packages, and the packages picker uses the same three names.

1. **Opening (bone, `#engagements`).** Keep the kicker "For companies", the H2 "Engagements", the sell line "Strategy and software from the same person, so nothing is lost in the hand-off. Pick the problem; I name the shape on the call." and the Guardicore proof card in Pass-110's wording.
   - **Delete** `.cw-sv-open__price` "From $5K a month". This is the root of the standing-rate confusion. It reads as the price of every engagement, and then three shapes say "Scoped". The figure now appears once, at 56px, in the Advisory box, which sits within about one screen at 1440.
   - **Delete** the "Three areas of work, inside Engagements…" lead line.
2. **Four shapes (`#shapes`).**
   - Kicker: "How engagements work".
   - H2 (`.cw-service__title`): "Four shapes. Scope and price in writing."
   - Intro (live, kept verbatim): "You bring the problem. I choose the shape with you on the call, and put the scope and price in writing before anything starts."
   - Then the shapes band.
   - Delete the `<table>`, the "Not sure which shape?" foot (the boxes carry the CTAs) and the playbook bridge, which moves to §2.4.
3. **Three areas (`#areas`, new, replaces `.cw-sv-svc-group` and its three chapters).**
   - Kicker: "What the work covers".
   - H2: "Three areas of work."
   - Intro: "Any engagement shape covers one area, two, or all three. A package covers one."
   - Three unboxed columns, `minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr)`. The lead column is Demo to production, the H1's own offer. The row has a full-strength top rule, and the columns are divided by 22% hairlines.
   - Each column holds, in order: a mono numeral; the name (Bricolage 800 uppercase, `clamp(22px,2vw,30px)`); the pain line (Hanken 17px); three outcomes (16px, the §1.5 marker); then "Proof" in mono, one receipt (Hanken 600 16px) and its link.
   - Order: 01 Demo to production, 02 Product building, 03 Positioning & GTM.
   - At 768px and below the columns stack.
   - This shortens the page by about 1,300px at 1440, because one receipt per area replaces two to four.
4. **Packages (`#packages`).**
   - Kicker: "Or start smaller".
   - H2: "Three fixed prices. One area each."
   - Intro: "No scoping call, no proposal. Buy one and the work starts within the week. An engagement can cover all three areas; a package covers one."
   - Then the picker, the band and the footer row (copy in §3).
5. **Why one person.** Keep it verbatim. **Delete the whole "On the price" paragraph**, including "standing rate". Its facts now live in the boxes.
6. **Espresso foot.** Unchanged, except the CTA class moves from `.cw-cta` to `.cw-buy`. That makes one pill system on the page and removes an accent fill.

### 2.1 The package area picker

- **Component.** `components/color-worlds/PackageBand.tsx` (`"use client"`). It owns the state and renders the picker, the three `PriceBox`es and the footer row. `app/(foyer)/services/page.tsx` stays a server component, and `PACKAGES_LD` and `SERVICES_LD` do not change.
- **Markup.** Native semantics:

```html
<fieldset class="cw-pick">
  <legend class="cw-pick__legend">Pick the area first. A package covers one.</legend>
  <div class="cw-pick__opts">
    <label class="cw-pick__opt"><input type="radio" name="pkg-area" value="production"><span>Demo to production</span></label>
    <label class="cw-pick__opt"><input type="radio" name="pkg-area" value="build"><span>Product building</span></label>
    <label class="cw-pick__opt"><input type="radio" name="pkg-area" value="traction"><span>Positioning &amp; GTM</span></label>
  </div>
  <p class="cw-pick__err" role="alert" hidden>Pick an area first, then buy. A package covers one.</p>
  <p class="cw-sr-only" aria-live="polite"></p>
</fieldset>
```

  The values are the lowercase `AUDIT_FLAVORS` values on purpose, so any later Stripe wiring maps one to one. Native radios give the APG keyboard model (fetched): Tab enters the group on the checked option, or on the first if none is checked; the arrow keys move and check; Space checks; Shift+Tab leaves.
- **Styling.**
  - The segmented control reads as a selector, not a CTA: radius 12px, not a 999px pill.
  - `.cw-pick__opts`: `display: grid`. From 640px up, `grid-auto-flow: column` with three equal segments. Below 640px, rows. Border `1.5px solid currentColor`, `overflow: hidden`.
  - Segments: min-height 52px, padding 14px 18px, Hanken 600 16px.
  - Dividers: `1px solid color-mix(in srgb, currentColor 32%, transparent)`, inline when in columns and block when stacked.
  - Input: visually hidden with the clip pattern and still focusable. Never `display: none`.
  - Checked: `.cw-pick__opt:has(input:checked) { background: var(--cw-fg); color: var(--cw-bg); font-weight: 700 }`.
  - Hover on an unchecked segment: `box-shadow: inset 0 0 0 1px currentColor`. It never changes colour.
  - Focus: `.cw-pick__opts:has(:focus-visible) { outline: 2px solid var(--cw-fg); outline-offset: 4px }`, plus `text-decoration: underline 2px` and `text-underline-offset: 4px` on the focused option's span. The underline shows in the checked state too.
  - Error text: inherit, weight 700.
- **Default state.** Nothing is selected, because the operator said "people have to pick which one on the page". On mount, if `?area=` holds a valid value, preselect it. On every change, call `history.replaceState(null, "", "?area=<v>#packages")`.
- **What changes on pick.** The swap is instant with no transition. The polite region announces "Packages now show {Area}."
  1. Every box's `__area` row changes from "Covers one area. Pick it above." to "Covers: **{Area}**."
  2. The Audit fit sentence swaps (copy in §3).
  3. The Sprint fit sentence swaps (copy in §3).
  4. Unstick when `traction` is picked, until NC-U1 is approved: the area row reads "Built for a stuck build. For positioning, start with the Audit." Its CTA becomes `<a href="#pkg-audit" class="cw-buy cw-buy--quiet">See the Audit</a>`, so there is no button that refuses to work.
- **Buy with no pick.** `BuyButton` gains an optional `guard?: () => boolean`, which `go()` checks before calling the server action. With no pick, the guard un-hides `.cw-pick__err`, calls `focus()` on the first radio (which scrolls it into view natively, with no Lenis call) and returns false. The server action is not called. Never use a modal (R17).
- **What checkout does today** (reported, not changed):
  1. `BuyButton` calls `createPackageCheckout(skuKey)`, which opens Stripe hosted Checkout.
  2. `audit-2500` adds a required "Audit flavor" dropdown (Build, Production, Traction). The other two SKUs add nothing.
  3. Success goes to `/services/thanks` and cancel goes to `/packages`.
  4. The webhook sends the kickoff email with the SKU's intake questions.
  5. The picked area is not sent anywhere. The footer row says so honestly (§3), and wiring it through is NC-X2.
  6. `app/actions/` must show zero diff in this pass.

---

## 3. Box copy: final, first person, facts only

Provenance tags: **[F]** means the brief's fact list. **[L file]** means live site copy, kept verbatim or trimmed. Anything else is a NEW COMMITMENT (the list at the end of this section). There are no em-dashes anywhere.

### 3.1 Engagement shapes

Every fact the ledger gives applies to all four shapes, so the ship-now lists are **identical by design** and in the same order. The NEW COMMITMENTS list below the packages supplies the lines that would tell the shapes apart. Recommendation: approve at least two per shape before the band ships.

**Common list** (in all four boxes, under "What you get"):

1. "Week one is a scoping session and the audit, so the work starts on the right problem." [L LESSONS #3 WEEK ONE; /services "Why one person"]
2. "Something named ships in month one." [L /services]
3. "The scope and the price in writing before anything starts. No discovery fee." [L /services "On the price"]
4. "You get me directly: strategy and software from the same person, with no hand-off." [L home doors; /services opening]
5. "A reply within one business day." [F]

Every engagement box has the area row "Covers one area, two, or all three." [F]

| | Advisory | Project | Retainer | Embedded |
|---|---|---|---|---|
| label | `01` | `02` | `03` | `04` · tag "Recommended" |
| price | From **$5K** / a month [F] | **Scoped** / on the call [F] | **Scoped** / on the call [F] | **Scoped** / on the call [F] |
| term | 4-6 hours a month, ongoing [L SHAPES] | 6-20 weeks [L] | 6 months, then month to month [L] | 3-8 months, 3+ days a week [L] |
| fit | "You want a second operator in the room for the big decisions." [L trimmed] | "One defined outcome with a start, an end, and a named deliverable." [L] | "I stay on after the project ships: the launch, the first customers, and what they break." [L] | "I act as your head of GTM, product, or AI engineering for the window." [L] |
| CTA | quiet "Ask about Advisory" → `/call?shape=advisory` | quiet "Ask about a project" → `?shape=project` | quiet "Ask about a retainer" → `?shape=retainer` | **filled** "Ask about Embedded" → `?shape=embedded` |

The Advisory box is now the only place the page states a monthly rate. It carries no "standing rate" wording. The three scoped boxes' line 3 ("in writing… No discovery fee") answers "when do I get the number" where the eye already is. This follows Pilot's "Best for" line (fetched), which sits below the name and price and above the features, and Stripe's Custom tier (fetched), which is sold on named items rather than left as a blank.

### 3.2 Packages

| | The Unstick Session | The Audit | The Sprint |
|---|---|---|---|
| label | `01` | `02` · tag "Start here" | `03` |
| price | **$500** [F] | **$2,500** [F] | **$7,500** [F] |
| term | 90 minutes · same-day plan [F] | Two weeks · starts within the week [F] | One week · embedded [F] |
| fit (no pick) | "Ninety minutes live on your stuck build. You leave with a written plan the same day." [L /packages] | "I go through your build, your production, or your positioning top to bottom." [L home] | "One week on one outcome, shipped. Not a plan. The thing, done." [L /packages] |
| fit: Demo to production | same | "I go through your security and deploy top to bottom." [L /packages flavor def.] | "One week on the production push, shipped. Not a plan. The thing, done." [L] |
| fit: Product building | same | "I go through your architecture and code top to bottom." [L] | "One week on the AI feature, shipped. Not a plan. The thing, done." [L] |
| fit: Positioning & GTM | (fallback row, §2.1) | "I go through your positioning and go-to-market top to bottom." [L] | "One week on the repositioning, shipped. Not a plan. The thing, done." [L] |
| CTA | quiet `BuyButton` "Buy the Unstick Session" | **filled** `BuyButton` "Buy the Audit" | quiet `BuyButton` "Buy the Sprint" |

**Unstick, what you get:**

1. "A 90-minute working call on your stuck AI-assisted build." [F]
2. "A written fix plan the same day: what is wrong, in the order to fix it." [F]
3. "The prompts to fix it with." [F]
4. "I work in your tools and your repo." [F]
5. "The 80% Wall, my field manual, with its companion files, in your kickoff email." [L /packages fine print, operator-locked "book included with all three"]

**Audit, what you get:**

1. "An 8-10 page memo: what works, what is broken, and what to fix first." [F + Pass-110 wording]
2. "A prioritized fix sequence, so you can start the morning it lands." [L home]
3. "A one-hour debrief call where I walk you through it." [F]
4. "A kickoff email the moment you buy: intake questions, a link to book the debrief, and The 80% Wall attached." [F]
5. "You keep the memo either way." [F]

**Sprint, what you get:**

1. "One outcome, agreed by email before day one." [F]
2. "One week embedded on that outcome." [F]
3. "Daily progress notes." [F]
4. "A debrief and a map of the next steps." [F]
5. "The 80% Wall, with its companion files, in your kickoff email." [L]

**Band footer row.** It is one ruled row under the band, not a box.

- Line 1: "Every fee credits toward the next package, or toward an engagement started within 60 days. Full refund any time before kickoff, none after. I reply within one business day. You confirm the area again at checkout or in your kickoff intake." Then `.cw-mlink` "Full details on the packages page →" to `/packages`. [F; L /packages]
- Line 2: "Pre-production and working solo? The playbook covers most of what Advisory does, for under $150." "playbook" links to `/playbook`. [L /services]

### 3.3 NEW COMMITMENTS: each needs operator APPROVE or DECLINE; none is written in as true

| # | Box | Proposed line (would slot into that box's list) |
|---|---|---|
| NC-A1 | Advisory | "Two working sessions a month, booked when you need them." |
| NC-A2 | Advisory | "Send me a decision between sessions and get my read within one business day." (the reply time is [F]; the async channel is new) |
| NC-A3 | Advisory | "A short written note after each session: what we decided and what happens next." |
| NC-A4 | Advisory | Notice terms (for example "Cancel with 30 days' notice"). The site only says "ongoing". |
| NC-P1 | Project | "A fixed price for the agreed scope." (the site says "in writing", not "fixed") |
| NC-P2 | Project | "A written progress note every week." |
| NC-P3 | Project | "A handover at the end: documentation and a walkthrough, so your team runs it without me." |
| NC-R1 | Retainer | "Same-day response on anything that breaks in production." |
| NC-R2 | Retainer | "A monthly written review of what shipped and what is next." |
| NC-E1 | Embedded | "In your standups and leadership meetings as part of the team." |
| NC-E2 | Embedded | "A roadmap I own and report on to the CEO." |
| NC-E3 | Embedded | "Before I leave: help hiring the permanent head of the function, and a handover plan." |
| NC-ALL1 | all shapes | The 80% Wall included with every engagement (today it comes with packages only). |
| NC-ALL2 | scoped shapes | A price floor or range for Project, Retainer and Embedded. The Pass-70 note says only the operator can set one. |
| NC-ALL3 | metadata, /packages | "From $5K a month" as the floor for every shape. The /services metadata and the /packages cross-link imply it; the page no longer does. |
| NC-U1 | Unstick | It covers Positioning & GTM too. Today it is defined as a stuck AI-assisted build, which is why the fallback row exists. |
| NC-U2 | Unstick | "The call is recorded and the recording comes with the plan." |
| NC-U3 | Unstick | "One follow-up question by email within 7 days." |
| NC-AU1 | Audit | "A 30-day follow-up call after the memo." |
| NC-S1 | Sprint | "A mid-week check-in call." |
| NC-S2 | Sprint | "The work lands in your repo and tools, with a handover note." |
| NC-S3 | Sprint | What happens if the outcome does not ship in the week. The site says "shipped"; decide whether there is a remedy. |
| NC-X1 | Ordani | One or two real Ordani screenshots with demo data and no PII. Nothing suitable exists in this repo or in `ordani-ui-overhaul/public` (placeholders only). |
| NC-X2 | payment rail | Carry the picked area into Stripe `metadata` and the kickoff email, and relabel or retire the duplicate Audit dropdown. This is a new arc (payment rail) and operator-gated. |
| NC-X3 | booking | `/call?shape=` pre-fills BookCallForm's note with "Shape: Advisory." The form has no shape field today (fields: name, email, date, time, note). |
| NC-N1 | naming | The §7 rename, plus trimming "End-to-end product building" to "Product building" so the three names fit the picker. |

---

## 4. Home: the Audit section rebuilt as one box

`#offer` stays terracotta and keeps its `cw-block` padding.

- **Grid.** At 1024px and wider: `minmax(0,7fr) minmax(0,5fr)` with column-gap `clamp(56px,6vw,120px)` and `align-items: center`. The left column is copy and the right column is the box, which is about 530px at 1440 and uses the narrow anatomy. Below 1024px it stacks: headline, then the box. From 768 to 1023px the box is 688px wide and uses the wide variant.
- **Left column.** `SplitReveal as="h2" className="cw-secttitle"`: **"Two weeks to know what to fix first."** [F: two weeks; prioritized fix sequence]. Below it, `.cw-mlink` "See all three packages →" to `/services#packages`. Delete the "Start here" kicker, because the box's tag carries it now.
- **Right column.** `<PriceBox>` with the /services Audit copy (§3.2, no-pick fit), with these differences:
  - `__area`: "Covers one area. You choose it at checkout." This is true today, because Stripe's flavor field asks.
  - CTA: filled `BuyButton skuKey="audit-2500"` "Buy the Audit". It goes straight to checkout.
  - `__fine`: "Your fee credits toward the next package, or an engagement started within 60 days. Full refund any time before kickoff."
  - `as="h3"`, wrapped in `.cw-reveal`.
- **Delete** `.cw-offer-stats`, the `.cw-deliver` rows and `.cw-offer-next` from this section. Keep their CSS until a grep proves nothing else uses them.
- **Colour** on terracotta: the filled pill is a bone fill with a terracotta label at 5.27:1, and the borders are currentColor mixes.

---

## 5. Receipts

This replaces everything after `</ol>` in `#products`.

- **Delete:**
  - the "The record" kicker
  - the dek "Every line below is real. Ask about any of them."
  - the `.cw-lrow--tot` Consulting row
  - ExitRecord's year, note, rule and two-row `<dl>` ("Disclosed total", "Stated on this site…, the conservative floor")
- **Keep:** `<h3 id="cw-products-title" class="cw-secttitle cw-secttitle--sub">The receipts.</h3>` with `margin-top: 112px`.

### 5.1 The hero figure (`components/color-worlds/RevenueFigure.tsx`, `"use client"`)

```html
<div class="cw-rec">
  <p class="cw-rec__num">
    <span class="cw-sr-only">More than 20 million dollars</span>
    <span class="cw-rec__wrap" aria-hidden="true">
      <span class="cw-rec__ghost">$20M+</span>
      <span class="cw-rec__tick">$20M+</span>
      <HandCircle variant={1} color="currentColor" play={play} instant={instant} delay={0.6} />
    </span>
  </p>
  <p class="cw-rec__lbl">In client revenue since 2013</p>
</div>
```

**CSS:**

- `.cw-rec__num`: Bricolage 800, `clamp(88px, 17vw, 240px)`, line-height 0.88, letter-spacing -0.035em, tabular-nums, `margin: 40px 0 0`, color inherit.
- `.cw-rec__wrap`: `position: relative; display: inline-grid`.
- `.cw-rec__ghost`: `grid-area: 1/1; visibility: hidden`.
- `.cw-rec__tick`: `grid-area: 1/1; justify-self: start; white-space: nowrap`.
- The cell is sized by the final string and the counting text is always narrower, so the layout never shifts (CLS 0).
- `.cw-rec__lbl`: JetBrains Mono 13px uppercase, 0.16em, `margin-top: 18px`.
- The circle's stroke is `currentColor`, which is bone on espresso at 12.59:1. It is decorative and hidden from screen readers. The opacity on its paths applies to a stroke, not to text.

**Count-up spec.** This runs once and is an operator-requested exception; §8 has the conflict.

- **SSR / no-JS / reduced motion:** the text is "$20M+" and the circle is fully drawn. Its paths render whole until JS sets the dash values.
- **On mount:**
  - If reduced motion is set, set `instant=true` and stop.
  - If the figure's `getBoundingClientRect().top < innerHeight` (in view or above it), set `instant=true` and do not count. That covers a refresh or a deep link.
  - Otherwise the state is "waiting".
- **Arm observer** (`rootMargin: "0px 0px 100% 0px"`, threshold 0): if the entry is intersecting, its `boundingClientRect.top >= innerHeight` (still below the fold) and the state is "waiting", write `tick.textContent = "$0M"`, keep `play=false` (the circle is hidden) and set the state to "armed". If the entry is not intersecting, its `boundingClientRect.bottom < 0` (flicked past upward) and the state is "armed", write "$20M+", set `instant=true` and set the state to "done".
- **Play observer** (threshold 0.5): if the entry is intersecting and the state is "armed", start the rAF count and set `play=true`.
- **Count:**
  - Duration 1200ms.
  - `eased = 1 - (1 - t)^3`, the original RevenueTick curve.
  - Text during the count: `` `$${Math.round(eased*20)}M` ``. At t=1 it becomes "$20M+".
  - Write `textContent` through a ref. Never set React state per frame.
  - The circle starts at 0.6s. Its existing primary stroke is 1100ms (0.6s to 1.7s) and its overshoot runs from 1.55s to 2.65s. The mark closes on a number that has already settled.
- **Unmount:** cancel the rAF and disconnect both observers.
- **`HandCircle` change** (backward compatible): add `play?: boolean` and `instant?: boolean`. When `play` is undefined, the current internal observer path runs unchanged. In controlled mode:
  - reduced motion or `instant` sets the final frame with no transition;
  - `play === false` hides the paths (dasharray = dashoffset = length);
  - `play === true` runs the existing `drawIn(primary, 0)` and `drawIn(overshoot, 0.95)`.

### 5.2 The four exits (`ExitRecord.tsx`, rebuilt)

- **Data.** Add `outcome` to each deal in `content/citations.ts` DEALS. Keep year, note, event and counterparty as the record; they just stop rendering. In the component, sort by parsed value descending, with null last.
- **Copy, exact:**
  - Exits title (`<h4 class="cw-exits__title">`, mono): **"Four exits I worked inside"** (the ledger's own umbrella verb)
  - **$2.65B** · **Postmates** · "Acquired by Uber"
  - **$2.33B** · **SurveyMonkey** · "IPO, first-day value"
  - **$600M** · **Guardicore** · "Acquired by Akamai"
  - **Undisclosed** · **Neuton.AI** · "Technology acquired by Nordic Semiconductor"
  - Total: **$5.58B** with the label "Combined, disclosed deals"
- **Why $5.58B.** It is the exact sum of what the reader sees, and the operator ruled the floor row pointless. $5.58B still satisfies the "$5B+" claim used in the metadata and OG images. Record in LESSONS #3 that the exit record now renders only $5.58B.
- **Cell anatomy**, figures first, following Tiny and FE International (both fetched: plain type, no animation, no honesty framing):
  - Figure: Bricolage 800, `clamp(30px, 3.6vw, 56px)`, lh 1, tabular-nums, in a box with `block-size` equal to its own font size.
  - "Undisclosed": Bricolage 700, `clamp(18px, 1.7vw, 26px)`, pushed to the bottom of the same block with `display: flex; align-items: flex-end`.
  - Company: Bricolage 800 uppercase, `clamp(17px, 1.45vw, 21px)`, `margin-top: 14px`.
  - Outcome: Hanken 16px/1.45, `margin-top: 6px`, max 24ch.
- **Grid:**
  - At 900px and wider: `minmax(0,1.25fr) minmax(0,1.15fr) minmax(0,1fr) minmax(0,0.95fr)`. The widths are weighted by deal value, which satisfies R6.
  - Row `border-top: 1px solid currentColor`; each `li` has `padding: 28px 24px 0 0`; `li + li` has `padding-left: 24px` and `border-left: 1px solid color-mix(in srgb, currentColor 22%, transparent)`.
  - Below 900px, including 390: 2×2 with a 32px row gap. Each cell is about 163px at 390, which halves today's single-column height.
- **Total:**
  - `margin-top: 40px; padding-top: 22px; border-top: 3px double currentColor` (a receipt's total rule).
  - `display: flex; align-items: baseline; justify-content: flex-end; gap: 20px`. The label (mono 12px uppercase) comes first, then the figure (Bricolage 800 `clamp(48px, 6.4vw, 104px)`, lh 0.9).
  - Below 560px: `flex-direction: column; align-items: flex-start`.
- **Reveal and colour.** Keep `.cw-reveal` on the cells (0, 80, 160 and 240ms) and the total (320ms). All colour is inherit, with no opacity.
- **Hierarchy:** $20M+ at 240px (circled), then $5.58B at 104px, then the deal figures at 56px.

---

## 6. Ordani

- **The weakness.** A product section showing zero product, plus four photographs. On mobile that is about 1,300px of pictures; confirm the before number by measurement.
- **The fix.** One lead frame, a small strip on wider screens only, and a slot for the product screenshot. The patterns come from Linear (one screenshot per module), Attio (one screenshot at a time) and Stripe (cropped fragments, no browser chrome), all fetched.
- **DOM,** inside `section#ordani` (petrol):
  - h2 "Ordani", then the subtitle, both unchanged.
  - Then `div.cw-ord-grid` containing, in this order:
    1. `figure.cw-ord-lead`: the intake photo and its caption, unchanged.
    2. `div.cw-ord-copy`: the lede (leave its text node exactly as it is, LESSONS #6), "See how it was built", and the waitlist.
    3. `div.cw-ord-strip`: the three existing figures with their existing captions.
- **CSS:**
  - `.cw-ord-grid`: one column, gap `clamp(32px,5vw,72px)`.
  - At 1100px and wider: `grid-template-columns: minmax(0,5fr) minmax(0,7fr); grid-template-rows: auto 1fr; grid-template-areas: "copy lead" "copy strip"; align-items: start`.
  - Lead image: 3:2 natural, `width: 100%`, the existing border `1px solid color-mix(in srgb, currentColor 30%, transparent)`. `sizes="(min-width:1100px) 760px, 100vw"`.
  - Strip: `grid-template-columns: 1.2fr 1fr 1fr` (weighted), gap 12px, frames `aspect-ratio: 3/2; object-fit: cover`, captions mono 12px inherit.
  - **Mobile, below 768px:** `.cw-ord-strip { display: none }`. The page shows one photo (about 350×233) and then the copy. Target: total image height inside `#ordani` at 390 of 260px or less.
  - **768 to 1099px:** lead, copy, then the strip in a row of three (about 147px tall).
  - Remove `opacity: 0.9` from `.cw-ordani-split__cap` and from any `.cw-ord-band figcaption` rule. That is opacity on text, and petrol is one of the worlds.
  - Delete `.cw-ord-band*` and `.cw-ordani-split*` once a grep shows them unused.
- **When NC-X1 is approved:**
  - The lead frame becomes a single real screen (a client record or intake view), demo data only, captured at 2x as 1600×1067 (3:2), radius 12px, same hairline, no browser chrome.
  - Caption: "A client record in Ordani · demo data".
  - The intake photo moves to strip slot 1 and the newborn frame drops out.
- **Delete** `components/color-worlds/OrdaniSticky.tsx` (dead, and a GSAP quarantine break).

---

## 7. Renaming "Frontier AI engineering"

1. **"Demo to production"** (recommended). It is the H1's own phrase, "I take AI-built products from demo to production." It names the buyer's problem in his own words, and it maps to the Audit's existing "Production" flavor (value `production`). The pain line, "Your AI works in the notebook…", carries the AI context. Keep JSON-LD `serviceType: "AI Engineering Consulting"` and slug `ai-engineering` so search and anchors do not change.
2. **"Production AI engineering."** Clearest to a technical buyer, but it loses the H1 echo.
3. **"AI in production."** Short, but it reads as a topic rather than a service.

Companion trim (NC-N1): "End-to-end product building" becomes "Product building" everywhere, so the three names fit the picker. Before shipping, grep the rendered routes and `app/llms.txt/route.ts` for "Frontier"; the expected count is 0. The home doors CTA "See the three engagements" becomes "See the engagements": there are four shapes and three areas, and none of them is "three engagements".

---

## 8. Rule conflicts the operator must override knowingly

1. **The count-up and the circle draw on $20M+** break four written rules:
   - DESIGN_BAR **R13**: "no animated counters".
   - The §4 never-list: "animated stat tickers".
   - **R15**: entrances run once and last 400ms or less. The count is 1200ms and the circle runs to 2.65s.
   - The CLAUDE.md / `brand.json motion.figure` line: WallChart is the one FIGURE animation, and "A second animated figure would be the second-signature line; the answer there is no."

   `HandCircle` is not mounted today, so this is new motion, not grandfathered motion. The research leg found no premium precedent among the operator sites it fetched. I spec it because the operator asked for it verbatim ("the circled $20M that climbs").

   To ship it, the operator's ruling must be recorded verbatim and dated in `brand.json` and CLAUDE.md, the motion-engineer must approve in writing, and these conditions apply: home only; runs once; the base state is the finished frame; nothing happens under reduced motion; and it never couples to scroll position after the trigger.
2. **More than one filled pill per page.** /services would have Embedded and the Audit; the home would have the hero pill and the Audit box. This extends Pass-109's supersession of D7 to one fill per box group. R17's "one CTA style" holds only if the /services foot moves from `.cw-cta` to `.cw-buy`, so do that.
3. **R2 (5 or fewer active sizes per page).** /services already runs above five. The box adds its own steps (12, 16, 19, the 26-34 name, the 44-56 figure). Accept this knowingly, or cut the fit sentence to 16px and lose the gap to the list.
4. **Pinning.** None is proposed. No sticky, no pin and no horizontal scroll (the Ordani strip hides on mobile instead of becoming a swipe row). No override is needed.

---

## 9. Build order and verification

Setup:

- Run everything from the worktree.
- Build with `npx next build --webpack`. Plain `pnpm build` fails here with a Turbopack font error, which is environmental and recorded.
- Serve with `next start -p 3200`.
- In Git Bash, set `MSYS_NO_PATHCONV=1`.
- Never read an exit code through a pipe.
- Captures go to `.planning/qa/pass-111/`, at the viewport, settled first, at 390, 768 and 1440.

**Step 0.** Pass-110 is committed. `node scripts/accent-states-lint.mjs` prints "accent-states-lint: clean".

**Step 1. The PriceBox primitive and its CSS**, plus `.cw-sv { max-width: 1440px }`.

- `tsc` prints nothing.
- Grep the new `.cw-pbox`, `.cw-pband` and `.cw-pick` blocks for `#[0-9a-fA-F]{3,6}`, `--color-cw-`, `--cw-accent` and `opacity`: 0 hits.
- At 390, 768 and 1440, `document.documentElement.scrollWidth === clientWidth`.

**Step 2. /services consolidation** (§2.1 to §2.3 and §2.5, the rename, the deletions).

- `curl -s localhost:3200/services`, then grep for each of "standing rate", "Frontier", "On the price": expect 0.
- Count `—` in the same output: expect 1 (the nav's).
- `node scripts/axe-worlds.mjs`: exit 0, "0 not in KNOWN".

**Step 3. PackageBand, the picker, and the `BuyButton` guard.**

A Playwright script must show:

- Tab lands on "Demo to production", ArrowRight checks "Product building", Space keeps it checked.
- "Buy the Audit" with no pick shows the alert, moves focus to the first radio, and sends no server-action POST.
- After a pick, all three `__area` rows read "Covers: Product building".
- `?area=traction` preselects, swaps the Unstick CTA to "See the Audit", and swaps the Audit fit sentence.
- With a pick, Buy reaches the action. Locally that shows the "Checkout isn't open yet…" fallback, which proves the action was called.
- `git diff --stat app/actions lib/catalog.ts` is empty.

**Step 4. The home Audit box.**

- Captures at the three widths.
- axe-worlds passes on terracotta.
- `curl -s localhost:3200/ | grep -c "cw-deliver__row"` returns 0.

**Step 5. Receipts** (RevenueFigure, HandCircle props, ExitRecord, citations `outcome`).

- The SSR HTML contains "$20M+" and "$5.58B".
- Inside `.cw-exits`, "Every line below is real", "Stated on this site", "conservative floor", "Consulting", "2018", "2020", "2021" and "2025" all return 0.
- A Playwright check under reduced motion shows "$20M+" with no count.
- A mid-count capture proves the climb.
- A one-jump scroll past the figure ends on "$20M+".
- A layout-shift PerformanceObserver over the scroll records 0 from `.cw-rec`.
- **Blocked on the §8.1 ruling and the motion-engineer's written approval before merge.**

**Step 6. Ordani** (DOM, grid, strip hidden on mobile, captions without opacity, delete OrdaniSticky).

- Sum of image heights inside `#ordani` at 390: 260px or less. Record the before and after numbers.
- axe-worlds passes on petrol.
- New mechanical gate, wired into `build`: `grep -rlE "from ['\"]gsap" app components | grep -v TitleCard` must return nothing (this is the gate for premise 1).

**Step 7. Consistency and the ledger.**

- The /services foot moves to `.cw-buy`; the home doors copy is fixed.
- LESSONS #3 gets the rename, "the exit record renders $5.58B only", and the count-up ruling.
- The `brand.json motion.figure` amendment.
- Optional follow-on, operator call: `/packages` adopts PackageBand so the hero's `/packages` link lands on the same design.

**Step 8. Checkpoints.**

- Astra as juror on the 390 and 1440 captures: shapes, areas, packages in three states (unpicked, picked, error), the home offer, receipts (at rest and mid-count), Ordani.
- The copy check against LESSONS #3 by `curl | grep`, never by screenshot.
- One buyer read at the ship gate.

---

## References (all fetched this session, `fetched=true`)

| Site | What I verified | What this direction takes |
|---|---|---|
| linear.app/pricing | No tier badge; Enterprise shows "Custom" in the price slot; plain-text features; "Contact sales" only on Enterprise | Scoped price in the same slot at the same weight; no icons (§1.6) |
| notion.com/pricing | "Recommended" as plain text on Business; one-line descriptors; "Custom pricing"; no check icons | Plain-text tag, the fit sentence (§1.4, §3) |
| clay.com/pricing | "Recommended" above the plan name; checkmarks only in the matrix, never in cards | One weighted box; typographic lists (§1.4, §1.5) |
| attio.com/pricing | "Popular" label on Pro; Enterprise "Custom" / "Billed annually"; no "Everything in X, plus" framing | Confirms the label device |
| vercel.com/pricing | Enterprise "Custom"; feature detail in tables below, not in the cards | Keep boxes short; the long list stays in the areas strip |
| framer.com/pricing | One-line audience line per tier ("Creative personal sites"…); no badges | The fit sentence |
| stripe.com/pricing | Custom tier sold on named items ("IC+ pricing", "Volume discounts"); no icons | Scoped boxes sell on named facts |
| superside.com/pricing | No prices on the shape cards; floors only in the FAQ; lead sentence is when it fits | Scoped framing; NC-ALL2 stays off the card |
| pilot.com/pricing | "Best for:" below the price; "Must be purchased with Pilot Bookkeeping" on the card; CTA at the bottom | The area row as its own visible row (§2.1) |
| w3.org APG radio | Keyboard model (Tab / arrows / Space) | Picker keyboard behaviour only |
| tiny.com | Four big plain stats, no animation, no circles | Exit cell typography |
| feinternational.com | One aggregate sentence, plain, no honesty framing | Cut the "every line is real" dek; one total |
| linear.app | One full-width screenshot per module, no frames | Ordani: one lead frame |
| stripe.com | Cropped screenshots and composited fragments, no chrome | Ordani screenshot crop rule |
| attio.com | Tab strip with one screenshot at a time | Ordani: never stack |
| mercury.com | Illustrated mockups, not bled screenshots | Dropped (contradicts the leg) |
| raycast.com/pro | Fragments, 16px icons, struck-through annual price | Dropped as a model; negative example |

Files read for this direction:

- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/app/(foyer)/services/page.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/app/(foyer)/page.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/app/(foyer)/packages/page.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/components/color-worlds/ExitRecord.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/components/hand/HandCircle.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/components/color-worlds/OrdaniSticky.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/components/BuyButton.tsx`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/app/actions/package-checkout.ts`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/lib/catalog.ts`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/content/citations.ts`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/app/globals.css`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/docs/DESIGN_BAR.md`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/docs/LESSONS_LEARNED.md`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.claude/briefs/pass-110-a11y-copy.md`
- `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/qa/pass-109/*.png`