// components/color-worlds/OrdaniLive.tsx
//
// Pass-12 — "Ember Dusk", built to the workflow's synthesized spec
// (reference dissection of the full Auxon/SyncDepth/Wingly shots +
// live-probed glass recipes: Apple saturate(180%) blur(20), fill alpha
// >= 0.45 over photography, one accent rationed to <= 3 tiny marks).
//
// This component renders the glass column + the raw timer annotation.
// The eyebrow/headline/sub are server markup in page.tsx; the photo is
// the section ground. D-R18 live zone: timer ticks, competitor bar
// grows once on entry, bundle rows stagger in once. Reduced motion:
// entrances land at final state instantly; the timer keeps ticking
// (content, not decoration). aria-hidden on illustrative parts only.
"use client";

import { useEffect, useRef, useState } from "react";

const TIMER_START = 3 * 3600 + 12 * 60 + 44;
const BUNDLE = [
  "Invoicing",
  "Scheduling",
  "Client intake",
  "Birth tracking",
  "Secure messaging",
] as const;

function fmt(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function OrdaniLive() {
  const [seconds, setSeconds] = useState(TIMER_START);
  const [entered, setEntered] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Timer ticks regardless of motion preference — it is content.
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setEntered(true);
      return () => window.clearInterval(t);
    }
    const el = rootRef.current;
    if (!el) {
      setEntered(true);
      return () => window.clearInterval(t);
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es[0]?.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      // 0.4 never fired on mobile where this wrapper spans photo +
      // cards (caught by screenshot: cards held at opacity 0). 0.12 of a
      // tall element is still an intentional scroll-into-view.
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => {
      window.clearInterval(t);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`cw-ember__ui${entered ? " is-in" : ""}`}
    >
      {/* Timer annotation — raw on the water, dashed leader toward her
          hands. The section's second saffron mark. */}
      <p className="cw-ember__timer" aria-label="Live activity: an active birth is being tracked">
        <span className="cw-ember__dot" aria-hidden />
        <span className="cw-ember__timerlbl">Active birth</span>
        <span className="cw-ember__digits">{fmt(seconds)}</span>
      </p>

      {/* GLASS COLUMN */}
      <div className="cw-ember__col" aria-hidden>
        {/* Card A — the 0% panel */}
        <div className="cw-ember__glass cw-ember__card" style={{ "--card-i": 0 } as React.CSSProperties}>
          <p className="cw-ember__cardtitle">What the platform takes</p>
          <p className="cw-ember__stat">
            <span className="cw-ember__num">0%</span>
            <span className="cw-ember__numlbl">invoicing fee</span>
          </p>
          <div className="cw-ember__bars">
            <div className="cw-ember__barrow">
              <span className="cw-ember__barlbl">Other platforms</span>
              <span className="cw-ember__track">
                <span className="cw-ember__fill" />
              </span>
              <span className="cw-ember__barval">17–20%</span>
            </div>
            <div className="cw-ember__barrow">
              <span className="cw-ember__barlbl">Ordani</span>
              <span className="cw-ember__track">
                <span className="cw-ember__origin" />
              </span>
              <span className="cw-ember__barval cw-ember__barval--strong">0%</span>
            </div>
          </div>
          <p className="cw-ember__caption">Doulas keep thousands more a year.</p>
        </div>

        {/* Card B — the bundle panel */}
        <div className="cw-ember__glass cw-ember__card" style={{ "--card-i": 1 } as React.CSSProperties}>
          <div className="cw-ember__cardhead">
            <p className="cw-ember__cardtitle">One login</p>
            <span className="cw-ember__chip">HIPAA</span>
          </div>
          <p className="cw-ember__stat">
            <span className="cw-ember__num cw-ember__num--sm">$200–500</span>
            <span className="cw-ember__numlbl">of software, bundled</span>
          </p>
          <ul className="cw-ember__list">
            {BUNDLE.map((item, i) => (
              <li
                key={item}
                className="cw-ember__row"
                style={{ "--row-i": i } as React.CSSProperties}
              >
                <span className="cw-ember__marker" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Card C — opaque bone, the conversion point, overhangs the
            canvas bottom (the one sanctioned frame-break). */}
        <a
          href="/work/ordani"
          className="cw-ember__card cw-ember__cta"
          style={{ "--card-i": 2 } as React.CSSProperties}
        >
          See how it was built
          <span className="cw-ember__arr" aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
