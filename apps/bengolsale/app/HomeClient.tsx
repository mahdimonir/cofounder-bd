'use client';

import { useRef } from 'react';
import Checkout from './components/Checkout';
import FAQ from './components/FAQ';
import Features from './components/Features';
import Hero from './components/Hero';
import MobileCTA from './components/MobileCTA';
import SizeTable from './components/SizeTable';

interface HomeClientProps {
  initialProducts: any[];
}

export default function HomeClient({ initialProducts }: { initialProducts: any[] }) {
  const formRef = useRef<HTMLDivElement>(null);
  
  const scrollToCheckout = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <main>
        <Hero scrollToCheckout={scrollToCheckout} total={0} />
        <Checkout formRef={formRef} initialProducts={initialProducts} />
        <Features />
        <SizeTable />
        <FAQ />
      </main>
      <MobileCTA total={0} scrollToCheckout={scrollToCheckout} />
    </>
  );
}
