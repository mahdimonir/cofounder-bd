"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppWidget() {
  const whatsappNumber = "+8801700000000"; // Placeholder, matching the footer/contact
  const message = "Hello CoFounderBD, I'd like to discuss a project.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group flex items-center gap-4 active:scale-95 transition-all"
    >
      <div className="bg-white border border-stroke py-3 px-5 rounded-full shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
         <span className="text-xs font-black text-text-main uppercase tracking-widest whitespace-nowrap">Connect on WhatsApp</span>
         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
      <div className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform duration-500">
        <MessageCircle size={32} fill="currentColor" />
      </div>
    </a>
  );
}
