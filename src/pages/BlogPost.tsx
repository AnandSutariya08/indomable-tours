import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";

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
    excerpt: "Discover heritage hotels where Maharajas once held court, now welcoming discerning travelers to experience royal life.",
    content: `
      <p>Rajasthan, the Land of Kings, holds some of India's most extraordinary accommodation experiences. Beyond the well-known palace hotels of Udaipur and Jaipur lie hidden gems that offer authentic glimpses into royal Indian life.</p>
      
      <h2>The Legacy of Royal Hospitality</h2>
      <p>When India gained independence in 1947, many royal families found themselves with magnificent properties but dwindling resources to maintain them. The solution? Opening their doors to discerning travelers who wished to experience the grandeur of Indian royalty firsthand.</p>
      
      <p>Today, these heritage properties range from intimate havelis (traditional mansions) with just a handful of rooms to sprawling palace complexes that rival the world's finest hotels. What sets them apart is not just their architecture, but the personal touch that comes from staying with families whose ancestors once ruled kingdoms.</p>
      
      <h2>Hidden Gems Worth Discovering</h2>
      <p>While the Taj Lake Palace and Umaid Bhawan grace every luxury travel list, Rajasthan hides dozens of lesser-known treasures. In the small town of Rohet, the Rohet Garh offers horseback safaris through the surrounding countryside. The Chanoud Garh, a 300-year-old property, provides cooking classes where you learn family recipes passed down through generations.</p>
      
      <h2>What to Expect</h2>
      <p>Staying in a heritage hotel is more than accommodation—it's an immersion. Expect:</p>
      <ul>
        <li>Personal welcome ceremonies with garlands and tikka</li>
        <li>Evening sundowners on rooftop terraces with sunset views</li>
        <li>Traditional Rajasthani cuisine using family recipes</li>
        <li>Stories of ancestors and local legends</li>
        <li>Access to private art collections and heirlooms</li>
      </ul>
      
      <h2>Planning Your Royal Experience</h2>
      <p>The best time to visit Rajasthan's heritage properties is October through March, when the weather is pleasant for exploring. Book well in advance, especially during peak season and festival periods. Many properties offer special experiences during festivals like Diwali and Holi.</p>
      
      <p>Whether you choose a small family-run haveli or a grand palace hotel, staying in Rajasthan's heritage properties transforms a trip into a journey through time—one where you're not just a tourist, but a honored guest in a centuries-old tradition of Indian hospitality.</p>
    `,
    image: blog1,
    category: "Luxury Stays",
    author: "Rajesh Sharma",
    readTime: "8 min read",
    date: "January 15, 2025",
    tags: ["Rajasthan", "Heritage Hotels", "Luxury", "Culture"],
  },
  {
    id: 2,
    title: "A Culinary Journey Through Northern India",
    excerpt: "From street food to Michelin-worthy experiences, explore the diverse flavors that define India's culinary heritage.",
    content: `
      <p>Northern India's cuisine tells the story of Mughal emperors, ancient trade routes, and regional traditions that have evolved over millennia. From the fiery streets of Old Delhi to the refined dining rooms of heritage hotels, a culinary journey through this region is a feast for all senses.</p>
      
      <h2>The Street Food Trail</h2>
      <p>No culinary exploration of North India is complete without diving into its street food culture. In Delhi's Chandni Chowk, vendors have been perfecting their craft for generations. Here you'll find the legendary Paranthe Wali Gali, where stuffed parathas are fried in ghee that's been used and replenished for over a century.</p>
      
      <h2>Regional Specialties</h2>
      <p>Each region brings its own flavors to the table. Lucknow offers refined Awadhi cuisine, where dishes are slow-cooked to perfection. Amritsar is the spiritual home of butter chicken and naan. Rajasthan's vegetarian cuisine showcases incredible creativity with limited ingredients.</p>
      
      <h2>The Royal Connection</h2>
      <p>Many of India's most celebrated dishes originated in royal kitchens. The biryani of Lucknow, the kebabs of Delhi, the rich kormas of Rajasthan—all bear the influence of court chefs who competed to please demanding palates.</p>
    `,
    image: blog2,
    category: "Food & Culture",
    author: "Sarah Mitchell",
    readTime: "6 min read",
    date: "January 10, 2025",
    tags: ["Food", "Culture", "Delhi", "Street Food"],
  },
  {
    id: 3,
    title: "Wildlife Encounters: India's Best Safari Experiences",
    excerpt: "Track Bengal tigers in their natural habitat and discover the untamed beauty of India's national parks.",
    content: `
      <p>India is home to over 70% of the world's wild tiger population, making it the ultimate destination for those seeking to witness these magnificent creatures in their natural habitat. But India's wildlife extends far beyond tigers—from one-horned rhinos to snow leopards, the diversity is extraordinary.</p>
      
      <h2>Tiger Country</h2>
      <p>The central Indian parks of Ranthambore, Bandhavgarh, and Kanha offer some of the best tiger sighting opportunities in the world. Each park has its own character—Ranthambore with its ancient fort backdrop, Bandhavgarh with its high tiger density, and Kanha with its sweeping meadows.</p>
      
      <h2>Beyond Tigers</h2>
      <p>Kaziranga in Assam protects the world's largest population of one-horned rhinos. The Himalayan regions offer chances to spot the elusive snow leopard. The Western Ghats harbor elephants, leopards, and endemic species found nowhere else on Earth.</p>
    `,
    image: blog3,
    category: "Adventure",
    author: "Tenzin Dorji",
    readTime: "7 min read",
    date: "January 5, 2025",
    tags: ["Wildlife", "Safari", "Tigers", "Nature"],
  },
  {
    id: 4,
    title: "Trekking to Everest Base Camp: A Complete Guide",
    excerpt: "Everything you need to know about the world's most iconic trek.",
    content: `<p>The journey to Everest Base Camp is a bucket-list adventure that combines stunning Himalayan scenery with Sherpa culture and the thrill of standing at the foot of the world's highest peak.</p>`,
    image: nepal,
    category: "Adventure",
    author: "Tenzin Dorji",
    readTime: "12 min read",
    date: "December 28, 2024",
    tags: ["Nepal", "Trekking", "Everest", "Adventure"],
  },
  {
    id: 5,
    title: "Bhutan's Gross National Happiness: Travel Lessons",
    excerpt: "What the world's happiest kingdom can teach us about mindful travel.",
    content: `<p>In Bhutan, happiness is a national priority. This Buddhist kingdom offers travelers a chance to step back and reconsider what truly matters.</p>`,
    image: bhutan,
    category: "Culture",
    author: "Tenzin Dorji",
    readTime: "9 min read",
    date: "December 20, 2024",
    tags: ["Bhutan", "Culture", "Mindfulness", "Travel"],
  },
  {
    id: 6,
    title: "Sunrise at the Taj Mahal: A Photographer's Guide",
    excerpt: "Capture the world's most romantic monument in perfect light.",
    content: `<p>As dawn breaks over Agra, the Taj Mahal transforms from a dark silhouette to a glowing masterpiece of Mughal architecture.</p>`,
    image: tajMahal,
    category: "Photography",
    author: "Sarah Mitchell",
    readTime: "6 min read",
    date: "December 15, 2024",
    tags: ["Photography", "Taj Mahal", "Agra", "Tips"],
  },
  {
    id: 7,
    title: "Kerala's Ayurvedic Retreats: Healing Body and Soul",
    excerpt: "An insider's guide to authentic Ayurvedic experiences in God's Own Country.",
    content: `<p>Ayurveda, the 5,000-year-old science of life, finds its purest expression in Kerala's tranquil backwaters and lush hills.</p>`,
    image: kerala,
    category: "Wellness",
    author: "Rajesh Sharma",
    readTime: "8 min read",
    date: "December 10, 2024",
    tags: ["Kerala", "Ayurveda", "Wellness", "Spa"],
  },
  {
    id: 8,
    title: "The Sacred Rituals of Varanasi",
    excerpt: "Understanding the spiritual significance of India's holiest city.",
    content: `<p>Varanasi, also known as Kashi or Benares, has been a center of spiritual life for over 3,000 years.</p>`,
    image: varanasi,
    category: "Culture",
    author: "Rajesh Sharma",
    readTime: "10 min read",
    date: "December 5, 2024",
    tags: ["Varanasi", "Spirituality", "Culture", "Ganges"],
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === Number(id));

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
      <Header />
      
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] pt-20">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link to="/blog" className="inline-flex items-center gap-2 text-cream/80 hover:text-secondary transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                <span className="font-body text-sm">Back to Blog</span>
              </Link>
              <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-body text-sm mb-4">
                {post.category}
              </span>
              <h1 className="font-heading text-3xl md:text-5xl text-cream mb-6 max-w-4xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-cream/80">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
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
                    <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
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
