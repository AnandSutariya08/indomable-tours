import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, ArrowRight, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, { staggerContainer, fadeInUp } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/QuoteModal";

import tajMahal from "@/assets/destinations/taj-mahal.jpg";

const countryList = ["All", "India", "Nepal", "Bhutan", "Sri Lanka"];

const Tours = () => {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const { tours, loading } = useSelector((state: RootState) => state.firebase);
  const [searchParams] = useSearchParams();
  const cityFilter = searchParams.get("city");
  const countryFilter = searchParams.get("country");

  useEffect(() => {
    if (countryFilter) {
      const formattedCountry = countryFilter.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      if (countryList.includes(formattedCountry)) {
        setSelectedCountry(formattedCountry);
      }
    }
  }, [countryFilter]);

  const filteredTours = tours.filter(tour => {
    const matchesCountry = selectedCountry === "All" || (tour.country && tour.country.toLowerCase() === selectedCountry.toLowerCase());
    const matchesCity = !cityFilter || tour.location.toLowerCase().includes(cityFilter.toLowerCase()) || tour.title.toLowerCase().includes(cityFilter.toLowerCase());
    return matchesCountry && matchesCity;
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

      <div className="bg-[#F5F1E9]">
        {/* <section className="py-12 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Select Destination</span>
              <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex justify-start md:justify-center gap-3 min-w-max px-4">
                  {countryList.map((country) => (
                    <motion.button
                      key={country}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCountry(country)}
                      className={`px-6 py-3 rounded-2xl font-body font-bold text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap border ${
                        selectedCountry === country
                          ? "bg-secondary text-primary border-secondary shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
                          : "bg-white/50 text-primary/60 border-black/5 hover:border-secondary/30 hover:bg-white"
                      }`}
                    >
                      {country}
                    </motion.button>
                  ))}
                </div>
              </div>
              {cityFilter && (
                <Link to="/tours" className="text-secondary hover:underline text-sm font-bold uppercase tracking-widest mt-2">
                  Clear City Filter: {cityFilter} ×
                </Link>
              )}
            </div>
          </div>
        </section> */}
        <section className="py-12 relative overflow-hidden bg-[#F5F1E9]">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Select Destination</span>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 bg-black/80 backdrop-blur-2xl border border-white/5 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                {countryList.map((country) => (
                  <motion.button
                    key={country}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCountry(country)}
                    className={`px-6 md:px-8 py-2.5 rounded-xl font-body font-bold text-xs md:text-sm uppercase tracking-widest transition-all duration-500 ${
                       selectedCountry === country
                        ? "bg-secondary text-primary shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        : "text-cream/60 hover:text-secondary hover:bg-white/5"
                    }`}
                  >
                    {country}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            {loading && tours.length === 0 ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCountry + (cityFilter || '')}
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
                        <div className="relative h-64 overflow-hidden shrink-0 bg-[#2D2D2D]">
                          <img
                            src={tour.image}
                            alt={tour.title}
                            className="w-full h-full object-cover transition-opacity duration-300 group-hover:scale-110"
                            loading="lazy"
                            onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                            style={{ opacity: 1 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-body text-sm font-medium">
                              {tour.duration}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground font-body text-sm font-medium">
                              {tour.country}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-background/90">
                            <Star className="w-4 h-4 text-secondary fill-secondary" />
                            <span className="font-body text-sm font-medium text-foreground">{tour.rating}</span>
                          </div>
                        </div>

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

                          <div className="flex flex-wrap gap-2 mb-4">
                            {tour.highlights?.slice(0, 3).map((highlight: string) => (
                              <span
                                key={highlight}
                                className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary/70 font-body text-[10px] font-bold uppercase tracking-wider"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>

                          {tour.tags && tour.tags.length > 0 && (
                            <div className="mb-6">
                              <span className="font-body text-[10px] uppercase tracking-widest text-foreground/50 font-bold block mb-2">Categories</span>
                              <div className="flex flex-wrap gap-2">
                                {tour.tags.map((tag: string) => (
                                  <span key={tag} className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-body text-[10px] font-bold uppercase tracking-wider">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

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
