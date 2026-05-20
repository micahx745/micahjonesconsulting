# Color Worlds — Adversarial Review, Pass #5

**Date:** 2026-05-20
**Reviewer:** Claude (Opus 4.7), running in Cowork
**Deployed commit audited (vercel.app preview):** `450e4b6`
**Production canonical audited (www):** whatever Vercel currently routes there — see B1
**Scope:** SSR HTML on both `https://micahjonesconsulting.vercel.app/*` and `https://www.micahjonesconsulting.com/*`; OG image binary inspection; redirect chain probing; JSON-LD/llms.txt/sitemap/robots; source-level reads via `git show HEAD:` because the local working tree at HEAD is *more* broken than at Pass #4 (see M2).
**Tooling note:** No headless Lighthouse/Playwright reachable. Perf/a11y reasoning derives from SSR HTML, CSS inspection, and pixel-sampled OG image. The single dominant finding (B1) makes most Lighthouse-class diligence on the canonical pointless — Lighthouse on the live URL would be scoring a v0.dev throwaway, not the portfolio.

Pass #4 shipped most of what Pass #3 flagged. The vercel.app preview is meaningfully better than the deploy I reviewed at `c6d0a44` — titles are clean, anchors wrap the right rows, the OG image is on-palette terracotta, the `/work/akamai → /work/guardicore` 301 fires, the `inert` siblings are real, and the working-tree truncation I had to step around at Pass #4 was already in flight. **And then the entire thing falls off a cliff at the DNS layer** — what's in `main` is not what's on `www.`, and what's on `www.` is not Micah's portfolio.

The most-impactful thing the prior four reviewers missed is one HTTP `curl` away. I'll lead with it.

---

## BLOCKERS

### B1 — The canonical production domain serves a different Vercel project entirely.
- (a) `curl https://www.micahjonesconsulting.com/` returns `<title>v0 App</title>` / `<meta name="description" content="Created with v0"/>` — a neobrutalism Tailwind page (green/black blocks, rotated cards, `border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`) Micah evidently generated in v0.dev. It lists "Full Spectrum Birthworkers" as his current role, a stack list (Java/PHP/HTML/CSS/MySQL/...), a `https://calendly.com/micahmccoyjones/introduction` CTA, and links `https://www.linkedin.com/in/micah-j/`. Build is `NEQmOyz8Tm1HhwGbxWsMz`, deployment `dpl_3CvGvczz7yME68T5jjpwDBvDVxud`. Color Worlds it is not. The deployment shipped to `micahjonesconsulting.vercel.app` (`dpl_748xRKKAAqRQDKwy55DmT1GhSJLk`) and the v0 project sitting on `www` are two different Vercel projects. Every Pass-4 SEO move — `metadataBase`, canonical, sitemap, robots, JSON-LD `Person.url`, llms.txt URLs — was carefully repointed to `https://www.micahjonesconsulting.com/...`, and that URL space now resolves to a stale v0 prototype.
- (b) Vercel project Domains config, not source. `next.config.ts`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts` are all *correct*; the production alias is wrong.
- (c) In the Vercel dashboard for the Color Worlds project, add `www.micahjonesconsulting.com` (and the apex) as a domain, transferring it from whatever project the v0 app lives in. Verify by `curl -sI https://www.micahjonesconsulting.com/` and looking for `x-matched-path: /` plus the correct `dpl_` of the Color Worlds latest build. Until this is done, the entire site I just reviewed is not the site any real visitor (or crawler, or LLM, or LinkedIn unfurler, or potential client) sees.

### B2 — Every indexed route returns 404 on the canonical domain.
- (a) `/about`, `/work`, `/work/ordani`, `/work/guardicore`, `/work/hr-equity-author`, `/work/passioneer`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/opengraph-image-*` ALL return `HTTP/2 404` on `www.micahjonesconsulting.com`. All return 200 on `vercel.app`. The 404 etag (`cb0722cfce868725aaf7d3faea3cd6fb`) is from a v0 deploy ~17.7 days ago — the home being served by a *different* cached deploy explains why the home 200s but everything else 404s. Same root cause as B1. The OG image referenced from cached SSR is `https://www.micahjonesconsulting.com/opengraph-image-1o6u9y` — 404. Any social unfurl right now gets a fallback card. Google's last successful indexing was of the v0 app; Google's next visit will see 404s on the URLs in the new sitemap (which it can't fetch either, because /sitemap.xml is 404).
- (b) Same as B1.
- (c) Fix B1 and B2 resolves with it.

### B3 — The `/work/akamai → /work/guardicore` 301 doesn't fire on the canonical.
- (a) `curl -sI https://www.micahjonesconsulting.com/work/akamai` returns 404, not 308. Pass-4 added the redirect in `next.config.ts` (verified at HEAD); the redirect is shipped on the vercel.app preview (`location: /work/guardicore`). Because the canonical isn't running the right project, any backlink, Google index entry, social share, or business-card pointing at `/work/akamai` will hit 404 instead of redirecting forward. Pass-4 specifically called this out as a fix — and it landed in source but not in production.
- (b) Same as B1.
- (c) Same as B1.

---

## HIGH

### H1 — Pre-hydration / no-JS users see dark text on terracotta — fails WCAG AA.
- (a) `app/globals.css:5141-5145` sets `[data-mode="cw"]` initial state to `--cw-fg: var(--color-cw-espresso)` (`#2A1F18`) and `--cw-bg: var(--color-cw-terracotta)` (`#9E3C25`). `body` inherits `color: var(--cw-fg)`. The hero h1 inherits color. Contrast on espresso-on-terracotta is ~2.3:1 — fails WCAG AA 4.5:1 for body text and fails AA-large 3:1 even for the 196px display headline. `WorldSwitcher.tsx` (the JS observer) is what flips `--cw-fg` to bone (`#ECE3D0`, contrast ~4.6:1) once the hero crosses the viewport center observer threshold. Per the Hero.tsx docstring: "PROGRESSIVE ENHANCEMENT: baseline HTML is fully visible. No-JS clients see the full hero." It is visible to bytes; it is not legible to eyes. A no-JS user OR anyone who loads the home with a slow main-thread (think CPU-throttled mobile) sees a half-second of illegible giant letters. The CSS comment two lines above says `Initial world = tangerine (hero)` — wrong palette name AND wrong fg (terracotta's fg should be bone, not espresso). Two bugs in the same comment header.
- (b) `app/globals.css:5141-5145`.
- (c) Sync the CSS initial state to match WorldSwitcher's `terracotta` world: `--cw-bg: var(--color-cw-terracotta); --cw-fg: var(--color-cw-bone); --cw-accent: var(--color-cw-espresso);`. Update the comment to "Initial world = terracotta (hero)." Then verify: disable JS in DevTools, hard-refresh `/`, confirm the headline is readable. Same fix removes the FOUC flash on first paint.

### H2 — The LinkedIn handle Pass-4 left as a TODO is wrong, and the right one was sitting on the broken canonical the whole time.
- (a) `app/layout.tsx:104-107` sameAs, `app/(foyer)/about/page.tsx:106`, and `app/llms.txt/route.ts:43` all use `https://www.linkedin.com/in/micahjones/` with a `// TODO — verify exact LinkedIn handle.` comment. Meanwhile the v0 app currently being served from www has Micah's actual LinkedIn at `https://www.linkedin.com/in/micah-j/` (linked from his own self-described "About Me" panel and the LinkedIn-icon CTA). The placeholder either 404s or points to a different person named Micah Jones — either way it's wrong, and it's wrong in the JSON-LD that's specifically engineered for LLM entity extraction. An LLM asked "Micah Jones consultant LinkedIn?" will cite the wrong URL.
- (b) `app/layout.tsx:104-107`, `app/(foyer)/about/page.tsx:106`, `app/llms.txt/route.ts:43`.
- (c) Replace all three with `https://www.linkedin.com/in/micah-j/`. Drop the TODO. (Verify by opening the URL in a browser first to confirm it's the right Micah Jones — but it's documented on his own deploy so this is just hygiene.)

### H3 — The Person.description in JSON-LD says "Contributed to" while the about page now says "helped build."
- (a) Pass-4 explicitly upgraded the about page from "contributed to two acquisitions" to "Two exits at companies I helped build" — a strength upgrade. The JSON-LD `Person.description` in `app/layout.tsx:69` was not similarly upgraded. It still ships `"Contributed to two acquisitions: Guardicore → Akamai and TechValidate → SurveyMonkey."` In a Person.description, this is the single most-cited string a Knowledge-Graph or LLM entity-extraction tool pulls. So an LLM asked "what is Micah Jones known for" will say "contributed to two acquisitions," while a human reading the about page reads "Two exits at companies I helped build." Two surfaces, two strengths, same fact. Pass-4 fixed it in one of the two places that matter. Pattern A — fixed in one, missed in another.
- (b) `app/layout.tsx:67-69` (Person.description). Also `components/og/cw-og-composition.tsx` — verify the OG punch string still matches the home, and reconcile with the new framing.
- (c) Replace the JSON-LD description with `"Independent operator based in Oakland, CA. Builds go-to-market for B2B software companies AND ships his own products. $17M+ in client revenue (2013–2023). Two exits at companies he helped build: Guardicore → Akamai (2021) and TechValidate → SurveyMonkey (2015). Currently building Ordani."` Same parenthetical date format the about page uses. Re-validate the JSON-LD at Google's Rich Results Test after.

### H4 — The Passioneer card is the only product on a section titled "Products, not pitches" — and it links to a stub.
- (a) The home's `/* PRODUCTS — ink */` section has one card: Passioneer, captioned "AI content platform" with copy "An AI-native platform for creators — streaming chat, generation, and a publishing pipeline in one place. See more →" The "See more →" links to `/work/passioneer`. The destination MDX body is four sentences: *"A case study draft is in progress. The Passioneer engagement is recent and the detailed metrics require client sign-off before publication. Check back in Q3 2026."* Title card reads `PASSIONEER / PROOF / PENDING`. So the "Products, not pitches" section ships, on the only product in it, a card that promises pitch and delivers pending. Same affordance-vs-substance pattern Pass #4 caught at the work-row level — the link technically works, but the destination is empty in a way that contradicts the section's own headline. A skeptical visitor clicks "See more →" once, sees a 4-sentence "check back Q3 2026," and updates their prior on the whole portfolio.
- (b) `app/(foyer)/page.tsx:200-211` (Passioneer card); `content/work/passioneer.mdx`.
- (c) Three options ranked by leverage. (1) Cut the Passioneer card AND the entire "Products, not pitches" section until there's a second real product to sit beside it; Ordani is already in its own dedicated section so removing this section loses nothing. (2) Replace Passioneer with a real product card whose case study is shipped — Full Spectrum Birthworkers is described in detail on the v0 app and could ship as a case study. (3) Leave the card; demote the destination to a short product page (not a case study) so the link delivers something other than "check back."

### H5 — Working tree at HEAD is broken in a way that prevents `pnpm build`.
- (a) `git status` shows 25 files modified with `+19 -586` lines net. `wc -l next.config.ts` is 48 (HEAD is 49); the file ends mid-statement: `export default withMDX(` with no closing arg, no `nextConfig)`, no semicolon. `wc -l app/layout.tsx` is 68 (HEAD is 164) — over half the root layout has been deleted from disk, including the entire PERSON_LD constant and the JSX return. Twenty-three other files are similarly truncated. The Pass-4 reviewer flagged this softer ("partially-truncated state"); since then it has progressed, not regressed-back. If Micah runs `pnpm build` or `pnpm dev` against this tree right now it fails immediately — `next.config.ts` is unparseable as TypeScript. The prompt-brief assertion "Working tree should be clean" is false in a way that blocks local iteration. Either an IDE auto-save bug ate the files, or someone started a "compact the layout" refactor and walked away with it half-done.
- (b) Working tree only — HEAD itself is fine; this isn't deployed.
- (c) Either `git checkout -- .` and start the refactor over from a known-clean state, or finish the in-flight changes and commit. If the IDE is auto-saving truncated buffers, investigate that — the Pass-4 reviewer noted the same pathology with fewer files; whatever's eating them is still eating them.

### H6 — Section comments in `page.tsx` still describe the *previous* palette in five places.
- (a) `app/(foyer)/page.tsx` lines 107, 126, 159, 190, 244 — five of six section-header JSX comments are *still* tangerine/cream/federal blue/ink. Pass-3 first flagged this. Pass-4's commit message said "Stale 'tangerine/cobalt' doc comment in page.tsx finally updated (third pass calling it out)" but Pass-4 only updated the top-of-file docstring (lines 1-22). The five section-marker comments inside the JSX were missed. So a sixth section comment (`COMPANIES marquee — espresso`) uses the new palette, the other five don't. Same pattern survives in `components/color-worlds/WorldSwitcher.tsx:5` (`data-world="tangerine|cream|cobalt|ink"`) and `app/globals.css:5141` (`Initial world = tangerine (hero)`). Three passes' worth of "fix this comment" and three out of four files where it lives are still wrong.
- (b) `app/(foyer)/page.tsx:107, 126, 159, 190, 244`; `components/color-worlds/WorldSwitcher.tsx:5`; `app/globals.css:5141`.
- (c) Run `git grep -n -E 'tangerine|cobalt|federal blue|cream\b|\bink\b' app/ components/` (excluding `.planning/reviews/`), replace all with terracotta/petrol/bone/espresso. Comment-only change, but five passes of being called out is the actual signal — it's not the comments, it's that nobody is grepping before claiming the fix.

---

## MEDIUM

### M1 — `Person.alumniOf` still bundles 5 engagement clients with 2 acquirers.
- (a) The Pass-4 brief explicitly retained `alumniOf: [Guardicore, Akamai, TechValidate, SurveyMonkey, Flexport, Cuebiq, Postmates]` (7 orgs) and the operator confirmed cap-table position covered it. But the Pass-5 brief flags the entity-extraction concern: an LLM asked "where did Micah Jones work?" gets a 7-org list with no signal that 2 of those are acquirers and 5 are engagements. The about page distinguishes: "Two exits at companies I helped build (Guardicore + TechValidate)" + "Engagements with (Guardicore, TechValidate, Flexport, Cuebiq, Postmates)." Three of the seven JSON-LD orgs (Guardicore, TechValidate) appear in BOTH lists; two (Akamai, SurveyMonkey) appear in NEITHER. JSON-LD doesn't make any of that legible. An LLM citing the schema makes a worse claim than the prose does.
- (b) `app/layout.tsx:95-103`.
- (c) Split: `alumniOf: [{name: "Guardicore"}, {name: "TechValidate"}]` (companies he was at through acquisition), plus a custom `worksFor` array or a `affiliation` array for the 5 engagement clients. Or, simplest: drop Akamai + SurveyMonkey from alumniOf entirely; they're already in the description string with the deal context (which is more accurate than naked alumniOf membership). Then the alumniOf list = 5 companies he actually worked for.

### M2 — Pass-4's matchMedia mid-session toggle item is still unfixed.
- (a) Hero.tsx reads `prefers-reduced-motion` once on mount per useEffect; doesn't subscribe to the matchMedia `change` event. A user who toggles "Reduce motion" in macOS Accessibility mid-session keeps getting parallax / rolling word until reload. Pass-4 deferred this as M12 "noted, not urgent." It IS noted, but for an a11y-conscious portfolio, "noted" three review passes in a row is "decided not to do." Move it to a real ticket or stop carrying it.
- (b) `components/color-worlds/Hero.tsx` — three useEffects, each early-returning on `matchMedia(...).matches` without subscribing to change.
- (c) `const mq = matchMedia(...); const onChange = () => { ... stop/start ... }; mq.addEventListener('change', onChange);` in each useEffect (and clean up). Or factor into a `useReducedMotion()` hook so the pattern is reused across Hero + future motion components.

### M3 — `/work/passioneer`'s frontmatter status is `stub` and the page renders it as a real case study anyway.
- (a) The status field already discriminates (`shipped` / `in-flight` / `stub`). The /work index page renders the `stub` state visibly: `<span>{s.status}</span>` shows "stub" to visitors next to the dek "An AI content platform. Case study draft pending." So the index honestly tells you it's a stub. But the /work/[slug] page renders stubs with the same full TitleCard + Dek + body + footer nav chrome as shipped case studies — the chrome implies depth that the content doesn't have. Either (a) skip stub pages out of /work/[slug] entirely (return 404 or redirect to /work index), or (b) ship a `<StubBanner />` component at the top of the case-study body that owns the "draft pending" framing instead of letting it be paragraph 1 of the body.
- (b) `app/(theater)/work/[slug]/page.tsx`; `lib/case-studies.ts` status filter.
- (c) In `getAllCaseStudies()`, optionally filter `status !== 'stub'` for the home `<Products>` section's link target — so the home doesn't link to a stub at all. Keep stubs in the index for honest accounting, but don't promote them on the home.

### M4 — "Book a call ↗" in the footer is a `mailto:`.
- (a) `app/(foyer)/page.tsx:253-257`. The text says "Book a call" + an external/forward arrow ↗ (matches a calendar-booking action). The href is `mailto:hello@micahjonesconsulting.com?subject=Intro call`. A visitor clicks expecting Calendly/SavvyCal/Cal.com and gets their email client. Mild interactive theater — and Micah already has a real Calendly URL on the v0 deploy: `https://calendly.com/micahmccoyjones/introduction`. If the email-based flow is the deliberate choice (some operators prefer to qualify in inbox before booking), change the label to "Email to book →" or "Pitch a call ↘". If Calendly is the actual preferred path, swap the href.
- (b) `app/(foyer)/page.tsx:253-257`.
- (c) Replace the label to match the action, or replace the action to match the label. Pick one.

### M5 — OG image is rendering in system sans-serif at 4.4% bone coverage.
- (a) Pixel-sampled the live `/opengraph-image-1o6u9y` (1200×630, 41KB). 93.7% terracotta, 4.4% bone, 0.1% saffron. Bone text at 4.4% coverage is thin sans-serif at display size — system fallback (per the `fontFamily: "sans-serif"` in `cw-og-composition.tsx:30`). At Bricolage Grotesque 800 the same headline string would cover roughly 9-12% of the canvas — visibly wider, heavier, more brand-distinctive. The OG image *is* on-palette, but reads as a placeholder template rather than a finished asset. Pass-4 deferred this as H5; Pass-5 brief acknowledges it as deferred. Flagging because it's the single most-shared visual artifact of the site and the gap between it and the live site is the discoverable inconsistency — anyone who shares the link compares the unfurl to the page and sees them as different brand systems.
- (b) `components/og/cw-og-composition.tsx:30`.
- (c) Pass `fonts: [{name: "Bricolage Grotesque", data: readFileSync("public/fonts/bricolage-800.woff2"), weight: 800, style: "normal"}]` to `new ImageResponse(...)` in each opengraph-image.tsx. The Bricolage woff2 is already in the site's font assets via `lib/fonts.ts`. Read it from disk (Node `fs.readFileSync` in the route — Satori runs at build/edge, not in browser). Verify the result by re-fetching and re-sampling: bone coverage should rise to 8%+ and the letterform shapes should be visibly heavier.

---

## LOW

### L1 — `/work/[slug]` case-study footer says "back to foyer ↗".
- (a) `app/(theater)/work/[slug]/page.tsx:148`. "Foyer" is internal route-group jargon (the directory is named `(foyer)` for path-mapping; the design language is Color Worlds). Users see "back to foyer ↗" in the case study footer and have no referent — the home isn't called "the foyer" anywhere visible. The arrow direction (↗ implies up-right, external, or forward) also fights the "back" semantics. Inherited from the multi-tier pre-Color-Worlds era.
- (b) `app/(theater)/work/[slug]/page.tsx:147-149`.
- (c) `← home` or `← back to home`. Match the /about and /work backlinks' phrasing (`← Back to home`, `← More about how I work`) for consistency.

### L2 — llms.txt uniquely claims "Currently solo since 2024."
- (a) That date appears only in llms.txt; not in the About page, Person.description, or home. An LLM cross-referencing surfaces will flag the variance (or simply pick the most-specific source — llms.txt — and propagate the 2024 date everywhere). If "since 2024" is true, repeat it on the about page in the "Currently" section. If it's slightly fuzzed, drop it from llms.txt.
- (b) `app/llms.txt/route.ts:25`.
- (c) Reconcile to either "Currently solo since 2024" everywhere it makes sense, or drop the year from llms.txt.

### L3 — Ordani's description varies between vague and specific across surfaces.
- (a) JSON-LD Organization.description: *"A live-beta system of record for an underserved, regulated industry."* Home tagrow: *"system of record for a regulated market."* About page Receipts: *"HIPAA-grade CRM for birth workers."* llms.txt: *"HIPAA-grade CRM for birth workers."* Case study body: *"A HIPAA-compliant CRM for birth workers."* Two phrasings circulate — schema is industry-vague, prose is specific to birth workers. If the vagueness is deliberate (privacy/discretion for beta users), commit to it on the home too; if not, the schema is needlessly soft.
- (b) `app/layout.tsx:114-115` (Organization.description).
- (c) Decide whether the public framing is "birth workers" or "regulated market." Lock to one. Recommend the specific one for SEO + LLM retrievability — "birth workers" is a unique, searchable noun phrase; "regulated market" is not.

### L4 — `/work/passioneer` title-card words read `PASSIONEER / PROOF / PENDING`.
- (a) Frontmatter `titleCardWords: [PASSIONEER, PROOF, PENDING]`. Honest framing of an empty case study, but the giant motion-animated `PENDING` is the dominant visual on the page. Combined with the body's "check back Q3 2026," the page is a 3-word billboard for "this section of the site isn't done." Either ship the case study or hide the page.
- (b) `content/work/passioneer.mdx`.
- (c) Same fix as H4. If the page must exist as-is, change titleCardWords to something more like `PASSIONEER / DRAFT / SOON` so the giant word isn't "PENDING."

### L5 — `data-cursor` / `data-magnetic` are deleted from JSX but the layout's docstring still talks about them.
- (a) `app/(foyer)/layout.tsx:27-31` and `app/globals.css:5417-5418` both still document the data-attribute pattern as if it were live: *"data-cursor / data-magnetic attributes on nav/CTA elements are now harmless no-ops (kept so any future re-add doesn't require touching markup)."* Pass-4 actually stripped them. The comment now describes attributes that don't exist. Stale doc.
- (b) `app/(foyer)/layout.tsx:27-31`; `app/globals.css:5414-5420`.
- (c) Either delete the comments (attributes are gone, no longer informative), or restore the attributes as documented (probably not, since the whole point was to drop them). Simpler: delete the comments.

---

## Net read

**No.** The site is not shippable as a $200k+/yr consultant's portfolio in its current state — not because the design isn't good (the vercel.app preview is a credible, opinionated, branded portfolio) but because **the canonical URL is serving a different site entirely**. Pass-4 carefully repointed every canonical, every JSON-LD URL, every llms.txt link, every sitemap entry, every metadataBase to `https://www.micahjonesconsulting.com/...` — and that URL space currently resolves to a v0.dev neobrutalism prototype titled "v0 App." A potential client googling "Micah Jones Oakland operator" lands on it. A LinkedIn unfurl of `https://www.micahjonesconsulting.com/` returns the v0 home's default OG. Anyone Micah hands his card to types the URL and sees green-and-black rotated cards, the wrong stack list, the wrong bio framing, and a Calendly link to a different identity (`micah-j` vs the `micahjones` placeholder the new code uses). The vercel.app preview is excellent. The production canonical is a portfolio crisis. The prior four reviewers all curled vercel.app or read the source and trusted the deploy reached www; the test of "fix it in source vs ship it to the URL that matters" is one `curl https://www.micahjonesconsulting.com/about` away and nobody ran it.

Setting B1/B2/B3 aside (the same root cause produces all three): the source-level state is closer to ship than not. The four real source-level concerns left are the CSS initial-state contrast bug (H1), the LinkedIn handle placeholder (H2), the schema-vs-prose drift on the most-cited credential (H3), and the Passioneer-only Products section linking to a stub (H4). H1 is the kind of bug that earns a "did anyone actually look at this without JavaScript" question in an audit. H2 leaks a wrong URL into the LLM-citation surfaces specifically engineered to teach LLMs the right one. H3 means Knowledge Graph and ChatGPT will cite a softer version of Micah's track record than the about page now claims. H4 hands a skeptical reader the "this portfolio is half-finished" prior in the section literally titled "Products, not pitches." The five Mediums and five Lows are real-but-survivable — a Tuesday afternoon of dedicated cleanup, not architecture.

## Highest-leverage next move

**Open the Vercel dashboard. Find the project currently aliased to `www.micahjonesconsulting.com` and `micahjonesconsulting.com`. Remove those aliases. Add them to the `micahjonesconsulting` (Color Worlds) project instead. Wait the ~30 seconds for DNS propagation. Re-`curl https://www.micahjonesconsulting.com/about` and confirm a 200 with `Operator, not consultant.` in the response body, plus `dpl_748xRKKAAqRQDKwy55DmT1GhSJLk` (or whatever the new latest deploy ID is) in the `data-dpl-id` html attribute.** Until this happens, nothing else in this review matters — every other fix lands in a deploy nobody can find through the canonical URL. After this lands, run a one-week post-mortem: how did the v0 prototype come to own the production hostname for the live portfolio? Add a deploy-verification check to CI that hits the canonical URL post-deploy and asserts the title contains "Micah Jones — Strategy and software" before marking the deploy healthy.
