// components/TitleCard.tsx
//
// Pass-120. The signature motion, re-cast (operator signed 2026-09-16): the study
// title settles into place once when the page renders. Each line rises 12px and
// fades in over 400ms; line 2 starts 200ms after line 1 (100ms and 200ms when there
// are three lines), 600ms at most. Transform and opacity only. No pin, no scroll
// coupling, no replay.
//
// The motion is CSS (app/globals.css, .cs-title__line), gated by
// (prefers-reduced-motion: no-preference) and (scripting: enabled). Reduced motion,
// no-JS and browsers without the scripting media feature get this server render,
// which is the finished frame. It starts at first paint and never waits for
// hydration. This is a server component and imports no animation library.
import { Fragment } from "react";
import type { TitleCardProps } from "@/lib/title-card-schema";

export function TitleCard({ title, lines }: TitleCardProps) {
  return (
    <h1 className="cs-title" data-title={title}>
      {lines.map((line, i) => (
        <Fragment key={`${i}-${line}`}>
          {i > 0 ? " " : null}
          <span className="cs-title__line">{line}</span>
        </Fragment>
      ))}
    </h1>
  );
}
