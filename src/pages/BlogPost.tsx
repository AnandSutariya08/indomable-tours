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
          <Link to="/blog"><Button variant="hero">Back to Blog</Button></Link>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | Indomaple Tours Blog</title>
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

      {/* Hero */}
      <div className="relative h-[70vh] md:h-[75vh] lg:h-[80vh] min-h-[500px] md:min-h-[600px]">
        <motion.img
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1 }}
          src={post.image} alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
        <div className="absolute top-24 md:top-28 left-4 md:left-8 lg:left-12 z-20">
          <Link to="/blog">
            <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all rounded-full px-4 md:px-6 py-1.5 md:py-2 h-auto">
              <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
              <span className="font-body text-[10px] md:text-xs font-bold tracking-widest uppercase">Back to Blog</span>
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4 md:space-y-6">
              <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-secondary text-secondary-foreground font-body text-[10px] md:text-xs font-bold tracking-widest uppercase shadow-lg">
                {post.category}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-cream font-bold leading-[1.2] md:leading-tight max-w-4xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 text-cream/90 border-t border-white/10 pt-4 md:pt-6">
                <div className="flex items-center gap-2 md:gap-2.5"><User className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" /><span className="font-body text-[11px] md:text-sm font-medium tracking-wide">{post.author}</span></div>
                <div className="flex items-center gap-2 md:gap-2.5"><Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" /><span className="font-body text-[11px] md:text-sm font-medium tracking-wide">{post.date}</span></div>
                <div className="flex items-center gap-2 md:gap-2.5"><Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" /><span className="font-body text-[11px] md:text-sm font-medium tracking-wide">{post.readTime}</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-muted/30 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Main */}
            <div className="lg:col-span-8 bg-card rounded-3xl shadow-xl border border-border/50 overflow-hidden flex flex-col lg:h-[800px]">
              <div className="p-8 md:p-12 overflow-y-auto blog-scroll-area flex-1">
                <AnimatedSection>
                  <div className="blog-rich-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                </AnimatedSection>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-border/50">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-5 h-5 text-secondary" />
                    {post.tags?.map((tag) => (
                      <span key={tag} className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-body text-sm font-medium border border-secondary/20 hover:bg-secondary/20 transition-colors cursor-default">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Share Bar */}
              <div className="p-6 bg-muted/50 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-heading text-sm text-foreground/70 font-semibold uppercase tracking-wider">Share:</span>
                  <div className="flex gap-3">
                    <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} – ${window.location.href}`)}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-green-500 hover:text-white transition-all duration-300" aria-label="WhatsApp"><MessageCircle className="w-5 h-5" /></a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-[#1877F2] hover:text-white transition-all duration-300"><Facebook className="w-5 h-5" /></a>
                    <a href={`https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-black hover:text-white transition-all duration-300"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-[#0A66C2] hover:text-white transition-all duration-300"><Linkedin className="w-5 h-5" /></a>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <Button variant="hero" size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top of Page</Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8 sticky top-28">
              <div className="bg-card p-8 rounded-3xl shadow-lg border border-border/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                <h3 className="font-heading text-xl text-primary mb-6 flex items-center gap-2"><span className="w-8 h-1 bg-secondary rounded-full" />About Author</h3>
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/40 flex items-center justify-center border border-secondary/20"><User className="w-10 h-10 text-secondary" /></div>
                  <div>
                    <p className="font-heading text-lg text-foreground font-bold">{post.author}</p>
                    
                  </div>
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div className="bg-card p-8 rounded-3xl shadow-lg border border-border/50">
                  <h3 className="font-heading text-xl text-primary mb-6 flex items-center gap-2"><span className="w-8 h-1 bg-secondary rounded-full" />Keep Reading</h3>
                  <div className="space-y-6">
                    {relatedPosts.map((related) => (
                      <Link key={related.id} to={`/blog/${related.id}`} className="flex gap-4 group items-center">
                        <div className="relative w-24 h-20 shrink-0 overflow-hidden rounded-xl">
                          <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-heading text-sm text-foreground group-hover:text-secondary transition-colors line-clamp-2 leading-snug font-bold">{related.title}</h4>
                          <div className="flex items-center gap-2 mt-2"><Clock className="w-3 h-3 text-secondary" /><span className="font-body text-[10px] text-foreground/60 font-semibold uppercase tracking-widest">{related.readTime}</span></div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              
            </aside>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        /* ── Scrollbar ── */
        .blog-scroll-area { scrollbar-width: thin; scrollbar-color: hsl(var(--secondary) / 0.3) transparent; }
        .blog-scroll-area::-webkit-scrollbar { width: 4px; }
        .blog-scroll-area::-webkit-scrollbar-track { background: transparent; }
        .blog-scroll-area::-webkit-scrollbar-thumb { background: hsl(var(--secondary) / 0.35); border-radius: 10px; }

        /* ── Base ── */
        .blog-rich-content {
          font-size: 1.05rem;
          line-height: 1.85;
          color: hsl(var(--foreground) / 0.78);
        }

        /* ── Paragraphs ── */
        .blog-rich-content p {
          margin-bottom: 1.6rem;
        }

        /* ── Drop Cap ── */
        .blog-rich-content > p:first-of-type::first-letter {
          font-size: 4.2rem;
          font-weight: 800;
          line-height: 0.78;
          float: left;
          margin-right: 0.1em;
          margin-top: 0.06em;
          color: hsl(var(--secondary));
          filter: drop-shadow(1px 2px 0px hsl(var(--secondary) / 0.2));
        }

        /* ── H1 ── */
        .blog-rich-content h1 {
          font-size: 1.9rem;
          font-weight: 800;
          color: hsl(var(--primary));
          margin: 2.5rem 0 1rem;
          line-height: 1.25;
          clear: both;
          letter-spacing: -0.01em;
        }

        /* ── H2: accent underbar ── */
        .blog-rich-content h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: hsl(var(--primary));
          margin: 2.8rem 0 1rem;
          padding-bottom: 0.55rem;
          position: relative;
          line-height: 1.3;
          clear: both;
          letter-spacing: -0.01em;
        }
        .blog-rich-content h2::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 3rem; height: 3px;
          border-radius: 99px;
          background: linear-gradient(90deg, hsl(var(--secondary)), hsl(var(--secondary) / 0));
        }

        /* ── H3: left stripe ── */
        .blog-rich-content h3 {
          font-size: 1.18rem;
          font-weight: 700;
          color: hsl(var(--primary) / 0.9);
          margin: 2.2rem 0 0.8rem;
          padding-left: 0.9rem;
          border-left: 3px solid hsl(var(--secondary) / 0.6);
          line-height: 1.35;
          clear: both;
        }

        /* ── H4: label style ── */
        .blog-rich-content h4 {
          font-size: 0.75rem;
          font-weight: 700;
          color: hsl(var(--secondary));
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin: 2rem 0 0.6rem;
          clear: both;
        }

        /* ── Bold ── */
        .blog-rich-content strong,
        .blog-rich-content b {
          font-weight: 700;
          color: hsl(var(--foreground));
        }

        /* ── Italic ── */
        .blog-rich-content em,
        .blog-rich-content i {
          color: hsl(var(--foreground) / 0.65);
        }

        /* ── Blockquote ── */
        .blog-rich-content blockquote {
          position: relative;
          margin: 2.5rem 0;
          padding: 1.4rem 1.75rem 1.4rem 2rem;
          background: linear-gradient(
            135deg,
            hsl(var(--secondary) / 0.07) 0%,
            hsl(var(--secondary) / 0.02) 100%
          );
          border-left: 4px solid hsl(var(--secondary));
          border-radius: 0 0.875rem 0.875rem 0;
          color: hsl(var(--foreground) / 0.7);
          font-size: 1.08rem;
          font-style: italic;
          clear: both;
        }
        .blog-rich-content blockquote::before {
          content: '\u201C';
          position: absolute;
          top: -0.6rem; left: 0.9rem;
          font-size: 5.5rem;
          line-height: 1;
          color: hsl(var(--secondary) / 0.15);
          pointer-events: none;
        }
        .blog-rich-content blockquote p { margin: 0; }
        /* prevent drop-cap bleeding into blockquote */
        .blog-rich-content blockquote p::first-letter {
          font-size: inherit !important;
          font-weight: inherit !important;
          float: none !important;
          margin: 0 !important;
          color: inherit !important;
          filter: none !important;
        }

        /* ── Links ── */
        .blog-rich-content a {
          color: hsl(var(--secondary));
          text-decoration: underline;
          text-decoration-color: hsl(var(--secondary) / 0.35);
          text-underline-offset: 3px;
          font-weight: 500;
          transition: color 0.2s, text-decoration-color 0.2s;
        }
        .blog-rich-content a:hover {
          color: hsl(var(--primary));
          text-decoration-color: hsl(var(--primary) / 0.45);
        }

        /* ── UL ── */
        .blog-rich-content ul {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0;
        }
        .blog-rich-content ul li {
          position: relative;
          padding: 0.5rem 0 0.5rem 1.9rem;
          border-bottom: 1px solid hsl(var(--border) / 0.4);
          color: hsl(var(--foreground) / 0.78);
          font-size: 0.975rem;
          line-height: 1.65;
        }
        .blog-rich-content ul li:last-child { border-bottom: none; }
        .blog-rich-content ul li::before {
          content: '';
          position: absolute;
          left: 0.3rem; top: 0.95rem;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: hsl(var(--secondary));
          box-shadow: 0 0 0 2px hsl(var(--secondary) / 0.2);
        }

        /* ── OL ── */
        .blog-rich-content ol {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0;
          counter-reset: blog-ol;
        }
        .blog-rich-content ol li {
          position: relative;
          padding: 0.5rem 0 0.5rem 2.6rem;
          border-bottom: 1px solid hsl(var(--border) / 0.4);
          color: hsl(var(--foreground) / 0.78);
          font-size: 0.975rem;
          line-height: 1.65;
          counter-increment: blog-ol;
        }
        .blog-rich-content ol li:last-child { border-bottom: none; }
        .blog-rich-content ol li::before {
          content: counter(blog-ol);
          position: absolute;
          left: 0; top: 0.45rem;
          width: 1.65rem; height: 1.65rem;
          background: hsl(var(--secondary));
          color: #fff;
          font-size: 0.68rem;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── HR ── */
        .blog-rich-content hr {
          border: none;
          margin: 2.5rem auto;
          height: 1px;
          background: linear-gradient(90deg, transparent, hsl(var(--secondary) / 0.45), transparent);
          clear: both;
        }

        /* ── Images ── */
        .blog-rich-content img {
          width: 100%;
          border-radius: 0.875rem;
          margin: 2rem 0;
          display: block;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .blog-rich-content img:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.14);
        }

        /* ── Inline Code ── */
        .blog-rich-content code {
          background: hsl(var(--secondary) / 0.1);
          color: hsl(var(--secondary));
          padding: 0.12em 0.42em;
          border-radius: 0.3rem;
          font-size: 0.86em;
          border: 1px solid hsl(var(--secondary) / 0.2);
        }

        /* ── Mark ── */
        .blog-rich-content mark {
          background: linear-gradient(120deg, hsl(var(--secondary) / 0.28), hsl(var(--secondary) / 0.1));
          color: hsl(var(--foreground));
          padding: 0.08em 0.3em;
          border-radius: 0.2rem;
        }

        /* ── Table ── */
        .blog-rich-content table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
          font-size: 0.9rem;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .blog-rich-content thead tr { background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }
        .blog-rich-content th { padding: 0.85rem 1.1rem; text-align: left; font-weight: 700; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.07em; }
        .blog-rich-content td { padding: 0.75rem 1.1rem; border-bottom: 1px solid hsl(var(--border) / 0.4); color: hsl(var(--foreground) / 0.78); }
        .blog-rich-content tbody tr:nth-child(even) { background: hsl(var(--secondary) / 0.04); }
        .blog-rich-content tbody tr:last-child td { border-bottom: none; }
      `}</style>
    </main>
  );
};

export default BlogPost;