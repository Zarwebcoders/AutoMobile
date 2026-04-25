"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const NewsletterCTA = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="bg-[#ea1d22] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative">
          
          {/* Decorative elements to match premium feel */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-dark-blue/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="space-y-4 md:space-y-6 text-center lg:text-left relative z-10">
            <h4 className="text-3xl md:text-5xl font-black text-dark-blue font-oswald uppercase italic leading-tight">Get Exclusive Savings</h4>
            <p className="text-sm md:text-xl text-dark-blue/80 font-bold uppercase tracking-tighter">Join over half a million tools lovers</p>
          </div>

          <div className="w-full lg:w-1/2 space-y-4 relative z-10">
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="First name" 
                className="flex-1 h-14 md:h-16 rounded-2xl md:rounded-3xl border-none px-6 text-base font-bold shadow-xl focus:ring-4 focus:ring-dark-blue/10 outline-none placeholder:text-gray-400" 
              />
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 h-14 md:h-16 rounded-2xl md:rounded-3xl border-none px-6 text-base font-bold shadow-xl focus:ring-4 focus:ring-dark-blue/10 outline-none placeholder:text-gray-400" 
              />
            </div>
            <Button className="w-full h-16 md:h-20 bg-dark-blue text-white hover:bg-black font-black uppercase text-sm md:text-base rounded-2xl md:rounded-3xl shadow-2xl mt-2 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1">
              Subscribe <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            <p className="text-[10px] md:text-xs text-dark-blue/60 font-bold text-center lg:text-left mt-6 leading-tight uppercase tracking-widest">
              By signing up you agree to receive emails from MOBEX®
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
