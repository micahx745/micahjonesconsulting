#!/usr/bin/env bash
# prepush-gates.sh: the local build this machine can run, WITH every gate `pnpm build` runs.
# LESSONS #47 (2026-09-21): the documented local build, `npx next build --webpack`, calls Next directly and
# skips the whole package.json "build" chain (copy-lint, vendor, retired phrases, mojibake, accent states,
# gsap quarantine, then render, work-entry and results-repeat). Vercel runs that chain, so a pass that trusted
# the bare build could only learn about a banned word at deploy time. This script is the same chain with the
# webpack build in the middle. Keep it in step with package.json "build" whenever a gate is added there.
# Usage (repo root): bash .planning/exec/prepush-gates.sh     exit 0 = every gate and the build passed.
set -euo pipefail
npx tsx lib/copy-lint-cli.ts
node scripts/vendor-gate.mjs
node scripts/retired-phrases-gate.mjs --self-test
node scripts/retired-phrases-gate.mjs
node scripts/mojibake-gate.mjs --self-test
node scripts/mojibake-gate.mjs
node scripts/accent-states-lint.mjs --self-test
node scripts/accent-states-lint.mjs
node scripts/gsap-quarantine-gate.mjs --self-test
node scripts/gsap-quarantine-gate.mjs
node scripts/lastmod.mjs --check
npx next build --webpack
node scripts/render-gate.mjs
node scripts/work-entry-gate.mjs --self-test
node scripts/work-entry-gate.mjs
node scripts/results-repeat-gate.mjs --self-test
node scripts/results-repeat-gate.mjs
# Drift guard: if package.json "build" names a gate this file does not, fail loudly.
node -e '
const fs=require("fs");
const chain=require("./package.json").scripts.build.split("&&").map(s=>s.trim()).filter(s=>!/^next build/.test(s));
const lines=fs.readFileSync(".planning/exec/prepush-gates.sh","utf8").split(/\r?\n/).map(s=>s.trim());
// Whole-line match: a substring test passed a copy with "mojibake-gate.mjs" deleted, because the
// "--self-test" line still contains it (caught by the bite test the day this was written).
const missing=chain.filter(c=>!lines.includes(c.replace(/^tsx /,"npx tsx ")));
if(missing.length){console.error("prepush-gates.sh is missing:",missing);process.exit(1)}
console.log("prepush-gates: every package.json build step is in this script");'
echo "PREPUSH: all gates and the build passed"
