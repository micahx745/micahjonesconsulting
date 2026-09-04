"use client";

// components/PlaybookBuyButton.tsx
//
// Pass-98. A copy of components/BuyButton.tsx, same markup, same classes, no
// new styles. It is a copy rather than a reuse because BuyButton takes a
// `skuKey` and calls createPackageCheckout — the packages rail — and has no
// action prop to point somewhere else. The book has its own action
// (createPlaybookCheckout takes no arguments; the price is the playbook-99
// lookup key), so parameterising BuyButton would mean two rails inside one
// component for one caller each.
//
// The error is RENDERED, not swallowed, for the same reason it is in
// BuyButton: createPlaybookCheckout already returns a plain-English fallback
// naming the email address when Stripe is not configured, so a missing key
// degrades to words rather than a dead button.
//
// Mounted only when PLAYBOOK_ON_SALE is on (lib/playbook-sale.ts).
import { useState, useTransition } from "react";

import { createPlaybookCheckout } from "@/app/actions/playbook-checkout";

export function PlaybookBuyButton({
  label,
  className = "cw-pkg__cta",
}: {
  label: string;
  className?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function go() {
    setError(null);
    startTransition(async () => {
      const res = await createPlaybookCheckout();
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
        {pending ? "Opening checkout" : label}{" "}
        <span className="cw-arr" aria-hidden>
          &rarr;
        </span>
      </button>
      {error ? (
        <p className="cw-pkg__cta-error" role="status">
          {error}
        </p>
      ) : null}
    </>
  );
}
