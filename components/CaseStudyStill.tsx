// components/CaseStudyStill.tsx
//
// Phase 7 — CASE-09, THEATER-05. Captioned dashboard still with the
// signature 2px warm off-white inner border + 4% film-grain overlay.
// Caption format: "alt — date" or "caption — date" (e.g., "Doula intake
// flow — Mar 2026") per blueprint §4c.
//
// Server component. Renders next/image with WebP/AVIF when src is present;
// renders a graceful placeholder div if src is missing (Phase 7 testing —
// real images land in Phase 8/9). Caption always renders.
//
// Image budget (CASE-09): 500KB max — enforced by harness image-budget.sh
// at the write boundary. Phase 7 does not check at runtime; we trust the
// hook.
//
// Source: REQUIREMENTS.md CASE-09, THEATER-05; blueprint §4c
// ("ORDANI product stills: dashboard screenshots placed on the dark theater
// ground with 2px warm off-white inner border and a subtle 4% film-grain
// overlay. Each one is captioned like a film still ('Doula intake flow,
// March 2026')").
import Image from "next/image";

export interface CaseStudyStillProps {
  /** Path to the still image. Optional during Phase 7 (placeholder shown). */
  src?: string;

  /** Alt text — also used as caption-prefix when caption is omitted. */
  alt: string;

  /** Optional caption — defaults to alt if omitted. */
  caption?: string;

  /** Required: ISO date "YYYY-MM" or formatted "Mon YYYY". Suffix on caption. */
  date: string;

  /** Image dimensions (next/image needs them for non-fill mode). */
  width?: number;
  height?: number;
}

/**
 * Format an ISO date "YYYY-MM" or "YYYY-MM-DD" as "Mon YYYY" (e.g., "Mar 2026").
 * If the input is already in a non-ISO format (e.g., "March 2026"), returned as-is.
 */
function formatDate(input: string): string {
  const isoMatch = input.match(/^(\d{4})-(\d{1,2})(?:-\d{1,2})?$/);
  if (!isoMatch) return input;
  const year = isoMatch[1]!;
  const monthIdx = Number(isoMatch[2]!) - 1;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[monthIdx] ?? input;
  return `${month} ${year}`;
}

export function CaseStudyStill({
  src,
  alt,
  caption,
  date,
  width = 1440,
  height = 900,
}: CaseStudyStillProps) {
  const captionText = caption ?? alt;
  const formattedDate = formatDate(date);

  return (
    <figure className="case-study-still">
      <div className="case-study-still__frame">
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="case-study-still__image"
            loading="lazy"
          />
        ) : (
          <div
            className="case-study-still__placeholder"
            aria-label={`Placeholder for ${alt}`}
          />
        )}
        {/* Film-grain overlay — 4% opacity (CSS) */}
        <div className="case-study-still__grain" aria-hidden="true" />
      </div>
      <figcaption className="case-study-still__caption">
        {captionText} — {formattedDate}
      </figcaption>
    </figure>
  );
}
