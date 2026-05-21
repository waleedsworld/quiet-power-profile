import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * BackToTop — floating action button that fades in after the hero scrolls
 * away and glides the page back to the top. Keyboard-accessible and hidden
 * from assistive tech until it is actually usable.
 */
export const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-electric-blue/30 bg-card/80 text-electric-blue backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-electric-blue/60 hover:bg-electric-blue/15 hover:shadow-[0_10px_30px_-8px_hsl(var(--electric-blue)/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue/60 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};
