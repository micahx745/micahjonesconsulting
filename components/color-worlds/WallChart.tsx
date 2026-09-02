// components/color-worlds/WallChart.tsx
//
// The book's own page-6 figure, drawn once on load.
//
// WHY THIS EXISTS: the operator asked for an AI-generated "vibe coding factory"
// loop on this hero. Declined — DESIGN_BAR R12 bans AI-generated imagery by
// name and .claude/CLAUDE.md bans illustration — and this replaced it. A
// factory that never stalls is the wrong picture for a book about builds that
// stall. The book's actual argument is not an obstacle on a conveyor, it is two
// lines crossing.
//
// GEOMETRY IS TRANSCRIBED, NOT INVENTED. Every coordinate comes from
// `wall-chart()` in product/playbook/src/template.typ, on the same 340x168
// canvas. If the book's chart moves, move this with it. The reader sees the
// argument here, buys the book, and finds the identical figure on page 6.
//
// MOTION: approved by motion-engineer 2026-09-01 as a FIGURE animation, not a
// second signature interaction. It is the artifact playing, not the site
// responding to the visitor: it runs once, terminates, and never couples to
// input. TitleCard remains the signature. Conditions of that approval:
// /playbook hero only, once per mount, base CSS is the finished frame, motion
// layered on only at >=900px with no reduced-motion preference.
//
// TWO IMPLEMENTATION NOTES, both from that ruling:
//  1. <path> not <line>/<polyline>: pathLength has a spotty WebKit history on
//     the latter two and is universal on <path>.
//  2. The window line is DASHED, and a dash pattern plus a draw-on both want
//     stroke-dasharray. They cannot coexist. So the dashes stay static and an
//     espresso curtain rect wipes off it left to right, which keeps the book's
//     dash pattern without animating a <mask> or <clipPath> child.

export function WallChart() {
  return (
    <figure className="cw-wallchart" aria-labelledby="wallchart-cap">
      <svg
        className="cw-wallchart__svg"
        viewBox="0 0 340 168"
        width="340"
        height="168"
        role="img"
        aria-describedby="wallchart-desc"
        focusable="false"
      >
        <desc id="wallchart-desc">
          A line chart. A nearly flat dashed line marks how much of a codebase
          fits in an AI tool&rsquo;s context window. A second line, rising in
          four increasingly steep segments, marks the unwritten rules the
          project accumulates. The two cross at about four fifths along, and
          that crossing is the wall.
        </desc>

        {/* Furniture holds still. Only the argument moves. */}
        <g className="cw-wallchart__axes">
          <line x1="0" y1="146" x2="340" y2="146" />
          <line x1="0" y1="6" x2="0" y2="146" />
        </g>

        {/* What fits in the context window: nearly flat, dashed. */}
        <path className="cw-wallchart__window" d="M2 58 L334 54" />
        {/* The curtain that reveals it. See note 2 above. */}
        <rect
          className="cw-wallchart__wipe"
          x="2"
          y="50"
          width="338"
          height="12"
        />

        {/* Unwritten rules: four segments, each steeper than the last. */}
        <path
          className="cw-wallchart__rules"
          d="M0 144 L90 130 L170 102 L240 58 L300 8"
          pathLength={1}
        />

        {/* The crossing, at the computed intersection of the two lines. */}
        <circle className="cw-wallchart__cross" cx="243.5" cy="55.1" r="4" />

        <text
          className="cw-wallchart__lbl cw-wallchart__lbl--window"
          x="6"
          y="44"
        >
          What fits in the window
        </text>
        <text
          className="cw-wallchart__lbl cw-wallchart__lbl--rules"
          x="14"
          y="114"
        >
          Unwritten rules
        </text>
        <text
          className="cw-wallchart__lbl cw-wallchart__lbl--wall"
          x="192"
          y="32"
        >
          The wall
        </text>
        <text
          className="cw-wallchart__lbl cw-wallchart__lbl--axis"
          x="0"
          y="162"
        >
          Build progress
        </text>
        <text
          className="cw-wallchart__lbl cw-wallchart__lbl--axis cw-wallchart__lbl--end"
          x="340"
          y="162"
        >
          80%
        </text>
      </svg>
      <figcaption id="wallchart-cap" className="cw-wallchart__cap">
        Page 6 · why the wall is arithmetic, not skill
      </figcaption>
    </figure>
  );
}
