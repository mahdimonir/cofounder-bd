'use client';

import { FAQAccordion } from '@cofounder/ui';
import React, { useState } from 'react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    return (
        <section id="faq" className="py-12 md:py-24 bg-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
                <h2 className="text-center text-3xl font-black text-brand-dark mb-16">সাধারণ কিছু প্রশ্ন</h2>
                <div className="space-y-4">
                    {FAQS.map((item, idx) => (
                        <FAQAccordion 
                            key={idx} 
                            item={item} 
                            isOpen={activeFaq === idx}
                            onToggle={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
