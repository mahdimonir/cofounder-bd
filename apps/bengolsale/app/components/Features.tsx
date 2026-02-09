'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React from 'react';

const Features: React.FC = () => {
  const features = [
    "ট্রেন্ডি ড্রপ শোল্ডার ফিট",
    "প্রিমিয়াম কোয়ালিটি ফেব্রিক",
    "পারফেক্ট স্টিচিং ও ফিনিশিং",
    "কালার ও প্রিন্ট লং-লাস্টিং",
    "ক্যাজুয়াল + আউটিং—দুইটার জন্যই সেরা",
    "দাম অনুযায়ী সেরা ভ্যালু",
    "ছবির মতোই প্রোডাক্ট পাবেন",
    "নেক, স্লিভ আর বডি ফিট একদম ক্লিন ও স্মার্ট লুক দেয়"
  ];

  return (
    <section id="features" className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-brand-primary font-bold text-[10px] uppercase tracking-widest mb-2 block">Premium Quality</span>
          <h2 className="text-2xl font-black text-brand-dark">আমাদের বৈশিষ্ট্যসমূহ</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 group hover:border-brand-primary/20 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-sm group-hover:scale-110 transition-transform">
                <Check className="w-4 h-4" />
              </div>
              <p className="font-bold text-gray-600 text-[11px] leading-tight pt-1">{feature}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
