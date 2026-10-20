import Image from "next/image";
import type { ReactNode } from "react";
import LoopVideo from "@/components/LoopVideo";

/**
 * A photograph paired with one short, real point. It sits on the same 7xl rail
 * as every other section so its left edge lines up, and it alternates the
 * image side so two bands on one page never read as a repeated template.
 *
 * `tone` sets the ground. Colours resolve through the tone scope in
 * globals.css, so the optional points box is navy on a light ground and white
 * on a dark one. The photograph is shown as-is: no tint, no blend, no zoom.
 */
export default function MediaBand({
  src,
  alt,
  eyebrow,
  heading,
  body,
  points,
  credit,
  video,
  flip = false,
  tone = "light",
}: {
  src: string;
  alt: string;
  eyebrow: string;
  heading: string;
  body: string;
  points?: string[];
  credit?: ReactNode;
  /** A clip name in /media (clip-NAME.mp4). The photo then sits inset on it. */
  video?: { clip: string; label: string };
  flip?: boolean;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <section className={`section ${dark ? "tone-dark bg-brand-primary-strong" : "tone-light bg-brand-canvas"}`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-stretch lg:gap-16">
        <figure className={`flex flex-col ${flip ? "lg:order-2" : ""}`}>
          <div
            className={`relative aspect-[16/11] overflow-hidden rounded-[1.75rem] lg:aspect-auto lg:min-h-[26rem] lg:flex-1 ${
              dark ? "ring-1 ring-white/15" : "border border-brand-rule shadow-[var(--shadow-lift)]"
            }`}
          >
            {video ? (
              <LoopVideo clip={video.clip} label={video.label} inset={{ src, alt }} ground={tone} />
            ) : (
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
          {credit && (
            <figcaption className="mt-3 text-[12px] leading-snug text-brand-ink/55">
              {credit}
            </figcaption>
          )}
        </figure>

        <div className={`flex flex-col justify-center ${flip ? "lg:order-1" : ""}`}>
          <span className="eyebrow self-start">{eyebrow}</span>
          <h2 className="mt-5 text-3xl text-brand-primary sm:text-4xl lg:text-[2.75rem]">
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-ink/70">
            {body}
          </p>

          {points && points.length > 0 && (
            <ul className="card mt-8 divide-y divide-brand-rule px-6">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 py-4 text-[15.5px] font-medium leading-snug text-brand-ink">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
                      <path d="m4 12.5 5 5L20 6.5" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
