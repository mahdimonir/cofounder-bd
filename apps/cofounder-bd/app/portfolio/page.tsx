"use client";

import {
    ArrowRight,
    ArrowUpRight,
    TrendingUp,
    Zap
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const corporateWork = [
  {
    brand: "Raafidan",
    category: "Luxury E-commerce Strategy",
    result: "+220% Revenue Scale",
    problem: "Outdated digital presence and fragmented customer acquisition flow led to stagnant growth in a high-ticket furniture market.",
    solution: "We implemented a unified digital growth system combining high-performance platform architecture with surgical paid strategy optimization.",
    numbers: "3.2x Return on Ad Spend (ROAS)",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2070"
  },
  {
    brand: "StyleHunt",
    category: "Fashion Retail Performance",
    result: "3.2x Conversion Increase",
    problem: "High traffic but low conversion due to friction-heavy UI and lack of data-driven intent targeting on paid channels.",
    solution: "A complete UI overhaul focused on sub-second precision and integrated conversion engines using behavioral data analytics.",
    numbers: "+45% Year-over-Year (YoY) Growth",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070"
  },
  {
    brand: "BengolSale",
    category: "Digital Architecture / Scale",
    result: "Absolute Market Reach",
    problem: "Manual inventory management and disconnected sales nodes were capping the growth of a multi-category marketplace.",
    solution: "We architected a unified inventory node and synchronized high-traffic distribution points into a single management backbone.",
    numbers: "100% Data Integrity Achievement",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2026"
  }
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-subtle selection:text-brand">
      <Navbar />

      <main className="pt-40 md:pt-56 pb-24">
        {/* Header Section */}
        <section className="px-6 pb-24 border-b border-stroke bg-gradient-to-b from-brand/[0.03] to-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.02] rounded-full blur-3xl -z-10" />
           <div className="container-max">
              <p className="text-[10px] font-black text-brand uppercase tracking-[0.5em] mb-10 pb-8 border-b border-brand/10">Implementation Archive</p>
              <h1 className="text-text-main max-w-5xl leading-tight font-black tracking-tighter text-6xl md:text-8xl">
                 Proven Digital <br className="hidden md:block" /> 
                 <span className="text-brand">Growth Systems.</span>
              </h1>
              <p className="text-text-dim max-w-2xl text-xl leading-relaxed mt-10 font-medium italic border-l-4 border-brand/20 pl-8">
                 "Our methodology transforms digital infrastructure from a cost center into a high-performance revenue engine."
              </p>
           </div>
        </section>

        {/* Case Study Grid */}
        <section className="py-32 px-6 bg-white">
           <div className="container-max space-y-48">
              {corporateWork.map((project, idx) => (
                 <CorporateCaseStudy 
                   key={project.brand}
                   {...project}
                 />
              ))}
           </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 px-6 bg-brand text-white overflow-hidden relative border-y border-white/10">
           <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
           <div className="container-max text-center relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-10 text-brand-subtle">Scale Your Performance</p>
              <h2 className="text-white text-4xl md:text-7xl mb-12 tracking-tighter font-black">Ready for Architectural Growth?</h2>
              <p className="text-brand-subtle max-w-3xl mx-auto mb-16 text-xl leading-relaxed italic border-l-4 border-white/20 pl-8">
                 Join 120+ category-leading businesses that have implemented CoFounderBD's high-precision growth systems.
              </p>
              <Link href="/#contact" className="btn-primary h-20 px-16 text-sm uppercase tracking-[0.3em] bg-white text-brand hover:bg-brand-light hover:text-brand-hover mx-auto shadow-2xl shadow-black/10 active:scale-95 group border-transparent">
                 Inquire About Project Partnership <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>
           <div className="absolute top-0 left-0 w-full h-full bg-blue-900/10 -z-0" />
        </section>
      </main>

      <Footer />
    </div>
  );
}

function CorporateCaseStudy({ brand, category, result, problem, solution, numbers, img }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start border-b border-stroke pb-32 last:border-0 last:pb-0 group">
       <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
             <p className="text-[10px] font-black text-brand uppercase tracking-[0.4em]">{category}</p>
             <h2 className="text-text-main text-5xl md:text-7xl leading-none tracking-tighter uppercase font-black">{brand}</h2>
          </div>
          
          <div className="flex items-center gap-6 py-6 px-10 bg-brand text-white border border-brand rounded-2xl font-black shadow-xl group-hover:scale-105 transition-all duration-500">
             <TrendingUp size={28} className="text-brand-subtle" />
             <span className="text-xl uppercase tracking-tighter">Impact Score: {result}</span>
          </div>

          <div className="grid grid-cols-1 gap-12 pt-10">
             <div className="space-y-4">
                <h4 className="text-[10px] font-black text-text-soft uppercase tracking-[0.3em]">Operational Friction (The Problem)</h4>
                <p className="text-text-dim text-lg leading-relaxed border-l-4 border-stroke pl-8 italic font-medium">{problem}</p>
             </div>
             <div className="space-y-4">
                <h4 className="text-[10px] font-black text-text-soft uppercase tracking-[0.3em]">Structural Sync (The Solution)</h4>
                <p className="text-text-dim text-lg leading-relaxed border-l-4 border-brand/20 pl-8 font-medium">{solution}</p>
             </div>
             <div className="space-y-8 pt-10 border-t border-stroke">
                <h4 className="text-[10px] font-black text-text-soft uppercase tracking-[0.3em]">Core Performance Metric</h4>
                <div className="flex items-center gap-6 text-brand font-black text-3xl md:text-5xl tracking-tighter group-hover:scale-105 transition-transform duration-500">
                   <Zap size={32} className="fill-brand" />
                   {numbers}
                </div>
             </div>
          </div>
       </div>

       <div className="lg:col-span-7">
          <div className="aspect-[16/11] bg-surface-alt rounded-[4rem] border-2 border-transparent overflow-hidden shadow-2xl relative group cursor-pointer hover:border-brand/10 transition-all duration-1000">
             <div className="absolute inset-0 bg-brand/10 group-hover:bg-brand/0 transition-all duration-1000 z-10" />
             <img src={img} alt={brand} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s] scale-100 group-hover:scale-105" />
             <div className="absolute top-12 right-12 z-20 opacity-0 group-hover:opacity-100 transition-all translate-x-8 group-hover:translate-x-0 duration-700">
                <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center text-brand shadow-2xl hover:scale-110 transition-transform">
                   <ArrowUpRight size={32} />
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
