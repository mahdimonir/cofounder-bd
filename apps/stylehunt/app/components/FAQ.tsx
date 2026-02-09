'use client';

import { FAQAccordion } from '@cofounder/ui';
import React, { useState } from 'react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
                <h2 className="text-2xl font-semibold text-center mb-16">Frequently Asked Questions</h2>
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
