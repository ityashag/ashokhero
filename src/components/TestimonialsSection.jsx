import React from "react";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import BadgeCheck from "lucide-react/dist/esm/icons/badge-check";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import MessageSquareText from "lucide-react/dist/esm/icons/message-square-text";
import Search from "lucide-react/dist/esm/icons/search";
import Star from "lucide-react/dist/esm/icons/star";
import { dealerInfo } from "../mock";
import { trackLeadEvent } from "../lib/adTracking";

const TestimonialsSection = () => (
  <section id="reviews" className="relative overflow-hidden bg-[#F2EFE8] py-20 text-[#151515] sm:py-28">
    <div className="hero-grid absolute inset-0 opacity-35" />
    <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <div className="mb-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-red-600 sm:text-xs">
            <span className="h-px w-9 bg-red-600" />
            Local trust
          </div>
          <h2 className="font-display text-5xl font-black uppercase leading-[0.86] tracking-[-0.025em] sm:text-7xl lg:text-8xl">
            See us on
            <span className="block text-red-600">Google.</span>
          </h2>
        </div>
        <div className="max-w-xl lg:justify-self-end">
          <p className="text-base font-semibold leading-relaxed text-black/[0.58] sm:text-lg">
            Read current customer feedback, check the live business details,
            get directions, or share your own experience on the Ashok Hero
            Google Business Profile.
          </p>
          <p className="mt-3 text-xs font-semibold leading-relaxed text-black/40">
            We do not copy or invent reviews on this website. Google remains the
            live source for customer ratings and review text.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <a
          href={dealerInfo.googleBusinessUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLeadEvent("google_profile_clicked", { placement: "reviews" })}
          className="group relative min-h-[350px] overflow-hidden rounded-[2rem] bg-[#151515] p-7 text-white transition hover:-translate-y-1 sm:p-10"
        >
          <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-red-600/25 blur-3xl transition duration-700 group-hover:scale-125" />
          <div className="absolute bottom-0 right-2 font-display text-[10rem] font-black leading-[0.65] text-white/[0.035] sm:text-[15rem]">
            G
          </div>
          <div className="relative flex h-full flex-col justify-between gap-16">
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#151515]">
                <Search size={20} />
              </span>
              <ArrowUpRight size={28} className="text-white/[0.35] transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-red-400" />
            </div>
            <div>
              <div className="mb-3 flex gap-1 text-amber-400" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((item) => (
                  <Star key={item} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-red-400">
                Live Google Business Profile
              </p>
              <h3 className="mt-3 max-w-2xl font-display text-4xl font-black uppercase leading-[0.9] sm:text-6xl">
                Read reviews &amp; view business details
              </h3>
            </div>
          </div>
        </a>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <a
            href={dealerInfo.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[165px] flex-col justify-between rounded-[2rem] bg-red-600 p-7 text-white transition hover:bg-red-700"
          >
            <div className="flex items-start justify-between">
              <MapPin size={22} />
              <ArrowUpRight size={20} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/60">Visit us</p>
              <h3 className="mt-1 font-display text-3xl font-black uppercase">Get directions</h3>
            </div>
          </a>
          <a
            href={dealerInfo.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[165px] flex-col justify-between rounded-[2rem] border border-black/10 bg-white/[0.55] p-7 transition hover:bg-white"
          >
            <div className="flex items-start justify-between">
              <MessageSquareText size={22} className="text-red-600" />
              <ArrowUpRight size={20} className="text-black/30 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-red-600" />
            </div>
            <div>
              <p className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.18em] text-black/40">
                <BadgeCheck size={12} className="text-emerald-600" /> Your experience matters
              </p>
              <h3 className="mt-1 font-display text-3xl font-black uppercase">Leave a review</h3>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
