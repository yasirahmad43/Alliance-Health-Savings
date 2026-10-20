import type { ReactNode } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import MediaBand from "@/components/MediaBand";

/**
 * Shared shell for the four legal routes. The prose itself is written per page.
 * These are good-faith operator templates, not legal advice — the client's own
 * counsel should review them before launch.
 */
export default function LegalPage({
  title,
  updated,
  intro,
  band,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  band: { src: string; alt: string; eyebrow: string; heading: string; body: string };
  children: ReactNode;
}) {
  return (
    <>
      <PageHero film="legal" eyebrow="Legal" title={title}>
        <p>{intro}</p>
        <p className="text-[13px] text-white/60">Last updated {updated}</p>
      </PageHero>

      <section className="tone-light bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="legal max-w-3xl">{children}</div>
        </div>
      </section>

      <MediaBand
        {...band}
        video={{ clip: "legal", label: "A mother helping her kids with school projects at the table" }}
        tone="dark"
      />

      <section className="section tone-light bg-brand-canvas">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="card flex flex-col gap-6 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl text-brand-primary sm:text-4xl">
                A question about this page?
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-brand-ink/75">
                Ask us in plain English and a real person will answer. You can
                also ask us to access, correct or delete anything you have sent.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Contact us
              </Link>
              <Link href="/privacy" className="btn-secondary">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
