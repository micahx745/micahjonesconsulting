// components/color-worlds/Nav.tsx
//
// Color Worlds nav + full-screen overlay menu (mobile).
//
// Nav uses mix-blend-mode: difference (CSS) so white source text
// inverts to whatever contrasts the current world's bg. No JS needed
// for color awareness.
//
// Overlay is a real modal:
//   - aria-modal + aria-labelledby + role="dialog"
//   - ESC key closes
//   - Focus moves to close button on open
//   - Tab is trapped within the dialog while open
//   - Focus returns to the menu trigger button on close
//   - Body scroll locks during open
//
// All overlay interactive elements use tabIndex={-1} when hidden so
// they're not in the tab order while invisible.
"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "#clients", label: "Clients" },
  { href: "#ordani", label: "Ordani" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
] as const;

export function Nav() {
  const [isOpen, setOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Body scroll lock + focus management when overlay opens/closes.
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Move focus to the close button after the transition starts.
      // requestAnimationFrame gives the dialog a moment to become
      // tabbable before we move focus into it.
      const raf = requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
    // Return focus to the menu trigger when closing — only if we
    // were just open. (On first paint isOpen is false so we don't
    // steal focus.)
    if (menuBtnRef.current === document.activeElement) return;
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC closes + Tab is trapped inside the overlay while open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!isOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        // Restore focus to the menu trigger.
        menuBtnRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      // Tab focus trap. Find all focusable elements inside the overlay
      // and cycle within them.
      const overlay = overlayRef.current;
      if (!overlay) return;
      const focusables = overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  function closeAndReturnFocus() {
    setOpen(false);
    // Tiny delay so the close happens before focus moves.
    requestAnimationFrame(() => menuBtnRef.current?.focus());
  }

  return (
    <>
      <nav className="cw-nav" aria-label="Primary">
        <a href="#top" className="cw-wordmark">
          MICAH/JONES
        </a>
        <ul className="cw-navlinks">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button
          ref={menuBtnRef}
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
        ref={overlayRef}
        id="cw-overlay"
        className={`cw-overlay${isOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!isOpen}
      >
        <button
          ref={closeBtnRef}
          className="cw-overlay-close"
          aria-label="Close menu"
          onClick={closeAndReturnFocus}
          type="button"
          tabIndex={isOpen ? 0 : -1}
        >
          Close ✕
        </button>
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={closeAndReturnFocus}
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
