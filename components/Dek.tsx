// components/Dek.tsx
//
// Phase 7 — THEATER-04 (render order). Source Serif 4 italic subtitle
// rendered between the TitleCard and the hero still / MDX body.
//
// Pure presentational. Server component (no client boundary needed).
// Mode-aware: cream paper ink in foyer, bone ink in theater (CSS handles
// it via [data-mode] ancestor selectors).
//
// Source: REQUIREMENTS.md THEATER-04; blueprint §9 ORDANI wireframe (the
// [DEK — Tiempos] block under the TitleCard).
import type { ReactNode } from "react";

export interface DekProps {
  children: ReactNode;
}

export function Dek({ children }: DekProps) {
  return <p className="case-study-dek">{children}</p>;
}
