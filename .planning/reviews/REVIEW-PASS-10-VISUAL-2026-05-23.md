# Pass #10 — Visual review of Pass-9 redesigns

**Date:** 2026-05-23
**Reviewer:** Claude (Opus 4.7), running in Cowork
**Branch:** `cw`, HEAD `b8abfa7` (Pass-8 shipped). Pass-9 uncommitted in working tree — verified all changes applied.

**Tooling caveat I need to flag upfront.** I copied the working tree into the sandbox FS, installed deps, and got the Next.js dev server up at `http://127.0.0.1:3000` returning a 200 SSR HTML. I verified the Pass-9 SSR markup by `curl` — new classes present (`cw-h1--lede`, `cw-rev__head`, `cw-rev__entry`, `cw-credits__line`, etc.), old Pass-8 classes gone (`cw-rev-cards`, `cw-companies`), copy correct. But the sandbox runtime hit hard SIGKILL limits every time I tried to chain Next.js dev + Puppeteer + screenshots (puppeteer's bundled Chromium downloaded fine; running it alongside Turbopack pushed the sandbox over). So **the verdicts below are reasoned from the CSS clamp math + SSR HTML + grid breakpoints, not from rendered screenshots.** Treat them as projections an experienced eye would make from reading the code; the operator should sanity-check at 1440/768/390 in a real browser before commit.

---

## Block 1 — Visual landing

### 1. Hero — Editorial Lede

**Verdicts.**

| Viewport | Verdict |
|---|---|
| **1440** | At `clamp(36px, 5.5vw, 88px)` = ~79px with `max-width: 22ch` ≈ ~950px, each ~42-char sentence wraps to TWO visible lines — so the "two-sentence lede" reads as four visual lines, not two. Reads editorial — but it's longer-form than the design comment implies. |
| **768** | At ~42px font / 22ch ≈ ~506px / ~768px viewport with 40px gutters, each sentence still wraps to 2 visible lines. Same as desktop, slightly tighter. |
| **390** | At 36px font / 22ch ≈ ~436px / 350px content width, each sentence wraps to 3 visible lines. **Six visible lines total in the mobile hero** — pushes the CTA row well below first-paint fold on a 844px iPhone viewport. |

**Execution issues.**

1. **`max-width: 22ch` doesn't actually constrain the wrap to "one sentence per visual line."** "Most consultants leave the PDF and move on." is 43 chars — almost 2× the 22ch budget. The design comment in `globals.css` reads as if 22ch was set to control line measure, but the practical effect is that EACH sentence wraps to 2-3 lines depending on viewport. If the intent was "two display-weight sentence-lines, each on one row," the budget should be ~46ch (longest sentence + 1ch slack). If multi-line-per-sentence WAS intentional (expressive line breaking, literary-fiction-opening pattern), the comment should say so — and the per-line stagger animation (currently 0.18s per `--reveal-i`) might want re-tuning to fire per-visible-line not per-sentence.

2. **The stagger fires per `<span class="cw-h1-line">` not per visual line.** Sentence 1 (which wraps to 2 visible lines) all slides up together at t=0.20s; sentence 2 (also 2 lines) slides up at t=0.38s. The cadence is "two beats" — but with 4 visible lines arriving in two clumps of 2, the eye reads it as a single block reveal with one mid-beat. The Rauno-style escalating-stagger feeling the Pass-8 manifesto reached for is even less present here.

3. **The reveal-line wrapper is `.cw-h1-line` but the reduced-motion override targets `.cw-h1 .cw-line > span`** (`globals.css:6548`) — the old selector. **Dead override.** The general `@media (prefers-reduced-motion: reduce) { [data-mode="cw"] * { animation: none !important; transition: none !important; } }` block at `globals.css:6539` catches the new H1 globally so the visible behavior is correct (animation suppressed, element stays at default transform). But the specific `.cw-h1 .cw-line > span { transform: none !important; opacity: 1 !important }` rule no longer matches anything. Cosmetic, not a bug — but mark it for cleanup with the rest of the dead-selector pass.

4. **Dropping the magnetic spring on the primary CTA reads correctly calmer for the editorial register.** ✓ No execution issue; honors the brief.

5. **`MagneticArea` import is no longer in Hero.tsx** (verified). But `MagneticArea` STILL appears in the SSR HTML — because the footer "LET'S BUILD →" wrapper at `app/(foyer)/page.tsx` still uses it for the "Book a call ↗" link. **That's correct — not a leftover from Hero.tsx.** ✓

### 2. Revenue + exits — Editorial Index

**Verdicts.**

| Viewport | Verdict |
|---|---|
| **1440** | Figure at `clamp(64px, 9vw, 132px)` = ~130px wraps to about 360px wide; sits left of the dek in the `auto 1fr` grid with 56px gap. Two-line dek at ~28px sits right. **Reads as one editorial block.** The numbered `01./02.` entries below in `auto 1fr auto` grid place the right-aligned dates at the line's end — this is the contents-page move; it works. |
| **768** | Same `auto 1fr` grid; figure shrinks to ~65px (the min of the clamp); dek stays at 20px. Tight but readable. The entry grid still applies — dates right-aligned. |
| **390** | `cw-rev__head` collapses to single column: figure stacks above dek. The entry collapses to single column: num → deal → note → when stacked. **The date drops to the bottom of each entry** — reads as a footnote-citation under the body note. That's editorial-correct for a contents-page metaphor; works. |

**Execution issues.**

1. **The dek `.cw-rev__dek` uses an explicit `<br/>` to break "in client revenue across a decade." from "Two exits at companies I helped build."** — but the dek also has its own font-size, and at 1440 with `align-items: end` on the figure-row grid, the dek's baseline doesn't align cleanly with the figure's baseline (figure is `line-height: 0.86`, dek is `1.25`). The visual effect: the dek looks like it's "floating" below the figure's optical baseline rather than sitting beside it. Recommend `align-self: end` on `.cw-rev__dek` and/or matched-baseline tuning. Small but visible.

2. **The hand-circle at `inset: -14% -6%`** wraps the figure at the new larger size (was -18%/-8% on the Pass-8 ~68px figure; now -14%/-6% on the ~130px figure). The reduced inset is correct in principle — the larger figure needs the circle to sit closer. But verify the irregular-curve path's overshoot (the "hand drew past the close" detail) doesn't intersect the dek to the right on the desktop layout. If the figure's right edge is at ~360px and the circle inset is -6% (so circle extends ~22px right of the figure) and dek starts at ~56px gap later, there's clearance — should be fine.

3. **`.cw-rev__deal` uses `display: flex; flex-wrap: wrap; gap: 0 16px`** so on narrow viewports `TECHVALIDATE → SURVEYMONKEY` wraps after the arrow. At 390 mobile, the entry-main column width is ~310px after gutter; `TECHVALIDATE` at clamp(28px, 3.4vw, 44px) = 28px (the floor) × ~0.55em/char × 12 chars = ~185px, then arrow + SURVEYMONKEY (~190px) won't fit on one line. Wraps cleanly. ✓ But: `TECHVALIDATE →` (with arrow) on line 1, `SURVEYMONKEY` on line 2 — the arrow trails line 1, which reads correctly as "X →" / "Y" rather than "X" / "→ Y."

4. **`.cw-rev__note` `max-width: 56ch`** — at 15px body × ~0.5em/char ≈ ~7.5px/char × 56 = 420px. On desktop the entry-main column is ~700px wide (`1fr` between 80px num and 180px date column), so the note reads as ~420px wide with whitespace to the right. **Looks intentional** (newspaper-column constraint) — good. But on tablet/mobile, the column collapses and the 56ch constraint takes over the available width — also reads correctly.

5. **`align-items: baseline` on the desktop entry grid** at `≥720px` — this aligns the num/deal/when baselines. The num is mono 12px with 0.6em top padding; the deal is display-weight at ~44px; the when is mono 12px with 0.6em top padding. **Their baselines won't naturally align** because the display font's baseline-to-cap-height ratio differs from mono. The `padding-top: 0.6em` on num and when is doing approximate optical alignment, but it's pinned at 0.6em — at 12px mono that's 7.2px. The deal at 44px has cap-height ~30px. The num/when will sit visibly LOW relative to the deal cap-height. Not a bug — could be intentional ("hanging numerals"). But if the operator wanted them at the deal's cap height, they'd need padding-top ≈ (44 - 12) / 2 ≈ 16px or `align-items: first baseline`.

6. **No SR fallback for the `01./02.` numbered list.** The `<p class="cw-rev__num" aria-hidden>01.</p>` is hidden from screen readers, and the parent `<ol aria-label="Two exits">` IS read. NVDA will announce "list, 2 items" and then read each entry's content without a per-item number prefix. That's fine — the visible num is decoration, the semantic list provides the count. ✓

### 3. Engagements credit line

**Verdicts.**

| Viewport | Verdict |
|---|---|
| **1440** | `.cw-credits__line` at `clamp(22px, 2.6vw, 34px)` = ~34px max with `max-width: 36ch` ≈ ~670px. The 125-char paragraph wraps to ~4 lines. Reads as a magazine credit block. The `.cw-credits__meta` inline mono at `0.5em` (17px) sits beside each display name as marginalia annotation. **Works as designed.** |
| **768** | Font drops to 22px (the floor, since 2.6×7.68=20vw is below 22). Meta drops to 11px. Tighter, still legible. |
| **390** | Same 22px font / 11px meta. The 36ch max-width at 22px ≈ 22 × 12 = 264px, so wraps to ~6 lines on a 350px content width. **The meta at 11px monospace is at the edge of comfortable mobile read.** |

**Execution issues.**

1. **The `.cw-credits__meta` `font-size: 0.5em` at `vertical-align: 0.15em` doesn't sit cleanly between commas in the running paragraph.** At desktop with display 34px and meta 17px, the meta sits at ~5px above the baseline (0.15em × 34px). Visually: `**Guardicore** →¹⁷ Akamai, 2021ᴹ, **TechValidate**` — the meta hovers half-superscript next to the bold name, then the comma resumes inline. This creates a "footnote-mark" feel which IS the editorial pattern intended (marginalia next to display), BUT the comma that comes IMMEDIATELY after the meta closes the gap awkwardly. Result: `Akamai, 2021,` reads as `Akamai 2021,` with the second comma stacking right after a mono "1." A small but visible execution wrinkle. Two paths to fix: (a) demote meta to NOT use baseline-shift (sit on the same line), with letter-spacing + lower opacity carrying the marginalia tone; or (b) move the meta out of the inline flow into a proper `<sup>`-style superscript with `font-feature-settings: "sups"` so the comma has its own baseline space.

2. **The h2 wraps the entire credit paragraph** — semantically that promotes "Engagements at Guardicore..." to a SECTION HEADING level. The page also has h2s for "STRATEGY THAT SHIPS, NOT SLIDES." (clients) and "ORDANI" (sticky-scroll) and "SHIPPED." (products) — so an h2 here is consistent. But the heading content is now a full paragraph, not a phrase. Search snippets and screen-reader outlines will pull this whole sentence as the section heading. Reads fine for SR users; SEO snippets might want a tighter heading.

3. **The `max-width: 36ch` constraint with a 125-char paragraph** means the wrap-points are dictated by the browser's word-break algorithm. At 36ch limit, lines might break inside the inline-mono meta (`→ Akamai, / 2021`) which would split a date across visual lines. Browsers usually break at the space inside the meta — verify on hover that `→ Akamai, 2021` stays unified. If not, add `white-space: nowrap` to `.cw-credits__meta` (or just `display: inline-block`).

4. **The seam bug from Pass-8 is moot** since the marquee is dead. ✓

5. **`COMPANIES` constant removal verified** (no longer in `page.tsx`). ✓ Five-line cleanup landed.

---

## Block 2 — Regression sweep

| Item | Result | Notes |
|---|---|---|
| WorldSwitcher cross-fades palettes as sections cross center | ✓ Pass | `WorldSwitcher.tsx` untouched by Pass-9; data-world attrs intact on all sections including the new `.cw-credits` (data-world="espresso"). |
| Reduced-motion hero stagger off + count-up off + no reveals | ✓ Pass with one dead selector | Global `[data-mode="cw"] *  { animation: none; transition: none }` at `globals.css:6539` catches the new H1 (since the new keyframe is on `.cw-h1--lede .cw-h1-line > span`, the universal `*` selector applies). The legacy specific override `.cw-h1 .cw-line > span` no longer matches anything but doesn't harm — flag as dead-selector cleanup. The RevenueTick component early-returns under reduced-motion (verified in source). The HandCircle component also early-returns. |
| No-JS — H1 in static HTML | ✓ Pass | Verified via `curl /` SSR HTML — both sentence-lines render with `class="cw-h1-line"` wrappers; the spans inside have no `--reveal-i` set without JS, so the CSS animation gets default delay (0s) and runs once on first paint. Without `cw-js-reveals` class on root (no JS), the hidden keyframe-state rule doesn't apply, so the H1 paints visible immediately. |
| Forced-colors mode | ⚠ Untestable from sandbox; flag a concern | The `@media (forced-colors: active)` block at `globals.css:6471` was written for Pass-8 against `.cw-companies` (still referenced at line 6633 — dead since marquee removed; harmless). It DOESN'T mention `.cw-credits` — so the new credit-line section is uncovered by forced-colors. Should be OK because `.cw-credits__line strong` uses `font-weight: 700` (not color-distinguished from regular) and `.cw-credits__meta` uses opacity not color. But operator should verify in Windows High Contrast mode. |
| Print stylesheet | ⚠ Stale dead references | The `@media print` block at `globals.css:6633` hides `.cw-companies` (now dead). Doesn't hide `.cw-credits` so the credit line will print. Probably fine — it's static text, prints cleanly. The `.cw-rev__index` is also not in the print hide-list, so the numbered exits print — also fine. Worth one cleanup pass to drop the dead `.cw-companies` reference. |
| /about, /work, /work/[slug] | ✓ Pass | Pass-9 didn't touch these pages. They use `.cw-secttitle` not `.cw-h1`, so the Pass-9 `.cw-h1` rule changes don't affect them. |
| Mobile overlay menu (focus trap) | ✓ Pass (untouched) | Nav.tsx unchanged by Pass-9; Pass-8 fix held. |
| Ordani sticky-scroll | ✓ Pass (untouched) | `OrdaniSticky.tsx` unchanged by Pass-9. |
| Service-marquee hover-pause | ✓ Pass | The Pass-9 CSS rewrite at line 6275 correctly drops `.cw-companies:hover .cw-track` (dead) and keeps `.cw-marquee:hover .cw-track` (still alive — top-of-page services marquee). |

---

## Block 3 — Backlog confirmation

| Item | Status | Detail |
|---|---|---|
| **B1** — Production canonical serves v0.dev prototype | ❌ Still broken | `curl https://www.micahjonesconsulting.com/` returns `<title>v0 App</title>`. Unchanged since Pass-5. Operator-action; Vercel domain alias swap. |
| **B2** — `opengraph-image.tsx:19` says `$17M+` | ✅ Fixed (between Pass-8 ship and Pass-9 working tree) | `git show HEAD:app/(foyer)/opengraph-image.tsx` line 19 now reads `punch="$20M+ in client revenue. Two exits — Akamai + SurveyMonkey IPO. Now building Ordani."`. Quietly addressed. |
| **B3** — Nav.tsx mobile overlay says "Independent builder" | ✅ Fixed | `components/color-worlds/Nav.tsx:172` now reads `Micah Jones — Independent operator — Oakland, CA`. Quietly addressed. |
| **B4** — `layout.tsx` Organization LD `url: "https://ordani.com"` | ✅ Fixed | `ORG_LD` at `app/layout.tsx:109` now has the `url` field intentionally OMITTED, with a comment: *"url intentionally omitted — ordani.com is currently a domain-sale parking page; pointing schema at it would mislead Knowledge Graph + LLM crawlers."* `mainEntityOfPage` still points at the case study. Live LD on the preview confirms no `url` field. Quietly addressed. |

### New B5+ entries

| ID | What | Where | Suggested fix |
|---|---|---|---|
| **B5** | Dead CSS selector after Pass-9 H1 rename | `app/globals.css:6548` — `.cw-h1 .cw-line > span` no longer matches anything (markup uses `.cw-h1--lede .cw-h1-line > span`) | Update to `[data-mode="cw"] .cw-h1--lede .cw-h1-line > span, [data-mode="cw"] .cw-eyebrow > span { transform: none !important; opacity: 1 !important; }`. Cosmetic; the universal `[data-mode="cw"] *` rule covers behavior. |
| **B6** | Dead `.cw-companies` reference in print stylesheet | `app/globals.css:6633` — `[data-mode="cw"] .cw-companies { display: none !important; }` inside `@media print {}` | Delete the rule entirely; the marquee no longer exists. |
| **B7** | Dead Visit-ordani.com link still ships | `app/(foyer)/page.tsx` Ordani section — `<a href="https://ordani.com" target="_blank">Visit ordani.com →</a>` | Pass-9 didn't touch this; Pass-8 B1 noted; ordani.com still resolves to a "Premium Domain For Sale" parking page. Either point at `/work/ordani` or hide the link until Ordani has its own site. |
| **B8** | The Ordani h2 inside `.cw-ordani` uses `.cw-bleed` (ink-bleed filter) but the rest of the page has dropped its hand-marks under Pass-9 (hero underline removed) — leaving ink-bleed as a register-orphan | `app/globals.css` `.cw-bleed` rule still applies the `url(#cw-ink-bleed)` SVG filter only to the giant ORDANI sticky-scroll word | Probably fine as-is — the ORDANI word is the section's signature mark per the brief — but with the hero hand-underline gone, the ink-bleed becomes the *only* texture-vocabulary mark on the home other than the revenue hand-circle. Consider whether two marks is the right count (was three with Pass-8: underline + circle + ink-bleed). |
| **B9** | `align-items: end` on `.cw-rev__head` at ≥720px causes a baseline-alignment mismatch between the figure (line-height 0.86) and the dek (line-height 1.25) | `app/globals.css:5996` area | Use `align-items: baseline` with explicit `vertical-align: baseline` on the children, or `align-self: end` only on the dek with `align-items: start` on the parent. Small visual polish. |
| **B10** | `.cw-credits__meta` baseline-shifted inline mono adjacent to commas creates "Akamai, 2021," double-comma visual artifact | `app/globals.css:6395` | Either drop the `vertical-align: 0.15em` (sit inline at baseline) or restructure markup so the meta wraps the trailing comma too. |

---

## Block 4 — One actionable next-pass recommendation

**Bet:** if the operator is unhappy with one of three sections, it's the **hero**. The revenue index is the cleanest landing of the three — single design vocabulary, contents-page metaphor reads. The credit line is editorial and confident, even with the small inline-mono polish to do. The hero is where the design intent (two-sentence lede, two reveal beats) collides with the practical type math (each sentence wraps to 2-3 visible lines, so the rhythm becomes one block-reveal with a 0.18s mid-beat rather than two distinct sentence-beats). The lede *content* is the strongest line on the site — it deserves to be the H1 and that decision should stick. But the *implementation* needs ~30 minutes to recover the intended rhythm.

**Smallest possible refinement (not a redesign):** drop `max-width: 22ch` from `.cw-h1` and replace with `max-width: 48ch` (or remove the constraint entirely and let each `<span class="cw-h1-line">` keep its sentence on one visible line at desktop+tablet). At 1440 with font-size ~79px, the longest sentence is "I stay until users have the product in hand." — 45 chars — which at ~43px/char fits in ~1900px. That exceeds the viewport's 1360px content width, so it'd still wrap once. But with the constraint removed, the wrap-point is "natural" (browser word-break to fit available width) rather than imposed (~22ch budget that's tighter than the sentence is long), and the visual rhythm becomes: each sentence flows on 1-2 lines, the two-sentence stagger reads as TWO BEATS not four. Pair this with bumping `animation-delay` from `0.18s * --reveal-i` to `0.35s * --reveal-i` so the gap between sentence-1-complete and sentence-2-start is felt — that's the breath the editorial register wants. The hand-circle and credit line don't need this — they're working. The hero just needs the line-measure to stop fighting the type-scale.
