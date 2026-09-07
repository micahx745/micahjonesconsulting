// components/room/HowIWork.tsx — section 03, how I work.
//
// Pass-101 phase 2. §15.4 removed the three framed panels the operator called
// horrible, and with them the redrawn page-6 diagram, the two typographic
// plates and the sticky rail. What is left is a full-width ledger: three rows,
// each an ordinal, the step name at the composed display size, and the step's
// one sentence in the right half, with a hairline between.
//
// The head keeps the section-head width axis (115) and is allowed to WRAP. The
// middot rule survives the wrap in the MARKUP: the separator is tied to the
// word on both sides with a non-breaking space, so "principles·How" is one
// unbreakable unit and the middot can neither end a line nor open one.
export function HowIWork() {
  return (
    <section
      className="work wrap"
      id="work"
      data-anim="0.9"
      aria-label="How I work"
    >
      <div className="sec">
        <h2 className="d two" data-anim="0.85">
          Operating principles&#160;&#183;&#160;How I work.
        </h2>
      </div>
      <ol className="steps">
        <li>
          <span className="l n">01</span>
          <span className="d two nm">Diagnose</span>
          <span className="s">
            I find the gap between what you built and what buyers actually pay
            for.
          </span>
        </li>
        <li>
          <span className="l n">02</span>
          <span className="d two nm">Build</span>
          <span className="s">
            Every engagement ships a named artifact in month one.
          </span>
        </li>
        <li>
          <span className="l n">03</span>
          <span className="d two nm">Position</span>
          <span className="s">
            I stay until the narrative sells without me.
          </span>
        </li>
      </ol>
    </section>
  );
}
