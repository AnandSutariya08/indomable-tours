import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ExploreDestinations = () => {
  const { exploreDestinations: rawCountries, loading } = useSelector((state: RootState) => state.firebase);
  const [activeCountry, setActiveCountry] = useState<any>(null);

  // Custom order: India, Sri Lanka, Bhutan, Nepal
  const countries = [...rawCountries].sort((a: any, b: any) => {
    const order = ["India", "Sri Lanka", "Bhutan", "Nepal"];
    const indexA = order.indexOf(a.name);
    const indexB = order.indexOf(b.name);
    
    // If name not in order list, put it at the end
    const finalIndexA = indexA === -1 ? 99 : indexA;
    const finalIndexB = indexB === -1 ? 99 : indexB;
    
    return finalIndexA - finalIndexB;
  });

  useEffect(() => {
    if (!loading && countries.length > 0 && !activeCountry) {
      setActiveCountry(countries[0]);
    }
  }, [loading, countries, activeCountry]);

  // Image prefetching
  useEffect(() => {
    if (countries.length > 0) {
      countries.forEach((country: any) => {
        if (country.image) {
          const img = new Image();
          img.src = country.image;
        }
      });
    }
  }, [countries]);

  const currentCountry = activeCountry || countries[0];

  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="heading-display-md text-primary mb-4">Explore Destinations</h2>
          <p className="body-display-md text-foreground max-w-2xl mx-auto">
            Select a country to discover its most iconic landmarks and hidden treasures.
          </p>
        </div>

        {loading && countries.length === 0 ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-4">
              {countries.map((country: any) => (
                <button
                  key={country.id}
                  onClick={() => setActiveCountry(country)}
                  className={`w-full text-left p-6 rounded-xl transition-all duration-500 group ${
                    currentCountry?.id === country.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-background hover:bg-background/80 text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-heading text-2xl md:text-3xl mb-1 ${currentCountry?.id === country.id ? "text-primary-foreground" : "text-primary"}`}>
                        {country.name}
                      </h3>
                      <p className={`font-body text-sm ${currentCountry?.id === country.id ? "text-primary-foreground/80" : "text-foreground/70"}`}>
                        Featured: {country.landmark}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${currentCountry?.id === country.id ? "bg-primary-foreground/20" : "bg-secondary/20 group-hover:bg-secondary/40"}`}>
                      <span className="text-2xl">→</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {currentCountry && (
              <div className="relative">
                <div className="relative h-[400px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl bg-muted">
                  <img 
                    src={currentCountry.image} 
                    alt={currentCountry.landmark} 
                    className="w-full h-full object-cover transition-all duration-700" 
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-body text-sm mb-4">{currentCountry.name}</span>
                    <h3 className="font-heading text-3xl md:text-4xl text-cream mb-3">{currentCountry.landmark}</h3>
                    <p className="font-body text-cream/90 leading-relaxed max-w-lg">{currentCountry.description}</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreDestinations;
