import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeIndianRupee,
  ExternalLink,
  Fuel,
  Gauge,
  Zap,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { catalogMeta, liveProducts } from "../mock";
import { trackLeadEvent } from "../lib/adTracking";

const ProductsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIntent, setSelectedIntent] = useState("All");
  const [headerRef, headerVisible] = useScrollReveal();
  const [gridRef, gridVisible] = useScrollReveal(0.05);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(liveProducts.map((p) => p.category)))],
    []
  );
  const intents = useMemo(
    () => ["All", ...Array.from(new Set(liveProducts.map((p) => p.audience)))],
    []
  );

  const filteredProducts = liveProducts.filter((product) => {
    const categoryOk =
      selectedCategory === "All" || product.category === selectedCategory;
    const intentOk =
      selectedIntent === "All" || product.audience === selectedIntent;
    return categoryOk && intentOk;
  });

  const selectModel = (product) => {
    try {
      window.localStorage.setItem("ashok_sales_selected_model", product.name);
    } catch {
      // localStorage can be unavailable in private browser modes.
    }
    trackLeadEvent("product_enquiry_clicked", {
      model: product.name,
      category: product.category,
    });
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="products"
      className="py-20 sm:py-28 bg-[#09090B] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="max-w-7xl mx-auto section-padding">
        <div
          ref={headerRef}
          className={`mb-10 sm:mb-14 reveal ${headerVisible ? "visible" : ""}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-red-500" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-red-500">
              Current Hero Range
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05]">
              Bikes That
              <br />
              <span className="text-red-500">Bring Leads</span>
            </h2>
            <p className="text-white/45 text-sm sm:text-base max-w-md leading-relaxed lg:text-right">
              Model names and core specs are aligned to Hero&apos;s official
              catalogue. Ashok Hero confirms the exact on-road price, colour,
              stock, finance and exchange offer.
            </p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 lg:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                    : "bg-white/5 text-white/55 hover:bg-white/10 hover:text-white border border-white/[0.08]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <select
            value={selectedIntent}
            onChange={(event) => setSelectedIntent(event.target.value)}
            className="w-full lg:w-56 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/5 text-white/65 border border-white/[0.08] hover:bg-white/10 transition-all duration-200 outline-none cursor-pointer"
          >
            {intents.map((intent) => (
              <option key={intent} value={intent} style={{ background: "#141417" }}>
                {intent === "All" ? "All buyer needs" : intent}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/45">
            <BadgeIndianRupee size={15} className="text-red-400" />
            {catalogMeta.priceNote}
          </div>
          <a
            href={catalogMeta.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-300 hover:text-red-200"
          >
            Official source
            <ExternalLink size={13} />
          </a>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {filteredProducts.map((product, index) => (
            <article
              key={product.id}
              className="group relative bg-[#111114] rounded-2xl border border-white/[0.07] overflow-hidden"
              style={{
                transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${index * 55}ms`,
                transform: gridVisible ? "translateY(0)" : "translateY(28px)",
                opacity: gridVisible ? 1 : 0,
              }}
            >
              <div className="relative h-56 overflow-hidden bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,.12),rgba(255,255,255,.02)_52%,transparent_80%)]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <span className="px-2.5 py-1 bg-black/55 backdrop-blur-sm text-white/75 text-[9px] font-bold uppercase tracking-widest rounded-lg border border-white/10">
                    {product.category}
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-500/15 text-emerald-300 text-[9px] font-bold rounded-lg backdrop-blur-sm border border-emerald-500/25">
                    Call to confirm
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <a
                    href={product.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open official details for ${product.name}`}
                    className="mt-1 text-white/28 hover:text-white transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="text-white/40 text-xs sm:text-sm mb-5 leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-3">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/28 mb-1">
                      <Gauge size={11} />
                      Engine
                    </div>
                    <div className="text-sm font-black text-white">
                      {product.engine}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-3">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/28 mb-1">
                      {product.category === "EV" ? (
                        <Zap size={11} />
                      ) : (
                        <Fuel size={11} />
                      )}
                      Spec
                    </div>
                    <div className="text-sm font-black text-white">
                      {product.mileage}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                  <div>
                    <div className="text-[9px] text-white/25 uppercase tracking-widest font-semibold mb-0.5">
                      Price
                    </div>
                    <div className="text-lg font-black text-white leading-none">
                      {product.priceLabel}
                    </div>
                  </div>
                  <button
                    onClick={() => selectModel(product)}
                    className="group/btn flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:bg-red-500"
                  >
                    Enquire
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-0.5 transition-transform duration-200"
                    />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/30 text-sm">
              No products match your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
