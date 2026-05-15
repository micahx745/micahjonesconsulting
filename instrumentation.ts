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
