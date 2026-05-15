---
phase: 02-root-layout-lenis-transitions
plan: D
type: execute
wave: 1
depends_on: []
files_modified:
  - lib/copy-lint-runner.ts
  - instrumentation.ts
autonomous: true
requirements:
  - COPY-01
  - COPY-02
  - COPY-03
must_haves:
  truths:
    - "lib/copy-lint-runner.ts walks content/** and app/** (graceful on missing dirs), reads each file as UTF-8, calls scanString from lib/copy-lint.ts, aggregates findings."
    - "instrumentation.ts register() gates on process.env.NEXT_RUNTIME === 'nodejs' AND process.env.NEXT_PHASE === 'phase-production-build' — scanner runs on `next build`, never on `next dev` or at request time."
    - "On any finding, runCopyLint() prints '[copy-lint] N banned word finding(s):' followed by 'file:line:column — word in: excerpt' rows, then throws an Error to abort the build."
    - "On zero findings, runCopyLint() logs '[copy-lint] OK Scanned project. Zero banned-word findings.' and returns normally."
    - "Scanner skips node_modules, .next, .git directories (verified by walk() filter)."
    - "lib/copy-lint.ts (Phase 1) is consumed AS-IS — no edits to scanString or BANNED_PATTERN. The runner is a pure orchestration layer."
    - "lib/banned.ts (Phase 1, 30-word list) is consumed transitively via lib/copy-lint.ts — COPY-01 satisfied via existing artifact."
  artifacts:
    - path: "lib/copy-lint-runner.ts"
      provides: "Directory walker + project scanner that calls scanString from lib/copy-lint.ts and throws on findings"
      contains: "runCopyLint"
      exports: ["runCopyLint"]
      min_lines: 50
    - path: "instrumentation.ts"
      provides: "Build-time copy-lint trigger gated to phase-production-build"
      contains: "NEXT_PHASE"
  key_links:
    - from: "instrumentation.ts register()"
      to: "lib/copy-lint-runner.ts runCopyLint()"
      via: "dynamic await import"
      pattern: "await import\\(['\"]\\./lib/copy-lint-runner['\"]\\)"
    - from: "lib/copy-lint-runner.ts"
      to: "lib/copy-lint.ts scanString"
      via: "import + iteration over walk() results"
      pattern: "scanString\\(content,"
    - from: "walk() directory iteration"
      to: "skip-list"
      via: "string equality check"
      pattern: "node_modules"
---

<objective>
Wire the build-time copy-lint scanner into the Next.js instrumentation hook. Create the new file `lib/copy-lint-runner.ts` (directory walker + scanner orchestration) and replace the Phase 1 no-op `instrumentation.ts` with the production-gated `register()` that invokes the runner during `next build` only.

Purpose: REQ COPY-01 (consumed via existing lib/banned.ts — verified), COPY-02 (consumed via existing lib/copy-lint.ts — verified), COPY-03 (the actual build-time enforcement — this plan delivers it).

Output: Running `pnpm build` scans `content/**` and `app/**` for banned words. On any finding, the build aborts with `file:line:column` reporting. On clean scan, it logs a success line. Phase 1 artifacts (lib/banned.ts 30-word list + lib/copy-lint.ts scanString) are reused unchanged.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/02-root-layout-lenis-transitions/02-RESEARCH.md
@.planning/phases/01-scaffold-tokens-dns/01-F-SUMMARY.md
@lib/copy-lint.ts
@lib/banned.ts
@instrumentation.ts

**Phase 1 reuse (verified by reading current files):**
- `lib/banned.ts` exports `BANNED_WORDS` (30 entries) + `BannedWord` derived type. No edits needed — this satisfies COPY-01.
- `lib/copy-lint.ts` exports `scanString(text, filePath, lineOffset?) -> Finding[]` + `formatFindings()`. The implementation is correct (word-boundary regex for single words, literal match for phrases, case-insensitive). No edits needed — this satisfies COPY-02.
- `instrumentation.ts` is a Phase 1 stub with a no-op `register()`. Phase 2 replaces it.

**Why a separate `lib/copy-lint-runner.ts` (instead of inlining in instrumentation.ts) per RESEARCH.md Code Examples §7:**
- Keeps `node:fs` imports out of the instrumentation register() bundle (which Next.js prefers small).
- Enables direct import from a future CLI script without going through `next build`.
- Easier to unit-test in isolation.

**Why gate on NEXT_PHASE === 'phase-production-build' per RESEARCH.md Pitfall 4:**
`register()` runs at server boot. Without gating, `next dev` reboots cause the scan to run on every Fast Refresh. Gate to phase-production-build so the scan runs exactly once per `pnpm build`.

**NEXT_PHASE values (canonical Next.js convention):**
- `phase-development-server` — `next dev`
- `phase-production-server` — `next start`
- `phase-production-build` — `next build` (THIS is the only one we want)
- `phase-export` — legacy static export

**Why dynamic await import instead of static import:**
Static import loads the runner module on every server boot (even when the gating returns early). Dynamic import loads it only when the gate passes. The runner pulls in node:fs/promises and node:path which adds bundle cost. Dynamic import keeps instrumentation.ts small.

**Why scan only content/** and app/** (not, e.g., components/** or lib/**):**
- `content/**` — case studies (Phase 7+) and site globals (`content/site.ts` Phase 6+) — high-prose density.
- `app/**` — page.tsx files with `metadata` exports (Phase 6+ titles, descriptions) and any visible string literals.
- `components/**` and `lib/**` are out of scope per RESEARCH.md.

The walker uses `try { readdir }` to gracefully skip missing directories so this works even in Phase 2 when `content/` doesn't exist yet.

**False-positive policy (RESEARCH.md "User Constraints" Claude's Discretion):**
Word-boundary regex over raw text catches more than AST parsing would. False positives (e.g., a banned word inside a code comment) are acceptable — the harness `copy-lint.sh` at write boundary catches most issues before they reach instrumentation.ts. If a false positive blocks a build, the fix is either rewording or adjusting `lib/banned.ts`.

**Verification path (Plan 02-G):**
Plan 02-G runs a negative test: inject a literal containing a banned word into a TSX file, run `pnpm build`, confirm it fails with `file:line:column` reporting. Then remove the test string and confirm the build passes clean.

**Harness hook awareness:**
- `copy-lint.sh` (write boundary) — this plan's files contain only technical log strings (no banned words). Verify the literal strings inside `console.error` / `console.log` don't accidentally contain entries from lib/banned.ts.
- `motion-discipline.sh` — no relevant patterns in this plan's files.
- `font-license.sh` — no font references.

<interfaces>
Phase 1 exports (consumed unchanged):

From `@/lib/banned`:
```typescript
export const BANNED_WORDS: readonly string[];
export type BannedWord = (typeof BANNED_WORDS)[number];
```

From `@/lib/copy-lint`:
```typescript
export interface Finding {
  word: string;
  filePath: string;
  line: number;
  column: number;
  excerpt: string;
}

export function scanString(text: string, filePath: string, lineOffset?: number): Finding[];
export function formatFindings(findings: Finding[]): string;
```

Node built-ins:

From `node:fs/promises`:
```typescript
export function readFile(path: string, encoding: "utf-8"): Promise<string>;
export function readdir(path: string): Promise<string[]>;
export function stat(path: string): Promise<{ isDirectory(): boolean }>;
```

From `node:path`:
```typescript
export function join(...segments: string[]): string;
```

This plan creates these exports:

From `@/lib/copy-lint-runner` (NEW):
```typescript
export function runCopyLint(): Promise<void>;
// Throws Error with banned-word findings on failure; logs success on clean scan.
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task D1: Create lib/copy-lint-runner.ts</name>
  <files>lib/copy-lint-runner.ts</files>
  <action>
Create the new file `lib/copy-lint-runner.ts`. Write the following content VERBATIM (from 02-RESEARCH.md Code Examples §7):

```ts
// lib/copy-lint-runner.ts
//
// Phase 2 — COPY-03. Walks the project directories, reads each file, and
// runs scanString() from lib/copy-lint.ts. Aggregates findings and throws
// a build-failing Error if any are found.
//
// Why a separate file (instead of inlining in instrumentation.ts):
//   - Keeps node:fs imports out of the instrumentation register() bundle
//     (which is supposed to be small; Next.js complains if it grows too much).
//   - Enables direct import from a future CLI script (`pnpm lint:copy`) if
//     we ever want a standalone command without going through `next build`.
//   - Easier to unit-test in isolation.
//
// Source: lib/copy-lint.ts (Phase 1 scanString); COPY-03 spec.
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { scanString, type Finding } from "@/lib/copy-lint";

const SCAN_TARGETS = [
  { dir: "content", extensions: [".mdx", ".md", ".ts"] }, // case studies + content/site.ts + content/citations.ts
  { dir: "app", extensions: [".tsx", ".ts"] }, // app/**/*.tsx — page.tsx, layout.tsx, metadata exports
];

/**
 * Recursively walk a directory, yielding absolute paths of files whose
 * extensions match any of the provided list. Skips node_modules, .next, .git.
 */
async function* walk(dir: string, extensions: string[]): AsyncGenerator<string> {
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return; // directory doesn't exist yet (e.g., content/ before Phase 7)
  }

  for (const entry of entries) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
    const full = join(dir, entry);
    const s = await stat(full);
    if (s.isDirectory()) {
      yield* walk(full, extensions);
    } else if (extensions.some((ext) => entry.endsWith(ext))) {
      yield full;
    }
  }
}

/**
 * Scan every targeted file. Throws on any finding.
 */
export async function runCopyLint(): Promise<void> {
  const cwd = process.cwd();
  const findings: Finding[] = [];

  for (const target of SCAN_TARGETS) {
    const root = join(cwd, target.dir);
    for await (const filePath of walk(root, target.extensions)) {
      const content = await readFile(filePath, "utf-8");
      const relPath = filePath.slice(cwd.length + 1).replace(/\\/g, "/");
      findings.push(...scanString(content, relPath, 1));
    }
  }

  if (findings.length === 0) {
    console.log(`[copy-lint] ✓ Scanned project. Zero banned-word findings.`);
    return;
  }

  console.error(`\n[copy-lint] ${findings.length} banned word finding(s):\n`);
  for (const f of findings) {
    console.error(`  ${f.filePath}:${f.line}:${f.column} — "${f.word}" in: "...${f.excerpt}..."`);
  }
  console.error("");

  // Throw to fail the build.
  throw new Error(
    `copy-lint: ${findings.length} banned word(s) found across project. ` +
      `Fix the prose or update lib/banned.ts. Build aborted.`,
  );
}
```

IMPORTANT — what must NOT change:
- Do NOT change the `SCAN_TARGETS` array to include `components/**` or `lib/**` in Phase 2 — out of scope per RESEARCH.md.
- Do NOT change the `try { readdir } catch { return; }` graceful-skip — the runner MUST work in Phase 2 even when `content/` doesn't exist.
- Do NOT replace `scanString` with a different scanner — Phase 1's implementation is correct and `lib/copy-lint.ts` MUST be reused as-is.
- Do NOT add `process.exit(1)` — throw an Error instead so Next.js can format the build failure correctly.
- The relPath normalization (`.replace(/\\/g, "/")`) handles Windows-style backslashes — REQUIRED because the project runs on win32.
- No banned words in the log strings — verify against `lib/banned.ts` before committing. (The strings `Scanned project`, `banned word`, `findings`, `Fix the prose`, `Build aborted` are all safe — none appear in the 30-word list.)
  </action>
  <verify>
    <automated>cd /c/Users/micah/Code/micahjonesconsulting && test -f lib/copy-lint-runner.ts && grep -q "runCopyLint" lib/copy-lint-runner.ts && grep -q "scanString" lib/copy-lint-runner.ts && grep -q "node:fs/promises" lib/copy-lint-runner.ts && grep -q "SCAN_TARGETS" lib/copy-lint-runner.ts && grep -q "node_modules" lib/copy-lint-runner.ts && grep -q "throw new Error" lib/copy-lint-runner.ts && pnpm typecheck 2>&1 | tail -10</automated>
  </verify>
  <done>
- File `lib/copy-lint-runner.ts` exists.
- File exports `runCopyLint()` (async, returns `Promise<void>`).
- Imports `readFile, readdir, stat` from `node:fs/promises` and `join` from `node:path`.
- Imports `scanString, type Finding` from `@/lib/copy-lint` (Phase 1 reuse).
- `SCAN_TARGETS` array includes `{ dir: "content", ... }` and `{ dir: "app", ... }`.
- `walk()` skips `node_modules`, `.next`, `.git`.
- `walk()` gracefully returns when `readdir` throws (missing directory).
- `runCopyLint()` logs success line on zero findings.
- `runCopyLint()` throws `Error` on findings.
- `pnpm typecheck` passes.
  </done>
</task>

<task type="auto">
  <name>Task D2: Replace instrumentation.ts with the production-gated register()</name>
  <files>instrumentation.ts</files>
  <action>
Replace the current `instrumentation.ts` (Phase 1 no-op stub at repo root) with the following content VERBATIM (from 02-RESEARCH.md Code Examples §6):

```ts
// instrumentation.ts
//
// Phase 2 — COPY-03. Build-time copy-lint scanner. Runs once per `pnpm build`
// (gated to NEXT_PHASE === 'phase-production-build') and throws with
// file:line:column on any banned-word finding.
//
// Phase 1 left this as a no-op stub. Phase 2 wires the scanner.
//
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
//         + COPY-03 in REQUIREMENTS.md
//         + lib/copy-lint.ts (Phase 1 — scanString already implemented correctly)
//
// Why dynamic import: keeps the scanner code out of the request-time bundle.
// register() runs once at server boot; the import resolves on first call only.
export async function register() {
  // Only run during production build, never at dev or runtime request.
  // NEXT_PHASE values: 'phase-development-server' | 'phase-production-server'
  //                  | 'phase-production-build' | 'phase-export'.
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NEXT_PHASE !== "phase-production-build") return;

  const { runCopyLint } = await import("./lib/copy-lint-runner");
  await runCopyLint();
}
```

IMPORTANT — what must NOT change:
- The path-import string `"./lib/copy-lint-runner"` MUST use a relative path (NOT the `@/` alias). Next.js instrumentation.ts is at the repo root and the runtime resolver may not have the alias mapping yet at server boot. Verified pattern.
- Both gates `NEXT_RUNTIME === "nodejs"` AND `NEXT_PHASE === "phase-production-build"` must remain — removing either one will cause the scanner to run on `next dev` or in the Edge runtime.
- Do NOT add a top-level static `import` of `./lib/copy-lint-runner` — that defeats the dynamic-import benefit.
- Do NOT add error catching around the dynamic import or runCopyLint call — let errors bubble up so Next.js fails the build cleanly.
- No banned words in comments — verify before commit. (None present in the content above.)

This replaces the Phase 1 no-op `register()` entirely. The Phase 1 comment block can be replaced; do not preserve it.
  </action>
  <verify>
    <automated>cd /c/Users/micah/Code/micahjonesconsulting && grep -q "NEXT_RUNTIME" instrumentation.ts && grep -q "NEXT_PHASE" instrumentation.ts && grep -q "phase-production-build" instrumentation.ts && grep -q "lib/copy-lint-runner" instrumentation.ts && grep -q "runCopyLint" instrumentation.ts && ! grep -q "No-op in Phase 1" instrumentation.ts && pnpm typecheck 2>&1 | tail -10</automated>
  </verify>
  <done>
- `instrumentation.ts` `register()` includes both `NEXT_RUNTIME === "nodejs"` and `NEXT_PHASE === "phase-production-build"` early-return gates.
- Dynamic `await import("./lib/copy-lint-runner")` present.
- Calls `await runCopyLint()` after import.
- Phase 1 placeholder text `"No-op in Phase 1"` is GONE.
- `pnpm typecheck` passes.
  </done>
</task>

</tasks>

<verification>
1. **Files exist + structure** — automated grep checks confirm both files have the expected structure.
2. **No banned words in log strings** — manual review against `lib/banned.ts`: the strings "Scanned project", "banned word", "findings", "Fix the prose", "Build aborted", "banned-word findings" contain ZERO entries from the 30-word list. Verified.
3. **TypeScript** — `pnpm typecheck` passes; the runner imports use the existing `@/` alias mapping and tsconfig path resolution; instrumentation.ts uses a relative path.
4. **Gating works** — running `pnpm typecheck` does NOT execute `register()` (typecheck is type-only). The actual gating verification is in Plan 02-G after `pnpm build` runs.
5. **Negative test deferred to Plan 02-G:** injecting a banned word in a TSX file and running `pnpm build` to verify it fails with `file:line:column` reporting. Plan 02-G owns this verification.
</verification>

<success_criteria>
- `lib/copy-lint-runner.ts` exists with the exact RESEARCH.md §7 contents.
- `instrumentation.ts` contains the production-gated `register()` from RESEARCH.md §6.
- Both files compile cleanly (`pnpm typecheck` passes).
- COPY-01 satisfied (Phase 1 `lib/banned.ts` consumed transitively).
- COPY-02 satisfied (Phase 1 `lib/copy-lint.ts` consumed via `scanString` import).
- COPY-03 satisfied (build-time scan wired and gated).
</success_criteria>

<output>
After completion, create `.planning/phases/02-root-layout-lenis-transitions/02-D-SUMMARY.md` covering:
- New file: `lib/copy-lint-runner.ts` (directory walker + scanner orchestration)
- Modified file: `instrumentation.ts` (no-op stub replaced with production-gated `register()`)
- Phase 1 reuse: `lib/banned.ts` + `lib/copy-lint.ts` consumed unchanged
- Gating: `NEXT_RUNTIME === "nodejs"` AND `NEXT_PHASE === "phase-production-build"`
- Scan scope: `content/**/*.{mdx,md,ts}` + `app/**/*.{tsx,ts}` (graceful on missing dirs)
- Failure mode: throws Error with file:line:column rows on findings, prints success log on clean scan
- Forward-references:
  - Plan 02-G runs the negative test (inject banned word, confirm build fails)
  - Phase 7 case studies and Phase 6 page metadata exports will exercise the scanner in earnest
</output>
