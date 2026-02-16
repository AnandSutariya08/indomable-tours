import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, { staggerContainer, fadeInUp } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBlogPosts } from "@/hooks/useFirestoreData";

import blog1 from "@/assets/blog/blog-1.jpg";

const categories = ["All"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: blogPosts, loading } = useBlogPosts();

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
      {selectedCategory === "All" && searchQuery === "" && !loading && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <h2 className="heading-display-sm text-primary mb-8">Featured Stories</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -10 }}
                  className={`group cursor-pointer ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className={`relative rounded-2xl overflow-hidden bg-[#2D2D2D] ${index === 0 ? "h-full min-h-[400px]" : "h-64"}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:scale-110"
                        loading="lazy"
                        onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                        style={{ opacity: 1 }}
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
      <section className="py-12 bg-background border-b border-border">
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
              <Search style={{zIndex:999}} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-white/50 backdrop-blur-sm border-black/5 rounded-2xl shadow-sm focus:bg-white transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
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
                      <div className="relative h-56 overflow-hidden bg-[#2D2D2D]">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-opacity duration-300 group-hover:scale-110"
                          loading="lazy"
                          onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                          style={{ opacity: 1 }}
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
          )}

          {!loading && filteredPosts.length === 0 && (
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
