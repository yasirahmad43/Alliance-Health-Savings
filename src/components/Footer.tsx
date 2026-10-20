import Image from "next/image";
import Link from "next/link";
import SurveyCTA from "@/components/SurveyCTA";
import { siteConfig } from "@/lib/site-config";
import { comparisons } from "@/data/comparisons";

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Disclosures", href: "/disclosures" },
  { label: "Do Not Sell My Info", href: "/do-not-sell" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-primary-strong text-white">
      {/* The one-advisor promise, repeated directly above the footer. */}
      <div className="border-b border-white/15 bg-brand-primary">
        <p className="mx-auto flex max-w-4xl items-start justify-center gap-2.5 px-4 py-5 text-center text-sm font-semibold leading-relaxed">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="mt-0.5 size-5 shrink-0 text-white" aria-hidden="true">
            <path d="M6 11h12v9H6zM9 11V8a3 3 0 0 1 6 0v3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Secure &amp; private. By submitting you agree to be contacted by one
          licensed advisor.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="inline-block rounded-2xl bg-white px-4 py-3">
              <Image
                src={siteConfig.brand.logo}
                alt={siteConfig.name}
                width={1340}
                height={343}
                className="h-9 w-auto"
              />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Private PPO health coverage reviewed by a licensed advisor —
              available any day of the year, with pre-existing conditions
              covered. Real options. Real advisors. Zero pressure.
            </p>
            {siteConfig.showPhone && siteConfig.phoneTel && (
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="mt-4 inline-block font-display text-xl font-bold text-white hover:text-white/80"
              >
                {siteConfig.phoneDisplay}
              </a>
            )}
            {siteConfig.email && (
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-2 block break-all text-sm text-white/75 hover:text-white"
              >
                {siteConfig.email}
              </a>
            )}
            {siteConfig.hours && (
              <p className="mt-1 text-sm text-white/60">{siteConfig.hours}</p>
            )}
          </div>

          <nav aria-label="Compare">
            <h2 className="text-[15px] font-semibold text-white">Compare</h2>
            <ul className="mt-2 text-sm">
              {comparisons.map((c) => (
                <li key={c.slug}>
                  <Link href={`/compare/${c.slug}`} className="inline-flex min-h-11 items-center text-white/75 hover:text-white">
                    {c.navTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-[15px] font-semibold text-white">Company</h2>
            <ul className="mt-2 text-sm">
              <li><Link href="/about" className="inline-flex min-h-11 items-center text-white/75 hover:text-white">About</Link></li>
              <li><Link href="/contact" className="inline-flex min-h-11 items-center text-white/75 hover:text-white">Contact</Link></li>
              <li><Link href="/states" className="inline-flex min-h-11 items-center text-white/75 hover:text-white">Coverage by state</Link></li>
              <li><Link href="/find-my-plans" className="inline-flex min-h-11 items-center text-white/75 hover:text-white">Start a free review</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="text-[15px] font-semibold text-white">Service area</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              {siteConfig.serviceArea}. Plan availability, premiums and benefits
              vary by state, age, household size and health history.
            </p>
            <SurveyCTA formLocation="footer-cta" className="btn-primary mt-5">
              Review My Plan
            </SurveyCTA>
          </div>
        </div>

        {/* Disclosure */}
        <div className="mt-12 border-t border-white/15 pt-8 text-[12.5px] leading-relaxed text-white/60">
          <p>
            {siteConfig.legalName || siteConfig.name} is not an insurance company
            and is not affiliated with, endorsed by, or acting on behalf of any
            government agency, the federal or any state health insurance
            Marketplace, Medicare, or Medicaid. We are a marketing and referral
            service that connects consumers with licensed insurance agents.
            Submitting your information does not constitute an application for
            coverage and does not guarantee eligibility, approval, a rate, or the
            availability of any plan. Actual premiums, deductibles, benefits
            and out-of-pocket costs vary by age, location, household size, health
            history and the plan selected. Plans described are medically
            underwritten private plans and may not be available in every state.
            Not all applicants will qualify. This site does not provide medical,
            legal, or tax advice.
            {siteConfig.npn ? ` National Producer Number: ${siteConfig.npn}.` : ""}
          </p>
        </div>

        {/* Legal links row */}
        <div className="mt-8 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-5 text-[13px]">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center text-white/70 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-[13px] text-white/50">
              © {year} {siteConfig.legalName || siteConfig.name}. All rights reserved.
            </p>
            <a
              href="https://d1techcreative.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-[13px] text-white/50 hover:text-white/80"
            >
              Powered by
              <Image
                src="/brand/d1-logo-white.png"
                alt="D1 Tech Creative"
                width={2079}
                height={501}
                className="h-[26px] w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
