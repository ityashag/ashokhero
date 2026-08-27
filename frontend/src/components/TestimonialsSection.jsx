import React from "react";
import { Star, Quote } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { testimonials } from "../mock";

const TestimonialsSection = () => {
  const [headerRef, headerVisible] = useScrollReveal();
  const [cardsRef, cardsVisible] = useScrollReveal(0.05);
  const [statsRef, statsVisible] = useScrollReveal(0.2);

  return (
    <section className="py-20 sm:py-28 bg-[#0C0C0F] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto section-padding">
        <div
          ref={headerRef}
          className={`mb-10 sm:mb-14 reveal ${headerVisible ? "visible" : ""}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-amber-500" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Customer Reviews
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05]">
              What Our
              <br />
              <span className="text-white/25">Customers Say</span>
            </h2>
            <p className="text-white/45 text-sm sm:text-base max-w-xs leading-relaxed sm:text-right">
              Join thousands of satisfied customers who trust Ashok Hero.
            </p>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              className="group bg-[#111114] rounded-2xl border border-white/[0.07] hover:border-amber-500/20 p-5 sm:p-6"
              style={{
                transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${idx * 80}ms`,
                transform: cardsVisible ? "translateY(0)" : "translateY(24px)",
                opacity: cardsVisible ? 1 : 0,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <Quote size={22} className="text-red-600/20" />
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-white/50 text-xs sm:text-sm italic leading-relaxed mb-5">
                "{t.comment}"
              </p>
              <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.07]">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white text-xs sm:text-sm">
                    {t.name}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/30">
                    {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className={`mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 reveal ${
            statsVisible ? "visible" : ""
          }`}
        >
          {[
            { val: "5.0/5", label: "Google Rating", color: "text-amber-400" },
            { val: "1,380", label: "Google Reviews", color: "text-white" },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center bg-[#111114] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/[0.07]"
            >
              <div
                className={`text-2xl sm:text-3xl md:text-4xl font-black mb-0.5 ${s.color}`}
              >
                {s.val}
              </div>
              <div className="text-white/30 text-[10px] sm:text-xs uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
