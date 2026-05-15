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
