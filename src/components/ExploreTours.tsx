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
          <button onClick={() => scroll("left")} className="p-3 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300" aria-label="Scroll left">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => scroll("right")} className="p-3 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300" aria-label="Scroll right">
            <ChevronRight size={24} />
          </button>
        </div>

        {loading && tours.length === 0 ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4" style={{paddingTop:'1rem'}}>
            {tours.map((tour) => (
              <div 
                key={tour.id} 
                className="flex-shrink-0 w-[320px] md:w-[380px] group cursor-pointer"
                onClick={() => navigate(`/tours/${tour.id}`)}
              >
                <div className="relative h-[420px] md:h-[480px] rounded-2xl overflow-hidden card-hover bg-[#2D2D2D]">
                  <img 
                    src={tour.image} 
                    alt={tour.title} 
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:scale-110" 
                    loading="lazy"
                    onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                    style={{ opacity: 1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-body text-sm font-medium">{tour.duration}</span>
                    {tour.tags?.map((tag: string) => (
                      <span key={tag} className="px-3 py-1.5 rounded-full bg-accent/90 text-accent-foreground font-body text-xs font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-cream/80 font-body text-sm mb-2">{tour.location}</p>
                    <h3 className="font-heading text-2xl md:text-3xl text-cream mb-2 group-hover:text-secondary transition-colors">{tour.title}</h3>
                    <p className="text-cream/80 font-body text-sm leading-relaxed line-clamp-2">{tour.description}</p>
                    <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <Button variant="gold" size="sm" className="rounded-full px-6 font-bold">
                        View Details
                      </Button>
                      <ArrowRight className="w-6 h-6 text-cream group-hover:translate-x-2 transition-transform duration-300" />
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
