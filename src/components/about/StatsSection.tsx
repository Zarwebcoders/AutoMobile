"use client";

import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: "500+", label: "Items" },
  { value: "16", label: "Years" },
  { value: "200k", label: "Products" },
  { value: "15k", label: "Customers" },
  { value: "100+", label: "Manufacturers" },
];

export const StatsSection = () => {
  return (
    <section className="bg-accent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-dark-blue/10">
          {STATS.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="py-12 px-8 flex flex-col items-center justify-center text-center space-y-1"
            >
              <div className="text-5xl font-black text-dark-blue tracking-tighter italic font-oswald">
                {s.value}
              </div>
              <div className="text-xs font-black text-dark-blue/60 uppercase tracking-widest">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
