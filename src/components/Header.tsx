import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import QuoteModal from "./QuoteModal";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "Travel Info", href: "/travel-info" },
  { label: "Tours by City", href: "/tours-by-city" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "py-2 md:py-4" 
            : "py-4 md:py-8"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div 
            className={`flex items-center justify-between transition-all duration-500 mx-auto ${
              isScrolled 
                ? "bg-background/60 backdrop-blur-xl border border-white/10 rounded-full px-6 md:px-10 py-2 shadow-2xl max-w-6xl" 
                : "bg-transparent py-4 max-w-7xl"
            }`}
          >
            {/* Logo */}
            <a href="/" className="flex-shrink-0 transition-all duration-300 hover:scale-105 active:scale-95">
              <img 
                src={logo} 
                alt="Indomable Tours" 
                className={`transition-all duration-500 object-contain ${
                  isScrolled ? "h-10 md:h-12" : "h-14 md:h-24 lg:h-28"
                } w-auto`}
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-body font-semibold text-sm uppercase tracking-widest transition-all duration-300 relative group ${
                    isScrolled ? "text-foreground" : "text-white"
                  } hover:text-primary`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <Button 
                variant={isScrolled ? "hero" : "heroOutline"} 
                size={isScrolled ? "lg" : "xl"}
                onClick={() => setIsQuoteOpen(true)}
                className={`transition-all duration-500 font-bold tracking-tighter ${
                  !isScrolled && "border-2 px-8 py-6 text-lg hover:bg-white hover:text-black"
                }`}
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border animate-slide-up mt-2 mx-4 rounded-2xl overflow-hidden shadow-2xl">
            <nav className="px-4 py-6 flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground font-body font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button 
                variant="hero" 
                size="lg" 
                className="mt-4"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsQuoteOpen(true);
                }}
              >
                Get Quote
              </Button>
            </nav>
          </div>
        )}
      </header>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
};

export default Header;
