"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { ProductSearch } from '@/components/layout/ProductSearch';
import { VerticalVehicleFilter } from '@/components/shop/VerticalVehicleFilter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { getProducts } from '@/lib/api';
import {
  ChevronRight, Search, ShoppingCart, Heart, RotateCw, User,
  LayoutGrid, CheckCircle2, AlertCircle, Star, StarHalf,
  Phone, MessageSquare, MapPin, Truck, Shield, Package,
  Wrench, Zap, Timer, TrendingUp, ArrowRight, Quote,
  PlayCircle, ChevronLeft, Eye, Plus, Minus, SlidersHorizontal,
  Award, Clock, RefreshCw, X
} from 'lucide-react';

import { ElementsHero } from '@/components/elements/ElementsHero';
import { ParallaxBanner } from '@/components/elements/ParallaxBanner';
import { FeatureIntro } from '@/components/elements/FeatureIntro';
import { ImageGridFeature } from '@/components/elements/ImageGridFeature';
import { IconBoxes } from '@/components/elements/IconBoxes';
import { FixedBanner, VideoBanner } from '@/components/elements/BannerSections';
import { Infographics } from '@/components/elements/Infographics';
import { PricingTables } from '@/components/elements/PricingTables';
import { AccordionsShowcase } from '@/components/elements/AccordionsShowcase';
import { TestimonialsSlider } from '@/components/elements/TestimonialsSlider';
import { TeamGrid } from '@/components/elements/TeamGrid';
import { DetailedIconLists } from '@/components/elements/DetailedIconLists';
import { CategoryBanners } from '@/components/elements/CategoryBanners';
import { NewsletterCTA } from '@/components/elements/NewsletterCTA';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

/* ─── helpers ─── */
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={12}
        className={i <= Math.floor(rating) ? 'fill-accent text-accent' : 'text-gray-200 fill-gray-200'}
      />
    ))}
  </div>
);

const SectionTitle = ({ label, title, sub }: { label?: string; title: string; sub?: string }) => (
  <div className="mb-10">
    {label && <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-3">{label}</p>}
    <h2 className="text-4xl font-black font-oswald text-dark-blue uppercase tracking-tight">{title}</h2>
    {sub && <p className="text-gray-500 mt-3 max-w-xl">{sub}</p>}
    <div className="mt-4 flex gap-1.5"><div className="h-1 w-12 bg-accent rounded-full"/><div className="h-1 w-4 bg-accent/30 rounded-full"/></div>
  </div>
);

/* ─── Countdown Timer ─── */
function Countdown() {
  const end = useRef(Date.now() + 48 * 3600 * 1000);
  const [time, setTime] = useState({ d: 1, h: 23, m: 59, s: 0 });
  useEffect(() => {
    const t = setInterval(() => {
      const diff = Math.max(0, end.current - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  const Box = ({ val, lbl }: { val: number; lbl: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg w-14 h-14 flex items-center justify-center font-black font-oswald text-2xl text-white tabular-nums">{pad(val)}</div>
      <span className="text-[9px] font-black uppercase tracking-widest text-white/60 mt-1">{lbl}</span>
    </div>
  );
  return <div className="flex gap-3"><Box val={time.d} lbl="Days"/><Box val={time.h} lbl="Hrs"/><Box val={time.m} lbl="Min"/><Box val={time.s} lbl="Sec"/></div>;
}

/* ─── Animated Counter ─── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = () => {
        start = Math.min(start + Math.ceil(to / 60), to);
        setVal(start);
        if (start < to) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref} className="tabular-nums">{val.toLocaleString()}{suffix}</span>;
}

/* ─── Mini Product Card ─── */
const ProductCard = ({ product }: { product: any }) => (
  <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="relative overflow-hidden bg-gray-50 aspect-square">
      <Link href={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"/>
      </Link>
      {product.badge && (
        <span className={`absolute top-3 left-3 text-[9px] font-black uppercase px-2.5 py-1 rounded-full ${product.badge === 'Sale' ? 'bg-accent text-dark-blue' : product.badge === 'New' ? 'bg-dark-blue text-white' : 'bg-green-500 text-white'}`}>
          {product.badge}
        </span>
      )}
      <div className="absolute inset-0 bg-dark-blue/0 group-hover:bg-dark-blue/5 transition-colors"/>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
        <button className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-dark-blue hover:bg-accent transition-colors"><Heart size={14}/></button>
        <button className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-dark-blue hover:bg-accent transition-colors"><RotateCw size={14}/></button>
        <Link href={`/product/${product._id}`} className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-dark-blue hover:bg-accent transition-colors"><Eye size={14}/></Link>
      </div>
    </div>
    <div className="p-4">
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{product.brand}</p>
      <h4 className="text-sm font-bold text-dark-blue leading-snug mb-2 line-clamp-2">{product.name}</h4>
      <StarRating rating={product.rating || 5}/>
      <div className="flex items-center justify-between mt-3">
        <div>
          <span className="text-lg font-black text-dark-blue">${product.price}</span>
          {product.originalPrice && <span className="text-xs text-gray-400 line-through ml-2">${product.originalPrice}</span>}
        </div>
        <button className="w-9 h-9 rounded-full bg-dark-blue text-accent flex items-center justify-center hover:bg-accent hover:text-dark-blue transition-colors">
          <ShoppingCart size={14}/>
        </button>
      </div>
    </div>
  </div>
);

/* ─── Tab Component ─── */
const tabs = ['All Parts', 'Engine', 'Brakes', 'Filters', 'Oils & Fluids'];

/* ─── Icon Box ─── */
const IconBox = ({ icon: Icon, title, text }: { icon: React.ElementType; title: string; text: string }) => (
  <div className="group p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300">
    <div className="w-14 h-14 rounded-xl bg-accent/10 group-hover:bg-accent flex items-center justify-center mb-5 transition-colors duration-300">
      <Icon size={24} className="text-accent group-hover:text-dark-blue transition-colors duration-300"/>
    </div>
    <h4 className="font-black font-oswald text-dark-blue uppercase text-lg mb-2">{title}</h4>
    <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
  </div>
);

export default function ElementsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [qty, setQty] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const showcaseProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar/>

      {/* ── Page Hero ── */}
      <div className="bg-dark-blue text-white py-10">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: 'Elements' }]} className="mb-4 [&_*]:text-white/60 [&_a:hover]:text-accent"/>
          <h1 className="text-6xl font-black font-oswald italic uppercase tracking-tighter">
            UI Elements & <span className="text-accent">Animations</span>
          </h1>
          <p className="text-white/60 mt-3 max-w-2xl text-base">A comprehensive showcase of the MOBEX design system — premium components built for high-performance e-commerce.</p>
        </div>
      </div>

      <main className="flex-1 space-y-0">

        {/* ─── Premium Showcase: First 5 Sections ─── */}
        <ElementsHero />
        <FeatureIntro />
        <ParallaxBanner />
        <ImageGridFeature />
        <IconBoxes />
        <CategoryBanners />

        {/* ─── Premium Showcase: Another 5 Sections ─── */}
        <FixedBanner />
        <VideoBanner />
        <Infographics />
        <PricingTables />
        <AccordionsShowcase />

        {/* ─── Premium Showcase: Final 5 Sections ─── */}
        <TestimonialsSlider />
        <TeamGrid />
        <DetailedIconLists />
        <NewsletterCTA />

        {/* ─── NEW: High-Fidelity Interactive Elements ─── */}
        <section className="py-24 bg-white border-t border-slate-100 overflow-hidden">
          <div className="container mx-auto px-4 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Special Offers</span>
                <h2 className="text-4xl font-black font-oswald text-dark-blue uppercase italic leading-none">Flash Sale <span className="text-accent underline decoration-4 underline-offset-8 decoration-accent/20">Ends In:</span></h2>
              </div>
              <Countdown />
            </div>

            <div className="relative group">
               {/* Mobile/Line Scroll for products */}
               <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-8 lg:pb-0 no-scrollbar snap-x snap-mandatory">
                  {products.slice(4, 12).map((product) => (
                    <div key={product._id} className="min-w-[280px] lg:min-w-0 snap-center shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ))}
               </div>
               
               <div className="lg:hidden flex justify-center gap-2 mt-4 text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest animate-pulse">Swipe to explore products →</span>
               </div>
            </div>
          </div>
        </section>

      </main>

      <Footer/>
      <MobileBottomNav />
    </div>
  );
}

