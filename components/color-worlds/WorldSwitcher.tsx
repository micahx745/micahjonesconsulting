// components/color-worlds/WorldSwitcher.tsx
//
// The signature interaction of the entire site.
//
// Each section on the home page carries data-world="tangerine|cream|cobalt|ink".
// As a section crosses the vertical center of the viewport, this component
// reads the world name, looks up the bg/fg/accent triple, and writes them
// to the [data-mode="cw"] ancestor element. CSS transitions (0.7s ease-out)
// then handle the cross-fade.
//
// Hard rules from the build brief (both real bugs the user hit before):
//   1. Use IntersectionObserver with rootMargin: '-50% 0px -50% 0px'.
//      Do NOT use threshold: 0.5 — sections taller than the viewport
//      never fire it on mobile.
//   2. The world fires when the section CROSSES viewport center, not
//      when it's "mostly visible."
//
// The observer is set up once on mount. We don't depend on React state
// for the world value — that would cause unnecessary re-renders. We just
// mutate CSS vars directly.
"use client";

import { useEffect } from "react";

type WorldName = "terracotta" | "bone" | "petrol" | "espresso";

interface World {
  bg: string;
  fg: string;
  accent: string;
}

// World map — "Terracotta Workshop" palette (current).
//   terracotta → hero / service marquee / footer
//   bone       → clients
//   petrol     → ordani
//   espresso   → products / companies marquee
//
// Hex values match globals.css --color-cw-* tokens. Darkened terracotta
// #9E3C25 clears AA against bone (~4.6:1). Espresso accent on terracotta
// is the rolling-word color — passes AA-large at the display sizes used.
const WORLDS: Record<WorldName, World> = {
  terracotta: { bg: "#9E3C25", fg: "#ECE3D0", accent: "#2A1F18" },
  bone: { bg: "#ECE3D0", fg: "#2A1F18", accent: "#9E3C25" },
  petrol: { bg: "#1A4548", fg: "#ECE3D0", accent: "#C9982F" },
  espresso: { bg: "#2A1F18", fg: "#ECE3D0", accent: "#9E3C25" },
};

function resolveWorld(s: string | null): WorldName | null {
  if (s === null) return null;
  return s in WORLDS ? (s as WorldName) : null;
}

export function WorldSwitcher() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.querySelector<HTMLElement>('[data-mode="cw"]');
    if (!root) return;

    function setWorld(name: WorldName) {
      const w = WORLDS[name];
      root!.style.setProperty("--cw-bg", w.bg);
      root!.style.setProperty("--cw-fg", w.fg);
      root!.style.setProperty("--cw-accent", w.accent);
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-world]"),
    );

    // Initial world — find the section currently closest to viewport
    // center and apply its world IMMEDIATELY, before the observer fires.
    // Without this, a hard refresh deep into the page leaves the bg as
    // the CSS default (terracotta) until the user scrolls — the exact
    // class of contrast-failure-on-deeplink bug the review flagged.
    const center = window.innerHeight / 2;
    let closest: HTMLElement | null = null;
    let closestDist = Infinity;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      // Skip sections fully out of viewport.
      if (r.bottom < 0 || r.top > window.innerHeight) continue;
      const sectionCenter = r.top + r.height / 2;
      const dist = Math.abs(sectionCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = s;
      }
    }
    if (closest) {
      const initial = resolveWorld(closest.getAttribute("data-world"));
      if (initial !== null) setWorld(initial);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const name = resolveWorld(
            (entry.target as HTMLElement).getAttribute("data-world"),
          );
          if (name !== null) setWorld(name);
        });
      },
      {
        // Section is "active" when it crosses viewport center.
        // -50%/-50% shrinks the root margin to a horizontal slice at
        // viewport center; threshold 0 fires on any pixel of overlap.
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return null;
}
