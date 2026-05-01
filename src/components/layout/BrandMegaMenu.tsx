"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Part manufacturer logos with verified Mobex asset paths
const BRANDS = [
  { name: 'JPM', color: 'bg-[#BC3120]', pdf: '/assets/JPM.pdf' },
  { name: 'MK', color: 'bg-[#2D8F4E]', pdf: '/assets/MK.pdf' },
  { name: 'ROYAL ENFIELD', color: 'bg-[#034C8C]', pdf: '/assets/ROYALENFIELD.pdf' },
  { name: 'SPACO', color: 'bg-[#F2C94C]', pdf: '/assets/SPACO.pdf' },
  { name: 'Varroc', color: 'bg-[#6FCF97]', pdf: '/assets/Varroc.pdf' },
  { name: 'YANGO', color: 'bg-[#EB5757]', pdf: '/assets/YANGO.pdf' },
];



interface BrandMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandMegaMenu = ({ isOpen, onClose }: BrandMegaMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-100 flex justify-center pt-1">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            onMouseLeave={onClose}
            className="relative w-full max-w-[1300px] h-fit bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden border border-gray-100 rounded-b-xl"
          >
            <div className="p-10 md:p-12">
              <h3 className="text-xl md:text-2xl font-black text-[#034C8C] uppercase tracking-tighter mb-10">
                Featured manufacturers
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {BRANDS.map((brand, i) => (
                  <Link 
                    key={i} 
                    href={brand.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className={`group relative ${brand.color} aspect-video flex items-center justify-center p-6 cursor-pointer hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden border border-white/10`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <span className="text-white text-lg md:text-xl font-black uppercase tracking-tighter drop-shadow-md text-center">
                      {brand.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
