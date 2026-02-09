'use client';

import { Ruler } from 'lucide-react';
import React from 'react';

const SizeTable: React.FC = () => {
  return (
    <section className="py-12 md:py-24 bg-brand-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-black text-brand-dark mb-2">সাইজ মেজারমেন্ট</h2>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
            <Ruler className="w-4 h-4" /> ইঞ্চি (Inches)
          </div>
        </div>
        <div className="bg-brand-muted rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 sm:p-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Size</th>
                <th className="p-4 sm:p-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Length</th>
                <th className="p-4 sm:p-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Chest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {['M - 28" - 40"', 'L - 29" - 42"', 'XL - 31" - 44"'].map((row, idx) => {
                const [s, l, c] = row.split(' - ');
                return (
                  <tr key={idx} className="hover:bg-white transition">
                    <td className="p-4 sm:p-6 font-bold text-brand-dark">{s}</td>
                    <td className="p-4 sm:p-6 text-gray-500 text-sm">{l}</td>
                    <td className="p-4 sm:p-6 text-gray-500 text-sm">{c}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SizeTable;
