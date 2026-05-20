// v2 Container — 1280px max-width with 32px gutters (16px mobile).
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`v2-container ${className}`.trim()}>{children}</div>;
}
