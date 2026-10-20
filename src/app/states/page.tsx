import type { Metadata } from "next";
import Link from "next/link";
import { states } from "@/data/states";
import PageHero from "@/components/PageHero";
import StateMap from "@/components/home/StateMap";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";
import MediaBand from "@/components/MediaBand";

export const metadata: Metadata = {
  title: "Coverage By State",
  description:
    "Private PPO health coverage reviewed by a licensed advisor in all 50 states. Find what is different about the individual market where you live.",
  alternates: { canonical: "/states" },
};

export default function StatesPage() {
  return (
    <>
      <PageHero
        film="states"
        eyebrow="Coverage by state"
        title={
          <>
            Health coverage changes{" "}
            <span className="accent-on-dark">at the state line.</span>
          </>
        }
      >
        <p>
          Carriers, network shapes, Marketplace structure and Medicaid rules are
          all set state by state. Pick yours and we will tell you what is
          actually different about buying coverage there.
        </p>
      </PageHero>

      <section className="section tone-light bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <span className="eyebrow">All 50 states</span>
          <h2 className="mt-5 max-w-2xl text-3xl text-brand-primary sm:text-4xl">
            Find the page{" "}
            <span className="text-brand-accent">for where you live.</span>
          </h2>
          <div className="card mt-10 p-5 sm:p-10">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-0.5 sm:grid-cols-3 lg:grid-cols-4">
              {states.map((s) => (
                <li key={s.slug} className="min-w-0">
                  <Link
                    href={`/states/${s.slug}`}
                    className="flex min-h-11 items-center justify-between gap-2 border-b border-brand-rule text-[15px] font-semibold text-white underline-offset-4 hover:underline"
                  >
                    <span className="truncate">{s.name}</span>
                    <span className="shrink-0 rounded-md bg-brand-accent px-1.5 py-0.5 font-display text-[11px] font-bold text-white">
                      {s.abbr}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <MediaBand
        src="/media/photo-states-hub.webp"
        alt="A quiet tree-lined suburban street in the afternoon sun"
        video={{ clip: "states", label: "A family flying a kite together on a grassy hill" }}
        eyebrow="Fifty individual markets"
        heading="There is no national individual market."
        body="A carrier that dominates one state may not file a single plan in the next one. Networks, rating rules and Medicaid thresholds are all set locally, which is why the state page you land on talks about yours and not about the country."
        points={[
          "Carriers differ from state to state",
          "Networks follow hospital systems, not borders",
          "Medicaid rules are set locally",
        ]}
        tone="dark"
        flip
      />

      <StateMap />
      <Testimonials />
      <FinalCTA
        formLocation="states-hub"
        eyebrow="Wherever you are"
        title={
          <>
            Licensed advisors
            <br />
            <span className="accent-on-dark">in all 50 states.</span>
          </>
        }
        body="Start with your state and we will match you with an advisor licensed there. One call, no pressure."
      />
    </>
  );
}
