# 10-E — Sage accent in ORDANI PullQuote

**Covers:** TOKEN-05 (closes the loop from Phase 8), supports blueprint §4b + §9
**Depends on:** Phase 7 PullQuote component, Phase 8 ORDANI MDX
**Estimated effort:** 15 minutes
**Files touched:** 3

---

## Pre-flight

1. Confirm sage `#5E7158` is in `brand.json.palette` (yes — entry `ordani-sage`).
2. Confirm `--color-ordani-sage` is defined in globals.css (yes — line 36).
3. Confirm `design-tokens.sh` hook exempts globals.css and brand.json palette values (yes — hook lines 7 + 13).

---

## Changes

### 1. Extend PullQuote API

Edit `components/PullQuote.tsx`:

Add `accentColor?: "copper" | "sage"` prop. Default `"copper"`. Pass through to the figure as `data-accent`.

```tsx
export interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
  /** Accent for the underline-grow bar. Defaults to copper. Sage is
   *  permitted ONLY inside /work/ordani (per blueprint §4b + TOKEN-05). */
  accentColor?: "copper" | "sage";
}

export function PullQuote({
  children,
  attribution,
  accentColor = "copper",
}: PullQuoteProps) {
  // ... existing implementation unchanged ...

  return (
    <figure
      ref={ref}
      className="case-study-pull-quote"
      data-in-view={inView ? "true" : "false"}
      data-accent={accentColor}
    >
      <blockquote className="case-study-pull-quote__quote">{children}</blockquote>
      {attribution ? (
        <figcaption className="case-study-pull-quote__attribution">
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
```

### 2. ORDANI MDX edit

Edit `content/work/ordani.mdx` line 57:

```mdx
<PullQuote attribution="beta user, name withheld" accentColor="sage">
```

(That's the only line change. The closing `</PullQuote>` and the quote text stay as-is.)

### 3. Append sage CSS rule to globals.css

Append in the case-study block (near the existing pull-quote rules around line 1330):

```css
/* Sage accent on PullQuote — permitted only inside /work/ordani per
   blueprint §4b + TOKEN-05. The MDX call site passes accentColor="sage";
   PullQuote.tsx forwards via data-accent="sage". */
[data-mode="theater"] .case-study-pull-quote[data-accent="sage"] .case-study-pull-quote__quote::after {
  background: var(--color-ordani-sage);
}
```

---

## Verification

1. `pnpm typecheck` clean.
2. `pnpm build` clean.
3. Dev server: navigate to `/work/ordani`, scroll to the PullQuote, observe sage underline-grow.
4. Other case studies (`/work/hr-equity-author`) still show copper underline-grow (default).
5. Frontmatter Zod still passes (no schema changes).
6. `design-tokens.sh` hook does not fire on the MDX edit (only hex literals trigger it; we used a prop value `"sage"`).

---

## Rollback

Three surgical edits. Revert each.
