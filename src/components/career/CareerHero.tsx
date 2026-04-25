"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export const CareerHero = () => {
  return (
    <section className="relative h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-dark">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Career Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-blue via-dark-blue/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl space-y-8"
        >
          <div className="space-y-2">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: 60 }}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="h-1.5 bg-accent rounded-full"
            />
            <h1 className="text-7xl md:text-8xl font-black text-white uppercase tracking-tighter italic font-oswald leading-none">
              Careers
            </h1>
          </div>
          
          <p className="text-xl text-blue-100/70 font-medium leading-relaxed max-w-xl">
             Join our mission to revolutionize the automotive parts industry. We're looking for passionate individuals who want to make a difference.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-16 px-12 bg-accent text-dark-blue font-black uppercase text-sm rounded-2xl flex items-center gap-4 shadow-2xl shadow-accent/30 transition-all hover:bg-white transition-all group"
          >
            Explore opportunities <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Mobex Logo Floating in Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none hidden lg:block">
         <h2 className="text-[30rem] font-black text-white uppercase italic tracking-tighter leading-none">MOBEX</h2>
      </div>
    </section>
  );
};
