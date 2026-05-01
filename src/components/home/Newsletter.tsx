"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Newsletter = () => {
  return (
    <section className="py-6 px-4 md:hidden">
      <motion.div 
        className="max-w-4xl mx-auto bg-[#ea1d22] rounded-3xl p-8 md:p-12"
      >
        <div className="space-y-2 mb-8">
          <h2 className="text-2xl md:text-4xl font-black text-black tracking-tight">
            Get Exclusive Savings
          </h2>
          <p className="text-black font-bold text-sm md:text-base opacity-80">
            Join over half a million tools lovers
          </p>
        </div>

        <form className="space-y-4 max-w-xl">
          <input 
            type="text" 
            placeholder="First name"
            className="w-full h-14 bg-white border-none rounded-xl px-6 text-black font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-dark-blue transition-all"
          />
          <input 
            type="email" 
            placeholder="Email address"
            className="w-full h-14 bg-white border-none rounded-xl px-6 text-black font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-dark-blue transition-all"
          />
          <button className="w-full h-14 bg-[#004b7c] text-white rounded-xl font-black uppercase text-sm flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg mt-2">
            Subscribe
            <ArrowRight size={18} strokeWidth={3} />
          </button>
        </form>

        <p className="mt-6 text-[10px] md:text-[11px] font-bold text-black opacity-80 uppercase tracking-wider">
          By signing up you agree to receive emails from Baladex Global
        </p>
      </motion.div>
    </section>
  );
};
