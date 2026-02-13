import { motion } from "framer-motion";
import { Mail, Phone, Clock, ArrowRight, MapPin, Globe } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, {
  staggerContainer,
  fadeInUp,
} from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";

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
      title: "Canada Office",
      subtitle: "Sales & Partnerships",
      value: "+1 782 899 2178",
      link: "tel:+17828992178",
      gradient: "from-primary/10 to-primary/5",
    },
    {
      icon: Phone,
      title: "India Office",
      subtitle: "Operations & Support",
      value: "+91 999 904 2178",
      link: "tel:+919999042178",
      gradient: "from-secondary/10 to-secondary/5",
    },
    {
      icon: Mail,
      title: "Email Us",
      subtitle: "Quick Response Guaranteed",
      value: "gagan.makkar@indomapletours.ca",
      link: "mailto:gagan.makkar@indomapletours.ca",
      gradient: "from-primary/10 to-secondary/10",
    },
    {
      icon: Clock,
      title: "Response Time",
      subtitle: "We're Here for You",
      value: "Within 24 Hours",
      link: "#",
      gradient: "from-secondary/10 to-primary/5",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <PageHeader
        badge="Get In Touch"
        title="Contact IndoMaple Tours"
        subtitle="Let's design your extraordinary journey together."
        backgroundImage={
          "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/10/09/ad/db/f8/v1_E10/E101PEHK.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=5291f4f1608c9acdabeba55eb516fb4b1563d3a780f1245ac070631e05983eec"
        }
      />

      {/* Main Contact Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20">
            {/* Left Side - Contact Form */}
            <AnimatedSection>
              <div className="lg:sticky lg:top-8">
                <div className="mb-8 md:mb-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-primary mb-4 md:mb-6">
                      Send Us A Message
                    </h2>
                    <p className="text-base md:text-lg font-body text-foreground/70 leading-relaxed">
                      Tell us about your travel goals and preferences. Our
                      dedicated team will respond within 24 hours to help craft
                      your perfect journey.
                    </p>
                  </motion.div>
                </div>

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5 md:space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground/80 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3.5 md:py-4 rounded-xl border-2 border-border bg-background 
                               focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 
                               transition-all duration-300 font-body text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground/80 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3.5 md:py-4 rounded-xl border-2 border-border bg-background 
                               focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 
                               transition-all duration-300 font-body text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-sm font-medium text-foreground/80 mb-2"
                    >
                      Organization
                      <span className="text-foreground/50 ml-1">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      placeholder="Your Company or University"
                      className="w-full px-4 py-3.5 md:py-4 rounded-xl border-2 border-border bg-background 
                               focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 
                               transition-all duration-300 font-body text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground/80 mb-2"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your travel plans, group size, preferred dates, or any special requirements..."
                      rows={6}
                      required
                      className="w-full px-4 py-3.5 md:py-4 rounded-xl border-2 border-border bg-background 
                               focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 
                               transition-all duration-300 font-body text-base resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="group w-full py-4 md:py-5 text-base md:text-lg font-semibold"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-foreground/60 text-center font-body">
                    By submitting this form, you agree to our privacy policy and
                    terms of service.
                  </p>
                </motion.form>
              </div>
            </AnimatedSection>

            {/* Right Side - Contact Cards Stack */}
            <AnimatedSection delay={0.3}>
              <div className="space-y-5 md:space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-8 lg:mb-10"
                >
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading text-primary mb-3 md:mb-4">
                    Connect With Us
                  </h3>
                  <p className="text-base md:text-lg font-body text-foreground/70">
                    Whether you're a travel agency, university, corporate
                    partner, or individual traveler — we're here to help.
                  </p>
                </motion.div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-5 md:space-y-6"
                >
                  {contactDetails.map((item, index) => (
                    <motion.div
                      key={item.title}
                      variants={fadeInUp}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      className="group"
                    >
                      <a
                        href={item.link}
                        className={`block bg-gradient-to-br ${item.gradient} backdrop-blur-sm 
                                 p-6 md:p-8 rounded-2xl border border-border/50 
                                 hover:border-primary/30 hover:shadow-xl 
                                 transition-all duration-300 cursor-pointer`}
                      >
                        <div className="flex items-start gap-4 md:gap-5">
                          <div
                            className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 
                                      group-hover:bg-primary/20 flex items-center justify-center 
                                      transition-all duration-300 shrink-0 
                                      group-hover:scale-110"
                          >
                            <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading text-lg md:text-xl text-primary mb-1 
                                         group-hover:text-secondary transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-sm md:text-base text-foreground/60 mb-2 md:mb-3">
                              {item.subtitle}
                            </p>
                            <p className="font-body text-base md:text-lg text-foreground 
                                        font-medium group-hover:text-secondary 
                                        transition-colors break-all">
                              {item.value}
                            </p>
                          </div>

                          <ArrowRight
                            className="w-5 h-5 text-primary/40 group-hover:text-secondary 
                                     group-hover:translate-x-1 transition-all duration-300 
                                     shrink-0 hidden sm:block"
                          />
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Additional Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-8 md:mt-10 p-6 md:p-8 rounded-2xl 
                           bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 
                           border border-primary/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center 
                                  justify-center shrink-0">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg md:text-xl text-primary mb-2">
                        Global Support
                      </h4>
                      <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed">
                        With offices in Canada and India, we provide 24/7 support
                        across time zones to ensure your journey is seamless from
                        planning to execution.
                      </p>
                    </div>
                  </div>
                </motion.div>
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