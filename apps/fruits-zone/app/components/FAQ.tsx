'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      q: "খেজুর কতদিন ভালো থাকে?",
      a: "আমাদের খেজুরগুলো সঠিকভাবে সংরক্ষণ করলে (ঠান্ডা ও শুষ্ক স্থানে) ৬ মাস থেকে ১ বছর পর্যন্ত ভালো থাকে।"
    },
    {
      q: "রমজানের আগে অর্ডার করলে কবে পাবো?",
      a: "রমজান উপলক্ষে আমরা দ্রুততম ডেলিভারি নিশ্চিত করছি। সাধারণত অর্ডার করার ২৪-৪৮ ঘণ্টার মধ্যে পৌঁছে যাবে।"
    },
    {
      q: "ক্যাশ অন ডেলিভারি আছে কি?",
      a: "জি, সারা বাংলাদেশে আমরা ক্যাশ অন ডেলিভারি সুবিধা প্রদান করছি।"
    },
    {
      q: "একসাথে একাধিক প্যাক অর্ডার করা যাবে?",
      a: "অবশ্যই! আপনি আপনার সুবিধামতো একাধিক প্যাক বা ওজন নির্বাচন করে অর্ডার করতে পারেন।"
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-primary mb-6">সাধারণ জিজ্ঞাসা</h2>
          <div className="w-24 h-1.5 bg-brand-accent mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-brand-primary/5 rounded-[2rem] overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-left bg-brand-muted/20 hover:bg-brand-muted/40 transition-colors"
              >
                <span className="text-base sm:text-lg font-black text-brand-primary">{faq.q}</span>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-brand-primary text-white rotate-180' : 'bg-white text-brand-primary'}`}>
                  {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 sm:p-8 pt-0 bg-brand-muted/20 text-brand-text/70 font-bold leading-relaxed text-sm sm:text-base">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
