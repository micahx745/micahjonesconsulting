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
//
// Pass-123 (operator 2026-09-19, LESSONS #3 PASS-123 STUDY PAGES SCOPE; DESIGN_BAR
// R2 amended): the one title line that carries the study's result figure ($14M,
// $3M, 800,000) renders that figure at /work's poster size, in copper, inside the
// h1, instead of repeating it at a second size in the band below -- the title
// cannot be reworded, so the title is the poster. lib/title-figure.ts finds that
// line (findTitleFigure) and splits it into kick/poster/tail (splitTitleFigure);
// every other line, and every study whose titleLines carry no figure (ordani,
// birth-worker), renders exactly as it did before this pass. Either way the h1's
// text content is unchanged: the split only wraps spans around the same words.
import { Fragment } from "react";
import type { TitleCardProps } from "@/lib/title-card-schema";
import { findTitleFigure, splitTitleFigure } from "@/lib/title-figure";

// Shared word mapping for every ink span in the title (plain lines, and the
// figure line's kick/tail): a hyphenated word (e.g. "east-west") gets
// .cs-title__nb so it never breaks mid-word.
function renderWords(text: string) {
  return text.split(" ").map((word, j) => (
    <Fragment key={`${j}-${word}`}>
      {j > 0 ? " " : null}
      {word.includes("-") ? <span className="cs-title__nb">{word}</span> : word}
    </Fragment>
  ));
}

export function TitleCard({ title, lines }: TitleCardProps) {
  const figureIndex = findTitleFigure(lines);

  return (
    <h1 className="cs-title" data-title={title}>
      {lines.map((line, i) => {
        const figure = i === figureIndex ? splitTitleFigure(line) : null;

        return (
          <Fragment key={`${i}-${line}`}>
            {i > 0 ? " " : null}
            {figure ? (
              <span className="cs-title__line cs-title__line--figure">
                {figure.kick ? (
                  <>
                    <span className="cs-title__kick">
                      {renderWords(figure.kick)}
                    </span>{" "}
                  </>
                ) : null}
                <span
                  className={`cs-num${figure.poster.includes(",") ? " cs-num--comma" : ""}`}
                >
                  {figure.poster}
                </span>
                {figure.tail ? (
                  <>
                    {" "}
                    <span className="cs-title__tail">
                      {renderWords(figure.tail)}
                    </span>
                  </>
                ) : null}
              </span>
            ) : (
              <span className="cs-title__line">{renderWords(line)}</span>
            )}
          </Fragment>
        );
      })}
    </h1>
  );
}
