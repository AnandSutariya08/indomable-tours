import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071"
        >
          <source 
            src="https://player.vimeo.com/external/370467553.hd.mp4?s=ce49c8c6d8e28a89298ffb4c53a2e842bdb11546&profile_id=175" 
            type="video/mp4" 
          />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-cream/20 backdrop-blur-sm border border-cream/30 text-cream font-body text-sm tracking-wide">
              ✦ India Expertise. Canadian Standards.
            </span>
          </div>

          {/* Heading */}
          <h1 
            className="heading-display-lg text-cream"
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
            <Button variant="hero" size="xl">
              Start Your Journey With Us
            </Button>
            <Button variant="heroOutline" size="xl">
              Watch Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-cream/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-cream/80 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
