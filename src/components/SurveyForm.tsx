"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { searchStates, matchState, type StateEntry } from "@/data/states";
import { readAttribution } from "@/lib/attribution";
import { siteConfig } from "@/lib/site-config";

/**
 * The 5-step survey. This is the only form implementation on the site — the
 * hero, the closing CTA, /find-my-plans, /contact, state pages and comparison pages all
 * render this same component.
 */

type Props = {
  /** Reported with the lead so we can see which placement converts. */
  formLocation: string;
  /** Hero card shows the two reassurance chips; inline instances don't. */
  variant?: "hero" | "panel";
  className?: string;
};

const HOUSEHOLD = ["1 person", "2 people", "3 people", "4 or more people"];
const TIMING = ["Immediately", "Within 30 days", "Just comparing options"];

/* --- small line icons, drawn rather than imported, so nothing else loads --- */
const Ico = ({ d }: { d: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5 shrink-0 text-brand-secondary"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);
const ICON = {
  person: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0",
  people: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2 20a7 7 0 0 1 14 0M17 20a5 5 0 0 0-3-4.6M16.5 11a3 3 0 1 0 0-6",
  group: "M7 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM17 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 20a5 5 0 0 0-10 0M22 20a5 5 0 0 0-5-5",
  home: "M3 10.5 12 3l9 7.5M5 9.5V20h14V9.5",
  yes: "m5 13 4 4 10-10",
  no: "M6 6l12 12M18 6 6 18",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  calendar: "M8 3v3M16 3v3M3 9h18M5 6h14v15H5z",
  scan: "m21 21-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
  lock: "M6 11h12v9H6zM9 11V8a3 3 0 0 1 6 0v3",
  shield: "M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3Z",
};

export default function SurveyForm({
  formLocation,
  variant = "panel",
  className = "",
}: Props) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState({
    state: "",
    household: "",
    pre_existing: "",
    timing: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });
  const [stateQuery, setStateQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const suggestions = useMemo(() => searchStates(stateQuery), [stateQuery]);

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    setError("");
  };

  /* Move focus to the new step's heading so keyboard and screen-reader users
     aren't left behind when a choice auto-advances. */
  useEffect(() => {
    if (step === 1) return;
    rootRef.current?.querySelector<HTMLElement>("[data-step-heading]")?.focus();
  }, [step]);

  function pickState(s: StateEntry) {
    setAnswers((a) => ({ ...a, state: s.name }));
    setStateQuery(s.name);
    setOpen(false);
  }

  function submitState() {
    const chosen = matchState(stateQuery) ?? suggestions[0];
    if (!chosen) {
      setError("Please choose your state from the list.");
      return;
    }
    pickState(chosen);
    go(2);
  }

  function choose(field: keyof typeof answers, value: string, next: number) {
    setAnswers((a) => ({ ...a, [field]: value }));
    go(next);
  }

  function formatPhone(raw: string) {
    const d = raw.replace(/\D/g, "").slice(0, 10);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const company = (form.elements.namedItem("company") as HTMLInputElement)
      ?.value;

    if (!answers.first_name.trim() || !answers.last_name.trim()) {
      setError("Please enter your first and last name.");
      return;
    }
    if (answers.phone.replace(/\D/g, "").length !== 10) {
      setError("Please enter a valid US phone number.");
      return;
    }
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(answers.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          company,
          form_location: formLocation,
          ...readAttribution(),
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSending(false);
        return;
      }
      if (typeof window !== "undefined") {
        const w = window as unknown as { dataLayer?: unknown[] };
        w.dataLayer = w.dataLayer || [];
        const attr = readAttribution();
        w.dataLayer.push({
          event: "generate_lead",
          state: answers.state,
          household: answers.household,
          pre_existing: answers.pre_existing,
          timing: answers.timing,
          channel: attr.channel,
          gclid: attr.gclid,
          fbclid: attr.fbclid,
          msclkid: attr.msclkid,
          ttclid: attr.ttclid,
          utm_campaign: attr.utm_campaign,
        });
      }
      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please try again.");
      setSending(false);
    }
  }

  const slide = reduced
    ? {}
    : {
        initial: { opacity: 0, x: dir * 28 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: dir * -28 },
        transition: { duration: 0.32, ease: [0.32, 0.72, 0, 1] as const },
      };

  const optionClass =
    "flex w-full min-h-[3.25rem] items-center gap-3 rounded-2xl border border-brand-rule-strong bg-white px-4 py-3.5 text-left text-[15px] font-semibold text-brand-ink transition-[border-color,background-color,box-shadow] duration-200 hover:border-brand-primary hover:bg-brand-wash hover:shadow-[0_0_0_3px_var(--color-brand-wash)] active:scale-[0.99]";

  const fieldClass =
    "w-full min-w-0 rounded-xl border border-brand-rule-strong bg-white px-4 py-3.5 text-[16px] text-brand-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-brand-ink/45 focus:border-brand-primary focus:shadow-[0_0_0_4px_var(--color-brand-wash)]";

  return (
    <div
      ref={rootRef}
      data-survey
      className={`tone-reset w-full max-w-full overflow-hidden rounded-[1.75rem] border border-brand-rule bg-white text-brand-ink ${
        variant === "hero" ? "shadow-[0_2px_4px_#0e254714,0_30px_80px_-20px_#0e254766]" : "shadow-[var(--shadow-card)]"
      } ${className}`}
    >
      {/* Card header */}
      <div className="border-b border-brand-rule px-5 pb-4 pt-5 sm:px-7 sm:pt-6">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[13px] font-semibold text-brand-primary">Free plan review</p>
          <p className="tabular text-[13px] font-medium text-brand-ink/55">Step {step} of 5</p>
        </div>
        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                n <= step ? "bg-brand-accent" : "bg-brand-tint"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-5 py-6 sm:px-7 sm:py-7">
        {step > 1 && step < 6 && (
          <button
            type="button"
            onClick={() => go(step - 1)}
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-secondary hover:text-brand-primary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
              <path d="M15 18 9 12l6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        )}

        <AnimatePresence mode="wait" initial={false}>
          {/* ---------------------------- Step 1 ---------------------------- */}
          {step === 1 && (
            <motion.div key="s1" {...slide}>
              <p className="text-[13px] font-semibold text-brand-accent">Let&apos;s find your coverage</p>
              <h3
                tabIndex={-1}
                data-step-heading
                className="mt-1.5 text-[1.75rem] leading-tight text-brand-primary outline-none sm:text-[2rem]"
              >
                Start with your state.
              </h3>

              <div className="relative mt-4">
                <label htmlFor={`${uid}-state`} className="sr-only">
                  Your state
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-brand-rule-strong bg-white px-4 transition-[border-color,box-shadow] duration-200 focus-within:border-brand-primary focus-within:shadow-[0_0_0_4px_var(--color-brand-wash)]">
                  <Ico d={ICON.scan} />
                  <input
                    id={`${uid}-state`}
                    autoComplete="address-level1"
                    role="combobox"
                    aria-expanded={open && suggestions.length > 0}
                    aria-controls={`${uid}-states`}
                    aria-autocomplete="list"
                    placeholder="Type your state*"
                    value={stateQuery}
                    onChange={(e) => {
                      setStateQuery(e.target.value);
                      setOpen(true);
                      setHighlight(0);
                      setError("");
                    }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                        setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
                      } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setHighlight((h) => Math.max(h - 1, 0));
                      } else if (e.key === "Escape") {
                        setOpen(false);
                      } else if (e.key === "Enter") {
                        e.preventDefault();
                        if (open && suggestions[highlight]) {
                          pickState(suggestions[highlight]);
                          go(2);
                        } else {
                          submitState();
                        }
                      }
                    }}
                    className="w-full min-w-0 bg-transparent py-3.5 text-[16px] outline-none placeholder:text-brand-ink/45"
                  />
                </div>

                {open && suggestions.length > 0 && (
                  <ul
                    id={`${uid}-states`}
                    role="listbox"
                    className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-xl border border-brand-rule bg-white p-1 shadow-[var(--shadow-lift)]"
                  >
                    {suggestions.map((s, i) => (
                      <li key={s.slug}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={i === highlight}
                          onMouseEnter={() => setHighlight(i)}
                          onClick={() => {
                            pickState(s);
                            go(2);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-[15px] ${
                            i === highlight
                              ? "bg-brand-wash text-brand-primary"
                              : "text-brand-ink"
                          }`}
                        >
                          <span>{s.name}</span>
                          <span className="text-xs opacity-70">{s.abbr}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {error && <p className="mt-2 text-sm font-semibold text-brand-danger">{error}</p>}

              <button
                type="button"
                onClick={submitState}
                className="btn-primary btn-lg mt-4 w-full"
              >
                Start My Free Review
              </button>

              {variant === "hero" && (
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[13px] font-medium text-brand-ink/65">
                  <span className="inline-flex items-center gap-1.5">
                    <Ico d={ICON.shield} /> Secure &amp; confidential
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Ico d={ICON.calendar} /> Takes about 30 seconds
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {/* ---------------------------- Step 2 ---------------------------- */}
          {step === 2 && (
            <motion.div key="s2" {...slide}>
              <h3
                tabIndex={-1}
                data-step-heading
                className="text-[1.35rem] leading-snug text-brand-primary outline-none sm:text-[1.6rem]"
              >
                How many people in your household need health insurance coverage?
              </h3>
              <div className="mt-4 grid gap-2.5">
                {HOUSEHOLD.map((opt, i) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => choose("household", opt, 3)}
                    className={optionClass}
                  >
                    <Ico d={[ICON.person, ICON.people, ICON.group, ICON.home][i]} />
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ---------------------------- Step 3 ---------------------------- */}
          {step === 3 && (
            <motion.div key="s3" {...slide}>
              <h3
                tabIndex={-1}
                data-step-heading
                className="text-[1.35rem] leading-snug text-brand-primary outline-none sm:text-[1.6rem]"
              >
                Do you or anyone in your household have any major pre-existing
                conditions that need to be covered?
              </h3>
              <div className="mt-4 grid gap-2.5">
                {["Yes", "No"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => choose("pre_existing", opt, 4)}
                    className={optionClass}
                  >
                    <Ico d={opt === "Yes" ? ICON.yes : ICON.no} />
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ---------------------------- Step 4 ---------------------------- */}
          {step === 4 && (
            <motion.div key="s4" {...slide}>
              <h3
                tabIndex={-1}
                data-step-heading
                className="text-[1.35rem] leading-snug text-brand-primary outline-none sm:text-[1.6rem]"
              >
                When are you looking for health coverage?
              </h3>
              <div className="mt-4 grid gap-2.5">
                {TIMING.map((opt, i) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => choose("timing", opt, 5)}
                    className={optionClass}
                  >
                    <Ico d={[ICON.bolt, ICON.calendar, ICON.scan][i]} />
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ---------------------------- Step 5 ---------------------------- */}
          {step === 5 && (
            <motion.form key="s5" onSubmit={handleSubmit} noValidate {...slide}>
              <h3
                tabIndex={-1}
                data-step-heading
                className="text-[1.6rem] leading-tight text-brand-primary outline-none sm:text-[1.85rem]"
              >
                Let&apos;s find your best coverage
              </h3>

              {/* Honeypot — off-screen, never focusable, never announced. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                defaultValue=""
                className="pointer-events-none absolute left-[-9999px] size-px opacity-0"
              />

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${uid}-fn`} className="sr-only">First Name</label>
                  <input
                    id={`${uid}-fn`}
                    name="first_name"
                    autoComplete="given-name"
                    placeholder="First Name*"
                    value={answers.first_name}
                    onChange={(e) => setAnswers((a) => ({ ...a, first_name: e.target.value }))}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-ln`} className="sr-only">Last Name</label>
                  <input
                    id={`${uid}-ln`}
                    name="last_name"
                    autoComplete="family-name"
                    placeholder="Last Name*"
                    value={answers.last_name}
                    onChange={(e) => setAnswers((a) => ({ ...a, last_name: e.target.value }))}
                    className={fieldClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${uid}-ph`} className="sr-only">Phone number</label>
                  <input
                    id={`${uid}-ph`}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(555) 555-5555*"
                    value={answers.phone}
                    onChange={(e) => setAnswers((a) => ({ ...a, phone: formatPhone(e.target.value) }))}
                    className={fieldClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${uid}-em`} className="sr-only">Email address</label>
                  <input
                    id={`${uid}-em`}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@email.com*"
                    value={answers.email}
                    onChange={(e) => setAnswers((a) => ({ ...a, email: e.target.value }))}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px] font-medium text-brand-ink/65">
                <span className="inline-flex items-center gap-1.5">
                  <Ico d={ICON.lock} /> 256-bit SSL encrypted
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Ico d={ICON.shield} /> Never sold to third parties
                </span>
              </div>

              {error && (
                <p role="alert" className="mt-3 text-sm font-semibold text-brand-danger">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="btn-primary btn-lg mt-4 w-full"
              >
                {sending ? "Finding your matches…" : "See My Plan Options"}
              </button>

              <p className="mt-3 flex items-start gap-2 text-[12.5px] leading-relaxed text-brand-ink/70">
                <span className="mt-0.5">
                  <Ico d={ICON.lock} />
                </span>
                <span>
                  Secure &amp; private. By submitting you agree to be contacted by
                  one licensed advisor.
                </span>
              </p>

              <p className="mt-3 text-[11.5px] leading-relaxed text-brand-ink/55">
                By clicking &lsquo;See My Plan Options,&rsquo; you agree that{" "}
                {siteConfig.name} and its licensed advisors may contact you by
                phone, text, or email about health coverage — including via
                automated technology. Consent isn&apos;t a condition of purchase.
                Message/data rates may apply.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
