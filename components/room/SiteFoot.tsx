// components/room/SiteFoot.tsx
//
// PASS-101, §18 follow-up. This used to be a SECOND foot: espresso, one thin
// flex row, and — unlike the home's — a LinkedIn link and "© 2013–2026 Micah
// Jones". Two chrome languages across one site, and §18's foot ruling names
// the copyright range as a device that goes ("No copyright range (no years).")
//
// There is one foot now. This file is the (room) group's call into it: the
// same three columns, on the .rl- class names this group's stylesheet uses,
// and carrying the reply promise, which on these pages has no copper ask to
// move to. See components/room/Foot.tsx for the ruling and the two departures
// recorded against it.
import { Foot } from "@/components/room/Foot";

export function SiteFoot() {
  return <Foot className="rl-foot" chipClass="rl-chip" promise />;
}
