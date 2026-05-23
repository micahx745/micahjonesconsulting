# Pass #13 — Visual review of Pass-12 redesigns

**Date:** 2026-05-23
**Reviewer:** Claude (Opus 4.7), running in Cowork
**HEAD audited:** `316b4df` (Pass-12, committed on `main`).
**Preview:** the pinned URL `https://micahjonesconsulting-ds2w583gs-passioneer.vercel.app` returns 401 to `curl` (Vercel preview-protection) but loads from this Chrome session (cookie-authed). Direct visual evidence captured at desktop. **Viewport caveat:** Chrome MCP's `resize_window` resizes the chrome window, not the CSS viewport — every screenshot below renders at ~1568px regardless of requested size. Mobile/tablet verdicts are reasoned from CSS clamp + media queries, not from emulated viewports. The main `vercel.app` alias is stale (`age` ~2.7 days, still serves Pass-8 manifesto) so I worked only against the pinned Pass-12 deploy.

---

## Block 1 — Hero verdict

1. **Rotating word cycle.** Mechanism is correct. The static HTML has all 5 stack entries (`product. → pipeline. → launch. → system. → product.` — the duplicate first is the snap-back closure per source). Mask clipping clean, italic distinct from line 1, no descender clipping at clamp scale. In Chrome MCP automation tabs `document.hidden === true` so the `setInterval` is paused by the `shouldRun()` guard — that's expected, NOT a bug for real users (verified by manually triggering one tick: PIPELINE. renders clean and italic). On a real focused browser this cycles every 1.9s.
2. **Bricolage 800 ALL CAPS at clamp(52, 12.5vw, 196).** At 1440 ≈ 180px. Reads authoritative — display-grade weight, not screaming. Compared against rauno.me's display weights, this lands in the same register; the line-height 0.86 + letter-spacing −0.03em keeps the type tight. The `.cw-shift` chromatic-aberration (±1.6px cyan/magenta text-shadow) reads as a faint print-misregistration on retina; not a visible artifact.
3. **Per-line stagger reveal.** Animation delay `calc(0.20s + var(--reveal-i) * 0.20s)` puts line 0 ("I BUILD THE") at 0.20s and line 1 (rotating word) at 0.40s. Felt as two distinct beats (200ms gap is the threshold where a single eye-track break is perceived). Reveal duration 0.85s overlaps the two lines slightly — the rolling word starts arriving while line 1 is ~25% through — but the OFFSET is visible. ✓
4. **CTAs proportional?** Primary "Book a call →" (magnetic, accent-fill, ~46px tall) and ghost "See how I work ↓" (border-only, same height) read as a coherent CTA row beneath the giant H1. The mass of the H1 is so much greater than the CTAs that they DO read smaller-by-comparison — but that's correct hierarchy (H1 leads, CTAs follow). Not lost.

**Execution issues found.**
- None specific to the hero in source. The hero rendered cleanly at desktop. *(Note: the visible "preferences" icon at the right edge of every screenshot is the Vercel preview-protection toolbar, not our chrome.)*

---

## Block 2 — Revenue + exits verdict

1. **Deal-name scale as peers to $20M+.** Source bumped `.cw-rev__deal` from `clamp(28, 3.4vw, 44)` → `clamp(36, 4.5vw, 64)`. At 1440 = 64px. The figure is `clamp(64, 9vw, 132)` = 130px. Ratio ~2:1 — display peers at different rank, not subordinate. Visual confirmed: "GUARDICORE → AKAMAI" reads at the same display weight as "$20M+" and the entries no longer feel underweight.
2. **Body copy enticing?** "*A security platform repositioned from feature-by-feature comparison into category leadership. The narrative that carried the enterprise sale.*" — abstract-but-enticing per the brief; the strategic move is named without revealing tactics. "*The data backbone that became SurveyMonkey Enterprise — the product line that anchored an IPO on Nasdaq. Equity held through.*" — same pattern. Both pass the "would I want to hire this person" test. ✓
3. **Right-aligned date column at clamp(36-64) deal names.** Still lands as contents-page metadata. The mono 12px "ACQUIRED · 2021" / "IPO · 2018" at the line's right edge reads as the editorial-index page-number-equivalent. The size differential between display deal name (64px) and mono meta (12px) doesn't fight — they live in different type registers cleanly. ✓
4. **TechValidate absence.** SurveyMonkey Enterprise carries the IPO entry on its own; "*The data backbone that became SurveyMonkey Enterprise...*" sets up the relationship (TechValidate's tech → became SurveyMonkey Enterprise) without naming the source company. Per operator framing, this is intentional and reads cleanly here — no credibility gap.

**Execution issues found.**
- Caught the count-up mid-tick during scroll-in at `$0.5M`. Behavior is correct (count-up runs on IO threshold 0.4 entry), but if a user fast-scrolls past the section the count never starts. The IO `unobserve(root)` after first fire means it's run-once — if missed, never replays. Source: `RevenueTick.tsx:84`. Minor; the SSR floor is `$20M+` so worst case the user sees the static label.

---

## Block 3 — Ordani section

1. **Three-pill tagrow as social proof.** Verified via JS: `["LIVE BETA", "14 DOULA PRACTICES", "HUNDREDS OF USERS ACTIVE"]`. The middle-dot separator at `> span + span::before { content: "·" }` reads as a unit — three editorial stat-pills, not three loose tags. The pulsing dot on `.cw-live` (`cw-pulse` keyframe, saffron 9px circle expanding to 12px shadow) anchors "LIVE BETA" as the lead. Social-proof tone: yes, this reads as receipts, not as marketing-stat noise.
2. **Visual differentiation on the other two pills.** The consistent mono-uppercase 12px treatment is correct — adding visual weight to "14 DOULA PRACTICES" or "HUNDREDS OF USERS ACTIVE" would over-claim. The pulse on LIVE BETA already signals "this one is the active status; the other two are receipts."
3. **"...proper software now" — informal?** Reads slightly informal next to the rest of the page's editorial register, but it earns its weight. The sentence-pair structure ("X for a decade — they have Y now") makes "proper" do the confident-throwaway-close work. Acceptable as-is. If you wanted to tighten without losing the move, "*they have software built for their work now*" replaces the informal "proper" with specific — but loses some swagger.

**Execution issues found.**
- **The sticky-scroll choreography (OrdaniSticky.tsx) buries the tagrow behind the title's scale-in.** The gsap timeline reveals: tag at 0→0.15, title at 0.10→0.50, lede at 0.40→0.70. A user landing on the section sees mostly blank petrol-world for the first ~0.15 of the pin scroll. The 3-pill tagrow — your strongest social-proof signal — only appears AFTER the user has scrolled 15% of the 100vh pin window. Pulled the tagrow visible-time on real-user scrolls is ~150-200ms; the title then dominates for the next ~600ms. The pills barely register. **See Block 7 for the smallest refinement.**

---

## Block 4 — Shipped section (3-card grid)

1. **Card 1 sublist renders cleanly.** Verified live: 3 items, em-dash marker via `::before { content: "—" }`, indent 18px, opacity 0.78. Items wrap to 2 lines each at the column width — graceful. Hover-color-flip rule at `globals.css:6367` correctly includes `.cw-card__sublist` in the selector chain (`background: currentColor` on card → text becomes `var(--cw-bg)`). Sublist text inherits the flip. ✓
2. **"Three engagements through one relationship" framing.** Reads credible — top-tier research university / Fortune-500 enterprise / major American city is the standard premium-consulting anonymization vocabulary. The "30% revenue lift" concrete number on item 2 gives the trio a verifiable spine. Doesn't read as vague.
3. **Card 2 inline strong styling.** Verified live: `<strong>Guardicore → Akamai</strong>` and `<strong>SurveyMonkey Enterprise</strong>` render with `font-weight: 700` against `font-weight: 400` body. Reads editorial — the bolding does typographic emphasis, not marketing shout. ✓
4. **Card 3 "Frontier AI, shipped." next to longer-tail cards.** Visual height matches via `align-items: stretch` on the grid. Card 3 has ~4 body lines + "INQUIRE ↗" CTA vs Card 1's ~3 body lines + 3-item sublist + CTA. Card 3 has visible whitespace below body before the CTA — reads as "deliberately spare" given the NDA framing, not as thin. The `↗` arrow correctly signals external link (Calendly). The premium-consulting "Specifics under NDA — available for new engagements" register lands.
5. **Grid behavior across breakpoints (reasoned from CSS).** `grid-template-columns: repeat(auto-fit, minmax(360px, 1fr))`:
   - At **1440** content width ~1360px → 3 columns × 360px + 2 × 24px gap = 1128px, fits 3-across ✓ (confirmed visually)
   - At **768** content width ~688px → fits 1 column at 360px (one column orphan stretching to full ~688px). **Actually: at 768, 1 col of 360px leaves 328px gap — `auto-fit` stretches the single column to 688px. So you get a STACK of 3 single-column-stretched cards on tablet, not 2-across.** That contradicts the brief's expectation of 2-across at 768.
   - At **390** content width ~350px → single column at 350px (just under the 360px min — `minmax` lets it shrink). All 3 stack. ✓

**Execution issues found.**
- **B-IX: tablet grid collapses to 1-column instead of 2-across.** At 768, `minmax(360px, 1fr)` with content width ~688px can't fit 2 × 360px (720px) + 24px gap. So auto-fit drops to 1 column and each card stretches to ~688px. That's awkward at tablet — three tall single-column cards instead of a 2+1 arrangement. **Fix:** at the 720-1023 range, use `repeat(2, 1fr)` explicitly (or drop the `minmax` floor to `minmax(300px, 1fr)`). File: `app/globals.css:6271`.

---

## Block 5 — Regression sweep

| Item | Result | Notes |
|---|---|---|
| WorldSwitcher cross-fades (terracotta → bone → petrol → espresso → terracotta) | ✓ Pass | Verified 7 sections with correct `data-world` attrs: top:terracotta, marquee:terracotta, clients:bone, ordani:petrol, products:espresso, credits:espresso, contact:terracotta. WorldSwitcher component untouched by Pass-12. |
| No-JS: H1 rolling stack in static HTML | ✓ Pass | SSR HTML has `.cw-roll .cw-stack` with all 5 children: `product. / pipeline. / launch. / system. / product.` (the duplicate first for snap-back). Without `cw-js-reveals` class on root, hidden-state CSS doesn't apply; H1 paints visible immediately. |
| Reduced-motion | ✓ Pass | Source restored `[data-mode="cw"] .cw-h1 .cw-line > span` selectors in both the `@media (prefers-reduced-motion: reduce)` block (`globals.css:6596`) AND the print block (`globals.css:6687`) — matching the Pass-12 markup. Global cw-mode `animation: none !important; transition: none !important` covers everything. Hero rolling word also early-returns under reduced-motion. |
| Print stylesheet | ✓ Pass | Print block restores `.cw-h1 .cw-line > span { transform: none !important; opacity: 1 !important; }` at `globals.css:6687`. Marquees + nav + cursor + overlay still hidden. New `.cw-card__sublist` and `.cw-credits__meta` not in print hide-list — they'll print, which is correct (the sublist IS content, not chrome). |
| Forced-colors | ⚠ Untestable | `matchMedia('(forced-colors: active)').matches === false` in Chrome MCP. Can't directly emulate. Pass-12 didn't add new selectors for `.cw-card__sublist` or the new tagrow `> span + span::before` — these rely on currentColor / opacity, should survive. The `.cw-credits__meta` was already opacity-only. Operator should verify in real Windows High Contrast. |
| **CRITICAL: typo/Cyrillic check (Ordani section + Shipped Card 1)** | ✓ Pass — clean | Source: `grep [^\x00-\x7F]` on `page.tsx` shows only legitimate non-ASCII (4 en-dashes in tags `2024–present / 2013–2023 / 2025–present`, plus `©`). No `семейство`, no `seudo`. Live SSR HTML scanned for both literal strings — both absent. Card 1 sublist text in DOM matches source verbatim ("A top-tier research university — published-research web platform" etc.). No Cyrillic byte-pairs in the rendered HTML. **The mid-edit close-call is fully cleaned.** |

---

## Block 6 — Backlog confirmation

| ID | Status | Detail |
|---|---|---|
| **B1** — Production canonical `www.micahjonesconsulting.com` serves v0.dev prototype | ❌ Still broken | `curl https://www.micahjonesconsulting.com/` returns `<title>v0 App</title>`. Unchanged since Pass-5. Operator-action; Vercel domain alias swap. |
| **B7** — Ordani section links to ordani.com parking page | ✅ Fixed in Pass-12 | Live verified: `.cw-lede-link` href is `/work/ordani` (was `https://ordani.com`). The brief preserved label as "Read the case study →" which now does what it says. Closed. |
| **CW-18** — Case study pages still in older theater obsidian design | ❌ Still queued | `/work/[slug]` route untouched by Pass-12. Operator flagged in the prompt — still queued. My read on when this becomes a blocker: when a buyer who lands on a case study from a LinkedIn share asks "why does this page look like a different site?" — that's the friction point. Estimated 1 review-pass away from being the bottleneck once Pass-12+13 polish settles. |

### New B14+

| ID | What | Where | Suggested fix |
|---|---|---|---|
| **CW-19** | Credit line still names TechValidate + "SURVEYMONKEY IPO" while Revenue Card 2 and Shipped Card 2 dropped TechValidate and use "SurveyMonkey Enterprise" | `app/(foyer)/page.tsx:312-314` — credits line currently reads `<strong>TechValidate</strong> → SURVEYMONKEY IPO, 2018` | Decide: (a) keep TechValidate as a low-level engagement credit (it IS a real engagement) — leave as-is and rename "SURVEYMONKEY IPO" → "SURVEYMONKEY ENTERPRISE / IPO 2018" for consistency, OR (b) drop TechValidate entirely from the credits and rely on "Engagements at Guardicore → Akamai, Flexport, Cuebiq, and Postmates." Operator call. The current state — TechValidate in credits but absent from the upper credibility moments — reads as inconsistent if a reader compares both sections. |
| **CW-20** | Shipped tablet grid collapses 3 cards to 1-column at 768px instead of 2-across | `app/globals.css:6271` — `repeat(auto-fit, minmax(360px, 1fr))` — at 768, content width ~688px < 2 × 360px + gap | Add a `@media (min-width: 720px) and (max-width: 1023px)` rule that forces `grid-template-columns: repeat(2, 1fr)`. Card 3 becomes the orphan on row 2 stretched to full width — that's the brief's expected behavior at tablet. |
| **CW-21** | OrdaniSticky timeline puts the 3-pill tagrow at phase 1 (0→0.15 of pin) — visible for only ~200ms during a real scroll | `components/color-worlds/OrdaniSticky.tsx` — `gsap.set([tag, lede, form, note], { opacity: 0, y: 28 })` initial state + `tl.to(tag, ...)` at phase 1 | Pull the tag out of the GSAP-hidden initial state. Have it visible from the moment the section pins (operator's strongest social-proof signal should land first, not be sandwiched between empty space and the giant ORDANI title). See Block 7. |
| **CW-22** | `.cw-shift` chromatic-aberration is back on the H1 (since Pass-9 dropped the display H1 and Pass-12 restored it). Verify with operator whether the ±1.6px registration smear reads right or wants dialing down at the new clamp scale. | `app/globals.css:5427-5436` — `.cw-shift` text-shadow rules | Cosmetic / taste call. Current ±1.6px reads as faint print misregistration; could be dropped to ±1.0px for a quieter texture, or kept. Operator preference. |
| **CW-23** | Frontier AI card links to Calendly (no case study yet) — eventually wants a stub case study at `content/work/ai-engineering.mdx` so it joins the `/work` index | `app/(foyer)/page.tsx:289` — Card 3 anchor `href="https://calendly.com/..."` | When ready: stub the MDX, change the link to `/work/ai-engineering`, and add it to the case-study index. Until then, the Calendly CTA holds. |
| **CW-24** | Vercel preview-protection toolbar icon (small dark circle with bullet-list glyph) is visible at the right edge of EVERY screenshot — overlaps the rightmost UI when the viewport is narrow | Vercel project setting (Deployment Protection) | Operator-action: in the Vercel dashboard, set the production domain to bypass preview-protection (or disable for `www`). Not a blocker for review but visible on the pinned preview URL. |

---

## Block 7 — One actionable next-pass recommendation

The Ordani section will be the friction point. The Pass-12 copy + 3-pill tagrow are the cleanest landing of the four areas — but the sticky-scroll choreography from OrdaniSticky.tsx buries the strongest signal. **Smallest refinement:** pull the tag out of GSAP's initial-hidden state so it's visible the moment the section pins, BEFORE the giant ORDANI title scales in. File: `components/color-worlds/OrdaniSticky.tsx`. Edit the `gsap.set([tag, lede, form, note], { opacity: 0, y: 28 })` line to remove `tag` from the array, AND drop the `tl.to(tag, { opacity: 1, y: 0, duration: 0.15 }, 0)` block entirely (since tag is now visible at rest). The tagrow renders at full opacity from the moment the section enters the pin — the social proof lands first, then the title scales in, then the lede slides up, then the form, then the note. The brief explicitly asked whether the tagrow lands as social proof "or as marketing-stat noise" — it lands as social proof; the pin choreography just needs to give it the first beat instead of the third.
