'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <AlertTriangle size={40} />
        </div>
        <h2 className="text-3xl font-black text-brand-text mb-4">অপ্রত্যাশিত সমস্যা!</h2>
        <p className="text-brand-text/50 mb-10 font-medium">কিছু একটা ভুল হয়েছে। দয়া করে আবার চেষ্টা করুন অথবা হোম পেজে ফিরে যান।</p>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={() => reset()}
            className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-dark transition-all"
          >
            <RefreshCcw size={18} />
            আবার চেষ্টা করুন
          </button>
          <a
            href="/"
            className="w-full bg-brand-muted/20 text-brand-text py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-muted/40 transition-all font-primary"
          >
            <Home size={18} />
            হোম পেজে ফিরুন
          </a>
        </div>
      </motion.div>
    </div>
  );
}
