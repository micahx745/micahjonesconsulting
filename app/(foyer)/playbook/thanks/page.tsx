// app/(foyer)/playbook/thanks/page.tsx
//
// The checkout success page. Chapter 6's one villain is this page
// treated as proof of payment — so it grants nothing and promises
// conditionally: delivery comes from the verified webhook, by email.
// Noindex: nobody should land here from a search result.
import type { Metadata } from "next";

import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  title: "Check your inbox: The 80% Wall",
  robots: { index: false, follow: false },
};

export default function PlaybookThanksPage() {
  return (
    <main className="cw-services cw-playbook" data-section data-world="bone">
      <header className="cw-services__header">
        <p className="cw-services__kicker">The 80% Wall</p>
        <h1 className="cw-services__title">Check your inbox.</h1>
        <p className="cw-services__intro">
          Thank you. Once the payment clears, the book and its companion files
          land in the email you used at checkout, usually within a couple of
          minutes.
        </p>
      </header>

      <section className="cw-pb-sect" aria-labelledby="pb-thanks-title">
        <h2 id="pb-thanks-title" className="cw-pb-h2">
          What arrives
        </h2>
        <p className="cw-pb-sect__lede">
          One email, two attachments: the 69-page PDF and the companion ZIP with
          the prompt files, pre-flight checklists, and spec templates.
        </p>
        <p className="cw-pb-sect__lede">
          Nothing after ten minutes? Check spam first. Still nothing? Write{" "}
          <a href="mailto:micah@micahjonesconsulting.com">
            micah@micahjonesconsulting.com
          </a>{" "}
          and I&rsquo;ll send it by hand.
        </p>
      </section>

      <PageFooter />
    </main>
  );
}
