// components/v3/specimen/Plate.tsx
//
// A numbered plate — the unit of composition in the typesetter's workshop.
// Each plate has a number (e.g., "0001"), a name (e.g., "SETTING"), and
// content. The plate header sits above the content in a tracked small-caps
// style with the number in serif italic.
//
// Layout: two-column on desktop (content 8/12 + type metadata rail 4/12),
// stacked on mobile.
import type { ReactNode } from "react";

interface PlateProps {
  /** Plate number, e.g. "0001". Rendered as serif italic. */
  number: string;
  /** Plate name, e.g. "SETTING" or "SPECIMEN — ORDANI". Tracked caps. */
  name: string;
  children: ReactNode;
  /** Optional aside content for the right rail (e.g. TypeMetadata). */
  aside?: ReactNode;
  /** Anchor id for nav. */
  id?: string;
  className?: string;
}

export function Plate({
  number,
  name,
  children,
  aside,
  id,
  className = "",
}: PlateProps) {
  return (
    <section id={id} className={`v3-plate ${className}`.trim()}>
      <header className="v3-plate__header">
        <span className="v3-plate__number">{number}</span>
        <span className="v3-plate__sep" aria-hidden>—</span>
        <span className="v3-plate__name">{name}</span>
      </header>
      <div className="v3-plate__grid">
        <div className="v3-plate__content">{children}</div>
        {aside ? <div className="v3-plate__aside">{aside}</div> : null}
      </div>
    </section>
  );
}
