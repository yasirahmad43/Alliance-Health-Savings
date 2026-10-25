"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The homepage hero film, with a separate cut for each layout: a 16:9 film on
 * desktop and a 9:16 film on phones, so neither is cropped into a blurry
 * close-up. Only the matching file is downloaded.
 *
 * On desktop both layers are scaled 6% from the left edge so the family
 * lands in the gap between the headline and the survey card.
 *
 * Both posters are plain images under the video, so the first paint is sharp
 * before any video loads, and stays that way under reduced motion.
 */
const DESKTOP = "(min-width: 1024px)";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mq = window.matchMedia(DESKTOP);
    const pick = () => setSrc(mq.matches ? "/media/hero-desktop.mp4" : "/media/hero-mobile.mp4");
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    v.load();
    v.play().catch(() => {
      /* autoplay refused — the poster stays */
    });
  }, [src]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/hero-mobile.webp"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover object-top lg:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/hero-desktop.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 hidden size-full origin-left scale-[1.06] object-cover lg:block"
      />
      <video
        ref={ref}
        className="absolute inset-0 size-full object-cover object-top lg:origin-left lg:scale-[1.06] lg:object-center"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        src={src ?? undefined}
      />
    </>
  );
}
