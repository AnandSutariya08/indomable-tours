import { useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";

const ExploreTours = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { tours, loading } = useSelector((state: RootState) => state.firebase);
  const navigate = useNavigate();

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
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="heading-display-md text-primary mb-6">
            Explore Our Signature Tours
          </h2>
          <p className="body-display-md text-foreground">
            Each journey is carefully crafted to immerse you in the authentic spirit
            of these magnificent destinations.
          </p>
        </div>

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

        {loading && tours.length === 0 ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          >
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="flex-shrink-0 w-[300px] md:w-[380px] group cursor-pointer"
                onClick={() => navigate(`/tours/${tour.id}`)}
              >
                {/* Card */}
                <div className="relative rounded-2xl overflow-hidden card-hover flex flex-col h-[480px] md:h-[520px] mt-2">

                  {/* Background image — fills entire card */}
                  <img
                    src={tour.image}
                    alt={tour.title}
                    loading="eager"
                    data-fetchpriority="high"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient overlay — stronger at bottom so text is always readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                  {/* Content — flex column so items stack, no overlap */}
                  <div className="relative z-10 flex flex-col h-full p-5">

                    {/* TOP: duration badge only */}
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-body text-xs font-semibold">
                        {tour.duration}
                      </span>
                    </div>

                    {/* SPACER: pushes bottom content down */}
                    <div className="flex-1" />

                    {/* BOTTOM: all text content stacked cleanly */}
                    <div className="flex-shrink-0 space-y-2">

                      {/* Location */}
                      <p className="text-cream/75 font-body text-xs leading-snug">
                        {tour.location}
                      </p>

                      {/* Title */}
                      <h3 className="font-heading text-xl md:text-2xl text-cream leading-tight group-hover:text-secondary transition-colors duration-300">
                        {tour.title}
                      </h3>

                      {/* Tags */}
                      {tour.tags && tour.tags.length > 0 && (
                        <div>
                          <span className="text-cream/50 font-body text-[9px] uppercase tracking-widest font-bold block mb-1.5">
                            Categories
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {tour.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary font-body text-[9px] font-bold uppercase tracking-wider"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-cream/70 font-body text-xs leading-relaxed line-clamp-2">
                        {tour.description}
                      </p>

                      {/* CTA — slides up on hover */}
                      <div className="pt-2 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
                        <Button variant="gold" size="sm" className="rounded-full px-5 text-xs font-bold">
                          View Details
                        </Button>
                        <ArrowRight className="w-5 h-5 text-cream group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreTours;