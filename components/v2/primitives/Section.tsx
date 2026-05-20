// v2 Section — vertical padding (128px desktop / 64px mobile), scroll-margin
// so anchor links land cleanly.
import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`v2-section ${className}`.trim()}>
      {children}
    </section>
  );
}
