import { CITATIONS } from "@/content/citations";
import { ExitScoreboard } from "@/components/color-worlds/ExitScoreboard";

const EXITS = CITATIONS.EXITS_COMBINED_VALUE;

function dealValue(value: string | null) {
  if (!value) return Number.NEGATIVE_INFINITY;
  const match = value.match(/^\$([\d.]+)([BM])$/);
  if (!match) return 0;
  const amount = Number(match[1]);
  return amount * (match[2] === "B" ? 1_000 : 1);
}

// Pass-122 (.planning/mocks/pass-122/RECEIPTS-BRIEF.md, theme 2): the server
// HTML is the static ledger it has always been, every value in it. On the
// client, <ExitScoreboard> turns the same list into a scoreboard that holds
// while the visitor scrolls four beats, one exit current per beat.
export function ExitRecord() {
  const deals = [...EXITS.DEALS].sort(
    (a, b) => dealValue(b.value) - dealValue(a.value),
  );

  return (
    <ExitScoreboard count={deals.length}>
      <div className="cw-exits__head">
        <h4 className="cw-exits__title" id="cw-exits-title">
          Four exits I worked inside
        </h4>
        <span className="cw-exits__ticks" aria-hidden="true">
          {deals.map((deal) => (
            <span key={deal.company} className="cw-exits__tick" />
          ))}
        </span>
      </div>

      <ol className="cw-exits__row" role="list">
        {deals.map((deal, index) => (
          <li
            key={deal.company}
            className="cw-exits__deal cw-reveal"
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <p className="cw-exits__co">{deal.company}</p>
            <div className="cw-exits__baseline">
              <p
                className={
                  deal.value
                    ? "cw-exits__val"
                    : "cw-exits__val cw-exits__val--undisclosed"
                }
              >
                {deal.value ?? "Undisclosed"}
              </p>
              <p className="cw-exits__outcome">{deal.outcome}</p>
            </div>
          </li>
        ))}
      </ol>
      {/* Pass-111a Astra gate: no aggregate row. "Combined, disclosed deals"
          summed SurveyMonkey's IPO value with two acquisition prices and
          called all three deals; each exit now stands on its own outcome. */}
    </ExitScoreboard>
  );
}
