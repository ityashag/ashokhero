import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "lucide-react/dist/esm/icons/menu";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import Phone from "lucide-react/dist/esm/icons/phone";
import X from "lucide-react/dist/esm/icons/x";
import { dealerInfo } from "../mock";
import { buildWhatsAppLeadUrl, trackLeadEvent } from "../lib/adTracking";

const links = [
  { name: "Models", href: "products" },
  { name: "Why Choose Us", href: "services" },
  { name: "Google", href: "reviews" },
  { name: "Contact", href: "contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback(
    (id) => {
      setIsOpen(false);
      if (location.pathname !== "/") {
        navigate("/");
        window.setTimeout(
          () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
          350
        );
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [location.pathname, navigate]
  );

  const whatsappUrl = buildWhatsAppLeadUrl(dealerInfo.whatsappNumber, {
    intent: "New bike enquiry",
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={`mx-auto max-w-[1400px] rounded-2xl border transition-all duration-300 ${
          isScrolled || isOpen
            ? "border-black/10 bg-[#F8F6F1]/95 shadow-[0_12px_40px_rgba(0,0,0,.08)] backdrop-blur-xl"
            : "border-black/[0.08] bg-[#F2EFE8]/75 backdrop-blur-md"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3" aria-label="Ashok Hero home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-red-600 font-display text-base font-black text-white">
              AH
            </span>
            <span>
              <span className="block font-display text-lg font-black uppercase leading-none tracking-tight text-[#151515]">
                Ashok Hero
              </span>
              <span className="mt-1 block text-[8px] font-extrabold uppercase tracking-[0.18em] text-black/[0.42]">
                Nakatia · Bareilly
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="rounded-full px-4 py-2 text-xs font-extrabold text-black/[0.58] transition hover:bg-black/[0.05] hover:text-black"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={`tel:${dealerInfo.phone}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/60 transition hover:border-red-600/30 hover:text-red-600"
              aria-label={`Call ${dealerInfo.phone}`}
            >
              <Phone size={16} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLeadEvent("whatsapp_clicked", { placement: "header" })}
              className="inline-flex items-center gap-2 rounded-full bg-[#151515] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-emerald-700"
            >
              <MessageCircle size={15} /> WhatsApp us
            </a>
          </div>

          <button
            onClick={() => setIsOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-[#151515] lg:hidden"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        <div className={`overflow-hidden transition-all duration-300 lg:hidden ${isOpen ? "max-h-96" : "max-h-0"}`}>
          <div className="border-t border-black/[0.07] p-3">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-black/[0.65] hover:bg-black/[0.04]"
              >
                {link.name}
              </button>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={`tel:${dealerInfo.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 px-3 py-3 text-xs font-extrabold"
              >
                <Phone size={14} /> Call now
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-3 py-3 text-xs font-extrabold text-white"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
