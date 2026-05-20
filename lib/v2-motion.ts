// lib/v2-motion.ts
//
// v2 (dark-mode luxury) Motion variants + ease curves.
// Per spec §4 timing canon — derived from Emil Kowalski's "Great Animations":
//   - UI hover/focus: 150-250ms, EASE_OUT_EMIL (strong ease-out)
//   - Modals/drawers: 200-300ms, EASE_DRAWER (iOS-curve)
//   - Scroll-into-view reveals: 500-700ms, EASE_OUT_STRONG, y 16-24px
//   - Stagger children: 60-100ms between
//   - Exit animations: 20% faster than entrance
//   - NEVER ease-in for UI
import type { Variants } from "motion/react";

export const EASE_OUT_STRONG = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_EMIL = [0.23, 1, 0.32, 1] as const;
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_STRONG },
  },
};

export const fadeUpStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const hairlineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE_OUT_STRONG },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_STRONG },
  },
};

export const wordRevealStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};
