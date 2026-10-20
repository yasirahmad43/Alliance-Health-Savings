import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import MediaBand from "@/components/MediaBand";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "You're all set",
  description:
    "Your details are with a licensed advisor. Here is exactly what happens next.",
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    title: "We review your details",
    body: "A licensed advisor reads what you sent and works out which options are genuinely available to someone in your state and situation. No algorithm picks your plan.",
  },
  {
    title: "You get a quick call",
    body: "One call, from one person. They walk you through the real options — what each covers, what it does not, and what it would cost.",
  },
  {
    title: "You decide",
    body: "Take a plan, take a different one, or take none at all. There is no deadline on our end, and nobody will call you back to pressure you.",
  },
];

export default function ThankYouPage() {
  const phone = Boolean(siteConfig.showPhone && siteConfig.phoneTel);

  return (
    <>
      <PageHero film="review" title={<>You&rsquo;re all set.</>}>
        <p>
          Your details are with a licensed advisor. Nothing has been applied for
          and nothing has been purchased — this is the start of a conversation,
          not an enrollment.
        </p>
      </PageHero>

      <section className="section tone-light bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <span className="eyebrow">What happens next</span>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="card flex flex-col p-6 sm:p-8">
                <span className="tabular flex size-10 items-center justify-center rounded-full bg-brand-accent font-display text-lg font-bold text-white">
                  {i + 1}
                </span>
                <h2 className="mt-4 font-display text-lg font-bold leading-tight text-brand-primary">
                  {s.title}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-brand-ink/80">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <MediaBand
        src="/media/photo-thanks.webp"
        alt="A man closing his laptop with a relieved smile"
        video={{ clip: "thanks", label: "A young father lifting his toddler daughter in a sunny garden" }}
        eyebrow="No pressure, ever"
        heading="Get on with your day. We will take it from here."
        body="There is nothing to prepare and nothing to sign. When the advisor calls, it helps to know which doctors you want to keep and roughly what you pay now — but even that can wait until the call."
        points={[
          "Nothing has been applied for",
          "No payment details were taken",
          "You can say no on the call",
        ]}
        tone="dark"
      />

      <section className="section tone-light bg-brand-canvas">
        <div className={`mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 ${phone ? "lg:grid-cols-2 lg:items-stretch" : ""}`}>
          <div className="card flex flex-col p-6 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-brand-primary sm:text-3xl">
              While you wait
            </h2>
            <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-brand-ink/80">
              These are the comparisons people usually want before the call. They
              are written honestly, including the cases where another option
              beats ours.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 lg:mt-auto lg:pt-6">
              <Link href="/compare" className="btn-primary">
                Read the comparisons
              </Link>
              <Link
                href="/states"
                className="inline-flex min-h-11 items-center rounded-full px-5 font-display text-[15px] font-bold text-white ring-1 ring-white/40 transition-shadow hover:ring-white"
              >
                Coverage in your state
              </Link>
            </div>
          </div>

          {phone && (
            <div className="card flex flex-col p-6 sm:p-10">
              <p className="text-[15.5px] text-brand-ink/80">
                If you would rather not wait, you can reach an advisor directly.
              </p>
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="mt-2 inline-block font-display text-3xl font-bold text-white hover:underline"
              >
                {siteConfig.phoneDisplay}
              </a>
              {siteConfig.hours && (
                <p className="mt-1 text-sm text-brand-ink/65">{siteConfig.hours}</p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
