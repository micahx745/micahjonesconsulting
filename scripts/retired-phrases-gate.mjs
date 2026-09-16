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
//   "80% Wall" / "/playbook" /  THE BOOK IS OFF THE SITE (operator
//   "field manual" /            2026-09-11, verbatim: "the book should not
//   "the playbook"              be mentioned or shown on the site yet. im
//                              still working on it"). Not mentioned, not
//                              shown: no line on any page, /playbook is a
//                              404 with no redirect, the kickoff email
//                              attaches nothing, until a NEW dated ruling in
//                              LESSONS #3 (Pass-112).
//
//   Pass-111b (operator 2026-09-11, three rulings, LESSONS #3):
//   "Engagements from $5K a month" /
//   "start at $5K a month" /
//   "standing rate"             ADVISORY-ONLY FLOOR (decision 1). "From $5K
//                              a month" is Advisory's price and no other
//                              shape's; the scoped shapes are priced on the
//                              call with no public floor. No page-level
//                              price line on /services. Near miss that must
//                              NOT hit: "advisory from $5K a month".
//   "Frontier AI engineering" / THE RENAME (decision 9). The third area is
//   "End-to-end product        "AI engineering"; the second is "Product
//   building"                  building". Near miss that must NOT hit:
//                              "AI engineering" alone.
//
//   Pass-113 (operator 2026-09-11, decision 5, LESSONS #3):
//   "Hennessy" /                THE CASE STUDIES ARE NEUTRALIZED. The
//   "foreign company" /         Hennessy order is off the Postmates study;
//   "foreign AI company"        Neuton.AI is "entering North America", never
//                              "foreign"; the acquisitions keep their own
//                              sentence, never "led to". NOT the bare word
//                              "foreign" (legitimate in code). Near miss
//                              that must NOT hit: "foreign key" on a .ts
//                              line.
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
// A SECOND EXEMPTION SET (Pass-112): EXEMPT_FILES below. lib/catalog.ts and
// lib/playbook-delivery.ts carry the book's Stripe SKU and the purchase and
// refund email copy. They are the money path for past $99 buyers and they
// render nowhere; the 2026-09-11 ruling took the book off the SITE, not out
// of Stripe's plumbing. Do not grow this set without a dated ruling.
//
// SELF-TEST (--self-test, LESSONS #21): the exact scan pipeline —
// stripComments, stripSpecifiers, applyExemptions, the EXEMPT_FILES skip,
// normalize, the phrase match — runs over an in-memory fixture list, so a
// regex regression that turns the
// gate blind fails the build instead of shipping. Wired in package.json
// before the real scan, same as accent-states-lint.mjs.
//
// NORMALIZE (G1, Sonnet 111b independent diff review, Check C). The match
// is a raw per-line substring test, so a double space, an HTML entity
// standing in for a space or hyphen, or a `{" "}` JSX join all slip past it
// character-for-character even though none of them changes what a reader
// sees. normalize() runs before the match, per line so reported line
// numbers stay true: it decodes &nbsp;/&#160;/&#8209;/&#8211;/&ndash;/
// &#x2011; to a plain space, folds a `{" "}`/`{' '}` JSX join to a space,
// then collapses any run of whitespace to one. A second pass joins each
// adjacent pair of (already normalized) lines with one space and matches
// phrases that appear only in the join, never in either line alone — the
// two-line form of the same JSX split — reporting the pair's first line.
// Two lines with a line between them are never joined, so an unrelated
// "Frontier AI" ... "engineering" two lines apart still passes.
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
  // Pass-112 (operator 2026-09-11): the book is off the site until it ships.
  "80% Wall",
  "/playbook",
  "field manual",
  "the playbook",
  // Pass-111b (operator 2026-09-11): advisory-only floor (decision 1) and
  // the rename (decision 9).
  "Engagements from $5K a month",
  "start at $5K a month",
  "standing rate",
  "Frontier AI engineering",
  "End-to-end product building",
  // Pass-113 (operator 2026-09-11, decision 5): the case studies are
  // neutralized. Not the bare word "foreign"; it has legitimate uses in
  // code.
  "Hennessy",
  "foreign company",
  "foreign AI company",
  // Pass-120 (operator 2026-09-15): the content engine's client is described
  // as a social activist, and the operator ruled out one wording by name:
  // "the content one will be a social acitivit (do not want to say anti
  // racism)". Both spellings.
  "anti-racism",
  "anti racism",
  // Pass-120 (operator 2026-09-16): the birth worker's claims vendor is private
  // context, "please dont mention private vendors". Both capitalisations.
  "Stedi",
  "stedi",
  // LESSONS #33 (2026-09-16): the Guardicore pipeline figure was retired from
  // every public surface on 2026-09-03, and an aria-label on the home ledger
  // still read it aloud, spelled out, until 2026-09-16. Numerals and words.
  "$80M",
  "80 million",
];

// Money path for past $99 buyers (Stripe SKU + delivery/refund email);
// renders nowhere. Pass-112.
const EXEMPT_FILES = new Set(["lib/catalog.ts", "lib/playbook-delivery.ts"]);

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

// Specifiers are code, not copy, so they are blanked like comments.
function stripSpecifiers(src) {
  return src.replace(
    /(\b(?:from|import|require)\s*\(?\s*)(["'])[^"'\n]*\2/g,
    "$1$2$2",
  );
}

// Blank the exempt array's contents, keeping the line count intact so every
// other finding in the file still reports its true line number.
function applyExemptions(src, file) {
  if (file.split(sep).join("/") !== "app/layout.tsx") return src;
  return src.replace(/alumniOf:\s*\[[\s\S]*?\]/, (m) =>
    m.replace(/[^\n]/g, " "),
  );
}

// G1 (Sonnet 111b review): fold the constructs a raw substring match can't
// see into their plain-text equivalent, one line at a time so reported line
// numbers stay true. &nbsp;/&#160; and the hyphen-family entities all
// collapse to a single space here — the gate only needs to recognise the
// same words, not preserve which separator character rendered them.
function normalize(line) {
  return line
    .replace(/&nbsp;|&#160;|&#8209;|&#8211;|&ndash;|&#x2011;/gi, " ")
    .replace(/\{["']\s*["']\}/g, " ")
    .replace(/\s+/g, " ");
}

// One file's raw source -> findings. The real scan and the self-test both
// go through here, so they cannot drift apart.
function scanSource(raw, file) {
  if (EXEMPT_FILES.has(file.split(sep).join("/"))) return [];
  const src = applyExemptions(
    stripSpecifiers(stripComments(raw, file.endsWith(".mdx"))),
    file,
  );
  const lines = src.split("\n").map(normalize);
  const findings = [];
  lines.forEach((line, i) => {
    const hits = PHRASES.filter((p) =>
      line.toLowerCase().includes(p.toLowerCase()),
    );
    if (hits.length) findings.push({ line: i + 1, hits });
  });
  // The two-line form of a `{" "}` JSX split: the join reads as the banned
  // phrase, neither line alone does. Only adjacent lines join, so a match
  // spread across a line with unrelated content in between is not this.
  for (let i = 0; i < lines.length - 1; i++) {
    const a = lines[i].trim().toLowerCase();
    const b = lines[i + 1].trim().toLowerCase();
    const joined = `${a} ${b}`;
    const hits = PHRASES.filter((p) => {
      const pl = p.toLowerCase();
      return joined.includes(pl) && !a.includes(pl) && !b.includes(pl);
    });
    if (hits.length) findings.push({ line: i + 1, hits });
  }
  return findings;
}

// --- self-test (--self-test) --------------------------------------------
// PLANTED cases must each yield a finding; NEAR-MISS cases must each yield
// none. Any wrong answer prints the case and exits 1.
function selfTest() {
  const planted = [
    ...PHRASES.map((p) => ({
      file: "app/selftest/page.tsx",
      src: `        "x ${p} x",`,
      why: `phrase "${p}" on a tsx string line`,
    })),
    {
      file: "app/selftest/page.tsx",
      src: `        <a href="/playbook">manual</a>`,
      why: '"/playbook" as an href attribute',
    },
    {
      file: "content/work/selftest.mdx",
      src: `The 80% Wall is a book.`,
      why: '"The 80% Wall" in mdx prose',
    },
    {
      file: "app/selftest/page.tsx",
      src: `        "FIELD MANUAL",`,
      why: '"FIELD MANUAL" upper-case (match is case-insensitive)',
    },
    {
      file: "lib/selftest.ts",
      src: "const s = `a decade inside`;",
      why: '"a decade inside" in a .ts template literal',
    },
    {
      file: "lib/selftest.ts",
      src: "const u = `${BASE_URL}/playbook`;",
      why: '"/playbook" in a .ts template literal (not a specifier)',
    },
    {
      file: "app/selftest/page.tsx",
      src: `        { href: "/playbook", label: "Manual" },`,
      why: 'href: "/playbook" in a tsx object literal',
    },
    // G1 (Sonnet 111b review): the four substring evasions it found, plus
    // the two-line form of the same JSX-split evasion.
    {
      file: "app/selftest/page.tsx",
      src: `        "Engagements from  $5K a month",`,
      why: 'double space: "Engagements from  $5K a month"',
    },
    {
      file: "app/selftest/page.tsx",
      src: `        "start&nbsp;at $5K a month",`,
      why: 'nbsp entity: "start&nbsp;at $5K a month"',
    },
    {
      file: "app/selftest/page.tsx",
      src: `        "standing&#8209;rate",`,
      why: 'numeric hyphen entity: "standing&#8209;rate"',
    },
    {
      file: "app/selftest/page.tsx",
      src: `        <span>Frontier AI{" "}engineering</span>`,
      why: 'jsx split same line: Frontier AI{" "}engineering',
    },
    {
      file: "app/selftest/page.tsx",
      src: `        <span>Frontier AI{" "}\n          engineering</span>`,
      why: 'jsx split two lines: Frontier AI{" "} / engineering',
    },
  ];
  const nearMisses = [
    ...["80% Wall", "/playbook", "field manual", "the playbook"].flatMap(
      (p) => [
        {
          file: "app/selftest/page.tsx",
          src: `        // note: ${p} here`,
          why: `"${p}" inside a // comment`,
        },
        {
          file: "app/selftest/page.tsx",
          src: `        /* ${p} */`,
          why: `"${p}" inside /* */`,
        },
        {
          file: "content/work/selftest.mdx",
          src: `{/* ${p} */}`,
          why: `"${p}" inside {/* */} in mdx`,
        },
      ],
    ),
    {
      file: "app/selftest/page.tsx",
      src: `import { deliverPlaybook, notifyRefund } from "@/lib/playbook-delivery";`,
      why: 'import ... from "@/lib/playbook-delivery" (specifier, not copy)',
    },
    {
      file: "app/selftest/page.tsx",
      src: `export * from "@/lib/playbook-delivery";`,
      why: 'export * from "@/lib/playbook-delivery" (specifier, not copy)',
    },
    {
      file: "app/selftest/page.tsx",
      src: `const m = await import("@/lib/playbook-delivery");`,
      why: 'dynamic import("@/lib/playbook-delivery") (specifier, not copy)',
    },
    {
      file: "lib/selftest.ts",
      src: `const n = require("@/lib/playbook-delivery");`,
      why: 'require("@/lib/playbook-delivery") (specifier, not copy)',
    },
    {
      file: "content/work/selftest.mdx",
      src: `A 25-page playbook sits with the author`,
      why: '"A 25-page playbook" (no "the playbook", no "/playbook")',
    },
    {
      file: "lib/catalog.ts",
      src: `    name: "The 80% Wall",`,
      why: '"The 80% Wall" in a path inside EXEMPT_FILES',
    },
    {
      file: "app/layout.tsx",
      src: `        alumniOf: ["Flexport"],`,
      why: 'alumniOf: ["Flexport"] in app/layout.tsx',
    },
    {
      file: "app/selftest/page.tsx",
      src: `        "advisory from $5K a month",`,
      why: '"advisory from $5K a month" (Advisory\'s own price, not the retired page-level line)',
    },
    {
      file: "app/selftest/page.tsx",
      src: `        <span>AI engineering</span>`,
      why: '"AI engineering" alone (the renamed area, not the retired "Frontier AI engineering")',
    },
    // Pass-113 near miss: the bare word "foreign" is only banned in the
    // retired company phrasings, so a code string like a constraint name
    // must not hit.
    {
      file: "lib/selftest.ts",
      src: "const constraint = 'foreign key';",
      why: '"foreign key" on a .ts line (the bare word, not a retired phrase)',
    },
    // G1 near miss: "Frontier AI" and "engineering" are real, but a line of
    // unrelated content sits between them, so the two-line join (adjacent
    // lines only) must not bridge them.
    {
      file: "app/selftest/page.tsx",
      src: `        <span>Frontier AI</span>\n        <p>unrelated line</p>\n        <span>engineering</span>`,
      why: '"Frontier AI" and "engineering" two lines apart (not adjacent)',
    },
  ];

  let caught = 0;
  for (const c of planted) {
    if (scanSource(c.src, c.file).length >= 1) caught++;
    else {
      console.error(
        `retired-phrases-gate self-test: PLANTED case MISSED: ${c.why} (${c.file})`,
      );
      process.exit(1);
    }
  }
  let passed = 0;
  for (const c of nearMisses) {
    if (scanSource(c.src, c.file).length === 0) passed++;
    else {
      console.error(
        `retired-phrases-gate self-test: NEAR-MISS case HIT: ${c.why} (${c.file})`,
      );
      process.exit(1);
    }
  }
  console.log(
    `retired-phrases-gate self-test: ${caught} planted caught, ${passed} near misses passed`,
  );
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  let failures = 0;
  for (const root of ROOTS) {
    for (const file of walk(root)) {
      for (const f of scanSource(readFileSync(file, "utf-8"), file)) {
        failures++;
        console.error(
          `retired-phrases-gate: ${file}:${f.line}: "${f.hits.join('", "')}" — retired copy (LESSONS #3 ledger, LESSONS #15)`,
        );
      }
    }
  }

  if (failures) {
    console.error(
      `\nretired-phrases-gate: ${failures} finding(s). These phrases were retired by a dated operator ruling. Restore one only with a NEW dated ruling in LESSONS #3, and update this gate in the same commit — never route around it.`,
    );
    process.exit(1);
  }
  console.log("retired-phrases-gate: clean");
}
