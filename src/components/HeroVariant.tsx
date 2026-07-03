import { HeroSection } from "@/components/HeroSection";
import { HeroSectionB } from "@/components/HeroSectionB";
import { getVariant } from "@/lib/variant";

/**
 * HeroVariant — selects which hero treatment to render from the `?variant=`
 * query string. Default (`a`) is the cinematic split layout; `?variant=b`
 * serves the centered editorial variant. See src/lib/variant.ts.
 */
export const HeroVariant = () => {
  return getVariant() === "b" ? <HeroSectionB /> : <HeroSection />;
};
