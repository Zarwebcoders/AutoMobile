"use client";

import React, { useEffect, useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const MobileBottomNav = () => {
  const { openMobileSideBar } = useUIStore();
  const router = useRouter();
  const pathname = usePathname();

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isShopOrProduct = pathname === '/shop' || pathname.startsWith('/product/');

  const navItems = [
    { 
      label: 'Account', 
      icon: 'https://enovathemes.com/mobex/wp-content/themes/mobex/images/icons/user.svg',
      onClick: () => router.push('/my-account')
    },
    { 
      label: 'Categories', 
      icon: 'https://enovathemes.com/mobex/wp-content/themes/mobex/images/icons/categories.svg',
      onClick: () => openMobileSideBar('categories')
    },
    { 
      label: 'Car filter', 
      icon: 'https://enovathemes.com/mobex/wp-content/themes/mobex/images/icons/vehicle.svg',
      onClick: () => openMobileSideBar('car-filter')
    },
    { 
      label: 'Search', 
      icon: 'https://enovathemes.com/mobex/wp-content/themes/mobex/images/icons/search.svg',
      onClick: () => openMobileSideBar('search')
    },
    // Add Filter button ONLY on shop page
    ...(isShopOrProduct ? [{
      label: 'Filter',
      icon: 'https://enovathemes.com/mobex/wp-content/themes/mobex/images/icons/filter.svg',
      onClick: () => {
        openMobileSideBar('shop-filter');
      },
      isFilter: true
    }] : []),
    { 
      label: 'Top', 
      icon: 'https://enovathemes.com/mobex/wp-content/themes/mobex/images/icons/arrow-up.svg',
      onClick: (e: any) => scrollToTop(e)
    },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-100 z-[110] shadow-[0_-5px_30_rgba(0,0,0,0.08)]"
    >
      <ul className="flex justify-around items-center h-[70px] sticky-dashboard active">
        {navItems.map((item, i) => (
          <li key={i} className={cn("flex-1 h-full", item.isFilter ? "bg-gray-50 border-x border-gray-100/50" : "")}>
            <button 
              onClick={item.onClick}
              className="flex flex-col items-center justify-center w-full h-full gap-1.5 group active:scale-90 transition-all"
            >
              <img 
                src={item.icon} 
                alt={item.label} 
                className="w-[22px] h-[22px] opacity-80 group-hover:opacity-100 transition-opacity" 
              />
              <span className="text-[10px] font-black text-dark-blue uppercase tracking-tight">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
