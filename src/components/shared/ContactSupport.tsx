"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ChevronRight } from 'lucide-react';

export const ContactSupport = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-r from-dark-blue to-[#00528c] rounded-[40px] overflow-hidden p-12 lg:p-20 group shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic font-oswald leading-tight">
                Don't find what <span className="text-accent underline decoration-4 underline-offset-8">you're looking for?</span>
              </h2>
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest leading-none">Call us now</span>
                  <div className="text-4xl font-black text-white tracking-tighter italic font-oswald flex items-center gap-3">
                    <Phone className="text-accent w-8 h-8" />
                    +01 123 456 7890
                  </div>
                </div>
                <button className="h-16 px-12 bg-white text-dark-blue rounded-2xl font-black uppercase text-sm flex items-center gap-4 hover:bg-accent hover:text-dark-blue transition-all group/btn shadow-xl shadow-black/20 transform group-hover:-translate-y-1">
                   Contact us <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="relative">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                 whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
                 className="relative z-10"
               >
                 <img 
                   src="https://enovathemes.com/mobex/wp-content/uploads/about-team-img-6.webp" 
                   alt="Support Staff" 
                   className="w-full max-w-[500px] mx-auto filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                 />
               </motion.div>
               
               {/* Decorative Circles */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full -z-10 animate-[spin_20s_linear_infinite]" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/10 rounded-full -z-10 animate-[spin_30s_linear_infinite_reverse]" />
            </div>
          </div>
          
          {/* Background Branding */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] select-none pointer-events-none hidden lg:block">
            <h2 className="text-[15rem] font-black text-white uppercase italic tracking-tighter leading-none">HELP</h2>
          </div>
        </div>
      </div>
    </section>
  );
};
