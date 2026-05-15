// components/EditorialStrip.tsx
//
// Tier X — Editorial top-strip.
//
// Cav Empt-style metadata at the top of each page hero. Tracked small
// caps, copper specimen-rule separators. Reads as a lot code / inventory
// label rather than a marketing element.
import { Fragment } from "react";

interface EditorialStripProps {
  /** e.g., "LOT 001" or "LOT 002" */
  lot: string;
  /** Additional metadata items, displayed between copper separators. */
  items: string[];
}

export function EditorialStrip({ lot, items }: EditorialStripProps) {
  return (
    <div className="editorial-strip" aria-hidden>
      <span className="editorial-strip__lot">{lot}</span>
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <span className="editorial-strip__sep" />
          <span className="editorial-strip__item">{item}</span>
        </Fragment>
      ))}
    </div>
  );
}
