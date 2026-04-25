"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Grid, List as ListIcon, ChevronDown, Check, X, ChevronRight, Search, User, LayoutGrid, Filter, ChevronUp } from 'lucide-react';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/home/ProductCard';
import { ProductCardHorizontal } from '@/components/home/ProductCardHorizontal';
import { cn } from '@/lib/utils';
import { useVehicleStore } from '@/store/useVehicleStore';
import { ShopSidebar } from '@/components/shop/ShopSidebar';
import { getProducts } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

const SHOP_CATEGORIES = [
  { name: 'Air conditioning', image: 'https://enovathemes.com/mobex/wp-content/uploads/Air-conditioning.webp' },
  { name: 'Belts, chains, rollers', image: 'https://enovathemes.com/mobex/wp-content/uploads/Belts-chains-rollers.webp' },
  { name: 'Body', image: 'https://enovathemes.com/mobex/wp-content/uploads/Body.webp' },
  { name: 'Brakes', image: 'https://enovathemes.com/mobex/wp-content/uploads/Brakes.webp' },
  { name: 'Care Kit', image: 'https://enovathemes.com/mobex/wp-content/uploads/Care-Kit.webp' },
  { name: 'Damping', image: 'https://enovathemes.com/mobex/wp-content/uploads/Damping.webp' },
];

const MAKES = ['Audi', 'BMW', 'Bentley', 'Cadillac', 'Chevrolet', 'Dodge', 'Ford', 'Honda', 'Hyundai', 'Infiniti', 'KIA', 'Lamborghini', 'Lexus', 'Lincoln', 'Maybach', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Porsche', 'Rolls-Royce', 'Toyota', 'Volkswagen', 'Volvo'];
const MODELS: Record<string, string[]> = {
  'BMW': ['1', '3', '5', '6', 'X5', 'X6'],
  'Audi': ['A3', 'A4', 'A6', 'Q5', 'Q7'],
};
const YEARS: Record<string, string[]> = {
  'X5': ['2011', '2010'],
};
const ENGINES: Record<string, string[]> = {
  '2010': ['4.4', '3.0', '4.8'],
};
const TRANSMISSIONS: Record<string, string[]> = {
  '4.4': ['6 Speed Automatic Select Shift'],
};
const TRIMS: Record<string, string[]> = {
  '6 Speed Automatic Select Shift': ['BMW 4.4L 8 cylinder 555hp 500 ft-lbs Turbo'],
};

import { ShopFilterBar } from '@/components/shop/ShopFilterBar';

const CATEGORY_ICONS = [
  { name: 'All categories', icon: 'https://enovathemes.com/mobex/wp-content/uploads/all-categories.svg' },
  { name: 'Engine / Parts', icon: 'https://enovathemes.com/mobex/wp-content/uploads/engine.svg' },
  { name: 'Oil & Fluids', icon: 'https://enovathemes.com/mobex/wp-content/uploads/oil.svg' },
  { name: 'Body', icon: 'https://enovathemes.com/mobex/wp-content/uploads/body.svg' },
  { name: 'Brakes', icon: 'https://enovathemes.com/mobex/wp-content/uploads/brakes.svg' },
  { name: 'Lights', icon: 'https://enovathemes.com/mobex/wp-content/uploads/lights.svg' },
  { name: 'Wheels', icon: 'https://enovathemes.com/mobex/wp-content/uploads/wheels.svg' },
];

import { useSearchParams } from 'next/navigation';

export default function ShopPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <NavBar />
      <React.Suspense fallback={<div>Loading...</div>}>
        <ShopContent />
      </React.Suspense>
    </div>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const minPrice = Number(searchParams.get('min')) || 0;
  const maxPrice = Number(searchParams.get('max')) || 10000;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [onlySale, setOnlySale] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [isVehicleFilterOpen, setIsVehicleFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const sortedProducts = [...products]
    .filter(p => !onlySale || p.badge === 'Sale')
    .filter(p => p.price >= minPrice && p.price <= maxPrice)
    .filter(p => {
      if (!query) return true;
      return (
        p.name.toLowerCase().includes(query) ||
        (p.category?.toLowerCase() || '').includes(query) ||
        p.brand.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <>
      <div className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="hidden md:block">
            <Breadcrumbs items={[{ label: 'Shop' }]} />
            <div className="flex items-center justify-between mt-6">
              <h1 className="text-6xl font-black text-dark-blue tracking-tighter uppercase italic font-oswald leading-none">
                Shop
              </h1>
              <div className="flex items-center gap-2 text-gray-300">
                <ChevronRight className="rotate-180" size={20} />
                <ChevronRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="md:hidden pt-4 -mb-4">
            <div className="text-[12px] font-medium text-gray-500 flex items-center gap-2 mb-6">
              <Link href="/">Home</Link>
              <ChevronRight size={10} className="text-gray-300" />
              <span className="text-gray-400">Shop</span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-black text-black">Shop</h1>
              <div className="flex items-center gap-4 text-gray-400">
                <ChevronRight className="rotate-180" size={20} strokeWidth={2.5} />
                <ChevronRight size={20} strokeWidth={2.5} />
              </div>
            </div>

            {/* Mobile Category Carousel - Rectangular Cards */}
            <div className="w-full overflow-x-auto no-scrollbar flex gap-3 pb-8 -mx-4 px-4 snap-x snap-mandatory">
              {SHOP_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="min-w-[170px] bg-white rounded-xl p-4 shadow-sm border border-gray-100 snap-start flex flex-col items-center gap-4 group">
                  <div className="w-full h-[100px] flex items-center justify-center p-2">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[12px] font-black text-black text-center leading-tight">
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile Vehicle Filter Button */}
            <button
              onClick={() => setIsVehicleFilterOpen(!isVehicleFilterOpen)}
              className="w-full bg-white rounded-xl h-[60px] px-6 border border-gray-100 shadow-sm flex items-center justify-center gap-3 text-[15px] font-bold text-dark-blue mb-10 active:bg-gray-50 transition-colors"
            >
              Vehicle filter
            </button>

            {isVehicleFilterOpen && (
              <motion.section
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-accent rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-stretch lg:items-end gap-4 shadow-xl shadow-accent/10 mb-12 overflow-hidden"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest leading-none">Year</label>
                    <select className="w-full h-12 px-4 bg-white rounded-xl border-none text-[13px] font-bold text-gray-500 focus:ring-2 focus:ring-dark-blue outline-none transition-all">
                      <option value="">Year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2010">2010</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest leading-none">Make</label>
                    <select className="w-full h-12 px-4 bg-white rounded-xl border-none text-[13px] font-bold text-gray-500 focus:ring-2 focus:ring-dark-blue outline-none transition-all">
                      <option value="">Make</option>
                      {MAKES.map(make => <option key={make} value={make}>{make}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest leading-none">Model</label>
                    <select className="w-full h-12 px-4 bg-white rounded-xl border-none text-[13px] font-bold text-gray-500 focus:ring-2 focus:ring-dark-blue outline-none transition-all">
                      <option value="">Model</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest leading-none">Engine</label>
                    <select className="w-full h-12 px-4 bg-white rounded-xl border-none text-[13px] font-bold text-gray-500 focus:ring-2 focus:ring-dark-blue outline-none transition-all">
                      <option value="">Engine</option>
                    </select>
                  </div>
                </div>
                <div className="flex-1 lg:max-w-[200px] space-y-2">
                  <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest leading-none">Serial Number</label>
                  <div className="relative">
                    <input placeholder="Serial Number" className="w-full h-12 pl-4 pr-10 bg-white rounded-xl border-none text-[13px] font-bold text-gray-500 focus:ring-2 focus:ring-dark-blue outline-none transition-all" type="text" />
                  </div>
                </div>
                <button className="h-12 px-10 bg-dark-blue text-white rounded-xl font-black uppercase text-xs hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2">
                  <Search size={18} />
                  Search
                </button>
              </motion.section>
            )}
          </div>

          {/* Desktop Category Icons Row */}
          <div className="hidden md:flex bg-white rounded-[30px] p-4 shadow-sm border border-gray-100 items-center justify-between gap-4 mb-8 overflow-x-auto no-scrollbar">
            {CATEGORY_ICONS.map((cat, idx) => (
              <button
                key={idx}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 rounded-2xl transition-all group shrink-0"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center p-2 group-hover:bg-accent transition-all duration-500">
                  <img src={cat.icon} alt="" className="w-full h-full object-contain" />
                </div>
                <span className="text-[13px] font-black text-dark-blue uppercase tracking-tight group-hover:text-accent transition-colors whitespace-nowrap">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <ShopFilterBar />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">
            {/* Sidebar */}
            <ShopSidebar />

            {/* Main Content Area */}
            <div className="flex flex-col gap-8">
              {/* Mobile-Only High Fidelity Toolbar */}
              <div className="md:hidden bg-[#F1F1F1] -mx-4 px-4 py-5 mb-4 space-y-5 rounded-2xl">
                {/* View Switching Icons */}
                <div className="flex justify-center items-center gap-10">
                  <button
                    onClick={() => setView('grid')}
                    className={cn(
                      "transition-all",
                      view === 'grid' ? "text-black scale-110" : "text-gray-400"
                    )}
                  >
                    <LayoutGrid size={24} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={cn(
                      "transition-all",
                      view === 'list' ? "text-black scale-110" : "text-gray-400"
                    )}
                  >
                    <ListIcon size={24} strokeWidth={2.5} />
                  </button>
                  <button className="text-gray-400 flex flex-col gap-1.5 items-center justify-center">
                    <div className="w-6 h-[3px] bg-current rounded-full" />
                    <div className="w-6 h-[3px] bg-current rounded-full" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative px-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full h-[54px] pl-6 pr-12 rounded-xl bg-white border border-gray-200 shadow-sm appearance-none text-[16px] font-bold text-black focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="popularity">Sort by popularity</option>
                    <option value="rating">Sort by average rating</option>
                    <option value="latest">Sort by latest</option>
                    <option value="price-low">Sort by price: low to high</option>
                    <option value="price-high">Sort by price: high to low</option>
                  </select>
                  <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" strokeWidth={2.5} />
                </div>

                {/* Sale Toggle and Results Summary */}
                <div className="flex items-center justify-between text-[12px] font-bold text-gray-500 pt-1 px-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={cn(
                      "w-6 h-6 rounded flex items-center justify-center transition-all border-2",
                      onlySale ? "bg-dark-blue border-dark-blue" : "bg-white border-gray-300"
                    )}>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={onlySale}
                        onChange={() => setOnlySale(!onlySale)}
                      />
                      {onlySale && <Check size={16} className="text-white" strokeWidth={4} />}
                    </div>
                    <span className="tracking-tight">Only products on sale</span>
                  </label>
                  <div className="opacity-80">
                    Showing {sortedProducts.length} results
                  </div>
                </div>
              </div>

              {/* Desktop Toolbar */}
              <div className="hidden md:flex bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-8">
                  <div className="flex bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                    <button
                      onClick={() => setView('grid')}
                      className={cn(
                        "p-2.5 rounded-lg transition-all",
                        view === 'grid' ? "bg-white shadow-md text-accent" : "text-gray-400 hover:text-gray-600"
                      )}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setView('list')}
                      className={cn(
                        "p-2.5 rounded-lg transition-all",
                        view === 'list' ? "bg-white shadow-md text-accent" : "text-gray-400 hover:text-gray-600"
                      )}
                    >
                      <ListIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-[13px] font-bold text-gray-500 flex items-center gap-2">
                    <span className="relative">
                      Showing {sortedProducts.length} results
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent/20" />
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="h-12 pl-6 pr-12 rounded-xl bg-gray-50 border border-gray-100 appearance-none cursor-pointer text-[12px] font-black text-dark-blue focus:ring-2 focus:ring-accent transition-all min-w-[200px] uppercase tracking-wider"
                    >
                      <option value="popularity">Default sorting</option>
                      <option value="rating">Sort by average rating</option>
                      <option value="latest">Sort by latest</option>
                      <option value="price-low">Sort by price: low to high</option>
                      <option value="price-high">Sort by price: high to low</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-accent transition-colors" />
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className={cn(
                "grid gap-6 transition-all duration-300",
                view === 'grid' ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              )}>
                {sortedProducts.length > 0 ? (
                  sortedProducts.slice(0, 12).map((product) => (
                    view === 'grid' ? (
                      <ProductCard key={product._id || product.id} {...product} />
                    ) : (
                      <ProductCardHorizontal key={product._id || product.id} {...product} />
                    )
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                      <Search className="text-gray-300 w-10 h-10" />
                    </div>
                    <p className="text-gray-500 font-bold">No products found matching your criteria.</p>
                    <Link href="/shop" className="text-accent font-black uppercase text-xs underline">Clear all filters</Link>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {sortedProducts.length > 12 && (
                <div className="pt-20 flex justify-center items-center gap-3">
                  <button className="w-12 h-12 rounded-xl bg-dark-blue text-white font-black text-sm shadow-xl shadow-dark-blue/20 transform hover:scale-110 transition-all">1</button>
                  {[2, 3, 4, 5].map(p => (
                    <button key={p} className="w-12 h-12 rounded-xl bg-white border border-gray-100 text-gray-600 font-bold text-sm hover:bg-accent hover:border-accent hover:text-dark-blue transition-all">
                      {p}
                    </button>
                  ))}
                  <button className="w-12 h-12 rounded-xl bg-white border border-gray-100 text-gray-600 font-bold text-sm hover:bg-accent hover:border-accent hover:text-dark-blue transition-all flex items-center justify-center group">
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Sticky Bottom Nav - As per Image */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[200] flex items-center justify-around h-[70px] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <button className="flex flex-col items-center gap-1">
          <User size={20} />
          <span className="text-[10px] font-bold text-gray-600">Account</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <LayoutGrid size={20} />
          <span className="text-[10px] font-bold text-gray-600">Categories</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 border border-gray-100 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>
          </div>
          <span className="text-[10px] font-bold text-gray-600">Car filter</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Search size={20} />
          <span className="text-[10px] font-bold text-gray-600">Search</span>
        </button>
        <button className="flex flex-col items-center gap-1 bg-gray-50 h-full w-[60px] justify-center">
          <Filter size={20} />
          <span className="text-[10px] font-bold text-gray-600">Filter</span>
        </button>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-1">
          <ChevronUp size={20} />
          <span className="text-[10px] font-bold text-gray-600">Top</span>
        </button>
      </div>

    </>
  );
}
