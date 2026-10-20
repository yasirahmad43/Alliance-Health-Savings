import type { Metadata } from "next";
import SurveyForm from "@/components/SurveyForm";
import MediaBand from "@/components/MediaBand";
import AdvisorHours from "@/components/AdvisorHours";
import PageHero from "@/components/PageHero";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import StateMap from "@/components/home/StateMap";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach a licensed advisor. Five short questions and one honest call — no obligation, no pressure.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const hasDirect = Boolean(
    (siteConfig.showPhone && siteConfig.phoneTel) || siteConfig.email,
  );

  const blocks = [
    {
      h: "What to expect",
      p: "One licensed advisor reads what you send and calls you once. They will not ask for payment details, and you are not committing to anything by getting in touch.",
    },
    {
      h: "Service area",
      p: `${siteConfig.serviceArea}. Plan availability and pricing vary by state, age, household size and health history.`,
    },
    {
      h: "Privacy",
      p: "Your details go to one licensed advisor and are never sold to third parties. You can ask us to delete them at any time.",
    },
    {
      h: "One form, not two",
      p: "The form above is how you reach us. It is the same short review used everywhere on the site, so nothing you type gets lost between departments.",
    },
  ];

  return (
    <>
      <PageHero
        film="contact"
        eyebrow="Contact"
        title={
          <>
            Get in touch with{" "}
            <span className="accent-on-dark">a licensed advisor.</span>
          </>
        }
        aside={
          <div id="find-my-plans" className="scroll-mt-28">
            <SurveyForm formLocation="contact-page" variant="hero" />
          </div>
        }
      >
        <p>
          This form is how you reach us. Five short questions, then one honest
          call from a licensed advisor — no obligation, no pressure.
        </p>
        <ul className="grid gap-3 border-t border-white/15 pt-6 text-[16px] font-medium text-white">
          <li className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-white" aria-hidden="true">
                <path d="m4 12.5 5 5L20 6.5" />
              </svg>
            </span>
            Licensed advisors in all 50 states
          </li>
          <li className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-white" aria-hidden="true">
                <path d="m4 12.5 5 5L20 6.5" />
              </svg>
            </span>
            Your details go to one advisor, never sold
          </li>
          <li className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-white" aria-hidden="true">
                <path d="m4 12.5 5 5L20 6.5" />
              </svg>
            </span>
            Apply any day of the year
          </li>
          <li className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-white" aria-hidden="true">
                <path d="m4 12.5 5 5L20 6.5" />
              </svg>
            </span>
            Say no on the call and that is the end of it
          </li>
        </ul>
      </PageHero>

      <section className="section tone-light bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <span className="eyebrow">Before you send it</span>
          <h2 className="mt-5 max-w-2xl text-3xl text-brand-primary sm:text-4xl">
            What reaching out{" "}
            <span className="text-brand-accent">actually means.</span>
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {blocks.map((b) => (
              <li key={b.h} className="card flex flex-col p-6 sm:p-8">
                <h3 className="font-display text-xl font-bold text-brand-primary">{b.h}</h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-brand-ink/80">{b.p}</p>
              </li>
            ))}
          </ul>

          <AdvisorHours className="mt-4" />

          {hasDirect && (
            <div className="card mt-4 flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <h3 className="font-display text-xl font-bold text-brand-primary">Direct</h3>
              <div className="sm:text-right">
                {siteConfig.showPhone && siteConfig.phoneTel && (
                  <a href={`tel:${siteConfig.phoneTel}`} className="block font-display text-2xl font-bold text-white hover:underline">
                    {siteConfig.phoneDisplay}
                  </a>
                )}
                {siteConfig.email && (
                  <a href={`mailto:${siteConfig.email}`} className="block break-all text-[15px] text-white/80 hover:underline">
                    {siteConfig.email}
                  </a>
                )}
                {siteConfig.hours && <p className="text-sm text-white/65">{siteConfig.hours}</p>}
              </div>
            </div>
          )}
        </div>
      </section>

      <MediaBand
        src="/media/photo-contact.webp"
        alt="A woman smiling on a phone call on her balcony"
        video={{ clip: "contact", label: "A self-employed woman working on a laptop at a cafe window" }}
        eyebrow="What happens next"
        heading="One advisor reads it before anyone dials."
        body="Nothing you send here goes to a lead exchange or a bank of dialers. A licensed advisor reads your answers, works out what is actually available where you live, and calls once."
        points={[
          "No payment details, ever",
          "One call, not a flood of them",
          "Say no and that is the end of it",
        ]}
        tone="dark"
        flip
      />

      <HowItWorks />
      <Testimonials />
      <StateMap />
    </>
  );
}
