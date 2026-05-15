# Plan 04-A: Foyer Route Group + Stub Home

**Phase:** 04 Route-Group Skeletons
**Requirements:** FOYER-01 (route group `(foyer)` with shared `layout.tsx` stamping `data-mode="foyer"`)
**Depends on:** Phase 3 (`<Nav variant="foyer" />` and `<Footer />` exist); Phase 2 (`<ViewTransitionLink>` exists); Phase 1 (`[data-mode="foyer"]` CSS attribute selector in `app/globals.css`).
**Status:** Ready
**Estimated LOC:** 2 new TSX files (~25 + ~15 lines).

---

## Goal

Ship the foyer route group: `app/(foyer)/layout.tsx` (Server Component, stamps `data-mode="foyer"` on a wrapper `<div>`, mounts `<Nav variant="foyer" />` and `<Footer />`) and `app/(foyer)/page.tsx` (stub home with one `<ViewTransitionLink>` to `/work/test-slug` so the cross-fade is recordable in DevTools). No other foyer routes are created in this plan — `/about`, `/work-with-me`, `/contact`, `/work` are Phase 6.

`/` resolves to `app/(foyer)/page.tsx` because Next.js route groups strip parens from the URL. Phase 1's `ls app/` confirmed there is no legacy `app/page.tsx` to delete — the original placeholder was cleaned up during scaffold.

---

## File Operations

### NEW: `app/(foyer)/layout.tsx`

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

### NEW: `app/(foyer)/page.tsx`

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

---

## Acceptance Criteria

1. `pnpm typecheck` passes — no type errors on the layout or page signatures.
2. `pnpm build` passes — `[copy-lint] ✓ Scanned project. Zero banned-word findings.` and the route manifest shows `○ /` as a static prerender.
3. Visiting `/` in `pnpm dev` renders the placeholder text + the test theater transition link, with the cream foyer paper background applied by the `[data-mode="foyer"]` CSS rule.
4. The DOM under `<body>` shows `<div data-mode="foyer">` with `<nav>`, `<main>`, and `<footer>` as children.
5. No banned words from `lib/banned.ts` in either file.

---

## Hook Safety Confirmation

| Hook | Status | Reason |
|---|---|---|
| `copy-lint.sh` | PASS | Strings written: `Foyer home (Phase 6 will replace).`, `→ test theater transition`. None match the 30-word banned list. |
| `font-license.sh` | PASS | No font imports. |
| `motion-discipline.sh` | PASS | No cursor, no marquee, no scroll-snap-y-mandatory, no mono, no `syncTouch: true`. |
| `design-tokens.sh` | PASS | No raw hex literals. Background comes from `var(--color-foyer-paper)` via the `[data-mode="foyer"]` selector. |
| `mdx-frontmatter.sh` | N/A | No MDX files in this plan. |
| `image-budget.sh` | N/A | No images. |

---

## What This Plan Does NOT Do

- Does NOT create `/about`, `/work-with-me`, `/contact`, `/work` page files — Phase 6.
- Does NOT modify `app/layout.tsx`, `app/globals.css`, `components/Nav.tsx`, `components/Footer.tsx`, or any other existing file.
- Does NOT create the theater group — that's plan 04-B.
- Does NOT create `mdx-components.tsx` — Phase 7.
- Does NOT add `aria-current="page"` logic to nav — Phase 6 wires `usePathname()` per route.

---

## Commit Message

```
chore(phase-4/04-A): foyer route group + stub home

- app/(foyer)/layout.tsx — Server Component wraps {children} in
  <div data-mode="foyer"> with Nav variant="foyer" + Footer
- app/(foyer)/page.tsx — stub home with ViewTransitionLink to
  /work/test-slug for cross-fade recording in DevTools

FOYER-01 (route group stamps data-mode="foyer" on wrapper div).
```
