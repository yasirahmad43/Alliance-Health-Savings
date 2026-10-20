"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { states } from "@/data/states";
import { MAP_VIEWBOX, stateShapes } from "@/data/us-map";
import SurveyCTA from "@/components/SurveyCTA";

/**
 * Interactive coverage map drawn from real US Census state geometry (see
 * `src/data/us-map.ts`, baked by `scripts/bake-map.mjs`). Every state is an
 * anchor inside the SVG, so each shape is a real link — hover, focus and tap
 * all resolve to the same highlighted state.
 *
 * The eight states too small to hold type inside their own outline get a
 * leader line out to a label in the right margin instead of an unreadable
 * two-letter abbreviation crushed into four pixels.
 *
 * Below `sm` the shapes fall well under the 44px tap minimum, so phones get
 * the map as an illustration plus the real two-column index underneath, which
 * is also the keyboard path on every size.
 */

/** Where each small north-eastern label sits, and the elbow its leader bends around. */
const LEADERS: Record<string, { x: number; y: number; bend: number }> = {
  VT: { x: 872, y: 118, bend: 838 },
  NH: { x: 872, y: 146, bend: 848 },
  MA: { x: 872, y: 174, bend: 878 },
  RI: { x: 872, y: 202, bend: 878 },
  CT: { x: 872, y: 230, bend: 872 },
  NJ: { x: 872, y: 258, bend: 866 },
  DE: { x: 872, y: 286, bend: 862 },
  MD: { x: 872, y: 314, bend: 856 },
};

export default function StateMap() {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);
  const current = states.find((s) => s.abbr === active);

  return (
    <section className="section tone-light bg-brand-canvas">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="eyebrow">Coverage by state</span>
          <h2 className="mt-5 text-4xl text-brand-primary sm:text-5xl lg:text-[3.5rem]">
            Licensed advisors in{" "}
            <span className="text-brand-accent">all 50 states.</span>
          </h2>
          <p className="lede mt-5 max-w-2xl">
            Hover or tap your state. Plan availability, carriers and pricing
            all change at the state line — so the page you land on talks about
            yours specifically.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8">
          <div className="card min-w-0 p-3 sm:p-6">
            <svg
              viewBox={MAP_VIEWBOX}
              className="block h-auto w-full"
              role="img"
              aria-label="Map of the United States. Every state links to its own coverage page; the list below is the keyboard equivalent."
            >
              {stateShapes.map((s) => {
                const on = active === s.abbr;
                const lead = LEADERS[s.abbr];
                return (
                  <a
                    key={s.abbr}
                    href={`/states/${s.slug}`}
                    aria-label={`Health coverage in ${s.name}`}
                    tabIndex={-1}
                    className="pointer-events-none sm:pointer-events-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/states/${s.slug}`);
                    }}
                    onMouseEnter={() => setActive(s.abbr)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path
                      d={s.d}
                      strokeWidth={1}
                      strokeLinejoin="round"
                      className={
                        on
                          ? "fill-brand-accent stroke-white"
                          : "fill-white/10 stroke-white/55 transition-[fill] duration-150"
                      }
                    />
                    {lead ? (
                      <>
                        <polyline
                          points={`${s.cx},${s.cy} ${lead.bend},${s.cy} ${lead.x - 6},${lead.y - 5}`}
                          fill="none"
                          strokeWidth={1}
                          className={
                            on ? "stroke-white" : "stroke-white/45"
                          }
                        />
                        <text
                          x={lead.x}
                          y={lead.y}
                          className={`font-display text-[14px] font-semibold ${
                            on ? "fill-white underline" : "fill-white/85"
                          }`}
                        >
                          {s.abbr}
                        </text>
                      </>
                    ) : (
                      <text
                        x={s.cx}
                        y={s.cy + 4}
                        textAnchor="middle"
                        className={`pointer-events-none font-display text-[14px] font-semibold ${
                          "fill-white"
                        }`}
                      >
                        {s.abbr}
                      </text>
                    )}
                  </a>
                );
              })}
            </svg>
          </div>

          <div className="card flex flex-col p-7 sm:p-8">
            {current ? (
              <>
                <span className="eyebrow eyebrow-dark self-start">{current.abbr}</span>
                <h3 className="mt-5 text-3xl text-white">{current.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                  {current.context}
                </p>
                <p className="mt-4 text-[13.5px] font-medium text-white/60">
                  {current.cities.slice(0, 4).join(" · ")}
                </p>
              </>
            ) : (
              <>
                <span className="eyebrow eyebrow-dark self-start">Pick a state</span>
                <h3 className="mt-5 text-3xl text-white">Hover or tap your state</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                  Every state has its own carriers, its own network shapes and
                  its own quirks. We will show you what matters in yours.
                </p>
              </>
            )}
            <div className="mt-auto flex flex-col gap-3 pt-8">
              <SurveyCTA formLocation="home-state-map" className="btn-primary w-full">
                Find My Plan
              </SurveyCTA>
              <Link
                href="/states"
                className="inline-flex min-h-11 items-center justify-center gap-1.5 text-sm font-semibold text-white/85 hover:text-white"
              >
                See all 50 states
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
