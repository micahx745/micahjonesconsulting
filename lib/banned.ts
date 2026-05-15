// Source: blueprint §8 top-9 banned words + harness slop-words.txt defaults + research extensions.
// Total: 30 words/phrases. Used by lib/copy-lint.ts (build-time scanner) and harness copy-lint.sh hook.
//
// Conventions:
//   - All entries are lowercase.
//   - Single words match with word-boundary regex (\b...\b).
//   - Multi-word phrases match literally (case-insensitive).
//   - Add new entries here; do not splinter into multiple files.
export const BANNED_WORDS = [
  // Top 9 from blueprint §8
  "unlock",
  "drive",
  "leverage",
  "elevate",
  "synergy",
  "transformative",
  "game-changing",
  "best-in-class",
  "at the intersection of",

  // Harness slop-words.txt defaults (cross-loaded for build-time scanner parity)
  "seamless",
  "seamlessly",
  "cutting-edge",
  "revolutionary",
  "world-class",
  "next-generation",
  "holistic",
  "robust",
  "innovative",
  "dive deep",
  "circle back",
  "low-hanging fruit",
  "move the needle",
  "make an impact",
  "delight users",
  "craft experiences",
  "passionate about",
  "obsessed with",
  "journey",
  "solutions",
  "empower",
] as const;

export type BannedWord = (typeof BANNED_WORDS)[number];
