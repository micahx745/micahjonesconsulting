// .planning/exec/rc2-text120.mjs
// Pass-120 return condition 2 (copy on the page, by curl): writes the VISIBLE text of each route
// (head, scripts, styles and comments stripped, entities decoded, one block per line break-ish tag) to
// .planning/qa/pass-120/rc2/<route>.txt so the main session reads what renders against the ledger
// (LESSONS #3 rows dated 2026-09-15 and 16). Also prints raw-byte hits for the ledger's NEVER phrases.
import { mkdirSync, writeFileSync } from "node:fs";
const BASE = process.argv[2] || "http://localhost:3200";
const OUT = ".planning/qa/pass-120/rc2";
mkdirSync(OUT, { recursive: true });
const ROUTES = ["/work", "/work/guardicore", "/work/rfp-engine", "/work/ordani", "/work/content-engine", "/work/birth-worker", "/", "/about", "/services", "/llms.txt"];
const NEVER = [
  "consulting revenue", "client revenue", "since 2013", "290,000", "290K", "36x", "36×", "industry author",
  "industry-authority", "same engagement", "anti-racism", "anti racism", "hacked", "repositioned toward",
  "California", "friends", "fourteen practitioners", "six had referred", "22 birth workers", "Organic bookings up 30%",
  "$80M", "80 million", "2018-2021", "2018–2021", "2024–2025", "2025–2026", "Helped launch · 2025", "Protected by NDA",
  "beta user", "not a dentist", "The reposition", "five months",
];
const vis = (html) => html
  .replace(/<head[\s\S]*?<\/head>/i, " ")
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<\/(p|h1|h2|h3|li|dt|dd|div|section|td|th|figcaption|blockquote|header|footer|nav|a)>/gi, "\n")
  .replace(/<br\s*\/?>/gi, "\n")
  .replace(/<[^>]+>/g, " ")
  .replace(/&#x27;|&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&nbsp;|&#160;/g, " ").replace(/&middot;/g, "·")
  .split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
for (const r of ROUTES) {
  const res = await fetch(BASE + r);
  const raw = await res.text();
  const text = r === "/llms.txt" ? raw : vis(raw);
  const name = r === "/" ? "home" : r.replace(/^\//, "").replace(/\//g, "_");
  writeFileSync(`${OUT}/${name}.txt`, text + "\n");
  const hits = NEVER.map((p) => [p, raw.toLowerCase().split(p.toLowerCase()).length - 1, text.toLowerCase().split(p.toLowerCase()).length - 1]).filter(([, a, b]) => a || b);
  console.log(`${res.status} ${r} -> ${OUT}/${name}.txt (${text.length} chars) NEVER hits raw/visible: ${hits.length ? JSON.stringify(hits) : "none"}`);
}
