# Operator decision queue, 2026-09-11

## Blocking decisions

### 1. What public minimum should Project, Retainer, and Embedded show, and is $5K a month Advisory-only or a floor for every engagement?

- **Unblocks:** Pass-111b and the `/services` rebuild.
- **Facts:**
  - Advisory says “From $5K a month”; Project, Retainer, and Embedded say “Scoped on the call.” `app/(foyer)/services/page.tsx`
  - `/services` metadata says every engagement starts at $5K a month, and `/packages` makes the same claim. `app/(foyer)/services/page.tsx`; `app/(foyer)/packages/page.tsx`
  - No floor or range for the three scoped shapes is in the repo; only the operator can supply it. `.planning/design/DIRECTION-110.md`
  - DIRECTION-110 §3.3 tracks these as NC-ALL2 (a floor or range for the scoped shapes) and NC-ALL3 (“From $5K a month” as the floor for every shape). `.planning/design/DIRECTION-110.md`
- **Options:**
  - **Advisory-only floor:** Keep $5K a month only on Advisory; remove the broader metadata and cross-link claims.
  - **One shared floor:** Supply one exact amount and cadence for all four shapes; align every surface.
  - **Per-shape floors:** Supply an exact floor or range for each scoped shape; clearest, but more copy to maintain.
- **Recommendation:** Advisory-only floor. It is the only price the repo currently supports as fact.

### 2. Which at least two commitments per shape do you approve as true?

- **Unblocks:** Pass-111b and the `/services` rebuild.
- **Facts:**
  - The five common promises will move to one shared row; each box needs at least two shape-specific promises. `.planning/design/CRITIQUE-110.md`
  - **Advisory:** A1 “Two working sessions a month, booked when you need them”; A2 async decisions answered within one business day; A3 a short written note after each session; A4 operator-supplied notice terms. `.planning/design/DIRECTION-110.md`
  - **Project:** P1 a fixed price for the agreed scope; P2 a written progress note every week; P3 documentation and a walkthrough at handover. `.planning/design/DIRECTION-110.md`
  - **Retainer:** R1 same-day response to production breakage; R2 a monthly written review of what shipped and what is next. `.planning/design/DIRECTION-110.md`
  - **Embedded:** E1 participation in standups and leadership meetings; E2 ownership and CEO reporting of a roadmap; E3 help hiring the permanent lead plus a handover plan. `.planning/design/DIRECTION-110.md`
  - **Packages and every shape:** ALL1 The 80% Wall included with every engagement; U1 Unstick also covers Positioning & GTM; U2 “The call is recorded and the recording comes with the plan”; U3 “One follow-up question by email within 7 days”; AU1 “A 30-day follow-up call after the memo”; S1 “A mid-week check-in call”; S2 “The work lands in your repo and tools, with a handover note”; S3 what happens if the Sprint outcome does not ship in the week. `.planning/design/DIRECTION-110.md`
- **Options:**
  - **Approve IDs:** Reply with at least two IDs per shape, such as `A1/A3, P2/P3, R1/R2, E1/E3`, plus any package lines you will keep (ALL1, U1 to U3, AU1, S1 to S3); the boxes can ship.
  - **Rewrite:** Give exact replacement wording for any proposal that is directionally right but operationally inaccurate.
  - **Decline the boxes:** Keep the current comparison table and defer the pricing-box rebuild.
- **Recommendation:** Approve only promises you can reliably keep, with at least two per shape. That creates distinct boxes without inventing commitments.

### 3. Should the page’s area pick be sent to Stripe and the kickoff email?

- **Unblocks:** Pass-111b and the `/services` rebuild.
- **Facts:**
  - `BuyButton` sends only the SKU key; checkout stores only `metadata.product`. `components/BuyButton.tsx`; `app/actions/package-checkout.ts`
  - Audit has a required Stripe dropdown for Build, Production, or Traction; the other packages collect no area. `app/actions/package-checkout.ts`
  - The webhook reads Audit’s `flavor` field and passes it to the kickoff email. `app/api/stripe/webhook/route.ts`; `lib/package-delivery.ts`
  - The proposed page picker currently sends its selection nowhere. `.planning/design/DIRECTION-110.md`
- **Options:**
  - **Wire it through:** Pass and validate the area server-side, store `metadata.area` for every package, prefill or replace Audit’s duplicate dropdown, and include the area in the email.
  - **Choose in Stripe:** Do not block purchase on the page; add a required Stripe field to all packages.
  - **Do not persist it:** Show the picker as guidance and ask again after purchase; the page choice can be lost.
- **Recommendation:** Wire it through. One choice should survive from page to payment to fulfillment.
- **Related, smaller (NC-X3):** should the “Ask about” buttons open `/call?shape=...` and pre-fill the booking note with the shape? The form has no shape field today, so this is a note prefill, not a new field. Recommendation: yes. `.planning/design/DIRECTION-110.md`

## Other decisions

### 4. Do you approve a documented exception for the circled $20M+ count-up?

- **Unblocks:** The optional home-page motion pass; the figure already ships static.
- **Facts:**
  - The current component renders `$20M+` and the completed circle immediately. `components/color-worlds/RevenueFigure.tsx`
  - R13 prohibits animated counters; R15 limits entrances to 400ms and transform or opacity. `docs/DESIGN_BAR.md`
  - The proposed count lasts 1.2 seconds and the circle finishes at 2.65 seconds. `.planning/design/DIRECTION-110.md`
- **Options:**
  - **Keep static:** Preserve the current premium proof moment and all written rules.
  - **Approve the exception:** Record a dated override; run once on home only, skip under reduced motion, and preserve the finished no-JS state.
- **Recommendation:** Keep static. The existing result is strong and needs no rule exception.

### 5. For the two case studies, should we keep the Hennessy example, keep “foreign,” and keep the acquisition wording non-causal?

- **Unblocks:** Final approval of the Postmates and Neuton.AI public copy.
- **Facts:**
  - Postmates says, “One custom order asked for 100 gallons of Hennessy in the Bronx.” `content/work/postmates.mdx`
  - Neuton.AI uses “foreign” in both its description and body. `content/work/neuton.mdx`
  - Your notes say the positioning work came before the sale (“that led to them selling this company”). The published study keeps the sale separate from the work; putting “led to” on the page needs your explicit yes. `.planning/prompts/SOL-110-CASE-STUDIES.md:42`; `content/work/neuton.mdx`
- **Options:**
  - **Keep current:** Retain Hennessy and “foreign”; keep the acquisition separate from the work.
  - **Neutralize:** Remove Hennessy, describe the North American positioning need without “foreign,” and keep the acquisition non-causal.
  - **Specify each:** Answer `Hennessy yes/no; foreign yes/no; led to yes/no`.
  - **Add causality:** Publish “led to” with explicit acceptance of the stronger claim.
- **Recommendation:** Neutralize. It preserves the supported work while reducing former-employer sensitivity and causal risk.

### 6. Will you supply one or two real Ordani screens with demo data and no PII, or approve the lifestyle-only section?

- **Unblocks:** A product-led Ordani redesign.
- **Facts:**
  - The home section currently shows four licensed birth-work photographs and no product screen. `app/(foyer)/page.tsx`
  - No suitable product screenshot exists in this repo; the noted app-repo assets are placeholders. `.planning/design/DIRECTION-110.md`
- **Options:**
  - **Supply screenshots:** Capture one or two real screens with seeded demo data and no PII; the section can show the product.
  - **Approve lifestyle-only:** Keep the current section, accepting that it shows the work around Ordani rather than Ordani itself.
  - **Defer:** Keep today’s section until safe screenshots exist.
- **Recommendation:** Supply screenshots. A product section should show the product.

### 7. Should the two book lines that use the banned term be reworded and the paid PDF republished?

- **Unblocks:** Alignment between the site-wide language ruling and the paid book.
- **Facts:**
  - The live manuscript uses the banned construction term twice: the chapter 6 heading (`src/chapter-06.typ:56`) and one line of chapter 5 (`src/chapter-05.typ:55`), both in `C:/Users/micah/Code/the-80-percent-wall`.
  - A customer gets the fix only after a rebuild there, `publish:site`, and a deploy of this site. `.planning/handoff/04-BOOK-MATERIALS.md`
  - `publish:site` writes to the main checkout by default. To land in the live-evolve worktree it needs `SITE_REPO=C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`. `C:/Users/micah/Code/the-80-percent-wall/scripts/publish-to-site.mjs:30-33`
  - One site image, `public/playbook/spread-money.png`, is a chapter 6 spread. No page links it; it should be re-rendered with the book. `.planning/handoff/04-BOOK-MATERIALS.md`
- **Options:**
  - **Rename and republish now:** reword both lines, rebuild, publish into the worktree, re-render the spread. You authorize the work in the book repo and the deploy.
  - **Defer:** leave the paid PDF as it is until the next book release.
- **Recommendation:** Rename and republish now. The ban is already final on the site, and the site sells the book.

### 8. Should `$5B+` be kept, qualified, or removed everywhere?

- **Unblocks:** The metadata, share-image, body-copy, and machine-readable claim sweep.
- **Facts:**
  - The figure adds two acquisition prices to SurveyMonkey’s $2.33B first-day IPO valuation, totaling $5.58B. `content/citations.ts`
  - The home aggregate was removed because calling the mixed total “deals” weakened trust. `.planning/reviews/ASTRA-111A-VERDICT.md`
  - Rendered surfaces still carrying `$5B+`: root metadata; home metadata and OG image; about metadata, body, and OG image; playbook body; work OG image; and `llms.txt`. `app/layout.tsx`; `app/(foyer)/page.tsx`; `app/(foyer)/opengraph-image.tsx`; `app/(foyer)/about/page.tsx`; `app/(foyer)/about/opengraph-image.tsx`; `app/(foyer)/playbook/page.tsx`; `app/(foyer)/work/opengraph-image.tsx`; `app/llms.txt/route.ts`
- **Options:**
  - **Drop:** Remove the aggregate everywhere; retain each company’s qualified outcome and value.
  - **Qualify:** Say the disclosed values exceed $5B and explicitly identify SurveyMonkey’s first-day IPO valuation.
  - **Keep:** Preserve the shorter claim and its mixed basis.
- **Recommendation:** Drop. The exact company-level record is stronger than a mixed aggregate.

### 9. Confirm the new name for “Frontier AI engineering”: “AI engineering”?

- **Unblocks:** the rename inside Pass-111b.
- **Facts:**
  - You approved the rename on 2026-09-11 (“Yes rename it”). The previous session then proposed “AI engineering” and offered a veto; none came. Session transcript, 2026-09-11.
  - DIRECTION-110 §7 had recommended “Demo to production”; CRITIQUE-110 found it collides with the H1, which sells the whole practice as demo to production. `.planning/design/DIRECTION-110.md`; `.planning/design/CRITIQUE-110.md`
- **Options:**
  - **AI engineering:** short and plain; the three area names stay parallel.
  - **Production AI engineering:** clearest to a technical buyer, one word longer.
  - **Demo to production:** echoes the H1, but makes the other two areas read as off-offer.
- **Recommendation:** AI engineering, as proposed.

## Already ruled

- **Rename “Frontier AI engineering”: approved, not yet applied.** The name is decision 9. The old name still renders on `/services` and in `llms.txt`. `app/(foyer)/services/page.tsx`; `app/llms.txt/route.ts`
- **Neuton.AI dated 2025: done.** Its frontmatter, acquisition outcome, citations, about page, and `llms.txt` use 2025. `content/work/neuton.mdx`; `content/citations.ts`
- **Postmates and Neuton.AI case studies: done.** Both files are `status: shipped`; the dynamic work routes discover them. `content/work/postmates.mdx`; `content/work/neuton.mdx`; `app/(theater)/work/[slug]/page.tsx`
- **Guardicore named on `/services`: done.** It appears in the receipt and the linked opening proof. `app/(foyer)/services/page.tsx`
- **The construction-term ban: done in all rendered site text.** Both spellings are banned in `lib/banned.ts`, and no match remains in `app`, `components`, `content` or `lib`. One unlinked image, `public/playbook/spread-money.png`, still shows it; it changes with decision 7.

## Standing operator-owned items

- Merge `design/live-evolve` to `main`. It is 25 commits ahead and not behind; every push to `main` auto-deploys production. `.claude/RESUME.md`
- Run the live $500 end-to-end purchase and refund test. Test mode is verified; the live ritual remains outstanding. `docs/PACKAGES-RUNBOOK.md`
- Ask Anthropic whether two accounts share a rate-limit bucket and whether one person may run both accounts concurrently. `C:/Users/micah/.claude/MODEL_ROUTING.md` §9a
- Check the LIVE Stripe Audit product description for “prioritized fix sequence.” The phrase remains in `scripts/stripe-setup.mjs`, and the retired-phrases gate does not cover it. The setup script also skips existing prices instead of updating their products, so only the operator can verify the live Stripe record. `scripts/stripe-setup.mjs`; `scripts/retired-phrases-gate.mjs`