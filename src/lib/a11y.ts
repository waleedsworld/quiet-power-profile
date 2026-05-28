/**
 * a11y.ts — small accessibility helpers shared across sections.
 *
 * Keeps motion and scrolling respectful of user preferences and provides
 * one place to reason about `prefers-reduced-motion`.
 */

/** True when the user has asked the OS to minimise motion. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Scroll behaviour that collapses to an instant jump under reduced motion. */
const motion = (): ScrollBehavior => (prefersReducedMotion() ? "auto" : "smooth");

/** Smoothly scroll to a selector (e.g. "#journey"), honouring motion prefs. */
export const smoothScrollTo = (selector: string): void => {
  document.querySelector(selector)?.scrollIntoView({ behavior: motion() });
};

/** Scroll back to the top of the page, honouring motion prefs. */
export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: motion() });
};
