# Plan 03-A: Nav Component (foyer + theater variants)

**Phase:** 03 Shared Chrome
**Requirements:** FOYER-09 (foyer nav with copper underline lift) + roadmap success criterion #2 (theater nav variant) + criterion #3 (`viewTransitionName: "site-nav"` anchor)
**Depends on:** Phase 2 (`<ViewTransitionLink>` component exists; copper tokens defined in globals.css)
**Status:** Ready
**Estimated LOC:** 1 new TSX file (~55 lines) + ~85 lines appended to globals.css

---

## Goal

Ship `components/Nav.tsx` — a single Server Component with `variant: "foyer" | "theater"` prop. Foyer variant: brand wordmark "MICAH JONES" + four ViewTransitionLinks ("work", "about", "work with me", "contact") with a copper underline that lifts 4px on hover at `200ms cubic-bezier(0.2, 0.8, 0.2, 1)`. Theater variant: brand wordmark + single `[BACK TO FOYER ↗]` ViewTransitionLink. Both variants set `style={{ viewTransitionName: "site-nav" }}` on the `<nav>` element so the View Transitions API anchors the chrome through foyer↔theater cross-fade.

Mode awareness is driven by ancestor `[data-mode="foyer"]` / `[data-mode="theater"]` attribute (Phase 4 group layouts stamp this). Component carries `data-nav-root` so CSS rules in globals.css can scope narrowly. No React state, no `useTheme()`, no client boundary in this file — `<ViewTransitionLink>` carries its own `'use client'`.

---

## File Operations

### NEW: `components/Nav.tsx`

```tsx
// components/Nav.tsx
//
// Phase 3 — FOYER-09 + roadmap success criteria #2 + #3.
//
// Two variants share one component so the `viewTransitionName: "site-nav"`
// spatial anchor remains a single continuous reference frame across
// foyer↔theater navigation. Two separate components would render as two
// different element identities under the same view-transition name, which
// breaks the anchor (browser tries to swap unrelated old/new snapshots).
//
//   variant="foyer"  → brand wordmark + 4 nav links + copper underline lift
//   variant="theater" → brand wordmark + single [BACK TO FOYER ↗] CTA
//
// Mode-aware styling comes from ancestor [data-mode="..."] (Phase 4 layouts).
// This file sets data-nav-root so CSS in globals.css can target descendants
// without a React context.
//
// Server Component — no 'use client'. Bundle cost: zero beyond what
// ViewTransitionLink already adds.
//
// Source: blueprint §4d (200ms cubic-bezier hover), §7 (wireframe),
//         ARCHITECTURE.md §4.2 + §6.2.3 (viewTransitionName "site-nav"),
//         REQUIREMENTS.md FOYER-09 + ROADMAP Phase 3 success criteria.
import { ViewTransitionLink } from "@/components/view-transition-link";

type NavVariant = "foyer" | "theater";

const FOYER_LINKS = [
  { href: "/work", label: "work" },
  { href: "/about", label: "about" },
  { href: "/work-with-me", label: "work with me" },
  { href: "/contact", label: "contact" },
] as const;

export function Nav({ variant }: { variant: NavVariant }) {
  return (
    <nav
      data-nav-root
      data-variant={variant}
      style={{ viewTransitionName: "site-nav" }}
      aria-label="Primary"
    >
      <ViewTransitionLink href="/" className="nav-brand">
        MICAH JONES
      </ViewTransitionLink>

      {variant === "foyer" ? (
        <ul className="nav-links">
          {FOYER_LINKS.map(({ href, label }) => (
            <li key={href}>
              <ViewTransitionLink href={href} className="nav-link">
                {label}
              </ViewTransitionLink>
            </li>
          ))}
        </ul>
      ) : (
        <ViewTransitionLink href="/" className="nav-back-to-foyer">
          BACK TO FOYER ↗
        </ViewTransitionLink>
      )}
    </nav>
  );
}
```

### EDIT: `app/globals.css` — append Phase 3 chrome block

Append the following block AFTER the existing `@media (prefers-reduced-motion: reduce)` block at the end of the file. Do not edit any existing content.

```css

/* ============================================================
 * SHARED CHROME — Phase 3 (FOYER-09, anchor)
 *
 * Mode is driven by ancestor [data-mode="foyer" | "theater"] set by Phase 4
 * group layouts. Component itself carries data-nav-root.
 *
 * The copper underline lift hover transition uses 200ms cubic-bezier(0.2, 0.8, 0.2, 1)
 * per blueprint §4d. Active state (current page) leaves the underline at rest
 * with double thickness per FOYER-09.
 *
 * The view-transition-group(site-nav) rule keeps the nav anchored through
 * the 600ms foyer↔theater dim — without this, the browser would cross-fade
 * the nav too, breaking the spatial anchor the brand wordmark provides.
 * ============================================================ */

:root {
  --duration-hover: 200ms;
  --ease-hover: cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* Anchor: keep <nav> visually fixed through the foyer↔theater cross-fade */
::view-transition-group(site-nav) {
  animation: none;
  z-index: 100;
}
::view-transition-old(site-nav) { display: none; }
::view-transition-new(site-nav) { animation: none; }

/* ----- Nav: shared layout ----- */
[data-nav-root] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px var(--spacing-page-x-mobile);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  letter-spacing: 0.02em;
  text-transform: lowercase;
}

@media (min-width: 768px) {
  [data-nav-root] {
    padding: 32px var(--spacing-page-x-desktop);
  }
}

[data-nav-root] .nav-brand {
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

[data-nav-root] .nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

[data-nav-root] .nav-link,
[data-nav-root] .nav-back-to-foyer {
  display: inline-block;
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
  color: inherit;
}

/* Copper underline that lifts 4px on hover (blueprint §4d) */
[data-nav-root] .nav-link::after,
[data-nav-root] .nav-back-to-foyer::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: var(--color-accent-copper);
  transform: translateY(0);
  transition: transform var(--duration-hover) var(--ease-hover);
}

[data-nav-root] .nav-link:hover::after,
[data-nav-root] .nav-back-to-foyer:hover::after {
  transform: translateY(-4px);
}

/* Active state: copper underline solid, no lift (FOYER-09 explicit) */
[data-nav-root] .nav-link[aria-current="page"]::after {
  transform: translateY(0);
  height: 2px;
}

/* ----- Nav: foyer mode (cream paper, ink labels) ----- */
[data-mode="foyer"] [data-nav-root] {
  color: var(--color-foyer-ink);
}
[data-mode="foyer"] [data-nav-root] .nav-brand,
[data-mode="foyer"] [data-nav-root] .nav-link {
  color: var(--color-foyer-ink);
}

/* ----- Nav: theater mode (obsidian ground, copper brand + CTA) ----- */
[data-mode="theater"] [data-nav-root] {
  color: var(--color-accent-copper);
}
[data-mode="theater"] [data-nav-root] .nav-brand,
[data-mode="theater"] [data-nav-root] .nav-back-to-foyer {
  color: var(--color-accent-copper);
}

/* ----- Reduced motion: kill the hover transform; keep the affordance ----- */
@media (prefers-reduced-motion: reduce) {
  [data-nav-root] .nav-link::after,
  [data-nav-root] .nav-back-to-foyer::after {
    transition: none !important;
  }
  [data-nav-root] .nav-link:hover::after,
  [data-nav-root] .nav-back-to-foyer:hover::after {
    transform: none !important;
  }
}
```

---

## Acceptance Criteria

1. `components/Nav.tsx` exists and exports a named function `Nav` accepting `{ variant: "foyer" | "theater" }`.
2. The `<nav>` root carries `style={{ viewTransitionName: "site-nav" }}`, `data-nav-root`, `data-variant={variant}`, and `aria-label="Primary"`.
3. Foyer variant renders exactly four ViewTransitionLinks with labels `work`, `about`, `work with me`, `contact` to hrefs `/work`, `/about`, `/work-with-me`, `/contact`, plus the brand wordmark linking to `/`.
4. Theater variant renders the brand wordmark + a single `[BACK TO FOYER ↗]` ViewTransitionLink to `/`.
5. `app/globals.css` is extended with the Phase 3 chrome block; the existing Phase 2 view-transition keyframes + reduced-motion guard are unchanged.
6. `pnpm typecheck` passes clean.
7. `pnpm build` passes clean (copy-lint sees no banned words; TypeScript compiles).
8. No `'use client'` in `components/Nav.tsx`.
9. No raw hex literals in the new CSS block (all colors via `var(--color-*)`).
10. No `next/link` import in `Nav.tsx` — only `@/components/view-transition-link`.

---

## Verification

```bash
cd C:/Users/micah/Code/micahjonesconsulting
pnpm typecheck   # expect EXIT=0
pnpm build       # expect EXIT=0 with "[copy-lint] ✓ Scanned project. Zero banned-word findings."
```

Optional grep checks:
- `viewTransitionName` appears once in `components/Nav.tsx`
- `viewTransitionName` does NOT appear anywhere else under `components/` or `app/` yet (Phase 4 won't add it either — only the nav anchors)

---

## Out of Scope

- Importing Nav anywhere — Phase 4 group layouts.
- Visual verification of the 4px hover lift — Phase 4 once a real page exists.
- Active-link styling via `aria-current` runtime — Phase 6 when route-aware pages exist.
- Mobile hamburger / collapse — Phase 10 RESP-01.
- Scroll-aware hide-on-down — out of scope (would require `'use client'` per ARCHITECTURE.md §6.1).

---

## Forward References

- Phase 4 `(foyer)/layout.tsx` mounts `<Nav variant="foyer" />` and stamps `data-mode="foyer"`.
- Phase 4 `(theater)/layout.tsx` mounts `<Nav variant="theater" />` and stamps `data-mode="theater"`.
- Phase 4 verification confirms the `::view-transition-group(site-nav)` anchor works visually in DevTools.
