'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function SocialProof() {
  const reviews = [
    {
      text: "খেজুরের মান অসাধারণ, প্যাকেজিংও সুন্দর ছিল।",
      location: "ঢাকা"
    },
    {
      text: "আলহামদুলিল্লাহ, একদম ফ্রেশ খেজুর পেয়েছি। ইফতারের জন্য সেরা।",
      location: "চট্টগ্রাম"
    }
  ];

  return (
    <section className="bg-brand-muted/20 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pattern-islamic opacity-10 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-brand-primary mb-4">গ্রাহকদের মতামত</h2>
          <p className="text-brand-primary/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">প্রাথমিক গ্রাহকদের মতামত</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-7 sm:p-10 rounded-[2.5rem] border border-brand-primary/5 shadow-sm relative"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-brand-accent text-brand-accent" />)}
              </div>
              <p className="text-lg font-bold text-brand-primary mb-6 leading-relaxed">
                “{review.text}”
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-brand-primary/40 uppercase tracking-widest">– {review.location}</span>
                <div className="h-1 w-8 bg-brand-accent/20 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
