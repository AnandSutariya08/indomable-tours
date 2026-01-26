import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "Vancouver, Canada",
    quote: "The attention to detail was extraordinary. From the private palace dinners to the sunrise at the Taj, every moment felt like a dream. Indomable Tours exceeded every expectation.",
    rating: 5,
    avatar: "SM",
  },
  {
    id: 2,
    name: "David Chen",
    location: "Toronto, Canada",
    quote: "Our family trip to Bhutan was transformative. The guides knew every hidden monastery and local story. This wasn't just travel—it was a journey into another world.",
    rating: 5,
    avatar: "DC",
  },
  {
    id: 3,
    name: "Emma Thompson",
    location: "Calgary, Canada",
    quote: "After 20 years of traveling, I thought nothing could surprise me. Kerala's backwaters and the hospitality we experienced proved me wonderfully wrong.",
    rating: 5,
    avatar: "ET",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Company Praise */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <h2 className="heading-display-md text-primary mb-6">
            What Our Travelers Say
          </h2>
          <p className="body-display-lg text-foreground">
            For over a decade, we've been crafting journeys that transform travelers into storytellers. 
            Our commitment to excellence and authentic experiences has earned the trust of thousands of discerning travelers.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-muted rounded-2xl p-8 relative group hover:shadow-xl transition-all duration-500"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Mark */}
              <div className="absolute top-6 right-6 text-6xl text-secondary/30 font-heading">
                "
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-secondary text-secondary"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-foreground leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-heading text-lg text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="font-body text-sm text-foreground/70">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="xl">
            Explore Tours
          </Button>
          <Button variant="gold" size="xl">
            Get a Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
