import type { ElementType, ReactNode } from "react";

interface PriceBoxProps {
  id: string;
  tag?: string;
  lead?: boolean;
  name: string;
  price: {
    from?: string;
    fig: string;
    per?: string;
  };
  term?: string;
  fit: ReactNode;
  list: string[];
  area: ReactNode;
  cta: ReactNode;
  fine?: string;
  as?: "h2" | "h3";
}

export function PriceBox({
  id,
  tag,
  lead = false,
  name,
  price,
  term,
  fit,
  list,
  area,
  cta,
  fine,
  as: Heading = "h3",
}: PriceBoxProps) {
  const nameId = `${id}-name`;
  const HeadingTag = Heading as ElementType;

  return (
    <article
      id={id}
      className={`cw-pbox${lead ? " cw-pbox--lead" : ""}`}
      aria-labelledby={nameId}
    >
      <div className="cw-pbox__in">
        {tag ? (
          <p className="cw-pbox__label">
            <span className="cw-pbox__tag">{tag}</span>
          </p>
        ) : null}
        <HeadingTag className="cw-pbox__name" id={nameId}>
          {name}
        </HeadingTag>
        <p className="cw-pbox__price">
          {price.from ? (
            <>
              <span className="cw-pbox__from">{price.from}</span>{" "}
            </>
          ) : null}
          <span className="cw-pbox__fig">{price.fig}</span>
          {price.per ? (
            <>
              {" "}
              <span className="cw-pbox__per">{price.per}</span>
            </>
          ) : null}
        </p>
        {term ? <p className="cw-pbox__term">{term}</p> : null}
        <p className="cw-pbox__fit">{fit}</p>
        <ul className="cw-pbox__list">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="cw-pbox__area">{area}</p>
        <div className="cw-pbox__act">{cta}</div>
        {fine ? <p className="cw-pbox__fine">{fine}</p> : null}
      </div>
    </article>
  );
}
