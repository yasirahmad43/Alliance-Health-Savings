import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons, comparisonBySlug } from "@/data/comparisons";
import PageHero from "@/components/PageHero";
import TrustBand from "@/components/home/TrustBand";
import FinalCTA from "@/components/home/FinalCTA";
import MediaBand from "@/components/MediaBand";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = comparisonBySlug(slug);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/compare/${c.slug}` },
  };
}

const PHOTO: Record<string, string> = {
  "vs-aca-marketplace": "cmp-aca",
  "vs-cobra": "cmp-cobra",
  "vs-short-term": "cmp-short",
  "vs-health-sharing": "cmp-sharing",
  "vs-hmo": "cmp-hmo",
  "losing-employer-coverage": "cmp-employer",
};

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = comparisonBySlug(slug);
  if (!c) notFound();

  const others = comparisons.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <PageHero
        film="compare"
        back={{ href: "/compare", label: "All comparisons" }}
        title={c.title}
      >
        {c.intro.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </PageHero>

      {/* Them vs Us */}
      <section className="section tone-light bg-brand-canvas">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="card flex flex-col p-6 sm:p-9">
              <p className="text-[14px] font-semibold text-brand-ink/55">The alternative</p>
              <h2 className="mt-1.5 font-display text-2xl font-bold text-brand-ink sm:text-3xl">
                {c.them.name}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-brand-ink/75">
                {c.them.summary}
              </p>
              <ul className="mt-5 space-y-3">
                {c.them.points.map((p) => (
                  <li key={p.slice(0, 32)} className="flex gap-2.5 text-[15px] leading-relaxed text-brand-ink/80">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-ink/40" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card flex flex-col p-6 ring-2 ring-brand-accent sm:p-9">
              <p className="text-[14px] font-semibold text-brand-accent">Private PPO</p>
              <h2 className="mt-1.5 font-display text-2xl font-bold text-brand-primary sm:text-3xl">
                {c.us.name}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-brand-ink/75">
                {c.us.summary}
              </p>
              <ul className="mt-5 space-y-3">
                {c.us.points.map((p) => (
                  <li key={p.slice(0, 32)} className="flex gap-2.5 text-[15px] leading-relaxed text-brand-ink/80">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1 size-4 shrink-0 text-brand-accent" aria-hidden="true">
                      <path d="m4 12.5 5 5L20 6.5" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row-by-row */}
          <h2 className="mt-14 font-display text-3xl font-bold text-brand-primary sm:text-4xl">
            Side by side
          </h2>

          <div className="card mt-6 hidden overflow-hidden px-8 py-2 sm:block">
          <table className="w-full border-collapse text-[15px]">
            <thead>
              <tr className="border-b border-brand-rule-strong">
                <th scope="col" className="w-1/4 py-3 text-left font-display text-[13px] font-semibold text-brand-ink/60">
                  &nbsp;
                </th>
                <th scope="col" className="py-3 text-left font-display text-[13px] font-semibold text-brand-ink/60">
                  {c.them.name}
                </th>
                <th scope="col" className="py-3 text-left font-display text-[13px] font-semibold text-brand-accent">
                  Private PPO
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.label} className="border-b border-brand-rule align-top last:border-0">
                  <th scope="row" className="py-3.5 pr-4 text-left font-semibold text-brand-ink">
                    {r.label}
                  </th>
                  <td className="py-3.5 pr-4 text-brand-ink/70">{r.them}</td>
                  <td className="py-3.5 font-medium text-brand-primary">{r.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <ul className="mt-6 space-y-3 sm:hidden">
            {c.rows.map((r) => (
              <li key={r.label} className="card p-5">
                <p className="font-display text-[13px] font-bold text-brand-ink/60">
                  {r.label}
                </p>
                <p className="mt-2 text-[11px] font-semibold text-brand-ink/50">
                  {c.them.name}
                </p>
                <p className="text-[14px] leading-snug text-brand-ink/75">{r.them}</p>
                <p className="mt-2.5 text-[11px] font-semibold text-brand-accent">
                  Private PPO
                </p>
                <p className="text-[14px] font-medium leading-snug text-brand-primary">{r.us}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Question sections */}
      <section className="section tone-dark bg-brand-primary-strong">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 [&>*]:max-w-4xl">
          <div className="space-y-10">
            {c.sections.map((s) => (
              <div key={s.q}>
                <h2 className="font-display text-2xl font-bold leading-tight text-brand-primary sm:text-3xl">
                  {s.q}
                </h2>
                <p className="mt-3 text-[17px] leading-relaxed text-brand-ink/80">
                  {s.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="card flex flex-col p-6 sm:p-8">
              <p className="text-[14px] font-semibold text-brand-ink/55">Best for</p>
              <h3 className="mt-1 font-display text-xl font-bold text-brand-ink">
                {c.them.name}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-brand-ink/75">
                {c.bestFor.them}
              </p>
            </div>
            <div className="card flex flex-col p-6 ring-2 ring-brand-accent sm:p-8">
              <p className="text-[14px] font-semibold text-brand-accent">Best for</p>
              <h3 className="mt-1 font-display text-xl font-bold text-brand-primary">
                Private PPO
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-brand-ink/75">
                {c.bestFor.us}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-brand-accent p-6 text-white sm:p-9">
            <span className="eyebrow eyebrow-dark">The verdict</span>
            <p className="mt-4 text-[17px] leading-relaxed text-white/85">
              {c.verdict}
            </p>
          </div>
        </div>
      </section>

      <MediaBand
        src={`/media/photo-${PHOTO[c.slug] ?? "compare-hub"}.webp`}
        alt="A household thinking through its coverage options"
        video={{ clip: "cmp", label: "A grandfather teaching his grandson to fish from a dock" }}
        eyebrow="Where it actually matters"
        heading="The difference shows up at the front desk."
        body="Network, deductible and out-of-pocket maximum are abstractions until somebody asks for your card. That is the moment these comparisons are written for."
        points={[
          "Which doctors take the plan",
          "What you pay before coverage starts",
          "The most a bad year can cost",
        ]}
        flip
      />

      <TrustBand />

      <FinalCTA
        formLocation={`compare-${c.slug}`}
        eyebrow="Your situation"
        title={
          <>
            Find out which one
            <br />
            <span className="accent-on-dark">applies to you.</span>
          </>
        }
        body="A licensed advisor will tell you honestly which side of this comparison you belong on — even when the answer is the other one."
      >
        <div className="mt-8">
          <h3 className="font-display text-lg font-bold text-white">Keep reading</h3>
          <ul className="mt-2 space-y-1">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/compare/${o.slug}`}
                  className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-brand-accent"
                >
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </FinalCTA>
    </>
  );
}
