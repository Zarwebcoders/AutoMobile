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
      label: 'Bike filter',
      icon: 'https://enovathemes.com/mobex/wp-content/uploads/engine.svg', // Using engine icon as temporary better fit or I will use Bike icon from lucide
      lucideIcon: true,
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
    <div
      className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-100 z-[999] shadow-[0_-5px_30px_rgba(0,0,0,0.08)] pb-safe"
    >
      <ul className="flex justify-around items-center h-[75px]">
        {navItems.map((item, i) => (
          <li key={i} className={cn("flex-1 h-full", item.isFilter ? "bg-gray-50 border-x border-gray-100/50" : "")}>
            <button
              onClick={item.onClick}
              className="flex flex-col items-center justify-center w-full h-full gap-1 group active:scale-90 transition-all px-1"
            >
              {item.label === 'Bike filter' ? (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-dark-blue opacity-80 group-hover:opacity-100 transition-opacity"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>
              ) : (
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-[22px] h-[22px] opacity-80 group-hover:opacity-100 transition-opacity"
                />
              )}
              <span className="text-[9px] font-black text-dark-blue uppercase tracking-tighter text-center leading-none">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
