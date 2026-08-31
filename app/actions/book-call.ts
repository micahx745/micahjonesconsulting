// app/actions/book-call.ts
//
// Self-hosted booking (Pass-18, replaces Calendly). Operator spec:
// Tue–Thu, 10:00–16:00 Pacific, 30-minute slots, confirmations to
// micah@; he resolves conflicts manually on his side. The confirmation
// emails carry a real iCalendar invite (lib/ics.ts) with built-in
// 24-hour and 1-hour reminders, so both parties get a native calendar
// event without any external scheduler.
//
// Calendar-source sync (auto-blocking booked slots) is a planned
// follow-up once the operator shares which calendar to connect.
"use server";

import { Resend } from "resend";
import { buildInviteIcs } from "@/lib/ics";

interface Result {
  ok: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const OWNER = "micah@micahjonesconsulting.com";

// Valid 30-minute start times, 10:00 through 15:30 Pacific.
const SLOTS = Array.from({ length: 12 }, (_, i) => {
  const minutes = 10 * 60 + i * 30;
  const h = String(Math.floor(minutes / 60)).padStart(2, "0");
  const m = String(minutes % 60).padStart(2, "0");
  return `${h}:${m}`;
});

// Weekday of a YYYY-MM-DD calendar date, evaluated in Pacific time.
// Anchoring at 19:00Z puts us at 11am/12pm in LA on that same date,
// safely inside the day on both sides of DST.
function pacificWeekday(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
  }).format(new Date(`${date}T19:00:00Z`));
}

export async function submitBooking(formData: {
  name: string;
  email: string;
  date: string;
  time: string;
  note?: string;
}): Promise<Result> {
  const name = (formData.name ?? "").trim().slice(0, 120);
  const email = (formData.email ?? "").trim().slice(0, 200);
  const date = (formData.date ?? "").trim();
  const time = (formData.time ?? "").trim();
  const note = (formData.note ?? "").trim().slice(0, 1000);

  if (name.length < 2) return { ok: false, error: "Add your name." };
  if (!EMAIL_RE.test(email))
    return { ok: false, error: "That email doesn't look valid." };
  if (!DATE_RE.test(date) || !SLOTS.includes(time))
    return { ok: false, error: "Pick a date and a time slot." };

  const weekday = pacificWeekday(date);
  if (!["Tue", "Wed", "Thu"].includes(weekday))
    return {
      ok: false,
      error: "Calls run Tuesday through Thursday — pick one of those days.",
    };

  // Window: tomorrow through 60 days out (Pacific-agnostic day math is
  // fine at this granularity).
  const picked = new Date(`${date}T19:00:00Z`).getTime();
  const now = Date.now();
  if (picked < now)
    return { ok: false, error: "That date has already passed." };
  if (picked > now + 60 * 86400_000)
    return { ok: false, error: "Pick a date within the next 60 days." };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[book-call] RESEND_API_KEY not set — logging only", {
      name,
      email,
      date,
      time,
    });
    return {
      ok: false,
      error: `Booking isn't wired up yet — email ${OWNER} instead.`,
    };
  }

  const { ics } = buildInviteIcs({
    date,
    time,
    durationMinutes: 30,
    bookerName: name,
    bookerEmail: email,
    note: note || undefined,
  });

  const prettyDate = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T19:00:00Z`));
  const prettyWhen = `${prettyDate} at ${time} Pacific`;

  const attachment = {
    filename: "invite.ics",
    content: Buffer.from(ics).toString("base64"),
  };

  try {
    const resend = new Resend(apiKey);
    // Booker: confirmation + the invite (their calendar picks it up).
    const r1 = await resend.emails.send({
      from: `Micah Jones <${OWNER}>`,
      to: email,
      replyTo: OWNER,
      subject: `Confirmed — intro call with Micah Jones, ${prettyWhen}`,
      text: [
        `${name},`,
        "",
        `Your 30-minute intro call is booked: ${prettyWhen}.`,
        "The attached invite adds it to your calendar with reminders.",
        "I'll reply with a video link before the call.",
        "",
        "Need to move it? Just reply to this email.",
        "",
        "— Micah",
      ].join("\n"),
      attachments: [attachment],
    });
    if (r1.error) {
      console.error("[book-call] booker send failed", r1.error);
      return {
        ok: false,
        error: `Could not send the confirmation — email ${OWNER} instead.`,
      };
    }
    // Owner: notification + same invite (same UID) for his calendar.
    const r2 = await resend.emails.send({
      from: `Micah Jones <${OWNER}>`,
      to: OWNER,
      replyTo: email,
      subject: `Booked: ${name} — ${prettyWhen}`,
      text: [
        `New intro call booked via /book.`,
        "",
        `Who:  ${name} <${email}>`,
        `When: ${prettyWhen} (30 min)`,
        note ? `Note: ${note}` : "Note: (none)",
        "",
        "Invite attached — add it and send them a video link.",
      ].join("\n"),
      attachments: [attachment],
    });
    if (r2.error) console.error("[book-call] owner send failed", r2.error);
  } catch (err) {
    console.error("[book-call] unexpected error", err);
    return {
      ok: false,
      error: `Could not send the confirmation — email ${OWNER} instead.`,
    };
  }

  return { ok: true };
}
