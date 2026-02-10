import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-brand-primary/5 text-brand-primary rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 relative">
          <Search size={48} strokeWidth={1.5} />
          <div className="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">404</div>
        </div>
        
        <h2 className="text-4xl font-black text-brand-text mb-6 tracking-tighter">পৃষ্ঠাটি পাওয়া যায়নি</h2>
        <p className="text-brand-text/40 mb-12 font-medium text-lg leading-relaxed">দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি খুঁজে পাওয়া যাচ্ছে না। সম্ভবত লিংকটি ভুল অথবা পৃষ্ঠাটি সরিয়ে ফেলা হয়েছে।</p>
        
        <a
          href="/"
          className="inline-flex items-center gap-4 bg-brand-primary text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Home size={18} />
          হোম পেজে ফিরুন
        </a>
      </div>
    </div>
  );
}
