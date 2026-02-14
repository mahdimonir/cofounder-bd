"use client";

import {
   Activity,
   ArrowRight,
   ArrowRightCircle,
   ArrowUpRight,
   BarChart3,
   Code2,
   Lightbulb,
   MessageSquare,
   MousePointer2,
   Search,
   ShieldCheck,
   TrendingUp
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");
      const result = await response.json();
      
      trackEvent("Lead", {
        content_name: "Contact Inquiry",
        content_category: "Business Scaling"
      });

      toast.success(`Inquiry Received. We will contact you shortly.`);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error("Process error. Please retry submission.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="pt-40 pb-24 md:pt-56 md:pb-32 px-6 bg-gradient-to-b from-brand/5 to-white overflow-hidden relative">
          {/* Subtle Background Patterns */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/5 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/2" />

          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                {/* Trust Cloud Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-stroke rounded-full shadow-sm mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full bg-brand-light border-2 border-white flex items-center justify-center text-[8px] font-black text-brand uppercase tracking-tighter">C</div>)}
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-text-dim">120+ Verified Successful Scale-Ups</p>
                </div>

                <h1 className="text-text-main animate-in fade-in slide-in-from-bottom-6 duration-700">
                  Engineering <span className="text-brand">Digital Success</span> <br /> 
                  Through Integrated Systems.
                </h1>
                <p className="text-text-dim max-w-xl mb-12 text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 italic">
                  "Every pixel, every node, and every campaign is optimized for a single objective: Sustainable Revenue Growth."
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary px-10">
                    Book Discovery Call <ArrowRightCircle size={18} />
                  </button>
                  <Link href="/portfolio" className="btn-outline group px-10">
                    Implementation Archive <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block relative animate-in fade-in zoom-in duration-1000">
                 <div className="aspect-[4/3] bg-surface-alt rounded-[2.5rem] border border-stroke overflow-hidden shadow-2xl relative group">
                    <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070" alt="Agency Strategy" className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-[8s] hover:scale-110" />
                    <div className="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-all duration-700" />
                 </div>
                 
                 {/* Premium Trust Indicator */}
                 <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-md border border-stroke p-8 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(30,64,175,0.15)] flex items-center gap-6 hover-lift">
                    <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-brand">
                       <ShieldCheck size={32} />
                    </div>
                    <div>
                       <p className="text-sm font-black text-text-main uppercase tracking-widest">Verified Integrity</p>
                       <p className="text-xs text-text-soft font-bold uppercase tracking-[0.2em] mt-1">Foundational Performance</p>
                    </div>
                 </div>

                 {/* Floating Metric */}
                 <div className="absolute -top-6 -right-6 bg-white border border-stroke p-5 rounded-2xl shadow-xl hover-lift">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                          <Activity size={20} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-text-soft">Scaling Node</p>
                          <p className="text-lg font-black text-text-main tracking-tighter">94% Retention</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="py-16 border-y border-stroke bg-white relative overflow-hidden">
           <div className="container-max relative z-10">
              <p className="text-[10px] font-black text-text-soft text-center uppercase tracking-[0.4em] mb-12">Synchronized with Industry Leaders</p>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale transition-all duration-700 hover:grayscale-0 hover:opacity-100">
                 <span className="text-xl font-black text-text-main tracking-tighter cursor-default hover:text-brand transition-colors">RAAFIDAN</span>
                 <span className="text-xl font-black text-text-main tracking-tighter cursor-default hover:text-brand transition-colors">STYLEHUNT</span>
                 <span className="text-xl font-black text-text-main tracking-tighter cursor-default hover:text-brand transition-colors">BENGOLSALE</span>
                 <span className="text-xl font-black text-text-main tracking-tighter cursor-default hover:text-brand transition-colors">JOGHONNO</span>
                 <span className="text-xl font-black text-text-main tracking-tighter cursor-default hover:text-brand transition-colors">FRUITSZONE</span>
              </div>
           </div>
        </section>

        {/* SERVICES SECTION - Subtle Blue Tint */}
        <section id="services" className="section-padding bg-brand/[0.02]">
           <div className="container-max">
              <div className="text-center mb-16">
                 <h2 className="text-text-main">Practice Disciplines</h2>
                 <p className="text-text-dim max-w-xl mx-auto text-lg">
                   Strategic digital solutions designed to improve business logic and sustainable revenue performance.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 <ServiceItem 
                  icon={Lightbulb} 
                  title="Business Strategy" 
                  desc="Market analysis and growth roadmaps designed for absolute category dominance." 
                 />
                 <ServiceItem 
                  icon={MousePointer2} 
                  title="Brand Identity" 
                  desc="Visual signals engineered to establish authority and deep professional trust." 
                 />
                 <ServiceItem 
                  icon={Code2} 
                  title="Web Engineering" 
                  desc="Scalable platforms and custom dashboards optimized for conversion and speed." 
                 />
                 <ServiceItem 
                  icon={Search} 
                  title="Search Mastery" 
                  desc="Organic search strategies focused on intent-based high-value acquisition." 
                 />
                 <ServiceItem 
                  icon={TrendingUp} 
                  title="Performance Ads" 
                  desc="ROI-focused paid media campaigns optimized via behavioral data analytics." 
                 />
                 <ServiceItem 
                  icon={BarChart3} 
                  title="Media Production" 
                  desc="Professional visual assets to fuel your brand's growth and active content nodes." 
                 />
              </div>
           </div>
        </section>

        {/* CASE STUDIES SECTION - Clean White */}
        <section id="portfolio" className="section-padding bg-white border-y border-stroke">
           <div className="container-max">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                 <div>
                    <h2 className="text-text-main">Documented Impact</h2>
                    <p className="text-text-dim max-w-xl text-lg">Every system we build is judged by the numbers it produces. Real growth, verified evidence.</p>
                 </div>
                 <Link href="/portfolio" className="text-sm font-black text-brand flex items-center gap-2 group uppercase tracking-widest">
                    Implementation Archive <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                 <ResultCard 
                  brand="Raafidan" 
                  stat="+220% Revenue Scale" 
                  desc="E-commerce architecture & paid strategy optimization sustained over 6 months."
                 />
                 <ResultCard 
                  brand="StyleHunt" 
                  stat="3.2x ROI Lift" 
                  desc="Complete UI overhaul & high-performance acquisition engine integration."
                 />
              </div>
           </div>
        </section>

        {/* TESTIMONIALS - Subtle Warm Pink Tint (Inspired by VISER X) */}
        <section className="section-padding bg-[rgba(190,24,93,0.02)] border-b border-stroke">
           <div className="container-max">
              <div className="text-center mb-16">
                 <h2 className="text-text-main">Verified Perspectives</h2>
                 <p className="text-text-dim">Global brand founders on the impact of CoFounderBD systems.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 <TestimonialCard 
                  name="Mahdi Monir" 
                  role="Founder, Raafidan" 
                  quote="CoFounderBD transformed our digital presence. The growth was not just visible in the layout, but in our actual revenue numbers." 
                 />
                 <TestimonialCard 
                  name="Sarah Khan" 
                  role="Director, StyleHunt" 
                  quote="Strategic, responsive, and results-driven. They don't just build websites; they build growth engines." 
                 />
                 <TestimonialCard 
                  name="Ariful Islam" 
                  role="CEO, FruitsZone" 
                  quote="The professionalism and clarity provided by the team is unmatched. Highly recommended for any serious business." 
                 />
              </div>
           </div>
        </section>

        {/* PROCESS SECTION - Clean White */}
        <section className="section-padding bg-white">
           <div className="container-max">
              <div className="text-center mb-20">
                 <h2 className="text-text-main tracking-tighter">Growth Architecture</h2>
                 <p className="text-text-dim">Our 4-step framework for architecting sector dominance.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                 <ProcessStep num="1" title="Discover" desc="Deep-dive into your objectives and market intent profiles." />
                 <ProcessStep num="2" title="Strategy" desc="Designing a scalable and high-precision growth roadmap." />
                 <ProcessStep num="3" title="Execute" desc="Platform engineering and multi-channel campaign launch." />
                 <ProcessStep num="4" title="Optimize" desc="Continuous improvement based on real-world data flows." />
                 
                 {/* Connecting Line - Desktop Only */}
                 <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-stroke -z-10" />
              </div>
           </div>
        </section>

        {/* CONTACT SECTION - High Impact Brand Color */}
        <section id="contact" className="section-padding bg-brand overflow-hidden relative">
           <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
           <div className="container-max relative z-10">
              <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-20 shadow-2xl border border-white/20">
                 <div className="text-center mb-16">
                    <h2 className="text-text-main text-3xl md:text-5xl mb-6 tracking-tighter font-black uppercase">Initialize Growth Sync</h2>
                    <p className="text-text-dim text-lg">Consult with our strategy team to discuss your business transformation.</p>
                 </div>

                 <form onSubmit={handleContactSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                       <div>
                          <label className="label-text">Full Name</label>
                          <input required name="name" type="text" placeholder="Mahdi Monir" className="input-field" />
                       </div>
                       <div>
                          <label className="label-text">Business Email</label>
                          <input required name="email" type="email" placeholder="mahdi@company.com" className="input-field" />
                       </div>
                       <div>
                          <label className="label-text">Business Node</label>
                          <input required name="company" type="text" placeholder="Raafidan Corp" className="input-field" />
                       </div>
                    </div>
                    <div>
                       <label className="label-text">Operational Growth Inquiry</label>
                       <textarea required name="message" rows={4} placeholder="Describe your current scaling bottlenecks..." className="text-area"></textarea>
                    </div>
                    <button disabled={isFormSubmitting} type="submit" className="w-full btn-primary h-16 text-sm uppercase tracking-[0.2em] shadow-2xl shadow-brand/20 active:scale-95 group">
                       {isFormSubmitting ? "Syncing Logic..." : "Request Partnership Proposal"} <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-10 pt-10 border-t border-stroke mt-10">
                       <p className="text-[10px] font-black text-text-soft uppercase tracking-[0.3em]">Direct Email: studio@cofounder.bd</p>
                       <div className="h-6 w-px bg-stroke hidden md:block" />
                       <p className="text-[10px] font-black text-text-soft uppercase tracking-[0.3em]">Operational Phone: +880 1700-000000</p>
                    </div>
                 </form>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ServiceItem({ icon: Icon, title, desc }: any) {
  return (
    <div className="corporate-card group hover-lift overflow-hidden relative">
       <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -translate-y-1/2 translate-x-1/2 -z-10 group-hover:scale-110 transition-transform duration-700" />
       <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-brand mb-10 group-hover:bg-brand group-hover:text-white transition-all duration-300 shadow-sm shadow-brand/10">
          <Icon size={32} />
       </div>
       <h3 className="text-2xl font-black text-text-main mb-6 tracking-tight uppercase group-hover:text-brand transition-colors">{title}</h3>
       <p className="text-base text-text-dim leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function ResultCard({ brand, stat, desc }: any) {
  return (
    <div className="bg-white border-2 border-transparent p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-12 items-center md:items-start group hover:border-brand/10 transition-all duration-700 hover:shadow-2xl hover:shadow-brand/5 shadow-sm border-stroke">
       <div className="w-28 h-28 bg-surface-alt rounded-3xl flex items-center justify-center text-text-main font-black text-3xl shrink-0 group-hover:bg-brand group-hover:text-white transition-all duration-700 shadow-inner group-hover:scale-105">
          {brand[0]}
       </div>
       <div className="text-center md:text-left">
          <p className="text-brand font-black text-3xl mb-2 tracking-tighter uppercase">{stat}</p>
          <h4 className="text-lg font-black mb-4 text-text-main uppercase tracking-[0.2em]">{brand}</h4>
          <p className="text-lg text-text-dim leading-relaxed italic border-l-4 border-brand-light pl-6">{desc}</p>
       </div>
    </div>
  );
}

function ProcessStep({ num, title, desc }: any) {
  return (
    <div className="text-center md:text-left relative group">
       <div className="w-20 h-20 bg-white border border-stroke rounded-3xl flex items-center justify-center text-brand font-black text-2xl mb-10 shadow-sm relative z-20 mx-auto md:mx-0 group-hover:border-brand group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
          {num}
       </div>
       <h4 className="text-2xl font-black mb-6 text-text-main uppercase tracking-tighter">{title}</h4>
       <p className="text-base text-text-dim leading-relaxed max-w-[220px] mx-auto md:mx-0 font-medium">{desc}</p>
    </div>
  );
}

function TestimonialCard({ name, role, quote }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-stroke p-12 rounded-[2.5rem] italic text-text-dim text-lg leading-relaxed relative hover:border-brand/20 transition-all duration-500 hover:shadow-2xl hover:shadow-brand/5 group">
       <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center absolute -top-6 left-12 border-4 border-white text-brand shadow-lg">
          <MessageSquare size={20} fill="currentColor" />
       </div>
       <p className="mb-12 font-medium leading-relaxed group-hover:text-text-main transition-colors duration-500">"{quote}"</p>
       <div className="not-italic flex items-center gap-5 border-t border-stroke pt-10">
          <div className="w-14 h-14 bg-surface-alt rounded-2xl flex items-center justify-center text-text-main font-black text-xl border border-stroke shadow-inner group-hover:bg-brand group-hover:text-white transition-all duration-500">
             {name[0]}
          </div>
          <div>
             <p className="text-sm font-black text-text-main uppercase tracking-[0.2em] mb-1">{name}</p>
             <p className="text-xs text-text-soft font-bold uppercase tracking-[0.3em]">{role}</p>
          </div>
       </div>
    </div>
  );
}
