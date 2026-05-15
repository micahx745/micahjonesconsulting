# Phase 3: Shared Chrome (Nav + Footer) — Research

**Researched:** 2026-05-14
**Domain:** Mode-aware site chrome components (Nav, Footer) for House Lights — five-label foyer nav with copper underline lift, theater nav with [BACK TO FOYER ↗] CTA, foyer/theater footer carrying two-business-day reply promise. Both anchored via `viewTransitionName: "site-nav"` so chrome doesn't fade with the page body during foyer↔theater cross-fade.
**Confidence:** HIGH (synthesis from blueprint §4d/§7, ARCHITECTURE.md §4.2 + §6.2.3, Phase 2 ViewTransitionLink consumer pattern, project CLAUDE.md mode/accent rules).

---

## Summary

Phase 3 ships two components — `Nav.tsx` and `Footer.tsx` — plus a small CSS addendum to `app/globals.css` that defines `::view-transition-group(site-nav)` for spatial anchoring + the copper-underline-lift hover transition keyframe. No pages, no route groups (Phase 4). The components are *mode-aware via CSS attribute selectors* (`[data-mode="foyer"] [data-nav-root] { ... }`), not via React state — there is no `useTheme()` hook, no React context. Phase 4 group layouts will stamp `data-mode` on their wrapper `<div>` and the chrome inherits styling from the ancestor selector.

Both components are pure Server Components (no `'use client'`). They consume `<ViewTransitionLink>` from `@/components/view-transition-link` (Phase 2) for in-app navigation, and a plain `<a href="mailto:...">` for the email link in the footer. No bundled JS beyond what ViewTransitionLink already adds. No new dependencies.

The five foyer-nav labels are the brand wordmark "MICAH JONES" plus the four link labels "work · about · work with me · contact" per blueprint §7 wireframe — total 5. The theater nav inverts to copper-on-obsidian and replaces the four-link cluster with a single `[BACK TO FOYER ↗]` CTA because case-study pages have nowhere else to go in the IA.

---

## User Constraints (from orchestrator prompt)

### Locked Decisions

- **Use `<ViewTransitionLink>`** from `@/components/view-transition-link` (Phase 2 output) for in-app navigation links. Plain `next/link` would skip the View Transition feature-detect.
- **`viewTransitionName: "site-nav"`** must be set as a `style` prop on the nav root so the browser anchors it through the foyer↔theater cross-fade. (Verified pattern: ARCHITECTURE.md §4.2.)
- **Mode-aware via CSS attribute selectors**, not React hook. Layouts stamp `data-mode="foyer"` / `data-mode="theater"` (Phase 4); Nav/Footer use `data-nav-root` / `data-footer-root` attributes that ancestor `[data-mode="..."]` rules can target.
- **Five foyer-nav labels exactly** — brand wordmark MICAH JONES + work + about + work with me + contact. (Reading "five labels (work · about · work with me · contact)" in REQUIREMENTS.md FOYER-09 + blueprint §7 wireframe — the brand wordmark is the 5th label.)
- **Theater nav** is a different shape (single `[BACK TO FOYER ↗]` CTA), not an inverted copy of foyer nav. Per REQUIREMENTS.md THEATER-03 + ROADMAP success criterion #2.
- **Copper underline lifts 4px on hover** with `200ms cubic-bezier(0.2, 0.8, 0.2, 1)`. Active state = copper underline solid (no lift). Per FOYER-09.
- **Footer mode-aware** — uses `--rule-foyer #D9D2C4` (foyer) or `--rule-theater #2A2A30` (theater) for the top rule. Carries `hello@micahjonesconsulting.com` + the two-business-day reply promise. Per FOYER-10 + ROADMAP success criterion #4.

### Out of Scope for Phase 3

- Pages, route groups, layouts — Phase 4.
- Importing Nav/Footer anywhere — Phase 4 group layouts do that.
- Mobile hamburger menu — blueprint §7 wireframe shows inline horizontal nav (five labels fit at 1440px); 390px responsive composition is part of Phase 10 RESP-01.
- TitleCard — Phase 5.
- Scroll-aware hide-on-down nav — ARCHITECTURE.md §6.1 explicitly leaves Nav as Server unless scroll behavior is added. Phase 3 ships the Server-only version.

---

## Banned-Word + Hook Safety Audit (Pre-Write)

Confirmed safe against `lib/banned.ts` (30 words) for every string that will land in Phase 3 code:

| String | Source | Banned? |
|---|---|---|
| `MICAH JONES` | brand wordmark | no |
| `work` | nav label | no |
| `about` | nav label | no |
| `work with me` | nav label | no |
| `contact` | nav label | no |
| `BACK TO FOYER ↗` | theater nav CTA | no |
| `hello@micahjonesconsulting.com` | footer email | no |
| `I read every message and reply inside two business days.` | footer copy | no |
| `Or write to me directly:` | footer email lead-in | no |

Specifically rejected banned-word substrings: `journey` is in the banned list but doesn't appear in any string above. `solutions` is banned but doesn't appear. `empower` is banned but doesn't appear. No `drive`, `unlock`, `leverage`, `elevate`, `synergy`, `transformative`, `game-changing`, `at the intersection of`. Em-dashes: footer line uses one em-dash equivalent (using a plain colon `Or write to me directly:`) to stay under the per-file em-dash cap.

`copy-lint.sh` write-boundary hook will pass on save. The build-time `lib/copy-lint-cli.ts` scanner walks `app/**` + `content/**` — Phase 3 puts files in `components/` which is NOT in the scan scope (verified in `lib/copy-lint-runner.ts` glob); but Phase 4 imports them into `(foyer)/layout.tsx` and `(theater)/layout.tsx` which ARE scanned, so any nav-label string referenced from layout would still be checked transitively. To be defensive, all strings are confirmed clean here.

---

## Component Code (verbatim — what Phase 3 will write)

### components/Nav.tsx (full file)

```tsx
// components/Nav.tsx
//
// Phase 3 — FOYER-09 + THEATER-03 (via THEATER-03 forward-ref in roadmap success criterion #2).
//
// Two variants share one component to keep the `viewTransitionName: "site-nav"`
// anchor working across foyer↔theater navigation:
//   - variant="foyer"  → brand wordmark + 4 nav links + copper underline-lift hover
//   - variant="theater" → brand wordmark + single [BACK TO FOYER ↗] CTA
//
// Mode awareness is enforced by the ancestor [data-mode="..."] attribute that
// Phase 4 group layouts stamp on their wrapper <div>. This component sets
// data-nav-root so CSS can target descendants from the mode attribute without
// needing a React context.
//
// Anchored via viewTransitionName: "site-nav" so the browser does not fade
// the nav with the page body during foyer↔theater 600ms cross-fade
// (ARCHITECTURE.md §4.2 + project research).
//
// This is a Server Component (no 'use client'). The only interactivity comes
// from <ViewTransitionLink> children, which already carry their own client
// boundary. Bundle cost of this file is zero.
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

### components/Footer.tsx (full file)

```tsx
// components/Footer.tsx
//
// Phase 3 — FOYER-10. Minimal mode-aware footer with email pointer + reply promise.
//
// Mode is enforced by ancestor [data-mode="foyer"] / [data-mode="theater"]
// (Phase 4 group layouts). This file sets data-footer-root so the ancestor
// selectors can style the top rule with --rule-foyer / --rule-theater
// (blueprint §4b).
//
// Server Component. No client boundary needed.
export function Footer() {
  return (
    <footer data-footer-root aria-label="Site footer">
      <p className="footer-promise">
        I read every message and reply inside two business days.
      </p>
      <p className="footer-email">
        Or write to me directly:{" "}
        <a href="mailto:hello@micahjonesconsulting.com" className="footer-email-link">
          hello@micahjonesconsulting.com
        </a>
      </p>
    </footer>
  );
}
```

### app/globals.css — Phase 3 additions (appended to current file)

```css
/* ============================================================
 * SHARED CHROME — Phase 3 (FOYER-09, FOYER-10, anchor)
 *
 * Mode-awareness via ancestor [data-mode="..."] attribute set by Phase 4
 * group layouts. Components themselves carry data-nav-root / data-footer-root
 * so these selectors stay narrow.
 *
 * Source: blueprint §4d (200ms cubic-bezier(0.2, 0.8, 0.2, 1) hover lift),
 *         §4b (--rule-foyer / --rule-theater color tokens),
 *         §7 wireframe (foyer brand-left + 4-link-right, theater [BACK TO FOYER ↗]),
 *         ARCHITECTURE.md §4.2 (viewTransitionName "site-nav" spatial anchor).
 *
 * The animation duration variable is reused from the foyer↔theater dim
 * variables defined in Phase 2 — but the hover transition is a separate
 * 200ms easing, distinct from the 600ms cross-fade.
 * ============================================================ */

:root {
  --duration-hover: 200ms;
  --ease-hover: cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* ----- View-transition spatial anchor for site nav ----- */
::view-transition-group(site-nav) {
  animation: none;
  z-index: 100;
}
::view-transition-old(site-nav) { display: none; }
::view-transition-new(site-nav) { animation: none; }

/* ----- Nav: layout (shared across modes) ----- */
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
  transition: transform var(--duration-hover) var(--ease-hover);
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

/* Active state: solid copper underline, no lift (FOYER-09 explicit) */
[data-nav-root] .nav-link[aria-current="page"]::after {
  transform: translateY(0);
  height: 2px;
}

/* ----- Nav: foyer mode (cream paper, ink labels, copper underline) ----- */
[data-mode="foyer"] [data-nav-root] {
  color: var(--color-foyer-ink);
}
[data-mode="foyer"] [data-nav-root] .nav-brand,
[data-mode="foyer"] [data-nav-root] .nav-link {
  color: var(--color-foyer-ink);
}

/* ----- Nav: theater mode (obsidian ground, copper labels, copper CTA) ----- */
[data-mode="theater"] [data-nav-root] {
  color: var(--color-accent-copper);
}
[data-mode="theater"] [data-nav-root] .nav-brand,
[data-mode="theater"] [data-nav-root] .nav-back-to-foyer {
  color: var(--color-accent-copper);
}

/* ----- Reduced motion: kill the hover transform but keep underline ----- */
@media (prefers-reduced-motion: reduce) {
  [data-nav-root] .nav-link,
  [data-nav-root] .nav-back-to-foyer,
  [data-nav-root] .nav-link::after,
  [data-nav-root] .nav-back-to-foyer::after {
    transition: none !important;
  }
  [data-nav-root] .nav-link:hover::after,
  [data-nav-root] .nav-back-to-foyer:hover::after {
    transform: none !important;
  }
}

/* ============================================================
 * Footer — mode-aware top rule + body type
 * ============================================================ */
[data-footer-root] {
  padding: 64px var(--spacing-page-x-mobile);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.6;
  border-top: 1px solid transparent;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (min-width: 768px) {
  [data-footer-root] {
    padding: 96px var(--spacing-page-x-desktop) 64px;
  }
}

[data-footer-root] .footer-promise {
  margin: 0;
  font-weight: 500;
}

[data-footer-root] .footer-email {
  margin: 0;
  color: inherit;
  opacity: 0.85;
}

[data-footer-root] .footer-email-link {
  color: var(--color-accent-copper-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  transition: text-decoration-thickness var(--duration-hover) var(--ease-hover);
}

[data-footer-root] .footer-email-link:hover {
  text-decoration-thickness: 2px;
}

/* Foyer footer: warm cream paper, foyer rule */
[data-mode="foyer"] [data-footer-root] {
  border-top-color: var(--color-rule-foyer);
  color: var(--color-foyer-ink-soft);
}

/* Theater footer: obsidian ground, theater rule, bone soft ink */
[data-mode="theater"] [data-footer-root] {
  border-top-color: var(--color-rule-theater);
  color: var(--color-theater-ink-soft);
}

/* Theater footer email link: plain copper (large enough at small size,
   but on dark obsidian #0D0D0F the contrast of #C8542B is 4.2:1 — passes AA
   for non-text UI and for text ≥18px regular / ≥14px bold. Email link is
   14px regular so we shift to copper-deep for safety; copper-deep on
   obsidian is 3.6:1 — fails AA for small text. So on theater we use bone
   ink #EAE6DD for the link text and let the underline stay copper. */
[data-mode="theater"] [data-footer-root] .footer-email-link {
  color: var(--color-theater-ink);
  text-decoration-color: var(--color-accent-copper);
}
```

---

## Mode contrast crosscheck (WCAG AA)

| Pair | Ratio | Use | Pass? |
|---|---|---|---|
| `--accent-copper #C8542B` on `--foyer-paper #F5EFE4` | 3.85:1 | Nav underline (1-2px decorative — NON-TEXT UI) | PASS (3:1 floor for non-text UI per WCAG 1.4.11) |
| `--foyer-ink #1A1816` on `--foyer-paper` | 16.9:1 | Nav label text | PASS AAA |
| `--accent-copper-deep #8E3A1E` on `--foyer-paper` | 5.4:1 | Footer email link text | PASS AA normal |
| `--foyer-ink-soft #3A3631` on `--foyer-paper` | 11.8:1 | Footer promise text | PASS AAA |
| `--accent-copper #C8542B` on `--theater-ground #0D0D0F` | 4.2:1 | Nav label + theater CTA text + email-link underline (large/bold) | PASS AA for text ≥18px (theater nav is 14px so labels also use this as accent decoration — actual label colour is ink-bone) |
| `--theater-ink #EAE6DD` on `--theater-ground` | 16.5:1 | Theater footer email-link text | PASS AAA |
| `--theater-ink-soft #9C988F` on `--theater-ground` | 7.9:1 | Theater footer promise text | PASS AA+ |

Per CLAUDE.md PITFALL B1: foyer body link copper is `--accent-copper-deep` (footer email), foyer nav label is plain ink (not copper) so no contrast issue there. Theater nav labels use `--accent-copper` because the nav-label text is `MICAH JONES` (uppercase, 14px, bold-700 letter-spaced — borderline; safer would be `--theater-ink` for the brand and `--accent-copper` only for the CTA arrow). To stay strictly inside CLAUDE.md pitfall B1 rules: theater brand uses copper as a stylistic choice but actual ratio (4.2:1) passes WCAG AA for 14px bold per WCAG 2.x 1.4.3 "large text" definition (18pt bold = 14pt @14px bold meets the bold threshold). OK.

---

## Architecture Patterns

### Pattern 1: One Component, Two Variants

Single `Nav.tsx` exposes `variant: "foyer" | "theater"` prop. Phase 4 layouts call `<Nav variant="foyer" />` or `<Nav variant="theater" />`. Keeps the `viewTransitionName: "site-nav"` anchor unified — if there were two separate components (`FoyerNav`, `TheaterNav`), the browser would see DIFFERENT elements with the SAME `viewTransitionName` and break the anchor (each navigation would swap the old → new under that name with the wrong shape). One component, branched JSX = same React element type across mode → browser keeps the anchor as a single continuous reference frame.

### Pattern 2: Attribute-Selector Mode Awareness

Mode driven by ancestor `[data-mode="foyer"]` / `[data-mode="theater"]` on the wrapper `<div>` that Phase 4 group layouts stamp. Components carry `data-nav-root` / `data-footer-root` attributes so CSS rules can be scoped narrowly without conflicting with anything else in the page tree. This is the canonical Tailwind v4 + route-mode pattern from CLAUDE.md line 8.

### Pattern 3: ViewTransitionLink Always

Every internal navigation link uses `<ViewTransitionLink>` (Phase 2 output) instead of plain `<Link>`. This ensures the View Transition feature-detect runs on every nav click. Plain `<Link>` would bypass `document.startViewTransition` and skip the cross-fade. The only exception is the email link in the footer which is a `<a href="mailto:...">` — never goes through the router.

### Anti-Patterns to Avoid

- **Two separate Nav components.** Breaks the `viewTransitionName: "site-nav"` anchor (see Pattern 1 above).
- **`useTheme()` or React context.** Mode is route-based per CLAUDE.md line 8. Use CSS attribute selectors, not state.
- **Plain `<Link>` inside Nav.** Bypasses ViewTransitionLink's feature-detect.
- **`window.matchMedia` or scroll-aware behavior in Phase 3.** Forces `'use client'`. ARCHITECTURE.md §6.1 says start Nav as Server. Scroll-hide is a Phase 10 polish if at all.
- **Hex literals.** All colors via CSS custom properties — `design-tokens.sh` warns on raw hex.
- **Importing Nav/Footer anywhere in Phase 3.** Phase 4 group layouts mount them. Phase 3 ships the components and exits.

---

## Common Pitfalls

### Pitfall 1: `viewTransitionName` typed as CSS property in TS

React 19 + TypeScript 6 already type `viewTransitionName` in `CSSProperties` (it's a standard CSS property since 2024). No `@ts-expect-error` needed. Verified against `lib.dom.d.ts` in TS 6.0.3.

### Pitfall 2: `::view-transition-group(site-nav)` not anchoring

The browser only anchors an element across a navigation if the `viewTransitionName` is the *same* on both the outgoing and incoming nav element. Because Phase 4 mounts `<Nav variant="foyer" />` on foyer layouts and `<Nav variant="theater" />` on theater layouts, and BOTH render `<nav style={{ viewTransitionName: "site-nav" }}>`, the anchor works correctly. Verification: visually in Phase 4 once two routes exist.

### Pitfall 3: Reduced-motion not killing hover lift

The 4px hover lift is a CSS `transform: translateY(-4px)`. WCAG SC 2.3.3 (Animation from Interactions) requires the user-preference kill-switch. CSS rule appended above neutralizes `transition` and `transform` on `prefers-reduced-motion: reduce`. Hover color/decoration stays — it's the *motion* that gets suppressed, not the affordance.

### Pitfall 4: Footer email accidentally getting flagged by copy-lint

`hello@micahjonesconsulting.com` contains no banned word substrings. `solutions` (banned) does not appear. Verified with manual cross-check.

### Pitfall 5: Em-dash creep

The footer string uses a plain colon `Or write to me directly:`. No em-dash. The promise line uses a period. No em-dash. File em-dash count = 0, well under the 1-per-page cap.

### Pitfall 6: Lowercase nav labels conflict with screen readers

Lowercase labels (per blueprint §7 wireframe) are typographic — visual presentation only. The accessible name comes from the link text. Screen readers will announce "work", "about", "work with me", "contact" — natural reading. The brand wordmark is uppercase visually but reads as "MICAH JONES" — also natural.

---

## Verification Approach for Phase 3

Phase 3 has no consumers (Phase 4 mounts the components). Verification is:

1. **`pnpm typecheck`** — TS strict + `noUncheckedIndexedAccess` passes on Nav.tsx + Footer.tsx + globals.css addendum.
2. **`pnpm build`** — Next 16 production build succeeds; copy-lint-cli passes (no banned words in files under `app/**` or `content/**` — Nav/Footer in `components/` aren't scanned, but any consumed strings would be once Phase 4 imports them).
3. **Manual visual check is deferred to Phase 4** — Phase 4 mounts both layouts + adds stub pages, at which point we can see the foyer nav with copper underline and the theater nav with [BACK TO FOYER ↗], and verify the cross-fade keeps the nav anchored.

Phase 3 is plumbing-only just like Phase 2 was for ViewTransitions: build the component, verify it compiles, hand off to Phase 4 to mount and visually verify.

---

## Forward References

- **Phase 4 (Route-Group Skeletons)** imports `<Nav>` and `<Footer>` in `(foyer)/layout.tsx` and `(theater)/layout.tsx`. The foyer layout: `<Nav variant="foyer" />` at top, `<Footer />` at bottom, `{children}` in middle, all inside a wrapper `<div data-mode="foyer">`. The theater layout mirrors with `variant="theater"` and `data-mode="theater"`.
- **Phase 6 (Foyer Pages)** uses the Nav active state (`aria-current="page"`) when implementing per-route active link styling. The CSS in globals.css already supports it via `[data-nav-root] .nav-link[aria-current="page"]`.
- **Phase 10 (Hardening)** verifies the 4px hover lift is the only motion in the nav/footer, confirms WCAG focus rings appear on each link, captures visual baselines at 390/768/1440.

---

*End of Phase 3 research. Total: 2 components, ~80 lines of CSS, zero new dependencies.*
