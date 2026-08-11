// components/color-worlds/SpecTable.tsx
//
// W2 (P0-2/D4, operator-locked 2026-08-11) — the comparative spec table
// that replaces the uniform four-up .cw-tiers card grids on /services,
// /services/ai-engineering, and /hire-me.
//
// Why a table: the buyer's actual task on these surfaces is COMPARING
// four engagement shapes. A real <table> gives shapes-as-columns with
// the spec rows aligned for scanning — and clears the review's R6
// (uniform like-item grid) and R3 (13px card body) failures in one
// component. Data cells set at 16px; row labels in the 12px mono
// register.
//
// Weighting (D5): exactly one column may be `weighted` — it gets the
// filled terracotta header + a tinted column, the visual recommendation
// the card grid could never express. The operator locked Embedded as
// the weighted shape on every surface.
//
// Mobile: the table keeps its comparative shape and scrolls inside its
// own overflow-x container (never the page). This replaces a 6,889px
// wall of stacked cards at 390 with one swipeable table.
//
// Server component. No motion. No client JS.

export interface SpecColumn {
  name: string;
  /** Cell copy, aligned 1:1 with rowLabels. */
  cells: readonly string[];
}

export interface SpecTableProps {
  /** Row header labels, e.g. ["Scope", "Duration", "First-month deliverable"]. */
  rowLabels: readonly string[];
  /** The shapes, in display order. */
  columns: readonly SpecColumn[];
  /** Name of the single weighted (recommended) column, if any. */
  weighted?: string;
  /** Accessible caption for the table (visually hidden). */
  caption: string;
}

export function SpecTable({
  rowLabels,
  columns,
  weighted,
  caption,
}: SpecTableProps) {
  return (
    <div className="cw-spec-scroll" role="region" aria-label={caption} tabIndex={0}>
      <table className="cw-spec">
        <caption className="cw-sr-only">{caption}</caption>
        <colgroup>
          <col className="cw-spec__col-label" />
          {columns.map((c) => (
            <col
              key={c.name}
              className={
                c.name === weighted ? "cw-spec__col--lead" : undefined
              }
            />
          ))}
        </colgroup>
        <thead>
          <tr>
            <td aria-hidden />
            {columns.map((c) => (
              <th
                key={c.name}
                scope="col"
                className={
                  c.name === weighted
                    ? "cw-spec__head cw-spec__head--lead"
                    : "cw-spec__head"
                }
              >
                {c.name}
                {c.name === weighted ? (
                  <span className="cw-spec__lead-tag">Recommended</span>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowLabels.map((label, rowIdx) => (
            <tr key={label}>
              <th scope="row" className="cw-spec__rowlabel">
                {label}
              </th>
              {columns.map((c) => (
                <td
                  key={c.name}
                  className={
                    c.name === weighted
                      ? "cw-spec__cell cw-spec__cell--lead"
                      : "cw-spec__cell"
                  }
                >
                  {c.cells[rowIdx]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
