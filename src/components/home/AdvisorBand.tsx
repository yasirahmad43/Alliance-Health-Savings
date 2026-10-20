import Image from "next/image";
import SurveyCTA from "@/components/SurveyCTA";

const PROMISES = [
  "They read your answers before they dial.",
  "They tell you what a plan does not cover, not just what it does.",
  "They do not need a decision on the call.",
];

export default function AdvisorBand() {
  return (
    <section className="section tone-light bg-brand-canvas">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-stretch lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-brand-rule shadow-[var(--shadow-lift)] lg:aspect-auto lg:min-h-[32rem]">
          <Image
            src="/media/advisor.webp"
            alt="A licensed insurance advisor at a bright office desk"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="eyebrow">Who you will speak to</span>
          <h2 className="mt-5 text-4xl text-brand-primary sm:text-5xl lg:text-[3.25rem]">
            A licensed advisor who{" "}
            <span className="text-brand-accent">actually picks up the phone.</span>
          </h2>
          <p className="lede mt-5 max-w-2xl">
            We are not an algorithm that spits out a plan. You submit what you
            need, a licensed advisor reviews it, and then a human being walks
            you through the real options — including the ones that are not ours
            to sell. The advisor handles the plan conversation and the
            paperwork. You make the decision.
          </p>

          <ul className="card mt-8 divide-y divide-brand-rule px-6">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-center gap-3 py-4 text-[15.5px] font-medium leading-snug text-brand-ink">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
                    <path d="m4 12.5 5 5L20 6.5" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>

          <SurveyCTA formLocation="home-advisor-band" className="btn-primary mt-8 self-start">
            Review My Plan
          </SurveyCTA>
        </div>
      </div>
    </section>
  );
}
