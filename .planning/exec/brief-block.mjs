// .planning/exec/brief-block.mjs
// Pass-120 build helper. Prints the body of the first fenced code block in the brief whose
// opening fence sits on or after line N (1-based), without the fence lines, LF endings, ending
// with one newline. Used to place "exactly this" blocks and to diff a written file against them:
//   node .planning/exec/brief-block.mjs 238 > /tmp/x && diff /tmp/x lib/case-study-schema.ts
// Optional second argument: an end line; the script refuses a block whose opening fence is past it.
import { readFileSync } from "node:fs";

const BRIEF = ".claude/briefs/pass-120-work-page.md";
const start = Number(process.argv[2]);
const end = process.argv[3] ? Number(process.argv[3]) : Infinity;
if (!Number.isInteger(start) || start < 1) {
  console.error("usage: node .planning/exec/brief-block.mjs <startLine> [endLine]");
  process.exit(2);
}
const lines = readFileSync(BRIEF, "utf8").replace(/\r\n/g, "\n").split("\n");
let open = -1;
let fence = "";
for (let i = start - 1; i < lines.length; i++) {
  const m = lines[i].match(/^(\s*)(`{3,})/);
  if (m) {
    open = i;
    fence = m[2];
    break;
  }
}
if (open < 0 || open + 1 > end) {
  console.error(`brief-block: no fence opening at or after line ${start}${end < Infinity ? ` before ${end}` : ""}`);
  process.exit(1);
}
const indent = lines[open].match(/^(\s*)/)[1];
const body = [];
for (let i = open + 1; i < lines.length; i++) {
  if (lines[i].startsWith(indent + fence) && lines[i].trim() === fence) {
    process.stdout.write(body.map((l) => (l.startsWith(indent) ? l.slice(indent.length) : l)).join("\n") + "\n");
    console.error(`brief-block: fence at line ${open + 1}, closes at line ${i + 1}, ${body.length} lines`);
    process.exit(0);
  }
  body.push(lines[i]);
}
console.error(`brief-block: fence at line ${open + 1} never closes`);
process.exit(1);
