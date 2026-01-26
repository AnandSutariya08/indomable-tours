import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
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

  const filteredTours = selectedCategory === "All Tours" 
    ? tours 
    : tours.filter(tour => tour.country === selectedCategory);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHeader
        badge="Curated Experiences"
        title="Our Signature Tours"
        subtitle="Each journey is meticulously crafted to offer authentic, immersive experiences that go beyond ordinary travel."
        backgroundImage={tajMahal}
      />

      {/* Filter Section */}
      <section className="py-4 md:py-6 sticky top-20 z-30 transition-all duration-500">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 md:px-8 py-2 md:py-3 max-w-fit mx-auto shadow-2xl">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full font-body font-bold text-xs md:text-sm uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-secondary text-primary shadow-lg"
                    : "text-white hover:text-secondary"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredTours.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <div className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
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
                          <span className="font-body text-sm font-medium text-foreground">{tour.rating}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-foreground/70 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="font-body text-sm">{tour.location}</span>
                        </div>
                        <h3 className="font-heading text-xl text-primary mb-3 group-hover:text-accent transition-colors">
                          {tour.title}
                        </h3>
                        <p className="font-body text-sm text-foreground/80 mb-4 line-clamp-2">
                          {tour.description}
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tour.highlights.slice(0, 2).map((highlight) => (
                            <span
                              key={highlight}
                              className="px-2 py-1 rounded-full bg-muted text-foreground/70 font-body text-xs"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div>
                            <span className="font-body text-xs text-foreground/60">From</span>
                            <p className="font-heading text-2xl text-primary">{tour.price}</p>
                          </div>
                          <Link to={`/tours/${tour.id}`}>
                            <Button variant="hero" size="sm" className="group/btn">
                              View Details
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
