// scripts/retired-phrases-gate.mjs — the retired-copy gate, mechanical.
//
// Third sibling to vendor-gate.mjs (vendor NAMES on Ordani surfaces) and
// ordani-claims-gate.mjs (retired user counts + security mechanisms). This
// one stops phrases the operator retired from SITE COPY and METADATA.
//
// WHY THIS EXISTS (LESSONS #15, 2026-09-04). The ledger's 2026-09-02 entry
// recorded the open-ended revenue range as "Swept ... to /about, the home
// ledger row, the JSON-LD in layout.tsx and llms.txt". llms.txt was never
// swept: it still served the closed range plus two employers that appear in
// no ledger entry and on no other surface. The 2026-09-03 "thirteen years"
// ruling then landed on the /about body but not on its meta description or
// its share image, so the two surfaces a stranger sees first kept the retired
// wording for a day. Both defects were invisible to every check the build
// ran, because no check read for them. A sweep recorded as done is not a
// sweep; the probe is.
//
// WHAT IS GATED, and the ruling behind each:
//
//   "2013–2023" / "2013-2023"  Consulting revenue is $20M+, SINCE 2013 and
//                              OPEN-ENDED (operator 2026-09-02). The closed
//                              range reads as a practice that stopped. Both
//                              the en-dash and hyphen renderings are banned.
//   "A decade" / "a decade inside"
//                              THIRTEEN YEARS, not "a decade" (operator
//                              2026-09-03). Supersedes "a decade" everywhere.
//   "Flexport" / "Cuebiq"      Unledgered employers. The career history is
//                              the four exits plus the open-ended range; no
//                              dated ruling puts these two on a surface.
//   "email me"                 Every package CTA goes to checkout. Zero
//                              mailto links remain. Telling a buyer to email
//                              contradicts the checkout sentence on the same
//                              page (Pass-97, A3).
//
// SCOPE. app/, content/ and lib/ — the rendered tree. Not node_modules, not
// product/ (the book is frozen copy with its own gate), not .planning/ and
// not docs/ (both are records of what was retired, and quoting a retired
// phrase is their job).
//
// COMMENTS ARE STRIPPED FIRST, same as vendor-gate. Three code comments in
// app/ narrate these exact rulings by quoting the retired string. They render
// nowhere. Gating them would push the narration out of the code and into a
// doc nobody opens, which is how a corrected claim comes back.
//
// ONE EXEMPTION, and it is narrow: the alumniOf array in app/layout.tsx.
// That array lists employment for schema.org consumers and its own comment
// above it explains why its membership differs from the prose. It is
// operator-locked; a future ruling can change it, this gate may not.
//
// Runs in `pnpm build` before next build. Exit 1 with file:line on any find.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, sep } from "node:path";

const ROOTS = ["app", "content", "lib"];
const EXT = /\.(tsx?|mdx|md)$/;
const PHRASES = [
  "2013–2023",
  "2013-2023",
  "A decade",
  "a decade inside",
  "Flexport",
  "Cuebiq",
  "email me",
];

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

// Blank the exempt array's contents, keeping the line count intact so every
// other finding in the file still reports its true line number.
function applyExemptions(src, file) {
  if (file.split(sep).join("/") !== "app/layout.tsx") return src;
  return src.replace(/alumniOf:\s*\[[\s\S]*?\]/, (m) =>
    m.replace(/[^\n]/g, " "),
  );
}

let failures = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const raw = readFileSync(file, "utf-8");
    const src = applyExemptions(
      stripComments(raw, file.endsWith(".mdx")),
      file,
    );
    src.split("\n").forEach((line, i) => {
      const hits = PHRASES.filter((p) =>
        line.toLowerCase().includes(p.toLowerCase()),
      );
      if (hits.length) {
        failures++;
        console.error(
          `retired-phrases-gate: ${file}:${i + 1}: "${hits.join('", "')}" — retired copy (LESSONS #3 ledger, LESSONS #15)`,
        );
      }
    });
  }
}

if (failures) {
  console.error(
    `\nretired-phrases-gate: ${failures} finding(s). These phrases were retired by a dated operator ruling. Restore one only with a NEW dated ruling in LESSONS #3, and update this gate in the same commit — never route around it.`,
  );
  process.exit(1);
}
console.log("retired-phrases-gate: clean");
