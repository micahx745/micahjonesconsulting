// Pass-121 audit (a), item 4.1.2: copy-rhythm check.
// Usage: node copy-rhythm121.mjs <file.html> [label]
// Strips tags from the <main> element of a curl -s HTML file (or, if no <main>
// is found, falls back to <body>), splits into sentences, and reports count,
// mean length (words), standard deviation, the 15-20 word share, and em-dash
// count for the WHOLE page (not just main, since em-dash cap is "per page").

import { readFileSync } from "node:fs";

const [, , file, label] = process.argv;
if (!file) {
  console.log("usage: node copy-rhythm121.mjs <file.html> [label]");
  process.exit(2);
}

const html = readFileSync(file, "utf8");

function extractTag(src, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = src.match(re);
  return m ? m[1] : null;
}

let mainHtml = extractTag(html, "main");
let usedFallback = false;
if (!mainHtml) {
  mainHtml = extractTag(html, "body") || html;
  usedFallback = true;
}

// Strip script/style blocks, then all tags, then decode a handful of entities.
function stripTags(s) {
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#8216;|&lsquo;/g, "'")
    .replace(/&#8220;|&ldquo;/g, '"')
    .replace(/&#8221;|&rdquo;/g, '"')
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#8211;|&ndash;/g, "-")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

const mainText = stripTags(mainHtml);
const fullPageText = stripTags(html);

// Em-dash count: page-wide (the CLAUDE.md cap is "per page").
const emDashCount = (fullPageText.match(/—/g) || []).length;

// Sentence split: on . ! ? followed by space+capital or end of string.
// A naive splitter; good enough for a rhythm check, not a linguistics tool.
function splitSentences(text) {
  // Protect common abbreviations / decimals from being treated as sentence ends.
  const protectedText = text
    .replace(/\b(Mr|Mrs|Ms|Dr|vs|etc|e\.g|i\.e|approx|no)\.\s/gi, "$1<DOT> ")
    .replace(/(\$?\d+)\.(\d)/g, "$1<DOT>$2"); // 91.5% style decimals
  const raw = protectedText
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"'“])/)
    .map((s) => s.replace(/<DOT>/g, ".").trim())
    .filter((s) => s.length > 0 && /[a-zA-Z]/.test(s));
  return raw;
}

const sentences = splitSentences(mainText);

function wordCount(s) {
  return s
    .split(/\s+/)
    .filter((w) => /[a-zA-Z0-9]/.test(w)).length;
}

const lengths = sentences.map(wordCount);
const n = lengths.length;
const mean = n ? lengths.reduce((a, b) => a + b, 0) / n : 0;
const variance = n
  ? lengths.reduce((a, b) => a + (b - mean) ** 2, 0) / n
  : 0;
const stddev = Math.sqrt(variance);
const in15to20 = lengths.filter((l) => l >= 15 && l <= 20).length;
const share15to20 = n ? (in15to20 / n) * 100 : 0;

const result = {
  file,
  label: label || file,
  usedBodyFallback: usedFallback,
  sentenceCount: n,
  meanLength: Number(mean.toFixed(2)),
  stddev: Number(stddev.toFixed(2)),
  share15to20Pct: Number(share15to20.toFixed(1)),
  emDashCountFullPage: emDashCount,
  flagLowStddev: stddev < 5,
  flagHighShare: share15to20 > 50,
};

console.log(JSON.stringify(result, null, 2));
