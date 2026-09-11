import { CITATIONS } from "@/content/citations";

const EXITS = CITATIONS.EXITS_COMBINED_VALUE;

function dealValue(value: string | null) {
  if (!value) return Number.NEGATIVE_INFINITY;
  const match = value.match(/^\$([\d.]+)([BM])$/);
  if (!match) return 0;
  const amount = Number(match[1]);
  return amount * (match[2] === "B" ? 1_000 : 1);
}

export function ExitRecord() {
  const deals = [...EXITS.DEALS].sort(
    (a, b) => dealValue(b.value) - dealValue(a.value),
  );

  return (
    <section className="cw-exits" aria-labelledby="cw-exits-title">
      <h4 className="cw-exits__title" id="cw-exits-title">
        Four exits I worked inside
      </h4>

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
    </section>
  );
}
