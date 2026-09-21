// scripts/mojibake-gate.mjs — a typographic apostrophe that became "?" fails the build.
//
// WHY THIS EXISTS (LESSONS #46, 2026-09-20). Pass-124 handed an executor (Sol, Codex on Windows) a
// brief carrying "Neuton.AI’s" with a literal U+2019. Its shell wrote the character as a literal "?",
// the page rendered "Neuton.AI?s", and the executor's report called the result "mandated". Every other
// gate passed: copy-lint reads for banned words, not for a damaged character. A reader would have seen
// a typo in the receipts sentence on the home page.
//
// WHAT IS GATED: in app/, components/, content/ and lib/, a letter, then "?" or U+FFFD, then a
// contraction tail (s, t, re, ll, ve, m, d) that ends the word — the shape a lost ’ leaves — and any
// U+FFFD at all. Near misses that must pass: optional chaining (a?.b), a spaced ternary, a URL query
// string (/call?ref=home), a real question mark ending a sentence.
//
// SELF-TEST (--self-test, LESSONS #21): the same matcher runs over planted cases and near misses, so a
// gate that stopped biting fails the build instead of passing silently.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components", "content", "lib"];
const EXTS = [".ts", ".tsx", ".mdx", ".md"];
const LOST_APOSTROPHE = /[A-Za-z][?�](?:s|t|re|ll|ve|m|d)(?=[\s.,;:!)"'<]|$)/;
const REPLACEMENT_CHAR = /�/;

function lineFindings(src) {
  const out = [];
  src.split("\n").forEach((line, i) => {
    if (LOST_APOSTROPHE.test(line) || REPLACEMENT_CHAR.test(line)) {
      out.push({ line: i + 1, text: line.trim().slice(0, 120) });
    }
  });
  return out;
}

function walk(dir, files = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const name of entries) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (EXTS.some((e) => name.endsWith(e))) files.push(p);
  }
  return files;
}

function selfTest() {
  const planted = [
    ["Neuton.AI?s technology.", "the Pass-124 defect: a lost U+2019 in a possessive"],
    ["I?m Micah Jones.", "a lost U+2019 in a contraction"],
    ["they don?t file", "a lost U+2019 before t"],
    ["the buyer�s words", "a replacement character in a possessive"],
    ["stray � alone", "any replacement character"],
  ];
  const nearMisses = [
    ["const v = data?.stats;", "optional chaining"],
    ["const v = ok ? yes : no;", "a spaced ternary"],
    ['<a href="/call?ref=home">', "a URL query string"],
    ["What did the research say?", "a real question mark ending a sentence"],
    ["Neuton.AI’s technology.", "the correct U+2019"],
  ];
  let bad = 0;
  for (const [src, why] of planted) {
    if (lineFindings(src).length === 0) {
      console.error(`mojibake-gate self-test: PLANTED case MISSED: ${why}`);
      bad++;
    }
  }
  for (const [src, why] of nearMisses) {
    if (lineFindings(src).length !== 0) {
      console.error(`mojibake-gate self-test: NEAR-MISS case HIT: ${why}`);
      bad++;
    }
  }
  if (bad) process.exit(1);
  console.log(`mojibake-gate self-test: ${planted.length} planted caught, ${nearMisses.length} near misses passed`);
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  const findings = [];
  for (const root of ROOTS) {
    for (const f of walk(root)) {
      for (const hit of lineFindings(readFileSync(f, "utf8"))) findings.push({ f, ...hit });
    }
  }
  if (findings.length) {
    console.error(`mojibake-gate: ${findings.length} damaged character(s):`);
    for (const x of findings) console.error(`  ${x.f}:${x.line}  ${x.text}`);
    console.error("A typographic apostrophe was written as '?' or U+FFFD. Restore the U+2019.");
    process.exit(1);
  }
  console.log("mojibake-gate: clean");
}
