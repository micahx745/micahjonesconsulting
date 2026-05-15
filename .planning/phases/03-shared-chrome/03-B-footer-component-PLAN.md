# Plan 03-B: Footer Component (mode-aware)

**Phase:** 03 Shared Chrome
**Requirements:** FOYER-10 (foyer footer with contact pointer + email + two-business-day reply promise) + roadmap success criterion #4 (footer mode-aware: `--rule-foyer` / `--rule-theater`)
**Depends on:** Phase 1 (color tokens `--rule-foyer`, `--rule-theater`, `--accent-copper-deep`, `--theater-ink` already in globals.css)
**Status:** Ready
**Estimated LOC:** 1 new TSX file (~25 lines) + ~50 lines appended to globals.css

---

## Goal

Ship `components/Footer.tsx` — minimal mode-aware Server Component carrying two paragraphs:
1. "I read every message and reply inside two business days." (promise line)
2. "Or write to me directly: hello@micahjonesconsulting.com" (email pointer)

Top rule color is mode-driven: foyer uses `--rule-foyer #D9D2C4`, theater uses `--rule-theater #2A2A30`. Email link is copper-deep on foyer (5.4:1 — passes AA per CLAUDE.md PITFALL B1) and theater-ink with copper underline on theater (theater-ink #EAE6DD on theater-ground #0D0D0F = 16.5:1, AAA).

---

## File Operations

### NEW: `components/Footer.tsx`

```tsx
// components/Footer.tsx
//
// Phase 3 — FOYER-10 + roadmap success criterion #4.
//
// Mode-aware footer carrying the two-business-day reply promise + email
// pointer. Mode awareness comes from ancestor [data-mode="foyer" | "theater"]
// (Phase 4 group layouts). Component carries data-footer-root so the rule
// color and ink color can flip per mode via CSS.
//
// Server Component — no interactivity beyond the mailto: link, which is a
// plain <a> (never goes through the router so no ViewTransitionLink needed).
//
// Source: blueprint §7 (Home footer wireframe), §8 (voice — first person,
//         specific numbers, no banned words), §4b (--rule-foyer / --rule-theater
//         color tokens), REQUIREMENTS.md FOYER-10.
export function Footer() {
  return (
    <footer data-footer-root aria-label="Site footer">
      <p className="footer-promise">
        I read every message and reply inside two business days.
      </p>
      <p className="footer-email">
        Or write to me directly:{" "}
        <a
          href="mailto:hello@micahjonesconsulting.com"
          className="footer-email-link"
        >
          hello@micahjonesconsulting.com
        </a>
      </p>
    </footer>
  );
}
```

### EDIT: `app/globals.css` — append Footer block AFTER the Nav block from Plan 03-A

```css

/* ============================================================
 * Footer — Phase 3 (FOYER-10)
 *
 * Mode-aware top rule + body type. Foyer uses --rule-foyer warm taupe;
 * theater uses --rule-theater near-obsidian. Email link uses
 * --accent-copper-deep on foyer (passes WCAG AA 5.4:1) and --theater-ink
 * on theater (16.5:1 AAA) with a copper underline as the accent affordance.
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
  opacity: 0.85;
}

[data-footer-root] .footer-email-link {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  transition: text-decoration-thickness var(--duration-hover) var(--ease-hover);
}

[data-footer-root] .footer-email-link:hover {
  text-decoration-thickness: 2px;
}

/* Foyer mode: warm taupe rule, soft ink body, copper-deep link */
[data-mode="foyer"] [data-footer-root] {
  border-top-color: var(--color-rule-foyer);
  color: var(--color-foyer-ink-soft);
}
[data-mode="foyer"] [data-footer-root] .footer-email-link {
  color: var(--color-accent-copper-deep);
}

/* Theater mode: near-obsidian rule, soft bone body, bone link with copper underline */
[data-mode="theater"] [data-footer-root] {
  border-top-color: var(--color-rule-theater);
  color: var(--color-theater-ink-soft);
}
[data-mode="theater"] [data-footer-root] .footer-email-link {
  color: var(--color-theater-ink);
  text-decoration-color: var(--color-accent-copper);
}

@media (prefers-reduced-motion: reduce) {
  [data-footer-root] .footer-email-link {
    transition: none !important;
  }
}
```

---

## Acceptance Criteria

1. `components/Footer.tsx` exists and exports a named function `Footer` (no props).
2. The `<footer>` root carries `data-footer-root` and `aria-label="Site footer"`.
3. Renders two `<p>` elements: the promise line and the email line.
4. Email link is `<a href="mailto:hello@micahjonesconsulting.com">` (NOT a `next/link` and NOT a `ViewTransitionLink`).
5. Promise text reads exactly: `I read every message and reply inside two business days.`
6. Email lead-in reads exactly: `Or write to me directly:` (with single trailing space before the link).
7. `app/globals.css` extended with the Footer block; Phase 2 + Plan 03-A blocks unchanged.
8. `pnpm typecheck` passes clean.
9. `pnpm build` passes clean — copy-lint sees no banned words in the footer prose (verified: "journey", "solutions", "empower" do not appear).
10. No `'use client'` directive.
11. No raw hex literals; all colors via `var(--color-*)`.
12. Top-rule colour differs between foyer and theater (verifiable via CSS rule presence).

---

## Verification

```bash
cd C:/Users/micah/Code/micahjonesconsulting
pnpm typecheck   # expect EXIT=0
pnpm build       # expect EXIT=0 with "[copy-lint] ✓ Scanned project. Zero banned-word findings."
```

Manual check: confirm the file count is exactly 1 new TSX (`components/Footer.tsx`) + the appended CSS block in `app/globals.css`.

---

## Banned-Word Pre-Audit

Cross-check against `lib/banned.ts` (30 entries) for every string written in this plan:

| String | Words flagged? |
|---|---|
| `I read every message and reply inside two business days.` | none |
| `Or write to me directly:` | none |
| `hello@micahjonesconsulting.com` | none |
| `Site footer` | none |

Notably the banned `journey` (singular) is not present; the word `business` is not banned (only `business-days` as a phrase is fine — banned list checks for `low-hanging fruit`, `circle back`, etc., not "business"). Em-dash count: 0 (uses plain colon `:`).

Voice rules (CLAUDE.md):
- First person: "I read every message and reply" — uses "I", not "we". PASS.
- Sentence length: "I read every message and reply inside two business days." = 11 words. PASS.
- Active voice: "I read", "I reply" — active. PASS.
- Specific numbers: "two business days" — named, specific. PASS.

---

## Out of Scope

- Importing Footer anywhere — Phase 4 group layouts.
- Visual verification of the mode-aware top rule — Phase 4 once layouts exist.
- Newsletter signup — explicitly out of scope per blueprint §13.
- Social links — explicitly out of scope per blueprint §13.
- Phone number — explicitly out of scope per blueprint §7.

---

## Forward References

- Phase 4 `(foyer)/layout.tsx` mounts `<Footer />` after `{children}`.
- Phase 4 `(theater)/layout.tsx` mounts `<Footer />` after `{children}` — same component, mode-driven via attribute selector.
- Phase 10 a11y review confirms WCAG AA on the link colors per CLAUDE.md PITFALL B1 (already audited above: 5.4:1 foyer, 16.5:1 theater — both pass).
