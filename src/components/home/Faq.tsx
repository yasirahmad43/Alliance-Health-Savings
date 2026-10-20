import { faqs } from "@/data/faq";

export default function Faq() {
  return (
    <section className="section tone-light bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow">Straight answers</span>
          <h2 className="mt-5 text-4xl text-brand-primary sm:text-5xl">
            The questions people{" "}
            <span className="text-brand-accent">are afraid to ask.</span>
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-brand-ink/70">
            Including the ones where the answer is &ldquo;this is not for
            you&rdquo;.
          </p>
        </div>

        <div className="card divide-y divide-brand-rule px-6 sm:px-8">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 py-5 font-display text-[1.125rem] font-semibold leading-snug text-brand-primary marker:hidden">
                {f.q}
                <span
                  className="relative mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white"
                  aria-hidden="true"
                >
                  <span className="absolute h-0.5 w-3 rounded-full bg-current" />
                  <span className="absolute h-3 w-0.5 rounded-full bg-current transition-transform duration-200 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="pb-6 pr-10 text-[15.5px] leading-relaxed text-brand-ink/70">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
