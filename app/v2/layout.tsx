// app/v2/layout.tsx
//
// v2 (dark-mode luxury) route group layout. Wraps every /v2/* page with:
//   - data-mode="v2" attribute → graphite-navy bg + Inter body via globals.css
//   - V2 sticky nav with hide-on-scroll + BookCallPill
//   - V2 minimal footer
//
// Lenis + ViewTransition are inherited from the root app/layout.tsx —
// no need to re-mount. Lenis lerp 0.08 is close enough to the spec's 0.1
// (~2% difference, imperceptible).
import type { ReactNode } from "react";
import { V2Nav } from "@/components/v2/nav/Nav";
import { V2Footer } from "@/components/v2/footer/Footer";

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <div data-mode="v2">
      <V2Nav />
      <main>{children}</main>
      <V2Footer />
    </div>
  );
}
