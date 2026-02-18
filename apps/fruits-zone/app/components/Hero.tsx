'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative py-12 overflow-hidden bg-white selection:bg-brand-primary selection:text-white">
      {/* Decorative Background Elements - Calm & Warm */}
      <div className="absolute inset-0 pattern-islamic opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-brand-primary/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[400px] w-[400px] rounded-full bg-brand-accent/[0.03] blur-[80px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-12 xl:col-span-7 text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-brand-primary/10 text-brand-primary text-[11px] uppercase font-bold tracking-[0.1em] mb-8 shadow-sm"
            >
              🌙 রমজানের জন্য বিশেষভাবে নির্বাচিত
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-8 text-brand-primary">
              ইফতারের জন্য <br />
              খাঁটি ও প্রিমিয়াম <span className="text-brand-accent">খেজুর</span>
            </h1>
            
            <p className="text-lg md:text-xl text-brand-text/70 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              সৌদি আরব থেকে আমদানিকৃত Ajwa, Sukkari ও Mashruk খেজুর সরাসরি আপনার ঘরে পৌঁছে দিচ্ছি আমরা।
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-16">
              <a 
                href="#checkout" 
                className="group relative flex w-full sm:w-auto items-center justify-center gap-4 rounded-full bg-brand-primary px-12 py-6 text-sm font-black text-white transition-all hover:bg-brand-dark hover:scale-[1.02] shadow-xl shadow-brand-primary/20 uppercase tracking-widest overflow-hidden"
              >
                আজই অর্ডার করুন
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
              </a>
              
              <a href="#checkout" className="text-brand-primary font-bold text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
                 দাম দেখুন
              </a>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="lg:col-span-12 xl:col-span-5 relative"
          >
            <div className="relative aspect-square w-full max-w-[500px] mx-auto rounded-[3rem] overflow-hidden bg-black border border-brand-primary/5 flex items-center justify-center group">
               <iframe 
                 className="w-full h-full"
                 src="https://www.youtube.com/embed/6LG3oKFY8LE?autoplay=1&mute=1&loop=1&playlist=6LG3oKFY8LE" 
                 title="YouTube video player" 
                 frameBorder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                 allowFullScreen
               ></iframe>
               
               {/* Subtle Glow */}
               <div className="absolute inset-0 bg-brand-primary/5 blur-3xl -z-10 rounded-full scale-75" />
            </div>
          </motion.div>
        </div>

        {/* Trust Strip Integration - Full Width */}
        <div className="flex flex-wrap justify-start md:justify-center gap-4 md:gap-6 pt-12 border-t border-brand-primary/5 max-w-5xl mx-auto">
            {[
                '১০০% প্রাকৃতিক ও কেমিক্যাল মুক্ত',
                'বাছাইকৃত প্রিমিয়াম গ্রেড',
                'রমজানের জন্য উপযোগী সংরক্ষণ',
                'সারা বাংলাদেশে ডেলিভারি'
            ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                        >
                            <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                        </motion.div>
                    </div>
                    <span className="text-[11px] font-bold text-brand-primary/70 leading-tight text-left">
                        {text}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
