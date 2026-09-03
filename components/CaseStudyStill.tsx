// components/CaseStudyStill.tsx
//
// Phase 7 — CASE-09, THEATER-05. Captioned dashboard still with the
// signature 2px warm off-white inner border + 4% film-grain overlay.
// Caption format: "alt · date" or "caption · date" (middot since Pass-83;
// an em-dash here put every photo-bearing case study over the page cap).
//
// Server component. Renders next/image with WebP/AVIF when src is
// present; renders an editorial specimen card when src is missing.
// Caption always renders.
//
// Pass-17: placeholder branch redesigned. The previous branch rendered
// a lock-icon card with a hardcoded "Released after public beta"
// eyebrow — wrong for acquired engagements (Guardicore) or ongoing
// ones (HR-author), and read as a missing-asset notice. The new branch
// renders an editorial specimen — small mono eyebrow (configurable via
// the new placeholderEyebrow prop, default "Protected by NDA"), then
// the alt text in display weight, then the date as a small caption.
// Reads as designed editorial restraint, not as a missing image.
//
// Image budget (CASE-09): 500KB max — enforced by harness image-budget.sh
// at the write boundary.
//
// Source: REQUIREMENTS.md CASE-09, THEATER-05; blueprint §4c.
import Image from "next/image";

export interface CaseStudyStillProps {
  /** Path to the still image. Optional — placeholder renders if omitted. */
  src?: string;

  /** Alt text — also used as caption-prefix when caption is omitted,
   *  and as the display-weight title of the placeholder specimen. */
  alt: string;

  /** Optional caption — defaults to alt if omitted. */
  caption?: string;

  /** Required: ISO date "YYYY-MM" or formatted "Mon YYYY". Suffix on caption. */
  date: string;

  /** Image dimensions (next/image needs them for non-fill mode). */
  width?: number;
  height?: number;

  /** Pass-17: mono uppercase eyebrow for the placeholder specimen card.
   *  Defaults to "Protected by NDA" — works for both acquired and
   *  ongoing engagements. Examples of overrides: "Released after public
   *  beta" (legacy default; still valid for staged-release cases),
   *  "Under NDA · 2020", "Protected · Q3 2020". */
  placeholderEyebrow?: string;
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
  placeholderEyebrow = "Protected by NDA",
}: CaseStudyStillProps) {
  const captionText = caption ?? alt;
  const formattedDate = formatDate(date);

  // W1 re-port (D3, 2026-08-11): when the placeholder specimen renders
  // (no src) and no distinct caption was authored, the figcaption would
  // repeat the alt text verbatim below the specimen — the Cowork
  // review's duplicate-caption finding. The specimen already carries
  // the title + date; the figcaption only renders when it adds words.
  const showCaption =
    Boolean(src) || (caption !== undefined && caption !== alt);

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
          /* Pass-17 — editorial specimen card.
           * Replaces the lock-icon "missing image" placeholder with a
           * designed editorial moment: small mono eyebrow (configurable),
           * display-weight alt text, small caption with the date. The
           * card reads as deliberate restraint, not as missing-asset
           * notice. The eyebrow is the only line that asserts WHY there
           * is no image — defaults to "Protected by NDA" which fits
           * acquired, IPO'd, and ongoing engagements alike. */
          /* Pass-20 (per Marcus, Pass-19 review): the bordered-rectangle
             placeholder still read as "missing image" rather than as
             deliberate restraint. Replaced with a typeset block — no
             outer border, a THICK left rule (like a magazine pull-quote),
             eyebrow + display-italic title + date stamped beneath.
             Reads as deliberate editorial typography, not as a frame
             waiting for content. */
          <div
            className="case-study-still__placeholder"
            role="img"
            aria-label={`${placeholderEyebrow}: ${alt}`}
          >
            <span className="case-study-still__spec-eyebrow">
              {placeholderEyebrow}
            </span>
            <span className="case-study-still__spec-title">{alt}</span>
            <span className="case-study-still__spec-date">{formattedDate}</span>
          </div>
        )}
        {/* Film-grain overlay — 4% opacity (CSS) */}
        <div className="case-study-still__grain" aria-hidden="true" />
      </div>
      {showCaption ? (
        <figcaption className="case-study-still__caption">
          {/* Review #34: this joiner was an em-dash, so EVERY case study with a
              photo broke the one-per-page cap before an author typed a word -
              the nav's "Menu" line already spends the page's one. The middot is
              the separator this site already uses for caption metadata (see
              /about and /work). */}
          {captionText} · {formattedDate}
        </figcaption>
      ) : null}
    </figure>
  );
}
