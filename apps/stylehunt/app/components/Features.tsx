'use client';

import { Check, Package, ShoppingCart, Zap } from 'lucide-react';
import React from 'react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Check className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-brand-dark">Authentic Product</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-brand-dark">Premium Quality</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-brand-dark">Cash on Delivery</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-brand-dark">Fast Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
