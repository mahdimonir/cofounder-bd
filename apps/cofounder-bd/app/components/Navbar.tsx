"use client";

import { cn } from "@/lib/utils";
import { BarChart3, Box, ChevronDown, Cpu, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const services = [
  {
    category: "Digital Engineering",
    icon: Cpu,
    items: [
      { name: "Enterprise Web Systems", href: "/services#web" },
      { name: "Custom Dashboards", href: "/services#dashboards" },
      { name: "E-commerce Platforms", href: "/services#ecommerce" },
      { name: "Mobile App Development", href: "/services#mobile" },
    ]
  },
  {
    category: "Growth & Search",
    icon: BarChart3,
    items: [
      { name: "Surgical SEO Strategy", href: "/services#seo" },
      { name: "Performance Ads (PPC)", href: "/services#ads" },
      { name: "Content Ecosystems", href: "/services#content" },
      { name: "SMM & Viral Strategy", href: "/services#smm" },
    ]
  },
  {
    category: "Strategy & Identity",
    icon: Zap,
    items: [
      { name: "Business Growth Roadmap", href: "/services#strategy" },
      { name: "Corporate Identity", href: "/services#branding" },
      { name: "Product UI/UX Frameworks", href: "/services#design" },
      { name: "Market Intent Analysis", href: "/services#market" },
    ]
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-stroke h-20"
      onMouseLeave={() => setIsMegaMenuOpen(false)}
    >
      <div className="container-max h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform">C</div>
          <span className="text-2xl font-black tracking-tighter text-text-main uppercase">CoFounder<span className="text-brand">BD</span></span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-10">
          <div 
            className="relative h-20 flex items-center"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
          >
            <button 
              className={cn(
                "text-sm font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors",
                isMegaMenuOpen || pathname === "/services" ? "text-brand" : "text-text-main hover:text-brand"
              )}
            >
              Services <ChevronDown size={14} className={cn("transition-transform duration-300", isMegaMenuOpen && "rotate-180")} />
            </button>

            {/* MEGA MENU */}
            <div className={cn(
              "absolute top-20 left-1/2 -translate-x-1/2 w-[900px] bg-white border border-stroke rounded-2xl shadow-2xl p-10 grid grid-cols-3 gap-12 transition-all duration-300 origin-top z-50",
              isMegaMenuOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-4 invisible"
            )}>
              {services.map((section) => (
                <div key={section.category} className="space-y-6">
                  <div className="flex items-center gap-3 text-brand">
                    <section.icon size={20} />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">{section.category}</h3>
                  </div>
                  <ul className="space-y-4">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link 
                          href={item.href} 
                          className="text-sm font-semibold text-text-dim hover:text-brand hover:translate-x-1 transition-all flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-brand-subtle rounded-full" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              <div className="col-span-3 pt-8 border-t border-stroke mt-4 flex items-center justify-between">
                <p className="text-xs font-bold text-text-soft uppercase tracking-widest italic">Operating System: Systems, Not Trends.</p>
                <Link href="/services" className="text-xs font-black text-brand uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform">
                  Explore full capabilities <Box size={14} />
                </Link>
              </div>
            </div>
          </div>

          <Link 
            href="/portfolio" 
            className={cn(
              "text-sm font-bold uppercase tracking-widest transition-colors",
              pathname === "/portfolio" ? "text-brand" : "text-text-main hover:text-brand"
            )}
          >
            Work
          </Link>
          
          <Link 
            href="/about" 
            className={cn(
              "text-sm font-bold uppercase tracking-widest transition-colors",
              pathname === "/about" ? "text-brand" : "text-text-main hover:text-brand"
            )}
          >
            About
          </Link>

          <Link href="/#contact" className="btn-primary h-12 px-8 text-xs uppercase tracking-[0.2em] shadow-lg shadow-brand/20 active:scale-95">
            Book Call
          </Link>
        </div>

        <button className="lg:hidden p-2 text-text-main active:scale-90 transition-transform">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>
    </nav>
  );
}
