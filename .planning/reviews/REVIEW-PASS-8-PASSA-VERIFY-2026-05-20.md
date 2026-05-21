# Color Worlds — Adversarial Review, Pass #8 (Pass A Verification + New Surface)

**Date:** 2026-05-20
**Reviewer:** Claude (Opus 4.7), running in Cowork
**Deploy audited:** `https://micahjonesconsulting.vercel.app` at HEAD `24b81b1`
**Production canonical (`www.micahjonesconsulting.com`):** still `<title>v0 App</title>`. Operator-action; flagged once below and not re-litigated.

Pass A's commit message is ambitious — manifesto hero, $20M+ + IPO + Akamai redesign, Shipped section, hand-drawn marks, Pass-7 propagation, forced-colors + print stylesheets. Most of it landed cleanly in the visible parts of the page. **What didn't land is the propagation of the new "$20M+ + SurveyMonkey IPO + practice management" framing to the surfaces that buyers and crawlers actually consume first** — the OG image, the home metadata triplet, the Person JSON-LD. The commit message claims those were updated; verification shows the live deploy disagrees. That's the central story of Pass A.

There's also one fresh-air blocker that didn't exist before Pass A: the new "Visit ordani.com →" link and the new Organization JSON-LD `url: "https://ordani.com"` both point at a parking page titled *"Ordani.com — Premium Domain For Sale"* on atom.com. The operator flagged this as placeholder. The implementation ships it as a real link.

---

## BLOCKERS

### B1 — `ordani.com` is a "Premium Domain For Sale" parking page.
- (a) `curl -sIL https://ordani.com/` returns `302 → https://www.atom.com/name/Ordani`. The destination page title is *"Ordani.com — Premium Domain For Sale | Atom"* with visible "Buy now" / "For Sale" / "Premium Domain" CTAs. The Pass A commit message acknowledges *"url now ordani.com (per operator)"* — the operator confirmed the placeholder. But the live deploy now ships **two production surfaces** that hand this URL to visitors and crawlers as if it were the real Ordani: (1) `Visit ordani.com →` link in the home's petrol Ordani section, and (2) `"url": "https://ordani.com"` in the Organization JSON-LD that Google Knowledge Graph + LLM crawlers will index as the canonical Ordani entity URL. A skeptical buyer who clicks "Visit ordani.com →" lands on a domain-sales listing. An LLM asked "Where is Ordani at?" cites a parking page. Pass A made the credibility regression worse than not linking at all.
- (b) `app/(foyer)/page.tsx` Ordani section "Visit ordani.com →" `<a href="https://ordani.com">`; `app/layout.tsx` Organization LD `url: "https://ordani.com"`.
- (c) Until a real Ordani site exists, drop the "Visit ordani.com →" link from the home (or point it at `/work/ordani`), and remove `url` from the Organization LD (Schema.org `Organization.url` is optional and a missing field is better than a wrong one). Use `mainEntityOfPage` alone, which is already pointing at the case study correctly.

### B2 — Production canonical still serves v0 prototype.
- (a) Pass 5/6/7 blocker, unchanged. Operator-action — Vercel dashboard domain-alias swap.
- (b) Vercel project config.
- (c) Move `www.micahjonesconsulting.com` from the v0 project to the Color Worlds project.

---

## HIGH

### H1 — Pass A's "$20M+ + IPO + practice management" propagation missed five surfaces.
The commit message claims Person LD + about page receipts + home metadata + OG description got the new framing. Reality on the live deploy:
- (a) **Person JSON-LD description on EVERY indexed page** (served from `app/layout.tsx`) still says: *"...$17M+ in client revenue (2013–2023). Two exits at companies he helped build: Guardicore → Akamai (2021) and TechValidate → SurveyMonkey (2015). Currently building Ordani."* No `$20M+`, no IPO, no practice-management framing. Confirmed via `curl https://micahjonesconsulting.vercel.app/ | grep Person`. This is the single most-cited string by Google Knowledge Graph and LLM entity-extraction.
- (b) **Home `<meta name="description">`, `<meta property="og:description">`, `<meta name="twitter:description">`** all still say `"Independent operator. $17M+ in client revenue. Two exits: Guardicore → Akamai, TechValidate → SurveyMonkey. Now building Ordani in Oakland."` — `app/(foyer)/page.tsx:36, 42, 52`. So every social unfurl, every search snippet, every LLM citation that pulls the description meta gets `$17M+`, not `$20M+`.
- (c) **Home OG image** still renders `"$17M+ in client revenue. Two exits. Now building Ordani."` — `app/(foyer)/opengraph-image.tsx:19` passes that punch string into `<CWOGComposition>`. The PNG renders cleanly (1200×630 PNG, content-type image/png) but with the old number. The most-shared visual artifact of the site shows the wrong revenue.
- (d) The mismatch produces a disclosure problem: a buyer who reads the LinkedIn unfurl ("$17M+") and then visits the home (RevenueTick animates to "$20M+") sees a $3M bump in 5 seconds of browsing. That reads as either growth in the last month — or as careless inconsistency. Neither is the intended signal.

**Fix:** four edits:
1. `app/(foyer)/opengraph-image.tsx:19` — `punch="$20M+ in client revenue. Two exits — Akamai + SurveyMonkey IPO. Now building Ordani."`
2. `app/(foyer)/page.tsx:36, 42, 52` — replace all three description strings with `"Independent operator. $20M+ in client revenue. Two exits — Akamai acquisition, SurveyMonkey IPO. Now building Ordani — HIPAA-grade practice management for birth workers."`
3. `app/layout.tsx:69` Person LD description — replace with `"Independent operator based in Oakland, CA. Builds go-to-market for B2B software companies AND ships his own products. $20M+ in client revenue (2013–2023). Two exits at companies he helped build: Guardicore → Akamai (2021) and TechValidate → SurveyMonkey (acquired 2015; cap-table position held through the 2018 SurveyMonkey IPO). Currently building Ordani — HIPAA-grade practice management for fourteen doula practices."`
4. After deploy, force-refresh the home OG image at LinkedIn's post-inspector + Twitter's card validator so caches purge.

### H2 — Mobile overlay nav meta line still says "Independent builder."
- (a) `components/color-worlds/Nav.tsx:172` — the mobile overlay's footer meta reads `Micah Jones — Independent builder — Oakland, CA`. Pass A updated the hero eyebrow to `INDEPENDENT OPERATOR — OAKLAND, CA` but didn't propagate to the Nav overlay. A keyboard or mobile user who opens the menu sees the old "builder" framing — which contradicts the new hero "operator" framing in the same viewport.
- (b) `components/color-worlds/Nav.tsx:172`.
- (c) Change `Independent builder` → `Independent operator` in Nav.tsx:172.

### H3 — "Visit ordani.com →" with `target="_blank"` to a parking page (compounds B1).
- (a) The implementation uses `target="_blank" rel="noopener noreferrer"` — best-practice opener. But the destination is a domain-sales listing. Opening it in a new tab makes the regression slightly worse because the parking-page tab persists in the buyer's tab strip after they return to the portfolio. They'll see the "For Sale" page hanging around.
- (b) `app/(foyer)/page.tsx` Ordani lede-sub paragraph.
- (c) Drop the link entirely (recommended) or point at `/work/ordani` with `target="_self"`.

### H4 — Person LD description has no Ordani specificity (still says "Currently building Ordani.").
- (a) Independent of H1's $20M+ issue: the Person LD's closing sentence is the most-cited entity-description string. It says just "Currently building Ordani." — no specificity. Pass A specifically claimed *"Person LD description: full new paragraph including IPO context and the practice-management framing"* in the commit message. Verification shows that claim is false on the deployed source. An LLM asked "What is Micah Jones building?" gets four words of nothing.
- (b) `app/layout.tsx:69`.
- (c) Combined fix with H1.3.

### H5 — Hero H1 `is-revealed` class is never actually applied on the deployed page.
- (a) On the live deploy, after several seconds of interaction, the four manifesto-line spans have `className=""` (no `is-revealed` class), but `getComputedStyle().transform` reads `matrix(1, 0, 0, 1, 0, 0)` — i.e., visually at `translateY(0)`. The Hero useEffect does set `--reveal-i` on each line (verified via `style.cssText: "--reveal-i: 0;"`), and the rAF callback that should add `is-revealed` is queued — but the class never lands on the DOM. The lines are visible only because something else is preventing the `[data-mode="cw"].cw-js-reveals .cw-h1 .cw-line > span { transform: translateY(110%) }` rule from winning — possibly the `--reveal-i` inline style on the parent forcing a recompose that re-resolves transform. Pass-6 thought this fix was deterministic; on Pass A's deployed state it's accidentally-working-the-other-way-around. The visual result is OK (lines are visible) — but the choreographed sequential stagger isn't happening; all four lines reveal simultaneously. The Rauno-pattern beat ("each line earning the next") is gone.
- (b) `components/color-worlds/Hero.tsx` load-reveal useEffect; `app/globals.css:5650-5658`.
- (c) Either debug why `classList.add('is-revealed')` doesn't persist (likely View Transitions snapshot stomping again — the exact bug Pass-6 thought it had defeated) OR switch the reveal to a pure-CSS animation triggered by `cw-js-reveals` class with `animation-delay: calc(0.25s + var(--reveal-i, 0) * 0.12s)` — no JS class-toggle race possible. That's roughly 8 lines of CSS replacing the JS useEffect block.

---

## MEDIUM

### M1 — About page Person LD ALSO still says "$17M+" (since it inherits from root layout).
- (a) Same root cause as H1, but worth flagging separately because the about page's visible content and meta-description triplet WERE updated to $20M+ and IPO framing (per `app/(foyer)/about/page.tsx:15, 20`). The Person LD on /about is the only place on that page still showing the old number. Same root cause as H1; closed by the same fix.
- (b) `app/layout.tsx:69` (inherited by every page).
- (c) Combined fix with H1.3.

### M2 — `/work/passioneer` still serves 200.
- (a) Pass A correctly dropped Passioneer from the sitemap and the /work index. But the URL itself still 200s — the MDX file still exists, the dynamic route still matches, the page renders the four-sentence "draft pending" stub. Any backlink, social-share, or LLM citation of the URL (which existed during Pass 5–6 when it was still on the home) still resolves. The destination is the same embarrassing four-sentence stub Pass-5 flagged.
- (b) `content/work/passioneer.mdx` exists; `app/(theater)/work/[slug]/page.tsx` accepts dynamic slugs.
- (c) Either delete `content/work/passioneer.mdx`, OR in `getCaseStudyBySlug()` filter `status === 'stub'` to `notFound()`. The route should 404 — not silently render the embarrassment.

### M3 — Person LD `alumniOf` still bundles 7 orgs including acquirers.
- (a) Pass 5/6/7 ML; Pass A didn't address. Lists Guardicore, Akamai, TechValidate, SurveyMonkey, Flexport, Cuebiq, Postmates — flattening 5 engagement clients + 2 acquirer-tenures into one "where he worked" list. LLM entity extraction loses the cap-table-position-through-IPO subtlety that the about page now elaborates. With Pass A introducing the IPO framing more prominently, this gap matters more.
- (b) `app/layout.tsx` Person LD `alumniOf` array.
- (c) Drop Akamai + SurveyMonkey from `alumniOf` (they're now properly contextualized in the description as deal-exits with "cap-table position held"), leave the 5 engagement clients.

### M4 — "Cap-table position held through the bell-ringing" reads clever-precious.
- (a) `components/color-worlds/RevenueTick.tsx` revenue card 2, and `app/(foyer)/page.tsx` Shipped section dek. The phrasing is doing two jobs: it elevates the IPO from "I worked there during" to "I held equity through" — a real and meaningful distinction. But the "bell-ringing" image is performative. A skeptical CTO (Persona 2 from Pass 6) reads this and asks: did he ring the bell, or did he hold paper stock? The phrase wants to convey held-to-IPO without saying it; it ends up sounding like flexing. Recommend the plainer "Cap-table position held through the SurveyMonkey IPO (2018)" — same fact, no precious image.
- (b) `components/color-worlds/RevenueTick.tsx` card 2 note; `app/(foyer)/page.tsx` Shipped section dek.
- (c) Replace "through the bell-ringing" with "through the SurveyMonkey IPO" in both surfaces.

### M5 — Manifesto stack reveal stagger is not actually staggering.
- (a) Tied to H5 — all four lines reveal simultaneously rather than slide up sequentially with the planned `0.25s + var(--reveal-i) * 0.12s` per-line delay. The Rauno pattern depends on the cadence ("Ship the strategy." → beat → "Ship the product." → beat → "Ship the launch." → beat → "Ship."). Without the stagger, the four lines arrive as one block — feels like a paragraph, not a manifesto. The escalation that makes "Ship." earn its standalone position is lost.
- (b) Same as H5.
- (c) Same as H5 (pure-CSS animation with per-line delay).

### M6 — Hand-drawn underline width feels wrong for the word it underlines.
- (a) Inspected the HandUnderline SVG via `.cw-hero-underline svg getBoundingClientRect().width: 529px`. The word "Ship." at the H1's clamp(52px, 12.5vw, 196px) scale is maybe 200-260px wide at desktop. The underline spans 529px — over twice the word's width. It underlines air to the right of the period. Either the SVG viewBox is wider than the visible stroke (decorative tail beyond the visible line) or the component is sized to the parent rather than the word. Visually it'd read as "underline that overshoots" — a planned editorial flourish if controlled, sloppy if accidental.
- (b) `components/hand/HandUnderline.tsx` (didn't read this pass — defer).
- (c) Verify the SVG draws only beneath the word "Ship." not the full line-box. If the overshoot is intentional, fine; if accidental, set explicit width to match the text-box.

---

## LOW

### L1 — `cap-table position held through the bell-ringing` repeats verbatim across two surfaces.
- (a) The exact same six-word phrase appears in (1) the Shipped section dek on the home and (2) the second revenue card's note text. The Shipped dek is 4 sentences; the rev card 2 note is 3 sentences. They live in the same viewport on desktop. Repetition reads as either a deliberate motif (rare in a 4-sentence span — feels redundant) or a mid-edit duplicate.
- (b) `app/(foyer)/page.tsx` Shipped dek; `components/color-worlds/RevenueTick.tsx` card 2 note.
- (c) Reword one of them. Recommend the card note: "Customer evidence platform. Acquired by SurveyMonkey 2015; public on Nasdaq 2018. Held equity through the IPO."

### L2 — `/work/passioneer/opengraph-image-*` still 200s and shares a "PASSIONEER / PROOF / PENDING" image.
- (a) Even though the page is dropped from sitemap, the Next.js opengraph-image route convention still generates an OG image. Any caching service that cached it during Pass 5-6 retains it.
- (b) Same as M2 — the route exists because the MDX exists.
- (c) Same fix.

### L3 — The dual CTA's ghost button has slightly off vertical alignment with the primary at 1440px.
- (a) Visual nitpick. Primary CTA "Book a call →" has more vertical padding (it's the magnetic-target with `cw-cta` styling) than ghost "See how I work ↓" — they're side-by-side but their text-baselines don't quite align.
- (b) CSS for `.cw-cta` vs `.cw-cta--ghost` in `app/globals.css`.
- (c) Ensure both buttons inherit the same padding values (or set `align-items: center` on the cta-row flex container, which probably does the trick anyway).

### L4 — Working tree at HEAD is dirty with 12 truncated files (recurring).
- (a) `git status` shows 12 files modified, several truncated mid-statement (per Pass 5/7 pattern). Local dev broken — `pnpm build` against this tree fails. Not a deploy issue but a recurring local-environment pathology that someone should investigate eventually.
- (b) Operator's working environment.
- (c) `git checkout -- .` clears it for now; root cause unidentified.

---

## Pressure-test the new claims

**$20M+ revenue.** The RevenueTick visible count-up animates 0 → $20M+ over 2.4s on viewport entry. The number is now the headline credibility figure across the home. The site never breaks it down — no per-engagement attribution table. A reference-check buyer (Sandeep from Pass 6) takes the number on credit for a first call but expects to see the breakdown in a follow-up. Defensible. The $17M+ → $20M+ bump in the visible figure without corresponding updates in 5 metadata/LD surfaces (see H1) is the unforced error.

**SurveyMonkey IPO 2018.** Verified date is correct: NASDAQ debut September 26, 2018, ticker SVMK, opened ~$12/share. TechValidate acquired by SurveyMonkey August 2015. Three-year gap matches the rev card note's "went public on Nasdaq three years later." For a TechValidate employee at acquisition who received SVMK options at strike, a standard 4-year vesting cliff (with 1-year cliff) would mean ~75% vested at the September 2018 IPO. "Cap-table position held through the bell-ringing" is technically defensible if Micah didn't exercise & sell early. **Unverifiable externally** — no public 13F filing pre-IPO would show small-fish individual holdings. A buyer who pushes here is asking for an option grant snapshot, which Micah can produce. Defensible.

**Akamai acquired Guardicore 2021.** Verified: $600M, announced September 29, 2021, closed October 2021. Operator at Guardicore through the deal — the "engagement that built the acquisition narrative" claim depends on what "built the acquisition narrative" means: did the positioning research move the deal price, was it cited in Akamai's due-diligence narrative, or did it simply happen to coincide? The case study at `/work/guardicore` is 285 words and doesn't elaborate. **For Pass A specifically:** the home elevates this to a headline claim ("Acquired by Akamai" in the Shipped dek + "the engagement that built the acquisition narrative" in rev card 1). The supporting case study hasn't been expanded to match (Pass 7 deferred-action item). The headline now writes a check the case study doesn't quite cash.

**Fourteen doula practices.** Number appears in 5+ surfaces with consistent "fourteen" (one place: "14"). Stable. Unverifiable by the public — buyers take it on credit. Reads as a confident specific.

---

## Net read

**Did Pass A move the needle?** Yes — the visible page got materially better. The manifesto stack is a real upgrade over the rotating-noun carousel: "Ship the strategy. Ship the product. Ship the launch. Ship." reads as a positioning statement, not a kinetic gimmick. The hand-drawn underline beneath "Ship." is the kind of editorial mark research-backed pass-6 said should land "where the work is" — and it does. The dual CTA is correct (primary Calendly + ghost in-page anchor). The two-card revenue feature elevates "Two exits" from a single-line claim to two specific deals with dates. The Shipped section's three-sentence dek is concrete (Akamai / IPO / fourteen practices) where the prior "Products, not pitches" was loose. About page receipts upgraded to $20M+ and IPO. Five real wins.

**Top 2 wins.** (1) The manifesto stack — earned upgrade from gimmick to position, with the standalone "Ship." doing the literal-positioning work the brand asked for. (2) The revenue + exits redesign — two cards beat one line for specificity, the IPO framing is new credibility (cap-table-through-IPO is a real signal even if the "bell-ringing" phrasing overreaches), and the count-up + hand-circle elevates the figure.

**Top 2 misses.** (1) The $20M+ → metadata propagation failure (H1). Pass A repeats the exact Pattern A regression Pass-7 specifically warned against: fix lands in 2-3 visible surfaces, missed in 5 machine-readable / share surfaces, including the literal OG image and the Person LD that LLMs cite hardest. The home OG image will unfurl `$17M+` on every LinkedIn share of the new manifesto. (2) Linking to ordani.com (B1) — the operator knew it was placeholder, but shipping the placeholder URL in both the visible CTA and the Organization JSON-LD turns a credibility upgrade into a credibility regression for any visitor who follows the link.

**Is the site closer to or further from "shippable as a $200k+/yr consultant's portfolio"?** Closer on the visible page, further on the surface area buyers and crawlers consume first. Net: roughly tied, with the variance shifted toward the "spec-sheet" side of trust (the rev redesign + Shipped section + manifesto are receipts) and away from the "first-impression" side (every social unfurl, every LLM citation, every search snippet still ships $17M+ + the wrong Ordani URL). After H1's four-edit propagation fix and B1's two-line ordani.com fix, the site is meaningfully closer to shippable than it was before Pass A. Without those: the home's headline says $20M+ but every share-surface contradicts it, and any link-follower learns the product domain is for sale. That's not closer.

**What stands between today and shippable, in priority order:**
1. **Code work (15 min):** the H1 four-edit propagation (`opengraph-image.tsx:19`, `page.tsx:36, 42, 52`, `layout.tsx:69`).
2. **Code work (2 min):** remove `Organization.url` and the home "Visit ordani.com →" link until a real Ordani site exists (or repoint to `/work/ordani`).
3. **Operator action:** Vercel-dashboard swap to fix the production canonical (Pass 5/6/7 blocker, unchanged).
4. **Code work (5 min):** Nav.tsx:172 "Independent builder" → "Independent operator" (H2).
5. **Code work (15-30 min):** convert the Hero manifesto reveal from JS-class-toggle to pure-CSS animation with per-line delay (H5/M5 — restores the staggered choreography that's the whole point of the manifesto pattern).

Items 1, 2, and 3 are the line between today and shippable.
