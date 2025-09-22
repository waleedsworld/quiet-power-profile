import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/config/profile";

const scrollTo = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
};

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Portrait panel — abstract gradient + monogram (no third-party photo) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/20 z-10"></div>
        <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-40 lg:opacity-100">
          <div className="relative w-full h-full bg-gradient-to-br from-electric-blue/30 via-background to-background flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(217_91%_60%/0.35),transparent_60%)]"></div>
            <span className="select-none font-black text-[28vw] lg:text-[18vw] leading-none text-electric-blue/10 tracking-tighter">
              {profile.initials}
            </span>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/10 to-background/80"></div>
          </div>
        </div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3ccircle cx='2' cy='2' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center pt-28 pb-24 lg:pt-32 lg:pb-28">
          {/* Left Column - Dramatic Content */}
          <div className="lg:col-span-7 space-y-10 lg:space-y-12 animate-fade-in-up">
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-electric-blue/5 rounded-full border border-electric-blue/10">
              <div className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-pulse"></div>
              <span className="text-electric-blue text-xs font-medium tracking-wide uppercase">
                {profile.availability}
              </span>
            </div>

            {/* Massive Stacked Headline */}
            <div className="space-y-2">
              <h1 className="mega-headline">
                {profile.headline[0]}
                <span className="block">{profile.headline[1]}</span>
                <span className="block text-electric-blue">{profile.headline[2]}</span>
              </h1>

              <p className="hero-subtitle mt-8 max-w-lg">{profile.subtitle}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="btn-primary-modern group"
                onClick={() => scrollTo("#contact")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book a Strategy Call
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="ghost"
                className="btn-ghost-modern"
                onClick={() => scrollTo("#portfolio")}
              >
                View My Work
              </Button>
            </div>

            {/* Achievement Stats */}
            <div className="flex flex-wrap gap-x-10 gap-y-6 pt-8">
              {profile.heroStats.map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="text-3xl font-bold text-primary-text">{stat.value}</div>
                  <div className="text-sm text-secondary-text font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - accent flourishes */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="absolute top-1/4 -right-4 w-2 h-16 bg-electric-blue/20 rounded-full animate-float opacity-60"></div>
            <div
              className="absolute bottom-1/3 -right-8 w-1 h-24 bg-electric-blue/10 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollTo("#journey")}
        className="hidden lg:flex absolute bottom-8 right-8 z-20 items-center space-x-3 text-secondary-text hover:text-electric-blue transition-colors"
        aria-label="Scroll to explore"
      >
        <div className="text-xs font-medium tracking-wider uppercase">Scroll to explore</div>
        <div className="w-8 h-px bg-electric-blue/40"></div>
      </button>
    </section>
  );
};
