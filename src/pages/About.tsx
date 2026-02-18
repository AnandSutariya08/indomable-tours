import { motion } from "framer-motion";
import { Users, Heart, Leaf, Shield, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, {
  staggerContainer,
  fadeInUp,
} from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { useTeam } from "@/hooks/useFirestoreData";

import luxuryHero from "@/assets/luxury-hero.jpg";
import kerala from "@/assets/destinations/kerala.jpg";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "5000+", label: "Happy Travelers" },
  { value: "4", label: "Countries" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: Heart,
    title: "Authentic Experiences",
    description:
      " We take you beyond the obvious, into the heart of authentic local life.",
  },
  {
    icon: Shield,
    title: "Your Safety First",
    description:
      "Comprehensive safety protocols, trusted partners, and 24/7 support ensure worry-free travel.",
  },
  {
    icon: Leaf,
    title: "Responsible Tourism",
    description:
      "We design journeys that respect the environment and uplift the communities that make each     destination special.",
  },
  {
    icon: Users,
    title: "Expert Local Guides",
    description:
      "Our guides are passionate locals who bring destinations to life with stories and insights.",
  },
];

const milestones = [
  {
    year: "2016",
    event: "Founded in Toronto with a mission to share authentic Asian travel",
  },
  {
    year: "2012",
    event: "Expanded to Nepal and established local partnerships",
  },
  { year: "2015", event: "Became licensed Bhutan tour operator" },
  { year: "2017", event: "Added Sri Lanka to our destination portfolio" },
  { year: "2020", event: "Achieved carbon-neutral operations" },
  { year: "2024", event: "Celebrating 5000+ happy travelers" },
];

const About = () => {
  const { data: team, loading } = useTeam();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHeader
        badge="Our Story"
        title="About Indomaple Tours"
        subtitle="India Expertise. Canadian Standards. Creating transformative travel experiences since 2016."
        backgroundImage={luxuryHero}
      />

      {/* Mission Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-body text-sm font-medium mb-6">
                Our Mission
              </span>
              <h2 className="heading-display-sm text-primary mb-6">
                Crafting Journeys That Transform
              </h2>
              <p className="body-display-md text-foreground mb-6">
                We believe travel should be more than sightseeing. It should be
                a doorway to understanding different cultures, challenging
                perspectives, and creating memories that last a lifetime.
              </p>
              <p className="font-body text-foreground/80 mb-8">
                Founded by travelers who fell deeply in love with Asia,
                Indomaple Tours combines insider knowledge with meticulous
                planning to create journeys that reveal the soul of each
                destination. From the spiritual banks of the Ganges to the
                remote monasteries of Bhutan, we open doors that remain closed
                to ordinary tourists.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/tours">
                  <Button variant="hero" size="lg" className="group">
                    Explore Our Tours
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <img
                  src={kerala}
                  alt="Travel experience"
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground p-8 rounded-2xl shadow-xl">
                  <p className="font-heading text-4xl mb-2">10+</p>
                  <p className="font-body text-primary-foreground/80">
                    Years of Excellence
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-heading text-5xl md:text-6xl text-primary mb-2">
                  {stat.value}
                </p>
                <p className="font-body text-foreground/70">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-body text-sm font-medium mb-6">
                What We Stand For
              </span>
              <h2 className="heading-display-sm text-primary mb-4">
                Our Core Values
              </h2>
              <p className="body-display-md text-foreground max-w-2xl mx-auto">
                These principles guide every tour we design and every
                interaction we have.
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-card p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl text-primary mb-3">
                  {value.title}
                </h3>
                <p className="font-body text-foreground/80">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      {/* Founder Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-body text-sm font-medium mb-6">
                About Our Founder
              </span>
              <h2 className="heading-display-sm text-primary mb-4">
                Gagandeep Makkar
              </h2>
              <p className="body-display-md text-foreground max-w-3xl mx-auto">
                Founder, IndoMaple Tours — Indian Expertise. Canadian Standards.
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          >
            {/* Founder Image */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="relative h-[520px] rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src="/5c1e39358ecf2d5a.jpeg"
                  alt="Gagandeep Makkar"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="font-heading text-3xl mb-1">Since 2016</p>
                <p className="font-body text-primary-foreground/80 text-sm">
                  A Decade of Travel Excellence
                </p>
              </div>
            </motion.div>

            {/* Founder Content */}
            <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
              <p className="font-body text-foreground/80 mb-6 leading-relaxed">
                Gagandeep’s journey in tourism did not begin in a boardroom; it
                began in the vibrant town of <strong>Alwar, Rajasthan</strong> —
                a culturally rich destination surrounded by majestic landscapes
                and the wilderness of Sariska.
              </p>

              <p className="font-body text-foreground/80 mb-6 leading-relaxed">
                Born and raised in Alwar, weekends were spent exploring forts,
                boating across serene lakes, and guiding visiting friends
                through hidden corners of his hometown. Tourism was never just
                an industry for him — it was a lived experience.
              </p>

              <p className="font-body text-foreground/80 mb-6 leading-relaxed">
                During college, that passion turned entrepreneurial. What began
                as weekend explorations evolved into organizing winter and
                spring group tours for students from multiple colleges. While
                completing his graduation, he guided over 100 groups to Alwar —
                building deep hands-on experience in logistics, operations, and
                guest engagement.
              </p>

              <p className="font-body text-foreground/80 mb-6 leading-relaxed">
                Since 2016, he has professionally curated exclusive itineraries
                across India and Asia including Nepal, Bhutan, Sri Lanka, Japan,
                and Indonesia. His expertise spans wildlife expeditions,
                spiritual retreats, cultural heritage circuits, culinary
                journeys, photography tours, and immersive local experiences.
              </p>

              <div className="space-y-3 mb-8">
                <p className="font-body text-foreground font-medium">
                  Today, IndoMaple Tours is built on:
                </p>

                <ul className="space-y-2 text-foreground/80 font-body">
                  <li>• Deep-rooted Indian destination knowledge</li>
                  <li>• A decade of professional travel curation experience</li>
                  <li>
                    • Strong supplier networks across India & neighboring
                    countries
                  </li>
                  <li>
                    • Indian expertise delivered with Canadian service standards
                  </li>
                </ul>
              </div>

              <p className="font-body text-foreground/80 leading-relaxed">
                Now based in Canada, his mission is simple: to showcase the
                India he has lived and curated — beyond clichés and tourist
                stereotypes. He believes India is not just a destination, but a
                layered experience of heritage, wildlife, wellness, cuisine,
                craftsmanship, and living culture.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="heading-display-sm text-primary-foreground mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="body-display-md text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let us help you discover the extraordinary. Your adventure awaits.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tours">
                <Button variant="gold" size="xl">
                  Explore Tours
                </Button>
              </Link>
              <Link to="/destinations">
                <Button variant="heroOutline" size="xl">
                  View Destinations
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </main>
  );
};

export default About;
