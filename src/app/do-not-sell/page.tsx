import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Do Not Sell Or Share My Personal Information",
  description:
    "We do not sell or share your personal information. Here is what that means and how to make a request anyway.",
  alternates: { canonical: "/do-not-sell" },
};

const entity = siteConfig.legalName || siteConfig.name;

export default function DoNotSellPage() {
  return (
    <LegalPage
      band={{
        src: "/media/photo-dns.webp",
        alt: "A woman adjusting settings on her phone by a window",
        eyebrow: "Your privacy choices",
        heading: "Opting out takes one request.",
        body: "Tell us you want your information kept out of any sale or share, and that is the end of it. No account, no login and no reason required.",
      }}
      title="Do Not Sell My Info"
      updated="September 2026"
      intro="The short version: we do not sell your personal information, and we do not share it for cross-context behavioral advertising."
    >
      <h2>Our position</h2>
      <p>
        {entity} does not sell your personal information for money or other
        valuable consideration, and does not share it for cross-context
        behavioral advertising, as those terms are used in the California
        Consumer Privacy Act and comparable state privacy laws.
      </p>
      <p>
        Your submission goes to one licensed insurance advisor so that they can
        contact you about coverage — that is a disclosure for the purpose you
        asked for, not a sale. We do not place your details into a lead auction,
        a shared marketing database, or a third-party buyer network.
      </p>

      <h2>Who your information reaches</h2>
      <ul>
        <li>The licensed insurance agent or agency reviewing your request.</li>
        <li>Service providers who host the site, store the record and run our internal workflow, under contracts that only permit them to act on our instructions.</li>
        <li>Anyone we are legally required to disclose to.</li>
      </ul>

      <h2>Making a request anyway</h2>
      <p>
        You can submit an opt-out request even though we do not sell or share
        your information — we will honor it and record it. You may also ask us
        to tell you what we hold about you, to correct it, or to delete it.
      </p>
      <p>
        Send your request through the <Link href="/contact">contact page</Link>
        {siteConfig.email ? ` or by email to ${siteConfig.email}` : ""}, and
        include the name, phone number and email address you used so we can find
        your record. We will respond within the timeframe your state&rsquo;s law
        requires.
      </p>

      <h2>Authorized agents</h2>
      <p>
        You may use an authorized agent to submit a request on your behalf. We
        will ask for proof that you gave the agent permission, and we may ask
        you to verify your own identity directly.
      </p>

      <h2>Verification</h2>
      <p>
        To protect you, we verify requests by matching the details you provide
        against the record we hold. If we cannot verify a request we will tell
        you why rather than acting on it.
      </p>

      <h2>No discrimination</h2>
      <p>
        We will not deny you service, charge you a different price, or give you
        a lower quality of service because you exercised a privacy right.
      </p>

      <h2>Browser signals</h2>
      <p>
        Where required, we treat a Global Privacy Control signal sent by your
        browser as a valid opt-out request for that browser.
      </p>

      <h2>More detail</h2>
      <p>
        The full picture of what we collect and why is in our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
