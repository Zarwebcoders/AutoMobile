"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, FileDown } from 'lucide-react';
import Link from 'next/link';

export const SpecialBuys = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative w-full h-auto min-h-[450px] md:h-[360px] rounded-3xl md:rounded-[4rem] flex flex-col items-center justify-center shadow-xl bg-dark-blue overflow-hidden p-8 md:p-16"
        >
          <div className="absolute inset-0 bg-[url('/images/special-buys-bg.png')] bg-cover bg-center opacity-40 mix-blend-overlay" />
          {/* Product Image - Top on Mobile, Left on Desktop */}
          <div className="relative md:absolute md:left-20 md:top-1/2 md:-translate-y-1/2 w-full max-w-[320px] md:max-w-[500px] mb-8 md:mb-0 z-20 pointer-events-none">
            <img 
              src="https://enovathemes.com/mobex/wp-content/uploads/banner13-img.webp" 
              alt="Special Buys Products"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Content Group - Centered on Mobile, Right on Desktop */}
          <div className="relative z-30 flex flex-col items-center md:items-end w-full md:ml-auto md:max-w-md space-y-6 md:space-y-4">
            <div className="text-center md:text-right space-y-1">
              <span className="text-[11px] md:text-[13px] font-black uppercase text-white tracking-[0.2em]">
                One Time Special
              </span>
              <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                BUYS
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href="/shop"
                className="bg-black text-white px-10 py-4 rounded-xl text-sm font-black uppercase hover:bg-white hover:text-black transition-all shadow-xl flex items-center justify-center gap-3 w-fit"
              >
                Shop now
                <ChevronRight size={18} strokeWidth={3} />
              </Link>
              <a 
                href="/Catalogue.pdf"
                download
                className="bg-accent text-dark-blue px-10 py-4 rounded-xl text-sm font-black uppercase hover:bg-white hover:text-dark-blue transition-all shadow-xl flex items-center justify-center gap-3 w-fit"
              >
                Catalogue
                <FileDown size={18} strokeWidth={3} />
              </a>
            </div>

            <p className="text-[12px] md:text-[14px] font-bold text-white uppercase tracking-widest opacity-80 text-center md:text-right">
              Good Values. Always.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
