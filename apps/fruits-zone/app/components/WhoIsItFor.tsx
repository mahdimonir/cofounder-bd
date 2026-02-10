'use client';

import { motion } from 'framer-motion';
import { Gift, Landmark, Plane, Users } from 'lucide-react';

export default function WhoIsItFor() {
  const categories = [
    {
      title: "পরিবারের ইফতারের জন্য",
      icon: <Users className="w-6 h-6" />,
      desc: "সবার জন্য স্বাস্থ্যকর ও বরকতময় ইফতার নিশ্চিয়তা"
    },
    {
      title: "রমজানের উপহার হিসেবে",
      icon: <Gift className="w-6 h-6" />,
      desc: "প্রিয়জনকে দিন প্রিমিয়াম কোয়ালিটির সেরা উপহার"
    },
    {
      title: "মসজিদ / দান বিতরণের জন্য",
      icon: <Landmark className="w-6 h-6" />,
      desc: "সাশ্রয়ী দামে সেরা মানের খেজুর বিতরণের সুবিধা"
    },
    {
      title: "প্রবাসীদের জন্য উপহার পাঠাতে",
      icon: <Plane className="w-6 h-6" />,
      desc: "বিদেশ থেকে দেশের ঠিকানায় উপহার পাঠানোর সুযোগ"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-primary mb-6">
            এই খেজুর কার জন্য উপযুক্ত?
          </h2>
          <div className="w-24 h-1.5 bg-brand-accent mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 sm:p-10 rounded-[2.5rem] bg-brand-muted/30 border border-brand-primary/5 text-center group hover:bg-white hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors">
                {cat.icon}
              </div>
              <h3 className="text-xl font-black text-brand-primary mb-4 leading-tight">{cat.title}</h3>
              <p className="text-sm font-bold text-brand-text/50">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
