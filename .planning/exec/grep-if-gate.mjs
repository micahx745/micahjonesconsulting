// .planning/exec/grep-if-gate.mjs
// LESSONS #34: GNU grep 3.0 in Git Bash aborts (exit 134, no output) on -i combined with -F, so a
// check such as `grep -oiF -- "x" | wc -l` prints 0 and every expect-0 passes without looking.
// This gate lists every grep invocation in the check scripts and briefs that combines the two flags.
// Usage: node .planning/exec/grep-if-gate.mjs [--self-test]
// Ends `grep-if-gate: clean` or `grep-if-gate: N finding(s)` (exit 1). A match inside a comment or
// prose that WARNS about the pair is still reported; mark such a line with `grep-if-ok` to exempt it.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// A grep call whose flag clusters, taken together, contain both i and F (e.g. -oiF, -ciF, -i -F, -F -i).
const CALL = /\bgrep((?:\s+-[A-Za-z]+)+)/g;
const bad = (line) => {
  if (line.includes("grep-if-ok")) return false;
  for (const m of line.matchAll(CALL)) {
    const flags = m[1].replace(/\s+-/g, "");
    if (flags.includes("i") && flags.includes("F")) return true;
  }
  return false;
};

if (process.argv.includes("--self-test")) {
  const planted = ["grep -oiF -- x", "grep -ciF 'a'", "grep -i -F x", "grep -F -i x", "x | grep -Fi y"];
  const near = ["grep -oF -- x", "grep -ci x", "grep -F x", "grep -i x", "grep -iE x", "echo grep-if-ok grep -iF"];
  const caught = planted.filter(bad).length;
  const clean = near.filter((l) => !bad(l)).length;
  const ok = caught === planted.length && clean === near.length;
  console.log(`grep-if-gate self-test: ${caught}/${planted.length} planted caught, ${clean}/${near.length} near misses clean`);
  process.exit(ok ? 0 : 1);
}

const ROOTS = [".planning/exec", "scripts", ".claude/briefs"];
const EXT = /\.(sh|mjs|js|md)$/;
const findings = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) {
      if (name === "node_modules" || name.startsWith(".")) continue;
      walk(p);
    } else if (EXT.test(name) && name !== "grep-if-gate.mjs") {
      readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        if (bad(line)) findings.push(`${p}:${i + 1}: ${line.trim().slice(0, 140)}`);
      });
    }
  }
};
for (const r of ROOTS) walk(r);
for (const f of findings) console.log(`grep-if-gate: ${f}`);
console.log(findings.length ? `grep-if-gate: ${findings.length} finding(s)` : "grep-if-gate: clean");
process.exit(findings.length ? 1 : 0);
