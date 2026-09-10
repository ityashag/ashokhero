import React, { useEffect, useState } from "react";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import BadgeIndianRupee from "lucide-react/dist/esm/icons/badge-indian-rupee";
import Check from "lucide-react/dist/esm/icons/check";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import Phone from "lucide-react/dist/esm/icons/phone";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import { toast } from "sonner";
import { catalogProducts } from "../catalog";
import { dealerInfo } from "../mock";
import {
  buildWhatsAppLeadUrl,
  saveLead,
  sendLeadToEndpoint,
  trackLeadEvent,
} from "../lib/adTracking";

const intents = [
  "On-road price",
  "Book a test ride",
  "Finance / EMI",
  "Exchange my old vehicle",
  "Service booking",
];

const callbackTimes = ["As soon as possible", "9 AM – 12 PM", "12 PM – 4 PM", "4 PM – 7 PM"];

const LeadSection = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    model: "",
    intent: "On-road price",
    pincode: "",
    preferredTime: "As soon as possible",
    consent: false,
  });

  useEffect(() => {
    try {
      const selected = window.localStorage.getItem("ashok_sales_selected_model");
      if (selected) setForm((value) => ({ ...value, model: selected }));
    } catch {
      // Model selection is optional.
    }

    const onModelSelected = (event) =>
      setForm((value) => ({ ...value, model: event.detail || "" }));
    window.addEventListener("ashok:model-selected", onModelSelected);
    return () => window.removeEventListener("ashok:model-selected", onModelSelected);
  }, []);

  const update = (field) => (event) => {
    const value = field === "consent" ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitLead = (event) => {
    event.preventDefault();
    const phone = form.phone.replace(/\D/g, "").slice(-10);

    if (form.name.trim().length < 2) {
      toast.error("Please enter your name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!form.consent) {
      toast.error("Please allow us to contact you about this enquiry.");
      return;
    }

    const lead = saveLead({
      ...form,
      name: form.name.trim(),
      phone,
      pincode: form.pincode.trim(),
      channel: "WhatsApp",
      page: window.location.href,
    });

    sendLeadToEndpoint(lead).catch(() =>
      trackLeadEvent("lead_sync_failed", { model: form.model, intent: form.intent })
    );

    const whatsappUrl = buildWhatsAppLeadUrl(dealerInfo.whatsappNumber, lead);
    const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!whatsappWindow) window.location.href = whatsappUrl;

    toast.success("WhatsApp opened — tap Send to complete your enquiry.");
    trackLeadEvent("whatsapp_lead_opened", {
      model: form.model,
      intent: form.intent,
      placement: "lead_form",
    });
  };

  const inputClass =
    "mt-2 block h-12 min-w-0 w-full rounded-xl border border-black/10 bg-[#F8F6F1] px-4 text-sm font-bold text-[#151515] outline-none transition placeholder:text-black/[0.28] focus:border-red-500 focus:ring-4 focus:ring-red-500/10";

  return (
    <section id="enquiry" className="bg-[#111111] px-3 pb-20 pt-6 sm:px-5 sm:pb-28">
      <div className="mx-auto grid max-w-[1380px] overflow-hidden rounded-[2rem] bg-red-600 text-white shadow-[0_30px_100px_rgba(0,0,0,.25)] lg:grid-cols-[0.82fr_1.18fr] lg:rounded-[3rem]">
        <div className="relative overflow-hidden p-7 sm:p-10 lg:p-14">
          <div className="lead-grid absolute inset-0 opacity-20" />
          <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full border-[55px] border-white/10" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em]">
              <BadgeIndianRupee size={14} /> Local price desk
            </span>
            <h2 className="mt-7 font-display text-5xl font-black uppercase leading-[0.85] tracking-[-0.025em] sm:text-7xl">
              One form.
              <span className="block text-[#3B0A0A]">Real answer.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm font-semibold leading-relaxed text-white/75 sm:text-base">
              Ask for the exact on-road price, available colour, EMI, exchange
              quote or a test ride. Your enquiry goes directly to Ashok Hero on
              WhatsApp.
            </p>

            <div className="mt-9 space-y-4">
              {[
                "Latest showroom-confirmed quote",
                "No hidden visitor identification",
                "You choose what to share and when",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-bold text-white/[0.85]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-red-600">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <a
              href={`tel:${dealerInfo.phone}`}
              className="mt-10 inline-flex items-center gap-3 border-b border-white/[0.35] pb-1 text-sm font-black transition hover:border-white"
            >
              <Phone size={16} /> Prefer a call? {dealerInfo.phone}
            </a>
          </div>
        </div>

        <div className="bg-white p-6 text-[#151515] sm:p-10 lg:p-14">
          <div className="mb-7 flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                Quick enquiry
              </p>
              <h3 className="mt-2 font-display text-3xl font-black uppercase leading-none sm:text-4xl">
                Get my best quote
              </h3>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
              <MessageCircle size={20} />
            </span>
          </div>

          <form onSubmit={submitLead} noValidate>
            <div className="grid min-w-0 gap-4 lg:grid-cols-2">
              <label className="block min-w-0 text-xs font-extrabold text-black/[0.62]">
                Your name *
                <input
                  value={form.name}
                  onChange={update("name")}
                  placeholder="e.g. Aman Kumar"
                  autoComplete="name"
                  className={inputClass}
                  required
                />
              </label>
              <label className="block min-w-0 text-xs font-extrabold text-black/[0.62]">
                Mobile number *
                <div className="relative">
                  <span className="absolute bottom-0 left-4 top-2 flex items-center border-r border-black/10 pr-3 text-sm font-black text-black/[0.45]">
                    +91
                  </span>
                  <input
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="10-digit number"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={14}
                    className={`${inputClass} pl-[4.6rem]`}
                    required
                  />
                </div>
              </label>
              <label className="block min-w-0 text-xs font-extrabold text-black/[0.62]">
                Interested model
                <select value={form.model} onChange={update("model")} className={inputClass}>
                  <option value="">Help me choose</option>
                  {catalogProducts.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block min-w-0 text-xs font-extrabold text-black/[0.62]">
                I am looking for
                <select value={form.intent} onChange={update("intent")} className={inputClass}>
                  {intents.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="block min-w-0 text-xs font-extrabold text-black/[0.62]">
                Pincode
                <input
                  value={form.pincode}
                  onChange={update("pincode")}
                  placeholder="e.g. 243123"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={6}
                  className={inputClass}
                />
              </label>
              <label className="block min-w-0 text-xs font-extrabold text-black/[0.62]">
                Preferred callback
                <select
                  value={form.preferredTime}
                  onChange={update("preferredTime")}
                  className={inputClass}
                >
                  {callbackTimes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-5 flex min-w-0 cursor-pointer items-start gap-3 overflow-hidden rounded-xl border border-black/[0.08] bg-[#F8F6F1] p-4">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={update("consent")}
                className="mt-0.5 h-4 w-4 shrink-0 accent-red-600"
                required
              />
              <span className="min-w-0 flex-1 break-words text-[11px] font-semibold leading-relaxed text-black/50">
                I agree that Ashok Hero may contact me about this enquiry by
                call, SMS or WhatsApp. I can ask to stop future messages at any time.
              </span>
            </label>

            <button
              type="submit"
              className="group mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-[#151515] px-6 py-4 text-sm font-black text-white transition hover:bg-emerald-700"
            >
              <MessageCircle size={17} />
              Send enquiry on WhatsApp
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-center text-[10px] font-semibold text-black/[0.38]">
              <ShieldCheck size={13} className="text-emerald-600" />
              WhatsApp opens with your details. Tap Send to share them with the showroom.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadSection;
