"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, User, ShoppingBag, LayoutGrid, FileText, ChevronDown, UserPlus, LogIn, Car, Search as SearchIcon, Star, ChevronRightCircle } from 'lucide-react';
import { getCategories } from '@/lib/api';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { useUIStore, type TabType } from '@/store/useUIStore';

const BRANDS = [
  { name: 'ABAKUS', count: 2, logo: 'https://enovathemes.com/mobex/wp-content/uploads/ridex.svg' },
  { name: 'ALANKO', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/kraft.svg' },
  { name: 'AS-PL', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/stark.svg' },
  { name: 'ATE', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/denso.svg' },
  { name: 'AUTLOG', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/vaico.svg' },
  { name: 'BILSTEIN', count: 3, logo: 'https://enovathemes.com/mobex/wp-content/uploads/luk.svg' },
  { name: 'BLIC', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/meyle.svg' },
];

const COLORS = [
  { name: 'Black', count: 4, hex: '#000000' },
  { name: 'Blue', count: 1, hex: '#2196F3' },
  { name: 'Grey', count: 1, hex: '#9E9E9E' },
  { name: 'Red', count: 1, hex: '#F44336' },
  { name: 'Transparent', count: 1, hex: 'transparent', isBorder: true },
  { name: 'White', count: 1, hex: '#FFFFFF', isBorder: true },
];

interface MobileSideBarProps {
  navLinks?: { name: string; href: string }[];
}

export const MobileSideBar = ({ navLinks = [] }: MobileSideBarProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const { isMobileSideBarOpen: isOpen, closeMobileSideBar: onClose, activeMobileTab: activeTab, setActiveMobileTab: setActiveTab } = useUIStore();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 1150]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const isModalView = ['car-filter', 'search', 'shop-filter'].includes(activeTab);

  const toggleCategory = (id: string, hasSub: boolean) => {
    if (!hasSub) return;
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const menuItems = [
    { name: 'Shop', href: '/shop' },
    { name: 'Elements', href: '/elements' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {isModalView ? (
            /* Full-page Centered Modal View (for Car Filter, Search, Shop Filter) */
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-[420px] bg-[#f2f2f2] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
              >
                <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-20">
                   <h4 className="font-black text-dark-blue uppercase tracking-tight text-lg">
                      {activeTab === 'shop-filter' ? 'Product categories' : activeTab === 'car-filter' ? 'Vehicle Filter' : 'Search Products'}
                   </h4>
                   <button 
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-dark-blue transition-colors"
                  >
                    <X size={24} strokeWidth={2.5} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                   {activeTab === 'shop-filter' && (
                     <div className="bg-white">
                        <ul className="divide-y divide-gray-50">
                           {categories.map((cat, i) => (
                             <li key={i}>
                               <Link 
                                 href={`/shop?category=${cat.id}`} 
                                 onClick={onClose}
                                 className="flex items-center justify-between p-4 px-6 hover:bg-gray-50 transition-colors group"
                               >
                                  <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 flex items-center justify-center bg-transparent group-hover:scale-110 transition-transform">
                                        <img src={cat.icon} alt={cat.name} className="w-full h-full object-contain" />
                                     </div>
                                     <span className="text-[13px] font-bold text-dark-blue uppercase tracking-tight">{cat.name}</span>
                                  </div>
                                  <ChevronRight size={16} className="text-gray-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                               </Link>
                             </li>
                           ))}
                        </ul>

                        {/* Traditional Filters below categories if needed, but user focus is categories */}
                        <div className="p-8 bg-[#f2f2f2] space-y-12">
                            {/* Filter by Price */}
                            <div className="space-y-6">
                              <h4 className="font-black text-dark-blue uppercase tracking-tight text-lg">Filter by price</h4>
                              <div className="space-y-6">
                                  <input 
                                    type="range" 
                                    min="0" max="1500" value={priceRange[1]} 
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full h-1.5 bg-gray-300 rounded-full appearance-none cursor-pointer accent-dark-blue"
                                  />
                                  <div className="flex gap-4">
                                    <div className="flex-1 bg-white rounded-xl h-14 flex items-center justify-center font-black text-dark-blue border border-gray-100 shadow-sm">$0</div>
                                    <div className="flex-1 bg-white rounded-xl h-14 flex items-center justify-center font-black text-dark-blue border border-gray-100 shadow-sm">${priceRange[1].toLocaleString()}</div>
                                  </div>
                                  <button className="w-full h-14 bg-[#004b7c] text-white rounded-xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Filter</button>
                              </div>
                            </div>

                            {/* Filter by Brand */}
                            <div className="space-y-6">
                              <h4 className="font-black text-dark-blue uppercase tracking-tight text-lg">Filter by brand</h4>
                              <div className="relative">
                                <input 
                                  type="text" 
                                  placeholder="Type a keyword"
                                  className="w-full h-12 bg-white border border-gray-100 rounded-xl px-10 outline-none font-bold text-sm focus:border-accent shadow-sm"
                                />
                                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                              </div>
                              <div className="space-y-4 max-h-[250px] overflow-y-auto no-scrollbar bg-white p-4 rounded-xl border border-gray-100">
                                  {BRANDS.map((brand, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                                      <div className="flex items-center gap-3">
                                          <div className="w-5 h-5 rounded border-2 border-gray-300 group-hover:border-accent transition-colors" />
                                          <span className="w-6 h-6 flex items-center justify-center">
                                            <img src={brand.logo} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                                          </span>
                                          <span className="text-[14px] font-bold text-gray-500 uppercase">{brand.name}</span>
                                      </div>
                                      <span className="text-[11px] font-black text-gray-300">({brand.count})</span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                        </div>
                     </div>
                   )}

                   {activeTab === 'car-filter' && (
                     <div className="p-6 space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-dark-blue shadow-lg shadow-accent/20">
                             <Car size={20} />
                           </div>
                           <h4 className="font-black text-dark-blue uppercase tracking-tight text-xl">Vehicle Filter</h4>
                        </div>
                        {['Make', 'Model', 'Year', 'Engine', 'Transmission', 'Trim'].map((label) => (
                          <div key={label} className="relative group">
                            <select className="w-full h-14 bg-white border border-gray-100 rounded-xl appearance-none outline-none px-5 font-bold text-sm text-gray-800 focus:border-accent transition-all cursor-pointer shadow-sm">
                              <option>{label}</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-dark-blue" />
                          </div>
                        ))}
                        <button className="w-full h-14 bg-dark-blue text-white rounded-xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">Search</button>
                     </div>
                   )}

                   {activeTab === 'search' && (
                     <div className="p-6 space-y-5">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-dark-blue shadow-lg shadow-accent/20">
                             <SearchIcon size={20} />
                           </div>
                           <h4 className="font-black text-dark-blue uppercase tracking-tight text-xl">Search Products</h4>
                        </div>
                        <div className="relative group">
                          <select className="w-full h-14 bg-white border border-gray-100 rounded-xl appearance-none outline-none px-5 font-bold text-sm text-gray-800 focus:border-accent transition-all shadow-sm">
                            <option>Select category</option>
                            {categories.map(c => <option key={c.id}>{c.name}</option>)}
                          </select>
                          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="relative">
                          <input 
                            type="search" 
                            placeholder="Enter keyword or SKU" 
                            className="w-full h-14 bg-white border border-gray-100 rounded-xl px-5 outline-none pr-12 font-bold text-sm focus:border-accent transition-all shadow-sm"
                          />
                          <SearchIcon size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <button className="w-full h-14 bg-accent text-dark-blue rounded-xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black hover:text-white transition-all">Search</button>
                     </div>
                   )}
                </div>
              </motion.div>
            </div>
          ) : (
            /* High-Fidelity Sidebar View (for Menu, Categories, Account) */
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[300px] bg-white flex flex-col shadow-2xl"
            >
              {/* User Header */}
              <div className="bg-[#004b7c] p-6 flex flex-col gap-6 text-white">
                 <div className="flex items-center justify-between">
                    <img src="/logo.png" alt="MOBEX" className="h-8 w-auto object-contain brightness-0 invert" />
                    <Link 
                      href="/login" 
                      onClick={onClose}
                      className="px-3 py-1.5 border border-white/30 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-dark-blue transition-all"
                    >
                      Login
                    </Link>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center bg-white/5">
                      <User size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-tight">Hello Guest</h3>
                      <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest leading-none mt-1">For better experience login</p>
                    </div>
                 </div>
              </div>

              {/* Close Button - Floats over Backdrop */}
              <button 
                onClick={onClose}
                className="absolute -left-12 top-4 w-10 h-10 bg-white rounded-l-xl flex items-center justify-center text-dark-blue shadow-lg border-r border-gray-100"
              >
                <X size={20} strokeWidth={3} />
              </button>

              {/* Tabset */}
              <div className="tabset mobile-tabset flex border-b border-gray-100 bg-[#f7f7f7]">
                {(['menu', 'categories', 'account'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex-1 py-4 text-[11px] font-black uppercase tracking-[0.1em] transition-all relative border-r border-gray-100 last:border-r-0",
                      activeTab === tab ? "bg-white text-dark-blue" : "text-gray-400"
                    )}
                  >
                    <span className="relative z-10">{tab}</span>
                    {activeTab === tab && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />
                    )}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
                <AnimatePresence mode="wait">
                  {activeTab === 'menu' && (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="divide-y divide-gray-50"
                    >
                      {menuItems.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center justify-between p-5 hover:bg-gray-50 group"
                        >
                          <span className="text-sm font-bold text-dark-blue uppercase tracking-tight">{item.name}</span>
                          <ChevronRight size={16} className="text-gray-300 group-hover:text-accent transform group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'categories' && (
                    <motion.div
                      key="categories"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ul className="divide-y divide-gray-50 border-b border-gray-50">
                        {categories.map((cat) => (
                          <li key={cat._id} className="flex flex-col">
                            <div 
                              className="flex items-center justify-between p-4 px-6 group cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => toggleCategory(cat._id, !!cat.subcategories)}
                            >
                              <div className="flex items-center gap-4">
                                <span 
                                  className="w-5 h-5 bg-gray-400 group-hover:bg-accent transition-colors"
                                  style={{
                                    WebkitMask: `url(${cat.icon}) no-repeat center / contain`,
                                    mask: `url(${cat.icon}) no-repeat center / contain`
                                  }}
                                />
                                <span className={cn("text-[13px] font-bold uppercase tracking-tight", expandedCategory === cat._id ? "text-accent" : "text-dark-blue")}>
                                  {cat.name}
                                </span>
                              </div>
                              {cat.subcategories && (
                                <ChevronRight 
                                  size={14} 
                                  className={cn("text-gray-300 transition-transform duration-300", expandedCategory === cat._id ? "rotate-90 text-accent" : "")} 
                                />
                              )}
                            </div>

                            <AnimatePresence>
                              {expandedCategory === cat._id && cat.subcategories && (
                                <motion.ul
                                  initial={{ height: 0 }}
                                  animate={{ height: 'auto' }}
                                  exit={{ height: 0 }}
                                  className="overflow-hidden bg-[#fafafa] border-t border-gray-50"
                                >
                                  {cat.subcategories.map((sub: any, sIdx: number) => (
                                    <li key={sIdx}>
                                      <Link 
                                        href={sub.href || `/shop?category=${cat.id}&query=${sub.name}`}
                                        onClick={onClose}
                                        className={cn(
                                          "block py-3 px-14 text-xs font-bold transition-all border-b border-gray-50/50 last:border-b-0",
                                          sub.isViewAll ? "text-accent" : "text-gray-500 hover:text-dark-blue"
                                        )}
                                      >
                                        {sub.name}
                                      </Link>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {activeTab === 'account' && (
                    <motion.div
                      key="account"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-8 space-y-6"
                    >
                      <form className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Username</label>
                          <input type="text" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-5 outline-none focus:border-accent font-medium text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">Password</label>
                          <input type="password" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-5 outline-none focus:border-accent font-medium text-sm" />
                        </div>
                        <button className="bg-dark-blue text-white px-8 h-12 rounded-lg font-black uppercase text-[11px] tracking-widest shadow-xl hover:bg-black transition-all active:scale-95">
                          Log In
                        </button>
                      </form>
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                         <Link href="#" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-accent">Forgot password?</Link>
                         <Link href="#" className="text-[10px] font-black text-dark-blue uppercase tracking-widest hover:text-accent">Sign up</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};
