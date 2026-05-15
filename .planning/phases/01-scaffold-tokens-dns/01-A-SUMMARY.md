---
phase: 01-scaffold-tokens-dns
plan: A
status: complete
completed: 2026-05-14
---

# Plan 01-A: Scaffold Install — SUMMARY

## What was built

Cold scaffold of Next.js 16.2 App Router into `C:/Users/micah/Code/micahjonesconsulting/` while preserving the pre-existing `.git/` and `.planning/` directories. Full locked dependency stack installed via 7 grouped pnpm commands. TypeScript strict mode configured with 3 additional flags beyond scaffolder defaults. Scaffolder placeholder files cleaned up.

## Scaffold approach (fallback path used)

The trailing-dot scaffold (`pnpm create next-app .`) failed because `.planning/` directory exists. Used the fallback parent-directory pattern:

1. Scaffolded into `C:/Users/micah/Code/micahjonesconsulting-tmp/` with `--ts --tailwind --app --turbopack --no-linter --import-alias "@/*" --use-pnpm --disable-git --agents-md --yes`.
2. Scaffolder produced `src/app/` (Next.js current default). Moved `src/app/` → `app/` at repo root to match Phase 1 architecture (eliminating the `src/` layer).
3. Moved all files (sans .next/) to the project directory.
4. Removed tmp dir.
5. Reinstalled node_modules from clean state (initial install was symlinked to the deleted tmp location).
6. Ran Steps 2-7 of the install sequence to lock the full stack.

## Files created/modified

**Files created (scaffolder + cleanup):**
- `package.json` — full locked stack
- `pnpm-lock.yaml` — generated
- `pnpm-workspace.yaml` — scaffolder default
- `tsconfig.json` — overwritten with strict + 3 additional flags + paths `@/*: ./*`
- `next.config.ts` — scaffolder default (Plan B overwrites)
- `postcss.config.mjs` — scaffolder default (Plan B verifies/overwrites)
- `app/layout.tsx` — scaffolder default (Plan E overwrites)
- `app/globals.css` — scaffolder default (Plan C overwrites)
- `app/favicon.ico` — scaffolder default, kept
- `AGENTS.md` — scaffolder default (kept per RESEARCH §"Open Questions" #3)
- `CLAUDE.md` — scaffolder default (Plan G overwrites)
- `README.md` — scaffolder default
- `next-env.d.ts` — scaffolder default
- `.gitignore` — overwritten with complete House Lights ruleset (SCAFF-08)

**Files deleted:**
- `app/page.tsx` — scaffolder welcome page (Phase 4 owns `/` via foyer route group)
- `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg`

**Pre-existing files preserved:**
- `.git/` (untouched)
- `.planning/` (untouched, contains PROJECT.md, ROADMAP.md, STATE.md, REQUIREMENTS.md, phases/, research/)

## Final dependency versions

```
"dependencies": {
  "@gsap/react": "^2.1.2",
  "@mdx-js/loader": "^3.1.1",
  "@mdx-js/react": "^3.1.1",
  "@next/mdx": "^16.2.6",
  "@supabase/supabase-js": "^2.105.4",
  "@vercel/analytics": "^2.0.1",
  "@vercel/speed-insights": "^1.3.1",
  "gray-matter": "^4.0.3",
  "gsap": "^3.15.0",
  "lenis": "^1.3.23",
  "next": "16.2.6",
  "postcss": "^8.5.14",
  "react": "19.2.6",
  "react-dom": "19.2.6",
  "remark-gfm": "^4.0.1",
  "resend": "^6.12.3",
  "zod": "^4.4.3"
},
"devDependencies": {
  "@tailwindcss/postcss": "^4.3",
  "@types/mdx": "^2.0.13",
  "@types/node": "^22.19.19",
  "@types/react": "^19.2.14",
  "@types/react-dom": "^19.2.3",
  "prettier": "^3.8.3",
  "prettier-plugin-tailwindcss": "^0.6.14",
  "tailwindcss": "^4.3",
  "typescript": "^6.0.3"
}
```

## Key files

```yaml
key-files:
  created:
    - package.json
    - pnpm-lock.yaml
    - tsconfig.json
    - .gitignore
    - app/layout.tsx
    - app/globals.css
    - next.config.ts
    - postcss.config.mjs
    - next-env.d.ts
    - AGENTS.md
    - CLAUDE.md
    - README.md
  deleted:
    - app/page.tsx
    - public/next.svg
    - public/vercel.svg
    - public/file.svg
    - public/globe.svg
    - public/window.svg
```

## Notes for Wave 2 executors

1. **Project uses `app/` at repo root, not `src/app/`.** The scaffolder's current default (Next 16.2.6) is `src/`-prefixed; we moved it. All `@/*` imports resolve from repo root.
2. **TypeScript is at v6**, not v5 as the scaffolder installed. Plan B's `next.config.ts` uses `import type { NextConfig } from "next"` which is compatible.
3. **`pnpm-workspace.yaml` exists** (scaffolder dropped it). Not strictly required for non-monorepo. Leaving in place — Plan B should not remove unless explicitly needed.
4. **`app/favicon.ico` was kept** (scaffolder default). Plan E (layout.tsx) does not need to reference it; Next.js auto-discovers favicons in `app/`.
5. **`AGENTS.md` and root `CLAUDE.md` are scaffolder placeholders.** Plan G overwrites `.claude/CLAUDE.md` (the harness-extended version); root `CLAUDE.md` was not touched by Plan A but Plan G's documentation should clarify which file takes precedence.

## Verification

- `pnpm install --frozen-lockfile` → succeeds (0 errors)
- All 14 stack packages present in package.json at correct version ranges
- 0 excluded packages (framer-motion, @studio-freight/*, next-themes, etc.)
- tsconfig.json contains `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`, `noFallthroughCasesInSwitch: true`, `"strict": true`
- `app/page.tsx` deleted
- `app/layout.tsx`, `app/globals.css` present (placeholders for Wave 2)
- `public/` exists, contains 0 scaffolder SVGs
- `.gitignore` contains all SCAFF-08 required exclusions
- `.git/` and `.planning/` untouched
