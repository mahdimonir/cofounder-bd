'use client';

export default function MobileCTA() {
  return (
    <>
      <div className="md:hidden pb-12 bg-white text-center">
         <p className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] animate-pulse">
            🌙 রমজান মোবারক — সুস্থ ইফতারে ফ্রুটস জোন
         </p>
      </div>

      {/* Mobile Sticky CTA - Madinah Stall Light Theme */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-brand-primary/5 md:hidden z-50 flex items-center justify-between gap-6 pb-safe shadow-[0_-10px_40px_rgba(74,99,91,0.08)]">
        <div>
           <span className="block text-[10px] text-brand-primary/50 uppercase font-bold tracking-[0.1em] mb-1">রমজান স্পেশাল</span>
           <span className="text-2xl font-black text-brand-primary">৳৭০৫ <span className="text-xs text-brand-accent">+</span></span>
        </div>
        <a href="#checkout" className="flex-1 bg-brand-primary text-white py-4 rounded-full font-black text-xs text-center shadow-lg shadow-brand-primary/20 uppercase tracking-widest active:scale-95 transition-all">
           এখনই অর্ডার দিন
        </a>
      </div>
    </>
  );
}
