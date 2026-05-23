# Pass #13 — Cowork visual review of Pass-12 redesigns

You are reviewing `micahjonesconsulting.com` after Pass-12 just shipped. The operator hated the Pass-9 editorial-lede hero, the weak revenue/exits copy, the bad Ordani description, and the underbuilt Shipped section. Pass-12 reworked all four areas plus added a new Frontier-AI card. Get the preview running and report.

**HEAD audit:** Pass-12 is committed (`316b4df` on `main`). Preview is live at https://micahjonesconsulting-ds2w583gs-passioneer.vercel.app. You should also `git diff b8abfa7..316b4df` to see the cumulative diff since the last operator-reviewed state.

**Get it running locally:**
```
git fetch origin main && git checkout 316b4df
pnpm install
pnpm run dev
```

Open `http://localhost:3000` and screenshot at **390 / 768 / 1440**. Hard-reload between views.

## What Pass-12 changed — do NOT relitigate framing

You are reviewing **execution**, not direction. These framing decisions came directly from the operator and were deliberate. Flag execution problems (broken layout, illegible type, dead links, regressions, rendering glitches) — do **not** propose reverting any of the following.

**Hero (`components/color-worlds/Hero.tsx` + `globals.css` `.cw-h1` block):**
- The Pass-9 editorial lede ("Most consultants leave the PDF...") is gone.
- Restored to the original rotating-word pattern: **I BUILD THE [PRODUCT./PIPELINE./LAUNCH./SYSTEM.]** — Bricolage 800 ALL CAPS at clamp(52px, 12.5vw, 196px). Italic rotating word inside a `.cw-roll` masked window cycles every 1.9s via `setInterval`. Pauses when offscreen or tab hidden.
- Sub restored to: *"Strategy and software, shipped by the same pair of hands. I build go-to-market for clients — and products with real users."*
- Dual CTA: magnetic primary "Book a call" (Calendly) + ghost "See how I work ↓".
- The `.cw-h1--lede` / `.cw-hero--lede` class variants from Pass-9 are gone — including in reduced-motion and print stylesheet overrides.

**Revenue + exits (`components/color-worlds/RevenueTick.tsx` + `globals.css` `.cw-rev__*`):**
- Contents-page editorial index pattern (Pass-9) is preserved — figure + dek + numbered entries with right-aligned date column.
- Deal-name scale bumped clamp(28-44) → clamp(36-64) so entries feel like peers to the $20M+ figure.
- Body copy reworked abstract-but-enticing:
  - 01. `GUARDICORE → AKAMAI` · **2021 · Acquired** — *"A security platform repositioned from feature-by-feature comparison into category leadership. The narrative that carried the enterprise sale."*
  - 02. `SURVEYMONKEY ENTERPRISE` · **2018 · IPO** — *"The data backbone that became SurveyMonkey Enterprise — the product line that anchored an IPO on Nasdaq. Equity held through."*
- **TechValidate is intentionally absent.** Per operator: SurveyMonkey Enterprise is the named entity for the IPO entry. Do not flag the absence.

**Ordani section (`app/(foyer)/page.tsx` Ordani band + `globals.css` `.cw-ordani .cw-tagrow`):**
- Tagrow expanded from `Live beta — practice management for birth workers` (Pass-9) to three stat pills with middle-dot separators: **`Live beta · 14 doula practices · Hundreds of users active`**.
- Lede rewritten: *"HIPAA-grade practice management for birth workers, built end to end. Doulas had been running their practice on Google Docs and group chats for a decade — they have proper software now."*

**Shipped section (`app/(foyer)/page.tsx` SHIPPED band + `globals.css` `.cw-cards` / `.cw-card__sublist`):**
- Now **three cards** (was two).
- **Card 1 — "Content + product for an HR author"** — links to `/work/hr-equity-author`. New pattern: a paragraph followed by an in-card `<ul class="cw-card__sublist">` with three sub-engagements at masked end-clients:
  - A top-tier research university — published-research web platform
  - A Fortune-500 enterprise — internal distribution platform; 30% revenue lift
  - A major American city — website, content engine, GTM, and a bespoke product
- **Card 2 — "GTM at scale"** — links to `/work/guardicore` (was `/about` in Pass-9). Names `Guardicore → Akamai` (sold) and `SurveyMonkey Enterprise` on Nasdaq (public). **TechValidate intentionally absent.**
- **Card 3 — "Frontier AI, shipped."** — NEW. Links to Calendly (no case study yet). Abstract framing: *"Production-grade AI work for founders building AI-native software. The architecture and orchestration layers that turn frontier capability into a product users actually touch. Specifics under NDA — available for new engagements."*
- Section dek updated: *"Real work in real users' hands. Two platforms acquired and public. A content engine that wins inbound. Frontier AI in production for founders."*

**Operator transparency note** — during execution, two stray-character typos were caught and repaired mid-edit:
1. Cyrillic word `семейство` injected into an Ordani `className` attribute, which also truncated the lede paragraph.
2. Stray text `seudo` between the H3 and `<p>` of Shipped Card 1.

Both were repaired before commit. Grep `[^\x00-\x7F]` against `page.tsx` came back clean of stray non-intentional characters. **But verify visually** — if any junk text or visible Cyrillic is rendering in the Ordani or Shipped sections on the live preview, flag with screenshot + file:line.

## What I want from you

### Block 1 — Hero verdict (the operator's primary concern)

The operator's verbatim feedback on Pass-9 was: *"hate the hero — I love the first hero. WHy did we change that? the one where it had one word changing through and the current font looks cheap."*

Pass-12 restored the original.

Screenshot at 1440 / 768 / 390. For each, answer in one sentence:

1. Does the rotating word actually cycle correctly? Confirm the four-word sequence (product → pipeline → launch → system) renders cleanly, the loop snaps back without scrubbing backwards, and the words fit within the masked window without clipping descenders.
2. Does the Bricolage 800 ALL CAPS display at clamp(52-196) read as **authoritative** rather than **cheap**? Compare against your taste reference (e.g., Rauno Freiberg's display type, Klim's specimen pages) — is the type doing display-grade work or is it screaming?
3. Does the per-line stagger reveal on first paint (0.20s base + 0.20s × `--reveal-i`) feel like two beats or one block? The first line is "I BUILD THE", the second line is the rotating word — they should read as two distinct beats.
4. Does the magnetic primary CTA + ghost secondary CTA pair feel proportional to the new display H1, or do the buttons read as small/lost beneath the giant headline?

### Block 2 — Revenue + exits verdict

Operator on Pass-9: *"still reads weak — need to be somewhat abstract but also enticing to want to work with me in describing these two exits. and they look underwhelming especially next to the 20 mil."*

Pass-12 bumped the deal-name scale (28-44 → 36-64) and reworked body copy.

Screenshot at 1440 / 768 / 390. Answer:

1. With the deal-name display now at clamp(36-64), do the entries feel like **peers** to the $20M+ figure (clamp 64-132), or are they still subordinate?
2. Does the new abstract-but-enticing body copy read as enticing — does it make you want to hire this person?
3. Is the right-aligned date column (`Acquired · 2021` / `IPO · 2018`) still landing as contents-page metadata, or does it look out of place next to the bigger deal names?
4. Does the dropped TechValidate name read as a credibility gap, or does `SurveyMonkey Enterprise` carry the IPO entry cleanly on its own?

### Block 3 — Ordani section

Operator on Pass-9: *"bad description. Plus I want you to put something beside or within it to showcase that we have active users right now (say 100s)."*

Screenshot at 1440 / 768 / 390. Answer:

1. Does the three-pill tagrow (`Live beta · 14 doula practices · Hundreds of users active`) land as social proof, or does it read as marketing-stat noise?
2. The Live-beta pill has a pulsing dot. Do the OTHER two pills need any visual differentiation, or is the consistent mono-uppercase treatment correct?
3. Does the new lede (*"...Doulas had been running their practice on Google Docs and group chats for a decade — they have proper software now."*) land confidently, or does "proper software" sound informal next to the rest of the page's editorial register?

### Block 4 — Shipped section (the new 3-card grid)

Operator instructions on Pass-9 → Pass-12:
- Card 1 should reframe Dante's work as three engagements at three masked end-clients (top university / Fortune-500 / major city).
- Card 2 should drop TechValidate; focus on Guardicore + SurveyMonkey Enterprise.
- Card 3 should be new — AI work at 10,000-ft framing, specifics under NDA.

Screenshot at 1440 / 768 / 390. Answer:

1. Does the in-card `<ul class="cw-card__sublist">` in Card 1 render cleanly? Specifically: does the hyphen-prefix marker land at the right indent, do the three list items wrap gracefully on mobile, and does the sublist text remain visible when the card inverts on hover (the operator added a hover-state color flip for this — verify it works)?
2. Does Card 1's "three engagements through one relationship" framing read as **credible** anonymization (per premium-consulting norms) or as **vague** (suspicious)?
3. Card 2 mentions `Guardicore → Akamai` and `SurveyMonkey Enterprise` with strong text. Does the inline bolding read editorial or marketing-y?
4. Card 3 ("Frontier AI, shipped.") — does this hold its own next to two cards with longer case-study tails, or does the "Specifics under NDA — available for new engagements" framing read as thin? Does the card visually balance the grid?
5. The three cards display via `grid-template-columns: repeat(auto-fit, minmax(360px, 1fr))`. At 1440, do they render as 3-across or 2-across? At 768? At 390 (should be single-column)? Confirm the layout works at all three breakpoints without orphan cards or empty columns.

### Block 5 — Regression sweep

Pass-12 changed the H1 markup back to `.cw-h1 .cw-line > span` and removed `.cw-h1--lede` / `.cw-hero--lede` rules. Verify nothing else broke:

- [ ] WorldSwitcher still cross-fades palettes (terracotta → bone → petrol → espresso → terracotta) as you scroll
- [ ] No-JS: view-source `/` and confirm the H1 rolling stack is in the static HTML (the `.cw-roll .cw-stack` markup with all 4 words + duplicate first word)
- [ ] Reduced-motion: activate via OS or DevTools — hero word-cycle stops on the first word, parallax stops, entrance motion does not run
- [ ] Print stylesheet: print preview the home; the hero stays static and the cards/credit line should print sensibly
- [ ] Forced-colors mode (Windows High Contrast emulation via DevTools Rendering): nothing should go invisible, especially the new `.cw-card__sublist` and `.cw-credits__meta` elements which use opacity not color
- [ ] **CRITICAL after the typo close-call**: visually inspect Ordani section and Shipped Card 1 for any rendered junk text (Cyrillic, stray English words like "seudo"). If you see any, screenshot + file:line.

### Block 6 — Pass-13+ backlog

Carry over from Pass-10:
- **B1** — Production canonical `www.micahjonesconsulting.com` still serves the v0.dev prototype (Vercel domain swap pending, operator-action).
- **B7** — Ordani section still has a `Visit ordani.com →` link. ordani.com is a parking page. Decide: redirect to `/work/ordani`, or hide the link until Ordani has its own real domain?
- **CW-18 (long-pending)** — Case study pages at `/work/[slug]` are still in an older "theater obsidian" design language and don't match the Color Worlds home aesthetic. Operator flagged this in Pass-12 prompt: *"when you click into both those bottom stories the styles are different in their thing."* This is a substantial multi-pass redesign — when, in your read, does it become a blocker for the operator's broader portfolio narrative?

New for Pass-13+:
- The `.cw-shift` class on the hero applies a chromatic-aberration text-shadow that was disabled when Pass-9 stripped the display H1. Now that the display H1 is back, the aberration is back too. Is it landing correctly, or does it read as a visual artifact at the new clamp scale?
- The Frontier AI card links to Calendly — eventually it should link to a case study. Stub `content/work/ai-engineering.mdx`?

### Block 7 — One actionable next-pass recommendation

If the operator looks at this and is happy with three of four areas but unhappy with one, **which one** will be the friction point, and what's the smallest refinement (not a redesign)? Be specific: file path + suggested edit.

## Constraints

- Don't propose reverting Pass-12 framing (rotating-word hero, dropped TechValidate, 3-card Shipped, Frontier AI card, 100s-of-users tagrow). These are operator-decided.
- Don't add new dependencies.
- Don't propose Klim or other paid fonts — Klim license is deferred.
- The forced-colors and print stylesheets exist near the bottom of `globals.css`; honor them when proposing CSS additions.
- Per the Pass-12 commit message, two near-typos were caught and repaired during execution. Double-check rendered output for stray characters before assuming the source is clean.

## Deliverable format

- Block 1-4: per-area verdicts (≤1 sentence each on landing) + specific execution issues you found, with file:line.
- Block 5: pass/fail checklist with notes.
- Block 6: confirmed status on B1, B7, CW-18, plus new entries with file:line + suggested fix.
- Block 7: one paragraph, one recommendation.

Tight reports. Operator wants signal, not essay.
