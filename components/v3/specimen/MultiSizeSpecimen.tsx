// components/v3/specimen/MultiSizeSpecimen.tsx
//
// Renders a single word/title at four sizes simultaneously — the classic
// type-specimen move. Each size labeled with its actual point value.
// Used on case-study plates: the title appears at 144pt / 72pt / 36pt /
// 18pt so the visitor sees the title across the cascade in one glance.
import type { ReactNode } from "react";

interface MultiSizeSpecimenProps {
  /** The word/title to render at multiple sizes. */
  text: string;
  /** Sizes in points to render at. Default [144, 72, 36, 18]. */
  sizes?: number[];
  /** Optional class for the wrapping element. */
  className?: string;
  /** Optional renderer for each size — e.g. wrap in a link. */
  itemRenderer?: (text: string, size: number) => ReactNode;
}

const DEFAULT_SIZES = [144, 72, 36, 18];

export function MultiSizeSpecimen({
  text,
  sizes = DEFAULT_SIZES,
  className = "",
  itemRenderer,
}: MultiSizeSpecimenProps) {
  return (
    <div className={`v3-multi-size ${className}`.trim()}>
      {sizes.map((size) => (
        <div key={size} className="v3-multi-size__row">
          <span className="v3-multi-size__label">{size}pt</span>
          <span
            className="v3-multi-size__text"
            style={{ fontSize: `${size}px`, lineHeight: 1 }}
          >
            {itemRenderer ? itemRenderer(text, size) : text}
          </span>
        </div>
      ))}
    </div>
  );
}
