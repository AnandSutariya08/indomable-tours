import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Users, Star, Check, Calendar, ArrowRight, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/QuoteModal";
import { useTours } from "@/hooks/useFirestoreData";

const TourDetails = () => {
  const { id } = useParams();
  const { data: tours, loading } = useTours();
  const tour = tours.find((t) => t.id === id) || tours[0];
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!tour) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="heading-display-md text-primary mb-4">Tour Not Found</h1>
          <Link to="/tours">
            <Button variant="hero">Back to Tours</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const gallery = tour.gallery?.length ? tour.gallery : [tour.image];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link to="/tours" className="inline-flex items-center gap-2 text-cream/80 hover:text-secondary transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                <span className="font-body text-sm">Back to Tours</span>
              </Link>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-body text-sm">
                  {tour.duration}
                </span>
                <div className="flex items-center gap-1 text-cream">
                  <Star className="w-5 h-5 text-secondary fill-secondary" />
                  <span className="font-body">{tour.rating}</span>
                </div>
              </div>
              <h1 className="font-heading text-3xl md:text-5xl text-cream mb-4">
                {tour.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-cream/80">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {tour.location}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {tour.groupSize} travelers
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto pb-4">
                {["overview", "itinerary", "includes"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-full font-body font-medium whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-secondary hover:text-secondary-foreground"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {activeTab === "overview" && (
                <AnimatedSection>
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-heading text-2xl text-primary mb-4">About This Tour</h2>
                      <p className="font-body text-foreground/80 leading-relaxed">
                        {tour.fullDescription || tour.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-heading text-xl text-primary mb-4">Highlights</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tour.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 text-secondary" />
                            </div>
                            <span className="font-body text-foreground/80">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Gallery */}
                    <div>
                      <h3 className="font-heading text-xl text-primary mb-4">Gallery</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {gallery.map((img, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="rounded-xl overflow-hidden"
                          >
                            <img src={img} alt="" className="w-full h-32 object-cover" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {activeTab === "itinerary" && (
                <AnimatedSection>
                  <div className="space-y-6">
                    <h2 className="font-heading text-2xl text-primary mb-6">Day-by-Day Itinerary</h2>
                    {tour.itinerary?.map((day, index) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-6"
                      >
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <span className="font-heading text-xl">{day.day}</span>
                        </div>
                        <div className="flex-1 pb-6 border-b border-border last:border-0">
                          <h4 className="font-heading text-lg text-primary mb-2">{day.title}</h4>
                          <p className="font-body text-foreground/80">{day.description}</p>
                        </div>
                      </motion.div>
                    )) || <p className="text-foreground/70">Itinerary details coming soon.</p>}
                  </div>
                </AnimatedSection>
              )}

              {activeTab === "includes" && (
                <AnimatedSection>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-heading text-xl text-primary mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-secondary" />
                        What's Included
                      </h3>
                      <ul className="space-y-3">
                        {tour.included?.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                            <span className="font-body text-foreground/80">{item}</span>
                          </li>
                        )) || <li className="text-foreground/70">Details coming soon.</li>}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl text-primary mb-4">Not Included</h3>
                      <ul className="space-y-3">
                        {tour.notIncluded?.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="font-body text-foreground/60">• {item}</span>
                          </li>
                        )) || <li className="text-foreground/70">Details coming soon.</li>}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <div className="sticky top-28 bg-card p-8 rounded-2xl shadow-lg">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl text-primary mb-2">Interested in this tour?</h3>
                  <p className="font-body text-foreground/60 text-sm">Contact us for customized pricing and availability</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <Clock className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="font-body text-sm text-foreground/60">Duration</p>
                      <p className="font-body font-medium text-foreground">{tour.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <Users className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="font-body text-sm text-foreground/60">Group Size</p>
                      <p className="font-body font-medium text-foreground">{tour.groupSize} travelers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="font-body text-sm text-foreground/60">Availability</p>
                      <p className="font-body font-medium text-foreground">Year-round</p>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="hero" 
                  size="xl" 
                  className="w-full mb-4"
                  onClick={() => setIsQuoteOpen(true)}
                >
                  Request Quote
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => setIsQuoteOpen(true)}
                >
                  Contact Us
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </main>
  );
};

export default TourDetails;
