// components/color-worlds/Nav.tsx
//
// Color Worlds nav + full-screen overlay menu (mobile).
//
// Nav uses mix-blend-mode: difference (CSS) so the white source text
// inverts to whatever contrasts the current world's bg. No JS needed
// for color awareness.
//
// Anchor clicks: on mobile, close the overlay; on desktop, native scroll
// (Lenis intercepts and smooths it).
"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#clients", label: "Clients" },
  { href: "#ordani", label: "Ordani" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
] as const;

export function Nav() {
  const [isOpen, setOpen] = useState(false);

  // Lock body scroll when overlay is open. Lenis honors overflow:hidden
  // on the html/body — and this is also the right pattern even without it.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="cw-nav" aria-label="Primary">
        <a href="#top" className="cw-wordmark">
          MICAH/JONES
        </a>
        <ul className="cw-navlinks">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="cw-menubtn"
          aria-label="Open menu"
          aria-expanded={isOpen}
          aria-controls="cw-overlay"
          onClick={() => setOpen(true)}
          type="button"
        >
          Menu —
        </button>
      </nav>

      <div
        id="cw-overlay"
        className={`cw-overlay${isOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!isOpen}
      >
        <button
          className="cw-overlay-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          type="button"
          tabIndex={isOpen ? 0 : -1}
        >
          Close ✕
        </button>
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            tabIndex={isOpen ? 0 : -1}
          >
            {l.label}
          </a>
        ))}
        <div className="cw-overlay-meta">
          Micah Jones — Independent builder — Oakland, CA
        </div>
      </div>
    </>
  );
}
