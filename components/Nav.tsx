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
//   variant="foyer"   → brand wordmark + 4 nav links + copper underline lift
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
