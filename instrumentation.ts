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
