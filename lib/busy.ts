// lib/busy.ts
//
// Best-effort busy-check for /book against the operator's Google
// Calendar, via the calendar's SECRET ICAL URL (no OAuth, read-only).
// The URL is a credential: it lives in the BOOKING_CAL_ICS_URL env var,
// set by the operator in the Vercel dashboard — never in the repo.
//
// Design limits (v1, documented honestly):
// - Plain events (DTSTART/DTEND, date-time or all-day) are honored.
// - RRULE-bearing (recurring) events are SKIPPED — expanding recurrence
//   rules correctly is a library-sized problem. The operator remains
//   the manual backstop for those, as he already planned to be.
// - Any fetch/parse failure fails OPEN (booking proceeds); the check
//   narrows double-booking, it does not guarantee against it.

interface BusyWindow {
  startMs: number;
  endMs: number;
}

// UTC instant for a Pacific wall-clock time. Tries PDT (-7) then PST
// (-8) and keeps the candidate whose LA rendering round-trips.
export function pacificToUtcMs(date: string, time: string): number {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  for (const offset of [7, 8]) {
    const cand = Date.UTC(y!, mo! - 1, d!, h! + offset, mi!);
    const parts = fmt.formatToParts(new Date(cand));
    const hh = Number(parts.find((p) => p.type === "hour")?.value);
    const mm = Number(parts.find((p) => p.type === "minute")?.value);
    if ((hh === h || (h === 0 && hh === 24)) && mm === mi) return cand;
  }
  // Fallback: PST. A DST-transition hour is off by 60m at worst, and
  // the operator's manual backstop covers it.
  return Date.UTC(y!, mo! - 1, d!, h! + 8, mi!);
}

function parseIcsDate(raw: string): number | null {
  // 20260908T173000Z
  let m = raw.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/);
  if (m) return Date.UTC(+m[1]!, +m[2]! - 1, +m[3]!, +m[4]!, +m[5]!, +m[6]!);
  // 20260908T103000 with TZID handled by caller passing tz-less locals
  // through pacificToUtcMs only when TZID is America/Los_Angeles;
  // other TZIDs are approximated as UTC (rare in a personal calendar,
  // and the check fails open by design).
  m = raw.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/);
  if (m) return Date.UTC(+m[1]!, +m[2]! - 1, +m[3]!, +m[4]!, +m[5]!, +m[6]!);
  // All-day: 20260908
  m = raw.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (m) return Date.UTC(+m[1]!, +m[2]! - 1, +m[3]!);
  return null;
}

export function parseBusyWindows(ics: string): BusyWindow[] {
  const windows: BusyWindow[] = [];
  // Unfold RFC 5545 folded lines, split events.
  const unfolded = ics.replace(/\r?\n[ \t]/g, "");
  const events = unfolded.split("BEGIN:VEVENT").slice(1);
  for (const ev of events) {
    if (/^RRULE:/m.test(ev)) continue; // recurring: skipped (v1)
    if (/^STATUS:CANCELLED/m.test(ev)) continue;
    const ds = ev.match(/^DTSTART(?:;[^:]*)?:(\S+)/m);
    const de = ev.match(/^DTEND(?:;[^:]*)?:(\S+)/m);
    if (!ds || !de) continue;
    const tzLA = /TZID=America\/Los_Angeles/.test(ds[0] ?? "");
    let startMs: number | null;
    let endMs: number | null;
    if (tzLA) {
      const s = ds[1]!.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
      const e = de[1]!.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
      startMs = s
        ? pacificToUtcMs(`${s[1]}-${s[2]}-${s[3]}`, `${s[4]}:${s[5]}`)
        : null;
      endMs = e
        ? pacificToUtcMs(`${e[1]}-${e[2]}-${e[3]}`, `${e[4]}:${e[5]}`)
        : null;
    } else {
      startMs = parseIcsDate(ds[1]!);
      endMs = parseIcsDate(de[1]!);
    }
    if (startMs != null && endMs != null && endMs > startMs)
      windows.push({ startMs, endMs });
  }
  return windows;
}

/** True when the requested Pacific slot overlaps a busy window. */
export async function slotIsBusy(
  date: string,
  time: string,
  durationMinutes: number,
): Promise<boolean> {
  const url = process.env.BOOKING_CAL_ICS_URL;
  if (!url) return false; // not configured: fail open
  try {
    // Google's secret-ICS endpoint 404s intermittently; one retry
    // absorbs the flake before we give up and fail open.
    let res = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) {
      res = await fetch(url, {
        cache: "no-store",
        signal: AbortSignal.timeout(6000),
      });
    }
    if (!res.ok) return false;
    const windows = parseBusyWindows(await res.text());
    const start = pacificToUtcMs(date, time);
    const end = start + durationMinutes * 60_000;
    return windows.some((w) => start < w.endMs && end > w.startMs);
  } catch (err) {
    console.warn("[book-call] busy-check failed open:", err);
    return false;
  }
}
