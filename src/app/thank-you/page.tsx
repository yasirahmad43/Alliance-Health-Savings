import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/lib/site-config";
import { Hours } from "@/components/Hours";

export const metadata: Metadata = {
  title: "Thank you",
  description: "We have received your information. A licensed advisor will be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  const phone = Boolean(siteConfig.showPhone && siteConfig.phoneTel);

  return (
    <>
      <PageHero film="review" title={<>Thank you.</>}>
        <p>
          We have received your information. A licensed advisor will reach out
          to you as soon as possible.
        </p>
      </PageHero>

      <section className="section tone-light bg-brand-canvas">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="card flex flex-col items-center p-8 text-center sm:p-12">
            {phone ? (
              <>
                <p className="text-[15.5px] text-brand-ink/80">
                  Prefer to speak with someone now? Call us at
                </p>
                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  className="tabular mt-2 inline-block font-display text-3xl font-bold text-white hover:underline sm:text-4xl"
                >
                  {siteConfig.phoneDisplay}
                </a>
                <Hours className="mt-1 text-sm text-white/70" />
              </>
            ) : (
              <p className="text-[15.5px] text-brand-ink/80">
                There is nothing else you need to do for now.
              </p>
            )}
            <Link href="/" className="btn-primary mt-8">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
