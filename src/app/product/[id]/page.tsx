"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  Star,
  Heart,
  GitCompare,
  Share2,
  Check,
  Info,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  ArrowRight,
  MessageSquare,
  Search,
  RotateCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/home/ProductCard';
import { getProductById, getProducts } from '@/lib/api';
import { Footer } from '@/components/layout/Footer';
import { InquiryModal } from '@/components/shop/InquiryModal';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState('');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [pData, allProducts] = await Promise.all([
          getProductById(productId),
          getProducts()
        ]);
        setProduct(pData);
        setSelectedImage(pData.image);
        setRelatedProducts(allProducts.filter((p: any) => p._id !== productId).slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <h1 className="text-4xl font-black text-dark-blue mb-4">Product Not Found</h1>
        <Link href="/shop" className="text-accent font-bold underline">Back to Shop</Link>
      </div>
    );
  }

  const galleryImages = (product.images && product.images.length > 0) 
    ? product.images 
    : [product.image];

  const productName = product.name;

  return (
    <>
    <InquiryModal 
      isOpen={isInquiryModalOpen}
      onClose={() => setIsInquiryModalOpen(false)}
      product={{
        id: product._id,
        name: product.name,
        sku: product.sku
      }}
    />
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
            <ChevronRight size={14} />
            <Link href="#" className="hover:text-accent transition-colors">Washer system</Link>
            <ChevronRight size={14} />
            <span className="text-dark-blue">{productName}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-[40px] p-12 border border-blue-50 relative group overflow-hidden aspect-square flex items-center justify-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    src={selectedImage}
                    alt={product.name}
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                </AnimatePresence>
                <div className="absolute top-8 left-8 flex flex-col gap-2">
                  {product.badge === 'Sale' && (
                    <span className="bg-[#ea1d22] text-dark-blue px-4 py-1.5 text-[11px] font-black uppercase rounded-xl shadow-sm tracking-widest animate-pulse">Sale</span>
                  )}
                  {product.badge === 'New' && (
                    <span className="bg-[#04BF33] text-white px-4 py-1.5 text-[11px] font-black uppercase rounded-xl shadow-sm tracking-widest">New!</span>
                  )}
                </div>
                <button className="absolute bottom-8 right-8 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-400 hover:text-accent transition-all opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 duration-500">
                  <Search size={24} />
                </button>
              </div>

              <div className="flex gap-4 px-2 overflow-x-auto pb-2 scrollbar-none">
                {galleryImages.map((img: string, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      "w-24 h-24 rounded-2xl border-2 transition-all overflow-hidden p-2 bg-white shrink-0",
                      selectedImage === img ? "border-accent shadow-lg shadow-accent/10" : "border-transparent grayscale hover:grayscale-0"
                    )}
                  >
                    <img src={img} className="w-full h-full object-contain" alt="" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: Product Main Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <img src={product.brandLogo} alt={product.brand} className="h-10 object-contain" />
                <span className="text-[10px] font-black text-white bg-[#034C8C] px-3 py-1 rounded-full uppercase tracking-widest">In Stock</span>
              </div>
              <h1 className="text-4xl xl:text-5xl font-black text-dark-blue leading-[1.1] uppercase tracking-tighter">
                {productName}
              </h1>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={cn(i < 4 ? "fill-accent text-accent" : "fill-gray-100 text-gray-100")} />
                  ))}
                  <span className="text-sm font-black text-dark-blue ml-2">{product.reviews || 0} Reviews</span>
                </div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none border-l pl-6 border-gray-200">
                  SKU: <span className="text-dark-blue">{product.sku}</span>
                </span>
              </div>
            </div>

            <div className="space-y-1">
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through font-bold">${product.originalPrice}</span>
              )}
              <div className="text-5xl font-black text-[#BC3120] tracking-tighter">${product.price}</div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="flex items-center bg-white border border-gray-200 rounded-xl h-14 px-2 shadow-inner">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-accent transition-colors"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  tabIndex={-1}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-12 text-center font-black text-dark-blue outline-none bg-transparent"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-accent transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button 
                onClick={() => setIsInquiryModalOpen(true)}
                className="flex-1 min-w-[200px] h-14 bg-accent text-dark-blue rounded-xl font-black uppercase text-sm flex items-center justify-center gap-3 hover:bg-dark-blue hover:text-white transition-all transform active:scale-95 shadow-xl shadow-accent/20"
              >
                <MessageSquare size={20} />
                Inquiry Now <ChevronRight size={18} />
              </button>
            </div>

            <button 
              onClick={() => setIsInquiryModalOpen(true)}
              className="w-full h-14 bg-dark-blue text-white rounded-xl font-black uppercase text-sm flex items-center justify-center gap-3 hover:bg-accent hover:text-dark-blue transition-all transform active:scale-95"
            >
              <Zap size={20} />
              Quick Inquiry <ChevronRight size={18} />
            </button>

            {/* Vehicle Compatibility Checker */}
            <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100/50 space-y-4">
              <div className="flex items-center gap-2 text-dark-blue">
                <div className="w-8 h-8 rounded-lg bg-dark-blue text-white flex items-center justify-center">
                  <Check size={16} />
                </div>
                <h4 className="text-[13px] font-black uppercase tracking-tight">Check if this fits your vehicle</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold text-gray-500 outline-none focus:border-accent">
                  <option>Select Make</option>
                  <option>BMW</option>
                  <option>Audi</option>
                </select>
                <select className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold text-gray-500 outline-none focus:border-accent">
                  <option>Select Model</option>
                </select>
              </div>
              <button className="w-full py-3 bg-white border border-gray-100 text-dark-blue rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-accent hover:border-accent transition-all">
                Check compatibility
              </button>
            </div>

            <div className="flex items-center gap-8 py-4 border-y border-gray-100">
              <button className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-accent transition-colors">
                <Heart size={16} /> Add to wishlist
              </button>
              <button className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-accent transition-colors">
                <GitCompare size={16} /> Add to compare
              </button>
              <button className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-accent transition-colors">
                <Share2 size={16} /> Share
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: 'Fast Delivery', sub: '2-4 Days', icon: Zap },
                { label: 'Secure Pay', sub: 'SSL Secure', icon: Check },
                { label: '24/7 Support', sub: 'Expert Help', icon: MessageSquare }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center p-3 bg-white rounded-2xl border border-gray-50 shadow-sm">
                  <badge.icon size={18} className="text-accent mb-2" />
                  <span className="text-[9px] font-black uppercase text-dark-blue leading-none">{badge.label}</span>
                  <span className="text-[8px] font-bold text-gray-300 uppercase mt-1 tracking-tighter">{badge.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Spec & Features */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-black text-dark-blue uppercase tracking-tight text-sm flex items-center gap-2">
                  <Info size={16} className="text-accent" /> Product information
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: 'Weight', value: product.details?.weight },
                  { label: 'Dimensions', value: product.details?.dimensions },
                  { label: 'Voltage', value: product.details?.voltage },
                  { label: 'Fitting Position', value: product.details?.fittingPosition },
                  { label: 'Drive Type', value: product.details?.driveType },
                  { label: 'Op. Mode', value: product.details?.opMode },
                  { label: 'Brand', value: product.brand },
                  { label: 'MPN', value: product.details?.mpn },
                  { label: 'EAN', value: product.details?.ean },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-4 text-[11px] font-bold border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <span className="text-gray-400 uppercase tracking-wider">{item.label}</span>
                    <span className="text-dark-blue text-right">{item.value || 'N/A'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-black text-dark-blue uppercase tracking-tight text-sm flex items-center gap-2">
                  <Check size={16} className="text-accent" /> Features
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {(product.features || []).map((feature: string, i: number) => (
                  <div key={i} className="flex gap-3 text-xs font-bold leading-relaxed">
                    <Check size={14} className="text-[#04BF33] shrink-0 mt-0.5" />
                    <span className="text-dark-blue">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Product Inner Tabs / Detailed Sections */}
        <div className="mt-24 space-y-20">

          {/* Frequently Bought Together */}
          <section className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
             <div className="flex items-center gap-3 mb-8">
               <RotateCw className="text-accent" size={20} />
               <h2 className="text-2xl font-black text-dark-blue uppercase tracking-tight italic font-oswald">Frequently bought together</h2>
             </div>
             <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-6">
                   {[
                     { name: 'RIDEX WIPER MOTOR', price: 31.29, image: 'https://enovathemes.com/mobex/wp-content/uploads/product-125-img-1.webp' },
                     { name: 'RIDEX CONTROL ARM', price: 20.11, image: 'https://enovathemes.com/mobex/wp-content/uploads/product-41-img-1-600x600.webp' },
                     { name: 'HELLA BULB', price: 5.32, image: 'https://enovathemes.com/mobex/wp-content/uploads/product-111-img-1.webp' },
                   ].map((item: any, i: number) => (
                     <React.Fragment key={i}>
                       <div className="flex items-center gap-4 bg-gray-50 pr-6 rounded-2xl border border-gray-100 transition-all hover:bg-white hover:shadow-lg group">
                          <div className="w-20 h-20 p-2 bg-white rounded-xl">
                             <img src={item.image} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-dark-blue uppercase tracking-tight leading-none mb-1">{item.name}</span>
                             <span className="text-[13px] font-black text-accent">${item.price}</span>
                          </div>
                       </div>
                       {i < 2 && <Plus className="text-gray-200" size={20} />}
                     </React.Fragment>
                   ))}
                </div>
                <div className="flex-1 flex flex-col items-end gap-2 border-l border-gray-100 pl-8">
                   <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Price</div>
                   <div className="text-3xl font-black text-dark-blue italic font-oswald">$56.72</div>
                   <button className="h-12 px-8 bg-accent text-dark-blue rounded-xl font-black uppercase text-[11px] tracking-widest hover:bg-dark-blue hover:text-white transition-all">
                      Add all to cart
                   </button>
                </div>
             </div>
          </section>

          {/* Description with Banners */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 bg-white rounded-[40px] p-12 border border-gray-100 shadow-sm space-y-12">
              <div className="relative rounded-[30px] overflow-hidden aspect-[21/9]">
                 <img src="https://enovathemes.com/mobex/wp-content/uploads/product-description-banner.webp" className="w-full h-full object-cover" alt="" />
                 <div className="absolute inset-0 bg-dark-blue/20" />
              </div>
              <div className="prose max-w-none text-gray-500 font-medium leading-[1.8] space-y-6">
                <p>The LIQUI MOLY Top Tec 4200 5W-30 Engine Oil is a premium, high-tech, low-friction motor oil based on synthetic technology. Developed for the high requirements of Audi, BMW, Mercedes-Benz, and the VW Group. The low-SAPS technology guarantees optimum engine cleanliness and protects the particulate filter from clogging.</p>
                <div className="grid grid-cols-2 gap-8 py-8">
                   <div className="space-y-4">
                      <h4 className="text-xl font-black text-dark-blue uppercase italic font-oswald">Premium Quality</h4>
                      <p className="text-sm">Exceeds industry standards for engine protection and performance in extreme conditions.</p>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-xl font-black text-dark-blue uppercase italic font-oswald">Eco-Friendly</h4>
                      <p className="text-sm">Low emission technology helps reduce environmental impact and improves fuel efficiency.</p>
                   </div>
                </div>
                <p>Curabitur vitae porta odio. Nunc in justo non purus malesuada lacinia. In hac habitasse platea dictumst. Sed venenatis, arcu ac ultrices facilisis, augue velit malesuada ex, vestibulum ex mi at justo. Vestibulum sollicitudin euismod odio, a aliquet ex pellentesque et. Suspendisse euismod in erat ac dignissim.</p>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
               <div className="bg-[#034C8C] rounded-[40px] p-10 text-white relative overflow-hidden group">
                  <span className="text-[10px] font-black uppercase text-accent tracking-widest mb-4 block">Recommended</span>
                  <h4 className="text-3xl font-black italic tracking-tighter leading-none mb-6 uppercase">
                    Care Care <br /> Kit
                  </h4>
                  <p className="text-white/60 text-xs mb-8 font-medium">Keep your vehicle in pristine condition with our curated selection of cleaning products.</p>
                  <button className="h-10 px-6 bg-white text-dark-blue rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-accent transition-all relative z-10">
                    View more
                  </button>
                  <ShoppingCart className="absolute -bottom-10 -right-10 w-48 h-48 text-white/[0.05] group-hover:scale-110 transition-transform" />
               </div>

               <div className="bg-accent rounded-[40px] p-10 text-dark-blue relative overflow-hidden group">
                  <span className="text-[10px] font-black uppercase text-white tracking-widest mb-4 block">New Brand</span>
                  <h4 className="text-3xl font-black italic tracking-tighter leading-none mb-6 uppercase">
                    Mobil 1 <br /> Racing
                  </h4>
                  <p className="text-dark-blue/60 text-xs mb-8 font-medium">Experience the power of professional racing technology in your daily commute.</p>
                  <button className="h-10 px-6 bg-dark-blue text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-dark-blue transition-all relative z-10">
                    Discover
                  </button>
                  <Zap className="absolute -bottom-10 -right-10 w-48 h-48 text-dark-blue/[0.05] group-hover:rotate-12 transition-transform" />
               </div>
            </div>
          </section>

          {/* Compatible Vehicles */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-dark-blue uppercase tracking-tight italic font-oswald leading-none">Compatible vehicles</h2>
              <div className="bg-accent/10 px-4 py-2 rounded-xl flex items-center gap-2">
                <Info size={16} className="text-dark-blue" />
                <span className="text-[10px] font-black uppercase text-dark-blue tracking-wider">Please check your VIN before ordering</span>
              </div>
            </div>
            <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      {['Make', 'Model', 'Year', 'Engine', 'Transmission', 'Trim'].map((h) => (
                        <th key={h} className="px-8 py-6 text-[10px] font-black uppercase text-dark-blue tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {[
                       { make: 'BMW', model: 'X5 (E70)', year: '2007-2013', engine: '4.4 xDrive 50i', transmission: '6 Speed Auto', trim: '407hp 300kW' },
                       { make: 'BMW', model: 'X6 (E71)', year: '2008-2014', engine: '4.4 xDrive 50i', transmission: '6 Speed Auto', trim: '407hp 300kW' },
                       { make: 'Audi', model: 'A6 (C6)', year: '2004-2011', engine: '3.0 TFSI quattro', transmission: '6 Speed Auto', trim: '290hp 213kW' },
                       { make: 'Audi', model: 'Q7 (4LB)', year: '2006-2015', engine: '3.0 TFSI quattro', transmission: '8 Speed Auto', trim: '272hp 200kW' },
                     ].map((item: any, i: number) => (
                      <tr key={i} className="hover:bg-blue-50/30 transition-all group">
                        <td className="px-8 py-6">
                          <span className="text-[12px] font-black text-dark-blue uppercase bg-gray-50 px-3 py-1 rounded-lg group-hover:bg-accent transition-colors">{item.make}</span>
                        </td>
                        <td className="px-8 py-6 text-[13px] font-bold text-dark-blue">{item.model}</td>
                        <td className="px-8 py-6 text-[13px] font-bold text-gray-400">{item.year}</td>
                        <td className="px-8 py-6 text-[13px] font-black text-gray-900">{item.engine}</td>
                        <td className="px-8 py-6 text-[12px] font-bold text-gray-500">{item.transmission}</td>
                        <td className="px-8 py-6 text-[11px] font-bold text-gray-400 italic">{item.trim}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Compare Products */}
          <section className="space-y-8">
            <h2 className="text-3xl font-black text-dark-blue uppercase tracking-tight italic font-oswald leading-none">Compare products</h2>
            <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm">
               <div className="grid grid-cols-1 md:grid-cols-4 divide-x divide-gray-50">
                  <div className="p-8 space-y-8">
                     <div className="h-40 flex items-center justify-center grayscale opacity-20">
                        <span className="text-xs font-black uppercase tracking-widest">Specifications</span>
                     </div>
                     <div className="space-y-4 pt-12">
                        {['Price', 'Weight', 'Dimensions', 'Warranty', 'Availability'].map(v => (
                          <div key={v} className="text-[11px] font-black text-gray-400 uppercase tracking-widest h-10 flex items-center">{v}</div>
                        ))}
                     </div>
                  </div>
                  {[
                    { name: 'LIQUI MOLY TOP TEC 4200', price: '$56.72', image: 'https://enovathemes.com/mobex/wp-content/uploads/product-124-img-1.webp' },
                    { name: 'CASTROL EDGE 5W-30', price: '$48.90', image: 'https://enovathemes.com/mobex/wp-content/uploads/product-123-img-1.webp' },
                    { name: 'SHELL HELIX ULTRA', price: '$52.15', image: 'https://enovathemes.com/mobex/wp-content/uploads/product-122-img-1.webp' },
                  ].map((p: any, i: number) => (
                    <div key={i} className="p-8 space-y-8 hover:bg-gray-50 transition-all group">
                       <div className="h-40 flex flex-col items-center justify-center text-center gap-4">
                          <img src={p.image} className="h-24 object-contain group-hover:scale-110 transition-transform" alt="" />
                          <h4 className="text-[11px] font-black text-dark-blue uppercase tracking-tight leading-tight">{p.name}</h4>
                       </div>
                       <div className="space-y-4 pt-4 text-center">
                          <div className="text-lg font-black text-accent h-10 flex items-center justify-center">{p.price}</div>
                          <div className="text-[12px] font-bold text-dark-blue h-10 flex items-center justify-center">5.0 kg</div>
                          <div className="text-[12px] font-bold text-dark-blue h-10 flex items-center justify-center">10x10x25 cm</div>
                          <div className="text-[12px] font-bold text-dark-blue h-10 flex items-center justify-center">2 Years</div>
                          <div className="h-10 flex items-center justify-center">
                             <span className="text-[9px] font-black text-white bg-green-500 px-3 py-1 rounded-full uppercase">In Stock</span>
                          </div>
                          <button className="w-full h-10 bg-dark-blue text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-dark-blue transition-all mt-4">
                             Add to cart
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </section>

          {/* Related Products */}
          <section className="space-y-12">
            <h2 className="text-3xl font-black text-dark-blue uppercase tracking-tight">Related products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {relatedProducts.map((product: any) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="bg-white rounded-[40px] p-12 border border-gray-100 shadow-sm space-y-12 text-center max-w-4xl mx-auto">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-dark-blue uppercase tracking-tight">Reviews</h2>
              <p className="text-gray-500 font-medium">There are no reviews yet.</p>
            </div>

            <div className="space-y-10 text-left pt-12 border-t border-gray-100">
              <h3 className="text-2xl font-black text-dark-blue tracking-tight">Be the first to review &ldquo;{product.name}&rdquo;</h3>
              <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">Your email address will not be published. Required fields are marked *</p>

              <div className="space-y-8 max-w-3xl">
                {/* Rating Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-black text-dark-blue uppercase tracking-tight">Your rating *</label>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((s: number) => (
                      <button key={s} className="hover:scale-110 transition-transform">
                        <div className="flex gap-0.5">
                          {[...Array(s)].map((_, i) => <Star key={i} size={14} className="fill-accent text-accent" />)}
                          {[...Array(5 - s)].map((_, i) => <Star key={i} size={14} className="fill-gray-100 text-gray-100" />)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Textarea */}
                <div className="space-y-3">
                  <label className="text-sm font-black text-dark-blue uppercase tracking-tight">Your review *</label>
                  <textarea
                    className="w-full bg-[#F8F9FA] rounded-xl p-6 min-h-[200px] outline-none border border-transparent focus:border-accent transition-all text-dark-blue font-medium"
                    placeholder="Write your review here..."
                  />
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-black text-dark-blue uppercase tracking-tight">Name *</label>
                    <input className="w-full bg-[#F8F9FA] rounded-xl px-6 h-14 outline-none border border-transparent focus:border-accent transition-all text-dark-blue font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-dark-blue uppercase tracking-tight">Email *</label>
                    <input className="w-full bg-[#F8F9FA] rounded-xl px-6 h-14 outline-none border border-transparent focus:border-accent transition-all text-dark-blue font-medium" />
                  </div>
                </div>

                <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-gray-200 flex items-center justify-center group-hover:border-accent transition-all">
                    <Check size={12} className="text-accent opacity-0 group-hover:opacity-100" />
                  </div>
                  <span className="text-[13px] font-bold text-gray-500">Save my name, email, and website in this browser for the next time I comment.</span>
                </div>

                <button className="h-14 px-12 bg-dark-blue text-white rounded-xl font-black uppercase text-sm hover:bg-accent hover:text-dark-blue transition-all transform active:scale-95">
                  Submit
                </button>
              </div>
            </div>
          </section>

          {/* Q&A Section */}
          <section className="text-center space-y-4">
            <h2 className="text-3xl font-black text-dark-blue uppercase tracking-tight">Questions and Answers</h2>
            <p className="text-gray-500 font-medium">There are no questions yet.</p>
          </section>

        </div>
      </div>
    </div>
    <Footer variant="product" />
    </>
  );
}

// Simple Icon Components for Social Share
function FacebookIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z" /></svg> }
function TwitterIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg> }
function PinterestIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.259 7.929-7.259 4.162 0 7.398 2.964 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.992 5.367 18.625 0 12.017 0z" /></svg> }
function LinkedinIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.981 0 1.775-.773 1.775-1.729V1.729C24 .774 23.206 0 22.225 0z" /></svg> }
function WhatsappIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> }
function TelegramIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" /></svg> }
function MailIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg> }
