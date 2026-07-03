/**
 * variant.ts — tiny helper for A/B landing experiments.
 *
 * The hero has two flavours: the default cinematic split layout ("a") and an
 * editorial, centered variant ("b"). Which one renders is driven entirely by a
 * `?variant=` query string, so you can share a link to either treatment without
 * a build flag or a feature-flag service:
 *
 *   /            → variant A (default)
 *   /?variant=b  → variant B (centered editorial hero)
 *
 * Kept framework-light on purpose: read once from the URL, no state, no deps.
 */

export type Variant = "a" | "b";

/** Read the active landing variant from the current URL. Defaults to "a". */
export const getVariant = (search: string = window.location.search): Variant => {
  const value = new URLSearchParams(search).get("variant")?.toLowerCase();
  return value === "b" ? "b" : "a";
};
