import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const TILES = [
  {
    title: "Year-round review",
    body: "Private plans are medically underwritten, which means there is no six-week window. You can apply in March, in July, or the week you lose a job.",
  },
  {
    title: "Nationwide PPO networks",
    body: "Broad networks that travel with you, instead of a county-bound HMO that stops working the moment you cross a state line.",
  },
  {
    title: "Pre-existing conditions covered",
    body: "We ask about them in step three of the survey for a reason — so the advisor is working with the truth from the first minute.",
  },
];

export default function WhyUs() {
  return (
    <section className="section tone-dark bg-brand-primary-strong text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dark">Why people stay with us</span>
            <h2 className="mt-5 text-4xl text-white sm:text-5xl lg:text-[3.5rem]">
              We would rather lose the sale than{" "}
              <span className="accent-on-dark">sell you the wrong plan.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-white/70">
            Every one of these is something you can hold us to on the call — not
            a slogan we put on a banner.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Photo tile — the photograph stays untouched; the words sit below it. */}
          <Reveal className="card flex flex-col overflow-hidden text-brand-ink">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:flex-1">
              <Image
                src="/media/couple.webp"
                alt="A couple looking through coverage options on a tablet at home"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-brand-primary sm:text-[1.75rem]">
                One licensed advisor who actually picks up the phone.
              </p>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-brand-ink/70">
                Your details go to one person, not a lead auction. You get their
                name, and they are the one who calls.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {TILES.map((t, i) => (
              <Reveal key={t.title} delay={0.05 * (i + 1)} className="card flex flex-col p-6 text-brand-ink sm:p-7">
                <h3 className="text-xl text-brand-primary">{t.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-brand-ink/70">{t.body}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2} className="card flex flex-col p-6 text-brand-ink sm:p-7">
              <h3 className="text-xl text-brand-accent">We will send you elsewhere</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-brand-ink/70">
                If Medicaid, a subsidized Marketplace plan or your spouse&rsquo;s
                employer plan is the better deal, that is what you will be told.
              </p>
              <Link
                href="/compare"
                className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-[15px] font-semibold text-brand-accent hover:text-brand-accent-strong"
              >
                See the honest comparisons
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
