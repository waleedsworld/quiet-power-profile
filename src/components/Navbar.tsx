import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile, navItems } from "@/config/profile";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-electric-blue/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Monogram / brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
          className="md:hidden text-primary-text p-2"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-electric-blue/10">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => go(item.href)}
                className="text-left py-3 text-secondary-text hover:text-electric-blue transition-colors border-b border-white/5 last:border-0"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
