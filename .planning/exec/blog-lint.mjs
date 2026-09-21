#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const CHECK_NAMES = [
  "FRAMEWORK NOUNS",
  "BRAND BANNED WORDS",
  "FRAGMENTS IN THREES",
  "MORAL ENDING",
  "BULLET DENSITY",
  "SENTENCE LENGTH",
  "LENGTH",
  "EM-DASH / PRONOUNS",
  "UNTICKED TAGS",
];

const FRAMEWORK_NOUNS = [
  "qualified visit",
  "useful result",
  "first useful result",
  "request to continue",
  "path to value",
  "segment evidence",
  "north star",
  "leverage",
  "unlock",
  "game-changer",
  "at the end of the day",
  "the bottom line",
  "in today's",
  "journey",
  "seamless",
  "robust",
  "delve",
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function phrasePattern(phrase) {
  return new RegExp(`(?<![\\p{L}\\p{N}_])${escapeRegExp(phrase)}(?![\\p{L}\\p{N}_])`, "iu");
}

function stripLinkUrls(text) {
  let result = text.replace(/(!?\[[^\]]*\])\([^\s)]+(?:\s+["'][^"']*["'])?\)/g, "$1");
  result = result.replace(/<https?:\/\/[^>]+>/gi, "");
  return result.replace(/https?:\/\/[^\s)>]+/gi, "");
}

function stripMarkdown(text) {
  return stripLinkUrls(text)
    .replace(/^\s{0,3}#{1,6}\s+/, "")
    .replace(/^\s*(?:[-+*]|\d+[.)])\s+/, "")
    .replace(/^\s*>\s?/, "")
    .replace(/!?(\[([^\]]*)\])/g, "$2")
    .replace(/[*_~`]/g, "")
    .trim();
}

function wordCount(text) {
  return (text.match(/[\p{L}\p{N}]+(?:['\u2019-][\p{L}\p{N}]+)*/gu) ?? []).length;
}

function prepareLines(source) {
  const lines = source.split(/\r?\n/);
  const kept = [];
  let fence = null;
  let table = false;

  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index];
    const marker = raw.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      const kind = marker[1][0];
      if (fence === null) fence = kind;
      else if (fence === kind) fence = null;
      continue;
    }
    if (fence !== null) continue;
    if (table) {
      if (raw.trim() !== "" && raw.includes("|")) continue;
      table = false;
    }
    if (raw.includes("|") && isTableSeparator(lines[index + 1] ?? "")) {
      table = true;
      continue;
    }
    if (isTableLine(raw)) continue;

    const withoutUrls = stripLinkUrls(raw);
    kept.push({
      number: index + 1,
      raw,
      text: withoutUrls,
      plain: stripMarkdown(withoutUrls),
      empty: withoutUrls.trim() === "",
      heading: /^\s{0,3}#{1,6}\s+/.test(withoutUrls),
      bullet: /^\s*(?:[-+*]|\d+[.)])\s+/.test(withoutUrls),
      quote: /^\s*>/.test(withoutUrls),
    });
  }

  return kept;
}

function isTableLine(line) {
  const trimmed = line.trim();
  if (!trimmed.includes("|")) return false;
  if (/^\|.*\|$/.test(trimmed)) return true;
  return isTableSeparator(trimmed);
}

function isTableSeparator(line) {
  return /^\|?\s*:?-{3,}:?(?:\s*\|\s*:?-{3,}:?)+\s*\|?$/.test(line.trim());
}

function proseLines(lines) {
  return lines.filter((line) => !line.empty && !line.heading && line.plain !== "");
}

function splitSentences(lines) {
  const sentences = [];
  let buffer = "";
  let contributors = [];

  function addPiece(piece, line) {
    if (piece.trim() === "") return;
    buffer = buffer === "" ? piece.trim() : `${buffer} ${piece.trim()}`;
    if (!contributors.includes(line)) contributors.push(line);
  }

  function flush() {
    const text = buffer.trim();
    if (text !== "") sentences.push({ text, words: wordCount(text), lines: contributors });
    buffer = "";
    contributors = [];
  }

  for (const line of lines) {
    if (line.empty) {
      flush();
      continue;
    }
    if (line.heading || line.plain === "") continue;

    const pieces = line.plain.match(/[^.!?]+(?:[.!?]+(?:["')\]]+)?|$)/g) ?? [];
    for (const piece of pieces) {
      addPiece(piece, line);
      if (/[.!?](?:["')\]]*)\s*$/.test(piece)) flush();
    }
  }
  flush();
  return sentences.filter((sentence) => sentence.words > 0);
}

function uniqueLines(lines) {
  const seen = new Set();
  return lines.filter((line) => {
    if (!line || seen.has(line.number)) return false;
    seen.add(line.number);
    return true;
  });
}

function result(name, offenders = [], detail = "") {
  return { name, pass: offenders.length === 0 && detail === "", offenders: uniqueLines(offenders).slice(0, 5), detail };
}

function lint(source, bannedWords) {
  const lines = prepareLines(source);
  const prose = proseLines(lines);
  const sentences = splitSentences(lines);
  const checks = [];

  const frameworkPatterns = FRAMEWORK_NOUNS.map(phrasePattern);
  checks.push(result(CHECK_NAMES[0], lines.filter((line) => frameworkPatterns.some((pattern) => pattern.test(line.text)))));

  const bannedPatterns = bannedWords.map(phrasePattern);
  checks.push(result(CHECK_NAMES[1], lines.filter((line) => bannedPatterns.some((pattern) => pattern.test(line.text)))));

  const fragmentLines = [];
  for (let index = 0; index <= sentences.length - 3; index += 1) {
    const run = sentences.slice(index, index + 3);
    if (run.every((sentence) => sentence.words <= 4)) {
      fragmentLines.push(...run.flatMap((sentence) => sentence.lines));
    }
  }
  checks.push(result(CHECK_NAMES[2], fragmentLines));

  const paragraphs = [];
  let paragraph = [];
  for (const line of lines) {
    if (line.empty) {
      if (paragraph.length > 0) paragraphs.push(paragraph);
      paragraph = [];
    } else if (!line.heading && line.plain !== "") {
      paragraph.push(line);
    }
  }
  if (paragraph.length > 0) paragraphs.push(paragraph);
  const lastParagraph = paragraphs.at(-1) ?? [];
  const moralPattern = /^(?:The lesson|In the end|Ultimately|The takeaway|Remember)\b/i;
  checks.push(result(CHECK_NAMES[3], lastParagraph.length > 0 && moralPattern.test(lastParagraph[0].plain) ? [lastParagraph[0]] : []));

  const bullets = prose.filter((line) => line.bullet);
  const bulletRatio = prose.length === 0 ? 0 : bullets.length / prose.length;
  checks.push(result(CHECK_NAMES[4], bulletRatio > 0.3 ? bullets : [], bulletRatio > 0.3 ? `${bullets.length}/${prose.length} prose lines are list items (${(bulletRatio * 100).toFixed(1)}%)` : ""));

  const totalSentenceWords = sentences.reduce((sum, sentence) => sum + sentence.words, 0);
  const average = sentences.length === 0 ? 0 : totalSentenceWords / sentences.length;
  const longSentences = sentences.filter((sentence) => sentence.words > 40);
  const sentenceLengthFails = average > 22 || longSentences.length > 0;
  const sentenceOffenders = longSentences.length > 0
    ? longSentences.flatMap((sentence) => sentence.lines)
    : [...sentences].sort((a, b) => b.words - a.words).flatMap((sentence) => sentence.lines);
  const sentenceDetail = sentenceLengthFails
    ? `average ${average.toFixed(1)} words; longest ${Math.max(0, ...sentences.map((sentence) => sentence.words))} words`
    : "";
  checks.push(result(CHECK_NAMES[5], sentenceLengthFails ? sentenceOffenders : [], sentenceDetail));

  let proseWords = 0;
  const overLimitLines = [];
  for (const line of prose) {
    proseWords += wordCount(line.plain);
    if (proseWords > 1500) overLimitLines.push(line);
  }
  checks.push(result(CHECK_NAMES[6], proseWords > 1500 ? overLimitLines : [], proseWords > 1500 ? `${proseWords} prose words` : ""));

  const emDash = "\u2014";
  const pronounPattern = /(?<![\p{L}\p{N}_])(?:we|our|us)(?![\p{L}\p{N}_])/iu;
  checks.push(result(CHECK_NAMES[7], lines.filter((line) => line.text.includes(emDash) || (!line.quote && pronounPattern.test(line.text)))));

  checks.push(result(CHECK_NAMES[8], lines.filter((line) => line.text.includes("[TAG"))));
  return checks;
}

function printChecks(checks) {
  for (const check of checks) {
    console.log(`${check.name}: ${check.pass ? "PASS" : "FAIL"}${check.detail ? ` (${check.detail})` : ""}`);
    if (!check.pass) {
      for (const line of check.offenders) {
        console.log(`  L${line.number}: ${JSON.stringify(line.raw)}`);
      }
    }
  }
  const failures = checks.filter((check) => !check.pass).length;
  console.log(`BLOG-LINT: ${failures} failures`);
  return failures;
}

async function loadBannedWords() {
  const brandUrl = new URL("../../.claude/brand.json", import.meta.url);
  const brand = JSON.parse(await readFile(brandUrl, "utf8"));
  if (!Array.isArray(brand?.voice?.banned) || !brand.voice.banned.every((word) => typeof word === "string")) {
    throw new Error(".claude/brand.json must contain a voice.banned string array");
  }
  return brand.voice.banned;
}

async function selfTest() {
  const bannedWords = await loadBannedWords();
  const rejectedUrl = new URL("../drafts/blog-01/POST-blog-01.md", import.meta.url);
  const rejected = await readFile(rejectedUrl, "utf8");
  const rejectedChecks = lint(rejected, bannedWords);
  const clean = [
    "A small product earns attention by solving a clear problem for a specific person. Start with one real task, then watch someone try the simplest version. Their pauses and questions show where the work is still confusing.",
    "Keep the first test narrow enough to finish this week. Talk with several people who already face the problem, record what happens, and change one thing at a time. Clear notes make each decision easier to explain later.",
    "A useful release does not need a grand conclusion. It needs honest evidence, careful writing, and a direct next step. Publish what happened, name what remains uncertain, and let the next test answer a focused question.",
  ].join("\n\n");
  const cleanChecks = lint(clean, bannedWords);
  const rejectedHasRequiredFailures = !rejectedChecks[0].pass && !rejectedChecks[4].pass;
  const cleanPasses = cleanChecks.every((check) => check.pass);

  if (!rejectedHasRequiredFailures || !cleanPasses) {
    console.log("BLOG-LINT SELF-TEST: FAIL");
    if (!rejectedHasRequiredFailures) console.log("Rejected draft did not fail checks 1 and 5.");
    for (const check of cleanChecks.filter((item) => !item.pass)) console.log(`Clean fixture failed: ${check.name}`);
    return 1;
  }

  console.log("BLOG-LINT SELF-TEST: PASS");
  return 0;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === "--self-test") return selfTest();
  if (args.length !== 1) {
    console.error("Usage: node .planning/exec/blog-lint.mjs <post.md>");
    console.error("       node .planning/exec/blog-lint.mjs --self-test");
    return 2;
  }

  const [source, bannedWords] = await Promise.all([
    readFile(args[0], "utf8"),
    loadBannedWords(),
  ]);
  return printChecks(lint(source, bannedWords)) === 0 ? 0 : 1;
}

try {
  process.exitCode = await main();
} catch (error) {
  console.error(`BLOG-LINT ERROR: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 2;
}
