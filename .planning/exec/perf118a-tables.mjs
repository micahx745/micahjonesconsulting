// Pass-118a tables straight from probe.json (no model transcription).
// CLS here counts EVERY layout shift, including ones Chrome flagged hadRecentInput:
// no input is sent in these runs, and Lighthouse counts the same shift (0.147 on /).
import { readFileSync } from "node:fs";
const p = JSON.parse(readFileSync(".planning/qa/pass-118a/probe.json", "utf8"));
const med = (a) => { const s = [...a].sort((x, y) => x - y); if (!s.length) return "n/a"; const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const num = (v) => (typeof v === "number" ? v : null);
console.log("| cond | loads | CLS all shifts min/med/max | loads >0.05 | flagged-input shifts | top source (dy) | shift t med | class t med | fonts t med | LCP med | LCP node |");
console.log("|---|---|---|---|---|---|---|---|---|---|---|");
for (const [k, loads] of Object.entries(p.conditions)) {
  const cls = loads.map((r) => r.shifts.reduce((t, s) => t + s.value, 0));
  const flagged = loads.reduce((t, r) => t + r.shifts.filter((s) => s.hadRecentInput).length, 0);
  const tops = loads.map((r) => r.shifts.slice().sort((a, b) => b.value - a.value)[0]).filter(Boolean);
  const srcCount = {};
  for (const t of tops) { const s = t.sources[0]; const key = `${s ? s.nodeName : "?"} (dy ${s ? Math.round(s.dy) : "?"})`; srcCount[key] = (srcCount[key] || 0) + 1; }
  const topSrc = Object.entries(srcCount).sort((a, b) => b[1] - a[1]).map(([n, c]) => `${n} x${c}`).slice(0, 2).join("; ") || "none";
  const ct = loads.map((r) => num(r.classTime ?? r.pageTimes?.classTime)).filter((v) => v !== null);
  const ft = loads.map((r) => num(r.fontsTime ?? r.pageTimes?.fontsTime)).filter((v) => v !== null);
  const lcp = loads.map((r) => r.lcp && num(r.lcp.time)).filter((v) => v !== null);
  const lcpNodes = {}; loads.forEach((r) => { const n = r.lcp ? r.lcp.nodeName : "none"; lcpNodes[n] = (lcpNodes[n] || 0) + 1; });
  console.log(`| ${k} | ${loads.length} | ${Math.min(...cls).toFixed(3)} / ${med(cls).toFixed(3)} / ${Math.max(...cls).toFixed(3)} | ${cls.filter((c) => c > 0.05).length} | ${flagged} | ${topSrc} | ${tops.length ? Math.round(med(tops.map((t) => t.time))) : "none"} | ${ct.length ? Math.round(med(ct)) : "not reported"} | ${ft.length ? Math.round(med(ft)) : "not reported"} | ${lcp.length ? Math.round(med(lcp)) : "n/a"} | ${Object.entries(lcpNodes).map(([n, c]) => `${n} x${c}`).join(", ")} |`);
}
