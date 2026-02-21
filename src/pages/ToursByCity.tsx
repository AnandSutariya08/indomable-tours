import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Search, Loader2, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, {
  staggerContainer,
  fadeInUp,
} from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuoteModal from "@/components/QuoteModal";

import jaipur from "@/assets/destinations/jaipur.jpg";

const ToursByCity = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const { tours, loading } = useSelector((state: RootState) => state.firebase);

  const categories = useMemo(() => {
    const tagSet = new Set<string>();
    tours.forEach((tour) => {
      if (Array.isArray(tour?.tags)) {
        tour.tags.forEach((tag: unknown) => {
          if (typeof tag === "string" && tag.trim().length > 0) {
            tagSet.add(tag.trim());
          }
        });
      }
    });
    return ["All", ...Array.from(tagSet).sort((a, b) => a.localeCompare(b))];
  }, [tours]);

  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory("All");
    }
  }, [categories, selectedCategory]);

  const filteredTours = tours.filter((tour) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (tour.tags && tour.tags.includes(selectedCategory));
    const matchesSearch =
      tour.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tour.tags &&
        tour.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        )) ||
      tour.location?.toLowerCase().includes(searchQuery.toLowerCase());
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
        <section className="py-8 md:py-12 relative overflow-hidden">
          {/* Decorative background elements - reduced for mobile performance */}
          <div className="hidden md:block absolute top-0 left-1/4 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full" />
          <div className="hidden md:block absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center gap-4 md:gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
                Select Category
              </span>
              
              {/* Native Select - stable on iOS Safari */}
              <div className="w-full max-w-md">
                <label htmlFor="category-select" className="sr-only">
                  Select Category
                </label>
                <div className="relative">
                  <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-14 rounded-2xl border border-black/10 bg-white/80 text-primary font-body font-semibold text-sm tracking-wide px-5 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary appearance-none"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                </div>
              </div>

              {/* Search */}
              <div className="relative w-full max-w-md">
              <Search style={{zIndex:999}} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
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
        <section className="pb-12 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            {loading ? (
              <div className="flex justify-center py-12 md:py-20">
                <Loader2 className="w-8 h-8 md:w-10 md:h-10 animate-spin text-primary" />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory + searchQuery}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch"
                >
                  {filteredTours.map((tour, index) => (
                    <motion.div
                      key={tour.id}
                      initial={false}
                      variants={fadeInUp}
                      transition={{ duration: 0.3 }}
                      className="group flex flex-col h-full"
                    >
                      <div className="bg-[#EBE5D8] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 flex flex-col h-full">
                        {/* Image Section */}
                        <div className="relative h-56 md:h-64 overflow-hidden shrink-0 bg-[#2D2D2D]">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                          loading={index < 3 ? "eager" : "lazy"}
                          fetchpriority={index === 0 ? "high" : "auto"}
                          decoding="async"
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
                              <span className="font-body text-xs font-bold uppercase tracking-widest">
                                {tour.location}
                              </span>
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
                          {tour.tags && tour.tags.length > 0 && (
                            <div className="mb-8">
                              <span className="font-body text-[10px] uppercase tracking-widest text-foreground/50 font-bold block mb-2">Categories</span>
                              <div className="flex flex-wrap gap-2">
                                {tour.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-body text-[10px] font-bold uppercase tracking-wider"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* CTA Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-primary/10 mt-auto">
                            <span className="font-body text-[10px] uppercase tracking-widest text-foreground/50 font-bold">
                              {tour.country}
                            </span>
                            <Link to={`/tours/${tour.id}`}>
                              <Button
                                variant="gold"
                                size="sm"
                                className="group/btn rounded-full px-5"
                              >
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
                <h3 className="font-heading text-2xl text-primary mb-4">
                  No tours found
                </h3>
                <p className="font-body text-foreground/70">
                  Try adjusting your search or category selection.
                </p>
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
              We offer custom tours to hundreds of destinations across Asia.
              Tell us where you want to go!
            </p>
            <Button
              variant="gold"
              size="xl"
              onClick={() => setIsQuoteOpen(true)}
            >
              Partner with us
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
