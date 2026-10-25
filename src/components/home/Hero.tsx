import SurveyForm from "@/components/SurveyForm";
import HeroVideo from "@/components/home/HeroVideo";

const BULLETS = [
  "Pre-existing conditions covered",
  "Nationwide PPO networks",
  "Enroll any day of the year",
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-primary-strong text-white">
      {/* Background film behind the copy on every screen size. On desktop
          only the left side carries a gradient, so the headline reads and the
          footage stays clearly visible across the rest of the frame. On phones
          the copy covers the whole frame, so a top-to-bottom navy wash keeps
          the white headline readable over the footage. */}
      <div className="absolute inset-x-0 top-0 h-[36rem] sm:h-[40rem] lg:inset-0 lg:h-full">
        <HeroVideo />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,#0e254759_0%,#0e254780_45%,#0e2547d9_80%,#0e2547_100%)] lg:hidden"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden bg-[linear-gradient(90deg,#0e2547e6_0%,#0e2547b3_38%,#0e254733_68%,#0e25471a_100%)] lg:block"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-stretch lg:gap-16 lg:py-24">
        <div className="flex flex-col">
          <span className="eyebrow eyebrow-dark">Licensed advisors in all 50 states</span>

          <h1 className="mt-6 text-[2.5rem] font-bold leading-[1.04] sm:text-6xl lg:text-[4.25rem]">
            Real health coverage.
            <br />
            Real advisors.
            <br />
            <span className="accent-on-dark">Real savings.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            Private PPO plans, reviewed with you by a licensed advisor.
            No pressure, ever.
          </p>

          <ul className="mt-8 grid max-w-xl gap-3 lg:mt-auto lg:pt-10">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[16px] font-medium leading-snug">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-white">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div id="find-my-plans" className="scroll-mt-28 lg:self-center">
          <SurveyForm formLocation="homepage-hero" variant="hero" />
        </div>
      </div>
    </section>
  );
}
