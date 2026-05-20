// v2 Eyebrow — uppercase tracked caption above section headings.
// `text-caption` (13px / 0.04em tracking) per type scale.
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`v2-eyebrow ${className}`.trim()}>{children}</p>;
}
