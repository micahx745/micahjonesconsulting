// lib/copy-lint-runner.ts
//
// Phase 2 — COPY-03. Walks the project directories, reads each file, and
// runs scanString() from lib/copy-lint.ts. Aggregates findings and throws
// a build-failing Error if any are found.
//
// Phase 7 — CASE-02. Extends the runner with a second pass: every
// content/work/*.mdx file is parsed with gray-matter and validated against
// the Zod schema in lib/case-study-schema.ts. Schema violations throw with
// file path + Zod issue list, failing the build alongside banned-word
// violations.
//
// Why a single runner (not two CLIs): one `pnpm build` pre-step is simpler
// than two; one error report is easier to read; both gates share the
// "scan content/ + app/" walk.
//
// Why a separate file (instead of inlining in instrumentation.ts):
//   - Keeps node:fs imports out of the instrumentation register() bundle.
//   - Enables direct import from `pnpm lint:copy`.
//   - Easier to unit-test in isolation.
//
// Source: lib/copy-lint.ts (Phase 1 scanString); COPY-03 spec; CASE-02 spec.
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { scanString, type Finding } from "@/lib/copy-lint";
import { caseStudyFrontmatterSchema } from "@/lib/case-study-schema";

const SCAN_TARGETS = [
  { dir: "content", extensions: [".mdx", ".md", ".ts"] }, // case studies + content/site.ts + content/citations.ts
  { dir: "app", extensions: [".tsx", ".ts"] }, // app/**/*.tsx — page.tsx, layout.tsx, metadata exports
];

const FRONTMATTER_TARGET_DIR = "content/work";

/**
 * Recursively walk a directory, yielding absolute paths of files whose
 * extensions match any of the provided list. Skips node_modules, .next, .git.
 */
async function* walk(dir: string, extensions: string[]): AsyncGenerator<string> {
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return;
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

interface SchemaFinding {
  filePath: string;
  issues: string[];
}

/**
 * Validate every content/work/*.mdx frontmatter against the Zod schema.
 * Returns an array of SchemaFinding for failures.
 */
async function scanMdxFrontmatter(cwd: string): Promise<SchemaFinding[]> {
  const dir = join(cwd, FRONTMATTER_TARGET_DIR);
  const findings: SchemaFinding[] = [];

  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return findings; // directory doesn't exist yet
  }

  for (const entry of entries) {
    if (!entry.endsWith(".mdx")) continue;
    const filePath = join(dir, entry);
    const relPath = `${FRONTMATTER_TARGET_DIR}/${entry}`;
    const raw = await readFile(filePath, "utf-8");
    const { data } = matter(raw);
    const parsed = caseStudyFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => {
        const path = i.path.join(".") || "(root)";
        return `${path}: ${i.message}`;
      });
      findings.push({ filePath: relPath, issues });
    }
  }

  return findings;
}

/**
 * Scan every targeted file for banned words AND validate MDX frontmatter.
 * Throws on any finding. Phase 2 was banned-words-only; Phase 7 adds the
 * frontmatter pass.
 */
export async function runCopyLint(): Promise<void> {
  const cwd = process.cwd();
  const bannedFindings: Finding[] = [];

  for (const target of SCAN_TARGETS) {
    const root = join(cwd, target.dir);
    for await (const filePath of walk(root, target.extensions)) {
      const content = await readFile(filePath, "utf-8");
      const relPath = filePath.slice(cwd.length + 1).replace(/\\/g, "/");
      bannedFindings.push(...scanString(content, relPath, 1));
    }
  }

  const schemaFindings = await scanMdxFrontmatter(cwd);

  const errors: string[] = [];

  if (bannedFindings.length > 0) {
    errors.push(`[copy-lint] ${bannedFindings.length} banned word finding(s):`);
    for (const f of bannedFindings) {
      errors.push(`  ${f.filePath}:${f.line}:${f.column} — "${f.word}" in: "...${f.excerpt}..."`);
    }
  }

  if (schemaFindings.length > 0) {
    errors.push(
      `[case-study-schema] ${schemaFindings.length} MDX file(s) with invalid frontmatter:`,
    );
    for (const f of schemaFindings) {
      errors.push(`  ${f.filePath}:`);
      for (const issue of f.issues) {
        errors.push(`    - ${issue}`);
      }
    }
  }

  if (errors.length === 0) {
    console.log(
      `[copy-lint] ✓ Scanned project. Zero banned-word findings, zero schema violations.`,
    );
    return;
  }

  console.error("\n" + errors.join("\n") + "\n");

  throw new Error(
    `copy-lint: ${bannedFindings.length} banned-word + ${schemaFindings.length} schema violation(s). ` +
      `Fix the prose / frontmatter or update lib/banned.ts / lib/case-study-schema.ts. Build aborted.`,
  );
}
