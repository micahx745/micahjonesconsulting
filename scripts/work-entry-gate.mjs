// scripts/work-entry-gate.mjs — checks the RENDERED /work page, not the source.
//
// Why this exists (LESSONS #38). Commit 294f7c9 split two studies' `entry.line`
// into `entry.figure` + `entry.line` (content/work/rfp-engine.mdx: figure "$3M",
// line "in signed contracts." (Pass-123 cut the count); content/work/content-engine.mdx:
// figure "Up to 800,000", line "impressions in a month, up from a few thousand a
// month."). The non-lead render on app/(foyer)/work/page.tsx printed `entry.line`
// only — the figure field was never read — so both figures silently vanished from
// the rendered /work page while every existing check kept passing: the frontmatter
// was valid, the page rendered, render-gate's LINKS/META/GLUE/DASH checks never
// look at prose content at all. A source-level check (does the MDX have a figure
// field?) would have kept passing too; the defect was only visible in the bytes a
// reader receives. Fixing the render without a gate that reads those bytes back is
// an incomplete fix — the next split would vanish the same way.
//
// What this checks: for every PUBLISHED study's `entry`, the /work page must show
// `${figure} ${line}` when a figure exists (else just `line`), somewhere in the
// page's visible text. Reads the prerendered HTML in .next/server/app/work.html,
// same rationale as render-gate.mjs — that is what a reader actually receives.
//
// Runs at the END of `pnpm build`, after next build has produced the HTML (and
// after the self-test, so a broken matcher never gets to certify a real page).
// Exit 1 listing every study whose expected string is missing from the page.
import { readFileSync, existsSync } from "node:fs";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = "content/work";
const DEFAULT_HTML = join(".next", "server", "app", "work.html");

// --- entity decoding + visible-text reduction ----------------------------
// Numeric entities first (decimal and hex), named entities next, &amp; LAST
// so an already-escaped "&amp;#x27;" is never double-decoded. Matches the
// approach in .planning/exec/visible-text.mjs.
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

// HTML -> the text a reader sees: drop <script>/<style>/<template> contents
// (the RSC flight payload, CSS, and any inert template blocks would otherwise
// repeat or pollute the prose), strip every remaining tag to a space so words
// either side of a tag boundary never fuse, decode entities, then collapse
// all whitespace to single spaces.
function toVisibleText(html) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<template[\s\S]*?<\/template>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return decodeEntities(stripped).replace(/\s+/g, " ").trim();
}

// Plain String.prototype.indexOf, no regex built from the needle (a "$" or
// "." in a figure/line would otherwise be read as regex metacharacters).
function countOccurrences(haystack, needle) {
  if (!needle) return 0;
  let count = 0;
  let pos = 0;
  for (;;) {
    const idx = haystack.indexOf(needle, pos);
    if (idx === -1) break;
    count++;
    pos = idx + needle.length;
  }
  return count;
}

// --- in-scope studies -----------------------------------------------------
// Mirrors lib/case-studies.ts `isPublished` exactly:
//   export function isPublished(cs): cs is PublishedCaseStudyMeta {
//     return cs.status !== "stub";
//   }
// i.e. every status except "stub" is in scope (published + gate-worthy).
function isPublished(data) {
  return data.status !== "stub";
}

function loadExpectedStrings() {
  const dir = join(process.cwd(), CONTENT_DIR);
  const out = [];
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".mdx")) continue;
    const slug = name.replace(/\.mdx$/, "");
    const raw = readFileSync(join(dir, name), "utf-8");
    const { data } = matter(raw);
    if (!isPublished(data)) continue;
    if (!data.entry) continue;
    const { figure, line } = data.entry;
    if (!line) continue;
    const expected = figure ? `${figure} ${line}` : line;
    out.push({ slug, expected });
  }
  return out;
}

// --- self-test (--self-test) ----------------------------------------------
// Same matcher, run against in-memory HTML snippets. Any wrong answer exits 1.
function selfTest() {
  const expectedRfp = "$3M in signed contracts.";

  // Planted defect: the figure was dropped from the render (the real bug this
  // gate exists to catch). Must be reported MISSING.
  const defectiveHtml =
    "<html><body><ol><li><h3>in signed contracts.</h3></li></ol></body></html>";
  // Fixed render: figure + line together. Must PASS.
  const correctHtml =
    '<html><body><ol><li><h3>$3M in signed contracts.</h3></li></ol></body></html>';
  // React serializes an apostrophe as &#x27; — must decode to a literal one.
  const apostropheHtml = "<html><body><p>worker&#x27;s</p></body></html>";

  let failures = 0;

  const defectiveText = toVisibleText(defectiveHtml);
  if (countOccurrences(defectiveText, expectedRfp) !== 0) {
    failures++;
    console.error(
      `work-entry-gate --self-test: FAIL — defective snippet (figure dropped) should be MISSING but matched "${expectedRfp}"`,
    );
  }

  const correctText = toVisibleText(correctHtml);
  if (countOccurrences(correctText, expectedRfp) < 1) {
    failures++;
    console.error(
      `work-entry-gate --self-test: FAIL — correct snippet should PASS but did not match "${expectedRfp}" (got: "${correctText}")`,
    );
  }

  const apostropheText = toVisibleText(apostropheHtml);
  if (!apostropheText.includes("worker's")) {
    failures++;
    console.error(
      `work-entry-gate --self-test: FAIL — &#x27; did not decode to an apostrophe (got: "${apostropheText}")`,
    );
  }

  if (failures) {
    console.error(`\nwork-entry-gate --self-test: ${failures} failure(s)`);
    process.exit(1);
  }
  console.log(
    "work-entry-gate --self-test: PASS (dropped-figure case reported missing, fixed case passes, &#x27; decodes to ')",
  );
}

// --- main ------------------------------------------------------------------
function main() {
  const htmlFlagIdx = process.argv.indexOf("--html");
  const htmlPath =
    htmlFlagIdx !== -1 ? process.argv[htmlFlagIdx + 1] : DEFAULT_HTML;

  if (!existsSync(htmlPath)) {
    console.error(
      `work-entry-gate: no ${htmlPath} — a missing file is never a pass. Run this after next build, not before.`,
    );
    process.exit(1);
  }

  const html = readFileSync(htmlPath, "utf-8");
  const visibleText = toVisibleText(html);
  const studies = loadExpectedStrings();

  const findings = [];
  const passed = [];
  for (const { slug, expected } of studies) {
    const count = countOccurrences(visibleText, expected);
    if (count < 1) {
      findings.push({ slug, expected });
    } else {
      passed.push({ slug, expected, count });
    }
  }

  if (findings.length) {
    console.error(
      `\nwork-entry-gate: ${findings.length} finding(s) in ${htmlPath}\n`,
    );
    for (const { slug, expected } of findings) {
      console.error(`  ${slug.padEnd(16)} MISSING: "${expected}"`);
    }
    console.error("");
    process.exit(1);
  }

  for (const { slug, expected, count } of passed) {
    console.log(`work-entry-gate: PASS ${slug} (${count}x) "${expected}"`);
  }
  console.log(
    `work-entry-gate: ${passed.length} stud${passed.length === 1 ? "y" : "ies"} — every entry figure+line renders.`,
  );
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  main();
}
