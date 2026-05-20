// v2 Nav — sticky top nav with hide-on-scroll-down / reveal-on-scroll-up.
// Wordmark left, three text links + BookCallPill right.
// Mobile: hamburger -> full-screen overlay.
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { BookCallPill } from "./BookCallPill";

const LINKS = [
  { href: "/v2/work/ordani", label: "Work" },
  { href: "/v2/about", label: "About" },
  { href: "/v2/contact", label: "Contact" },
] as const;

export function V2Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 200 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Close menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.nav
        className="v2-nav"
        aria-label="Primary"
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/v2" className="v2-nav__wordmark">
          Micah Jones
        </Link>

        <div className="v2-nav__desktop-links">
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="v2-nav__link">
              {label}
            </Link>
          ))}
          <BookCallPill />
        </div>

        <button
          type="button"
          className="v2-nav__hamburger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span aria-hidden>menu</span>
        </button>
      </motion.nav>

      {open && (
        <div className="v2-nav-overlay" role="dialog" aria-modal>
          <button
            type="button"
            className="v2-nav-overlay__close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            close
          </button>
          <ul className="v2-nav-overlay__links">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="v2-nav-overlay__link"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <BookCallPill />
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
