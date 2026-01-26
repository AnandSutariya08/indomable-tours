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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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
            {/* Logo */}
            <div className="flex-1 flex justify-start lg:w-1/4">
              <a href="/" className="transition-all duration-300 hover:scale-105 active:scale-95">
                <img 
                  src={logo} 
                  alt="Indomable Tours" 
                  className={`transition-all duration-500 object-contain ${
                    isScrolled ? "h-6 md:h-8" : "h-6 md:h-8 lg:h-10"
                  } w-auto`}
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 space-x-6 xl:space-x-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-body uppercase tracking-[0.25em] transition-all duration-300 relative group whitespace-nowrap ${
                    isScrolled 
                      ? "text-secondary hover:text-brand-blue text-[12px] xl:text-[13px] font-black" 
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

            {/* CTA Button & Mobile Toggle Container */}
            <div className="flex-1 flex items-center justify-end lg:w-1/4 space-x-4">
              {/* CTA Button - Hidden on mobile, shown in sidebar */}
              <div className="hidden lg:flex items-center">
                <Button 
                  variant="gold" 
                  size={isScrolled ? "lg" : "lg"}
                  onClick={() => setIsQuoteOpen(true)}
                  className={`transition-all duration-500 font-black tracking-widest uppercase rounded-full ${
                    !isScrolled 
                      ? "px-5 py-3 shadow-xl text-[10px]" 
                      : "bg-brand-blue text-white hover:bg-brand-blue/90 px-8 py-4 text-[12px]"
                  }`}
                >
                  Get Quote
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 transition-colors text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="lg:hidden fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
              />
              
              {/* Sidebar */}
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] z-[60] bg-black/95 backdrop-blur-2xl border-l border-white/10 flex flex-col shadow-2xl"
              >
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
                  <img src={logo} alt="Indomable Tours" className="h-10 w-auto object-contain" />
                  <button
                    className="p-2 text-white hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X size={28} />
                  </button>
                </div>

                <nav className="flex-1 px-6 py-8 overflow-y-auto">
                  <div className="flex flex-col space-y-2">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="text-white font-body font-bold text-lg uppercase tracking-widest py-4 border-b border-white/5 hover:text-secondary transition-colors flex items-center justify-between group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                        <span className="w-2 h-2 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    ))}
                  </div>
                </nav>

                <div className="p-6 border-t border-white/5">
                  <Button 
                    variant="accent" 
                    size="xl" 
                    className="w-full text-white font-bold py-8 rounded-2xl text-lg shadow-xl"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsQuoteOpen(true);
                    }}
                  >
                    Get Quote
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
};

export default Header;
