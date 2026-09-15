// Pass-119 Lighthouse before/after summary and regression gates.
// Usage: node .planning/exec/lh119-summary.mjs
import { existsSync, readFileSync } from "node:fs";

const DIRECTORY = ".planning/exec/lh119";
const LABELS = ["before", "after"];
const ROUTES = [
  ["home", "/"],
  ["services", "/services"],
];
const METRICS = ["performance", "LCP", "FCP", "TBT"];

function rounded(value) {
  return Number.isFinite(value) ? Math.round(value) : null;
}

function readRun(path) {
  if (!existsSync(path)) return { missing: true };
  try {
    const report = JSON.parse(readFileSync(path, "utf8"));
    const values = {
      performance: rounded(report.categories?.performance?.score * 100),
      LCP: rounded(report.audits?.["largest-contentful-paint"]?.numericValue),
      FCP: rounded(report.audits?.["first-contentful-paint"]?.numericValue),
      TBT: rounded(report.audits?.["total-blocking-time"]?.numericValue),
    };
    return { values, invalid: METRICS.some((metric) => values[metric] === null) };
  } catch (error) {
    return { invalid: true, error: error instanceof Error ? error.message : String(error) };
  }
}

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[1];
}

function formatValues(values) {
  if (!values) return "missing";
  return `performance=${values.performance} LCP=${values.LCP}ms FCP=${values.FCP}ms TBT=${values.TBT}ms`;
}

const summaries = {};
let unavailable = false;
for (const label of LABELS) {
  summaries[label] = {};
  for (const [routeName, routePath] of ROUTES) {
    const runs = [];
    for (let run = 1; run <= 3; run++) {
      const path = `${DIRECTORY}/${label}-${routeName}-${run}.json`;
      const record = readRun(path);
      runs.push(record);
      if (record.missing) {
        unavailable = true;
        console.log(`${label} ${routePath} run ${run}: missing (${path})`);
      } else if (record.invalid) {
        unavailable = true;
        console.log(`${label} ${routePath} run ${run}: invalid${record.error ? ` (${record.error})` : ""}`);
      } else {
        console.log(`${label} ${routePath} run ${run}: ${formatValues(record.values)}`);
      }
    }

    const complete = runs.every((run) => run.values && !run.invalid);
    const medians = complete
      ? Object.fromEntries(
          METRICS.map((metric) => [metric, median(runs.map((run) => run.values[metric]))]),
        )
      : null;
    summaries[label][routeName] = medians;
    console.log(`${label} ${routePath} median: ${formatValues(medians)}`);
  }
}

let gateFailures = 0;
function gate(label, passed, numbers) {
  console.log(`${passed ? "PASS" : "FAIL"} ${label}: ${numbers}`);
  if (!passed) gateFailures++;
}

const beforeHome = summaries.before.home;
const afterHome = summaries.after.home;
const beforeServices = summaries.before.services;
const afterServices = summaries.after.services;

const lcpReady = beforeHome !== null && afterHome !== null;
gate(
  "/ median LCP after < before",
  lcpReady && afterHome.LCP < beforeHome.LCP,
  `after=${afterHome?.LCP ?? "missing"}ms before=${beforeHome?.LCP ?? "missing"}ms`,
);

const tbtReady = beforeHome !== null && afterHome !== null;
gate(
  "/ median TBT after <= before + 10",
  tbtReady && afterHome.TBT <= beforeHome.TBT + 10,
  `after=${afterHome?.TBT ?? "missing"}ms before=${beforeHome?.TBT ?? "missing"}ms limit=${beforeHome ? beforeHome.TBT + 10 : "missing"}ms`,
);

const servicesReady = beforeServices !== null && afterServices !== null;
const servicesDifference = servicesReady
  ? Math.abs(afterServices.performance - beforeServices.performance)
  : null;
gate(
  "/services median performance within 1 point",
  servicesReady && servicesDifference <= 1,
  `after=${afterServices?.performance ?? "missing"} before=${beforeServices?.performance ?? "missing"} difference=${servicesDifference ?? "missing"}`,
);

const targetValue = afterHome?.performance ?? null;
console.log(
  `target / median performance >= 95: ${targetValue !== null && targetValue >= 95 ? "MET" : "NOT MET"} (${targetValue ?? "missing"})`,
);
console.log(`lh119 gate failures: ${gateFailures}`);
process.exit(gateFailures > 0 || unavailable ? 1 : 0);
