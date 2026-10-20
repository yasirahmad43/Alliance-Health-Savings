import type { ReactNode } from "react";
import SurveyForm from "@/components/SurveyForm";

/**
 * The closing survey panel: one navy box on a light ground holding the copy
 * and the survey. Inner pages reuse it with their own words and form location.
 */
export default function FinalCTA({
  formLocation = "homepage-final-cta",
  eyebrow = "One last thing",
  title,
  body = "No payment details, no login, no credit check, and no obligation to enroll in anything. Just your state, who needs covering, and where to reach you.",
  children,
}: {
  formLocation?: string;
  eyebrow?: string;
  title?: ReactNode;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <section className="section tone-light bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="card grid gap-10 overflow-hidden bg-brand-primary p-5 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,29rem)] lg:items-stretch lg:gap-16 lg:p-14">
          <div className="flex flex-col">
            <span className="eyebrow eyebrow-dark self-start">{eyebrow}</span>
            <h2 className="mt-6 text-4xl text-white sm:text-5xl lg:text-[4rem]">
              {title ?? (
                <>
                  Thirty seconds now.
                  <br />
                  <span className="accent-on-dark">One honest call later.</span>
                </>
              )}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{body}</p>

            {children}

            <ul className="mt-8 grid gap-3 border-t border-white/15 pt-8 text-[16px] font-medium lg:mt-auto">
              {[
                "Licensed advisors in all 50 states",
                "Pre-existing conditions covered",
                "Apply any day of the year",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-white" aria-hidden="true">
                      <path d="m4 12.5 5 5L20 6.5" />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <SurveyForm formLocation={formLocation} variant="hero" />
        </div>
      </div>
    </section>
  );
}
