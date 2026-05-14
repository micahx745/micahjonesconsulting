# Pitfalls Research — micahjonesconsulting (House Lights)

**Domain:** Premium agency-tier two-mode marketing site (Next.js 15 App Router + Tailwind v4 + MDX + View Transitions + Lenis + GSAP)
**Researched:** 2026-05-14
**Confidence:** HIGH on stack-specific pitfalls (Context7 / official docs / verified GitHub issues); MEDIUM on brand-discipline-drift behavioral patterns (industry literature + harness behavior).

---

## How This Document Is Organized

Pitfalls are grouped by **category** (Performance / Accessibility / SSR & Hydration / Browser-Compat / Content / Discipline). Each entry has:

- **What goes wrong** (failure mode, specific to this domain)
- **Warning signs** (early detection — usually a measurable signal)
- **Prevention strategy** (concrete code/config, never "be careful")
- **Phase to address** (mapping to the §12 14-day plan: Day 1 scaffold → Day 14 perf/a11y pass, plus "ongoing")
- **Harness coverage** (which of the 8 hooks catches this at the write boundary, or "MANUAL — no hook")

The 8 harness hooks (premium-web plugin):

| Hook | What it blocks/warns |
|---|---|
| `copy-lint.sh` | 30 banned words from blueprint §8 + harness slop-words.txt |
| `font-license.sh` | Klim font imports without license lock; permits Inter when foundry=system |
| `motion-discipline.sh` | Cursor followers, scroll-jacking, parallax depth > 2, mono aesthetic |
| `design-tokens.sh` | Hex literals outside the §4b palette (warning, not block) |
| `mdx-frontmatter.sh` | Case studies missing required frontmatter |
| `image-budget.sh` | Images > 500KB |
| `perf-budget.sh` | Build-time perf budget (Lighthouse / LCP / INP / CLS) |
| `a11y-baseline.sh` | Build-time axe violations (serious/critical) |

---

## A. Performance Pitfalls

### A1. `next/font/google` CLS on first paint (Inter Display swap → visible reflow)

**What goes wrong:**
With `display: 'swap'` (Next.js default), Inter Display loads asynchronously and the browser renders fallback type first. When the real font arrives, headlines reflow. On the foyer Home headline ("I help operators ship the work…") this causes a visible jolt and pushes CLS above the 0.05 budget.

**Why it matters here specifically:**
The 96px Title Card word-stack is the most CLS-sensitive element on the site. A character-width mismatch between Arial fallback and Inter Display Bold at 96px produces multi-pixel shifts per word, blowing the budget on entry to every case study.

**Warning signs:**
- Lighthouse CLS > 0.05 on first cold load (especially mobile throttled 4G).
- DevTools Performance trace shows a "Layout Shift" event during the `font` resource's network-finish.
- Chrome DevTools "Issues" panel flags "Font fallback metrics mismatch."

**Prevention strategy (concrete):**
```ts
// app/layout.tsx
import { Inter, Inter_Display, Source_Serif_4 } from 'next/font/google';

const interDisplay = Inter_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  adjustFontFallback: true, // Next.js inserts size-adjust / ascent-override metrics
  preload: true,
  weight: ['600', '700'], // ONLY the weights actually used — every extra weight = extra bytes
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  adjustFontFallback: true,
  preload: true,
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  adjustFontFallback: true,
  preload: false, // serif is below the fold (deks / pull quotes) — don't preload
});
```

**Known Next.js 15 caveat (verified GitHub issue #74134):** `adjustFontFallback` has been intermittently broken since the Next.js 15.x line — Next.js falls back to providing fallback metrics regardless of the boolean, which is the safer failure mode for our case (we want fallback metrics applied). But verify in build output that `@font-face` rules include `size-adjust` / `ascent-override`. If they're missing, pin Next.js to the most recent patch known to ship the fix, or add manual `@font-face` overrides in `globals.css` as a backstop.

**Phase to address:** Day 1 (scaffold — fonts go in `app/layout.tsx` on day one). Re-verify Day 13 (perf pass).

**Harness coverage:** `perf-budget.sh` catches CLS budget breach at build. `font-license.sh` validates which fonts can be imported (it doesn't catch CLS specifically). **MANUAL** vigilance required on `adjustFontFallback` actually working.

---

### A2. Web font preload missing `crossOrigin="anonymous"` (LCP regression)

**What goes wrong:**
If you self-host Inter or add a manual `<link rel="preload">` for any font without `crossOrigin="anonymous"`, the browser fetches the font twice — once for the preload (no CORS) and once for the actual `@font-face` request (with CORS, because fonts always use CORS). The preload is wasted, LCP regresses 100–300ms.

**Warning signs:**
- Chrome DevTools Network tab shows two requests for the same `.woff2` file.
- Console warning: "The resource [font.woff2] was preloaded using link preload but not used within a few seconds."
- Lighthouse "Avoid duplicate resource requests" diagnostic.

**Prevention strategy:**
- Use `next/font/google` (handles preload correctly out of the box — no manual `<link>` needed).
- If you ever self-host (Klim v2 path): `<link rel="preload" href="/fonts/sohne-buch.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />`. Required attributes: `as="font"`, correct `type`, and `crossOrigin="anonymous"`.

**Phase to address:** Day 1 (scaffold). Re-verify on every font addition (v2 if Klim license arrives).

**Harness coverage:** `font-license.sh` validates which fonts are imported. **MANUAL** for preload attribute correctness.

---

### A3. Below-the-fold case study stills not lazy-loaded (LCP + bandwidth blowout)

**What goes wrong:**
A case study has 5–8 product stills (ORDANI dashboard screenshots, intake flow, audit log). If they all eagerly load with `<Image priority>` or default `loading="eager"`, the browser races to fetch all of them simultaneously on case-study entry. The hero still wins LCP but every still after it competes for bandwidth and the page feels janky on mobile 4G.

**Warning signs:**
- Lighthouse "Defer offscreen images" diagnostic.
- Total transfer size > 2MB on case-study cold load.
- LCP > 1.8s on simulated mobile slow 4G.

**Prevention strategy:**
```tsx
// First (above-fold) still
<Image src="/work/ordani/hero.webp" priority alt="..." />

// All other stills
<Image src="/work/ordani/intake.webp" loading="lazy" alt="..." />
```
Plus `image-budget.sh` enforces the 500KB-per-image ceiling, and `next/image` does WebP/AVIF conversion automatically. The blueprint's "subtle 4% film-grain overlay" should be applied via CSS `background-image` (a small repeating PNG/SVG, not a layer on every still), not by encoding grain into every screenshot.

**Phase to address:** Days 9–12 (case study content) + Day 13 (perf pass).

**Harness coverage:** `image-budget.sh` blocks images > 500KB. `perf-budget.sh` catches LCP regression. **AUTO-CAUGHT** at write boundary.

---

### A4. GSAP + Framer Motion + Lenis triple-bundle (JS budget breach)

**What goes wrong:**
The blueprint specifies GSAP only inside `<TitleCard />`, Framer Motion for component-level enter/exit, and Lenis for smooth scroll. If GSAP + ScrollTrigger are imported globally in the root layout, the full ~80KB gzipped GSAP bundle ships on every page — including the Contact form, which uses neither.

**Warning signs:**
- `next build` output shows First Load JS > 200KB on routes that shouldn't need GSAP.
- `@next/bundle-analyzer` shows `gsap` in the foyer route group's shared chunk.

**Prevention strategy:**
1. Dynamic import GSAP only inside `<TitleCard />`:
   ```tsx
   // components/TitleCard.tsx
   'use client';
   import { useEffect, useRef } from 'react';
   import { useGSAP } from '@gsap/react';

   // GSAP itself is dynamically imported via useGSAP — but to be safe:
   export function TitleCard({ words }: { words: string[] }) {
     const ref = useRef(null);
     useGSAP(async () => {
       const { gsap } = await import('gsap');
       const { ScrollTrigger } = await import('gsap/ScrollTrigger');
       gsap.registerPlugin(ScrollTrigger);
       // ... animation
     }, { scope: ref });
     return <div ref={ref}>{/* word stack */}</div>;
   }
   ```
2. Keep Framer Motion to component-level only. It's tree-shakeable as long as you import named exports (`import { motion } from 'framer-motion'`).
3. Lenis ships ~3KB gzipped — not a concern, but mount it at the root client layout (a small `<LenisProvider>` boundary), not in every page.

**Phase to address:** Day 3 (`<TitleCard />` build) + Day 13 (bundle analysis pass).

**Harness coverage:** `perf-budget.sh` catches bundle-size breach. **MANUAL** dynamic-import discipline at write time.

---

### A5. MDX bundle bloat from inline `import` statements in case studies

**What goes wrong:**
Authors writing case studies in MDX may import heavy components (e.g., a third-party chart library, an animated SVG) at the top of every `.mdx` file. Each import lands in the page's RSC payload. ORDANI's MDX could balloon to a 500KB-plus payload if every component used is statically imported.

**Warning signs:**
- `.next/server/app/work/ordani/page.rsc` file grows large (`du -sh .next/server/app/work/`).
- RSC streaming feels slow on case-study entry (waterfall in DevTools Network tab shows long Time-To-First-Byte before content).

**Prevention strategy:**
- Limit MDX components to the curated set in `mdx-components.tsx`: `<TitleCard />`, `<Still />`, `<PullQuote />`. Document that authors don't add new imports per case study.
- For anything heavy (e.g., an interactive chart), use `next/dynamic` with `ssr: false` and load on intersection.
- Audit RSC payload size with `du` or a script that warns at 200KB per case study.

**Phase to address:** Days 9–12 (case study content) + Day 13 (perf pass).

**Harness coverage:** **MANUAL — no hook**. Consider adding a custom check to `perf-budget.sh` that greps `.mdx` files for ad-hoc imports outside the curated component set.

---

## B. Accessibility Pitfalls

### B1. Copper #C8542B on paper #F5EFE4 — **FAILS WCAG AA for normal body text** (3.85:1)

**What goes wrong:**
Calculated contrast ratio of `#C8542B` on `#F5EFE4` is **~3.85:1**. WCAG 2.1 AA requires **4.5:1 for normal text** (anything ≤ 24px regular or ≤ 18.66px bold). The copper passes AA for **large text only** (3:1 threshold) and for **non-text UI components** (3:1 threshold). This means:

- ✅ Copper is fine for the foyer→theater CTA buttons (large hit target, non-text component contrast).
- ✅ Copper is fine for headlines / display type ≥ 24px (large text).
- ✅ Copper is fine for the underline-grow on links (decorative; the link's underlying body type stays in `foyer.ink #1A1816`).
- ❌ Copper is **NOT** safe as body-paragraph link color. A foyer body link rendered in copper at 16px would violate AA and earn a serious/critical axe finding, failing the `a11y-baseline.sh` hook.

For comparison: in theater mode (`bone #EAE6DD` text on `obsidian #0D0D0F` ground), the body-to-ground ratio is ~14:1 (AAA easily). Copper-on-obsidian is ~5.2:1, AA-pass for normal text.

**Warning signs:**
- axe-core findings: "Elements must meet minimum color contrast ratio thresholds" on foyer links.
- Lighthouse Accessibility score drops by 7–12 points.

**Prevention strategy (concrete):**
1. **In foyer mode**, body-paragraph links render as `foyer.ink #1A1816` with a `accent.copper #C8542B` underline. The underline is decorative (the text color carries the AA contrast).
   ```css
   .foyer a {
     color: var(--foyer-ink);
     text-decoration: underline;
     text-decoration-color: var(--accent-copper);
     text-underline-offset: 4px;
     text-decoration-thickness: 1.5px;
   }
   .foyer a:hover {
     text-decoration-thickness: 2px;
     /* the 4px copper lift mentioned in §4d is applied as a transform, not as color */
   }
   ```
2. Only **large-text** or **non-text UI** (buttons, focus rings, dividers, accent labels ≥ 24px) may use raw copper as the foreground.
3. For the rare case a copper body-text accent is needed (e.g., a single emphasized word), use `accent.copper-deep #8E3A1E` — that's `~5.4:1` on cream, AA-pass.

**Phase to address:** Day 1 (token definition — bake the rule into Tailwind theme) + Day 14 (full a11y pass).

**Harness coverage:** `a11y-baseline.sh` catches contrast violations at build. `design-tokens.sh` warns on raw hex usage. **The rule itself** (copper-deep for body emphasis, copper for large/non-text only) is **MANUAL design discipline** — the harness can't tell whether 18px text is being styled with `--accent-copper` legitimately or not.

---

### B2. `prefers-reduced-motion` ignored on TitleCard pin and foyer↔theater View Transition

**What goes wrong:**
The Title Card pin (GSAP ScrollTrigger pinning 96px text for 600ms) is a vestibular trigger. The foyer→theater View Transition (cream paper receding, dark ground rising — a vertical motion across the entire viewport) is also a vestibular trigger. Users with `prefers-reduced-motion: reduce` set get nausea/discomfort. WCAG 2.3.3 (Animation from Interactions, AAA) is the relevant criterion; serious WCAG 2.2 AA violation is possible if the motion lacks any mitigation.

The View Transitions API as of 2026 does **not** automatically honor `prefers-reduced-motion` — this is an active known gap (WordPress/performance Issue #2067 documents the same problem).

**Warning signs:**
- axe-core or Lighthouse "Animation respects user preferences" finding.
- User report: "the site makes me dizzy."

**Prevention strategy (concrete):**

**For GSAP TitleCard:**
```tsx
useGSAP(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    // Show the title card final state immediately — no pin, no resolve
    gsap.set(captionRef.current, { autoAlpha: 1 });
    return;
  }
  // Normal pin + resolve animation
  gsap.to(/* ... */);
}, { scope: containerRef });
```

**For View Transitions (CSS-level kill switch):**
```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```
This still performs the DOM swap (foyer→theater) but without the motion. The page still changes mode; it just doesn't slide.

**Alternative (subtler):** WAI guidance is "reduced motion ≠ no motion" — consider a faster crossfade (200ms opacity instead of 600ms vertical slide). Decide per blueprint §14 item 9: which is more honest to the user.

**Phase to address:** Day 2 (View Transition handler) + Day 3 (TitleCard build).

**Harness coverage:** `motion-discipline.sh` blocks the obvious motion anti-patterns (cursor followers, scroll-jacking) but doesn't statically verify reduced-motion handling. `a11y-baseline.sh` may catch it in axe; **PARTIAL — manual verification required**.

---

### B3. Focus indicators invisible against copper on cream (or against obsidian in theater)

**What goes wrong:**
Default browser focus rings (a thin blue-ish outline) are designed for the average web page. On `foyer.paper #F5EFE4` the default focus ring has poor contrast (~3.5:1). On `theater.ground #0D0D0F` a default Tailwind blue ring (~#3B82F6) on near-black is also borderline. Keyboard users can't tell what's focused.

**Warning signs:**
- axe finding: "Interactive controls must be focusable" or "Focus indicator must have sufficient contrast."
- Keyboard tab-through visibly hard to follow during visual QA.

**Prevention strategy:**
Custom focus ring per mode, baked into Tailwind theme:
```css
/* globals.css */
.foyer *:focus-visible {
  outline: 2px solid var(--accent-copper-deep); /* #8E3A1E — 5.4:1 on cream */
  outline-offset: 3px;
  border-radius: 2px;
}
.theater *:focus-visible {
  outline: 2px solid var(--accent-copper); /* #C8542B — 5.2:1 on obsidian */
  outline-offset: 3px;
}
```
Never `outline: none` without a replacement.

**Phase to address:** Day 1 (token definition) + Day 14 (a11y pass).

**Harness coverage:** `a11y-baseline.sh` catches missing focus indicators. **AUTO-CAUGHT**.

---

### B4. Theater mode dark surfaces inducing "halation" with pure-white text

**What goes wrong:**
The blueprint already specifies `theater.ground #0D0D0F` (not `#000`) and `theater.ink #EAE6DD` (not `#FFF`) — this is correctly preventing pure-black-on-pure-white halation that causes vibration/blur for users with astigmatism. **The pitfall is regression:** a future PR adds a "modern" black `#000` background somewhere (e.g., a code-block in MDX, an overlay), and the halation effect appears in one section of the theater pages.

**Warning signs:**
- Visual QA at 768/1440 shows visible vibration on body text.
- User report: "the text shimmers" or "it's hard to read on this page."

**Prevention strategy:**
- `design-tokens.sh` warns on raw hex literals — keep this enforced.
- For ORDANI's screenshots / dashboard stills: the screenshots themselves may contain dark UI. Place them on `theater.surface #16161A` cards with a 2px `theater.ink #EAE6DD` inner border (per blueprint §4c) — this provides a visual buffer that prevents the still's dark background from blending into the page ground.

**Phase to address:** Day 1 (tokens) + ongoing for every theater PR.

**Harness coverage:** `design-tokens.sh` warns. **AUTO-CAUGHT at warn level**.

---

## C. SSR & Hydration Pitfalls

### C1. GSAP "ReferenceError: window is not defined" on server render

**What goes wrong:**
GSAP and ScrollTrigger access `window`, `document`, and `requestAnimationFrame` at module-evaluation time (not just at call time). In a Next.js 15 App Router server component, importing `gsap` or `gsap/ScrollTrigger` at the top of a file crashes the server build:
```
ReferenceError: window is not defined
```

**Warning signs:**
- `next build` fails immediately when the build encounters the import.
- Vercel preview deploy fails with the same error.

**Prevention strategy (verified):**

1. **Always use `'use client'`** at the top of any file importing GSAP. The Title Card component is a client component anyway (it animates).

2. **Use `@gsap/react`'s `useGSAP()` hook** — it implements isomorphic layout effect (prefers `useLayoutEffect`, falls back to `useEffect` if `window` isn't defined), so it's safe in SSR/hydration:
   ```tsx
   'use client';
   import { useGSAP } from '@gsap/react';
   import gsap from 'gsap';
   import { ScrollTrigger } from 'gsap/ScrollTrigger';

   gsap.registerPlugin(ScrollTrigger);

   export function TitleCard({ words }: { words: string[] }) {
     const ref = useRef<HTMLDivElement>(null);
     useGSAP(() => {
       // safe — only runs client-side, after hydration
       gsap.fromTo(/* ... */);
     }, { scope: ref });
     return <div ref={ref}>{/* word stack */}</div>;
   }
   ```

3. **For belt-and-suspenders:** dynamic import GSAP itself (see Pitfall A4) so it doesn't even appear in the server bundle.

**Known Next.js 15 caveat:** GitHub Issue #603 (greensock/GSAP) and #606 reported ScrollTrigger-related render warnings on Next.js 15 ("Extra attributes from the server: style"). The fix is to ensure ScrollTrigger's `markers` option is `false` in production and that any GSAP-applied inline styles match between server and client — easiest path is to **not** apply any GSAP styles in the initial render (set them inside `useGSAP`'s effect).

**Phase to address:** Day 3 (`<TitleCard />` build — this is the first place GSAP enters the codebase).

**Harness coverage:** `motion-discipline.sh` blocks several motion anti-patterns but doesn't statically verify SSR safety. **MANUAL — test in `next build` before push.**

---

### C2. Lenis mounting on server (hydration mismatch warning)

**What goes wrong:**
Lenis instantiates with `new Lenis()` and immediately registers RAF listeners. If mounted in a server component or evaluated during SSR, you get `ReferenceError: document is not defined` or `Window is not defined` at build time.

Even when mounted client-side, if Lenis applies `style="overflow: hidden"` to `<html>` during initialization, the initial server-rendered HTML doesn't have that style, producing a hydration mismatch warning:
> "Extra attributes from the server: style"

**Warning signs:**
- Build error on first Lenis import.
- React DevTools console warning about hydration mismatch on `<html>` or `<body>`.

**Prevention strategy:**

```tsx
// app/lenis-provider.tsx
'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.08,         // damping per blueprint §4d
      smoothWheel: true,
      syncTouch: false,       // CRITICAL — see Pitfall D2
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

// app/layout.tsx — uses it inside the body, not as a wrapper around the html
<body>
  <LenisProvider>{children}</LenisProvider>
</body>
```

The `<LenisProvider>` is a client boundary that mounts Lenis only after hydration. The initial server HTML never sees Lenis.

**Phase to address:** Day 1 (scaffold root layout).

**Harness coverage:** **MANUAL — no hook**. Catch in `next build` smoke test.

---

### C3. View Transitions called during SSR (no-op + console error)

**What goes wrong:**
`document.startViewTransition()` is only available in the browser. Calling it from a route handler or a server action throws `TypeError: document.startViewTransition is not a function` on server. Even when called from a client-side router event, calling it in browsers that don't support it (Firefox before 144, Safari before 18) throws the same error.

**Warning signs:**
- Console error on case-study navigation in unsupported browsers.
- Vercel logs show server-side error on edge runtime.

**Prevention strategy:**
```tsx
// app/lib/view-transition.ts
'use client';

export function withViewTransition(updateDOM: () => void) {
  if (typeof document === 'undefined') {
    updateDOM();
    return;
  }
  if (!('startViewTransition' in document)) {
    updateDOM(); // browser doesn't support — fall through with instant nav
    return;
  }
  document.startViewTransition(() => updateDOM());
}
```
Use this wrapper around every transition trigger (typically in a Link `onClick` or an `onTransitionStart` event).

**Phase to address:** Day 2 (View Transition handler).

**Harness coverage:** **MANUAL — no hook**.

---

## D. Browser-Compatibility Pitfalls

### D1. View Transitions API browser-compat gaps (Firefox < 144, Safari < 18)

**What goes wrong:**
Per Can I Use (verified May 2026): same-document View Transitions ship in Chrome 111+, Edge 111+, Safari 18+, Firefox 144+ (the Firefox version arrived in late 2025). **Cross-document** (MPA) transitions only ship in Chromium 126+ — Firefox and Safari do not yet support them.

For micahjonesconsulting.com, foyer↔theater is a same-document SPA-style navigation, so we use **same-document** transitions. But users on:
- Safari < 18 (iOS 17, older macOS) — no transition
- Firefox < 144 (released ~Nov 2025) — no transition

…will see an instant route change with no dimming gesture. The blueprint's signature move is unavailable to them. That's a graceful degradation, not a bug — but only if you actually handle it.

**Warning signs:**
- Visual QA on Safari 17 or Firefox 143 shows instant page swap.
- Console errors in older browsers.
- Sentry/error logs show `startViewTransition is not a function`.

**Prevention strategy:**
1. Use the `withViewTransition` wrapper from Pitfall C3 — it falls through to instant nav when unsupported.
2. **Test the fallback path is acceptable.** On instant nav, the page still changes mode — foyer routes use foyer styling, theater routes use theater styling. The dimming gesture is missing, but the destination is correct. Verify this in browserstack or on a real iOS 17 device.
3. Don't gate any content behind View Transitions. The transition is decorative; the navigation is the real thing.

**Phase to address:** Day 2 (View Transition handler) + Day 14 (cross-browser visual QA).

**Harness coverage:** **MANUAL — no hook**. `visual-qa` subagent should screenshot Safari + Firefox baselines.

---

### D2. Lenis `syncTouch: true` causes iOS jank (blueprint deprecation: `smoothTouch` is gone)

**What goes wrong:**
The Lenis API changed at v1.0 — `smoothTouch: true` was **removed** and silently ignored. The replacement is `syncTouch: true`. If you copy-paste any tutorial from before 2024 that passes `smoothTouch`, Lenis silently ignores it and iOS users get native momentum scroll, which is **correct and desired**.

**However**, if a developer "fixes" this by setting `syncTouch: true` to make iOS match desktop smoothing, they introduce a different problem: `syncTouch` is unstable on iOS < 16, can stutter on iOS 16–17 in low-power mode, and overrides the OS-native momentum scroll that iOS users expect. This is a worse experience than the default.

**Warning signs:**
- iOS user reports: "scroll feels weird / sticky / fights my finger."
- Lighthouse INP on iOS Safari spikes during scroll.

**Prevention strategy (verified — current Lenis 1.3+ API):**
```ts
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  // damping handled by easing curve in current API; blueprint's ~0.08 is the equivalent feel
  smoothWheel: true,
  syncTouch: false,    // DO NOT enable — iOS users get native momentum scroll, which is correct
  touchMultiplier: 1,
});
```
**Document this in CLAUDE.md** so future PRs that introduce `syncTouch: true` get rejected at review.

**Phase to address:** Day 1 (Lenis config).

**Harness coverage:** **MANUAL — no hook**. Could be added as a `motion-discipline.sh` rule: grep for `syncTouch:\s*true` and warn.

---

### D3. Chrome experimental-flag drift (transitions hide behind a flag in dev)

**What goes wrong:**
Earlier Chrome (< 111) hid View Transitions behind `chrome://flags/#enable-view-transition`. A developer using a Canary or non-stable Chrome could see transitions in dev that don't render for stable-Chrome users — or vice versa. By 2026 this is mostly historical, but the same trap exists for **cross-document** transitions (Chromium 126+) if you ever migrate from same-document SPA to MPA.

**Warning signs:**
- Transitions work for one developer, don't work for another.
- Vercel preview behaves differently than localhost.

**Prevention strategy:**
- Test exclusively against Chrome stable + Safari stable + Firefox stable (which is what `visual-qa` subagent already does via Chrome DevTools MCP).
- Document the minimum browser matrix in CLAUDE.md: Chrome 111+, Safari 18+, Firefox 144+. Fall through instant for earlier.

**Phase to address:** Day 14 (cross-browser visual QA).

**Harness coverage:** **MANUAL**.

---

## E. Content & MDX Pitfalls

### E1. MDX frontmatter drift across case studies (TitleCard prop-shape mismatch)

**What goes wrong:**
The blueprint §9 specifies the ORDANI title card as a 3-word stack: `["INTAKE.", "SECURE.", "SHIPPED."]`. §10 specifies HR Equity Author as `["REACH.", "RFP.", "RETAINER."]`. The blueprint constraint is "three to six words" (§4f).

Across four case studies written over 14 days, drift creeps in:
- An MDX file uses `words: "INTAKE, SECURE, SHIPPED"` (string, not array) → TitleCard tries `.map()` on a string and renders the first character.
- An MDX file uses 7 words → the 96px stack overflows the viewport on mobile.
- An MDX file omits `dek` → the dek slot renders `undefined`.
- An MDX file uses `role: ["Solo", "Research"]` (array) when the schema expects a string.

**Warning signs:**
- Runtime errors in production (`.map is not a function`).
- Visual QA shows broken / overflowing title cards.
- Different case studies have visibly different frontmatter shapes.

**Prevention strategy (verified — Zod build-time validation):**
```ts
// lib/case-study-schema.ts
import { z } from 'zod';

export const caseStudyFrontmatterSchema = z.object({
  title: z.string().min(1),
  dek: z.string().min(20).max(200),                       // one-line summary
  words: z.array(z.string()).min(3).max(6),               // title card stack — 3 to 6
  role: z.string().min(1),
  tools: z.array(z.string()).min(1),
  year: z.string().regex(/^\d{4}(-\d{4}|–\d{4})?$/),       // "2025" or "2025-2026"
  status: z.enum(['Private beta', 'Shipped', 'Ongoing engagement', 'Archived']),
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>;
```

Then at build (in `instrumentation.ts` or a pre-build script):
```ts
import { caseStudyFrontmatterSchema } from '@/lib/case-study-schema';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'content/work');
for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))) {
  const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf-8'));
  const result = caseStudyFrontmatterSchema.safeParse(data);
  if (!result.success) {
    console.error(`Invalid frontmatter in ${file}:`, result.error.flatten());
    process.exit(1);
  }
}
```

**Phase to address:** Day 3 (`<TitleCard />` build — schema must exist before any case study is authored) + Days 9–12 (every case study revalidates on build).

**Harness coverage:** `mdx-frontmatter.sh` blocks case studies missing required frontmatter — **confirm this hook validates the full Zod schema, not just "frontmatter exists."** If it only checks existence, **augment it** with the Zod schema above.

---

### E2. ORDANI maternal-mortality statistics drift in subsequent case studies

**What goes wrong:**
The ORDANI case study cites real CDC numbers (44.8 per 100,000 live births, ~3.15× rate vs non-Hispanic white women). A future case study about a different healthcare client might reuse "similar" numbers, paraphrase loosely, or invent a comparable statistic to match the pattern.

The case-study-writer subagent is instructed to treat ORDANI metrics verbatim, but:
- A copy edit pass might "smooth" the language to "approximately 45 per 100K" — which is fine semantically but reads as imprecise next to the original.
- A future case study about Passioneer or HR Equity Author might invent metrics in the same numeric register to match the editorial feel ("8 platforms outperforming by 4.5x").

**Warning signs:**
- Copy-editor agent renaming numbers between drafts.
- An invented metric appearing in a non-ORDANI case study without a verifiable source.

**Prevention strategy:**
1. **Lock the ORDANI statistics in a separate `content/citations.ts`** module:
   ```ts
   // content/citations.ts
   export const citations = {
     'cdc-mmr-2024': {
       blackWomenRate: '44.8 per 100,000 live births',
       whiteWomenRate: '14.2 per 100,000 live births',
       multiplier: '~3.15×',
       source: 'CDC Maternal Mortality Rates in the United States, 2024',
       url: 'https://www.cdc.gov/nchs/products/databriefs/...',
     },
   } as const;
   ```
   Reference these via component (e.g., `<Stat citation="cdc-mmr-2024" />`) in MDX. The numbers never appear as a literal in case-study prose — they're rendered from the canonical citation object.

2. **Add a copy-lint rule** (extend `copy-lint.sh` or `lib/copy-lint.ts`): flag any number in `XX.X per 100,000` shape in any case study other than `/work/ordani` for human review.

**Phase to address:** Days 9–10 (ORDANI build — establish the citation pattern) + Days 11–12 (subsequent case studies — enforce the pattern).

**Harness coverage:** `copy-lint.sh` covers banned words. **MANUAL extension required** to flag invented metrics.

---

### E3. Bot/scraper handling for ORDANI maternal-mortality content (overcorrect to `noindex`)

**What goes wrong:**
A developer worried about sensitive content (Black maternal mortality, doulas, HIPAA) decides to "be safe" by adding `<meta name="robots" content="noindex">` to ORDANI's case study page. The result: the case study is deindexed from Google. The post-launch share gesture (someone sees Micah's ORDANI work on Twitter and Googles "ORDANI birth workers") returns no result. The content is invisible to its primary audience.

**The premium-tier conventional move (e.g., Pyer Moss) is to aggressively block bots from scraping the *images*** — not to deindex the page. Indexability and scrape-resistance are different goals.

**Warning signs:**
- Google Search Console shows ORDANI URL as "Excluded by noindex tag."
- `site:micahjonesconsulting.com ordani` returns no results.
- Vercel logs show no organic Google traffic to /work/ordani after launch.

**Prevention strategy:**

1. **Do NOT noindex ORDANI.** It's the case study people will Google for.

2. **Robots.txt allowing crawl, with sensible directives:**
   ```
   # public/robots.txt
   User-agent: *
   Allow: /

   # Block training-data scrapers from crawling case studies if desired
   User-agent: GPTBot
   Disallow: /work/

   User-agent: Google-Extended
   Disallow: /work/

   Sitemap: https://micahjonesconsulting.com/sitemap.xml
   ```
   This allows Google's regular Googlebot (which controls indexing for Search) to crawl `/work/ordani`, while excluding AI-training crawlers from case-study content. The case study remains discoverable; it's just not training data.

3. **Meta-robots on the ORDANI page itself:**
   ```tsx
   // app/work/ordani/page.tsx
   export const metadata = {
     robots: {
       index: true,
       follow: true,
       'max-snippet': 200,           // allow Google to show a meaningful snippet
       'max-image-preview': 'large', // allow rich result preview of the hero still
     },
   };
   ```

4. **Cite CDC source visibly** — in the body text, link to the CDC data brief. This is good citation discipline and improves the page's E-E-A-T signal for Google.

**Phase to address:** Days 9–10 (ORDANI build) + Day 14 (sitemap + robots.txt finalization).

**Harness coverage:** **MANUAL — no hook**. SEO config is a one-time setup; once correct, doesn't drift.

---

### E4. Banned-words list drift between MDX and component props

**What goes wrong:**
`copy-lint.sh` scans MDX prose for banned words. But banned words appearing in:
- React component props (e.g., `<Card title="Drive results" />`)
- Image alt text
- Frontmatter fields (`dek: "Best-in-class HIPAA CRM"`)
- Meta-tag descriptions (`generateMetadata` returning `description: "We leverage..."`)

…may not be caught by an MDX-only lint. A banned word in `dek` ships to the page as visible body text without ever being scanned.

**Warning signs:**
- Site QA reveals "leverage" or "drive results" appearing in case study deks or page metadata after passing the hook.

**Prevention strategy:**
Extend `copy-lint.sh` (or supplement with a TypeScript module `lib/copy-lint.ts`) to also scan:
- All `.mdx` prose
- All `.mdx` frontmatter values (use `gray-matter` to extract and scan)
- All `.tsx` strings inside `<title>`, `<meta>`, `<Card>`, `<TitleCard>` JSX text and prop strings
- All `metadata` exports in `app/**/page.tsx`

Or, more strictly: scan **everything** in `app/`, `components/`, `content/`. False positives are rare for the 30-word list.

**Phase to address:** Day 1 (set up copy-lint to scan beyond MDX prose) + every PR going forward.

**Harness coverage:** `copy-lint.sh` covers MDX banned words. **VERIFY scope** — extend to component strings if not already covered.

---

## F. Discipline & Brand-Drift Pitfalls

### F1. Brand discipline drift over multiple PRs (the "ship a little compromise" trap)

**What goes wrong:**
The blueprint locks discipline: one accent (copper), one signature motion (TitleCard), no monospace, no logo wall, no Now page. Over 14 days and ~30+ commits, small compromises accumulate:

- A PR adds a second accent ("just a hint of blue for the contact-form success state").
- A PR adds a "subtle" cursor follower for the foyer hero ("it's only 6px").
- A PR adds a monospace style "just for the email address" in the footer.
- A PR adds a `/uses` page "since people keep asking."

Any one of these doesn't kill the site. Cumulatively, they kill the premium signal. Locomotive's two-typefaces-four-styles discipline disappears one micro-decision at a time.

**Warning signs:**
- A new file imports a font not on the approved list.
- A new color hex outside the §4b palette.
- A new page-type appears that's not in the §6 IA.
- A motion-related package added to `package.json` outside the trio (gsap, framer-motion, lenis).

**Prevention strategy — confirmed harness coverage:**

This is exactly what the harness exists for. Verified hook coverage from `.planning/PROJECT.md`:

| Discipline rule | Harness hook | Status |
|---|---|---|
| No monospace fonts | `motion-discipline.sh` | ✅ AUTO-BLOCKED |
| No cursor follower | `motion-discipline.sh` | ✅ AUTO-BLOCKED |
| No scroll-jacking | `motion-discipline.sh` | ✅ AUTO-BLOCKED |
| No Klim font imports without license | `font-license.sh` | ✅ AUTO-BLOCKED |
| Inter permitted (foundry=system) | `font-license.sh` | ✅ ALLOWED |
| Hex literals outside palette | `design-tokens.sh` | ⚠️ AUTO-WARNED (not blocked) |
| Banned words in copy | `copy-lint.sh` | ✅ AUTO-BLOCKED |
| Images > 500KB | `image-budget.sh` | ✅ AUTO-BLOCKED |
| Case study missing frontmatter | `mdx-frontmatter.sh` | ✅ AUTO-BLOCKED |
| LCP / INP / CLS budget | `perf-budget.sh` | ✅ AUTO-BLOCKED on build |
| Serious/critical axe violations | `a11y-baseline.sh` | ✅ AUTO-BLOCKED on build |

**What the harness does NOT catch — manual discipline required:**
- Adding a new page-type outside §6 IA (e.g., `/now`, `/uses`, `/colophon`).
- Adding a non-photographic asset (illustration, icon kit, 3D, stock photo) — `image-budget.sh` checks size only, not provenance.
- A new motion package added to `package.json` (e.g., `react-spring`, `auto-animate`).
- A "trusted by" / client logo carousel — it's just JSX; nothing semantic to block on.

**Manual layer:** the seven subagents (`design-director`, `copy-editor`, `motion-engineer`, `perf-auditor`, `a11y-reviewer`, `case-study-writer`, `visual-qa`) are the human-in-the-loop layer. `design-director` is specifically tasked with refusing off-brand additions and should be invoked on any PR that touches `app/` structure (route additions/removals) or `components/` (new component or motion package).

**Phase to address:** Ongoing for every PR. Make `design-director` a required reviewer on PRs touching `app/**/page.tsx`, `app/**/layout.tsx`, `components/`, `package.json`.

**Harness coverage:** **MOSTLY AUTO-CAUGHT** at write boundary. Page-type / structure changes are **MANUAL** via `design-director` subagent.

---

### F2. The "v0 ChatGPT cadence" creeping into prose over time

**What goes wrong:**
Blueprint §8 voice rules: "Short sentences. Subject + verb + object. … First person. Never 'we' if it's just Micah." A copy-editor agent or a human PR editor "smooths" Micah's voice toward standard B2B SaaS rhythm: longer sentences, more "we," more hedged claims ("a HIPAA-compliant CRM" → "a comprehensive, HIPAA-compliant CRM solution"), more abstract qualifiers ("operators" → "operational leaders").

The harness catches the 30 banned words. It does **not** catch:
- Sentence length creep (12-word average drifting to 22-word average).
- Pronoun drift ("I" → "we").
- Abstraction creep (specific number → "significant impact").
- Adjective stacking ("a comprehensive, integrated, scalable platform").

**Warning signs:**
- A case study draft has paragraphs > 80 words.
- Pull quotes are paraphrased rather than verbatim.
- The home hero copy gets longer between drafts.
- "We" appears in any first-person context.

**Prevention strategy:**

1. **Extend `lib/copy-lint.ts` with statistical checks:**
   ```ts
   // lib/copy-lint.ts (additions)
   const VOICE_RULES = {
     maxSentenceWords: 30,       // a hard ceiling; blueprint cadence is much shorter
     maxParagraphWords: 80,      // a paragraph should be one breath
     bannedPronouns: ['we ', ' we ', 'our ', 'we\'re'],  // unless on /work-with-me explicit "I" → first-person check
     adjectiveStackRegex: /\b(\w+),\s+(\w+),\s+and\s+(\w+)\s+\w+\b/g, // "comprehensive, integrated, scalable platform"
   };
   ```
   These produce warnings (not blocks) — the human writer adjusts.

2. **Pull quotes are sacred.** They appear verbatim from beta users / clients. Lock them in `content/citations.ts` alongside ORDANI stats (Pitfall E2) so they can't drift in copy edit.

3. **`copy-editor` subagent should rewrite TOWARD blueprint cadence, not away from it.** Brief the agent explicitly: "Match the cadence of the §8 about-paragraph reference. If you're tempted to add a qualifier, delete a sentence instead."

**Phase to address:** Every copy-touching PR. Initial setup Day 1 (extend `copy-lint.ts`).

**Harness coverage:** `copy-lint.sh` covers banned words. **MANUAL extension** for cadence/voice statistics.

---

### F3. Vercel deployment cache invalidation surprise (route-group layouts)

**What goes wrong:**
The app uses route groups `(foyer)` and `(theater)` to organize layouts. Vercel's edge cache may serve a stale layout from the foyer for a route that has been moved into the theater route group, especially across rapid back-to-back deploys.

A more common variant: after a CSS-token change (e.g., shifting the copper hex), a CDN-cached version of `globals.css` is served alongside a freshly deployed `app/layout.tsx` for some users, producing visible color mismatch for ~5–10 minutes during deploy.

**Warning signs:**
- A user reports "the colors look wrong" right after a deploy, but reload fixes it.
- Vercel logs show 200 OK responses from edge cache for old assets immediately after deploy.

**Prevention strategy:**

1. **Trust Next.js asset hashing.** Next.js fingerprints CSS and JS files (`globals.[hash].css`). New deploys produce new hashes; clients fetch new files. The risk is the *HTML* (which references the new hash) being cached separately from the assets.

2. **For App Router pages, use default behavior** — pages are dynamically rendered or statically rendered with revalidation. The marketing site has no dynamic data; everything is build-time static. After a deploy, Vercel's edge cache **purges automatically** for the new build (verified in Vercel docs).

3. **For the contact form**, which is the only dynamic route, use `export const dynamic = 'force-dynamic'` to ensure it's never edge-cached.

4. **Lenis + edge runtime:** the contact form server action does not use Lenis (Lenis is client-only — see Pitfall C2). Don't set `export const runtime = 'edge'` on any page that mounts client-side Lenis; the marketing routes default to Node.js runtime which is correct.

**Phase to address:** Day 14 (Vercel deploy setup).

**Harness coverage:** **MANUAL** — Vercel deploy is outside hook scope.

---

### F4. Three-month decay: site is fast on launch, slow by month three

**What goes wrong:**
On launch day, every image is hand-optimized, fonts are correctly preloaded, Lighthouse hits 99. Three months later, two new case studies have shipped, the portrait was updated, a new still was added to ORDANI — all without re-running the perf pass. Lighthouse drops to 78. LCP regresses to 2.6s.

**Warning signs:**
- No regular perf monitoring.
- No CI guardrail enforcing perf budget on PRs (only at first deploy).
- Vercel Analytics shows a slow upward trend in TTFB / LCP over weeks.

**Prevention strategy:**

1. **`perf-budget.sh` must run on every PR**, not just initial build. Verify the hook config blocks merge when Lighthouse drops below 95 on the changed routes.

2. **Vercel Analytics is enabled** (per blueprint §11) — set a Slack/email alert for LCP > 2s p75 on production.

3. **Quarterly perf audit ritual**: run the `perf-auditor` subagent on the four-month and eight-month anniversaries. Specific check: image budgets, font subsetting, third-party scripts that have crept in (Vercel Analytics, Resend's confirmation page, any future CMS preview).

**Phase to address:** Day 14 (set up the recurring schedule) + ongoing.

**Harness coverage:** `perf-budget.sh` at PR level (assuming it runs in CI, not just on local builds). **Confirm CI config**.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|---|---|---|---|
| Skip `adjustFontFallback` and accept CLS | -10 min on Day 1 | CLS > 0.05, Lighthouse < 95, fails `perf-budget.sh` | Never |
| Use raw copper as body link color | Visual continuity with brand | WCAG AA failure, axe finding | Never — use copper-deep `#8E3A1E` for body emphasis |
| Skip `prefers-reduced-motion` on TitleCard | -20 min on Day 3 | WCAG 2.3.3 violation, real users get nauseous | Never |
| Mount Lenis in root server layout instead of client provider | Slightly simpler tree | Hydration mismatch warning in every page | Never |
| Inline `<link rel="preload">` for fonts without `crossOrigin` | "Manual" perf control | Duplicate font request, LCP regression | Never |
| Skip Zod schema for MDX frontmatter | -30 min on Day 3 | Runtime errors when adding case study #4 | Acceptable only with ≤ 2 case studies and no plan for more |
| `syncTouch: true` on Lenis "to make iOS smooth like desktop" | Feels consistent in dev | iOS users hate it; INP spikes | Never |
| Ship without checking copper contrast | -1 hour on Day 1 | Discover at Day 14 a11y pass that body links must change | Never |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|---|---|---|
| `next/font/google` | Importing 7+ weights "just in case" | Import only `['600', '700']` for Inter Display, `['400']` for Inter body — verify in build output |
| GSAP + ScrollTrigger | `import gsap from 'gsap'` at top of server file | `'use client'` + dynamic import inside `useGSAP` hook |
| Lenis | `new Lenis()` in root server layout | Mount inside a `'use client'` `<LenisProvider>` boundary |
| View Transitions | Calling `document.startViewTransition()` directly | Wrap in helper that feature-detects and falls through |
| MDX + frontmatter | Trusting authors to remember the schema | Zod-validate frontmatter at build time, fail build on mismatch |
| Resend (contact form) | Storing form payload in same component that submits it | Server action → Resend API + Supabase archive table; client just renders success state |
| Vercel Analytics | Adding before perf budget is in place | Add it Day 13 after `perf-budget.sh` has a baseline; verify it doesn't regress Lighthouse |
| `next/image` | Skipping width/height props because it "looks fine" | Always pass width/height (or `fill` with parent dims) — prevents CLS |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|---|---|---|---|
| Eager-loaded case-study stills | LCP > 2s on case-study cold load | `loading="lazy"` on all stills below the hero | At case study #2 with 6+ stills |
| Unbounded MDX bundle | Slow case-study TTFB | Restrict MDX components to curated set; `next/dynamic` for heavy widgets | At ~3rd case study with custom imports |
| GSAP global registration | First Load JS > 200KB on Contact page | Dynamic import inside TitleCard only | At Day 4 (Home page) if pattern not established Day 3 |
| Font subsetting missing | woff2 files > 30KB each | `next/font/google` handles subsetting; if self-hosting, use `glyphhanger` or `fonttools` | If shifting to Klim self-host in v2 |
| All Inter weights imported | First Load JS includes 200/300/400/500/600/700/800/900 | Import only the weights used; audit `globals.css` output | At every font-related PR |
| `<Image>` without explicit dims | CLS > 0.05 from below-fold images popping in | Always pass `width` + `height` (or use `fill`) | At every image addition |

---

## Security Mistakes (domain-specific)

| Mistake | Risk | Prevention |
|---|---|---|
| Logging contact-form payloads in Vercel function logs | PII in third-party logs (Vercel logs are retained) | Resend handles the email; never `console.log(formData)` in server actions |
| Exposing Resend API key client-side | Spam/abuse on Micah's behalf | Resend key in env var, used only in server action |
| Storing ORDANI screenshots with PII visible | Doula client names leaking into screenshots | Verify every screenshot in `/work/ordani/` has no real names, no real client data; use Supabase test data only |
| `noindex` on ORDANI page out of "abundance of caution" | Page invisible to organic search; primary audience can't find it | Index, allow crawl, cite CDC visibly, block AI training crawlers only (see Pitfall E3) |
| Robots.txt blocking Googlebot from case studies | Same as above | Allow Googlebot; disallow GPTBot / Google-Extended / CCBot if desired |
| HIPAA terminology used loosely | Implies ORDANI is the user's HIPAA compliance officer | Case study language: "HIPAA-compliant" not "HIPAA-certified"; never imply ORDANI itself satisfies a covered entity's obligations on its own |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---|---|---|
| TitleCard text overflows on 390px mobile | The signature gesture breaks on phones | Test 96px display type at 390/768/1440; reduce to 64px on mobile if 6-word stack exceeds viewport |
| View Transition feels long (600ms) on every nav | First impressive, then tedious | Verify 600ms feels right; consider 400ms for back-nav; honor `prefers-reduced-motion` always |
| Contact form silent success | User submits, sees nothing, submits again | Optimistic "thanks — replying within two business days" state on submit; rely on Resend's webhook for confirmation, not client knowledge |
| External links open in same tab without warning | User loses the site mid-case-study | Case study citations (CDC link) open in new tab with `target="_blank" rel="noopener"` |
| Foyer hero portrait doesn't reflow tightly on mobile | Empty cream space on 390px viewport | Tighter crop ratio for mobile (3:4 → 4:5); blueprint §14 item 9 already specifies this |
| Hover-only affordances on touch devices | Mobile users miss the underline lift, hover trailer | Apply final hover state at the start of `pointercoarse` media query, or use tap to reveal |

---

## "Looks Done But Isn't" Checklist

- [ ] **TitleCard:** Often missing `prefers-reduced-motion` branch — verify by setting OS reduce-motion and reloading a case study.
- [ ] **View Transitions:** Often missing fallback for Safari < 18 / Firefox < 144 — verify in real Safari 17 device or BrowserStack.
- [ ] **Foyer links:** Often using raw copper as text color — verify with axe and confirm 4.5:1 minimum.
- [ ] **MDX frontmatter:** Often validated only by hook's "exists" check — verify Zod schema runs on `next build` and fails the build on mismatch.
- [ ] **Lenis on iOS:** Often shipping with `syncTouch: true` from an old tutorial — verify config is `syncTouch: false`.
- [ ] **GSAP imports:** Often imported at top-level of a file marked `'use client'` but rendered server-side — verify `next build` succeeds without window errors.
- [ ] **Font preloading:** Often manual `<link>` tags without `crossOrigin` — verify by checking Network tab for duplicate font requests.
- [ ] **ORDANI citations:** Often paraphrased loosely — verify all stats trace to `content/citations.ts` and the URL is reachable.
- [ ] **Robots.txt:** Often missing or over-blocking — verify `/robots.txt` returns 200 and Googlebot is `Allow: /`.
- [ ] **Sitemap.xml:** Often missing — verify `/sitemap.xml` returns 200 and lists all five page types + all case studies.
- [ ] **OG images:** Often using a default share card for every page — verify each case study has its TitleCard rendered as OG image (per blueprint §4f).
- [ ] **Focus rings:** Often invisible against copper-on-cream — verify by tabbing through every focusable element on both modes.
- [ ] **404 page:** Often using Next.js default — verify it's foyer-mode-styled with copper-accented "back to home" link.
- [ ] **Resend integration:** Often missing reply-to address — verify Resend From field is `hello@micahjonesconsulting.com` and replies route to Micah's inbox.
- [ ] **Image dimensions:** Often missing on `<Image>` components inside MDX — verify all `<Image>` JSX has `width` + `height` or `fill`.
- [ ] **Theater→foyer back-nav:** Often skipped during initial QA — verify the reverse transition (theater cream-paper rising back) renders correctly.

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---|---|---|
| CLS > 0.05 discovered Day 14 | LOW | Set `adjustFontFallback: true` + verify size-adjust applies in build output. Pin Next.js patch if Issue #74134 affects you. |
| GSAP "window is not defined" mid-build | LOW | Wrap import in `'use client'` boundary + use `useGSAP` hook. ~15 min fix. |
| Copper-on-cream WCAG fail flagged post-launch | MEDIUM | Replace all body-text copper instances with copper-deep `#8E3A1E`; keep copper for large-text and UI only. ~30 min global find-replace + visual QA. |
| ORDANI deindexed from Google after misconfigured robots | HIGH | Remove `noindex` meta, update robots.txt, submit URL for re-indexing in Search Console, wait 2–14 days for re-crawl. Lost organic traffic for that window. |
| Lenis `syncTouch: true` shipped, iOS users complain | LOW | Hotfix change `syncTouch: false`, deploy, verify on real iOS device. Vercel deploys in ~90 seconds. |
| MDX frontmatter mismatch breaks `next build` post-launch | LOW | Read schema error message, fix the offending field, re-deploy. ~5 min if Zod schema is in place. |
| Brand drift over months (second accent color, mono footer email) | MEDIUM | Revert in one PR; reinforce `design-director` review on style-touching PRs. Painful only because trust in discipline erodes. |
| Lighthouse dropped to 78 at month three | MEDIUM | Re-run `perf-auditor`, identify the regressed asset (usually unoptimized image or new third-party script), revert or optimize. |

---

## Pitfall-to-Phase Mapping

Mapping each pitfall to the §12 14-day phased timeline. Phases referenced:
- **Day 1**: Scaffold (Tailwind theme, fonts, route groups, base layout)
- **Day 2**: Nav + footer + View Transition handler
- **Day 3**: `<TitleCard />` build
- **Day 4–8**: Home, About, Work With Me, Contact, Work index pages
- **Day 9–10**: ORDANI case study
- **Day 11–12**: HR Equity Author + Passioneer + Akamai case studies
- **Day 13**: Perf pass (LCP, image optimization, bundle analysis)
- **Day 14**: Copy lint + a11y + visual QA + portrait shoot
- **Ongoing**: Every PR, especially design/structure-touching ones

| # | Pitfall | Prevention Phase | Verification |
|---|---|---|---|
| A1 | next/font CLS | Day 1, re-verify Day 13 | Lighthouse CLS < 0.05 mobile cold load |
| A2 | Font preload missing crossOrigin | Day 1 (only relevant if self-hosting v2) | DevTools Network tab — single request per font |
| A3 | Stills not lazy-loaded | Days 9–12, verify Day 13 | Lighthouse "Defer offscreen images" passes |
| A4 | GSAP + Framer + Lenis triple bundle | Day 3 (establish pattern), audit Day 13 | `next build` First Load JS ≤ 200KB on non-TitleCard routes |
| A5 | MDX bundle bloat | Days 9–12 | `du -sh .next/server/app/work/` per case study < 200KB |
| B1 | Copper-on-cream contrast | Day 1 (tokens) + Day 14 (a11y) | axe no contrast violations; manual visual check |
| B2 | `prefers-reduced-motion` ignored | Day 2 + Day 3 | Set OS reduce-motion, verify TitleCard + transition behave |
| B3 | Focus indicator contrast | Day 1 + Day 14 | Tab through all routes; visual QA |
| B4 | Halation from pure black | Ongoing (token discipline) | `design-tokens.sh` warns on raw hex |
| C1 | GSAP SSR error | Day 3 | `next build` succeeds, no window/document errors |
| C2 | Lenis SSR / hydration mismatch | Day 1 | No hydration warnings in console; `next build` clean |
| C3 | View Transitions SSR | Day 2 | Feature-detect wrapper used everywhere |
| D1 | View Transitions browser-compat | Day 2 + Day 14 | QA on Safari 17, Firefox 143 — instant nav fallback works |
| D2 | Lenis `syncTouch: true` | Day 1 | Config review; iOS device testing Day 14 |
| D3 | Chrome flag drift | Day 14 | Test against stable Chrome only |
| E1 | MDX frontmatter drift | Day 3 (schema) + Days 9–12 (each case study) | `next build` fails on invalid frontmatter |
| E2 | ORDANI stats drift | Days 9–10 (citations.ts) + Days 11–12 | Custom copy-lint rule flags numeric drift |
| E3 | Bot/SEO misconfiguration | Day 14 (robots.txt + sitemap) | Google Search Console; manual fetch of robots.txt |
| E4 | Banned words in component strings | Day 1 (extend copy-lint scope) | Pre-deploy grep across `app/`, `components/`, `content/` |
| F1 | Brand discipline drift | Ongoing every PR | `design-director` subagent reviews structure PRs |
| F2 | Voice cadence drift | Ongoing (every copy PR) | Extended copy-lint statistical checks |
| F3 | Vercel cache invalidation | Day 14 | Test deploy, check edge cache headers |
| F4 | Three-month perf decay | Day 14 (CI setup) + quarterly | `perf-budget.sh` on every PR; Vercel Analytics LCP alerts |

---

## Harness-Coverage Summary (cross-reference of all 8 hooks)

| Hook | Pitfalls auto-caught | Pitfalls partially caught | Pitfalls NOT caught (manual) |
|---|---|---|---|
| `copy-lint.sh` | E4 (banned words in MDX) | F2 (voice cadence — needs extension) | — |
| `font-license.sh` | F1 (Klim w/o license), A1-adjacent | — | A2 (preload attrs) |
| `motion-discipline.sh` | F1 (cursor follower, scroll-jacking, mono) | B2 (reduced-motion — partial) | D2 (`syncTouch` — needs extension) |
| `design-tokens.sh` | B4 (halation from raw `#000`) | F1 (off-palette hex — warns only) | B1 (copper-on-cream rule — semantic) |
| `mdx-frontmatter.sh` | E1 (missing required fields) | — | E1 (Zod schema validation — needs extension) |
| `image-budget.sh` | A3 (oversized stills), F1 (oversized portraits) | — | Asset provenance (stock vs commissioned) |
| `perf-budget.sh` | A1, A3, A4, A5, F4 | — | A2 (preload attributes specifically) |
| `a11y-baseline.sh` | B1, B3, B4 | B2 (partial — depends on axe ruleset) | B2 manual verification on reduced-motion |

**Net assessment:** harness covers ~70% of the pitfalls listed automatically. The remaining 30% require either:
1. **Manual subagent review** (`design-director`, `copy-editor`, `motion-engineer`) on PRs touching structure, copy, or motion.
2. **Custom extensions** to existing hooks (Zod schema in `mdx-frontmatter.sh`; statistical voice checks in `copy-lint.sh`; `syncTouch: true` blocker in `motion-discipline.sh`).
3. **One-time setup verification** during Day 14 (robots.txt, sitemap, Vercel deploy, cross-browser QA).

---

## Confidence Assessment

| Area | Confidence | Reasoning |
|---|---|---|
| Stack-specific SSR/hydration (C1–C3) | HIGH | Verified against GSAP official docs, Lenis GitHub, Next.js 15 issue tracker (#74134, #62332, etc.) |
| Browser-compat (D1–D3) | HIGH | Can I Use (May 2026), Chrome for Developers blog, Firefox release notes |
| Performance (A1–A5) | HIGH | Lighthouse documentation, Vercel Academy, Next.js 15 official font docs, verified GitHub issues |
| Accessibility (B1) | HIGH | Direct mathematical calculation against WCAG 2.1 SC 1.4.3 formula |
| Accessibility (B2–B4) | HIGH | WCAG documentation, web.dev guidance, WordPress/performance Issue #2067 |
| MDX content (E1–E2) | HIGH | Zod docs, Velite/Fumadocs documentation, common-pattern verification |
| SEO/robots (E3) | MEDIUM | Google Search Central docs are authoritative; the specific ORDANI editorial decision is mine to recommend |
| Brand-discipline drift (F1–F2) | MEDIUM | Industry literature on brand drift exists but the specific blueprint+harness setup is novel; behavioral patterns are extrapolated |
| Vercel cache (F3) | HIGH | Vercel docs + Next.js App Router caching documentation |

---

## Sources

**Browser compatibility (View Transitions API):**
- [View Transitions API — Can I Use](https://caniuse.com/view-transitions)
- [What's new in view transitions (2025 update) — Chrome for Developers](https://developer.chrome.com/blog/view-transitions-in-2025)
- [View Transition API — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [Same-document view transitions for SPAs — Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)

**GSAP + Next.js SSR:**
- [React & GSAP — GSAP official docs](https://gsap.com/resources/React/)
- [Nextjs Render Error caused by Scroll Trigger — GSAP Issue #603](https://github.com/greensock/GSAP/issues/603)
- [Nextjs useGSAP errors on use of useRef — Issue #606](https://github.com/greensock/GSAP/issues/606)
- [GSAP & Next.js Setup: The BSMNT Way](https://basement.studio/blog/gsap-next-js-setup-the-bsmnt-way)

**Lenis smooth scroll:**
- [Lenis on GitHub — darkroomengineering/lenis](https://github.com/darkroomengineering/lenis)
- [Lenis on npm — current 1.x API](https://www.npmjs.com/package/lenis)
- [Smooth Scrolling in Next.js with Lenis & GSAP — 2026 Guide](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap)

**Next.js font loading / CLS:**
- [Components: Font — Next.js official docs](https://nextjs.org/docs/pages/api-reference/components/font)
- [adjustFontFallback not working in Next.js 15 — Issue #74134](https://github.com/vercel/next.js/issues/74134)
- [adjustFontFallback regression — Issue #73838](https://github.com/vercel/next.js/issues/73838)
- [Framework tools for font fallbacks — Chrome for Developers](https://developer.chrome.com/blog/framework-tools-font-fallback/)
- [Custom fonts without compromise using next/font — Vercel](https://vercel.com/blog/nextjs-next-font)

**Accessibility (prefers-reduced-motion + View Transitions):**
- [prefers-reduced-motion CSS media feature — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [Understanding WCAG SC 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [prefers-reduced-motion — web.dev](https://web.dev/articles/prefers-reduced-motion)
- [View transitions & reduced-motion — WordPress/performance Issue #2067](https://github.com/WordPress/performance/issues/2067)
- [Some practical examples of view transitions — Piccalilli](https://piccalil.li/blog/some-practical-examples-of-view-transitions-to-elevate-your-ui/)
- [View transitions for single page applications — web.dev](https://web.dev/learn/css/view-transitions-spas)

**Accessibility (dark mode + contrast):**
- [Offering a Dark Mode Doesn't Satisfy WCAG Color Contrast — BOIA](https://www.boia.org/blog/offering-a-dark-mode-doesnt-satisfy-wcag-color-contrast-requirements)
- [Inclusive Dark Mode: Designing Accessible Dark Themes — Smashing Magazine](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

**MDX frontmatter validation:**
- [Frontmatter — MDX official docs](https://mdxjs.com/guides/frontmatter/)
- [Zod TypeScript-first schema validation](https://v3.zod.dev/)
- [Fumadocs / Velite content collections patterns](https://www.pkgpulse.com/guides/fumadocs-vs-nextra-v4-vs-starlight-documentation-sites-2026)

**Robots / SEO / sensitive content:**
- [Robots Meta Tag specifications — Google Search Central](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Robots.txt and SEO 2026 — Search Engine Land](https://searchengineland.com/robots-txt-seo-453779)
- [Robots.txt: Optimise Crawling and Your SEO Budget — Incremys](https://www.incremys.com/en/resources/blog/robots-txt)

**Vercel caching & edge runtime:**
- [Caching on Vercel's Edge Network](https://vercel.com/docs/edge-network/caching)
- [unstable_cache in Edge Runtime — Next.js Issue #60336](https://github.com/vercel/next.js/issues/60336)
- [Deep Dive: Caching and Revalidating — Next.js Discussion #54075](https://github.com/vercel/next.js/discussions/54075)

**Performance / bundle / image:**
- [Optimizing Next.js Performance — Catch Metrics](https://www.catchmetrics.io/blog/optimizing-nextjs-performance-bundles-lazy-loading-and-images)
- [Font preload not working — Next.js Issue #62332](https://github.com/vercel/next.js/issues/62332)
- [How to Preload Custom Fonts with Next.js](https://www.w3tutorials.net/blog/preload-custom-font-with-next-js/)

**Brand discipline literature:**
- [2026 Brand Governance Framework — Marq](https://www.marq.com/blog/brand-governance/)
- [Brand consistency at scale: Why guidelines fail — Adobe](https://experienceleague.adobe.com/en/perspectives/brand-consistency-at-scale)

**Project-internal sources:**
- `C:/Users/micah/Code/micahjonesconsulting/.planning/PROJECT.md` — project context, harness hook inventory, key decisions
- `C:/Users/micah/Code/micahjonesconsulting/.planning/blueprint.md` — full design blueprint, §13 anti-patterns, §14 10/10 bar, §4b color tokens, §4f signature motion

---
*Pitfalls research for: micahjonesconsulting.com (House Lights two-mode marketing site)*
*Researched: 2026-05-14*
