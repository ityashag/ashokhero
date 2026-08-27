import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PageHeader = ({ title, subtitle, badge, badgeIcon: BadgeIcon }) => {
  return (
    <div className="relative bg-[#09090B] text-white overflow-hidden">
      {/* Gradient accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative max-w-7xl mx-auto section-padding pt-28 sm:pt-32 pb-12 sm:pb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-white/35 hover:text-white text-xs sm:text-sm font-medium mb-6 transition-colors duration-200"
        >
          <ArrowLeft size={13} />
          Back to Home
        </Link>

        {badge && (
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-red-500" />
            <span className="flex items-center gap-2 text-[10px] sm:text-xs text-red-400 font-bold uppercase tracking-[0.2em]">
              {BadgeIcon && <BadgeIcon size={12} />}
              {badge}
            </span>
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-3 sm:mb-4 leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/45 text-sm sm:text-base md:text-lg max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
