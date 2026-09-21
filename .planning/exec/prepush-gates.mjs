// prepush-gates.mjs: the local build this machine can run, WITH every gate `pnpm build` runs (LESSONS #47).
// Node, not bash: the Codex executor's Windows sandbox cannot launch bash ("Access is denied ...
// Bash/Service/CreateInstance/E_ACCESSDENIED", Pass-126 round 1), so a bash-only gate is a gate the executor
// cannot run. prepush-gates.sh is now a one-line wrapper around this file.
// Usage (repo root): node .planning/exec/prepush-gates.mjs      exit 0 = every gate and the build passed.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

// The chain, in package.json "build" order, with `next build` replaced by the webpack build.
export const STEPS = [
  "npx tsx lib/copy-lint-cli.ts",
  "node scripts/vendor-gate.mjs",
  "node scripts/retired-phrases-gate.mjs --self-test",
  "node scripts/retired-phrases-gate.mjs",
  "node scripts/mojibake-gate.mjs --self-test",
  "node scripts/mojibake-gate.mjs",
  "node scripts/accent-states-lint.mjs --self-test",
  "node scripts/accent-states-lint.mjs",
  "node scripts/gsap-quarantine-gate.mjs --self-test",
  "node scripts/gsap-quarantine-gate.mjs",
  "node scripts/lastmod.mjs --check",
  "npx next build --webpack",
  "node scripts/render-gate.mjs",
  "node scripts/work-entry-gate.mjs --self-test",
  "node scripts/work-entry-gate.mjs",
  "node scripts/results-repeat-gate.mjs --self-test",
  "node scripts/results-repeat-gate.mjs",
];

// Drift guard: every step of package.json "build" (except `next build`, replaced above) must be a WHOLE step
// here. Whole-step match, never substring: a substring test passed a list missing "mojibake-gate.mjs" because the
// "--self-test" step still contained it (LESSONS #47).
export function missingSteps(steps = STEPS) {
  const chain = JSON.parse(readFileSync("package.json", "utf8"))
    .scripts.build.split("&&")
    .map((s) => s.trim())
    .filter((s) => !/^next build/.test(s));
  return chain.filter((c) => !steps.includes(c.replace(/^tsx /, "npx tsx ")));
}

if (process.argv.includes("--self-test")) {
  const bitten = missingSteps(STEPS.filter((s) => s !== "node scripts/mojibake-gate.mjs"));
  const clean = missingSteps();
  const ok = bitten.length === 1 && bitten[0] === "node scripts/mojibake-gate.mjs" && clean.length === 0;
  console.log(`prepush-gates self-test: ${ok ? "PASS" : "FAIL"} (one step deleted -> ${JSON.stringify(bitten)}; real list -> ${JSON.stringify(clean)})`);
  process.exit(ok ? 0 : 1);
}

const missing = missingSteps();
if (missing.length) {
  console.error("prepush-gates: package.json build names steps this script lacks:", missing);
  process.exit(1);
}
for (const step of STEPS) {
  console.log(`\n== ${step}`);
  const r = spawnSync(step, { shell: true, stdio: "inherit" });
  if (r.status !== 0) {
    console.error(`\nPREPUSH FAILED at: ${step} (exit ${r.status})`);
    process.exit(r.status || 1);
  }
}
console.log("\nPREPUSH: all gates and the build passed");
