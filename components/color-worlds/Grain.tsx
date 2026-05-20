// components/color-worlds/Grain.tsx
//
// Three-layer printed-on-paper treatment + ink-bleed filter host.
//
//   Layer 1 — coarse paper fiber. feTurbulence 0.04 / 5 octaves.
//             overlay blend, opacity 0.16. "Cold-press paper."
//
//   Layer 2 — fine ink grain. feTurbulence 0.9 / 2 octaves.
//             multiply blend, opacity 0.42. "Laid-down ink, not pixels."
//
//   Layer 3 — halftone dots. CSS radial-gradient, 3px grid.
//             multiply blend, opacity 0.07. "CMYK process print."
//
// Plus the cw-ink-bleed SVG filter — gaussian blur + alpha threshold
// — applied to ONE display headline per page (.cw-bleed). Letters
// look ink-soaked and blobby.
//
// All sized 100%/100% to avoid the 300x150 corner bug.
//
// Server component. The grain layers are decorative.
export function Grain() {
  return (
    <>
      {/* Layer 1 — coarse paper fiber. Overlay blend, opacity 0.16. */}
      <div className="cw-grain cw-grain__coarse" aria-hidden>
        <svg xmlns="http://www.w3.org/2000/svg">
          <filter id="cw-grain-coarse">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves={5}
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#cw-grain-coarse)" />
        </svg>
      </div>

      {/* Layer 2 — fine ink grain. Multiply blend, opacity 0.42. */}
      <div className="cw-grain cw-grain__fine" aria-hidden>
        <svg xmlns="http://www.w3.org/2000/svg">
          <filter id="cw-grain-fine">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={2}
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#cw-grain-fine)" />
        </svg>
      </div>

      {/* Layer 3 — halftone dot pattern. Pure CSS, no SVG. */}
      <div className="cw-grain cw-grain__halftone" aria-hidden />

      {/* Ink-bleed filter host — referenced by .cw-bleed via
          filter:url(#cw-ink-bleed). Zero visual presence by itself. */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", width: 0, height: 0 }}
        aria-hidden
      >
        <filter id="cw-ink-bleed">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 0 1 1 1 1 1 1 1 1" />
          </feComponentTransfer>
        </filter>
      </svg>
    </>
  );
}
