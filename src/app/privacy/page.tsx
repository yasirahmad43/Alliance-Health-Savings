import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What we collect when you use this site, why we collect it, who it is shared with, and how to have it deleted.",
  alternates: { canonical: "/privacy" },
};

const entity = siteConfig.legalName || siteConfig.name;

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      band={{
        src: "/media/photo-privacy.webp",
        alt: "A mother and son reading a picture book on the couch",
        eyebrow: "Your details, your call",
        heading: "Sent to one advisor. Never sold.",
        body: "What you type into the survey goes to a single licensed advisor so they can call you once. It is not sold, rented or auctioned to a list of buyers, and you can ask for it to be deleted.",
      }}
      title="Privacy Policy"
      updated="September 2026"
      intro={`How ${entity} collects, uses, shares and protects the information you give us through ${siteConfig.domain}.`}
    >
      <h2>Who this policy covers</h2>
      <p>
        This policy applies to {entity} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) and
        to the website at {siteConfig.domain}. We are a marketing and referral
        service that connects consumers with licensed insurance agents. We are
        not an insurance company and we do not issue coverage.
      </p>

      <h2>Information we collect</h2>
      <p>
        <strong>Information you give us.</strong> When you complete the coverage
        review on this site we collect the state you live in, how many people in
        your household need coverage, whether anyone in the household has major
        pre-existing conditions that need covering, when you are looking for
        coverage, and your first name, last name, phone number and email
        address. We do not ask for and do not want your Social Security number,
        date of birth, income, banking or payment details, or account
        credentials.
      </p>
      <p>
        <strong>Information collected automatically.</strong> When you arrive we
        record the page you landed on, the referring website, and any campaign
        parameters in the URL (for example utm_source, utm_medium, utm_campaign,
        and click identifiers such as gclid, fbclid, msclkid or ttclid). This is
        stored in your browser&rsquo;s session storage and attached to your
        submission so we understand which of our campaigns is working. We also
        record the IP address a submission comes from, which is used for
        security and abuse prevention.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To pass your request to a licensed insurance advisor who can review it and contact you.</li>
        <li>To respond to you by phone, text or email about health coverage.</li>
        <li>To prevent spam, automated submissions and abuse of the form.</li>
        <li>To measure which marketing channels bring us genuine enquiries.</li>
        <li>To meet our legal and regulatory obligations.</li>
      </ul>

      <h2>The health question</h2>
      <p>
        The survey asks a single yes-or-no question about whether anyone in your
        household has major pre-existing conditions that need to be covered. We
        collect nothing else about your health, we do not ask what the condition
        is, and that answer is used only so the advisor reviewing your request
        understands the situation before calling you.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We share your submission with a licensed insurance agent or agency so
        that they can contact you about coverage. We also use service providers
        who process data on our behalf — website hosting, database storage and
        workflow automation — and they are permitted to use your information
        only to provide those services to us.
      </p>
      <p>
        <strong>We do not sell your personal information, and we do not share
        it with third-party lead buyers or marketing networks.</strong> See our{" "}
        <Link href="/do-not-sell">Do Not Sell My Info</Link> page.
      </p>

      <h2>Consent to be contacted</h2>
      <p>
        By submitting the form you agree that {entity} and its licensed advisors
        may contact you by phone, text or email about health coverage, including
        through automated technology. Consent is not a condition of purchase.
        Message and data rates may apply. You can withdraw consent at any time
        by telling the advisor on the call, replying STOP to a text, or
        contacting us using the details below.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep submission records for as long as needed to service your enquiry
        and to meet legal, regulatory and record-keeping obligations, after
        which they are deleted or anonymized. Campaign attribution stored in
        your browser is cleared when you close the tab.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live you may have the right to request a copy of
        the personal information we hold about you, to have it corrected, to
        have it deleted, and to opt out of its sale or sharing (we do not sell
        or share it in the first place). To exercise any of these, contact us
        using the details below. We will not discriminate against you for
        exercising a privacy right.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        We use browser session storage to remember how you arrived at the site
        so that a submission can be attributed to the right campaign. We may
        also use standard web analytics to understand aggregate traffic. You can
        clear this data at any time through your browser settings; the site
        works normally without it.
      </p>

      <h2>Security</h2>
      <p>
        Submissions are transmitted over an encrypted connection and stored with
        access controls. No method of transmission or storage is completely
        secure, and we cannot guarantee absolute security.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed to children under 13 and we do not knowingly
        collect their personal information. If you believe a child has submitted
        information to us, contact us and we will delete it.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy. The date at the top of this page shows when
        it last changed, and material changes will be posted here.
      </p>

      <h2>Contact</h2>
      <p>
        Questions, requests or complaints about privacy can be sent to us
        through the <Link href="/contact">contact page</Link>
        {siteConfig.email ? `, or by email to ${siteConfig.email}` : ""}.
      </p>
    </LegalPage>
  );
}
