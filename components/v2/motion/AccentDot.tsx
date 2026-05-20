// v2 AccentDot — small champagne-colored precision mark that lags slightly
// behind the pointer. Active in the hero section only. Disabled on touch
// devices. Springs to the pointer with lerp ~0.15 via useSpring damping/stiffness.
//
// NOT a "cursor follower" personality element (those are banned by the
// design system per blueprint §13). This is a 6px precision specimen mark
// in the brand accent — it draws the eye through the page subtly, then
// disappears when the visitor stops engaging with the hero.
"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";

export function AccentDot() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const sy = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });
  const [visible, setVisible] = useState(false);
  const [pointerFine, setPointerFine] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const mql = window.matchMedia("(pointer: fine)");
    setPointerFine(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setPointerFine(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [reduced]);

  useEffect(() => {
    if (!pointerFine || reduced) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [pointerFine, reduced, x, y]);

  if (reduced || !pointerFine) return null;

  return (
    <motion.span
      aria-hidden
      className="v2-accent-dot"
      style={{
        left: sx,
        top: sy,
        opacity: visible ? 1 : 0,
        transition: "opacity 200ms cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    />
  );
}
