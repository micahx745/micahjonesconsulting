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
async function* walk(
  dir: string,
  extensions: string[],
): AsyncGenerator<string> {
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git")
      continue;
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
 * LESSONS #11 (2026-09-01) — the em-dash cap, made mechanical.
 *
 * The house rule (blueprint §8, .claude/CLAUDE.md "Voice") caps em-dashes at ONE per page,
 * because a run of them is an AI tell. Enforcement was a subagent's eyes, so it drifted: the
 * three live case studies carried 5, 8 and 11, and four shipped pages carried 4 to 13. A rule
 * a human has to count by hand is not a rule.
 *
 * MDX counts every em-dash, frontmatter included — all of it is rendered prose.
 * TSX counts only em-dashes OUTSIDE comments: this codebase writes long explanatory comment
 * blocks that legitimately use them, and the rule is about what a reader sees. Line comments
 * are stripped only when they begin the line, so a "//" inside a URL cannot swallow real prose
 * after it on the same line — a false negative is acceptable here, a false positive is not.
 */
const EM_DASH = "—";
const EM_DASH_CAP = 1;

/**
 * Which extensions FAIL the build. MDX is long-form prose the reader consumes whole, and it is
 * where the drift was worst (5, 8 and 11 against a cap of 1). The .tsx pages carry their own
 * smaller debt (2-5 each, verified 2026-09-01); sweeping those touches copy the operator just
 * approved, so it is queued as its own unit rather than smuggled in behind a lint change.
 * Widening the gate later is this one line.
 */
const EM_DASH_BLOCKING_EXTS = [".mdx", ".md"];

interface EmDashFinding {
  filePath: string;
  count: number;
  lines: number[];
}

/**
 * Blank out TSX comments while PRESERVING line structure, so a reported line number always
 * points at the line a person has to edit. Replacing a block comment with "" instead of its
 * own newlines is what made the first cut of this gate cite comment lines it had not counted.
 */
function visibleProse(source: string, isTsx: boolean): string {
  if (!isTsx) return source;
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/[^\n]/g, " "))
    .replace(/^([ \t]*)\/\/.*$/gm, "$1");
}

/**
 * An HTML entity renders as an em-dash and reads as one. `/about` carried `&mdash;` and sailed
 * past the first cut of this gate, which counted only the literal character.
 */
function normalizeDashes(source: string): string {
  return source.replace(/&mdash;|&#8212;|&#x2014;/gi, EM_DASH);
}

/** Count em-dashes in prose files; report any blocking file over the cap. */
async function scanEmDashes(cwd: string): Promise<EmDashFinding[]> {
  const findings: EmDashFinding[] = [];

  for (const target of SCAN_TARGETS) {
    const root = join(cwd, target.dir);
    for await (const filePath of walk(root, target.extensions)) {
      const relPath = filePath.slice(cwd.length + 1).replace(/\\/g, "/");
      if (!EM_DASH_BLOCKING_EXTS.some((ext) => relPath.endsWith(ext))) continue;

      const raw = await readFile(filePath, "utf-8");
      const prose = normalizeDashes(
        visibleProse(raw, relPath.endsWith(".tsx")),
      );
      const count = prose.split(EM_DASH).length - 1;
      if (count <= EM_DASH_CAP) continue;

      // Line numbers come from the SAME stripped text, so count and citation agree.
      const lines: number[] = [];
      prose.split(/\r?\n/).forEach((line, i) => {
        if (line.includes(EM_DASH)) lines.push(i + 1);
      });
      findings.push({ filePath: relPath, count, lines });
    }
  }

  return findings;
}

/**
 * Scan every targeted file for banned words AND validate MDX frontmatter.
 * Throws on any finding. Phase 2 was banned-words-only; Phase 7 adds the
 * frontmatter pass; Pass-59 adds the em-dash cap.
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
      errors.push(
        `  ${f.filePath}:${f.line}:${f.column} — "${f.word}" in: "...${f.excerpt}..."`,
      );
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

  const emDashFindings = await scanEmDashes(cwd);

  if (emDashFindings.length > 0) {
    errors.push(
      `[em-dash-cap] ${emDashFindings.length} file(s) over the ${EM_DASH_CAP}-per-page cap:`,
    );
    for (const f of emDashFindings) {
      errors.push(
        `  ${f.filePath}: ${f.count} em-dashes (cap ${EM_DASH_CAP}) on lines ${f.lines.join(", ")}`,
      );
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
