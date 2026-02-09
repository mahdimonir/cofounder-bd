'use client';

import Image from 'next/image';
import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon-only';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon/Image */}
      <div className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden">
        <Image src="/logo.png" alt="Bengol Sale" width={32} height={32} className="object-contain" />
      </div>
      
      {/* Brand Name */}
      {variant === 'full' && (
        <span className="font-black text-2xl tracking-tighter uppercase whitespace-nowrap">
          <span className="text-brand-dark">Bengol {" "}</span>
          <span className="text-brand-primary">Sale</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
