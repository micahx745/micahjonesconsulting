import fs from "node:fs";

const raw = JSON.parse(fs.readFileSync(process.argv[2] || "word-timing-raw.run1.json", "utf8"));
const samples = raw.samples;
const keys = Object.keys(samples.find(s => Object.keys(s.els).length)?.els || {});

function parseTransform(t) {
  return t; // compare as string; "none" or matrix(...)
}

function analyzeKey(key) {
  // final value = last non-null sample
  let finalRow = null;
  for (let i = samples.length - 1; i >= 0; i--) {
    if (samples[i].els[key]) { finalRow = samples[i].els[key]; break; }
  }
  if (!finalRow) return { key, status: "never appeared" };
  const finalOpacity = parseFloat(finalRow.opacity);
  const finalTransform = finalRow.transform;

  let tFirstExist = null;
  let tEnter = null;
  let tSettled = null;
  let consecutive = 0;
  for (const s of samples) {
    const e = s.els[key];
    if (!e) continue;
    if (tFirstExist === null) tFirstExist = s.t;
    const inView = e.top < s.innerHeight && e.bottom > 0;
    if (inView && tEnter === null) tEnter = s.t;
    if (tEnter !== null && tSettled === null) {
      const opOk = Math.abs(parseFloat(e.opacity) - finalOpacity) <= 0.02;
      const trOk = e.transform === finalTransform;
      if (opOk && trOk) {
        consecutive++;
        if (consecutive >= 3) tSettled = s.t; // first of the 3-run; approx
      } else {
        consecutive = 0;
      }
    }
  }
  return {
    key,
    finalOpacity,
    finalTransform: finalTransform.length > 40 ? finalTransform.slice(0,40)+"..." : finalTransform,
    tFirstExist: tFirstExist !== null ? Math.round(tFirstExist) : null,
    tEnter: tEnter !== null ? Math.round(tEnter) : null,
    tSettled: tSettled !== null ? Math.round(tSettled) : null,
    deltaEnterToSettled: (tEnter !== null && tSettled !== null) ? Math.round(tSettled - tEnter) : null,
  };
}

for (const k of keys) {
  console.log(JSON.stringify(analyzeKey(k)));
}

console.log("--- fontsStatus transitions ---");
let lastStatus = null;
for (const s of samples) {
  if (s.fontsStatus !== lastStatus) {
    console.log(Math.round(s.t), s.fontsStatus);
    lastStatus = s.fontsStatus;
  }
}
