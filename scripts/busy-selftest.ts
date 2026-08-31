// scripts/busy-selftest.ts — unit checks for lib/busy.ts (run: npx tsx scripts/busy-selftest.ts)
import { parseBusyWindows, pacificToUtcMs } from "../lib/busy";

const pdt = pacificToUtcMs("2026-09-08", "10:30"); // PDT: UTC-7 -> 17:30Z
const pst = pacificToUtcMs("2026-12-08", "10:30"); // PST: UTC-8 -> 18:30Z
console.log(
  "PDT ok:",
  new Date(pdt).toISOString() === "2026-09-08T17:30:00.000Z",
);
console.log(
  "PST ok:",
  new Date(pst).toISOString() === "2026-12-08T18:30:00.000Z",
);

const ics = [
  "BEGIN:VCALENDAR",
  "BEGIN:VEVENT",
  "DTSTART:20260908T170000Z",
  "DTEND:20260908T180000Z",
  "END:VEVENT",
  "BEGIN:VEVENT",
  "RRULE:FREQ=WEEKLY",
  "DTSTART:20260908T200000Z",
  "DTEND:20260908T210000Z",
  "END:VEVENT",
  "BEGIN:VEVENT",
  "DTSTART;TZID=America/Los_Angeles:20260910T140000",
  "DTEND;TZID=America/Los_Angeles:20260910T150000",
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");
const w = parseBusyWindows(ics);
console.log("windows parsed (expect 2, RRULE skipped):", w.length);

const s1 = pacificToUtcMs("2026-09-08", "10:30");
const e1 = s1 + 30 * 60000;
console.log(
  "overlap detected:",
  w.some((x) => s1 < x.endMs && e1 > x.startMs),
);
const s2 = pacificToUtcMs("2026-09-10", "10:30");
const e2 = s2 + 30 * 60000;
console.log(
  "non-overlap clean:",
  !w.some((x) => s2 < x.endMs && e2 > x.startMs),
);
