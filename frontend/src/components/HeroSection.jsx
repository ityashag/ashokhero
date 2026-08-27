import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeIndianRupee,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { catalogMeta, liveProducts } from "../mock";
import { trackLeadEvent } from "../lib/adTracking";

const featuredProducts = liveProducts.slice(0, 4);

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % featuredProducts.length),
      5200
    );
    return () => clearInterval(timer);
  }, []);

  const featured = featuredProducts[current];
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleOffer = () => {
    trackLeadEvent("offer_cta_clicked", {
      model: featured.name,
      placement: "hero",
    });
    scrollTo("contact");
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-[#08090B]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#08090B_0%,#111318_46%,#1A0B0B_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#09090B] to-transparent" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-center justify-center section-padding pt-24 pb-28">
        <div
          className={`flex w-full max-w-3xl flex-col items-center text-center transition-all duration-1000 ease-out ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-red-500/25 bg-red-600/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-red-300 sm:text-xs">
            <ShieldCheck size={13} />
            Authorized Hero MotoCorp Dealer · Bareilly
          </div>

          <h1 className="mt-7 text-5xl font-black leading-[0.92] text-white sm:text-7xl md:text-8xl lg:text-[104px]">
            Ashok
            <br />
            Hero
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/62 sm:text-lg">
            Find your Hero bike, check today&apos;s on-road price, compare EMI,
            exchange your old two-wheeler, and get a fast callback from the
            showroom.
          </p>

          <div className="mt-8 flex w-full max-w-xl flex-col justify-center gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={handleOffer}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-3.5 text-sm font-bold text-white shadow-2xl shadow-red-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-500 active:scale-95"
            >
              Get My Offer
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => scrollTo("products")}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/16 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.1] hover:text-white"
            >
              Explore Live Range
              <ChevronDown size={15} />
            </button>
          </div>

          <div className="mt-10 grid w-full max-w-2xl grid-cols-3 gap-3 text-center">
            {[
              { val: "Live", label: "Campaign Tracking" },
              { val: "Official", label: "Hero Catalogue" },
              { val: "Fast", label: "Dealer Callback" },
            ].map((item) => (
              <div
                key={item.label}
                className="border-l border-white/10 px-1 sm:pl-4"
              >
                <div className="text-xl sm:text-3xl font-black text-white">
                  {item.val}
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-white/32">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 inline-flex max-w-xl items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-center text-xs text-white/38">
            <BadgeIndianRupee size={14} className="text-red-300" />
            Product specs checked from {catalogMeta.sourceLabel}; final stock
            and price are confirmed by Ashok Hero.
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 gap-1.5">
        {featuredProducts.map((product, index) => (
          <button
            key={product.id}
            onClick={() => setCurrent(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              current === index ? "w-10 bg-red-500" : "w-4 bg-white/25"
            }`}
            aria-label={`Show ${product.name}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
