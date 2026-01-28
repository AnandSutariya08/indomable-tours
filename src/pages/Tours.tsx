import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, ArrowRight, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, { staggerContainer, fadeInUp } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/QuoteModal";
import { useTours } from "@/hooks/useFirestoreData";

import tajMahal from "@/assets/destinations/taj-mahal.jpg";

const categories = ["All Tours", "India", "Nepal", "Bhutan", "Sri Lanka"];

const Tours = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Tours");
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const { data: tours, loading } = useTours();
  const [searchParams] = useSearchParams();
  const cityFilter = searchParams.get("city");

  const filteredTours = tours.filter(tour => {
    const matchesCategory = selectedCategory === "All Tours" || tour.country === selectedCategory;
    const matchesCity = !cityFilter || tour.location.toLowerCase().includes(cityFilter.toLowerCase()) || tour.title.toLowerCase().includes(cityFilter.toLowerCase());
    return matchesCategory && matchesCity;
  });

  useEffect(() => {
    if (cityFilter) {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  }, [cityFilter]);

  return (
    <main className="min-h-screen bg-[#F5F1E9]">
      <Header />
      <PageHeader
        badge="Curated Experiences"
        title={cityFilter ? `Tours in ${cityFilter}` : "Our Signature Tours"}
        subtitle={cityFilter ? `Discover our hand-picked journeys through the magnificent city of ${cityFilter}.` : "Each journey is meticulously crafted to offer authentic, immersive experiences that go beyond ordinary travel."}
        backgroundImage={tajMahal}
      />

      {/* Unified Background Wrapper */}
      <div className="bg-[#F5F1E9]">
        {/* Filter Section */}
        <section className="py-12 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Select Destination</span>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 bg-black/80 backdrop-blur-2xl border border-white/5 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 md:px-8 py-2.5 rounded-xl font-body font-bold text-xs md:text-sm uppercase tracking-widest transition-all duration-500 ${
                      selectedCategory === category
                        ? "bg-secondary text-primary shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        : "text-cream/60 hover:text-secondary hover:bg-white/5"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
              {cityFilter && (
                <Link to="/tours" className="text-secondary hover:underline text-sm font-bold uppercase tracking-widest mt-2">
                  Clear City Filter: {cityFilter} ×
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory + (cityFilter || '')}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
                >
                  {filteredTours.map((tour, index) => (
                    <motion.div
                      key={tour.id}
                      variants={fadeInUp}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="group flex flex-col h-full"
                    >
                      <div className="bg-[#EBE5D8] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-black/5 flex flex-col h-full">
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden shrink-0">
                          <img
                            src={tour.image}
                            alt={tour.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-body text-xs font-medium">
                              {tour.duration}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground font-body text-xs font-medium">
                              {tour.country}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-background/90">
                            <Star className="w-4 h-4 text-secondary fill-secondary" />
                            <span className="font-body text-sm font-medium text-foreground text-foreground">{tour.rating}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 text-primary/70 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span className="font-body text-sm font-medium text-foreground">{tour.location}</span>
                          </div>
                          <h3 className="font-heading text-xl text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-1">
                            {tour.title}
                          </h3>
                          <p className="font-body text-sm text-foreground/70 mb-4 line-clamp-2 min-h-[40px]">
                            {tour.description}
                          </p>

                          {/* Highlights */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {tour.highlights.slice(0, 3).map((highlight) => (
                              <span
                                key={highlight}
                                className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary/70 font-body text-[10px] font-bold uppercase tracking-wider"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-primary/10 mt-auto">
                            <div>
                              <span className="font-body text-[10px] uppercase tracking-widest text-foreground/50 font-bold">Experience</span>
                              <p className="font-heading text-2xl text-secondary">View Details</p>
                            </div>
                            <Link to={`/tours/${tour.id}`}>
                              <Button variant="gold" size="sm" className="group/btn rounded-full px-5">
                                Explore
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
            
            {!loading && filteredTours.length === 0 && (
              <div className="text-center py-16">
                <h3 className="font-heading text-2xl text-primary mb-4">No tours found</h3>
                <p className="font-body text-foreground/70">Try selecting a different destination.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="heading-display-sm text-primary-foreground mb-6">
              Can't Find Your Perfect Tour?
            </h2>
            <p className="body-display-md text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let our travel experts craft a bespoke journey tailored to your dreams and preferences.
            </p>
            <Button 
              variant="gold" 
              size="xl"
              onClick={() => setIsQuoteOpen(true)}
            >
              Get a Custom Quote
            </Button>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </main>
  );
};

export default Tours;
