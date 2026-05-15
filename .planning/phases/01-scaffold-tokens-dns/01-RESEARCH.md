# Phase 1: Scaffold, Tokens, DNS — Research

**Researched:** 2026-05-14
**Domain:** Day-1 foundation for Next.js 16 App Router project — install + tokens + harness + out-of-band workstreams
**Confidence:** HIGH (synthesized from `.planning/research/{STACK,ARCHITECTURE,PITFALLS,SUMMARY}.md`, harness templates at `C:/Users/micah/Code/premium-web-harness/plugins/vertical-plugins/premium-web/templates/`, and verified against official Next.js 16.2 docs + Tailwind v4 PostCSS docs)

---

## Summary

Phase 1 is the cold-repo-to-typecheck-passing-Next.js-16 day. It does **scaffolding** (Next.js 16.2 + Tailwind v4 + MDX + `experimental.viewTransition` + TypeScript strict), **design tokens** (all 11 colors from blueprint §4b in a Tailwind v4 `@theme` block keyed off `[data-mode]` attribute selectors), **harness wiring** (`.claude/brand.json` + `.claude/CLAUDE.md` extended from premium-web templates with House Lights overrides), and **two out-of-band workstreams** that must start Day 1 because their wall-clock latency is the critical path: Resend DNS verification (24–72h propagation) and Oakland portrait photographer booking (7-day target).

The phase has three Day-1 footguns that the planner MUST address:

1. **`@tailwindcss/postcss` is a separate package** from `tailwindcss` in v4 — installing only `tailwindcss` produces a "trying to use tailwindcss directly as a PostCSS plugin" error on first build (Pitfall: every first-install of v4 in 2025–2026).
2. **`next/font/google` CSS variables are not auto-discovered by Tailwind v4** — they must be re-declared inside the `@theme` block (Next.js Discussion #77337). Without this, `font-display` utility classes silently fall through to system fonts.
3. **Copper `#C8542B` fails WCAG AA on cream paper for body text (3.85:1)** — Phase 1 tokens MUST distinguish `--accent-copper` (large text + UI components only) from `--accent-copper-deep #8E3A1E` (5.4:1, body-text emphasis token). Bake the rule into both `app/globals.css` comments and `.claude/CLAUDE.md` so it survives every future PR.

**Primary recommendation:** Scaffold via `pnpm create next-app` with explicit flags (no interactive prompts), then immediately install Tailwind v4 + MDX + motion + form + observability packages in 5 grouped commands. Write tokens, fonts, layout shell, harness configs, copy-lint scaffold, and `.gitignore` in parallel. Initiate Resend domain verification and photographer outreach as separate operator-side workstreams the same day. Phase 2 owns ViewTransition + Lenis + reduced-motion + copy-lint integration; Phase 1 only scaffolds the *files* for copy-lint, doesn't wire `instrumentation.ts` into the build pipeline yet (that's Phase 2 per ROADMAP `COPY-03`).

---

<user_constraints>
## User Constraints (from CONTEXT.md)

**No CONTEXT.md exists for Phase 1.** This phase was initiated directly from `/gsd:plan-phase` without a prior `/gsd:discuss-phase` step. The applicable constraints therefore come from `PROJECT.md` Constraints section + REQUIREMENTS.md + blueprint:

### Locked Decisions

- **Stack**: Next.js 16.2.6 App Router (override of blueprint's "Next.js 15" per `.planning/research/STACK.md` recommendation), TypeScript strict, Tailwind v4, MDX via `@next/mdx`, GSAP 3.15 free, Lenis 1.3, Resend, Supabase service-role-only.
- **Typography**: `next/font/google` free path — Inter (body + display weights) + Source Serif 4 (`axes: ['opsz']`). Klim Söhne/Tiempos deferred to v2 (~$600 license).
- **Accent color**: Single `--accent-copper #C8542B`. `--accent-copper-deep #8E3A1E` for body-text emphasis (WCAG AA pass). `--ordani-sage #5E7158` permitted only inside `/work/ordani` route (enforced by `design-tokens.sh`).
- **Mode model**: Route-based via `[data-mode="foyer"]` / `[data-mode="theater"]` attribute selectors set by group layouts. NO `ThemeProvider`, NO `useTheme()`, NO `next-themes`, NO toggle. Mode is a structural property of the route tree.
- **One root layout + two nested group layouts**: View Transitions API requires a stable document root across foyer↔theater navigation. Multiple-root-layouts pattern would force full page reloads and kill the signature transition.
- **Package manager**: `pnpm` (per ROADMAP success criterion 1: `pnpm install && pnpm typecheck && pnpm build`).
- **Platform**: Windows native development; production deploy on Vercel Linux. `/premium new` slash-command WSL2-only check is bypassed.
- **Repo location**: `~/Code/micahjonesconsulting` (the actual project directory).
- **GitHub identity**: `micahx745`, push target `github.com/micahx745/micahjonesconsulting`.
- **Harness**: `premium-web` plugin already installed at `~/Code/premium-web-harness`; all 8 hooks enabled; 5 plugin MCPs registered. Phase 1 connects this project to that installation via `.claude/brand.json` + `.claude/CLAUDE.md` extended from the harness templates.

### Claude's Discretion

- **Exact `pnpm` flag sequence** for `create-next-app` (no interactive prompts). Default to `--ts --tailwind --app --turbopack --no-linter --import-alias "@/*" --use-pnpm --disable-git --agents-md` — agents-md is the AGENTS.md/CLAUDE.md scaffold which Phase 1 then *overwrites* with the harness-extended version.
- **Exact directory layout deltas** beyond ARCHITECTURE.md §2 — Phase 1 only needs the scaffold-level files (`app/layout.tsx`, `app/globals.css`, `mdx-components.tsx`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `lib/fonts.ts`, `lib/banned.ts`, `lib/copy-lint.ts`, `instrumentation.ts`, `.claude/brand.json`, `.claude/CLAUDE.md`, `.gitignore`). Components, routes, and content directories come in later phases.
- **Photographer shortlist composition** — research surfaces names; user selects.
- **Resend account/email subdomain choice** — recommend `hello@micahjonesconsulting.com` per blueprint §7 + Resend's default send subdomain pattern. User confirms.

### Deferred Ideas (OUT OF SCOPE)

- **ViewTransition wrapper** in `app/layout.tsx` — Phase 2 (TRANS-01..05).
- **LenisProvider** wiring — Phase 2 (LENIS-01..05).
- **`::view-transition-old/new(root)` keyframes** in `app/globals.css` — Phase 2 (TRANS-02..03).
- **`instrumentation.ts` runtime hook** that actually invokes `copy-lint.ts` at build time — Phase 2 (COPY-03). Phase 1 creates the *scaffold file* `instrumentation.ts` with a no-op `register()` export so the Next.js convention is in place, but the build-time scan is wired up in Phase 2 alongside the rest of copy-discipline.
- **`mdx-components.tsx` at repo root** — Phase 7 (CASE-07). Phase 1 does NOT create this file. Until it exists, `@next/mdx` will silently fail to render MDX, which is fine because no MDX content exists yet either.
- **`(foyer)/` and `(theater)/` route groups** — Phase 4 (FOYER-01, THEATER-01..03). Phase 1 leaves `app/` containing only `layout.tsx` and `globals.css`.
- **Vercel deploy / custom domain / Supabase setup** — Phase 10 (DEPLOY-01, DEPLOY-03..06). Phase 1 only sends the Resend DNS TXT record to the registrar; it does NOT yet configure `RESEND_API_KEY` in Vercel env (no Vercel project yet).
- **All foyer pages, theater pages, case-study MDX, TitleCard, nav, footer, portrait integration, perf/a11y/OG/sitemap/robots passes** — Phases 3–10.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SCAFF-01 | Next.js 16.2 App Router project initialized with TypeScript strict mode | §"Scaffold Command Sequence" — exact `pnpm create next-app` invocation + `tsconfig.json` strict block |
| SCAFF-02 | Tailwind v4 with `@theme` block in `app/globals.css`; `@tailwindcss/postcss` separate package | §"`package.json` Dependency List" + §"`postcss.config.mjs`" + §"`app/globals.css`" |
| SCAFF-03 | `next.config.ts` enables `experimental.viewTransition: true` + `withMDX()` wrapper | §"`next.config.ts` Complete Content" |
| SCAFF-04 | `next/font/google` loads Inter (display + body) + Source Serif 4 (`axes: ['opsz']`); CSS variables re-declared inside `@theme` | §"`lib/fonts.ts` Complete Content" + §"`app/globals.css`" font cascade block |
| SCAFF-05 | `mdx-components.tsx` at repo root | **DEFERRED to Phase 7** — Phase 1 only ensures `next.config.ts` allows `.mdx` page extensions and `withMDX()` is wired. See `<user_constraints>` Deferred Ideas. |
| SCAFF-06 | `instrumentation.ts` hook runs build-time copy-lint scan | **SCAFFOLD ONLY in Phase 1** — Phase 1 creates the file with a no-op `register()` export so the convention is in place; Phase 2 wires the actual copy-lint scanner per COPY-03. See `<user_constraints>` Deferred Ideas. |
| SCAFF-07 | Project CLAUDE.md captures stack rules, single-accent rule, single-motion rule, mode-by-route rule, banned-words discipline | §"`.claude/CLAUDE.md` Content" — extended from harness template |
| SCAFF-08 | `.gitignore` excludes `.next/`, `node_modules/`, `.env.local`, `.vercel/`, `qa/current/` | §"`.gitignore` Content" |
| TOKEN-01 | All 11 color tokens from blueprint §4b defined as CSS custom properties in `@theme` block | §"`app/globals.css`" — full @theme block with every hex |
| TOKEN-02 | Group layouts stamp `data-mode="foyer"` / `data-mode="theater"`; no `ThemeProvider` | **Phase 4 wires the group layouts**; Phase 1 documents the contract in `.claude/CLAUDE.md` and writes the CSS attribute selectors in `app/globals.css` so Phase 4 only has to add `<div data-mode="...">` wrappers. |
| TOKEN-03 | Tailwind theme reads mode via `[data-mode="foyer"]` / `[data-mode="theater"]` attribute selectors | §"`app/globals.css`" mode-driven background/text defaults block |
| TOKEN-04 | Body text emphasis uses `--accent-copper-deep` (5.4:1); plain `--accent-copper` only for large/non-text UI | §"`app/globals.css`" — explicit comment block documenting the rule + `.claude/CLAUDE.md` repeats it for harness PR review |
| TOKEN-05 | `--ordani-sage` permitted only inside `/work/ordani.mdx` and its `<PullQuote>` consumer; enforced via `design-tokens.sh` allowlist | Token defined in `@theme`; allowlist extension is `design-tokens.sh` config — Phase 1 documents the rule, Phase 8 verifies on ORDANI build |
| TOKEN-06 | 12-column grid, 80px gutter desktop / 16px mobile; 4px base; 68ch body, 28ch sidenotes; 128/64px page padding | §"`app/globals.css`" — spacing scale + grid container utility tokens in `@theme` |
| HARN-01 | `.claude/brand.json` exists; populated from harness template + House Lights overrides | §"`.claude/brand.json` Content" — verbatim diff from harness template |
| HARN-02 | `.claude/CLAUDE.md` exists; populated from harness template + project-specific overrides | §"`.claude/CLAUDE.md` Content" — verbatim diff from harness template |
| HARN-03 | Project depends on the locally-installed `premium-web` plugin marketplace | The plugin is already installed at `~/Code/premium-web-harness`; Phase 1 simply *connects* by creating `.claude/{brand.json,CLAUDE.md}` so the plugin's hooks read project-specific config. No `package.json` dependency. |
| DEPLOY-02 | Resend domain verification (DNS TXT) completed Day 1 of build | §"Resend DNS Verification Steps" — exact registrar workflow + 24–72h propagation note |
| PHOTO-01 | Oakland portrait photographer booked within 7 days; 2-hour session; budget $500–$1,200 | §"Photographer Outreach Checklist" — 5-name shortlist + inquiry template |
</phase_requirements>

---

## Standard Stack (Phase 1 install scope only)

The full stack is documented in `.planning/research/STACK.md`. Phase 1 installs and configures **only** the packages that are needed to make `pnpm install && pnpm typecheck && pnpm build` succeed (ROADMAP success criterion 1). Motion/form/email packages that ship later are still installed Day 1 to lock versions and avoid second-install gotchas; their integration code lives in later phases.

### Core (must succeed `next build` on empty layout)

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | `16.2.6` | App Router, View Transitions, MDX pipeline, Image, Font |
| `react` | `19.2.6` | Required by Next 16; canary ships `ViewTransition` automatically |
| `react-dom` | `19.2.6` | DOM renderer, locked to React major |
| `typescript` | `^6` | Strict mode |
| `@types/react` | `^19` | React 19 types |
| `@types/react-dom` | `^19` | React DOM types |
| `@types/node` | `^22` | Node 22 types (Vercel build env) |

### Tailwind v4 (the separate-package footgun)

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | `^4.3` | CSS-first `@theme` engine |
| `@tailwindcss/postcss` | `^4.3` | **Separate package** — required as the PostCSS plugin; v3 used `tailwindcss` directly here, v4 does not |
| `postcss` | `^8.5` | Peer dependency |

### MDX (Phase 1 scope: enable `pageExtensions` + `withMDX` wrapper only)

| Package | Version | Purpose |
|---------|---------|---------|
| `@next/mdx` | `^16` | `withMDX()` Next.js plugin |
| `@mdx-js/loader` | `^3` | Webpack/Turbopack loader |
| `@mdx-js/react` | `^3` | React runtime for `useMDXComponents` |
| `gray-matter` | `^4` | YAML frontmatter parser (Phase 7 uses, but install now to lock version) |
| `remark-gfm` | `^4` | GFM tables/strikethrough (Phase 7 uses) |
| `@types/mdx` | `^2` | Type for `mdx-components.tsx` (Phase 7 creates the file) |

### Motion (install now, integrate later)

| Package | Version | Purpose |
|---------|---------|---------|
| `gsap` | `^3.15` | TitleCard signature interaction (Phase 5) |
| `@gsap/react` | `^2.1` | `useGSAP` hook with auto-cleanup |
| `lenis` | `^1.3` | Smooth scroll at root (Phase 2) |

### Form + Email + Data (install now, integrate later)

| Package | Version | Purpose |
|---------|---------|---------|
| `resend` | `^6` | Transactional email (Phase 6 + Phase 10) |
| `zod` | `^4` | Server Action validation + MDX frontmatter schema |
| `@supabase/supabase-js` | `^2.105` | Contact-form archive insert (Phase 6 + Phase 10) |

### Observability (install now, mount in Phase 2 per ANALY-01)

| Package | Version | Purpose |
|---------|---------|---------|
| `@vercel/analytics` | `^2` | Cookieless analytics |
| `@vercel/speed-insights` | `^1` | RUM for LCP/INP/CLS |

### Dev Tools

| Package | Version | Purpose |
|---------|---------|---------|
| `prettier` | `^3` | Code formatter |
| `prettier-plugin-tailwindcss` | `^0.6` | Tailwind v4 class sorting (0.6+ required for v4 syntax) |

### Excluded (deliberately — `package.json` MUST NOT contain these)

- `framer-motion` — blueprint §13 anti-pattern + research: GSAP is the signature engine, CSS handles component motion.
- `@studio-freight/react-lenis` — retired package; install `lenis` and import from `lenis/react`.
- `tailwind.config.ts` (implied) — Tailwind v4 has no JS config; only `@theme` block.
- `eslint-config-next` — scaffolded with `--no-linter`; ESLint not used in v1 (Prettier alone covers formatting).
- Any monospace font package — blocked at harness `motion-discipline.sh` + `font-license.sh`.
- `next-themes`, `next-mdx-remote`, `react-hook-form`, `shadcn/ui`, `framer-motion`, `locomotive-scroll`, `react-mouse-follower`.

### Installation Sequence

```bash
# Step 1 — scaffold
pnpm create next-app micahjonesconsulting \
  --ts \
  --tailwind \
  --app \
  --turbopack \
  --no-linter \
  --import-alias "@/*" \
  --use-pnpm \
  --disable-git \
  --agents-md \
  --yes

# (Phase 1 plan note: the scaffolder creates AGENTS.md + a starter CLAUDE.md.
#  We overwrite both with harness-derived House Lights versions in a later task.)

cd micahjonesconsulting

# Step 2 — Tailwind v4 already installed by scaffolder, but verify and add PostCSS plugin
pnpm add tailwindcss@^4.3 @tailwindcss/postcss@^4.3 postcss@^8.5

# Step 3 — MDX pipeline
pnpm add @next/mdx@^16 @mdx-js/loader@^3 @mdx-js/react@^3
pnpm add gray-matter@^4 remark-gfm@^4
pnpm add -D @types/mdx@^2

# Step 4 — Motion
pnpm add gsap@^3.15 @gsap/react@^2.1 lenis@^1.3

# Step 5 — Form + email + data
pnpm add resend@^6 zod@^4 @supabase/supabase-js@^2.105

# Step 6 — Observability
pnpm add @vercel/analytics@^2 @vercel/speed-insights@^1

# Step 7 — Dev tools (formatter only; no ESLint)
pnpm add -D prettier@^3 prettier-plugin-tailwindcss@^0.6
```

Note: The scaffolder's default install of `tailwindcss` may not match `^4.3` exactly. Step 2 re-pins to the same minor of `tailwindcss` and `@tailwindcss/postcss` (they must match minors per Tailwind v4 install docs).

---

## Architecture Patterns

### Recommended Project Structure (Phase 1 scope only)

After Phase 1 the repo contains exactly these tracked files. Components, routes, and content directories ship in later phases.

```
micahjonesconsulting/
├── app/
│   ├── layout.tsx                 — Root layout, fonts attached to <html>, suppressHydrationWarning
│   └── globals.css                — @import "tailwindcss"; @theme block w/ 11 colors + font vars + spacing scale
├── lib/
│   ├── fonts.ts                   — next/font/google: Inter (display weights) + Inter (body) + Source Serif 4
│   ├── banned.ts                  — 30-word banned-words constant
│   └── copy-lint.ts               — TypeScript scanner (function exports only; not yet invoked)
├── instrumentation.ts             — Empty register() export per Next.js convention; Phase 2 wires copy-lint
├── next.config.ts                 — experimental.viewTransition: true + withMDX() + pageExtensions
├── postcss.config.mjs             — { plugins: { "@tailwindcss/postcss": {} } }
├── tsconfig.json                  — strict, paths, JSX react-jsx
├── package.json                   — Locked versions per stack section
├── pnpm-lock.yaml                 — Generated
├── .claude/
│   ├── brand.json                 — Harness template + House Lights overrides
│   └── CLAUDE.md                  — Harness template + House Lights overrides
├── .gitignore                     — .next/, node_modules/, .env.local, .vercel/, qa/current/, OS files
├── AGENTS.md                      — Scaffolder default (optional to keep; overlaps with CLAUDE.md)
├── README.md                      — Scaffolder default minimal
├── public/                        — Empty (next.svg, vercel.svg can stay or be deleted)
└── next-env.d.ts                  — Scaffolder default
```

**NOT created in Phase 1:**
- `app/(foyer)/`, `app/(theater)/` — Phase 4 (FOYER-01, THEATER-01)
- `app/page.tsx` — Phase 4 (the scaffolder creates one; we delete or stub it because the foyer route group will own `/`)
- `mdx-components.tsx` — Phase 7 (CASE-07)
- `components/` directory — Phases 2, 3, 5
- `content/work/` directory — Phase 8

### Pattern 1: Tailwind v4 `@theme` block + `[data-mode]` attribute selectors

**What:** All design tokens live as CSS custom properties inside one `@theme` block in `app/globals.css`. Mode-specific overrides cascade via `[data-mode="foyer"]` / `[data-mode="theater"]` selectors set on group-layout `<div>`s (Phase 4).

**When to use:** This is THE config surface for the project. There is no `tailwind.config.ts`. Any reach for `tailwind.config.ts` in Phase 1 is v3 muscle memory.

**Critical distinction — `@theme` vs `@theme inline`:**
- `@theme { ... }` writes values into global CSS variables AND generates utility classes. Use for the token block (colors, spacing, fonts).
- `@theme inline { ... }` does NOT create global variables; you provide them yourself. Useful for wiring an external variable (e.g., a `next/font` CSS variable from a different scope) but redundant here because we redeclare inside the standard `@theme` block.

**Example:**
```css
/* Source: https://tailwindcss.com/docs/theme + https://github.com/vercel/next.js/discussions/77337 */
@import "tailwindcss";

@theme {
  --color-foyer-paper: #F5EFE4;
  --font-display: var(--font-inter-display);
  /* ... */
}

[data-mode="foyer"] {
  background-color: var(--color-foyer-paper);
  color: var(--color-foyer-ink);
}
```

### Pattern 2: `next/font/google` CSS variable cascade

**What:** Fonts loaded at build time by `next/font/google`, produce CSS variable names + className strings, className attached to `<html>` element, variables re-declared inside `@theme` to make Tailwind utility classes resolve.

**When to use:** Always for Phase 1 fonts. Never use `<link>` tags. Never use `@font-face` directly unless on the v2 Klim path (`next/font/local`).

**Example:** see §"`lib/fonts.ts`" + §"`app/layout.tsx`" + §"`app/globals.css`" font-variable block.

### Anti-Patterns to Avoid (Phase 1 specific)

- **Adding `tailwind.config.ts`** — v4 has no JS config. Anyone writing one is in v3 muscle memory.
- **Importing `tailwindcss` directly as a PostCSS plugin** — the package moved to `@tailwindcss/postcss`. The wrong import errors with "It looks like you're trying to use tailwindcss directly as a PostCSS plugin."
- **Expecting `next/font/google` variables to auto-resolve in Tailwind utilities** — they must be re-declared in `@theme`. Without re-declaration, `font-display` utility falls through to system fonts silently.
- **Creating multiple root layouts** (one per route group) — kills the View Transition by forcing full page reloads. Phase 1 must establish the *single* root layout pattern so Phase 4 inherits it.
- **Putting `mdx-components.tsx` inside `app/`** — silent failure. Must live at repo root (Phase 7).
- **Using raw `--accent-copper` as foyer body link color** — WCAG AA fail (3.85:1). Phase 1 bakes the `--accent-copper-deep` rule into both `app/globals.css` and `.claude/CLAUDE.md`.
- **Defaulting to `display: "auto"` on Source Serif 4** — should be `"swap"` for fast LCP; `axes: ['opsz']` flag is the most-missed integration detail per STACK.md.
- **Importing all Inter weights "just in case"** — every weight = extra bytes. Inter display block uses `['600','700','800']` (matches blueprint §4f "96px Halbfett ≈ weight 700–800"); body block uses `['400','500','600']`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Project scaffolding | Hand-written `package.json` + `tsconfig.json` + `next.config.ts` | `pnpm create next-app` with explicit flags | Scaffolder sets `tsconfig.json` strict mode, paths, JSX correctly; produces `next-env.d.ts`; pins peer-dep versions. Saves 30 minutes on Day 1 and avoids subtle mistakes. |
| Tailwind v4 PostCSS wiring | Custom PostCSS pipeline | `@tailwindcss/postcss` package + 3-line `postcss.config.mjs` | The official path; works with Next.js's built-in PostCSS pipeline without manual config. |
| Font subsetting + fallback metrics | `<link rel="preload">` + custom `@font-face` rules + Arial fallback hacks | `next/font/google` with `adjustFontFallback: true` + `display: 'swap'` | Next.js handles subsetting (~20KB woff2 per family), self-hosts at build time, injects `size-adjust`/`ascent-override` CSS metrics to neutralize CLS, sets correct `preload` + `crossOrigin` attributes. Hand-rolled paths skip the fallback metrics injection and blow the CLS budget. |
| YAML frontmatter parsing | Hand-written regex | `gray-matter` | Handles edge cases (escaped quotes, multiline values, comment lines). Install now to lock the version even though Phase 7 wires it up. |
| Domain DNS verification UI | Custom DNS dashboard | Resend's domain wizard | Resend's `Add Domain` flow generates the exact TXT + MX record values for the user's chosen send subdomain (typically `send.micahjonesconsulting.com`) and re-checks every 5 minutes for 72 hours. |
| Banned-words enforcement | Custom Husky hook | Use the harness's `copy-lint.sh` hook (already installed) + a `lib/copy-lint.ts` build-time scanner (Phase 2) | Hook layer catches at write boundary; build-time scanner catches everywhere else (frontmatter, metadata exports, component props). |

**Key insight:** Phase 1 is short on novel logic. Almost every file is either a scaffolder output, a harness template, or a copy-paste from STACK.md/ARCHITECTURE.md/PITFALLS.md. The plan should treat Phase 1 as **assembly** — getting the right packages and the right config files in the right places — not invention.

---

## Common Pitfalls

### Pitfall A1: `next/font/google` CLS on first paint (96px display reflow)

**What goes wrong:** With `display: 'swap'`, Inter display loads asynchronously; on first paint the browser renders Arial fallback. When the real font arrives, headlines reflow. At 96px (TitleCard scale, Phase 5), even small character-width mismatches blow the 0.05 CLS budget.

**Why it happens:** Browser fallback metrics differ from web-font metrics. Tailwind v4 + next/font integration has known gaps (Next.js Issues #74134, #73838) where `adjustFontFallback: true` was intermittently broken in 15.x.

**How to avoid:** Set `adjustFontFallback: true` on every `next/font/google` import. After first build, verify `.next/static/css/*.css` contains `@font-face` rules with `size-adjust` and `ascent-override` declarations. If they're missing, pin Next.js to a known-good patch or add manual `@font-face` overrides in `app/globals.css` as a backstop.

**Warning signs:** Chrome DevTools Issues panel flags "Font fallback metrics mismatch"; Lighthouse mobile CLS > 0.05 on first cold load.

### Pitfall B1: Copper #C8542B fails WCAG AA on cream for body text

**What goes wrong:** `#C8542B` on `#F5EFE4` is 3.85:1 contrast. WCAG 2.1 AA requires 4.5:1 for normal text (≤24px regular). A foyer body link rendered in copper at 16px earns a serious/critical axe finding.

**Why it happens:** The blueprint's accent color was chosen for "metallic, oxidized" aesthetic on Day 0; the contrast math only surfaces when axe runs.

**How to avoid (Phase 1 — bake into tokens):**
1. Define BOTH `--accent-copper` (`#C8542B`) AND `--accent-copper-deep` (`#8E3A1E`, 5.4:1) in `@theme`.
2. Document the rule in `app/globals.css` as a CSS comment block above the accent declarations.
3. Restate the rule in `.claude/CLAUDE.md` (House Rules section) so harness PR reviews catch any future `text-accent-copper` on body text.
4. The actual CSS application happens in Phase 6 (foyer pages) and Phase 10 (a11y pass) — but the token contract MUST exist Day 1 or every downstream PR has to play catch-up.

**Warning signs:** axe-core flags "Elements must meet minimum color contrast ratio thresholds"; Lighthouse Accessibility score drops 7–12 points.

### Pitfall D2: Lenis `syncTouch: true` causes iOS jank

**What goes wrong:** Lenis 1.0+ renamed the deprecated `smoothTouch` option to `syncTouch`. A developer copy-pasting a pre-2024 Lenis tutorial and "fixing" the deprecation by setting `syncTouch: true` introduces a different problem: iOS users get a fight between Lenis wheel-event smoothing and native iOS momentum scroll. Jittery double-smooth.

**Why it happens:** Lenis API churn (1.0 → 1.3) is not well-documented in tutorials. The default of `syncTouch: false` is the correct behavior — iOS keeps native momentum.

**How to avoid (Phase 1 — document in CLAUDE.md):** Phase 1 doesn't yet wire Lenis (Phase 2 does), but the CLAUDE.md MUST document `syncTouch: false` as a locked decision so future "smooth iOS scroll" PRs get rejected at review. Otherwise three months from now someone "fixes" this and ships the jank.

**Warning signs:** iOS user reports "scroll feels weird"; INP spikes on iOS Safari during scroll.

### Pitfall C1: GSAP "ReferenceError: window is not defined" on server render

**What goes wrong:** GSAP accesses `window` at module-evaluation time. Importing `gsap` at the top of any server-renderable file (even an unused `lib/` file) crashes `next build`.

**Why it happens:** Phase 1 doesn't use GSAP yet, but installs it. The risk is a future developer adds `import gsap from 'gsap'` to a `lib/` utility without the `'use client'` directive.

**How to avoid (Phase 1 — document in CLAUDE.md):** CLAUDE.md states explicitly: "GSAP imports live ONLY inside `components/TitleCard.tsx` and only in a `'use client'` file. Any other import path is incorrect."

**Warning signs:** `next build` fails on a Vercel preview deploy with `ReferenceError: window is not defined`.

### Pitfall B2 (deferred to Phase 2 implementation, document Phase 1): `prefers-reduced-motion` not auto-honored by View Transitions

**What goes wrong:** The View Transitions API does NOT automatically respect `prefers-reduced-motion` per WordPress/performance Issue #2067. A user with OS reduce-motion enabled gets the full 600ms cream-recedes / theater-rises animation, which is a vestibular trigger.

**How to avoid:** Phase 2 adds the explicit `@media (prefers-reduced-motion: reduce) { ::view-transition-* { animation: none !important; } }` CSS kill switch. Phase 1 only needs to document the requirement in `.claude/CLAUDE.md` ("All motion respects `prefers-reduced-motion`").

### Pitfall: Resend DNS verification not started Day 1

**What goes wrong:** DNS TXT record propagation takes 24–72 hours. If the user adds the records on Day 14 (deploy day), the contact form's email sending will not work until Day 15–17. Launch slips.

**Why it happens:** Operators reflexively defer "infrastructure setup" to deploy day.

**How to avoid:** Add the records Day 1 of Phase 1. Resend re-checks every 5 minutes for 72 hours. By the time Phase 6 (Contact form) needs to send a test email, the domain will already be verified.

**Warning signs:** Resend dashboard shows domain status `pending` past 72 hours → status changes to `failed`; emails sent before verification bounce.

### Pitfall: Photographer booking 7-day target

**What goes wrong:** Quality Oakland portrait photographers book 1–3 weeks out. Reaching out on Day 13 with a "shoot needed in 24h" timeline gets either expensive rush rates or a phone-grade compromise.

**How to avoid:** Send 3–5 inquiry emails Day 1 of Phase 1 with a Day-7 session target window. Phase 9 (PHOTO-02..03) integrates the delivered images; if Day-7 slips a few days, Phase 9 can absorb the delay without blocking Phase 10 deploy.

---

## Code Examples (verbatim file contents)

These are the **actual file contents** for Phase 1. They are copy-paste ready (minor adjustments for things like the user's exact email address are noted inline).

### 1. Scaffold Command Sequence

```bash
# Cold-repo entry: cwd should be ~/Code/ (the parent of where the project lives)
# After scaffolding, cwd will be ~/Code/micahjonesconsulting/

pnpm create next-app micahjonesconsulting \
  --ts \
  --tailwind \
  --app \
  --turbopack \
  --no-linter \
  --import-alias "@/*" \
  --use-pnpm \
  --disable-git \
  --agents-md \
  --yes
```

**Flag rationale:**
- `--ts` — TypeScript (locked per PROJECT.md).
- `--tailwind` — installs Tailwind v4 + `@tailwindcss/postcss` + generates `postcss.config.mjs` + `app/globals.css` skeleton. We then overwrite these with our content.
- `--app` — App Router (locked).
- `--turbopack` — Turbopack default (Next.js 16 stable for production builds, 50% faster than Webpack).
- `--no-linter` — skip ESLint setup; we don't use it in v1. Prettier alone covers formatting via the dev-tools install in Step 7.
- `--import-alias "@/*"` — standard `@/...` import path mapping.
- `--use-pnpm` — explicitly use pnpm (matches ROADMAP success criterion command).
- `--disable-git` — we initialize git separately so the first commit can include the harness configs (avoiding a "Initial commit" + "Add harness" two-commit story).
- `--agents-md` — generates AGENTS.md + CLAUDE.md scaffolds. We then overwrite CLAUDE.md with the harness-extended version. AGENTS.md can remain as a Next-specific reference or be deleted.
- `--yes` — skip all interactive prompts; use defaults except for the explicit flags above.

**Post-scaffold cleanup tasks** (these run as plan steps, not bash commands):
1. Delete the scaffolder's `app/page.tsx` (foyer route group owns `/` later).
2. Delete `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg` (default assets we won't use).
3. Overwrite `app/globals.css` with our `@theme` block (see §3 below).
4. Overwrite `app/layout.tsx` with our content (see §8 below).
5. Overwrite `next.config.ts` with our content (see §2 below).
6. Overwrite `postcss.config.mjs` with our content (see §4 below — should already match what scaffolder produces but verify).
7. Overwrite `tsconfig.json` strict settings (see §5 below).
8. Overwrite/extend the scaffolder's CLAUDE.md with our harness-derived version (see §13 below).
9. Create `lib/fonts.ts`, `lib/banned.ts`, `lib/copy-lint.ts`, `instrumentation.ts`, `.claude/brand.json`, `.claude/CLAUDE.md`, `.gitignore` (see sections below).

### 2. `next.config.ts` — Complete Content

```ts
// Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition (2026-05-13)
//         + https://nextjs.org/docs/app/guides/mdx
//         + https://nextjs.org/docs/app/api-reference/config/next-config-js/pageExtensions
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow .mdx and .md files to be treated as page modules
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // Enable React's <ViewTransition> primitive for foyer↔theater route navigation.
  // The component itself is imported from 'react' (not 'next') in app/layout.tsx (wired in Phase 2).
  experimental: {
    viewTransition: true,
  },
};

const withMDX = createMDX({
  // MDX plugins are silent for Phase 1 — Phase 7 enables remark-gfm for case-study tables.
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

**Verification:** After saving this file, `pnpm typecheck` must pass. `pnpm build` will succeed even with no MDX files present (the plugin is a no-op when no MDX is found).

### 3. `app/globals.css` — Complete Content

```css
/* ============================================================
 * House Lights — global tokens and base typography
 *
 * Tokens follow blueprint §4b. Mode is route-determined via
 * [data-mode] attribute selectors set by group layouts (Phase 4).
 *
 * ACCESSIBILITY NOTE (PITFALL B1):
 * --accent-copper (#C8542B) is 3.85:1 on cream paper.
 *   ✅ Safe for: large text ≥24px, non-text UI (buttons, focus rings, dividers)
 *   ❌ NOT safe for: body-paragraph link color (axe will flag)
 * --accent-copper-deep (#8E3A1E) is 5.4:1 on cream paper.
 *   ✅ Use for: body-text emphasis, foyer body link color
 *
 * GSAP NOTE: Phase 2 will add ::view-transition-old/new(root) keyframes
 *           and @media (prefers-reduced-motion: reduce) kill-switch.
 *           Phase 1 leaves those slots empty.
 * ============================================================ */
@import "tailwindcss";

@theme {
  /* ---- Colors (blueprint §4b — all 11 tokens) ---- */
  --color-foyer-paper:        #F5EFE4;
  --color-foyer-ink:          #1A1816;
  --color-foyer-ink-soft:     #3A3631;

  --color-theater-ground:     #0D0D0F;
  --color-theater-surface:    #16161A;
  --color-theater-ink:        #EAE6DD;
  --color-theater-ink-soft:   #9C988F;

  /* Single accent across both modes. See PITFALL B1 above for rule. */
  --color-accent-copper:      #C8542B;
  --color-accent-copper-deep: #8E3A1E;

  /* ORDANI-only — permitted via design-tokens.sh allowlist for /work/ordani only (Phase 8). */
  --color-ordani-sage:        #5E7158;

  /* Hairline rules per mode */
  --color-rule-foyer:         #D9D2C4;
  --color-rule-theater:       #2A2A30;

  /* ---- Font cascade (Phase 1 wires next/font CSS variables here) ---- *
   *
   * The next/font/google imports in lib/fonts.ts expose:
   *   --font-inter-display
   *   --font-inter
   *   --font-source-serif
   * via the className on <html> in app/layout.tsx.
   *
   * Tailwind v4 does NOT auto-discover those variables — they must be
   * re-declared inside this @theme block so `font-display` utility resolves.
   * Reference: Next.js Discussion #77337.
   */
  --font-display: var(--font-inter-display), system-ui, sans-serif;
  --font-sans:    var(--font-inter), system-ui, sans-serif;
  --font-serif:   var(--font-source-serif), Georgia, serif;

  /* ---- Spacing (TOKEN-06: 4px base, 12-col, 68ch body, 28ch sidenotes) ---- */
  --spacing-page-x-desktop: 128px;
  --spacing-page-x-mobile:  64px;
  --spacing-gutter-desktop: 80px;
  --spacing-gutter-mobile:  16px;

  --measure-body:           68ch;
  --measure-sidenote:       28ch;
}

/* ---- Mode-driven defaults — applied by [data-mode] on group layout <div> ----
 * Phase 4 stamps these attributes. Phase 1 only writes the CSS contract.
 */
[data-mode="foyer"] {
  background-color: var(--color-foyer-paper);
  color: var(--color-foyer-ink);
}

[data-mode="theater"] {
  background-color: var(--color-theater-ground);
  color: var(--color-theater-ink);
}

/* ---- Base typography ---- */
html {
  font-family: var(--font-sans);
  font-feature-settings: "ss01", "ss02";
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-height: 100dvh;
}

/* ============================================================
 * VIEW TRANSITIONS — Phase 2 owns the keyframes and reduced-motion guard.
 *
 * Phase 2 will add to this file:
 *   ::view-transition-old(root) { animation: ... fade-out; }
 *   ::view-transition-new(root) { animation: ... fade-in; }
 *   ::view-transition-group(site-nav) { animation: none; }
 *   @media (prefers-reduced-motion: reduce) {
 *     ::view-transition-*(*) { animation: none !important; }
 *   }
 * ============================================================ */
```

### 4. `postcss.config.mjs` — Complete Content

```js
// Source: https://tailwindcss.com/docs/installation/using-postcss
// Tailwind v4 requires the SEPARATE @tailwindcss/postcss package as the PostCSS plugin.
// Using `tailwindcss` directly here errors with "trying to use tailwindcss directly as a PostCSS plugin".
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### 5. `tsconfig.json` — Strict Mode Settings

The scaffolder produces a working `tsconfig.json`; verify these keys are present and overwrite if not:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    },
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Strict additions on top of the scaffolder defaults:** `noUncheckedIndexedAccess`, `noImplicitOverride`, `noFallthroughCasesInSwitch`. These match the "TypeScript strict mode" intent of REQ SCAFF-01 more rigorously than the scaffolder's bare `"strict": true`.

### 6. `lib/fonts.ts` — Complete Content

```ts
// Source: https://nextjs.org/docs/app/getting-started/fonts
//         + STACK.md §"Typography (free path)"
//         + ARCHITECTURE.md §5 "Font Cascade"
//
// IMPORTANT — PITFALL A1:
//   adjustFontFallback: true asks Next.js to inject size-adjust / ascent-override
//   metrics into the generated @font-face rule, which neutralizes CLS on first paint.
//   Known intermittent Next.js issue #74134 in 15.x — verify .next/static/css/*.css
//   contains size-adjust rules after first `pnpm build`.
import { Inter, Source_Serif_4 } from "next/font/google";

// Inter at display weights — used for headlines, TitleCard 96px stack, hero copy.
// Inter at 700/800 scores ~90% Söhne Halbfett similarity per Typewolf 2025 index.
export const interDisplay = Inter({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-inter-display",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

// Inter at body weights — used for body, foyer caption metadata, contact form.
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

// Source Serif 4 — used for deks, pull quotes, About long-form lede.
// axes: ['opsz'] is the most-missed integration detail in 2026; without it the
// pull quotes at 32px look mechanically thin.
// preload: false because serif is below the fold on most foyer pages.
export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});
```

### 7. `lib/banned.ts` — 30-Word Banned-Words Constant

```ts
// Source: blueprint §8 top-9 banned words + harness slop-words.txt defaults + research extensions.
// Total: 30 words/phrases. Used by lib/copy-lint.ts (build-time scanner) and harness copy-lint.sh hook.
//
// Conventions:
//   - All entries are lowercase.
//   - Single words match with word-boundary regex (\b...\b).
//   - Multi-word phrases match literally (case-insensitive).
//   - Add new entries here; do not splinter into multiple files.
export const BANNED_WORDS = [
  // Top 9 from blueprint §8
  "unlock",
  "drive",
  "leverage",
  "elevate",
  "synergy",
  "transformative",
  "game-changing",
  "best-in-class",
  "at the intersection of",

  // Harness slop-words.txt defaults (cross-loaded for build-time scanner parity)
  "seamless",
  "seamlessly",
  "cutting-edge",
  "revolutionary",
  "world-class",
  "next-generation",
  "holistic",
  "robust",
  "innovative",
  "dive deep",
  "circle back",
  "low-hanging fruit",
  "move the needle",
  "make an impact",
  "delight users",
  "craft experiences",
  "passionate about",
  "obsessed with",
  "journey",
  "solutions",
  "empower",
] as const;

export type BannedWord = (typeof BANNED_WORDS)[number];
```

### 8. `lib/copy-lint.ts` — Build-Time Scanner Module (Phase 1 scaffold; Phase 2 wires)

```ts
// Source: blueprint §8 voice rules + harness copy-lint.sh + PITFALL E4 (banned-words drift)
//
// Phase 1: Module exists with function exports but is NOT yet invoked at build time.
// Phase 2: instrumentation.ts calls scanContent() during register() per COPY-03.
//
// Usage (Phase 2):
//   import { scanString, scanFile } from "@/lib/copy-lint";
//   const findings = scanString(someText, "app/page.tsx", 1);
//   if (findings.length > 0) { console.error(findings); process.exit(1); }
import { BANNED_WORDS } from "@/lib/banned";

export interface Finding {
  word: string;
  filePath: string;
  line: number;
  column: number;
  excerpt: string;
}

// Build a single compiled regex with case-insensitive flag.
// Single-word entries use word boundaries; multi-word phrases match literally.
function buildPattern(): RegExp {
  const escaped = BANNED_WORDS.map((w) => {
    const escapedWord = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return /\s/.test(w) ? escapedWord : `\\b${escapedWord}\\b`;
  });
  return new RegExp(`(${escaped.join("|")})`, "gi");
}

const BANNED_PATTERN = buildPattern();

/**
 * Scan a single string for banned words. Returns one finding per match.
 *
 * @param text - the content to scan
 * @param filePath - the source file (for reporting)
 * @param lineOffset - the line number where `text` starts in the source file (1-based)
 */
export function scanString(
  text: string,
  filePath: string,
  lineOffset = 1,
): Finding[] {
  const findings: Finding[] = [];
  const lines = text.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    BANNED_PATTERN.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = BANNED_PATTERN.exec(line)) !== null) {
      findings.push({
        word: match[1]!,
        filePath,
        line: lineOffset + i,
        column: match.index + 1,
        excerpt: line.slice(Math.max(0, match.index - 20), match.index + match[1]!.length + 20),
      });
    }
  }

  return findings;
}

/**
 * Format findings as human-readable error output (one line per finding).
 */
export function formatFindings(findings: Finding[]): string {
  return findings
    .map((f) => `${f.filePath}:${f.line}:${f.column} — banned word "${f.word}" in: "...${f.excerpt}..."`)
    .join("\n");
}
```

### 9. `instrumentation.ts` — Scaffold (no-op `register()`)

```ts
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
//
// Phase 1: This file exists with a no-op register() export so the convention is in place.
// Phase 2 (COPY-03): register() will scan content/**/*.mdx + app/**/page.tsx string literals
//                    + metadata exports for banned words using lib/copy-lint.ts and fail the
//                    build with file:line:column on any finding.
//
// Phase 1 leaves this empty deliberately — wiring the scan before the directories exist
// would either no-op (fine) or false-positive on scaffolder content (not fine).
export async function register() {
  // No-op in Phase 1.
}
```

### 10. `app/layout.tsx` — Phase 1 Scope (Fonts + html shell only)

```tsx
// Phase 1 scope: <html> + <body>, fonts attached, default metadata.
//
// PHASE 2 will add to this file (TRANS-01..05, LENIS-01..05, ANALY-01):
//   - <ViewTransition name="root"> wrapping {children} (import from 'react')
//   - <LenisProvider> client component wrapping the ViewTransition
//   - <Analytics /> + <SpeedInsights /> from @vercel/analytics/next and /speed-insights/next
//
// Phase 1 leaves slots empty so Phase 2 can drop them in without restructuring.
import type { Metadata } from "next";
import { interDisplay, inter, sourceSerif } from "@/lib/fonts";
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
      <body>{children}</body>
    </html>
  );
}
```

### 11. `.gitignore` — Complete Content

```gitignore
# Next.js build output
.next/
out/

# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel/

# Visual QA artifacts (harness visual-qa subagent writes here)
qa/current/

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
Desktop.ini

# TypeScript
*.tsbuildinfo
next-env.d.ts.bak
```

### 12. `.claude/brand.json` — House Lights Overrides

```json
{
  "name": "house-lights",
  "domain": "micahjonesconsulting.com",
  "audience": {
    "primary":   "Founders of $5-50M companies who care about how their brand actually looks; and Black HR consultants, doulas, birth workers, and equity practitioners — the people Micah's work serves.",
    "secondary": "Design-engineering peers and potential collaborators."
  },
  "palette": [
    { "id": "foyer-paper",        "value": "#F5EFE4" },
    { "id": "foyer-ink",          "value": "#1A1816" },
    { "id": "foyer-ink-soft",     "value": "#3A3631" },
    { "id": "theater-ground",     "value": "#0D0D0F" },
    { "id": "theater-surface",    "value": "#16161A" },
    { "id": "theater-ink",        "value": "#EAE6DD" },
    { "id": "theater-ink-soft",   "value": "#9C988F" },
    { "id": "accent-copper",      "value": "#C8542B" },
    { "id": "accent-copper-deep", "value": "#8E3A1E" },
    { "id": "ordani-sage",        "value": "#5E7158", "scope": "/work/ordani only" },
    { "id": "rule-foyer",         "value": "#D9D2C4" },
    { "id": "rule-theater",       "value": "#2A2A30" }
  ],
  "typography": {
    "display": { "family": "Inter Display (Inter weight 700-800)", "foundry": "system", "weights": [600, 700, 800], "license": null },
    "body":    { "family": "Inter",                                  "foundry": "system", "weights": [400, 500, 600], "license": null },
    "serif":   { "family": "Source Serif 4",                         "foundry": "system", "weights": [400, 500], "axes": ["opsz"], "license": null },
    "mono":    null
  },
  "voice": {
    "person": "first-singular",
    "sentence_max": 25,
    "banned": [
      "unlock", "drive", "leverage", "elevate", "synergy", "transformative", "game-changing", "best-in-class", "at the intersection of",
      "seamless", "seamlessly", "cutting-edge", "revolutionary", "world-class", "next-generation",
      "holistic", "robust", "innovative", "dive deep", "circle back", "low-hanging fruit",
      "move the needle", "make an impact", "delight users", "craft experiences",
      "passionate about", "obsessed with", "journey", "solutions", "empower"
    ],
    "preferred_verbs": ["build", "ship", "rewrite", "cut", "tune", "bet", "show"]
  },
  "motion": {
    "signature": {
      "id": "title-card",
      "description": "Case-study hero title: 96px Inter Display 700+ pinned vertical word stack, GSAP scroll-resolve to caption + first still cross-fade. ~600ms hold.",
      "files": ["components/TitleCard.tsx", "app/globals.css"]
    },
    "view_transition": {
      "id": "foyer-theater-dim",
      "description": "600ms ease-in-out cross-fade between cream paper and theater ground on foyer↔theater navigation. Reduced-motion kill-switch in app/globals.css.",
      "files": ["app/layout.tsx", "app/globals.css"]
    },
    "banned": [
      "cursor.*follow|MouseFollower",
      "scroll-snap-type:\\s*y\\s+mandatory",
      "marquee|<Marquee",
      "font-mono|font-family:\\s*ui-monospace",
      "syncTouch:\\s*true"
    ]
  },
  "performance": {
    "lcp_ms": 1800,
    "inp_ms": 200,
    "cls": 0.05,
    "lighthouse_min": 95,
    "max_image_kb": 500,
    "audit_url": "http://localhost:3000"
  },
  "pages": ["/", "/work", "/work/[slug]", "/about", "/work-with-me", "/contact"],
  "content": {
    "case_study_framework": ["title-card", "dek", "problem", "why-it-matters", "approach×4", "what-it-became", "outcome", "pull-quote"]
  }
}
```

**Diffs from the harness template:**
- `domain`: `micahjones.work` → `micahjonesconsulting.com`
- `audience`: extended with primary-audience secondary lens (Black HR consultants, doulas, etc.).
- `palette`: replaced 7-color harness palette with the 11-color House Lights palette including `ordani-sage` with `scope` note.
- `typography`: `foundry` flipped from `klim` to `system` so harness `font-license.sh` permits Inter (foundry=system) without a license-lock file. Klim upgrade is v2 path.
- `voice.banned`: expanded from 7 harness words to 30 (blueprint §8 + research extensions).
- `voice.preferred_verbs`: extended with `show` (per blueprint "show the receipts").
- `motion.signature` and `motion.view_transition`: explicit description + file pinning.
- `motion.banned`: added `syncTouch:\\s*true` to block Pitfall D2 regression.
- `pages`: added `/work-with-me`.

### 13. `.claude/CLAUDE.md` — House Lights Overrides

```markdown
# House Lights — project memory

This project uses the **premium-web** Claude Code plugin (installed at `~/Code/premium-web-harness`). Read `.claude/brand.json` before making any UI decision.

## Two modes
- Foyer pages (`app/(foyer)/`) — warm cream paper `#F5EFE4`, ink `#1A1816`. Hospitality feel. Home / About / Work With Me / Contact / Work index.
- Theater pages (`app/(theater)/`) — obsidian ground `#0D0D0F`, bone `#EAE6DD`. Cinematic feel. `/work/[slug]` case studies.
- Mode is route-determined. NO `useTheme()`, NO `<ThemeProvider>`, NO toggle. Group layouts stamp `data-mode="foyer"` or `data-mode="theater"` on a wrapper `<div>`; Tailwind v4 reads the attribute via `[data-mode="..."]` selectors in `app/globals.css`.

## One accent
Copper `#C8542B`. Used everywhere across both modes. One exception: `ordani.sage #5E7158` inside `/work/ordani` only.

**CRITICAL — WCAG AA rule (Pitfall B1):**
- `--accent-copper #C8542B` on `--foyer-paper #F5EFE4` is 3.85:1 → FAILS WCAG AA for normal body text.
- Use `--accent-copper-deep #8E3A1E` (5.4:1, PASS) for body-text emphasis and foyer body link color.
- Plain `--accent-copper` is fine for large text (≥24px), headlines, UI components (buttons, focus rings, dividers), and decorative underlines.

The `design-tokens.sh` hook warns on any other hex literal.

## One signature motion
`<TitleCard />` on case-study hero (Phase 5). Foyer↔theater View Transition (Phase 2). NOTHING ELSE pins, sticks, parallax-scrolls, or follows the cursor without the `motion-engineer` agent's written approval.

`motion-discipline.sh` blocks cursor followers, scroll-jacking, marquees, mono aesthetic, and (Phase 1 addition) `syncTouch: true` on Lenis.

## Stack
- Next.js 16.2.6 (App Router, `experimental.viewTransition: true`, Turbopack)
- React 19.2.6 — `ViewTransition` is imported from `react`, NOT from `next`
- TypeScript strict (including `noUncheckedIndexedAccess`)
- Tailwind CSS v4 — CSS-first `@theme` block in `app/globals.css`; NO `tailwind.config.ts`
- `@tailwindcss/postcss` is a SEPARATE package from `tailwindcss` in v4 — both required
- `next/font/google` for Inter (display + body weights) and Source Serif 4 with `axes: ['opsz']`. NO Klim at v1 (deferred to v2)
- MDX via `@next/mdx`; `mdx-components.tsx` MUST live at REPO ROOT, not inside `app/`
- GSAP 3.15 (free as of 2025) — quarantined to `components/TitleCard.tsx` only. ALL OTHER FILES must not import `gsap`. Pitfall C1: always `'use client'` + `useGSAP` hook
- Lenis 1.3 via `lenis/react` subpath at ROOT layout — NOT in group layouts. `syncTouch: false` is locked (Pitfall D2)
- Resend for transactional contact email
- Supabase for contact archive insert ONLY — server-side service-role key, no client SDK
- Vercel hosting + Analytics + Speed Insights (cookieless, no consent banner needed)

## What not to do
- Do not introduce monospace fonts. Anywhere. `font-license.sh` rejects via `motion-discipline.sh` + bullet in `brand.json.motion.banned`.
- Do not introduce a second accent color. `design-tokens.sh` warns on off-palette hex.
- Do not introduce a second signature motion. `motion-engineer` agent refuses.
- Do not add Framer Motion. Component-level enter/exit uses CSS transitions + `:hover` via Tailwind utilities.
- Do not install `@studio-freight/react-lenis` — retired package. Install `lenis` and import from `lenis/react`.
- Do not set `syncTouch: true` on Lenis — iOS gets native momentum, which is correct.
- Do not import `gsap` outside `components/TitleCard.tsx`.
- Do not write `tailwind.config.ts` — v4 has no JS config.
- Do not put `mdx-components.tsx` inside `app/` — silent render failure.
- Do not add `noindex` to `/work/ordani` "out of abundance of caution" (Pitfall E3). Allow Googlebot; block GPTBot + Google-Extended in `robots.txt`.
- Do not add a dark mode toggle, `next-themes`, or any user-facing mode switcher. Mode is route-based.
- Do not add `/now`, `/uses`, `/colophon`, decision log, BART status, or any other dev-Twitter tell (blueprint §13).
- Do not add a client logo wall, "trusted by" bar, newsletter signup in nav, Calendly link in first volley, or budget dropdown on contact form.
- Do not use stock photography, illustration, icon kits, or 3D. Type and photographs/screenshots only.

## Content
- `content/work/*.mdx` — case studies. Frontmatter required (validated by Zod schema in Phase 7 + harness `mdx-frontmatter.sh`): `title`, `dek`, `role`, `tools[]`, `year`, `status`, `titleCardWords[3-6]`, `hero?`.
- `content/citations.ts` — locked sources (e.g., CDC maternal-mortality statistics for ORDANI). Numbers in case studies render from this object, NOT as literals in prose (Pitfall E2).
- `content/site.ts` — global copy (nav labels, footer copy, positioning sentence).

## Voice
- First person (`I`, never `we` if it's just Micah).
- ≤25 words per sentence on average.
- Specific named numbers (`$150K`, `14 practices`, `91% intake completion`) — never "significant impact."
- Em-dashes capped at one per page (em-dashes are an AI tell).
- 30-word banned list in `.claude/brand.json.voice.banned`. The `copy-lint.sh` hook (write boundary) + `lib/copy-lint.ts` build-time scanner (in `instrumentation.ts`) both reject these. Build fails with `file:line:column` on any finding.

## Definition of done
A page is done when:
1. The signature interactions hold per blueprint §4f (TitleCard pin ~600ms, foyer↔theater dim 600ms ease-in-out).
2. Lighthouse Performance ≥ 95 on mobile; LCP ≤ 1800ms; INP ≤ 200ms; CLS ≤ 0.05.
3. Zero serious/critical axe violations (`a11y-baseline.sh` passes).
4. The foyer-to-theater transition is visible in DevTools Performance panel as a single browser View Transition.
5. Zero banned words across MDX prose, frontmatter, component prop strings, and `metadata` exports.
6. `prefers-reduced-motion: reduce` is honored on TitleCard, View Transitions, Lenis, pull-quote underline-grow, and hover lifts.
7. `prettier --check` passes.

## How to ask for things
- "Make me a foyer page" → the `house-lights-direction` skill fires from the harness.
- "Draft a case study for X" → `/premium case-study x` → `case-study-writer` agent.
- "Audit the build" → `/premium audit`.
- "Ship it" → `/premium ship`.
```

---

## Resend DNS Verification Steps (DEPLOY-02)

**Day-1 imperative:** DNS TXT/MX propagation takes 24–72 hours. Start the clock now, not Day 14.

### Operator-side workflow

1. **Sign up at resend.com** if no account exists (free tier covers expected launch volume of ≤10 contact form submissions/week).
2. **Go to Domains → Add Domain** in the Resend dashboard.
3. **Enter `micahjonesconsulting.com`** and select the send subdomain (Resend defaults to `send.micahjonesconsulting.com` — accept the default).
4. Resend generates the exact DNS records to add at the registrar. The records are unique per Resend account and per domain (the DKIM public key is generated per-account). The general shape is:

   | Type | Host / Name | Value (shape — Resend will provide actual values) |
   |------|-------------|----------------------------------------------------|
   | `TXT` | `send.micahjonesconsulting.com` | `v=spf1 include:amazonses.com ~all` (SPF record allowing Amazon SES, Resend's underlying ESP) |
   | `MX` | `send.micahjonesconsulting.com` | `feedback-smtp.us-east-1.amazonses.com` priority 10 (bounce processing) |
   | `TXT` | `resend._domainkey.micahjonesconsulting.com` | (Long DKIM public key — Resend generates) |
   | `TXT` (optional but recommended) | `_dmarc.micahjonesconsulting.com` | `v=DMARC1; p=none;` (DMARC policy reporting) |

5. **Log in to the domain registrar** (per PROJECT.md context, registrar not yet specified; common: Namecheap, Cloudflare DNS, Google Domains successor Squarespace, Porkbun). For each record:
   - Click **Add new DNS record** in the registrar's DNS panel.
   - Paste the **Host/Name**, **Type**, and **Value** from Resend.
   - Save.
6. **Verify in Resend dashboard:** click "Verify DNS records." Resend rechecks every 5 minutes for up to 72 hours. Status progression: `not_started` → `pending` → `verified` (or `failed` after 72h).
7. **Generate API key:** Once verified, go to **API Keys → Create API Key** in Resend, give it a name (e.g., `micahjonesconsulting-prod`), select scope (sending to verified domains), and copy the key (shown once — store in password manager).
8. **Document the API key name** in the plan for Phase 10 — the key will be set as `RESEND_API_KEY` in Vercel environment variables during DEPLOY-04 (Phase 10). Phase 1 does NOT yet store the key anywhere in the repo; that happens at deploy.

### Sources

- [Resend Managing Domains documentation](https://resend.com/docs/dashboard/domains/introduction) — official process, 72-hour verification window confirmed.
- [Adding and Authenticating a Domain in Resend](https://docs.gravitysmtp.com/adding-and-authenticating-a-domain-in-resend/) — annotated registrar-side workflow.

### Verification commands

After records are added, the operator can verify propagation via terminal (not strictly required, but useful sanity-check):

```bash
# Verify SPF TXT record propagated
dig +short TXT send.micahjonesconsulting.com

# Verify DKIM TXT record propagated
dig +short TXT resend._domainkey.micahjonesconsulting.com

# Verify MX record propagated
dig +short MX send.micahjonesconsulting.com
```

If all three return values within 24h, Resend should detect them on its next 5-minute recheck and flip to `verified`.

---

## Photographer Outreach Checklist (PHOTO-01)

**Day-1 imperative:** Quality Oakland portrait photographers book 1–3 weeks out. Reaching out Day 1 lands the shoot inside the 7-day target window in PHOTO-01.

### Shortlist (5 starting candidates — operator validates fit + reaches out)

| Photographer | Discovery channel | Why a fit | Approx rate signal |
|---|---|---|---|
| **Meika Ejiasi** (@meikaejiasi) | Instagram, identified in 2026 search as "Oakland PhotograpHER" specializing in portrait + lifestyle | Oakland-based; Black photographer; portrait + lifestyle focus matches blueprint §4c "warm-grade color or B&W, natural light, Oakland location" | Within $500–$1,200 likely; confirm via DM |
| **Robert Silver Photography** (robertsilverphotography.com) | Search "Oakland commercial editorial portrait photographer 2026" — Oakland-based award-winning commercial + editorial photographer | Commercial + editorial portfolio appropriate for founder portrait; founded Day One Films 2019 (filmic eye) | Mid-range; portfolio rates typically $800–$2,000 for editorial 2hr; ask for solo-operator quote |
| **Ella Sophie Photography** (ellasophiephoto.com) | Search "Bay Area editorial portrait artist photographer" — Bay-Area-based professional editorial / artist portraits | Editorial / artists portraits aesthetic matches blueprint §4c "treat product stills like film frames" sensibility | Likely $800–$2,000 for editorial 2hr; ask |
| **East Bay Photo Collective referral** (ebpco.org) | Oakland non-profit photo collective; their member directory + community board often surfaces emerging editorial portrait photographers at sub-mid rates | Local community discovery; possible $500–$900 emerging-photographer rates with strong editorial sensibility | $500–$900 likely |
| **Thumbtack / Yelp top-rated Oakland portrait photographer (5-star ≥ 50 reviews)** | thumbtack.com/ca/oakland/portrait-photographers + yelp.com/search?cflt=photographers&find_loc=Oakland%2C+CA | High-volume rated; useful for fallback if first 4 are booked through July | $400–$800 mid-tier; confirm editorial fit before booking |

**Operator action:** Triage to 3 photographers whose portfolio aesthetic genuinely matches blueprint §4c ("warm-grade color or B&W, available light, Oakland window/doorway/workspace" — think Anton & Irene founder portraiture, not LinkedIn headshots). Send the inquiry email below to all 3 the same day.

### Inquiry email template

> **Subject:** Portrait session for solo-operator marketing site — Oakland, 2-hour, $500–$1,200
>
> Hi [Photographer name],
>
> I'm Micah Jones, an Oakland-based product/growth operator and solo founder. I'm building a new marketing site for my consulting practice and ORDANI (a HIPAA-compliant CRM for birth workers I built solo). The site leads with one excellent portrait of me — full-bleed on the home page, vertical column on the About page.
>
> I'm looking for a working portrait photographer in Oakland for a ~2-hour session in the next 7–10 days. The look I'm after is available-light, warm-grade color or B&W, shot at my actual workspace or a window/doorway in Oakland. Think founder portrait in the lineage of Anton & Irene or Aurora James — real person, not LinkedIn headshot.
>
> Budget: $500–$1,200 for the session and final delivery of 2 retouched images (one main vertical portrait, one secondary workspace/desk shot).
>
> I admire [one specific image / project from their portfolio — operator fills in]. If you're available and the brief feels right, what's your turnaround on a session like this?
>
> Thanks,
> Micah
> hello@micahjonesconsulting.com (note: this address may not be active until DNS finishes propagating — fallback: [personal email])

**Notes for the plan:**
- Phase 9 (PHOTO-02..03) integrates the delivered images. If the shoot slips a few days, Phase 9 has buffer because the foyer pages have portrait *slots* (Phase 6) that gracefully render a `bg-foyer-paper` placeholder until the image arrives.
- $500–$1,200 budget is enforced by PROJECT.md key decisions; operator confirms before sending.

### Sources

- [The 10 Best Portrait Photographers in Oakland, CA 2026 — Thumbtack](https://www.thumbtack.com/ca/oakland/portrait-photographers)
- [Best Photographers in Oakland, CA — Yelp 2026](https://www.yelp.com/search?cflt=photographers&find_loc=Oakland%2C+CA)
- [Meika Ejiasi (@meikaejiasi) — Oakland PhotograpHER, Instagram](https://www.instagram.com/meikaejiasi/)
- [Robert Silver Photography — Oakland Commercial Editorial Portrait](https://www.robertsilverphotography.com/)
- [Ella Sophie Photography — Studio portraits, editorial, lifestyle](https://www.ellasophiephoto.com/portraits.html)
- [East Bay Photo Collective](https://www.ebpco.org/)

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact for Phase 1 |
|--------------|------------------|--------------|--------------------|
| `tailwind.config.ts` with `extend.colors` | `@theme { --color-* }` block in `app/globals.css` | Tailwind v4 stable (Jan 2025) | No JS config file at all. |
| `tailwindcss` as PostCSS plugin | `@tailwindcss/postcss` separate package | Tailwind v4 stable (Jan 2025) | First-install footgun — must `pnpm add @tailwindcss/postcss` separately. |
| `<link rel="preload">` for fonts | `next/font/google` auto-handles preload + subsetting + fallback metrics | Next.js 13.2 (2023) | No manual preload tags; trust the framework. |
| `Inter_Display({...})` import | `Inter({weight: ['700','800'], variable: '--font-inter-display'})` | Google Fonts consolidated "Inter Display" into Inter weights ~2023 | Use Inter twice with different `variable` names; same underlying file deduplicates. |
| `@studio-freight/lenis` + `@studio-freight/react-lenis` | `lenis` + import from `lenis/react` | Studio Freight rebranded as Darkroom Engineering (late 2024) | Old packages retired; do not install. |
| `framer-motion` for scroll-pinned animations | GSAP 3.15 with `useGSAP` hook (free as of 2025 thanks to Webflow funding) | GSAP 3.13 release (April 2025) | Free for commercial use. Only used inside TitleCard (Phase 5). |
| Manual `useEffect` cleanup for GSAP ScrollTrigger | `useGSAP(() => {...}, { scope: ref })` auto-revert | `@gsap/react` 2.x (2024) | Phase 1 installs but doesn't yet use; CLAUDE.md documents the pattern. |
| Multiple route-group root layouts | Single root + nested group layouts | Next.js View Transitions guide (2025–2026) | Phase 1 lays down the single root; Phase 4 nests the groups. |
| Cookied analytics (GA4, Mixpanel) | `@vercel/analytics` (cookieless, no banner) | Vercel Analytics GA (2023) | Installed Phase 1, mounted Phase 2 per ANALY-01. |

**Deprecated/outdated (do NOT use):**
- `next-mdx-remote` — `@next/mdx` compiles MDX at build time (faster, simpler, fewer deps).
- `@studio-freight/react-lenis` — retired, see above.
- `tailwind.config.{ts,js,cjs}` — v4 has no JS config.
- `tailwindcss/nesting` plugin — v4 has nesting built in.
- `next-themes` — mode is route-determined, not user-toggleable.
- `framer-motion` for the project's signature motion — GSAP wins for pin-and-resolve.
- Klim self-hosts at v1 — license not budgeted; deferred to v2.
- `smoothTouch: true` in Lenis — replaced by `syncTouch` in 1.0; KEEP `syncTouch: false` (Pitfall D2).

---

## Open Questions

1. **Which DNS registrar is the domain on?**
   - What we know: PROJECT.md confirms domain is `micahjonesconsulting.com`. Registrar not specified.
   - What's unclear: Whether the user already owns the domain at a specific registrar (Namecheap, Cloudflare, Squarespace, Porkbun) or needs to acquire it.
   - Recommendation: Plan should include a Day-1 task that surfaces the registrar to the user. If unowned, user purchases first (15 minutes); then proceed with Resend DNS records. The registrar's DNS panel UI differs but the records are the same.

2. **Does the user already have a Resend account?**
   - What we know: REQ DEPLOY-02 names Resend; PROJECT.md confirms Resend in the stack.
   - What's unclear: Whether the user has an existing Resend account, or needs to sign up Day 1.
   - Recommendation: Plan includes a "Resend account exists OR sign up" branch step. Either way, the domain-add + DNS record flow is identical.

3. **AGENTS.md vs CLAUDE.md — keep both or delete AGENTS.md?**
   - What we know: `--agents-md` scaffolder flag generates both files. The Next.js team's intent is `AGENTS.md` is a Next-specific reference; `CLAUDE.md` is the project-specific Claude memory.
   - What's unclear: Whether keeping both creates contradictions if Next ever updates the AGENTS.md template.
   - Recommendation: Keep both for Phase 1 (no harm). The harness's `.claude/CLAUDE.md` is the authoritative project memory (loaded by `/init`); root `AGENTS.md` is generic Next.js guidance. If a contradiction surfaces in Phase 2+, defer to `.claude/CLAUDE.md`.

4. **Should `lib/copy-lint.ts` also be invoked by a `pnpm prelint` / `pnpm precommit` script in Phase 1?**
   - What we know: ROADMAP places `instrumentation.ts` build-time hook in Phase 2 (COPY-03). Harness `copy-lint.sh` runs at the write boundary.
   - What's unclear: Whether Phase 1 should also wire a `pnpm script` so the scanner runs on `pnpm build` even before `instrumentation.ts` is fully wired in Phase 2.
   - Recommendation: Phase 1 does NOT add a script. Phase 2 owns copy-discipline wiring per ROADMAP. Phase 1 only creates the *files* (`lib/banned.ts`, `lib/copy-lint.ts`, empty `instrumentation.ts`).

5. **Scaffolder's `app/page.tsx` — delete or stub?**
   - What we know: `pnpm create next-app` generates `app/page.tsx` rendering a "Welcome to Next.js" demo.
   - What's unclear: Phase 4 (FOYER-01) creates `app/(foyer)/page.tsx` as the home, which conflicts with the existing `app/page.tsx` (both resolve to `/`).
   - Recommendation: Phase 1 DELETES `app/page.tsx` outright. Visiting `/` will 404 between Phase 1 and Phase 4, which is fine (no users yet). Alternative: stub it to return `null` and a comment "Phase 4 moves this into the (foyer) route group" — but deletion is cleaner.

---

## Validation Architecture

Skipped per `.planning/config.json` — `workflow.nyquist_validation` is not set (config has only `research/plan_check/verifier/auto_advance` flags). Phase verification is handled by the gsd-verifier subagent at phase completion, not by a per-task Nyquist test harness. If validation infrastructure is added in a later phase, this section can be retrofitted.

---

## Sources

### Primary (HIGH confidence)

- [Next.js `create-next-app` CLI reference (2026-05-13)](https://nextjs.org/docs/app/api-reference/cli/create-next-app) — all flag definitions verified for 16.2.6
- [Next.js `viewTransition` config (2026-05-13)](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition) — `experimental.viewTransition: true`
- [Next.js MDX guide (2026-05-13)](https://nextjs.org/docs/app/guides/mdx) — `withMDX()` wrapper + `pageExtensions`
- [Next.js Font Optimization docs](https://nextjs.org/docs/app/getting-started/fonts) — `next/font/google` API + `axes` + `adjustFontFallback`
- [Next.js `instrumentation.ts` file convention](https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation) — `register()` export shape
- [Tailwind CSS v4 PostCSS install docs](https://tailwindcss.com/docs/installation/using-postcss) — `@tailwindcss/postcss` separate package + exact `postcss.config.mjs`
- [Tailwind v4 Theme Variables](https://tailwindcss.com/docs/theme) — `@theme` directive + utility class generation
- [GitHub: vercel/next.js Discussion #77337](https://github.com/vercel/next.js/discussions/77337) — `next/font` CSS variable redeclaration requirement in Tailwind v4
- [Resend Managing Domains documentation](https://resend.com/docs/dashboard/domains/introduction) — DNS verification flow + 72h timeline
- Project-internal: `C:/Users/micah/Code/micahjonesconsulting/.planning/research/STACK.md` (584 lines, all version + integration gotchas)
- Project-internal: `C:/Users/micah/Code/micahjonesconsulting/.planning/research/ARCHITECTURE.md` (14 sections, directory + layout strategy + font cascade)
- Project-internal: `C:/Users/micah/Code/micahjonesconsulting/.planning/research/PITFALLS.md` (1126 lines, all 24 pitfalls + harness coverage map)
- Project-internal: `C:/Users/micah/Code/micahjonesconsulting/.planning/blueprint.md` (verbatim source-of-truth, esp. §4a–§4f color + typography + motion + grid)
- Harness template at `C:/Users/micah/Code/premium-web-harness/plugins/vertical-plugins/premium-web/templates/.claude/brand.json` — base shape that House Lights extends
- Harness template at `C:/Users/micah/Code/premium-web-harness/plugins/vertical-plugins/premium-web/templates/.claude/CLAUDE.md` — base shape that House Lights extends

### Secondary (MEDIUM confidence)

- [Build with Matija — Google Fonts in Next.js 15 + Tailwind v4](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) — confirms `@theme` re-declaration pattern
- [DmarcDkim.com Resend SPF/DKIM/DMARC step-by-step](https://dmarcdkim.com/setup/how-to-setup-resend-spf-dkim-and-dmarc-records) — Resend DNS record shape examples (registrar-side annotated workflow)
- [Adding and Authenticating a Domain in Resend — Gravity SMTP docs](https://docs.gravitysmtp.com/adding-and-authenticating-a-domain-in-resend/) — registrar-side workflow walkthrough

### Tertiary (LOW confidence — needs operator validation)

- Photographer shortlist entries — Meika Ejiasi confirmed Oakland-based portrait photographer (Instagram search). Robert Silver, Ella Sophie, and East Bay Photo Collective verified via 2026 Oakland portrait-photographer search results, but individual portfolio fit + current availability + actual rate ranges must be confirmed by the operator before booking. Thumbtack / Yelp top-rated entries are placeholders — the operator should triage to 3 actual portfolio links matching blueprint §4c aesthetic.

---

## Metadata

**Confidence breakdown:**
- Scaffold command sequence: HIGH — verified against current Next.js 16.2.6 docs (2026-05-13).
- Stack versions + install commands: HIGH — verified against `.planning/research/STACK.md` (which was itself verified against npm registry 2026-05-14).
- `next.config.ts`, `postcss.config.mjs`, `app/globals.css`, `lib/fonts.ts`, `tsconfig.json` contents: HIGH — synthesized from official docs + research files; all `Source:` URLs cited inline.
- `.claude/brand.json` + `.claude/CLAUDE.md` overrides: HIGH — derived from existing harness templates + project requirements; tested against existing PROJECT.md + blueprint §12.
- WCAG copper-on-cream rule: HIGH — direct mathematical contrast calculation (3.85:1 vs 5.4:1), confirmed in PITFALLS.md B1.
- `lib/banned.ts` 30-word list: HIGH — blueprint §8 top-9 + harness slop-words.txt + research extensions, all cited.
- Resend DNS verification flow: MEDIUM-HIGH — official Resend docs confirm 72h window and TXT/MX record shape; exact values are user-account-specific and generated by Resend dashboard at Add-Domain time. Phase 1 plan should treat the dashboard-generated values as authoritative.
- Photographer shortlist: LOW-MEDIUM — surfaced via 2026 search results; final fit and availability requires operator validation.

**Research date:** 2026-05-14
**Valid until:** 2026-06-14 (30 days, stable scaffold/stack) — re-verify Next.js patch version + Tailwind v4 minor if Phase 1 hasn't executed by then.
