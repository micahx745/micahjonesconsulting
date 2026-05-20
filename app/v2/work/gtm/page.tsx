// Phase 3 will populate.
import type { Metadata } from "next";
import { Container } from "@/components/v2/primitives/Container";
import { Section } from "@/components/v2/primitives/Section";

export const metadata: Metadata = {
  title: "Tens of millions in revenue — Micah Jones",
  description:
    "Generated at the seam between sales and product. Anonymized engagement.",
};

export default function V2GtmPage() {
  return (
    <Section>
      <Container>
        <p className="text-caption">Case study / 02 — GTM / 2019–present</p>
        <h1 className="text-display-lg">
          Tens of millions in revenue, generated at the seam between sales and
          product.
        </h1>
        <p className="text-body-lg text-secondary">Coming in Phase 3.</p>
      </Container>
    </Section>
  );
}
