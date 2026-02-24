'use client';

import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon-only';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
        <span className="text-white font-black text-xl italic tracking-tighter">T</span>
      </div>
      
      {/* Brand Name */}
      {variant === 'full' && (
        <span className="hidden sm:inline-flex font-bold text-lg sm:text-xl tracking-tight uppercase items-center ml-1">
          <span className="text-gray-900">Tuhin's</span>
          <span className="text-blue-600 ml-1.5 font-black">Collection</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
