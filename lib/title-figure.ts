// lib/title-figure.ts
//
// Pass-123 (operator 2026-09-19, LESSONS #3 PASS-123 STUDY PAGES SCOPE; DESIGN_BAR
// R2 amended). Server-safe, no React: splits a case-study title line (or the
// Results lead) around the numeral or phrase that becomes the study band's poster,
// so components/TitleCard.tsx and app/(theater)/work/[slug]/page.tsx can wrap spans
// around the SAME words the frontmatter already renders. No copy changes here --
// every function returns substrings of what it is given.
//
// FIGURE_RE matches a money figure ("$14M", "$3M") or a comma-grouped number
// ("800,000"), plus whatever punctuation is glued to it ("$14M," keeps its comma).
// It intentionally does not match a bare year ("2021"), a day count ("Day 3"), a
// hyphenated ordinal ("top-10") or an un-grouped number ("800"): none of those is a
// result figure, and LESSONS #3 keeps personal years and stray digits out of the
// poster.
export const FIGURE_RE = /(\$\d[\d.,]*[KMB]?|\d{1,3}(?:,\d{3})+)([.,;:!?]*)/;

export interface TitleFigureSplit {
  /** Words before the figure, trimmed. "" when the figure opens the line. */
  kick: string;
  /** The numerals plus any glued punctuation, as ONE string (LESSONS #38: two
   * text nodes render as "ten<!-- -->."). */
  poster: string;
  /** Words after the figure, trimmed. "" when the figure closes the line. */
  tail: string;
}

/** Splits one title line around its first FIGURE_RE match, or null when the line
 * carries no figure (every non-figure line, and every line on a study with none). */
export function splitTitleFigure(line: string): TitleFigureSplit | null {
  const match = FIGURE_RE.exec(line);
  if (!match) return null;
  const poster = match[0] ?? "";
  const kick = line.slice(0, match.index).trim();
  const tail = line.slice(match.index + poster.length).trim();
  return { kick, poster, tail };
}

/** The index of the first line carrying a figure, or -1 when none does (one hero
 * number per title: only the first match counts). */
export function findTitleFigure(lines: string[]): number {
  return lines.findIndex((line) => splitTitleFigure(line) !== null);
}

export interface LeadPhraseSplit {
  /** Words before the phrase, right-trimmed only (a leading line never has
   * leading whitespace to strip). */
  lead: string;
  /** The phrase plus any punctuation immediately after it, as ONE string, when
   * that trailing text is punctuation-only; otherwise the phrase alone. */
  poster: string;
  /** Whatever follows the phrase when it was not punctuation-only (rare: no
   * current study needs this). "" whenever poster absorbed the tail. */
  after: string;
}

/** Splits `line` around `phrase` (the /work `Headline` phrase-poster branch,
 * verbatim in behaviour): null when `phrase` does not occur strictly after the
 * start of `line` (indexOf <= 0), so a phrase that opens the line or is absent
 * never produces an orphaned poster. */
export function splitLeadPhrase(
  line: string,
  phrase: string,
): LeadPhraseSplit | null {
  const at = line.indexOf(phrase);
  if (!(at > 0)) return null;
  const lead = line.slice(0, at).trimEnd();
  const rest = line.slice(at + phrase.length);
  const tail = /^[.,;:!?]*$/.test(rest) ? rest : "";
  const poster = phrase + tail;
  const after = tail ? "" : rest;
  return { lead, poster, after };
}
