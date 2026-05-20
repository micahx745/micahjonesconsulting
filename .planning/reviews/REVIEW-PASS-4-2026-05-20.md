# Color Worlds — Adversarial Review, Pass #4

**Date:** 2026-05-20
**Reviewer:** Claude (Opus 4.7), running in Cowork
**Deployed commit audited:** `c6d0a44`
**Scope:** Live SSR HTML on /, /about, /work, /work/akamai, /work/ordani, /work/hr-equity-author; robots.txt, sitemap.xml, llms.txt; raw curl + JSON-LD inspection. Source-level reads via `git show HEAD:` because the local working tree at HEAD is in a partially-truncated state (see L4 — likely an IDE auto-save accident, not a runtime issue, but noted).
**Tooling note:** No Lighthouse / Playwright / Chrome DevTools MCP was reachable from this session. Perf and a11y findings derive from source + SSR HTML + manual matchMedia/keyboard reasoning, not from a headless run.

A lot has shipped since pass #3 and most of it landed clean. The credibility wall (TechValidate / `$17M+` SSR floor / hero progressive enhancement / EditorialTimestamp removal / focus trap) is fixed and verified live. JSON-LD ships. llms.txt ships. The OG composition is on-brand-palette. theme-color is wired. v1–v4 are noindex + robots-blocked. The home looks credible on first render.

The findings below are what survived. Two of them are regressions where a prior pass's fix landed in one place but not in the four places it needed to.

---

## BLOCKERS

### B1 — Title double-suffix is fixed on `/` but broken on every other indexed page.
- (a) `/about`, `/work`, and every `/work/[slug]` ship with the bug pass #3 explicitly caught: `<title>About — Micah Jones — Micah Jones</title>`, `<title>Work — Micah Jones — Micah Jones</title>`, `<title>Guardicore (Akamai) — Micah Jones — Micah Jones</title>`, `<title>ORDANI — Micah Jones — Micah Jones</title>`. The home was repaired with `title: { absolute: "..." }`; nothing else got the same treatment. So `<root template "%s — Micah Jones">` re-applies to titles that already end in "— Micah Jones."
- (b) `app/(foyer)/about/page.tsx:13`, `app/(foyer)/work/page.tsx:13`, plus every case-study page; root template at `app/layout.tsx:32-34`.
- (c) Either drop the redundant " — Micah Jones" suffix from each page's `title` string (and let the template do it once), or use `title: { absolute: "..." }` everywhere. The cleanest fix is to set per-page titles to just `"About"`, `"Work"`, `"Guardicore (Akamai)"` etc. and let the template handle the brand suffix. Verify by curling `/about` and checking the rendered `<title>` afterward.

### B2 — `/work/hr-equity-author` ships with a truncated dek as its `<title>`.
- (a) `<title>An HR consultant and author specializing in organizationa... — Micah Jones</title>` — the title is a clipped sentence ending mid-word. The case-study MDX frontmatter is either missing a `title` field or its `title` is being computed from the dek and hard-clamped. Both signals to a critical visitor say "this site is half-finished."
- (b) `content/work/hr-equity-author.mdx` frontmatter; check `lib/case-studies.ts` for how `title` is resolved when missing.
- (c) Add an explicit `title:` field to the MDX frontmatter (e.g. `title: "HR equity author — algorithm + content system"`). Add a Zod assertion in `lib/case-study-schema.ts` to fail-build if `title` is missing or exceeds, say, 70 chars.

### B3 — Apex domain `micahjonesconsulting.com` 308-redirects to `www.micahjonesconsulting.com`, but every canonical and JSON-LD URL is the apex.
- (a) `curl -sI https://micahjonesconsulting.com` returns `308 → https://www.micahjonesconsulting.com/`. The home's `<link rel="canonical">` is `https://micahjonesconsulting.com`. `og:url`, `og:image`, JSON-LD `Person.url`, `Organization.url`, robots `host`, sitemap `<loc>` are all apex. Google will deduplicate to whichever form it picks as primary, but the canonical-vs-resolved mismatch is exactly the noise Google flags as a soft technical-SEO error. Worse: the og:image (`/opengraph-image-1o6u9y?…`) 308-redirects too — confirmed via `curl -sI` on the live URL — so Twitter/LinkedIn/Slack unfurlers fetch a redirect before getting the PNG. Modern unfurlers handle it; legacy Slack and WhatsApp historically do not.
- (b) DNS / Vercel domain configuration; `app/layout.tsx:41,43` (metadataBase + canonical); `app/(foyer)/page.tsx:33` (canonical); about/work pages; `app/robots.ts:46-47`; JSON-LD blocks.
- (c) Either flip the canonical to `https://www.micahjonesconsulting.com` everywhere, or change the Vercel domain config so apex serves content directly and `www` 301s to apex. Pick the canonical form first, then make DNS reality match. Apex is shorter and the brief said this was already fixed in pass #3 — but the redirect on apex now contradicts it.

### B4 — `data-cursor` attributes are still in the SSR HTML.
- (a) The pass-#3 commit message claimed `data-cursor / data-magnetic JSX attributes stripped` but `grep -c data-cursor /tmp/home.html` returns 12 occurrences (6 unique elements, doubled in the RSC payload). They sit on all four work-row `<li>`s, the Passioneer card `<li>`, and the footer mailto `<a>`. Dead attributes that look intentional to anyone reading view-source.
- (b) `app/(foyer)/page.tsx:130, 191, 247`.
- (c) Strip them. Genuinely this time. Then `grep -r 'data-cursor\|data-magnetic' app/ components/` and verify the result is empty.

### B5 — The Clients work-rows and the Products card look interactive and aren't.
- (a) `.cw-workrow` has `cursor: pointer` in CSS plus a hover-fill (`transform: scaleY(0)` → `scaleY(1)` on hover), and the rows are visually styled like a clickable list. Same for `.cw-card`: cursor pointer, hover-fill, plus a `<span class="cw-open">See more →</span>` that promises navigation. Both are `<li>` elements with no `<a>` wrapper and no keypress handler. A visitor will hover, see the affordance, click, and nothing happens. A keyboard-only user can't reach them at all (no focusable child). This is the kind of "interactive theater" that destroys credibility on a portfolio site — the design wrote a check the markup doesn't cash.
- (b) `app/(foyer)/page.tsx:130-136` (work rows), `app/(foyer)/page.tsx:191-200` (Passioneer card); CSS at `app/globals.css` `.cw-workrow`, `.cw-card`.
- (c) Two options. (1) Make them actually navigate — wrap each work-row in a real link to the corresponding section / anchor / case study; turn the Passioneer card into an anchor to `/work/passioneer` (which exists in the sitemap). (2) Or kill the click affordance — drop `cursor: pointer`, drop the hover-fill, drop "See more →". A portfolio is allowed to have non-interactive decorative lists, but it cannot promise interaction it doesn't deliver. Option (1) is the higher-leverage fix because it turns the home's most prominent list into an actual nav surface.

### B6 — Mobile dialog `aria-modal="true"` is a lie to assistive tech.
- (a) The Tab focus trap works (verified by source). But `aria-modal="true"` claims to assistive tech that sibling content is inert. The rest of the document (`<main>`, the nav, the grain layers) is NOT actually `inert`-marked when the overlay opens. A JAWS user in virtual cursor mode, or an NVDA user in browse mode, can still arrow-navigate to the page underneath the dialog. The Tab trap catches Tab; AT virtual cursors bypass it.
- (b) `components/color-worlds/Nav.tsx` — the `<div id="cw-overlay" role="dialog" aria-modal="true">` and the trap-installing `useEffect` at lines 64-104.
- (c) When the overlay opens, set the `inert` attribute on `<main id="main-content">` and on the `<nav class="cw-nav">` (and remove it on close). React 19 supports `inert` as a prop. Or use the native `<dialog>` element with `showModal()` and let the platform do this for you. Either fix makes the dialog actually modal.

---

## HIGH

### H1 — WorldSwitcher M7 from pass #3 is still unfixed.
- (a) The IntersectionObserver callback uses `entries.forEach((entry) => { if (!entry.isIntersecting) return; setWorld(...); })`. When two `data-world` sections cross the center band in the same callback (fast mobile scroll, momentum scrolling), `forEach` applies whichever section is LAST in iteration order — which is DOM order, not "the one centered." Pass #3 documented this; the file is byte-identical to pre-pass-#3. Math.abs is used only for the initial state (lines 76-94), not in the live observer.
- (b) `components/color-worlds/WorldSwitcher.tsx:96-113`.
- (c) Filter to intersecting entries, sort by `Math.abs(rect.top + rect.height/2 - innerHeight/2)`, take the first, apply only that one. Reuse the same picker as the initial-state code by factoring it into `pickCentered(elements)`.

### H2 — JSON-LD `alumniOf` claims Micah was a Akamai and SurveyMonkey alumnus.
- (a) The Person schema lists `alumniOf: [Guardicore, Akamai, TechValidate, SurveyMonkey, Flexport, Cuebiq, Postmates]`. Akamai and SurveyMonkey are the *acquirers* of the companies Micah worked at. Whether he continued as an Akamai/SurveyMonkey employee post-acquisition or left at deal-close is a factual question — but the structured-data assertion that he's an "alumnus" of both is the strong reading, and that's the version Google Knowledge Graph and any LLM doing entity extraction will cite. The on-page about copy is more careful: "contributed to two acquisitions." The two surfaces disagree on the same fact.
- (b) `app/layout.tsx:89-99` (PERSON_LD.alumniOf).
- (c) Drop Akamai and SurveyMonkey from `alumniOf` unless Micah actually worked at them post-acquisition. If he did, leave them — but then the about page should say "worked at Guardicore (later Akamai)" rather than "contributed to two acquisitions." Pick the honest version and align all surfaces.

### H3 — "Two exits" vs "contributed to two acquisitions" — the headline overstates what the bio supports.
- (a) Home rev tick + home meta description + home OG image all say "**Two exits.**" That language implies cap-table position — founder, early-stage, equity holder at exit. The about page softens to "**contributed to two acquisitions**" + "engagements with" — language consistent with employee/contractor. JSON-LD matches the about. A skeptical reader who reads both pages walks away thinking the home oversold. For a $200k+/yr consultancy, the about page is the version that survives a reference check, and the home should match it.
- (b) `components/color-worlds/RevenueTick.tsx:96` ("Two exits."); `app/layout.tsx:37`, `app/(foyer)/page.tsx:31-43` (meta); `app/(foyer)/opengraph-image.tsx:14` (OG punch); vs `app/(foyer)/about/page.tsx:42-46` ("contributed to two acquisitions").
- (c) Decide which framing is defensible. If "two exits" is true (equity at exit), the about page should claim it too — "Two exits at companies I helped build (Guardicore→Akamai, TechValidate→SurveyMonkey)." If it's not true, the home rev-tick line becomes "**Contributed to two acquisitions**" or "**Worked at two companies acquired**" and the OG image punch updates to match. Aligning four surfaces is the work.

### H4 — Revenue claim is phrased five different ways across five surfaces.
- (a) Home rev tick: "$17M+ in revenue." Home meta description: "$17M+ in client revenue." About page: "$17M+ in attributable client revenue across engagements 2013–2023." JSON-LD: "$17M+ in client revenue moved 2013–2023." llms.txt: "Aggregate $17M+ in client revenue moved across 2013–2023." OG image: "$17M+ in client revenue. Two exits. Now building Ordani." Each is defensible in isolation; no two match. An LLM doing entity extraction will see five different framings of one fact and may not collapse them.
- (b) All of the above files.
- (c) Pick one canonical phrasing and lock it. Recommend "$17M+ in client revenue (2013–2023)." That's the version that survives compression to an LLM citation and matches the home OG image best. Find-replace across all five surfaces.

### H5 — OG image typography is `fontFamily: "sans-serif"` — generic system fallback, not Bricolage.
- (a) The CWOGComposition sets `fontFamily: "sans-serif"` on the root div. Satori has no idea what Bricolage Grotesque is; it falls back to whatever system sans is available in the Edge runtime (typically Noto Sans or Liberation Sans). The single most-shared visual artifact of the site — the LinkedIn / Twitter unfurl — renders in **off-brand type**. A LinkedIn share looks like a generic OG card; clicking through lands on a heavily-textured Bricolage page. Discoverable inconsistency.
- (b) `components/og/cw-og-composition.tsx:30`.
- (c) Pass `fonts: [{ name: 'Bricolage Grotesque', data: <woff2 buffer>, weight: 800, style: 'normal' }]` to `new ImageResponse(...)`. The Bricolage woff2 is already in `public/_next/static/media/` (visible in the SSR HTML preload links). Read it from disk and pass it in. Reference: Next.js Satori-OG-image docs.

### H6 — llms.txt mislabels the TechValidate case study with the HR engagement URL.
- (a) `[TechValidate case study](https://micahjonesconsulting.com/work/hr-equity-author)` in llms.txt. The URL is the HR equity author page, not a TechValidate page. An LLM ingesting this file associates `/work/hr-equity-author` with TechValidate — making the entity model wrong in the place specifically designed for LLM consumption. The home's case-study slugs have a related issue: `/work/akamai` is actually the Guardicore engagement (named after the acquirer).
- (b) `app/llms.txt/route.ts:40-42`.
- (c) Either there IS a TechValidate case study at some other slug, in which case point the llms.txt link at it; or there isn't, in which case drop the line. Also: rename `/work/akamai` → `/work/guardicore` (the engagement was at Guardicore, the deal was with Akamai). Update sitemap + llms.txt + any internal links.

### H7 — Beta-signup email validation is still permissive.
- (a) Pass #3 flagged it; not changed. The client-side check is `!email.includes("@")` — accepts `@`, `a@b`, `a@b.` (no TLD). The server has a tighter regex but its error UX is generic. A submit with `a@b` returns the server-side "That email doesn't look valid." but the client never blocks it.
- (b) `components/color-worlds/OrdaniBetaForm.tsx:29-32`.
- (c) Use the same regex on client and server: `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`. Or trust the platform: drop `noValidate` from the form, let the browser's `<input type="email" required>` validate. The home-grown check is worse than the platform's.

### H8 — `worksFor.url` in Person schema points to a case-study page, not an Organization site.
- (a) `worksFor: { Organization: Ordani, url: "https://micahjonesconsulting.com/work/ordani" }` — that URL is Micah's case study about Ordani, not Ordani's website. Schema.org `Organization.url` is meant to be the org's homepage. If Ordani has its own domain (live beta), that's the URL. If it doesn't, then it shouldn't be treated as a separate Organization in the schema — make it a `ProgramMembership` or just a `description` field on the Person.
- (b) `app/layout.tsx:84-87`, `app/layout.tsx:103-106`.
- (c) If Ordani has a real domain, use it. Otherwise inline the description on the Person and drop the standalone Organization entity. Use `@id` URIs to dereference the two if you keep them. Right now Google KG sees "Micah Jones" + "Ordani as Organization" + "Ordani at /work/ordani" — three loosely connected entities.

---

## MEDIUM

### M1 — `app/(foyer)/page.tsx` comment header still says "tangerine / cream / cobalt / ink."
- (a) Pass #3 flagged. Still there. Lines 8-14 describe sections as "tangerine / cream / cobalt / ink"; the current palette is terracotta / bone / petrol / espresso. Two passes of "fix this trivial doc comment" and it survives.
- (b) `app/(foyer)/page.tsx:8-14`.
- (c) Edit four lines. Twenty seconds of work.

### M2 — `RevenueTick.tsx` has a duplicated header docstring.
- (a) Lines 1-12 are the OLD comment block; lines 14-19 are the NEW one written when pass #3 ships fixed the SSR floor. Both still present.
- (b) `components/color-worlds/RevenueTick.tsx:1-19`.
- (c) Delete the old block.

### M3 — `runTick()` inside RevenueTick returns a cleanup function that's discarded.
- (a) Lines 60-61: `return () => cancelAnimationFrame(raf);` — but `runTick()` is called by the IntersectionObserver callback and the return value is thrown away. If the component unmounts mid-animation (route change), the rAF chain keeps firing setState on an unmounted component for ~2 seconds. React will log a warning; in production it's a small memory leak.
- (b) `components/color-worlds/RevenueTick.tsx:41-67`.
- (c) Hoist `raf` to a ref in the component scope; cancel it in the useEffect's return cleanup. Or store the cleanup returned by `runTick()` in a ref and call it in the cleanup.

### M4 — `/about` has no link to `/work`.
- (a) About page ends with "← Back to home." There is no link to /work. /work has no link to /about either. The only path between depth pages goes through the home. A reader on /about wanting receipts has to backtrack.
- (b) `app/(foyer)/about/page.tsx:90-93`; `app/(foyer)/work/page.tsx` (similar pattern).
- (c) Add a small "See the case studies →" link inside the /about "Receipts" section and at the bottom. Add a "More about how I work →" link on /work to /about. Three-line addition; meaningful for time-on-site + page-flow.

### M5 — JSON-LD `Person` lacks `image`.
- (a) Knowledge Graph displays a Person card with image, name, job title, URL. No `image` field → no image in the card.
- (b) `app/layout.tsx` PERSON_LD.
- (c) When the real Oakland portrait lands (the brief mentioned a Phase 1 booking), add `image: "https://www.micahjonesconsulting.com/portrait-main.jpg"`. Until then, generate a brand portrait via Satori at `/portrait-og` and point image there as a fallback.

### M6 — Companies marquee doesn't pause on hover.
- (a) Brief explicitly asked. `.cw-companies .cw-track` has `animation: cw-scroll 28s linear infinite;` and no hover rule.
- (b) `app/globals.css` near line 6103.
- (c) Add `[data-mode="cw"] .cw-companies:hover .cw-track { animation-play-state: paused; }`. Same for `.cw-marquee`.

### M7 — Two `BAILOUT_TO_CLIENT_SIDE_RENDERING` markers in the home SSR HTML.
- (a) `grep -c BAILOUT_TO_CLIENT_SIDE_RENDERING /tmp/home.html` → 2. Some subtree is bailing out of streaming SSR to client rendering. The most likely cause is the Suspense boundary around the metadata outlet or the analytics scripts. Not a runtime bug, but worth investigating because every CSR bailout is a hydration cost.
- (b) Look at `app/layout.tsx` boundaries; React Server Components dev tools or `next build`'s output will identify which subtree.
- (c) Trace which component bails. If it's `Analytics`/`SpeedInsights`, that's expected. If it's something in the foyer route, fix it.

### M8 — Skip-to-content link target reads as a non-locale-aware string.
- (a) Verified the link target in /about, /work — both pages use a `<section>` as the top element but the skip link points to `#main-content` which is the `<main id="main-content">` in the (foyer) layout. The link works but the focus lands on the `<main>` wrapper, not on the page's `<h1>`. Some screen readers re-announce the entire main element on focus, which is verbose. Standard practice is to focus the h1 directly or use `tabindex="-1"` on the main and let the link target it.
- (b) `app/(foyer)/layout.tsx:39-41`.
- (c) Either change the link target to the h1 id of each page (requires per-page coordination) or add `tabindex="-1"` to `<main>` so it accepts programmatic focus without becoming a tab stop in the rest of the document. The latter is the simpler fix.

### M9 — `cw-cards` grid auto-collapses to two columns with one card.
- (a) `@media (min-width: 900px) { .cw-cards { grid-template-columns: repeat(2, 1fr); } }`. Only Passioneer is in the list. At desktop width, the grid renders a card occupying the left column and a 50% empty right column. Looks like a missing card.
- (b) `app/globals.css:6019` area, `app/(foyer)/page.tsx:190-200`.
- (c) Either add a second card (Ordani as a "more things" card — even though it has its own band), make the grid responsive to count, or use `grid-template-columns: repeat(auto-fit, minmax(360px, 1fr))` so a single card fills full width.

### M10 — `/work/[slug]` pages are in a different route group (`(theater)`) with no View-Transition between cw → theater.
- (a) Clicking from `/work` (bone world, cw layout) to `/work/ordani` (theater layout) is a hard page swap. The brief's "signature motion" mentions View Transition between foyer↔theater. Verify this is actually wired for the cw→theater hop. Without it, the case-study click breaks the otherwise-smooth scroll experience.
- (b) `app/(foyer)/work/page.tsx` link anchors → `(theater)/work/[slug]` pages; `<ViewTransition>` in `app/layout.tsx:57`.
- (c) Test the View Transition by opening DevTools Performance and clicking a case-study link. If no `::view-transition-*` pseudo runs, the route boundary isn't bridging.

### M11 — Person schema description, OG description, meta description, and home rev tick all describe the same thing in different ways with different levels of specificity.
- (a) Person LD: "$17M+ in client revenue moved 2013–2023. Contributed to two acquisitions: Guardicore → Akamai and TechValidate → SurveyMonkey. Currently building Ordani." Home meta description: "Independent operator. $17M+ in client revenue. Two exits: Guardicore → Akamai, TechValidate → SurveyMonkey. Now building Ordani in Oakland." OG description: "Independent operator. $17M+ in client revenue. Two exits. Now building Ordani in Oakland." About page lede: completely different (no numbers, no exits).
- (b) Same files as H3/H4.
- (c) Define one canonical "elevator paragraph" of 30-50 words and use it on every external-facing surface (meta description, OG description, JSON-LD description, llms.txt blockquote). Variance across surfaces is acceptable in *headlines*; in descriptions it should be one source of truth.

### M12 — `Hero`'s `prefers-reduced-motion` matchMedia is read once on mount and never re-evaluated.
- (a) A user can toggle reduced-motion mid-session (browser settings, OS toggle). The Hero captures the value at mount; if they toggle it later, neither the parallax nor the rolling word respect the change until reload.
- (b) `components/color-worlds/Hero.tsx:34-37, 68-72, 107-112`.
- (c) Use `mql.addEventListener('change', ...)` to react to mid-session toggles. Stop the interval and the parallax handler when reduced-motion turns on; restart when it turns off. Small but real.

---

## LOW

### L1 — Rolling-word SR fallback is the static word "system."
- (a) `<span class="cw-sr-only">system.</span>` followed by an `aria-hidden` rolling stack. So SR users hear "I build the [pause] system." The sentence reads complete, but "system." is the *fourth* rolling word — the SR user only hears one of four. If someone asks ChatGPT to summarize the page, the model gets "I build the system." A more honest static fallback would be "I build software." or "I build go-to-market and products." — the sentence the page is actually making.
- (b) `components/color-worlds/Hero.tsx:194`.
- (c) Replace `system.` with a sentence-equivalent like "go-to-market and product." that captures the full claim, not the last word in the cycle.

### L2 — `/llms.txt` License section uses an unrecognized license framing.
- (a) "Content on this site is © Micah Jones 2026, but recommended-for-citation by AI tools. Cite as 'Micah Jones (micahjonesconsulting.com)'." That's not a license; LLM tools don't have a parser for it. The llms.txt spec doesn't define a License section.
- (b) `app/llms.txt/route.ts:53-54`.
- (c) Either drop it, or replace with a real license URI (CC-BY-4.0 with a `> Licensed under CC-BY-4.0` blockquote so attribution is at least machine-readable).

### L3 — `Hero` parallax range is now `dx*6, dy*4` — verify on a 4K display.
- (a) Range is computed against `window.innerWidth` / `innerHeight`, so it scales with viewport. On a 4K monitor (3840px), the parallax pulls the h1 ±19px horizontally — back in "too much" territory. The intent (per pass #3 fix) was to tone down; it works at 1080p but not at retina-or-bigger.
- (b) `components/color-worlds/Hero.tsx:163-165`.
- (c) Use viewport-aware ratio: `Math.min(window.innerWidth / 1920, 1) * 6` — caps at 6px regardless of monitor size.

### L4 — Local working tree is in a truncated state at HEAD.
- (a) `git diff --stat HEAD` shows 18 files modified, several reduced to dozens of lines (Hero.tsx truncated to just the opening `<div className="cw-eyebrow">` and EOF). The deployed site is `c6d0a44` and runs fine; the working tree's modifications are a local corruption (likely IDE auto-save during a prior agent run). Not a deployed-site bug — but a `git diff HEAD` on the operator's machine right now shows scary "everything's gone."
- (b) Working tree.
- (c) `git restore .` to discard the truncated working changes. They're not commits; they're an artifact.

### L5 — `data-cursor` lives only on the home; the about/work pages are clean.
- (a) Already in B4. Worth noting that the about/work rewrites (newer code) are correctly clean. The home is the only place with the residue.
- (b) Same as B4.
- (c) Same as B4.

### L6 — LinkedIn URL `https://www.linkedin.com/in/micahjones/` is a placeholder and ships in three places.
- (a) JSON-LD `sameAs`, About page link with `rel="me"`, llms.txt Contact section. `rel="me"` is an identity-claim; if the URL is wrong, the claim is wrong. From this sandbox LinkedIn returns HTTP 999 (bot-block) so I can't verify the handle.
- (b) `app/layout.tsx:97`, `app/(foyer)/about/page.tsx:81`, `app/llms.txt/route.ts:46`.
- (c) Confirm the actual handle and update all three. If unconfirmed, drop the `rel="me"` attribute from the About link until verified — a wrong identity claim is worse than no identity claim.

### L7 — `/work/passioneer` exists in sitemap + work index, but the home Passioneer card promises "See more →" and links nowhere.
- (a) Sitemap and `/work` both list `/work/passioneer`. The home's Passioneer card has a `<span>See more →</span>` that's not an `<a>`. So the case study EXISTS but the home points at nothing.
- (b) `app/(foyer)/page.tsx:191-200`; combined with B5.
- (c) Wrap the Passioneer card in `<a href="/work/passioneer" className="cw-card cw-reveal">`. Closes B5 for this card and surfaces the case study.

### L8 — `RevenueTick` `aria-label="seventeen million dollars or more"` doesn't update mid-animation.
- (a) Visible text animates `$0.0M → $17M+`. The aria-label is the static end-state. A SR user pausing mid-animation hears "seventeen million dollars or more" while the visible text reads "$8.4M." End-state correct; mid-state slightly misleading.
- (b) `components/color-worlds/RevenueTick.tsx:84-87`.
- (c) Acceptable as-is — animation is decorative for SR users. Alternatively wrap the `<span>` with `aria-hidden="true"` and put a separate visually-hidden `<span>$17M+</span>` with the actual SR text. Cleanest semantics.

### L9 — `cw-companies` and `cw-marquee` are both infinite-scroll marquees with no per-page skip control.
- (a) Brief asked about WCAG 2.2 AAA — "is there a way to skip the marquee?" There isn't. WCAG 2.2.2 (Pause, Stop, Hide) requires user control over auto-moving content. The prefers-reduced-motion stop is one option; an explicit pause button is another. The marquees are decorative and the prefers-reduced-motion CSS does stop them — that probably satisfies AAA — but a user without the system setting and without skill to find the OS toggle has no in-product control.
- (b) `app/globals.css` `.cw-marquee`, `.cw-companies`.
- (c) Add M6's hover-pause; that's the lightest-weight WCAG 2.2.2 mitigation. A real pause button is overkill for this use case.

### L10 — `/work` index uses `<a className="cw-work-item__link">` wrapping a whole case-study card — verify the entire card is clickable, not just the text.
- (a) Pattern is correct (anchor wraps title + dek + meta). Worth a visual check that the whole card-shaped region is the click target, not just the text lines.
- (b) `app/(foyer)/work/page.tsx:42-54`.
- (c) Confirm by clicking the card edge in dev.

---

## Net read

**Almost shippable. Two regressions and one structural-data lie keep it from "almost" → "ship."** The three credibility blockers from pass #3 (TechValidate spelling, `$17M+` SSR floor, hero progressive enhancement) are fixed and verified live. The title double-suffix fix landed only on `/`, leaving four other indexed pages with the exact bug pass #3 flagged — that's a textbook "fixed one, missed four" regression, which a senior peer will catch in the first three minutes of a tab-through. The `/work/hr-equity-author` truncated title is the same kind of small detail that costs trust. The `alumniOf` schema claim about Akamai/SurveyMonkey is the most consequential issue per byte: it's the version Google KG and LLM tools will cite, and the about page's softer "contributed to" framing contradicts it. The .com→www redirect with apex canonicals is a Search Console headache. Once those five things land, the site is ready. The design discipline holds, the texture stack reads as deliberate, the JSON-LD + llms.txt + theme-color + focus-trap moves are above-bar work, and the credibility wall is real. The hand on the wheel is steady; there are just two unfinished sentences.

## Highest-leverage next move

Fix B1 (title double-suffix on `/about`, `/work`, all `/work/[slug]`) and H2 (drop Akamai/SurveyMonkey from `alumniOf`, or commit to "two exits" on every surface and own it) in the same commit. The title fix is fifteen minutes and closes the regression that a critical visitor catches first. The alumniOf fix is the one structured-data assertion an LLM-mediated reference check will surface — and getting it right is the difference between Google KG showing Micah as an alumnus of seven companies (overstated) or four (defensible). Land those two together, deploy, then close the rest as routine.

---

## Sources

- TechValidate acquisition by SurveyMonkey (Aug 4, 2015): [SurveyMonkey newsroom](https://www.surveymonkey.com/newsroom/surveymonkey-acquires-techvalidate/) · [Fortune](https://fortune.com/2015/08/04/surveymonkey-buys-techvalidate/)
- Guardicore acquisition by Akamai (~$600M, Q4 2021): [Akamai press release](https://www.akamai.com/newsroom/press-release/akamai-to-acquire-guardicore-to-extend-its-zero-trust-solutions-to-help-stop-ransomware1) · [SEC 8-K filing](https://www.sec.gov/Archives/edgar/data/0001086222/000108622221000264/galaxy-akamaipressrelease.htm)
- Live deployment audited: https://micahjonesconsulting.vercel.app/ (and /about, /work, /work/akamai, /work/ordani, /work/hr-equity-author, /llms.txt, /robots.txt, /sitemap.xml, /opengraph-image-1o6u9y)
- llms.txt spec: https://llmstxt.org/
- Schema.org Person + Organization definitions inspected against the deployed JSON-LD blocks
