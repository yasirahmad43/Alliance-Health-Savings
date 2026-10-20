"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * A silent looping clip that fills its parent box. It only loads and plays
 * while on screen, and pauses when scrolled away. Under reduced motion the
 * poster frame stands in. The footage is shown as-is: no tint, no zoom.
 *
 * `inset` pins the page's own photograph in the corner of the clip, so a
 * section gains motion without losing the still it already had.
 */
export default function LoopVideo({
  clip,
  label,
  inset,
  ground = "dark",
}: {
  clip: string;
  label: string;
  inset?: { src: string; alt: string };
  ground?: "light" | "dark";
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.play().catch(() => {
            /* autoplay refused — the poster frame is the fallback */
          });
        } else {
          v.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [clip]);

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 size-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster={`/media/clip-${clip}.webp`}
        aria-label={label}
      >
        <source src={`/media/clip-${clip}.mp4`} type="video/mp4" />
      </video>
      {inset && (
        <div
          className={`absolute bottom-3 right-3 aspect-[4/3] w-[38%] max-w-[15rem] overflow-hidden rounded-2xl ring-4 sm:bottom-5 sm:right-5 ${
            ground === "dark" ? "ring-brand-primary-strong" : "ring-brand-canvas"
          }`}
        >
          <Image src={inset.src} alt={inset.alt} fill sizes="240px" className="object-cover" />
        </div>
      )}
    </>
  );
}
