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

// Pass-26 (operator cowork review): hrefs are root-relative ("/#x",
// not "#x"). This nav renders on every (foyer) page — on /services
// a bare "#clients" just mutated the URL hash on a page with no such
// id, stranding the visitor. From home, "/#x" is still a same-
// document fragment scroll (path unchanged); from subpages it
// navigates home first.
//
// W1 (D11, operator-locked 2026-08-11): WORK now points at the real
// /work index (it previously anchored to /#products — a dead end from
// subpages), and SERVICES earns the fifth slot. /about, /hire-me,
// /playbook stay inline-reachable by design (curation posture).
const NAV_LINKS = [
  { href: "/#clients", label: "Clients" },
  { href: "/#ordani", label: "Ordani" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/#contact", label: "Contact" },
] as const;

export function Nav() {
  const [isOpen, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrolledRef = useRef(false);

  // is-scrolled state (P1-8, review): the fixed nav's mix-blend-mode:
  // difference overprints content low on long pages (verified: the
  // wordmark over the footer credits line). Past ~90% of the first
  // viewport, swap the blend trick for a solid chip so the wordmark
  // never blends against arbitrary page content again. This is a
  // legibility fix, not decoration — it runs (and applies) the same
  // whether or not the user has reduced motion; only the CSS transition
  // that eases the swap is gated off under reduced motion (globals.css).
  // rAF-batched like the other scroll/pointer handlers in Hero.tsx;
  // state is only set on an actual threshold crossing so this doesn't
  // re-render on every scroll pixel.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    let pending = false;

    function apply() {
      // Threshold was innerHeight * 0.9 — calibrated to the home page, where
      // a full-bleed hero fills the first viewport. On short-hero routes
      // (/hire-me, /playbook, /work) body copy reaches the fixed nav well
      // before that, so the transparent state overprinted text — the exact
      // collision P1-8 was meant to end. A small constant gives every route
      // the chip as soon as anything scrolls under the nav, while keeping the
      // transparent treatment at rest on the hero.
      const next = window.scrollY > 40;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setIsScrolled(next);
      }
      pending = false;
    }
    function onScroll() {
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(apply);
      }
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Body scroll lock + focus management + inert sibling content on
  // open. Without `inert` on the rest of the document, AT virtual
  // cursors (NVDA browse mode, JAWS) can arrow-navigate INTO the
  // siblings behind aria-modal=true. inert makes the modal-ness real.
  useEffect(() => {
    if (typeof document === "undefined") return;

    const main = document.getElementById("main-content");
    const siteNav = document.querySelector<HTMLElement>("nav.cw-nav");

    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (main) main.inert = true;
      if (siteNav) siteNav.inert = true;
      const raf = requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = "";
        if (main) main.inert = false;
        if (siteNav) siteNav.inert = false;
      };
    }

    document.body.style.overflow = "";
    if (main) main.inert = false;
    if (siteNav) siteNav.inert = false;
    return () => {
      document.body.style.overflow = "";
      if (main) main.inert = false;
      if (siteNav) siteNav.inert = false;
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
      <nav
        className={`cw-nav${isScrolled ? " is-scrolled" : ""}`}
        aria-label="Primary"
      >
        <a href="/#top" className="cw-wordmark">
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
          Micah Jones — Independent operator — Oakland, CA
        </div>
      </div>
    </>
  );
}
