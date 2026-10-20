import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that apply when you use this website and submit a request for a coverage review.",
  alternates: { canonical: "/terms" },
};

const entity = siteConfig.legalName || siteConfig.name;

export default function TermsPage() {
  return (
    <LegalPage
      band={{
        src: "/media/photo-terms.webp",
        alt: "Hands holding a pen over a document on a wooden desk",
        eyebrow: "Plain terms",
        heading: "A referral service, not an insurer.",
        body: "We connect you with a licensed advisor. We do not issue policies, set premiums or decide eligibility — the carrier does that, after a real application.",
      }}
      title="Terms of Use"
      updated="September 2026"
      intro={`The agreement between you and ${entity} when you use ${siteConfig.domain}.`}
    >
      <h2>Acceptance</h2>
      <p>
        By accessing or using {siteConfig.domain} you agree to these terms. If
        you do not agree, please do not use the site.
      </p>

      <h2>What this site is</h2>
      <p>
        {entity} is a marketing and referral service. We connect consumers with
        licensed insurance agents. We are not an insurance company, an insurance
        carrier, or a government agency, and we are not affiliated with,
        endorsed by, or acting on behalf of the federal or any state health
        insurance Marketplace, Medicare, or Medicaid.
      </p>

      <h2>No offer of coverage</h2>
      <p>
        Nothing on this site is an offer, solicitation or binding of insurance.
        Submitting the coverage review form is not an application for insurance
        and does not guarantee eligibility, approval, a rate, or the
        availability of any plan. Plans described on this site are medically
        underwritten private plans, may not be available in every state, and not
        all applicants will qualify. Any coverage is issued solely by the
        insurance carrier, subject to its underwriting and the terms of the
        policy it issues.
      </p>

      <h2>Figures on this site</h2>
      <p>
        Premiums, deductibles, savings figures, comparison tables and the
        interactive explorer on this site are for general education. They
        are not your rate. Actual premiums, deductibles, benefits and
        out-of-pocket costs vary by age, location, household size, health
        history and the plan selected.
      </p>

      <h2>No professional advice</h2>
      <p>
        The content here is general information. It is not medical, legal, tax
        or individualized insurance advice. Specific plan recommendations come
        from a licensed insurance advisor, not from this website.
      </p>

      <h2>Your obligations</h2>
      <ul>
        <li>Provide accurate information about yourself, and do not submit anyone else&rsquo;s details without their permission.</li>
        <li>Use the site only for lawful purposes and only for your own genuine enquiry.</li>
        <li>Do not submit automated, bulk or fraudulent requests, attempt to probe or breach the site&rsquo;s security, scrape its content, or interfere with its operation.</li>
        <li>Do not copy, republish or resell the site&rsquo;s content without written permission.</li>
      </ul>

      <h2>Contact consent</h2>
      <p>
        When you submit the form you agree that {entity} and its licensed
        advisors may contact you by phone, text or email, including through
        automated technology. Consent is not a condition of purchase. Message
        and data rates may apply. You may withdraw consent at any time — see the{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The site design, text, graphics, logos and marks are owned by {entity}{" "}
        or used with permission and are protected by applicable law.
      </p>

      <h2>Third-party links</h2>
      <p>
        Where we link to another site — a carrier, a government resource, or a
        service provider — we do not control it and are not responsible for its
        content, accuracy or privacy practices.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
        without warranties of any kind, express or implied, including any
        warranty of merchantability, fitness for a particular purpose, accuracy
        or non-infringement. We do not warrant that the site will be
        uninterrupted or error-free.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {entity} is not liable for any
        indirect, incidental, special, consequential or punitive damages, or any
        loss of profits, data or goodwill, arising out of your use of this site
        or your reliance on any information in it.
      </p>

      <h2>Indemnity</h2>
      <p>
        You agree to indemnify and hold {entity} harmless from claims arising
        out of your misuse of the site or your breach of these terms.
      </p>

      <h2>Changes and termination</h2>
      <p>
        We may modify these terms or the site at any time. Continued use after a
        change means you accept the revised terms. We may suspend or terminate
        access to anyone who misuses the site.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the state in which {entity} is
        organized, without regard to conflict-of-laws rules.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent through the{" "}
        <Link href="/contact">contact page</Link>
        {siteConfig.email ? `, or by email to ${siteConfig.email}` : ""}.
      </p>
    </LegalPage>
  );
}
