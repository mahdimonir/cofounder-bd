'use client';

import { clsx, type ClassValue } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  item: { question: string; answer: string };
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const FAQAccordion = ({ 
  item, 
  className, 
  isOpen: controlledIsOpen, 
  onToggle 
}: FAQAccordionProps) => {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : localIsOpen;
  const handleToggle = onToggle || (() => setLocalIsOpen(!localIsOpen));

  return (
    <div className={cn(
      "bg-white mb-3 rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:border-brand-primary/20",
      className
    )}>
      <button 
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
      >
        <span className="font-bold text-brand-dark text-sm leading-relaxed">{item.question}</span>
        <div className={cn(
          "p-1.5 rounded-full transition-transform duration-300",
          isOpen ? 'bg-brand-primary/10 text-brand-primary rotate-180' : 'bg-gray-50 text-gray-400'
        )}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-gray-500 text-sm leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQAccordion;
