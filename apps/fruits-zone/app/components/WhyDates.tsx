'use client';

import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Zap } from 'lucide-react';

export default function WhyDates() {
  const points = [
    {
      title: "সুন্নাহ অনুযায়ী ইফতার",
      desc: "নবী ﷺ খেজুর দিয়ে ইফতার করতেন — এটি সুন্নাহ ও বরকতময়",
      icon: <Heart className="w-8 h-8 text-brand-accent" />,
      color: "bg-orange-50"
    },
    {
      title: "দ্রুত শক্তি দেয়",
      desc: "প্রাকৃতিক শর্করা ইফতারের সময় শরীরে দ্রুত শক্তি ফিরিয়ে আনে",
      icon: <Zap className="w-8 h-8 text-brand-primary" />,
      color: "bg-emerald-50"
    },
    {
      title: "হজমে সহজ ও স্বাস্থ্যকর",
      desc: "দীর্ঘ রোজার পর হজমে আরামদায়ক",
      icon: <ShieldCheck className="w-8 h-8 text-brand-primary" />,
      color: "bg-emerald-50"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-primary mb-6">
            কেন রমজানে খেজুর সবচেয়ে উত্তম?
          </h2>
          <div className="w-24 h-1.5 bg-brand-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 sm:p-10 rounded-[2.5rem] bg-brand-muted/30 border border-brand-primary/5 hover:border-brand-primary/10 transition-colors group"
            >
              <div className="mb-8 p-6 rounded-3xl bg-white shadow-sm inline-block group-hover:scale-110 transition-transform">
                {point.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-brand-primary mb-4">{point.title}</h3>
              <p className="text-brand-text/70 leading-relaxed font-medium">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
