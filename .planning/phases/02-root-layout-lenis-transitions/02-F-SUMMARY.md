---
phase: 02-root-layout-lenis-transitions
plan: F
status: complete
completed: 2026-05-14
requirements:
  - TRANS-01
  - LENIS-01
  - ANALY-01
---

# 02-F root layout integration

## Outcome

Wired the four cross-cutting providers into `app/layout.tsx`: `<ViewTransition>` (from `react`), `<LenisProvider>` (from `@/components/LenisProvider`), `<Analytics />` (from `@vercel/analytics/next`), `<SpeedInsights />` (from `@vercel/speed-insights/next`). The body composition is exactly:

```tsx
<body>
  <LenisProvider>
    <ViewTransition>{children}</ViewTransition>
  </LenisProvider>
  <Analytics />
  <SpeedInsights />
</body>
```

## Imports added

```tsx
import { ViewTransition } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LenisProvider } from "@/components/LenisProvider";
```

## Order rationale

- **LenisProvider outermost** — intercepts scroll for the whole doc. If ViewTransition wrapped it, the snapshot machinery could break Lenis's RAF loop during navigation.
- **ViewTransition wraps {children}** — cross-fade activates on route nav. The `::view-transition-old(root)` / `::view-transition-new(root)` keyframes in `globals.css` (Plan 02-A) animate it.
- **Analytics + SpeedInsights are SIBLINGS** of LenisProvider — not nested inside ViewTransition, so they don't get caught in the cross-fade snapshot.

## Phase 1 preservation

- `metadata` export (title.default, title.template, description, metadataBase) byte-identical.
- `next/font` cascade (`${interDisplay.variable} ${inter.variable} ${sourceSerif.variable}`) preserved.
- `<html lang="en" suppressHydrationWarning className={...}>` unchanged.
- No `'use client'` directive added — root layout stays a Server Component (required for `metadata` export to work).
- `import "./globals.css"` preserved (loads @theme tokens + new view-transition keyframes).

## Subpath imports — critical

- `@vercel/analytics/next` (NOT `/react`) — defers script after hydration, ~30ms LCP win.
- `@vercel/speed-insights/next` (NOT `/react`) — same reason.
- `ViewTransition` from `react` (NOT `next`, NOT `react-dom`) — React 19 canary primitive.

## What this plan deliberately did NOT do

- Did NOT pass `name="root"` or `default="cross-fade"` props to `<ViewTransition>` (minimal surface per RESEARCH Open Question 4). If Phase 4 verification finds the transition doesn't fire, we'll add explicit naming then.
- Did NOT introduce a `<Providers>` wrapper — premature abstraction.
- Did NOT import `view-transition-link.tsx` — that's Phase 3 nav and Phase 6 foyer consumers.

## Verification

- `pnpm typecheck` passes clean.
- Grep: all required imports + JSX present; no wrong import paths (`/react` variants absent); no `'use client'` directive; Phase 1 metadata description preserved; placeholder `PHASE 2 will add` absent.

## REQ coverage

- **TRANS-01** — `<ViewTransition>` from `react` wraps `{children}`.
- **LENIS-01** — `<LenisProvider>` mounted at ROOT (not in a group layout) as outermost wrapper.
- **ANALY-01** — `<Analytics />` + `<SpeedInsights />` mounted at root via `/next` subpath imports.

## Forward-references

- Plan 02-G runs the build + dev verification (clean build, negative banned-word test, dev smoke).
- Phase 4 group layouts will stamp `data-mode="foyer"` / `data-mode="theater"` that drives the visible cross-fade between cream paper and obsidian ground.
- Phase 5 TitleCard will consume `useLenis` (re-exported from `@/components/LenisProvider`).
