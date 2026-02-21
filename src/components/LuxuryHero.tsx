import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import QuoteModal from "./QuoteModal";
import heroVideo from "../assets/videos/herovideo.mp4";

const LuxuryHero = () => {
  const video2 = heroVideo;
  const video3 = heroVideo;

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const playVideo = (url: string) => {
    setVideoUrl(url);
  };

  const openExpertModal = () => {
    setIsQuoteOpen(true);
  };

  return (
    <section className="py-20 md:py-28 bg-muted overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-body text-sm font-medium mb-6">
                Luxury Redefined
              </span>

              <h2 className="heading-display-md text-primary mb-6">
                Travel Beyond the Ordinary
              </h2>

              <p className="body-display-md text-foreground mb-4">
                Where every sunrise brings new wonders and every sunset whispers
                ancient tales. Our journeys are not just trips—they're
                transformations.
              </p>

              <p className="body-display-sm text-foreground/80">
                From private palace stays to helicopter journeys over the
                Himalayas, we curate experiences that money can't simply
                buy—only create through years of relationships and deep cultural
                understanding.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <span className="font-heading text-4xl md:text-5xl text-accent">
                  10+
                </span>
                <p className="font-body text-foreground text-sm mt-1">
                  Years Experience
                </p>
              </div>
              <div>
                <span className="font-heading text-4xl md:text-5xl text-accent">
                  5K+
                </span>
                <p className="font-body text-foreground text-sm mt-1">
                  Happy Travelers
                </p>
              </div>
              <div>
                <span className="font-heading text-4xl md:text-5xl text-accent">
                  200+
                </span>
                <p className="font-body text-foreground text-sm mt-1">
                  Curated Experiences
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gold" size="xl" onClick={openExpertModal}>
                Speak to an Expert
              </Button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative">
            {/* Main Image (NO VIDEO) */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/b8/51/35/3e/1f/v1_E10/E105V3J9.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=af0fb018f43cfe3ea05ccacc9c7bf696ae5b17a7dc76b5891f33595322c45714"
                alt="Luxury travel experience"
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
            </div>

            {/* Bottom Left Video Poster (BIGGER) */}
            <div
              className="absolute -bottom-10 -left-5 w-48 h-64 md:w-56 md:h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-background group cursor-pointer z-20"
              onClick={() => playVideo(video2)}
            >
              <img
                src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/bf/a3/22/0a/f1/v1_E10/E107AJNA.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=5a8ffdf0d4658bf870809367c9a4275d31258f02e598ca68e44c63ff2f5b8652"
                alt="Kerala backwaters"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <div className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center">
                  <Play size={24} className="text-primary ml-1" />
                </div>
              </div>
            </div>

            {/* Top Right Video Poster (BIGGER) */}
            <div
              className="absolute -top-10 -right-5 w-44 h-56 md:w-52 md:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-background group cursor-pointer z-20"
              onClick={() => playVideo(video3)}
            >
              <img
                src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/23/c4/b4/61/da/v1_E10/E1083AQT.jpg?w=1600&cf_fit=scale-down&q=85&format=auto&s=0b5bdd67dc6770b7d3122ab17e5b40a22f4fd7fd7f7c824ea473d552df07a1a7"
                alt="Taj Mahal"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <div className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center">
                  <Play size={24} className="text-primary ml-1" />
                </div>
              </div>
            </div>

            {/* Decorative Blur */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-12 w-24 h-24 bg-secondary/30 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog
        open={!!videoUrl}
        onOpenChange={(open) => !open && setVideoUrl(null)}
      >
        <DialogContent
          className="w-[95vw] sm:max-w-4xl p-3 sm:p-0 bg-black overflow-hidden border-none"
          style={{ zIndex: 9999 }}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Our Story</DialogTitle>
          </DialogHeader>

          <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
            {videoUrl && (
              <video
                src={videoUrl}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} showDateTime={true} />
    </section>
  );
};

export default LuxuryHero;
