"use client";

import {
   ArrowRight,
   ShieldCheck,
   Target
} from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-subtle selection:text-brand">
      <Navbar />

      <main className="pt-40 md:pt-56">
        {/* Header Section */}
        <section className="px-6 pb-24 border-b border-stroke bg-gradient-to-b from-brand/[0.03] to-white">
           <div className="container-max">
              <p className="text-[10px] font-black text-brand uppercase tracking-[0.5em] mb-10 pb-8 border-b border-brand/10">Studio Philosophy</p>
              <h1 className="text-text-main max-w-5xl tracking-tighter leading-tight font-black text-6xl md:text-8xl">
                 We Build Digital <br className="hidden md:block" /> 
                 <span className="text-brand">Revenue Ecosystems.</span>
              </h1>
              <p className="text-text-dim max-w-3xl text-xl leading-relaxed mt-10">
                 CoFounderBD is a strategic digital growth agency delivering integrated technology and performance solutions. We combine design excellence with data-driven engineering to create sustainable scaling for ambitious brands.
              </p>
           </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-40 px-6 bg-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/10 to-transparent" />
           <div className="container-max">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                 <div className="lg:col-span-6 space-y-10">
                    <h2 className="text-text-main tracking-tight text-3xl md:text-5xl">Strategy Driven by <br /> <span className="text-brand">Measurable Insight.</span></h2>
                    <p className="text-text-dim text-xl leading-relaxed">
                       In a rapidly shifting digital landscape, we avoid the noise of short-term volatility. Instead, we focus on the fundamental systems that drive long-term revenue: user behavior, technical infrastructure, and intent-based acquisition.
                    </p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
                        <ValueNode icon={Target} title="ROI Mandate" desc="Every line of code and creative asset is judged by the revenue it produces." />
                        <ValueNode icon={ShieldCheck} title="Data Integrity" desc="Transparency in reporting and absolute data integrity in every managed campaign." />
                     </div>
                 </div>
                 <div className="lg:col-span-6 bg-surface-alt rounded-[3rem] border border-stroke overflow-hidden aspect-square relative group hover-lift">
                    <div className="absolute inset-0 bg-brand/5 z-10 group-hover:bg-brand/0 transition-all duration-1000" />
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071" alt="Growth Team" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[3s]" />
                 </div>
              </div>
           </div>
        </section>

        {/* Leadership Section */}
        <section className="py-40 px-6 bg-surface-alt border-y border-stroke relative">
           <div className="absolute inset-0 bg-blue-900/[0.02] pointer-events-none" />
           <div className="container-max relative z-10">
              <div className="mb-24 text-center lg:text-left">
                 <p className="text-[10px] font-black text-brand uppercase tracking-[0.4em] mb-6">Expertise Stack</p>
                 <h2 className="text-text-main text-5xl md:text-7xl font-black tracking-tighter mb-8 max-w-3xl">Strategic Leadership.</h2>
                 <p className="text-text-dim max-w-2xl text-xl leading-relaxed font-medium">Combining over 8 years of digital strategy and engineering experience to guide brand scaling across global markets.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                 <LeaderCard 
                    name="Mahdi Monir" 
                    role="Founder / Growth Architect" 
                    img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2070" 
                    desc="Specializing in ecosystem architecture and high-performance revenue optimization for high-ticket industries."
                 />
                 <LeaderCard 
                    name="Node Architect" 
                    role="Technical Principal" 
                    img="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=2070" 
                    desc="Focusing on sub-second platform precision and custom digital infrastructure engineering."
                 />
                 <LeaderCard 
                    name="Growth Node" 
                    role="Performance Partner" 
                    img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2070" 
                    desc="Driving intent-based acquisition models and ROI-focused marketing engines."
                 />
              </div>

              {/* Pink Tinted Sub-Section Inside Leadership */}
              <div className="mt-32 pt-32 border-t border-stroke grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                 <div className="lg:col-span-12 space-y-12">
                     <p className="text-[10px] font-black text-pink-600 uppercase tracking-[0.4em]">Integrated Flow</p>
                     <h2 className="text-5xl md:text-7xl font-black text-text-main tracking-tighter">Engineered for <br /> <span className="text-pink-600">The Modern Market.</span></h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10">
                        <div className="space-y-6 p-10 bg-white border border-stroke rounded-[3rem] hover-lift transition-all">
                           <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center font-black">01</div>
                           <h4 className="text-2xl font-black tracking-tight">Discovery Node</h4>
                           <p className="text-text-dim leading-relaxed">In-depth technical and market audit to identify operational bottlenecks and scale opportunities.</p>
                        </div>
                        <div className="space-y-6 p-10 bg-white border border-stroke rounded-[3rem] hover-lift transition-all">
                           <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center font-black">02</div>
                           <h4 className="text-2xl font-black tracking-tight">System Sync</h4>
                           <p className="text-text-dim leading-relaxed">Deploying optimized digital infrastructure and performance marketing models in absolute unity.</p>
                        </div>
                        <div className="space-y-6 p-10 bg-white border border-stroke rounded-[3rem] hover-lift transition-all">
                           <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center font-black">03</div>
                           <h4 className="text-2xl font-black tracking-tight">Scale Output</h4>
                           <p className="text-text-dim leading-relaxed">Aggressive revenue scaling through iterative optimization and algorithmic performance tracking.</p>
                        </div>
                     </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Growth Stats Section */}
        <section className="py-40 px-6 bg-white">
           <div className="container-max border-[3px] border-brand/5 rounded-[4rem] p-12 md:p-32 shadow-2xl shadow-brand/5 relative overflow-hidden group hover:border-brand/20 transition-all duration-1000">
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.03] rounded-full blur-3xl -z-10 group-hover:bg-brand/[0.06] transition-all" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 items-center text-center">
                 <StatItem label="Years Depth" value="08+" />
                 <StatItem label="Scale Partners" value="120+" />
                 <StatItem label="Sector Breadth" value="12+" />
                 <StatItem label="Trust Index" value="94%" />
              </div>
           </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 px-6">
           <div className="container-max text-center max-w-5xl mx-auto space-y-16">
              <h2 className="text-text-main tracking-tight text-4xl md:text-7xl">Ready to Start a Conversation?</h2>
              <p className="text-text-dim text-xl max-w-3xl mx-auto leading-relaxed">
                 Whether you need a full digital transformation or specific performance optimization flow, our strategy team is ready to deliver a scalable growth system.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
                 <Link href="/#contact" className="btn-primary h-16 px-16 text-sm uppercase tracking-widest shadow-xl shadow-brand/20 active:scale-95 group">
                    Request Consultation Call <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </Link>
                 <Link href="/portfolio" className="btn-outline h-16 px-16 text-sm uppercase tracking-widest text-text-dim hover:text-brand border-stroke active:scale-95">
                    View Implementation Archive
                 </Link>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ValueNode({ icon: Icon, title, desc }: any) {
  return (
    <div className="space-y-5 group">
       <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500">
          <Icon size={24} />
       </div>
       <h4 className="text-text-main tracking-tight font-bold text-xl">{title}</h4>
       <p className="text-base text-text-dim leading-relaxed">{desc}</p>
    </div>
  );
}

function LeaderCard({ name, role, img, desc }: any) {
  return (
    <div className="group space-y-8">
       <div className="aspect-[4/5] bg-surface-alt rounded-[2rem] border border-stroke overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000 shadow-sm hover:shadow-2xl hover:border-brand/20">
          <img src={img} alt={name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-110" />
       </div>
       <div className="space-y-4 text-center md:text-left">
          <div className="space-y-1">
             <h3 className="text-2xl font-black text-text-main group-hover:text-brand transition-colors uppercase tracking-tighter">{name}</h3>
             <p className="text-xs font-bold text-brand uppercase tracking-[0.2em]">{role}</p>
          </div>
          <p className="text-base text-text-dim leading-relaxed line-clamp-2">{desc}</p>
       </div>
    </div>
  );
}

function StatItem({ label, value }: any) {
  return (
    <div className="space-y-3 group cursor-default">
       <p className="text-5xl md:text-7xl font-black text-text-main tracking-tighter group-hover:text-brand transition-all duration-500 group-hover:scale-110">{value}</p>
       <p className="text-[10px] font-bold text-text-soft uppercase tracking-[0.4em] transition-colors group-hover:text-text-dim">{label}</p>
    </div>
  );
}
