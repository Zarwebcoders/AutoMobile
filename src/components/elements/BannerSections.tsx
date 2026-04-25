"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';

export const FixedBanner = () => {
  return (
    <section className="relative h-[550px] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 scale-110"
        style={{
          backgroundImage: 'url("https://enovathemes.com/mobex/wp-content/uploads/about-img-1.webp")',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      <div className="absolute inset-0 bg-white/60 z-10" />

      <div className="container mx-auto px-4 relative z-20 flex justify-end">
        <div className="max-w-2xl space-y-8 text-right">
          <div className="space-y-4">
            <h2 className="text-6xl font-black font-oswald text-dark-blue leading-tight uppercase tracking-tighter">
              <span className="text-accent">Fixed</span> Background<br/>
              With Gradient Overlay
            </h2>
            <p className="text-gray-500 font-medium text-lg">
              With over 250+ branches nationwide and 130,000 parts available Mobex Auto Parts is the USA&apos;s number 1 supplier!
            </p>
            <p className="text-gray-400 text-sm italic">
              We offer service parts at very competitive prices with Free Delivery across the whole of the USA.
            </p>
          </div>
          <button className="bg-accent text-dark-blue px-10 h-14 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-dark-blue hover:text-white transition-all shadow-xl shadow-accent/20">
            Discover more <ChevronRight size={16} className="inline ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export const VideoBanner = () => {
  return (
    <section className="relative h-[650px] flex items-center overflow-hidden">
      {/* Video Placeholder (Static Image as background for now, or use a real video if possible) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://enovathemes.com/mobex/wp-content/uploads/video-12-img-1.webp" 
          alt="" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-dark-blue/70 z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-7xl font-black font-oswald text-white leading-[0.9] uppercase tracking-tighter italic">
              <span className="text-accent underline decoration-8 underline-offset-8 decoration-accent/30 not-italic">Video</span> Background<br/>
              With Gradient Overlay
            </h2>
            <div className="space-y-6 text-white/70 font-medium text-lg">
              <p>With over 250+ branches nationwide and 130,000 parts available Mobex Auto Parts is the USA&apos;s number 1 supplier!</p>
              <p>We offer service parts at very competitive prices with Free Delivery across the whole of the USA.</p>
            </div>
          </div>
          <button className="bg-green-500 text-white px-10 h-14 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-dark-blue transition-all shadow-xl shadow-green-500/20">
            Discover more <ChevronRight size={16} className="inline ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};
