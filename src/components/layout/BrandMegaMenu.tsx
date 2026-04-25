"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Part manufacturer logos with verified Mobex asset paths
const BRANDS = [
  { name: 'VICMA', color: 'bg-[#BC3120]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/vicma.svg' },
  { name: 'CASTROL', color: 'bg-[#2D8F4E]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/castrol.svg', noInvert: true },
  { name: 'RAVENOL', color: 'bg-[#034C8C]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/ravenol.svg', noInvert: true },
  { name: 'ALANKO', color: 'bg-[#F2C94C]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/alanko.svg', noInvert: true },
  { name: 'TRICSAN', color: 'bg-[#6FCF97]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/tricsan.svg' },
  { name: 'ABAKUS', color: 'bg-[#EB5757]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/abakus.svg' },
  { name: 'BLIC', color: 'bg-[#F2994A]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/blic.svg' },
  { name: 'BOSCH', color: 'bg-[#E08F8F]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/bosch.svg' },
  { name: 'DAYCO', color: 'bg-[#824E6E]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/dayco.svg' },
  { name: 'LEOPLAST', color: 'bg-[#FFFFFF]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/leoplast.svg', dark: true },
  { name: 'STARK', color: 'bg-[#333333]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/stark.svg' },
  { name: 'DT', color: 'bg-[#EB984E]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/dt.svg' },
  { name: 'RIDEX', color: 'bg-[#2F80ED]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/ridex.svg' },
  { name: 'PETEK', color: 'bg-[#9B51E0]', logo: 'https://enovathemes.com/mobex/wp-content/uploads/petek.svg', noInvert: true },
];

const CATEGORIES = [
  { name: 'Body', image: 'https://enovathemes.com/mobex/wp-content/uploads/Body.webp' },
  { name: 'Brakes', image: 'https://enovathemes.com/mobex/wp-content/uploads/Brakes.webp' },
  { name: 'Care Kit', image: 'https://enovathemes.com/mobex/wp-content/uploads/Care-Kit.webp' },
  { name: 'Damping', image: 'https://enovathemes.com/mobex/wp-content/uploads/Damping.webp' },
  { name: 'Electrics', image: 'https://enovathemes.com/mobex/wp-content/uploads/Electrics.webp' },
  { name: 'Engine', image: 'https://enovathemes.com/mobex/wp-content/uploads/Engine.webp' },
  { name: 'Filters', image: 'https://enovathemes.com/mobex/wp-content/uploads/Air-conditioning.webp' },
  { name: 'Interior', image: 'https://enovathemes.com/mobex/wp-content/uploads/Interior.webp' },
  { name: 'Fluids', image: 'https://enovathemes.com/mobex/wp-content/uploads/Oils-and-fluids.webp' },
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
                    href={`/shop?query=${encodeURIComponent(brand.name)}`}
                    onClick={onClose}
                    className={`group relative ${brand.color} aspect-video flex items-center justify-center p-6 cursor-pointer hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className={`max-w-[120px] max-h-full object-contain transition-all duration-300 group-hover:scale-110 ${(brand as any).noInvert || brand.dark ? '' : 'brightness-0 invert'} opacity-90 group-hover:opacity-100`}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Categories Section */}
            <div className="bg-[#034C8C] px-10 py-14">
              <div className="container mx-auto">
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-8 items-start justify-items-center">
                  {CATEGORIES.map((cat, i) => (
                    <Link 
                      key={i} 
                      href={`/shop?query=${encodeURIComponent(cat.name)}`}
                      onClick={onClose}
                      className="flex flex-col items-center gap-4 group cursor-pointer w-full max-w-[100px]"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ea1d22] transition-all duration-300 shadow-inner">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-10 h-10 md:w-12 md:h-12 object-contain filter drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <span className="text-white text-[10px] md:text-[11px] font-black uppercase tracking-widest text-center leading-tight group-hover:text-[#ea1d22] transition-colors">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
