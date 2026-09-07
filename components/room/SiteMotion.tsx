// components/room/SiteMotion.tsx
//
// PASS-101 PHASE 3 — the whole motion engine for the pages that are not the
// home. Written as RoomMotion.tsx; renamed at integration, because phase 2's
// home has its own component of that name and this one is the sibling of
// SiteBar and SiteFoot. Nothing else changed: it still observes only
// `#rl-root [data-rl]`, which the home never renders. WINNING-BRIEF-2026-09-05 §16.3, items 2, 3, 4, 5 (item 7 is hover and
// focus, which is pure CSS in app/room-and-ledger.css and needs nothing here).
//
// Operator, 2026-09-06, verbatim: "Lack of animations and weak ones that
// exist. FYI I love website animations need more". §16.3 widens the corpus's
// one-moment discipline on his ruling and names the vocabulary that stays:
// transform / opacity / clip-path, the house curve, nothing coupled to the
// pointer, no scroll-jack, no parallax, everything once, and every rest state
// the finished frame.
//
// ONE IntersectionObserver for the whole page. It adds `.rl-in` and then
// unobserves, so nothing ever runs twice and nothing reverses on the way back
// up. There is no scroll listener, no rAF loop, no GSAP (the quarantine in
// .claude/CLAUDE.md holds: gsap is imported by components/TitleCard.tsx and
// nowhere else) and no @keyframes.
//
// WHY THE PRE-STATE IS A CLASS ON <html> AND NOT A REACT STATE.
//   The CSS default IS the finished frame. If the pre-state shipped in the
//   markup, a visitor with scripting off would get a page of invisible
//   sections. If it were applied on mount, everything would paint, jump back
//   and animate in — a flash of finished content. So the layout's boot script
//   sets `html.rl-js` synchronously during parse, BEFORE the first paint, and
//   only when the visitor has not asked for reduced motion. Under reduced
//   motion the class is never set, the pre-states are never matched, and the
//   page is simply there.
"use client";

import { useEffect } from "react";

// The reading line. §16.3-3 fires a head "as it crosses the reading line";
// this bottom inset is what makes an element count as crossed once its top
// edge is ~12% of the viewport above the fold.
const ROOT_MARGIN = "0px 0px -12% 0px";

export function SiteMotion() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("rl-js")) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("#rl-root [data-rl]"),
    );
    if (targets.length === 0) return;

    // The stagger index. §16.3-4 stages hairlines 60ms apart WITHIN a section
    // and §16.3-5 stages cards 70ms apart; both are "within a section", so the
    // index is the element's position among its own siblings of the same kind
    // rather than a page-wide counter. A page-wide counter would put the last
    // row of a long ledger seconds behind the first.
    const seen = new Map<string, number>();
    for (const el of targets) {
      const kind = el.dataset.rl ?? "";
      const parent = el.parentElement;
      if (!parent) continue;
      const key = `${kind}::${parent.dataset.rlGroup ?? ""}::${
        parent.tagName
      }::${Array.prototype.indexOf.call(
        parent.parentElement?.children ?? [],
        parent,
      )}`;
      const i = seen.get(key) ?? 0;
      seen.set(key, i + 1);
      // capped: past the sixth item a stagger reads as a delay, not a rhythm.
      el.style.setProperty("--i", String(Math.min(i, 5)));
    }

    if (typeof IntersectionObserver === "undefined") {
      // No observer (very old engine, or a crawler): show everything at once
      // rather than leaving the page in its pre-state.
      for (const el of targets) el.classList.add("rl-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("rl-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    );
    for (const el of targets) io.observe(el);

    // §16.3-2: the bar, once, on load. It is fixed, so it never enters a
    // viewport and cannot be observed like the rest.
    const bar = document.getElementById("rl-bar");
    const raf = requestAnimationFrame(() => bar?.classList.add("rl-in"));

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
