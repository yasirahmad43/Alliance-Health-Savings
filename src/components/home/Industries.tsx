import Image from "next/image";
import Reveal from "@/components/Reveal";
import SurveyCTA from "@/components/SurveyCTA";

/**
 * Every audience carries its own photograph — no chip-only tail. The four
 * lead cards run larger because they are the highest-intent audiences; the
 * rest run as a denser grid of the same card, so the section reads as one
 * family of objects rather than "cards, then leftovers".
 */
type Card = { title: string; body: string; img: string; alt: string };

const LEAD: Card[] = [
  { title: "Trades & contractors", body: "Income moves with the season, and a group plan was never on the table.", img: "/media/work-carpenter.webp", alt: "An electrician working on a home's electrical panel" },
  { title: "Drivers & owner-operators", body: "You cross state lines every week — your network should too.", img: "/media/work-driver.webp", alt: "A delivery driver opening the side door of a van" },
  { title: "Travel nurses & healthcare staff", body: "Contracts end, coverage lapses, and the next assignment starts in a different state.", img: "/media/work-nurse.webp", alt: "A travel nurse in scrubs walking a hospital corridor" },
  { title: "Restaurant & hospitality owners", body: "A small team, thin margins, and nobody to hand the benefits problem to.", img: "/media/cafe-owner.webp", alt: "A bakery owner arranging bread behind the counter" },
];

const REST: Card[] = [
  { title: "Self-employed & freelancers", body: "No HR department, no open enrollment, no one checking whether you are covered.", img: "/media/work-freelancer.webp", alt: "A freelance designer working at a desk in a sunny loft" },
  { title: "Families", body: "Four people, four sets of needs, and one premium that has to make sense.", img: "/media/work-family.webp", alt: "A family of four walking through a park" },
  { title: "Small business owners", body: "Too few employees for a group plan, too many people depending on you.", img: "/media/work-shop-owner.webp", alt: "A florist arranging flowers in her shop" },
  { title: "Consultants", body: "Between contracts is exactly when a lapse in coverage costs the most.", img: "/media/work-consultant.webp", alt: "A consultant leading a small meeting in a coworking space" },
  { title: "Realtors", body: "Commission income makes a fixed monthly premium a real decision.", img: "/media/work-realtor.webp", alt: "A real estate agent handing keys to a couple on a porch" },
  { title: "Gig & rideshare workers", body: "The platform does not cover you, and the marketplace window closed in January.", img: "/media/work-gig.webp", alt: "A delivery courier with a bike at a city crosswalk" },
  { title: "Entrepreneurs", body: "Every dollar is working somewhere else. Coverage still cannot be the gap.", img: "/media/work-entrepreneur.webp", alt: "Two founders packing orders in a small studio" },
  { title: "Early retirees", body: "Retired before 65, and Medicare is still years away.", img: "/media/work-retiree.webp", alt: "A couple in their sixties cycling along a lakeside path" },
  { title: "Part-time & seasonal", body: "Hours that never quite reach the threshold your employer set for benefits.", img: "/media/work-seasonal.webp", alt: "A seasonal worker picking apples in an orchard" },
  { title: "Construction crews", body: "Physical work, real risk, and coverage that ends the day the job does.", img: "/media/work-construction.webp", alt: "A roofing contractor reviewing plans on a job site" },
  { title: "Long-haul truckers", body: "A local HMO is useless three states from home.", img: "/media/work-trucker.webp", alt: "A long-haul trucker beside his cab at a sunrise truck stop" },
  { title: "Between jobs", body: "COBRA hands you the full unsubsidized premium the week you can least afford it.", img: "/media/moving-couple.webp", alt: "A couple carrying boxes into a new apartment" },
];

function IndustryCard({ c, large }: { c: Card; large?: boolean }) {
  return (
    <article className="card flex flex-col overflow-hidden transition-[box-shadow,border-color] duration-300 hover:border-brand-rule-strong hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[4/3]">
        <Image
          src={c.img}
          alt={c.alt}
          fill
          sizes={large ? "(min-width: 1024px) 25vw, 50vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"}
          className="object-cover"
        />
      </div>
      <div className={`flex-1 ${large ? "p-5 sm:p-6" : "p-4 sm:p-5"}`}>
        <h3 className={`leading-snug text-brand-primary ${large ? "text-lg sm:text-xl" : "text-[15px] sm:text-base"}`}>
          {c.title}
        </h3>
        <p className={`mt-2 leading-relaxed text-brand-ink/65 ${large ? "text-[15px]" : "text-[13.5px]"}`}>
          {c.body}
        </p>
      </div>
    </article>
  );
}

export default function Industries() {
  return (
    <section className="section tone-dark bg-brand-primary-strong">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Who we serve</span>
            <h2 className="mt-5 text-4xl text-brand-primary sm:text-5xl lg:text-[3.5rem]">
              Built for people whose work{" "}
              <span className="accent-on-dark">does not come with benefits.</span>
            </h2>
            <p className="lede mt-5">
              If nobody hands you an enrollment packet in November, this is the
              route most people in your situation end up taking.
            </p>
          </div>
          <SurveyCTA formLocation="home-industries" className="btn-primary self-start lg:self-auto">
            Find My Plan
          </SurveyCTA>
        </div>

        <Reveal className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {LEAD.map((c) => (
            <IndustryCard key={c.title} c={c} large />
          ))}
        </Reveal>

        <Reveal className="mt-4 grid grid-cols-2 gap-4 sm:mt-6 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {REST.map((c) => (
            <IndustryCard key={c.title} c={c} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
