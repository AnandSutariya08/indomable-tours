import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTestimonials } from "@/hooks/useFirestoreData";

const Testimonials = () => {
  const { data: testimonials, loading } = useTestimonials();

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <h2 className="heading-display-md text-primary mb-6">What Our Travelers Say</h2>
          <p className="body-display-lg text-foreground">
            For over a decade, we've been crafting journeys that transform travelers into storytellers.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="bg-muted rounded-2xl p-8 relative group hover:shadow-xl transition-all duration-500">
                <div className="absolute top-6 right-6 text-6xl text-secondary/30 font-heading">"</div>
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="font-body text-foreground leading-relaxed mb-8">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-primary">{testimonial.name}</h4>
                    <p className="font-body text-sm text-foreground/70">{testimonial.location}</p>
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

export default Testimonials;
