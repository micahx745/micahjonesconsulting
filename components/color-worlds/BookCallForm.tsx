// components/color-worlds/BookCallForm.tsx
//
// The /book form (Pass-18). Simple by operator spec: name, email, a
// date limited to Tue–Thu, a 30-minute Pacific slot, optional note.
// Server action re-validates everything and sends both calendar
// invites. Conflicts are resolved manually by the operator for now;
// calendar-source sync is the planned follow-up.
"use client";

import { useMemo, useState } from "react";
import { submitBooking } from "@/app/actions/book-call";

const SLOTS = Array.from({ length: 12 }, (_, i) => {
  const minutes = 10 * 60 + i * 30;
  const h24 = Math.floor(minutes / 60);
  const m = String(minutes % 60).padStart(2, "0");
  const h12 = h24 > 12 ? h24 - 12 : h24;
  const ap = h24 >= 12 ? "pm" : "am";
  return {
    value: `${String(h24).padStart(2, "0")}:${m}`,
    label: `${h12}:${m} ${ap}`,
  };
});

function toDateInputValue(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function BookCallForm() {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [dayWarn, setDayWarn] = useState(false);

  const { min, max } = useMemo(() => {
    const t = new Date();
    const minD = new Date(t.getTime() + 86400_000);
    const maxD = new Date(t.getTime() + 60 * 86400_000);
    return { min: toDateInputValue(minD), max: toDateInputValue(maxD) };
  }, []);

  function onDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    if (!v) return setDayWarn(false);
    // Client-side hint only — the action re-validates in Pacific time.
    const day = new Date(`${v}T19:00:00Z`).getUTCDay();
    setDayWarn(![2, 3, 4].includes(day));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "busy") return;
    const f = new FormData(e.currentTarget);
    setState("busy");
    setError("");
    const res = await submitBooking({
      name: String(f.get("name") ?? ""),
      email: String(f.get("email") ?? ""),
      date: String(f.get("date") ?? ""),
      time: String(f.get("time") ?? ""),
      note: String(f.get("note") ?? ""),
    });
    if (res.ok) setState("done");
    else {
      setState("error");
      setError(res.error ?? "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div className="cw-book__done" aria-live="polite">
        <p className="cw-book__donehead">Booked.</p>
        <p>
          The calendar invite is in your inbox — reminders included. I&rsquo;ll
          reply with a video link before the call.
        </p>
      </div>
    );
  }

  return (
    <form className="cw-book" onSubmit={onSubmit} noValidate>
      <div className="cw-book__row">
        <label className="cw-book__field">
          <span className="cw-book__lbl">Name</span>
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label className="cw-book__field">
          <span className="cw-book__lbl">Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <div className="cw-book__row">
        <label className="cw-book__field">
          <span className="cw-book__lbl">Date (Tue–Thu)</span>
          <input
            name="date"
            type="date"
            required
            min={min}
            max={max}
            onChange={onDateChange}
          />
        </label>
        <label className="cw-book__field">
          <span className="cw-book__lbl">Time (Pacific)</span>
          <select name="time" required defaultValue="">
            <option value="" disabled>
              Pick a slot
            </option>
            {SLOTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {dayWarn && (
        <p className="cw-book__warn" aria-live="polite">
          Calls run Tuesday through Thursday — pick one of those days.
        </p>
      )}
      <label className="cw-book__field">
        <span className="cw-book__lbl">
          What should we talk about? (optional)
        </span>
        <textarea name="note" rows={3} maxLength={1000} />
      </label>
      <button
        type="submit"
        className="cw-book__btn"
        disabled={state === "busy"}
      >
        {state === "busy" ? "Booking…" : "Book the call →"}
      </button>
      {state === "error" && (
        <p className="cw-book__warn" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
