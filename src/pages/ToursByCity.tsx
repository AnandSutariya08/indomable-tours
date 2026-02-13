import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, { staggerContainer, fadeInUp } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuoteModal from "@/components/QuoteModal";

const categories = ["All", "Heritage & Culture", "Wildlife Safaris", "Wellness & Spiritual", "Luxury & Palace", "Adventure & Himalayas", "Islands & Coastal Escapes", "Nature"];

const ToursByCity = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const { tours, loading } = useSelector((state: RootState) => state.firebase);

  const filteredTours = tours.filter((tour) => {
    const matchesCategory = selectedCategory === "All" || (tour.tags && tour.tags.includes(selectedCategory));
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (tour.tags && tour.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#F5F1E9]">
      <Header />
      <PageHeader
        badge="Explore by Category"
        title="Categories"
        subtitle="Find your perfect adventure by exploring our curated tour categories."
        backgroundImage={jaipur}
      />

      {/* Unified Background Wrapper */}
      <div className="bg-[#F5F1E9]">
        {/* Filter Section */}
        <section className="py-12 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center gap-8">
              {/* Category Tabs */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Select Category</span>
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
              </div>

              {/* Search */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-white/50 backdrop-blur-sm border-black/5 rounded-2xl shadow-sm focus:bg-white transition-all duration-300"
                />
              </div>
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
                  key={selectedCategory + searchQuery}
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
                        {/* Image Section */}
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
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-body text-xs font-medium shadow-lg">
                              {tour.duration}
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <div className="flex items-center gap-2 text-white/80 mb-1">
                              <MapPin className="w-4 h-4" />
                              <span className="font-body text-xs font-bold uppercase tracking-widest">{tour.location}</span>
                            </div>
                            <h3 className="font-heading text-2xl text-white">
                              {tour.title}
                            </h3>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-grow">
                          <p className="font-body text-sm text-foreground/70 mb-6 line-clamp-3 min-h-[60px]">
                            {tour.description}
                          </p>
                          
                          {/* Tags/Categories */}
                          <div className="flex flex-wrap gap-2 mb-8">
                            {tour.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary/70 font-body text-[10px] font-bold uppercase tracking-wider"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* CTA Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-primary/10 mt-auto">
                            <span className="font-body text-[10px] uppercase tracking-widest text-foreground/50 font-bold">
                              {tour.country}
                            </span>
                            <Link to={`/tours/${tour.id}`}>
                              <Button variant="gold" size="sm" className="group/btn rounded-full px-5">
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
              <div className="text-center py-20">
                <h3 className="font-heading text-2xl text-primary mb-4">No tours found</h3>
                <p className="font-body text-foreground/70">Try adjusting your search or category selection.</p>
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
