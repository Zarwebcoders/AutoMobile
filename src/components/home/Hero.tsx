"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { VehicleSelector } from './VehicleSelector';
import { CategoryIcons } from './CategoryIcons';

export const Hero = () => {
  return (
    <section className="relative min-h-[700px] hidden lg:flex flex-col items-center pt-24 pb-12 bg-dark-blue overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Select your car
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            Over 300.000 auto parts and accessories
          </p>
        </motion.div>

        {/* Vehicle Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full mb-16"
        >
          <VehicleSelector />
        </motion.div>

        {/* Categories */}
        <div className="w-full">
          <CategoryIcons />
        </div>
      </div>
    </section>
  );
};
