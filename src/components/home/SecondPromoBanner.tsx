"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export const SecondPromoBanner = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Lamps & Lights Banner */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="lg:col-span-2 relative rounded-4xl overflow-hidden min-h-[340px] flex flex-col justify-center p-12 group"
          style={{ 
            backgroundImage: 'url(https://enovathemes.com/mobex/wp-content/uploads/banner11-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          
          <div className="relative z-10 space-y-2 max-w-[60%]">
            <span className="bg-[#22C55E] text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider w-fit">
              Top Brands
            </span>
            <div className="space-y-0">
              <h3 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                LAMPS AND LIGHTS
              </h3>
              <h3 className="text-6xl md:text-7xl font-black text-[#ea1d22] leading-[0.9] uppercase tracking-tighter">
                MEGA SALE
              </h3>
            </div>
            <p className="text-white text-lg font-bold">2023 models included!</p>
            
            <div className="pt-8">
              <button className="bg-white text-dark-blue px-7 py-2.5 rounded-md text-xs font-black uppercase tracking-tighter hover:bg-[#ea1d22] hover:text-white transition-all flex items-center gap-2">
                Shop now <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Air Filters Banner */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative rounded-4xl overflow-hidden min-h-[340px] flex flex-col justify-center p-12 group"
          style={{ 
            backgroundImage: 'url(https://enovathemes.com/mobex/wp-content/uploads/banner12-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 space-y-2">
            <span className="bg-[#BC3120] text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider w-fit">
              Big Sales!
            </span>
            <div className="space-y-0">
              <h3 className="text-4xl font-black text-dark-blue leading-tight uppercase tracking-tighter">
                Air Filters
              </h3>
            </div>
            <p className="text-dark-blue text-lg font-bold">Premium quality</p>
            
            <div className="pt-8">
              <button className="bg-white text-dark-blue px-7 py-2.5 rounded-md text-xs font-black uppercase tracking-tighter hover:bg-[#BC3120] hover:text-white transition-all flex items-center gap-2">
                Shop now <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Floating Air Filter Image */}
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute -right-12 bottom-0 w-[340px] h-auto z-20 pointer-events-none"
          >
            <img 
              src="https://enovathemes.com/mobex/wp-content/uploads/banner12-img.webp" 
              alt="Air Filter"
              className="w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.3)]"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
