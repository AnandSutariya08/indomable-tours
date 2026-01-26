import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import tajMahal from "@/assets/destinations/taj-mahal.jpg";
import jaipur from "@/assets/destinations/jaipur.jpg";
import kerala from "@/assets/destinations/kerala.jpg";
import varanasi from "@/assets/destinations/varanasi.jpg";
import lehLadakh from "@/assets/destinations/leh-ladakh.jpg";

const tours = [
  {
    id: 1,
    title: "Taj Mahal",
    location: "Agra, India",
    image: tajMahal,
    duration: "3 Days",
    description: "Witness the eternal monument of love at sunrise",
  },
  {
    id: 2,
    title: "Pink City",
    location: "Jaipur, India",
    image: jaipur,
    duration: "4 Days",
    description: "Explore royal palaces and vibrant bazaars",
  },
  {
    id: 3,
    title: "Backwaters",
    location: "Kerala, India",
    image: kerala,
    duration: "5 Days",
    description: "Cruise through serene waterways on luxury houseboats",
  },
  {
    id: 4,
    title: "Ganges Ghats",
    location: "Varanasi, India",
    image: varanasi,
    duration: "3 Days",
    description: "Experience spiritual awakening at the sacred river",
  },
  {
    id: 5,
    title: "Himalayan Adventure",
    location: "Leh-Ladakh, India",
    image: lehLadakh,
    duration: "7 Days",
    description: "Journey through the world's highest motorable roads",
  },
];

const ExploreTours = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="heading-display-md text-primary mb-6">
            Explore Our Signature Tours
          </h2>
          <p className="body-display-md text-foreground">
            Each journey is carefully crafted to immerse you in the authentic spirit 
            of these magnificent destinations. From ancient temples to pristine landscapes, 
            discover experiences that will stay with you forever.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-3 mb-8">
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        >
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="flex-shrink-0 w-[320px] md:w-[380px] group cursor-pointer"
            >
              <div className="relative h-[420px] md:h-[480px] rounded-2xl overflow-hidden card-hover">
                {/* Image */}
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-body text-sm font-medium">
                    {tour.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-cream/80 font-body text-sm mb-2">{tour.location}</p>
                  <h3 className="font-heading text-2xl md:text-3xl text-cream mb-2">
                    {tour.title}
                  </h3>
                  <p className="text-cream/80 font-body text-sm leading-relaxed">
                    {tour.description}
                  </p>
                  
                  {/* Hover CTA */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Button variant="gold" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreTours;
