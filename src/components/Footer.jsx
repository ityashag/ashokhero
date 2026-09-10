import React from "react";
import { Link } from "react-router-dom";
import Facebook from "lucide-react/dist/esm/icons/facebook";
import Instagram from "lucide-react/dist/esm/icons/instagram";
import Mail from "lucide-react/dist/esm/icons/mail";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Phone from "lucide-react/dist/esm/icons/phone";
import Search from "lucide-react/dist/esm/icons/search";
import { dealerInfo } from "../mock";

const Footer = () => {
  const year = new Date().getFullYear();

  const sections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "#home" },
        { name: "Products", href: "#products" },
        { name: "Services", href: "#services" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Products",
      links: [
        { name: "100cc Bikes", href: "#products" },
        { name: "125cc Bikes", href: "#products" },
        { name: "Premium Bikes", href: "#products" },
        { name: "Scooters", href: "#products" },
        { name: "Electric Vehicles", href: "#products" },
      ],
    },
  ];

  const socials = [
    {
      Icon: Facebook,
      label: "Facebook",
      href: "https://www.facebook.com/p/ASHOK-SALES-Nakatiya-Bareilly-100063743756455/",
      hover: "hover:bg-blue-600",
    },
    {
      Icon: Search,
      label: "Google",
      href: dealerInfo.googleBusinessUrl,
      hover: "hover:bg-blue-500",
    },
    {
      Icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/ashoksaleshero/",
      hover: "hover:bg-pink-600",
    },
  ];

  return (
    <footer className="bg-[#070709] text-white border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto section-padding pt-12 sm:pt-16 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/20">
                <span className="text-white font-black text-xs">AH</span>
              </div>
              <div>
                <div className="text-white font-extrabold text-sm tracking-wide">
                  ASHOK HERO
                </div>
                <div className="text-white/30 text-[9px] font-medium tracking-wider uppercase">
                  Hero MotoCorp · Bareilly
                </div>
              </div>
            </Link>
            <p className="text-white/[0.35] text-xs sm:text-sm leading-relaxed mb-5 max-w-xs">
              {dealerInfo.tagline}
            </p>
            <div className="space-y-2.5">
              <a
                href={`tel:${dealerInfo.phone}`}
                className="flex items-center gap-2.5 text-white/[0.35] hover:text-white transition-colors duration-200 text-xs sm:text-sm group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-red-600/15 group-hover:border-red-600/20 transition-all duration-200 flex-shrink-0">
                  <Phone size={12} className="text-red-500" />
                </div>
                {dealerInfo.phone} / {dealerInfo.secondaryPhone}
              </a>
              <a
                href={`mailto:${dealerInfo.email}`}
                className="flex items-center gap-2.5 text-white/[0.35] hover:text-white transition-colors duration-200 text-xs sm:text-sm group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-red-600/15 group-hover:border-red-600/20 transition-all duration-200 flex-shrink-0">
                  <Mail size={12} className="text-red-500" />
                </div>
                <span className="break-all">{dealerInfo.email}</span>
              </a>
              <div className="flex items-center gap-2.5 text-xs text-white/[0.35] sm:text-sm">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.04] sm:h-8 sm:w-8">
                  <MapPin size={12} className="text-red-500" />
                </div>
                <span className="min-w-0 flex-1 leading-relaxed">{dealerInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {sections.map((s) => (
            <div key={s.title}>
              <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-white/25 mb-3 sm:mb-4">
                {s.title}
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.name}>
                    {l.to ? (
                      <Link
                        to={l.to}
                        className="text-white/[0.35] hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                      >
                        {l.name}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        className="text-white/[0.35] hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                      >
                        {l.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-white/25 text-[10px] sm:text-xs text-center sm:text-left">
              &copy; {year} Ashok Sales. Authorized Hero MotoCorp dealer in Bareilly.
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {socials.map(({ Icon, label, href, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white ${hover} transition-all duration-200`}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>
          <p className="text-center mt-5 sm:mt-6 text-[9px] sm:text-[10px] text-white/[0.15]">
            Product availability and on-road price are confirmed by the showroom.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
