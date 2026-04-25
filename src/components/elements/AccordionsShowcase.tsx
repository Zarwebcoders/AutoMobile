"use client";

import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, List, Menu as MenuIcon, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AccordionsShowcase = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [openIdx2, setOpenIdx2] = useState<number | null>(0);

  const faqs = [
    { q: 'Do you have my product in stock?', a: 'On each individual product page there is a stock level indicator to show what is available. We do not display out of stock items. If you have seen something on our site and can no longer find it, or have ordered the item in the past, it’s always worth a phone call to find out when new stock will be arriving.' },
    { q: 'Do you deliver the Next Day?', a: 'Next day delivery is available on most items when ordered before 2 PM GMT.' },
    { q: 'What delivery options do you offer?', a: 'We offer Standard, Express, and Click & Collect services.' },
    { q: 'How do I know when my order has been dispatched?', a: 'You will receive an email with tracking details once your order has left our warehouse.' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 space-y-24">
        
        {/* Accordions Section */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-black font-oswald text-dark-blue uppercase tracking-tight">Tabs, Accordion and more</h3>
            <div className="h-1 w-20 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Style Blue (Outline) */}
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className={cn("border-2 rounded-2xl overflow-hidden transition-all", openIdx === i ? "border-blue-600" : "border-slate-100")}>
                  <button 
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className={cn("w-full px-8 py-6 flex items-center justify-between text-left transition-colors", openIdx === i ? "bg-white text-blue-600" : "bg-white text-dark-blue hover:bg-slate-50")}
                  >
                    <span className="text-sm font-black uppercase tracking-tight">{faq.q}</span>
                    <ChevronDown size={20} className={cn("transition-transform duration-300", openIdx === i ? "rotate-180" : "")} />
                  </button>
                  {openIdx === i && (
                    <div className="px-8 pb-8 text-gray-400 text-sm leading-relaxed animate-in slide-in-from-top-2 duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Style Yellow (Filled) */}
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className={cn("rounded-2xl overflow-hidden shadow-xl transition-all", openIdx2 === i ? "shadow-accent/20" : "")}>
                  <button 
                    onClick={() => setOpenIdx2(openIdx2 === i ? null : i)}
                    className={cn("w-full px-8 py-6 flex items-center justify-between text-left transition-colors", openIdx2 === i ? "bg-accent text-dark-blue" : "bg-[#F8F9FA] text-dark-blue hover:bg-slate-100")}
                  >
                    <div className="flex items-center gap-4">
                      {i === 0 && <Plus size={18} />}
                      {i === 1 && <Minus size={18} />}
                      {i === 2 && <List size={18} />}
                      {i === 3 && <Users size={18} />}
                      <span className="text-sm font-black uppercase tracking-tight">{faq.q}</span>
                    </div>
                    <ChevronDown size={20} className={cn("transition-transform duration-300", openIdx2 === i ? "rotate-180" : "")} />
                  </button>
                  {openIdx2 === i && (
                    <div className="bg-white px-8 py-8 text-gray-500 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action List Section */}
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex justify-center gap-4">
            <button className="flex-1 max-w-[200px] h-14 border-2 border-blue-600 text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Icon list</button>
            <button className="flex-1 max-w-[200px] h-14 bg-[#F8F9FA] border border-gray-100 text-dark-blue rounded-xl text-xs font-black uppercase tracking-widest hover:border-accent transition-all">Menu list</button>
            <button className="flex-1 max-w-[200px] h-14 bg-[#F8F9FA] border border-gray-100 text-dark-blue rounded-xl text-xs font-black uppercase tracking-widest hover:border-accent transition-all">Clients/Brands</button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
            {[1, 2, 3, 4].map((col) => (
              <div key={col} className="space-y-4">
                {[1, 2].map((row) => (
                  <div key={row} className="flex items-start gap-4 group cursor-pointer">
                    <div className="mt-1 w-5 h-5 rounded-md border-2 border-accent flex items-center justify-center shrink-0 group-hover:bg-accent transition-all">
                      <Plus size={10} className="text-dark-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <h6 className="text-xs font-black text-dark-blue tracking-tight hover:text-accent transition-colors">Regular Maintenance Included</h6>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Oil Changes 2 per year</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
