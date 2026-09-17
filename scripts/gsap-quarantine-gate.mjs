// scripts/gsap-quarantine-gate.mjs: GSAP stays inside the files that own the
// one signature motion (.claude/CLAUDE.md: the one importer is SplitReveal.tsx).
//
// The Pass-111a review (gate lens) broke the first version four ways: it never
// matched "@gsap/react", the package the allowlisted file uses; it missed a
// dynamic import("gsap"); it missed require() and `export ... from "gsap"`; and
// it failed the build on an import written inside a comment. It now strips
// comments, then flags any module specifier naming gsap, gsap/<sub> or
// @gsap/<pkg> in an import or export-from, a side-effect import, a dynamic
// import() or a require(), and proves that on a planted probe (--self-test) at
// the start of every build, so a later edit that weakens it fails the build.
//
// LIMITS, both of which fail loud rather than quiet: an import-shaped line
// inside a template literal is still read as code, and "//" in JSX text (a
// bare URL) is read as a comment to the end of that line.
import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";

const ROOTS = ["app", "components", "lib", "content", "hooks"];
const SOURCE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
]);
const ALLOWLIST = new Set([
  // pre-existing exception recorded in Pass-111a: mounted on every home section title; moving it off GSAP is its own arc, not a precedent
  "components/color-worlds/SplitReveal.tsx",
]);

const SPEC = String.raw`(?:gsap|@gsap\/[\w.-]+)(?:\/[^"'\x60]*)?`;
const GSAP_USE = new RegExp(
  String.raw`(?:\bfrom|\bimport|\bimport\s*\(|\brequire\s*\()\s*(["'\x60])` +
    SPEC +
    String.raw`\1`,
);

// Comments become spaces (newlines kept, so line numbers hold); strings are
// copied through untouched so a "//" inside a URL string is not a comment.
function stripComments(src) {
  let out = "";
  let quote = null;
  for (let i = 0; i < src.length; ) {
    const c = src[i];
    const d = src[i + 1];
    if (quote) {
      out += c;
      if (c === "\\" && d !== undefined) {
        out += d;
        i += 2;
        continue;
      }
      if (c === quote) quote = null;
      i++;
    } else if (c === '"' || c === "'" || c === "`") {
      quote = c;
      out += c;
      i++;
    } else if (c === "/" && d === "/") {
      const end = src.indexOf("\n", i);
      i = end === -1 ? src.length : end;
    } else if (c === "/" && d === "*") {
      const close = src.indexOf("*/", i + 2);
      const end = close === -1 ? src.length : close + 2;
      out += src.slice(i, end).replace(/[^\n]/g, " ");
      i = end;
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

const usesGsap = (source) => GSAP_USE.test(stripComments(source));

if (process.argv.includes("--self-test")) {
  const positives = [
    'import gsap from "gsap";',
    'import { useGSAP } from "@gsap/react";',
    'const { default: g } = await import("gsap");',
    "const st = await import('gsap/ScrollTrigger');",
    'const g = require("gsap");',
    'export * from "gsap";',
    'export { gsap } from "gsap/all";',
    'import "gsap";',
    'import type { GSAPTween } from "gsap";',
    'import {\n  gsap,\n} from "gsap";',
    'const u = "https://example.com"; const g = await import("gsap");',
    "const g = await import(`gsap`);",
    'const x = 1; /* note */ import("@gsap/react");',
  ];
  const negatives = [
    '// import gsap from "gsap";',
    '/* import { useGSAP } from "@gsap/react"; */',
    '/**\n * import gsap from "gsap";\n */',
    'import x from "gsapish";',
    'import x from "@gsapx/react";',
    'import x from "./gsap-free";',
    'const s = "gsap";',
  ];
  const missed = positives.filter((s) => !usesGsap(s));
  const falsePos = negatives.filter((s) => usesGsap(s));
  for (const s of missed)
    console.error(
      `gsap-quarantine-gate self-test: MISSED ${JSON.stringify(s)}`,
    );
  for (const s of falsePos)
    console.error(
      `gsap-quarantine-gate self-test: FALSE POSITIVE ${JSON.stringify(s)}`,
    );
  if (missed.length || falsePos.length) process.exit(1);
  console.log(
    `gsap-quarantine-gate self-test: ${positives.length} planted uses caught, ${negatives.length} near misses clean`,
  );
  process.exit(0);
}

async function sourceFiles(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (e) {
    if (e.code === "ENOENT") return [];
    throw e;
  }
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await sourceFiles(path)));
    } else if (SOURCE_EXTENSIONS.has(extname(entry.name))) {
      files.push(path);
    }
  }
  return files;
}

const files = (await Promise.all(ROOTS.map(sourceFiles))).flat().sort();
const violations = [];

for (const file of files) {
  const projectPath = relative(process.cwd(), file).split(sep).join("/");
  if (ALLOWLIST.has(projectPath)) continue;
  if (usesGsap(await readFile(file, "utf8"))) violations.push(projectPath);
}

if (violations.length > 0) {
  for (const file of violations) {
    console.error(`gsap-quarantine-gate: forbidden import: ${file}`);
  }
  process.exitCode = 1;
} else {
  console.log(`gsap-quarantine-gate: clean (${files.length} files)`);
}
