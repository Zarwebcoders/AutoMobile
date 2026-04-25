"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const AirFilterBanner = () => {
  return (
    <section className="py-6 bg-white lg:hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="relative h-[250px] md:h-[350px] bg-[#ea1d22] rounded-3xl md:rounded-[40px] overflow-hidden flex flex-col justify-center group p-8 md:p-12"
        >
          <div className="relative z-10 max-w-[60%] md:max-w-md">
            <h3 className="text-3xl md:text-6xl font-black text-black uppercase tracking-tight leading-none mb-3">
              AIR FILTERS
            </h3>
            <p className="text-black font-bold text-sm md:text-lg mb-8 uppercase tracking-widest opacity-80">
              Premium quality
            </p>
            <Link 
              href="/shop?q=air+filter"
              className="inline-flex items-center justify-center bg-white text-black px-6 py-3 rounded-xl font-black hover:bg-black hover:text-white transition-all text-sm shadow-md gap-3 w-fit"
            >
              Shop now
              <ArrowRight size={18} strokeWidth={3} />
            </Link>
          </div>
          
          {/* Asset Image */}
          <div className="absolute right-[-10%] bottom-[-5%] w-[220px] h-[220px] md:w-[320px] md:h-[320px] z-0 transition-transform duration-700 group-hover:scale-105">
             <img 
               src="https://enovathemes.com/mobex/wp-content/uploads/Air-conditioning.webp" 
               alt="Air Filter"
               className="w-full h-full object-contain"
             />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
