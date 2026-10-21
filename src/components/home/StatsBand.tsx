"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const STATS = [
  { value: 50, suffix: "", label: "States with licensed advisors" },
  { value: 365, suffix: "", label: "Days a year you can apply" },
  { value: 1, suffix: "", label: "Dedicated licensed advisor who calls you" },
  { value: 0, suffix: "", label: "Pressure to take a plan you don't want" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced || to === 0) {
      setN(to);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1100;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.round(to * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, reduced]);

  return (
    <span ref={ref} className="tabular">
      {n}
      {suffix}
    </span>
  );
}

export default function StatsBand() {
  return (
    <section className="tone-light bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="card grid grid-cols-2 overflow-hidden lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-8 text-center sm:px-8 sm:py-10 ${
                i % 2 === 1 ? "border-l border-brand-rule" : ""
              } ${i >= 2 ? "border-t border-brand-rule lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l" : ""
              }`}
            >
              <p className="font-display text-5xl font-bold leading-none tracking-[-0.03em] text-brand-primary sm:text-6xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mx-auto mt-3 max-w-[15rem] text-[14px] font-medium leading-snug text-brand-ink/65">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
