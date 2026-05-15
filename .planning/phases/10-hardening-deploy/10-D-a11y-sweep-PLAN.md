# 10-D — Accessibility hardening sweep

**Covers:** A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-06, A11Y-07
**Depends on:** Phase 3 nav/footer, Phase 6 foyer pages
**Estimated effort:** 1 hour
**Files touched:** 2 layouts + globals.css

---

## Pre-flight

1. Confirm focus-ring CSS exists for nav (yes — `outline: 2px solid var(--color-accent-copper)` at globals.css:1036).
2. Confirm body-text emphasis uses `--accent-copper-deep` (yes — verified by grep in 10-RESEARCH.md §4.5).
3. Read existing `app/(foyer)/layout.tsx` and `app/(theater)/layout.tsx` to understand current structure.

---

## Changes

### 1. Add skip-to-content link to foyer layout

Edit `app/(foyer)/layout.tsx`:

```tsx
return (
  <div data-mode="foyer">
    <a href="#main-content" className="skip-to-content">
      Skip to content
    </a>
    <Nav variant="foyer" />
    <main id="main-content">{children}</main>
    <Footer />
  </div>
);
```

Note: `<main>` already exists per Phase 4; we add the `id="main-content"` attribute.

### 2. Add skip-to-content link + main wrapper to theater layout

Edit `app/(theater)/layout.tsx`:

```tsx
return (
  <div data-mode="theater">
    <a href="#main-content" className="skip-to-content">
      Skip to content
    </a>
    <Nav variant="theater" />
    <main id="main-content">{children}</main>
    <Footer />
  </div>
);
```

(Theater layout currently has no `<main>` wrapper. Add it.)

### 3. Append skip-to-content CSS to `app/globals.css`

CSS block per 10-RESEARCH.md §4.1:

```css
/* ============================================================
 * Skip-to-content link — A11Y-06
 *
 * Visible only when focused via keyboard. Tab from page top
 * focuses this first, before the nav.
 * ============================================================ */

.skip-to-content {
  position: absolute;
  top: 0;
  left: 0;
  padding: 12px 20px;
  background: var(--color-accent-copper-deep);
  color: var(--color-foyer-paper);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0 0 6px 0;
  transform: translateY(-100%);
  transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  z-index: 100;
}

.skip-to-content:focus,
.skip-to-content:focus-visible {
  transform: translateY(0);
  outline: 2px solid var(--color-foyer-paper);
  outline-offset: 2px;
}

[data-mode="theater"] .skip-to-content {
  background: var(--color-accent-copper);
  color: var(--color-theater-ground);
}

[data-mode="theater"] .skip-to-content:focus,
[data-mode="theater"] .skip-to-content:focus-visible {
  outline: 2px solid var(--color-theater-ink);
}

/* Reduced motion — kill the slide-in transition (focus is instant). */
@media (prefers-reduced-motion: reduce) {
  .skip-to-content {
    transition: none !important;
  }
}
```

Append at end of globals.css before the final `@media` block. The data-mode override variants come right after the base rule.

### 4. Add focus-ring to contact form inputs + submit (if not already covered)

Audit: read `app/(foyer)/contact/page.tsx` + the foyer form CSS in globals.css to confirm `:focus-visible` outline rule exists for `.contact-form__input` and `.contact-form__submit`. If not, append:

```css
.contact-form__input:focus,
.contact-form__input:focus-visible,
.contact-form__submit:focus,
.contact-form__submit:focus-visible {
  outline: 2px solid var(--color-accent-copper);
  outline-offset: 2px;
  border-color: var(--color-accent-copper-deep);
}
```

(Plan-time decision: append conditionally after the audit step.)

### 5. Run axe scan via Chrome DevTools MCP

After dev server is running:
- For each of 9 routes, run `mcp__chrome-devtools__navigate_page` → `mcp__chrome-devtools__evaluate_script` with a script that injects axe-core and reports violations. Or use the MCP's built-in audit affordance if available.
- Capture: every "serious" and "critical" violation per route.
- Target: zero.

If MCP doesn't expose an axe runner, document the manual check we used (Chrome DevTools Accessibility tab inspection per route) and the result.

### 6. `aria-label` audit (A11Y-07)

`grep -rE "aria-label=" --include='*.tsx' app/ components/` — confirm every match is on a decorative element (no visible text). Patch if any duplicate the visible text.

### 7. Image alt audit (A11Y-03)

`grep -rE "<(Image|img)" --include='*.tsx' app/ components/` — confirm every match has `alt=` (decorative = `alt=""`). Patch if missing.

### 8. Body emphasis audit (A11Y-04 / TOKEN-04)

Already verified — `var(--color-accent-copper)` only appears in non-body-text contexts in globals.css. Document the spot check in the verify output.

---

## Verification

1. `pnpm typecheck` + `pnpm build` clean.
2. Skip-to-content keyboard test: focus the address bar in dev, press Tab once — the link should slide down from the top. Press Enter — focus jumps to `#main-content`.
3. Axe scan: zero serious/critical violations across all 9 routes (captured in verification artifacts).
4. aria-label grep: zero duplicates of visible text.
5. Image alt grep: every `<Image>` and `<img>` has `alt=`.

---

## Rollback

The skip link and CSS are additive. The `id="main-content"` attribute is additive. Layout edits are surgical (3 lines each). Revert by removing the additions.
