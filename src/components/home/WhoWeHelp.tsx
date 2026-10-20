import SurveyCTA from "@/components/SurveyCTA";

const CASES = [
  {
    head: "You just lost employer coverage",
    body: "COBRA hands you the full unsubsidized premium and you have sixty days to decide.",
  },
  {
    head: "You are self-employed",
    body: "Nobody is splitting the premium with you, so every dollar of the monthly cost is yours.",
  },
  {
    head: "Open enrollment has closed",
    body: "It is April and the Marketplace will not take you without a qualifying life event.",
  },
  {
    head: "Your plan does not cover your doctor",
    body: "The network is narrow, the specialist is out of it, and the referral keeps bouncing.",
  },
  {
    head: "You have a condition to cover",
    body: "You want to say so up front and find out honestly what it changes.",
  },
  {
    head: "You retired before 65",
    body: "Medicare is years away and the gap has to be bridged without wrecking the budget.",
  },
];

export default function WhoWeHelp() {
  return (
    <section className="section tone-dark bg-brand-primary-strong text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="eyebrow eyebrow-dark">Sound familiar?</span>
          <h2 className="mt-5 text-4xl text-white sm:text-5xl lg:text-[3.5rem]">
            Most people find us on{" "}
            <span className="accent-on-dark">one of their worst weeks.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            If any of these is you, a thirty-second survey is a reasonable next
            step. It costs nothing and commits you to nothing.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {CASES.map((c) => (
            <li key={c.head} className="card flex flex-col p-6 text-brand-ink sm:p-7">
              <h3 className="text-lg text-brand-primary sm:text-xl">{c.head}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-brand-ink/70">{c.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start gap-5 border-t border-white/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg font-display text-2xl font-bold leading-tight tracking-[-0.02em]">
            Real options. Real advisors. Zero pressure.
          </p>
          <SurveyCTA formLocation="home-who-we-help" className="btn-primary btn-lg">
            Review My Plan
          </SurveyCTA>
        </div>
      </div>
    </section>
  );
}
