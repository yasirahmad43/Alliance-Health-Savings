"use client";

import { useEffect, useRef } from "react";

/**
 * The background film used behind every page hero. Each page type has its own
 * 12-second family clip, played at full strength. Only the left side carries a navy
 * gradient, which is where the headline sits; the rest of the frame shows the
 * footage clearly.
 *
 * Under `prefers-reduced-motion` it never plays: the poster frame stands in,
 * which is also what a visitor on a slow connection gets.
 */
export type Film = "home" | "about" | "contact" | "compare" | "states" | "review" | "legal";

export default function HeroFilm({ film = "about" }: { film?: Film }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.play().catch(() => {
      /* autoplay refused — the poster frame is the fallback */
    });
  }, [film]);

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <video
        ref={ref}
        className="size-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster={`/media/film-${film}.webp`}
      >
        <source src={`/media/film-${film}.mp4`} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0e254799] md:bg-transparent md:bg-[linear-gradient(90deg,#0e2547d9_0%,#0e2547a6_42%,#0e254733_78%,#0e25470d_100%)]" />
    </div>
  );
}
