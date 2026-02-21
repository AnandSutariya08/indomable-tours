import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./AnimatedSection";
import indiaImage from "@/assets/destinations/taj-mahal.jpg";
import nepalImage from "@/assets/destinations/nepal.jpg";
import bhutanImage from "@/assets/destinations/bhutan.jpg";
import sriLankaImage from "@/assets/destinations/srilanka.jpg";

const destinations = [
  {
    id: "india",
    name: "India",
    tagline: "A Continent in One Country",
    description:
      "Few countries offer deserts, rainforests, Himalayas, spirituality, wildlife & luxury palaces - all in one journey. Where ancient civilization meets vibrant modern energy.",
    image: indiaImage,
  },
  {
    id: "nepal",
    name: "Nepal",
    tagline: "Where Earth Touches the Sky",
    description:
      "The only place where you can have breakfast facing Mount Everest and safari with rhinos in the same trip.",
    image: nepalImage,
  },
  {
    id: "bhutan",
    name: "Bhutan",
    tagline: "Exclusive. Peaceful. Profound.",
    description:
      "A carbon-negative kingdom that measures success by Gross National Happiness.",
    image: bhutanImage,
  },
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    tagline: "The Pearl of the Indian Ocean",
    description:
      "A complete Asia experience packed into a compact island. Wildlife, culture & coast - seamlessly combined.",
    image: sriLankaImage,
  },
];

const countryTourPreview: Record<string, string[]> = {
  india: ["/assets/tours/02-luxury-ladakh-monasteries-high-passes-himalayan-majesty.jpg"],
  nepal: ["/assets/tours/20-magical-nepal-culture-wildlife-himalayan-views.jpg"],
  bhutan: ["/assets/tours/07-royal-bhutan-monasteries-valleys-himalayan-majesty.jpg"],
  "sri-lanka": ["/assets/tours/01-sri-lanka-signature-heritage-tea-hills-coastal-luxury.jpg"],
};

const warmCountryAssets = (countryId: string) => {
  void import("@/pages/Tours");

  const images = countryTourPreview[countryId] || [];
  images.forEach((src) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  });
};

const ExploreDestinations = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F5F1E9]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="heading-display-md text-primary mb-4">Explore Destinations</h2>
          <p className="body-display-md text-foreground/70 max-w-2xl mx-auto">
            Discover the most iconic landmarks and hidden treasures across our featured destinations.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {destinations.map((dest) => (
            <motion.div key={dest.id} variants={fadeInUp}>
              <Link
                to={`/tours?country=${dest.id}`}
                onTouchStart={() => warmCountryAssets(dest.id)}
                onMouseEnter={() => warmCountryAssets(dest.id)}
                onFocus={() => warmCountryAssets(dest.id)}
                className="group relative block h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-heading text-3xl text-cream mb-2">{dest.name}</h3>

                  <p className="font-body text-secondary font-bold text-sm uppercase tracking-wider mb-3">
                    {dest.tagline}
                  </p>

                  <p className="font-body text-cream/80 text-sm leading-relaxed mb-6 line-clamp-4">
                    {dest.description}
                  </p>

                  <div className="inline-flex items-center gap-2 text-secondary group-hover:text-white transition-colors font-body font-bold text-xs uppercase tracking-[0.2em]">
                    Go to Tours
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreDestinations;
