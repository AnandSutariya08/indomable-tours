import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import luxuryHero from "@/assets/luxury-hero.jpg";
import kerala from "@/assets/destinations/kerala.jpg";
import tajMahal from "@/assets/destinations/taj-mahal.jpg";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const LuxuryHero = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const playVideo = (url: string) => {
    setVideoUrl(url);
  };

  const dummyVideoUrl = "https://player.vimeo.com/external/370467553.hd.mp4?s=ce49c8c6d8e28a89298ffb4c53a2e842bdb11546&profile_id=175";

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
                Where every sunrise brings new wonders and every sunset whispers ancient tales. 
                Our journeys are not just trips—they're transformations.
              </p>
              <p className="body-display-sm text-foreground/80">
                From private palace stays to helicopter journeys over the Himalayas, 
                we curate experiences that money can't simply buy—only create through 
                years of relationships and deep cultural understanding.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <span className="font-heading text-4xl md:text-5xl text-accent">15+</span>
                <p className="font-body text-foreground text-sm mt-1">Years Experience</p>
              </div>
              <div>
                <span className="font-heading text-4xl md:text-5xl text-accent">5K+</span>
                <p className="font-body text-foreground text-sm mt-1">Happy Travelers</p>
              </div>
              <div>
                <span className="font-heading text-4xl md:text-5xl text-accent">200+</span>
                <p className="font-body text-foreground text-sm mt-1">Curated Experiences</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="gold" 
                size="xl"
                onClick={() => window.location.href = "tel:+14165550199"}
              >
                Speak to an Expert
              </Button>
            </div>
          </div>

          {/* Right - Image Section */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => playVideo(dummyVideoUrl)}>
              <img
                src={luxuryHero}
                alt="Luxury travel experience"
                className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-cream/90 flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                  <Play size={32} className="text-primary ml-1" />
                </div>
              </div>
            </div>

            {/* Floating Video Cards */}
            <div 
              className="absolute -bottom-8 -left-8 w-36 h-48 md:w-44 md:h-56 rounded-xl overflow-hidden shadow-xl border-4 border-background group cursor-pointer z-20"
              onClick={(e) => {
                e.stopPropagation();
                playVideo(dummyVideoUrl);
              }}
            >
              <img
                src={kerala}
                alt="Kerala backwaters"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-cream/90 flex items-center justify-center">
                  <Play size={20} className="text-primary ml-1" />
                </div>
              </div>
            </div>

            <div 
              className="absolute -top-6 -right-6 w-32 h-40 md:w-40 md:h-48 rounded-xl overflow-hidden shadow-xl border-4 border-background group cursor-pointer z-20"
              onClick={(e) => {
                e.stopPropagation();
                playVideo(dummyVideoUrl);
              }}
            >
              <img
                src={tajMahal}
                alt="Taj Mahal"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-cream/90 flex items-center justify-center">
                  <Play size={16} className="text-primary ml-0.5" />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-12 w-24 h-24 bg-secondary/30 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!videoUrl} onOpenChange={(open) => !open && setVideoUrl(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black overflow-hidden border-none">
          <div className="relative aspect-video">
            {videoUrl && (
              <video
                src={videoUrl}
                autoPlay
                controls
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default LuxuryHero;
