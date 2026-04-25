"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { getProducts } from '@/lib/api';

export const BestDeals = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 1,
    minutes: 18,
    seconds: 59
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter(p => p.isBestDeal);

  return (
    <section className="py-12 bg-[#eff6ff]">
      <div className="max-w-[1720px] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center mb-10">
          <h2 className="text-xl md:text-3xl font-black text-black tracking-tight mb-4 text-center">
            Best Deals of the week!
          </h2>
          
          <div className="flex items-center gap-1.5 md:gap-2">
            {[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((value, idx) => (
              <React.Fragment key={idx}>
                <div className="bg-[#BC3120] text-white w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center text-xl md:text-2xl font-black">
                  {value.toString().padStart(2, '0')}
                </div>
                {idx < 3 && <span className="text-xl font-black text-[#BC3120]">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div className="flex overflow-x-auto md:grid md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 no-scrollbar pb-4 snap-x snap-mandatory px-2">
            {dealProducts.map(product => (
              <div key={product._id} className="min-w-[calc(50%-12px)] md:min-w-0 snap-start h-full">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
