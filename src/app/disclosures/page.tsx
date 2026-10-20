import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Disclosures",
  description:
    "Who we are, how we are paid, what the figures on this site mean, and what we are not.",
  alternates: { canonical: "/disclosures" },
};

const entity = siteConfig.legalName || siteConfig.name;

export default function DisclosuresPage() {
  return (
    <LegalPage
      band={{
        src: "/media/photo-disclosures.webp",
        alt: "An older couple reviewing paperwork together at home",
        eyebrow: "How we work",
        heading: "Your real price comes from a carrier.",
        body: "Premiums and benefits depend on age, location, health history and the plan selected. Nothing on this site is an offer of coverage, and nothing is decided until a carrier underwrites an application.",
      }}
      title="Disclosures"
      updated="September 2026"
      intro="The things you are entitled to know before you take advice from anyone — including us."
    >
      <h2>We are not an insurance company</h2>
      <p>
        {entity} is a marketing and referral service that connects consumers
        with licensed insurance agents. We do not underwrite policies, we do not
        decide who qualifies for coverage, and we do not issue or bind
        insurance. Any policy is issued by the insurance carrier under its own
        underwriting standards and policy terms.
      </p>

      <h2>We are not affiliated with any government program</h2>
      <p>
        We are not affiliated with, endorsed by, or acting on behalf of any
        government agency, the federal or any state health insurance
        Marketplace, Medicare, or Medicaid. If you are looking for the official
        federal Marketplace, it is at HealthCare.gov. If you want to check
        Medicaid eligibility, your state Medicaid agency is the authority.
      </p>

      <h2>How we are paid</h2>
      <p>
        You are never charged a fee for the coverage review. If you enroll in a
        plan through a licensed advisor, the insurance carrier pays that advisor
        a commission. That commission does not increase the premium you pay for
        the plan. We tell you this because anyone giving you advice about money
        should tell you how they make theirs.
      </p>

      <h2>Figures on this site</h2>
      <p>
        The comparison figures, the monthly premiums, the deductible ranges, the
        savings callouts and the interactive explorer are for general education.
        They are not your rate and they are not an offer. Actual premiums,
        deductibles, benefits and out-of-pocket costs vary by age, location,
        household size, health history and the plan selected, and are determined
        only when a carrier underwrites an actual application.
      </p>

      <h2>Private plans are medically underwritten</h2>
      <p>
        The private PPO plans discussed on this site are medically underwritten.
        That means the carrier asks health questions and may decline an
        applicant, price the policy differently, or exclude a condition. This is
        the central difference between these plans and guaranteed-issue ACA
        Marketplace coverage, and it is why private coverage is not the right
        route for everyone. Plans may not be available in every state and not
        all applicants will qualify.
      </p>

      <h2>When something else is better</h2>
      <p>
        If you qualify for Medicaid, Medicaid will almost always cost you less.
        If your household income puts you in range of a substantial ACA premium
        tax credit, a subsidized Marketplace plan is usually cheaper than any
        private plan. If you are in the middle of treatment for a serious
        condition, staying on an employer plan or COBRA often protects
        continuity of care in a way a newly underwritten policy will not. Our
        advisors are instructed to tell you so. See the{" "}
        <Link href="/compare">comparison pages</Link> for the detail.
      </p>

      <h2>Licensing</h2>
      <p>
        Coverage is discussed and sold only by advisors licensed in your state.
        {siteConfig.npn
          ? ` National Producer Number: ${siteConfig.npn}.`
          : " Licensing details for the advisor you speak with are available on request, and you can verify any producer through your state department of insurance."}
      </p>

      <h2>No professional advice</h2>
      <p>
        Nothing on this site is medical, legal or tax advice. Plan-specific
        recommendations come from a licensed insurance advisor after reviewing
        your actual situation.
      </p>

      <h2>Questions</h2>
      <p>
        If anything here is unclear, ask us through the{" "}
        <Link href="/contact">contact page</Link>. See also our{" "}
        <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/terms">Terms of Use</Link>.
      </p>
    </LegalPage>
  );
}
