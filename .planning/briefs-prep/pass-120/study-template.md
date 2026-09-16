# Pass-120 facet map — study template + motion

Scope: every current file/rule behind `/work/[slug]`, the TitleCard signature motion, and the
theater-page scaffolding it renders inside. Read-only survey for Direction B (dark hero band →
paper body, settle entrance replacing the pinned stack). All quotes verbatim, all locations
`file:line` against the worktree at
`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`.

---

## 1. `app/(theater)/work/[slug]/page.tsx` (293 lines)

Server component. Render order (comment block lines 1–19, restated as shipped at lines 162–291):

1. `:163` `<article className="case-study" data-case={slug}>` — outer frame, `data-case` scopes
   `--case-accent` (referenced only in `PullQuote`/`case-study-still` accent fallback; no CSS rule
   currently sets `--case-accent` from `data-case` — it is a hook for a future per-case accent, not
   wired to a value anywhere in `app/globals.css`).
2. `:164-168` inline `<script type="application/ld+json">` — `ARTICLE_LD` (Article schema, built
   `:140-160` from `cs.title`, `cs.dek`, `startYear` regex-extracted from `cs.year`).
3. `:175` `<CaseStudyReadTracker slug={slug} />` — no visual output (see §5).
4. `:180` `<h1 className="sr-only">{cs.title}</h1>` — the only real `<h1>`; added in the 2026-08-11
   a11y audit because the TitleCard words are decorative spans.
5. `:198-205` `<TitleCard {...titleCardSchema.parse({...})} />` — the signature motion (see §2).
   Props built server-side: `words: cs.titleCardWords`, `caption: cs.indexLine ?? \`${cs.dek.split(". ")[0]}.\``,
   `heroSrc: cs.heroStill`, `heroAlt: cs.title`. Comment `:190-197` documents the 2026-08-15 swap
   from full-dek caption to `indexLine` (mobile-wordiness fix).
6. `:219-233` optional `<section className="case-study__glance" aria-label="Outcome at a glance">`
   — renders only `if (cs.stats && cs.stats.length > 0)`, a `<ul className="case-study__glance-list">`
   of up to 3 `{fig, lbl}` pairs from frontmatter `stats`.
7. `:235-275` `<div className="case-study__layout">` — the CSS grid (see §7 for exact columns):
   - `:236-253` `<header className="case-study__header">` containing only
     `<p className="case-study__header-meta-fallback case-study__meta">` (role · tools · year,
     mobile/no-JS fallback — desktop hides it, sidebar carries the meta instead).
   - `:256-262` optional `<CaseStudyStill>` if `cs.heroStill` is set.
   - `:267-269` `<div className="case-study__body"><MDXContent /></div>` — the compiled MDX body.
   - `:274` `<CaseStudySidebar role={cs.role} tools={cs.tools} year={cs.year} />` — grid column 3.
8. `:278-290` `<nav className="case-study__nav" aria-label="case study navigation">` — `[NEXT WORK ↘]`
   (via `getNextCaseStudy`, only if one exists) and `← back to home` (`href="/"`), both
   `<ViewTransitionLink>`.

Other exports:
- `:34-45` `generateStaticParams()` — filters `status !== "stub"` (comment `:36-41` records the
  Passioneer stub-404-blank-body regression this guards against).
- `:50` `export const dynamicParams = false;` — unknown slugs hit the real static `app/not-found.tsx`.
- `:58-66` `clampDescription(dek)` — meta/OG/Twitter description clamp: passthrough ≤155 chars;
  else last `". "` before char 156 if that cut is ≥100 chars in; else word-boundary cut at ≤152
  chars + `"..."` with trailing `,;:` stripped. Comment `:52-57` cites the old
  `slice(0,152)` bug that shipped `"...for North American en..."`.
- `:75-108` `generateMetadata()` — title = `cs.title` (root layout template appends `" — Micah Jones"`,
  comment `:72-74` warns against doing it twice); `openGraph.title`/`twitter.title` DO append
  `` `${cs.title} — Micah Jones` `` manually (so OG/Twitter cards carry the full brand, unlike
  `<title>`); canonical = `https://www.micahjonesconsulting.com/work/${slug}`.
- `:123` MDX body loaded via `await import(\`@/content/work/${slug}.mdx\`)`.

## 2. `app/(theater)/work/[slug]/opengraph-image.tsx` (122 lines)

`runtime = "nodejs"` (moved from edge because `lib/case-studies` uses `node:fs`, comment `:8`).
`size = {1200, 630}`. Reads real frontmatter via `getCaseStudyBySlug(slug).catch(() => null)`;
falls back to `FALLBACK = { words: ["MICAH","JONES"], caption: "Strategy and software, shipped by
the same pair of hands." }` (`:25-28`) if the slug lookup fails.

Hardcoded hex literals (Satori/`next/og` cannot read CSS vars — documented exception, comment
`:10-15`): `GROUND = "#12100E"`, `INK = "#ECE3D0"`, `INK_SOFT = "#A69B8A"`, `SAFFRON = "#C9982F"`
(`:44-47`). Renders: wordmark `MICAH/JONES` (`:64-73`), the word stack at `fontSize: words.length >
3 ? 76 : 92` (`:81`), then `(cs?.client ?? "CASE STUDY").toUpperCase()` in saffron (`:104`), then
caption = first sentence of `cs.dek` (`:40`). **Re-derives TitleCardComposition's visual system by
hand** (comment `:16-19` calls this out as acceptable per 05-RESEARCH §2.9) — a settle-entrance
redesign of TitleCard does NOT automatically change this file; it must be hand-edited to match if
the resolved-state look changes, and its hex literals must be re-diffed against any new theater
tokens.

## 3. `components/TitleCard.tsx` (165 lines) — every GSAP call, the pin, timings, reduced-motion

`'use client'`. Header comment `:1-24` states this is **the only file in the codebase that imports
gsap**, enforced by `scripts/gsap-quarantine-gate.mjs` (see §8).

- `:28-30` imports: `gsap`, `{ ScrollTrigger } from "gsap/ScrollTrigger"`, `{ useGSAP } from
  "@gsap/react"`.
- `:45` `gsap.registerPlugin(useGSAP, ScrollTrigger);` — module level (React 19 StrictMode
  double-mount guard, comment `:42-44`).
- `:49` `const PIN_DISTANCE_PX = 240;` — "Calibrated to feel like ~600ms at Lenis lerp 0.08."
- `:64-66` `useLenis(() => { ScrollTrigger.update(); });` — bridges Lenis's lerped scroll into
  ScrollTrigger's measurement loop (closes LENIS-04). No-ops when Lenis is short-circuited under
  reduced motion.
- `:68-158` the `useGSAP(() => {...}, { scope: rootRef })` callback:
  - `:72-74` `const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;` — read
    FIRST, before anything else.
  - `:82` `const mobile = window.matchMedia("(max-width: 767px)").matches;` — Pass-30 mobile fix.
  - `:87-92` queries `[data-tc-stack]`, `[data-tc-resolved]`, `[data-tc-caption]`, `[data-tc-hero]`
    by `data-*` attribute inside the `useGSAP` scope; bails (`return`) if stack/resolved/caption
    are missing (hero is optional).
  - **Mobile branch** `:94-100`: `if (mobile && !reduce)` — `gsap.set` all four nodes to their
    resolved-visible end state (opacity 1, y 0) and `return` — no pin, no ScrollTrigger at all
    under 768px.
  - **Reduced-motion branch** `:102-109`: `gsap.set(stack, {opacity:0, y:-16, pointerEvents:"none"})`,
    resolved/caption/hero → opacity 1 / y 0. No pin, no scrub.
  - **Normal (desktop, motion-on) path** `:111-155`:
    - `:113-116` initial `gsap.set` — stack opacity 1/y0, resolved opacity 0, caption opacity 0/y8,
      hero opacity 0.
    - `:122-131` `const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });`
      - `tl.to(stack, {opacity:0, y:-16, duration:0.5}, 0)`
      - `tl.to(resolved, {opacity:1, duration:0.4}, 0.05)`
      - `tl.to(caption, {opacity:1, y:0, duration:0.55}, 0.1)`
      - `tl.to(hero, {opacity:1, duration:0.65}, 0.18)` (only if `hero` exists)
    - `:141-150` `ScrollTrigger.create({ trigger: root, start: "top top", end: \`+=${PIN_DISTANCE_PX}\`,
      pin: true, pinSpacing: true, anticipatePin: 1, animation: tl, scrub: 0.3 })` — this IS the
      pin. `scrub: 0.3` ties timeline progress directly to scroll position (comment `:133-140`
      explains why `scrub` was chosen over `onEnter`: `onEnter` fired immediately at scrollY 0
      because `"top top"` was already satisfied on load).
  - `:155` `void trigger;` — no manual cleanup; `useGSAP`'s `gsap.context().revert()` handles
    teardown on unmount (comment `:152-154`, Pitfall C1).
- `:160-164` render: `<div ref={rootRef} className="title-card-root"><TitleCardComposition
  {...parsed} phase="stacked" /></div>` — always mounts with `phase="stacked"`; GSAP (or the CSS
  reduced-motion net) is what flips it visually.

**Mounting**: only ever imported by `app/(theater)/work/[slug]/page.tsx:22,198`. Not mounted on
`/work` (foyer index) or anywhere else — confirmed via `grep -rn "TitleCard" app components | grep -v Composition`
returning only the page.tsx import/usage and `TitleCard.tsx`/`TitleCardComposition.tsx` themselves.

### `components/TitleCardComposition.tsx` (111 lines) — the server-safe visual shell

No `'use client'`, no GSAP, no refs (comment `:1-34` explains the split: keeps GSAP quarantine
clean, lets `opengraph-image.tsx` and any future static consumer render the same structure). Prop
`phase: "stacked" | "resolved"` (default `"stacked"`) drives inline `style={{opacity}}` so SSR
matches whatever GSAP or the reduced-motion CSS will do (`:56-57`).

Structure:
- `:60-65` `<section data-title-card data-phase={phase} className="title-card relative w-full"
  aria-label={\`${words.join(" ")} — ${caption}\`}>`
- `:67-78` `<div data-tc-stack className="title-card-stack" style={{opacity: stackVisible}}
  aria-hidden={phase === "resolved"}>` — maps `words` to `<span className="title-card-word">`.
- `:81-107` `<div data-tc-resolved className="title-card-resolved" style={{opacity: resolvedVisible}}
  aria-hidden={phase === "stacked"}>` — `<p data-tc-caption className="title-card-caption">{caption}</p>`,
  then, only if `heroSrc`, `<div data-tc-hero className="title-card-hero"><img src={heroSrc}
  alt={heroAlt ?? ""} loading="eager" /></div>` (raw `<img>`, not `next/image` — comment `:94-98`
  says this is deliberate so the same composition renders in the Satori OG route; flagged as a
  possible future `next/image` swap "if PERF requires it").
- `:100-106` comment records that the old empty-bordered placeholder frame (shown when no
  `heroSrc`) was deleted 2026-08-11 — currently NOTHING renders in the hero slot when `heroStill`
  is absent (no placeholder card here, unlike `CaseStudyStill`'s NDA-specimen placeholder).

## 4. `components/CaseStudySidebar.tsx` (227 lines)

`'use client'`. Props `{ role, tools, year }`. Renders `<aside className="case-study__sidebar"
data-render="client" aria-label="Case study navigation">` (`:178-184`, `225-226`):
- TOC (`:68-97`): built on mount via `requestAnimationFrame`, scanning `.case-study__body h2`,
  slugifying (`:51-58`, lowercase/strip non-word/collapse spaces/slice 60) into ids, de-duped with
  a numeric suffix.
- Scrollspy (`:103-136`): `IntersectionObserver` with `rootMargin: "-30% 0px -60% 0px", threshold:
  [0,1]` (`:127-130`), picks the topmost intersecting heading.
- Reading-progress (`:141-155`): `useLenis` subscriber recomputes `--read-progress` custom property
  on the sidebar element every Lenis scroll tick from `.case-study__body`'s bounding rect; no-ops
  under reduced motion (Lenis short-circuited upstream).
- `:157-176` `handleTocClick` — `scrollIntoView({behavior: reduced ? "auto" : "smooth", block:
  "start"})` + `history.replaceState` to update the hash without navigating.
- `:208-223` `<dl className="case-study__sidebar-meta">` — Role / Scope (label for the `tools`
  frontmatter key — comment `:213-217` records the Pass-review rename from "Tools") / Year.

No-JS / pre-hydration note (`:22-25`): server renders empty TOC + progress; the page's
`.case-study__header-meta-fallback` covers that gap until hydration (see §7 CSS).

## 5. `components/CaseStudyReadTracker.tsx` (73 lines)

`'use client'`, returns `null` (no visual output, comment `:70-71`). `sessionStorage` key
`csrc:<slug>` dedupes; `THRESHOLD = 0.9` (`:25`); passive `scroll` listener computes
`(scrollY + innerHeight) / scrollHeight >= 0.9` and fires `trackCaseStudyReadComplete(slug)` once
(`:41-56`), also invoked once immediately on mount in case the page is shorter than the viewport
(`:63`). Reduced-motion is explicitly irrelevant here (comment `:15-17`, no animation).

## 6. `components/CaseStudyStill.tsx` (166 lines) / `components/PullQuote.tsx` (128 lines) / `components/Dek.tsx` (21 lines)

**`CaseStudyStill`** — server component, `next/image` when `src` present (`:108-116`,
`loading="lazy"`), else an "editorial specimen" placeholder (`:117-147`): mono eyebrow (prop
`placeholderEyebrow`, default `"Protected by NDA"`), display-weight `alt` text, optional formatted
date. Always renders a `.case-study-still__grain` overlay div (`:150`, CSS-only 4% film grain).
Caption (`:152-162`) renders ONLY `if (caption !== undefined && caption.trim() !== "")` — i.e. an
author-written caption, joined to the formatted date with a middot (`" · "`, `:160`; comment
`:154-158` records that an em-dash joiner here used to blow every photo-bearing study's one-em-dash
cap). `formatDate` (`:60-81`) turns `"YYYY-MM"`/`"YYYY-MM-DD"` into `"Mon YYYY"`.

**PullQuote** — `'use client'`. `IntersectionObserver` (`threshold: 0.4`, `:68-80`) sets
`data-in-view` on the `<figure>`; reduced-motion users get `data-in-view="true"` immediately with
no observer (`:56-63`). The underline is an inline SVG path (`:97-113`, `d="M 3 9 C 80 8, 200 10,
320 9 S 540 10, 720 9 S 920 8, 997 9"`, `pathLength={1}`, `stroke="var(--color-accent-copper)"`),
drawn via CSS `stroke-dashoffset` transition keyed off `[data-in-view="true"]` (see §7). Comment
`:9-15`/`:78-81` records this is a re-skin (D10, "hand-drawn" family) of the pre-existing
underline-grow gesture, not a new signature. `accentColor?: "copper" | "sage"` prop exists
(`:42`) but CSS comment at globals.css `:1078-1080` says the sage variant is retired — `data-accent="sage"`
currently falls through to the copper rule.

**Dek** — pure presentational, `<p className="case-study-dek">{children}</p>` (`:19`). Comment
`:1-11` notes it exists for possible future use but the case-study page (§1) no longer renders it
— the W1 pass removed the duplicate-lede `<Dek>` under the TitleCard; nothing in
`app/(theater)/work/[slug]/page.tsx` currently imports `Dek`.

## 7. `app/globals.css` — every `.case-study*` / theater rule, with line ranges (file is 7623 lines total)

Mode base:
- `168-171` `[data-mode="theater"] { background-color: var(--color-theater-ground); color:
  var(--color-theater-ink); }`

Atmosphere (theater grain + spotlight):
- `210-231` `[data-mode="theater"]::before` — two-layer feTurbulence data-URI grain,
  `background-size: 120px 120px, 180px 180px`, `opacity: 0.14`, `mix-blend-mode: screen`.
- `233-250` `[data-mode="theater"]::after` — radial "spotlight" gradient,
  `animation: theater-ambient-drift 34s ease-in-out infinite alternate`.
- `252-268` `@keyframes theater-ambient-drift`.
- `272-283` reduced-motion: `[data-mode="theater"]::before { opacity: 0.07; }`,
  `[data-mode="theater"]::after { animation: none; }`.

View Transitions (root cross-fade, shared by every route including theater):
- `302-308` `:root { --duration-mode-fade: 900ms; }` (comment `303-306`: Tier H stretched this from
  the originally-specified 600ms to 900ms for "cinematic pacing" — CLAUDE.md's "600ms ease-in-out"
  and brand.json's `view_transition` description are stale against live code here).
- `310-334` `::view-transition-old(root)` / `::view-transition-new(root)` fade animations +
  keyframes.
- `348-355` reduced-motion kill-switch: `animation-duration: 0.001ms !important` on
  `::view-transition-old/new(root)` and `::view-transition-group(*)`.
- `377-387` `::view-transition-group(site-nav)` anchor (nav does not cross-fade).

TitleCard visual/layout (motion-agnostic, GSAP only touches opacity/transform inline):
- `472-488` `[data-title-card]` base: `min-height: 52dvh` mobile / `128px` desktop padding.
- `490-495` `@media (min-width:768px) [data-title-card] { min-height: 100dvh; padding: 128px ...; }`
- `498-526` `.title-card-stack` / `.title-card-word` (`font-size: clamp(44px, 12vw, 64px)` mobile,
  `92px` desktop at `≥768px`).
- `538-552` grid-overlay fix: stack and resolved share `grid-area: 1 / 1` so neither can overflow
  the other (2026-08-11 audit fix, comment `528-537`).
- `557-566` `.title-card-caption` — `font-family: var(--font-cw-body)`, NOT Source Serif despite
  the `components/Dek.tsx` and older comments still calling it "Source Serif 4 italic"
  (`clamp(19px, 2.2vw, 22px)`).
- `568-583` `.title-card-hero` / `.title-card-hero img`.
- `590-604` reduced-motion CSS safety net: forces `[data-tc-stack]` opacity 0, `[data-tc-resolved]`/
  `[data-tc-caption]`/`[data-tc-hero]` opacity 1 with `!important`, independent of the JS check in
  TitleCard.tsx (belt-and-suspenders, comment `585-589`).
- `615-635` `@media (max-width: 767px)` — mobile static composition: `[data-title-card]` becomes
  `display:flex; flex-direction:column`, stack+resolved both forced `opacity:1 !important;
  transform:none !important`.
- `719-729` `.case-study .title-card-root` negative-margin full-bleed fix (undoes the outer
  `.case-study` page padding for the hero only).

`.case-study` article + layout grid:
- `702-710` `.case-study` padding (`0 mobile-x 128px`; `0 desktop-x 160px` at `≥768px`).
- `742-771` `.case-study__layout` — `grid-template-columns: 1fr` below `1024px`; at `≥1024px`:
  `minmax(0,1fr) minmax(0,64ch) 240px minmax(0,1fr)`, `column-gap: clamp(40px,5vw,72px)`. Header/
  still/body pinned to `grid-column: 2`; `.case-study__sidebar` to `grid-column: 3`, `grid-row: 1 /
  -1`, `position: sticky; top: 88px; align-self: start`.
- `776-803` `.case-study__header` margins + the `.case-study__header-meta-fallback` desktop-hide
  rule (double-class selector to outrank `.case-study__meta`'s own `display:flex`).
- `807-828` `.case-study-dek` (unused by the page currently, see §6) and `.case-study__meta` (mono,
  12px, `0.12em` tracking).
- `839-851` `@media (max-width:639px)` — meta line stacks vertically, dot separators hidden.
- `857-923` MDX body typography: `.case-study__body` (17px/1.7), `h2` (`clamp(28px,3.2vw,40px)`,
  `margin: clamp(96px,12vw,144px) 0 32px`), `h2::before` chapter-mark hairline (`width:56px;
  height:1px; background: var(--case-accent, var(--color-accent-copper))` — this is the one live
  consumer of `--case-accent`, which as noted in §1 is never actually set by anything keyed off
  `data-case`), `li::before { content:"—"; }`.
- `926-931` `.case-study-copper-rule` (unused by the page currently — no component renders this
  class; it is a documented-but-orphaned utility per the block comment at `690-695`).
- `934-1020` `CaseStudyStill` rules: `.case-study-still`, `__frame` (2px border, `overflow:hidden`),
  `__image`, `__placeholder` (the NDA specimen card), `__spec-eyebrow`/`__spec-title`/`__spec-date`,
  `__grain` (4% opacity data-URI noise, `mix-blend-mode: overlay`), `__caption`.
- `1022-1099` `PullQuote` rules: `.case-study-pull-quote` (Tier H "cinematic" treatment,
  `margin: clamp(120px,16vw,200px) 0`, top/bottom hairline rules), `__quote` (`font-family:
  var(--font-cw-display)`, `clamp(28px,3.6vw,40px)`), `__underline` positioning, `__underline path`
  (`stroke-dasharray:1; stroke-dashoffset:1; transition: stroke-dashoffset 1000ms cubic-bezier(0.22,
  0.8, 0.28, 1)` — comment `1069` records this is the D10 re-voice, was a 2000ms `scaleX` bar),
  `[data-in-view="true"] ... path { stroke-dashoffset: 0; }` (`1071-1076`), reduced-motion override
  at `1094-1099` (`transition:none !important; stroke-dashoffset:0 !important`).
- `1078-1080` comment: sage `PullQuote` variant retired, falls through to copper.
- `1101-1227` `CaseStudySidebar` rules: `.case-study__sidebar` (`display:none` below `1024px`,
  `--read-progress: 0` default), `-section`, `-label`, `-toc-frame`, `-progress` (+ `::after` scaleY
  fill), `-toc`/`-toc-link` (`[data-active="true"] { color: var(--color-cw-saffron); }`), `-meta`
  `dt`/`dd`.
- `1230-1281` `.case-study__nav` footer nav + `-link` hover-lift underline (`transform:
  translateY(-4px)` on hover, `transition var(--duration-hover) var(--ease-hover)`), reduced-motion
  override at `1274-1281`.
- `663-666` (inside the Pass-30 mobile-polish block) `@media (max-width:767px) [data-mode="theater"]
  .case-study__nav { margin-top: 56px; }` — a SECOND, narrower-breakpoint override of the nav's
  top margin than the one at `1230-1245`; both are live (cascade order: this one at line 663 comes
  first in the file but the `5124-5135` block below re-overrides again for `max-width:760px`).
- `5124-5135` a THIRD mobile block, "Case-study pages on mobile — same complaint, same cause":
  `@media (max-width:760px)`: `.case-study__layout { margin-top: 40px; }`, `.case-study__body h2 {
  margin-top: 56px; }`, `.case-study__nav { margin-top: 64px; }` — three separate breakpoint-760/767
  blocks now touch case-study spacing (`663-666`, `839-851`, `5124-5135`); a Pass-120 rebuild should
  consolidate rather than add a fourth.
- `6520-6575` `.case-study__glance` / `-list` (the "outcome at a glance" stat strip, §1 item 6):
  grid mirrors `.case-study__layout`'s 4-column desktop grid (`grid-column: 2 / 4` for the list at
  `≥1024px`), 3-column stat grid collapsing to 1 column at `≤600px`, `<strong>` at `clamp(34px,4vw,
  56px)` with `font-variant-numeric: tabular-nums`.
- `4295-4301` print stylesheet: `@media print { [data-mode="cw"], [data-mode="theater"], [data-mode="th"]
  { background: white !important; color: black !important; } ... }` (theater ground/ink neutralized
  for print; case-study-specific print rules were not found beyond this generic block — no
  `@media print` targeting `.case-study*` specifically).

Skip-link (shared, theater override only for focus-outline color):
- `1290-1329` `.skip-to-content` base + `[data-mode="theater"] .skip-to-content:focus` outline color.

## 8. `scripts/gsap-quarantine-gate.mjs` and its exceptions

Strips comments/strings correctly (handles template literals, dynamic `import()`, `require()`,
`export ... from`), then regex-matches any module specifier naming `gsap`, `gsap/<sub>`, or
`@gsap/<pkg>`. Self-tests via `--self-test` flag with a fixed positive/negative corpus (`:79-116`).
Scans roots `["app", "components", "lib", "content", "hooks"]` for
`.ts/.tsx/.js/.jsx/.mjs/.cjs` files (`:16-23`).

**`ALLOWLIST`** (`:26-30`, exactly two entries):
```
components/TitleCard.tsx
components/color-worlds/SplitReveal.tsx   // pre-existing exception, Pass-111a — "moving it off GSAP is its own arc, not a precedent"
```
A settle-entrance rewrite that keeps the animation inside `TitleCard.tsx` needs no gate change. If
the rewrite drops GSAP for pure CSS, `TitleCard.tsx` can be removed from `ALLOWLIST` (optional
cleanup, not required — an unused allowlist entry doesn't fail the gate).

## 9. `motion-discipline.sh` hook rules + `.claude/brand.json` `motion.banned`

`.claude/brand.json:160-166`:
```json
"banned": [
  "cursor.*follow|MouseFollower",
  "scroll-snap-type:\\s*y\\s+mandatory",
  "marquee|<Marquee",
  "font-mono|font-family:\\s*ui-monospace",
  "syncTouch:\\s*true"
]
```
(Did not locate a standalone `motion-discipline.sh` file in this worktree via `find . -iname
"motion-discipline*"` outside of `.claude/CLAUDE.md`'s prose references to it — the prose at
`.claude/CLAUDE.md:18` and `:36` describes its enforcement scope (cursor followers, scroll-jacking,
marquees, mono aesthetic, `syncTouch:true`) but the hook script itself was not found under this
worktree's `.claude/` or `scripts/`; it may live only in the harness install at
`~/Code/premium-web-harness` referenced in `.claude/CLAUDE.md:3`.)

## 10. `.claude/brand.json` `motion.signature` — verbatim (lines 138–143)

```json
"motion": {
  "signature": {
    "id": "title-card",
    "description": "Case-study hero title: 96px Inter Display 700+ pinned vertical word stack, GSAP scroll-resolve to caption + first still cross-fade. ~600ms hold.",
    "files": ["components/TitleCard.tsx", "app/globals.css"]
  },
```
Two drift notes against live code, both to fix when this entry is rewritten for the settle
entrance:
- "Inter Display" is stale — `lib/fonts.ts`/`.claude/CLAUDE.md` confirm Inter was removed at
  Pass-37; the live word-stack font is Bricolage Grotesque (`var(--font-display)`,
  `app/globals.css:505`).
- "96px" is stale — live desktop size is `92px` (`app/globals.css:524`, "W1: snapped to the D13
  display-92 step"); 96px only appears in the `app/globals.css:453-456` block-comment header, not
  in a live rule.

Also relevant, same file, `motion.view_transition` (`:144-148`) — the entry that documents the
foyer↔theater dim (used at every study entry): description still says "600ms ease-in-out" while
live `app/globals.css:307` sets `--duration-mode-fade: 900ms` — a second stale duration in the same
`motion` block that a Pass-120 brief should correct alongside the signature rewrite.

`motion.banned` is quoted in full in §9. `motion.figure` (WallChart, removed) and `motion.countup`
(home `$20M+`) are recorded for completeness but out of scope for the study template.

## 11. Tel Aviv photographs — every use (`grep -rn guardicore-telaviv`) + the sticker finding

| File | Line | Image | Context |
|---|---|---|---|
| `content/work/guardicore.mdx` | `:47` | `/guardicore-telaviv.jpg` | `<CaseStudyStill src="/guardicore-telaviv.jpg" width={1200} height={1448} alt="Working session with the Guardicore team around a table in Tel Aviv" />` — theater case-study body, step 03. |
| `app/(foyer)/work/page.tsx` | `:29-41` (comment), `:115` | `/guardicore-telaviv-session.jpg` | `/work` index lead-lot `<figure className="cw-lot__exhibit">`, `alt="A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses."`, caption `"Working session · Tel Aviv · 2018-2021"`. |
| `app/(foyer)/about/page.tsx` | `:129-143` | `/guardicore-telaviv-session.jpg` | `/about`, same frame, `className="cw-ab-fig__img"`, no caption. Comment `:131-133` says "Same frame as the /work exhibit; see that file's header for the crop and sticker-removal notes." |

Three source files exist in `public/`: `guardicore-telaviv.jpg` (122,837 bytes), 
`guardicore-telaviv-session.jpg` (61,991 bytes), `guardicore-telaviv-detail.jpg` (30,176 bytes,
the earlier too-tight crop that Pass-76 replaced — comment `app/(foyer)/work/page.tsx:29-32`
describes it but nothing currently imports it; `grep -rn "telaviv-detail"` finds only that
comment).

**Sticker finding (visually confirmed by opening the files):** `app/(foyer)/work/page.tsx:36-38`
documents that `guardicore-telaviv-session.jpg` had "the 'TEL AVIV, ISRAEL' location sticker...
cropped out, and a second Instagram sticker... patched with adjacent cloth" — and the live
`-session.jpg` file matches that description (no visible sticker). **`public/guardicore-telaviv.jpg`
— the file used on the actual theater case-study page via `content/work/guardicore.mdx:47` — was
NOT patched**: opening it shows the purple "📍 TEL AVIV, ISRAEL" Instagram location-sticker pill
still visible in the upper-left of the frame, plus a small red/white circular Instagram UI
artifact on the tablecloth near center-frame that was never removed. This is the file a Pass-120
study-template rebuild needs to either re-crop/re-patch or replace with the already-clean
`-session.jpg` frame before it renders larger on a paper/full-bleed study body per Direction B's
"Guardicore and ORDANI photographs get Snow Fall's job, a full-bleed chapter break" spec
(`.planning/reviews/FABLE-120-DESIGN.md:174-175`).

## 12. Design-doc cross-reference (`.planning/reviews/FABLE-120-DESIGN.md`)

For traceability, the settle-entrance spec this facet must support:
- `:147-151` "The full-fold pinned word stack goes. What stays is the cadence: the title's lines
  settle into place one after another on load, 600ms total, transform and opacity, once per load,
  finished frame without JS and under reduced motion. No scroll pin... `titleCardWords` in the
  frontmatter retires; the title is the words."
- `:356-360` (build-brief checklist) "Exact timings (≤600ms total, per-line offset, ease-out,
  transform and opacity only), once per load, reserved height so CLS stays under 0.05, the
  finished frame as the no-JS and reduced-motion render, GSAP still quarantined to the one file,
  and the brand.json `motion.signature` entry rewritten to describe it. `titleCardWords` removed
  from the frontmatter schema and the Zod validator."
- `:349-352` a new `data-surface="paper"` body-region override on a `data-mode="theater"` route is
  proposed for Direction B (dark hero band → paper body) — this does not exist anywhere in
  `app/globals.css` today; it is net-new.
