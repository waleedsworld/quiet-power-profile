import { MessageSquare, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/config/profile";

const scrollTo = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
};

/**
 * HeroSectionB — the "B" arm of the landing A/B test (rendered on `?variant=b`).
 *
 * Deliberately distinct from the default hero: a centered, editorial layout
 * instead of the split portrait panel, a single-line headline that reads as one
 * statement rather than a stacked column, and a conversational primary CTA
 * ("Start a Conversation") over the default's "Book a Strategy Call". Same
 * profile data source — no content duplication — just a different frame around it.
 */
export const HeroSectionB = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-center">
      {/* Centered monogram wash — a single focal glow behind the copy */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(217_91%_60%/0.18),transparent_60%)]"></div>
        <span className="absolute inset-0 flex items-center justify-center select-none font-black text-[46vw] lg:text-[30vw] leading-none text-electric-blue/[0.04] tracking-tighter">
          {profile.initials}
        </span>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      {/* Fine grid texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3ccircle cx='2' cy='2' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center pt-28 pb-24 lg:pt-32 lg:pb-28 animate-fade-in-up">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-electric-blue/5 rounded-full border border-electric-blue/10 mb-10">
            <div className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-pulse"></div>
            <span className="text-electric-blue text-xs font-medium tracking-wide uppercase">
              {profile.availability}
            </span>
          </div>

          {/* Single-line editorial headline — the accent word inline, not stacked */}
          <h1 className="mega-headline max-w-3xl">
            {profile.headline[0]} {profile.headline[1]}{" "}
            <span className="text-electric-blue">{profile.headline[2]}</span>
          </h1>

          <p className="hero-subtitle mt-8 max-w-xl mx-auto">{profile.subtitle}</p>

          {/* Action Buttons — conversational primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-12 justify-center">
            <Button
              className="btn-primary-modern group"
              onClick={() => scrollTo("#contact")}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Start a Conversation
            </Button>

            <Button
              variant="ghost"
              className="btn-ghost-modern"
              onClick={() => scrollTo("#journey")}
            >
              See the Journey
            </Button>
          </div>

          {/* Achievement Stats — centered, divider-separated inline row */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 pt-16 divide-x divide-primary-text/10">
            {profile.heroStats.map((stat) => (
              <div key={stat.label} className="px-8 first:pl-0 text-center">
                <div className="text-3xl font-bold text-primary-text">{stat.value}</div>
                <div className="text-sm text-secondary-text font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator — centered downward cue */}
      <button
        onClick={() => scrollTo("#journey")}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center space-y-2 text-secondary-text hover:text-electric-blue transition-colors"
        aria-label="Scroll to explore"
      >
        <div className="text-xs font-medium tracking-wider uppercase">Scroll to explore</div>
        <ArrowDown className="w-4 h-4 animate-float" />
      </button>
    </section>
  );
};
