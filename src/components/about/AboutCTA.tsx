"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Megaphone } from 'lucide-react';

export const AboutCTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#F8F9FA] rounded-[40px] p-12 flex flex-col items-start gap-8 border border-gray-100/50 hover:bg-dark-blue transition-all duration-500 overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-dark-blue transition-all">
                <Users size={32} />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-dark-blue uppercase tracking-tight italic font-oswald group-hover:text-white transition-colors">
                Join the <span className="text-accent">Mobex Crew</span>
              </h3>
              <p className="text-gray-500 font-medium group-hover:text-blue-100/70 transition-colors">
                Great team works well with our different skillsets for our customers.
              </p>
            </div>
            <button className="h-12 px-10 bg-dark-blue text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-accent hover:text-dark-blue transition-all group-hover:bg-accent group-hover:text-dark-blue">
                Apply now
            </button>
            {/* Background Icon */}
            <Users className="absolute -bottom-10 -right-10 w-48 h-48 text-dark-blue/[0.03] group-hover:text-white/[0.03] transition-colors" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#F8F9FA] rounded-[40px] p-12 flex flex-col items-start gap-8 border border-gray-100/50 hover:bg-accent transition-all duration-500 overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-dark-blue group-hover:bg-dark-blue group-hover:text-white transition-all">
                <Megaphone size={32} />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-dark-blue uppercase tracking-tight italic font-oswald">
                Learn more <span className="text-white group-hover:text-dark-blue transition-colors">about Mobex</span>
              </h3>
              <p className="text-gray-500 font-medium group-hover:text-dark-blue/70 transition-colors">
                Great team works well with our different skillsets for our customers.
              </p>
            </div>
            <button className="h-12 px-10 bg-dark-blue text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-dark-blue transition-all">
                Read more
            </button>
            {/* Background Icon */}
            <Megaphone className="absolute -bottom-10 -right-10 w-48 h-48 text-dark-blue/[0.03] group-hover:text-dark-blue/[0.03] transition-colors" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
