import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import QuoteModal from "./QuoteModal";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? "py-3" 
            : "py-2 md:py-3"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div 
            className={`flex items-center justify-between transition-all duration-500 mx-auto w-full ${
              isScrolled 
                ? "bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 md:px-12 py-3 shadow-2xl max-w-7xl" 
                : "bg-transparent py-1.5 max-w-full lg:px-2"
            }`}
          >
            <div className="flex items-center w-full relative h-12 md:h-14 lg:h-16 px-4 md:px-6">
              {/* Logo - Positioned left */}
              <div className="flex-1 flex justify-start items-center">
                <a href="/" className="transition-all duration-300 hover:scale-105 active:scale-95">
                  <img 
                    src={logo} 
                    alt="Indomable Tours" 
                    className={`transition-all duration-500 object-contain ${
                      isScrolled ? "h-5 md:h-6" : "h-6 md:h-7 lg:h-8"
                    } w-auto`}
                  />
                </a>
              </div>

              {/* Desktop Navigation - Absolute Centered in Header */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <nav className="flex items-center justify-center space-x-6 xl:space-x-8">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`font-body uppercase tracking-[0.2em] transition-all duration-300 relative group whitespace-nowrap ${
                        isScrolled 
                          ? "text-secondary hover:text-brand-blue text-[11px] xl:text-[12px] font-black" 
                          : "text-white hover:text-secondary text-[10px] xl:text-[11px] font-bold"
                      }`}
                    >
                      {item.label}
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        isScrolled ? "bg-brand-blue" : "bg-secondary"
                      }`} />
                    </a>
                  ))}
                </nav>
              </div>

              {/* CTA Button & Mobile Toggle - Positioned right */}
              <div className="flex-1 flex items-center justify-end">
                {/* CTA Button - Hidden on mobile */}
                <div className="hidden lg:flex items-center">
                  <Button 
                    variant="gold" 
                    size={isScrolled ? "sm" : "lg"}
                    onClick={() => setIsQuoteOpen(true)}
                    className={`transition-all duration-500 font-black tracking-widest uppercase rounded-full ${
                      !isScrolled 
                        ? "px-5 py-3 shadow-xl text-[10px]" 
                        : "bg-brand-blue text-white hover:bg-brand-blue/90 px-4 py-1.5 text-[9px]"
                    }`}
                  >
                    Get Quote
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden p-2 transition-colors text-white ml-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Dropdown with glass effect */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden fixed top-0 left-0 right-0 z-[90] pt-24 pb-8 px-6 bg-primary/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          >
            <nav className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="text-white/90 font-body font-bold text-base uppercase tracking-widest py-3 border-b border-white/5 hover:text-secondary transition-colors flex items-center justify-between group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </nav>

            <div className="mt-8">
              <Button 
                variant="gold" 
                className="w-full text-white font-black tracking-widest uppercase py-6 rounded-full shadow-lg"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsQuoteOpen(true);
                }}
              >
                Get Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
};

export default Header;
