# Plan 04-B: Theater Route Group + Stub Case-Study + Stub MDX

**Phase:** 04 Route-Group Skeletons
**Requirements:** THEATER-01 (route group `(theater)` with shared `layout.tsx` stamping `data-mode="theater"`); THEATER-02 (dynamic case-study route `/work/[slug]` that reads from `content/work/`); THEATER-03 (theater nav variant wired into the theater layout).
**Depends on:** Phase 3 (`<Nav variant="theater" />` and `<Footer />` exist); Phase 2 (`<ViewTransitionLink>` exists); Phase 1 (`[data-mode="theater"]` CSS attribute selector in `app/globals.css`). No dependency on plan 04-A — these plans are independent and can run in parallel.
**Status:** Ready
**Estimated LOC:** 2 new TSX files (~25 + ~30 lines) + 1 new MDX file (~10 lines).

---

## Goal

Ship the theater route group: `app/(theater)/layout.tsx` (Server Component, stamps `data-mode="theater"`, mounts `<Nav variant="theater" />` and `<Footer />`), `app/(theater)/work/[slug]/page.tsx` (async Server Component, awaits `params`, renders a stub with a back-to-foyer ViewTransitionLink), and `content/work/test-slug.mdx` (minimal frontmatter so the harness `mdx-frontmatter.sh` passes and the route is conceptually resolvable).

The dynamic page **does not yet load MDX** — that's Phase 7. Phase 4 only confirms:
1. The route resolves (`/work/test-slug` returns 200).
2. The theater chrome paints (obsidian body, copper nav, theater footer top rule).
3. The reverse-direction cross-fade fires when clicking back-to-foyer.

These are exactly the criteria in ROADMAP Phase 4 success #5: *"`(theater)/work/[slug]/page.tsx` reads a stub MDX file successfully (full case-study render deferred to Phase 8 — at this point the route resolves and the theater chrome paints)."*

---

## File Operations

### NEW: `app/(theater)/layout.tsx`

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

### NEW: `app/(theater)/work/[slug]/page.tsx`

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

### NEW: `content/work/test-slug.mdx`

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

**Frontmatter compliance with `mdx-frontmatter.sh`:** The harness hook (verified at `~/Code/premium-web-harness/plugins/vertical-plugins/premium-web/hooks/mdx-frontmatter.sh` lines 9-10) checks the first 30 lines for each of `title`, `dek`, `role`, `tools`, `year`, `status` at column 0. The frontmatter block above places each field at column 0 within lines 2-7 (well under 30). The Zod schema in Phase 7 will additionally require `titleCardWords` and an optional `heroStill` — those are deferred. Phase 4 only needs the harness six.

The body is the literal word `stub` so the file isn't empty (some MDX parsers warn on zero-body files). Phase 7 wires the renderer that actually reads this body; Phase 4 just makes the file pass the write-boundary check.

---

## Acceptance Criteria

1. `pnpm typecheck` passes — Next.js 16.2 accepts `params: Promise<{ slug: string }>` in the dynamic page signature.
2. `pnpm build` passes — copy-lint clean; route manifest shows `ƒ /work/[slug]` (dynamic SSR fallback because Phase 4 has no `generateStaticParams`; Phase 8 will add one).
3. `pnpm dev` serves `/work/test-slug` with obsidian background, copper-on-obsidian nav, `[BACK TO FOYER ↗]` link in nav, theater footer top rule (`--rule-theater #2A2A30`), and the stub copy `Theater /work/test-slug (Phase 8 will replace).`
4. The DOM under `<body>` shows `<div data-mode="theater">` with `<nav>`, `<main>`, and `<footer>` as children.
5. The MDX stub passes `mdx-frontmatter.sh` write-boundary check (no missing field error from the hook).
6. No banned words from `lib/banned.ts` in any of the three files.

---

## Hook Safety Confirmation

| Hook | Status | Reason |
|---|---|---|
| `copy-lint.sh` | PASS | Strings written across all 3 files: `Theater /work/{slug} (Phase 8 will replace).`, `← back to foyer`, MDX frontmatter values (`Test`, `Stub for Phase 4 route resolution test.`, `Stub`, `Next.js`, `2026`, `stub`), MDX body (`stub`). None match the 30-word banned list. Zero em-dashes across all three files. |
| `font-license.sh` | PASS | No font imports. |
| `motion-discipline.sh` | PASS | No cursor follower, no marquee, no scroll-snap, no mono, no `syncTouch: true`. |
| `design-tokens.sh` | PASS | No raw hex literals. Background comes from `var(--color-theater-ground)` via the `[data-mode="theater"]` selector. |
| `mdx-frontmatter.sh` | PASS | All 6 required fields (`title`, `dek`, `role`, `tools`, `year`, `status`) present at column 0 within the first 30 lines. |
| `image-budget.sh` | N/A | No images. |

---

## What This Plan Does NOT Do

- Does NOT call `import('@/content/work/${slug}.mdx')` in the page — Phase 7.
- Does NOT add `generateStaticParams` or `dynamicParams = false` — Phase 8.
- Does NOT create `mdx-components.tsx` — Phase 7.
- Does NOT create real case studies (`ordani.mdx`, `hr-equity-author.mdx`, etc.) — Phase 8.
- Does NOT modify `app/layout.tsx`, `app/globals.css`, `components/Nav.tsx`, `components/Footer.tsx`, or any Phase 1-3 file.
- Does NOT introduce a `(theater)/work/page.tsx` (Work index) — that's Phase 6, owned by foyer.

---

## Commit Message

```
chore(phase-4/04-B): theater route group + stub case-study + stub MDX

- app/(theater)/layout.tsx — Server Component wraps {children} in
  <div data-mode="theater"> with Nav variant="theater" + Footer
- app/(theater)/work/[slug]/page.tsx — async Server Component, awaits
  params, renders stub + back-to-foyer ViewTransitionLink
- content/work/test-slug.mdx — minimal frontmatter (6 harness-required
  fields) + 1-word body; Phase 7 wires the reader, Phase 8 replaces

THEATER-01 (data-mode="theater" wrapper) + THEATER-02 (dynamic slug
resolves) + THEATER-03 (theater nav variant wired).
```
