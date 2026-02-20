import { motion } from "framer-motion";
import { Plane, FileText, Shield, CreditCard, Stethoscope, Clock, Phone, Mail, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, { staggerContainer, fadeInUp } from "@/components/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useTravelEssentials, useFaqs } from "@/hooks/useFirestoreData";

import kerala from "@/assets/destinations/kerala.jpg";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Stethoscope,
  Shield,
  CreditCard,
  Clock,
  Plane,
};

const TravelInfo = () => {
  const { data: essentials, loading: essentialsLoading } = useTravelEssentials();
  const { data: faqs, loading: faqsLoading } = useFaqs();

  const loading = essentialsLoading || faqsLoading;

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PageHeader
        badge="Travel Essentials"
        title="Travel Information"
        subtitle="Everything you need to know to prepare for your extraordinary journey through Asia."
        backgroundImage={kerala}
      />

      {/* Essentials Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="heading-display-sm text-primary mb-4">
                Before You Go
              </h2>
              <p className="body-display-md text-foreground max-w-2xl mx-auto">
                Essential information to help you prepare for a seamless journey.
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {essentials.map((item, index) => {
                const IconComponent = iconMap[item.icon] || FileText;
                return (
                  <motion.div
                    key={item.id}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-card p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl text-primary mb-3">{item.title}</h3>
                    <p className="font-body text-foreground/80 mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.details.map((detail) => (
                        <li key={detail} className="font-body text-sm text-foreground/70 flex items-start gap-2">
                          <span className="text-secondary mt-1">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="heading-display-sm text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <p className="body-display-md text-foreground max-w-2xl mx-auto">
                Find answers to common questions about traveling with Indomaple Tours.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AccordionItem value={`item-${index}`} className="bg-card rounded-xl px-6 border-none shadow-sm">
                      <AccordionTrigger className="font-heading text-lg text-primary hover:text-accent hover:no-underline py-6">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="font-body text-foreground/80 pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <AnimatedSection>
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-display-sm text-primary-foreground mb-6">
                  Still Have Questions?
                </h2>
                <p className="body-display-md text-primary-foreground/80 mb-8">
                  Our travel experts are here to help. Reach out and we'll get back to you within 24 hours.
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-4 text-primary-foreground hover:text-secondary transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-body text-sm text-primary-foreground/60">Call Us</p>
                      <p className="font-heading text-lg">+1 (234) 567-890</p>
                    </div>
                  </a>
                  <a
                    href="mailto:hello@indomapletours.ca"
                    className="flex items-center gap-4 text-primary-foreground hover:text-secondary transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-body text-sm text-primary-foreground/60">Email Us</p>
                      <p className="font-heading text-lg">hello@indomapletours.ca</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <Button variant="gold" size="xl" className="w-full lg:w-auto">
                  Send Us a Message
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </main>
  );
};

export default TravelInfo;
