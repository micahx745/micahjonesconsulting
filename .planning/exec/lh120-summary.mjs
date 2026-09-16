// Pass-120 V6: /work Lighthouse summary (brief .claude/briefs/pass-120-work-page.md §6.3 V6, with
// the A4/O3 ruling as override O-j): LCP is REPORTED, not gated, against the 1800ms reference (L1),
// with one hard limit, the build's median LCP no worse than production's median measured by the same
// loop (L1b). Every run's CLS stays gated (L2).
//
// Usage: node .planning/exec/lh120-summary.mjs [runsDir] [baselineDir]
//   runsDir defaults to .planning/exec/lh120, baselineDir to .planning/exec/lh120-prod; each holds
//   work-1.json, work-2.json, work-3.json (Lighthouse CLI JSON, default mobile, simulated throttling).
// Lighthouse 13 has no `largest-contentful-paint-element` audit; the LCP element selector is read from
// it when present, else from the first node item in `lcp-breakdown-insight` (then `lcp-discovery-insight`).
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const pos = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const RUNS = pos[0] ? resolve(pos[0]) : join(ROOT, ".planning/exec/lh120");
const BASELINE = pos[1] ? resolve(pos[1]) : join(ROOT, ".planning/exec/lh120-prod");
const FILES = ["work-1.json", "work-2.json", "work-3.json"];
const LCP_REFERENCE = 1800;
const CLS_LIMIT = 0.05;

let failures = 0;
const chk = (id, ok, got, want, passNote = "") => {
  console.log(`  ${ok ? "PASS" : "FAIL"} ${id}: got ${got}${ok ? passNote : ` (want ${want})`}`);
  if (!ok) failures++;
};
const ms = (v) => `${Math.round(v * 10) / 10}ms`;
const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

function firstNode(details) {
  if (!details || typeof details !== "object") return null;
  if (details.type === "node" && typeof details.selector === "string") return details.selector;
  for (const v of Object.values(details)) {
    const s = Array.isArray(v) ? v.map(firstNode).find(Boolean) : firstNode(v);
    if (s) return s;
  }
  return null;
}

function read(dir) {
  return FILES.map((f) => {
    const p = join(dir, f);
    if (!existsSync(p)) return { file: f, err: `missing ${p}` };
    let j;
    try {
      j = JSON.parse(readFileSync(p, "utf8"));
    } catch (e) {
      return { file: f, err: `unparsable ${p} (${e.message})` };
    }
    const a = j.audits || {};
    const lcp = a["largest-contentful-paint"]?.numericValue;
    const cls = a["cumulative-layout-shift"]?.numericValue;
    const score = j.categories?.performance?.score;
    const el =
      firstNode(a["largest-contentful-paint-element"]?.details) ||
      firstNode(a["lcp-breakdown-insight"]?.details) ||
      firstNode(a["lcp-discovery-insight"]?.details) ||
      "(no node reported)";
    if (typeof lcp !== "number" || typeof cls !== "number") return { file: f, err: `no LCP or CLS numericValue in ${p}` };
    return { file: f, url: j.finalDisplayedUrl || j.finalUrl, lcp, cls, score, el };
  });
}

const runs = read(RUNS);
const base = read(BASELINE);

console.log(`== runs ${RUNS}`);
for (const r of runs) {
  if (r.err) console.log(`  run ${r.file}: ${r.err}`);
  else
    console.log(
      `  run ${r.file}: ${r.url}, performance ${typeof r.score === "number" ? Math.round(r.score * 100) : "n/a"}, LCP ${ms(r.lcp)}, CLS ${r.cls}, LCP element ${r.el}`,
    );
}
console.log(`== production baseline ${BASELINE}`);
for (const r of base) {
  if (r.err) console.log(`  run ${r.file}: ${r.err}`);
  else console.log(`  run ${r.file}: ${r.url}, LCP ${ms(r.lcp)}`);
}

const okRuns = runs.filter((r) => !r.err);
const okBase = base.filter((r) => !r.err);
const runsComplete = okRuns.length === FILES.length;
const baseComplete = okBase.length === FILES.length;

const mRuns = runsComplete ? median(okRuns.map((r) => r.lcp)) : null;
const mBase = baseComplete ? median(okBase.map((r) => r.lcp)) : null;

if (runsComplete) console.log(`  INFO L1: median LCP ${ms(mRuns)} (reference ${LCP_REFERENCE}, not gated, brief A4)`);
else console.log(`  INFO L1: median LCP not computed, ${okRuns.length} of ${FILES.length} runs readable (reference ${LCP_REFERENCE}, not gated, brief A4)`);

if (runsComplete && baseComplete) {
  chk("L1b", mRuns <= mBase, ms(mRuns), `<= ${ms(mBase)}`, ` (production ${ms(mBase)})`);
} else {
  chk(
    "L1b",
    false,
    `${okRuns.length} of ${FILES.length} runs and ${okBase.length} of ${FILES.length} production runs readable`,
    `median LCP <= production median, three runs each`,
  );
}

if (runsComplete) {
  const bad = okRuns.filter((r) => !(r.cls <= CLS_LIMIT));
  chk(
    "L2",
    bad.length === 0,
    `CLS ${okRuns.map((r) => r.cls).join(", ")}`,
    `every run CLS <= ${CLS_LIMIT}`,
  );
} else {
  chk("L2", false, `${okRuns.length} of ${FILES.length} runs readable`, `every run CLS <= ${CLS_LIMIT}, three runs`);
}

console.log(`lh120 gate failures: ${failures}`);
process.exit(failures ? 1 : 0);
