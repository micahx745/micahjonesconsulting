// lib/catalog.ts — the single source of truth for everything sold on
// this site. Stripe lookup keys, checkout metadata tags, prices, and
// the per-SKU delivery shape all read from here; a price change
// touches this file, the /services cards, PACKAGES_LD, and the Stripe
// catalog (scripts/stripe-setup.mjs re-run), same commit
// (docs/PACKAGES-RUNBOOK.md rule).
//
// Two delivery kinds:
// - "book": the file drop (book PDF + companion ZIP), lib/playbook-delivery.ts
// - "package": the kickoff email (intake + /book scheduling + the same
//   files, included with every package), lib/package-delivery.ts

export interface Sku {
  /** Stripe price lookup key AND the checkout metadata.product tag. */
  lookupKey: string;
  name: string;
  /** Cents. */
  amount: number;
  kind: "book" | "package";
  /** Stripe product description (shown on the hosted checkout page). */
  description: string;
  /** Package-only: intake questions for the kickoff email. */
  intake?: string[];
}

export const SKUS: Record<string, Sku> = {
  "playbook-99": {
    lookupKey: "playbook-99",
    name: "The 80% Wall",
    amount: 9900,
    kind: "book",
    description:
      "A field manual for solo builders: the 68-page PDF plus the companion files, delivered by email.",
  },
  "unstick-500": {
    lookupKey: "unstick-500",
    name: "The Unstick Session",
    amount: 50000,
    kind: "package",
    description:
      "90 minutes live on your stuck build plus a same-day written fix plan. Kickoff scheduling by email after checkout.",
    intake: [
      "What's stuck, in your own words?",
      "Links: repo, host, or the live app (whatever you can share).",
    ],
  },
  "audit-2500": {
    lookupKey: "audit-2500",
    name: "The Audit",
    amount: 250000,
    kind: "package",
    description:
      "Two-week fixed-scope audit (Build, Production, or Traction): written memo, prioritized fix sequence, one-hour debrief.",
    intake: [
      "Your app: what it is, who it's for, where it stands.",
      "Links: repo, live app, site (whatever the flavor needs).",
      "What does a win look like two weeks from now?",
    ],
  },
  "sprint-7500": {
    lookupKey: "sprint-7500",
    name: "The Sprint",
    amount: 750000,
    kind: "package",
    description:
      "One week embedded on one outcome, shipped. Kickoff scheduling by email after checkout.",
    intake: [
      "The one outcome you want shipped by the end of the week.",
      "Links and access: repo, host, anything the work needs.",
      "Anything I must not touch or change while in there?",
    ],
  },
};

export const PACKAGE_SKUS = Object.values(SKUS).filter(
  (s) => s.kind === "package",
);

/** The Audit's flavor choice, captured as a Stripe custom field. */
export const AUDIT_FLAVORS = ["Build", "Production", "Traction"] as const;
