// components/room/Bar.tsx — section 00, the bar.
//
// Pass-101 phase 2. Ported from
// .planning/design/winning/room-and-ledger.template.html (the <nav class="bar">).
//
// It is fixed, it starts at opacity 0 above 900px, and RoomMotion turns it on
// ONCE at the seam (§16.3-2: "slides down 12px + fades in at the seam (240ms),
// never again"). Below 900px and under reduced motion the CSS pins it open, so
// a page with no JavaScript still has its navigation.
//
// The five labels are the template's own, and the fourth carries the live
// entry price. The links are internal routes here; the mock pointed them at
// the live domain because it had no routes of its own (§15.7).
import Link from "next/link";

export function Bar() {
  return (
    <nav className="bar" id="bar" aria-label="Site">
      <a className="l now" href="#room">
        Micah Jones
      </a>
      <a className="l hide-s" href="#proof">
        Record
      </a>
      <a className="l hide-s" href="#manual">
        Playbook
      </a>
      <a className="l" href="#price">
        Packages from $500
      </a>
      <Link className="l hide-s" href="/call">
        Name the problem{" "}
        <span className="ar" aria-hidden="true">
          &#8594;
        </span>
      </Link>
    </nav>
  );
}
