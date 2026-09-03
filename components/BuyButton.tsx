"use client";

// components/BuyButton.tsx
//
// Pass-92. The Stripe rail (app/actions/package-checkout.ts, lib/catalog.ts and
// the webhook) has existed and been test-verified since Pass-61, but nothing
// ever CALLED it: every /packages CTA was a mailto, and the page never said a
// payment step existed. A persona review found the buyer only learns there is a
// checkout on /services/thanks, which they reach AFTER paying. The operator
// confirmed the live key is set on 2026-09-03 and asked for immediate purchase.
//
// The server action returns { ok, url } or { ok:false, error }. It already
// returns a plain-English fallback naming the email address when Stripe is not
// configured, so a missing key degrades to the old path in words rather than a
// dead button. That is the whole reason the error is rendered rather than
// swallowed: the failure mode this replaces was silent.
import { useState, useTransition } from "react";

import { createPackageCheckout } from "@/app/actions/package-checkout";

export function BuyButton({
  skuKey,
  label,
  className = "cw-pkg__cta",
}: {
  skuKey: string;
  label: string;
  className?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function go() {
    setError(null);
    startTransition(async () => {
      const res = await createPackageCheckout(skuKey);
      if (res.ok) {
        window.location.href = res.url;
        return;
      }
      setError(res.error);
    });
  }

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={go}
        disabled={pending}
        aria-busy={pending}
      >
        {pending ? "Opening checkout" : label} <span aria-hidden>&rarr;</span>
      </button>
      {error ? (
        <p className="cw-pkg__cta-error" role="status">
          {error}
        </p>
      ) : null}
    </>
  );
}
