'use client';

import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon-only';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon */}
      <div className="w-9 h-9 rounded-2xl bg-gray-900 flex items-center justify-center shadow-lg shadow-gray-200 transform group-hover:scale-105 transition-all">
        <span className="text-white font-black text-xl">S</span>
      </div>
      
      {/* Brand Name */}
      {variant === 'full' && (
        <span className="font-extrabold text-xl tracking-widest uppercase whitespace-nowrap ml-2">
          <span className="text-gray-900">StyleHunt</span>
          <span className="text-gray-500 font-light">BD</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
