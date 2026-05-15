---
phase: 02-root-layout-lenis-transitions
plan: D
status: complete
completed: 2026-05-14
requirements:
  - COPY-01
  - COPY-02
  - COPY-03
---

# 02-D copy-lint runner + instrumentation hook

## Outcome

Created `lib/copy-lint-runner.ts` (directory walker + scanner orchestration) and replaced the Phase 1 no-op `instrumentation.ts` with the production-gated `register()` that invokes the runner during `next build` only.

## Files

- **NEW** `lib/copy-lint-runner.ts` — exports `runCopyLint(): Promise<void>`. Walks `content/**` (.mdx, .md, .ts) and `app/**` (.tsx, .ts), skips `node_modules`, `.next`, `.git`. Gracefully returns on missing directories. Calls `scanString()` from Phase 1's `lib/copy-lint.ts`. Throws Error with `file:line:column` reporting on findings; logs `[copy-lint] ✓ Scanned project. Zero banned-word findings.` on clean scan.
- **MODIFIED** `instrumentation.ts` — `register()` early-returns unless `NEXT_RUNTIME === "nodejs"` AND `NEXT_PHASE === "phase-production-build"`. Uses dynamic `await import("./lib/copy-lint-runner")` to keep instrumentation small and avoid loading the scanner at dev-server boot.

## Phase 1 reuse (unchanged)

- `lib/banned.ts` — 30-word banned list. Consumed transitively via `lib/copy-lint.ts`. Satisfies COPY-01.
- `lib/copy-lint.ts` — exports `scanString()` and `formatFindings()`. Consumed directly by `lib/copy-lint-runner.ts`. Satisfies COPY-02.

## Gating

| Gate | Value | Reason |
|------|-------|--------|
| `NEXT_RUNTIME` | `"nodejs"` | Skip on Edge runtime. |
| `NEXT_PHASE` | `"phase-production-build"` | Skip on `next dev`, `next start`, and `phase-export`. The scanner runs exactly once per `pnpm build`. |

## Failure mode

On any finding:
- `console.error` prints `[copy-lint] N banned word finding(s):` followed by `<relPath>:<line>:<col> — "<word>" in: "...<excerpt>..."` rows.
- `throw new Error("copy-lint: ... Build aborted.")` aborts the build.

On zero findings:
- `console.log("[copy-lint] ✓ Scanned project. Zero banned-word findings.")` and return.

## Verification

- `pnpm typecheck` passes.
- Grep: `runCopyLint`, `scanString`, `node:fs/promises`, `SCAN_TARGETS`, `node_modules`, `throw new Error` in runner; `NEXT_RUNTIME`, `NEXT_PHASE`, `phase-production-build`, `lib/copy-lint-runner` in instrumentation; `No-op in Phase 1` absent.

## Forward-references

- Plan 02-G runs the negative test (inject banned word, confirm build fails with `file:line:column` reporting; then remove and confirm clean re-build).
- Phase 7 case studies and Phase 6 page metadata will exercise the scanner in earnest.
