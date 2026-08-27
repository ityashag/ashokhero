import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { dealerInfo } from "../mock";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setIsMobileMenuOpen(false), []);

  const scrollTo = useCallback(
    (id) => {
      closeMobile();
      if (!isHome) {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 400);
      } else {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    },
    [closeMobile, isHome, navigate]
  );

  const homeLinks = [
    { name: "Home", href: "home" },
    { name: "Products", href: "products" },
    { name: "Services", href: "services" },
    { name: "Contact", href: "contact" },
  ];

  const pageLinks = [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav
        className={`transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-black/90 backdrop-blur-2xl border-b border-white/[0.06]"
            : "bg-gradient-to-b from-black/60 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto section-padding py-4 sm:py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:shadow-red-600/50 transition-shadow duration-200">
                <span className="text-white font-black text-xs tracking-tight">AH</span>
              </div>
              <div>
                <div className="text-white font-extrabold text-sm leading-tight tracking-wide">
                  ASHOK HERO
                </div>
                <div className="text-white/35 text-[9px] font-medium leading-tight tracking-wider uppercase">
                  Hero MotoCorp · Bareilly
                </div>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {homeLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  {link.name}
                </button>
              ))}
              <div className="w-px h-4 bg-white/15 mx-1.5" />
              {pageLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    location.pathname === link.to
                      ? "text-red-400 bg-red-600/10"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${dealerInfo.phone}`}
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors duration-200"
              >
                <Phone size={13} className="text-red-500" />
                <span>{dealerInfo.phone} / {dealerInfo.secondaryPhone}</span>
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-red-600/20 hover:shadow-red-500/30 transition-all duration-200"
              >
                Get Offer
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-400 ease-out ${
            isMobileMenuOpen
              ? "max-h-[600px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto section-padding pb-5">
            <div className="bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-white/[0.07] p-3 space-y-0.5">
              {homeLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left px-4 py-3 text-white/65 font-medium hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-200 text-sm"
                >
                  {link.name}
                </button>
              ))}
              <div className="border-t border-white/[0.07] my-1" />
              {pageLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={closeMobile}
                  className={`block px-4 py-3 font-medium rounded-xl transition-colors duration-200 text-sm ${
                    location.pathname === link.to
                      ? "text-red-400 bg-red-600/10"
                      : "text-white/65 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3 mt-1 border-t border-white/[0.07]">
                <a
                  href={`tel:${dealerInfo.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold border border-white/10 text-white/70 rounded-xl hover:bg-white/5 transition-colors duration-200"
                >
                  <Phone size={14} className="text-red-500" />
                  {dealerInfo.phone} / {dealerInfo.secondaryPhone}
                </a>
                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full py-2.5 text-sm font-semibold bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors duration-200"
                >
                  Get Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
