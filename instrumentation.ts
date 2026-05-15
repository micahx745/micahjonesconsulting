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
// Per Next.js 16 docs (node_modules/next/dist/docs/01-app/02-guides/instrumentation.md):
// register() runs once when a new Next.js SERVER instance is initiated (next dev, next start),
// NOT during `next build`. The build-time scanner therefore cannot live here — it lives
// as a pre-build CLI script invoked from package.json `build` script (lib/copy-lint-cli.ts).
//
// This file is kept as a no-op to preserve the instrumentation convention slot. If we
// later wire OpenTelemetry / Sentry / similar runtime observability, this is where it lives.
export async function register() {
  // No-op. See header comment for rationale and `pnpm build` script wiring.
}
