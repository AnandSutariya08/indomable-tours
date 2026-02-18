import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { saveInquiry, sendEmailNotification } from "@/services/inquiryService";
import { toast } from "sonner";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  showDateTime?: boolean;
}

const QuoteModal = ({ isOpen, onClose, showDateTime = false }: QuoteModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category: "Individual",
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
    destination: "India",
    travelDates: "",
    travelTime: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast.error("Name and Email are mandatory.");
      return;
    }

    setIsSubmitting(true);

    const result = await saveInquiry(formData);

    if (result.success) {
      // Send email notification
      sendEmailNotification(formData, 'inquiry');
      
      toast.success("Inquiry sent successfully! We'll contact you soon.");
      setFormData({
        category: "Individual",
        companyName: "",
        fullName: "",
        email: "",
        phone: "",
        destination: "India",
        travelDates: "",
        travelTime: "",
        message: "",
      });
      onClose();
    } else {
      toast.error("Failed to send inquiry. Please try again.");
    }

    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">

        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <h2 className="font-heading text-2xl md:text-3xl text-primary">
            Partner with us
          </h2>
          <p className="text-foreground/80 font-body mt-2">
            Tell us about your requirements and we’ll curate a tailored solution.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          <div className="space-y-2">
            <Label htmlFor="category">You are</Label>
            <select
              id="category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Travel Agent">Travel Agent</option>
              <option value="Education Institute">Education Institute</option>
              <option value="Corporate">Corporate</option>
              <option value="Individual">Individual</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Name *</Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email ID *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone No</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <select
              id="destination"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

          {showDateTime && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="travelDates">Dates</Label>
                <Input
                  id="travelDates"
                  type="date"
                  value={formData.travelDates}
                  onChange={(e) =>
                    setFormData({ ...formData, travelDates: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelTime">Time</Label>
                <Input
                  id="travelTime"
                  type="time"
                  value={formData.travelTime}
                  onChange={(e) =>
                    setFormData({ ...formData, travelTime: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="message">Message</Label>
              <span className="text-xs text-muted-foreground">{formData.message.length}/200</span>
            </div>
            <Textarea
              id="message"
              rows={4}
              maxLength={200}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="resize-none"
            />
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border p-6">
          <Button
            type="submit"
            variant="hero"
            size="xl"
            className="w-full"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
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
