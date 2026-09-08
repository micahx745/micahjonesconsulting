import { readFileSync, writeFileSync } from "node:fs";
import { scanString } from "../../../lib/copy-lint";

const dir = ".planning/qa/pass-103c/";
const rows = JSON.parse(readFileSync(dir + "applied-rows.json", "utf8"));
const rendered = JSON.parse(readFileSync(dir + "after.json", "utf8"));
const findings = [
  ...rows.filter((r: { proposed?: string }) => r.proposed).flatMap((r: { proposed: string; row: number }) =>
    scanString(r.proposed, `PASS-103 reword row ${r.row}`)),
  ...Object.entries(rendered).flatMap(([key, value]) =>
    scanString((value as { text: string }).text, key)),
];
const report = { approvedWordingRows: rows.length - 1, renderedSamples: Object.keys(rendered).length, findings };
writeFileSync(dir + "copy-lint.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exitCode = findings.length ? 1 : 0;
