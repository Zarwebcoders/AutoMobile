"use client";

import React from 'react';
import { Play } from 'lucide-react';

export const FeatureIntro = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <h3 className="text-3xl font-black font-oswald text-dark-blue uppercase tracking-tight">
            UI elements & animations
          </h3>
          <div className="h-1 w-16 bg-accent mt-4" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Video/Image Block */}
          <div className="w-full lg:w-3/5 relative group cursor-pointer">
            <div className="aspect-[16/9] rounded-[40px] overflow-hidden border-[12px] border-slate-50 shadow-2xl">
              <img 
                src="https://enovathemes.com/mobex/wp-content/uploads/video-12-img-1.webp" 
                alt="Workshop" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-dark-blue/20 group-hover:bg-dark-blue/10 transition-colors" />
            </div>
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center text-dark-blue shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Play size={32} fill="currentColor" />
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl hidden md:block">
              <p className="text-[10px] font-black uppercase text-accent tracking-[0.2em] mb-1">USA Supplier</p>
              <p className="text-xl font-black text-dark-blue font-oswald italic uppercase leading-none">#1 Nationwide</p>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-2/5 space-y-8">
            <div className="space-y-4">
              <h4 className="text-4xl font-black font-oswald text-dark-blue leading-tight uppercase tracking-tighter italic">
                Mobex Auto Parts <br/>
                <span className="text-accent underline decoration-4 underline-offset-4 decoration-accent/30 not-italic">Premium Quality</span>
              </h4>
              <div className="space-y-6 text-gray-500 font-medium">
                <p>With over 250+ branches nationwide and 130,000 parts available Mobex Auto Parts is the USA&apos;s number 1 supplier!</p>
                <p>We offer service parts at very competitive prices with Free Delivery across the whole of the USA.</p>
              </div>
            </div>

            <button className="bg-accent text-dark-blue h-14 px-12 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-dark-blue hover:text-white transition-all shadow-xl shadow-accent/20">
              Discover more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
