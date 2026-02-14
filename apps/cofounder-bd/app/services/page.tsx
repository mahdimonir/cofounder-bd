"use client";

import {
   ArrowRight,
   CheckCircle2,
   Code2,
   Compass, PenTool,
   TrendingUp
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-subtle selection:text-brand">
      <Navbar />

      <main className="pt-40 md:pt-56">
        {/* Header Section */}
        <section className="px-6 pb-24 border-b border-stroke bg-gradient-to-b from-brand/[0.03] to-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.02] rounded-full blur-3xl -z-10" />
           <div className="container-max">
              <p className="text-[10px] font-black text-brand uppercase tracking-[0.5em] mb-10">Service Operating Systems</p>
              <h1 className="text-text-main max-w-5xl leading-tight font-black tracking-tighter">
                 Strategic Digital Systems Engineered for <br className="hidden md:block" /> 
                 <span className="text-brand">Sustainable Revenue Flows.</span>
              </h1>
              <p className="text-text-dim max-w-2xl text-xl leading-relaxed mt-10 font-medium italic">
                 "We build and optimize integrated digital platforms that drive absolute sector authority and category leadership for ambitious companies."
              </p>
           </div>
        </section>

        {/* Practice Areas */}
        <section className="py-32 px-6 bg-white">
           <div className="container-max space-y-48">
              <CorporateServiceDetail 
                icon={Compass}
                title="Business Strategy"
                desc="Designing scalable digital roadmaps based on objective market intent and competitive architectural analysis."
                deliverables={[
                  "Market Position Analysis",
                  "Growth Vector Mapping",
                  "Revenue Model Optimization",
                  "Strategic Scaling Roadmap"
                ]}
              />

              <CorporateServiceDetail 
                reversed
                icon={PenTool}
                title="Brand Identity & Design"
                desc="Building visual signals that command professional trust and establish long-term sector authority."
                deliverables={[
                  "Corporate Identity Systems",
                  "Product UI/UX Frameworks",
                  "Professional Brand Guidelines",
                  "Visual Signal Alignment"
                ]}
              />

              <CorporateServiceDetail 
                icon={Code2}
                title="Web & App Engineering"
                desc="Engineering high-performance platforms focused on sub-second precision and conversion flow."
                deliverables={[
                  "Enterprise Web Platforms",
                  "Custom Dashboard Systems",
                  "E-commerce Infrastructure",
                  "API & Data Integrations"
                ]}
              />

              <CorporateServiceDetail 
                reversed
                icon={TrendingUp}
                title="Performance Marketing"
                desc="Surgical paid media and search strategies designed for maximum measurable ROI flow."
                deliverables={[
                  "Search Intent Optimization",
                  "Paid Acquisition Engines",
                  "Revenue-Focused Analytics",
                  "Conversion Rate Mastery"
                ]}
              />
           </div>
        </section>

        {/* Global CTA - Brand Impact */}
        <section className="py-40 px-6 bg-brand text-white overflow-hidden relative">
           <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
           <div className="container-max text-center relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-10 text-brand-subtle">Initialize Scale-Up</p>
              <h2 className="text-white text-4xl md:text-7xl mb-12 tracking-tighter font-black">Ready to Build Your Growth System?</h2>
              <p className="text-brand-subtle max-w-3xl mx-auto mb-16 text-xl leading-relaxed italic border-l-4 border-white/20 pl-8">
                 Join 120+ category-leading businesses that have synchronized their digital operations with CoFounderBD's high-precision growth systems.
              </p>
              <Link href="/#contact" className="btn-primary h-20 px-16 text-sm uppercase tracking-[0.3em] mx-auto bg-white text-brand hover:bg-brand-light hover:text-brand-hover shadow-2xl shadow-black/10 active:scale-95 group border-transparent">
                 Request Partnership Proposal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function CorporateServiceDetail({ icon: Icon, title, desc, deliverables, reversed }: any) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-24 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
       <div className={`lg:col-span-6 space-y-12 ${reversed ? 'lg:order-2' : ''}`}>
          <div className="w-20 h-20 bg-brand-light rounded-3xl flex items-center justify-center text-brand shadow-sm">
             <Icon size={36} />
          </div>
          <div className="space-y-6">
             <h2 className="text-text-main tracking-tighter text-4xl md:text-6xl font-black uppercase">{title}</h2>
             <p className="text-text-dim text-xl leading-relaxed font-medium">{desc}</p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-stroke">
             {deliverables.map((d: any) => (
                <li key={d} className="flex items-center gap-5 text-sm font-black text-text-main group cursor-default uppercase tracking-widest">
                   <div className="w-7 h-7 bg-brand-light rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all shadow-inner">
                      <CheckCircle2 size={16} />
                   </div>
                   {d}
                </li>
             ))}
          </ul>
       </div>
       <div className={`lg:col-span-6 aspect-[4/3] bg-surface-alt rounded-[3.5rem] border-2 border-transparent relative overflow-hidden shadow-2xl group ${reversed ? 'lg:order-1' : ''}`}>
          <div className="absolute inset-0 bg-brand/10 z-10 group-hover:bg-brand/0 transition-all duration-1000" />
          <img 
            src={`https://images.unsplash.com/photo-${reversed ? '1522071820081-009f0129c71c' : '1553877522-a12820d44201'}?auto=format&fit=crop&q=80&w=2070`} 
            alt={title} 
            className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[3s]" 
          />
       </div>
    </div>
  );
}
