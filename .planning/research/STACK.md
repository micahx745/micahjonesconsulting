# Stack Research — micahjonesconsulting.com (House Lights)

**Domain:** Premium agency-tier solo-operator portfolio + MDX case-study marketing site
**Researched:** 2026-05-14
**Overall confidence:** HIGH (every recommendation verified against current docs or npm registry within the last 24 hours)

---

## Executive Stack One-Liner

**Next.js 16 App Router + React 19 + TypeScript strict + Tailwind v4 (CSS-first `@theme`) + MDX via `@next/mdx` + GSAP 3.13 (free) inside one component + Lenis 1.3 via `lenis/react` + Resend + `@vercel/analytics` — no headless CMS, no WebGL, no Framer Motion for the signature, no third-party analytics.**

Every package below was chosen because it ships the "House Lights" gestures (foyer↔theater route transition, TitleCard pin-and-resolve, Lenis-smooth foyer reading rhythm) with the minimum dependency surface, and because it composes with the harness's enforcement (font-license.sh, motion-discipline.sh, copy-lint.sh) without fighting it.

---

## Recommended Stack

### Core Technologies

| Technology | Version (May 2026) | Purpose | Why (over alternatives) | Confidence |
|------------|-------------------|---------|-------------------------|------------|
| **next** | `16.2.6` | App Router, Server Actions, Image, Font, MDX pipeline, View Transitions integration | Latest stable. Has the `experimental.viewTransition` flag that wires React's `<ViewTransition>` into route navigations — this is the **only** way to get the foyer↔theater dim without hand-rolling a `view-transition-name` swap on every link. (See "Version note" below for why we go past the PROJECT.md's "Next.js 15" line.) | HIGH (official docs verified 2026-05-13) |
| **react** | `19.2.6` | UI runtime + the `ViewTransition` component (`import { ViewTransition } from 'react'`) | The `<ViewTransition>` component is a React API, not a Next.js API. React 19 is required by Next 16. App Router uses React canary releases — `ViewTransition` ships in those canaries automatically; you do not install `react@canary` yourself. | HIGH (Next.js docs verified) |
| **react-dom** | `19.2.6` | DOM renderer | Locked to React major. | HIGH |
| **typescript** | `6.0.3` | Type safety, strict mode per project constraint | Strict mode required by PROJECT.md. TS 6 is current and compatible with Next 16. | HIGH |
| **tailwindcss** | `4.3.0` | CSS-first design tokens via inline `@theme` block in `app/globals.css` | The CSS-first `@theme` block is the **only** way to ship the blueprint §4b color tokens (`--color-foyer-paper`, `--color-accent-copper`, etc.) without dragging a `tailwind.config.ts` file into the project. v4 also has the Lightning CSS engine — sub-10ms recompile, which matters when the harness's perf-budget.sh runs on save. **There is no `tailwind.config.ts` in v4 unless you want one.** | HIGH (Tailwind v4 stable since Jan 2025, v4.1 since April 2025) |
| **@tailwindcss/postcss** | `4.3.0` | PostCSS plugin shim — required to load Tailwind v4 in Next.js's PostCSS pipeline | **In Tailwind v4 the PostCSS plugin moved to its own package.** Without this, `postcss.config.mjs` errors with "It looks like you're trying to use tailwindcss directly as a PostCSS plugin." Locked to the same minor as `tailwindcss`. | HIGH (verified against Tailwind v4 install docs) |
| **postcss** | `8.5.x` | Required peer of `@tailwindcss/postcss` | Standard. | HIGH |
| **@next/mdx** | `16.2.6` | MDX as a first-class page format under App Router for `content/work/*.mdx` | Locked to Next's major. Built-in support for `mdx-components.tsx` (required file at repo root in App Router — won't render without it). Avoids reinventing the bundler-side MDX pipeline that `next-mdx-remote`-style libraries hand-roll. | HIGH (Next.js docs verified) |
| **@mdx-js/loader** | `3.x` | Webpack/Turbopack loader the `@next/mdx` plugin uses internally | Peer dep of `@next/mdx`. | HIGH |
| **@mdx-js/react** | `3.x` | React runtime for MDX components | Peer dep. Required for `useMDXComponents`. | HIGH |
| **gray-matter** | `4.0.3` | Parse YAML frontmatter from `content/work/*.mdx` at build time | `@next/mdx` does not parse frontmatter natively. The blueprint §9 expects `title / dek / role / tools / year / status` frontmatter to be available as page metadata — `gray-matter` is the de-facto Node.js parser for this. Pairs with the harness's `mdx-frontmatter.sh` hook. | HIGH |
| **remark-gfm** | `4.4.3` | GitHub-Flavored Markdown extensions (tables, strikethrough, autolinks) in MDX | Tiny, well-maintained, the standard `remark` plugin pair with `@next/mdx`. Pull-quote tables in the ORDANI case study need GFM. | HIGH |

### Motion & Scroll

| Library | Version | Purpose | Why (over alternatives) | Confidence |
|---------|---------|---------|-------------------------|------------|
| **gsap** | `3.15.0` | The **single signature interaction** — `<TitleCard />` pin-and-resolve via `ScrollTrigger`. **Nothing else uses GSAP.** | GSAP 3.13+ is **fully free including ScrollTrigger, SplitText, MorphSVG** under the no-charge Standard License (Webflow acquired GreenSock and dropped the Club paywall). For a pinned-vertical-word-stack-resolves-to-caption move, GSAP's `ScrollTrigger.create({ pin: true, scrub: 0.5 })` is one timeline; doing the same with Framer Motion's `useScroll` + `useTransform` is three hooks and a fight with React's render cycle. The blueprint §4f and §11 both name GSAP for this exact move. | HIGH (GSAP blog + npm verified) |
| **@gsap/react** | `2.1.2` | Provides `useGSAP()` hook — automatic `gsap.context().revert()` on unmount, kills ScrollTrigger instances cleanly in StrictMode | Without `useGSAP`, `useEffect` cleanup with React 19's double-mount in dev causes "Plugin already registered" warnings and ghost ScrollTrigger instances that fire after route navigation. `useGSAP` is the official React adapter and is on the GSAP docs as the recommended path for Next.js App Router. | HIGH |
| **lenis** | `1.3.23` | Smooth scroll wrapper at the layout root (foyer routes; theater routes opt out — see Integration Notes) | Lenis is the post-Locomotive standard for warm smoothing without scroll-jacking. The blueprint §4d names Lenis with damping ~0.08. v1.3.x adds React strict-mode safety and a stable `lenis/react` subpath. **Locomotive Scroll is no longer maintained; do not use it.** | HIGH (npm + GitHub verified) |

**No Framer Motion at v1.** The PROJECT.md context line mentions "Framer Motion for component motion" but the blueprint §13 anti-pattern list and §4f ("one signature motion move") explicitly forbid pile-on animation. Component-level enter/exit (foyer page sections fading in, selected-work cards lifting 2px on hover) is **CSS-only** via Tailwind's `transition-*` utilities + `@media (hover: hover)` queries. This costs zero kB and avoids dragging Framer Motion's 30 kB into the foyer bundle for behaviors the user can't see anyway. If a future need for orchestrated layout animation arises (e.g., a stagger entrance on the Work index), revisit — but ship v1 without it. **Quality gate item satisfied.**

### Email / Form / Data

| Library | Version | Purpose | Why | Confidence |
|---------|---------|---------|-----|------------|
| **resend** | `6.12.3` | Transactional email — fires from the Contact page Server Action and sends Micah a notification + the visitor a "received, replying inside two business days" auto-reply | Resend's `Resend(apiKey).emails.send()` API is one function call inside a `'use server'` action; their official Next.js App Router example is the canonical pattern. Alternative is SendGrid/Postmark — both are heavier APIs with worse DX. | HIGH |
| **react-email** | `4.x` (optional) | If Micah wants the auto-reply to look brand-correct (foyer cream + copper underline) rather than plain-text | Resend's recommended template engine. **Optional for v1** — a plain-text reply is honest and matches the "real reply" voice rule in PROJECT.md. Add in v2 if A/B testing shows reply rate matters. | MEDIUM |
| **zod** | `4.4.3` | Validate the two-field contact form (`name`, `what_youre_working_on`) inside the Server Action before passing to Resend + Supabase | The contact form is the only validated input on the site. Zod is the standard for Server Action validation in Next 16 — pairs with `useActionState` for inline error rendering without a form library. **Do not install React Hook Form, Formik, or Conform** — two fields don't warrant a form library. | HIGH |
| **@supabase/supabase-js** | `2.105.4` | Contact-form archive insert **only** — server-side `supabase.from('contact_submissions').insert(...)` inside the same Server Action that calls Resend | The blueprint §11 and PROJECT.md both lock Supabase to a **single write** from a server context. **No client-side Supabase, no auth, no realtime, no Storage.** Service-role key sits in `.env.local` and never crosses to the client. If this constraint slips, the perf budget and the security model both regress. | HIGH |

### Hosting & Observability

| Tool | Version | Purpose | Why | Confidence |
|------|---------|---------|-----|------------|
| **Vercel** | (platform) | Hosting, edge functions (Server Actions), Image optimization CDN, preview deploys per PR | Built-in support for everything in the stack above — Next 16, Tailwind v4, MDX, view transitions, `next/font/google` preconnect, `next/image` AVIF/WebP transcoding. The harness's perf-budget.sh expects Vercel Speed Insights signals. **No Netlify, no Cloudflare Pages for v1** — they each have Next.js compatibility gaps that aren't worth debugging on a 14-day build. | HIGH |
| **@vercel/analytics** | `2.0.1` | Privacy-friendly page-view + custom event analytics. One custom event: `case_study_read_complete` (fires when scroll depth ≥ 90% on a `/work/*` route) | Free tier covers the traffic level expected; **no cookies, no PII, no consent banner needed** — that alone is the reason it wins over GA4 / Mixpanel / Segment / PostHog for the foyer hospitality framing. The PROJECT.md "Out of Scope" list explicitly bans the alternatives. | HIGH |
| **@vercel/speed-insights** | `1.x` | Real-user monitoring for LCP / INP / CLS — required to defend the ≤1.8s LCP / ≤200ms INP / ≤0.05 CLS constraints from PROJECT.md | Same package family as Analytics, same one-line `<SpeedInsights />` install in `app/layout.tsx`. Pairs with the harness's perf-budget.sh hook. | HIGH |

### Typography (free path — selected for launch)

| Font | Source | Loader | Use | Confidence |
|------|--------|--------|-----|------------|
| **Inter (variable)** | Google Fonts | `next/font/google` → `Inter({ subsets: ['latin'], variable: '--font-inter' })` | Body text in both foyer and theater, foyer caption metadata, contact form inputs | HIGH |
| **Inter Display (Inter Tight at heavy weights)** | Google Fonts | `next/font/google` → `Inter({ subsets: ['latin'], weight: ['700','800','900'], variable: '--font-inter-display' })` | TitleCard headlines (96px Halbfett ≈ weight 700–800), foyer hero copy, case-study chapter cards | HIGH |
| **Source Serif 4 (variable)** | Google Fonts (Adobe foundry) | `next/font/google` → `Source_Serif_4({ subsets: ['latin'], axes: ['opsz'], variable: '--font-source-serif' })` | Deks (Tiempos role), pull quotes in case studies, About long-form lede | HIGH |

**The `axes: ['opsz']` flag on Source Serif 4 is the integration gotcha most people miss** — it activates the optical-size axis so the same family can render confidently at 14px (sidenote) and 32px (pull quote). Without `axes`, you get only the weight axis and the pull quotes look thin.

**Inter Display note:** Google Fonts has consolidated "Inter Display" into Inter's `--font-feature-settings` and Inter Tight. The cleanest path is to import Inter twice with different `variable` names and use Inter at heavy weights (700/800/900) for display — Inter at 800+ is the Söhne Halbfett analogue per Typewolf's 2025 free-pairing index, scored ~90% similarity.

**Banned at the harness layer** (font-license.sh blocks these imports until license keys land):
- Klim foundry self-hosts: Söhne, Tiempos, National 2, Calibre, Domaine
- Berkeley Mono, Geist Mono, JetBrains Mono, IBM Plex Mono, Söhne Mono — **any monospace face** (motion-discipline.sh + font-license.sh both fire)
- PP Editorial New, PP Locomotive New (Pangram Pangram paid faces)
- Founders Grotesk, Neue Haas Grotesk Display

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| **eslint-config-next** (16.x) | Lints React + Next conventions including `react-hooks/exhaustive-deps` which catches `useGSAP` dependency mistakes | Comes with `create-next-app`. |
| **prettier** (3.x) + **prettier-plugin-tailwindcss** (0.6+) | Sorts Tailwind utility classes deterministically so the visual-qa agent's screenshots aren't churned by class-order diffs | Must be 0.6+ for Tailwind v4 support — older versions silently no-op on v4 syntax. |
| **sharp** (0.34.5) | `next/image` runtime image transformer — installed automatically by `next build` for AVIF/WebP transcoding | Confirms locally that the harness's `image-budget.sh` 500KB ceiling is reachable. Required as a regular `dependencies` entry, not `devDependencies`, since Vercel needs it at build time. |
| **husky** + **lint-staged** | Run the harness hooks at the write boundary | Already wired by the premium-web-harness; no additional config needed. |
| **chrome-devtools-mcp** (optional) | Visual-qa agent's screenshot driver — 390/768/1440 baselines per PROJECT.md | Already registered by the harness. |

---

## Installation (single command bundles)

```bash
# Core framework + React + TS + Tailwind v4
npm install next@16.2.6 react@19.2.6 react-dom@19.2.6
npm install -D typescript@^6 @types/react@^19 @types/node@^22

# Tailwind v4 (note the separate @tailwindcss/postcss package)
npm install tailwindcss@^4 @tailwindcss/postcss@^4 postcss@^8

# MDX pipeline
npm install @next/mdx@^16 @mdx-js/loader@^3 @mdx-js/react@^3
npm install gray-matter@^4 remark-gfm@^4

# Motion (signature only)
npm install gsap@^3.15 @gsap/react@^2.1 lenis@^1.3

# Form + email + archive
npm install resend@^6 zod@^4 @supabase/supabase-js@^2

# Observability
npm install @vercel/analytics@^2 @vercel/speed-insights@^1

# Dev tooling
npm install -D prettier@^3 prettier-plugin-tailwindcss@^0.6 eslint-config-next@^16
```

---

## Integration Notes (the gotchas that will eat half a day each)

### 1. Next.js 16 `experimental.viewTransition` flag — the foyer↔theater dim

**File:** `next.config.ts`

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
}

export default nextConfig
```

**Gotcha:** `<ViewTransition>` is imported from **`react`**, not from `next` and not from `react-dom`. The flag in `next.config.ts` does not import the component — it wires Next's router so that route navigations are treated as React `useTransition` updates, which is what activates `<ViewTransition>`. You then use:

```tsx
import { ViewTransition } from 'react'

// in app/layout.tsx wrapping children:
<ViewTransition>{children}</ViewTransition>
```

For the **foyer↔theater dim specifically**, tag foyer links into case studies with `transitionTypes={['enter-theater']}` on `<Link>` and theater "back to foyer" links with `transitionTypes={['exit-theater']}`, then map both to CSS keyframes in `app/globals.css` per the Next.js view-transitions guide pattern. This gives the 600ms ease-in-out cream-recedes / theater-rises gesture from blueprint §4d.

**Reduced motion:** wrap the whole transition rule in `@media (prefers-reduced-motion: no-preference)` so the harness's a11y-baseline.sh doesn't flag it.

### 2. Tailwind v4 — CSS-first `@theme` block (no `tailwind.config.ts`)

**File:** `app/globals.css`

```css
@import 'tailwindcss';

@theme {
  /* Foyer */
  --color-foyer-paper: #F5EFE4;
  --color-foyer-ink: #1A1816;
  --color-foyer-ink-soft: #3A3631;

  /* Theater */
  --color-theater-ground: #0D0D0F;
  --color-theater-surface: #16161A;
  --color-theater-ink: #EAE6DD;
  --color-theater-ink-soft: #9C988F;

  /* Accent — single across both modes */
  --color-accent-copper: #C8542B;
  --color-accent-copper-deep: #8E3A1E;

  /* ORDANI-only — restricted to /work/ordani route */
  --color-ordani-sage: #5E7158;

  /* Rules */
  --color-rule-foyer: #D9D2C4;
  --color-rule-theater: #2A2A30;

  /* Type variables wired by next/font/google */
  --font-display: var(--font-inter-display);
  --font-sans: var(--font-inter);
  --font-serif: var(--font-source-serif);
}
```

**Critical distinction — `@theme` vs `@theme inline`:**
- `@theme { ... }` writes the values into global CSS variables (`:root { --color-foyer-paper: #F5EFE4 }`) AND generates utility classes (`bg-foyer-paper`, `text-foyer-ink`). Use this for the token block above.
- `@theme inline { ... }` does **not** create global variables — you must provide them yourself. Use this only when wiring an external variable (e.g., a `next/font` CSS variable from a different scope).

**There is no `tailwind.config.ts`.** Anyone reaching for it in 2026 is using v3 muscle memory.

**`postcss.config.mjs`** at repo root:
```js
const config = { plugins: { '@tailwindcss/postcss': {} } }
export default config
```

### 3. Lenis 1.3 — `lenis/react` with `ReactLenis root`, NOT manual RAF

**File:** `app/layout.tsx` (or a `<SmoothScroll />` client wrapper)

```tsx
'use client'
import { ReactLenis } from 'lenis/react'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,        // blueprint §4d "damping ~0.08" — light, not buttery
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,  // see gotcha below
      }}
    >
      {children}
    </ReactLenis>
  )
}
```

**Gotchas:**

- **`smoothTouch` was removed in Lenis 1.0.** The replacement is `syncTouch` — but for the House Lights aesthetic, **leave it `false`** (the default). The blueprint calls for "light, not buttery" — forcing wheel-event smoothing onto touch devices on top of iOS's native momentum scroll causes a jittery double-smooth on iPhone Safari. Native touch scroll already feels good; only enable `syncTouch: true` if you specifically want a uniform feel across input devices, which Micah's foyer hospitality framing does not require.
- **The `root` prop is mandatory** for App Router — without it, `useLenis()` outside the immediate provider tree (e.g., inside the GSAP TitleCard component) returns `undefined`.
- **`'use client'` directive is mandatory** — `ReactLenis` uses `window` at mount.
- **Disable on theater routes**: case studies use anchor jumps to chapter cards; Lenis lerp interferes with that. Wrap the foyer route group with `<ReactLenis>`, leave the theater route group naked. Or wire `useLenis().stop()` when `pathname.startsWith('/work/')`.
- **The deprecated package `@studio-freight/react-lenis` is retired** — Studio Freight rebranded as Darkroom Engineering and consolidated everything into the single `lenis` package with subpaths. Anyone with a 2023 tutorial open will install the wrong package; do not.

### 4. GSAP 3.15 + `useGSAP` for the TitleCard (the ONLY GSAP usage)

**File:** `components/TitleCard.tsx`

```tsx
'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)  // module-level registration

export function TitleCard({ words, caption }: { words: string[]; caption: string }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          start: 'top top',
          end: '+=600',  // ~600ms hold per blueprint §4f
          scrub: 0.5,
        },
      })
      // ... pin + cross-fade timeline
    },
    { scope: root }
  )

  return <div ref={root}>{/* word stack + caption */}</div>
}
```

**Gotchas:**

- **`gsap.registerPlugin(ScrollTrigger)` must be at module level** (above the component function), not inside `useEffect`. Otherwise React 19's StrictMode double-mount triggers "Plugin already registered" warnings on every navigation.
- **`useGSAP` automatically reverts** all GSAP instances + ScrollTriggers on unmount via `gsap.context().revert()`. Do not write manual cleanup. Manual cleanup with `ScrollTrigger.getAll().forEach(t => t.kill())` will fight `useGSAP`'s revert and leave dangling listeners.
- **The `scope` option (`{ scope: root }`)** scopes selectors to the component's DOM subtree — without it, a second TitleCard on a different route can target the first one's DOM nodes during hydration.
- **Do not enable Lenis on the same route as a pinned ScrollTrigger.** ScrollTrigger reads `scroll-position` from the document; Lenis intercepts and translates. The fix is either (a) call `lenis.on('scroll', ScrollTrigger.update)` to bridge them, or (b) keep TitleCard's pin behavior on the route's main scroll area and accept that Lenis lerp will compose. The DevDreaming 2026 guide bridges them; the blueprint's "one signature motion" framing makes the bridge worth the 4 lines.

### 5. `@next/mdx` + frontmatter — the `mdx-components.tsx` requirement

**File:** `mdx-components.tsx` at **repo root** (sibling of `app/`)

```tsx
import type { MDXComponents } from 'mdx/types'
import { TitleCard } from '@/components/TitleCard'
import { Still } from '@/components/Still'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children }) => <h1 className="font-display text-display-xl">{children}</h1>,
    h2: ({ children }) => <h2 className="font-display text-display-md mt-16">{children}</h2>,
    blockquote: ({ children }) => (
      <blockquote className="font-serif italic text-2xl border-l-2 border-accent-copper pl-6">
        {children}
      </blockquote>
    ),
    TitleCard,
    Still,
    ...components,
  }
}
```

**Gotchas:**

- **The file MUST be named `mdx-components.tsx`** (or `.ts`/`.js`/`.jsx`) and live at the **project root**, not inside `app/`. App Router silently fails to render MDX without it — you get a runtime error pointing at the wrong line.
- **The exported function MUST be named `useMDXComponents`** and take a single `components` parameter. Auto-import will guess wrong; verify.
- **Frontmatter is not parsed by `@next/mdx`** out of the box. For case studies, read the file with `fs.readFile` inside the route's `page.tsx`, run `gray-matter()` on it, render the body via `<MDXRemote>` or import the MDX as a module — the simpler path is to import the MDX directly and put metadata in a sibling `meta.ts` per case study. The blueprint's frontmatter pattern (`title / dek / role / tools / year / status`) maps cleanly to either; pick one in roadmap Phase 4.
- **The harness's `mdx-frontmatter.sh` hook** verifies required keys at write time — align the schema once and the hook enforces it forever.

### 6. `next/font/google` — three families, three CSS variables

**File:** `app/layout.tsx`

```tsx
import { Inter, Source_Serif_4 } from 'next/font/google'

const interDisplay = Inter({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-inter-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-source-serif',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interDisplay.variable} ${inter.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

**Gotchas:**

- **`axes: ['opsz']` on Source Serif 4** unlocks the optical-size axis. Without it, the pull quotes at 32px look mechanically thin. This is the single most-missed integration detail for Source Serif 4 in 2026.
- **Loading Inter twice** (once for body, once for display weights) is correct — `next/font/google` deduplicates the underlying font file, but the CSS variables differ so you can apply heavy weights only where needed.
- **`display: 'swap'`** ensures FOUT not FOIT — the harness's perf-budget.sh expects fast LCP, and `swap` lets the system fallback render immediately. With Inter's variable font, the swap is barely visible since the metrics are tuned.
- **`subsets: ['latin']`** must be specified or the build fails with `Error: Missing required \`subsets\` for Inter`. Latin is correct for the English-only launch (i18n is out of scope per PROJECT.md).

### 7. Resend + Supabase in one Server Action — atomic-ish contact submission

**File:** `app/actions/contact.ts`

```ts
'use server'
import { z } from 'zod'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const schema = z.object({
  name: z.string().min(1).max(120),
  message: z.string().min(1).max(2000),
})

const resend = new Resend(process.env.RESEND_API_KEY!)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // server-only
)

export async function submitContact(_: unknown, formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { ok: false, errors: parsed.error.flatten() }

  await Promise.all([
    resend.emails.send({
      from: 'Micah <hello@micahjonesconsulting.com>',
      to: 'hello@micahjonesconsulting.com',
      replyTo: undefined,
      subject: `New from ${parsed.data.name}`,
      text: parsed.data.message,
    }),
    supabase.from('contact_submissions').insert({
      name: parsed.data.name,
      message: parsed.data.message,
      received_at: new Date().toISOString(),
    }),
  ])
  return { ok: true }
}
```

**Gotchas:**

- **`SUPABASE_SERVICE_ROLE_KEY` never crosses to the client.** It is only valid in Server Action / Route Handler scope. If you accidentally export it via `NEXT_PUBLIC_*` your contact table is world-writable. Use the service-role key here because the Server Action runs with full RLS bypass — that is the right call when you also enable RLS on the table for any other path.
- **Resend's `from` address requires domain verification** — verify `micahjonesconsulting.com` in the Resend dashboard before the first send or every message bounces. Verification is one DNS TXT record + a 10-minute wait.
- **The Server Action returns a serializable object**, never a `Response`. Pair with `useActionState` on the client component for inline error rendering — no React Hook Form, no `react-hot-toast`. The "real reply" voice rule means error states are full sentences, not toast pills.

### 8. Vercel Analytics + Speed Insights — two components, one block

**File:** `app/layout.tsx` (`<body>` tail)

```tsx
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

// ...
<body>
  {children}
  <Analytics />
  <SpeedInsights />
</body>
```

**Gotchas:**

- **Import path is `@vercel/analytics/next`**, not `@vercel/analytics/react`. The Next-specific subpath defers the script to after hydration and avoids a 30ms LCP hit.
- **Custom events** (`track('case_study_read_complete', { slug })`) need the `track` helper from `@vercel/analytics`. Fires once per session per slug — wire it inside an `IntersectionObserver` on the case-study `<footer>` element at 90% threshold.
- **No consent banner needed** — Vercel Analytics is cookieless by design. The visitor counter shows up in the Vercel dashboard within 30s of the first deploy.

---

## Alternatives Considered

| Recommended | Alternative | When the Alternative Wins | Why Not Here |
|-------------|-------------|---------------------------|--------------|
| Next.js 16.2.6 | Next.js 15.x | Existing project on 15 with frozen dependencies | Greenfield. Next 16 has stable Partial Prerendering, stable Turbopack production builds, the same `experimental.viewTransition` flag, and a clean codemod path. Pinning to 15 wastes 6 months of bug fixes. |
| Tailwind v4 CSS-first `@theme` | Tailwind v3 + `tailwind.config.ts` | A team with deep v3 muscle memory and a complex `extend.colors` graph | The blueprint's token system is 12 colors and three fonts — fits in a 30-line `@theme` block. v3 is now legacy. |
| GSAP 3.15 (free) | Framer Motion 12 / Motion One | UI-heavy app with dozens of layout animations | **Quality gate: GSAP wins for the signature TitleCard.** Framer Motion's `useScroll` + `useTransform` for a pin-and-resolve costs three hooks and competes with React's render cycle on a complex pin. GSAP's ScrollTrigger is one timeline. |
| Lenis 1.3 (`lenis/react`) | Locomotive Scroll | Sites that need full scroll-jacking with horizontal sections | Locomotive Scroll is unmaintained as of 2025. Lenis is the spiritual successor, written by the same team (Darkroom Engineering, formerly Studio Freight). |
| `@next/mdx` + `gray-matter` | `next-mdx-remote` | Content sourced from a CMS or external API at request time | Five MDX files in a repo don't need request-time evaluation. `@next/mdx` compiles them at build time, faster and simpler. |
| Resend | Postmark / SendGrid / AWS SES | Enterprise volume (10k+/day), strict deliverability SLAs | Two-business-day reply at Micah's expected volume (≤10 contact form submissions/week at launch) fits Resend's free tier with zero deliverability concerns. |
| `@supabase/supabase-js` archive only | Postgres direct via `pg` / Neon serverless / Vercel Postgres | A site that needs auth, RLS, or realtime | A single insert per submission doesn't justify Supabase's full surface — but Supabase is in the harness's installed list and the team already has credentials. Lower switching cost wins. |
| Vercel Analytics | Plausible / Fathom / Umami | Self-hosted analytics preference, GDPR strictness beyond cookieless | Vercel Analytics is free at this traffic level, requires zero config beyond two component imports, and `vercel deploy` is already in the path. |
| `next/font/google` (free path) | `next/font/local` (Klim Söhne+Tiempos paid) | Brand requires premium foundry signal at launch | **Locked free at v1 by PROJECT.md key decision + harness `font-license.sh` block.** Inter at 800+ scores ~90% Söhne similarity per Typewolf; Source Serif 4 with `opsz` axis ships ~85% Tiempos similarity. Upgrade in v2. |

---

## What NOT to Use

| Avoid | Why It's Wrong For This Project | Use Instead |
|-------|--------------------------------|-------------|
| **Framer Motion for the TitleCard signature** | Three hooks (`useScroll` + `useTransform` + `useMotionValueEvent`) fighting React's render cycle on every scroll frame. GSAP's ScrollTrigger is one timeline that bypasses React entirely. Blueprint §4f and §11 both name GSAP for this exact move. | GSAP 3.15 + `@gsap/react` `useGSAP` hook (only inside `<TitleCard />`) |
| **Framer Motion for foyer hover/enter (anywhere)** | Adds 30 kB to the foyer bundle for behaviors achievable in 0 kB with `transition-*` + `:hover` CSS. Pile-on motion is the §13 anti-pattern. | CSS transitions via Tailwind utilities; one signature GSAP move; one View Transition route dim. **That is the entire motion budget.** |
| **Mixpanel / Segment / PostHog / Amplitude / GA4** | Cookie banners, PII leakage, ~150 kB of analytics SDK, dilutes foyer hospitality. PROJECT.md Out of Scope. | `@vercel/analytics` + `@vercel/speed-insights`. One custom event: `case_study_read_complete`. |
| **Sanity / Contentful / Strapi / Payload / TinaCMS** | Five MDX files + a few case studies do not need a headless CMS. The MDX-in-repo path is the writer-as-engineer pattern Micah's voice wants. PROJECT.md Out of Scope. | `@next/mdx` + `gray-matter` + `content/work/*.mdx`. |
| **WebGL / Three.js / R3F / Spline / Lottie** | Wrong audience (the primary visitor is a Black HR consultant or birth worker, not a senior frontend recruiter); wrong budget; dilutes the one-signature-move discipline. Blueprint §13 anti-pattern. | The View Transition foyer↔theater dim **is** the production-flex. Spend the motion budget once. |
| **Monospace fonts (Berkeley Mono, Geist Mono, JetBrains Mono, IBM Plex Mono, Söhne Mono)** | Attempt 1's tell. The harness `motion-discipline.sh` hook blocks any mono import. | Inter Display at weight 800+ for headlines. Inter for body. Source Serif 4 for serif accents. |
| **Klim self-hosted (Söhne, Tiempos, National 2, Calibre, Domaine)** | License (~$600) not budgeted at v1. The harness `font-license.sh` hook blocks `next/font/local` imports of these without a license lock file. | `next/font/google` free path: Inter + Inter (display weights) + Source Serif 4. Upgrade in v2 when license lands. |
| **PP Editorial New / PP Locomotive New (Pangram Pangram)** | Attempt 2's tell. Overdone in 2026. | Source Serif 4 (free, more distinctive in 2026 than PP Editorial). |
| **Locomotive Scroll** | Unmaintained since Darkroom Engineering rebrand. | Lenis 1.3 via `lenis/react`. |
| **`@studio-freight/react-lenis`** | Retired package. | `lenis` + import from `lenis/react`. |
| **`smoothTouch: true` in Lenis options** | Removed in Lenis 1.0. Will silently no-op or throw depending on version. | `syncTouch: false` (the default — see Integration Note 3). |
| **Manual `useEffect` cleanup for GSAP** | Fights `useGSAP`'s automatic `gsap.context().revert()` on unmount. Causes phantom ScrollTrigger instances. | `useGSAP(() => { ... }, { scope: ref })` — automatic cleanup. |
| **`tailwind.config.ts`** | Tailwind v4 doesn't need it. Anyone writing one is in v3 muscle memory. | `@theme { ... }` block in `app/globals.css`. |
| **React Hook Form / Formik / Conform** | Two-field contact form does not need a form library. | `useActionState` + Zod inside a Server Action. |
| **react-hot-toast / Sonner** | "Real reply" voice rule (PROJECT.md) means error states are full sentences inline, not toast pills. | Inline error rendering from `useActionState` return value. |
| **Dark mode toggle (`next-themes`, etc.)** | Mode is route-based (`/work/*` is theater), not user-controlled. PROJECT.md Out of Scope. | `route.layout.tsx` for foyer routes wraps `<body className="foyer">`; theater route group wraps `<body className="theater">`. |
| **shadcn/ui as a default install** | Drags in Radix UI primitives for components Micah's five pages don't need (Dialog, Popover, DropdownMenu, etc.). | Write the two custom components (`<TitleCard />`, `<ContactForm />`) by hand. If shadcn primitives are needed for a future Phase, cherry-pick (`npx shadcn add <component>`). |
| **`react-intersection-observer`** | One library for one IntersectionObserver instance (the case-study read-complete event). | Native `IntersectionObserver` API — 8 lines, zero kB. |
| **Cursor follower libraries (`react-mouse-follower`, custom blob)** | Dated as of mid-2025. Blueprint §13 anti-pattern. The harness's motion-discipline.sh hook blocks. | Native cursor. |
| **Newsletter signup libraries (ConvertKit, Buttondown widgets)** | PROJECT.md Out of Scope at launch. | If v2 adds a newsletter, embed at the bottom of `/about`, never in nav. |

---

## Version Compatibility Matrix

| Package | Requires | Notes |
|---------|----------|-------|
| `next@16.2.6` | `react@^19.0.0`, `react-dom@^19.0.0`, `node@>=20.10` | Node 20.10+ is mandatory; 18 is no longer supported. |
| `tailwindcss@^4.3` | `@tailwindcss/postcss@^4.3`, `postcss@^8.5` | The `@tailwindcss/postcss` minor must match `tailwindcss` minor. |
| `@next/mdx@^16` | `@mdx-js/loader@^3`, `@mdx-js/react@^3`, `next@^16` | All four locked to v3/v16 respectively. |
| `gsap@^3.15` | None (peer-dep free) | `ScrollTrigger` ships in the same package — no separate install. |
| `@gsap/react@^2.1` | `gsap@^3.12`, `react@^17` | Works with React 19. |
| `lenis@^1.3` | None (peer-dep free) | `lenis/react` subpath requires React 18+. |
| `resend@^6` | `node@>=18` | Works in Vercel Edge + Node runtimes. |
| `@supabase/supabase-js@^2.105` | `node@>=18` | Server-only usage means no browser-bundle bloat. |
| `@vercel/analytics@^2` + `@vercel/speed-insights@^1` | `next@^13` | Both have a `/next` subpath that defers script load. |

---

## Stack Patterns by Variant

**If the Klim font license lands before launch (v2):**
- Swap `next/font/google` Inter Display + Inter + Source Serif 4 for `next/font/local` Söhne Buch/Kräftig/Halbfett + Tiempos Text Regular/Italic
- Lock the license file path in the harness `font-license.sh` config
- Visual-qa baselines should be re-shot at 390/768/1440

**If real-user metrics show LCP regression on foyer routes:**
- The Lenis lerp 0.08 is generally safe but if the harness perf-budget.sh fires, set `lerp: 0.1` (default) for a small budget recovery
- Or scope Lenis to only `/about`, `/work-with-me`, `/contact` — leave `/` (Home) on native scroll where the hero pin is the only motion

**If the case-study count grows past ~12:**
- The `content/work/*.mdx` glob pattern stays valid
- Consider adding a tiny in-memory index (`lib/work-index.ts`) generated at build time via `gray-matter` to power filtering on the Work index page

**If a future engagement needs a true CMS:**
- Add Sanity Studio as a separate Vercel deployment (`studio.micahjonesconsulting.com`), not as a Next.js route in this repo
- Pull data via Sanity's GROQ at build time into the same MDX-shaped contract

---

## Roadmap Phase Implications (for the downstream roadmapper)

| Phase Topic | Stack Tie-In | Risk to Watch |
|-------------|--------------|---------------|
| **Phase 1: Scaffold + Tokens** | `create-next-app@^16`, Tailwind v4 PostCSS wiring, `@theme` block, `next/font/google` three families | The PostCSS plugin separation (`@tailwindcss/postcss`) catches people on the first install. Verify `app/globals.css` renders foyer paper background before moving on. |
| **Phase 2: Route Groups + View Transition** | `app/(foyer)` and `app/(theater)` route groups, `next.config.ts` `experimental.viewTransition: true`, `<ViewTransition>` from `react` | The flag is `experimental` — won't auto-graduate. Test the 600ms cream-recedes / theater-rises in Chrome stable (Safari behavior differs per Next.js docs). |
| **Phase 3: TitleCard** | GSAP 3.15 + ScrollTrigger + `useGSAP` + `gsap.registerPlugin` at module level + `scope: ref` | The Lenis ↔ ScrollTrigger bridge (one `lenis.on('scroll', ScrollTrigger.update)` call) is the most-missed line. Document explicitly in the TitleCard PR description. |
| **Phase 4: MDX + Case Studies** | `mdx-components.tsx` at repo root, `gray-matter` frontmatter, harness `mdx-frontmatter.sh` enforcement | The `mdx-components.tsx` location is a silent footgun. Verify the file lives outside `app/`. |
| **Phase 5: Contact Form** | Resend domain verification, Supabase service-role key, Zod schema, `useActionState` inline errors | Resend DNS verification takes 10 minutes; do it on Day 1, not Day 7. |
| **Phase 6: Performance Pass** | `next/image` AVIF, font `display: 'swap'`, Lenis lerp tuning, Vercel Speed Insights | The harness's image-budget.sh blocks images >500KB — pre-compress all stills before the case study writes. |
| **Phase 7: A11y + Reduced Motion** | View Transition `@media (prefers-reduced-motion)` guard, GSAP `gsap.matchMedia()` for reduced-motion variant | The harness `a11y-baseline.sh` will flag the view transition if no reduced-motion fallback exists. |

---

## Version Note: Next.js 15 vs Next.js 16

**PROJECT.md and blueprint §11 both name "Next.js 15."** This research recommends **Next.js 16.2.6** for these reasons:

1. **Greenfield** — no migration cost. The codemod (`npx @next/codemod@canary upgrade latest`) handles the few breaking changes (caching is now explicit, Turbopack is default).
2. **Same `experimental.viewTransition` flag** — the foyer↔theater dim API is identical in 15.2+ and 16.x.
3. **Stable Turbopack for production** — the harness's perf-budget.sh expects fast builds. v16's Turbopack production builds are 50%+ faster than v15's Webpack default.
4. **Stable Partial Prerendering** — useful later if any foyer route needs a dynamic personalization layer, but **not blocking v1**.
5. **React 19** is the minimum for both — no React change.

If the project strictly requires Next.js 15.x (e.g., a deploy environment constraint not mentioned in PROJECT.md), the rest of the stack is unchanged — all packages above install cleanly on 15.x as well. The recommendation upgrades on the basis of zero migration risk and a longer support window.

**Confidence on the v16 recommendation:** HIGH for greenfield. If user objects, drop to Next 15.2.4 (last March 2026 release) — identical for the purposes of this project.

---

## Sources

- [Next.js viewTransition config — official docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition) — HIGH (verified 2026-05-13)
- [Next.js View Transitions guide — official docs](https://nextjs.org/docs/app/guides/view-transitions) — HIGH (verified 2026-05-13)
- [Next.js 16 release blog](https://nextjs.org/blog/next-16) — HIGH
- [Next.js MDX guide — official docs](https://nextjs.org/docs/pages/guides/mdx) — HIGH
- [Next.js `mdx-components.js` file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components) — HIGH
- [Tailwind CSS v4.0 release post](https://tailwindcss.com/blog/tailwindcss-v4) — HIGH (v4 stable Jan 2025)
- [Tailwind v4 PostCSS install docs](https://tailwindcss.com/docs/installation/using-postcss) — HIGH
- [Tailwind `@theme` vs `@theme inline` discussion #18560](https://github.com/tailwindlabs/tailwindcss/discussions/18560) — HIGH (clarifies the inline variant)
- [Lenis GitHub README — Darkroom Engineering](https://github.com/darkroomengineering/lenis) — HIGH (v1.3.23 verified)
- [Lenis React package README](https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md) — HIGH
- [GSAP 3.13 free release announcement](https://gsap.com/blog/3-13/) — HIGH (Webflow-funded free license)
- [GSAP Standard License](https://gsap.com/community/standard-license/) — HIGH (commercial use permitted free)
- [GSAP React docs (`@gsap/react` `useGSAP`)](https://gsap.com/resources/React/) — HIGH
- [npm registry `npm view <pkg> version`](https://www.npmjs.com) — HIGH (all version numbers above queried 2026-05-14)
- [Resend Next.js App Router example](https://github.com/resend/resend-nextjs-app-router-example) — HIGH (official)
- [Vercel Analytics quickstart](https://vercel.com/docs/analytics/quickstart) — HIGH
- [Vercel Web Analytics `@vercel/analytics` npm](https://www.npmjs.com/package/@vercel/analytics) — HIGH
- [Source Serif 4 — Google Fonts specimen](https://fonts.google.com/specimen/Source+Serif+4) — HIGH (variable axes confirmed)
- [Next.js Font Optimization docs](https://nextjs.org/docs/app/getting-started/fonts) — HIGH
- [DevDreaming "Smooth Scrolling in Next.js with Lenis & GSAP (2026 Guide)"](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap) — MEDIUM (community guide, useful for the Lenis↔ScrollTrigger bridge pattern)
- [Bridger Tower "How to implement Lenis in Next.js"](https://bridger.to/lenis-nextjs) — MEDIUM (community guide, confirms `ReactLenis root` pattern)

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Core framework versions (Next, React, Tailwind, TS) | HIGH | Verified directly against npm registry on 2026-05-14 + official docs |
| View Transitions API integration | HIGH | Next.js 16.2.6 docs page is dated 2026-05-13 — fresher than this research; experimental flag confirmed |
| Tailwind v4 `@theme` syntax | HIGH | Stable since Jan 2025; PostCSS plugin separation verified |
| GSAP free license + version | HIGH | 3.13 release blog confirms; 3.15.0 is current on npm |
| Lenis 1.3 + `lenis/react` | HIGH | GitHub README + npm + 2026 community guides all align |
| `smoothTouch` → `syncTouch` migration | HIGH | Confirmed removed in Lenis 1.0 by multiple sources + GitHub commit history |
| `@next/mdx` setup + frontmatter pattern | HIGH | Official Next.js docs page on `mdx-components.tsx` file convention |
| `next/font/google` for Inter + Source Serif 4 | HIGH | Google Fonts specimen + Next.js Font docs verified |
| Source Serif 4 `axes: ['opsz']` | HIGH | Google Fonts variable-axis filter confirms `opsz` available |
| Resend + Supabase server-only pattern | HIGH | Official Resend Next.js example + Supabase service-role security model verified |
| Vercel Analytics + Speed Insights | HIGH | Vercel official docs verified |
| Framer Motion deliberate exclusion | HIGH | Blueprint §13 + PROJECT.md anti-pattern list both align with the "one signature motion" framing |
| Next.js 16 vs 15 recommendation | MEDIUM-HIGH | Greenfield favors 16; if user wants 15.x for any reason, swap is trivial — same APIs |

---

*Stack research for: premium agency-tier solo-operator portfolio + MDX case-study marketing site (House Lights direction)*
*Researched: 2026-05-14*
