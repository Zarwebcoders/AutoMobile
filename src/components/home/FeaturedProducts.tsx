"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { getProducts } from '@/lib/api';

const PRODUCT_TABS = ['Engine parts', 'Oil & Fluids', 'Washer system', 'Suspension'];

export const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('Engine parts');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const filteredProducts = products.filter(p => p.categoryName === activeTab || p.category === activeTab);

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-black tracking-tight text-center mb-6">
            Featured products in
          </h2>
          <div className="w-full overflow-x-auto no-scrollbar pb-2">
            <div className="flex justify-start md:justify-center gap-2 min-w-max px-2">
              {PRODUCT_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-10 py-3 rounded-lg text-[13px] md:text-[15px] font-black transition-all duration-300 border h-[54px] flex items-center justify-center min-w-[140px]",
                    activeTab === tab
                      ? "border-[#004b7c] text-[#004b7c] bg-white"
                      : "border-gray-200 text-black bg-white hover:border-gray-300"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative group/container">
          <div className="md:hidden flex items-center justify-end gap-2 text-[9px] font-black text-gray-400 mb-4 animate-pulse uppercase tracking-[0.2em]">
             Swipe to view <ChevronRight size={10} />
          </div>
          
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 pb-6 md:pb-0 no-scrollbar snap-x snap-mandatory px-0">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="basis-[calc(50%-12px)] md:basis-auto snap-start shrink-0"
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Desktop Arrow */}
          <button className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl border border-gray-100 items-center justify-center opacity-0 group-hover/container:opacity-100 transition-opacity z-20">
            <ChevronRight className="text-gray-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
