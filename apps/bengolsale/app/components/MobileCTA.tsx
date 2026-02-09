'use client';

import { ShoppingCart } from 'lucide-react';
import React from 'react';

interface MobileCTAProps {
  total: number;
  scrollToCheckout: () => void;
}

const MobileCTA: React.FC<MobileCTAProps> = ({ total, scrollToCheckout }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-brand-dark rounded-t-2xl md:rounded-t-[1.5rem] border-t border-white/10 shadow-lg md:hidden z-50 flex items-center justify-between gap-6 backdrop-blur-md bg-opacity-95 pb-safe">
      <div>
        <span className="block text-[8px] text-gray-400 uppercase font-black tracking-widest mb-1">Total Bill</span>
        <span className="text-xl font-black text-white">৳{total}</span>
      </div>
      <button 
        onClick={scrollToCheckout}
        className="flex-1 bg-brand-primary text-white py-3.5 rounded-xl font-black text-sm shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2 transition-transform"
      >
        <ShoppingCart className="w-4 h-4" />
        অর্ডার করুন
      </button>
    </div>
  );
};

export default MobileCTA;
