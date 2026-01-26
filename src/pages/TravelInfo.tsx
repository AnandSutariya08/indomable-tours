import { motion } from "framer-motion";
import { Plane, FileText, Shield, CreditCard, Stethoscope, Clock, Phone, Mail, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, { staggerContainer, fadeInUp } from "@/components/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import kerala from "@/assets/destinations/kerala.jpg";

const essentials = [
  {
    icon: FileText,
    title: "Visa Requirements",
    description: "Most nationalities require a visa for India, Nepal, Bhutan, and Sri Lanka. We assist with the entire visa application process.",
    details: [
      "India: e-Visa available for 150+ countries",
      "Nepal: Visa on arrival for most nationalities",
      "Bhutan: Visa arranged through licensed tour operator (us!)",
      "Sri Lanka: ETA required before travel",
    ],
  },
  {
    icon: Stethoscope,
    title: "Health & Vaccinations",
    description: "Consult your doctor 6-8 weeks before travel. Some vaccinations may be recommended based on your itinerary.",
    details: [
      "Routine vaccinations should be up to date",
      "Hepatitis A & Typhoid recommended",
      "Malaria prophylaxis for certain regions",
      "Altitude sickness prevention for Himalayan trips",
    ],
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    description: "Comprehensive travel insurance is mandatory for all our tours. We can recommend trusted providers.",
    details: [
      "Medical coverage minimum $100,000",
      "Emergency evacuation coverage",
      "Trip cancellation protection",
      "Adventure activities coverage if applicable",
    ],
  },
  {
    icon: CreditCard,
    title: "Currency & Payments",
    description: "Each country has its own currency. We recommend carrying a mix of cash and cards.",
    details: [
      "India: Indian Rupee (INR)",
      "Nepal: Nepalese Rupee (NPR)",
      "Bhutan: Bhutanese Ngultrum (BTN) / Indian Rupee",
      "Sri Lanka: Sri Lankan Rupee (LKR)",
    ],
  },
  {
    icon: Clock,
    title: "Best Time to Visit",
    description: "Timing varies by destination. We'll help you choose the perfect season for your interests.",
    details: [
      "North India: Oct-Mar (avoid summer heat)",
      "South India: Year-round, monsoon Jun-Sep",
      "Nepal trekking: Oct-Nov, Mar-May",
      "Bhutan festivals: Various dates",
    ],
  },
  {
    icon: Plane,
    title: "Getting There",
    description: "Major international airports serve all our destinations. We can arrange flights or work with your preferred booking.",
    details: [
      "Delhi, Mumbai: Main India gateways",
      "Kathmandu: Nepal's international hub",
      "Paro: Bhutan's only international airport",
      "Colombo: Sri Lanka's main airport",
    ],
  },
];

const faqs = [
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking 3-6 months in advance, especially for peak season travel (October-March) or if you want specific accommodations. Last-minute bookings are possible but may have limited availability.",
  },
  {
    question: "What is included in your tour packages?",
    answer: "Our tours typically include accommodation, meals as specified, private transportation, English-speaking guides, entrance fees, and listed activities. International flights, visa fees, travel insurance, and personal expenses are usually not included.",
  },
  {
    question: "Can you accommodate dietary restrictions?",
    answer: "Absolutely! Please inform us of any dietary requirements when booking. Vegetarian, vegan, gluten-free, and other special diets can be accommodated with advance notice.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Our standard policy offers full refund minus processing fees if cancelled 60+ days before departure. 30-59 days: 50% refund. Less than 30 days: No refund. We strongly recommend travel insurance.",
  },
  {
    question: "Are your tours suitable for solo travelers?",
    answer: "Yes! Many of our guests travel solo. We offer small group departures where you can join other travelers, or fully private tours at an additional cost. Solo travel is safe and rewarding in our destinations.",
  },
  {
    question: "How do you ensure sustainable tourism?",
    answer: "We partner with locally-owned hotels and restaurants, employ local guides, support community projects, minimize plastic usage, and contribute to wildlife conservation. We're committed to leaving a positive impact.",
  },
  {
    question: "What about safety and security?",
    answer: "Your safety is our priority. We monitor travel advisories, work with trusted local partners, provide 24/7 emergency support, and have comprehensive safety protocols. Our guides are trained in first aid.",
  },
  {
    question: "Can I customize a tour?",
    answer: "Absolutely! Most travelers choose to customize their experience. Our travel experts will work with you to create a bespoke itinerary matching your interests, pace, and budget.",
  },
];

const TravelInfo = () => {
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

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {essentials.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-card p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-primary" />
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
            ))}
          </motion.div>
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
                Find answers to common questions about traveling with Indomable Tours.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
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
                    href="mailto:hello@indomabletours.com"
                    className="flex items-center gap-4 text-primary-foreground hover:text-secondary transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-body text-sm text-primary-foreground/60">Email Us</p>
                      <p className="font-heading text-lg">hello@indomabletours.com</p>
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
