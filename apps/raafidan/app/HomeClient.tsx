'use client';

import { Checkout } from "@/components/sections/Checkout";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhySection } from "@/components/sections/WhySection";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useRef } from 'react';

interface HomeClientProps {
  initialProducts: any[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
  const formRef = useRef<HTMLDivElement>(null);
  
  const scrollToCheckout = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      <HeroSection onOrderClick={scrollToCheckout} />
      <RevealOnScroll delay={0.1}><TrustStrip /></RevealOnScroll>
      
      <Checkout formRef={formRef} initialProducts={initialProducts} />
      
      <RevealOnScroll><WhySection /></RevealOnScroll>
      <RevealOnScroll><FAQSection /></RevealOnScroll>
    </main>
  );
}
