"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const CategoryBanners = () => {
  const banners = [
    {
      title: 'TOOLS',
      sub: 'You need',
      bg: 'bg-[#22c55e]', // Green
      img: 'https://enovathemes.com/mobex/wp-content/uploads/banner-1.webp',
      badge: 'TOP BRANDS',
      link: '/shop'
    },
    {
      title: 'ENGINE OIL',
      sub: 'Run smoothly!',
      bg: 'bg-[#004b8d]', // Darker Blue
      img: 'https://enovathemes.com/mobex/wp-content/uploads/banner-2.webp',
      badge: 'UP TO 40% OFF',
      link: '/shop'
    },
    {
      title: 'BUY SPARE',
      sub: 'Parts online!',
      bg: 'bg-[#ef4444]', // Red
      img: 'https://enovathemes.com/mobex/wp-content/uploads/banner-3.webp',
      badge: 'BIG SALE',
      link: '/shop'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Style like second image in mobile: 2 columns grid for first two, stacked or scrollable for others */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {banners.map((banner, i) => (
            <div 
              key={i} 
              className={`relative h-[240px] md:h-[380px] rounded-2xl md:rounded-3xl overflow-hidden group flex flex-col justify-center p-6 md:p-10 ${banner.bg} ${i === 2 ? 'col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="relative z-10 space-y-1 md:space-y-2">
                <span className="text-[8px] md:text-[10px] font-black text-white/80 uppercase tracking-widest">{banner.badge}</span>
                <h3 className="text-xl md:text-4xl font-black font-oswald text-white uppercase italic leading-none">{banner.title}</h3>
                <p className="text-white text-xs md:text-lg font-bold">{banner.sub}</p>
                <div className="pt-4 md:pt-6">
                  <Link 
                    href={banner.link}
                    className="inline-flex items-center justify-between px-4 md:px-6 h-10 md:h-12 bg-white text-dark-blue rounded-lg md:rounded-xl font-black uppercase text-[8px] md:text-[10px] tracking-widest hover:bg-accent transition-all"
                  >
                    Shop now <ChevronRight size={12} className="ml-2 md:ml-4" />
                  </Link>
                </div>
              </div>
              
              {/* Product Image */}
              <img 
                src={banner.img} 
                alt={banner.title}
                className="absolute bottom-0 right-0 w-[80%] h-auto object-contain z-0 transform translate-x-10 translate-y-10 group-hover:scale-110 group-hover:-translate-x-2 transition-transform duration-700 pointer-events-none"
              />
              
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
