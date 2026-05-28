import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile, navItems } from "@/config/profile";
import { useOverlay } from "@/hooks/use-overlay";
import { smoothScrollTo, scrollToTop } from "@/lib/a11y";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Lock background scroll + close on Escape while the mobile drawer is open.
  useOverlay(open, () => setOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // If the viewport grows to the desktop breakpoint while the drawer is open,
  // close it so we don't leave a hidden-but-"open" drawer holding scroll lock.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    smoothScrollTo(href);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-electric-blue/10"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container mx-auto px-6 lg:px-12 h-16 flex items-center justify-between"
      >
        {/* Monogram / brand */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 group"
          aria-label="Back to top"
        >
          <span className="w-9 h-9 rounded-lg bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center text-electric-blue font-bold text-sm group-hover:bg-electric-blue/20 transition-colors">
            {profile.initials}
          </span>
          <span className="hidden sm:block text-primary-text font-semibold tracking-tight">
            {profile.name}
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => go(item.href)}
              className="text-sm font-medium text-secondary-text hover:text-electric-blue transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-primary-text p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <>
          {/* Full-screen backdrop — dims the page and closes on tap */}
          <button
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="md:hidden fixed inset-0 top-16 -z-[1] bg-background/60 backdrop-blur-sm cursor-default"
          />
          <div
            id="mobile-menu"
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-electric-blue/10 shadow-card"
          >
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => go(item.href)}
                  className="text-left py-4 min-h-[44px] text-secondary-text hover:text-electric-blue active:text-electric-blue transition-colors border-b border-white/5 last:border-0"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};
