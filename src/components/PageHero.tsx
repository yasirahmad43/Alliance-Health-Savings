import Link from "next/link";
import type { ReactNode } from "react";
import HeroFilm, { type Film } from "@/components/HeroFilm";

/** The dark film hero every inner page opens with. */
export default function PageHero({
  film,
  eyebrow,
  back,
  title,
  children,
  aside,
}: {
  film: Film;
  eyebrow?: string;
  back?: { href: string; label: string };
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-primary-strong py-14 text-white sm:py-20">
      <HeroFilm film={film} />
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 ${
          aside ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,29rem)] lg:items-center lg:gap-16" : ""
        }`}
      >
        <div className="max-w-4xl">
          {back && (
            <Link
              href={back.href}
              className="mb-3 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-white/80 hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
                <path d="M19 12H5m6 6-6-6 6-6" />
              </svg>
              {back.label}
            </Link>
          )}
          {eyebrow && <span className="eyebrow eyebrow-dark">{eyebrow}</span>}
          <h1 className={`${eyebrow ? "mt-5" : ""} font-display text-4xl font-bold sm:text-5xl lg:text-6xl`}>
            {title}
          </h1>
          <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-white/85">{children}</div>
        </div>
        {aside}
      </div>
    </section>
  );
}
