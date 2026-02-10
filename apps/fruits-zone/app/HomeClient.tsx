'use client';

import Checkout from "./components/Checkout";
import FAQ from "./components/FAQ";
import Hero from "./components/Hero";
import MobileCTA from "./components/MobileCTA";
import OrderingProcess from "./components/OrderingProcess";
import SocialProof from "./components/SocialProof";
import WhoIsItFor from "./components/WhoIsItFor";
import WhyDates from "./components/WhyDates";

interface HomeClientProps {
  initialProducts: any[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
  return (
    <>
      <main className="bg-white">
        <Hero />
        <WhyDates />
        <Checkout initialProducts={initialProducts} />
        <WhoIsItFor />
        <OrderingProcess />
        <SocialProof />
        <FAQ />
        
        {/* Final CTA Section */}
        <section className="py-24 bg-white text-center">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-brand-primary mb-8 leading-tight">
                    রমজানের ইফতারে <br />
                    খাঁটি খেজুর দিয়ে শুরু করুন
                </h2>
                <a 
                    href="#checkout" 
                    className="inline-flex items-center justify-center gap-4 rounded-full bg-brand-primary px-10 py-5 sm:px-16 sm:py-8 text-base sm:text-lg font-black text-white hover:scale-105 transition-all shadow-2xl shadow-brand-primary/20 uppercase tracking-widest"
                >
                    এখনই অর্ডার করুন
                </a>
            </div>
        </section>
      </main>
      <MobileCTA />
    </>
  );
}
