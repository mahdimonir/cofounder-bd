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
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);

  // Scroll to hide logic
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      // Always show at the very top
      if (currentScrollY < 50) {
        setIsVisible(true);
      } 
      // If scrolled down significantly (threshold of 10px)
      else if (scrollDelta > 10) {
        setIsVisible(false);
      } 
      // If scrolled up significantly (threshold of 10px)
      else if (scrollDelta < -10) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={cn(
        sticky ? "fixed top-0 left-0 right-0 transition-transform duration-300" : "relative",
        sticky && !isVisible && "-translate-y-full",
        "bg-white/80 backdrop-blur-md z-[9999] border-b border-gray-100/50",
        className
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {logoComponent ? (
              <a href="/" className="flex items-center">{logoComponent}</a>
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
            <div className="flex items-center gap-4">
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
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-brand-text/60 hover:text-brand-primary transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap when navbar is fixed */}
      {sticky && <div className="h-16" />}

      {/* Side Drawer Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 pointer-events-none",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto z-[10000]" : "opacity-0"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Slide-in Drawer */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-screen w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col pointer-events-auto",
          isMobileMenuOpen ? "translate-x-0 z-[10001]" : "translate-x-full z-[10001]"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <span className="font-bold text-lg uppercase tracking-widest text-gray-400">Menu</span>
          <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col py-6 overflow-y-auto">
          {navLinks && navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-brand-text/80 hover:bg-brand-primary/5 hover:text-brand-primary transition-all border-l-4 border-transparent hover:border-brand-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-auto p-6 border-t border-gray-100">
             <a 
                href={ctaHref} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-brand-primary text-white py-4 rounded-xl flex items-center justify-center font-bold uppercase tracking-widest shadow-lg shadow-brand-primary/20"
              >
                {ctaText}
              </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
