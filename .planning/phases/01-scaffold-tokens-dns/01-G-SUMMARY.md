---
phase: 01-scaffold-tokens-dns
plan: G
status: complete
completed: 2026-05-14
---

# Plan 01-G: Harness CLAUDE.md + brand.json — SUMMARY

## What was built

Created `.claude/brand.json` and `.claude/CLAUDE.md` per RESEARCH.md §12 and §13. These two files are the project's connection point to the locally-installed `premium-web` harness at `~/Code/premium-web-harness/`. The harness's 8 hooks and 5 plugin MCPs read these files at PR-review time to enforce single-accent / single-motion / mode-by-route / banned-words discipline.

## Files created

- `.claude/brand.json` — valid JSON; House Lights config
- `.claude/CLAUDE.md` — project memory in markdown

## `.claude/brand.json` content

- **name:** "house-lights"
- **domain:** "micahjonesconsulting.com"
- **audience.primary:** Founders of $5-50M companies + Black HR consultants/doulas/birth workers/equity practitioners
- **palette:** 12 entries (11 colors + ordani-sage with `"scope": "/work/ordani only"`). Hex values match `app/globals.css` (Plan C) exactly.
- **typography:** display/body/serif all `foundry: "system"` (no license-lock required for Inter). `mono: null` (banned).
- **voice.banned:** 30 entries mirroring `lib/banned.ts` (Plan F) exactly
- **voice.preferred_verbs:** ["build", "ship", "rewrite", "cut", "tune", "bet", "show"]
- **motion.signature:** title-card (TitleCard.tsx, app/globals.css)
- **motion.view_transition:** foyer-theater-dim (app/layout.tsx, app/globals.css)
- **motion.banned:** 5 regex patterns blocking cursor followers, scroll-jacking, marquees, monospace fonts, and `syncTouch:\s*true` (Pitfall D2)
- **performance:** LCP 1800ms / INP 200ms / CLS 0.05 / Lighthouse ≥95 / max image 500KB
- **pages:** ["/", "/work", "/work/[slug]", "/about", "/work-with-me", "/contact"]
- **content.case_study_framework:** 8 sections including approach×4

## `.claude/CLAUDE.md` content

Eight sections per RESEARCH §13:
1. **Two modes** — Foyer (cream paper) vs Theater (obsidian ground); route-determined via `data-mode` attribute; no `useTheme`, no `ThemeProvider`, no toggle
2. **One accent** — Copper + accent-copper-deep (Pitfall B1 contrast rule)
3. **One signature motion** — TitleCard + foyer↔theater dim
4. **Stack** — Next 16.2.6 / React 19.2.6 / TS strict / Tailwind v4 / GSAP quarantined / Lenis syncTouch:false / Resend / Supabase service-role-only / Vercel
5. **What not to do** — 14-item DO-NOT list (no monospace, no Framer Motion, no @studio-freight, no syncTouch:true, no gsap outside TitleCard, no tailwind.config.ts, no mdx-components.tsx inside app/, no dark-mode toggle, no /now /uses /colophon, no logo wall, no Calendly in first volley, no stock photography, etc.)
6. **Content** — content/work/*.mdx + content/citations.ts + content/site.ts
7. **Voice** — first-person, ≤25 word sentences, named numbers, ≤1 em-dash per page, 30-word banned list
8. **Definition of done** — 7 criteria: TitleCard pin / Lighthouse ≥95 / zero axe / View Transition visible / zero banned words / prefers-reduced-motion honored / prettier --check
9. **How to ask for things** — harness skill/agent commands

## Cross-checks completed

- 11 hex values in `.claude/brand.json.palette` MATCH `app/globals.css` `@theme` block
- 30 banned-word entries in `.claude/brand.json.voice.banned` MATCH `lib/banned.ts` `BANNED_WORDS`
- `typography.*.foundry = "system"` → harness `font-license.sh` will permit Inter without a license-lock file
- `motion.banned` includes `"syncTouch:\\s*true"` regex → blocks Pitfall D2 regression at write boundary
- `.claude/brand.json` parses as valid JSON (verified via `node -e "JSON.parse(...)"`)

## Requirements covered

- SCAFF-07: Project CLAUDE.md captures stack/accent/motion/mode-by-route/banned-words discipline (at `.claude/CLAUDE.md` per harness convention)
- HARN-01: `.claude/brand.json` exists with House Lights overrides
- HARN-02: `.claude/CLAUDE.md` exists with project-specific overrides
- HARN-03: Project connected to locally-installed `premium-web` plugin via these two files (no `package.json` dep)

## Notes

The top-level scaffolder `CLAUDE.md` (at repo root, not `.claude/`) is intentionally left as a Next.js-specific generic reference — it was created by the scaffolder's `--agents-md` flag. The authoritative project memory lives at `.claude/CLAUDE.md`. If a contradiction surfaces later, defer to `.claude/CLAUDE.md`.

## Key files

```yaml
key-files:
  created:
    - .claude/brand.json
    - .claude/CLAUDE.md
```
