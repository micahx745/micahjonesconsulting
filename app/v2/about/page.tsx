// Phase 4 will populate.
import type { Metadata } from "next";
import { Container } from "@/components/v2/primitives/Container";
import { Section } from "@/components/v2/primitives/Section";

export const metadata: Metadata = {
  title: "About — Micah Jones",
  description:
    "Oakland-based operator. Sales-product hybrid. Half consulting, half product.",
};

export default function V2AboutPage() {
  return (
    <Section>
      <Container>
        <p className="text-caption">About</p>
        <h1 className="text-display-lg">
          I work at the seam between sales and product.
        </h1>
        <p className="text-body-lg text-secondary">Coming in Phase 4.</p>
      </Container>
    </Section>
  );
}
