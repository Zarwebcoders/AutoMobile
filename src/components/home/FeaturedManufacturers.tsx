"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const brands = [
  { name: 'JPM', color: 'bg-[#BC3120]', pdf: '/assets/JPM.pdf' },
  { name: 'MK', color: 'bg-[#2D8F4E]', pdf: '/assets/MK.pdf' },
  { name: 'SANDHAR', color: 'bg-[#034C8C]', pdf: '/assets/SANDHAR.pdf' },
  { name: 'ENDURANCE', color: 'bg-[#F2C94C]', pdf: '/assets/ENDURANCE.pdf' },
  { name: 'Varroc', color: 'bg-[#6FCF97]', pdf: '/assets/Varroc.pdf' },
  { name: 'YANGO', color: 'bg-[#EB5757]', pdf: '/assets/YANGO.pdf' },
];

export const FeaturedManufacturers = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-50">
      <div className="container mx-auto px-4">
        <h4 className="text-xl md:text-3xl font-black text-dark-blue mb-10 uppercase tracking-tighter">
          Shop by Brands
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link 
                href={brand.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center h-24 md:h-32 rounded-2xl border-2 border-transparent transition-all duration-300 shadow-sm hover:shadow-xl",
                  brand.color
                )}
              >
                <span className="text-white text-lg md:text-xl font-black uppercase tracking-tighter text-center px-4">
                  {brand.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
