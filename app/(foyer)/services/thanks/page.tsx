// app/(foyer)/services/thanks/page.tsx
//
// Checkout success page for the self-serve packages (Pass-52). Same
// chapter-6 rule as /playbook/thanks: this page proves navigation,
// never payment — it grants nothing and promises conditionally. The
// kickoff email comes from the verified webhook. Noindex.
import type { Metadata } from "next";

import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  title: "Check your inbox — next steps",
  robots: { index: false, follow: false },
};

export default function PackageThanksPage() {
  return (
    <main className="cw-services cw-playbook" data-section data-world="bone">
      <header className="cw-services__header">
        <p className="cw-services__kicker">Packages</p>
        <h1 className="cw-services__title">Check your inbox.</h1>
        <p className="cw-services__intro">
          Thank you. Once the payment clears, your kickoff email lands at the
          address you used at checkout, usually within a couple of minutes.
        </p>
      </header>

      <section className="cw-pb-sect" aria-labelledby="pk-thanks-title">
        <h2 id="pk-thanks-title" className="cw-pb-h2">
          What happens next
        </h2>
        <p className="cw-pb-sect__lede">
          The email has two steps: a few intake questions to answer by reply,
          and the link to put the kickoff call on my real calendar. The book and
          its companion files ride along, included with every package. Work
          starts at kickoff, and the refund rule holds until then: full refund
          any time before the call.
        </p>
        {/* Pass-76. The kickoff link used to exist only inside the email,
            so the most motivated moment a buyer will ever have — the second
            after paying — ended at "go wait for an inbox". The booking system
            that used to sit behind "Contact" lives here now, where a scheduled
            call is genuinely the next step. */}
        <p className="cw-pb-sect__lede">
          <a href="/book/kickoff" className="cw-lede-link">
            <strong>Put the kickoff call on my calendar now</strong>
          </a>{" "}
          if you would rather not wait for the email. Same slots, same
          confirmation, and the intake questions still come by reply.
        </p>
        <p className="cw-pb-sect__lede">
          Nothing after ten minutes? Check spam first. Still nothing? Write{" "}
          <a href="mailto:micah@micahjonesconsulting.com">
            micah@micahjonesconsulting.com
          </a>{" "}
          and I&rsquo;ll sort it by hand.
        </p>
      </section>

      <PageFooter />
    </main>
  );
}
