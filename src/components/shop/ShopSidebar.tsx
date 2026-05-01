"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, Star, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCategories } from '@/lib/api';

const BRANDS = [
  { name: 'DENSO', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/denso.svg' },
  { name: 'KRAFT', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/kraft.svg' },
  { name: 'LuK', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/luk.svg' },
  { name: 'MEYLE', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/meyle.svg' },
  { name: 'ORIGINAL IMPERIUM', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/original-imperium.svg' },
  { name: 'RIDEX', count: 7, logo: 'https://enovathemes.com/mobex/wp-content/uploads/ridex.svg' },
  { name: 'SACHS', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/Sachs.svg' },
  { name: 'STARK', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/stark.svg' },
  { name: 'VAICO', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/vaico.svg' },
  { name: 'VEMO', count: 1, logo: 'https://enovathemes.com/mobex/wp-content/uploads/vemo.svg' },
];

export const ShopSidebar = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 1150]);
  const [brandSearch, setBrandSearch] = useState('');
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

  const handleFilter = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('query', value);
    router.push(`/shop?${params.toString()}`);
  };

  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('min', priceRange[0].toString());
    params.set('max', priceRange[1].toString());
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <aside className="space-y-8">
      {/* Product Categories */}
      <section className="hidden md:block">
        <h3 className="text-[15px] font-black text-dark-blue uppercase tracking-tighter mb-4 pb-2 border-b-2 border-accent inline-block">
          Product categories
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => handleFilter('category', cat.name)}
              className="flex items-center justify-between py-2 group cursor-pointer"
            >
              <span className="text-[13px] font-bold text-gray-500 group-hover:text-accent transition-colors">
                {cat.name}
              </span>
              <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-accent transition-transform group-hover:translate-x-1" />
            </div>
          ))}
        </div>
      </section>

      {/* Filter by Price */}
      <section className="hidden md:block bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-black text-dark-blue uppercase">Filter by price</h3>
          <button
            onClick={() => {
              setPriceRange([0, 1150]);
              router.push('/shop');
            }}
            className="text-[10px] font-black uppercase text-gray-400 hover:text-accent underline transition-colors"
          >
            Clear
          </button>
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="1500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-accent"
            />
            <div className="flex items-center gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[9px] font-black text-gray-400 uppercase ml-1">Min</span>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg text-center font-black text-xs text-dark-blue border border-gray-100 focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[9px] font-black text-gray-400 uppercase ml-1">Max</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg text-center font-black text-xs text-dark-blue border border-gray-100 focus:ring-1 focus:ring-accent outline-none"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handlePriceFilter}
            className="w-full py-3 bg-dark-blue text-white rounded-xl text-xs font-black uppercase hover:bg-accent hover:text-dark-blue hover:shadow-lg hover:shadow-accent/20 transition-all font-oswald italic tracking-widest"
          >
            Filter
          </button>
        </div>
      </section>

      {/* Filter by Brand */}
      <section className="hidden md:block bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-black text-dark-blue uppercase mb-6">Filter by brand</h3>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Type a keyword"
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-gray-50 rounded-xl border-none text-xs font-bold focus:ring-2 focus:ring-accent transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <div className="space-y-3 max-h-[300px] overflow-y-auto no-scrollbar">
          {BRANDS.filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase())).map((brand) => (
            <div
              key={brand.name}
              onClick={() => handleFilter('brand', brand.name)}
              className="flex items-center justify-between px-1 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border-2 border-gray-200 group-hover:border-accent transition-colors" />
                <img src={brand.logo} alt={brand.name} className="w-4 h-4 object-contain opacity-50 contrast-125" />
                <span className="text-[12px] font-bold text-gray-500 group-hover:text-dark-blue transition-colors">{brand.name}</span>
              </div>
              <span className="text-[10px] font-black text-gray-300">({brand.count})</span>
            </div>
          ))}
        </div>
      </section>

      {/* Average Rating */}
      <section className="hidden md:block bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-black text-dark-blue uppercase mb-6">Average rating</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={cn(
                      "transition-colors",
                      i < rating ? "fill-accent text-accent" : "text-gray-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-[10px] font-black text-gray-300">({rating * 2})</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter by Condition */}
      <section className="hidden md:block bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-black text-dark-blue uppercase mb-6">Filter by condition</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded border-2 border-gray-200 group-hover:border-accent transition-colors" />
              <span className="text-[12px] font-bold text-gray-500 group-hover:text-dark-blue transition-colors">New</span>
            </div>
            <span className="text-[10px] font-black text-gray-300">(16)</span>
          </div>
          <div className="flex items-center justify-between opacity-50">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded border-2 border-gray-200" />
              <span className="text-[12px] font-bold text-gray-500">Used</span>
            </div>
            <span className="text-[10px] font-black text-gray-300">(0)</span>
          </div>
        </div>
      </section>

      {/* Help Banner */}
      <div className="bg-[#034C8C] rounded-2xl p-10 text-white relative overflow-hidden group">
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase text-accent tracking-widest mb-4 block">Expert Support</span>
          <h4 className="text-3xl font-black italic -skew-x-12 tracking-tighter leading-none mb-4 uppercase">
            Need help <br /> deciding?
          </h4>
          <p className="text-white/60 text-xs mb-8 font-medium">Our specialists are ready to help you find the perfect match for your vehicle.</p>
          <a href="tel:9737442444" className="block w-full py-4 bg-accent text-dark-blue text-center font-black uppercase text-xs rounded-xl hover:bg-white transition-all transform group-hover:scale-[1.05]">
            Call 97374 42444
          </a>
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all duration-700" />
      </div>
    </aside>
  );
};
