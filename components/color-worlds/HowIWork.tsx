import { HOW_I_WORK } from "@/content/how-i-work";
import { SplitReveal } from "@/components/color-worlds/SplitReveal";

interface HowIWorkProps {
  variant: "home" | "services";
}

export function HowIWork({ variant }: HowIWorkProps) {
  return (
    <div className={`cw-hiw cw-hiw--${variant}`}>
      {variant === "home" ? (
        <SplitReveal
          as="h2"
          id="cw-howiwork-title"
          className="cw-secttitle cw-hiw__title"
        >
          {HOW_I_WORK.heading}
        </SplitReveal>
      ) : (
        <h3 id="sv-hiw-title" className="cw-hiw__title">
          {HOW_I_WORK.heading}
        </h3>
      )}
      <ol className="cw-hiw__list" role="list">
        {HOW_I_WORK.steps.map((s) => (
          <li
            key={s.label}
            className={`cw-hiw__step cw-hiw__step--${s.label.toLowerCase()} cw-reveal`}
          >
            <div>
              <p className="cw-hiw__label">{s.label}</p>
              <p className="cw-hiw__head">{s.headline}</p>
              <p className="cw-hiw__body">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="cw-hiw__more cw-reveal">
        <a href={HOW_I_WORK.moreHref} className="cw-mlink">
          {HOW_I_WORK.moreLabel} <span aria-hidden>{"\u2192"}</span>
        </a>
      </p>
    </div>
  );
}
