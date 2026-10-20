"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import SurveyCTA from "@/components/SurveyCTA";

const STEPS = [
  {
    title: "Tell us what you're looking for",
    img: "/media/homework.webp",
    alt: "Someone filling in a short form on a laptop at their kitchen island",
    body: "Five short questions: your state, who needs coverage, whether pre-existing conditions are in the picture, and how soon you need it. About thirty seconds.",
  },
  {
    title: "A licensed advisor reviews your details",
    img: "/media/page-team.webp",
    alt: "A licensed advisor reading through a client's details at their desk",
    body: "A real person reads your answers and works out which private PPO options are actually available to someone in your state and situation.",
  },
  {
    title: "You get a quick call",
    img: "/media/advisor-call.webp",
    alt: "An advisor wearing a headset on a call with a client",
    body: "One call, from one advisor. They explain what each option covers, what it does not, and what it would cost — and they answer the awkward questions.",
  },
  {
    title: "You decide",
    img: "/media/kitchen-review.webp",
    alt: "A family on a speakerphone call with their advisor at the dinner table",
    body: "Take the plan, take a different one, or take nothing at all. There is no deadline on our end and nobody calls you back to pressure you.",
  },
];

const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * An interactive stepper. The steps advance on their own while the section is
 * on screen, with a progress bar showing the time left on the current step.
 * Selecting a step jumps to it; hovering or focusing inside pauses the timer.
 * Desktop shows a large picture beside the list; on phones each step's picture
 * opens inside the step itself. Reduced motion turns the timer and the
 * transitions off.
 */
export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [held, setHeld] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.35 });
  const reduced = useReducedMotion();
  const running = inView && !held && !reduced;

  const go = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  return (
    <section className="section tone-light bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-5 text-4xl text-brand-primary sm:text-5xl lg:text-[3.5rem]">
              Four steps, and{" "}
              <span className="text-brand-accent">you can stop at any of them.</span>
            </h2>
          </div>
          <SurveyCTA formLocation="home-how-it-works" className="btn-primary self-start lg:self-auto">
            Find My Plan
          </SurveyCTA>
        </div>

        <div
          ref={root}
          className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-stretch lg:gap-12"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false);
          }}
        >
          {/* Large picture, desktop only */}
          <div className="relative hidden min-h-[34rem] overflow-hidden rounded-[1.75rem] border border-brand-rule bg-brand-canvas lg:block">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={reduced ? false : { clipPath: "inset(0 0 0 100%)", zIndex: 2 }}
                animate={{ clipPath: "inset(0 0 0 0%)", zIndex: 2 }}
                exit={{ zIndex: 1, transition: { duration: 0.7 } }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Image
                  src={STEPS[active].img}
                  alt={STEPS[active].alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 1px"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-[var(--shadow-lift)]">
              <span className="tabular font-display text-[15px] font-bold text-brand-primary">
                Step {active + 1} of {STEPS.length}
              </span>
              <span className="flex gap-1.5" aria-hidden="true">
                {STEPS.map((s, i) => (
                  <span
                    key={s.title}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === active ? "w-6 bg-brand-accent" : "w-1.5 bg-brand-primary/25"
                    }`}
                  />
                ))}
              </span>
            </div>
          </div>

          {/* The steps. The order matters, so the numbers carry information. */}
          <ol className="flex flex-col gap-3">
            {STEPS.map((s, i) => {
              const on = i === active;
              const done = i < active;
              return (
                <li
                  key={s.title}
                  className={`relative overflow-hidden rounded-3xl transition-colors duration-500 ${
                    on ? "card" : "border border-brand-rule bg-white hover:bg-brand-canvas"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-expanded={on}
                    aria-controls={`hiw-step-${i}`}
                    className="flex min-h-16 w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <span
                      className={`tabular flex size-10 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold transition-colors duration-500 ${
                        on || done
                          ? "bg-brand-accent text-white"
                          : "text-brand-primary ring-2 ring-inset ring-brand-primary/25"
                      }`}
                    >
                      {done ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                          <path d="m4 12.5 5 5L20 6.5" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span className="flex-1 font-display text-lg font-bold leading-snug text-brand-primary sm:text-xl">
                      {s.title}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`size-5 shrink-0 text-brand-primary transition-transform duration-500 ${on ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`hiw-step-${i}`}
                        key="body"
                        initial={reduced ? false : { height: 0 }}
                        animate={{ height: "auto" }}
                        exit={reduced ? undefined : { height: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={reduced ? false : { y: 12 }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="px-5 pb-6 sm:px-6 sm:pl-20"
                        >
                          <p className="text-[15.5px] leading-relaxed text-brand-ink/80">{s.body}</p>
                          <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl lg:hidden">
                            <Image
                              src={s.img}
                              alt={s.alt}
                              fill
                              sizes="(min-width: 1024px) 1px, 100vw"
                              className="object-cover"
                            />
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {on && !reduced && (
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-white/15" aria-hidden="true">
                      <span
                        key={`${active}-${cycle}`}
                        className="hiw-fill block h-full origin-left bg-brand-accent"
                        style={{ animationPlayState: running ? "running" : "paused" }}
                        onAnimationEnd={() => go((active + 1) % STEPS.length)}
                      />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
