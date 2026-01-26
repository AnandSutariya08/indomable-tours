import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { saveInquiry } from "@/services/inquiryService";
import { toast } from "sonner";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    travelDates: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await saveInquiry(formData);
    
    if (result.success) {
      toast.success("Inquiry sent successfully! We'll contact you soon.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        destination: "",
        travelDates: "",
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
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b border-border">
          <h2 className="font-heading text-2xl md:text-3xl text-primary">
            Get Your Custom Quote
          </h2>
          <p className="text-foreground/80 font-body mt-2">
            Tell us about your dream journey and we'll craft the perfect itinerary.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-foreground font-body font-medium">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="bg-muted border-border focus:border-primary"
              placeholder="Your full name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-body font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-muted border-border focus:border-primary"
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-body font-medium">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-muted border-border focus:border-primary"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination" className="text-foreground font-body font-medium">
              Preferred Destination
            </Label>
            <Input
              id="destination"
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="bg-muted border-border focus:border-primary"
              placeholder="e.g., India, Nepal, Bhutan"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelDates" className="text-foreground font-body font-medium">
              Travel Dates
            </Label>
            <Input
              id="travelDates"
              type="text"
              value={formData.travelDates}
              onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
              className="bg-muted border-border focus:border-primary"
              placeholder="e.g., March 2024 (flexible)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground font-body font-medium">
              Message
            </Label>
            <Textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-muted border-border focus:border-primary resize-none"
              placeholder="Tell us about your dream trip..."
            />
          </div>

          <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Request Quote"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;
