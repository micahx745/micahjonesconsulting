// components/room/SiteBar.tsx
//
// PASS-101 PHASE 3 — the Room and Ledger bar, on every route that is not the
// home (WINNING-BRIEF-2026-09-05 §4 "00", template lines 129-148 and 799-805).
//
// Five items in the ONE label style, justified edge to edge. No logo-left /
// menu-right cluster, no blur, no glass, no blend mode, and no overlay menu:
// the bar drops to three items below 900px and that is the whole phone design.
// The template's own five strings, mapped to the live routes they name:
//
//   Micah Jones ......... /
//   Record .............. /work
//   Playbook ............ /playbook
//   Packages from $500 .. /packages   ($500 is the live Unstick Session price)
//   Name the problem → .. /call
//
// The home's bar hides until the first screen is gone, because it would
// otherwise sit on the film. There is no film here, so the bar is simply open.
// Its one motion is §16.3-2 — it slides down 12px and fades in once, on load —
// carried by CSS gated on html.rl-js, so with scripting off or reduced motion
// on it is just there.
//
// Client Component only so it can mark its own item with aria-current. It
// holds no state and mounts no listener.
"use client";

import { usePathname } from "next/navigation";

const ITEMS: {
  href: string;
  label: string;
  arrow?: boolean;
  hideOnPhone?: boolean;
}[] = [
  { href: "/", label: "Micah Jones" },
  { href: "/work", label: "Record", hideOnPhone: true },
  { href: "/playbook", label: "Playbook", hideOnPhone: true },
  { href: "/packages", label: "Packages from $500" },
  { href: "/call", label: "Name the problem", arrow: true },
];

export function SiteBar({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      className={`rl-bar${dark ? " dark" : ""}`}
      id="rl-bar"
      aria-label="Site"
    >
      {ITEMS.map((item) => {
        // /work must not light up on /work/guardicore's sibling routes only by
        // accident: an exact match for the index, a prefix match for the
        // case studies under it.
        const isCurrent =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <a
            key={item.href}
            href={item.href}
            className={item.hideOnPhone ? "hide-s" : undefined}
            aria-current={isCurrent ? "page" : undefined}
          >
            <span
              className={`rl-l${isCurrent || item.href === "/" ? " now" : ""}`}
            >
              {item.label}
              {item.arrow ? (
                <span className="ar" aria-hidden>
                  &#8594;
                </span>
              ) : null}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
