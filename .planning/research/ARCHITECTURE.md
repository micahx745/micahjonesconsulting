# Architecture Research

**Domain:** Next.js 15 App Router two-mode marketing site with route-group-based theme switching and View Transitions API foyer↔theater route transitions
**Researched:** 2026-05-14
**Confidence:** HIGH

---

## 1. Executive Summary

The architecture is dictated by three load-bearing decisions in the blueprint:

1. **Mode-as-route, not mode-as-state.** Foyer (cream) and theater (dark) are URL-mapped, not toggled. This makes the App Router's **route groups** (`(foyer)`, `(theater)`) the canonical container for mode-specific layouts, fonts, and color variables. No `useTheme()` hook. No `<ThemeProvider>`. Mode is a structural property of the route tree.
2. **One signature interaction (TitleCard) + one signature transition (foyer↔theater).** Every other piece of motion is blocked by the harness. The View Transitions API integration is therefore *the* page-transition mechanism — there is no parallel Framer Motion `<AnimatePresence>` route choreography fighting it.
3. **Content as filesystem.** Five pages + a handful of MDX case studies don't justify a headless CMS. MDX files in `content/work/*.mdx` with YAML frontmatter parsed by `gray-matter` is the lightest-weight, most static-friendly approach.

**Confidence justification:** All three primitives — route groups, the `ViewTransition` component in `experimental.viewTransition: true`, and `@next/mdx` with frontmatter — are documented in current (May 2026) official Next.js 15/16 docs (last updated 2026-05-13). Implementation patterns verified against Vercel's own labs demo and the official guides.

---

## 2. Directory Tree

The canonical structure for this project. Files marked `★` are load-bearing for the architecture; files marked `◇` are deferred to specific build phases.

```
micahjonesconsulting/
├── app/
│   ├── layout.tsx                  ★ Root layout — fonts, Lenis, ViewTransition wiring, <html> + <body>
│   ├── globals.css                 ★ Tailwind v4 @theme block, ::view-transition-old/new keyframes
│   ├── (foyer)/                    ★ Route group — cream paper mode (no URL segment)
│   │   ├── layout.tsx              ★ Foyer-mode layout — sets data-mode="foyer", nav + footer in foyer chrome
│   │   ├── page.tsx                ★ Home (/) — hero, portrait, selected-work strip, teasers
│   │   ├── about/page.tsx          Foyer — two-column long-form
│   │   ├── work-with-me/page.tsx   Foyer — three engagement shapes + FAQ
│   │   ├── contact/page.tsx        Foyer — two-field form, Resend integration
│   │   └── work/page.tsx           Foyer — case study index with TitleCard thumbnails
│   ├── (theater)/                  ★ Route group — obsidian dark mode (no URL segment)
│   │   ├── layout.tsx              ★ Theater-mode layout — sets data-mode="theater", inverted nav
│   │   └── work/
│   │       └── [slug]/
│   │           ├── page.tsx        ★ Case study template — dynamic MDX import, TitleCard, dek
│   │           └── opengraph-image.tsx  ◇ Per-case OG image (derived from TitleCard)
│   └── api/
│       └── contact/route.ts        Resend POST handler + Supabase archive insert
├── components/
│   ├── TitleCard.tsx               ★ Signature interaction — pinned vertical word stack + GSAP scroll-resolve
│   ├── LenisProvider.tsx           ★ Client component — wraps app for smooth scroll (damping ~0.08)
│   ├── Nav.tsx                     ★ Mode-aware via data-mode attribute on parent layout
│   ├── Footer.tsx                  Mode-aware
│   ├── PortraitFullBleed.tsx       Home / About portrait slot with Image component
│   ├── SelectedWorkStrip.tsx       Three-card preview component used on Home + Work index
│   ├── EngagementCard.tsx          Work With Me stacked shapes
│   ├── ContactForm.tsx             Client component — two fields, action posts to /api/contact
│   ├── PullQuote.tsx               Case study pull quote (Source Serif 4 italic)
│   ├── CaseStudyStill.tsx          Captioned image with 2px inner border + 4% film grain
│   └── CopperRule.tsx              Hairline rule primitive used across pages
├── content/
│   └── work/
│       ├── ordani.mdx              ★ Full case study (verbatim per PROJECT.md)
│       ├── hr-equity-author.mdx    Anonymized case study
│       ├── passioneer.mdx          Short-form case study
│       └── akamai.mdx              Short-form case study
├── lib/
│   ├── copy-lint.ts                ★ Banned-words scanner — runs in instrumentation.ts at build
│   ├── case-studies.ts             ★ Filesystem reader — listAllCaseStudies(), getCaseStudyBySlug(slug)
│   ├── fonts.ts                    ★ next/font/google imports — Inter Display, Inter, Source Serif 4
│   ├── tokens.ts                   Optional TS export of color tokens for runtime use (Resend email body, OG images)
│   └── banned.ts                   Array of banned words consumed by copy-lint.ts
├── mdx-components.tsx              ★ Required at root for @next/mdx App Router — global MDX component map
├── instrumentation.ts              ★ Build-time hook running copy-lint.ts across all MDX files
├── next.config.ts                  ★ experimental.viewTransition: true, pageExtensions for .mdx, withMDX wrapper
├── postcss.config.mjs              Tailwind v4 PostCSS plugin
├── tsconfig.json                   TypeScript strict mode
└── package.json
```

### Notes on what is **not** here (and why)

- **No `app/layout.tsx` at the route-group level only.** There IS a root `app/layout.tsx` (the single `<html>` / `<body>` shell) because the View Transitions API needs a stable DOM root across foyer↔theater navigation. Per the Next.js docs: *"Navigating across multiple root layouts will cause a full page load"* — a full page load would obliterate the view transition. So we use **one root layout** and **nested group layouts** that only set `data-mode` + mode-specific chrome.
- **No `theme-provider.tsx`.** Mode is route-determined; the foyer group layout sets `data-mode="foyer"`, the theater group layout sets `data-mode="theater"`. Tailwind v4 reads `[data-mode="theater"] { --color-bg: var(--theater-ground); }` in the `@theme` block.
- **No `tailwind.config.js`.** Tailwind v4 is CSS-first via the `@theme` block in `globals.css`. The only config file is `postcss.config.mjs`.
- **No `content-collections.config.ts` / `contentlayer.config.ts`.** Five MDX files don't justify the schema layer. Frontmatter parsed inline by `gray-matter` in `lib/case-studies.ts`.

---

## 3. Route Groups & Layout Strategy

### 3.1 The Critical Decision: One Root Layout, Two Group Layouts

The blueprint requires a **600ms cross-fade** between foyer and theater routes. This cross-fade is implemented via the View Transitions API, which **requires the browser to keep the same document root across the transition**. If we put a separate root layout in each route group (the alternative pattern Next.js supports), every foyer↔theater navigation would be a **full page reload** — which kills the View Transition.

**Therefore:** single root `app/layout.tsx`, with `(foyer)/layout.tsx` and `(theater)/layout.tsx` as **nested** layouts inside it.

```
app/
├── layout.tsx              ← <html>, <body>, fonts, Lenis, ViewTransition wrapper
├── (foyer)/layout.tsx      ← <div data-mode="foyer"> + <Nav variant="foyer"> + <Footer variant="foyer">
└── (theater)/layout.tsx    ← <div data-mode="theater"> + <Nav variant="theater"> + <Footer variant="theater">
```

### 3.2 Root Layout Responsibilities

`app/layout.tsx` (Server Component by default) owns:

1. **HTML shell + lang attribute + suppressHydrationWarning** on `<html>`.
2. **Font CSS variables** — attached as className on `<html>` so they cascade everywhere:
   ```tsx
   <html lang="en" className={`${interDisplay.variable} ${inter.variable} ${sourceSerif.variable}`}>
   ```
3. **LenisProvider wrap** — client component (smooth scroll at damping 0.08, mounts once).
4. **ViewTransition root wrapper** — wraps `{children}` so cross-fade can occur on route navigation. Per the Next.js View Transitions guide, the `<ViewTransition>` import comes from `react` (not `next`).
5. **Default metadata** (Open Graph defaults, favicon).

### 3.3 Group Layout Responsibilities

`(foyer)/layout.tsx`:
- Sets `<div data-mode="foyer">` as the immediate child of the root layout's transition wrapper.
- Renders `<Nav variant="foyer" />` and `<Footer variant="foyer" />`.
- Owns foyer-only chrome — copper-rule footer separator, hospitality micro-copy.

`(theater)/layout.tsx`:
- Sets `<div data-mode="theater">`.
- Renders `<Nav variant="theater" />` (inverted: copper on obsidian) and a minimal theater footer with `[BACK TO FOYER ↗]` affordance.

### 3.4 Tailwind v4 Reads `data-mode`

The `@theme` block in `globals.css` defines tokens once. Mode-specific overrides cascade via the `[data-mode]` attribute:

```css
@import "tailwindcss";

@theme {
  /* Brand tokens — foyer defaults */
  --color-paper: #F5EFE4;
  --color-ink: #1A1816;
  --color-ink-soft: #3A3631;
  --color-ground: #0D0D0F;
  --color-surface: #16161A;
  --color-bone: #EAE6DD;
  --color-bone-soft: #9C988F;
  --color-copper: #C8542B;
  --color-copper-deep: #8E3A1E;
  --color-ordani-sage: #5E7158;
  --color-rule-foyer: #D9D2C4;
  --color-rule-theater: #2A2A30;

  /* Font cascade — receives next/font/google CSS variables via :root in <html> className */
  --font-display: var(--font-inter-display), system-ui, sans-serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
  --font-serif: var(--font-source-serif), Georgia, serif;
}

/* Mode-driven background + text defaults */
[data-mode="foyer"] {
  background: var(--color-paper);
  color: var(--color-ink);
}

[data-mode="theater"] {
  background: var(--color-ground);
  color: var(--color-bone);
}
```

This gives us `bg-paper`, `bg-ground`, `text-ink`, `text-bone`, `text-copper`, `font-display`, `font-body`, `font-serif` as Tailwind utilities automatically.

---

## 4. View Transitions API Integration

### 4.1 Three-File Wiring

Per the official Next.js View Transitions guide (2026-05-13 update), the integration is:

**File 1: `next.config.ts`** — flip the experimental flag.

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    viewTransition: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

**File 2: `app/layout.tsx`** — wrap children in `<ViewTransition>`.

```tsx
import { ViewTransition } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interDisplay.variable} ${inter.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <body>
        <LenisProvider>
          <ViewTransition name="root" default="cross-fade">
            {children}
          </ViewTransition>
        </LenisProvider>
      </body>
    </html>
  );
}
```

The `default="cross-fade"` assigns the `cross-fade` class to `::view-transition-old(root)` and `::view-transition-new(root)`, giving us a single CSS hook for the foyer↔theater dim.

**File 3: `app/globals.css`** — define the cross-fade keyframes.

```css
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
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
}

/* Anchor the nav so it doesn't dissolve mid-transition */
::view-transition-group(site-nav) {
  animation: none;
  z-index: 100;
}
::view-transition-old(site-nav) { display: none; }
::view-transition-new(site-nav) { animation: none; }

/* Reduced motion respects the user */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*),
  ::view-transition-new(*),
  ::view-transition-group(*) {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }
}
```

### 4.2 Nav Anchoring

Nav assigns `viewTransitionName: "site-nav"` so the nav bar doesn't fade with the page body — visitors keep a fixed spatial anchor through the dim:

```tsx
// components/Nav.tsx
<nav style={{ viewTransitionName: "site-nav" }} data-variant={variant}>
  {/* links */}
</nav>
```

### 4.3 Why Not `next-view-transitions` Package

The `shuding/next-view-transitions` userland package predates Next.js 15's native support. With `experimental.viewTransition: true` in Next 15.x+, the **React `<ViewTransition>` primitive** is the canonical path. Less code, no extra dependency, follows React's rendering model directly.

---

## 5. Font Cascade

### 5.1 The Cascade Path

```
next/font/google (build-time)
    → produces CSS variable name + className
    → className attached to <html> element in app/layout.tsx
    → CSS variable (e.g., --font-inter-display) becomes available globally
    → @theme block in globals.css maps it to --font-display
    → Tailwind utility `font-display` references var(--font-display)
    → Component className uses `font-display`
```

### 5.2 `lib/fonts.ts`

```ts
import { Inter, Source_Serif_4 } from "next/font/google";

// next/font/google doesn't ship Inter Display as a separate face — Inter Tight + display weight is the canonical map
// For headlines, use Inter with weights 700/800/900 via the variable axis
export const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-inter-display",
  display: "swap",
  weight: ["700", "800", "900"],
  axes: ["opsz"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});
```

### 5.3 Attached at Root

```tsx
// app/layout.tsx
import { interDisplay, inter, sourceSerif } from "@/lib/fonts";

<html
  lang="en"
  className={`${interDisplay.variable} ${inter.variable} ${sourceSerif.variable}`}
>
```

### 5.4 Tailwind v4 Reads the Variables

The `@theme` block (see §3.4) maps the next/font CSS variables to Tailwind utilities. The `var()` fallback chain matters: `--font-display: var(--font-inter-display), system-ui, sans-serif;` means if the font fails to load, the cascade falls back to system UI sans, not Times New Roman.

### 5.5 Verification Gotcha

A documented Tailwind v4 + next/font issue: **Tailwind v4 cannot reach next/font CSS variables unless they're re-declared in the `@theme` block.** This is why we re-declare `--font-display: var(--font-inter-display)` rather than expecting Tailwind to auto-discover it.

---

## 6. Component Boundaries

### 6.1 Server vs Client Components

| Component | Server / Client | Why |
|---|---|---|
| `app/layout.tsx` | Server | No interactivity; just shell + fonts + metadata |
| `(foyer)/layout.tsx` | Server | Mode attribute set statically |
| `(theater)/layout.tsx` | Server | Same |
| `app/(foyer)/page.tsx` (Home) | Server | Renders portrait, hero, work strip — all static |
| `app/(theater)/work/[slug]/page.tsx` | Server | Async — imports MDX dynamically, parses frontmatter |
| `LenisProvider` | **Client** | Uses `useEffect` to initialize Lenis on `window` |
| `TitleCard` | **Client** | Uses GSAP ScrollTrigger — DOM-dependent |
| `Nav` | Server (or Client if scroll hide-on-down) | Static unless we add scroll-aware behavior — start Server |
| `Footer` | Server | Static |
| `ContactForm` | **Client** | Form state + submit handler |
| `PortraitFullBleed` | Server | next/image, no interactivity |
| `SelectedWorkStrip` | Server | Static link cards |
| `CaseStudyStill` | Server | Static next/image with caption |
| `PullQuote` | Server | Static |

**Pattern rule:** default to Server Component; only mark `"use client"` when there's a genuine reason (DOM API access, hooks, event handlers).

### 6.2 The Three Critical Components

#### 6.2.1 `TitleCard.tsx`

The signature interaction. Used on **every** case study and on the home page hero. Built before any case study so case studies can compose it.

**Props:**
```ts
type TitleCardProps = {
  words: [string, ...string[]];  // 3–6 words, vertical stack
  caption?: string;               // post-resolve caption ("ORDANI — A HIPAA-compliant CRM…")
  firstStillSrc?: string;         // image that cross-fades in after resolve
  variant?: "foyer" | "theater"; // color cascade — inherits but explicit prop for SSR
};
```

**Internals (high-level):**
- Renders the word stack at `96px Inter weight 800`, vertical.
- Pins via GSAP ScrollTrigger for ~600ms of scroll distance.
- Resolves: words shrink to caption size + caption appears + firstStill cross-fades in (Framer Motion at the component scope, not GSAP).
- Marked `"use client"`.
- Owns a `<div ref>` to which ScrollTrigger attaches.
- **Owns one and only one GSAP import path in the entire codebase** — every other GSAP usage is blocked by the harness.

#### 6.2.2 `LenisProvider.tsx`

Client component that initializes Lenis at app root.

```tsx
"use client";
import { ReactLenis } from "lenis/react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
```

The `root` prop tells Lenis to take over `<html>` scrolling. Damping 0.08 per blueprint §4d.

**Package note:** the npm package is now `lenis` (not `@studio-freight/lenis` — that was renamed in late 2024). Import path is `lenis/react`.

#### 6.2.3 `Nav.tsx`

Renders nav links with the `viewTransitionName: "site-nav"` style so the View Transitions API keeps it anchored across foyer↔theater dim.

```tsx
export function Nav({ variant }: { variant: "foyer" | "theater" }) {
  return (
    <nav
      style={{ viewTransitionName: "site-nav" }}
      data-variant={variant}
      className="..."
    >
      {/* links */}
    </nav>
  );
}
```

---

## 7. Data Flow

### 7.1 MDX Case Study: Frontmatter → Page Render

The hottest data path. Five-step flow:

```
content/work/ordani.mdx
    │
    │  (YAML frontmatter block at top of file)
    │  ---
    │  title: ORDANI
    │  dek: A HIPAA-compliant CRM for birth workers...
    │  role: Solo — research, design, build, ship
    │  tools: [Next.js, Supabase, Vercel, Tailwind, Resend]
    │  year: 2025–2026
    │  status: Private beta
    │  titleCardWords: [ORDANI, INTAKE., SECURE., SHIPPED.]
    │  ---
    │
    ▼
lib/case-studies.ts
    │  fs.readFile(path)
    │  gray-matter(raw) → { data: frontmatter, content: markdownBody }
    │  zod.parse(data) → validated CaseStudyFrontmatter
    │
    ▼
app/(theater)/work/[slug]/page.tsx (async Server Component)
    │  const { default: MDXContent, frontmatter } = await loadCaseStudy(slug)
    │  Render <TitleCard words={frontmatter.titleCardWords} /> + <Dek>{frontmatter.dek}</Dek>
    │  Render <MDXContent components={mdxComponents} />
    │
    ▼
mdx-components.tsx
    │  Maps img → CaseStudyStill, blockquote → PullQuote, etc.
    │
    ▼
Rendered case study (theater mode)
```

### 7.2 The Two Patterns for Loading MDX

Two valid patterns per the official guide. Pick one:

**Pattern A — Static import via dynamic `import()`** (recommended for this project):

```tsx
// app/(theater)/work/[slug]/page.tsx
export async function generateStaticParams() {
  return listAllCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export const dynamicParams = false;

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { default: MDXContent, frontmatter } = await import(`@/content/work/${slug}.mdx`);
  return (
    <article>
      <TitleCard words={frontmatter.titleCardWords} caption={frontmatter.dek} />
      <MDXContent />
    </article>
  );
}
```

**Pattern B — File reading with gray-matter:**

```ts
// lib/case-studies.ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export async function getCaseStudyBySlug(slug: string) {
  const file = await fs.readFile(path.join(process.cwd(), "content/work", `${slug}.mdx`), "utf-8");
  const { data, content } = matter(file);
  return { frontmatter: caseStudySchema.parse(data), content };
}
```

**Why Pattern A wins here:** `@next/mdx` already handles MDX → React component compilation at build time. Reading the file with `fs` and re-parsing the MDX body would duplicate that work. Use `import()` for the body; use a tiny `gray-matter` pass only when you need the frontmatter **before** the import resolves (e.g., for `generateStaticParams` listing).

**Hybrid (what we'll actually do):**
- `lib/case-studies.ts` reads frontmatter via `gray-matter` to power index pages, OG image generation, and metadata exports.
- Case study `[slug]/page.tsx` uses dynamic `import()` to load the rendered MDX body.

### 7.3 Frontmatter Schema (Zod)

```ts
// lib/case-studies.ts
import { z } from "zod";

export const caseStudySchema = z.object({
  title: z.string(),
  dek: z.string(),
  role: z.string(),
  tools: z.array(z.string()),
  year: z.string(),
  status: z.string(),
  titleCardWords: z.array(z.string()).min(3).max(6),
  heroStill: z.string().optional(),
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudySchema>;
```

The harness already includes `mdx-frontmatter.sh` that blocks MDX files missing required frontmatter — this Zod schema mirrors that check at runtime / build, giving us belt-and-suspenders.

### 7.4 Contact Form Flow

```
ContactForm.tsx (client)
    │  form.submit
    ▼
app/api/contact/route.ts (POST handler)
    │  Validate (Zod)
    │  Resend.emails.send({ to: hello@..., from: site@..., body })
    │  Supabase.insert({ name, message, ts }) // archive only, not DB-backed UI
    │  Return { ok: true, replyDays: 2 }
    ▼
ContactForm.tsx receives ok → render thank-you state inline
```

No client-side Supabase. No public anon key on the marketing site. Resend + Supabase live entirely in the route handler.

### 7.5 Global Site Copy

`content/site.ts` exports nav labels, footer copy, the positioning sentence. Imported by server components. No CMS layer.

---

## 8. Build Order

Inter-feature dependencies dictate the order. Building in the wrong order means rebuilding (or stubbing) components.

### Critical Path

```
Phase 0 — Scaffold
    │
    ├─ next.config.ts (experimental.viewTransition + withMDX)
    ├─ postcss.config.mjs (Tailwind v4)
    ├─ tsconfig.json (strict)
    └─ lib/fonts.ts (next/font/google imports)
    │
    ▼
Phase 1 — Root layout + token system
    │
    ├─ app/globals.css (@theme block, color tokens, view-transition CSS)
    ├─ app/layout.tsx (html, fonts attached, <ViewTransition> wrapper)
    └─ lib/banned.ts + lib/copy-lint.ts + instrumentation.ts
    │
    ▼
Phase 2 — Shared chrome
    │
    ├─ components/LenisProvider.tsx → wired into app/layout.tsx
    ├─ components/Nav.tsx (viewTransitionName: site-nav)
    └─ components/Footer.tsx
    │
    ▼
Phase 3 — Route group skeletons
    │
    ├─ (foyer)/layout.tsx + (foyer)/page.tsx stub
    └─ (theater)/layout.tsx + (theater)/work/[slug]/page.tsx stub
    │     ↑
    │     │  At this point: foyer↔theater route navigation should already produce
    │     │  a visible 600ms cross-fade in DevTools, even with empty pages.
    │     │  VERIFY VIEW TRANSITION HERE before building further.
    │
    ▼
Phase 4 — TitleCard (THE BLOCKER for everything downstream)
    │
    └─ components/TitleCard.tsx — built in isolation, tested with sample words,
       GSAP pin + resolve verified at 96px, mobile reflow tested.
    │
    │  TitleCard MUST exist before:
    │     • Home (uses it in hero)
    │     • Work index (uses it as thumbnails)
    │     • Every case study page (signature opening)
    │
    ▼
Phase 5 — Foyer pages
    │
    ├─ (foyer)/page.tsx — Home
    │     │ Depends on: TitleCard, PortraitFullBleed, SelectedWorkStrip
    │     │ SelectedWorkStrip depends on: case-studies.ts listing
    │     │ → may need stub case studies in content/work/ to render
    │
    ├─ (foyer)/about/page.tsx
    │
    ├─ (foyer)/work-with-me/page.tsx
    │     │ Depends on: EngagementCard
    │
    └─ (foyer)/contact/page.tsx
          │ Depends on: ContactForm, app/api/contact/route.ts, Resend env
    │
    ▼
Phase 6 — MDX infrastructure (parallel with Phase 5 if desired)
    │
    ├─ mdx-components.tsx
    ├─ lib/case-studies.ts (gray-matter + Zod)
    └─ components/CaseStudyStill.tsx, PullQuote.tsx
    │
    ▼
Phase 7 — Case studies (theater)
    │
    ├─ content/work/ordani.mdx (verbatim per blueprint §9)
    │     │ Then: (theater)/work/[slug]/page.tsx renders it
    │
    ├─ content/work/hr-equity-author.mdx (anonymized)
    ├─ content/work/passioneer.mdx (short)
    └─ content/work/akamai.mdx (short)
    │
    ▼
Phase 8 — Work index
    │
    └─ (foyer)/work/page.tsx — iterates case-studies.ts listing
          │ Depends on: TitleCard (for thumbnails), all case studies existing
    │
    ▼
Phase 9 — Performance + a11y pass
    │
    ├─ next/image optimization, hero portrait priority
    ├─ Font subsetting verification
    ├─ Lighthouse Performance ≥ 95 mobile
    ├─ axe pass — zero serious/critical
    └─ Reduced-motion CSS verified
    │
    ▼
Phase 10 — Production
    │
    ├─ Vercel deploy + custom domain
    └─ Resend domain verification + DNS
```

### Why TitleCard First (Day 3 in the blueprint timeline)

The blueprint phases TitleCard on Day 3, ahead of any page that uses it. This is correct because:
- **TitleCard is used on six pages** (Home, Work index, four case studies).
- It is the **single GSAP-touching component** — any motion bug in TitleCard would otherwise be diagnosed inside a fully-built case study page.
- The pin+resolve interaction needs **standalone testing** at 96px desktop, 64px mobile, with reduced-motion fallback. Easier in isolation.

### Why Home Before About (Day 4 vs Day 5)

Home requires `PortraitFullBleed` and `SelectedWorkStrip`. SelectedWorkStrip requires `case-studies.ts` listing — even if the listing returns case-study stubs without bodies, the type contract has to exist. Building Home forces this type contract to materialize, which About then inherits.

### Why ORDANI Before HR Equity (Day 9 vs Day 11)

ORDANI is **verbatim** per user confirmation. It's the longest case study and exercises every MDX component (PullQuote, CaseStudyStill, sage-only color override). Building it first surfaces every styling and frontmatter issue. Shorter case studies (HR Equity, Passioneer, Akamai) just slot into the proven template.

### The Sage Color Caveat

`ordani.sage (#5E7158)` is used **only** inside `/work/ordani`. Implementation: case study pages set a per-page CSS variable scope via `<div data-case-study="ordani">`, and the pull quote component conditionally reads `var(--color-ordani-sage)` when the data attribute is present. The harness `design-tokens.sh` should be configured to permit sage **only** under `content/work/ordani.mdx` and `components/PullQuote.tsx`.

---

## 9. Data Flow Diagrams

### 9.1 Request Flow (case study)

```
[GET /work/ordani]
    │
    ▼
Vercel edge → Next.js Server
    │
    ▼
app/(theater)/work/[slug]/page.tsx (async, prerendered at build via generateStaticParams)
    │
    ├─ params.slug = "ordani"
    ├─ await import(`@/content/work/ordani.mdx`)
    │     └─ @next/mdx compiles MDX → React component at build time
    ├─ frontmatter exported from MDX file (or read via gray-matter at build)
    │
    ▼
Render tree:
    <html className="font-vars-attached">
      <body>
        <LenisProvider> [client]
          <ViewTransition name="root" default="cross-fade"> [from React]
            <(theater) layout> data-mode="theater"
              <Nav variant="theater" />
              <article>
                <TitleCard words={frontmatter.titleCardWords} /> [client, GSAP]
                <Dek>{frontmatter.dek}</Dek>
                <MDXContent /> [pre-compiled]
                  └─ <h1>, <h2>, <p>, <blockquote>, <img> all mapped via mdx-components.tsx
              </article>
              <Footer variant="theater" />
            </(theater) layout>
          </ViewTransition>
        </LenisProvider>
      </body>
    </html>
    │
    ▼
[HTML streamed to client]
    │
    ▼
Client hydrates LenisProvider (smooth scroll) + TitleCard (GSAP)
```

### 9.2 Mode Transition Flow

```
[Foyer page rendered]
    │ User clicks <Link href="/work/ordani">
    │
    ▼
Next.js router intercepts → triggers React Transition
    │
    ▼
React detects <ViewTransition name="root"> wrapping changed children
    │ Calls document.startViewTransition() internally
    │
    ▼
Browser captures snapshot of foyer DOM → ::view-transition-old(root)
    │
    ▼
Browser renders theater DOM → ::view-transition-new(root)
    │
    ▼
CSS @keyframes fade-out (600ms) on old + fade-in (600ms) on new
    │ Anchored elements (Nav with viewTransitionName "site-nav") don't animate
    │ Reduced-motion users get 0s duration override
    │
    ▼
Transition completes → React commits theater tree
```

### 9.3 Build Pipeline

```
$ pnpm build
    │
    ▼
Next.js scans pageExtensions [.tsx, .mdx]
    │
    ├─ @next/mdx compiles content/work/*.mdx into React components
    │     └─ remark-gfm processes tables, footnotes
    │     └─ rehype plugins (slug, autolink-headings if added)
    │
    ├─ Tailwind v4 compiles globals.css
    │     └─ @theme block → CSS custom properties + utility classes
    │
    ├─ next/font/google fetches Inter + Source Serif 4 at build time
    │     └─ Subsets + self-hosts fonts in .next/static
    │
    ├─ instrumentation.ts hook runs copy-lint.ts
    │     └─ Scans all MDX for banned words → FAIL BUILD if found
    │
    ├─ generateStaticParams produces static [slug] routes
    │     └─ /work/ordani, /work/hr-equity-author, etc.
    │
    └─ Static HTML emitted for every route
    │
    ▼
Output: .next/ ready for Vercel
```

---

## 10. Anti-Patterns to Avoid

### 10.1 Multiple Root Layouts (Forbidden)

**What people do:** Put a `layout.tsx` directly inside `(foyer)/` and `(theater)/` with no parent root layout — each group is its own root.

**Why it's wrong:** Causes a **full page reload** between groups. Kills the View Transition. Visitors see a blank flash, not the 600ms dim.

**Do this instead:** Single root `app/layout.tsx`; group layouts are **nested** under it. The blueprint's signature transition is non-negotiable; the architecture follows.

### 10.2 Theme Provider Anti-Pattern

**What people do:** `useTheme()`, `<ThemeProvider>`, localStorage, a toggle button.

**Why it's wrong:** Mode is route-determined. A toggle would create state that contradicts the URL. The harness blocks dark-mode toggle imports for this reason.

**Do this instead:** `[data-mode]` attribute set by route group layout. CSS reads the attribute. No JS state.

### 10.3 Mixing GSAP and Framer Motion

**What people do:** Use GSAP for some component motion and Framer Motion for others.

**Why it's wrong:** Two motion runtimes = larger bundle, conflicting scroll listeners, fragmented animation philosophy. Blueprint specifies: GSAP **only** inside TitleCard; Framer Motion for everything else.

**Do this instead:** GSAP imports are quarantined to `components/TitleCard.tsx`. Any other GSAP import should fail review (and ideally a lint rule).

### 10.4 Headless CMS Overkill

**What people do:** Sanity, Contentful, Payload for five pages of content.

**Why it's wrong:** Schema + studio + webhook + revalidation = a lot of infrastructure for content that changes monthly at most.

**Do this instead:** MDX in repo, frontmatter validated by Zod, git is the CMS.

### 10.5 Client-Heavy Case Studies

**What people do:** Mark case study pages `"use client"` to enable Framer Motion scroll triggers throughout.

**Why it's wrong:** Defeats SSR, hurts LCP, blocks `generateStaticParams` static prerender benefits, fragments the bundle.

**Do this instead:** Case study pages stay Server Components. The single client island is `<TitleCard>`. Stills and pull quotes are static.

### 10.6 Conflicting Route Paths in Groups

**What people do:** Put `(foyer)/work/page.tsx` AND `(theater)/work/page.tsx`.

**Why it's wrong:** Both resolve to `/work` — Next.js throws a build error.

**Do this instead:** Foyer owns `/work` (index). Theater owns `/work/[slug]` (case studies). No overlap.

### 10.7 Putting LenisProvider Inside a Group Layout

**What people do:** Wrap only `(foyer)/layout.tsx` in Lenis, then wonder why theater pages don't smooth-scroll.

**Why it's wrong:** Group layouts mount/unmount on cross-group navigation; Lenis would remount and lose state during foyer↔theater transitions.

**Do this instead:** LenisProvider lives in the **root** `app/layout.tsx`. Mounts once, persists across navigation, smooth-scrolls both modes.

---

## 11. Integration Points

### 11.1 External Services

| Service | Integration Pattern | Notes |
|---|---|---|
| **Resend** | Server-only via `app/api/contact/route.ts` | API key in env. Domain verification needed on Vercel deploy. |
| **Supabase** | Server-only insert from contact route handler | Archive table only — no client SDK on marketing site. RLS policy: service role inserts, no public reads. |
| **Vercel Analytics** | `@vercel/analytics/next` `<Analytics />` in root layout | Auto-tracks pageviews. One custom event for case-study read-time. |
| **Vercel hosting** | Production deploy + custom domain (micahjonesconsulting.com) | Native View Transitions API supported on Vercel edge runtime. |

### 11.2 Internal Boundaries

| Boundary | Communication | Notes |
|---|---|---|
| `app/layout.tsx` ↔ `(foyer)/layout.tsx` | Children prop (server-to-server render) | No state to pass; layout composition only |
| `(theater)/work/[slug]/page.tsx` ↔ `content/work/*.mdx` | Dynamic `import()` at build time | Slug from URL → file path; resolved by `@next/mdx` |
| `mdx-components.tsx` ↔ MDX files | Globally injected | Maps HTML primitives to styled React components |
| `lib/case-studies.ts` ↔ `content/work/` | `fs.readdir` + `gray-matter` | Build-time only; no runtime FS access |
| `TitleCard` ↔ page content | Props-only (`words`, `caption`) | No context, no global state |
| `Nav` ↔ `(foyer)/(theater) layouts` | `variant` prop from layout | Mode source of truth = route group, not nav state |
| `ContactForm` ↔ `/api/contact` | `fetch` POST with JSON | Validated by Zod on both sides |

---

## 12. Scaling Considerations

This is a marketing site for a solo operator. Realistic scaling:

| Scale | Architecture Adjustments |
|---|---|
| 0–10k monthly visitors | Current architecture. All pages static. Vercel free tier covers this. |
| 10k–100k monthly visitors | Add Vercel Edge Caching headers. No architectural change. Verify Analytics quota. |
| 100k+ monthly visitors | Consider Edge Functions for `/api/contact` if Resend rate limits hit. Still no real change. |
| 10+ case studies | Move from `dynamicParams = false` to ISR? Probably still static. The build-time MDX compile is fast — five → fifty case studies is not the bottleneck. |
| 50+ case studies | Reconsider headless CMS. But not before then. |

**The actual bottleneck this site will hit:** none, until traffic spikes from a case-study sharing moment. Vercel handles spikes natively.

---

## 13. Tailwind v4 + `@theme` Reference Card

For component authors, the canonical mapping from `@theme` declaration to className:

| `@theme` variable | Tailwind utility | CSS output |
|---|---|---|
| `--color-paper` | `bg-paper`, `text-paper` | `background-color: #F5EFE4` |
| `--color-ink` | `text-ink`, `border-ink` | `color: #1A1816` |
| `--color-copper` | `text-copper`, `bg-copper` | `color: #C8542B` |
| `--color-bone` | `text-bone` (theater) | `color: #EAE6DD` |
| `--font-display` | `font-display` | `font-family: var(--font-inter-display), …` |
| `--font-body` | `font-body` | `font-family: var(--font-inter), …` |
| `--font-serif` | `font-serif` | `font-family: var(--font-source-serif), …` |

Mode-scoped utilities cascade automatically — `[data-mode="foyer"] .text-foreground` resolves differently than `[data-mode="theater"] .text-foreground` once the `@theme` block defines them.

---

## 14. Sources

All references verified May 2026 (last-updated dates ≤ 2026-05-13 on the official docs):

- [Next.js — View Transitions Guide (2026-05-13)](https://nextjs.org/docs/app/guides/view-transitions) — HIGH confidence — canonical setup for `experimental.viewTransition: true`, `<ViewTransition>` from `react`, `::view-transition-old/new` CSS, transition types, reduced-motion handling
- [Next.js — Route Groups (2026-05-13)](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups) — HIGH confidence — `(folder)` syntax, multiple root layouts caveat (full page reload), conflicting paths warning
- [Next.js — MDX Guide (2026-05-13)](https://nextjs.org/docs/app/guides/mdx) — HIGH confidence — `@next/mdx` setup, `mdx-components.tsx` requirement, dynamic `[slug]` import pattern, frontmatter via gray-matter
- [Next.js — `viewTransition` config reference](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition) — HIGH confidence
- [React `ViewTransition` component (react.dev)](https://react.dev/reference/react/ViewTransition) — HIGH confidence — name prop, share/enter/exit/default props, activation via Transitions
- [Build with Matija — Google Fonts in Next.js 15 + Tailwind v4](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) — MEDIUM confidence — confirms `@theme` re-declaration requirement for next/font CSS variables
- [Tailwind v4 — Theme Variables Docs](https://tailwindcss.com/docs/theme) — HIGH confidence — `@theme` directive, CSS-first configuration
- [GitHub: vercel/next.js Discussion #77337](https://github.com/vercel/next.js/discussions/77337) — HIGH confidence — confirms next/font CSS variable redeclaration in `@theme` for Tailwind v4
- [Lenis npm package](https://www.npmjs.com/package/lenis) — HIGH confidence — package rename to `lenis`, `lenis/react` import path
- [Vercel Labs React View Transitions Demo](https://github.com/vercel-labs/react-view-transitions-demo) — HIGH confidence — reference implementation of all four transition patterns

---

*Architecture research for: Next.js 15 App Router two-mode marketing site (House Lights)*
*Researched: 2026-05-14*
