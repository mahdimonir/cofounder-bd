'use client';

import { motion } from 'framer-motion';
import { Package, Star } from 'lucide-react';
import React from 'react';

interface HeroProps {
  scrollToCheckout: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToCheckout }) => {
  return (
    <section className="relative pt-12 pb-8 md:pt-24 md:pb-16 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 z-10"
        >
          <h1 className="text-3xl md:text-5xl font-semibold text-brand-text leading-tight mb-6">
            Find Your Style. <br />
            <span className="text-brand-primary">Shop the Trend</span>
          </h1>
          <p className="mt-4 text-slate-600 max-w-xl mb-10">
            Curated fashion collections designed for modern lifestyles.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
            <p className="text-sm font-semibold text-brand-primary flex items-center gap-2">
              <Package className="w-4 h-4" />
              Cash on Delivery Available
            </p>
          </div>

          <button 
            onClick={scrollToCheckout}
            className="mt-6 bg-brand-primary hover:bg-brand-dark text-white px-6 py-3 rounded-xl transition flex items-center justify-center gap-4"
          >
            Explore Collection
          </button>
        </motion.div>

        <div className="lg:col-span-7 relative">
          <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100">
            <img src="/products/hero.png" alt="Hero Product" className="w-full h-full object-fit" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent">
                  <Star className="w-5 h-5 fill-brand-accent" />
               </div>
               <div>
                  <p className="text-xs font-black text-brand-dark">4.9/5 Rating</p>
                  <p className="text-[10px] text-gray-400">Trusted by 10k+ Customers</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
