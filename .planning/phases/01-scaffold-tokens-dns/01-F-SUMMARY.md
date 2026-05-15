---
phase: 01-scaffold-tokens-dns
plan: F
status: complete
completed: 2026-05-14
---

# Plan 01-F: Copy-Lint Scaffold — SUMMARY

## What was built

Created the three-file copy-lint module scaffold: `lib/banned.ts` (30-word constant), `lib/copy-lint.ts` (regex-based scanner with `scanString` + `formatFindings`), `instrumentation.ts` (Next.js convention scaffold with no-op `register()`). Phase 2 (COPY-03) will extend `instrumentation.ts.register()` to invoke `scanString` across MDX content + component string literals + metadata exports, failing the build with file:line:column on any banned-word finding.

## Files created

- `lib/banned.ts` — `BANNED_WORDS` const (30 entries, `as const`) + `BannedWord` derived type
- `lib/copy-lint.ts` — `Finding` interface + `buildPattern()` private + `BANNED_PATTERN` const + `scanString(text, filePath, lineOffset?)` + `formatFindings(findings)`
- `instrumentation.ts` — at repo root (NOT inside `app/`); no-op async `register()` export

## 30 banned words breakdown

- **Blueprint §8 top-9 (positions 1-9):** unlock, drive, leverage, elevate, synergy, transformative, game-changing, best-in-class, at the intersection of
- **Harness slop-words.txt defaults + research extensions (positions 10-30):** seamless, seamlessly, cutting-edge, revolutionary, world-class, next-generation, holistic, robust, innovative, dive deep, circle back, low-hanging fruit, move the needle, make an impact, delight users, craft experiences, passionate about, obsessed with, journey, solutions, empower

Total verified: 30 entries (verified via `grep -c '^  "' lib/banned.ts`).

## Scanner design

- Single compiled regex at module load (`BANNED_PATTERN = buildPattern()`)
- Word-boundary anchors (`\b...\b`) for single-word entries (so "drive" doesn't match "driver")
- Literal matching for multi-word phrases (so "at the intersection of" works)
- Case-insensitive flag (`gi`)
- TypeScript strict mode compatible — uses `lines[i]!` and `match[1]!` non-null assertions (justified by loop bounds and regex capture group)

## Requirements covered

- SCAFF-06 (Phase 1 scaffold portion): `instrumentation.ts` file convention in place with no-op `register()`. Build-time invocation deferred to Phase 2 (COPY-03).

## Notes

`instrumentation.ts` deliberately does NOT import from `@/lib/copy-lint` yet. Importing without invocation is wasted module load; Phase 2 adds both the import and the call sites.

## Key files

```yaml
key-files:
  created:
    - lib/banned.ts
    - lib/copy-lint.ts
    - instrumentation.ts
```
