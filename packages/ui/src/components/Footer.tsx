'use client';

import { clsx, type ClassValue } from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import CoFounderBranding from './CoFounderBranding';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FooterProps {
  brandName?: string;
  brandHighlighted?: string;
  tagline?: string;
  supportPhone?: string;
  socialLinks?: { icon: React.FC<any>; href: string }[];
  logoComponent?: React.ReactNode;
  className?: string;
  variant?: 'simple' | 'full';
}

const Footer: React.FC<FooterProps> = ({
  brandName,
  brandHighlighted,
  tagline,
  supportPhone,
  socialLinks,
  logoComponent,
  className,
  variant = 'full',
}: FooterProps) => {
  if (variant === 'simple') {
    return (
      <footer className={cn(
        "bg-white text-gray-600 py-10 px-4 sm:px-6 border-t border-gray-100",
        className
      )}>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 text-center text-brand-text/70">
            {logoComponent ? (
              <div>{logoComponent}</div>
            ) : (
              <p className="font-bold text-lg text-brand-text">
                <span className='text-brand-primary'>{brandName}{" "}</span>
                {brandHighlighted && (
                    <span className="text-brand-accent">{brandHighlighted}</span>
                )}
              </p>
            )}
            {supportPhone && (
                <p className="text-xs">Order Hotline: <span className="font-bold">{supportPhone}</span></p>
            )}
            <CoFounderBranding text={`© ${new Date().getFullYear()} All rights reserved • Co-Founder BD`} />
        </div>
      </footer>
    );
  }

  return (
    <footer className={cn(
      "bg-white text-brand-text py-16 px-4 border-t border-brand-muted",
      className
    )}>
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-12 text-center">
          {logoComponent ? (
            <div>{logoComponent}</div>
          ) : (
            <div className="space-y-4">
              <p className="font-black text-3xl tracking-tighter uppercase">
                <span className="text-brand-primary">{brandName}</span>
                {brandHighlighted && (
                    <span className="text-brand-accent">{brandHighlighted}</span>
                )}
              </p>
              {tagline && (
                <p className="text-sm text-brand-text/50 font-medium max-w-sm mx-auto leading-relaxed">{tagline}</p>
              )}
            </div>
          )}

          {/* Social Links - Full Ecommerce Only */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex items-center gap-6">
              {socialLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href}
                  className="w-10 h-10 rounded-full bg-brand-muted/50 flex items-center justify-center text-brand-text/30 hover:text-brand-primary hover:bg-brand-primary/5 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          )}

          <div className="space-y-6 w-full pt-12 border-t border-brand-muted">
            {supportPhone && (
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-text/30 block">Customer Support</span>
                  <p className="text-lg font-black text-brand-text">{supportPhone}</p>
                </div>
            )}
            <CoFounderBranding text={`© ${new Date().getFullYear()} All rights reserved • Co-Founder BD`} />
          </div>
      </div>
    </footer>
  );
};

export default Footer;
