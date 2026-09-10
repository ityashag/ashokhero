import React, { useEffect, useState } from "react";
import ArrowDownRight from "lucide-react/dist/esm/icons/arrow-down-right";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import BadgeCheck from "lucide-react/dist/esm/icons/badge-check";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import Phone from "lucide-react/dist/esm/icons/phone";
import { catalogMeta, featuredProducts } from "../catalog";
import { dealerInfo } from "../mock";
import { buildWhatsAppLeadUrl, trackLeadEvent } from "../lib/adTracking";

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const featured = featuredProducts[current];
  const imageUrl = `${process.env.PUBLIC_URL}/images/${featured.image}`;

  useEffect(() => {
    setLoaded(true);
    const timer = window.setInterval(
      () => setCurrent((value) => (value + 1) % featuredProducts.length),
      5200
    );
    return () => window.clearInterval(timer);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const selectOffer = () => {
    try {
      window.localStorage.setItem("ashok_sales_selected_model", featured.name);
    } catch {
      // The enquiry still works when browser storage is unavailable.
    }
    window.dispatchEvent(
      new CustomEvent("ashok:model-selected", { detail: featured.name })
    );
    trackLeadEvent("hero_offer_clicked", { model: featured.name });
    scrollTo("enquiry");
  };

  const whatsappUrl = buildWhatsAppLeadUrl(dealerInfo.whatsappNumber, {
    model: featured.name,
    intent: "On-road price",
  });

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-[#F2EFE8] text-[#151515]"
    >
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div className="absolute -right-24 top-20 h-[420px] w-[420px] rounded-full bg-red-600/10 blur-3xl sm:h-[620px] sm:w-[620px]" />
      <div className="absolute left-0 top-1/3 h-px w-full bg-black/[0.06]" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-10 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5 lg:px-12 lg:pb-14 lg:pt-28">
        <div
          className={`relative z-10 transition-all duration-1000 ease-out ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#151515] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white sm:text-xs">
              <BadgeCheck size={14} className="text-red-400" />
              Authorized Hero dealer
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-black/[0.55]">
              <MapPin size={13} className="text-red-600" /> Nakatia, Bareilly
            </span>
          </div>

          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-red-600">
            Ashok Sales · Hero MotoCorp
          </p>
          <h1 className="max-w-3xl font-display text-[clamp(4rem,9vw,8.8rem)] font-black uppercase leading-[0.78] tracking-[-0.035em]">
            Your next
            <span className="block text-red-600">Hero.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base font-medium leading-relaxed text-black/[0.62] sm:text-lg">
            Explore the current Hero range, then get the latest Bareilly
            on-road price, EMI, exchange value or a test ride directly from
            the showroom.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={selectOffer}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-red-600 px-7 py-4 text-sm font-extrabold text-white shadow-[0_16px_40px_rgba(220,38,38,.22)] transition hover:-translate-y-0.5 hover:bg-red-700"
            >
              Get today&apos;s price
              <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackLeadEvent("whatsapp_clicked", {
                  placement: "hero",
                  model: featured.name,
                })
              }
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/[0.15] bg-white/50 px-7 py-4 text-sm font-extrabold text-[#151515] transition hover:border-emerald-600/40 hover:bg-white"
            >
              <MessageCircle size={17} className="text-emerald-600" />
              WhatsApp showroom
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-black/10 py-4">
            {[
              { value: catalogMeta.count, label: "Current models" },
              { value: "Local", label: "On-road quote" },
              { value: "Direct", label: "Dealer response" },
            ].map((item) => (
              <div key={item.label} className="border-r border-black/10 px-3 first:pl-0 last:border-0">
                <div className="font-display text-2xl font-black uppercase leading-none sm:text-3xl">
                  {item.value}
                </div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-black/[0.45] sm:text-[10px]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`relative min-h-[440px] transition-all delay-150 duration-1000 ease-out sm:min-h-[560px] lg:min-h-[680px] ${
            loaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <div className="absolute inset-x-0 bottom-4 top-0 overflow-hidden rounded-[2rem] bg-[#E7E2D8] sm:rounded-[3rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,.95),transparent_44%)]" />
            <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] backdrop-blur sm:right-8 sm:top-8">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Official catalog image
            </div>
            <div className="absolute left-6 top-8 font-display text-[5.2rem] font-black uppercase leading-[0.72] text-black/[0.045] sm:left-9 sm:top-10 sm:text-[9rem] lg:text-[11rem]">
              Ride
              <br />
              Hero
            </div>

            <div className="absolute inset-x-3 bottom-28 top-20 flex items-center justify-center sm:inset-x-8 sm:bottom-28 sm:top-24">
              <img
                key={featured.id}
                src={imageUrl}
                alt={`${featured.name} official product view`}
                className="hero-product-image h-full w-full object-contain mix-blend-multiply"
                fetchpriority="high"
              />
            </div>

            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 border-t border-black/10 pt-4 sm:inset-x-8 sm:bottom-7">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                  {featured.segment}
                </p>
                <h2 className="mt-1 font-display text-3xl font-black uppercase leading-none sm:text-5xl">
                  {featured.name.replace("Hero ", "")}
                </h2>
              </div>
              <div className="flex shrink-0 items-end gap-2 sm:gap-3">
                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-black/40">
                    {featured.specLabel || "Engine"}
                  </p>
                  <p className="font-display text-2xl font-black sm:text-3xl">
                    {featured.engine}
                  </p>
                </div>
                <a
                  href={`tel:${dealerInfo.phone}`}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#151515] text-white shadow-lg transition hover:scale-105 hover:bg-red-600 sm:h-12 sm:w-12"
                  aria-label={`Call Ashok Hero at ${dealerInfo.phone}`}
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-28 left-6 flex gap-2 sm:left-9">
            {featuredProducts.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  current === index ? "w-9 bg-red-600" : "w-3 bg-black/20 hover:bg-black/40"
                }`}
                aria-label={`Show ${item.name}`}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo("products")}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/[0.45] transition hover:text-red-600 lg:flex"
      >
        See the full range <ArrowDownRight size={15} />
      </button>
    </section>
  );
};

export default HeroSection;
