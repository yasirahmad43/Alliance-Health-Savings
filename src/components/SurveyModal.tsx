"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SurveyForm from "@/components/SurveyForm";
import {
  SURVEY_MODAL_EVENT,
  type SurveyModalDetail,
} from "@/lib/survey-modal";

/**
 * The survey popup. Mounted once in the root layout and raised by any
 * SurveyCTA button through the window event in lib/survey-modal.
 *
 * It renders the same SurveyForm as every other placement — so the lead takes
 * the same /api/lead path, with the same Supabase insert and the same
 * LEAD_WEBHOOK_URL forward. There is no second form implementation.
 *
 * Behaviour the visitor can rely on:
 * - the page behind it is locked, and its scroll position is kept exactly;
 * - Escape, the backdrop and the close button all dismiss it;
 * - on dismiss, focus returns to the button that opened it.
 */
export default function SurveyModal() {
  const [formLocation, setFormLocation] = useState<string | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const open = formLocation !== null;

  const close = useCallback(() => setFormLocation(null), []);

  /* Listen for open requests. */
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<SurveyModalDetail>).detail;
      openerRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setFormLocation(detail?.formLocation || "survey-modal");
    };
    window.addEventListener(SURVEY_MODAL_EVENT, onOpen);
    return () => window.removeEventListener(SURVEY_MODAL_EVENT, onOpen);
  }, []);

  /* A successful submit routes to /thank-you; don't carry the popup along, and
     don't restore the previous page's scroll offset on the new page. */
  useEffect(() => {
    scrollYRef.current = 0;
    setFormLocation(null);
  }, [pathname]);

  /* Lock the page. `position: fixed` on the body is what actually stops iOS
     Safari from scrolling the page under the sheet; the saved offset puts the
     visitor back where they were the moment it closes. */
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const y = window.scrollY;
    scrollYRef.current = y;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      /* Reading a layout property forces the browser to re-measure the document
         before we scroll; without it the page is still only one viewport tall
         and the requested offset gets clamped to something short of where the
         visitor was. The rAF pass catches any image that finishes loading in
         the same frame and shifts the measurement again. */
      const restore = () => {
        void document.documentElement.scrollHeight;
        window.scrollTo(0, scrollYRef.current);
      };
      restore();
      requestAnimationFrame(restore);
    };
  }, [open]);

  /* Escape to close, Tab kept inside the sheet, focus handed back on close. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    };
    panelRef.current?.focus({ preventScroll: true });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      /* preventScroll: the body-lock cleanup has already put the page back
         where the visitor was; letting focus() scroll would move them off it. */
      openerRef.current?.focus?.({ preventScroll: true });
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="survey-modal"
          role="dialog"
          aria-modal="true"
          data-survey-modal
          aria-label="Free plan review"
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center"
        >
          <motion.button
            type="button"
            aria-label="Close"
            onClick={close}
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 cursor-default bg-brand-primary-strong/70 backdrop-blur-[2px]"
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={reduced ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] as const }}
            className="relative flex max-h-[92dvh] w-full max-w-lg flex-col px-3 pb-3 pt-10 outline-none sm:px-4 sm:pb-6 sm:pt-6"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-1 z-10 flex size-10 items-center justify-center rounded-full bg-white text-brand-primary shadow-[0_6px_20px_-6px_#0e254780] transition-colors duration-200 hover:bg-brand-wash sm:-right-1 sm:top-0"
            >
              <span className="sr-only">Close and go back</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="size-5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <div className="min-h-0 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
              <SurveyForm formLocation={formLocation} variant="hero" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
