import type { Metadata } from "next";
import Link from "next/link";
import { comparisons } from "@/data/comparisons";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import HonestComparison from "@/components/home/HonestComparison";
import FinalCTA from "@/components/home/FinalCTA";
import MediaBand from "@/components/MediaBand";
import WhoWeHelp from "@/components/home/WhoWeHelp";

export const metadata: Metadata = {
  title: "Honest Comparisons",
  description:
    "Private PPO coverage compared with the Marketplace, COBRA, short-term plans, health sharing and HMOs — including where each alternative genuinely wins.",
  alternates: { canonical: "/compare" },
};

const PHOTO: Record<string, { src: string; alt: string }> = {
  "vs-aca-marketplace": { src: "/media/photo-cmp-aca.webp", alt: "A couple reviewing coverage options on a laptop at home" },
  "vs-cobra": { src: "/media/photo-cmp-cobra.webp", alt: "A man carrying a box of his belongings out of an office" },
  "vs-short-term": { src: "/media/photo-cmp-short.webp", alt: "A young woman planning in a notebook at a cafe" },
  "vs-health-sharing": { src: "/media/photo-cmp-sharing.webp", alt: "A multigenerational family sharing a backyard picnic" },
  "vs-hmo": { src: "/media/photo-cmp-hmo.webp", alt: "A doctor talking with an older patient in an exam room" },
  "losing-employer-coverage": { src: "/media/photo-cmp-employer.webp", alt: "A woman at her kitchen window thinking through her next step" },
};

export default function ComparePage() {
  return (
    <>
      <PageHero
        film="compare"
        eyebrow="The honest comparisons"
        title={
          <>
            Six comparisons, written so{" "}
            <span className="accent-on-dark">the other side can win.</span>
          </>
        }
      >
        <p>
          Most comparison pages exist to make one option look ridiculous. These
          do not. Each one lays out what the alternative genuinely does better,
          who it actually suits, and where private PPO coverage is the stronger
          answer.
        </p>
      </PageHero>

      <section className="section tone-light bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <span className="eyebrow">Pick your situation</span>
          <h2 className="mt-5 max-w-2xl text-3xl text-brand-primary sm:text-4xl">
            Start with the option{" "}
            <span className="text-brand-accent">you are weighing now.</span>
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((c) => {
              const photo = PHOTO[c.slug];
              return (
                <li key={c.slug}>
                  <Link
                    href={`/compare/${c.slug}`}
                    className="card group flex h-full flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                  >
                    {photo && (
                      <div className="relative aspect-[16/10]">
                        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-xl font-bold leading-tight text-brand-primary">
                        {c.title}
                      </h3>
                      <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-brand-ink/80">
                        {c.teaser}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-bold text-white group-hover:underline">
                        Read the comparison
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-brand-accent transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                          <path d="M5 12h14m-6-6 6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <MediaBand
        src="/media/photo-compare-hub.webp"
        alt="Two people comparing printed brochures at a desk"
        video={{ clip: "compare", label: "A doctor listening to a young girl's heartbeat" }}
        eyebrow="Why these pages exist"
        heading="Every one of these has a losing side for us."
        body="Each comparison names the situations where the other option is genuinely the better buy — COBRA when you are mid-treatment, the Marketplace when a subsidy lands. If that is you, the honest answer is the one you will get on the call."
        points={[
          "The alternative's real strengths, stated plainly",
          "Who each option actually suits",
          "A verdict you can check against your own situation",
        ]}
        tone="dark"
        flip
      />

      <HonestComparison />
      <WhoWeHelp />
      <FinalCTA
        formLocation="compare-hub"
        eyebrow="Still deciding"
        title={
          <>
            Not sure which side
            <br />
            <span className="accent-on-dark">you are on?</span>
          </>
        }
        body="That is what the call is for. Five questions, one licensed advisor, and an honest answer — including stay where you are, if that is the right one."
      />
    </>
  );
}
