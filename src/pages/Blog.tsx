import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, Tag, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, { staggerContainer, fadeInUp } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import blog1 from "@/assets/blog/blog-1.jpg";
import blog2 from "@/assets/blog/blog-2.jpg";
import blog3 from "@/assets/blog/blog-3.jpg";
import tajMahal from "@/assets/destinations/taj-mahal.jpg";
import kerala from "@/assets/destinations/kerala.jpg";
import bhutan from "@/assets/destinations/bhutan.jpg";
import nepal from "@/assets/destinations/nepal.jpg";
import varanasi from "@/assets/destinations/varanasi.jpg";

const blogPosts = [
  {
    id: 1,
    title: "The Art of Palace Living: Rajasthan's Hidden Gems",
    excerpt: "Discover heritage hotels where Maharajas once held court, now welcoming discerning travelers to experience royal life. From Udaipur's lake palaces to Jaipur's restored havelis.",
    content: "Experience the grandeur of India's royal past...",
    image: blog1,
    category: "Luxury Stays",
    author: "Rajesh Sharma",
    readTime: "8 min read",
    date: "January 15, 2025",
    featured: true,
  },
  {
    id: 2,
    title: "A Culinary Journey Through Northern India",
    excerpt: "From street food to Michelin-worthy experiences, explore the diverse flavors that define India's culinary heritage. Discover the stories behind each dish.",
    content: "The aromas of India's kitchens tell stories...",
    image: blog2,
    category: "Food & Culture",
    author: "Sarah Mitchell",
    readTime: "6 min read",
    date: "January 10, 2025",
    featured: true,
  },
  {
    id: 3,
    title: "Wildlife Encounters: India's Best Safari Experiences",
    excerpt: "Track Bengal tigers in their natural habitat and discover the untamed beauty of India's national parks. Tips for ethical wildlife tourism.",
    content: "Dawn breaks over the jungle...",
    image: blog3,
    category: "Adventure",
    author: "Tenzin Dorji",
    readTime: "7 min read",
    date: "January 5, 2025",
    featured: true,
  },
  {
    id: 4,
    title: "Trekking to Everest Base Camp: A Complete Guide",
    excerpt: "Everything you need to know about the world's most iconic trek. From preparation to packing, altitude to acclimatization.",
    content: "The journey to Everest Base Camp...",
    image: nepal,
    category: "Adventure",
    author: "Tenzin Dorji",
    readTime: "12 min read",
    date: "December 28, 2024",
    featured: false,
  },
  {
    id: 5,
    title: "Bhutan's Gross National Happiness: Travel Lessons",
    excerpt: "What the world's happiest kingdom can teach us about mindful travel and meaningful experiences beyond material gains.",
    content: "In Bhutan, happiness is a national priority...",
    image: bhutan,
    category: "Culture",
    author: "Tenzin Dorji",
    readTime: "9 min read",
    date: "December 20, 2024",
    featured: false,
  },
  {
    id: 6,
    title: "Sunrise at the Taj Mahal: A Photographer's Guide",
    excerpt: "Capture the world's most romantic monument in perfect light. Camera settings, best angles, and insider tips for stunning shots.",
    content: "As dawn breaks over Agra...",
    image: tajMahal,
    category: "Photography",
    author: "Sarah Mitchell",
    readTime: "6 min read",
    date: "December 15, 2024",
    featured: false,
  },
  {
    id: 7,
    title: "Kerala's Ayurvedic Retreats: Healing Body and Soul",
    excerpt: "An insider's guide to authentic Ayurvedic experiences in God's Own Country. What to expect and how to choose the right retreat.",
    content: "Ayurveda, the science of life...",
    image: kerala,
    category: "Wellness",
    author: "Rajesh Sharma",
    readTime: "8 min read",
    date: "December 10, 2024",
    featured: false,
  },
  {
    id: 8,
    title: "The Sacred Rituals of Varanasi",
    excerpt: "Understanding the spiritual significance of India's holiest city. A respectful guide to witnessing ancient ceremonies on the Ganges.",
    content: "Varanasi, also known as Kashi...",
    image: varanasi,
    category: "Culture",
    author: "Rajesh Sharma",
    readTime: "10 min read",
    date: "December 5, 2024",
    featured: false,
  },
];

const categories = ["All", "Luxury Stays", "Food & Culture", "Adventure", "Culture", "Photography", "Wellness"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured || selectedCategory !== "All");

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHeader
        badge="Stories & Insights"
        title="Our Travel Journal"
        subtitle="Inspiration, tips, and stories from our journeys across Asia. Discover the extraordinary."
        backgroundImage={blog1}
      />

      {/* Featured Posts */}
      {selectedCategory === "All" && searchQuery === "" && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <h2 className="heading-display-sm text-primary mb-8">Featured Stories</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -10 }}
                  className={`group cursor-pointer ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className={`relative rounded-2xl overflow-hidden ${index === 0 ? "h-full min-h-[400px]" : "h-64"}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-body text-xs mb-3">
                          {post.category}
                        </span>
                        <h3 className={`font-heading text-cream mb-2 group-hover:text-secondary transition-colors ${index === 0 ? "text-2xl md:text-3xl" : "text-xl"}`}>
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-4 text-cream/70 text-sm">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="py-12 bg-background sticky top-20 z-30 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-muted border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {(selectedCategory === "All" && searchQuery === "" ? regularPosts : filteredPosts).map((post, index) => (
              <motion.article
                key={post.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link to={`/blog/${post.id}`}>
                  <div className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-body text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-foreground/60 text-sm mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="font-body text-sm text-foreground/80 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-secondary" />
                          </div>
                          <span className="font-body text-sm text-foreground/70">{post.author}</span>
                        </div>
                        <span className="flex items-center gap-1 text-primary font-body text-sm font-medium group-hover:text-accent transition-colors">
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="font-heading text-2xl text-primary mb-4">No articles found</h3>
              <p className="font-body text-foreground/70">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <AnimatedSection>
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="heading-display-sm text-primary-foreground mb-6">
              Get Travel Inspiration
            </h2>
            <p className="body-display-md text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive stories, travel tips, and special offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="gold" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </main>
  );
};

export default Blog;
