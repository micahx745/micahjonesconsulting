import { HandCircle } from "@/components/hand/HandCircle";

export function RevenueFigure() {
  return (
    <div className="cw-rec">
      <p className="cw-rec__num">
        <span className="cw-sr-only">More than 20 million dollars</span>
        <span className="cw-rec__wrap" aria-hidden="true">
          <span className="cw-rec__ghost">$20M+</span>
          <span className="cw-rec__tick" />
          <HandCircle variant={1} color="currentColor" instant />
        </span>
      </p>
      <p className="cw-rec__lbl">In client revenue since 2013</p>
    </div>
  );
}
