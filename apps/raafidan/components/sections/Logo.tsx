'use client';

import Image from 'next/image';
import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon-only';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = '', className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon/Image */}
      <div className="relative h-12 w-auto min-w-[48px]">
        <Image 
          src="/logo.png" 
          alt="Raafidan" 
          width={180} 
          height={60} 
          className="h-full w-auto object-contain" 
          priority
        />
      </div>
      
      {/* Brand Name */}
      {variant === 'full' && (
        <span className="font-brand font-bold text-2xl tracking-tighter uppercase whitespace-nowrap text-brand-gold">
          RAAFIDAN
        </span>
      )}
    </div>
  );
};

export default Logo;
