"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, Zap, Settings, MapPin, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const Promotions = ({ showBanners = true, showGrid = true }: { showBanners?: boolean, showGrid?: boolean }) => {
  const categories = [
    {
      title: 'TOOLS',
      subtitle: 'You need',
      tag: 'Top brands',
      tagColor: 'bg-[#004b7c]', // Dark blue tag on green
      bgColor: 'bg-[#1cb23c]', // Vibrant green
      image: 'https://enovathemes.com/mobex/wp-content/uploads/Care-Kit.webp',
      buttonText: 'Shop now'
    },
    {
      title: 'ENGINE OIL',
      subtitle: 'Run smoothly!',
      tag: 'Up to 40% Off',
      tagColor: 'bg-[#1cb23c]', // Green tag on blue
      bgColor: 'bg-[#004b7c]', // Deep blue
      image: 'https://enovathemes.com/mobex/wp-content/uploads/Oils-and-fluids.webp',
      buttonText: 'Shop now'
    },
    {
      title: 'BUY 1 GET 1',
      subtitle: 'FREE',
      tag: 'Big sale',
      tagColor: 'bg-[#ea1d22]', // Red tag on red
      bgColor: 'bg-[#bc3120]', // Rusty Red
      image: 'https://enovathemes.com/mobex/wp-content/uploads/Suspension.webp',
      buttonText: 'Shop now'
    }
  ];

  const usps = [
    { title: "In-Store Pickup", desc: "Buy your parts online and pick them up in-store in 30 minutes", icon: MapPin },
    { title: "Free Shipping Over $25", desc: "Receive free standard shipping on orders over $25 (US only).", icon: Truck },
    { title: "Speed Perks", desc: "Spend $30, get $5 or spend $100, get $20 off your next purchase.", icon: Zap },
    { title: "Free In-Store Services", desc: "Free battery installation, check engine light scanning", icon: Settings },
    { title: "Oil & Battery Recycling", desc: "Recycle motor oil and gear oil at no charge. Gift card for returning", icon: RotateCcw },
    { title: "Store Locator", desc: "Use our store locator to find the closest store near you.", icon: MapPin },
  ];

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Top Banner Row - Side-by-Side on Desktop */}
        {showBanners && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Large Mega Sale Banner */}
            <motion.div 
              className="relative h-[250px] md:h-[450px] bg-black rounded-3xl md:rounded-[40px] overflow-hidden flex items-center group lg:col-span-2"
            >
              <div className="p-6 md:p-16 relative z-10 w-full md:w-3/5">
                <span className="bg-[#04BF33] text-white text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded w-fit mb-3 md:mb-5 inline-block uppercase tracking-wider">
                  Top Brands
                </span>
                <div className="space-y-0.5 md:space-y-1 mb-4 md:mb-8">
                  <h3 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
                    LAMPS AND LIGHTS
                  </h3>
                  <h2 className="text-4xl md:text-7xl font-black text-[#ea1d22] uppercase tracking-tight leading-none">
                    MEGA SALE
                  </h2>
                  <p className="text-white font-bold text-[11px] md:text-sm mt-3 md:mt-5 opacity-90 uppercase tracking-widest">
                    2023 models included!
                  </p>
                </div>
                <Link 
                  href="/shop"
                  className="bg-white text-black h-11 px-7 rounded-lg text-[12px] font-black uppercase transition-all shadow-md flex items-center justify-center w-fit gap-2"
                >
                  Shop now
                  <ArrowRight size={16} strokeWidth={3} />
                </Link>
              </div>
              {/* Branded Headlight Image */}
              <div className="absolute right-0 bottom-0 w-[55%] md:w-1/2 h-full z-0">
                <img 
                  src="https://enovathemes.com/mobex/wp-content/uploads/banner8-img.webp" 
                  alt="Mega Sale"
                  className="w-full h-full object-cover md:object-contain object-right-bottom transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Subtle overlay to ensure text contrast */}
              <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent z-[5]" />
            </motion.div>

            {/* Air Filter Banner - Only visible here on Desktop */}
            <motion.div 
              className="hidden lg:flex relative h-[450px] bg-[#ea1d22] rounded-[40px] overflow-hidden flex-col justify-center group p-12 lg:col-span-1"
            >
              <div className="relative z-10">
                <span className="bg-[#bc3120] text-white text-[10px] font-black px-2.5 py-1 rounded w-fit mb-5 inline-block uppercase tracking-wider">
                  Big Sales!
                </span>
                <h3 className="text-6xl font-black text-black uppercase tracking-tight leading-none mb-3">
                  AIR FILTERS
                </h3>
                <p className="text-black font-bold text-lg mb-8 uppercase tracking-widest opacity-80">
                  Premium quality
                </p>
                <Link 
                  href="/shop?q=air+filter"
                  className="inline-flex items-center justify-center bg-white text-black px-8 py-3.5 rounded-xl font-black hover:bg-black hover:text-white transition-all text-sm shadow-md gap-3 w-fit"
                >
                  Shop now
                  <ArrowRight size={18} strokeWidth={3} />
                </Link>
              </div>
              {/* Asset Image */}
              <div className="absolute right-[-10%] bottom-[-5%] w-[320px] h-[320px] z-0 transition-transform duration-700 group-hover:scale-105">
                <img 
                  src="https://enovathemes.com/mobex/wp-content/uploads/Air-conditioning.webp" 
                  alt="Air Filter"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}


        {/* 3-Banner Grid - Secondary Row - Scrollable on Mobile */}
        {showGrid && (
          <>
            <div className="w-full overflow-x-auto no-scrollbar pb-8">
              <div className="flex lg:grid lg:grid-cols-3 gap-4 md:gap-6 min-w-max lg:min-w-0 px-2 lg:px-0">
                {categories.map((cat, i) => (
                  <motion.div 
                    key={i}
                    className={cn(
                      "relative h-[300px] md:h-[320px] w-[260px] md:w-auto rounded-3xl md:rounded-[40px] overflow-hidden flex flex-col justify-start p-8 md:p-10 group shrink-0 snap-start",
                      cat.bgColor
                    )}
                  >
                    <div className="relative z-10">
                      <span className={cn(
                        "text-white text-[10px] md:text-[11px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider mb-4 inline-block shadow-sm",
                        cat.tagColor
                      )}>
                        {cat.tag}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none mb-1">
                        {cat.title}
                      </h3>
                      <p className="text-white font-bold text-[12px] md:text-sm mb-8 uppercase tracking-[0.1em] opacity-90">
                        {cat.subtitle}
                      </p>
                      <Link 
                        href="/shop"
                        className="bg-white text-black h-11 px-7 rounded-lg text-[12px] font-black uppercase transition-all shadow-md flex items-center justify-center w-fit gap-2"
                      >
                        Shop now
                        <ArrowRight size={16} strokeWidth={3} />
                      </Link>
                    </div>
                    {/* Asset Image */}
                    <div className="absolute right-0 bottom-0 w-[180px] h-[180px] md:w-[220px] md:h-[220px] z-0 transition-transform duration-700 group-hover:scale-105">
                      <img 
                        src={cat.image} 
                        alt={cat.title}
                        className="w-full h-full object-contain object-right-bottom"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* USP Section - 2 Row Scrollable on Mobile */}
            <div className="space-y-8 md:space-y-12 bg-[#eff6ff] py-12 px-4 -mx-4">
              <h2 className="text-xl md:text-3xl font-black text-black text-center">
                Know what you pay for
              </h2>
              
              <div className="w-full overflow-x-auto no-scrollbar pb-6">
                <div className="grid grid-rows-2 grid-flow-col md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 min-w-max md:min-w-0 px-2 lg:px-0 h-[480px] md:h-auto">
                  {usps.map((usp, i) => (
                    <div 
                      key={i} 
                      className="w-[280px] md:w-auto flex flex-col items-center justify-center p-8 rounded-3xl bg-white shadow-sm border border-gray-100 group snap-start"
                    >
                      <div className="mb-6 flex items-center justify-center">
                        <usp.icon className="w-16 h-16 text-[#ea1d22] stroke-[1.2]" />
                      </div>
                      <div className="text-center space-y-3">
                        <h4 className="text-lg font-black text-black leading-tight">
                          {usp.title}
                        </h4>
                        <p className="text-[13px] text-gray-400 leading-relaxed font-medium max-w-[220px] mx-auto">
                          {usp.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

