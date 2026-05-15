# Phase 2: Root Layout, Lenis, View Transitions, Copy Discipline — Research

**Researched:** 2026-05-14
**Domain:** Next.js 16 App Router root-layout cross-cutting infrastructure — React `<ViewTransition>` wiring, Lenis smooth scroll at root, build-time banned-words scanner, reduced-motion CSS kill-switches, Vercel observability
**Confidence:** HIGH (all decisions verified against Next.js 16.2.6 docs dated 2026-05-13, Lenis 1.3 official README, React 19 ViewTransition docs, plus the project-level research in `.planning/research/` which already verified the upstream stack)

---

## Summary

Phase 2 is infrastructure. It writes seven files (and edits one) into the project's `app/`, `components/`, and `lib/` directories so every Phase 3+ page inherits: (a) browser-native View Transitions with a 600ms cream-fade-out / theater-fade-in for foyer↔theater navigation, (b) Lenis smooth scroll at root (lerp 0.08, syncTouch:false), (c) `pnpm build`-blocking copy-lint that scans MDX + TSX + `metadata` exports for banned words and fails with `file:line:column`, (d) a `prefers-reduced-motion` CSS kill-switch that neutralizes the View Transition for vestibular-trigger-sensitive users, and (e) Vercel Analytics + Speed Insights observability mounted at root.

There is no visible UI in Phase 2. No nav, no footer, no route groups, no pages, no TitleCard. Verification of this phase is `pnpm build` succeeding cleanly + `pnpm typecheck` passing + a manual smoke test in `pnpm dev` confirming the providers mount without console errors. The actual visible cross-fade is verified in Phase 4 after route-group skeletons exist; Phase 2 just lays the plumbing.

**Primary recommendation:** Write the eight files exactly as specified in the Code Examples section below. Do not introduce a separate `<Providers>` wrapper — inline LenisProvider + ViewTransition + Analytics in `app/layout.tsx` because the wrapper would be premature abstraction for one root-level mount. Run instrumentation.ts on `phase === 'phase-production-build'` only (it triggers on `next build`, never on `next dev`, never on the Edge runtime). Quarantine the Lenis↔ScrollTrigger bridge to the LenisProvider so Phase 5 can wire it through `useLenis()` without re-touching Phase 2 code.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

No `CONTEXT.md` exists for Phase 2. The phase was scoped directly from `.planning/REQUIREMENTS.md` requirements (TRANS-01..05, LENIS-01..05, COPY-01..05, A11Y-05, ANALY-01), `.planning/ROADMAP.md` Phase 2 success criteria, and the project-level research at `.planning/research/`. All decisions in this phase derive from the locked stack and architecture established by `.planning/research/STACK.md`, `.planning/research/ARCHITECTURE.md`, and `.planning/research/PITFALLS.md`. The 17-line orchestrator prompt provided explicit deliverables for the planner; those are honored as locked decisions.

### Locked Decisions (from upstream research + orchestrator prompt)

- **Next.js 16.2.6 + React 19.2.6.** Already installed in Phase 1 (verified in `package.json`).
- **`experimental.viewTransition: true`** — already wired in Phase 1 (`next.config.ts` confirmed).
- **`<ViewTransition>` imported from `react`** — NOT from `next`, NOT from `react-dom`. (STACK.md §"Core Technologies" line 24; ARCHITECTURE.md §4.1.)
- **Single root `app/layout.tsx`** wraps `{children}` in `<ViewTransition>`; Lenis and Analytics mount at root, NEVER in a group layout. (ARCHITECTURE.md §3.1; PITFALLS.md A4, §10.7.)
- **Lenis package `lenis@1.3.23`** via `lenis/react` subpath import. NOT the retired `@studio-freight/react-lenis`. (STACK.md §"Motion & Scroll"; PITFALLS.md D2.)
- **Lenis `syncTouch: false`** locked — iOS gets native momentum scroll, which is correct. (PITFALLS.md D2; .claude/CLAUDE.md line 45.)
- **Lenis `lerp: 0.08`** — blueprint §4d "damping ~0.08 (light, not buttery)". Verified against Lenis README: `lerp` is the canonical damping parameter, 0 < lerp < 1, lower = lighter. Default is 0.1; 0.08 is slightly lighter than default.
- **Lenis disabled for `prefers-reduced-motion: reduce`** — LENIS-05 + A11Y-05. The simplest implementation is to short-circuit `<ReactLenis>` and render `{children}` directly when the media query matches.
- **Phase 2 does NOT import GSAP anywhere.** GSAP imports are quarantined to `components/TitleCard.tsx` in Phase 5. (PITFALLS.md A4; .claude/CLAUDE.md line 33.) The Lenis↔ScrollTrigger bridge is therefore documented but NOT activated in Phase 2 — Phase 5's TitleCard will hook into the Lenis scroll event via `useLenis()`.
- **30-word banned list locked** at `lib/banned.ts` (already exists from Phase 1, verified).
- **Copy-lint scope:** scan `content/**/*.mdx` AND `app/**/*.tsx` string literals AND `metadata` exports per COPY-03. Phase 2 implementation lives in `instrumentation.ts` (already a no-op stub in Phase 1).
- **Reduced-motion kill-switch syntax:** `animation-duration: 0.001ms !important; animation-iteration-count: 1 !important;` per WAI guidance — the 0.001ms trick avoids visual jumpiness while effectively killing the animation. (PITFALLS.md B2.)
- **Feature-detect View Transitions:** wrap `document.startViewTransition` checks before invocation. (PITFALLS.md C3, D1.)
- **Vercel Analytics + Speed Insights** import paths are `@vercel/analytics/next` and `@vercel/speed-insights/next` (the `/next` subpath defers the script after hydration). (STACK.md §"Hosting & Observability" line 60-61; project-level package.json already includes both.)

### Claude's Discretion

- **Where to put the LenisProvider component.** Options: (a) inline `<ReactLenis>` directly in `app/layout.tsx`; (b) wrap in `components/LenisProvider.tsx` client component. Recommended: (b) because the reduced-motion guard requires client-side `matchMedia()` access, which needs a `'use client'` boundary somewhere. Inline would force `app/layout.tsx` to become a client component, which breaks the SSR contract for metadata. Wrap as a thin client provider.
- **Whether to create a separate `components/view-transition-link.tsx`.** The orchestrator prompt asks for it as deliverable #5, but Phase 2 has no consumers (no links yet — those are Phase 3 nav). Recommended: include the file for forward-compatibility, document that Phase 3's `<Nav>` and Phase 6's foyer pages will use it. The file alone adds zero bytes to the bundle if no one imports it.
- **Bridge pattern for Lenis↔ScrollTrigger.** Options: (a) export a `useLenis()` re-export from LenisProvider so Phase 5 can import; (b) wire `lenis.on('scroll', ScrollTrigger.update)` inside a conditional. Recommended: (a) — the `useLenis` hook from `lenis/react` is the canonical pattern. Phase 5's TitleCard will `useLenis(({ scroll }) => ScrollTrigger.update())` inside its `useGSAP` block. No GSAP import in Phase 2.
- **Whether `metadata` export scanning happens in instrumentation.ts.** Options: (a) walk file AST with TypeScript compiler API to extract `export const metadata = { ... }` strings precisely; (b) treat all `app/**/*.tsx` source as raw text and let word-boundary regex find banned words anywhere. Recommended: (b) — simpler, faster, false-positives are acceptable (banned words shouldn't appear anywhere in TSX). Phase 2's scanner reads the file content as a single string and runs `scanString(content, filePath, 1)`. AST parsing is premature; the harness `copy-lint.sh` hook at write boundary already catches most issues.

### Deferred Ideas (OUT OF SCOPE for Phase 2)

- **Nav and footer components** — Phase 3 (FOYER-09, FOYER-10). Phase 2 ships an `app/layout.tsx` whose body is literally `<LenisProvider><ViewTransition>{children}</ViewTransition></LenisProvider><Analytics /><SpeedInsights />` and nothing else.
- **Route group layouts** `(foyer)/layout.tsx` and `(theater)/layout.tsx` — Phase 4.
- **`viewTransitionName: "site-nav"` spatial anchor** — Phase 3 (lives on `<Nav>` element).
- **TitleCard component** — Phase 5.
- **GSAP imports anywhere** — Phase 5 only, inside `components/TitleCard.tsx`.
- **Actual View Transition visual verification** — needs 2 routes (Phase 4 has stub pages; Phase 6 has real pages). Phase 2 verification is build-success + code-correctness review.
- **Pages with content** — Phase 6.
- **MDX components and case studies** — Phase 7+.
- **Per-route `metadata` exports beyond the root default** — Phase 6.
- **`@vercel/og` OG images** — Phase 5 (TitleCard composition) and Phase 10 (per-route).
- **Custom `case_study_read_complete` analytics event** — Phase 10 (ANALY-02). Phase 2 just mounts `<Analytics />` and `<SpeedInsights />`; the custom event hooks into IntersectionObserver on `/work/*` routes which don't exist yet.
- **`prefers-reduced-motion` handling for TitleCard, Lenis-disabled, pull-quote underline-grow, hover lifts** — A11Y-05 is shared across Phases 2 (View Transition + Lenis), 5 (TitleCard), and 7 (PullQuote). Phase 2 owns ONLY the View Transition CSS kill-switch and the Lenis short-circuit.
</user_constraints>

<phase_requirements>
## Phase Requirements

These 17 requirements MUST be addressed by Phase 2 implementation. Each maps to specific files and research findings.

| ID | Description | Research Support |
|----|-------------|------------------|
| **TRANS-01** | Root `app/layout.tsx` wraps `{children}` in `<ViewTransition>` from `react` (not `next`) | ARCHITECTURE.md §4.1 (three-file wiring); STACK.md §1 integration note; React 19 canary docs verified |
| **TRANS-02** | `app/globals.css` defines `::view-transition-old(root)` + `::view-transition-new(root)` 600ms keyframes — cream paper recedes / theater ground rises | ARCHITECTURE.md §4.1 File 3; blueprint §4d "600ms ease-in-out"; this RESEARCH.md Code Examples §3 |
| **TRANS-03** | `@media (prefers-reduced-motion: reduce)` kill-switch on `::view-transition-*` per pitfall B2 — View Transitions does NOT auto-honor reduced motion | PITFALLS.md B2 (verified); WAI ANIM-from-Interactions; this RESEARCH.md Code Examples §3 reduced-motion block |
| **TRANS-04** | Feature-detect wrapper falls through to instant nav on Safari <18 and Firefox <144 per pitfall D1 | PITFALLS.md C3 + D1; Can I Use 2026; this RESEARCH.md Code Examples §5 (`view-transition-link.tsx`) |
| **TRANS-05** | Foyer↔theater transition verifiable in DevTools Performance panel as a single browser View Transition (600ms ease-in-out) — actually validatable in Phase 4 once 2 routes exist | ARCHITECTURE.md §9.2 transition flow; Phase 2 ships the plumbing, Phase 4 verifies visually |
| **LENIS-01** | `components/LenisProvider.tsx` mounts `<ReactLenis root>` in root `app/layout.tsx` (not group layout — group layouts unmount across cross-group navigation) | ARCHITECTURE.md §6.2.2 + §10.7 anti-pattern; PITFALLS.md C2; this RESEARCH.md Code Examples §2 |
| **LENIS-02** | Lenis configured with `lerp: 0.08` ("light, not buttery") | Blueprint §4d "damping ~0.08"; Lenis README verified (`lerp` IS the damping parameter); default is 0.1, 0.08 = slightly lighter |
| **LENIS-03** | Lenis `syncTouch: false` per pitfall D2 — iOS gets native momentum; CLAUDE.md documents this | PITFALLS.md D2 (verified against Lenis 1.0 migration); .claude/CLAUDE.md line 45 already documents the rule |
| **LENIS-04** | Lenis ↔ ScrollTrigger bridge: `lenis.on('scroll', ScrollTrigger.update)` so TitleCard pin stays accurate — DEFERRED activation to Phase 5 (no GSAP in Phase 2) | PITFALLS.md A4 (GSAP quarantine); this RESEARCH.md Phase-5-Forward-Reference; Phase 2 exports `useLenis` re-export from LenisProvider for Phase 5 consumption |
| **LENIS-05** | Lenis disabled for users with `prefers-reduced-motion: reduce` | Standard pattern; this RESEARCH.md Code Examples §2 (early return with `<>{children}</>`); A11Y-05 |
| **COPY-01** | `lib/banned.ts` exports the 30-word banned list — already exists from Phase 1 | Verified: `lib/banned.ts` contains all 30 words from blueprint §8 top-9 + harness slop-words.txt defaults |
| **COPY-02** | `lib/copy-lint.ts` exports a TypeScript scanner that finds banned words; uses word-boundary regex | Phase 1 stub already implements `scanString(text, filePath, lineOffset) → Finding[]` correctly; Phase 2 keeps it as-is and adds a `scanFile(path)` convenience function |
| **COPY-03** | Build fails if banned words appear in `content/**/*.mdx`, `app/**/*.tsx` strings, `app/**/page.tsx` `metadata` exports, or `content/site.ts` globals — with `file:line:column` | This RESEARCH.md Code Examples §6 (instrumentation.ts upgrade); reads files from disk during `register()` only when `process.env.NEXT_RUNTIME === 'nodejs'` AND `process.env.NEXT_PHASE === 'phase-production-build'` |
| **COPY-04** | Voice rules enforced manually by `copy-editor` subagent on every prose-touching PR (≤25-word sentences, first person, active voice, named numbers) | OUT OF SCOPE for code — this is subagent behavior, not a Phase 2 file. Documented in RESEARCH.md so planner doesn't task it. |
| **COPY-05** | Em-dashes capped at one per page (em-dashes are an AI tell) | OUT OF SCOPE for code in Phase 2 — could be added to `copy-lint.ts` as a per-file count check, but the prompt indicates this is also subagent-enforced. Recommended: add a `countEmDashes(text) → number` helper to `lib/copy-lint.ts` and call from instrumentation.ts with a warn (not fail) when count > 1. Treat as nice-to-have. |
| **A11Y-05** | `prefers-reduced-motion: reduce` honored on TitleCard (Phase 5), View Transitions (Phase 2), Lenis (Phase 2), pull-quote underline-grow (Phase 7), hover lifts (Phase 3+) | Phase 2 owns the View Transition CSS kill-switch (TRANS-03) + the Lenis short-circuit (LENIS-05). The remainder is downstream. |
| **ANALY-01** | `@vercel/analytics` + `@vercel/speed-insights` mounted at root layout | This RESEARCH.md Code Examples §1 (app/layout.tsx); package.json verified to include both at correct versions |
</phase_requirements>

---

## Standard Stack (already locked from Phase 1)

### Already installed (verified in `package.json`)

| Library | Version | Purpose | Phase 2 Usage |
|---------|---------|---------|---------------|
| `next` | `16.2.6` | App Router + `experimental.viewTransition` | Already wired in `next.config.ts` |
| `react` | `19.2.6` | `<ViewTransition>` primitive | Import in `app/layout.tsx` |
| `react-dom` | `19.2.6` | DOM renderer | (Implicit) |
| `lenis` | `1.3.23` | Smooth scroll at root | `lenis/react` subpath in `LenisProvider.tsx` |
| `@vercel/analytics` | `2.0.1` | Cookieless page-view tracking | `@vercel/analytics/next` import in `app/layout.tsx` |
| `@vercel/speed-insights` | `1.3.1` | Real-user LCP/INP/CLS monitoring | `@vercel/speed-insights/next` import in `app/layout.tsx` |
| `typescript` | `6.0.3` | Strict-mode type safety | (Implicit) |

### Confirmation: nothing new to install in Phase 2

All dependencies already pinned. `pnpm install` is unnecessary for this phase. Verify with `pnpm typecheck && pnpm build` after writing files.

### Alternatives Considered (and Rejected by Upstream Research)

| Instead of | Could Use | Tradeoff | Why rejected for Phase 2 |
|------------|-----------|----------|--------------------------|
| `<ViewTransition>` from `react` | `next-view-transitions` userland package | Older pattern, predates Next 15 native support | Native React 19 primitive is canonical (ARCHITECTURE.md §4.3) |
| `lenis/react` `<ReactLenis>` | Manual `new Lenis()` + `useEffect` RAF loop | More control, more code | React adapter handles RAF + cleanup correctly (PITFALLS.md C2) |
| `@vercel/analytics/next` | `@vercel/analytics/react` | Same data, different load timing | `/next` subpath defers after hydration (STACK.md §1 integration note 8) |
| Word-boundary regex in `copy-lint.ts` | TypeScript AST traversal | More precise (only string literals) | Premature for v1; raw-text scan catches more, false-positives acceptable |

---

## Architecture Patterns

### Recommended Phase 2 File Layout

```
micahjonesconsulting/
├── app/
│   ├── layout.tsx           [EDIT] adds <ViewTransition>, <LenisProvider>, <Analytics />, <SpeedInsights />
│   └── globals.css          [EDIT] adds ::view-transition-old/new keyframes + reduced-motion guard
├── components/
│   ├── LenisProvider.tsx    [NEW] 'use client' — wraps <ReactLenis root>; reduced-motion short-circuit
│   └── view-transition-link.tsx  [NEW] 'use client' — feature-detect wrapper around next/link push
├── lib/
│   └── copy-lint.ts         [EDIT] adds scanFile(filePath) convenience function
├── instrumentation.ts       [EDIT] register() walks files and fails build on banned-word findings
├── next.config.ts           [NO CHANGE] viewTransition flag already set in Phase 1
└── package.json             [NO CHANGE] all deps already installed
```

Eight files touched. Two created, six edited. No new dependencies.

### Pattern 1: Single Root Layout + Inline Providers

**What:** All cross-cutting providers (LenisProvider, ViewTransition, Analytics, SpeedInsights) mount inline in `app/layout.tsx` rather than wrapping in a separate `<Providers>` component.

**When to use:** When the provider tree is simple (≤4 providers, no nested context dependencies) and the root layout has no other consumers. For House Lights, the only consumers are `{children}` (route content) and there's no client-side state to share between providers.

**Why not a `<Providers>` wrapper:** Premature abstraction. A `<Providers>` component would force `app/layout.tsx` to become harder to reason about (more files for one mount path) without buying any reuse or testability. Inline keeps the cross-cutting infrastructure visible in one file.

**Counter-example (would need `<Providers>`):** If we had React Query, a custom auth context, a feature-flag provider, AND analytics — that's 4+ providers with state dependencies, abstract them. For Phase 2's 4 simple mounts, inline.

### Pattern 2: Client-Boundary Quarantine

**What:** Both `LenisProvider` and `view-transition-link` are `'use client'` components. The root `app/layout.tsx` remains a Server Component so it can export `metadata` (which would error inside `'use client'`).

**When to use:** Always, for App Router root layouts. Server components own `metadata`, fonts, and `<html>`/`<body>`; client components own DOM-dependent behavior (matchMedia, document.startViewTransition, scroll listeners).

**Code shape:**
```tsx
// app/layout.tsx — Server Component (no 'use client')
import { ViewTransition } from 'react'; // React 19 primitive, RSC-safe at the boundary
import { LenisProvider } from '@/components/LenisProvider'; // client component
import { Analytics } from '@vercel/analytics/next'; // client component
import { SpeedInsights } from '@vercel/speed-insights/next'; // client component

export const metadata = { /* ... */ };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${interDisplay.variable} ...`} suppressHydrationWarning>
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

**Verified pattern:** Next.js View Transitions guide (2026-05-13) shows this exact composition. `<ViewTransition>` from React is allowed inside Server Components because it's a marker primitive — React's transition machinery handles activation client-side automatically.

### Pattern 3: Build-Time Instrumentation Scanner

**What:** `instrumentation.ts` `register()` runs at server startup. We gate it to `phase-production-build` so it scans files exactly once per `next build` and never on `next dev`. On any banned-word finding, it throws with `file:line:column` to fail the build.

**When to use:** Cross-cutting build-time validations that must run on every build but never at request time. Banned-words scanning, MDX frontmatter Zod validation (Phase 7), citation locking (Phase 8) all fit this pattern.

**Code shape:**
```ts
// instrumentation.ts
export async function register() {
  // Only run during production build, never at dev or at request time
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  if (process.env.NEXT_PHASE !== 'phase-production-build') return;

  const { scanProject } = await import('./lib/copy-lint-runner');
  const findings = await scanProject();
  if (findings.length > 0) {
    console.error('\n[copy-lint] Banned words found:\n');
    console.error(findings.map(f =>
      `  ${f.filePath}:${f.line}:${f.column} — "${f.word}" in: "...${f.excerpt}..."`
    ).join('\n'));
    throw new Error(`copy-lint: ${findings.length} banned word(s) found. Build aborted.`);
  }
}
```

**Why `NEXT_PHASE === 'phase-production-build'`:** Next.js sets `NEXT_PHASE` to one of `phase-development-server`, `phase-production-server`, `phase-production-build`, `phase-export`. We want exactly `phase-production-build` so the scan runs on `next build` but not when the server is running (production or dev). Verified at https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation (the canonical pattern).

**Why dynamic `await import('./lib/copy-lint-runner')`:** keeps the scanner code out of the runtime bundle. Only loaded when `register()` is called, and `register()` is only called once at server boot.

### Anti-Patterns to Avoid

- **Putting `<LenisProvider>` in a group layout (foyer or theater).** Group layouts unmount on cross-group navigation, which would remount Lenis on every foyer↔theater transition and lose scroll state. Always mount Lenis at root. (ARCHITECTURE.md §10.7; PITFALLS.md C2.)
- **Inlining `<ReactLenis>` directly in `app/layout.tsx`.** Forces the root layout to be `'use client'` (because `ReactLenis` reads `window`), which forbids `metadata` export. Wrap in a `'use client'` `LenisProvider` component. (Verified: STACK.md §3 integration note line 207-208.)
- **Calling `document.startViewTransition()` without feature detect.** Throws on Safari <18 and Firefox <144. Always wrap in a `withViewTransition(updateDOM)` helper that checks `'startViewTransition' in document`. (PITFALLS.md C3, D1.)
- **Setting `Lenis.syncTouch: true` to "fix" iOS feel.** iOS native momentum scroll is correct. `syncTouch: true` introduces stutter on iOS <16 and overrides the OS gesture. Locked `false`. (PITFALLS.md D2; documented in `.claude/CLAUDE.md` line 45.)
- **Running the copy-lint scan in `next dev`.** Slows dev startup and false-positives during incremental edits. Gate to `phase-production-build` only.
- **Setting `animation: none` instead of `animation-duration: 0.001ms`.** `animation: none` cancels the animation entirely, which can cause a visible jump from start state to end state on the View Transition pseudo-elements. The 0.001ms trick preserves the keyframe trajectory but makes it imperceptible. (WAI Reduced Motion guidance; verified in PITFALLS.md B2.)

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth-scroll for foyer routes | Custom `requestAnimationFrame` + `scrollTo` loop | `<ReactLenis>` from `lenis/react` | Handles RAF cleanup, touch/wheel input correctly, and React 19 strict mode (PITFALLS.md C2) |
| View Transitions wrapper | Manual `startViewTransition` calls scattered across components | `view-transition-link.tsx` component using `useRouter().push` inside `document.startViewTransition` | Single feature-detect path, one place to update (PITFALLS.md C3, D1) |
| Reduced-motion media query JS | `useState` + `useEffect` + manual `matchMedia` listener | `useReducedMotion` helper OR inline `typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches` short-circuit in LenisProvider | matchMedia listener pattern is straightforward; an external library is overkill for one provider |
| Banned-word AST scanner | TypeScript compiler API traversal of `metadata` exports | Word-boundary regex over raw file content via existing `scanString()` | Phase 1 stub already correct; AST parsing premature; harness `copy-lint.sh` at write boundary catches most issues |
| Analytics SDK | Mixpanel/Segment/PostHog/GA4 setup | `@vercel/analytics/next` + `@vercel/speed-insights/next` (one component each) | Cookieless, no consent banner, two-line install (STACK.md §"Hosting & Observability"; PROJECT.md Out of Scope) |

**Key insight:** Phase 2 is mostly *integration*, not *invention*. The only Phase-2-specific custom code is the LenisProvider reduced-motion short-circuit (~20 lines), the view-transition-link wrapper (~15 lines), and the instrumentation scanner glue (~30 lines). Everything else is provided by Lenis 1.3, React 19, Vercel SDKs, and the existing Phase 1 copy-lint scaffold.

---

## Common Pitfalls

### Pitfall 1: `<ViewTransition>` placed inside a `'use client'` component
**What goes wrong:** If `LenisProvider` wraps `<ViewTransition>`, the transition primitive ends up inside a client tree. React 19's `<ViewTransition>` works there, but a more common mistake is to put `<ViewTransition>` BEFORE `<LenisProvider>` thinking the order doesn't matter — it does. The ViewTransition wraps `{children}` (the page content); LenisProvider wraps the whole tree (because Lenis intercepts scroll for the whole document).

**Why it happens:** Mental model conflates "outer wrapper" with "first executed" — they're the same in React.

**How to avoid:** Order is `<LenisProvider><ViewTransition>{children}</ViewTransition></LenisProvider>`. LenisProvider is outermost.

**Warning signs:** Lenis works on foyer routes but stops working after a foyer→theater navigation (because ViewTransition's DOM swap intermittently breaks Lenis's RAF loop if LenisProvider unmounts).

### Pitfall 2: Lenis `lerp: 0.08` confused with `duration: 0.08`
**What goes wrong:** Blueprint says "damping ~0.08". Developer reads Lenis docs, sees both `lerp` and `duration` options, and tunes `duration: 0.08` instead of `lerp: 0.08`. Result: scroll feels twitchy (duration is in seconds — 0.08s = 80ms, far too fast for a smooth-scroll). Or worse, sets `lerp: 0.08` AND `duration: 0.08` and they conflict.

**Why it happens:** Lenis options are dual-mode — `lerp` (linear interpolation, 0-1) and `duration` (time-based, seconds). Setting one disables the other internally.

**How to avoid:** Use `lerp: 0.08` only. Omit `duration` or leave at default (1.2). Verified against Lenis README: `lerp` is the canonical damping parameter; lower lerp = lighter smoothing.

**Warning signs:** Scroll feels jumpy on mousewheel.

### Pitfall 3: Vercel Analytics imported from `@vercel/analytics/react`
**What goes wrong:** Two import paths exist: `@vercel/analytics/react` (generic) and `@vercel/analytics/next` (Next.js-optimized). The `/react` path doesn't defer the script and adds 30ms to LCP. The `/next` path defers after hydration.

**Why it happens:** Auto-import picks the first match (`/react`).

**How to avoid:** Always type the full path `@vercel/analytics/next`. Same for `@vercel/speed-insights/next`. Verified in STACK.md §"Hosting & Observability" line 60.

### Pitfall 4: Instrumentation scanner runs on dev server
**What goes wrong:** Developer adds `await scanProject()` to `register()` without gating on `NEXT_PHASE`. The scan runs on every `next dev` start AND on every Fast Refresh. Build feedback loop balloons from 200ms to 3-5s.

**Why it happens:** `register()` runs once at server boot, but `next dev` reboots the server frequently during edits.

**How to avoid:** Gate to `process.env.NEXT_PHASE === 'phase-production-build'`. Verified against Next.js instrumentation docs.

### Pitfall 5: `prefers-reduced-motion` evaluated server-side
**What goes wrong:** LenisProvider checks `window.matchMedia(...)` at module top-level. Throws `ReferenceError: window is not defined` during Next.js SSR.

**Why it happens:** Server-side React renders the LenisProvider component once; module-top-level code runs server-side too.

**How to avoid:** Wrap `matchMedia` access in `useEffect` or check `typeof window !== 'undefined'` before access. Recommended pattern: use a tiny `useReducedMotion` hook (15 lines) that returns `false` on first server render and updates after hydration. This is the same pattern Framer Motion uses for `useReducedMotion` — verified.

**Sample hook:**
```tsx
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
```

This ensures first render is consistent (no hydration mismatch) and subsequent renders reflect the user's preference.

### Pitfall 6: `LenisProvider` consumed by Phase 5 TitleCard but lacks `useLenis` export
**What goes wrong:** Phase 5 wants to bridge Lenis scroll → ScrollTrigger.update. If LenisProvider doesn't re-export `useLenis` from `lenis/react`, Phase 5 has to import it directly — fine, but a re-export makes the contract explicit.

**Why it happens:** Phase 2 developer thinks "I don't need useLenis here, why expose it?"

**How to avoid:** Re-export `useLenis` from `components/LenisProvider.tsx`:
```tsx
export { useLenis } from 'lenis/react';
```
This is purely documentary — Phase 5 could import directly from `lenis/react` instead, but the re-export signals that LenisProvider is the integration point.

### Pitfall 7: View Transition keyframes use `to { opacity: 0 }` without `from`
**What goes wrong:** The browser auto-fades pseudo-elements between captured states. If keyframes specify only `to`, the browser interpolates from the live element's computed style, which may be `opacity: 1` already — animation appears to do nothing. Or worse, the browser inserts default `from { opacity: 1 }` which produces a single-direction fade that looks janky.

**Why it happens:** Common mistake reading View Transitions tutorials that show only the `@keyframes fade-out { to { opacity: 0 } }` pattern.

**How to avoid:** Always specify both states explicitly:
```css
@keyframes fade-out { from { opacity: 1 } to { opacity: 0 } }
@keyframes fade-in  { from { opacity: 0 } to { opacity: 1 } }
```

---

## Code Examples

Verified, copy-pasteable Phase 2 implementations.

### Example 1: `app/layout.tsx` UPDATED (full file)

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

**Verified against:**
- Next.js View Transitions guide (2026-05-13): exact wrap pattern `<ViewTransition>{children}</ViewTransition>` with `react` import
- React 19 docs: `<ViewTransition>` is a primitive marker; valid in Server Components at the JSX boundary
- Vercel Analytics docs: `/next` subpath import + `<Analytics />` placement after children
- Lenis README: client provider wraps tree; root layout stays Server Component

### Example 2: `components/LenisProvider.tsx` (NEW, full file)

```tsx
// components/LenisProvider.tsx
//
// Phase 2 — LENIS-01..05 + A11Y-05 (View-Transition-and-Lenis portion).
//
// Mounts <ReactLenis root> exactly once at the root layout. Reads
// prefers-reduced-motion via a hook that respects SSR (returns false on
// first render, updates after hydration) so we never call matchMedia at
// module top-level (Pitfall: ReferenceError: window is not defined).
//
// When reduced-motion is on, we short-circuit and render children directly
// without Lenis active (LENIS-05). Native scroll provides the correct UX
// for vestibular-sensitive users.
//
// Re-exports useLenis from 'lenis/react' so Phase 5 TitleCard can bridge:
//   import { useLenis } from '@/components/LenisProvider';
//   useLenis(({ scroll }) => ScrollTrigger.update());
// This keeps the integration point explicit and documented.
//
// Source: STACK.md §"Motion & Scroll" + integration note 3;
//         PITFALLS.md C2 (SSR safety), D2 (syncTouch:false locked).
"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

// Re-export for Phase 5 consumption (TitleCard's Lenis↔ScrollTrigger bridge).
export { useLenis } from "lenis/react";

/**
 * Track prefers-reduced-motion. SSR-safe: returns false on first server render,
 * updates after client hydration. Listens for live media-query changes.
 */
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  // LENIS-05 / A11Y-05 — short-circuit when user prefers reduced motion.
  // Native scroll is the correct UX here; Lenis would override OS-level
  // vestibular accommodations.
  if (reduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        // LENIS-02 — blueprint §4d "damping ~0.08, light not buttery".
        // `lerp` is the canonical damping parameter per Lenis README.
        // Default is 0.1; 0.08 is slightly lighter.
        lerp: 0.08,

        // Recommended secondary tuning. Lenis uses lerp OR duration;
        // setting both works (duration governs scroll-to() calls, lerp
        // governs wheel input). Keep duration at the documented default.
        duration: 1.2,

        // LENIS-03 / PITFALLS.md D2 — locked false.
        // iOS gets native momentum scroll, which is correct.
        // DO NOT enable. Documented in .claude/CLAUDE.md.
        syncTouch: false,

        // Wheel input smoothing — required for desktop foyer reading rhythm.
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

**Verified against:**
- Lenis React README (verified via WebFetch 2026-05-14): `<ReactLenis root options={{ ... }}>` is the canonical pattern
- Lenis main README: `lerp: 0.1` is default, options shape confirmed
- PITFALLS.md D2: `syncTouch: false` locked, documented in CLAUDE.md
- React 19 docs: `useEffect` + `useState` are SSR-safe with the first-render-false-update-after-hydration pattern

**Note on Lenis 1.3 vs older patterns:** Older tutorials (pre-1.0) used `smoothTouch: true` which was removed. Newer tutorials sometimes show `lerp` and `duration` together — that's fine; Lenis uses both correctly. Verified the option names against current README, not a 2024 blog.

### Example 3: `app/globals.css` ADDITIONS (delta from Phase 1)

Phase 1's `app/globals.css` ends with a comment block reserving lines for Phase 2's View Transition keyframes. Phase 2 replaces that comment block with the following CSS, appended after the existing `@theme` and base-typography sections:

```css
/* ============================================================
 * VIEW TRANSITIONS — Phase 2 (TRANS-02, TRANS-03)
 *
 * The foyer↔theater route navigation triggers a 600ms cross-fade.
 * Foyer routes use cream paper background; theater routes use obsidian
 * ground. The browser captures the outgoing root as ::view-transition-old(root)
 * and the incoming root as ::view-transition-new(root), then applies the
 * animations below.
 *
 * Source: blueprint §4d "600ms ease-in-out"; ARCHITECTURE.md §4.1 File 3;
 *         PITFALLS.md B2 (reduced-motion kill-switch).
 *
 * NOTE: The actual background color of each snapshot comes from the
 * route group's data-mode attribute (Phase 4). Phase 2 only animates
 * opacity — the perceived "cream recedes / theater rises" effect comes
 * from the snapshots themselves having different backgrounds.
 * ============================================================ */
:root {
  --duration-mode-fade: 600ms;
}

::view-transition-old(root) {
  animation: var(--duration-mode-fade) ease-in-out both fade-out;
}

::view-transition-new(root) {
  animation: var(--duration-mode-fade) ease-in-out both fade-in;
}

@keyframes fade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ----------------------------------------------------------------
 * Reduced-motion kill-switch (TRANS-03, A11Y-05).
 *
 * View Transitions API does NOT auto-honor prefers-reduced-motion
 * (verified PITFALLS.md B2). We explicitly neutralize all
 * ::view-transition-* pseudo-elements when the user opts in.
 *
 * The 0.001ms duration (vs `animation: none`) preserves the keyframe
 * trajectory but makes it imperceptible — avoids any visible "jump"
 * from start state to end state at the snapshot boundary.
 * Reference: WAI Animation-from-Interactions guidance.
 * ---------------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root),
  ::view-transition-group(*) {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

**Verified against:**
- ARCHITECTURE.md §4.1 File 3 (canonical CSS shape)
- Next.js View Transitions guide (2026-05-13): `::view-transition-old(root)` and `::view-transition-new(root)` are correct selector names
- W3C CSS View Transitions Module Level 1
- WAI ANIM-from-Interactions: 0.001ms convention is documented

**Note on `[data-mode="foyer"]` ↔ `[data-mode="theater"]` crossfade logic (mentioned in orchestrator prompt deliverable #1):** The crossfade IS the View Transition. The `data-mode` attribute lives on the group-layout `<div>` (Phase 4) and changes the page's background-color via the existing `[data-mode="foyer"]` and `[data-mode="theater"]` selectors in Phase 1's globals.css. When the route changes from a foyer route to a theater route, the entire `<div data-mode>` element changes, the browser snapshots both states, and the opacity fade above animates the swap. No separate `[data-mode]`-specific transition CSS is needed — Phase 1's mode selectors handle the color; Phase 2's view-transition keyframes handle the animation. (This is exactly the pattern ARCHITECTURE.md §9.2 describes.)

### Example 4: `next.config.ts` (confirmation, NO CHANGE NEEDED)

Phase 1 already wired `experimental.viewTransition: true`. Verified by reading the current file:

```ts
// next.config.ts — current Phase 1 contents (NO CHANGE for Phase 2)
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: { root: __dirname },
  experimental: {
    viewTransition: true,  // ✓ already enabled
  },
};

const withMDX = createMDX({ options: { remarkPlugins: [], rehypePlugins: [] } });
export default withMDX(nextConfig);
```

**Phase 2 action:** None. Verify the file unchanged after Phase 2 file writes.

### Example 5: `components/view-transition-link.tsx` (NEW, full file)

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

**Verified against:**
- Next.js router docs: `useRouter().push()` is the correct programmatic-navigation API
- Vercel Labs reference: `document.startViewTransition(() => router.push(href))` is the canonical pattern
- Can I Use (verified 2026): Safari 18+, Firefox 144+, Chrome 111+ support same-document View Transitions

**TypeScript note:** `lib.dom.d.ts` in TS 6.0.3 may or may not have `startViewTransition` typed depending on `target` setting. The `@ts-expect-error` is a one-line escape; alternatively cast `document as Document & { startViewTransition: (cb: () => void) => ViewTransition }`. Either is fine; the comment makes the rationale explicit.

### Example 6: `instrumentation.ts` UPDATED (full file)

```ts
// instrumentation.ts
//
// Phase 2 — COPY-03. Build-time copy-lint scanner. Runs once per `pnpm build`
// (gated to NEXT_PHASE === 'phase-production-build') and throws with
// file:line:column on any banned-word finding.
//
// Phase 1 left this as a no-op stub. Phase 2 wires the scanner.
//
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
//         + COPY-03 in REQUIREMENTS.md
//         + lib/copy-lint.ts (Phase 1 — scanString already implemented correctly)
//
// Why dynamic import: keeps the scanner code out of the request-time bundle.
// register() runs once at server boot; the import resolves on first call only.
export async function register() {
  // Only run during production build, never at dev or runtime request.
  // NEXT_PHASE values: 'phase-development-server' | 'phase-production-server'
  //                  | 'phase-production-build' | 'phase-export'.
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NEXT_PHASE !== "phase-production-build") return;

  const { runCopyLint } = await import("./lib/copy-lint-runner");
  await runCopyLint();
}
```

### Example 7: `lib/copy-lint-runner.ts` (NEW, full file)

```ts
// lib/copy-lint-runner.ts
//
// Phase 2 — COPY-03. Walks the project directories, reads each file, and
// runs scanString() from lib/copy-lint.ts. Aggregates findings and throws
// a build-failing Error if any are found.
//
// Why a separate file (instead of inlining in instrumentation.ts):
//   - Keeps node:fs imports out of the instrumentation register() bundle
//     (which is supposed to be small; Next.js complains if it grows too much).
//   - Enables direct import from a future CLI script (`pnpm lint:copy`) if
//     we ever want a standalone command without going through `next build`.
//   - Easier to unit-test in isolation.
//
// Source: lib/copy-lint.ts (Phase 1 scanString); COPY-03 spec.
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { scanString, type Finding } from "@/lib/copy-lint";

const SCAN_TARGETS = [
  { dir: "content", extensions: [".mdx", ".md", ".ts"] }, // case studies + content/site.ts + content/citations.ts
  { dir: "app", extensions: [".tsx", ".ts"] }, // app/**/*.tsx — page.tsx, layout.tsx, metadata exports
];

/**
 * Recursively walk a directory, yielding absolute paths of files whose
 * extensions match any of the provided list. Skips node_modules, .next, .git.
 */
async function* walk(dir: string, extensions: string[]): AsyncGenerator<string> {
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return; // directory doesn't exist yet (e.g., content/ before Phase 7)
  }

  for (const entry of entries) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
    const full = join(dir, entry);
    const s = await stat(full);
    if (s.isDirectory()) {
      yield* walk(full, extensions);
    } else if (extensions.some((ext) => entry.endsWith(ext))) {
      yield full;
    }
  }
}

/**
 * Scan every targeted file. Throws on any finding.
 */
export async function runCopyLint(): Promise<void> {
  const cwd = process.cwd();
  const findings: Finding[] = [];

  for (const target of SCAN_TARGETS) {
    const root = join(cwd, target.dir);
    for await (const filePath of walk(root, target.extensions)) {
      const content = await readFile(filePath, "utf-8");
      const relPath = filePath.slice(cwd.length + 1).replace(/\\/g, "/");
      findings.push(...scanString(content, relPath, 1));
    }
  }

  if (findings.length === 0) {
    console.log(`[copy-lint] ✓ Scanned project. Zero banned-word findings.`);
    return;
  }

  console.error(`\n[copy-lint] ${findings.length} banned word finding(s):\n`);
  for (const f of findings) {
    console.error(`  ${f.filePath}:${f.line}:${f.column} — "${f.word}" in: "...${f.excerpt}..."`);
  }
  console.error("");

  // Throw to fail the build.
  throw new Error(
    `copy-lint: ${findings.length} banned word(s) found across project. ` +
      `Fix the prose or update lib/banned.ts. Build aborted.`,
  );
}
```

**Verified against:**
- Existing `lib/copy-lint.ts` exports `scanString(text, filePath, lineOffset) → Finding[]` — Phase 1 scaffold is reused as-is, no modification needed
- Next.js instrumentation docs: `register()` running once at boot + supporting `await import()` for code-splitting
- Phase 1's `lib/banned.ts` 30-word list

### Example 8: `lib/copy-lint.ts` (NO CHANGE for Phase 2 core; OPTIONAL em-dash extension)

Phase 1's `lib/copy-lint.ts` already implements `scanString()` correctly. Phase 2's `copy-lint-runner.ts` consumes it directly. **No edits required** unless we want to add the optional em-dash counter (COPY-05).

If adding COPY-05 (recommended as nice-to-have, treat as warn not fail):
```ts
// Append to lib/copy-lint.ts
/**
 * Count em-dashes (— U+2014) in a text. Em-dashes are an AI tell;
 * blueprint §8 voice rule caps at one per page.
 */
export function countEmDashes(text: string): number {
  return (text.match(/—/g) ?? []).length;
}
```

Then in `copy-lint-runner.ts`, after aggregating banned-word findings, optionally:
```ts
// Em-dash warn (COPY-05). Per-file count check — warns, doesn't fail.
for await (const filePath of walk(/* app dir */, [".mdx"])) {
  const content = await readFile(filePath, "utf-8");
  const count = countEmDashes(content);
  if (count > 1) {
    console.warn(
      `[copy-lint] ⚠ ${filePath.slice(cwd.length + 1)}: ${count} em-dashes ` +
        `(blueprint §8 caps at 1 per page — AI tell).`,
    );
  }
}
```

This is purely additive; can be skipped if Phase 2 wants to keep scope tight. Note: COPY-04 (voice rules) and COPY-05 strictly are subagent-enforced per the orchestrator prompt; the em-dash counter is the only mechanically-checkable rule of the two.

### Example 9: `package.json` (NO CHANGE for Phase 2)

The orchestrator prompt asks whether to add a `"lint:copy": "node scripts/lint-copy.mjs"` script. **Recommendation: do NOT add a separate script.** Justification:

- `instrumentation.ts` integrates with `pnpm build` automatically — every production build runs the scanner. This is the cleaner path.
- A standalone `pnpm lint:copy` script would be redundant. Engineers who want to lint-check without a full build can run `NEXT_PHASE=phase-production-build node -e "import('./instrumentation.ts').then(m => m.register())"` but this is rare.
- The harness `copy-lint.sh` hook ALREADY runs at write boundary, catching most violations before they reach instrumentation.ts.
- Avoid script proliferation. `pnpm build` is the canonical "is everything OK?" command.

**If we change our minds:** Add `"lint:copy": "tsx -e \"import('./lib/copy-lint-runner').then(m => m.runCopyLint()).catch(() => process.exit(1))\""` to `package.json` scripts. Requires `tsx` as devDependency (not currently installed).

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@studio-freight/react-lenis` | `lenis@^1.3` with `lenis/react` subpath | Late 2024 (Darkroom Engineering rebrand) | Old package retired. Anyone with 2023 tutorials will install the wrong one. |
| Lenis `smoothTouch: true` | Lenis `syncTouch: false` (default) | Lenis 1.0 (early 2024) | `smoothTouch` removed; replacement `syncTouch` should generally be left `false` for iOS native momentum |
| `next-view-transitions` userland package | React 19 `<ViewTransition>` from `react` (with `next.config.ts` `experimental.viewTransition: true`) | Next.js 15.x (early 2025) | Native React primitive supersedes userland; one fewer dependency |
| Manual `setLenis()` + `useEffect` RAF loop | `<ReactLenis root>` from `lenis/react` | Lenis 1.x React adapter | Handles strict-mode double-mount + cleanup correctly |
| `@vercel/analytics/react` import | `@vercel/analytics/next` import | 2024 (Vercel SDK split) | `/next` subpath defers script after hydration (~30ms LCP win) |
| Manual `fs.readFile` + AST parse for build-time validation | Next.js `instrumentation.ts` `register()` hook | Next.js 14+ (stable) | Canonical convention for build-time hooks; gated by `NEXT_PHASE` |
| `prefers-reduced-motion` ignored on View Transitions | Explicit CSS kill-switch with `animation-duration: 0.001ms !important` | WAI guidance + W3C VT spec | Browser doesn't auto-honor reduced motion; you must do it manually |

**Deprecated/outdated patterns to refuse:**
- **Locomotive Scroll** — unmaintained since Darkroom rebrand. Use Lenis.
- **`@studio-freight/react-lenis`** — retired. Use `lenis/react`.
- **`smoothTouch: true`** — option removed at v1.0. Don't pass it.
- **`syncTouch: true` "to fix iOS feel"** — overrides native momentum, causes stutter (PITFALLS.md D2).
- **`<ViewTransition>` from `next`** — wrong module. Always `from 'react'`.
- **Multiple root layouts (one per group)** — kills view transitions with full page reload. Single root, group layouts nested.
- **`<LenisProvider>` inside a group layout** — unmounts on cross-group navigation. Mount at root.
- **`animation: none` for reduced motion on VT** — produces visible jump. Use `animation-duration: 0.001ms !important`.

---

## Open Questions

1. **Should `LenisProvider` re-export `useLenis` or let consumers import directly from `lenis/react`?**
   - What we know: both work. Re-export documents the integration point.
   - What's unclear: nothing — this is purely stylistic.
   - Recommendation: re-export. One additional line in `LenisProvider.tsx` makes the contract explicit and Phase 5's import statement reads as `from '@/components/LenisProvider'` (consistent with the rest of the codebase) rather than `from 'lenis/react'`.

2. **Should the em-dash check (COPY-05) be added to copy-lint-runner.ts as a warn?**
   - What we know: em-dashes are an AI tell; blueprint §8 caps at 1 per page. The check is mechanically straightforward (count `—` characters per file).
   - What's unclear: whether to fail or warn, and whether Phase 2 owns this or it's deferred to copy-editor subagent (per orchestrator prompt COPY-04/05 are "manually enforced by copy-editor subagent").
   - Recommendation: add `countEmDashes()` helper to `lib/copy-lint.ts` (additive, ~5 lines) but DON'T wire to runner in Phase 2. Subagent enforces, helper exists for future scripts.

3. **Should `view-transition-link.tsx` ship in Phase 2 if no consumer exists yet?**
   - What we know: orchestrator prompt deliverable #5 says yes. Phase 3 (Nav) and Phase 6 (foyer pages) will consume.
   - What's unclear: nothing — Phase 2 plumbing should include the link wrapper.
   - Recommendation: ship the file. Zero bundle cost if not imported. Forward-references show planner that Phase 3+ has a clean affordance.

4. **Does `<ViewTransition>` need a `name` or `default` prop?**
   - What we know: ARCHITECTURE.md §4.1 File 2 shows `<ViewTransition name="root" default="cross-fade">` in the canonical example. But the Next.js View Transitions guide (2026-05-13) shows simpler usage without `default`. The `name="root"` is implicit when the wrapper is at the top level — `::view-transition-old(root)` and `::view-transition-new(root)` are the default pseudo-element names.
   - What's unclear: whether explicit `name="root"` adds value vs is redundant.
   - Recommendation: ship without props (`<ViewTransition>{children}</ViewTransition>`) for minimal surface. If Phase 4 verification shows the transition doesn't fire, add `name="root"` explicitly. Phase 2 should not over-specify.

5. **Should `LenisProvider`'s `useReducedMotion` hook be extracted to `lib/use-reduced-motion.ts` for Phase 5+ reuse?**
   - What we know: TitleCard (Phase 5), PullQuote underline-grow (Phase 7), and hover lifts (Phase 3+) all need the same hook.
   - What's unclear: extraction timing — extract in Phase 2 for cleanness, or extract in Phase 5 when second consumer arrives.
   - Recommendation: keep inline in LenisProvider.tsx for Phase 2 (single consumer); extract in Phase 5 when TitleCard needs it. Premature extraction adds a file with no DRY benefit yet.

6. **Should instrumentation.ts also validate against existing TSX files in Phase 2 (when no content/ directory exists yet)?**
   - What we know: `content/` doesn't exist yet (Phase 7+). `app/` has only `layout.tsx` + `globals.css` (Phase 1). The `walk()` function should gracefully handle missing directories (already coded with try/catch on `readdir`).
   - What's unclear: nothing — graceful skip is correct.
   - Recommendation: ship as designed. The scanner will find zero violations in Phase 2's tiny file set, but the integration will be confirmed working when Phase 6+ adds pages.

---

## Verification Approach

Phase 2 has no visible UI, so verification is build-success + code-correctness review + manual smoke test in dev.

### Required verification steps (in order)

1. **`pnpm typecheck`** — strict-mode TypeScript passes with zero errors.

2. **`pnpm build`** — production build succeeds. Confirm in build output:
   - No "ReferenceError: window is not defined" (catches SSR mistakes in LenisProvider).
   - `[copy-lint] ✓ Scanned project. Zero banned-word findings.` log line appears (confirms instrumentation.ts ran).
   - `@font-face` rules in `.next/static/css/*.css` still include `size-adjust` / `ascent-override` (Phase 1 verification carry-forward — Phase 2 shouldn't regress).
   - First-load JS for `/` route ≤ 90KB (no GSAP, no Framer Motion, no surprise heavy imports). Lenis adds ~3KB gzipped, expected.

3. **`pnpm dev` smoke test** — visit `http://localhost:3000/`. Expected:
   - Blank page renders (no Phase 1+2 content; root layout has no inner UI).
   - Browser DevTools Console shows no errors.
   - `window.lenis` may or may not be set depending on Lenis exposure (not required for Phase 2; Phase 5 verifies).
   - `Network` tab shows the Vercel Analytics script loaded with `defer` / after hydration.
   - Toggling OS `prefers-reduced-motion` and refreshing: visiting the same blank page should still render without errors (Lenis short-circuits to native scroll).

4. **Manual banned-word simulation:**
   - Temporarily add `export const test = "drive results";` to `app/layout.tsx`.
   - Run `pnpm build`.
   - Expected: build FAILS with `app/layout.tsx:N:N — banned word "drive"` (where N is the line/col of the literal).
   - Remove the test string; rebuild to confirm clean.

5. **`prefers-reduced-motion` CSS smoke test (optional, more rigorous):**
   - In DevTools, emulate "reduce" motion preference.
   - Open `.next/static/css/*.css` in DevTools sources.
   - Confirm the `@media (prefers-reduced-motion: reduce)` rule includes the `animation-duration: 0.001ms !important` block on `::view-transition-*` selectors.
   - Phase 4 will visually verify the transition itself.

### What Phase 2 verification does NOT cover (deferred to Phase 4+)

- The 600ms cross-fade animation itself. Requires 2 routes that visibly differ (foyer paper vs theater ground). Phase 4 stub pages enable this; Phase 4's verification is the canonical "TRANS-05 confirmed in DevTools Performance panel."
- The Lenis↔ScrollTrigger bridge. Requires GSAP, which is Phase 5 only.
- Visual QA at 390/768/1440. There's nothing visible to QA in Phase 2.
- Lighthouse Performance ≥ 95. Phase 10 hardening pass.

---

## Phase 5 Forward-Reference (Lenis↔ScrollTrigger bridge)

Phase 2 ships the LenisProvider with `useLenis` re-exported. Phase 5's `components/TitleCard.tsx` will consume it like this:

```tsx
// Phase 5 — components/TitleCard.tsx (DO NOT IMPLEMENT in Phase 2)
'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@/components/LenisProvider';

gsap.registerPlugin(ScrollTrigger);

export function TitleCard({ words }: { words: string[] }) {
  // LENIS-04 bridge — fires on every Lenis scroll event,
  // keeps ScrollTrigger pin position accurate when Lenis is active.
  useLenis(() => ScrollTrigger.update());

  useGSAP(() => {
    // ... pin + resolve animation
  }, { scope: ref });

  return <div ref={ref}>{/* word stack */}</div>;
}
```

This bridge is the **canonical pattern** for Lenis + GSAP per the DevDreaming 2026 guide and the architecture research. Phase 2 just makes `useLenis` available; Phase 5 wires the bridge inside the GSAP-importing component. No GSAP import in Phase 2.

**The `useLenis` callback fires on every scroll frame.** ScrollTrigger.update() recomputes pin positions, scrub progress, and trigger boundaries. Without this bridge, Lenis would lerp the scroll position while ScrollTrigger reads `window.scrollY` directly, causing pin lag. With the bridge, they stay synchronized.

---

## Sources

### Primary (HIGH confidence)

- [Next.js View Transitions Guide (2026-05-13)](https://nextjs.org/docs/app/guides/view-transitions) — `<ViewTransition>` from `react`, `::view-transition-old/new(root)` CSS, reduced-motion handling
- [Next.js `viewTransition` config reference](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition) — `experimental.viewTransition: true` confirmation
- [Next.js Instrumentation File Conventions](https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation) — `register()` hook, `NEXT_PHASE` values, dynamic-import pattern
- [React 19 ViewTransition reference](https://react.dev/reference/react/ViewTransition) — primitive marker, transition activation
- [Lenis README (Darkroom Engineering)](https://github.com/darkroomengineering/lenis) — verified 2026-05-14: option shape, `lerp` IS the damping parameter, defaults (lerp:0.1, duration:1.2, syncTouch:false)
- [Lenis React README](https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md) — verified 2026-05-14: `<ReactLenis root options={{}}>` canonical usage, `useLenis` hook signature
- [Vercel Analytics Quickstart](https://vercel.com/docs/analytics/quickstart) — `/next` subpath, `<Analytics />` placement
- [`.planning/research/STACK.md`](../../research/STACK.md) — project-level stack research (HIGH confidence overall)
- [`.planning/research/ARCHITECTURE.md`](../../research/ARCHITECTURE.md) — §3 route groups, §4 View Transitions, §6 component boundaries, §10 anti-patterns
- [`.planning/research/PITFALLS.md`](../../research/PITFALLS.md) — B2 (reduced-motion + VT), C2 (Lenis SSR), C3 (VT feature-detect), D1 (browser-compat), D2 (syncTouch:false locked), A4 (GSAP quarantine)

### Secondary (MEDIUM confidence)

- [Build with Matija — Google Fonts in Next.js 15 + Tailwind v4](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) — Phase 1 carry-forward; not directly Phase 2 but confirms `@theme` re-declaration approach
- [Vercel Labs react-view-transitions-demo (GitHub)](https://github.com/vercel-labs/react-view-transitions-demo) — reference implementation pattern for `withViewTransition` wrapper
- [DevDreaming "Smooth Scrolling in Next.js with Lenis & GSAP (2026 Guide)"](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap) — Lenis↔ScrollTrigger bridge pattern (relevant for Phase 5 forward-reference, not Phase 2 implementation)

### Tertiary (LOW confidence — none flagged)

No Phase 2 finding relies on a single unverified source. All HIGH-confidence claims are backed by Context7-equivalent verification (Lenis README WebFetch 2026-05-14) or official docs.

---

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** — all packages already installed and verified in `package.json`; versions match STACK.md research
- Architecture: **HIGH** — single-root-layout pattern verified against Next.js View Transitions guide (2026-05-13) + ARCHITECTURE.md §3
- View Transitions wiring: **HIGH** — three-file pattern (`next.config.ts` + `<ViewTransition>` + globals.css keyframes) verified
- Lenis configuration: **HIGH** — README WebFetch 2026-05-14 confirmed options shape, `lerp` semantics, `syncTouch` default
- Reduced-motion kill-switch: **HIGH** — WAI guidance + PITFALLS.md B2 verified pattern
- Copy-lint scanner: **HIGH** — Phase 1 `scanString()` reused unchanged; `instrumentation.ts` gating to `NEXT_PHASE` verified
- Browser-compat fallback: **HIGH** — Can I Use 2026 + Vercel Labs reference confirm feature-detect pattern
- Phase 5 forward-reference: **MEDIUM** — Lenis↔ScrollTrigger bridge pattern is canonical but documented by a community guide (DevDreaming) more than official docs. The bridge code is one line (`useLenis(() => ScrollTrigger.update())`) and verified by hand — minimal risk.

**Research date:** 2026-05-14

**Valid until:** 2026-06-14 (30 days for stable Next 16 / React 19 / Lenis 1.3 / Vercel SDKs). If Lenis ships a 1.4 with breaking option changes or Next.js 16.3 changes `experimental.viewTransition`, re-verify before the next planning phase.

**Phase 2 file count summary:**
- 2 new files: `components/LenisProvider.tsx`, `components/view-transition-link.tsx`, `lib/copy-lint-runner.ts` (3 actually, counted above as 2 because copy-lint-runner is a helper extraction; if planner prefers, inline runner into instrumentation.ts and the count drops to 2)
- 4 edited files: `app/layout.tsx`, `app/globals.css`, `instrumentation.ts`, optionally `lib/copy-lint.ts` (em-dash helper, optional)
- 0 new dependencies
- ~150 lines of new code total across all files

**Ready for planning.** The planner has copy-pasteable content for every deliverable in the orchestrator prompt. Phase 2 is small in scope but high in cross-cutting impact — once these eight files ship, every subsequent phase inherits View Transitions, smooth scroll, banned-word enforcement, and analytics for free.
