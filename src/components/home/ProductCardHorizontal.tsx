"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, GitCompare, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProductCardHorizontalProps {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  image: string;
  badge?: string;
  rating?: number;
}

export const ProductCardHorizontal = ({ id, _id, name, price, image, badge }: ProductCardHorizontalProps) => {
  const dynamicHref = `/product/${_id || id}`;

  return (
    <motion.div 
      className="bg-white rounded-xl border border-gray-100 p-3 flex gap-4 h-[180px] w-full relative overflow-hidden group shadow-sm"
    >
      {/* Left: Image and Actions */}
      <div className="w-[120px] shrink-0 flex flex-col">
        <div className="relative aspect-square flex items-center justify-center bg-white mb-2">
            {badge && (
                <div className="absolute top-0 left-0 flex flex-col gap-1 z-10">
                    {badge === 'Sale' && <span className="bg-[#ea1d22] text-white px-1.5 py-0.5 text-[9px] font-black uppercase rounded-[3px]">Sale</span>}
                    {badge === 'New' && <span className="bg-[#04BF33] text-white px-1.5 py-0.5 text-[9px] font-black uppercase rounded-[3px]">New!</span>}
                </div>
            )}
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-contain"
            />
        </div>
        
        {/* Actions Row */}
        <div className="flex items-center gap-1.5 mt-auto">
            <button className="w-8 h-8 rounded-full border border-gray-50 flex items-center justify-center bg-white shadow-sm">
                <Heart size={14} className="text-black/70" />
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-50 flex items-center justify-center bg-white shadow-sm">
                <GitCompare size={14} className="text-black/70" />
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-50 flex items-center justify-center bg-white shadow-sm">
                <Eye size={14} className="text-black/70" />
            </button>
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex flex-col flex-1 py-1">
        <Link href={dynamicHref} className="block mb-2">
          <h3 className="text-[13px] font-black text-black leading-tight line-clamp-3 uppercase tracking-tight">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-0.5 mb-auto">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} className="fill-gray-100 text-gray-100" />
          ))}
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-[17px] font-black text-[#BC3120] leading-none">${price}</span>
          <Link href="/cart" className="flex items-center gap-1 text-[#004b7c] font-black uppercase text-[10px] group/link">
            Add to cart
            <ArrowRight size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
