// components/color-worlds/PromptDiff.tsx
//
// The before-and-after prompt, taken verbatim from the book.
//
// WHY: a skeptical developer deciding on $99 wants to see the craft, not be
// told about it. This is the fastest proof the book has. "make it better" is
// the most recognisable lazy prompt there is; every reader has typed some
// version of it and got back something plausible and wrong.
//
// SOURCE, quoted not paraphrased: product/playbook/src/chapter-02.typ, the
// warstory "Four redesigns in one week" (Entry 2026-08) in chapter two, "The
// spec is the moat". Both strings below appear in that block word for word. If
// the book's wording changes, change it here in the same commit or the page is
// quoting a book that no longer says this.
//
// The detail that makes it land: the redesign in question produced THIS SITE.
// The reader is standing on the artifact. That is stated on the page, because
// it is true and because it is the difference between a claim and a receipt.

export function PromptDiff() {
  return (
    <figure className="cw-diff">
      <figcaption className="cw-diff__cap">
        <span className="cw-diff__eyebrow">
          From chapter two · The spec is the moat
        </span>
        <span className="cw-diff__lede">
          The redesign that produced the page you are reading. Same tool. Same
          week. The sentence was the difference.
        </span>
      </figcaption>

      <div className="cw-diff__grid">
        <div className="cw-diff__col cw-diff__col--before">
          <p className="cw-diff__lbl">Four rounds. All rejected.</p>
          <blockquote className="cw-diff__quote">make it better.</blockquote>
          <p className="cw-diff__note">
            The AI obliged, four different ways, toward four different averages.
          </p>
        </div>

        <div className="cw-diff__col cw-diff__col--after">
          <p className="cw-diff__lbl">Round five. Shipped in two passes.</p>
          <blockquote className="cw-diff__quote">
            nicer than what exists, no cheap gimmicks, photos of real work, keep
            what already worked.
          </blockquote>
          <p className="cw-diff__note">
            A one-line WHAT and a three-item NOT. That is the whole change.
          </p>
        </div>
      </div>
    </figure>
  );
}
