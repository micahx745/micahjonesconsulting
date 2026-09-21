# House Lights — project memory

This project uses the **premium-web** Claude Code plugin (installed at `~/Code/premium-web-harness`). Read `.claude/brand.json` before making any UI decision.

## Pass-122 amendment — the rules on trial (operator 2026-09-18)
The operator rejected Pass-121 on sight and put the design rules below on trial; he ruled on each by
popup for the **Kinetic Editorial** direction (LESSONS #3 "PASS-122 DIRECTION AND THE DEMO PIECE" and
"PASS-122 RULES ON TRIAL"; `docs/DESIGN_BAR.md` R1, R4, R9, R12, R13, R15 carry the dated rulings).
Where a section below says otherwise, THIS amendment wins:
- **SCOPE (operator 2026-09-18, same day, LESSONS #3 "PASS-122 SCOPE"):** "i didnt want to change the
  entire site. I wanted to take the best themes from these designs and incoporate them in our existing
  theme." The existing theme stays (structure, pages, Color Worlds home, cream/ink/copper, Bricolage,
  Hanken, Mono labels). Kinetic Editorial is a source of themes; the rulings below are permissions used
  INSIDE that theme. The display-face test is withdrawn; the style-tile palette is not adopted.
- **Motion:** the one-signature limit and the 400ms entrance cap are lifted for scroll-driven type: type
  and numbers may move with the scroll, a section may hold while its number assembles. Still banned:
  cursor followers, scroll that changes speed, marquees, idle loops. Reduced motion gets the finished frame.
- **Counters:** one hero number per page or section may assemble once; the number is in the server HTML.
- **Colour:** poster grounds, one full-bleed ground per section, ONE accent per screen, drawn from the
  EXISTING palette (scope ruling). No gradients, purple or glow.
- **Type:** Bricolage stays (the face test was withdrawn by the scope ruling); Hanken body, Mono labels.
- **Imagery:** real photos, screen recordings, charts of real numbers, and animated versions of the
  operator's own real working photos (no captions). Still out: stock, AI illustration, icons, 3D scenes.
  The 2026-09-18 hold on box-and-arrow diagrams of the work stands.
- **Logos and quotes:** allowed only if real, each approved and ledgered before it renders.
- **Not on trial:** facts, copy, voice rules, the banned list, the em-dash cap.
- **Enforcement still to move:** `brand.json.palette` (the design-tokens allow-list) when the palette is
  picked; `scripts/gsap-quarantine-gate.mjs` only if the build brief picks GSAP over CSS scroll-driven
  animation. The plugin hooks (`motion-discipline.sh`, `design-tokens.sh`) already ban only what stays banned.

## Two modes
- Foyer pages (`app/(foyer)/`) — paper `--color-foyer-paper #F5EFE4`, ink `#1A1816`. Hospitality feel. Home / About / Work With Me / Contact / Work index.
- Theater pages (`app/(theater)/`) — `/work/[slug]` case studies. Each opens on a dark band (`--color-theater-ground #12100E`, type in `--color-theater-ink #ECE3D0`) that names the client and the result, then turns on one copper rule (sage on `/work/ordani`) to bone paper `#ECE3D0` (`--color-cw-bone`) for the body and the footer. Pass-120; the earlier all-obsidian study is retired.
- Mode is route-determined. NO `useTheme()`, NO `<ThemeProvider>`, NO toggle. Group layouts stamp `data-mode="foyer"` or `data-mode="theater"` on a wrapper `<div>`; Tailwind v4 reads the attribute via `[data-mode="..."]` selectors in `app/globals.css`.

## One accent
Copper `#bd5a2d` ("leathered amber", shifted from the original #C8542B in Tier H, `40b97a6`; the docs kept
the old hex until the operator ruled on 2026-09-19, LESSONS #3 "COPPER IS #bd5a2d"). Used everywhere across
both modes. One exception: `ordani.sage #5E7158` inside `/work/ordani` only.

**CRITICAL — WCAG AA rule (Pitfall B1):**
- `--accent-copper #bd5a2d` on `--foyer-paper #F5EFE4` is 3.93:1 → FAILS WCAG AA for normal body text.
- Use `--accent-copper-deep #8a3d24` (6.62:1 on paper, PASS) for body-text emphasis and foyer body link color.
- Plain `--accent-copper` is fine for large text (≥24px), headlines, UI components (buttons, focus rings, dividers), and decorative underlines.

The `design-tokens.sh` hook warns on any other hex literal.

## One signature motion
`<TitleCard />`: a 600ms settle entrance on the case-study hero, which names the client and the result. Foyer↔theater View Transition (Phase 2): a 900ms dim. NOTHING ELSE pins, sticks, parallax-scrolls, or follows the cursor without the `motion-engineer` agent's written approval.

**SUPERSEDED (Pass-122, operator 2026-09-18, LESSONS #3 "PASS-122 RECEIPTS V2 LOCKED" and "PASS-122 PUSH APPROVED, WITH FIXES"): two figure animations are now mounted, both inside the existing theme: the home receipts section ($20M+ with the Tel Aviv clip inside the numerals once, then a copper settle; the four exits as a scroll-driven scoreboard) and the /work study figures (each copper poster assembles once, weight 200 to 800). Read the two paragraphs below as history.** **No figure animation is mounted.** The one that existed, `<WallChart />` in the `/playbook` hero, left with the book in Pass-112 (operator 2026-09-11: the book is not shown on the site yet). `motion.figure` in `brand.json` stays as the record of the 2026-09-01 approval. A new animated figure is the second-signature line; the answer there is no.

**RETIRED (Pass-122, operator 2026-09-18, LESSONS #3 "PASS-122 RECEIPTS V2 LOCKED" and "PASS-122 PUSH APPROVED, WITH FIXES"): the count-up and its hand circle are gone; the clip arrival replaced them.** **One recorded count-up exception** (`motion.countup` in `brand.json`): the home `$20M+` figure counts once and its circle draws in after it, 2.65s total, on `/` only, skipped under reduced motion, finished frame without JS. Operator override of R13 and R15 on 2026-09-11 (decision 4), against the harness's recommendation to keep it static. It is not a second signature and not a precedent; the motion-engineer's standing answer to any further animated figure or counter remains no.

`motion-discipline.sh` blocks cursor followers, scroll-jacking, marquees, mono aesthetic, and (Phase 1 addition) `syncTouch: true` on Lenis.

## Model routing (full table, ids, commands, rules and history: `.claude/AI_ROUTING.md`)
Operator 2026-09-21: use DeepSeek, ChatGPT and Gemini a lot to cut Claude usage; Fable, Astra and DeepSeek
confirm quality. So, by default:
- Reading, sweeps, summaries: DeepSeek (`scripts/deepseek-exec.ps1`, `-MaxTokens 32000+`), Gemini as fallback.
- Drafting copy: two families in parallel, `deepseek-v4-pro` and Sol (`codex-exec.ps1 -Review -Model gpt-5.6-sol`).
- Builds, captures, fix rounds: Sol (`codex-exec.ps1 -Task`), GLM when up; a Sonnet subagent only for Chrome or
  session context.
- Quality at every design or copy checkpoint: Fable (one call) AND Astra (`codex-exec.ps1 -Review`) AND
  `deepseek-v4-pro`. When they split, the operator gets each pick by name.
- Claude (this session) keeps: the LESSONS #3 ledger check, ship calls, briefs, rulings, commits, and any copy with
  non-ASCII characters (LESSONS #46).
- Every Agent/Workflow names its model; every checkpoint and copy/design commit carries a `LEGS:` stamp;
  `get_usage` before any Claude fan-out; at 75% weekly, Claude narrows to ledger, ship and taste.

**Arc shape (MODEL_ROUTING §6).** A top tier's value is the ruling, not the loop that
implements it. An audit of the 2026-09-01 Fable session found 9 of 320 turns were decisions
no command could settle; the other 311 were execution. So a Fable segment ends by writing
`.claude/briefs/<pass>-<slug>.md` and committing it, not by starting the build. See
`.claude/briefs/README.md` for the required contents. Budget: 15 top-tier tool calls per arc,
read-only shell free, no build/deploy/screenshot loops. Three checkpoints bring Fable back
per page arc: first preview at 390 and 1440, copy checked against the LESSONS #3 ledger by
`curl -s | grep` rather than screenshot, and one buyer read at the ship gate.

## Stack
- Next.js 16.2.6 (App Router, `experimental.viewTransition: true`, Turbopack)
- React 19.2.6 — `ViewTransition` is imported from `react`, NOT from `next`
- TypeScript strict (including `noUncheckedIndexedAccess`)
- Tailwind CSS v4 — CSS-first `@theme` block in `app/globals.css`; NO `tailwind.config.ts`
- `@tailwindcss/postcss` is a SEPARATE package from `tailwindcss` in v4 — both required
- `next/font/google` — three faces, the Color Worlds system (Pass-37): Bricolage Grotesque (display, `opsz`), Hanken Grotesk (body), JetBrains Mono (labels, § codes, data — the DESIGN_BAR R1 "narrow third" only, never body or headings). `lib/fonts.ts` is the source of truth. Inter and Source Serif 4 are gone; do not reintroduce them. (Prose corrected 2026-09-04 to match live code.)
- MDX via `@next/mdx`; `mdx-components.tsx` MUST live at REPO ROOT, not inside `app/`
- GSAP 3.15 (free as of 2025) — one importer, `components/color-worlds/SplitReveal.tsx`, the recorded Pass-111a exception. `components/TitleCard.tsx` imports no GSAP since Pass-120: the settle entrance is CSS (`cs-settle` in `app/globals.css`). No other file may import `gsap`; `scripts/gsap-quarantine-gate.mjs` enforces it. Pitfall C1 still applies to SplitReveal: `'use client'` + the `useGSAP` hook.
- Lenis 1.3 via `lenis/react` subpath at ROOT layout — NOT in group layouts. `syncTouch: false` is locked (Pitfall D2)
- Resend for transactional contact email
- Supabase for contact archive insert ONLY — server-side service-role key, no client SDK
- Vercel hosting + Analytics + Speed Insights (cookieless, no consent banner needed)

## What not to do
- Do not use monospace for anything beyond labels, § codes and data. JetBrains Mono is the cleared R1 "narrow third" (`app/layout.tsx`, Pass-37). Mono body copy, mono headings, or a terminal aesthetic remain banned; `motion-discipline.sh` + `brand.json.motion.banned` enforce that. (Prose corrected 2026-09-04; an external review called the font a violation, and it is not.)
- Do not introduce a second accent color. `design-tokens.sh` warns on off-palette hex.
- Do not introduce a second signature motion. `motion-engineer` agent refuses.
- Do not add Framer Motion. Component-level enter/exit uses CSS transitions + `:hover` via Tailwind utilities.
- Do not install `@studio-freight/react-lenis` — retired package. Install `lenis` and import from `lenis/react`.
- Do not set `syncTouch: true` on Lenis — iOS gets native momentum, which is correct.
- Do not import `gsap` anywhere. The one importer is `components/color-worlds/SplitReveal.tsx`, a recorded exception (Pass-111a), not a precedent; `components/TitleCard.tsx` gave up its import in Pass-120. Enforced by `scripts/gsap-quarantine-gate.mjs`, whose allow-list names SplitReveal only.
- Do not write `tailwind.config.ts` — v4 has no JS config.
- Do not put `mdx-components.tsx` inside `app/` — silent render failure.
- Do not add `noindex` to `/work/ordani` "out of abundance of caution" (Pitfall E3). `robots.txt` deliberately allows ALL crawlers including the AI bots — `app/robots.ts` reasons it in its header — so do not "fix" it to block them without an operator ruling. (Prose corrected 2026-09-04 to match live code; the block it used to describe never shipped.)
- Do not add a dark mode toggle, `next-themes`, or any user-facing mode switcher. Mode is route-based.
- Do not add `/now`, `/uses`, `/colophon`, decision log, BART status, or any other dev-Twitter tell (blueprint §13).
- Do not add a client logo wall, "trusted by" bar, newsletter signup in nav, Calendly link in first volley, or budget dropdown on contact form.
- Do not use stock photography, illustration, icon kits, or 3D. Type and photographs/screenshots only.

## Content
- `content/work/*.mdx` — case studies. Frontmatter is validated by the Zod schema in `lib/case-study-schema.ts` and by the harness hook `mdx-frontmatter.sh`, which requires `title`, `dek`, `status`. Published studies require `title`, `titleLines`, `description`, `dek`, `client`, `clientNameProtected`, `atAGlance`, `results`, `entry`, `service`, `publishedAt`, `status`, `order`, `hero?`. Stubs (`status: stub`) carry `title`, `dek`, `status` only.
- `content/citations.ts` — locked sources. ORDANI's CDC maternal-mortality figures render from `ORDANI_CDC_2024.FIGURES` in this file, NOT as literals in prose (Pitfall E2).
- `content/site.ts` — global copy (nav labels, footer copy, positioning sentence).

## Voice
- First person (`I`, never `we` if it's just Micah).
- ≤25 words per sentence on average.
- Specific named numbers (`$150K`, `14 practices`, `91% intake completion`) — never "significant impact."
- Em-dashes capped at one per page (em-dashes are an AI tell).
- 30-word banned list in `.claude/brand.json.voice.banned`. The `copy-lint.sh` hook (write boundary) + `lib/copy-lint.ts` build-time scanner (in `instrumentation.ts`) both reject these. Build fails with `file:line:column` on any finding.

### Enforcement (Phase 2)

The voice rules above are enforced in two layers:

**Automated (Phase 2 — `lib/copy-lint-runner.ts` + `instrumentation.ts`):**
- 30 banned words rejected at `pnpm build` with `file:line:column` reporting.
- Scope: `content/**/*.{mdx,md,ts}` and `app/**/*.{tsx,ts}`.
- Gated to `NEXT_PHASE === 'phase-production-build'` — does NOT run on `next dev`.
- Plus the write-boundary `copy-lint.sh` harness hook catches violations on save.

**Manual subagent (every prose-touching PR — `copy-editor` subagent):**
- **COPY-04** Sentence length cap: average ≤25 words. Sentences over 35 words rewritten.
- **COPY-04** First person locked: `I`, `me`, `my`. The word `we` rejected unless plural truly applies (rare — Micah is solo).
- **COPY-04** Active voice required. Passive constructions ("was built", "is being shipped") rewritten unless documenting outcomes ("Acquired by Salesforce for $27.7 billion" stays passive — that's a fact, not voice).
- **COPY-04** Named numbers required. `$150K`, `14 practices`, `91% intake completion` — never "significant impact", "meaningful results", "growth metrics."
- **COPY-05** Em-dashes capped at ONE per page. Em-dashes (—) are an AI tell. The copy-editor subagent counts `—` occurrences per file; >1 triggers a rewrite request unless the writer can defend each one.

The `copy-editor` subagent runs on every PR that touches `content/**/*.mdx`, `app/**/*.tsx` containing visible prose, or `.claude/CLAUDE.md`. It does not run on code-only PRs (component logic, config, types).

**Subagent invocation:** `/premium audit` triggers the copy-editor pass alongside the design-director, motion-engineer, perf-auditor, a11y-reviewer, case-study-writer, and visual-qa subagents. The audit gate blocks production deploy on copy-editor failure.

## Portrait swap (when real photos arrive)

`components/PortraitImage.tsx` is mounted on `/about` and renders NOTHING until a
real file exists. The operator flow is a file drop plus a build:

1. Save the portrait as `public/portrait-context.jpg` (or `.jpeg`/`.png` — all
   three are checked). 2x retina, 4:5 vertical, ~900x1125 or larger. Keep the
   source under 500KB by convention; nothing enforces it in this repo (the
   `image-budget.sh` hook is unwired). Pass-59 correction: `.claude/settings.json`
   DOES exist — it carries the playbook check.py PostToolUse hook plus this
   project's permission rules. It just never wired image-budget.sh.
2. `pnpm build` — the two-column `/about` intro activates automatically (the CSS
   uses `:has(.cw-portrait)`, so no portrait means no layout change).
3. Ship per STANDING_TECHNIQUES CARD 1.

`portrait-main.jpg` is a reserved second variant that is NOT mounted on any page
yet — mount it somewhere before dropping that file in. See `public/README.md`.

Rewritten 2026-08-15. What changed and why:
- The component previously had NO importer at all, so the documented drop-in flow
  would have done nothing. It is now actually wired.
- The placeholder branch (a large "MJ" monogram poster standing in for a face) was
  deleted along with `scripts/generate-placeholders.mjs` and the two placeholder
  PNGs. A stand-in for a human face on the page where a buyer looks for the human
  reads as unfinished; an empty column is the more honest interim state.

## Definition of done
A page is done when:
1. The signature interactions hold (TitleCard settle entrance 600ms, foyer↔theater dim 900ms ease-in-out).
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
