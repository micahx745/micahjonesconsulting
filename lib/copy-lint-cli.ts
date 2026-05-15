// lib/copy-lint-cli.ts
//
// Phase 2 — COPY-03. CLI wrapper that runs lib/copy-lint-runner.ts as a
// pre-build step. Invoked from package.json `build` script via:
//
//   "build": "tsx lib/copy-lint-cli.ts && next build"
//
// Why not instrumentation.ts: per Next.js 16 docs (verified against
// node_modules/next/dist/docs/01-app/02-guides/instrumentation.md), the
// `register()` export fires when a new SERVER instance starts (next dev,
// next start), NOT during `next build`. The build-time scanner cannot live
// in instrumentation.ts.
//
// Why a separate CLI (instead of inlining): keeps the runner reusable as
// a standalone `pnpm lint:copy` command and gives the build script a
// single-line invocation. Process exit code propagates up to pnpm.
//
// Source: COPY-03 spec; verified Next.js 16 instrumentation behavior.
import { runCopyLint } from "./copy-lint-runner";

async function main(): Promise<void> {
  try {
    await runCopyLint();
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}

void main();
