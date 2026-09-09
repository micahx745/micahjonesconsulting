// components/room/HowIWork.tsx — section 03, how I work.
//
// Pass-101 phase 2, recomposed by §18.
//
// §15.4 removed the three framed panels the operator called horrible. §18
// splits the head: "Eyebrow `Operating principles` (label style) 20px above
// the head `How I work.` at --d2 on one line (both verbatim halves of the
// existing string; the middot and its nowrap go)."
//
// The one string used to render as a single display line with the middot
// inside it, which is why v5 had to tie the separator to both neighbours with
// non-breaking spaces so it could survive a wrap. Split at the separator there
// is nothing left to protect. Both halves are the live string's own words; no
// copy is written here.
//
// The ordinal sits in a 28px cell at 60% ink and the sentence lane opens on
// the column-6 line — §18 Rule B, the one seam that runs down the page.
//
// Pass-104b §4 (THE SPINE): HowIWork.tsx held zero <a> elements — the only
// section on the page with no destination. Each row is now the row's own
// link (the grammar the objections and receipts rows already use), with a
// copper arrow glyph, aria-hidden, ahead of the row's own accessible name.
// Destinations per .planning/design/104b/howiwork.md: 01 Diagnose -> /call,
// 02 Build -> #price, 03 Position -> #proof. No label string is added; the
// copy gate sees zero new text nodes in this commit.
export function HowIWork() {
  return (
    <section
      className="work wrap"
      id="work"
      data-anim="0.9"
      aria-label="How I work"
    >
      <div className="sec">
        <div className="eyebrow">
          <span className="l">Operating principles</span>
        </div>
        <h2 className="d two" data-anim="0.85">
          How I work.
        </h2>
      </div>
      <ol className="steps">
        <li>
          <a href="/call">
            <span className="l n">01</span>
            <span className="d two nm">Diagnose</span>
            <span className="s">
              I find the gap between what you built and what buyers actually
              pay for.
            </span>
            <span className="ar" aria-hidden="true">
              &#8594;
            </span>
          </a>
        </li>
        <li>
          <a href="#price">
            <span className="l n">02</span>
            <span className="d two nm">Build</span>
            <span className="s">
              Every engagement ships a named artifact in month one.
            </span>
            <span className="ar" aria-hidden="true">
              &#8594;
            </span>
          </a>
        </li>
        <li>
          <a href="#proof">
            <span className="l n">03</span>
            <span className="d two nm">Position</span>
            <span className="s">
              I stay until the way you describe it sells without me.
            </span>
            <span className="ar" aria-hidden="true">
              &#8594;
            </span>
          </a>
        </li>
      </ol>
    </section>
  );
}
