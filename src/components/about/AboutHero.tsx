"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export const AboutHero = () => {
  return (
    <section className="relative pt-20 pb-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-7xl font-black text-dark-blue uppercase tracking-tighter leading-none italic font-oswald">
              About <span className="text-accent">Mobex</span>
            </h1>
            <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-xl">
              Mobex Auto Parts - we've been happily supplying UV repair shops in worldwide across 100+ countries with best-quality products from top-tier brands, always progress.
            </p>
            <p className="text-gray-500 font-medium leading-relaxed max-w-xl">
              With our expertise, Mobex can provide your business/personal needs with the necessary advice, and then a superior service to maintain inventory, responsiveness of supply, and competitive selection service.
            </p>
            <p className="text-gray-500 font-medium leading-relaxed max-w-xl">
              Our professional team will work directly with you to ensure your goals are met. Our services include inventory management, on-time delivery, technical support, and the possibility of local delivery in many countries.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-10 bg-accent text-dark-blue font-black uppercase text-sm rounded-xl flex items-center gap-3 shadow-xl shadow-accent/20 transition-all hover:bg-dark-blue hover:text-white group"
            >
              Shop now <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Mobex Team" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/40 to-transparent"></div>
            </div>
            
            {/* Decors */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
