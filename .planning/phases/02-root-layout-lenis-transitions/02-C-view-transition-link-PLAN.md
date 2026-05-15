---
phase: 02-root-layout-lenis-transitions
plan: C
type: execute
wave: 1
depends_on: []
files_modified:
  - components/view-transition-link.tsx
autonomous: true
requirements:
  - TRANS-04
must_haves:
  truths:
    - "components/view-transition-link.tsx is a 'use client' component that wraps next/link and intercepts left-click."
    - "On click, the component feature-detects 'startViewTransition' in document and, when supported, calls document.startViewTransition(() => router.push(href))."
    - "When startViewTransition is NOT supported (Safari <18, Firefox <144), the component falls through to plain router.push(href) — instant nav, no broken UI."
    - "Modifier-click (Cmd/Ctrl/Shift/Alt) and middle-click pass through to next/link unmodified (open-in-new-tab, etc.) — never intercepted."
    - "The component has zero consumers in Phase 2 (no nav, no pages with links). Phase 3 nav and Phase 6 foyer pages will consume."
  artifacts:
    - path: "components/view-transition-link.tsx"
      provides: "Drop-in next/link replacement with startViewTransition feature-detect"
      contains: "startViewTransition"
      exports: ["ViewTransitionLink"]
      min_lines: 30
  key_links:
    - from: "click handler"
      to: "document.startViewTransition / router.push"
      via: "feature-detect"
      pattern: "startViewTransition.*in.*document"
    - from: "modifier-click branch"
      to: "fall-through to next/link default behavior"
      via: "early return from handler"
      pattern: "(metaKey|ctrlKey|shiftKey|altKey)"
---

<objective>
Create the new file `components/view-transition-link.tsx` as a `'use client'` component that wraps `next/link` and intercepts left-click to call `document.startViewTransition(() => router.push(href))` — falling through to plain `router.push(href)` on browsers without View Transitions API support (Safari <18, Firefox <144).

Purpose: REQ TRANS-04 (feature-detect wrapper falls through to instant nav on browsers without `document.startViewTransition`). This is the navigation-trigger half of the View Transition system.

Output: A drop-in client component that Phase 3 (`<Nav>`) and Phase 6 (foyer pages with internal links) will import. Phase 2 has no consumers — the file is dormant. If nothing imports it, zero bundle cost.
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
@package.json

**Why a wrapper around next/link instead of using next/link directly:**
Same-document navigation in Next.js App Router does NOT auto-trigger `document.startViewTransition()` even when `experimental.viewTransition: true` is set in `next.config.ts`. The `experimental.viewTransition` flag enables React's `<ViewTransition>` primitive for client-rendered transitions, but the browser's `::view-transition-old/new(root)` keyframes only fire when JavaScript explicitly calls `document.startViewTransition()`. This wrapper centralizes that call site so we have ONE place to maintain the feature-detect logic.

**Why feature-detect (Pitfall C3, D1 in RESEARCH.md):**
- Safari <18 and Firefox <144 do not have `document.startViewTransition`.
- Calling it directly throws `TypeError: document.startViewTransition is not a function`.
- The check `'startViewTransition' in document` is the canonical detection pattern (Vercel Labs reference impl).
- Fall-through to `router.push(href)` produces instant nav — no broken UI, no cross-fade.

**Why intercept only left-click without modifiers:**
- Cmd+click / Ctrl+click open in new tab → must let `next/link`'s default behavior handle (no `preventDefault`).
- Shift+click opens in new window → same.
- Alt+click downloads → same.
- Middle-click (button !== 0) → same.
- Only plain left-click should trigger the programmatic transition. RESEARCH.md Code Examples §5 shows this exact pattern.

**Why ship the file with zero consumers:**
Orchestrator prompt deliverable #5 explicitly requests this file. Phase 3 (Nav) and Phase 6 (foyer pages) will import. Zero bundle cost if not imported (next-link import is dead-code-eliminated by webpack tree-shaking when the wrapper isn't referenced anywhere).

**TypeScript note:**
`lib.dom.d.ts` in TS 6.0.3 may type `Document.startViewTransition` as optional or may not type it at all depending on `target`. The `@ts-expect-error` comment in the code below is the simplest escape. Alternative: cast `document as Document & { startViewTransition: (cb: () => void) => ViewTransition }`. Use the `@ts-expect-error` pattern — keeps the file shorter and the rationale visible in a comment.

**Harness hook awareness:**
- `motion-discipline.sh` checks for: `cursor.*follow`, `MouseFollower`, `scroll-snap-type:\s*y\s+mandatory`, `marquee`, `<Marquee`, `font-mono`, `font-family:\s*ui-monospace`, `syncTouch:\s*true`. None apply to this file.
- `copy-lint.sh` checks string literals — this file contains no prose, only technical strings (path defaults, type names).

<interfaces>
<!-- next/link and next/navigation are already in package.json (next@16.2.6) -->

From `next/link`:
```typescript
import Link, { type LinkProps } from "next/link";
// LinkProps includes: href (string | UrlObject), prefetch, replace, scroll, etc.
```

From `next/navigation`:
```typescript
export function useRouter(): {
  push(href: string): void;
  replace(href: string): void;
  back(): void;
  forward(): void;
  refresh(): void;
  prefetch(href: string): void;
};
```

<!-- This plan creates these exports -->

From `@/components/view-transition-link` (NEW):
```typescript
export function ViewTransitionLink(props: LinkProps & {
  children: React.ReactNode;
  className?: string;
}): JSX.Element;
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task C1: Create components/view-transition-link.tsx</name>
  <files>components/view-transition-link.tsx</files>
  <action>
Create the new file `components/view-transition-link.tsx`. The `components/` directory will be created by Plan 02-B (Wave 1 parallel) if it doesn't exist. If running in isolation and `components/` is missing, create it first.

Write the following content VERBATIM (from 02-RESEARCH.md Code Examples §5):

```tsx
// components/view-transition-link.tsx
//
// Phase 2 — TRANS-04. A drop-in wrapper around next/link that wraps the
// router push in document.startViewTransition() with a feature-detect
// fallback to instant navigation on browsers that don't support it
// (Safari <18, Firefox <144 as of May 2026).
//
// Phase 2 ships the file. Phase 3's <Nav> and Phase 6's foyer pages will
// import it. Until then, it's dormant and adds zero bytes to the bundle
// if nothing imports it.
//
// Source: PITFALLS.md C3 (SSR safety) + D1 (browser-compat gaps);
//         Vercel Labs react-view-transitions-demo reference impl.
"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type ViewTransitionLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

/**
 * Wraps next/link so the navigation occurs inside document.startViewTransition()
 * when supported, falling through to plain router.push() on Safari <18 and
 * Firefox <144. The transition handler is set up to be a no-op DOM swap;
 * the actual cross-fade comes from the ::view-transition-old/new(root) CSS
 * keyframes in globals.css.
 *
 * Usage (Phase 3+):
 *   <ViewTransitionLink href="/work/ordani">ORDANI ↗</ViewTransitionLink>
 */
export function ViewTransitionLink({
  href,
  children,
  className,
  ...rest
}: ViewTransitionLinkProps) {
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Let modifier-clicks (open-in-new-tab, etc.) pass through to next/link.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (e.button !== 0) return; // not a left-click

    e.preventDefault();

    const target = typeof href === "string" ? href : (href as { pathname?: string }).pathname ?? "/";

    // PITFALLS.md C3 + D1 — feature-detect.
    // SSR guard (typeof document) is belt-and-suspenders; this is a
    // 'use client' component so document is always defined at handler
    // call time — but the type-narrow keeps strict-mode TS happy.
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      // @ts-expect-error — startViewTransition is missing from older lib.dom.d.ts
      document.startViewTransition(() => router.push(target));
    } else {
      // Safari <18, Firefox <144 — instant nav, no cross-fade.
      router.push(target);
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
```

IMPORTANT — what must NOT change:
- The `'use client'` directive MUST be the first line.
- The modifier-key early return (`if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;`) MUST stay — losing it breaks open-in-new-tab.
- The `if (e.button !== 0) return;` check MUST stay — middle-click should pass through.
- The feature-detect `if (typeof document !== "undefined" && "startViewTransition" in document)` MUST be used — calling `document.startViewTransition()` unconditionally throws on Safari 17 / Firefox 143.
- Do NOT remove the `@ts-expect-error` comment — `startViewTransition` is intentionally missing from older `lib.dom.d.ts` typing in TS 6.0.3 and the comment documents the intentional bypass.
- Do NOT import GSAP, Lenis, or any motion library here — this is pure navigation logic.

If TS 6.0.3 ships an updated `lib.dom.d.ts` that types `Document.startViewTransition`, the `@ts-expect-error` will trigger a "directive unused" warning. In that case, switch to `// @ts-ignore` or remove the comment AND verify `pnpm typecheck` still passes. For now, `@ts-expect-error` is correct.
  </action>
  <verify>
    <automated>cd /c/Users/micah/Code/micahjonesconsulting && test -f components/view-transition-link.tsx && grep -q "use client" components/view-transition-link.tsx && grep -q "startViewTransition" components/view-transition-link.tsx && grep -q "metaKey || e.ctrlKey || e.shiftKey || e.altKey" components/view-transition-link.tsx && grep -q "useRouter" components/view-transition-link.tsx && grep -q "router.push(target)" components/view-transition-link.tsx && ! grep -q "import.*gsap" components/view-transition-link.tsx && pnpm typecheck 2>&1 | tail -10</automated>
  </verify>
  <done>
- File `components/view-transition-link.tsx` exists.
- File starts with `"use client";` directive.
- File exports `ViewTransitionLink` component.
- Feature-detect check `"startViewTransition" in document` present.
- Modifier-key + middle-click guards present (e.metaKey, ctrlKey, shiftKey, altKey, button !== 0).
- Fallback path calls `router.push(target)` directly when feature-detect fails.
- Zero GSAP / Lenis imports.
- `pnpm typecheck` passes.
  </done>
</task>

</tasks>

<verification>
1. **File exists + structure** — automated grep confirms `'use client'`, `startViewTransition`, modifier-key guards, `useRouter`, fallback `router.push`.
2. **No GSAP/Lenis leakage** — automated grep confirms zero imports from motion libraries.
3. **TypeScript** — `pnpm typecheck` passes; the `@ts-expect-error` is justified (the type IS missing from current lib.dom).
4. **No consumers in Phase 2** — confirmed by file inventory (no `import.*view-transition-link` anywhere else). Phase 3 and Phase 6 are the future consumers.
</verification>

<success_criteria>
- `components/view-transition-link.tsx` exists with the exact RESEARCH.md §5 contents.
- TRANS-04 satisfied: feature-detect wrapper present with both supported and fallback branches.
- Open-in-new-tab modifier-click semantics preserved (passes through to next/link).
- Middle-click semantics preserved.
- Zero GSAP imports.
- `pnpm typecheck` clean.
</success_criteria>

<output>
After completion, create `.planning/phases/02-root-layout-lenis-transitions/02-C-SUMMARY.md` covering:
- New file: `components/view-transition-link.tsx`
- Export: `ViewTransitionLink` (drop-in next/link wrapper)
- Feature-detect: `"startViewTransition" in document` gates the transition call
- Fallback: plain `router.push` for Safari <18 / Firefox <144
- Modifier-click pass-through preserved (Cmd/Ctrl/Shift/Alt + middle-click)
- Forward-references:
  - Phase 3 `<Nav>` imports `ViewTransitionLink` for the five-label foyer nav
  - Phase 6 foyer pages (Home selected-work strip, About teaser, etc.) import for internal links
- Phase 2 has zero consumers — file is dormant
</output>
