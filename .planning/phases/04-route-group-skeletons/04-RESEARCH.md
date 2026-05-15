# Phase 4: Route-Group Skeletons — Research

**Researched:** 2026-05-14
**Domain:** Route groups (`(foyer)`, `(theater)`) with shared layouts that stamp `data-mode`, plus the smallest possible stub pages that let the foyer↔theater 600ms cross-fade become *actually visible* in DevTools. First phase that closes the loop from "View Transitions wired in Phase 2" to "you can record the transition in Chrome DevTools Performance."
**Confidence:** HIGH (synthesis from blueprint §4d/§6/§7, ARCHITECTURE.md §3 + §6, REQUIREMENTS.md FOYER-01 + THEATER-01..03, CLAUDE.md mode rules, brand.json route allowlist, and the harness `mdx-frontmatter.sh` hook source).

---

## Summary

Phase 4 ships four files plus one MDX stub and deletes nothing else (Phase 1 already cleaned up `app/page.tsx` — verified). The architecture is **one root layout, two nested group layouts** — *not* multi-root — per ARCHITECTURE.md §3.1 and Pitfall 10.1. The choice is non-negotiable: multi-root would force a full page reload between groups, which kills the View Transition. Phase 4 implements the single-root pattern that Phase 2 already prepared for (`<ViewTransition>` from `react` wraps `{children}` in `app/layout.tsx`; `::view-transition-old/new(root)` keyframes exist in `app/globals.css`).

Each group layout is a Server Component that wraps `{children}` in a single `<div data-mode="foyer" | "theater">`. That `<div>` is the closest wrapper element the CSS `[data-mode="..."]` selectors target — switching groups changes the attribute value, which flips the body background between cream `#F5EFE4` and obsidian `#0D0D0F`. Because the snapshots are taken at the document root (`::view-transition-old(root)` and `::view-transition-new(root)`), the body background change *is* the cross-fade.

The four files Phase 4 writes:

1. **`app/(foyer)/layout.tsx`** — Server Component. Renders `<div data-mode="foyer"><Nav variant="foyer" />{children}<Footer /></div>`. No `'use client'`. No props beyond `{ children }`.
2. **`app/(foyer)/page.tsx`** — Stub home. Renders one `<main>` with the placeholder line "Foyer home (Phase 6 will replace)" plus a `<ViewTransitionLink href="/work/test-slug">` so we can navigate to theater and *see* the cross-fade. Phase 6 will replace this with the real Home composition.
3. **`app/(theater)/layout.tsx`** — Server Component. Renders `<div data-mode="theater"><Nav variant="theater" />{children}<Footer /></div>`.
4. **`app/(theater)/work/[slug]/page.tsx`** — Stub theater route. `async` Server Component. Awaits `params`, reads the slug, renders "Theater /work/{slug} (Phase 8 will replace)" plus a `<ViewTransitionLink href="/">` back to foyer. Phase 4 does NOT load MDX content yet — it confirms the route resolves and theater chrome paints, which is success criterion #5 from ROADMAP.

Plus one stub content file:

5. **`content/work/test-slug.mdx`** — Minimal frontmatter (`title`, `dek`, `role`, `tools`, `year`, `status`) per harness `mdx-frontmatter.sh` requirements. Phase 7 wires the real MDX loader; Phase 4 just makes the file exist so the slug resolves conceptually and the harness has something to validate when a future write tries to add it.

The `<Nav>` component (Phase 3) is mode-aware via the ancestor `[data-mode]` attribute Phase 4 stamps, so the foyer layout uses `variant="foyer"` and theater uses `variant="theater"` and CSS handles the styling flip. The `<Footer>` component (Phase 3) is mode-aware purely via CSS attribute selectors — no `variant` prop needed.

---

## User Constraints (from orchestrator prompt)

### Locked Decisions

- **Single root + nested group layouts.** ARCHITECTURE.md §3.1 + Pitfall 10.1 — multi-root kills the View Transition by forcing full page reload. Phase 1's `app/layout.tsx` is the only root; `(foyer)/layout.tsx` and `(theater)/layout.tsx` are children of it.
- **`data-mode` lives on a `<div>` inside each group layout** — not on `<html>`, not on `<body>` (both owned by the root layout). The CSS `[data-mode="foyer"] { background-color: var(--color-foyer-paper); }` rule in `app/globals.css` (Phase 1) already targets this.
- **Stub pages have ONE testable navigation each.** Foyer stub links to `/work/test-slug` (theater); theater stub links to `/` (foyer). The point of Phase 4 is to MAKE the cross-fade visible, so we need the links to exist.
- **Both stub pages use `<ViewTransitionLink>`** (Phase 2 component) — plain `<Link>` would skip the feature-detect that initiates `document.startViewTransition`.
- **Theater dynamic route signature: `async (props: { params: Promise<{ slug: string }> })`.** Next.js 15.2+ moved `params` to a Promise (per ARCHITECTURE.md §7.2 Pattern A reference). React 19.2 `await params` is the canonical access.
- **MDX stub has ALL required frontmatter fields.** The harness `mdx-frontmatter.sh` hook (verified at `~/Code/premium-web-harness/.../hooks/mdx-frontmatter.sh`) blocks any write to `content/work/*.mdx` missing `title`, `dek`, `role`, `tools`, `year`, or `status`. Phase 7 adds `titleCardWords` + `heroStill` via Zod, but Phase 4 only needs the harness-required six. Stub values per orchestrator prompt: `title: "Test"`, `dek: "Stub for Phase 4 route resolution test."`, `role: "Stub"`, `tools: ["Next.js"]`, `year: 2026`, `status: "stub"`.
- **`app/page.tsx` already gone.** `ls app/` confirms only `favicon.ico`, `globals.css`, `layout.tsx`. The route-group `(foyer)/page.tsx` will own `/` without conflict.

### Out of Scope for Phase 4

- Real Home content — Phase 6.
- Real case study content — Phase 8.
- `mdx-components.tsx` at repo root — Phase 7 (MDX infrastructure plan).
- `lib/case-studies.ts` (gray-matter + Zod loader) — Phase 7.
- `generateStaticParams` on `[slug]/page.tsx` — Phase 8 (needs the case-studies listing).
- `TitleCard` — Phase 5.
- Actually reading the MDX body and rendering it — Phase 7 wires `import()`, Phase 8 puts real content in.
- Routes other than `/` (foyer) and `/work/test-slug` (theater) — stub pages only.
- Mobile responsive composition — Phase 10 RESP-01.

---

## The Conflict-Path Question (and why there is no conflict)

ARCHITECTURE.md §10.6 ("Conflicting Route Paths in Groups") warns: if both `(foyer)/work/page.tsx` AND `(theater)/work/page.tsx` exist, both resolve to `/work` and Next.js throws a build error. Phase 4 does NOT trigger this:

- Foyer owns: `(foyer)/page.tsx` → resolves to `/`.
- Theater owns: `(theater)/work/[slug]/page.tsx` → resolves to `/work/[slug]`.
- No file at `(foyer)/work/page.tsx` (that's Phase 6).
- No file at `(theater)/work/page.tsx` either.

There is also no conflict at `/` because the legacy `app/page.tsx` has already been deleted in Phase 1 (verified by `ls app/`). Route groups strip the parentheses from the URL, so `(foyer)/page.tsx` becomes the canonical `/` handler.

If Phase 6 later adds `(foyer)/work/page.tsx` (Work index), that resolves to `/work` and does NOT conflict with `(theater)/work/[slug]/page.tsx` (which resolves to `/work/[slug]`). They are sibling routes at different specificity levels.

---

## Banned-Word + Hook Safety Audit (Pre-Write)

Confirmed safe against `lib/banned.ts` (30 words) for every string Phase 4 writes:

| String | Source | Banned? |
|---|---|---|
| `Foyer home (Phase 6 will replace)` | stub home text | no |
| `→ test theater transition` | stub home CTA | no |
| `Theater /work/{slug} (Phase 8 will replace)` | stub theater text | no |
| `← back to foyer` | stub theater CTA | no |
| `Test` | MDX `title` frontmatter | no |
| `Stub for Phase 4 route resolution test.` | MDX `dek` frontmatter | no |
| `Stub` | MDX `role` frontmatter | no |
| `Next.js` | MDX `tools[0]` frontmatter | no |
| `stub` | MDX `status` frontmatter | no |
| `stub` | MDX body content (single word) | no |

Banned-word substring check: none of `unlock`, `drive`, `leverage`, `elevate`, `synergy`, `transformative`, `game-changing`, `best-in-class`, `at the intersection of`, `seamless`, `seamlessly`, `cutting-edge`, `revolutionary`, `world-class`, `next-generation`, `holistic`, `robust`, `innovative`, `dive deep`, `circle back`, `low-hanging fruit`, `move the needle`, `make an impact`, `delight users`, `craft experiences`, `passionate about`, `obsessed with`, `journey`, `solutions`, `empower` appear in any string above. Em-dash count across all Phase 4 files: 0 (well under the 1-per-file cap).

The `(foyer)` and `(theater)` parentheses in file paths are *path syntax*, never appear in URLs or string literals, and are not in the banned list.

### Hook-by-hook pre-audit

| Hook | Status | Evidence |
|---|---|---|
| `copy-lint.sh` (write boundary) + `lib/copy-lint-cli.ts` (build) | EXPECTED PASS | All Phase 4 strings cross-checked above. The stub copy uses no banned words. The MDX body is a single word (`stub`), explicitly safe. |
| `font-license.sh` | EXPECTED PASS | No `next/font` imports added in Phase 4 — root `app/layout.tsx` (Phase 1+2) attaches fonts to `<html>` and they cascade. |
| `motion-discipline.sh` | EXPECTED PASS | No `cursor.*follow`, no `MouseFollower`, no `scroll-snap-type: y mandatory`, no `marquee`, no `font-mono` / `font-family: ui-monospace`, no `syncTouch: true`. No GSAP imports (still Phase 5). No new motion at all — Phase 4 piggybacks on the Phase 2 View Transition CSS. |
| `design-tokens.sh` | EXPECTED PASS | No raw hex literals introduced. The `data-mode` attribute lets Phase 1's `@theme` block (`--color-foyer-paper`, `--color-theater-ground`) cascade via the CSS attribute selectors that already exist in `app/globals.css` lines 71-79. |
| `mdx-frontmatter.sh` | EXPECTED PASS | The stub MDX has all six required fields per the harness hook source (verified at `~/Code/premium-web-harness/plugins/vertical-plugins/premium-web/hooks/mdx-frontmatter.sh` lines 9-10): `title`, `dek`, `role`, `tools`, `year`, `status`. The hook checks the first 30 lines for `^${field}:` — our frontmatter block is 8 lines and each field appears at column 0. |
| `image-budget.sh` | N/A | No images in Phase 4. |

---

## File Code (verbatim — what Phase 4 will write)

### File 1: `app/(foyer)/layout.tsx` (full file)

```tsx
// app/(foyer)/layout.tsx
//
// Phase 4 — FOYER-01.
//
// Foyer route group shared layout. Wraps every foyer route ('/', '/about',
// '/work-with-me', '/contact', '/work') in a single <div data-mode="foyer">
// which Phase 1's app/globals.css picks up via the
// [data-mode="foyer"] { background-color: var(--color-foyer-paper); color: var(--color-foyer-ink); }
// attribute selector. That cream-paper body color is one half of the
// foyer↔theater 600ms cross-fade — the browser snapshots ::view-transition-old(root)
// against this color when navigating into a theater route.
//
// Server Component. No 'use client'. <Nav> and <Footer> (Phase 3) are also
// Server Components; <ViewTransitionLink> nested inside <Nav> is the only
// client island in the foyer chrome.
//
// Source: ARCHITECTURE.md §3.1 + §3.3 (single root, group sets data-mode);
//         REQUIREMENTS.md FOYER-01; CLAUDE.md "Two modes" + "What not to do"
//         (no useTheme, no ThemeProvider).
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function FoyerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-mode="foyer">
      <Nav variant="foyer" />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

### File 2: `app/(foyer)/page.tsx` (full file)

```tsx
// app/(foyer)/page.tsx
//
// Phase 4 — stub home page. Resolves to "/" via the (foyer) route group
// (Next.js strips the parens from the URL).
//
// This is intentionally minimal: one line of placeholder copy plus one
// ViewTransitionLink to the theater stub so the foyer↔theater cross-fade
// becomes recordable in Chrome DevTools Performance. Phase 6 (Foyer Pages)
// replaces this file with the real Home composition (hero positioning
// sentence, full-bleed portrait, selected-work strip, About teaser, Work
// With Me teaser, Contact CTA — all per blueprint §7).
//
// Server Component. No data dependencies. No client state.
//
// Source: ROADMAP Phase 4 success criterion #1 + #2 (stub renders data-mode
//         foyer; click to /work/test-slug triggers visible 600ms cross-fade).
import { ViewTransitionLink } from "@/components/view-transition-link";

export default function FoyerHomePage() {
  return (
    <section>
      <p>Foyer home (Phase 6 will replace).</p>
      <p>
        <ViewTransitionLink href="/work/test-slug">
          → test theater transition
        </ViewTransitionLink>
      </p>
    </section>
  );
}
```

### File 3: `app/(theater)/layout.tsx` (full file)

```tsx
// app/(theater)/layout.tsx
//
// Phase 4 — THEATER-01 + THEATER-03 (Nav variant wiring).
//
// Theater route group shared layout. Wraps every theater route
// ('/work/[slug]') in a single <div data-mode="theater"> which Phase 1's
// app/globals.css picks up via:
//   [data-mode="theater"] { background-color: var(--color-theater-ground); color: var(--color-theater-ink); }
// That obsidian #0D0D0F body color is the other half of the foyer↔theater
// 600ms cross-fade — the browser snapshots ::view-transition-new(root)
// against this color when entering a theater route.
//
// Nav passes variant="theater" so the Phase 3 chrome flips to copper-on-obsidian
// with a single [BACK TO FOYER ↗] link. Footer is mode-aware via CSS attribute
// selectors (no prop needed).
//
// Server Component. No 'use client'.
//
// Source: ARCHITECTURE.md §3.1 + §3.3; REQUIREMENTS.md THEATER-01, THEATER-03;
//         CLAUDE.md "Two modes".
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function TheaterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-mode="theater">
      <Nav variant="theater" />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

### File 4: `app/(theater)/work/[slug]/page.tsx` (full file)

```tsx
// app/(theater)/work/[slug]/page.tsx
//
// Phase 4 — THEATER-02 (route resolves) + stub render.
//
// Phase 4 ships only the route handler skeleton — the dynamic segment
// resolves, the theater chrome paints, and a ViewTransitionLink takes the
// visitor back to foyer so the reverse cross-fade is also recordable in
// DevTools.
//
// Phase 7 (MDX Infrastructure) will replace this with the canonical reader
// that does `await import('@/content/work/${slug}.mdx')` and renders the MDX
// body. Phase 8 (Case Studies) adds `generateStaticParams` to prerender all
// four real case-study slugs at build.
//
// React 19.2 / Next.js 15.2+ moved `params` to a Promise per the App Router
// API contract — `await params` is the canonical access pattern.
//
// Source: ARCHITECTURE.md §7.2 Pattern A; REQUIREMENTS.md THEATER-02;
//         ROADMAP Phase 4 success criterion #5 (route resolves, theater
//         chrome paints — full render deferred to Phase 8).
import { ViewTransitionLink } from "@/components/view-transition-link";

export default async function TheaterCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <article>
      <p>Theater /work/{slug} (Phase 8 will replace).</p>
      <p>
        <ViewTransitionLink href="/">← back to foyer</ViewTransitionLink>
      </p>
    </article>
  );
}
```

### File 5: `content/work/test-slug.mdx` (full file)

```mdx
---
title: Test
dek: Stub for Phase 4 route resolution test.
role: Stub
tools: ["Next.js"]
year: 2026
status: stub
---

stub
```

Frontmatter field-by-field justification:

| Field | Value | Why |
|---|---|---|
| `title` | `Test` | Single capitalized word, no banned content. |
| `dek` | `Stub for Phase 4 route resolution test.` | One short sentence, no em-dash, no banned words. Source Serif 4 italic in Phase 7. |
| `role` | `Stub` | Phase 4 placeholder. Real case studies use phrases like "Engineering lead", "Product strategy". |
| `tools` | `["Next.js"]` | One-element YAML array. The harness hook only checks the field exists at column 0 — array shape is validated by Phase 7 Zod. |
| `year` | `2026` | Integer, current year. |
| `status` | `stub` | Plain string. Real case studies use `Private beta`, `Shipped`, `In flight` etc. |

The MDX body is the literal word `stub` so the file isn't empty (some MDX parsers warn on zero-content bodies). Phase 7 wires the renderer; Phase 4 just confirms the file exists and passes `mdx-frontmatter.sh`.

---

## Cross-Cutting Verification Plan

Phase 4 is the first phase where the foyer↔theater cross-fade transitions from *code-asserted* to *visually verifiable*. The verification has four levels:

### Level 1 — Compile + build

- `pnpm typecheck` succeeds (no type errors from the `params: Promise<{ slug: string }>` signature; Next.js 16.2 types support this natively).
- `pnpm build` succeeds, copy-lint passes, and the build output shows the new routes:
  - `○ /` (static, foyer)
  - `ƒ /work/[slug]` (dynamic, theater) — *or* static if Phase 4 adds `generateStaticParams` (we will not — that's Phase 8).

### Level 2 — Dev runtime

- `pnpm dev` starts cleanly on `localhost:3000`.
- Manual page load of `/` renders the foyer stub with cream background + foyer nav.
- Manual page load of `/work/test-slug` renders the theater stub with obsidian background + theater nav.
- DOM inspection confirms `<div data-mode="foyer">` exists under `<body>` on `/` and `<div data-mode="theater">` on `/work/test-slug`.

### Level 3 — View Transition recording

- Open Chrome DevTools → Performance panel.
- Start recording, click `→ test theater transition` link.
- Stop recording, look for a `View Transition` track entry roughly 600ms long.
- Repeat for the reverse navigation (`← back to foyer`).
- Confirm `<nav>` does NOT fade with the body — it stays solid across the 600ms (Phase 3 success criterion #3 + Phase 4 success criterion #4).

This is the first phase where the *blueprint's signature gesture* (the foyer↔theater 600ms dim, blueprint §4d) is actually visible. Up to Phase 3, the CSS + JS were wired but there were no two routes with different `data-mode` to navigate between.

### Level 4 — Chrome DevTools MCP (if available)

If the `chrome-devtools` MCP tools are available in this session, drive a programmatic verification:
1. Open a new page at `http://localhost:3000/`.
2. Take a screenshot — confirm cream background.
3. Click the test theater transition link.
4. Take a screenshot — confirm obsidian background.
5. Start a performance trace, click back-to-foyer, stop trace.
6. Inspect the trace for a `View Transition` track entry; if present, attach to `04-VERIFY-OUTPUT.md`.

If MCP is unavailable, document the manual verification steps in `04-VERIFY-OUTPUT.md` and mark the visual verification as MANUAL-PENDING (operator to run pnpm dev + DevTools record locally).

---

## Forward References

Phase 4 sets up the route tree that Phases 5-8 fill in:

- **Phase 5 (TitleCard)** will add a test route or sandbox that consumes `<TitleCard words={[...]} />`. The route group structure from Phase 4 means TitleCard demos can live at e.g. `(theater)/work/test-titlecard/page.tsx` and inherit theater chrome.
- **Phase 6 (Foyer Pages)** will replace `(foyer)/page.tsx` with the real Home and add `(foyer)/about/page.tsx`, `(foyer)/work-with-me/page.tsx`, `(foyer)/contact/page.tsx`, `(foyer)/work/page.tsx`. All inherit the `data-mode="foyer"` wrapper.
- **Phase 7 (MDX Infrastructure)** will add `mdx-components.tsx` at repo root, `lib/case-studies.ts` (gray-matter + Zod), and replace `(theater)/work/[slug]/page.tsx` with the canonical MDX reader.
- **Phase 8 (Case Studies)** will add the real `content/work/{ordani,hr-equity-author,passioneer,akamai}.mdx` files and add `generateStaticParams` so all four prerender at build. The `content/work/test-slug.mdx` stub from Phase 4 is then deleted (or kept as a smoke test — operator's choice; the cleanest move is to delete it).
- **Phase 10 (Hardening)** verifies the cross-fade still works on Vercel production, captures the visual baseline at 390/768/1440, and confirms `prefers-reduced-motion` neutralizes the 600ms animation to 0.001ms.

---

## What Could Go Wrong (and pre-emptive mitigation)

| Risk | Likelihood | Mitigation |
|---|---|---|
| Cross-fade fires but is imperceptible because both stubs have white background | Medium | The `[data-mode="..."]` selectors in `app/globals.css` lines 71-79 set the body background to cream/obsidian. The stub `<section>` and `<article>` do not override. The `<main>` element in each group layout inherits. Visual delta = `#F5EFE4 → #0D0D0F` = high contrast = obviously visible. |
| `<Nav>` flickers during the transition (anchor break) | Low | Phase 3 sets `style={{ viewTransitionName: "site-nav" }}` on `<nav>`. Phase 2 CSS `::view-transition-group(site-nav) { animation: none; }` keeps it visually static. Already verified at the CSS level; Phase 4 is the first time it's tested in flight. |
| `app/page.tsx` conflict | Already mitigated | `ls app/` confirms no `page.tsx` at the root. The `(foyer)/page.tsx` owns `/`. |
| `mdx-frontmatter.sh` rejects the stub MDX | Low | All six required fields present, each at column 0 within the first 30 lines (frontmatter is at lines 1-8). |
| `params` typed as the old non-Promise shape | Low | Next.js 16.2 declares `params: Promise<...>` as the type for dynamic segments — `await params` is required. Phase 4 uses the Promise shape. If type errors surface, the fix is a one-line signature change. |
| ViewTransitionLink doesn't fire because the user isn't on a real browser | N/A | Phase 4 is verified manually in a real browser. Headless test harnesses can be added in Phase 10. |
| Build adds a `/_not-found` route via Next.js default — does it conflict with route groups? | No | The `/_not-found` is owned by `app/not-found.tsx` (or generated by Next.js if absent). It does not collide with the foyer group or theater group. Phase 3 verify output already showed `○ /_not-found` in the build manifest cleanly. |

---

## Sources

All references verified May 2026.

- `~/Code/micahjonesconsulting/.planning/research/ARCHITECTURE.md` §3 (route groups), §4 (View Transitions), §7.2 (Pattern A — dynamic import for case studies), §10.1 (single-root anti-pattern), §10.6 (route conflicts in groups).
- `~/Code/micahjonesconsulting/.planning/REQUIREMENTS.md` lines 34, 47-49 (FOYER-01, THEATER-01, THEATER-02, THEATER-03 specs).
- `~/Code/micahjonesconsulting/.planning/ROADMAP.md` Phase 4 section (lines 86-96) — 5 success criteria.
- `~/Code/micahjonesconsulting/.planning/blueprint.md` §4d (600ms ease-in-out cross-fade), §6 (5-page IA), §7 (Home + ORDANI wireframes).
- `~/Code/micahjonesconsulting/.claude/CLAUDE.md` lines 5-8 (two modes), lines 39-53 (what not to do).
- `~/Code/micahjonesconsulting/.claude/brand.json` lines 8-21 (palette), line 67 (allowed routes).
- `~/Code/micahjonesconsulting/app/layout.tsx` (Phase 2 root layout with `<ViewTransition>` from `react`).
- `~/Code/micahjonesconsulting/app/globals.css` lines 71-79 (mode attribute selectors), lines 95-153 (View Transition CSS + reduced-motion kill-switch).
- `~/Code/micahjonesconsulting/components/Nav.tsx` (Phase 3, accepts `variant: "foyer" | "theater"`).
- `~/Code/micahjonesconsulting/components/Footer.tsx` (Phase 3, mode-aware via CSS only).
- `~/Code/micahjonesconsulting/components/view-transition-link.tsx` (Phase 2 client component).
- `~/Code/premium-web-harness/plugins/vertical-plugins/premium-web/hooks/mdx-frontmatter.sh` (required fields check).
- `~/Code/premium-web-harness/plugins/vertical-plugins/premium-web/hooks/copy-lint.sh` (banned-word write-boundary check).

---

*Researched: 2026-05-14 by gsd-researcher for Phase 4 plan-phase.*
