"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import SurveyCTA from "@/components/SurveyCTA";

const ROWS = [
  { feature: "Monthly premium", marketplace: "$750/mo", brand: "$300/mo" },
  { feature: "Deductible", marketplace: "$5,000–$9,000+", brand: "As low as $0" },
  { feature: "Telemedicine", marketplace: "~$50 a visit", brand: "Often $0" },
  { feature: "Doctor & specialist visits", marketplace: "$50+ copays", brand: "Low or $0 copays" },
  { feature: "Out-of-pocket max", marketplace: "$18,000+", brand: "~$3,000" },
  { feature: "Co-insurance", marketplace: "Often 40% on you", brand: "Up to 100% covered" },
  { feature: "Doctor networks", marketplace: "Narrow local HMOs", brand: "Broad nationwide PPOs" },
  { feature: "Enrollment window", marketplace: "6 weeks a year", brand: "Any day of the year" },
];

function Bar({ pct, accent }: { pct: number; accent: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-brand-tint">
      <motion.div
        className={`h-full rounded-full ${accent ? "bg-brand-accent" : "bg-white"}`}
        initial={reduced ? { width: `${pct}%` } : { width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
      />
    </div>
  );
}

function BrandTag({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white">
        <Image
          src={siteConfig.brand.mark}
          alt=""
          width={256}
          height={256}
          className="size-5"
        />
      </span>
      <span className="font-semibold">{siteConfig.name}</span>
    </span>
  );
}

const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export default function HonestComparison() {
  return (
    <section className="section tone-light bg-brand-canvas">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">The Honest Comparison</span>
          <h2 className="mt-5 text-4xl text-brand-primary sm:text-5xl lg:text-[3.5rem]">
            Stop overpaying for coverage that{" "}
            <span className="text-brand-accent">barely covers you.</span>
          </h2>
          <p className="lede mx-auto mt-5 max-w-2xl">
            Here is the same healthy applicant, priced two ways. We are not
            hiding the trade-offs — if a subsidized Marketplace plan is cheaper
            for you, an advisor will tell you that on the call.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
          {/* ----- Left card: the price duel ----- */}
          <div className="card flex flex-col p-6 sm:p-9">
            <h3 className="text-2xl text-brand-primary">What people actually pay</h3>

            <div className="mt-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="text-[16px] font-semibold text-brand-ink">Typical Marketplace</span>
                <span className="tabular font-display text-3xl font-bold text-brand-ink">
                  $750<span className="text-base font-medium text-brand-ink/55">/mo</span>
                </span>
              </div>
              <Bar pct={100} accent={false} />
              <p className="mt-2.5 text-[13.5px] leading-snug text-brand-ink/60">
                Unsubsidized bronze-tier premium, $5,000+ deductible.
              </p>
            </div>

            <div className="my-6">
              <div className="flex items-center gap-4" aria-hidden="true">
                <span className="h-px flex-1 bg-brand-rule" />
                <span className="rounded-full bg-brand-tint px-3 py-1 text-[12px] font-semibold text-brand-primary">vs</span>
                <span className="h-px flex-1 bg-brand-rule" />
              </div>
              <p className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-brand-accent-wash px-4 py-3 text-center text-[13.5px] font-semibold leading-snug text-brand-accent ring-1 ring-inset ring-brand-accent/15 sm:text-[14.5px]">
                <Check className="size-4 shrink-0" />
                Pre-existing conditions covered
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <BrandTag className="text-[16px] text-brand-primary" />
                <span className="tabular font-display text-3xl font-bold text-brand-accent">
                  $300<span className="text-base font-medium text-brand-ink/55">/mo</span>
                </span>
              </div>
              <Bar pct={40} accent />
              <p className="mt-2.5 text-[13.5px] leading-snug text-brand-ink/60">
                Underwritten PPO coverage for a healthy applicant.
              </p>
            </div>

            <div className="mt-auto pt-8">
              <div className="rounded-2xl bg-brand-primary-strong p-6 text-white ring-1 ring-white/10">
                <p className="font-display text-xl font-semibold leading-snug sm:text-[1.4rem]">
                  Save ~$450/mo — that&rsquo;s over $5,400 a year back in your pocket.
                </p>
              </div>
              <p className="mt-4 text-[12px] leading-relaxed text-brand-ink/50">
                Actual premiums, deductibles
                and benefits vary by age, location, health history and the plan
                selected.
              </p>
            </div>
          </div>

          {/* ----- Right card: the feature table ----- */}
          <div className="card flex flex-col p-6 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl text-brand-primary">Line by line</h3>
              <span className="rounded-full bg-brand-accent px-3 py-1 text-[12px] font-semibold text-white">
                Best Value
              </span>
            </div>

            {/* Desktop: a real table. */}
            <table className="mt-6 hidden w-full border-collapse text-[14.5px] sm:table">
              <thead>
                <tr className="border-b border-brand-rule-strong">
                  <th scope="col" className="w-[34%] py-3 pr-3 text-left text-[13px] font-semibold text-brand-ink/55">
                    Feature
                  </th>
                  <th scope="col" className="w-[30%] py-3 pr-3 text-left text-[13px] font-semibold text-brand-ink/55">
                    Marketplace
                  </th>
                  <th scope="col" className="py-3 text-left">
                    <BrandTag className="text-[13px] text-brand-primary" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.feature} className="border-b border-brand-rule align-top last:border-b-0">
                    <th scope="row" className="py-3.5 pr-3 text-left font-medium text-brand-ink">
                      {r.feature}
                    </th>
                    <td className="tabular py-3.5 pr-3 text-brand-ink/60">{r.marketplace}</td>
                    <td className="tabular py-3.5 font-semibold text-brand-primary">
                      <span className="inline-flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-accent" />
                        {r.brand}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Phone: stacked feature rows — the table never forces overflow. */}
            <ul className="mt-6 divide-y divide-brand-rule sm:hidden">
              {ROWS.map((r) => (
                <li key={r.feature} className="py-3.5">
                  <p className="text-[14px] font-semibold text-brand-ink">{r.feature}</p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-brand-canvas px-3 py-2">
                      <p className="text-[11.5px] font-medium text-brand-ink/50">Marketplace</p>
                      <p className="tabular mt-0.5 text-sm text-brand-ink/70">{r.marketplace}</p>
                    </div>
                    <div className="rounded-xl bg-brand-accent-wash px-3 py-2">
                      <p className="text-[11.5px] font-medium text-brand-accent">Us</p>
                      <p className="tabular mt-0.5 text-sm font-semibold text-brand-primary">{r.brand}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <SurveyCTA formLocation="home-honest-comparison" className="btn-primary w-full sm:w-auto">
                Find My Plan
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </SurveyCTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
