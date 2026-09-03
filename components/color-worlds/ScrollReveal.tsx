// components/color-worlds/ScrollReveal.tsx
//
// Observes every .cw-reveal element on the page and adds .is-in when
// it crosses 18% visible (matches the mockup). One observer for the
// whole page rather than one per element. Idempotent — already-revealed
// elements are skipped via the observer's own logic.
"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Progressive enhancement — tag the root so CSS can hide reveals.
    // Without this class, .cw-reveal stays visible (so no-JS / fullPage
    // screenshots show content).
    const root = document.querySelector<HTMLElement>('[data-mode="cw"]');
    root?.classList.add("cw-js-reveals");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    document.querySelectorAll<HTMLElement>(".cw-reveal").forEach((el) => {
      // Anything already in the viewport at mount counts as "in" — so
      // a hard refresh in mid-page doesn't leave the hero section hidden.
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.82 && rect.bottom > 0;
      if (inView) el.classList.add("is-in");
      else observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
