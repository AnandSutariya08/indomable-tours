import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, { staggerContainer, fadeInUp } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";

import luxuryHero from "@/assets/luxury-hero.jpg";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Message sent successfully!");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <PageHeader
        badge="Get In Touch"
        title="Contact IndoMaple Tours"
        subtitle="Let’s start designing your extraordinary journey."
        backgroundImage={luxuryHero}
      />

      {/* Contact Info Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="heading-display-sm text-primary mb-4">
                We’re Here To Help
              </h2>
              <p className="body-display-md text-foreground max-w-2xl mx-auto">
                Whether you're a travel agency, university, corporate partner, or individual traveler — let’s connect.
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Mail,
                title: "Email Us",
                value: "info@indomapletours.com",
                desc: "Send us your inquiry anytime.",
              },
              {
                icon: Phone,
                title: "Call Us",
                value: "+1 (XXX) XXX-XXXX",
                desc: "Mon–Fri, 9AM – 6PM (EST)",
              },
              {
                icon: MapPin,
                title: "Based In",
                value: "Canada",
                desc: "Serving clients globally",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl text-primary mb-2">
                  {item.title}
                </h3>
                <p className="font-body font-medium text-foreground mb-1">
                  {item.value}
                </p>
                <p className="font-body text-foreground/70 text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Form */}
            <AnimatedSection>
              <h2 className="heading-display-sm text-primary mb-6">
                Send Us A Message
              </h2>
              <p className="font-body text-foreground/80 mb-8">
                Tell us about your travel goals and preferences. Our team will respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  type="text"
                  placeholder="Organization (Optional)"
                  className="w-full p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <textarea
                  placeholder="Tell us about your travel plans..."
                  rows={5}
                  required
                  className="w-full p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="group w-full"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </AnimatedSection>

            {/* Business Info */}
            <AnimatedSection delay={0.2}>
              <div className="bg-card p-10 rounded-2xl shadow-xl">
                <h3 className="font-heading text-2xl text-primary mb-6">
                  Business Hours
                </h3>

                <div className="space-y-4 font-body text-foreground/80">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span>9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>By Appointment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>

                <div className="border-t border-border my-8" />

               <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-xl">
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
    <Clock className="w-5 h-5 text-primary" />
  </div>
  <p className="font-body text-sm text-foreground/80 leading-relaxed">
    We respond to all inquiries within 24 hours.
  </p>
</div>

              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="heading-display-sm text-primary-foreground mb-6">
              Let’s Curate Something Extraordinary
            </h2>
            <p className="body-display-md text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Authentic destinations. Thoughtful design. Seamless execution.
            </p>
            <Button variant="gold" size="xl">
              Explore Our Tours
            </Button>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </main>
  );
};

export default Contact;
