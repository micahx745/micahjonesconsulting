---
phase: 02-root-layout-lenis-transitions
plan: F
type: execute
wave: 2
depends_on:
  - 02-A
  - 02-B
  - 02-C
  - 02-D
  - 02-E
files_modified:
  - app/layout.tsx
autonomous: true
requirements:
  - TRANS-01
  - LENIS-01
  - ANALY-01
must_haves:
  truths:
    - "app/layout.tsx imports ViewTransition from 'react' (NOT from 'next', NOT from 'react-dom')."
    - "app/layout.tsx imports LenisProvider from '@/components/LenisProvider'."
    - "app/layout.tsx imports Analytics from '@vercel/analytics/next' (NOT '@vercel/analytics/react' — the /next subpath defers script after hydration)."
    - "app/layout.tsx imports SpeedInsights from '@vercel/speed-insights/next' (same reason)."
    - "The body composition is exactly <LenisProvider><ViewTransition>{children}</ViewTransition></LenisProvider><Analytics /><SpeedInsights /> — order matters: LenisProvider outermost (intercepts scroll for whole doc); ViewTransition wraps children (activates cross-fade on route change); Analytics + SpeedInsights are SIBLINGS of the transition tree (not nested inside it, so they don't get caught in the snapshot)."
    - "The metadata export from Phase 1 is preserved unchanged (title.default, title.template, description, metadataBase)."
    - "The next/font cascade from Phase 1 is preserved unchanged (interDisplay.variable, inter.variable, sourceSerif.variable on <html>)."
    - "The root layout remains a Server Component (no 'use client' directive added) so metadata export continues to work."
    - "Phase 1's Phase-2 placeholder comment block at the top of app/layout.tsx is REMOVED (no longer needed once Phase 2 wires the slots)."
  artifacts:
    - path: "app/layout.tsx"
      provides: "Root layout with ViewTransition + LenisProvider + Analytics + SpeedInsights wired"
      contains: "<ViewTransition>"
    - path: "app/layout.tsx"
      provides: "Lenis at root (LENIS-01)"
      contains: "<LenisProvider>"
    - path: "app/layout.tsx"
      provides: "Vercel observability (ANALY-01)"
      contains: "@vercel/analytics/next"
  key_links:
    - from: "app/layout.tsx ViewTransition import"
      to: "react package"
      via: "named import from 'react'"
      pattern: "import\\s*\\{\\s*ViewTransition\\s*\\}\\s*from\\s*['\"]react['\"]"
    - from: "app/layout.tsx LenisProvider import"
      to: "components/LenisProvider"
      via: "alias path"
      pattern: "@/components/LenisProvider"
    - from: "app/layout.tsx Analytics import"
      to: "@vercel/analytics/next subpath"
      via: "named import"
      pattern: "@vercel/analytics/next"
    - from: "app/layout.tsx SpeedInsights import"
      to: "@vercel/speed-insights/next subpath"
      via: "named import"
      pattern: "@vercel/speed-insights/next"
    - from: "body tag composition"
      to: "LenisProvider as outermost wrapper around ViewTransition"
      via: "JSX nesting"
      pattern: "LenisProvider"
---

<objective>
Update `app/layout.tsx` to wire the four cross-cutting providers that Phase 1 deliberately left empty: `<ViewTransition>` (from `react`), `<LenisProvider>` (created by Plan 02-B), `<Analytics />` (from `@vercel/analytics/next`), and `<SpeedInsights />` (from `@vercel/speed-insights/next`). This is the Wave-2 integration plan — every Wave-1 plan (02-A globals.css, 02-B LenisProvider, 02-C view-transition-link, 02-D copy-lint runner, 02-E CLAUDE.md policy) must be complete before this runs.

Purpose: REQ TRANS-01 (root layout wraps children in `<ViewTransition>` from `react` — not `next`, not `react-dom`) + LENIS-01 (LenisProvider mounted at ROOT — not in a group layout, which would unmount across cross-group navigation) + ANALY-01 (Vercel Analytics + Speed Insights mounted at root).

Output: A single-root layout where every Phase 3+ page inherits smooth scroll, view transitions, and observability for free. The visible cross-fade activates once Phase 4 creates two route groups with different background colors. Phase 2 finishes with `pnpm typecheck && pnpm dev` rendering a blank page without errors.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/02-root-layout-lenis-transitions/02-RESEARCH.md
@.planning/phases/01-scaffold-tokens-dns/01-E-SUMMARY.md
@.planning/phases/02-root-layout-lenis-transitions/02-A-globals-css-view-transitions-PLAN.md
@.planning/phases/02-root-layout-lenis-transitions/02-B-lenis-provider-PLAN.md
@app/layout.tsx
@package.json

**This plan depends on Wave-1 outputs:**
- Plan 02-B created `components/LenisProvider.tsx` with the `LenisProvider` named export.
- Plan 02-A added `::view-transition-old/new(root)` keyframes to `app/globals.css`.
- Plan 02-D created `lib/copy-lint-runner.ts` and updated `instrumentation.ts` — does NOT touch `app/layout.tsx`, but the scanner will run on the updated file at build time so the contents of this layout must be banned-word-clean.
- Plan 02-E added the policy section to `.claude/CLAUDE.md` — informational, no code dependency.
- Plan 02-C created `components/view-transition-link.tsx` — Phase 2 has no consumers of it yet; this plan does NOT import it (only `<ViewTransition>` is wired here; link wrapping is Phase 3 nav).

**Phase 1 contributions that MUST be preserved:**
Read the current `app/layout.tsx` (from Plan 01-E summary): the file imports `interDisplay, inter, sourceSerif` from `@/lib/fonts`, imports `./globals.css`, exports `metadata` (title.default + title.template + description + metadataBase), and renders `<html lang="en" suppressHydrationWarning className="...font.variable...">` with `<body>{children}</body>`. ALL of these must remain. Phase 2 only fills the empty `<body>` slot.

**Why ViewTransition import path matters:**
- `react` exports `<ViewTransition>` — CORRECT (React 19 canary primitive, RSC-safe at the JSX boundary).
- `next` does NOT export `<ViewTransition>` — wrong, would fail at compile time.
- `react-dom` does NOT export `<ViewTransition>` — wrong, would fail at compile time.

**Why Analytics import path matters (Pitfall 3 in RESEARCH.md):**
- `@vercel/analytics/next` — defers script after hydration (~30ms LCP win).
- `@vercel/analytics/react` — generic React entry, doesn't defer, adds 30ms to LCP.
- Same applies to `@vercel/speed-insights/next` vs `/react`.

**Why order matters (Pitfall 1 in RESEARCH.md):**
LenisProvider must be the OUTERMOST wrapper. Lenis intercepts scroll for the WHOLE document. If `<ViewTransition>` wraps LenisProvider, the ViewTransition's snapshot machinery may break Lenis's RAF loop when the DOM is swapped during navigation. The canonical pattern (verified against the Next.js View Transitions guide 2026-05-13 and Vercel Labs reference) is:

```
<body>
  <LenisProvider>                  ← outermost
    <ViewTransition>               ← wraps {children}
      {children}
    </ViewTransition>
  </LenisProvider>
  <Analytics />                    ← sibling of LenisProvider (not inside ViewTransition snapshot)
  <SpeedInsights />                ← sibling
</body>
```

`Analytics` and `SpeedInsights` are placed as SIBLINGS of the transition tree (NOT nested inside `<ViewTransition>`) so they don't get caught in the cross-fade snapshot. The Vercel SDK components inject scripts into the document head/body and would be harmless inside the transition, but keeping them outside is the documented Vercel pattern.

**Why root layout stays a Server Component:**
- `metadata` export requires a Server Component (would error with `'use client'`).
- `<ViewTransition>` from React is a JSX marker primitive — valid in Server Components.
- `LenisProvider` is a `'use client'` component (Plan 02-B). Server Component CAN import a Client Component as a child without becoming a Client Component itself — this is the standard pattern.
- `Analytics` and `SpeedInsights` are client components but importable from Server Components.

**Open question Q4 from RESEARCH.md:**
"Does `<ViewTransition>` need a `name` or `default` prop?" Recommendation: ship without props (`<ViewTransition>{children}</ViewTransition>`). The `::view-transition-old(root)` and `::view-transition-new(root)` pseudo-elements get the implicit `root` name when the wrapper is at the top level. If Phase 4 verification finds the transition doesn't fire visibly, add `name="root"` explicitly — but Phase 2 ships minimal surface.

**Harness hook awareness:**
- `copy-lint.sh` — verify no banned words in the metadata strings. The Phase 1 description ("an Oakland-based operator who builds the systems other people promise to build, and ships them") contains zero banned words. The Phase 2 changes are import statements + JSX nesting — no new prose.
- `motion-discipline.sh` — no relevant patterns.
- `font-license.sh` — fonts are imported from `@/lib/fonts` (foundry=system, body=Inter). No Klim imports.
- `design-tokens.sh` — no hex literals.

<interfaces>
Wave-1 outputs this plan consumes:

From `@/components/LenisProvider` (Plan 02-B):
```typescript
export function LenisProvider(props: { children: React.ReactNode }): JSX.Element;
export { useLenis } from "lenis/react";  // not consumed in this plan
```

From `react` (React 19.2.6 — already installed):
```typescript
export function ViewTransition(props: { children: React.ReactNode }): JSX.Element;
// Valid in both Server and Client Components. JSX marker primitive.
```

From `@vercel/analytics/next` (already installed at v2.0.1):
```typescript
export function Analytics(): JSX.Element;
// Auto-injects deferred analytics script after hydration.
```

From `@vercel/speed-insights/next` (already installed at v1.3.1):
```typescript
export function SpeedInsights(): JSX.Element;
// Auto-injects deferred Core Web Vitals reporter after hydration.
```

Phase 1 carry-forward from `@/lib/fonts`:
```typescript
export const interDisplay: { variable: string; /* NextFont */ };
export const inter: { variable: string; /* NextFont */ };
export const sourceSerif: { variable: string; /* NextFont */ };
```

This plan does NOT introduce new exports — `app/layout.tsx` already exports `metadata` and the default `RootLayout` component from Phase 1.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task F1: Wire ViewTransition + LenisProvider + Analytics + SpeedInsights into app/layout.tsx</name>
  <files>app/layout.tsx</files>
  <action>
Replace the current `app/layout.tsx` (Phase 1 output — 38 lines verified) with the Phase 2 production version. Write the following content VERBATIM (from 02-RESEARCH.md Code Examples §1):

```tsx
// app/layout.tsx
//
// Phase 2 adds: <ViewTransition> from 'react', <LenisProvider>, <Analytics />, <SpeedInsights />.
// Phase 1 contributions retained: fonts, default metadata, suppressHydrationWarning.
//
// Source: ARCHITECTURE.md §4.1 File 2; STACK.md §1 integration note 1.
// Order matters: LenisProvider is outermost (intercepts scroll for the whole doc);
// ViewTransition wraps {children} so cross-fade activates on route navigation.
// Analytics + SpeedInsights mount as siblings of the transition tree (not inside it)
// so they don't get caught in the cross-fade snapshot.
import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { interDisplay, inter, sourceSerif } from "@/lib/fonts";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Micah Jones — Oakland operator",
    template: "%s — Micah Jones",
  },
  description:
    "Micah Jones is an Oakland-based operator who builds the systems other people promise to build, and ships them.",
  metadataBase: new URL("https://micahjonesconsulting.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interDisplay.variable} ${inter.variable} ${sourceSerif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LenisProvider>
          <ViewTransition>{children}</ViewTransition>
        </LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

IMPORTANT — what must NOT change:
- `import { ViewTransition } from "react"` — MUST be from `react`, NOT from `next` or `react-dom`.
- `import { Analytics } from "@vercel/analytics/next"` — MUST be the `/next` subpath (per Pitfall 3).
- `import { SpeedInsights } from "@vercel/speed-insights/next"` — MUST be the `/next` subpath.
- `import { LenisProvider } from "@/components/LenisProvider"` — Plan 02-B's named export.
- `<LenisProvider>` MUST be the outermost wrapper (intercepts scroll for whole doc).
- `<ViewTransition>` MUST wrap `{children}` inside LenisProvider (activates cross-fade on route nav).
- `<Analytics />` and `<SpeedInsights />` MUST be SIBLINGS of LenisProvider (not nested inside ViewTransition).
- The `metadata` export (title default, template, description, metadataBase) MUST be preserved verbatim from Phase 1.
- Do NOT add `'use client'` directive — root layout MUST stay a Server Component (metadata export requirement).
- Do NOT add `name="root"` or `default="cross-fade"` props to `<ViewTransition>` — minimal surface (RESEARCH.md Open Question 4). If Phase 4 verification finds the transition doesn't fire, that's where we'd add the prop.
- Do NOT change the `<html lang="en" suppressHydrationWarning className={...}>` element or the `${interDisplay.variable} ${inter.variable} ${sourceSerif.variable}` className concatenation.
- Do NOT remove the `import "./globals.css"` — that's how the @theme tokens and the new Phase 2 view-transition keyframes activate.
- Do NOT introduce a `<Providers>` wrapper — premature abstraction (RESEARCH.md Pattern 1).

This replaces the Phase 1 layout entirely. The Phase 1 doc-block at the top of the file (the "PHASE 2 will add to this file" comment) is REMOVED — the new file has its own doc-block describing the Phase 2 state.

Verify no banned words: the only prose in this file is `"Micah Jones — Oakland operator"` (title.default), `"%s — Micah Jones"` (title.template), and the description sentence. Verified against `lib/banned.ts`: zero matches.
  </action>
  <verify>
    <automated>cd /c/Users/micah/Code/micahjonesconsulting && grep -q "import { ViewTransition } from \"react\"" app/layout.tsx && grep -q "import { Analytics } from \"@vercel/analytics/next\"" app/layout.tsx && grep -q "import { SpeedInsights } from \"@vercel/speed-insights/next\"" app/layout.tsx && grep -q "import { LenisProvider } from \"@/components/LenisProvider\"" app/layout.tsx && grep -q "<LenisProvider>" app/layout.tsx && grep -q "<ViewTransition>{children}</ViewTransition>" app/layout.tsx && grep -q "<Analytics />" app/layout.tsx && grep -q "<SpeedInsights />" app/layout.tsx && grep -q "Oakland-based operator" app/layout.tsx && ! grep -q "from \"next\"" app/layout.tsx || grep -q "import type { Metadata } from \"next\"" app/layout.tsx; ! grep -q "@vercel/analytics/react" app/layout.tsx && ! grep -q "PHASE 2 will add" app/layout.tsx && ! grep -q "use client" app/layout.tsx && pnpm typecheck 2>&1 | tail -10</automated>
  </verify>
  <done>
- `app/layout.tsx` imports `ViewTransition` from `"react"` (NOT from `"next"`, NOT from `"react-dom"`).
- `app/layout.tsx` imports `Analytics` from `"@vercel/analytics/next"` (NOT `/react`).
- `app/layout.tsx` imports `SpeedInsights` from `"@vercel/speed-insights/next"` (NOT `/react`).
- `app/layout.tsx` imports `LenisProvider` from `"@/components/LenisProvider"`.
- `<LenisProvider>` is the outermost JSX wrapper inside `<body>`.
- `<ViewTransition>` wraps `{children}` inside `LenisProvider`.
- `<Analytics />` and `<SpeedInsights />` are siblings of `<LenisProvider>`, not nested inside it or inside `<ViewTransition>`.
- The Phase 1 `metadata` export is preserved (title.default, title.template, description, metadataBase).
- The Phase 1 next/font cascade (`${interDisplay.variable} ${inter.variable} ${sourceSerif.variable}`) is preserved.
- No `'use client'` directive present.
- Phase 1 placeholder text `"PHASE 2 will add"` is GONE.
- `pnpm typecheck` passes with zero new errors.
  </done>
</task>

</tasks>

<verification>
1. **Import paths correct** — automated grep confirms `react` (ViewTransition), `@vercel/analytics/next` (Analytics), `@vercel/speed-insights/next` (SpeedInsights), `@/components/LenisProvider`.
2. **No wrong import paths** — confirmed by negation greps: `@vercel/analytics/react` absent.
3. **JSX composition** — order `<LenisProvider><ViewTransition>{children}</ViewTransition></LenisProvider><Analytics /><SpeedInsights />` verified by grep.
4. **Phase 1 carry-forward** — `Oakland-based operator` description string preserved; font className unchanged.
5. **Server Component status** — `'use client'` directive absent (grep negation).
6. **TypeScript** — `pnpm typecheck` passes; the four new imports resolve (all are in package.json or in the @/* alias).
7. **Phase 2 placeholder removed** — Phase 1 comment block about "Phase 2 will add" is gone.
8. **`pnpm dev` smoke test (deferred to Plan 02-G):** visit http://localhost:3000/ should render blank (no Phase 1+2 visible UI yet) without console errors. This is verified in Plan 02-G alongside the negative banned-word test.

Note on grep failure modes: the test `! grep -q "from \"next\"" app/layout.tsx || grep -q "import type { Metadata } from \"next\""` allows the `Metadata` type import from `next` while ensuring no other imports come from `next`. The Phase 1 file already imports `Metadata` from `next`; Phase 2 preserves it.
</verification>

<success_criteria>
- TRANS-01 satisfied: `<ViewTransition>` from `react` wraps `{children}` inside root layout.
- LENIS-01 satisfied: `<LenisProvider>` mounted at ROOT (not a group layout) as the outermost wrapper.
- ANALY-01 satisfied: `<Analytics />` + `<SpeedInsights />` mounted at root via `/next` subpath imports.
- Phase 1 metadata + fonts + globals.css import preserved.
- Server Component status preserved.
- `pnpm typecheck` clean.
- No bundle increase beyond expected (Analytics ~3KB, SpeedInsights ~2KB, Lenis ~3KB, ViewTransition ~0KB at runtime).
</success_criteria>

<output>
After completion, create `.planning/phases/02-root-layout-lenis-transitions/02-F-SUMMARY.md` covering:
- Modified file: `app/layout.tsx`
- Imports added: `ViewTransition` (from `react`), `LenisProvider` (from `@/components/LenisProvider`), `Analytics` (from `@vercel/analytics/next`), `SpeedInsights` (from `@vercel/speed-insights/next`)
- JSX wired: `<LenisProvider><ViewTransition>{children}</ViewTransition></LenisProvider><Analytics /><SpeedInsights />`
- Order rationale: LenisProvider outermost (whole-doc scroll), ViewTransition around children (route-change cross-fade), Analytics + SpeedInsights as siblings (no snapshot capture)
- Phase 1 preservation: metadata, font className, suppressHydrationWarning, Server Component status
- REQ coverage: TRANS-01 (ViewTransition wrapping), LENIS-01 (root mount), ANALY-01 (Vercel SDKs)
- Forward-references:
  - Plan 02-G runs the build + dev verification (clean build, negative banned-word test)
  - Phase 4 group layouts will stamp `data-mode` attributes that drive the visible cross-fade
  - Phase 5 TitleCard will consume `useLenis` (re-exported from `@/components/LenisProvider`)
</output>
