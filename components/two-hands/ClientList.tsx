// components/two-hands/ClientList.tsx
//
// THE signature interaction for the entire Two Hands site.
// Per the research brief: "Pick one signature motion move. Execute it with
// spring physics, not timing curves. Use it consistently across the whole
// site." This is that move.
//
// Pattern source: Dennis Snellenberg's project-list + Olivier Larose's
// open-source rebuild tutorial. Numbered editorial list of client projects;
// on hover, a small "image plate" follows the cursor with spring physics
// (useSpring from motion v12, formerly Framer Motion).
//
// Motion doctrine (Emil Kowalski):
//   - Spring physics over duration-based easing.
//   - Light but present mass; damping just shy of critical.
//   - Tuned by feel, not by formula.
//
// The follower is fixed-positioned in the viewport (not absolute inside
// the list) so it tracks cursor smoothly regardless of list scroll.
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { ViewTransitionLink } from "@/components/view-transition-link";

export interface ClientListItem {
  /** URL to the case study. */
  href: string;
  /** One-word branded handle. Eddie Opara move — the IDEA of the work as the title. */
  handle: string;
  /** Long-form title (used in <title> attribute + meta line, not in row). */
  title: string;
  /** Sector / category — one phrase. */
  sector: string;
  /** Year or year-range. */
  year: string;
}

interface ClientListProps {
  items: ClientListItem[];
}

// Spring config — Emil's "tuned by feel" canon.
// Mass slightly above 1 so the follower has perceptible weight; damping
// just below critical so it lands without bounce; stiffness in the
// "fast but tactile" zone (300-400 range).
const SPRING = { mass: 0.6, damping: 30, stiffness: 280 };
// Offset from cursor — places the plate down-right of the pointer so it
// doesn't obscure the row text the user is reading.
const OFFSET_X = 24;
const OFFSET_Y = 24;

export function ClientList({ items }: ClientListProps) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Two springs — one for x, one for y. Initialized off-screen so first
  // pointer-move snap doesn't draw a line from origin.
  const x = useSpring(-9999, SPRING);
  const y = useSpring(-9999, SPRING);

  // Slight rotation on the follower based on cursor velocity. Subtle — the
  // brief says ONE signature move; rotation is a flavor of the same move.
  const rotate = useTransform(x, [-100, 0, 100], [-2, 0, 2]);

  // Tracks reduced-motion preference. If reduced, snap (no spring) and
  // never rotate. We can't conditionally call useSpring, so we mount it
  // either way and route the offset through it; reduced-motion users just
  // get the visibility toggle without animation feel.
  const reducedRef = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const list = listRef.current;
    if (!list) return;

    function onMove(e: PointerEvent) {
      // Follower is fixed-positioned, so we use clientX/clientY directly.
      const nx = e.clientX + OFFSET_X;
      const ny = e.clientY + OFFSET_Y;
      if (reducedRef.current) {
        x.jump(nx);
        y.jump(ny);
      } else {
        x.set(nx);
        y.set(ny);
      }
    }

    list.addEventListener("pointermove", onMove);
    return () => list.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <>
      <ul
        ref={listRef}
        className="th-client-list"
        onPointerLeave={() => setActiveIndex(null)}
      >
        {items.map((item, i) => (
          <li
            key={item.href}
            className="th-client-row"
            onPointerEnter={() => setActiveIndex(i)}
          >
            <ViewTransitionLink
              href={item.href}
              className="th-client-row__index"
              aria-label={item.title}
            >
              {String(i + 1).padStart(2, "0")}
            </ViewTransitionLink>
            <ViewTransitionLink
              href={item.href}
              className="th-client-row__title"
            >
              <em>{item.handle}</em>
            </ViewTransitionLink>
            <span className="th-client-row__meta">
              {item.sector} · {item.year}
            </span>
          </li>
        ))}
      </ul>

      {/* The cursor follower. Fixed-positioned, motion-driven. Hidden until
          a row is hovered; visibility toggles via data attribute so CSS
          handles the fade. */}
      <motion.div
        className="th-client-follower"
        data-visible={activeIndex !== null}
        style={{ x, y, rotate }}
        aria-hidden
      >
        <div className="th-client-follower__inner">
          {activeIndex !== null ? (items[activeIndex]?.handle ?? "") : ""}
        </div>
      </motion.div>
    </>
  );
}
