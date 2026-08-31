// lib/ics.ts
//
// iCalendar (RFC 5545) invite builder for the /book flow. Pure function
// so it can be unit-tested without sending mail. METHOD:REQUEST +
// ORGANIZER/ATTENDEE makes Gmail/Outlook/Apple render the attachment as
// a real calendar invite; the two VALARMs give the booker built-in
// reminders (24 hours and 1 hour before) in clients that honor them.
//
// Times are authored in America/Los_Angeles with a full VTIMEZONE
// definition, so DST is the calendar client's problem, not ours.

const TZID = "America/Los_Angeles";

// Standard VTIMEZONE block for America/Los_Angeles (US DST rules).
const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  `TZID:${TZID}`,
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:-0800",
  "TZOFFSETTO:-0700",
  "TZNAME:PDT",
  "DTSTART:19700308T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:-0700",
  "TZOFFSETTO:-0800",
  "TZNAME:PST",
  "DTSTART:19701101T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
].join("\r\n");

export interface InviteInput {
  /** YYYY-MM-DD (a Pacific-time calendar date) */
  date: string;
  /** HH:MM 24h, Pacific (e.g. "10:30") */
  time: string;
  durationMinutes: number;
  bookerName: string;
  bookerEmail: string;
  note?: string;
}

function escapeText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

export function buildInviteIcs(input: InviteInput): {
  ics: string;
  uid: string;
} {
  const { date, time, durationMinutes, bookerName, bookerEmail, note } =
    input;
  const [y, mo, d] = date.split("-");
  const [h, mi] = time.split(":");
  const dtStart = `${y}${mo}${d}T${h}${mi}00`;

  // End time: minutes arithmetic within the same day (slots end by 4pm,
  // so no midnight rollover is possible under the /book windows).
  const startMinutes = Number(h) * 60 + Number(mi);
  const endMinutes = startMinutes + durationMinutes;
  const endH = String(Math.floor(endMinutes / 60)).padStart(2, "0");
  const endM = String(endMinutes % 60).padStart(2, "0");
  const dtEnd = `${y}${mo}${d}T${endH}${endM}00`;

  const uid = `book-${date}-${time.replace(":", "")}-${Math.random()
    .toString(36)
    .slice(2, 10)}@micahjonesconsulting.com`;

  const now = new Date();
  const dtStamp =
    now.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";

  const description = escapeText(
    [
      `Intro call — ${bookerName} + Micah Jones (30 minutes).`,
      note ? `Note from ${bookerName}: ${note}` : "",
      "Micah will reply with a video link before the call.",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  const ics = [
    "BEGIN:VCALENDAR",
    "PRODID:-//micahjonesconsulting.com//book//EN",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    VTIMEZONE,
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;TZID=${TZID}:${dtStart}`,
    `DTEND;TZID=${TZID}:${dtEnd}`,
    `SUMMARY:${escapeText(`Intro call — ${bookerName} + Micah Jones`)}`,
    `DESCRIPTION:${description}`,
    "LOCATION:Video call (link to follow)",
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "TRANSP:OPAQUE",
    'ORGANIZER;CN=Micah Jones:mailto:micah@micahjonesconsulting.com',
    `ATTENDEE;CN=${escapeText(bookerName)};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${bookerEmail}`,
    "ATTENDEE;CN=Micah Jones;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED:mailto:micah@micahjonesconsulting.com",
    // Reminders: 24 hours and 1 hour before.
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Intro call with Micah Jones tomorrow",
    "TRIGGER:-P1D",
    "END:VALARM",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Intro call with Micah Jones in 1 hour",
    "TRIGGER:-PT1H",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return { ics, uid };
}
