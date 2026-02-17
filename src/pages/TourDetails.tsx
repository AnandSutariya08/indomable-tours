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
      <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[500px] md:min-h-[600px]">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />

        {/* Stronger overlay – better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent" />

        {/* Back Button – elegant blurred pill style like the blog example */}
        <div className="absolute top-20 md:top-24 lg:top-28 left-4 md:left-8 lg:left-12 z-20">
          <Link to="/tours">
            <Button
              variant="outline"
              className="
          bg-white/10 backdrop-blur-md 
          border-white/20 text-white 
          hover:bg-white/20 hover:border-white/40 
          transition-all rounded-full 
          px-4 md:px-6 py-1.5 md:py-2 h-auto
          shadow-sm
        "
            >
              <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
              <span className="font-body text-[10px] md:text-xs lg:text-sm font-bold tracking-widest uppercase">
                Back to Tours
              </span>
            </Button>
          </Link>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-16">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="space-y-5 md:space-y-7 max-w-4xl"
            >
              {/* Badges / quick info */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <span className="inline-block px-3.5 py-1.5 md:px-4 md:py-2 rounded-full bg-secondary text-secondary-foreground font-body text-[11px] md:text-xs lg:text-sm font-bold tracking-widest uppercase shadow-md">
                  {tour.duration}
                </span>

                <div className="flex items-center gap-1.5 text-cream/95">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-secondary fill-secondary" />
                  <span className="font-body text-sm md:text-base font-medium">{tour.rating}</span>
                </div>
              </div>

              {/* Main title */}
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream font-bold leading-[1.15] md:leading-tight">
                {tour.title}
              </h1>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-5 md:gap-7 lg:gap-9 text-cream/90 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                  <span className="font-body tracking-wide">{tour.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                  <span className="font-body tracking-wide">{tour.groupSize} travelers</span>
                </div>

                {/* Optional: add country or other quick fact if you want */}
                {/* <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
            <span className="font-body tracking-wide">{tour.country}</span>
          </div> */}
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
        {/* Tabs – responsive sizing */}
<div className="flex gap-2 sm:gap-3 md:gap-4 mb-8 border-b border-border overflow-x-auto pb-3 sm:pb-4 scrollbar-thin">
  {["overview", "itinerary", "includes"].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`
        px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 
        rounded-full 
        font-body font-medium 
        whitespace-nowrap 
        text-sm sm:text-base
        transition-all duration-200
        ${
          activeTab === tab
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-muted/70 text-foreground hover:bg-muted hover:text-foreground"
        }
      `}
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
                  className="w-full"
                  onClick={() => setIsQuoteOpen(true)}
                >
                  Partner with us
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
