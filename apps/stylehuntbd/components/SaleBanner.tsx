"use client";

import { Moon, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SaleBanner() {
  return (
    <div className="relative group overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white py-2 px-4">
      {/* Animated Shimmer Effect */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
      
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center relative z-10">
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            Ramadan <span className="text-amber-400 font-bold uppercase">Mubarak!</span>
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <p className="text-[10px] sm:text-xs font-light text-emerald-100/80">
            Celebrate with <span className="text-white font-bold underline decoration-amber-400/50 underline-offset-4 decoration-2">20% OFF</span> everything
          </p>
          
          <Link 
            href="/shop"
            className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-tighter transition-all hover:scale-105 active:scale-95"
          >
            Shop Sale <Sparkles className="w-3 h-3 text-amber-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
