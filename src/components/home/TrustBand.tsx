import { siteConfig } from "@/lib/site-config";

/**
 * Carrier band. Real carrier marks in their own colours, untreated, running
 * as one continuous row. The track is the list twice over so the -50% reset
 * is seamless; it freezes under reduced motion.
 */
export default function TrustBand() {
  const carriers = siteConfig.carriers;
  if (carriers.length === 0) return null;
  const track = [...carriers, ...carriers];

  return (
    <section className="tone-dark bg-brand-primary-strong py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center font-body text-[15px] font-semibold tracking-normal text-white/75">
          Plans from nationally recognized carriers
        </h2>
      </div>

      <div className="mt-8 flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="marquee flex w-max items-center gap-4 pr-4">
          {track.map((c, i) => (
            <li
              key={`${c.name}-${i}`}
              aria-hidden={i >= carriers.length || undefined}
              className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl bg-white px-6 shadow-[0_10px_30px_-12px_#00000066] sm:h-24 sm:w-56 sm:px-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo}
                alt={i >= carriers.length ? "" : c.name}
                loading="lazy"
                className="max-h-10 w-auto max-w-full object-contain sm:max-h-12"
              />
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
