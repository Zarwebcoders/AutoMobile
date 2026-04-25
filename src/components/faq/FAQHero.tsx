"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const FAQHero = () => {
  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-accent">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="FAQ Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/80 to-accent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-6xl md:text-7xl font-black text-dark-blue uppercase tracking-tighter italic font-oswald leading-none">
            How can we help you?
          </h1>
          <p className="text-lg text-dark-blue/60 font-black uppercase tracking-widest">
            Frequently asked questions
          </p>
        </motion.div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-[0.05] select-none pointer-events-none whitespace-nowrap">
         <h2 className="text-[12rem] font-black text-white uppercase italic tracking-tighter leading-none mb-[-2rem]">SUPPORT</h2>
      </div>
    </section>
  );
};
