import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./AnimatedSection";

const destinations = [
  {
    id: "india",
    name: "India",
    tagline: "A Continent in One Country",
    description: "Few countries offer deserts, rainforests, Himalayas, spirituality, wildlife & luxury palaces — all in one journey. Where ancient civilization meets vibrant modern energy.",
image:"https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  },
  {
    id: "nepal",
    name: "Nepal",
    tagline: "Where Earth Touches the Sky",
    description: "The only place where you can have breakfast facing Mount Everest and safari with rhinos in the same trip.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80",
  },
  {
    id: "bhutan",
    name: "Bhutan",
    tagline: "Exclusive. Peaceful. Profound.",
    description: "A carbon-negative kingdom that measures success by Gross National Happiness",
    image: "https://images.unsplash.com/photo-1555821108-3fb2763b226a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    tagline: "The Pearl of the Indian Ocean",
    description: "A complete Asia experience packed into a compact island. Wildlife, culture & coast — seamlessly combined.",
    image: "https://images.unsplash.com/photo-1529154036614-a60975f5c760?auto=format&fit=crop&q=80",
  },
];

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
                className="group relative block h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="eager"
                  data-fetchpriority="high"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-heading text-3xl text-cream mb-2">
                    {dest.name}
                  </h3>

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
