---
phase: 01-scaffold-tokens-dns
plan: F
type: execute
wave: 2
depends_on:
  - A
files_modified:
  - lib/banned.ts
  - lib/copy-lint.ts
  - instrumentation.ts
autonomous: true
requirements:
  - SCAFF-06
must_haves:
  truths:
    - "`lib/banned.ts` exports `BANNED_WORDS` constant containing 30 entries: blueprint §8 top-9 banned words + 21 harness slop-words.txt defaults + research extensions."
    - "`lib/copy-lint.ts` exports `scanString(text, filePath, lineOffset?)` returning `Finding[]` and `formatFindings(findings)` returning a human-readable string."
    - "The compiled regex in `lib/copy-lint.ts` uses word-boundary anchors (`\\b...\\b`) for single-word entries and literal matching for multi-word phrases (e.g., 'at the intersection of')."
    - "Findings include `word`, `filePath`, `line`, `column`, `excerpt` per RESEARCH §8 Finding interface — Phase 2's instrumentation.ts will emit these as `file:line:column — banned word \"X\"` errors that fail the build."
    - "`instrumentation.ts` exists at repo root with a no-op `register()` async export — Next.js convention is in place but the actual copy-lint scan is wired in Phase 2 (COPY-03)."
  artifacts:
    - path: "lib/banned.ts"
      provides: "BANNED_WORDS const + BannedWord type"
      contains: "BANNED_WORDS"
      min_lines: 30
      exports:
        - "BANNED_WORDS"
        - "BannedWord"
    - path: "lib/copy-lint.ts"
      provides: "scanString + formatFindings build-time scanner functions"
      contains: "scanString"
      min_lines: 60
      exports:
        - "Finding"
        - "scanString"
        - "formatFindings"
    - path: "instrumentation.ts"
      provides: "Next.js instrumentation convention scaffold"
      contains: "export async function register"
  key_links:
    - from: "lib/copy-lint.ts"
      to: "lib/banned.ts"
      via: "import { BANNED_WORDS } from '@/lib/banned'"
      pattern: "from \"@/lib/banned\""
    - from: "instrumentation.ts (Phase 2 wires)"
      to: "lib/copy-lint.ts"
      via: "Phase 2 register() calls scanString across content/**/*.mdx + app/**/*.tsx + metadata exports"
      pattern: "Phase 2.*scanString"
---

<objective>
Create the build-time copy-lint module's three scaffold files: `lib/banned.ts` (30-word banned list), `lib/copy-lint.ts` (regex-based scanner with `scanString` and `formatFindings` exports), and `instrumentation.ts` (Next.js convention file with a no-op `register()` export). Phase 2 (COPY-03) wires the actual build-time invocation by extending `register()` to walk MDX + component string literals + frontmatter + metadata exports.

Purpose: REQ SCAFF-06 (`instrumentation.ts` hook for build-time copy-lint scan). RESEARCH §"Deferred Ideas" explicitly notes Phase 1 creates the SCAFFOLD only — Phase 2 wires the build pipeline.
Output: Three files that together establish the copy-lint module architecture. Until Phase 2 wires `instrumentation.ts`, the scanner is callable from any TypeScript file but is not invoked at build time.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/01-scaffold-tokens-dns/01-RESEARCH.md
@.planning/blueprint.md

**Banned-words list composition (RESEARCH §7 + blueprint §8 + harness slop-words.txt):**
The 30-entry banned-words list combines:
- 9 from blueprint §8 top-9: unlock, drive, leverage, elevate, synergy, transformative, game-changing, best-in-class, at the intersection of
- 21 from harness slop-words.txt defaults + research extensions: seamless, seamlessly, cutting-edge, revolutionary, world-class, next-generation, holistic, robust, innovative, dive deep, circle back, low-hanging fruit, move the needle, make an impact, delight users, craft experiences, passionate about, obsessed with, journey, solutions, empower

Total: 30. All entries lowercase. Single-word entries match with word-boundary regex; multi-word phrases match literally case-insensitive.

**Scanner architecture (RESEARCH §8):**
- `Finding` interface captures: word, filePath, line, column, excerpt.
- `scanString(text, filePath, lineOffset)` splits on `\r?\n`, runs compiled regex per line, returns one `Finding` per match. The `lineOffset` parameter lets callers pass the absolute line number where `text` starts in a larger file (e.g., when scanning a string-literal export, the export's source line).
- `formatFindings(findings)` returns a multi-line string with `file:line:column — banned word "X" in: "...excerpt..."` per Finding.

**Why the regex uses word boundaries for single words:**
Blueprint §8 lists "drive" as banned. Without `\b...\b`, the regex would match "driver" (which is fine). With word boundaries, only the bare verb "drive" matches.

**Why multi-word phrases skip word-boundary anchors:**
"at the intersection of" cannot use `\b...\b` because the phrase contains spaces. Literal matching is correct because the phrase only triggers in prose flow (not as a component prop name like `intersectionObserver`).

**Phase 1 vs Phase 2 boundary (RESEARCH §"Deferred Ideas"):**
- Phase 1: creates `lib/banned.ts`, `lib/copy-lint.ts`, `instrumentation.ts` (no-op).
- Phase 2 (COPY-03): extends `instrumentation.ts.register()` to invoke `scanString` across all relevant files at build time and fail the build with file:line:column on any finding.

Phase 1's `instrumentation.ts` MUST be a no-op because:
1. `content/**/*.mdx` doesn't exist yet (Phase 8 creates).
2. Scanning the scaffolder's `AGENTS.md` or `README.md` would produce false positives ("seamless integration" appears in Next docs).
3. Wiring before the directories exist is wasted work.
</context>

<tasks>

<task type="auto">
  <name>Task F1: Write lib/banned.ts with 30-word banned-words constant</name>
  <files>
    lib/banned.ts
  </files>
  <action>
Create `C:/Users/micah/Code/micahjonesconsulting/lib/banned.ts` with the EXACT content from RESEARCH.md §7 "`lib/banned.ts` — 30-Word Banned-Words Constant". The `lib/` directory exists from Plan D — append this file.

Final file content (write verbatim from RESEARCH.md §7):

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

**Critical writing rules:**
- `as const` is required so the type inference produces a tuple of string literals, not `string[]`.
- All entries lowercase.
- Order matters cosmetically (blueprint §8 first, harness defaults second) but not functionally.
- Total entries MUST be 30 — verify count after writing.
- Export both `BANNED_WORDS` (the const) and `BannedWord` (the derived type).
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && test -f lib/banned.ts && grep -q "export const BANNED_WORDS" lib/banned.ts && grep -q "export type BannedWord" lib/banned.ts && grep -q "\"unlock\"" lib/banned.ts && grep -q "\"at the intersection of\"" lib/banned.ts && grep -q "\"empower\"" lib/banned.ts && grep -q "as const" lib/banned.ts && [ "$(grep -c '^  \"' lib/banned.ts)" -eq 30 ] && echo "PASS — exactly 30 entries" || echo "FAIL"</automated>
  </verify>
  <done>
    `lib/banned.ts` exists with exactly 30 banned-word entries; exports `BANNED_WORDS` (with `as const`) and `BannedWord` (derived type); ordered with blueprint §8 first.
  </done>
</task>

<task type="auto">
  <name>Task F2: Write lib/copy-lint.ts with scanString + formatFindings</name>
  <files>
    lib/copy-lint.ts
  </files>
  <action>
Create `C:/Users/micah/Code/micahjonesconsulting/lib/copy-lint.ts` with the EXACT content from RESEARCH.md §8 "`lib/copy-lint.ts` — Build-Time Scanner Module".

Final file content (write verbatim from RESEARCH.md §8):

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

**Critical writing rules:**
- Import path MUST be `@/lib/banned` (uses `@/*` alias from tsconfig).
- The non-null assertion `lines[i]!` is intentional — TypeScript strict mode with `noUncheckedIndexedAccess` (from Plan A Task A3) would otherwise type `lines[i]` as `string | undefined`. The `!` asserts non-null because the `for` loop's bound (`i < lines.length`) guarantees `lines[i]` exists.
- Similarly, `match[1]!` is correct because the regex always has a single capture group around the alternation.
- The pattern is compiled ONCE at module-evaluation time via `BANNED_PATTERN = buildPattern()`. Resetting `BANNED_PATTERN.lastIndex = 0` before each `exec` is required because the `g` flag is set.
- The regex flag is `gi` — `g` for find-all, `i` for case-insensitive.
- The `excerpt` slice uses `Math.max(0, ...)` to avoid negative starts.
- Function ordering: `Finding` interface → `buildPattern()` private → `BANNED_PATTERN` const → `scanString` → `formatFindings`.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && test -f lib/copy-lint.ts && grep -q "import { BANNED_WORDS } from \"@/lib/banned\"" lib/copy-lint.ts && grep -q "export interface Finding" lib/copy-lint.ts && grep -q "export function scanString" lib/copy-lint.ts && grep -q "export function formatFindings" lib/copy-lint.ts && grep -q "buildPattern" lib/copy-lint.ts && grep -q "\\\\b" lib/copy-lint.ts && grep -q "gi" lib/copy-lint.ts && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    `lib/copy-lint.ts` exists; exports `Finding` interface + `scanString` + `formatFindings`; imports `BANNED_WORDS` from `@/lib/banned`; uses word-boundary regex for single words and literal matching for multi-word phrases; regex compiles once at module load.
  </done>
</task>

<task type="auto">
  <name>Task F3: Write instrumentation.ts with no-op register() export</name>
  <files>
    instrumentation.ts
  </files>
  <action>
Create `C:/Users/micah/Code/micahjonesconsulting/instrumentation.ts` (at REPO ROOT, NOT inside `app/`) with the EXACT content from RESEARCH.md §9 "`instrumentation.ts` — Scaffold (no-op `register()`)".

Final file content (write verbatim from RESEARCH.md §9):

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

**Critical writing rules:**
- File MUST be at repo root (`C:/Users/micah/Code/micahjonesconsulting/instrumentation.ts`), NOT in `app/`. Next.js looks for it at root per the file convention.
- The `register` function MUST be `async` per Next.js convention (it must return a Promise).
- The function body is intentionally empty — Phase 2 fills it.
- DO NOT import `scanString` from `@/lib/copy-lint` here yet — that triggers Phase 2 wiring prematurely.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && test -f instrumentation.ts && test ! -f app/instrumentation.ts && grep -q "export async function register" instrumentation.ts && grep -q "No-op in Phase 1" instrumentation.ts && ! grep -q "import.*copy-lint" instrumentation.ts && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    `instrumentation.ts` exists at REPO ROOT (not inside `app/`); exports a no-op async `register()` function; no `lib/copy-lint` import (Phase 2 adds).
  </done>
</task>

</tasks>

<verification>
- All three files exist at correct paths (`lib/banned.ts`, `lib/copy-lint.ts`, `instrumentation.ts`)
- `lib/banned.ts` contains exactly 30 banned entries
- `lib/copy-lint.ts` imports from `@/lib/banned` and exports the right surface
- `instrumentation.ts` is at repo root, NOT inside `app/`
- Phase 2 can extend `instrumentation.ts` register() to invoke `scanString` against content/MDX and component string literals
- Will `pnpm typecheck` pass? Yes, once all Wave 2 files land. Plan J verifies.
</verification>

<success_criteria>
- SCAFF-06 (scaffold portion) ✓: `instrumentation.ts` file convention in place with no-op `register()`
- Phase 2 (COPY-03) can extend the scanner to fail the build on banned words
- `lib/banned.ts` is the single source of truth for the 30-entry banned list (also referenced by `.claude/brand.json` per Plan G)
- `lib/copy-lint.ts` is callable from any TypeScript file once Phase 2 invokes it
</success_criteria>

<output>
After completion, create `.planning/phases/01-scaffold-tokens-dns/01-F-SUMMARY.md` confirming:
- `lib/banned.ts` has 30 entries (blueprint §8 + harness defaults)
- `lib/copy-lint.ts` exports Finding/scanString/formatFindings with word-boundary regex
- `instrumentation.ts` at repo root with no-op register()
- Phase 2 will wire register() to invoke scanString across project content
</output>
