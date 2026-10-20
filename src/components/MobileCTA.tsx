"use client";

import { useEffect, useState } from "react";
import SurveyCTA from "@/components/SurveyCTA";
import { siteConfig } from "@/lib/site-config";

/**
 * Sticky bottom bar. Hides itself whenever a survey already on the page is on
 * screen, so it never covers the form it is pointing at. Its own button opens
 * the survey popup rather than sending the visitor to another page.
 */
export default function MobileCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const surveys = document.querySelectorAll(
      "[data-survey]:not([data-survey-modal] [data-survey])",
    );
    if (!surveys.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setHidden(visible.size > 0);
      },
      { threshold: 0.25 },
    );
    surveys.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-brand-rule bg-white shadow-[0_-8px_24px_-12px_rgba(11,31,61,0.25)] pb-[env(safe-area-inset-bottom)] transition-transform duration-300 lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex gap-2 px-4 py-3">
        {siteConfig.showPhone && siteConfig.phoneTel && (
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="flex min-h-12 flex-1 items-center justify-center rounded-full border border-brand-rule-strong font-display text-[15px] font-semibold text-brand-primary"
          >
            Call now
          </a>
        )}
        <SurveyCTA
          formLocation="mobile-sticky-bar"
          className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-brand-accent font-display text-[15px] font-semibold text-white active:scale-[0.99]"
        >
          Find My Plan
        </SurveyCTA>
      </div>
    </div>
  );
}
