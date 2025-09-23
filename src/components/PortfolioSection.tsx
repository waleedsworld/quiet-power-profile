import { ExternalLink } from "lucide-react";

export const PortfolioSection = () => {
  const companies = [
    {
      id: 1,
      name: "NeuralFlow",
      description: "AI-powered workflow automation for enterprise teams",
      sector: "Artificial Intelligence",
      stage: "Series B",
      logo: "NF"
    },
    {
      id: 2,
      name: "QuantumEdge",
      description: "Next-gen quantum computing solutions for financial modeling",
      sector: "Quantum Computing",
      stage: "Series A",
      logo: "QE"
    },
    {
      id: 3,
      name: "ChainLogistics",
      description: "Blockchain-based supply chain transparency platform",
      sector: "Blockchain",
      stage: "Seed",
      logo: "CL"
    },
    {
      id: 4,
      name: "BioSynth",
      description: "Synthetic biology platform for sustainable manufacturing",
      sector: "Biotechnology",
      stage: "Series C",
      logo: "BS"
    },
    {
      id: 5,
      name: "AeroSpace Labs",
      description: "Advanced propulsion systems for commercial space travel",
      sector: "Aerospace",
      stage: "Series A",
      logo: "AL"
    },
    {
      id: 6,
      name: "CyberShield",
      description: "Zero-trust security architecture for distributed systems",
      sector: "Cybersecurity",
      stage: "Series B",
      logo: "CS"
    }
  ];

  return (
    <section id="portfolio" className="py-32 bg-background relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3cpath d='M0 0h1v1H0V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="space-y-20">
          {/* Editorial Header */}
          <div className="max-w-4xl space-y-8">
            <h2 className="section-headline-editorial">
              PORTFOLIO
              <span className="block text-electric-blue">IMPACT</span>
            </h2>
            <div className="space-y-6 text-secondary-text text-lg leading-relaxed">
              <p>
                Strategic investments and advisory roles across the most promising deep-tech startups 
                reshaping industries from AI to quantum computing.
              </p>
              <div className="flex items-center space-x-8 text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                  <span>$100M+ Total Portfolio Value</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-electric-blue/60 rounded-full"></div>
                  <span>6 Successful Exits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-electric-blue/40 rounded-full"></div>
                  <span>2 Unicorns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {companies.map((company, index) => (
              <div
                key={company.id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="portfolio-card h-full">
                  {/* Company Logo */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                      <span className="text-electric-blue font-bold text-lg">
                        {company.logo}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-secondary-text group-hover:text-electric-blue transition-colors opacity-0 group-hover:opacity-100" />
                  </div>
                  
                  {/* Company Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary-text mb-2 group-hover:text-electric-blue transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-secondary-text leading-relaxed">
                        {company.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-card/30">
                      <span className="text-xs font-medium text-secondary-text uppercase tracking-wider">
                        {company.sector}
                      </span>
                      <span className="text-xs px-2 py-1 bg-electric-blue/10 text-electric-blue rounded-full font-medium">
                        {company.stage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center pt-12">
            <p className="text-secondary-text mb-6">
              Interested in discussing investment opportunities or strategic partnerships?
            </p>
            <div className="inline-flex items-center space-x-2 text-electric-blue font-medium cursor-pointer hover:text-electric-blue-hover transition-colors">
              <span>View Full Portfolio</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};