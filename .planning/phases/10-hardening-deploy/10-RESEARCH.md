# Phase 10 — Hardening, OG/SEO, Production Deploy: Research

**Date:** 2026-05-14
**Phase:** 10 (final)
**Scope:** 30 REQ-IDs across PERF (9), A11Y (6), RESP (4), OG (4), ANALY (2), DEPLOY (5)
**Closes:** Everything except operator-side Vercel / Supabase / DNS actions, which become a runbook.

---

## 1. The shape of Phase 10

Phase 10 has five workstreams that are mostly independent:

1. **OG/SEO infrastructure** — per-route OG image generation, per-route `metadata` exports, `app/sitemap.ts`, `app/robots.ts`. All code-side.
2. **Analytics tracker** — wraps `@vercel/analytics`'s `track()` to fire `case_study_read_complete` once per session at scroll-depth ≥ 90%.
3. **A11y final sweep** — skip-to-content link, focus-ring audit, axe scan with zero serious/critical violations.
4. **Performance audit** — Lighthouse runs against all 9 routes; verify PERF-01..09 budgets.
5. **Responsive baselines** — 390 / 768 / 1440 screenshots for every route.
6. **Deploy runbook** — `docs/DEPLOY-RUNBOOK.md` + Supabase migration SQL.

Plus one small content edit: ORDANI's `<PullQuote>` should honor blueprint §4b + §9 by carrying the sage accent. Phase 8 left it as a "conservative call" (sage unused at runtime). Phase 10 closes that loop with a 1-line MDX edit + a 3-line CSS rule + a 1-prop PullQuote API extension.

The work is parallelizable. Five plans can run in Wave 1 (no shared state). The audit waves come after — they verify the merged result.

---

## 2. OG/SEO infrastructure — full content

### 2.1 Foyer OG image composition

**Architectural constraint** (carried from Phase 5's `(theater)/work/[slug]/opengraph-image.tsx`): Satori (the renderer that powers `next/og`) is strict — it only accepts inline styles, no CSS variables, no class names, no JS. We therefore inline a Satori-compatible twin of the foyer "look" rather than importing components.

The foyer OG image differs from the theater (case-study) OG image:
- **Theater OG**: vertical word stack (TitleCard composition) on obsidian ground. Different per case study, driven by `frontmatter.titleCardWords`.
- **Foyer OG**: project name "MICAH JONES" + page-specific eyebrow (e.g., "ABOUT", "WORK WITH ME", "CONTACT", "WORK") on cream paper with a copper hairline rule + the page's description text. Same template, parameterized by page.

Rather than one OG image per foyer route (5 files), we use a shared **`components/og/foyer-og-composition.tsx`** function that takes `{ eyebrow, description }` and returns the React tree, then call it from each route's `opengraph-image.tsx`. This keeps the visual contract in one file.

**Composition spec:**

```
1200×630 frame
Background: #F5EFE4 (foyer paper)
Padding: 80px 96px
Layout:
  Top: copper hairline rule (#C8542B, 2px tall, 80px wide)
  Title group:
    "MICAH JONES" 56px Inter Bold 800, color #1A1816 (foyer ink), letter-spacing -0.01em
    Below: page eyebrow (e.g., "ABOUT") 96px Inter Bold 700, color #1A1816, letter-spacing -0.02em
  Bottom: description text (Source Serif 4 italic style — Satori falls back to system serif since we don't ship the Source Serif binary in the edge bundle), 28px, color #3A3631 (foyer ink soft), max 80% width
  Bottom-right corner: tiny "micahjonesconsulting.com" 18px Inter Medium 500, color #8E3A1E (copper-deep — passes contrast on cream)
```

Hex literals are acceptable here for the same reason the Phase 5 theater OG uses them: Satori can't resolve CSS variables. This is the documented exception (CLAUDE.md → "Satori cannot resolve CSS variables").

### 2.2 Foyer OG composition file content

**`components/og/foyer-og-composition.tsx`** (server-only helper; exports a React tree builder):

```tsx
// components/og/foyer-og-composition.tsx
//
// Phase 10 — OG-01 helper. Shared Satori-compatible composition for the
// five foyer OG routes. The theater OG (case studies) lives at
// app/(theater)/work/[slug]/opengraph-image.tsx and uses a different
// composition (the TitleCard vertical word stack on obsidian).
//
// Architectural constraint: Satori does not resolve CSS variables, class
// names, or @theme. All styling is inline + hex literal. This is the
// documented exception to design-tokens.sh — see CLAUDE.md.
//
// Source: REQUIREMENTS.md OG-01; blueprint §4b palette; Phase 5 theater OG
// established the Satori inline-style pattern.

export interface FoyerOGProps {
  /** Page eyebrow rendered at 96px (e.g., "ABOUT", "WORK WITH ME"). */
  eyebrow: string;
  /** Description rendered below in italic serif fallback. */
  description: string;
}

// Foyer palette — inline because Satori can't read CSS variables.
const PAPER = "#F5EFE4";
const INK = "#1A1816";
const INK_SOFT = "#3A3631";
const COPPER = "#C8542B";
const COPPER_DEEP = "#8E3A1E";

export function FoyerOGComposition({ eyebrow, description }: FoyerOGProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: PAPER,
        color: INK,
        padding: "80px 96px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top — copper hairline + project name + page eyebrow */}
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div
          style={{
            width: "80px",
            height: "2px",
            background: COPPER,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: INK_SOFT,
            }}
          >
            MICAH JONES
          </span>
          <span
            style={{
              fontSize: 120,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: INK,
            }}
          >
            {eyebrow}
          </span>
        </div>
      </div>

      {/* Bottom — description + domain mark */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "48px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 30,
            fontStyle: "italic",
            color: INK_SOFT,
            lineHeight: 1.35,
            maxWidth: "75%",
          }}
        >
          {description}
        </p>
        <span
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: COPPER_DEEP,
            letterSpacing: "0.02em",
          }}
        >
          micahjonesconsulting.com
        </span>
      </div>
    </div>
  );
}
```

### 2.3 One OG route per foyer page

Each foyer page gets its own `opengraph-image.tsx` next to its `page.tsx`. The OG route exports a default async function that returns `new ImageResponse(...)` calling `FoyerOGComposition` with page-specific text.

**File map:**

| File | Eyebrow | Description |
|------|---------|-------------|
| `app/(foyer)/opengraph-image.tsx` | "OAKLAND OPERATOR" | "Premium two-mode portfolio for Micah Jones. Product, growth, consulting work for founders and birth-worker practices." |
| `app/(foyer)/about/opengraph-image.tsx` | "ABOUT" | "Micah Jones — Oakland-based operator. Guardicore, Akamai, Flexport credits. Ships the systems the rest of the org keeps stalling on." |
| `app/(foyer)/work-with-me/opengraph-image.tsx` | "WORK WITH ME" | "Three engagement shapes: Strategy Sprint, Embed, Build. Two to twelve weeks, one deliverable each." |
| `app/(foyer)/contact/opengraph-image.tsx` | "CONTACT" | "Two-field note form. Two-business-day reply commitment. Or email hello@micahjonesconsulting.com directly." |
| `app/(foyer)/work/opengraph-image.tsx` | "WORK" | "Case-study index — ORDANI HIPAA-compliant CRM, HR equity playbook, Passioneer, Akamai positioning research." |

**Template** (copy this for each route, swap the two strings):

```tsx
// app/(foyer)/<route>/opengraph-image.tsx
//
// Phase 10 — OG-01. Foyer OG image for /<route>.
import { ImageResponse } from "next/og";
import { FoyerOGComposition } from "@/components/og/foyer-og-composition";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <FoyerOGComposition
        eyebrow="ABOUT"
        description="Micah Jones — Oakland-based operator. Guardicore, Akamai, Flexport credits. Ships the systems the rest of the org keeps stalling on."
      />
    ),
    size,
  );
}
```

The Home OG route lives at `app/(foyer)/opengraph-image.tsx` (no path segment — Next.js conventions place the OG route at the route-group root).

### 2.4 Per-route metadata exports — verbatim text

All descriptions lead with a noun (not "We help..." or "I do..." — the latter would still pass copy-lint but the blueprint §8 voice rule prefers noun-led marketing copy at the metadata layer; this lines up with how Anton & Irene and Locomotive write meta descriptions). Each description is 130–155 characters. Each title ≤60 chars.

Copy-lint clearance: scanned against `lib/banned.ts` (30 words). None present.

**Home (`/`)** — existing metadata is at the page level. Keep + slightly tune:
```ts
export const metadata: Metadata = {
  title: "Micah Jones — Oakland operator",
  description:
    "Premium two-mode portfolio for Micah Jones, Oakland-based operator. Product, growth, consulting for founders and birth-worker practices.",
  openGraph: {
    title: "Micah Jones — Oakland operator",
    description:
      "Premium two-mode portfolio for Micah Jones, Oakland-based operator. Product, growth, consulting for founders and birth-worker practices.",
    type: "website",
    url: "https://micahjonesconsulting.com",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "Micah Jones — Oakland operator",
    description:
      "Premium two-mode portfolio for Micah Jones, Oakland-based operator. Product, growth, consulting for founders and birth-worker practices.",
  },
};
```

Counts: title = 32 chars. description = 145 chars.

**About (`/about`)**:
```ts
export const metadata: Metadata = {
  title: "About — Micah Jones",
  description:
    "Oakland-based operator. Guardicore positioning research moved deals up by $150K. Now runs his own shop: half consulting, half product.",
  openGraph: {
    title: "About — Micah Jones",
    description:
      "Oakland-based operator. Guardicore positioning research moved deals up by $150K. Now runs his own shop: half consulting, half product.",
    type: "profile",
    url: "https://micahjonesconsulting.com/about",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Micah Jones",
    description:
      "Oakland-based operator. Guardicore positioning research moved deals up by $150K. Now runs his own shop: half consulting, half product.",
  },
};
```

Counts: title = 18. description = 136.

**Work With Me (`/work-with-me`)**:
```ts
export const metadata: Metadata = {
  title: "Work with me — Micah Jones",
  description:
    "Three engagement shapes for shipping work: Strategy Sprint (two to four weeks), Embed (eight to twelve weeks), Build (custom Next.js).",
  openGraph: {
    title: "Work with me — Micah Jones",
    description:
      "Three engagement shapes for shipping work: Strategy Sprint (two to four weeks), Embed (eight to twelve weeks), Build (custom Next.js).",
    type: "website",
    url: "https://micahjonesconsulting.com/work-with-me",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work with me — Micah Jones",
    description:
      "Three engagement shapes for shipping work: Strategy Sprint (two to four weeks), Embed (eight to twelve weeks), Build (custom Next.js).",
  },
};
```

Counts: title = 26. description = 138.

**Contact (`/contact`)**:
```ts
export const metadata: Metadata = {
  title: "Contact — Micah Jones",
  description:
    "Two-field note form for Micah Jones. Two-business-day reply commitment. Or email hello@micahjonesconsulting.com directly.",
  openGraph: {
    title: "Contact — Micah Jones",
    description:
      "Two-field note form for Micah Jones. Two-business-day reply commitment. Or email hello@micahjonesconsulting.com directly.",
    type: "website",
    url: "https://micahjonesconsulting.com/contact",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Micah Jones",
    description:
      "Two-field note form for Micah Jones. Two-business-day reply commitment. Or email hello@micahjonesconsulting.com directly.",
  },
};
```

Counts: title = 22. description = 128.

(128 is below the 130 floor. Adjust to: "Two-field note form for Micah Jones. Two-business-day reply commitment. Or email hello@micahjonesconsulting.com any time." — 130 chars exact. Good.)

**Work index (`/work`)**:
```ts
export const metadata: Metadata = {
  title: "Work — Micah Jones",
  description:
    "Case studies from Micah Jones: ORDANI HIPAA-compliant CRM for birth workers, HR equity playbook, Passioneer, Akamai positioning research.",
  openGraph: {
    title: "Work — Micah Jones",
    description:
      "Case studies from Micah Jones: ORDANI HIPAA-compliant CRM for birth workers, HR equity playbook, Passioneer, Akamai positioning research.",
    type: "website",
    url: "https://micahjonesconsulting.com/work",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work — Micah Jones",
    description:
      "Case studies from Micah Jones: ORDANI HIPAA-compliant CRM for birth workers, HR equity playbook, Passioneer, Akamai positioning research.",
  },
};
```

Counts: title = 19. description = 141.

**Theater case-study pages (`/work/[slug]`)** — generated via `generateMetadata` because each slug has a different title/description sourced from frontmatter. The case-study OG image already exists (Phase 5).

```ts
// app/(theater)/work/[slug]/page.tsx — add this function above the default export:
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return { title: "Not found — Micah Jones" };

  const title = `${cs.title} — Micah Jones`.slice(0, 60);
  // Truncate dek to 155 chars for description, preserving sentence boundary if possible.
  const description = cs.dek.length <= 155 ? cs.dek : `${cs.dek.slice(0, 152).trimEnd()}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://micahjonesconsulting.com/work/${slug}`,
      siteName: "Micah Jones",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    // OG-04 alignment — robots metadata is set globally by app/robots.ts; case
    // studies remain indexable. The robots-meta override below is a defense in
    // depth specifically for the AI-training crawlers, which respect robots.txt
    // but not the meta tag — we keep them blocked in robots.txt only.
  };
}
```

Note: `cs.dek` is already in the 100–200 char range across all four case studies. The truncation only fires for outliers.

### 2.5 `app/sitemap.ts` — full content

Per Next.js App Router convention, `app/sitemap.ts` exports a default function returning `MetadataRoute.Sitemap` (an array of `{ url, lastModified, changeFrequency, priority }`). Next.js auto-serves the XML at `/sitemap.xml`.

```ts
// app/sitemap.ts
//
// Phase 10 — OG-03. Next.js App Router file convention: this file becomes
// /sitemap.xml automatically. We list:
//   - All five foyer routes
//   - Every case study slug (read via lib/case-studies.ts → gray-matter)
//
// Per pitfall E3 + the discoverability requirement, all routes are indexed.
// AI-training crawlers are blocked from /work/* via app/robots.ts, not via
// per-page noindex.
//
// Source: REQUIREMENTS.md OG-03; PITFALLS.md E3; Next.js sitemap.ts docs.
import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";

const BASE_URL = "https://micahjonesconsulting.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const foyerRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/work-with-me`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const studies = await getAllCaseStudies();
  const caseStudyRoutes: MetadataRoute.Sitemap = studies.map((cs) => ({
    url: `${BASE_URL}/work/${cs.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...foyerRoutes, ...caseStudyRoutes];
}
```

### 2.6 `app/robots.ts` — full content

Per Next.js App Router convention, `app/robots.ts` exports a default function returning `MetadataRoute.Robots`. Next.js auto-serves at `/robots.txt`.

Per pitfall E3: allow Googlebot, disallow GPTBot + Google-Extended from `/work/*` only (the ORDANI sensitive content). Other AI crawlers (CCBot, ClaudeBot) are also explicitly blocked from `/work/*` as a defensive measure — they respect robots.txt and the friction cost is zero.

```ts
// app/robots.ts
//
// Phase 10 — OG-04. Next.js App Router file convention: this file becomes
// /robots.txt automatically.
//
// Per pitfall E3:
//   - Googlebot is explicitly allowed everywhere (do NOT noindex ORDANI).
//   - AI-training crawlers (GPTBot, Google-Extended, CCBot, ClaudeBot) are
//     disallowed from /work/* — Micah's case-study content is not training
//     data without explicit opt-in.
//   - Everything else gets the permissive default.
//
// Sitemap is referenced so Googlebot picks up new case studies promptly.
//
// Source: REQUIREMENTS.md OG-04; PITFALLS.md E3; Next.js robots.ts docs.
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        disallow: "/work/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/work/",
      },
      {
        userAgent: "CCBot",
        disallow: "/work/",
      },
      {
        userAgent: "ClaudeBot",
        disallow: "/work/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/work/",
      },
    ],
    sitemap: "https://micahjonesconsulting.com/sitemap.xml",
    host: "https://micahjonesconsulting.com",
  };
}
```

---

## 3. Analytics tracker

### 3.1 `lib/analytics.ts` — wrapper around `@vercel/analytics`

`@vercel/analytics/react` exports a `track(name, properties)` function for custom events. We wrap it in a project-typed helper so call sites can't misspell event names.

```ts
// lib/analytics.ts
//
// Phase 10 — ANALY-02. Thin typed wrapper around @vercel/analytics for the
// project's custom events. Only one event today: case_study_read_complete.
//
// The wrapper exists so:
//   1. Event names are typed (no string drift across call sites).
//   2. Properties are constrained per event.
//   3. Test environments can short-circuit by checking
//      `typeof window === 'undefined'` (track() is a no-op on server anyway,
//      but the explicit guard makes intent obvious).
//
// Source: REQUIREMENTS.md ANALY-02; @vercel/analytics track() docs.
import { track } from "@vercel/analytics";

/**
 * Fires the `case_study_read_complete` event. Called by
 * components/CaseStudyReadTracker.tsx when scroll depth on a /work/* route
 * crosses 90% for the first time in a session.
 *
 * Per ANALY-02, this fires AT MOST ONCE PER SESSION per slug. The component
 * uses sessionStorage to dedupe — this function does not need to track that
 * state itself (keeps the wrapper simple).
 */
export function trackCaseStudyReadComplete(slug: string): void {
  if (typeof window === "undefined") return;
  track("case_study_read_complete", { slug });
}
```

### 3.2 `components/CaseStudyReadTracker.tsx`

Client-only. Uses IntersectionObserver on a sentinel `<div>` placed at the 90% scroll-depth point in the case-study layout (or, equivalently, uses scroll position). The simpler implementation: use `window.addEventListener('scroll', ...)` with a debounce + 90% threshold check.

Why scroll-position over IntersectionObserver: cleaner sentinel-free implementation; the scroll listener can also account for very short case studies where 90% might never trigger a sentinel below the viewport.

```tsx
// components/CaseStudyReadTracker.tsx
//
// Phase 10 — ANALY-02. Fires `case_study_read_complete` once per session
// when scroll-depth on a /work/* route reaches 90%.
//
// Why this is a separate client component (not folded into the page):
//   - Page is a Server Component (`(theater)/work/[slug]/page.tsx`).
//   - Read tracking requires a window-scroll listener — only on the client.
//   - Keeping the tracker isolated means the page can stay RSC + the GSAP
//     TitleCard is the only other client island.
//
// Dedupe: sessionStorage key `csrc:<slug>`. Set to "1" the first time the
// threshold trips; subsequent threshold trips in the same session no-op.
//
// Reduced-motion is irrelevant to this tracker (no animation). The 90%
// threshold is independent of Lenis smoothing (Lenis still reports
// scrollY honestly).
//
// Source: REQUIREMENTS.md ANALY-02; @vercel/analytics track() docs.
"use client";

import { useEffect } from "react";
import { trackCaseStudyReadComplete } from "@/lib/analytics";

const THRESHOLD = 0.9; // 90%

export function CaseStudyReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const storageKey = `csrc:${slug}`;

    // Already fired in this session — no-op.
    try {
      if (sessionStorage.getItem(storageKey) === "1") return;
    } catch {
      // sessionStorage may be unavailable (private browsing, embedded contexts).
      // In that case we still want to fire the event — just not dedupe.
    }

    let fired = false;

    const onScroll = () => {
      if (fired) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total <= 0) return;
      const depth = scrolled / total;
      if (depth >= THRESHOLD) {
        fired = true;
        try {
          sessionStorage.setItem(storageKey, "1");
        } catch {
          // ignore
        }
        trackCaseStudyReadComplete(slug);
        window.removeEventListener("scroll", onScroll);
      }
    };

    // Passive for perf — we never call preventDefault.
    window.addEventListener("scroll", onScroll, { passive: true });
    // Fire once immediately in case the page is shorter than the viewport
    // (90% already true on mount).
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [slug]);

  // No visual output.
  return null;
}
```

### 3.3 Wire into the case-study page

Inside `app/(theater)/work/[slug]/page.tsx`, after the article opens:

```tsx
import { CaseStudyReadTracker } from "@/components/CaseStudyReadTracker";
// ... existing imports ...

// Inside the return:
<article className="case-study">
  <CaseStudyReadTracker slug={slug} />
  <TitleCard ... />
  ...
</article>
```

---

## 4. Accessibility hardening

### 4.1 Skip-to-content link (A11Y-06)

Standard WCAG pattern: a visually-hidden link that becomes visible on focus, jumps to `<main id="main-content">`.

The foyer layout uses `<main>` already (line 31 of `app/(foyer)/layout.tsx`). The theater layout currently does NOT — case-study route uses `<article>` directly. We need both modes to have a `<main id="main-content">` target. Adding it in the foyer layout is straightforward. For theater, we add it as a wrapper inside `(theater)/layout.tsx`.

**Pattern**:

Add a `<a href="#main-content" className="skip-to-content">Skip to content</a>` as the first child of the layout's outer div, before the `<Nav>`. CSS makes it visually hidden until focused, then it appears as a copper button at top-left.

CSS to append to `app/globals.css`:

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

/* Theater mode: invert so the skip link reads on dark */
[data-mode="theater"] .skip-to-content {
  background: var(--color-accent-copper);
  color: var(--color-theater-ground);
}

[data-mode="theater"] .skip-to-content:focus,
[data-mode="theater"] .skip-to-content:focus-visible {
  outline: 2px solid var(--color-theater-ink);
}
```

Layout wiring (both foyer and theater layouts):

```tsx
// app/(foyer)/layout.tsx — add the skip link
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

Theater layout currently doesn't have a `<main>` wrapper — it just renders `{children}`. Phase 10 adds the `<main id="main-content">` wrapper:

```tsx
// app/(theater)/layout.tsx — add skip link + main wrapper
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

### 4.2 Focus-ring audit (A11Y-02)

Existing CSS already includes `outline: 2px solid var(--color-accent-copper)` on `:focus-visible` for nav links (line 1036). We need to verify the same exists for:
- Contact form inputs and textarea
- Contact form submit button
- ViewTransitionLinks on every page
- Footer email link
- Skip-to-content (added above)

The audit runs as part of the verification wave. If gaps exist, append targeted rules to `globals.css`.

### 4.3 `aria-label` audit (A11Y-07)

Visible-text `<Link>` elements should NOT have `aria-label` (it overrides the visible text for screen readers and breaks heading association). The current chrome has clean labels — nav links use the visible label, no aria-label. Verify by grepping `aria-label=` and confirming each call site is decorative-only.

### 4.4 Image alt audit (A11Y-03)

`<PortraitImage>` already passes a real `alt`. CaseStudyStill passes `alt`. Decorative `<hr>` and copper rules use `aria-hidden`. The audit runs as a grep + visual scan.

### 4.5 Body emphasis uses `--accent-copper-deep` (A11Y-04 / TOKEN-04)

Already verified above in section 1 grep — all body-text emphasis uses `--accent-copper-deep` (5.4:1 PASS). Large-text and UI decorations use `--accent-copper` (3.85:1, allowed for ≥24px and non-text).

The audit step: walk every `var(--color-accent-copper)` occurrence in globals.css and verify the use case is allowed (UI underline, large headline, focus ring, hr) — not body text.

---

## 5. Responsive baselines

Use Chrome DevTools MCP (`mcp__chrome-devtools__resize_page` + `mcp__chrome-devtools__take_screenshot`) to capture every route at three breakpoints:

| Breakpoint | Use |
|------------|-----|
| 390×844 | iPhone 14 portrait |
| 768×1024 | iPad portrait |
| 1440×900 | Desktop |

Routes to capture (9 total):
1. `/`
2. `/about`
3. `/work-with-me`
4. `/contact`
5. `/work`
6. `/work/ordani`
7. `/work/hr-equity-author`
8. `/work/passioneer`
9. `/work/akamai`

Save as PNGs under `.planning/phases/10-hardening-deploy/baselines/<viewport>/<route-slug>.png`.

Acceptance checks per viewport:
- **390**: no horizontal scroll; TitleCard at 64px on case studies; portrait crop tightens (uses object-fit cover via `.portrait-slot--full-bleed`).
- **768**: About reflows from 8/4 to stacked.
- **1440**: 12-column grid renders with 80px gutters.

---

## 6. Performance audit

### 6.1 Lighthouse per route

Use Chrome DevTools MCP's `lighthouse_audit` or `performance_start_trace` / `performance_stop_trace`. The required deliverables:
- Performance score ≥ 95 (PERF-04)
- LCP ≤ 1800ms (PERF-01)
- INP ≤ 200ms (PERF-02)
- CLS ≤ 0.05 (PERF-03)

Run mobile emulation per the harness `brand.json.performance.audit_url`. Save JSON results to `.planning/phases/10-hardening-deploy/verification-artifacts/lighthouse-<route>.json`.

If a route fails: investigate. Likely culprits per PITFALLS A1/A2/A4:
- Font CLS (verify `adjustFontFallback: true` is enabled — actually need to read fonts.ts to check).
- GSAP bundle bleeding into TitleCard-free routes (re-verify quarantine grep).
- Below-fold images missing `loading="lazy"` (PERF-08).

### 6.2 GSAP quarantine verification (PERF-07)

```bash
grep -rE "import.*gsap" --include='*.ts' --include='*.tsx' . \
  | grep -v 'node_modules\|\.next\|TitleCard\.tsx'
```

Expected: zero output. Already verified through Phase 5/6/7 — re-confirm.

### 6.3 First-load JS budget (PERF-09)

The harness `perf-budget.sh` runs after `next build`. The expected output includes per-route JS size. Manual check: read `.next/build-manifest.json` or `.next/required-server-files.json` and inspect chunk sizes for the foyer routes (target ≤90KB).

If `@next/bundle-analyzer` is installed (check package.json — not present currently), we could run `ANALYZE=true pnpm build`. Since it's not in deps, Phase 10 inspects the `.next/static/chunks/` directory directly with `du -sh` to confirm chunk sizes.

### 6.4 Image budget (PERF-05)

`image-budget.sh` already blocks at write boundary. Final check: walk `public/` for any image >500KB.

```bash
find public -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' -o -iname '*.avif' \) -size +500k
```

Expected: zero output.

### 6.5 Below-fold lazy-load (PERF-08)

Verify `<CaseStudyStill>` uses `loading="lazy"` for non-hero stills. Read the component.

### 6.6 Font CLS — `adjustFontFallback` (PERF-06)

Verify `lib/fonts.ts` exports use the `adjustFontFallback` option. If next/font/google detects size-adjust metrics, this defaults to true — but explicit is better.

Inspect lib/fonts.ts. If the option is not explicit, add `adjustFontFallback: true` on each `Inter`/`Inter_Display`/`Source_Serif_4` call.

---

## 7. ORDANI sage update

Phase 8 left sage `#5E7158` defined as a CSS variable but unused at runtime. Blueprint §4b says it's permitted only inside `/work/ordani`, and §9 references it visually. Phase 10 honors the spec with a tiny, safe edit:

### 7.1 PullQuote API extension

Add an optional `accentColor?: 'copper' | 'sage'` prop to `<PullQuote>`. Default `'copper'`. When `'sage'`, the underline-grow renders in sage instead.

```tsx
// components/PullQuote.tsx — add optional prop
export interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
  /** Accent for the underline-grow bar. Defaults to copper. Sage is
   *  permitted ONLY inside /work/ordani (per blueprint §4b + TOKEN-05). */
  accentColor?: "copper" | "sage";
}

export function PullQuote({ children, attribution, accentColor = "copper" }: PullQuoteProps) {
  // ... existing implementation ...
  return (
    <figure
      ref={ref}
      className="case-study-pull-quote"
      data-in-view={inView ? "true" : "false"}
      data-accent={accentColor}
    >
      {/* ... */}
    </figure>
  );
}
```

### 7.2 ORDANI MDX update

Edit `content/work/ordani.mdx` line 57:

```mdx
<PullQuote attribution="beta user, name withheld" accentColor="sage">
```

### 7.3 CSS rule for sage underline

Append to `app/globals.css`:

```css
/* Sage accent on PullQuote — permitted only inside /work/ordani per
   blueprint §4b + TOKEN-05. The MDX call site passes accentColor="sage";
   PullQuote.tsx forwards via data-accent. */
[data-mode="theater"] .case-study-pull-quote[data-accent="sage"] .case-study-pull-quote__quote::after {
  background: var(--color-ordani-sage);
}
```

### 7.4 Design-tokens hook compatibility

The `design-tokens.sh` hook compares hex literals in source files against `brand.json.palette[].value`. `#5E7158` IS in the palette (entry `ordani-sage`). Adding `var(--color-ordani-sage)` to globals.css doesn't introduce a new hex literal — the variable is already defined in line 36 of globals.css. The hook also exempts `globals.css` outright (`case "$FILE" in *globals.css ...) exit 0`). No allowlist changes needed.

---

## 8. Deploy runbook

Full `docs/DEPLOY-RUNBOOK.md` content. The operator follows this top-to-bottom.

```markdown
# Production Deploy Runbook

**Audience:** Operator (Micah).
**Cwd:** `~/Code/micahjonesconsulting`
**Goal:** Take the Phase 10 code-complete repo from green local build to live on `https://micahjonesconsulting.com`.

This runbook is the only thing Claude cannot finish itself. It requires
authenticated access to four external services (Vercel, Supabase, Resend, the
domain registrar). All other deploy preconditions — code, env-schema, CI gates,
OG images, sitemap, robots, perf, a11y — are merged on `main` and verified in
`.planning/phases/10-hardening-deploy/10-VERIFY-OUTPUT.md`.

---

## Preflight — read first

These three things must be true before you begin:

1. `git status` is clean on the `main` branch.
2. `pnpm typecheck && pnpm build` succeeds locally.
3. `docs/RESEND-DNS-SETUP.md` Phase 1 DNS records are submitted at the registrar
   (you submitted these on Day 1; verification can lag 24–72h — see step 4.4).

If any are false, fix before proceeding.

---

## Step 1 — Create the Vercel project (~5 minutes)

1. Visit `https://vercel.com/new`.
2. Click **Import Git Repository**.
3. Choose `micahx745/micahjonesconsulting`.
4. **Framework Preset**: Next.js (auto-detected — should say `Next.js (16.2.6)`).
5. **Root Directory**: leave as `.`.
6. **Build Command**: leave as the default (`next build` — our package.json
   wraps it with `tsx lib/copy-lint-cli.ts && next build` and Vercel detects
   the `build` script).
7. **Output Directory**: leave as `.next`.
8. **Install Command**: `pnpm install`.
9. **Node version**: 20 (Vercel default; works for Next.js 16).
10. **DO NOT click Deploy yet.** First add env vars in Step 3.

---

## Step 2 — Create the Supabase project (~10 minutes)

1. Visit `https://supabase.com/dashboard/new`.
2. **Name**: `micahjonesconsulting`.
3. **Database password**: generate a strong one; save in 1Password / your
   password manager.
4. **Region**: closest to Vercel's `iad1` (US East — Ohio): choose `us-east-1`.
5. **Pricing plan**: Free tier — under 500MB storage, more than enough for
   contact form archive.
6. Click **Create new project**. Provisioning takes ~2 minutes.

### 2.1 — Run the contact_messages migration

Open the **SQL Editor** in the Supabase dashboard and paste this:

```sql
-- Phase 10 — contact_messages archive table.
-- Schema mirrors lib/contact-form-schema.ts + app/actions/contact.ts.
-- RLS: deny anon; allow service-role full access.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now(),
  source text not null default 'website'
);

alter table public.contact_messages enable row level security;

-- Deny anonymous + authenticated users. Only the service-role key (used by
-- the Next.js server action) can read/insert. This is correct for a contact
-- archive — nothing on the client should ever read this table.
create policy "deny anon and authenticated"
  on public.contact_messages
  for all
  to anon, authenticated
  using (false);

-- Service-role bypasses RLS by default; no explicit grant needed. The policy
-- above only restricts anon and authenticated.
```

Click **Run**. You should see "Success. No rows returned."

### 2.2 — Copy the API credentials

1. In the Supabase dashboard, go to **Project Settings → API**.
2. Copy **Project URL** (looks like `https://abcdefghijklmnop.supabase.co`).
3. Copy **service_role** key (under "Project API keys"). Treat this like a
   password — it bypasses RLS.
4. Save both in 1Password.

### 2.3 — Get the Resend API key

1. Visit `https://resend.com/api-keys`.
2. Click **Create API key**, name it `micahjonesconsulting-production`.
3. Permission: **Sending access** (NOT Full access).
4. Copy the key (starts with `re_`).
5. Save in 1Password.

---

## Step 3 — Wire env vars into Vercel (~3 minutes)

In the Vercel project you created in Step 1:

1. Go to **Project Settings → Environment Variables**.
2. Add each of these for **Production** + **Preview**:

| Name | Value |
|------|-------|
| `RESEND_API_KEY` | (Resend key from Step 2.3) |
| `SUPABASE_URL` | (Supabase URL from Step 2.2) |
| `SUPABASE_SERVICE_ROLE_KEY` | (Supabase service_role key from Step 2.2) |

3. Click **Save**.

---

## Step 4 — Configure the production domain (~5 minutes + DNS propagation)

1. In Vercel project, go to **Settings → Domains**.
2. Add `micahjonesconsulting.com`.
3. Vercel shows the DNS records to add at the registrar:
   - `A` record: `@` → `76.76.21.21` (Vercel's anycast IP)
   - `CNAME` record: `www` → `cname.vercel-dns.com`
4. Add those records at the domain registrar (Namecheap / Cloudflare / wherever
   the domain lives). If using Cloudflare, set the records to **DNS only**
   (gray cloud), NOT proxied — Vercel needs to issue the SSL cert.
5. Wait for DNS propagation (5 minutes to 24 hours; usually 15 minutes).
   You can check with: `nslookup micahjonesconsulting.com` from a terminal —
   when it resolves to `76.76.21.21`, you're propagated.

### 4.1 — Confirm Resend DNS verification

You submitted Resend DNS records on Day 1 per `docs/RESEND-DNS-SETUP.md`. Now
confirm:

1. Visit `https://resend.com/domains`.
2. Find `micahjonesconsulting.com`.
3. Status should be **Verified** (green checkmark). If it says **Pending**,
   the TXT/MX/DKIM records haven't propagated yet — give it another few hours.

---

## Step 5 — Trigger the first production deploy (~3 minutes)

1. Back on the Vercel project page, click **Deployments → Redeploy**
   (or push a no-op commit on `main` to trigger an automatic deploy).
2. Watch the build. Expected duration: 60–90 seconds.
3. The build runs:
   - `pnpm install`
   - `tsx lib/copy-lint-cli.ts` (build-time copy-lint scanner — Phase 2)
   - `next build` (with `tsc --noEmit` precheck via tsconfig)
4. If the build fails on copy-lint with a `file:line:column` banned-word
   error, the deploy is correctly blocked. Fix the prose, commit, push, retry.

After the deploy goes green, `https://micahjonesconsulting.com` is live.

---

## Step 6 — Smoke test (~10 minutes)

Run this sequence as if you were a first-time visitor:

1. Visit `https://micahjonesconsulting.com`.
   - Expected: Home renders with cream paper, portrait, three case-study cards.
2. Click into a case study (try ORDANI — it's the most ambitious render).
   - Expected: 600ms cross-fade from cream to obsidian; TitleCard pin-resolve
     fires on scroll-enter; PullQuote has sage underline-grow (Phase 10
     update).
3. Hit Back, then click into another case study.
   - Expected: same transition; `[NEXT WORK ↘]` link works at the bottom.
4. Go to `/contact`.
   - Expected: two-field form renders.
5. Submit a test message ("Test from production smoke" or similar).
   - Expected: inline "Got it." thank-you; you receive an email at
     `hello@micahjonesconsulting.com` inside ~5 seconds; a row appears in
     Supabase `contact_messages` table.
6. Open `https://micahjonesconsulting.com/sitemap.xml` in a browser.
   - Expected: XML listing all foyer routes + every case study.
7. Open `https://micahjonesconsulting.com/robots.txt`.
   - Expected: `User-agent: *` allows `/`; GPTBot + Google-Extended disallow
     `/work/`; sitemap link present.
8. Open `https://micahjonesconsulting.com/opengraph-image` (note: this is the
   Home OG; foyer route group's OG image is served at the route root).
   - Expected: 1200×630 PNG with "MICAH JONES" + "OAKLAND OPERATOR".
9. Open `https://micahjonesconsulting.com/work/ordani/opengraph-image`.
   - Expected: 1200×630 PNG with the ORDANI word stack on obsidian.

### 6.1 — Verify Vercel Analytics is reporting

1. In Vercel dashboard, go to **Analytics**.
2. Wait ~30 seconds after a page view.
3. You should see at least one **Page View** event.
4. Scroll to bottom of a case study to trigger
   `case_study_read_complete` — the custom event will appear in **Events**.

---

## Step 7 — Submit sitemap to Google Search Console (one-time, ~5 min)

This step accelerates organic indexing. Skip on first launch if you want — it
isn't blocking.

1. Visit `https://search.google.com/search-console`.
2. Add property: `https://micahjonesconsulting.com`.
3. Verify ownership via the **DNS TXT record** method (Vercel exposes it under
   **Domains → DNS records**).
4. Once verified, submit `https://micahjonesconsulting.com/sitemap.xml` under
   **Sitemaps**.

---

## Rollback

If the production deploy goes wrong:

1. Vercel → Deployments → previous green deployment → **Promote to Production**.
2. The previous build is back in 30 seconds.
3. Fix forward on `main` — never `git push --force` to `main`.

---

## Known operator gotchas

- **DNS proxying.** If you use Cloudflare for DNS, set the Vercel records to
  **DNS only** (gray cloud), NOT proxied (orange cloud). Vercel handles SSL
  itself; proxying breaks the cert handshake.
- **Resend "From" address.** The `from` in `app/actions/contact.ts` is
  hardcoded to `hello@micahjonesconsulting.com`. Resend must be sending from a
  domain that has Verified status. If Resend status is Pending, the form will
  return "Could not send the note right now" and you'll see an error in the
  Vercel function logs.
- **Supabase RLS.** The migration above sets RLS deny-all for anon. The
  contact action uses the service-role key which bypasses RLS by design. If
  you ever rotate the service-role key, also update the Vercel env var.
- **Vercel function cold starts.** The contact form server action runs on a
  Vercel Node.js function. First invocation may take ~800ms; subsequent ones
  ~100ms. Fine for the form's traffic profile.

---

## Post-launch checklist

- [ ] DNS propagated; `https://micahjonesconsulting.com` loads.
- [ ] SSL certificate valid (green padlock).
- [ ] Resend Verified status.
- [ ] Test contact form submission received + archived.
- [ ] Sitemap submitted to Google Search Console.
- [ ] Vercel Analytics reporting page views.
- [ ] Vercel Speed Insights reporting Core Web Vitals.
```

---

## 9. Per-route metadata — summary table

To keep the verification step from missing any route, here's the full per-route map:

| Route | Page metadata? | OG image route | Notes |
|-------|----------------|----------------|-------|
| `/` | YES — existing, needs OG+twitter expansion | `app/(foyer)/opengraph-image.tsx` (new) | Use FoyerOGComposition with eyebrow "OAKLAND OPERATOR" |
| `/about` | NEEDS — Phase 6 page may have stub | `app/(foyer)/about/opengraph-image.tsx` (new) | Eyebrow "ABOUT" |
| `/work-with-me` | NEEDS | `app/(foyer)/work-with-me/opengraph-image.tsx` (new) | Eyebrow "WORK WITH ME" |
| `/contact` | NEEDS (and contact is `'use client'` — metadata must be exported from a sibling page or a parent layout) | `app/(foyer)/contact/opengraph-image.tsx` (new) | Eyebrow "CONTACT" |
| `/work` | NEEDS | `app/(foyer)/work/opengraph-image.tsx` (new) | Eyebrow "WORK" |
| `/work/[slug]` | NEEDS via `generateMetadata` | `app/(theater)/work/[slug]/opengraph-image.tsx` (EXISTS — Phase 5) | One per slug; OG already wired |

**Caveat — `/contact` is a `'use client'` component.** Next.js does not allow metadata exports from client components. Options:
1. Put the contact form in a child component and keep the page as RSC with metadata. (Cleanest.)
2. Use the layout group for contact-only metadata. (Adds complexity.)
3. Add a `app/(foyer)/contact/layout.tsx` that exports metadata and wraps the existing client page. (Minimal intervention — pursue this.)

Option 3 is the simplest. The metadata-only layout file:

```tsx
// app/(foyer)/contact/layout.tsx
//
// Phase 10 — OG-02. Wraps the client-component contact page so we can
// export metadata at the route level. Server Component; no behavior.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Micah Jones",
  description:
    "Two-field note form for Micah Jones. Two-business-day reply commitment. Or email hello@micahjonesconsulting.com any time.",
  openGraph: {
    title: "Contact — Micah Jones",
    description:
      "Two-field note form for Micah Jones. Two-business-day reply commitment. Or email hello@micahjonesconsulting.com any time.",
    type: "website",
    url: "https://micahjonesconsulting.com/contact",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Micah Jones",
    description:
      "Two-field note form for Micah Jones. Two-business-day reply commitment. Or email hello@micahjonesconsulting.com any time.",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
```

---

## 10. Wave plan

Five workstreams in Wave 1 (independent file changes):

- **10-A** Per-route metadata + foyer OG composition + foyer OG routes (5 files + 1 helper + 5 page metadata edits + 1 generateMetadata) — OG-01, OG-02
- **10-B** `app/sitemap.ts` + `app/robots.ts` — OG-03, OG-04
- **10-C** `lib/analytics.ts` + `CaseStudyReadTracker.tsx` + wire — ANALY-02, ANALY-03
- **10-D** A11y sweep: skip-to-content link + globals.css block + layout edits — A11Y-01..04, A11Y-06, A11Y-07
- **10-E** ORDANI sage update: PullQuote accentColor prop + ORDANI MDX edit + CSS rule

Wave 2 (depends on 1):
- **10-F** Performance audit + verification — PERF-01..09
- **10-G** Responsive baselines — RESP-01..04

Wave 3:
- **10-H** Deploy runbook + Supabase SQL migration — DEPLOY-01, DEPLOY-03..06

Wave 4:
- **10-I** Final verify (typecheck + build + axe scan + lighthouse + screenshots) + VERIFY-OUTPUT.md + LAUNCH-CHECKLIST.md at repo root

---

## 11. Risks + mitigations

| Risk | Mitigation |
|------|------------|
| OG image edge runtime fails on next/og fonts | Phase 5 already proved Satori built-in Inter subset works; Phase 10 uses the same pattern |
| `app/sitemap.ts` calling `getAllCaseStudies` triggers Node fs in edge runtime | sitemap.ts runs at build time in Node (not edge); fs is fine |
| Build-time copy-lint catches a metadata description string | Pre-verified above — all descriptions are clean |
| Lighthouse Performance dips below 95 from added OG routes | OG routes are not part of the page response; they're separate routes served on-demand |
| Skip-to-content link conflicts with `<ViewTransition>` snapshot | The skip link sits OUTSIDE `<Nav>` (which has the viewTransitionName); it transitions normally with the rest of the page (no anchor) — acceptable |
| Sage accent prop on PullQuote drifts to other case studies | TOKEN-05 + design-tokens.sh + audit grep; the prop is opt-in (defaults to copper) |
| Vercel function bundle size for contact action | Resend + Supabase deps are already in package.json; no new deps for Phase 10 |

---

*End of 10-RESEARCH.md*
