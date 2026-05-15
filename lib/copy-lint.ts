// Source: blueprint §8 voice rules + harness copy-lint.sh + PITFALL E4 (banned-words drift)
//
// Phase 1: Module exists with function exports but is NOT yet invoked at build time.
// Phase 2: instrumentation.ts calls scanContent() during register() per COPY-03.
//
// Usage (Phase 2):
//   import { scanString, scanFile } from "@/lib/copy-lint";
//   const findings = scanString(someText, "app/page.tsx", 1);
//   if (findings.length > 0) { console.error(findings); process.exit(1); }
import { BANNED_WORDS } from "@/lib/banned";

export interface Finding {
  word: string;
  filePath: string;
  line: number;
  column: number;
  excerpt: string;
}

// Build a single compiled regex with case-insensitive flag.
// Single-word entries use word boundaries; multi-word phrases match literally.
function buildPattern(): RegExp {
  const escaped = BANNED_WORDS.map((w) => {
    const escapedWord = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return /\s/.test(w) ? escapedWord : `\\b${escapedWord}\\b`;
  });
  return new RegExp(`(${escaped.join("|")})`, "gi");
}

const BANNED_PATTERN = buildPattern();

/**
 * Scan a single string for banned words. Returns one finding per match.
 *
 * @param text - the content to scan
 * @param filePath - the source file (for reporting)
 * @param lineOffset - the line number where `text` starts in the source file (1-based)
 */
export function scanString(
  text: string,
  filePath: string,
  lineOffset = 1,
): Finding[] {
  const findings: Finding[] = [];
  const lines = text.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    BANNED_PATTERN.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = BANNED_PATTERN.exec(line)) !== null) {
      findings.push({
        word: match[1]!,
        filePath,
        line: lineOffset + i,
        column: match.index + 1,
        excerpt: line.slice(Math.max(0, match.index - 20), match.index + match[1]!.length + 20),
      });
    }
  }

  return findings;
}

/**
 * Format findings as human-readable error output (one line per finding).
 */
export function formatFindings(findings: Finding[]): string {
  return findings
    .map((f) => `${f.filePath}:${f.line}:${f.column} — banned word "${f.word}" in: "...${f.excerpt}..."`)
    .join("\n");
}
