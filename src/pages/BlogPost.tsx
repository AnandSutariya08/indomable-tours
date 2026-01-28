import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, User, Calendar, Tag, Facebook, Linkedin, Loader2, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { useBlogPosts } from "@/hooks/useFirestoreData";

const BlogPost = () => {
  const { id } = useParams();
  const { data: blogPosts, loading } = useBlogPosts();
  const post = blogPosts.find((p) => p.id === id);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 text-center">
          <h1 className="heading-display-md text-primary mb-4">Article Not Found</h1>
          <p className="font-body text-foreground/70 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button variant="hero">Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | Indomable Tours Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>
      <Header />

      {/* Hero Image */}
      <div className="relative h-[70vh] md:h-[75vh] lg:h-[80vh] min-h-[500px] md:min-h-[600px]">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        {/* Stronger overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

        {/* Back Button - Repositioned and responsive */}
        <div className="absolute top-24 md:top-28 left-4 md:left-8 lg:left-12 z-20">
          <Link to="/blog">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all rounded-full px-4 md:px-6 py-1.5 md:py-2 h-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
              <span className="font-body text-[10px] md:text-xs font-bold tracking-widest uppercase">Back to Blog</span>
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-secondary text-secondary-foreground font-body text-[10px] md:text-xs font-bold tracking-widest uppercase shadow-lg">
                  {post.category}
                </span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-cream font-bold leading-[1.2] md:leading-tight max-w-4xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 text-cream/90 border-t border-white/10 pt-4 md:pt-6">
                <div className="flex items-center gap-2 md:gap-2.5">
                  <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                  <span className="font-body text-[11px] md:text-sm font-medium tracking-wide">{post.author}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-2.5">
                  <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                  <span className="font-body text-[11px] md:text-sm font-medium tracking-wide">{post.date}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-2.5">
                  <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                  <span className="font-body text-[11px] md:text-sm font-medium tracking-wide">{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <AnimatedSection>
                <div
                  className="prose prose-lg max-w-none font-body text-foreground/90"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{
                    lineHeight: '1.8',
                  }}
                />
              </AnimatedSection>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-5 h-5 text-foreground/60" />
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-muted text-foreground/70 font-body text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="font-body text-foreground/70">Share this article:</span>
                  <div className="flex gap-3">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `${post.title} – ${window.location.href}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted hover:bg-green-500 hover:text-white transition-colors"
                      aria-label="Share on WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                {/* Author */}
                <div className="bg-card p-6 rounded-2xl">
                  <h3 className="font-heading text-lg text-primary mb-4">About the Author</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                      <User className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <p className="font-heading text-foreground">{post.author}</p>
                      <p className="font-body text-sm text-foreground/70">Travel Writer</p>
                    </div>
                  </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-card p-6 rounded-2xl">
                    <h3 className="font-heading text-lg text-primary mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((related) => (
                        <Link
                          key={related.id}
                          to={`/blog/${related.id}`}
                          className="flex gap-4 group"
                        >
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-heading text-sm text-primary group-hover:text-accent transition-colors line-clamp-2">
                              {related.title}
                            </h4>
                            <span className="font-body text-xs text-foreground/60">{related.readTime}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPost;
