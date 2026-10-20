import type { Metadata } from "next";
import Image from "next/image";
import LoopVideo from "@/components/LoopVideo";
import { siteConfig } from "@/lib/site-config";
import PageHero from "@/components/PageHero";
import MediaBand from "@/components/MediaBand";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";
import WhyUs from "@/components/home/WhyUs";
import AdvisorBand from "@/components/home/AdvisorBand";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Who we are, how we are paid, and what we will tell you even when it costs us the sale.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    h: "We say when we are not the answer",
    p: "Medicaid, a subsidized Marketplace plan, a spouse's employer plan, staying on COBRA mid-treatment — all of these beat us for some people. An advisor who cannot say that out loud is not giving you advice, they are reading a script.",
  },
  {
    h: "One advisor, one call",
    p: "Your details are not sold, shared or auctioned. They go to a single licensed advisor who reads them and calls you once. If you say no, that is the end of it.",
  },
  {
    h: "No invented numbers",
    p: "Your actual premium comes from a carrier underwriting your actual application — not from a calculator on a marketing page. Until then, nobody should be promising you a number.",
  },
  {
    h: "Plain English, always",
    p: "Deductible, co-insurance, out-of-pocket maximum, underwriting. These decide what you pay in a bad year, and you are entitled to have them explained without jargon before you sign anything.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        film="about"
        eyebrow="About us"
        title={
          <>
            Health coverage is confusing on purpose.{" "}
            <span className="accent-on-dark">We are the other thing.</span>
          </>
        }
      >
        <p>
          {siteConfig.name} connects people who do not get insurance through an
          employer with licensed advisors who can walk them through private PPO
          coverage — honestly, at any time of year, including when the honest
          answer is that something else suits them better.
        </p>
      </PageHero>

      <section className="section tone-light bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <div className="card flex flex-col p-6 sm:p-10">
            <span className="eyebrow self-start">What we actually do</span>
            <h2 className="mt-5 text-3xl text-brand-primary sm:text-4xl">
              A referral service, not an insurance company.
            </h2>
            <div className="mt-5 space-y-4 text-[16.5px] leading-relaxed text-brand-ink/80">
              <p>
                We do not underwrite policies, decide who qualifies or issue
                coverage. We put the right information in front of a licensed
                advisor so that the call you get is a useful one.
              </p>
              <p>
                Most of the people we hear from are self-employed, between jobs,
                working seasonally, or retired before Medicare. Nobody is
                splitting the premium with them, and the default options are
                expensive, narrow, or closed for eleven months of the year.
              </p>
              <p>
                Private PPO plans are medically underwritten. The carrier asks
                health questions, which is why the coverage can cost less and
                reach further — and why it is not the right route for everyone.
              </p>
              <p>
                How we are paid: if you enroll through a licensed advisor, the
                carrier pays that advisor a commission. You are never charged for
                the review, and the commission does not change what you pay.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-brand-rule shadow-[var(--shadow-lift)] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
            <Image
              src="/media/cafe-owner.webp"
              alt="A bakery owner at work in his shop"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <WhyUs />
      <AdvisorBand />

      <section className="section tone-dark bg-brand-primary-strong">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-stretch lg:gap-14">
          <div className="flex flex-col">
            <span className="eyebrow self-start">Our promises</span>
            <h2 className="mt-5 max-w-2xl text-3xl text-white sm:text-4xl">
              Four things you can{" "}
              <span className="accent-on-dark">hold us to.</span>
            </h2>
            <ul className="mt-9 grid flex-1 gap-4 sm:grid-cols-2">
              {VALUES.map((v, i) => (
                <li key={v.h} className="card flex flex-col p-6 sm:p-7">
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand-accent font-display text-base font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold leading-tight text-brand-primary">
                    {v.h}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-brand-ink/75">
                    {v.p}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] ring-1 ring-white/15 lg:aspect-auto lg:h-full">
            <LoopVideo
              clip="about"
              label="A family riding bicycles along a country road"
              inset={{ src: "/media/photo-about-team.webp", alt: "A team of licensed advisors in their office" }}
            />
          </div>
        </div>
      </section>

      <HowItWorks />
      <Testimonials />
      <FinalCTA
        formLocation="about-page"
        eyebrow="Talk to a real person"
        title={
          <>
            Honest advice starts
            <br />
            <span className="accent-on-dark">with four questions.</span>
          </>
        }
      />
    </>
  );
}
