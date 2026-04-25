"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

import { getFAQs } from '@/lib/api';

interface FAQItem {
  q: string;
  a: string;
  id: string;
}

interface FAQSection {
  category: string;
  questions: FAQItem[];
}

export const FAQContent = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getFAQs();
        setFaqs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Group FAQs by category
  const groupedFAQs = faqs.reduce((acc: Record<string, FAQItem[]>, faq: any) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push({ q: faq.question, a: faq.answer, id: faq._id });
    return acc;
  }, {});

  const FAQ_SECTIONS: FAQSection[] = Object.keys(groupedFAQs).map(category => ({
    category,
    questions: groupedFAQs[category]
  }));

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-20">
          {FAQ_SECTIONS.map((section: FAQSection, sidx: number) => (
            <div key={sidx} className="space-y-10">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">Category</span>
                <h2 className="text-4xl font-black text-dark-blue uppercase tracking-tight italic font-oswald">{section.category}</h2>
                <div className="w-12 h-1 bg-accent rounded-full mt-2"></div>
              </div>

              <div className="space-y-4">
                {section.questions.map((item: FAQItem, qidx: number) => {
                  const key = `${sidx}-${qidx}`;
                  const isOpen = openKey === key;
                  
                  return (
                    <div key={key} className="bg-[#F8F9FA] rounded-[24px] overflow-hidden border border-transparent hover:border-accent/20 transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-200/50">
                      <button 
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        className="w-full px-8 py-6 flex items-center justify-between text-left group"
                      >
                        <h3 className={cn(
                          "text-[15px] font-black uppercase tracking-tight transition-colors",
                          isOpen ? "text-accent" : "text-dark-blue group-hover:text-accent"
                        )}>
                          {item.q}
                        </h3>
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                          isOpen ? "bg-accent text-dark-blue" : "bg-white text-gray-400 group-hover:bg-gray-100 shadow-sm"
                        )}>
                          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-8 pb-8 pt-2">
                               <div className="h-px bg-gray-100 mb-6" />
                               <p className="text-gray-500 font-medium leading-relaxed">
                                  {item.a}
                                </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
