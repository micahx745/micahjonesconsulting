// Pass-125 mechanical pre-check of a drafted page (run: node precheck.mjs <draft.md> ...).
// It does NOT judge facts; the main session reads every tagged sentence against LESSONS #3.
// Flags: banned words (brand.json, any inflection by stem), retired phrases, non-ASCII,
// sentences over 30 words, untagged sentences, body words per draft section.
import fs from "node:fs";

const brand = JSON.parse(fs.readFileSync(new URL("../../../.claude/brand.json", import.meta.url), "utf8"));
const banned = brand.voice.banned;
const retired = ["email me", "sales manager", "consulting revenue", "client revenue", "since 2013", "a decade",
  "the playbook", "field manual", "end-to-end product build", "foreign", "led to", "medicare", "per claim", "luna",
  "anti-racism", "290,000", "36x", "monthly reach", "intake completion", "91%", "been hacked", "scored for fit",
  "eleven contracts", "head of", "team i led", "i led", "managed", "very early", "founding", "co-founder",
  "real fear", "between their own systems", "a deal", "solo", "one engineer", "behind the work", "we ", "oakland",
  "remote", "$5k", "package", "playbook", "helped build", "2017", "2019", "2022", "2023", "2024"];

for (const file of process.argv.slice(2)) {
  const text = fs.readFileSync(file, "utf8");
  const lower = text.toLowerCase();
  const out = [];
  const nonAscii = [...text].map((c, i) => [c, i]).filter(([c]) => c.charCodeAt(0) > 127);
  if (nonAscii.length) out.push(`NON-ASCII x${nonAscii.length}: ${[...new Set(nonAscii.map(([c]) => c))].join(" ")}`);
  for (const w of banned) {
    const stem = w.length > 5 && !w.includes(" ") ? w.replace(/e$/, "") : w;
    const re = new RegExp(`\\b${stem.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}`, "gi");
    const m = text.match(re);
    if (m) out.push(`BANNED "${w}" x${m.length}`);
  }
  for (const p of retired) {
    let idx = lower.indexOf(p), n = 0;
    while (idx !== -1) { n++; idx = lower.indexOf(p, idx + 1); }
    if (n) out.push(`RETIRED/WATCH "${p}" x${n}`);
  }
  // Sentences: strip markdown, split on terminal punctuation; report >30 words and untagged ones.
  const lines = text.split(/\r?\n/).filter((l) => l.trim() && !/^#/.test(l.trim()));
  let long = 0, untagged = 0;
  for (const l of lines) {
    const sentences = l.replace(/^[-*>\d.\s]+/, "").split(/(?<=[.?!]["')]?(?:\s*\[[^\]]*\])?)\s+(?=[A-Z"$])/);
    for (const s of sentences) {
      const bare = s.replace(/\[[^\]]*\]/g, "").trim();
      const words = bare.split(/\s+/).filter(Boolean).length;
      if (words > 30) { long++; out.push(`LONG (${words}w): ${bare.slice(0, 110)}`); }
      if (words >= 4 && !/\[(F\d|NONE)/.test(s) && /[.?!]$/.test(bare) && !/^(Browser|Meta|H1|Draft|Bet|Lose|Least|What|Which)/i.test(bare)) untagged++;
    }
  }
  out.push(`untagged sentences (approx): ${untagged}`);
  const emd = (text.match(/—/g) || []).length;
  out.push(`em-dashes: ${emd}`);
  console.log(`\n=== ${file}  (${text.length} chars)\n` + out.map((o) => "  " + o).join("\n"));
}
