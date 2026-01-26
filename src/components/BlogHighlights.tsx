import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import blog1 from "@/assets/blog/blog-1.jpg";
import blog2 from "@/assets/blog/blog-2.jpg";
import blog3 from "@/assets/blog/blog-3.jpg";

const blogPosts = [
  {
    id: 1,
    title: "The Art of Palace Living: Rajasthan's Hidden Gems",
    excerpt: "Discover heritage hotels where Maharajas once held court, now welcoming discerning travelers to experience royal life.",
    image: blog1,
    category: "Luxury Stays",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "A Culinary Journey Through Northern India",
    excerpt: "From street food to Michelin-worthy experiences, explore the diverse flavors that define India's culinary heritage.",
    image: blog2,
    category: "Food & Culture",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Wildlife Encounters: India's Best Safari Experiences",
    excerpt: "Track Bengal tigers in their natural habitat and discover the untamed beauty of India's national parks.",
    image: blog3,
    category: "Adventure",
    readTime: "7 min read",
  },
];

const BlogHighlights = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Header */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-body text-sm font-medium mb-6">
                From Our Journal
              </span>
              <h2 className="heading-display-md text-primary mb-6">
                Stories That Inspire Wanderlust
              </h2>
              <p className="body-display-md text-foreground">
                Dive into tales of adventure, culture, and discovery. Our travel 
                experts share insider knowledge, destination guides, and the stories 
                behind the journeys that change lives.
              </p>
            </div>

            <Button variant="hero" size="xl" className="group">
              Read Our Blog
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right - Blog Grid */}
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
                className="flex gap-5 group cursor-pointer"
              >
                {/* Image */}
                <div className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 py-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-body text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-foreground/60 font-body text-xs">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg md:text-xl text-primary group-hover:text-accent transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-foreground/80 line-clamp-2 hidden md:block">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-secondary font-body text-sm font-medium mt-2 group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHighlights;
