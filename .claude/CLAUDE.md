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

**One FIGURE animation exists and is not a third signature** (`motion.figure` in
`brand.json`): `<WallChart />` in the `/playbook` hero draws the book's own page-6 diagram
once on load. The motion-engineer approved it in writing 2026-09-01 on the reading that it is
the artifact playing, not the site responding to the visitor: it runs once, terminates, and
never couples to scroll, hover or focus. Granted an explicit exception to the DESIGN_BAR R15
400ms entrance cap on that basis. Conditions: `/playbook` only, base CSS is the finished
frame, motion layered on only at ≥900px with no reduced-motion preference. It replaced an
AI-generated "vibe coding factory" video loop the operator asked for, which was declined under
R12 (AI-generated imagery, named) and the illustration ban above. A second animated figure
would be the second-signature line; the answer there is no.

`motion-discipline.sh` blocks cursor followers, scroll-jacking, marquees, mono aesthetic, and (Phase 1 addition) `syncTouch: true` on Lenis.

## Model routing — reset 2026-09-04
Operator ruling, 2026-09-04, verbatim: "leave the main model on fable 5.1 ultracode but us
opus as subagents for majority of the work ... having fable guide all other models doing the
grunt work."

So: **Fable 5.1 is the main model and stays there.** It rules, writes briefs, and judges at
the named checkpoints. It does not run build, deploy, playwright or screenshot loops.
**Opus is the default subagent** (`CLAUDE_CODE_SUBAGENT_MODEL=opus` in
`.claude/settings.json`, overriding the user-global `sonnet`) and does the majority of the
work: execution briefs, verification, sweeps, research legs. Still name `model:` on every
Agent and Workflow call: `opus` for execution and verification, `sonnet`/`haiku` only for
trivial lookups, `fable` never from a subagent (the main model IS Fable; fan-out inheriting
Fable is what ended the 5-hour window). What Fable caught on this repo and why it stays on
top: the services-page rebuild, the popularity-badge claim, the title-card timing bug.

Full policy: `C:/Users/micah/.claude/MODEL_ROUTING.md`. The arc shape below is unchanged.

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
- GSAP 3.15 (free as of 2025) — quarantined to `components/TitleCard.tsx` only. ALL OTHER FILES must not import `gsap`. Pitfall C1: always `'use client'` + `useGSAP` hook
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
- Do not import `gsap` outside `components/TitleCard.tsx`.
- Do not write `tailwind.config.ts` — v4 has no JS config.
- Do not put `mdx-components.tsx` inside `app/` — silent render failure.
- Do not add `noindex` to `/work/ordani` "out of abundance of caution" (Pitfall E3). `robots.txt` deliberately allows ALL crawlers including the AI bots — `app/robots.ts` reasons it in its header — so do not "fix" it to block them without an operator ruling. (Prose corrected 2026-09-04 to match live code; the block it used to describe never shipped.)
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
