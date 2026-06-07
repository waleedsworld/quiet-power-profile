import { Brain, Rocket, Globe, Target, Code, Users2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const competencies = [
  {
    icon: Brain,
    title: "Product Strategy",
    description: "Building products that users love and markets demand through data-driven insights and user-centric design.",
    color: "text-blue-400"
  },
  {
    icon: Rocket,
    title: "Venture Capital",
    description: "Identifying and nurturing the next generation of unicorn startups with strategic investments and mentorship.",
    color: "text-purple-400"
  },
  {
    icon: Globe,
    title: "Global Scaling",
    description: "Expanding businesses across international markets with localized strategies and cross-cultural expertise.",
    color: "text-emerald-400"
  },
  {
    icon: Target,
    title: "Growth Hacking",
    description: "Accelerating business growth through innovative marketing strategies and viral growth mechanics.",
    color: "text-orange-400"
  },
  {
    icon: Code,
    title: "Tech Leadership",
    description: "Leading engineering teams to build scalable, secure, and innovative technology solutions at enterprise scale.",
    color: "text-cyan-400"
  },
  {
    icon: Users2,
    title: "Team Building",
    description: "Creating high-performing, diverse teams that deliver exceptional results in fast-paced environments.",
    color: "text-pink-400"
  }
];

export const CompetenciesSection = () => {
  return (
    <section id="skills" className="py-24 bg-card/20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-electric-blue/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-headline mb-6">
            Core
            <span className="text-electric-blue"> Competencies</span>
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Expertise built through years of hands-on experience in building, scaling, and leading technology companies
          </p>
        </div>

        {/* Competencies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competencies.map((competency, index) => (
            <Reveal
              key={competency.title}
              delay={index * 80}
              className="group relative overflow-hidden p-8 bg-gradient-dark-surface rounded-xl border border-card-hover/20 hover:border-electric-blue/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_hsl(var(--electric-blue)/0.2)]"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className={`w-12 h-12 ${competency.color} bg-current/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <competency.icon className={`w-6 h-6 ${competency.color}`} />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary-text group-hover:text-electric-blue transition-colors">
                  {competency.title}
                </h3>
                <p className="text-secondary-text text-sm leading-relaxed">
                  {competency.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-electric-blue/0 group-hover:bg-electric-blue/5 rounded-xl transition-colors duration-300 pointer-events-none"></div>
            </Reveal>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-gradient-dark-surface rounded-xl border border-card-hover/20 transition-all duration-300 hover:-translate-y-1 hover:border-electric-blue/40">
            <div className="text-3xl font-bold text-electric-blue mb-2">15+</div>
            <div className="text-sm text-secondary-text">Years Leading</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-dark-surface rounded-xl border border-card-hover/20 transition-all duration-300 hover:-translate-y-1 hover:border-electric-blue/40">
            <div className="text-3xl font-bold text-emerald-400 mb-2">50+</div>
            <div className="text-sm text-secondary-text">Companies Built</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-dark-surface rounded-xl border border-card-hover/20 transition-all duration-300 hover:-translate-y-1 hover:border-electric-blue/40">
            <div className="text-3xl font-bold text-purple-400 mb-2">$500M+</div>
            <div className="text-sm text-secondary-text">Capital Raised</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-dark-surface rounded-xl border border-card-hover/20 transition-all duration-300 hover:-translate-y-1 hover:border-electric-blue/40">
            <div className="text-3xl font-bold text-orange-400 mb-2">100K+</div>
            <div className="text-sm text-secondary-text">Lives Impacted</div>
          </div>
        </div>
      </div>
    </section>
  );
};