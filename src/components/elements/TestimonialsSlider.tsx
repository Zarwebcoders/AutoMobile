"use client";

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      name: 'John Anderson',
      rating: 5,
      text: 'I found the exact fuel pump I needed for my vintage car, and the speedy delivery exceeded my expectations.',
      img: 'https://enovathemes.com/mobex/wp-content/uploads/team1.webp'
    },
    {
      name: 'Liam Turner',
      rating: 5,
      text: 'The quality is top. I purchased brake pads for my SUV, improved my vehicle’s stopping power.',
      img: 'https://enovathemes.com/mobex/wp-content/uploads/team2.webp'
    },
    {
      name: 'Alex Smith',
      rating: 5,
      text: 'Mobex delivered on their promise of quality and affordability. I got an air filter for my SUV, and it fit perfectly.',
      img: 'https://enovathemes.com/mobex/wp-content/uploads/team3.webp'
    },
    {
      name: 'Taylor Laurent',
      rating: 5,
      text: 'The diverse inventory and personalized support simplified the process. Mobex is a lifesaver for me.',
      img: 'https://enovathemes.com/mobex/wp-content/uploads/team4.webp'
    }
  ];

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-[#E9F3FB]/30">
      <div className="container mx-auto px-4 space-y-16">
        
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-black font-oswald text-dark-blue uppercase tracking-tight">Testimonials</h3>
          <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">Excellent 4.91 based on 225,181 reviews</p>
          <div className="h-1 w-20 bg-accent mx-auto" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((item, i) => (
              <div key={i} className="bg-white rounded-[32px] p-10 shadow-xl shadow-blue-900/5 space-y-6 hover:-translate-y-2 transition-transform duration-500 group">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-50">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-dark-blue uppercase tracking-tight">{item.name}</h4>
                    <div className="flex gap-0.5 text-accent">
                      {[...Array(item.rating)].map((_, j) => <Star key={j} size={10} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed italic">
                  &quot;{item.text}&quot;
                </p>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button onClick={prev} className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-dark-blue hover:bg-accent transition-colors hidden xl:flex">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-dark-blue hover:bg-accent transition-colors hidden xl:flex">
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
};
