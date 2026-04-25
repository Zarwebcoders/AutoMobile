"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, GitCompare, Eye, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { InquiryModal } from '@/components/shop/InquiryModal';

interface ProductCardProps {
  id?: string | number;
  _id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: 'Sale' | 'New' | 'Popular';
  sku?: string;
  brandLogo?: string;
  href?: string;
}

export const ProductCard = ({ 
  id,
  _id,
  name, 
  price, 
  originalPrice, 
  rating, 
  reviews,
  image, 
  badge,
  sku,
  href 
}: ProductCardProps) => {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const dynamicHref = href || `/product/${_id || id}`;

  return (
    <>
      <InquiryModal 
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        product={{
          id: (_id || id) as string,
          name,
          sku
        }}
      />
      <motion.div 
        className="group bg-white rounded-xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-xl relative flex flex-col h-full overflow-hidden"
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-20">
          {badge === 'Sale' && (
            <span className="bg-[#ea1d22] text-white px-2 py-0.5 text-[10px] font-black uppercase rounded-[3px] shadow-sm">
              Sale
            </span>
          )}
          {badge === 'Popular' && (
            <span className="bg-[#004b7c] text-white px-2 py-0.5 text-[10px] font-black uppercase rounded-[3px] shadow-sm">
              Popular
            </span>
          )}
          {badge === 'New' && (
            <span className="bg-[#04BF33] text-white px-2 py-0.5 text-[10px] font-black uppercase rounded-[3px] shadow-sm">
              New!
            </span>
          )}
        </div>

        {/* Image Area */}
        <Link href={dynamicHref} className="relative w-full aspect-square mb-2 bg-white flex items-center justify-center overflow-hidden">
            <img 
              src={image} 
              alt={name}
              className="w-[85%] h-[85%] object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://enovathemes.com/mobex/wp-content/uploads/product-124-img-1.webp';
              }}
            />
        </Link>

        {/* Quick Actions */}
        <div className="flex items-center justify-center gap-2.5 mb-5">
          <button className="w-9 h-9 rounded-full border border-gray-50 flex items-center justify-center hover:bg-gray-50 transition-all">
            <Eye size={16} className="text-black/80" strokeWidth={1.5} />
          </button>
          <button className="w-9 h-9 rounded-full border border-gray-50 flex items-center justify-center hover:bg-gray-50 transition-all">
            <Heart size={16} className="text-black/80" strokeWidth={1.5} />
          </button>
          <button className="w-9 h-9 rounded-full border border-gray-50 flex items-center justify-center hover:bg-gray-50 transition-all">
            <GitCompare size={16} className="text-black/80" strokeWidth={1.5} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-1 px-1">
          <Link href={dynamicHref} className="block">
            <h3 className="text-[14px] font-black text-black leading-[1.2] mb-2 line-clamp-2 uppercase">
              {name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} className="fill-gray-100 text-gray-100" />
            ))}
          </div>

          {/* Price and Action */}
          <div className="mt-auto flex flex-col gap-2.5">
            <span className="text-[19px] font-black text-[#BC3120] tracking-tight leading-none">${price}</span>
            
            <button 
              onClick={() => setIsInquiryModalOpen(true)}
              className="flex items-center gap-1 text-[#004b7c] font-black uppercase text-[11px] hover:translate-x-0.5 transition-transform group/link"
            >
              Inquiry Now
              <ArrowRight size={13} className="mt-0.5 group-hover/link:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
