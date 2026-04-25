"use client";

import React, { useState } from 'react';
import { ChevronDown, Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductSearchProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export const ProductSearch = ({ className, variant = 'default' }: ProductSearchProps) => {
  const [category, setCategory] = useState("All Categories");
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "All Categories",
    "Air Conditioning",
    "Body Parts",
    "Brakes",
    "Engine",
    "Filters",
    "Lighting",
    "Oils & Fluids",
    "Steering",
    "Suspension",
    "Transmission"
  ];

  return (
    <div className={cn("flex items-center w-full max-w-4xl", className)}>
      <div className={cn(
        "flex-1 bg-white rounded-l-md flex items-center h-12 relative border border-white/10 shadow-sm",
        variant === 'compact' ? 'h-10' : 'h-12'
      )}>
        {/* Category Dropdown */}
        <div className="relative h-full">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="h-full border-r flex items-center px-4 bg-gray-50 border-gray-200 group cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <span className="text-dark-blue text-[13px] font-bold whitespace-nowrap">{category}</span>
            <ChevronDown className={cn("ml-2 w-4 h-4 text-gray-400 transition-transform", isOpen && "rotate-180")} />
          </button>
          
          {isOpen && (
            <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-md border border-gray-100 mt-1 py-1 z-200 animate-in fade-in slide-in-from-top-2">
              {categories.map((cat) => (
                <div 
                  key={cat}
                  onClick={() => { setCategory(cat); setIsOpen(false); }}
                  className="px-4 py-2 text-[13px] font-medium text-dark-blue hover:bg-accent hover:text-white cursor-pointer transition-colors"
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex-1 flex items-center relative h-full">
          <input 
            type="text" 
            placeholder="Search products by SKU, keyword..." 
            className="w-full px-6 text-dark-blue text-[15px] outline-none h-full placeholder:text-gray-400 bg-transparent"
          />
          {variant === 'compact' && (
            <SearchIcon className="absolute right-4 w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      <button className={cn(
        "bg-accent hover:bg-dark-blue border border-accent hover:border-dark-blue transition-all px-10 rounded-r-md text-dark-blue hover:text-white font-black uppercase text-sm flex items-center justify-center h-12",
        variant === 'compact' ? 'h-10 px-6' : 'h-12'
      )}>
        Search
      </button>
    </div>
  );
};
