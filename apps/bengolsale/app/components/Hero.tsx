'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Package, Star } from 'lucide-react';
import React from 'react';

interface HeroProps {
  scrollToCheckout: () => void;
  total: number;
}

const Hero: React.FC<HeroProps> = ({ scrollToCheckout, total }) => {
  return (
    // <section className="relative pt-24 pb-16 overflow-hidden bg-white">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 items-center">
    //     <motion.div 
    //       initial={{ opacity: 0, y: 20 }}
    //       whileInView={{ opacity: 1, y: 0 }}
    //       viewport={{ once: true }}
    //       className="lg:col-span-5 z-10"
    //     >
    //       <div className="inline-block px-4 py-1.5 bg-brand-primary/5 text-brand-primary rounded-full mb-8 font-bold text-[10px] uppercase tracking-widest">
    //         Limited Edition Combo Offers
    //       </div>
    //       <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-brand-dark leading-[1.1] mb-6">
    //         পছন্দের কম্বো <br /><span className="text-brand-primary italic">বেছে নিন</span>
    //       </h1>
    //       <p className="text-base text-gray-500 mb-10 leading-relaxed max-w-md">
    //         ৩ পিস বা তার বেশি অর্ডার করলেই সারা বাংলাদেশে একদম <span className="text-brand-primary font-bold">ফ্রি হোম ডেলিভারি!</span> আজই আপনার স্টাইলিশ প্যাকটি বেছে নিন।
    //       </p>
          
    //       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
    //         <button 
    //             onClick={scrollToCheckout}
    //             className="group relative bg-brand-primary text-white px-8 py-4 rounded-2xl font-black text-sm shadow-2xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 overflow-hidden"
    //         >
    //             <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 shadow-[0_0_20px_20px_rgba(255,255,255,0.3)]" />
    //             <ShoppingCart className="w-5 h-5" />
    //             <span>এখনই অর্ডার করুন</span>
    //             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    //         </button>
    //         <div className="flex items-center gap-3">
    //             <div className="flex -space-x-2">
    //                 {[1,2,3,4].map((i) => (
    //                     <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
    //                         <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
    //                     </div>
    //                 ))}
    //             </div>
    //             <div>
    //                <div className="flex text-brand-accent mb-0.5">
    //                   {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
    //                </div>
    //                <p className="text-[10px] font-bold text-gray-400">৪.৯/৫ রেটিং (১০০০+ হ্যাপি কাস্টমার)</p>
    //             </div>
    //         </div>
    //       </div>
    //     </motion.div>

    //     <div className="lg:col-span-7 relative">
    //       <motion.div 
    //         initial={{ opacity: 0, scale: 0.9 }}
    //         whileInView={{ opacity: 1, scale: 1 }}
    //         viewport={{ once: true }}
    //         className="relative z-10"
    //       >
    //         <div className="grid grid-cols-2 gap-4">
    //            <div className="space-y-4">
    //               <div className="rounded-[2.5rem] overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-all duration-700">
    //                  <img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600" alt="Product" className="w-full h-[300px] object-cover" />
    //               </div>
    //               <div className="rounded-[2.5rem] overflow-hidden shadow-2xl rotate-[1deg] hover:rotate-0 transition-all duration-700">
    //                  <img src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=600" alt="Product" className="w-full h-[200px] object-cover" />
    //               </div>
    //            </div>
    //            <div className="pt-8 space-y-4">
    //               <div className="rounded-[2.5rem] overflow-hidden shadow-2xl rotate-[3deg] hover:rotate-0 transition-all duration-700">
    //                  <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600" alt="Product" className="w-full h-[240px] object-cover" />
    //               </div>
    //               <div className="rounded-[2.5rem] overflow-hidden shadow-2xl rotate-[-1deg] hover:rotate-0 transition-all duration-700">
    //                  <img src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600" alt="Product" className="w-full h-[260px] object-cover" />
    //               </div>
    //            </div>
    //         </div>
    //       </motion.div>
          
    //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/5 rounded-full blur-3xl -z-10" />
    //     </div>
    //   </div>
    // </section>

    <section className="relative py-12 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 z-10"
          >
            <div className="inline-block px-4 py-1.5 bg-brand-primary/5 text-brand-primary rounded-full mb-8 font-bold text-[10px] uppercase tracking-widest">
              Limited Edition Combo Offers
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-brand-dark leading-[1.1] mb-6">
              পছন্দের কম্বো <br /><span className="text-brand-primary italic">বেছে নিন</span>
            </h1>
            <p className="text-base text-gray-500 mb-10 leading-relaxed max-w-md">
              ৩ পিস বা তার বেশি অর্ডার করলেই সারা বাংলাদেশে একদম <span className="text-brand-primary font-bold">ফ্রি হোম ডেলিভারি!</span> আজই আপনার স্টাইলিশ প্যাকটি বেছে নিন।
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
              <p className="text-sm font-semibold text-brand-accent flex items-center gap-2">
                <Package className="w-4 h-4" />
                ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে টাকা)
              </p>
            </div>

            <button 
              onClick={scrollToCheckout}
              className="group w-full md:w-auto bg-brand-primary text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-brand-primary/30 hover:bg-brand-dark transition-all duration-300 flex items-center justify-center gap-4"
            >
              নিচ থেকে কম্বো বাছাই করুন
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <div className="lg:col-span-7 relative">
              <div className="aspect-[16/9] rounded-xl md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100">
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/-I4WL2yS1WQ?si=4B7XX4kKJLLC4iWq" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
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
