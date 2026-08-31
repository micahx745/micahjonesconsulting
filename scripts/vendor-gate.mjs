// scripts/vendor-gate.mjs — the Ordani vendor gate, mechanical.
//
// LESSONS #3 VENDOR GATE: Ordani surfaces never name infra vendors.
// The rule was judgment-enforced and failed twice (ordani.mdx tools
// list, 2026-08-30; /playbook author block + ch.4 blurb + the Postgres
// reviewer line, caught by the operator 2026-08-31). Recurrence
// graduates it to a blocking build check.
//
// Rule: any RENDERED source file that mentions Ordani must not name an
// infra vendor/engine. Comments are stripped first (code comments
// don't render). Dev tools (Claude Code, Cursor) are permitted — they
// are the audience's tools and carry no runtime attack surface.
//
// Runs in `pnpm build` before next build. Exit 1 with file:line on
// any finding.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components", "content"];
const EXT = /\.(tsx|mdx)$|content[\\/].*\.ts$/;
const VENDOR =
  /\b(Supabase|Vercel|Next\.js|Postgres(?:QL)?|Twilio|Resend|Neon|Expo|Railway|Firebase|PlanetScale|Cloudflare|AWS|GCP|Azure)\b/g;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (EXT.test(p)) yield p;
  }
}

function stripComments(src, isMdx) {
  if (isMdx) return src.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/([^:"'])\/\/[^\n]*$/gm, "$1");
}

let failures = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const raw = readFileSync(file, "utf-8");
    const src = stripComments(raw, file.endsWith(".mdx"));
    if (!/ordani/i.test(src)) continue;
    const lines = src.split("\n");
    lines.forEach((line, i) => {
      const hits = line.match(VENDOR);
      if (hits) {
        failures++;
        console.error(
          `vendor-gate: ${file}:${i + 1}: "${[...new Set(hits)].join(", ")}" in an Ordani-mentioning file`,
        );
      }
    });
  }
}

if (failures) {
  console.error(
    `\nvendor-gate: ${failures} finding(s). Ordani surfaces never name infra vendors (LESSONS #3). Rephrase — "in the database", "transactional messaging", "hosting" — never route around this gate.`,
  );
  process.exit(1);
}
console.log("vendor-gate: clean");
