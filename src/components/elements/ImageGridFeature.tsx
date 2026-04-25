"use client";

import React from 'react';

export const ImageGridFeature = () => {
  const images = [
    'https://enovathemes.com/mobex/wp-content/uploads/product-124-img-1.webp',
    'https://enovathemes.com/mobex/wp-content/uploads/video-12-img-1.webp',
    'https://enovathemes.com/mobex/wp-content/uploads/product-123-img-1.webp',
    'https://enovathemes.com/mobex/wp-content/uploads/blog5.webp'
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: 2x2 Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            {images.map((img, i) => (
              <div 
                key={i} 
                className={`overflow-hidden rounded-3xl aspect-square shadow-lg group ${i === 1 ? 'translate-y-8' : i === 2 ? '-translate-y-8' : ''}`}
              >
                <img 
                  src={img} 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
            ))}
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h4 className="text-6xl font-black font-oswald text-dark-blue leading-[0.9] uppercase tracking-tighter italic">
                Mobex Auto Parts<br/>
                <span className="text-accent underline decoration-8 underline-offset-8 decoration-accent/30 not-italic">Premium Quality</span>
              </h4>
              <div className="space-y-6 text-gray-500 font-medium text-lg leading-relaxed">
                <p>With over 250+ branches nationwide and 130,000 parts available Mobex Auto Parts is the USA&apos;s number 1 supplier!</p>
                <p>We offer service parts at very competitive prices with Free Delivery across the whole of the USA.</p>
              </div>
            </div>

            <button className="h-16 px-12 border-2 border-dark-blue text-dark-blue rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-dark-blue hover:text-white transition-all shadow-xl shadow-dark-blue/5">
              Discover more
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
