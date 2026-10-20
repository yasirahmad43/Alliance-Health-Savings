import type { Metadata } from "next";
import Image from "next/image";
import LoopVideo from "@/components/LoopVideo";
import Script from "next/script";
import Faq from "@/components/home/Faq";
import { faqs } from "@/data/faq";
import SurveyForm from "@/components/SurveyForm";
import PageHero from "@/components/PageHero";
import StatsBand from "@/components/home/StatsBand";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";

export const metadata: Metadata = {
  title: "Start Your Free Coverage Review",
  description:
    "Five short questions, about thirty seconds. A licensed advisor reviews your details and calls you once — no payment details, no obligation.",
  alternates: { canonical: "/find-my-plans" },
};

const FACTS = [
  { k: "What it costs", v: "Nothing. There is no fee for the review." },
  { k: "How long it takes", v: "About thirty seconds for the survey, one call afterwards." },
  { k: "What we ask for", v: "Your state, household size, whether conditions need covering, timing, and how to reach you." },
  { k: "What we never ask for", v: "Social security number, date of birth, income, payment details, or a login." },
  { k: "Who calls", v: "One licensed advisor. Not a bank of dialers, and never a third-party buyer." },
];

export default function FindMyPlansPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageHero
        film="review"
        eyebrow="Free coverage review"
        title={
          <>
            Tell us what you need.
            <br />
            <span className="accent-on-dark">A person takes it from there.</span>
          </>
        }
        aside={
          <div id="find-my-plans" className="scroll-mt-28">
            <SurveyForm formLocation="find-my-plans-page" variant="hero" />
          </div>
        }
      >
        <p>
          This is the same review whether you arrived from a comparison page, a
          state page, or the front door. Five questions, one advisor, no
          obligation to enroll in anything.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/20">
            <Image src="/media/advisor.webp" alt="" fill sizes="64px" className="object-cover" />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/75">
            Your answers are read by a licensed advisor before anyone dials. If a
            Marketplace plan, Medicaid or an employer plan is the better deal for
            you, that is what you will be told.
          </p>
        </div>
        <ul className="grid gap-3 border-t border-white/15 pt-6 text-[16px] font-medium text-white">
          <li className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-white" aria-hidden="true">
                <path d="m4 12.5 5 5L20 6.5" />
              </svg>
            </span>
            No fee for the review, ever
          </li>
          <li className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-white" aria-hidden="true">
                <path d="m4 12.5 5 5L20 6.5" />
              </svg>
            </span>
            No SSN, date of birth or payment details
          </li>
          <li className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-white" aria-hidden="true">
                <path d="m4 12.5 5 5L20 6.5" />
              </svg>
            </span>
            Pre-existing conditions covered
          </li>
          <li className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-white" aria-hidden="true">
                <path d="m4 12.5 5 5L20 6.5" />
              </svg>
            </span>
            One licensed advisor calls — once
          </li>
        </ul>
      </PageHero>

      <StatsBand />

      <section className="section tone-dark bg-brand-primary-strong">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-stretch lg:gap-16">
          <div className="flex flex-col">
            <span className="eyebrow self-start">Before you start</span>
            <h2 className="mt-5 text-3xl text-white sm:text-4xl">
              Exactly what this review{" "}
              <span className="accent-on-dark">is, and is not.</span>
            </h2>
            <div className="relative mt-8 aspect-[16/11] overflow-hidden rounded-[1.75rem] ring-1 ring-white/15 lg:aspect-auto lg:min-h-[16rem] lg:flex-1">
              <LoopVideo
                clip="review"
                label="An older couple dancing in their sunlit living room"
                inset={{ src: "/media/page-kitchen.webp", alt: "A man reviewing options on a laptop on his porch" }}
              />
            </div>
          </div>
          <dl className="card divide-y divide-brand-rule px-6 sm:px-8">
            {FACTS.map((f) => (
              <div key={f.k} className="grid gap-1 py-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
                <dt className="font-display text-[15px] font-bold text-brand-primary">{f.k}</dt>
                <dd className="text-[15px] leading-relaxed text-brand-ink/80">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <HowItWorks />
      <Testimonials />
      <Faq />

      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
    </>
  );
}
