import { useState } from "react";

import tajMahal from "@/assets/destinations/taj-mahal.jpg";
import nepal from "@/assets/destinations/nepal.jpg";
import bhutan from "@/assets/destinations/bhutan.jpg";
import srilanka from "@/assets/destinations/srilanka.jpg";

const countries = [
  {
    id: "india",
    name: "India",
    landmark: "Taj Mahal",
    image: tajMahal,
    description: "From the majestic Himalayas to tropical beaches, experience the soul of a nation steeped in ancient wisdom and vibrant culture.",
  },
  {
    id: "nepal",
    name: "Nepal",
    landmark: "Himalayas",
    image: nepal,
    description: "Home to the world's highest peaks, discover temples, trekking trails, and the warm hospitality of mountain communities.",
  },
  {
    id: "bhutan",
    name: "Bhutan",
    landmark: "Tiger's Nest",
    image: bhutan,
    description: "The last Shangri-La, where Gross National Happiness matters most and monasteries cling to impossible cliffs.",
  },
  {
    id: "srilanka",
    name: "Sri Lanka",
    landmark: "Sigiriya Rock",
    image: srilanka,
    description: "Ancient ruins, pristine beaches, and lush tea plantations await on this teardrop island paradise.",
  },
];

const ExploreDestinations = () => {
  const [activeCountry, setActiveCountry] = useState(countries[0]);

  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="heading-display-md text-primary mb-4">
            Explore Destinations
          </h2>
          <p className="body-display-md text-foreground max-w-2xl mx-auto">
            Select a country to discover its most iconic landmarks and hidden treasures.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Country List */}
          <div className="space-y-4">
            {countries.map((country) => (
              <button
                key={country.id}
                onClick={() => setActiveCountry(country)}
                className={`w-full text-left p-6 rounded-xl transition-all duration-500 group ${
                  activeCountry.id === country.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background hover:bg-background/80 text-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-heading text-2xl md:text-3xl mb-1 ${
                      activeCountry.id === country.id ? "text-primary-foreground" : "text-primary"
                    }`}>
                      {country.name}
                    </h3>
                    <p className={`font-body text-sm ${
                      activeCountry.id === country.id ? "text-primary-foreground/80" : "text-foreground/70"
                    }`}>
                      Featured: {country.landmark}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    activeCountry.id === country.id 
                      ? "bg-primary-foreground/20" 
                      : "bg-secondary/20 group-hover:bg-secondary/40"
                  }`}>
                    <span className="text-2xl">→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right - Large Image */}
          <div className="relative">
            <div className="relative h-[400px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={activeCountry.image}
                alt={activeCountry.landmark}
                className="w-full h-full object-cover transition-all duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-body text-sm mb-4">
                  {activeCountry.name}
                </span>
                <h3 className="font-heading text-3xl md:text-4xl text-cream mb-3">
                  {activeCountry.landmark}
                </h3>
                <p className="font-body text-cream/90 leading-relaxed max-w-lg">
                  {activeCountry.description}
                </p>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreDestinations;
