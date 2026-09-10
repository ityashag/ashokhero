import React from "react";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import CreditCard from "lucide-react/dist/esm/icons/credit-card";
import Phone from "lucide-react/dist/esm/icons/phone";
import Settings from "lucide-react/dist/esm/icons/settings";
import Zap from "lucide-react/dist/esm/icons/zap";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { dealerInfo, services } from "../mock";

const iconMap = { Zap, Settings, CreditCard, Phone };

const ServicesSection = () => {
  const [headerRef, headerVisible] = useScrollReveal();
  const [cardsRef, cardsVisible] = useScrollReveal(0.05);
  const [ctaRef, ctaVisible] = useScrollReveal(0.2);

  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-[#0C0C0F] relative overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />

      <div className="max-w-7xl mx-auto section-padding">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-10 sm:mb-14 reveal ${headerVisible ? "visible" : ""}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-red-500" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-red-500">
              Our Services
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05]">
              Expert Care,
              <br />
              <span className="text-red-500">Every Time</span>
            </h2>
            <p className="text-white/[0.45] text-sm sm:text-base max-w-xs leading-relaxed sm:text-right">
              Genuine parts, trained technicians, and service you can trust.
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-14"
        >
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="group relative bg-[#111114] rounded-2xl border border-white/[0.07] overflow-hidden"
                style={{
                  transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                  transitionDelay: `${idx * 80}ms`,
                  transform: cardsVisible ? "translateY(0)" : "translateY(24px)",
                  opacity: cardsVisible ? 1 : 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(220,38,38,0.25)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 50px rgba(220,38,38,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = cardsVisible
                    ? "translateY(0)"
                    : "translateY(24px)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 bg-red-600 text-white p-2.5 rounded-xl shadow-lg shadow-red-600/30">
                    <Icon size={16} />
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div
          ref={ctaRef}
          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#111114] border border-white/[0.07] p-8 sm:p-12 md:p-16 text-center reveal ${
            ctaVisible ? "visible" : ""
          }`}
        >
          {/* Accent gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/8 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-6 h-px bg-red-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">
                Service Booking
              </span>
              <div className="w-6 h-px bg-red-500" />
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white mb-3 sm:mb-4">
              Ready to Service Your Hero?
            </h3>
            <p className="text-sm sm:text-base text-white/[0.45] mb-8 max-w-lg mx-auto">
              Schedule your appointment today and keep your bike running like
              new with genuine Hero parts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl shadow-xl shadow-red-600/25 transition-all duration-200 hover:-translate-y-0.5"
              >
                Book Service Now
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </button>
              <a
                href={`tel:${dealerInfo.phone}`}
                className="flex items-center justify-center gap-2 px-8 py-3.5 border border-white/[0.12] text-white/80 text-sm font-semibold rounded-xl hover:bg-white/5 hover:border-white/20 transition-all duration-200"
              >
                <Phone size={15} className="text-red-500" />
                Call: {dealerInfo.phone} / {dealerInfo.secondaryPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
