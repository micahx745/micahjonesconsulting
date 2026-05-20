// components/v3/specimen/Colophon.tsx
//
// Foot-of-page colophon — the technical specifications of the site
// itself. Real font credits, real designer attributions, actual hex
// codes used, the grid base, the build stack. This is the OPPOSITE of
// a marketing footer; it's an honest accounting of the materials.
export function Colophon() {
  return (
    <footer className="v3-colophon">
      <div className="v3-colophon__inner">
        <p className="v3-colophon__lede">
          Hand-set 2026 by Micah Jones in Oakland, California.
        </p>
        <dl className="v3-colophon__grid">
          <div className="v3-colophon__pair">
            <dt>Display</dt>
            <dd>Inter Display by Rasmus Andersson</dd>
          </div>
          <div className="v3-colophon__pair">
            <dt>Body</dt>
            <dd>Inter by Rasmus Andersson</dd>
          </div>
          <div className="v3-colophon__pair">
            <dt>Serif</dt>
            <dd>
              Source Serif 4 by Frank Grießhammer at Adobe
            </dd>
          </div>
          <div className="v3-colophon__pair">
            <dt>Ground</dt>
            <dd>#F5EFE4 paper</dd>
          </div>
          <div className="v3-colophon__pair">
            <dt>Ink</dt>
            <dd>#1A1816</dd>
          </div>
          <div className="v3-colophon__pair">
            <dt>Accent</dt>
            <dd>#BD5A2D copper</dd>
          </div>
          <div className="v3-colophon__pair">
            <dt>Grid</dt>
            <dd>32px baseline / 4px unit</dd>
          </div>
          <div className="v3-colophon__pair">
            <dt>Body measure</dt>
            <dd>68ch</dd>
          </div>
          <div className="v3-colophon__pair">
            <dt>Stack</dt>
            <dd>Next.js 16 · Tailwind v4 · MDX</dd>
          </div>
        </dl>
        <p className="v3-colophon__mailto">
          Correspondence:{" "}
          <a href="mailto:hello@micahjonesconsulting.com">
            hello@micahjonesconsulting.com
          </a>
        </p>
      </div>
    </footer>
  );
}
