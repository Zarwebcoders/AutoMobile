"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const MissionVision = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0066b2] p-16 md:p-24 flex flex-col items-center text-center justify-center space-y-6"
          >
            <h2 className="text-4xl font-black text-white uppercase tracking-tight">Our mission</h2>
            <p className="text-blue-100 text-lg font-medium leading-relaxed max-w-sm">
              Helping our clients to live our day and they'll lead a better our life.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#003d6b] p-16 md:p-24 flex flex-col items-center text-center justify-center space-y-6"
          >
            <h2 className="text-4xl font-black text-white uppercase tracking-tight">Our vision</h2>
            <p className="text-blue-100 text-lg font-medium leading-relaxed max-w-sm">
              To become the global leader for automotive solutions, providing the best.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
