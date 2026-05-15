// components/CaseStudyReadTracker.tsx
//
// Phase 10 — ANALY-02. Fires `case_study_read_complete` once per session
// when scroll-depth on a /work/* route reaches 90%.
//
// Why this is a separate client component (not folded into the page):
//   - Page is a Server Component (`(theater)/work/[slug]/page.tsx`).
//   - Read tracking requires a window-scroll listener — only on the client.
//   - Keeping the tracker isolated means the page can stay RSC + the GSAP
//     TitleCard is the only other client island.
//
// Dedupe: sessionStorage key `csrc:<slug>`. Set to "1" the first time the
// threshold trips; subsequent threshold trips in the same session no-op.
//
// Reduced-motion is irrelevant to this tracker (no animation). The 90%
// threshold is independent of Lenis smoothing (Lenis still reports
// scrollY honestly).
//
// Source: REQUIREMENTS.md ANALY-02; @vercel/analytics track() docs.
"use client";

import { useEffect } from "react";
import { trackCaseStudyReadComplete } from "@/lib/analytics";

const THRESHOLD = 0.9; // 90%

export function CaseStudyReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const storageKey = `csrc:${slug}`;

    // Already fired in this session — no-op.
    try {
      if (sessionStorage.getItem(storageKey) === "1") return;
    } catch {
      // sessionStorage may be unavailable (private browsing, embedded contexts).
      // In that case we still want to fire the event — just not dedupe.
    }

    let fired = false;

    const onScroll = () => {
      if (fired) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total <= 0) return;
      const depth = scrolled / total;
      if (depth >= THRESHOLD) {
        fired = true;
        try {
          sessionStorage.setItem(storageKey, "1");
        } catch {
          // ignore
        }
        trackCaseStudyReadComplete(slug);
        window.removeEventListener("scroll", onScroll);
      }
    };

    // Passive for perf — we never call preventDefault.
    window.addEventListener("scroll", onScroll, { passive: true });
    // Fire once immediately in case the page is shorter than the viewport
    // (90% already true on mount).
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [slug]);

  // No visual output.
  return null;
}
