import { motion } from "framer-motion";
import { Mail, Phone, Clock, ArrowRight, Globe, Loader2 } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AnimatedSection, { staggerContainer, fadeInUp } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { saveInquiry, sendEmailNotification } from "@/services/inquiryService";
import { toast } from "sonner";
import PhoneInput, { EmailInput, validateEmail, type PhoneValue } from "@/components/PhoneInput";

const defaultPhone: PhoneValue = { countryCode: "+91", number: "", isValid: false, full: "" };

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState<PhoneValue>(defaultPhone);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    category: "Individual",
    companyName: "",
    fullName: "",
    email: "",
    destination: "India",
    message: "",
  });

  const validate = () => {
    let ok = true;

    const emailCheck = validateEmail(formData.email);
    if (!emailCheck.valid) {
      setEmailError(emailCheck.message || "Enter a valid email");
      ok = false;
    } else {
      setEmailError("");
    }

    if (phone.number && !phone.isValid) {
      setPhoneError("Phone number must be exactly 10 digits");
      ok = false;
    } else {
      setPhoneError("");
    }

    return ok;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!formData.fullName) {
      toast.error("Full name is required.");
      return;
    }

    if (!validate()) return;

    setLoading(true);

    const result = await saveInquiry({
      ...formData,
      phone: phone.full || phone.number,
      travelDates: "",
      travelTime: "",
    });

    if (result.success) {
      sendEmailNotification({
        ...formData,
        phone: phone.full || phone.number,
        travelDates: "",
        travelTime: "",
      }, "inquiry");
      toast.success("Message sent successfully! We'll contact you soon.");
      setFormData({
        category: "Individual",
        companyName: "",
        fullName: "",
        email: "",
        destination: "India",
        message: "",
      });
      setPhone(defaultPhone);
      setSubmitted(false);
    } else {
      toast.error("Failed to send message. Please try again.");
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

      <PageHeader
        badge="Get In Touch"
        title="Contact IndoMaple Tours"
        subtitle="Let's design your extraordinary journey together."
        backgroundImage="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/10/09/ad/db/f8/v1_E10/E101PEHK.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=5291f4f1608c9acdabeba55eb516fb4b1563d3a780f1245ac070631e05983eec"
      />

      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20">

            {/* ── Left: Form ── */}
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
                      Tell us about your travel goals and preferences. Our dedicated team will
                      respond within 24 hours to help craft your perfect journey.
                    </p>
                  </motion.div>
                </div>

                <motion.form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5 md:space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="c-category">You are</Label>
                    <select
                      id="c-category"
                      className="flex h-12 w-full rounded-xl border-2 border-border bg-background px-4 py-2 text-base font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Travel Agent">Travel Agent</option>
                      <option value="Education Institute">Education Institute</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Individual">Individual</option>
                    </select>
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="c-company">Company Name</Label>
                    <Input
                      id="c-company"
                      className="h-12 rounded-xl border-2 border-border px-4 font-body text-base"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="c-name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="c-name"
                      required
                      className={`h-12 rounded-xl border-2 px-4 font-body text-base transition-all
                        ${submitted && !formData.fullName
                          ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                        }`}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    {submitted && !formData.fullName && (
                      <p className="text-xs text-red-500 font-body flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400 mt-px" />
                        Full name is required
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="c-email">
                      Email ID <span className="text-red-500">*</span>
                    </Label>
                    <EmailInput
                      id="c-email"
                      required
                      value={formData.email}
                      onChange={(v) => { setFormData({ ...formData, email: v }); setEmailError(""); }}
                    />
                    {emailError && (
                      <p className="text-xs text-red-500 font-body flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400 mt-px" />
                        {emailError}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label>Phone No</Label>
                    <PhoneInput
                      value={phone}
                      onChange={(v) => { setPhone(v); setPhoneError(""); }}
                      error={phoneError}
                      inputClassName="border-2"
                    />
                  </div>

                  {/* Destination */}
                  <div className="space-y-2">
                    <Label htmlFor="c-dest">Destination</Label>
                    <select
                      id="c-dest"
                      className="flex h-12 w-full rounded-xl border-2 border-border bg-background px-4 py-2 text-base font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    >
                      <option value="India">India</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Bhutan">Bhutan</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="c-msg">
                        Your Message <span className="text-red-500">*</span>
                      </Label>
                      <span className="text-xs text-muted-foreground tabular-nums">{formData.message.length}/200</span>
                    </div>
                    <Textarea
                      id="c-msg"
                      required
                      rows={6}
                      maxLength={200}
                      className="rounded-xl border-2 border-border px-4 py-3 font-body text-base resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                        <Loader2 className="w-5 h-5 animate-spin" />
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
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </motion.form>
              </div>
            </AnimatedSection>

            {/* ── Right: Contact Cards ── */}
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
                    Whether you're a travel agency, university, corporate partner, or individual
                    traveler — we're here to help.
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
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
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
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-300 shrink-0 group-hover:scale-110">
                            <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading text-lg md:text-xl text-primary mb-1 group-hover:text-secondary transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-sm md:text-base text-foreground/60 mb-2 md:mb-3">{item.subtitle}</p>
                            <p className="font-body text-base md:text-lg text-foreground font-medium group-hover:text-secondary transition-colors break-all">
                              {item.value}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-primary/40 group-hover:text-secondary group-hover:translate-x-1 transition-all duration-300 shrink-0 hidden sm:block" />
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-8 md:mt-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border border-primary/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg md:text-xl text-primary mb-2">Global Support</h4>
                      <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed">
                        With offices in Canada and India, we provide 24/7 support across time zones
                        to ensure your journey is seamless from planning to execution.
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