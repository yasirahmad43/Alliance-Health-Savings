"use client";

import Link from "next/link";
import { openSurveyModal } from "@/lib/survey-modal";

type Props = {
  /** Reported with the lead, e.g. "mobile-sticky-bar". */
  formLocation: string;
  className?: string;
  /** Extra work the caller needs on activation, e.g. closing the mobile menu. */
  onActivate?: () => void;
  children: React.ReactNode;
};

/**
 * Every "start the survey" button on the site.
 *
 * It is a real link to /find-my-plans, so it is crawlable and still works with
 * JavaScript off, mid-hydration, or in a middle-click / new tab. When the click
 * is a plain left-click we keep the visitor where they are and raise the popup
 * instead — no page load between the button and the first question.
 */
export default function SurveyCTA({
  formLocation,
  className = "",
  onActivate,
  children,
}: Props) {
  return (
    <Link
      href="/find-my-plans"
      className={className}
      onClick={(e) => {
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey
        ) {
          return;
        }
        e.preventDefault();
        onActivate?.();
        openSurveyModal(formLocation);
      }}
    >
      {children}
    </Link>
  );
}
