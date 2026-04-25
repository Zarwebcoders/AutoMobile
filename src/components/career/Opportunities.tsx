"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const JOBS = [
  { 
    title: "Ecommerce Web Developer (Full-stack) - 10+ years exp", 
    category: "Development",
    desc: "We are looking for a senior full-stack developer with extensive experience in Next.js, Node.js, and high-performance e-commerce architectures." 
  },
  { 
    title: "Finance and Office Assistant", 
    category: "Finance",
    desc: "Help manage our daily financial operations and ensure office efficiency. Experience in accounting software required." 
  },
  { 
    title: "Hr Manager, Hr and Admin Assistant", 
    category: "HR",
    desc: "Join our HR team to help manage talent acquisition, employee relations, and administrative tasks." 
  },
  { 
    title: "Senior Engineering Manager", 
    category: "Engineering",
    desc: "Lead our engineering team in building the future of automotive technology. Previous leadership experience is a must." 
  },
];

export const Opportunities = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl font-black text-dark-blue uppercase tracking-tight italic font-oswald">Opportunities</h2>
          <div className="w-16 h-1 bg-accent rounded-full"></div>
        </div>

        <div className="space-y-4 max-w-4xl">
          {JOBS.map((job, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-accent uppercase tracking-widest">{job.category}</span>
                  <h3 className="text-xl font-black text-dark-blue uppercase tracking-tighter italic font-oswald group-hover:text-accent transition-colors">
                    {job.title}
                  </h3>
                </div>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  openIndex === i ? "bg-accent text-dark-blue" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                )}>
                  {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 pt-2">
                       <div className="h-px bg-gray-50 mb-6" />
                       <div className="space-y-6">
                         <p className="text-gray-500 font-medium leading-relaxed">
                            {job.desc}
                         </p>
                         <button className="h-12 px-10 bg-dark-blue text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-accent hover:text-dark-blue transition-all">
                            Apply for this position
                         </button>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
