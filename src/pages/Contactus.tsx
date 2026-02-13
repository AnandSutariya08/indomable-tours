import { motion } from "framer-motion";
import { Mail, Phone, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, {
  staggerContainer,
  fadeInUp,
} from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";

import luxuryHero from "@/assets/luxury-hero.jpg";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      organization: formData.get("organization") || "N/A",
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        e.currentTarget.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }

    setLoading(false);
  };

  const contactDetails = [
    {
      icon: Phone,
      title: "Canada Office – Sales & Partnerships",
      value: "+1 782 899 2178",
      link: "tel:+17828992178",
    },
    {
      icon: Phone,
      title: "India Office – Operations & On-Ground Support",
      value: "+91 999 904 2178",
      link: "tel:+919999042178",
    },
    {
      icon: Mail,
      title: "Email",
      value: "gagan.makkar@indomapletours.ca",
      link: "mailto:gagan.makkar@indomapletours.ca",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <PageHeader
        badge="Get In Touch"
        title="Contact IndoMaple Tours"
        subtitle="Let’s design your extraordinary journey together."
        backgroundImage={luxuryHero}
      />

      {/* Contact Info */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="heading-display-sm text-primary mb-4">
                Connect With Us
              </h2>
              <p className="body-display-md text-foreground max-w-2xl mx-auto">
                Whether you're a travel agency, university, corporate partner,
                or individual traveler — we’re here to help.
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
            {contactDetails.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-card p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="font-heading text-lg text-primary mb-3 leading-snug">
                  {item.title}
                </h3>

                <a
                  href={item.link}
                  className="font-body text-foreground hover:text-secondary transition-colors"
                >
                  {item.value}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <AnimatedSection>
              <h2 className="heading-display-sm text-primary mb-6">
                Send Us A Message
              </h2>

              <p className="font-body text-foreground/80 mb-8">
                Tell us about your travel goals and preferences. Our team will
                respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  type="text"
                  name="organization"
                  placeholder="Organization (Optional)"
                  className="w-full p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <textarea
                  name="message"
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

            {/* Business Hours */}
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

      <Footer />
    </main>
  );
};

export default Contact;
