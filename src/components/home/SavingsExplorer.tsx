"use client";

import { useState } from "react";
import SurveyCTA from "@/components/SurveyCTA";

/**
 * Educational only. This is a teaching tool that shows which variables move
 * the cost of coverage — it is not a price, a rate, or an eligibility decision,
 * and every label on screen says so.
 */

type Choice = { value: string; label: string; note: string; factor: number };

const AGE: Choice[] = [
  { value: "u30", label: "Under 30", note: "Lowest age band — the widest spread between plan types.", factor: 0.72 },
  { value: "30s", label: "30s", note: "Premiums start climbing with each birthday, on both sides.", factor: 0.88 },
  { value: "40s", label: "40s", note: "Where underwriting questions start to matter more than age alone.", factor: 1 },
  { value: "50s", label: "50s", note: "The steepest Marketplace age curve — and often the biggest gap.", factor: 1.32 },
];

const HOUSEHOLD: Choice[] = [
  { value: "1", label: "Just me", note: "One applicant, one underwriting review.", factor: 1 },
  { value: "2", label: "Two adults", note: "Two adults are usually priced as two separate risks.", factor: 1.85 },
  { value: "family", label: "Family", note: "Children are typically the cheapest members to add.", factor: 2.55 },
];

const NETWORK: Choice[] = [
  { value: "local", label: "Local is fine", note: "A narrow local network is cheaper if you never leave the area.", factor: 0.92 },
  { value: "national", label: "I travel / work nationwide", note: "Nationwide PPO access costs more up front and less at the point of care.", factor: 1.08 },
];

const DEDUCTIBLE: Choice[] = [
  { value: "low", label: "Low deductible", note: "You pay more each month so a bad month costs less.", factor: 1.18 },
  { value: "high", label: "High deductible", note: "Lower premium, more exposure before coverage takes over.", factor: 0.85 },
];

const SUBSIDY: Choice[] = [
  { value: "no", label: "Probably not", note: "Without a subsidy the unsubsidized Marketplace premium is what you pay.", factor: 1 },
  { value: "maybe", label: "Possibly", note: "If you qualify for a subsidy, the Marketplace can beat any private plan — an advisor will say so.", factor: 0.45 },
];

const GROUPS = [
  { key: "age", label: "Age band", options: AGE },
  { key: "household", label: "Who needs coverage", options: HOUSEHOLD },
  { key: "network", label: "Network preference", options: NETWORK },
  { key: "deductible", label: "Deductible preference", options: DEDUCTIBLE },
  { key: "subsidy", label: "Marketplace subsidy?", options: SUBSIDY },
] as const;

const BASE_MARKETPLACE = 750;
const BASE_PRIVATE = 300;

export default function SavingsExplorer() {
  const [sel, setSel] = useState<Record<string, string>>({
    age: "40s",
    household: "1",
    network: "national",
    deductible: "high",
    subsidy: "no",
  });

  const pick = (key: string) =>
    GROUPS.find((g) => g.key === key)!.options.find((o) => o.value === sel[key])!;

  const shared =
    pick("age").factor * pick("household").factor * pick("deductible").factor;
  const marketplace = Math.round((BASE_MARKETPLACE * shared * pick("subsidy").factor) / 5) * 5;
  const priv = Math.round((BASE_PRIVATE * shared * pick("network").factor) / 5) * 5;
  const gap = marketplace - priv;

  return (
    <section className="section tone-dark bg-brand-primary-strong">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="eyebrow">What moves the price</span>
          <h2 className="mt-5 text-4xl text-brand-primary sm:text-5xl lg:text-[3.5rem]">
            What actually{" "}
            <span className="accent-on-dark">moves the price.</span>
          </h2>
          <p className="lede mt-4 max-w-2xl sm:mt-5">
            Tap an answer and watch both sides move.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-8">
          <div className="card flex flex-col p-5 sm:p-9">
            <div className="grid flex-1 content-between gap-5 sm:grid-cols-2 sm:gap-y-7 sm:gap-x-10">
              {GROUPS.map((g, i) => (
                <fieldset key={g.key} className={i === 0 ? "sm:col-span-2" : i === 2 || i === 3 ? "hidden sm:block" : ""}>
                  <legend className="text-[15px] font-semibold text-brand-ink">
                    {g.label}
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-2 sm:mt-3">
                    {g.options.map((o) => {
                      const active = sel[g.key] === o.value;
                      return (
                        <button
                          key={o.value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSel((s) => ({ ...s, [g.key]: o.value }))}
                          className={`min-h-11 rounded-full px-3.5 text-[13.5px] sm:px-4 sm:text-[14px] font-medium transition-[background-color,color,box-shadow] duration-200 ${
                            active
                              ? "bg-brand-primary text-white shadow-[0_6px_16px_-6px_#17396680]"
                              : "bg-brand-canvas text-brand-primary ring-1 ring-inset ring-brand-rule hover:ring-brand-rule-strong"
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2.5 hidden text-[13.5px] leading-snug sm:block text-brand-ink/60">
                    {pick(g.key).note}
                  </p>
                </fieldset>
              ))}
            </div>

            <div className="mt-8 hidden border-t border-brand-rule pt-6 sm:block">
              <p className="text-[15px] font-semibold text-brand-ink">
                What this cannot see
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-brand-ink/65">
                {["Your doctors and hospitals", "Prescriptions you take", "Your health history", "Your county"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-brand-accent" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card flex flex-col p-5 sm:p-8">
            <span className="eyebrow hidden lg:inline-flex">Side by side</span>
            <h3 className="mt-4 hidden text-2xl text-brand-primary lg:block">How the two sides move</h3>

            <dl className="grid grid-cols-2 gap-4 lg:mt-6 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-brand-rule">
              <div className="lg:pb-5">
                <dt className="text-[13px] font-medium leading-snug text-brand-ink/60 sm:text-[14px]">
                  Marketplace, unsubsidized
                </dt>
                <dd className="tabular mt-1 font-display text-3xl font-bold sm:text-4xl tracking-[-0.02em] text-brand-ink">
                  ${marketplace}
                  <span className="text-lg font-medium text-brand-ink/55">/mo</span>
                </dd>
              </div>
              <div className="lg:pt-5">
                <dt className="text-[13px] font-medium leading-snug text-brand-accent sm:text-[14px]">
                  Private PPO, underwritten
                </dt>
                <dd className="tabular mt-1 font-display text-3xl font-bold sm:text-4xl tracking-[-0.02em] text-brand-accent">
                  ${priv}
                  <span className="text-lg font-medium text-brand-ink/55">/mo</span>
                </dd>
              </div>
            </dl>

            <div className="mt-5 rounded-2xl bg-brand-primary-strong p-4 text-white sm:mt-6 sm:p-5">
              <p className="text-[13px] font-medium text-white/70">
                Monthly difference
              </p>
              <p className="tabular mt-1 font-display text-3xl font-bold">
                {gap >= 0 ? "-" : "+"}${Math.abs(gap)}
                <span className="text-base font-medium">/mo</span>
              </p>
              <p className="mt-2 hidden text-[13px] leading-snug text-white/75 sm:block">
                {gap >= 0
                  ? "Private coverage is the cheaper side here."
                  : "With a subsidy, the Marketplace wins here — and an advisor will tell you so."}
              </p>
            </div>

            <div className="mt-auto pt-5 sm:pt-6">
              <SurveyCTA formLocation="home-savings-explorer" className="btn-primary w-full">
                Review My Plan
              </SurveyCTA>
              <p className="mt-3 text-[12px] leading-relaxed text-brand-ink/50 sm:mt-4">
                For education only. Not your rate, an offer of coverage, or an
                eligibility decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
