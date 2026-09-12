"use client";

// components/color-worlds/PackageBand.tsx
//
// Pass-111b (decision 3: wire the area through). The package area
// picker, the three package boxes and the band footer row, one client
// component. The pick is authoritative: it travels as Stripe
// metadata.area through createPackageCheckout, so a picked buyer never
// answers the question twice, and an unpicked buyer gets the same
// question at checkout as a required dropdown (every package SKU, not
// only the Audit).
//
// Native radio semantics give the APG keyboard model: Tab enters the
// group on the checked option (or the first), arrows move and check,
// Space checks. The pick swaps copy instantly — no transition, no
// reveal (this page has zero animation beyond the palette shift).
//
// The guard: BuyButton calls it before the server action. With no
// pick it sets the error text, focuses the first radio (native scroll
// into view; no Lenis call) and returns false. No modal. The error
// <p> is always in the DOM with empty text (CRITIQUE LOW-5); the
// polite region announces the swap, the alert announces the block.
import { useEffect, useRef, useState } from "react";

import { BuyButton } from "@/components/BuyButton";
import { PriceBox } from "@/components/color-worlds/PriceBox";
import { AREAS, areaLabel, isAreaValue, type AreaValue } from "@/lib/catalog";

const UNSTICK_LIST = [
  "A written fix plan: what is wrong, in the order to fix it, and for builds the prompts to fix it with.",
  "The call is recorded and the recording comes with the plan.",
  "One follow-up question by email within 7 days.",
];

const AUDIT_LIST = [
  "An 8-10 page memo: what works, what is broken, and what to fix first.",
  "A prioritized fix sequence, so you can start the morning it lands.",
  "A one-hour debrief call where I walk you through it, and a 30-day follow-up call after. You keep the memo either way.",
];

const SPRINT_LIST = [
  "One outcome, agreed by email before day one.",
  "Daily progress notes and a mid-week check-in call.",
  "The work lands in your repo and tools, with a handover note.",
  "A debrief and a map of the next steps.",
];

// The fit sentence per pick: none / production / build / traction.
const UNSTICK_FIT: Record<AreaValue | "none", string> = {
  none: "Ninety minutes live on whatever is stuck. You leave with a written plan the same day.",
  production:
    "Ninety minutes live on your AI stack. You leave with a written plan the same day.",
  build:
    "Ninety minutes live on your stuck build. You leave with a written plan the same day.",
  traction:
    "Ninety minutes live on your positioning. You leave with a written plan the same day.",
};
const AUDIT_FIT: Record<AreaValue | "none", string> = {
  none: "I go through your AI stack, your build, or your positioning top to bottom.",
  production:
    "I go through your AI stack, from the notebook to production, top to bottom.",
  build: "I go through your architecture, code, and deploy top to bottom.",
  traction: "I go through your positioning and go-to-market top to bottom.",
};
const SPRINT_FIT: Record<AreaValue | "none", string> = {
  none: "One week on one outcome, shipped. Not a plan. The thing, done.",
  production:
    "One week on the production push, shipped. Not a plan. The thing, done.",
  build: "One week on the feature, shipped. Not a plan. The thing, done.",
  traction:
    "One week on the repositioning, shipped. Not a plan. The thing, done.",
};

export function PackageBand() {
  const [area, setArea] = useState<AreaValue | null>(null);
  const [error, setError] = useState("");
  const [polite, setPolite] = useState("");
  const firstRadioRef = useRef<HTMLInputElement>(null);

  // On mount, a valid ?area= preselects (the shared index and the
  // packages page can deep-link a pick).
  useEffect(() => {
    const v = new URLSearchParams(location.search).get("area");
    if (isAreaValue(v)) setArea(v);
  }, []);

  function onChange(v: string) {
    if (!isAreaValue(v)) return;
    setArea(v);
    history.replaceState(null, "", `?area=${v}#packages`);
    setPolite(`Packages now show ${areaLabel(v)}.`);
    setError("");
  }

  // The BuyButton guard: block checkout with a visible, announced
  // error and focus on the picker until an area is picked.
  function guard() {
    if (area === null) {
      setError("Pick an area first, then buy.");
      firstRadioRef.current?.focus();
      return false;
    }
    return true;
  }

  const fitKey: AreaValue | "none" = area ?? "none";
  const label = area ? areaLabel(area) : null;

  return (
    <>
      <fieldset className="cw-pick">
        <legend className="cw-pick__legend">
          Pick the area first. A package covers one.
        </legend>
        <div className="cw-pick__opts">
          {AREAS.map((a, i) => (
            <label key={a.value} className="cw-pick__opt">
              <input
                ref={i === 0 ? firstRadioRef : undefined}
                type="radio"
                name="pkg-area"
                value={a.value}
                checked={area === a.value}
                onChange={() => onChange(a.value)}
              />
              <span>{a.label}</span>
            </label>
          ))}
        </div>
        <p className="cw-pick__err" role="alert">
          {error}
        </p>
        <p className="cw-sr-only" aria-live="polite">
          {polite}
        </p>
      </fieldset>

      <div className="cw-pband cw-pband--pkgs">
        <PriceBox
          as="h3"
          id="pkg-unstick"
          name="The Unstick Session"
          price={{ fig: "$500" }}
          term="90 minutes · same-day plan"
          fit={UNSTICK_FIT[fitKey]}
          list={UNSTICK_LIST}
          area={
            label ? (
              <>
                Covers: <strong>{label}</strong>.
              </>
            ) : undefined
          }
          cta={
            <BuyButton
              skuKey="unstick-500"
              label="Buy the Unstick Session"
              className="cw-buy cw-buy--quiet"
              area={area ?? undefined}
              guard={guard}
            />
          }
        />
        <PriceBox
          as="h3"
          id="pkg-audit"
          lead
          tag="Start here"
          name="The Audit"
          price={{ fig: "$2,500" }}
          term="Two weeks · starts within the week"
          fit={AUDIT_FIT[fitKey]}
          list={AUDIT_LIST}
          area={
            label ? (
              <>
                Covers: <strong>{label}</strong>.
              </>
            ) : undefined
          }
          cta={
            <BuyButton
              skuKey="audit-2500"
              label="Buy the Audit"
              className="cw-buy"
              area={area ?? undefined}
              guard={guard}
            />
          }
        />
        <PriceBox
          as="h3"
          id="pkg-sprint"
          name="The Sprint"
          price={{ fig: "$7,500" }}
          term="One week · embedded"
          fit={SPRINT_FIT[fitKey]}
          list={SPRINT_LIST}
          area={
            label ? (
              <>
                Covers: <strong>{label}</strong>.
              </>
            ) : undefined
          }
          cta={
            <BuyButton
              skuKey="sprint-7500"
              label="Buy the Sprint"
              className="cw-buy cw-buy--quiet"
              area={area ?? undefined}
              guard={guard}
            />
          }
        />
      </div>

      <p className="cw-pband__foot">
        The moment your card clears you get a kickoff email: the intake
        questions and a link to book the call. Every fee credits toward the next
        package, or toward an engagement started within 60 days. Full refund any
        time before kickoff, none after. I reply within one business day.{" "}
        <a href="/packages" className="cw-mlink">
          Full details on the packages page <span aria-hidden>→</span>
        </a>
      </p>
    </>
  );
}
