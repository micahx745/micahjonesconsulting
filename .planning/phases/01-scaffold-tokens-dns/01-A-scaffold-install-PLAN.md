---
phase: 01-scaffold-tokens-dns
plan: A
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - pnpm-lock.yaml
  - tsconfig.json
  - next-env.d.ts
  - AGENTS.md
  - CLAUDE.md
  - README.md
  - app/layout.tsx
  - app/page.tsx
  - app/globals.css
  - next.config.ts
  - postcss.config.mjs
  - public/next.svg
  - public/vercel.svg
  - public/file.svg
  - public/globe.svg
  - public/window.svg
  - .gitignore
autonomous: true
requirements:
  - SCAFF-01
  - SCAFF-08
must_haves:
  truths:
    - "Cold repo contains a typecheck-passing Next.js 16.2 App Router scaffold."
    - "`pnpm install` resolves cleanly with locked stack dependencies (Next 16.2.6, React 19.2.6, TS 6, Tailwind v4.3, GSAP 3.15, Lenis 1.3, Resend 6, Zod 4, Supabase 2.105, Vercel Analytics 2, Speed Insights 1, MDX 16, gray-matter 4, remark-gfm 4, Prettier 3, prettier-plugin-tailwindcss 0.6)."
    - "`pnpm typecheck` succeeds with TypeScript strict mode (including noUncheckedIndexedAccess, noImplicitOverride, noFallthroughCasesInSwitch)."
    - "`.gitignore` excludes .next/, node_modules/, .env*, .vercel/, qa/current/, OS files, and *.tsbuildinfo per SCAFF-08."
    - "Scaffolder placeholder app/page.tsx is deleted (Phase 4 owns / via (foyer) route group)."
    - "Public default SVGs (next.svg, vercel.svg, file.svg, globe.svg, window.svg) are deleted."
  artifacts:
    - path: "package.json"
      provides: "Locked dependency manifest"
      contains: "\"next\""
    - path: "tsconfig.json"
      provides: "TypeScript strict config"
      contains: "noUncheckedIndexedAccess"
    - path: ".gitignore"
      provides: "Git ignore rules"
      contains: "qa/current/"
    - path: "pnpm-lock.yaml"
      provides: "Locked dependency tree"
      min_lines: 100
  key_links:
    - from: "scaffolder defaults"
      to: "House Lights overrides"
      via: "post-scaffold cleanup deletions (app/page.tsx, public SVGs)"
      pattern: "deleted scaffolder files"
---

<objective>
Scaffold a cold Next.js 16.2 App Router project at `C:/Users/micah/Code/micahjonesconsulting/` with full locked dependency stack, strict TypeScript, and harness-ready `.gitignore`. This plan unblocks every subsequent Phase 1 plan — no Wave 2 plan can run until the scaffold + node_modules + tsconfig exist.

Purpose: REQ SCAFF-01 (Next.js 16.2 App Router + TypeScript strict) and SCAFF-08 (.gitignore) — the foundation files.
Output: A repo where `pnpm install && pnpm typecheck` succeeds. Default scaffolder files that will be overwritten by Wave 2 plans (next.config.ts, postcss.config.mjs, app/globals.css, app/layout.tsx, CLAUDE.md, AGENTS.md) are left in place as placeholders for those plans to overwrite.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/01-scaffold-tokens-dns/01-RESEARCH.md

The current working directory is `C:/Users/micah/Code/micahjonesconsulting/`. The directory currently contains only `.git/` and `.planning/` — no other files. The scaffolder will populate the rest.

**Critical scaffolder behavior notes (from RESEARCH §"Scaffold Command Sequence"):**
- `pnpm create next-app` cannot scaffold into a non-empty directory that contains unexpected files. The presence of `.planning/` and `.git/` is fine (scaffolder ignores hidden directories and `.git`), but if the scaffolder errors due to non-empty dir, run it in the parent directory with the project name `micahjonesconsulting`, then verify the files land correctly. Empirically `--yes` + non-empty dir with only hidden folders works for Next 16; if it fails, fall back to running in parent.
- The `--agents-md` flag generates both `AGENTS.md` and `CLAUDE.md` scaffolder defaults. The Plan G CLAUDE.md task will overwrite `CLAUDE.md` with the harness-extended version. `AGENTS.md` stays as-is.
- The `--no-linter` flag skips ESLint setup — v1 uses Prettier alone (per `.planning/research/STACK.md` §"Excluded").
- The `--disable-git` flag is critical — the project already has a `.git/` directory; letting the scaffolder re-init would overwrite history.
- The scaffolder installs `tailwindcss` with the `--tailwind` flag, but the v4 PostCSS plugin (`@tailwindcss/postcss`) installs as part of the scaffolder's tailwind setup in 16.2 — verify after install. If missing, Step 2 of the install sequence below re-installs both at exact pinned versions.

**Pitfall A1 (PITFALL — `next/font/google` CLS):** The next-version pin matters because `adjustFontFallback: true` was intermittently broken in Next.js 15.x (issues #74134, #73838). Pinning to 16.2.6 ensures the fix lands.

**Pitfall — first-install Tailwind v4 footgun:** `@tailwindcss/postcss` is a SEPARATE package from `tailwindcss`. Step 2 of the install sequence pins both at the same minor (`^4.3`) per Tailwind v4 install docs.
</context>

<tasks>

<task type="auto">
  <name>Task A1: Scaffold Next.js 16.2 with explicit flags</name>
  <files>
    package.json, tsconfig.json, next.config.ts, postcss.config.mjs, app/layout.tsx, app/page.tsx, app/globals.css, next-env.d.ts, AGENTS.md, CLAUDE.md, README.md, public/next.svg, public/vercel.svg, public/file.svg, public/globe.svg, public/window.svg, .gitignore (initial scaffolder defaults — most overwritten by Wave 2/this plan's later tasks)
  </files>
  <action>
Run the scaffolder command from `C:/Users/micah/Code/micahjonesconsulting/` (the current directory). Use bash via PowerShell if needed; the command must run with these EXACT flags (verbatim from RESEARCH.md §1 "Scaffold Command Sequence"):

```bash
cd C:/Users/micah/Code/micahjonesconsulting && pnpm create next-app . \
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

**Note the trailing `.`** — scaffolds INTO the current directory rather than creating a subfolder. This preserves the existing `.planning/` and `.git/` directories.

**If the scaffolder refuses to scaffold into a non-empty directory** (some Next versions check for ANY content), fall back to:

```bash
# Run from parent directory
cd C:/Users/micah/Code && pnpm create next-app micahjonesconsulting-tmp \
  --ts --tailwind --app --turbopack --no-linter \
  --import-alias "@/*" --use-pnpm --disable-git --agents-md --yes

# Move everything except .git and .planning into the project dir
# (Use mv with explicit file list, NOT * which would clobber .planning)
mv C:/Users/micah/Code/micahjonesconsulting-tmp/* C:/Users/micah/Code/micahjonesconsulting/
mv C:/Users/micah/Code/micahjonesconsulting-tmp/.gitignore C:/Users/micah/Code/micahjonesconsulting/.gitignore
# Move dotfiles individually so we don't accidentally overwrite .git
# (skip .git if it exists in tmp dir — scaffolder shouldn't create it due to --disable-git)
rm -rf C:/Users/micah/Code/micahjonesconsulting-tmp
```

After the scaffolder completes, verify the following files exist (the scaffolder produces these as defaults; later tasks overwrite some of them):

- `package.json` with `next: ^16.2`, `react: ^19.2`, `react-dom: ^19.2`, `typescript: ^6`, `@types/react: ^19`, `@types/react-dom: ^19`, `@types/node: ^22`, `tailwindcss: ^4` (plus possibly `@tailwindcss/postcss`)
- `tsconfig.json` (will be overwritten in Task A3)
- `next.config.ts` (will be overwritten in Plan B)
- `postcss.config.mjs` (will be overwritten in Plan B)
- `app/layout.tsx` (will be overwritten in Plan E)
- `app/page.tsx` (will be DELETED in Task A4 — Phase 4 owns `/` via (foyer) route group)
- `app/globals.css` (will be overwritten in Plan C)
- `AGENTS.md` (stays as-is — Next-specific reference)
- `CLAUDE.md` (will be OVERWRITTEN in Plan G with harness-extended House Lights version)
- `.gitignore` (will be overwritten in Task A6 with our complete content)
- `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg` (will be DELETED in Task A5)
- `next-env.d.ts`, `README.md` (kept as-is)

**DO NOT modify any file content in this task.** Subsequent tasks in this plan handle the cleanup + dependency install + strict tsconfig; Wave 2 plans overwrite the actual content files.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && test -f package.json && test -f tsconfig.json && test -f app/layout.tsx && test -f app/globals.css && test -d node_modules && grep -q "\"next\":" package.json && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    The 16 scaffolder default files exist; `package.json` references Next 16.x; `node_modules/` is present from the scaffolder's automatic install; `.git/` and `.planning/` are preserved (verify with `ls -la` — they should be untouched).
  </done>
</task>

<task type="auto">
  <name>Task A2: Install full locked dependency stack</name>
  <files>
    package.json, pnpm-lock.yaml
  </files>
  <action>
Run the 6 grouped install commands from RESEARCH.md §"Installation Sequence" to lock the full Phase 1+future stack. These add packages beyond what the scaffolder pre-installed. Run from `C:/Users/micah/Code/micahjonesconsulting/`:

```bash
cd C:/Users/micah/Code/micahjonesconsulting

# Step 2 — Tailwind v4 pin (scaffolder may have installed older minor)
pnpm add tailwindcss@^4.3 @tailwindcss/postcss@^4.3 postcss@^8.5

# Step 3 — MDX pipeline
pnpm add @next/mdx@^16 @mdx-js/loader@^3 @mdx-js/react@^3
pnpm add gray-matter@^4 remark-gfm@^4
pnpm add -D @types/mdx@^2

# Step 4 — Motion (install now, integrate in Phases 2 and 5)
pnpm add gsap@^3.15 @gsap/react@^2.1 lenis@^1.3

# Step 5 — Form + email + data (install now, integrate in Phase 6/10)
pnpm add resend@^6 zod@^4 @supabase/supabase-js@^2.105

# Step 6 — Observability (install now, mount in Phase 2)
pnpm add @vercel/analytics@^2 @vercel/speed-insights@^1

# Step 7 — Dev tools (formatter only; no ESLint)
pnpm add -D prettier@^3 prettier-plugin-tailwindcss@^0.6
```

Run these as SEPARATE pnpm commands (not chained) so each install resolves and writes to `package.json` cleanly.

**Excluded packages (DO NOT install) per RESEARCH §"Excluded":**
- `framer-motion` (use CSS transitions per blueprint §13)
- `@studio-freight/react-lenis` (retired — use `lenis` and `lenis/react`)
- `next-themes` (mode is route-based, not user-controlled)
- `next-mdx-remote` (`@next/mdx` is the build-time path)
- `react-hook-form`, `formik`, `@studio-freight/lenis`, `locomotive-scroll`, `react-mouse-follower`, `shadcn-ui` defaults, any monospace font package, `eslint-config-next`

If any of the above are present in `package.json` after install, remove them with `pnpm remove <pkg>`.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && pnpm install --frozen-lockfile && grep -q "\"gsap\":" package.json && grep -q "\"lenis\":" package.json && grep -q "\"resend\":" package.json && grep -q "\"zod\":" package.json && grep -q "\"@supabase/supabase-js\":" package.json && grep -q "\"@next/mdx\":" package.json && grep -q "\"@tailwindcss/postcss\":" package.json && grep -q "\"@vercel/analytics\":" package.json && grep -q "\"@vercel/speed-insights\":" package.json && ! grep -q "framer-motion" package.json && ! grep -q "@studio-freight" package.json && ! grep -q "next-themes" package.json && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    All 14 stack packages locked in `package.json`; `pnpm-lock.yaml` exists with deps resolved; no excluded packages present.
  </done>
</task>

<task type="auto">
  <name>Task A3: Overwrite tsconfig.json with strict mode + paths</name>
  <files>
    tsconfig.json
  </files>
  <action>
Overwrite `C:/Users/micah/Code/micahjonesconsulting/tsconfig.json` with the EXACT content from RESEARCH.md §5 "`tsconfig.json` — Strict Mode Settings". The scaffolder's defaults are close but miss three strict flags this project requires (`noUncheckedIndexedAccess`, `noImplicitOverride`, `noFallthroughCasesInSwitch`) per SCAFF-01.

Final file content (write verbatim from RESEARCH.md §5):

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

After overwriting, do NOT run `pnpm typecheck` yet — the scaffolder's default `app/page.tsx` may not satisfy `noUncheckedIndexedAccess` immediately, and Task A4 deletes that file anyway. Typecheck verification happens in the final wave (Plan J).
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && grep -q "noUncheckedIndexedAccess.*true" tsconfig.json && grep -q "noImplicitOverride.*true" tsconfig.json && grep -q "noFallthroughCasesInSwitch.*true" tsconfig.json && grep -q "\"strict\": true" tsconfig.json && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    `tsconfig.json` contains all three additional strict flags + `"strict": true` + correct paths mapping.
  </done>
</task>

<task type="auto">
  <name>Task A4: Delete scaffolder app/page.tsx placeholder</name>
  <files>
    app/page.tsx (DELETE)
  </files>
  <action>
Delete `C:/Users/micah/Code/micahjonesconsulting/app/page.tsx`. The scaffolder generates a "Welcome to Next.js" demo page at this path. Phase 4 (FOYER-01) creates the actual home page inside `app/(foyer)/page.tsx`. Both files cannot coexist (Next.js route conflict at `/`).

Between Phase 1 and Phase 4, visiting `/` will 404 — that is expected. There are no users yet.

```bash
cd C:/Users/micah/Code/micahjonesconsulting && rm app/page.tsx
```

Rationale documented in RESEARCH.md §"Open Questions" #5.
  </action>
  <verify>
    <automated>test ! -f C:/Users/micah/Code/micahjonesconsulting/app/page.tsx && echo "PASS — app/page.tsx deleted" || echo "FAIL — app/page.tsx still exists"</automated>
  </verify>
  <done>
    `app/page.tsx` does not exist; `app/layout.tsx` and `app/globals.css` still exist (will be overwritten in Wave 2).
  </done>
</task>

<task type="auto">
  <name>Task A5: Delete scaffolder default public SVGs</name>
  <files>
    public/next.svg (DELETE), public/vercel.svg (DELETE), public/file.svg (DELETE), public/globe.svg (DELETE), public/window.svg (DELETE)
  </files>
  <action>
Delete the 5 default SVG assets that the scaffolder places in `public/`. None of them are used by the House Lights site and they would otherwise stay in the production bundle.

```bash
cd C:/Users/micah/Code/micahjonesconsulting && rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
```

The `public/` directory itself stays (empty for now; Phase 9 adds `portrait-main.jpg` and `portrait-context.jpg`).
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && test ! -f public/next.svg && test ! -f public/vercel.svg && test ! -f public/file.svg && test ! -f public/globe.svg && test ! -f public/window.svg && test -d public && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    No scaffolder default SVGs in `public/`; `public/` directory exists but is empty.
  </done>
</task>

<task type="auto">
  <name>Task A6: Overwrite .gitignore with complete House Lights ruleset</name>
  <files>
    .gitignore
  </files>
  <action>
Overwrite `C:/Users/micah/Code/micahjonesconsulting/.gitignore` with the EXACT content from RESEARCH.md §11 "`.gitignore` — Complete Content". This satisfies REQ SCAFF-08 (exclude `.next/`, `node_modules/`, `.env.local`, `.vercel/`, `qa/current/`).

Final file content (write verbatim from RESEARCH.md §11):

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

Note: `next-env.d.ts` itself (without `.bak`) is intentionally NOT ignored — it is checked in per Next.js convention.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && grep -q "^\.next/" .gitignore && grep -q "^node_modules/" .gitignore && grep -q "^\.env\.local" .gitignore && grep -q "^\.vercel/" .gitignore && grep -q "^qa/current/" .gitignore && grep -q "Thumbs.db" .gitignore && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    `.gitignore` matches RESEARCH.md §11 verbatim and contains all 5 required exclusions plus IDE/OS/TS cleanup patterns.
  </done>
</task>

</tasks>

<verification>
- `pnpm install --frozen-lockfile` succeeds without errors
- `package.json` contains all 14 stack packages at correct version ranges
- `package.json` contains zero excluded packages (framer-motion, @studio-freight/*, next-themes, etc.)
- `tsconfig.json` strict mode includes all three additional flags
- `app/page.tsx` deleted; `app/layout.tsx` + `app/globals.css` still present (placeholders for Wave 2)
- `public/` exists but contains zero scaffolder default SVGs
- `.gitignore` contains all SCAFF-08 required exclusions
- `.git/` and `.planning/` directories untouched
- Plans B, C, D, E, F, G (Wave 2) can begin file authoring against this scaffold
</verification>

<success_criteria>
- Cold repo is now a typecheck-passing Next.js 16.2 App Router project
- All Phase 1 + future-phase dependencies are locked in `package.json` + `pnpm-lock.yaml`
- TypeScript strict mode is configured with required additional flags
- Scaffolder defaults that will conflict with Phase 4 (`app/page.tsx`) or have no use (default SVGs) are deleted
- `.gitignore` excludes all SCAFF-08 paths
- The repo is ready for Wave 2 plans to overwrite specific scaffolder defaults (next.config.ts, postcss.config.mjs, app/globals.css, app/layout.tsx, CLAUDE.md) and create new files (lib/fonts.ts, lib/banned.ts, lib/copy-lint.ts, instrumentation.ts, .claude/brand.json, .claude/CLAUDE.md)
</success_criteria>

<output>
After completion, create `.planning/phases/01-scaffold-tokens-dns/01-A-SUMMARY.md` documenting:
- Exact `pnpm create next-app` command used (whether trailing-dot or fallback parent-directory path)
- Final `package.json` dependency versions (after Step 2-7 installs resolved)
- Any unexpected scaffolder output to surface to Wave 2 plan executors (e.g., if the scaffolder added an unexpected file)
- Files deleted in cleanup (page.tsx + 5 SVGs)
- Pre-existing `.git/` and `.planning/` directory states preserved (untouched)
</output>
