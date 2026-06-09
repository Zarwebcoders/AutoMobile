"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    title: "",
    subtitle: "",
    description: "",
    image: "/images/helmets.png",
    assets: [],
    buttonText: "Shop now",
    buttonLink: "/shop?category=helmets"
  },
  {
    id: 3,
    title: "",
    subtitle: "",
    description: "",
    image: "/images/rockchanin.png",
    assets: [],
    buttonText: "Shop now",
    buttonLink: "/shop?category=tires"
  }
];

export const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[530px]">
          
          {/* Main Slider */}
          <div className="lg:col-span-2 relative rounded-4xl overflow-hidden bg-[#DDD] h-[400px] lg:h-full group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-16 z-20">
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                    className="max-w-[85%] lg:max-w-[70%]"
                  >
                    {slides[currentSlide].title && (
                      <h2 className="text-3xl lg:text-8xl font-outfit font-black text-white uppercase leading-[0.9] mb-2 drop-shadow-lg tracking-tighter">
                        {slides[currentSlide].title}
                      </h2>
                    )}
                    {slides[currentSlide].subtitle && (
                      <h3 className="text-lg lg:text-4xl font-outfit font-black text-white uppercase mb-4 drop-shadow-md">
                        {slides[currentSlide].subtitle}
                      </h3>
                    )}
                    {slides[currentSlide].description && (
                      <p className="text-white text-xs lg:text-xl font-medium mb-6 lg:mb-8 whitespace-pre-line drop-shadow-sm opacity-90 line-clamp-2 lg:line-clamp-none">
                        {slides[currentSlide].description}
                      </p>
                    )}
                    <Link 
                      href={slides[currentSlide].buttonLink}
                      className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 lg:px-10 lg:py-4 rounded-xl font-black hover:bg-black hover:text-white transition-all duration-300 text-sm lg:text-lg shadow-xl"
                    >
                      {slides[currentSlide].buttonText}
                      <ArrowRight size={18} strokeWidth={3} className="lg:w-6 lg:h-6" />
                    </Link>
                  </motion.div>


                </div>

                {/* Floating Assets Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {slides[currentSlide].assets.map((asset, idx) => (
                    <motion.img
                      key={asset}
                      src={asset}
                      alt="Floating asset"
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        delay: 0.5 + idx * 0.2, 
                        duration: 1.5, 
                        ease: "easeOut" 
                      }}
                      className="absolute bottom-0 right-0 w-[50%] lg:w-auto h-auto max-h-[80%] object-contain"
                      style={{ 
                        right: idx === 0 ? '5%' : idx === 1 ? '15%' : '0%',
                        zIndex: 10 - idx 
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bullets */}
            <div className="absolute bottom-4 lg:bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    currentSlide === idx ? "bg-white scale-125" : "bg-white/30 hover:bg-white/60"
                  )}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-30"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-30"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Right Side Banners - Home 2 Specific */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
            
            {/* Banner 1: Batteries */}
            <div className="relative rounded-3xl lg:rounded-4xl overflow-hidden bg-[#ea1d22] group shadow-sm flex flex-col">
              <div className="relative z-10 p-5 lg:p-8 flex flex-col h-full">
                <span className="bg-[#0078d2] text-white font-black uppercase text-[8px] lg:text-[10px] px-2 py-0.5 lg:px-3 lg:py-1 rounded w-fit mb-3">Top brands</span>
                <h3 className="text-xl lg:text-4xl font-oswald font-black text-white uppercase mb-1 leading-none tracking-tight">Batteries</h3>
                <p className="text-white font-medium text-[10px] lg:text-base mb-4 lg:mb-6">Stay charged up!</p>
                <Link 
                  href="/shop?ca=battery"
                  className="inline-flex items-center justify-center w-fit bg-white text-black px-4 py-1.5 lg:px-6 lg:py-2 rounded-lg font-bold hover:bg-black hover:text-white transition-all text-[10px] lg:text-sm shadow-sm"
                >
                  Shop now
                </Link>
              </div>
              <img 
                src="/images/bgsolance.png" 
                alt="Battery"
                className="absolute right-[-10px] bottom-[-10px] lg:right-[-20px] lg:bottom-[-20px] w-32 lg:w-64 h-auto object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent pointer-events-none" />
            </div>

            {/* Banner 2: Tires */}
            <div className="relative rounded-3xl lg:rounded-4xl overflow-hidden bg-[#eef6ff] group shadow-sm border border-blue-50 flex flex-col">
              <div className="relative z-10 p-5 lg:p-8 flex flex-col h-full">
                <span className="bg-[#00d084] text-white font-black uppercase text-[8px] lg:text-[10px] px-2 py-0.5 lg:px-3 lg:py-1 rounded w-fit mb-3">Buy 3 Get 1 For Free</span>
                <h3 className="text-xl lg:text-4xl font-oswald font-black text-dark-blue uppercase mb-1 leading-none tracking-tight">TIRES & WHEELS</h3>
                <p className="text-gray-600 font-medium text-[10px] lg:text-base mb-4 lg:mb-6">Stay safe on road!</p>
                <Link 
                  href="/shop?ca=tires"
                  className="inline-flex items-center justify-center w-fit bg-white text-black px-4 py-1.5 lg:px-6 lg:py-2 rounded-lg font-bold hover:bg-black hover:text-white transition-all text-[10px] lg:text-sm shadow-sm"
                >
                  Shop now
                </Link>
              </div>
              <img 
                src="/images/two_motorcycle_tyres.png" 
                alt="Tires"
                className="absolute right-[-10px] bottom-[-10px] lg:right-[-10px] lg:bottom-[0px] w-24 lg:w-48 h-auto object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
