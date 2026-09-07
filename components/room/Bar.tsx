// components/room/Bar.tsx — section 00, the bar.
//
// Pass-101 phase 2, recomposed by §18.
//
// It is fixed, it starts at opacity 0 above 900px, and RoomMotion turns it on
// ONCE at the seam (§16.3-2: "slides down 12px + fades in at the seam
// (240ms), never again"). Below 900px and under reduced motion the CSS pins it
// open, so a page with no JavaScript still has its navigation.
//
// §18: "1440: identity and the ask in auto tracks, the three middle labels
// centred in a 1fr track. 390: the CTA returns to the bar as a compact pill
// (`Name the problem →`, 12px label, 32px tall, 1px copper border, radius 999)
// and `Packages from $500` is the label that hides; bar 52px."
//
// So the three middle labels move into their own track — space-between across
// five items put `Playbook` and `Packages from $500` at arbitrary stops — and
// the hide order inverts on the phone: the ask is the one thing that must
// survive, so the price label is what leaves.
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
      <div className="mid">
        <a className="l hide-s" href="#proof">
          Record
        </a>
        <a className="l hide-s" href="#manual">
          Playbook
        </a>
        <a className="l hide-s" href="#price">
          Packages from $500
        </a>
      </div>
      <Link className="l cta" href="/call">
        Name the problem{" "}
        <span className="ar" aria-hidden="true">
          &#8594;
        </span>
      </Link>
    </nav>
  );
}
