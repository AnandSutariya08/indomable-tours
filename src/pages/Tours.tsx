import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, { staggerContainer, fadeInUp } from "@/components/AnimatedSection";
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

const tours = [
  {
    id: 1,
    title: "Golden Triangle Classic",
    location: "Delhi - Agra - Jaipur",
    country: "India",
    image: tajMahal,
    duration: "7 Days",
    groupSize: "2-12",
    rating: 4.9,
    price: "$2,499",
    description: "Experience India's iconic trio: witness the Taj Mahal at sunrise, explore Jaipur's pink-hued palaces, and discover Delhi's rich heritage.",
    highlights: ["Taj Mahal sunrise visit", "Amber Fort elephant ride", "Old Delhi food tour"],
  },
  {
    id: 2,
    title: "Royal Rajasthan",
    location: "Jaipur - Udaipur - Jodhpur",
    country: "India",
    image: jaipur,
    duration: "10 Days",
    groupSize: "2-8",
    rating: 4.8,
    price: "$3,299",
    description: "Journey through the land of Maharajas, staying in heritage palace hotels and experiencing royal traditions.",
    highlights: ["Palace hotel stays", "Desert safari", "Traditional cooking class"],
  },
  {
    id: 3,
    title: "Kerala Serenity",
    location: "Kochi - Munnar - Alleppey",
    country: "India",
    image: kerala,
    duration: "8 Days",
    groupSize: "2-10",
    rating: 4.9,
    price: "$2,799",
    description: "Cruise through tranquil backwaters, explore tea plantations, and experience Ayurvedic wellness in God's Own Country.",
    highlights: ["Houseboat overnight", "Ayurvedic spa", "Kathakali performance"],
  },
  {
    id: 4,
    title: "Spiritual Varanasi",
    location: "Delhi - Varanasi - Bodh Gaya",
    country: "India",
    image: varanasi,
    duration: "6 Days",
    groupSize: "2-8",
    rating: 4.7,
    price: "$1,999",
    description: "Witness ancient rituals on the Ganges ghats and follow Buddha's footsteps through India's spiritual heartland.",
    highlights: ["Ganga Aarti ceremony", "Buddhist pilgrimage", "Silk weaving workshop"],
  },
  {
    id: 5,
    title: "Himalayan Adventure",
    location: "Leh - Nubra Valley - Pangong",
    country: "India",
    image: lehLadakh,
    duration: "9 Days",
    groupSize: "4-12",
    rating: 4.9,
    price: "$3,599",
    description: "Traverse the world's highest motorable roads, camp under starlit skies, and discover ancient Buddhist monasteries.",
    highlights: ["Khardung La Pass", "Pangong Lake camping", "Monastery visits"],
  },
  {
    id: 6,
    title: "Nepal Himalayan Trek",
    location: "Kathmandu - Pokhara - Everest",
    country: "Nepal",
    image: nepal,
    duration: "12 Days",
    groupSize: "4-10",
    rating: 4.8,
    price: "$3,899",
    description: "Trek through stunning Himalayan landscapes, visit ancient temples, and experience Nepali mountain hospitality.",
    highlights: ["Everest Base Camp", "Sherpa village stays", "Temple ceremonies"],
  },
  {
    id: 7,
    title: "Bhutan: Last Shangri-La",
    location: "Paro - Thimphu - Punakha",
    country: "Bhutan",
    image: bhutan,
    duration: "8 Days",
    groupSize: "2-8",
    rating: 5.0,
    price: "$4,299",
    description: "Explore the world's happiest kingdom, hike to Tiger's Nest monastery, and immerse in Buddhist traditions.",
    highlights: ["Tiger's Nest hike", "Festival attendance", "Farmhouse dining"],
  },
  {
    id: 8,
    title: "Sri Lanka Explorer",
    location: "Colombo - Sigiriya - Kandy",
    country: "Sri Lanka",
    image: srilanka,
    duration: "10 Days",
    groupSize: "2-10",
    rating: 4.8,
    price: "$2,999",
    description: "Discover ancient ruins, wildlife safaris, pristine beaches, and the world's finest tea plantations.",
    highlights: ["Sigiriya Rock climb", "Elephant safari", "Tea plantation tour"],
  },
];

const categories = ["All Tours", "India", "Nepal", "Bhutan", "Sri Lanka"];

const Tours = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Tours");
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

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
      <section className="py-8 md:py-12 bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="font-body text-sm text-foreground/60 uppercase tracking-wider">Filter by destination</p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 md:px-8 py-2.5 md:py-3 rounded-full font-body text-sm md:text-base font-medium transition-all duration-300 border-2 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "bg-background text-foreground border-border hover:border-secondary hover:text-secondary"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
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
          
          {filteredTours.length === 0 && (
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
