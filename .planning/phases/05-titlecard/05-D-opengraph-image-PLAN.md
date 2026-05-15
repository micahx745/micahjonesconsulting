# Plan 05-D: Vercel OG Image Composition

**Phase:** 05 TitleCard Signature Motion
**Requirements:** MOT-07 (case-study routes export `opengraph-image.tsx` composing TitleCard via Vercel OG)
**Depends on:** 05-B (TitleCardComposition serves as visual reference, though OG inlines a Satori-compatible twin)
**Status:** Ready
**Estimated LOC:** 1 new TSX file (~90 lines)

---

## Goal

Ship `app/(theater)/work/[slug]/opengraph-image.tsx` — the Next.js App Router file convention that auto-generates an Open Graph 1200×630 PNG for `/work/[slug]`. Uses `next/og`'s `ImageResponse` API (Vercel OG, Satori-backed). Renders the **resolved** static composition of the TitleCard (vertical word stack + caption) on theater ground.

Phase 5 ships ONE working OG route, parameterized by `[slug]`. For now we hard-code the words/caption for `"test-slug"` and a fallback for unknown slugs. Phase 7 (MDX infrastructure) will read frontmatter to drive the words/caption per slug; Phase 10 will fan out to every real case study and add explicit font fetching.

This satisfies MOT-07 and unblocks Phase 10's OG image generation requirement (OG-01).

---

## Architectural Constraint (Satori vs Tailwind)

`next/og` uses [Satori](https://github.com/vercel/satori) to rasterize React JSX to a PNG on the Edge runtime. Satori supports:

- **Inline styles only** — no CSS variables, no class names, no `@theme` block.
- **A subset of CSS** — flex, partial grid, font-family, color, font-size, font-weight, basic transforms.
- **No JavaScript** — no GSAP, no refs, no hooks.

Therefore the OG route **cannot import `TitleCardComposition.tsx`** directly: that component uses Tailwind class names (`.title-card-stack`) and CSS variables (`var(--font-display)`) that Satori does not resolve.

We **inline a Satori-compatible twin** of the composition inside this file. The visual layout matches `TitleCardComposition.tsx` (vertical word stack + caption + optional hero rectangle) but with inline styles and hard-coded hex colors. The architectural contract: `TitleCardComposition.tsx` remains the source of truth for the LIVE composition; the OG route is its static, server-rendered counterpart with the same visual layout.

Hex literals are acceptable HERE because Satori cannot resolve CSS variables. This is the documented exception to `design-tokens.sh` (which warns on raw hex outside the palette) — the hex values used (`#0D0D0F`, `#EAE6DD`, `#9C988F`) are all in the @theme block, so they're not off-palette.

---

## File Operations

### NEW: `app/(theater)/work/[slug]/opengraph-image.tsx`

```tsx
// app/(theater)/work/[slug]/opengraph-image.tsx
//
// Phase 5 — MOT-07. Vercel OG image generation for case-study routes.
//
// Renders a 1200×630 PNG at /work/[slug]/opengraph-image. Per Next.js App
// Router file conventions, this file co-located with page.tsx auto-becomes
// the OG image source — the route exports a default async function
// returning a next/og ImageResponse.
//
// Architectural constraint (see 05-RESEARCH §2.9):
//   next/og uses Satori to rasterize React JSX server-side. Satori supports
//   only inline styles (NO CSS variables, NO class names, NO @theme). It
//   does NOT execute JavaScript (NO GSAP, NO refs, NO hooks).
//
//   We therefore CANNOT import TitleCardComposition directly here — that
//   component depends on Tailwind utility classes that resolve via the
//   @theme block in app/globals.css. Instead, this file inlines a Satori-
//   compatible twin of the composition, rendering the RESOLVED (final)
//   state (since the OG is a static frame, not an animated reveal).
//
// Phase 5 ships ONE working OG route, parameterized by [slug], that uses a
// stub words/caption when slug is unknown. Phase 7 (MDX infra) and Phase 8
// (case studies) will read frontmatter to drive the words/caption per slug.
// Phase 10 fans out via export configuration if needed.
//
// Source: REQUIREMENTS.md MOT-07; Next.js App Router opengraph-image docs;
//         next/og ImageResponse API.
import { ImageResponse } from "next/og";

// Edge runtime is the default for opengraph-image. Set explicitly for clarity.
export const runtime = "edge";

// Static dimensions — Open Graph spec.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Stub registry for Phase 5. Phase 7 reads from content/work/[slug].mdx
// frontmatter; Phase 8 fills in real case studies.
const STUB_DATA: Record<string, { words: string[]; caption: string }> = {
  "test-slug": {
    words: ["ORDANI", "INTAKE.", "SECURE.", "SHIPPED."],
    caption: "A HIPAA-compliant CRM for birth workers.",
  },
};

const FALLBACK = {
  words: ["MICAH", "JONES", "CONSULTING"],
  caption: "Oakland operator. Builds the systems other people promise.",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = STUB_DATA[slug] ?? FALLBACK;

  // Theater ground + bone ink. Hex literals are acceptable HERE because
  // Satori cannot resolve CSS variables (this is the documented exception
  // to the design-tokens.sh rule — see CLAUDE.md "design-tokens.sh warns
  // on any other hex literal" and the OG architectural constraint).
  const GROUND = "#0D0D0F";
  const INK = "#EAE6DD";
  const INK_SOFT = "#9C988F";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: GROUND,
          color: INK,
          padding: "80px 96px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Vertical word stack — resolved-state caption sits below */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          {data.words.map((word, i) => (
            <span key={`${word}-${i}`} style={{ display: "block" }}>
              {word}
            </span>
          ))}
        </div>

        {/* Caption */}
        <p
          style={{
            margin: 0,
            fontSize: 32,
            fontStyle: "italic",
            color: INK_SOFT,
            maxWidth: "80%",
            lineHeight: 1.3,
          }}
        >
          {data.caption}
        </p>
      </div>
    ),
    {
      ...size,
      // No `fonts: [...]` for Phase 5 — Satori falls back to its built-in
      // Inter subset, which renders bold 96px correctly. Phase 10 will
      // upgrade to an explicit font fetch if visual QA flags a mismatch.
    },
  );
}
```

---

## Acceptance

- `pnpm typecheck` clean
- `pnpm build` clean (the OG route compiles for the Edge runtime)
- File `app/(theater)/work/[slug]/opengraph-image.tsx` exists
- Visiting `http://localhost:3000/work/test-slug/opengraph-image` in `pnpm dev` returns:
  - HTTP 200
  - `Content-Type: image/png`
  - A 1200×630 PNG rendering the words "ORDANI / INTAKE. / SECURE. / SHIPPED." on theater ground (`#0D0D0F`)
- Visiting `http://localhost:3000/work/some-unknown-slug/opengraph-image` returns the FALLBACK words ("MICAH / JONES / CONSULTING")
- The OG route does NOT import GSAP (verify by grep — quarantine remains intact)

---

## Notes

### On Next.js OG file conventions

Per the [Next.js opengraph-image docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image), placing `opengraph-image.tsx` next to a `page.tsx` automatically generates the OG image at the route `[route]/opengraph-image`. Next.js handles caching, content-type, and edge runtime injection. The page's `<head>` is automatically populated with `og:image` pointing to the generated URL.

This means: just dropping the file is enough — no manual metadata wiring required for Phase 5's purpose. Phase 10 may add explicit `openGraph` metadata exports to refine title/description if needed.

### On the Edge runtime

`export const runtime = "edge"` is the documented runtime for OG image routes. It's lighter and faster than Node runtime for the pure-CPU PNG rasterization Satori performs. No environment access needed.

### On font fetching (deferred)

Satori uses an internal Inter subset by default. For Phase 5, this is acceptable — bold 96px renders correctly. Phase 10 may upgrade to explicit font fetch:

```ts
const fontData = await fetch(new URL("/fonts/Inter-Bold.woff", import.meta.url)).then((r) =>
  r.arrayBuffer(),
);
return new ImageResponse(jsx, {
  ...size,
  fonts: [{ name: "Inter", data: fontData, weight: 700, style: "normal" }],
});
```

This requires putting the font in `/public/fonts/` or fetching from Google Fonts. Defer to Phase 10 visual QA.

### On the stub registry

The hard-coded `STUB_DATA` is a Phase 5 contract. Phase 7 replaces this with:

```ts
const meta = await getCaseStudyMeta(slug); // reads content/work/[slug].mdx frontmatter
const data = { words: meta.titleCardWords, caption: meta.dek };
```

This is documented inline. Phase 5's stub is acceptable scaffolding because the architectural contract (OG route exists at this path, returns 1200×630 PNG) is what MOT-07 actually requires.

### On dynamic params

Next.js 16 made `params` a Promise in App Router. `await params` is the canonical access pattern, matching `app/(theater)/work/[slug]/page.tsx` from Phase 4.

### Verification flow

After 05-D is executed, the verify step in 05-E will:

1. `pnpm build` — should succeed without errors related to next/og
2. `pnpm dev` started in background
3. `curl -I http://localhost:3000/work/test-slug/opengraph-image` should return:
   - `HTTP/1.1 200`
   - `Content-Type: image/png`
4. Save the PNG and visually inspect (Chrome DevTools MCP can capture a screenshot of the route)
