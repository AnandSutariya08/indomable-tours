import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, { staggerContainer, fadeInUp } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuoteModal from "@/components/QuoteModal";
import { useCities } from "@/hooks/useFirestoreData";

import jaipur from "@/assets/destinations/jaipur.jpg";

const countries = ["All", "India", "Nepal", "Bhutan", "Sri Lanka"];

const ToursByCity = () => {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const { data: cities, loading } = useCities();

  const filteredCities = cities.filter((city) => {
    const matchesCountry = selectedCountry === "All" || city.country === selectedCountry;
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         city.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHeader
        badge="Explore by City"
        title="Tours by City"
        subtitle="Find your perfect adventure by exploring tours available in each magnificent city."
        backgroundImage={jaipur}
      />

      {/* Filter Section */}
      <section className="py-12 bg-muted sticky top-20 z-30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Country Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {countries.map((country) => (
                <motion.button
                  key={country}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-6 py-3 rounded-full font-body font-medium transition-all duration-300 ${
                    selectedCountry === country
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  {country}
                </motion.button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-background border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCities.map((city, index) => (
                <motion.div
                  key={city.id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link to="/tours">
                    <div className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={city.image}
                          alt={city.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-body text-sm font-medium">
                            {city.tours} Tours
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <div className="flex items-center gap-2 text-cream/80 mb-1">
                            <MapPin className="w-4 h-4" />
                            <span className="font-body text-sm">{city.country}</span>
                          </div>
                          <h3 className="font-heading text-2xl text-cream">
                            {city.name}
                          </h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="font-body text-sm text-foreground/80 mb-4">
                          {city.description}
                        </p>
                        
                        {/* Popular Attractions */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {city.popular.map((attraction) => (
                            <span
                              key={attraction}
                              className="px-3 py-1 rounded-full bg-muted text-foreground/70 font-body text-xs"
                            >
                              {attraction}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="font-body text-sm text-foreground/60">
                            Explore {city.tours} tours
                          </span>
                          <span className="flex items-center gap-2 text-primary font-body font-medium group-hover:text-accent transition-colors">
                            View Tours
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && filteredCities.length === 0 && (
            <div className="text-center py-20">
              <h3 className="font-heading text-2xl text-primary mb-4">No cities found</h3>
              <p className="font-body text-foreground/70">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="heading-display-sm text-primary-foreground mb-6">
              Don't See Your Dream Destination?
            </h2>
            <p className="body-display-md text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              We offer custom tours to hundreds of destinations across Asia. Tell us where you want to go!
            </p>
            <Button 
              variant="gold" 
              size="xl"
              onClick={() => setIsQuoteOpen(true)}
            >
              Request Custom Tour
            </Button>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </main>
  );
};

export default ToursByCity;
