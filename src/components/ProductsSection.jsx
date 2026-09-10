import React, { useMemo, useState } from "react";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import BadgeCheck from "lucide-react/dist/esm/icons/badge-check";
import Bike from "lucide-react/dist/esm/icons/bike";
import Gauge from "lucide-react/dist/esm/icons/gauge";
import Search from "lucide-react/dist/esm/icons/search";
import SlidersHorizontal from "lucide-react/dist/esm/icons/sliders-horizontal";
import { catalogMeta, catalogProducts } from "../catalog";
import { trackLeadEvent } from "../lib/adTracking";

const typeFilters = ["All", "Motorcycle", "Scooter", "Electric"];

const ProductsSection = () => {
  const [type, setType] = useState("All");
  const [segment, setSegment] = useState("All segments");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const segments = useMemo(() => {
    const matching =
      type === "All"
        ? catalogProducts
        : catalogProducts.filter((item) => item.type === type);
    return ["All segments", ...new Set(matching.map((item) => item.segment))];
  }, [type]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return catalogProducts.filter((item) => {
      const typeMatches = type === "All" || item.type === type;
      const segmentMatches = segment === "All segments" || item.segment === segment;
      const queryMatches =
        !normalizedQuery ||
        `${item.name} ${item.engine} ${item.intent}`.toLowerCase().includes(normalizedQuery);
      return typeMatches && segmentMatches && queryMatches;
    });
  }, [query, segment, type]);

  const visibleProducts = showAll || filtered.length <= 9 ? filtered : filtered.slice(0, 9);

  const changeType = (value) => {
    setType(value);
    setSegment("All segments");
    setShowAll(false);
  };

  const selectModel = (item) => {
    try {
      window.localStorage.setItem("ashok_sales_selected_model", item.name);
    } catch {
      // Browser storage is optional; the form remains usable.
    }
    window.dispatchEvent(new CustomEvent("ashok:model-selected", { detail: item.name }));
    trackLeadEvent("product_enquiry_clicked", {
      model: item.name,
      type: item.type,
      segment: item.segment,
    });
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="products" className="relative overflow-hidden bg-[#111111] py-20 text-white sm:py-28">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-red-500 sm:text-xs">
              <span className="h-px w-9 bg-red-500" />
              Current Hero range
            </div>
            <h2 className="font-display text-5xl font-black uppercase leading-[0.87] tracking-[-0.025em] sm:text-7xl lg:text-8xl">
              Pick your
              <span className="block text-white/20">kind of ride.</span>
            </h2>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-xl text-sm font-medium leading-relaxed text-white/[0.52] sm:text-base">
              Browse {catalogMeta.count} models currently shown in Hero&apos;s India
              catalogue. Select any model for its latest Bareilly price, finance,
              colour and showroom availability.
            </p>
            <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white/[0.35]">
              <BadgeCheck size={15} className="mt-0.5 shrink-0 text-emerald-400" />
              Verified {catalogMeta.verifiedOn}. Official images; no placeholder bikes.
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-3 sm:p-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((item) => (
                <button
                  key={item}
                  onClick={() => changeType(item)}
                  className={`rounded-full px-4 py-2.5 text-xs font-extrabold transition ${
                    type === item
                      ? "bg-red-600 text-white"
                      : "bg-white/[0.05] text-white/[0.55] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item === "All" ? `All ${catalogMeta.count}` : item}
                </button>
              ))}
            </div>
            <div className="grid gap-2 sm:grid-cols-[190px_240px]">
              <label className="relative">
                <SlidersHorizontal
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/[0.35]"
                />
                <select
                  value={segment}
                  onChange={(event) => {
                    setSegment(event.target.value);
                    setShowAll(false);
                  }}
                  className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#1A1A1A] pl-9 pr-3 text-xs font-bold text-white/70 outline-none focus:border-red-500"
                  aria-label="Filter by segment"
                >
                  {segments.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="relative">
                <Search
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/[0.35]"
                />
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setShowAll(false);
                  }}
                  placeholder="Search Splendor, Xpulse..."
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#1A1A1A] pl-9 pr-3 text-xs font-bold text-white outline-none placeholder:text-white/[0.28] focus:border-red-500"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((item, index) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-[1.6rem] bg-[#F0EDE6] text-[#151515] transition duration-500 hover:-translate-y-1"
            >
              <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                <span className="rounded-full bg-[#151515] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-white">
                  {item.segment}
                </span>
                {item.featured && (
                  <span className="rounded-full bg-red-600 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-white">
                    Popular
                  </span>
                )}
              </div>

              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${item.name} on the official catalogue`}
                className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/70 text-black/[0.45] transition hover:bg-white hover:text-red-600"
              >
                <ArrowUpRight size={14} />
              </a>

              <div className="relative h-64 overflow-hidden bg-[radial-gradient(circle_at_60%_35%,#fff_0%,#ede9df_55%,#e5dfd3_100%)] sm:h-72">
                <span className="absolute bottom-1 left-4 font-display text-7xl font-black text-black/[0.035]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <img
                  src={`${process.env.PUBLIC_URL}/images/${item.image}`}
                  alt={`${item.name} official product image`}
                  className="h-full w-full object-contain p-6 mix-blend-multiply transition duration-700 group-hover:scale-[1.035] sm:p-7"
                  loading="lazy"
                />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.16em] text-red-600">
                      {item.type} · {item.intent}
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl font-black uppercase leading-none sm:text-3xl">
                      {item.name}
                    </h3>
                  </div>
                  <div className="shrink-0 rounded-xl border border-black/10 bg-white/[0.45] px-3 py-2 text-right">
                    <p className="flex items-center justify-end gap-1 text-[8px] font-black uppercase tracking-wider text-black/[0.38]">
                      {item.type === "Electric" ? <Gauge size={10} /> : <Bike size={10} />}
                      {item.specLabel || "Engine"}
                    </p>
                    <p className="mt-0.5 font-display text-xl font-black">{item.engine}</p>
                  </div>
                </div>

                <div className="mt-5 flex justify-end border-t border-black/10 pt-4">
                  <button
                    onClick={() => selectModel(item)}
                    className="group/button inline-flex items-center gap-2 rounded-full bg-[#151515] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-red-600"
                  >
                    Enquire
                    <ArrowRight size={14} className="transition group-hover/button:translate-x-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
              <div className="mt-6 rounded-3xl border border-dashed border-white/[0.15] px-6 py-16 text-center text-sm font-semibold text-white/[0.45]">
            No models match that search. Try a model name or clear the filters.
          </div>
        )}

        {!showAll && filtered.length > 9 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] px-7 py-3.5 text-sm font-extrabold text-white transition hover:border-red-500 hover:bg-red-600"
            >
              View all {filtered.length} models <ArrowRight size={15} />
            </button>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/[0.36] sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-2xl">{catalogMeta.priceNote}</p>
          <a
            href={catalogMeta.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 font-extrabold text-white/[0.65] transition hover:text-red-400"
          >
            Verify on Hero MotoCorp <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
