"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  Settings2, 
  Car, 
  Disc, 
  Activity, 
  Battery, 
  Cpu, 
  Layout,
  ArrowRight,
  ChevronRightCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCategories } from '@/lib/api';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu = ({ isOpen, onClose }: MegaMenuProps) => {
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCategories();
        setCategoriesData(data);
        if (data.length > 0) setActiveCategory(data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const getCategoryIcon = (iconName: string, iconUrl?: string) => {
    if (iconUrl) {
      return (
        <span 
          className="w-5 h-5 bg-gray-400 group-hover:bg-[#ea1d22] transition-colors"
          style={{
            WebkitMask: `url(${iconUrl}) no-repeat center / contain`,
            mask: `url(${iconUrl}) no-repeat center / contain`
          }}
        />
      );
    }
    const props = { className: "w-5 h-5" };
    switch (iconName) {
      case 'cog': return <Settings2 {...props} />;
      case 'car': return <Car {...props} />;
      case 'disc': return <Disc {...props} />;
      case 'layers': return <Activity {...props} />;
      case 'zap': return <Battery {...props} />;
      case 'cpu': return <Cpu {...props} />;
      case 'layout': return <Layout {...props} />;
      default: return <Settings2 {...props} />;
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-[100] flex justify-center pt-1">
          {/* Menu Container */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onMouseLeave={onClose}
            className="relative w-full max-w-[1300px] h-fit max-h-[calc(100vh-160px)] bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] flex overflow-hidden border border-gray-100 rounded-b-xl"
          >
            {/* Sidebar */}
            <div className="w-[280px] bg-gray-50 border-r border-gray-100 overflow-y-auto">
              <nav className="flex flex-col">
                {categoriesData.map((category) => (
                  <div 
                    key={category._id}
                    onMouseEnter={() => setActiveCategory(category)}
                    className={cn(
                       "px-8 py-4 flex items-center justify-between cursor-pointer transition-all group",
                       activeCategory?._id === category._id 
                        ? "bg-white text-[#ea1d22]" 
                        : "text-gray-900 hover:bg-white hover:text-[#034C8C]"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "transition-colors",
                        activeCategory?._id === category._id ? "text-[#ea1d22]" : "text-gray-400 group-hover:text-[#034C8C]"
                      )}>
                        {getCategoryIcon(category.icon, category.icon)}
                      </div>
                      <span className="text-[13px] font-black uppercase tracking-tight">{category.name}</span>
                    </div>
                    <ChevronRight size={14} className={cn(
                      "transition-transform",
                      activeCategory?._id === category._id ? "translate-x-1" : "text-gray-300"
                    )} />
                  </div>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white flex">
              {/* Sub-categories Grid */}
              <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-3 gap-x-10 gap-y-12">
                  {activeCategory?.subcategories && activeCategory.subcategories.length > 0 ? (
                    <div className="col-span-3">
                       <h3 className="text-xl font-black text-[#034C8C] uppercase mb-8 border-b-2 border-accent inline-block pb-1">
                          {activeCategory.name}
                       </h3>
                       <div className="grid grid-cols-3 gap-8">
                         {activeCategory.subcategories.map((sub: any, i: number) => (
                            <div key={i} className="group">
                               <Link 
                                 href={sub.href || `/shop?category=${activeCategory.id}&query=${sub.name}`}
                                 onClick={onClose}
                                 className={cn(
                                   "text-[14px] font-bold transition-all block py-2",
                                   sub.isViewAll ? "text-[#ea1d22] uppercase tracking-wider mt-4 flex items-center gap-2" : "text-gray-500 hover:text-dark-blue"
                                 )}
                               >
                                 {sub.name}
                                 {sub.isViewAll && <ChevronRightCircle size={14} />}
                               </Link>
                            </div>
                         ))}
                       </div>
                    </div>
                  ) : (
                    <div className="col-span-3 flex items-center justify-center h-48 text-gray-300 italic">
                      {loading ? 'Loading...' : 'More categories coming soon...'}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Promo Banner - Vertical */}
              <div className="w-[280px] bg-[#BC3120] relative flex flex-col p-8 text-white">
                 <div className="space-y-1 z-10">
                    <span className="text-[11px] font-black uppercase text-[#ea1d22] tracking-widest bg-dark-blue/20 px-3 py-1 rounded-full">Special deals</span>
                    <h4 className="text-4xl font-black italic -skew-x-12 tracking-tighter leading-none pt-4">
                      ONE TIME <br /> SPECIAL <br /> 
                      <span className="text-5xl">BUYS</span>
                    </h4>
                    <p className="text-[13px] font-black opacity-80 pt-4">Good Values. Always.</p>
                 </div>
                 
                 <div className="mt-8 z-10">
                    <button 
                      onClick={() => {
                        onClose();
                        window.location.href = '/shop';
                      }}
                      className="bg-white text-black px-6 py-3 rounded-lg text-xs font-black uppercase tracking-tighter hover:bg-[#ea1d22] transition-all flex items-center gap-2 shadow-xl"
                    >
                      Shop now <ArrowRight size={14} />
                    </button>
                 </div>

                 {/* Asset positioning - Bleeds off the bottom */}
                 <div className="absolute -bottom-6 -right-16 w-[400px] z-0 pointer-events-none opacity-90">
                    <img 
                      src="https://enovathemes.com/mobex/wp-content/uploads/banner13-img.webp" 
                      alt="Special Deals" 
                      className="w-full h-auto object-contain drop-shadow-2xl"
                    />
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
