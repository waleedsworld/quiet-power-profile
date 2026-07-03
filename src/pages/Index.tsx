import { Navbar } from "@/components/Navbar";
import { HeroVariant } from "@/components/HeroVariant";
import { JourneySection } from "@/components/JourneySection";
import { MediaSection } from "@/components/MediaSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { CompetenciesSection } from "@/components/CompetenciesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <HeroVariant />
        <JourneySection />
        <MediaSection />
        <PortfolioSection />
        <CompetenciesSection />
        <ContactSection />
      </main>
      <Footer />
      <CommandPalette />
      <BackToTop />
    </div>
  );
};

export default Index;
