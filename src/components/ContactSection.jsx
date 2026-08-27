import React from "react";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { dealerInfo } from "../mock";

const contactCards = [
  {
    icon: Phone,
    title: "Call us",
    content: `${dealerInfo.phone} / ${dealerInfo.secondaryPhone}`,
    href: `tel:${dealerInfo.phone}`,
    color: "text-red-400",
    bg: "bg-red-600/12 border-red-600/15",
  },
  {
    icon: MapPin,
    title: "Visit our showroom",
    content: dealerInfo.address,
    href: dealerInfo.mapUrl,
    searchHref: dealerInfo.searchUrl,
    external: true,
    link: "Open location",
    color: "text-blue-400",
    bg: "bg-blue-600/12 border-blue-600/15",
  },
  {
    icon: Clock,
    title: "Showroom hours",
    content: dealerInfo.hours,
    color: "text-emerald-400",
    bg: "bg-emerald-600/12 border-emerald-600/15",
  },
  {
    icon: Mail,
    title: "Email us",
    content: dealerInfo.email,
    href: `mailto:${dealerInfo.email}`,
    color: "text-amber-300",
    bg: "bg-amber-500/12 border-amber-500/15",
  },
];

const ContactSection = () => {
  const [headerRef, headerVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal(0.05);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0C0C0F] py-20 sm:py-28"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
      <div className="mx-auto max-w-7xl section-padding">
        <div
          ref={headerRef}
          className={`mb-10 sm:mb-14 reveal ${headerVisible ? "visible" : ""}`}
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-red-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 sm:text-xs">
              Contact Ashok Hero
            </span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <h2 className="text-4xl font-black leading-[1.05] text-white sm:text-5xl md:text-6xl">
              Come See
              <br />
              <span className="text-white/25">Your Next Ride</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/45 sm:text-right sm:text-base">
              Visit the showroom for model availability, on-road prices, test rides, and service support.
            </p>
          </div>
        </div>

        <div
          ref={contentRef}
          className={`grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 reveal ${contentVisible ? "visible" : ""}`}
        >
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group rounded-2xl border border-white/[0.07] bg-[#111114] p-5 transition-colors duration-300 hover:border-white/15 sm:p-6"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl border ${card.bg}`}>
                  <Icon size={17} className={card.color} />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white">{card.title}</h3>
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-start gap-1 text-sm leading-relaxed text-white/50 transition-colors hover:text-white"
                  >
                    {card.content}
                    <ArrowUpRight size={12} className="mt-0.5 shrink-0" />
                  </a>
                ) : (
                  <p className="text-sm leading-relaxed text-white/50">{card.content}</p>
                )}
                {card.link && (
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300"
                    >
                      {card.link}
                      <ArrowUpRight size={11} />
                    </a>
                    {card.searchHref && (
                      <a
                        href={card.searchHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-white/45 hover:text-white"
                      >
                        Search on Google
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.07]">
          <iframe
            src="https://www.google.com/maps?q=Nakatia+Bridge,+Mohanpur,+Bareilly,+Uttar+Pradesh+243123&output=embed"
            title="Ashok Hero showroom location"
            width="100%"
            height="300"
            loading="lazy"
            allowFullScreen=""
            style={{ border: 0 }}
            className="grayscale opacity-80 transition-all duration-700 hover:grayscale-0 hover:opacity-100 sm:h-[350px]"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
