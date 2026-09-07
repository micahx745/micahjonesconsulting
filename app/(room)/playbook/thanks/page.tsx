// app/(room)/playbook/thanks/page.tsx
//
// The checkout success page. Chapter 6's one villain is this page
// treated as proof of payment — so it grants nothing and promises
// conditionally: delivery comes from the verified webhook, by email.
// Noindex: nobody should land here from a search result.
//
// PASS-101 PHASE 3. It moved to (room) with /playbook, which it is a step of,
// and takes the system's type and grounds. Every word is the word that was
// here, including the mailto, and it still grants nothing.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check your inbox: The 80% Wall",
  robots: { index: false, follow: false },
};

export default function PlaybookThanksPage() {
  return (
    <section className="rl-wrap rl-first" aria-labelledby="rl-thanks-title">
      <div className="rl-sec rl-sec--wide">
        <div className="rl-eyebrow">
          <span className="rl-l">The 80% Wall</span>
        </div>
        <h1 id="rl-thanks-title" className="rl-d" data-rl="head">
          Check your inbox.
        </h1>
      </div>
      <p className="rl-lede" data-rl="rise">
        Thank you. Once the payment clears, the book and its companion files
        land in the email you used at checkout, usually within a couple of
        minutes.
      </p>

      <div className="rl-two rl-air-l">
        <div className="rl-two__l">
          <h2 className="rl-l" id="pb-thanks-title">
            What arrives
          </h2>
          <p className="rl-body rl-air-s" data-rl="rise">
            One email, two attachments: the 69-page PDF and the companion ZIP
            with the prompt files, pre-flight checklists, and spec templates.
          </p>
          <p className="rl-body rl-air-s" data-rl="rise">
            Nothing after ten minutes? Check spam first. Still nothing? Write{" "}
            <a href="mailto:micah@micahjonesconsulting.com" className="rl-link">
              micah@micahjonesconsulting.com
            </a>{" "}
            and I&rsquo;ll send it by hand.
          </p>
        </div>
      </div>
    </section>
  );
}
