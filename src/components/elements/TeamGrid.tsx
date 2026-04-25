"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const TeamGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const members = [
    { name: 'John Anderson', role: 'Expert Mechanic', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600' },
    { name: 'Liam Turner', role: 'Lead Specialist', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600' },
    { name: 'Alex Smith', role: 'Tire Specialist', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600' },
    { name: 'Taylor Laurent', role: 'Quality Analyst', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=600' },
    { name: 'Michael Chen', role: 'Service Manager', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 space-y-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-4xl font-black font-oswald text-dark-blue uppercase tracking-tight">Persons</h3>
          <div className="h-1 w-20 bg-accent" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {members.map((member, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group overflow-hidden rounded-[40px] aspect-[4/5] bg-slate-200 relative shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={member.img} 
                alt={member.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" 
              />
              {/* Overlay with permanent visibility for accessibility, but stronger on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/90 via-dark-blue/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 lg:p-8">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                   <p className="text-white font-black font-oswald uppercase text-lg lg:text-xl leading-tight">{member.role}</p>
                   <p className="text-accent text-[10px] font-black uppercase tracking-widest mt-1 opacity-80 group-hover:opacity-100">{member.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
