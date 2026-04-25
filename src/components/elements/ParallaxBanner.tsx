"use client";

import React from 'react';
import Link from 'next/link';

export const ParallaxBanner = () => {
  return (
    <section className="relative h-[600px] flex items-center overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0 scale-110"
        style={{
          backgroundImage: 'url("https://enovathemes.com/mobex/wp-content/uploads/parallax-12-img-1.webp")',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100/90 via-gray-100/60 to-transparent z-10" />

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-6xl font-black font-oswald text-dark-blue leading-tight uppercase tracking-tighter">
              <span className="text-accent">Parallax</span> Background<br/>
              With Gradient Overlay
            </h2>
            <div className="space-y-6 text-gray-600 font-medium">
              <p>With over 250+ branches nationwide and 130,000 parts available Mobex Auto Parts is the USA&apos;s number 1 supplier!</p>
              <p>We offer service parts at very competitive prices with Free Delivery across the whole of the USA.</p>
            </div>
          </div>
          
          <button className="bg-accent text-dark-blue px-10 h-14 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-dark-blue hover:text-white transition-all shadow-xl shadow-accent/20">
            Discover more <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
