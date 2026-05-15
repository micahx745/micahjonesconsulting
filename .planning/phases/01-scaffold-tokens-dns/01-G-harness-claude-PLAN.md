---
phase: 01-scaffold-tokens-dns
plan: G
type: execute
wave: 2
depends_on:
  - A
files_modified:
  - .claude/brand.json
  - .claude/CLAUDE.md
autonomous: true
requirements:
  - SCAFF-07
  - HARN-01
  - HARN-02
  - HARN-03
must_haves:
  truths:
    - "`.claude/brand.json` exists with the 11-color House Lights palette, system-foundry typography (so harness `font-license.sh` permits Inter without a license-lock file), 30-entry voice-banned list, motion signature ('title-card'), motion view_transition ('foyer-theater-dim'), and motion banned patterns including `syncTouch:\\s*true` regex (Pitfall D2 regression block)."
    - "`.claude/CLAUDE.md` exists with House Lights project memory: two-mode contract (route-determined, NO useTheme/ThemeProvider/toggle), single accent (copper + deep variant per Pitfall B1), single signature motion (TitleCard + foyer↔theater dim), full stack lockdown (Next 16.2.6 / React 19.2.6 / TS strict / Tailwind v4 / GSAP quarantined / Lenis syncTouch:false / Resend / Supabase service-role-only), explicit DO-NOT list (no monospace / no Framer Motion / no @studio-freight / no syncTouch:true / no gsap outside TitleCard / no tailwind.config.ts / no mdx-components.tsx inside app/ / no dark-mode toggle / no /now /uses /colophon / no logo wall / no Calendly in first volley / no stock photography), content contract (content/work/*.mdx + content/citations.ts + content/site.ts), voice rules (first-person, ≤25 word sentences, named numbers, ≤1 em-dash per page, 30-word banned list), Definition of Done (7 criteria including TitleCard ~600ms pin / Lighthouse ≥95 / zero axe / View Transition visible in DevTools / zero banned words / prefers-reduced-motion honored / prettier --check)."
    - "Both `.claude/brand.json` and `.claude/CLAUDE.md` connect the project to the locally-installed `premium-web` harness at `~/Code/premium-web-harness` — no `package.json` dependency needed; the plugin reads project-specific config from these two files at PR review time."
    - "SCAFF-07 (project CLAUDE.md captures stack rules, single-accent rule, single-motion rule, mode-by-route rule, banned-words discipline) is satisfied by `.claude/CLAUDE.md` — there is no separate top-level project CLAUDE.md; the harness convention is to put the project memory inside `.claude/CLAUDE.md` for harness PR-review consumption."
  artifacts:
    - path: ".claude/brand.json"
      provides: "House Lights brand config consumed by harness hooks + subagents"
      contains: "house-lights"
      min_lines: 50
    - path: ".claude/CLAUDE.md"
      provides: "House Lights project memory + harness instructions + Do-Not list"
      contains: "House Lights"
      min_lines: 80
  key_links:
    - from: ".claude/brand.json palette"
      to: "app/globals.css @theme block (Plan C)"
      via: "matching 11 hex values"
      pattern: "F5EFE4"
    - from: ".claude/brand.json voice.banned"
      to: "lib/banned.ts (Plan F)"
      via: "30-entry list mirrored — both must stay in sync if banned words evolve"
      pattern: "unlock.*drive.*leverage"
    - from: ".claude/brand.json motion.banned"
      to: "harness motion-discipline.sh hook"
      via: "regex patterns block syncTouch:true, font-mono, cursor followers, marquee, scroll-snap-y-mandatory at write boundary"
      pattern: "syncTouch:\\\\s\\*true"
    - from: ".claude/CLAUDE.md DO-NOT list"
      to: "harness PR review subagents (design-director, copy-editor, motion-engineer, perf-auditor, a11y-reviewer)"
      via: "agent-readable house rules"
      pattern: "Do not"
---

<objective>
Create `.claude/brand.json` and `.claude/CLAUDE.md` containing the House Lights brand configuration and project memory. These two files are the connection point between this project and the locally-installed `premium-web` harness at `~/Code/premium-web-harness/`. The harness's 8 hooks and 5 plugin MCPs read these files at PR-review time to enforce single-accent / single-motion / mode-by-route / banned-words discipline.

Purpose: Four requirements covered in one plan:
- SCAFF-07: Project CLAUDE.md captures stack rules, single-accent rule, single-motion rule, mode-by-route rule, banned-words discipline → satisfied by `.claude/CLAUDE.md` (harness convention).
- HARN-01: `.claude/brand.json` exists with House Lights overrides → exact content per RESEARCH §12.
- HARN-02: `.claude/CLAUDE.md` exists with project-specific overrides → exact content per RESEARCH §13.
- HARN-03: Project connects to the locally-installed `premium-web` plugin marketplace at `~/Code/premium-web-harness/` → satisfied by the mere existence of `.claude/brand.json` + `.claude/CLAUDE.md` (no `package.json` dep).

Output: Two configuration files that the harness's hooks and PR-review subagents will consume to keep every future PR aligned with the blueprint.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/01-scaffold-tokens-dns/01-RESEARCH.md
@.planning/blueprint.md
@.planning/PROJECT.md

**SCAFF-07 vs HARN-02 resolution:**
SCAFF-07 says "Project CLAUDE.md captures stack rules, single-accent rule, single-motion rule, mode-by-route rule, banned-words discipline." HARN-02 says "Project `.claude/CLAUDE.md` exists; populated from harness template + project-specific overrides." These describe the SAME file. The harness convention puts project memory at `.claude/CLAUDE.md` (read by harness hooks + harness PR-review subagents), NOT at top-level `CLAUDE.md` (which the scaffolder produces and which we leave as a Next.js-specific reference). Plan A's scaffolder created a top-level `CLAUDE.md` from the `--agents-md` flag; we leave that as a Next-specific generic reference. The authoritative project memory lives at `.claude/CLAUDE.md`.

**Plan G writes the harness-connection layer.** The harness is already installed at `~/Code/premium-web-harness/`. HARN-03 is "Project depends on the locally-installed `premium-web` plugin marketplace" — this is not a `package.json` dependency. The plugin's hooks read `.claude/brand.json` + `.claude/CLAUDE.md` at PR-review time via the harness's user-level `.claude/settings.json` (configured outside this project). By creating the two project-level files, Plan G satisfies HARN-03.

**Hex value cross-check:**
The 11 hex values in `.claude/brand.json` palette MUST match the 11 hex values in `app/globals.css` (Plan C) exactly. Plan C writes the canonical CSS; Plan G mirrors them in JSON for harness consumption.

**Banned-words list cross-check:**
The 30 entries in `.claude/brand.json.voice.banned` MUST match `lib/banned.ts` (Plan F) exactly. Plan F writes the canonical TypeScript const; Plan G mirrors them in JSON for harness `copy-lint.sh` hook consumption.

**Motion.banned regex patterns (RESEARCH §12 + PROJECT.md Pitfall D2):**
Five patterns block writeboundary regression of:
- `cursor.*follow|MouseFollower` — blocks cursor followers (blueprint §13)
- `scroll-snap-type:\\s*y\\s+mandatory` — blocks scroll-jacking
- `marquee|<Marquee` — blocks marquees
- `font-mono|font-family:\\s*ui-monospace` — blocks monospace fonts (blueprint §13)
- `syncTouch:\\s*true` — blocks Lenis Pitfall D2 regression

**Pages array:**
`["/", "/work", "/work/[slug]", "/about", "/work-with-me", "/contact"]` — exactly the 5-page IA from blueprint §6 (6 entries because Work index + Case Study template are listed separately).

**The harness brand.json shape comes from the template at `C:/Users/micah/Code/premium-web-harness/plugins/vertical-plugins/premium-web/templates/.claude/brand.json`** — extended with House Lights overrides per RESEARCH §12 "Diffs from the harness template" section.
</context>

<tasks>

<task type="auto">
  <name>Task G1: Create .claude/ directory + .claude/brand.json with House Lights config</name>
  <files>
    .claude/brand.json
  </files>
  <action>
Create the `.claude/` directory at repo root, then create `C:/Users/micah/Code/micahjonesconsulting/.claude/brand.json` with the EXACT content from RESEARCH.md §12 "`.claude/brand.json` — House Lights Overrides".

Final file content (write verbatim from RESEARCH.md §12):

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

**Critical writing rules:**
- All 11 hex values MUST match `app/globals.css` (Plan C) exactly.
- All 30 banned-words entries MUST match `lib/banned.ts` (Plan F) exactly.
- `typography.*.foundry` MUST be `"system"` (not `"klim"`) so harness `font-license.sh` permits Inter without a license-lock file. Klim upgrade is v2.
- `typography.mono` MUST be `null` (blueprint §4a + §13 bans monospace).
- `motion.banned` MUST include `"syncTouch:\\s*true"` (Pitfall D2 regression block).
- `palette[].scope` field is only present on the `ordani-sage` entry.
- The JSON must be valid (parseable) — no trailing commas, balanced braces/brackets.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && test -d .claude && test -f .claude/brand.json && node -e "JSON.parse(require('fs').readFileSync('.claude/brand.json','utf8'))" && grep -q "\"name\": \"house-lights\"" .claude/brand.json && grep -q "\"domain\": \"micahjonesconsulting.com\"" .claude/brand.json && grep -q "#F5EFE4" .claude/brand.json && grep -q "#8E3A1E" .claude/brand.json && grep -q "ordani-sage" .claude/brand.json && grep -q "/work/ordani only" .claude/brand.json && grep -q "\"foundry\": \"system\"" .claude/brand.json && grep -q "\"mono\": null" .claude/brand.json && grep -q "syncTouch" .claude/brand.json && grep -q "title-card" .claude/brand.json && grep -q "foyer-theater-dim" .claude/brand.json && grep -q "1800" .claude/brand.json && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    `.claude/brand.json` exists with the full House Lights config: 12-entry palette (11 colors + ordani-sage scope note), typography foundry=system, 30 voice.banned entries, 5 motion.banned regex patterns (including syncTouch:true), performance budgets (LCP 1800ms / Lighthouse 95 / max image 500KB), 6-page IA, case-study framework. Valid JSON.
  </done>
</task>

<task type="auto">
  <name>Task G2: Write .claude/CLAUDE.md with House Lights project memory</name>
  <files>
    .claude/CLAUDE.md
  </files>
  <action>
Create `C:/Users/micah/Code/micahjonesconsulting/.claude/CLAUDE.md` with the EXACT content from RESEARCH.md §13 "`.claude/CLAUDE.md` — House Lights Overrides".

Final file content (write verbatim from RESEARCH.md §13):

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

**Critical writing rules:**
- File MUST be at `C:/Users/micah/Code/micahjonesconsulting/.claude/CLAUDE.md`. The top-level `CLAUDE.md` (scaffolder default) is a SEPARATE file we leave as-is.
- The Pitfall B1 contrast rule MUST appear in the "One accent" section.
- The "Stack" section MUST name Next.js 16.2.6 (not 15) and Lenis `syncTouch: false`.
- The "What not to do" section MUST include all 14 DO-NOT items from RESEARCH §13.
- The "Definition of done" section MUST list 7 criteria.
- DO NOT shorten or paraphrase — harness PR-review subagents read this file verbatim and reference specific phrases.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && test -f .claude/CLAUDE.md && grep -q "# House Lights — project memory" .claude/CLAUDE.md && grep -q "premium-web" .claude/CLAUDE.md && grep -q "Two modes" .claude/CLAUDE.md && grep -q "data-mode=\"foyer\"" .claude/CLAUDE.md && grep -q "data-mode=\"theater\"" .claude/CLAUDE.md && grep -q "One accent" .claude/CLAUDE.md && grep -q "Pitfall B1" .claude/CLAUDE.md && grep -q "8E3A1E" .claude/CLAUDE.md && grep -q "5.4:1" .claude/CLAUDE.md && grep -q "One signature motion" .claude/CLAUDE.md && grep -q "TitleCard" .claude/CLAUDE.md && grep -q "Next.js 16.2.6" .claude/CLAUDE.md && grep -q "syncTouch: false" .claude/CLAUDE.md && grep -q "What not to do" .claude/CLAUDE.md && grep -q "Definition of done" .claude/CLAUDE.md && grep -q "Lighthouse Performance ≥ 95" .claude/CLAUDE.md && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    `.claude/CLAUDE.md` exists with all 8 sections (Two modes, One accent, One signature motion, Stack, What not to do, Content, Voice, Definition of done, How to ask for things); Pitfall B1 contrast rule documented; stack section names Next.js 16.2.6 + Lenis syncTouch:false; DO-NOT list contains all required items; DoD lists 7 criteria.
  </done>
</task>

</tasks>

<verification>
- `.claude/brand.json` is valid JSON
- All 11 palette hex values match `app/globals.css` (Plan C)
- All 30 banned words match `lib/banned.ts` (Plan F)
- `.claude/brand.json` typography.foundry = "system" (Inter permitted without license-lock)
- `.claude/brand.json` motion.banned includes `syncTouch:\\s*true` regex (Pitfall D2)
- `.claude/CLAUDE.md` exists with all 8 sections per RESEARCH §13
- Pitfall B1 contrast rule appears in `.claude/CLAUDE.md` "One accent" section
- The top-level scaffolder `CLAUDE.md` is untouched (left as Next-specific reference)
</verification>

<success_criteria>
- SCAFF-07 ✓: Project CLAUDE.md (at `.claude/CLAUDE.md`) captures all required rules
- HARN-01 ✓: `.claude/brand.json` exists with House Lights overrides
- HARN-02 ✓: `.claude/CLAUDE.md` exists with project-specific overrides
- HARN-03 ✓: Project is connected to locally-installed `premium-web` harness via these two files (no `package.json` dep)
- Harness hooks (copy-lint.sh, font-license.sh, design-tokens.sh, motion-discipline.sh, mdx-frontmatter.sh, image-budget.sh) will read these files at PR-review time
- Harness PR-review subagents (design-director, copy-editor, motion-engineer, perf-auditor, a11y-reviewer) can reference the DO-NOT list in `.claude/CLAUDE.md`
</success_criteria>

<output>
After completion, create `.planning/phases/01-scaffold-tokens-dns/01-G-SUMMARY.md` confirming:
- `.claude/brand.json` valid JSON with 11-color palette, 30-word voice.banned, motion regex blocks, performance budgets
- `.claude/CLAUDE.md` covers Two modes / One accent / One signature motion / Stack / DO-NOT / Content / Voice / Definition of done sections per RESEARCH §13
- Cross-checks against Plan C palette and Plan F banned-words list verified
- Top-level scaffolder `CLAUDE.md` left as-is (Next-specific reference)
</output>
