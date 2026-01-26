import { motion } from "framer-motion";
import { Users, Heart, Leaf, Shield, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, { staggerContainer, fadeInUp } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { useTeam } from "@/hooks/useFirestoreData";

import luxuryHero from "@/assets/luxury-hero.jpg";
import kerala from "@/assets/destinations/kerala.jpg";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "5000+", label: "Happy Travelers" },
  { value: "4", label: "Countries" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: Heart,
    title: "Authentic Experiences",
    description: "We go beyond tourist traps to connect you with genuine local culture, traditions, and people.",
  },
  {
    icon: Shield,
    title: "Your Safety First",
    description: "Comprehensive safety protocols, trusted partners, and 24/7 support ensure worry-free travel.",
  },
  {
    icon: Leaf,
    title: "Sustainable Tourism",
    description: "We're committed to minimizing our footprint while maximizing positive community impact.",
  },
  {
    icon: Users,
    title: "Expert Local Guides",
    description: "Our guides are passionate locals who bring destinations to life with stories and insights.",
  },
];

const milestones = [
  { year: "2010", event: "Founded in Toronto with a mission to share authentic Asian travel" },
  { year: "2012", event: "Expanded to Nepal and established local partnerships" },
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
        title="About Indomable Tours"
        subtitle="India Expertise. Canadian Standards. Creating transformative travel experiences since 2010."
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
                We believe travel should be more than sightseeing. It should be a doorway to 
                understanding different cultures, challenging perspectives, and creating memories 
                that last a lifetime.
              </p>
              <p className="font-body text-foreground/80 mb-8">
                Founded by travelers who fell deeply in love with Asia, Indomable Tours 
                combines insider knowledge with meticulous planning to create journeys 
                that reveal the soul of each destination. From the spiritual banks of the 
                Ganges to the remote monasteries of Bhutan, we open doors that remain 
                closed to ordinary tourists.
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
                  <p className="font-heading text-4xl mb-2">15+</p>
                  <p className="font-body text-primary-foreground/80">Years of Excellence</p>
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
                <p className="font-heading text-5xl md:text-6xl text-primary mb-2">{stat.value}</p>
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
                These principles guide every tour we design and every interaction we have.
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
                <h3 className="font-heading text-xl text-primary mb-3">{value.title}</h3>
                <p className="font-body text-foreground/80">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-body text-sm font-medium mb-6">
                Our Journey
              </span>
              <h2 className="heading-display-sm text-primary mb-4">
                Milestones Along the Way
              </h2>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20">
                  <span className="font-heading text-2xl text-primary">{milestone.year}</span>
                </div>
                <div className="relative flex-1 pb-8 border-l-2 border-secondary/30 pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-secondary" />
                  <p className="font-body text-foreground">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-body text-sm font-medium mb-6">
                The People Behind the Magic
              </span>
              <h2 className="heading-display-sm text-primary mb-4">
                Meet Our Team
              </h2>
              <p className="body-display-md text-foreground max-w-2xl mx-auto">
                Passionate travelers dedicated to creating your perfect journey.
              </p>
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  <h3 className="font-heading text-xl text-primary mb-1">{member.name}</h3>
                  <p className="font-body text-secondary font-medium mb-3">{member.role}</p>
                  <p className="font-body text-foreground/80 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
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
