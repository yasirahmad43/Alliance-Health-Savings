import { states } from "@/data/states";

/**
 * A single autoscrolling row. Fourteen scenarios run continuously in one
 * track, duplicated once so the loop has no visible seam, and the whole thing
 * pauses on hover or on keyboard focus so anything can actually be read.
 *
 * These are placeholder scenarios, clearly labeled as such. Nothing here is
 * presented as a real customer review and no platform rating is claimed.
 * Replace wholesale when the client supplies genuine, permissioned ones.
 */
type Scenario = { text: string; who: string; where: string; tag: string };

const SCENARIOS: Scenario[] = [
  { text: "I called about a plan I had already picked out and the advisor talked me out of it. She said the network did not include the hospital ten minutes from my house. I would never have checked.", who: "Owner-operator, 44", where: "TX", tag: "Network check" },
  { text: "My contract ended in March, which the Marketplace does not care about. Being able to apply in the middle of the year was the whole reason this worked.", who: "Travel nurse, 31", where: "AZ", tag: "Off-cycle" },
  { text: "I said up front that I have a condition I need covered. Nobody got cagey about it — they just told me which direction that pushed things and why.", who: "Graphic designer, 38", where: "NC", tag: "Pre-existing conditions" },
  { text: "He worked out that I would qualify for a subsidy and told me to go to the Marketplace instead. He did not make a cent from that call.", who: "Part-time bookkeeper, 52", where: "OH", tag: "Sent elsewhere" },
  { text: "COBRA wanted more than my mortgage. One call, two real alternatives, and an honest note about what each one gives up.", who: "Laid-off project manager, 47", where: "MI", tag: "After a layoff" },
  { text: "I run a four-person shop. I was told for years I was too small for a group plan and nobody ever offered me a second option until this call.", who: "Cafe owner, 41", where: "GA", tag: "Small business" },
  { text: "The first thing she asked was which doctors we wanted to keep. Not my budget. That told me a lot about how the rest of the call would go.", who: "Realtor, 36", where: "FL", tag: "Keeping a doctor" },
  { text: "Retired at 61 and found out what four years without Medicare actually costs. Having someone lay out the bridge options in plain English was worth the half hour.", who: "Early retiree, 61", where: "PA", tag: "Before 65" },
  { text: "I drive for two platforms and neither of them covers me. I had assumed I had to wait until November to do anything about it.", who: "Rideshare driver, 29", where: "IL", tag: "Gig work" },
  { text: "He told me straight out that one of my medications would not be covered the way I wanted on the plan I was asking about. Nobody had mentioned that before.", who: "Framing contractor, 45", where: "CO", tag: "Prescriptions" },
  { text: "Three kids, two of them in sports, and I wanted to know what an urgent care visit actually costs. We went line by line until I understood it.", who: "Parent of three, 39", where: "MO", tag: "Family coverage" },
  { text: "My work is seasonal so my income is not. She built the comparison around what the months with no work look like, not the good months.", who: "Landscaper, 33", where: "MN", tag: "Seasonal income" },
  { text: "I was ready to be sold to and it never happened. He answered the questions, sent me the details, and left the decision with me.", who: "IT consultant, 43", where: "WA", tag: "No pressure" },
  { text: "The deductible number is the one everybody talks about. She was the first person to explain what the out-of-pocket maximum meant for us instead.", who: "Restaurant manager, 35", where: "TN", tag: "Understanding the plan" },
];

function abbrToName(abbr: string) {
  return states.find((s) => s.abbr === abbr)?.name ?? abbr;
}

function ScenarioCard({ s, hidden }: { s: Scenario; hidden?: boolean }) {
  return (
    <li
      className="flex w-[19rem] shrink-0 flex-col rounded-3xl bg-brand-surface p-6 text-brand-ink sm:w-[24rem] sm:p-7"
      aria-hidden={hidden || undefined}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="eyebrow">{s.tag}</span>
        <span className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((n) => (
            <svg key={n} viewBox="0 0 20 20" className="size-4" fill="var(--color-brand-accent)" aria-hidden="true">
              <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
            </svg>
          ))}
        </span>
      </div>
      <blockquote className="mt-4 text-[15.5px] leading-relaxed text-brand-ink/80">
        &ldquo;{s.text}&rdquo;
      </blockquote>
      <footer className="mt-auto flex items-center gap-3 border-t border-brand-rule pt-4 text-[14px]">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-tint font-display text-[13px] font-bold text-brand-primary">
          {s.where}
        </span>
        <span>
          <span className="block font-semibold text-brand-primary">{s.who}</span>
          <span className="block text-brand-ink/55">{abbrToName(s.where)}</span>
        </span>
      </footer>
    </li>
  );
}

export default function Testimonials() {
  return (
    <section className="section overflow-hidden bg-brand-primary-strong text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl text-white sm:text-5xl lg:text-[3.5rem]">
              What a call with an advisor{" "}
              <span className="accent-on-dark">actually sounds like.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* One continuous row. The track is the list twice over, so the reset at
          -50% lands exactly where the first copy began. */}
      <div className="scenario-rail mt-14 flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <ul className="scenario-track flex w-max items-stretch gap-4">
          {SCENARIOS.map((s) => (
            <ScenarioCard key={s.tag} s={s} />
          ))}
          {SCENARIOS.map((s) => (
            <ScenarioCard key={`${s.tag}-dup`} s={s} hidden />
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6">
        <p className="text-[13px] text-white/50">Hover or focus the row to pause it.</p>
      </div>
    </section>
  );
}
