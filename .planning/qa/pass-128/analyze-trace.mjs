// Pass-128 scratch analysis (evidence phase only). Reads a trace JSON
// produced by scroll-probe.mjs --trace and buckets named events by
// 5-frame-ish time windows so we can see whether big UpdateLayoutTree /
// Paint / Layerize costs cluster at the two world-switch timestamps or
// are spread across the whole scroll. Not part of the deliverable probe.
import fs from "node:fs";

const file = process.argv[2];
const worldSwitchTimesMsArg = process.argv[3]; // comma-separated trace-clock times, optional
const raw = fs.readFileSync(file, "utf8");
const parsed = JSON.parse(raw);
const events = Array.isArray(parsed) ? parsed : parsed.traceEvents || [];

// Trace timestamps (ts) are in microseconds, absolute clock. Find the min
// to normalize to a 0-based ms timeline for readability.
let minTs = Infinity;
for (const e of events) {
  if (typeof e.ts === "number" && e.ts < minTs) minTs = e.ts;
}

const NAMES_OF_INTEREST = new Set([
  "UpdateLayoutTree",
  "Paint",
  "Layerize",
  "PrePaint",
  "Layout",
  "CompositeLayers",
  "ScrollLayer",
  "FunctionCall",
  "EventDispatch",
  "HitTest",
]);

const rows = [];
for (const e of events) {
  if (e.ph !== "X" || typeof e.dur !== "number") continue;
  if (!NAMES_OF_INTEREST.has(e.name)) continue;
  const startMs = (e.ts - minTs) / 1000;
  rows.push({ name: e.name, startMs: Math.round(startMs), durMs: Math.round(e.dur / 1000 * 100) / 100 });
}
rows.sort((a, b) => a.startMs - b.startMs);

// Bucket into 200ms windows.
const buckets = new Map();
for (const r of rows) {
  const bucket = Math.floor(r.startMs / 200) * 200;
  const key = `${bucket}`;
  if (!buckets.has(key)) buckets.set(key, {});
  const b = buckets.get(key);
  b[r.name] = (b[r.name] || 0) + r.durMs;
}

console.log("window_ms_start | " + [...NAMES_OF_INTEREST].join(" | "));
const sortedKeys = [...buckets.keys()].map(Number).sort((a, b) => a - b);
for (const k of sortedKeys) {
  const b = buckets.get(String(k));
  const cells = [...NAMES_OF_INTEREST].map((n) => (b[n] ? b[n].toFixed(1) : ""));
  console.log(`${k}\t` + cells.join("\t"));
}

// Also print the largest 15 individual UpdateLayoutTree / Paint / Layerize
// events with their start time, to see if any single huge one exists vs
// many small ones.
const big = rows
  .filter((r) => ["UpdateLayoutTree", "Paint", "Layerize"].includes(r.name))
  .sort((a, b) => b.durMs - a.durMs)
  .slice(0, 15);
console.log("\nTop individual events:");
for (const r of big) console.log(`${r.name}\tstart=${r.startMs}ms\tdur=${r.durMs}ms`);

if (worldSwitchTimesMsArg) {
  console.log("\nWorld switch times (page.evaluate performance.now(), NOT trace clock -- for reference only):", worldSwitchTimesMsArg);
}
