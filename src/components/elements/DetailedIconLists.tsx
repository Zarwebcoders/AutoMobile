"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';

export const BrandGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const logos = [
    'https://enovathemes.com/mobex/wp-content/uploads/brand1.svg',
    'https://enovathemes.com/mobex/wp-content/uploads/brand2.svg',
    'https://enovathemes.com/mobex/wp-content/uploads/brand3.svg',
    'https://enovathemes.com/mobex/wp-content/uploads/brand4.svg',
    'https://enovathemes.com/mobex/wp-content/uploads/brand5.svg',
    'https://enovathemes.com/mobex/wp-content/uploads/brand6.svg',
    'https://enovathemes.com/mobex/wp-content/uploads/brand7.svg',
    'https://enovathemes.com/mobex/wp-content/uploads/brand8.svg',
  ];

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="py-12 md:py-16 border-t border-slate-100"
    >
       {/* Support 4 columns on mobile as seen in official site */}
       <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 md:gap-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
          {logos.map((logo, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.15 }}
              className="h-10 md:h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer p-2 md:p-0"
            >
              <img src={logo} alt="Brand" className="max-h-full" />
            </motion.div>
          ))}
       </div>
    </motion.div>
  );
};

export const DetailedIconLists = () => {
  const [activeTab, setActiveTab] = useState('icon');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const iconItems = [
    { label: 'Regular Maintenance Included', sub: 'Oil Changes 2 per year', color: 'orange' },
    { label: 'Brake Inspection Included', sub: 'Oil Changes 2 per year', color: 'orange' },
    { label: 'Tire Rotation 1 per year', sub: 'Oil Changes 2 per year', color: 'orange' },
    { label: 'Limited Roadside Assistance', sub: 'Oil Changes 2 per year', color: 'orange' },
    { label: 'Regular Maintenance Included', sub: 'Oil Changes 2 per year', color: 'green' },
    { label: 'Brake Inspection Included', sub: 'Oil Changes 2 per year', color: 'green' },
    { label: 'Tire Rotation 1 per year', sub: 'Oil Changes 2 per year', color: 'green' },
    { label: '24/7 Roadside Assistance', sub: 'Oil Changes 2 per year', color: 'green' },
    { label: 'Regular Maintenance Included', sub: 'Oil Changes 2 per year', color: 'red' },
    { label: 'Brake Inspection Included', sub: 'Oil Changes 2 per year', color: 'red' },
    { label: 'Tire Rotation 1 per year', sub: 'Oil Changes 2 per year', color: 'red' },
    { label: '24/7 Roadside Assistance', sub: 'Oil Changes 2 per year', color: 'red' },
    { label: 'Regular Maintenance Included', sub: 'Oil Changes 2 per year', color: 'blue' },
    { label: 'Brake Inspection Included', sub: 'Oil Changes 2 per year', color: 'blue' },
    { label: 'Tire Rotation 1 per year', sub: 'Oil Changes 2 per year', color: 'blue' },
    { label: '24/7 Roadside Assistance', sub: 'Oil Changes 2 per year', color: 'blue' },
  ];

  const menuCategories = [
    { title: 'Air conditioning', items: ['Condenser', 'Ac compressor', 'Heat exchanger', 'Receiver drier', 'Heater control valve'] },
    { title: 'Damping', items: ['Coil spring', 'Leaf spring', 'Shock absorber', 'Springs', 'Hydraulic oil'] },
    { title: 'Body', items: ['Bumper', 'Doors', 'Fuel tank', 'Wing mirror', 'Fender'] },
    { title: 'Engine', items: ['Engine electrics', 'Knock sensor', 'Lambda sensor', 'Oil cooler', 'Drive chain'] },
    { title: 'Electrics', items: ['Alternator', 'Battery', 'Relay starter', 'Starter', 'Headlight bulb'] },
    { title: 'Brakes', items: ['Brake discs', 'Brake pad sensor', 'Brake pads', 'Drum brake', 'Brake drum'] },
  ];

  const brandNames = [
    'Vicma', 'Castrol', 'Ravenol', 'Alanko', 'Tricsan', 'Abakus', 'Blic', 'Bosch', 'Dayco', 'Leoplast', 'Stark', 'DT', 'Ridex', 'Petec'
  ];

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 space-y-12 md:space-y-16">
        
        {/* Tab Selection */}
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            <button 
              onClick={() => setActiveTab('icon')}
              className={`px-6 md:px-10 h-10 md:h-14 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'icon' ? 'bg-dark-blue text-white shadow-xl shadow-blue-900/20' : 'bg-slate-50 border border-slate-100 text-dark-blue hover:border-accent'}`}
            >
              Icon list
            </button>
            <button 
              onClick={() => setActiveTab('menu')}
              className={`px-6 md:px-10 h-10 md:h-14 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'menu' ? 'bg-dark-blue text-white shadow-xl shadow-blue-900/20' : 'bg-slate-50 border border-slate-100 text-dark-blue hover:border-accent'}`}
            >
              Menu list
            </button>
            <button 
              onClick={() => setActiveTab('brand')}
              className={`px-6 md:px-10 h-10 md:h-14 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'brand' ? 'bg-dark-blue text-white shadow-xl shadow-blue-900/20' : 'bg-slate-50 border border-slate-100 text-dark-blue hover:border-accent'}`}
            >
              Clients/Brands
            </button>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'icon' && (
              <motion.div 
                key="icon-tab"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10 max-w-6xl mx-auto"
              >
                {iconItems.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <div className={`mt-1.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all duration-300 border-${item.color}-500 group-hover:bg-${item.color}-500`}>
                      <Check size={12} className={`text-white opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <div className="space-y-1">
                      <h6 className="text-xs font-black text-dark-blue uppercase tracking-tight group-hover:text-accent transition-colors italic">{item.label}</h6>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'menu' && (
              <motion.div 
                key="menu-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto"
              >
                {menuCategories.map((cat, i) => (
                  <div key={i} className="space-y-6">
                    <h5 className="text-xl font-black font-oswald text-dark-blue uppercase tracking-tight flex items-center gap-3 italic">
                      <span className="w-8 h-1 bg-accent rounded-full" />
                      {cat.title}
                    </h5>
                    <ul className="space-y-3">
                      {cat.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 group cursor-pointer">
                          <ChevronRight size={10} className="text-accent group-hover:translate-x-1 transition-transform" />
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide group-hover:text-dark-blue transition-colors px-1">{item}</span>
                        </li>
                      ))}
                      <li className="pt-2">
                        <button className="text-[10px] font-black text-accent uppercase tracking-[0.2em] border-b border-accent/30 hover:border-accent transition-colors">View all</button>
                      </li>
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'brand' && (
              <motion.div 
                key="brand-tab"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-12 md:space-y-16"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 max-w-6xl mx-auto">
                  {brandNames.map((name, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -5 }}
                      className="h-12 md:h-16 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl flex items-center justify-center p-4 group hover:bg-white hover:border-accent hover:shadow-xl transition-all"
                    >
                      <span className="text-[10px] md:text-xs font-black text-dark-blue uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">{name}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="space-y-6 md:pt-10">
                   <div className="flex items-center justify-between">
                     <h5 className="text-lg md:text-2xl font-black font-oswald text-dark-blue uppercase italic">Featured <span className="text-accent">Manufacturers</span></h5>
                   </div>
                   <BrandGrid />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
