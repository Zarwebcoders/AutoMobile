"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { name: 'Electrics', image: 'https://enovathemes.com/mobex/wp-content/uploads/Electrics.webp' },
  { name: 'Engine', image: 'https://enovathemes.com/mobex/wp-content/uploads/Engine.webp' },
  { name: 'Filters', image: 'https://enovathemes.com/mobex/wp-content/uploads/Air-conditioning.webp' },
  { name: 'Interior', image: 'https://enovathemes.com/mobex/wp-content/uploads/Interior.webp' },
  { name: 'Fluids', image: 'https://enovathemes.com/mobex/wp-content/uploads/Oils-and-fluids.webp' },
  { name: 'Brakes', image: 'https://enovathemes.com/mobex/wp-content/uploads/Brakes.webp' },
  { name: 'Body Parts', image: 'https://enovathemes.com/mobex/wp-content/uploads/Body.webp' },
  { name: 'Care Kit', image: 'https://enovathemes.com/mobex/wp-content/uploads/Care-Kit.webp' },
  { name: 'Damping', image: 'https://enovathemes.com/mobex/wp-content/uploads/Damping.webp' },
];

export const CategoryIcons = () => {
  return (
    <div className="w-full py-10 overflow-x-auto no-scrollbar">
      <div className="flex items-start gap-4 md:gap-8 justify-center min-w-max px-4">
        {CATEGORIES.map((cat, idx) => (
          <motion.div 
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <Link href={`/shop?query=${encodeURIComponent(cat.name)}`} className="flex flex-col items-center gap-4">
              <div className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full bg-white/10 flex items-center justify-center p-3 md:p-5 transition-all duration-500 group-hover:bg-accent/20 overflow-hidden relative shadow-2xl border border-white/5 backdrop-blur-sm">
                 <img 
                   src={cat.image} 
                   alt={cat.name} 
                   className="w-full h-full object-contain z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
                 />
                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              </div>
              <h4 className="text-[12px] md:text-[14px] font-black text-white uppercase tracking-wider text-center transition-colors group-hover:text-accent font-sans">
                {cat.name}
              </h4>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
