// v2 Column — 640px max-width text column (Stripe Press editorial sweet spot).
import type { ReactNode } from "react";

export function Column({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`v2-column ${className}`.trim()}>{children}</div>;
}
