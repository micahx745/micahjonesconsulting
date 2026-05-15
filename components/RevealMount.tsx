// components/RevealMount.tsx
//
// Tier H — Section scroll-reveal mechanism.
//
// Mount-once client component that registers a single IntersectionObserver
// for every element on the page with both [data-reveal] and the
// .scroll-reveal class. Adds .scroll-reveal--shown when the element
// enters the viewport. CSS in globals.css does the actual fade-up
// animation.
//
// Re-runs on every pathname change so route-group navigation
// (foyer↔theater) re-observes the new page's elements.
//
// Reduced-motion users skip the animation: the .scroll-reveal--shown
// class is applied immediately to all observed elements, so the
// transition target state is the visible state with no movement.
//
// Why a global observer rather than per-section client components:
//   1. Zero React tree changes — sections stay server-rendered.
//   2. Single observer instance, observed elements get unobserved on
//      first reveal (one-shot). Cost is one observer + N unobserves.
//   3. No extra <div> wrappers polluting the layout.
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealMount() {
  const pathname = usePathname();

  useEffect(() => {
    // Stamp body so CSS knows JS is alive. Without this class, scroll-
    // reveal elements default to visible (progressive enhancement).
    document.body.classList.add("js-reveal-ready");

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("scroll-reveal--shown"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-reveal--shown");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    // Reveal anything already in initial viewport on mount.
    const viewportH = window.innerHeight;
    document
      .querySelectorAll<HTMLElement>(
        "[data-reveal]:not(.scroll-reveal--shown)",
      )
      .forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportH * 0.9) {
          el.classList.add("scroll-reveal--shown");
        } else {
          observer.observe(el);
        }
      });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
