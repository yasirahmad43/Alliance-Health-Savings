import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { states, stateBySlug } from "@/data/states";
import { comparisons } from "@/data/comparisons";
import SurveyForm from "@/components/SurveyForm";
import PageHero from "@/components/PageHero";
import TrustBand from "@/components/home/TrustBand";
import HowItWorks from "@/components/home/HowItWorks";
import { statePhotos } from "@/data/statePhotos";
import MediaBand from "@/components/MediaBand";

export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = stateBySlug(state);
  if (!s) return {};
  return {
    title: `Health Insurance in ${s.name}`,
    description: `Private PPO health coverage in ${s.name}, reviewed by a licensed advisor. Serving ${s.cities.slice(0, 3).join(", ")} and the rest of the state, any day of the year.`,
    alternates: { canonical: `/states/${s.slug}` },
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = stateBySlug(state);
  if (!s) notFound();

  const photo = statePhotos[s.slug];
  const idx = states.findIndex((x) => x.slug === s.slug);
  const neighbors = [
    states[(idx + 1) % states.length],
    states[(idx + 2) % states.length],
    states[(idx + 3) % states.length],
    states[(idx + 4) % states.length],
  ];

  return (
    <>
      <PageHero
        film="states"
        back={{ href: "/states", label: "All states" }}
        title={
          <>
            Health insurance in{" "}
            <span className="accent-on-dark">{s.name}.</span>
          </>
        }
      >
        <p>{s.context}</p>
        <p className="text-[15px] font-semibold text-white/65">{s.cities.join(" · ")}</p>
      </PageHero>

      <section className="section tone-light bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,29rem)] lg:gap-16">
          <div className="flex max-w-2xl flex-col">
            <h2 className="font-display text-3xl font-bold text-brand-primary sm:text-4xl">
              What is actually different about{" "}
              <span className="text-brand-accent">{s.name}.</span>
            </h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-brand-ink/80">
              <p>
                Health coverage is regulated state by state. Which carriers sell
                individual plans in {s.name}, how wide their networks reach, how
                the Marketplace is run, and who qualifies for Medicaid are all
                {" "}{s.name} questions — not national ones. That is why a plan
                that a friend raves about two states over may not exist where you
                live.
              </p>
              <p>
                If you are in {s.cities[0]} or {s.cities[1]}, you likely have
                more carrier choice and more in-network hospitals than someone
                two hours out. Outside the metros — {s.cities.slice(2, 5).join(", ")}{" "}
                and the smaller communities around them — the practical question
                is usually which hospital systems a plan contracts with, and how
                far you would drive for a specialist. A licensed advisor checks
                that against the plan before you enroll, not after.
              </p>
              <p>
                Private PPO coverage is medically underwritten, which is why it
                can be applied for any day of the year in {s.name} rather than
                only during the annual open enrollment window. It is also why it
                is not the right route for everyone: if you qualify for {s.name}{" "}
                Medicaid or for a substantial Marketplace subsidy, those will
                almost always cost you less, and the advisor will say so.
              </p>
            </div>

            <p className="mt-10 border-t border-brand-rule pt-6 text-[13px] leading-relaxed text-brand-ink/55 lg:mt-auto">
              Plan availability, premiums and benefits in {s.name} vary by age,
              county, household size, health history and the plan selected.
              Nothing on this page is an offer of coverage or a determination of
              eligibility.
            </p>
          </div>

          <div className="flex flex-col">
            <SurveyForm formLocation={`state-${s.slug}`} variant="hero" />

            <div className="card mt-6 p-6">
              <p className="text-[14px] font-semibold text-brand-ink/55">
                Nearby coverage pages
              </p>
              <ul className="mt-2.5 grid grid-cols-2 gap-x-4">
                {neighbors.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/states/${n.slug}`}
                      className="flex min-h-11 items-center border-b border-brand-rule text-[15px] font-semibold text-white underline-offset-4 hover:underline"
                    >
                      {n.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-dark bg-brand-primary-strong">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <span className="eyebrow">Who we help here</span>
            <h3 className="mt-5 font-display text-2xl font-bold text-brand-primary sm:text-3xl">
              Who we usually hear from in {s.name}
            </h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                `Self-employed people and contractors around ${s.cities[0]} with no group plan to fall back on.`,
                `Workers who just lost employer coverage and were handed the full COBRA premium.`,
                `Families outside the ${s.cities[1]} metro whose plan network does not include a nearby specialist.`,
                `People who retired before 65 and need to bridge the years until Medicare.`,
              ].map((t) => (
                <li key={t.slice(0, 30)} className="card flex p-6 text-[15px] leading-relaxed text-brand-ink/75">
                  {t}
                </li>
              ))}
            </ul>

            <h3 className="mt-14 font-display text-2xl font-bold text-brand-primary sm:text-3xl">
              Before you decide
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-brand-ink/75">
              These comparisons cover the options most {s.name} residents are
              weighing against private coverage.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {comparisons.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/compare/${c.slug}`}
                    className="card inline-flex min-h-11 items-center rounded-full px-5 text-[14px] font-semibold text-brand-primary transition-colors duration-200 hover:bg-brand-accent hover:text-white"
                  >
                    {c.navTitle}
                  </Link>
                </li>
              ))}
            </ul>

        </div>
      </section>

      <MediaBand
        src={`/media/states/${s.slug}.webp`}
        alt={photo ? `${photo.subject}, ${s.name}` : `A landmark in ${s.name}`}
        video={{ clip: "state", label: "A couple and their dog jogging along a coastal boardwalk" }}
        eyebrow="Local means local"
        heading="Your network is drawn around where you live, not your state."
        body={`Two towns in ${s.name} can sit in different hospital systems and different provider networks. The first question an advisor asks is which doctors you want to keep — because that is what decides whether a plan is worth anything to you.`}
        points={[
          `Which ${s.name} hospital systems a plan contracts with`,
          "How far you would drive for a specialist",
          "Whether your current doctors are in network",
        ]}
        credit={
          photo && (
            <>
              {photo.subject}. Photo: {photo.author},{" "}
              <a href={photo.page} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                {photo.license}
              </a>
              , via Wikimedia Commons.
            </>
          )
        }
        flip
      />

      <TrustBand />
      <HowItWorks />
    </>
  );
}
