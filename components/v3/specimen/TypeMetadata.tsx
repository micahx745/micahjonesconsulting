// components/v3/specimen/TypeMetadata.tsx
//
// Right-rail type specification card. Sits next to a piece of set type
// and exposes its actual technical values. Source Serif italic for the
// commentary; plate-mark color for muted appearance (visible but not
// foreground).
//
// Honesty principle: every value should be REAL — if it says
// `Inter Display · 96pt · −4% tracking`, the actual rendered headline
// is in fact set at those values. No decorative numbers.
import type { ReactNode } from "react";

interface TypeMetadataProps {
  /** Font family — e.g. "Inter Display" */
  font: string;
  /** Size — e.g. "96pt" or "clamp(56, 96)" */
  size: string;
  /** Tracking value — e.g. "−4%" or "−0.04em" */
  tracking?: string;
  /** Line-height — e.g. "1.05" */
  leading?: string;
  /** Weight — e.g. "Bold" or "400" */
  weight?: string;
  /** Free-form commentary, Source Serif italic */
  note?: ReactNode;
  /** Plate number this metadata belongs to, if labeled */
  plate?: string;
  className?: string;
}

export function TypeMetadata({
  font,
  size,
  tracking,
  leading,
  weight,
  note,
  plate,
  className = "",
}: TypeMetadataProps) {
  return (
    <aside
      className={`v3-type-metadata ${className}`.trim()}
      aria-label="Typographic specification"
    >
      {plate ? <span className="v3-type-metadata__plate">{plate}</span> : null}
      <dl className="v3-type-metadata__list">
        <dt>Font</dt>
        <dd>{font}</dd>
        <dt>Size</dt>
        <dd>{size}</dd>
        {tracking ? (
          <>
            <dt>Tracking</dt>
            <dd>{tracking}</dd>
          </>
        ) : null}
        {leading ? (
          <>
            <dt>Leading</dt>
            <dd>{leading}</dd>
          </>
        ) : null}
        {weight ? (
          <>
            <dt>Weight</dt>
            <dd>{weight}</dd>
          </>
        ) : null}
      </dl>
      {note ? <p className="v3-type-metadata__note">{note}</p> : null}
    </aside>
  );
}
