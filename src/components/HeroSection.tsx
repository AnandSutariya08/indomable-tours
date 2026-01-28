import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuoteModal from "./QuoteModal";
import dummyVideoUrl from "../assets/videos/withouttext.mp4"

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071)",
          }}
        />

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/50 via-black/40 to-black/70" />
      </div>


      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center pt-24 md:pt-32 pb-12">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span
              className="inline-flex items-center px-6 py-2.5 
               bg-cream/20 backdrop-blur-sm 
               border border-cream/30 
               text-cream font-body text-sm tracking-wide"
              style={{
                clipPath:
                  "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
              }}
            >
              ✦ India Expertise. Canadian Standards.
            </span>
          </div>



          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-cream leading-tight"
          >
            Where Ancient Wonders Meet <span className="text-secondary">Timeless Luxury</span>
          </h1>

          {/* Subtitle */}
          <p
            className="body-display-lg text-cream/90 max-w-2xl mx-auto"
          >
            Embark on a journey through the heart of Asia's most captivating destinations.
            Curated experiences that transcend the ordinary.
          </p>

          {/* CTA Button */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button variant="hero" size="xl" onClick={() => setIsQuoteModalOpen(true)}>
              Start Your Journey With Us
            </Button>
            <Button variant="heroOutline" size="xl" onClick={() => setIsVideoOpen(true)}>
              Watch Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="w-[95vw] sm:max-w-4xl p-3 sm:p-0 bg-black overflow-hidden border-none">
          <DialogHeader className="sr-only">
            <DialogTitle>Our Story</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
            {isVideoOpen && (
              <video
                src={dummyVideoUrl}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
                webkit-playsinline="true"
              />
            )}
          </div>

        </DialogContent>
      </Dialog>

      {/* Existing Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </section>
  );
};

export default HeroSection;
