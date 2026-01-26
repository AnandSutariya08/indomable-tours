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
            ? "py-2 md:py-3" 
            : "py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div 
            className={`flex items-center justify-between transition-all duration-500 mx-auto w-full ${
              isScrolled 
                ? "bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 md:px-10 py-2 shadow-2xl max-w-6xl mt-2" 
                : "bg-transparent py-2 max-w-full"
            }`}
          >
            {/* Logo */}
            <a href="/" className="flex-shrink-0 transition-all duration-300 hover:scale-105 active:scale-95">
              <img 
                src={logo} 
                alt="Indomable Tours" 
                className={`transition-all duration-500 object-contain brightness-0 invert ${
                  isScrolled ? "h-10 md:h-12" : "h-14 md:h-16 lg:h-20"
                } w-auto`}
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-body font-bold text-[13px] uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                    isScrolled ? "text-white" : "text-white"
                  } hover:text-secondary`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* CTA Button & Mobile Toggle Container */}
            <div className="flex items-center space-x-4">
              {/* CTA Button - Hidden on mobile, shown in sidebar */}
              <div className="hidden lg:flex items-center">
                <Button 
                  variant={isScrolled ? "hero" : "heroOutline"} 
                  size={isScrolled ? "lg" : "xl"}
                  onClick={() => setIsQuoteOpen(true)}
                  className={`transition-all duration-500 font-bold tracking-widest uppercase text-xs ${
                    !isScrolled 
                      ? "border-2 px-8 py-6 text-sm bg-transparent border-white text-white hover:bg-white hover:text-black" 
                      : "rounded-full bg-secondary text-white hover:bg-secondary/90"
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
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-x-4 top-24 z-[60] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <nav className="px-6 py-10 flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white font-body font-bold text-lg uppercase tracking-widest py-3 border-b border-white/5 hover:text-secondary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="w-full bg-secondary text-white font-bold py-8 rounded-2xl text-lg shadow-xl"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsQuoteOpen(true);
                  }}
                >
                  Get Quote
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
};

export default Header;
