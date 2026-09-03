// lib/motion/tokens.ts
//
// Motion design system — every animation in the codebase MUST resolve
// to a value here. Per the research brief:
//   "Frontier thinking LLMs can follow ~150-200 instructions with
//    reasonable consistency… CLAUDE.md is for onboarding Claude into
//    your codebase. It should define your project's WHY, WHAT, and HOW."
//
// Named tokens beat inline magic numbers because (a) they create
// vocabulary shared across files, (b) they make CLAUDE.md actionable,
// and (c) they make refactoring "all the snappy taps" a one-line edit.
//
// Anti-patterns this file forbids (do not introduce):
//   - `{ opacity: 0, y: 20 } → { opacity: 1, y: 0 }, duration: 0.3`
//     (the AI-default sample — boring, no stagger, no spring)
//   - animating `height`, `width`, `top`, `left`, `margin`, `padding`
//     (any of these triggers paint/layout; use `transform` + `opacity`)
//   - `ease-in-out` for entrances (makes UI feel sluggish)
//   - microinteractions slower than 200ms (feels broken on rapid input)

// ============================================================
// DURATIONS — milliseconds. Convert to seconds in Motion (/ 1000).
// ============================================================
export const DURATION = {
  /** Synchronous state change — focus ring, selection highlight. */
  instant: 0,
  /** Keyboard-triggered. Must feel free — Cmd-K, Esc, focus moves. */
  micro: 120,
  /** Hover, tap, small toggle. */
  fast: 180,
  /** Default for most UI transitions. */
  base: 240,
  /** Modal, drawer, page section reveal. */
  slow: 360,
  /** Hero reveal, storytelling beat. */
  scene: 600,
  /** Infinite-scroll marquee loop. */
  marquee: 30000,
} as const;

// ============================================================
// EASINGS — cubic-bezier arrays (Motion-compatible).
//
// Use ease-out for entrances; it starts fast and settles. Per
// Kowalski's "Easing Blueprint": "gives the impression of a quick
// response." Use ease-in for exits — content leaving doesn't fight
// for attention. Use ease-in-out for transforms that stay on screen
// (modals, drawers). Never use ease-in for entrances.
// ============================================================
export const EASE = {
  /** Default entrance. ease-out-expo. */
  out: [0.16, 1, 0.3, 1] as const,
  /** Softer ease-out for large moves. */
  outQuart: [0.165, 0.84, 0.44, 1] as const,
  /** Slight overshoot — playful CTAs. */
  outBack: [0.34, 1.56, 0.64, 1] as const,
  /** Default exit. ease-in-quart. */
  in: [0.7, 0, 0.84, 0] as const,
  /** Stays-on-screen transforms. ease-in-out-quart. */
  inOut: [0.77, 0, 0.175, 1] as const,
  /** Marquees, progress bars, timer UI only. */
  linear: [0, 0, 1, 1] as const,
} as const;

// ============================================================
// SPRINGS — Motion `useSpring` config presets.
//
// Prefer springs for any stateful UI (toggles, drag, sheets). They
// feel "natural, almost like a living organism" (Kowalski).
// ============================================================
export const SPRING = {
  /** Buttons, toggles, tap. */
  snappy: { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.6 },
  /** Drawers, sheets, modal content. */
  smooth: { type: "spring" as const, stiffness: 220, damping: 26, mass: 0.9 },
  /** Large layout transitions. */
  gentle: { type: "spring" as const, stiffness: 120, damping: 20, mass: 1 },
  /** Cursor-follow, drag elastic. */
  magnetic: { type: "spring" as const, stiffness: 150, damping: 30, mass: 0.2 },
} as const;

// ============================================================
// STAGGERS — child delay in seconds.
// ============================================================
export const STAGGER = {
  /** Characters in a SplitText reveal. */
  tight: 0.03,
  /** List items, cards. */
  base: 0.05,
  /** Hero sub-elements. */
  loose: 0.08,
} as const;

// ============================================================
// Pre-baked Motion variants — drop into <motion.div variants={...}>
// ============================================================
export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base / 1000, ease: [...EASE.out] },
  },
};

export const stagger = (
  children: number = STAGGER.base,
  delayChildren = 0,
) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: children, delayChildren },
  },
});

// ============================================================
// CSS-side mirror. When using these in CSS, write the strings
// inline; importing TS into CSS is not possible. Keep them in
// sync with the values above.
//
//   --duration-micro: 120ms;
//   --duration-fast:  180ms;
//   --duration-base:  240ms;
//   --duration-slow:  360ms;
//   --duration-scene: 600ms;
//
//   --ease-out:       cubic-bezier(0.16, 1, 0.3, 1);
//   --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
//   --ease-in:        cubic-bezier(0.7, 0, 0.84, 0);
//   --ease-in-out:    cubic-bezier(0.77, 0, 0.175, 1);
// ============================================================
