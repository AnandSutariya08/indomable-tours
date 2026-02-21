import { useEffect, useMemo, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { saveInquiry, sendEmailNotification } from "@/services/inquiryService";
import { toast } from "sonner";
import PhoneInput, { EmailInput, validateEmail, type PhoneValue } from "@/components/PhoneInput";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  showDateTime?: boolean;
}

const defaultPhone: PhoneValue = { countryCode: "+91", number: "", isValid: false, full: "" };

const QuoteModal = ({ isOpen, onClose, showDateTime = false }: QuoteModalProps) => {
  const { tours } = useSelector((state: RootState) => state.firebase);
  const destinationOptions = useMemo(() => {
    const countries = new Set<string>();
    tours.forEach((tour) => {
      if (typeof tour?.country === "string" && tour.country.trim().length > 0) {
        countries.add(tour.country.trim());
      }
    });
    const sorted = Array.from(countries).sort((a, b) => a.localeCompare(b));
    return sorted.length > 0 ? sorted : ["India", "Nepal", "Bhutan", "Sri Lanka"];
  }, [tours]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState<PhoneValue>(defaultPhone);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    category: "Individual",
    companyName: "",
    fullName: "",
    email: "",
    destination: destinationOptions[0],
    travelDates: "",
    travelTime: "",
    message: "",
  });

  useEffect(() => {
    if (!destinationOptions.includes(formData.destination) && formData.destination !== "Others") {
      setFormData((prev) => ({ ...prev, destination: destinationOptions[0] }));
    }
  }, [destinationOptions, formData.destination]);

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

    if (!formData.fullName) {
      toast.error("Full name is required.");
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    const result = await saveInquiry({
      ...formData,
      phone: phone.full || phone.number,
    });

    if (result.success) {
      sendEmailNotification({ ...formData, phone: phone.full || phone.number }, "inquiry");
      toast.success("Inquiry sent successfully! We'll contact you soon.");
      setFormData({
        category: "Individual",
        companyName: "",
        fullName: "",
        email: "",
        destination: destinationOptions[0],
        travelDates: "",
        travelTime: "",
        message: "",
      });
      setPhone(defaultPhone);
      onClose();
    } else {
      toast.error("Failed to send inquiry. Please try again.");
    }

    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 md:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg max-h-[92dvh] overflow-hidden rounded-2xl bg-[#F8F6F1] text-foreground shadow-2xl flex flex-col min-h-0"
        style={{ WebkitTransform: "translateZ(0)" }}
      >

        {/* Header */}
        <div className="bg-[#F8F6F1] border-b border-border p-6 pb-4 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-foreground/60 hover:text-primary hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          <h2 className="font-heading text-2xl md:text-3xl text-primary">Partner with us</h2>
          <p className="text-foreground/70 font-body mt-1.5 text-sm">
            Tell us your requirements and we'll curate a tailored solution.
          </p>
        </div>

        {/* Scrollable Content */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain px-6 py-5 space-y-5"
          style={{ WebkitOverflowScrolling: "touch" }}
        >

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="q-category">You are</Label>
            <select
              id="q-category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
            <Label htmlFor="q-company">Company Name</Label>
            <Input id="q-company" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="q-name">Name <span className="text-red-500">*</span></Label>
            <Input
              id="q-name"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={!formData.fullName && submitted ? "border-red-400" : ""}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="q-email">Email ID <span className="text-red-500">*</span></Label>
            <EmailInput
              id="q-email"
              required
              value={formData.email}
              onChange={(v) => { setFormData({ ...formData, email: v }); setEmailError(""); }}
            />
            {emailError && <p className="text-xs text-red-500 font-body">{emailError}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Phone No</Label>
            <PhoneInput
              value={phone}
              onChange={(v) => { setPhone(v); setPhoneError(""); }}
              error={phoneError}
            />
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="q-dest">Destination</Label>
            <select
              id="q-dest"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            >
              {destinationOptions.map((destination) => (
                <option key={destination} value={destination}>
                  {destination}
                </option>
              ))}
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Date / Time */}
          {showDateTime && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="q-dates">Dates</Label>
                <Input id="q-dates" type="date" value={formData.travelDates} onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="q-time">Time</Label>
                <Input id="q-time" type="time" value={formData.travelTime} onChange={(e) => setFormData({ ...formData, travelTime: e.target.value })} />
              </div>
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="q-msg">Message</Label>
              <span className="text-xs text-muted-foreground tabular-nums">{formData.message.length}/200</span>
            </div>
            <Textarea
              id="q-msg"
              rows={4}
              maxLength={200}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F8F6F1] border-t border-border p-6 shrink-0">
          <Button
            type="submit"
            variant="hero"
            size="xl"
            className="w-full !bg-primary !text-primary-foreground"
            disabled={isSubmitting}
            onClick={(e) => { setSubmitted(true); handleSubmit(e as any); }}
          >
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>
            ) : (
              "Partner with us"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
