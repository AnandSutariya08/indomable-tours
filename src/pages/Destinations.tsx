import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Compass } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/QuoteModal";

import tajMahal from "@/assets/destinations/taj-mahal.jpg";
import jaipur from "@/assets/destinations/jaipur.jpg";
import kerala from "@/assets/destinations/kerala.jpg";
import varanasi from "@/assets/destinations/varanasi.jpg";
import lehLadakh from "@/assets/destinations/leh-ladakh.jpg";
import nepal from "@/assets/destinations/nepal.jpg";
import bhutan from "@/assets/destinations/bhutan.jpg";
import srilanka from "@/assets/destinations/srilanka.jpg";

const countries = [
  {
    id: "india",
    name: "India",
    tagline: "A Tapestry of Wonders",
    description: "From the snow-capped Himalayas to tropical Kerala, India offers an unparalleled diversity of experiences. Ancient temples, bustling cities, and serene landscapes await the curious traveler.",
    image: tajMahal,
    destinations: [
      { name: "Taj Mahal, Agra", image: tajMahal, tours: 5 },
      { name: "Jaipur, Rajasthan", image: jaipur, tours: 8 },
      { name: "Kerala Backwaters", image: kerala, tours: 6 },
      { name: "Varanasi", image: varanasi, tours: 4 },
      { name: "Leh-Ladakh", image: lehLadakh, tours: 3 },
    ],
    highlights: ["UNESCO World Heritage Sites", "Ayurvedic Wellness", "Tiger Safaris", "Culinary Tours"],
  },
  {
    id: "nepal",
    name: "Nepal",
    tagline: "Roof of the World",
    description: "Home to eight of the world's highest peaks, Nepal blends adventure with spirituality. Trek through rhododendron forests, explore ancient Kathmandu, and find peace in Buddhist monasteries.",
    image: nepal,
    destinations: [
      { name: "Kathmandu Valley", image: nepal, tours: 4 },
      { name: "Everest Region", image: nepal, tours: 3 },
      { name: "Pokhara", image: nepal, tours: 5 },
    ],
    highlights: ["Himalayan Trekking", "Buddhist Heritage", "Mountain Views", "Wildlife"],
  },
  {
    id: "bhutan",
    name: "Bhutan",
    tagline: "The Last Shangri-La",
    description: "This Buddhist kingdom measures success in Gross National Happiness. Discover fortress monasteries, pristine nature, and a culture that has remained largely untouched by modernity.",
    image: bhutan,
    destinations: [
      { name: "Paro & Tiger's Nest", image: bhutan, tours: 4 },
      { name: "Thimphu", image: bhutan, tours: 3 },
      { name: "Punakha", image: bhutan, tours: 2 },
    ],
    highlights: ["Tiger's Nest Monastery", "Festival Tours", "Sustainable Travel", "Archery"],
  },
  {
    id: "srilanka",
    name: "Sri Lanka",
    tagline: "The Pearl of the Indian Ocean",
    description: "This teardrop island packs incredible diversity into its compact size. Ancient ruins, wildlife encounters, pristine beaches, and the world's finest tea plantations await.",
    image: srilanka,
    destinations: [
      { name: "Sigiriya Rock", image: srilanka, tours: 5 },
      { name: "Kandy", image: srilanka, tours: 4 },
      { name: "Yala National Park", image: srilanka, tours: 3 },
    ],
    highlights: ["Ancient Ruins", "Safari Adventures", "Beach Retreats", "Tea Country"],
  },
];

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const countryParam = searchParams.get("country");
  
  const initialCountry = countries.find(c => c.id === countryParam) || countries[0];
  const [activeCountry, setActiveCountry] = useState(initialCountry);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    if (countryParam) {
      const country = countries.find(c => c.id === countryParam);
      if (country) {
        setActiveCountry(country);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [countryParam]);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHeader
        badge="Explore Asia"
        title="Destinations"
        subtitle="Discover the extraordinary places we call home. Each destination offers unique experiences waiting to be explored."
        backgroundImage={nepal}
      />

      {/* Country Selector */}
      <section className="py-12 bg-muted/30 border-b border-border sticky top-20 z-30 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {countries.map((country) => (
              <motion.button
                key={country.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCountry(country)}
                className={`px-6 md:px-10 py-3 md:py-4 rounded-xl font-heading text-base md:text-lg transition-all duration-300 shadow-sm ${
                  activeCountry.id === country.id
                    ? "bg-primary text-primary-foreground shadow-xl scale-105"
                    : "bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                {country.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Country Details */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeCountry.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="py-20 md:py-28"
        >
          <div className="container mx-auto px-4 md:px-6">
            {/* Hero Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-16">
              <motion.img
                key={activeCountry.image}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                src={activeCountry.image}
                alt={activeCountry.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-body text-sm mb-4">
                    {activeCountry.tagline}
                  </span>
                  <h2 className="font-heading text-4xl md:text-6xl text-cream mb-4">
                    {activeCountry.name}
                  </h2>
                  <p className="font-body text-lg text-cream/90 max-w-2xl">
                    {activeCountry.description}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Highlights */}
            <AnimatedSection>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {activeCountry.highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-card p-6 rounded-xl text-center shadow-md hover:shadow-xl transition-all"
                  >
                    <Compass className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <span className="font-body font-medium text-foreground">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Destinations Grid */}
            <AnimatedSection>
              <h3 className="heading-display-sm text-primary mb-8">
                Popular Destinations in {activeCountry.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCountry.destinations.map((dest, index) => (
                  <motion.div
                    key={dest.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                  >
                    <Link to="/tours">
                      <div className="relative h-72 rounded-2xl overflow-hidden">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center gap-2 text-cream/80 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span className="font-body text-sm">{dest.tours} tours available</span>
                          </div>
                          <h4 className="font-heading text-2xl text-cream group-hover:text-secondary transition-colors">
                            {dest.name}
                          </h4>
                          <div className="mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <span className="inline-flex items-center gap-2 text-secondary font-body text-sm font-medium">
                              Explore Tours <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="heading-display-sm text-primary-foreground mb-6">
              Ready to Explore {activeCountry.name}?
            </h2>
            <p className="body-display-md text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let us help you plan your perfect journey to this incredible destination.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tours">
                <Button variant="gold" size="xl">
                  View All Tours
                </Button>
              </Link>
              <Button 
                variant="heroOutline" 
                size="xl"
                onClick={() => setIsQuoteOpen(true)}
              >
                Get Custom Quote
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </main>
  );
};

export default Destinations;
