// scripts/ordani-claims-gate.mjs — the Ordani CLAIMS gate, mechanical.
//
// Sibling to vendor-gate.mjs. That gate stops infra vendor NAMES on
// Ordani surfaces. This one stops the two claim classes the operator
// ruled on 2026-09-01, and it covers the surface both prior sweeps
// forgot: the BOOK.
//
// WHY THIS EXISTS (LESSONS #14, 2026-09-02). Two rulings landed on
// 2026-09-01 and were swept across "the case study, home, about,
// services, playbook, root metadata and llms.txt". The ledger then
// recorded that ordani.mdx "was the only surface carrying mechanism
// detail". That was wrong. product/playbook/src/*.typ — the paid PDF,
// the most public surface the project has — carried a retired user
// count in four places (one of them sampler-only, so it ships in the
// FREE chapter) and Ordani's authorization design in three field
// notes, and was on nobody's sweep list because it is not part
// of the Next.js build. A cross-model manuscript review found it a day
// later. The lesson is not "sweep harder", it is that a sweep scoped
// to rendered site files cannot see the product.
//
// CLASS 1 — retired user counts. Operator 2026-09-01, verbatim: "drop
// the user amounts across the website for ordani, just say it has
// active paying users, it's in beta, we're releasing to public soon."
// Approved phrasing: "active paying users", framed as in beta with a
// public release coming. Counts are internal-only.
//
// CLASS 2 — security mechanisms attached to Ordani. Operator
// 2026-09-01: "dont make specific security stuff on the app". Ordani
// surfaces never describe HOW the protections work. Teaching a
// mechanism generically is fine and is the book's job; naming Ordani
// beside it is the defect, so this is a PROXIMITY check, not a
// keyword ban.
//
// "None lost to a competitor" and "HIPAA-compliant" both survive the
// rulings and are NOT gated here.
//
// MATCHING IS LINE-INSENSITIVE ON PURPOSE. The book's Typst source
// hard-wraps prose at ~70 columns, so a phrase splits mid-sentence
// ("ownership enforced in the\n  database" in chapter-07). The first
// cut of this gate matched per line and missed that exact field note
// while catching its two siblings — a gate with a blind spot is worse
// than none, because it certifies. Text is flattened to one
// whitespace-normalised stream and match offsets are mapped back to
// line numbers.
//
// NOT YET WIRED INTO `pnpm build`. It fails today, by design — the
// book still carries the findings above. Wiring it before that fix
// would block an unrelated concurrent session's builds. Wire it in
// the same commit that clears the findings.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components", "content", "product/playbook/src"];
const EXT = /\.(tsx|mdx|typ)$|content[\\/].*\.ts$/;

// Class 1: retired counts. Inherently Ordani — no proximity needed.
const RETIRED_COUNTS = [
  [
    /hundreds of (?:paying )?birth workers/gi,
    'retired user count — use "active paying users", in beta',
  ],
  [/\bhundreds of users\b/gi, "retired user count"],
  [/\b200 birth workers\b/gi, "retired user count (200 is internal-only)"],
  [/\bused by 200\b/gi, "retired user count (200 is internal-only)"],
];

// Class 2: mechanism language, gated only NEAR an Ordani mention.
const MECHANISM =
  /(row[-\s]?level security|\bRLS\b|auth\.uid|enforced in the database|encryption at rest|encrypted at rest|audit log|export[-\s]gating)/gi;
const ORDANI = /ordani/gi;
const PROXIMITY = 8; // lines either side of an Ordani mention

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (EXT.test(p)) yield p;
  }
}

// Typst uses the same // and /* */ comment syntax as JS/TSX, so one
// stripper serves both. Comments do not render; they must not trip the
// gate (chapter-05.typ's own header comment discusses RLS and Ordani).
function stripComments(src, isMdx) {
  if (isMdx) return src.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/([^:"'])\/\/[^\n]*$/gm, "$1");
}

// Collapse the file to a single whitespace-normalised string, keeping a
// per-character map back to the source line so findings stay citable.
function flatten(lines) {
  let flat = "";
  const lineOf = [];
  let gap = false;
  lines.forEach((line, idx) => {
    for (const ch of line) {
      if (/\s/.test(ch)) {
        gap = true;
        continue;
      }
      if (gap && flat.length) {
        flat += " ";
        lineOf.push(idx);
      }
      gap = false;
      flat += ch;
      lineOf.push(idx);
    }
    gap = true; // the newline itself is whitespace
  });
  return { flat, lineOf };
}

function allMatches(re, text) {
  const out = [];
  re.lastIndex = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    out.push({ text: m[0], index: m.index });
    if (m.index === re.lastIndex) re.lastIndex++;
  }
  return out;
}

let failures = 0;
const report = (file, line, msg) => {
  failures++;
  console.error(`ordani-claims-gate: ${file}:${line}: ${msg}`);
};

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const src = stripComments(
      readFileSync(file, "utf-8"),
      file.endsWith(".mdx"),
    );
    const { flat, lineOf } = flatten(src.split("\n"));
    if (!flat) continue;

    for (const [re, why] of RETIRED_COUNTS) {
      for (const hit of allMatches(re, flat)) {
        report(file, lineOf[hit.index] + 1, `"${hit.text}" — ${why}`);
      }
    }

    const ordaniLines = allMatches(ORDANI, flat).map((h) => lineOf[h.index]);
    if (!ordaniLines.length) continue;

    for (const hit of allMatches(MECHANISM, flat)) {
      const line = lineOf[hit.index];
      const near = ordaniLines.find((o) => Math.abs(o - line) <= PROXIMITY);
      if (near !== undefined) {
        report(
          file,
          line + 1,
          `"${hit.text}" within ${PROXIMITY} lines of Ordani (line ${near + 1}) — Ordani surfaces never describe how the protections work (LESSONS #3 SECURITY-DETAIL GATE)`,
        );
      }
    }
  }
}

if (failures) {
  console.error(
    `\nordani-claims-gate: ${failures} finding(s). Counts: say "active paying users", in beta, public release coming. Mechanisms: teach them generically, but cut Ordani's name from the surrounding sentence — never route around this gate.`,
  );
  process.exit(1);
}
console.log("ordani-claims-gate: clean");
