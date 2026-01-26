import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ExploreTours from "@/components/ExploreTours";
import ExploreDestinations from "@/components/ExploreDestinations";
import Testimonials from "@/components/Testimonials";
import LuxuryHero from "@/components/LuxuryHero";
import BlogHighlights from "@/components/BlogHighlights";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* SEO Meta handled via index.html */}
      <Header />
      <HeroSection />
      <ExploreTours />
      <ExploreDestinations />
      <Testimonials />
      <LuxuryHero />
      <BlogHighlights />
      <Footer />
    </main>
  );
};

export default Index;
