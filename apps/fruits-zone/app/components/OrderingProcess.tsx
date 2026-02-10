'use client';

import { motion } from 'framer-motion';
import { MapPin, PackageCheck, ShoppingBag } from 'lucide-react';

export default function OrderingProcess() {
  const steps = [
    {
      id: "1",
      title: "পছন্দের খেজুর নির্বাচন করুন",
      icon: <ShoppingBag className="w-6 h-6" />
    },
    {
      id: "2",
      title: "ঠিকানা ও ফোন নম্বর দিন",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      id: "3",
      title: "ক্যাশ অন ডেলিভারিতে গ্রহণ করুন",
      icon: <PackageCheck className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-12 bg-brand-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-brand-primary mb-8">
            মাত্র ৩ ধাপে অর্ডার করুন
          </h2>
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full border border-brand-primary/10 text-[11px] font-bold text-brand-primary uppercase tracking-[0.1em] shadow-sm">
             ✔ কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-[2rem] bg-white border border-brand-primary/5 text-center shadow-lg shadow-brand-primary/5"
            >
              <div className="w-14 h-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-primary/20">
                {step.icon}
              </div>
              <h3 className="text-xl font-black text-brand-primary mb-2">ধাপ {step.id}</h3>
              <p className="text-brand-text/70 font-bold">{step.title}</p>
              
              {i < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-brand-primary/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
