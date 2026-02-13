import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import QuoteModal from "./QuoteModal";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  // { label: "Travel Info", href: "/travel-info" },
  { label: "Catagories", href: "/catagories" },
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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
          ? "py-3"
          : "py-2 md:py-3"
          } ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div
            className={`flex items-center justify-between transition-all duration-500 mx-auto w-full ${isScrolled
              ? "bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 md:px-12 py-3 shadow-2xl max-w-7xl"
              : "bg-transparent py-1.5 max-w-full lg:px-2"
              }`}
          >
            <div className="flex items-center w-full relative h-12 md:h-14 lg:h-16 px-4 md:px-6">
              {/* Logo - Positioned left */}
              <div className="flex-1 flex justify-start items-center">
                <Link to="/" className="transition-all duration-300 hover:scale-105 active:scale-95">
                  <img
                    src={logo}
                    alt="Indomaple Tours"
                    className={`transition-all duration-500 object-contain ${isScrolled ? "h-5 md:h-6" : "h-6 md:h-7 lg:h-8"
                      } w-auto`}
                  />
                </Link>
              </div>

              {/* Desktop Navigation - Absolute Centered in Header */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <nav className="flex items-center justify-center space-x-6 xl:space-x-8">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.label}
                        to={item.href}
                        className={`font-body uppercase tracking-[0.2em] transition-all duration-300 relative group whitespace-nowrap ${isScrolled
                          ? "text-secondary hover:text-brand-blue text-[11px] xl:text-[12px] font-black"
                          : "text-white hover:text-secondary text-[10px] xl:text-[11px] font-bold"
                          } ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
                      >
                        {item.label}

                        {/* Minimal Active Underline */}
                        <span
                          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-400 ${isActive
                            ? "w-6 bg-secondary shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                            : "w-0 group-hover:w-6 " +
                            (isScrolled ? "bg-brand-blue" : "bg-secondary")
                            }`}
                        />

                        {/* Subtle Active Dot */}
                        {isActive && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-secondary shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                        )}
                      </Link>
                    );
                  })}

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
                    className={`transition-all duration-500 font-black tracking-widest uppercase rounded-full ${!isScrolled
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

      {/* Mobile Menu - Dropdown with glassmorphism effect */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay for depth */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[80] bg-black/40 backdrop-blur-[2px]"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed top-4 left-4 right-4 z-[90] p-6 bg-white/10 backdrop-blur-[30px] border border-white/20 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col gap-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <img src={logo} alt="Indomaple Tours" className="h-8 w-auto object-contain brightness-110" />
                <button
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);


                  return (
                    <motion.div key={item.label}>
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`relative text-white font-body font-bold text-base uppercase tracking-[0.15em] py-3.5 px-5 rounded-2xl transition-all duration-300 flex items-center justify-between group ${isActive
                          ? "bg-white/10 border-l-2 border-secondary"
                          : "hover:bg-white/10"
                          }`}
                      >
                        <span className={`${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}>
                          {item.label}
                        </span>

                        {/* Gold Dot */}
                        <span
                          className={`w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="pt-2">
                <Button
                  variant="gold"
                  className="w-full text-white font-black tracking-widest uppercase py-7 rounded-[2rem] shadow-2xl bg-gradient-to-r from-secondary to-yellow-600 border-none relative overflow-hidden group/btn"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsQuoteOpen(true);
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Free Quote
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
};

export default Header;
