// v2 SplitHero — word-by-word reveal for hero headlines.
// On mount (not scroll), each word fades up with 60ms stagger. Total <500ms.
"use client";

import { motion, useReducedMotion } from "motion/react";

interface SplitHeroProps {
  text: string;
  className?: string;
  /** as element. Default h1. */
  as?: "h1" | "h2";
  /** Per-word fade duration in seconds. Default 0.5. */
  duration?: number;
  /** Stagger between words in seconds. Default 0.06. */
  stagger?: number;
}

export function SplitHero({
  text,
  className = "",
  as = "h1",
  duration = 0.5,
  stagger = 0.06,
}: SplitHeroProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    const Tag = as;
    return <Tag className={className} aria-label={text}>{text}</Tag>;
  }

  const MotionTag = motion[as] as typeof motion.h1;

  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.1 },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          style={{
            display: "inline-block",
            marginRight: "0.25em",
          }}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}
