import React from "react";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import Phone from "lucide-react/dist/esm/icons/phone";
import { dealerInfo } from "../mock";
import { buildWhatsAppLeadUrl, trackLeadEvent } from "../lib/adTracking";

const ConversionBar = () => {
  const whatsappUrl = buildWhatsAppLeadUrl(dealerInfo.whatsappNumber, {
    intent: "Website enquiry",
  });

  return (
    <>
      <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-2xl border border-white/[0.15] bg-[#151515]/95 p-2 shadow-2xl backdrop-blur-xl md:hidden">
        <a
          href={`tel:${dealerInfo.phone}`}
          onClick={() => trackLeadEvent("phone_clicked", { placement: "mobile_bar" })}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] px-4 py-3 text-xs font-black text-white"
        >
          <Phone size={15} className="text-red-400" /> Call showroom
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLeadEvent("whatsapp_clicked", { placement: "mobile_bar" })}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-black text-white"
        >
          <MessageCircle size={15} /> WhatsApp
        </a>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackLeadEvent("whatsapp_clicked", { placement: "desktop_floating" })}
        className="fixed bottom-7 right-7 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_16px_40px_rgba(5,150,105,.32)] transition hover:-translate-y-1 hover:bg-emerald-700 md:flex"
        aria-label="Chat with Ashok Hero on WhatsApp"
      >
        <MessageCircle size={23} />
      </a>
    </>
  );
};

export default ConversionBar;
