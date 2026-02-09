'use client';

import { clsx, type ClassValue } from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  brandName?: string;
  brandHighlighted?: string;
  logoUrl?: string;
  logoLetter?: string;
  logoComponent?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  navLinks?: { label: string; href: string }[];
  rightContent?: React.ReactNode;
  sticky?: boolean;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  brandName,
  brandHighlighted,
  logoUrl,
  logoLetter = brandName?.charAt(0).toUpperCase(),
  logoComponent,
  ctaText = "অর্ডার করুন",
  ctaHref = "#checkout",
  navLinks,
  rightContent,
  sticky = true,
  className,
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className={cn(
      sticky ? "sticky top-0" : "fixed top-0 left-0 right-0",
      "bg-white/80 backdrop-blur-md z-50 border-b border-gray-100/50",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {logoComponent ? (
            <a href="/">{logoComponent}</a>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden">
                {logoUrl ? (
                    <img src={logoUrl} alt={brandName} className="w-full h-full object-contain" />
                ) : (
                    <div className="w-full h-full bg-brand-dark flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{logoLetter}</span>
                    </div>
                )}
              </div>
              <a href="/" className="font-black text-2xl tracking-tighter uppercase whitespace-nowrap">
                <span className="text-brand-primary">{brandName}</span>
                {brandHighlighted && (
                    <span className="text-brand-accent">{brandHighlighted}</span>
                )}
              </a>
            </div>
          )}

          {/* Desktop Nav Links */}
          {navLinks && navLinks.length > 0 && (
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href} 
                  className="text-xs font-bold uppercase tracking-widest text-brand-text/60 hover:text-brand-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className={cn(
            "items-center gap-4",
            navLinks && navLinks.length > 0 ? "flex" : "hidden sm:flex"
          )}>
            {rightContent}
            {!rightContent && (
              <a 
                href={ctaHref} 
                className="bg-brand-primary text-white px-4 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/20 whitespace-nowrap"
              >
                {ctaText}
              </a>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          {navLinks && navLinks.length > 0 && (
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-brand-text/60"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && navLinks && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-bold uppercase tracking-widest text-brand-text/80 py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
