"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ChevronRight } from 'lucide-react';
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { FeaturedManufacturers } from "@/components/home/FeaturedManufacturers";

const CATEGORY_ICONS = [
    { name: 'Air conditioning', icon: 'https://enovathemes.com/mobex/wp-content/uploads/Air-conditioning.webp' },
    { name: 'Body', icon: 'https://enovathemes.com/mobex/wp-content/uploads/Body.webp' },
    { name: 'Brakes', icon: 'https://enovathemes.com/mobex/wp-content/uploads/Brakes.webp' },
    { name: 'Care Kit', icon: 'https://enovathemes.com/mobex/wp-content/uploads/Care-Kit.webp' },
    { name: 'Engine', icon: 'https://enovathemes.com/mobex/wp-content/uploads/engine.svg' },
    { name: 'Lighting', icon: 'https://enovathemes.com/mobex/wp-content/uploads/Lighting.webp' },
    { name: 'Wheels', icon: 'https://enovathemes.com/mobex/wp-content/uploads/wheels.svg' },
];

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-dark-blue overflow-x-hidden">
      <NavBar />
      
      <section className="flex-1 flex flex-col items-center justify-center py-32 text-center bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="space-y-8"
          >
            <h1 className="text-[12rem] md:text-[18rem] font-black text-dark-blue leading-none tracking-tighter italic font-oswald relative inline-block">
               404
               <motion.span 
                 animate={{ rotate: [0, 10, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 4 }}
                 className="absolute -top-10 -right-10 text-accent text-6xl"
               >
                 ?
               </motion.span>
            </h1>
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-dark-blue uppercase tracking-tight italic font-oswald">This page was not found at our marketplace.</h2>
              <p className="text-gray-500 font-medium max-w-lg mx-auto">
                Looks like the parts you are looking for are in another garage. Let's get you back on the right track.
              </p>
            </div>
            
            <Link href="/" className="inline-flex h-16 px-12 bg-accent text-dark-blue rounded-2xl items-center gap-4 font-black uppercase text-sm hover:bg-dark-blue hover:text-white transition-all shadow-2xl shadow-accent/20 transform hover:-translate-y-1 group">
               <Home size={20} />
               Back to home <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-[#F8F9FA] border-y border-gray-100">
        <div className="container mx-auto px-4">
           <h3 className="text-2xl font-black text-dark-blue uppercase tracking-tight italic font-oswald text-center mb-12">Featured categories</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {CATEGORY_ICONS.map((cat, idx) => (
                <Link key={idx} href="/shop" className="group flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center p-5 group-hover:bg-accent transition-all duration-500 transform group-hover:-translate-y-2">
                     <img src={cat.icon} alt="" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[11px] font-black text-dark-blue uppercase tracking-widest text-center group-hover:text-accent transition-colors">{cat.name}</span>
                </Link>
              ))}
           </div>
        </div>
      </section>

      <FeaturedManufacturers />

      <Footer variant="main" />
    </main>
  );
}
