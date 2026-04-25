"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ElementsHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'https://enovathemes.com/mobex/wp-content/uploads/slider-12-img-1.webp',
    'https://enovathemes.com/mobex/wp-content/uploads/slider-12-img-2.webp'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#F8F9FA] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 py-20 lg:py-32">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-6 z-10">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-black font-oswald text-dark-blue leading-[1] flex flex-col uppercase tracking-tighter italic">
                <span>Mobex Auto Parts</span>
                <span className="text-accent underline decoration-4 underline-offset-8 decoration-accent/30 not-italic">Premium Quality</span>
              </h1>
              <div className="max-w-md space-y-4">
                <p className="text-gray-500 font-medium leading-relaxed text-base">
                  With over 250+ branches nationwide and 130,000 parts available Mobex Auto Parts is the USA&apos;s number 1 supplier!
                </p>
                <p className="text-gray-400 text-xs italic">
                  We offer service parts at very competitive prices with Free Delivery across the whole of the USA.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/shop" 
                className="inline-flex items-center gap-2 px-8 h-14 bg-dark-blue text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-accent hover:text-dark-blue transition-all shadow-xl shadow-dark-blue/20"
              >
                <ShoppingCart size={16} /> Discover more <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link 
                href="/shop" 
                className="inline-flex items-center gap-2 px-8 h-14 bg-white border-2 border-slate-200 text-dark-blue rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-accent hover:text-accent transition-all shadow-lg"
              >
                Shop online <ChevronRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Right Slider */}
          <div className="w-full lg:w-1/2 relative aspect-[4/3] lg:aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-accent/5 rounded-[100px] rotate-6 transform" />
            <div className="relative z-10 w-full h-full">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentSlide}
                  src={slides[currentSlide]}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full object-contain drop-shadow-[0_50px_80px_rgba(0,0,0,0.15)]"
                />
              </AnimatePresence>
            </div>

            {/* Pagination */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {slides.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-10 bg-dark-blue' : 'w-2 bg-gray-300'}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
