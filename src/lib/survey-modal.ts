/**
 * One shared channel for "open the survey popup".
 *
 * The modal lives once in the root layout; any button anywhere can raise it
 * without prop-drilling or a context provider wrapping every page. The opener
 * passes the placement so the lead still reports where it came from, and the
 * element that opened it so focus can be handed straight back on close —
 * the visitor lands on the same button they pressed.
 */

export const SURVEY_MODAL_EVENT = "ahs:open-survey";

export type SurveyModalDetail = {
  /** Reported with the lead, e.g. "mobile-sticky-bar". */
  formLocation: string;
};

export function openSurveyModal(formLocation: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<SurveyModalDetail>(SURVEY_MODAL_EVENT, {
      detail: { formLocation },
    }),
  );
}
