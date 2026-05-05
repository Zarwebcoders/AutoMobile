"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  PhoneCall,
  MessageSquare,
  MapPin,
  ChevronDown,
  Heart,
  ShoppingCart,
  Menu,
  RotateCw,
  Search,
  Filter,
  FileDown
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductSearch } from './ProductSearch';
import { MobileSideBar } from './MobileSideBar';

import { useUIStore } from '@/store/useUIStore';

const MegaMenu = dynamic(() => import('./MegaMenu').then(mod => mod.MegaMenu), { ssr: false });
const BrandMegaMenu = dynamic(() => import('./BrandMegaMenu').then(mod => mod.BrandMegaMenu), { ssr: false });

export const NavBar = () => {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isBrandMenuOpen, setIsBrandMenuOpen] = useState(false);
  const { openMobileSideBar } = useUIStore();

  const [isSticky, setIsSticky] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeAllMenus = () => {
    setIsMegaMenuOpen(false);
    setIsBrandMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop by brand', href: '#' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      <div className={cn(
        "w-full sticky top-0 z-[110] transition-all duration-300 bg-dark-blue",
        isSticky ? "shadow-2xl" : "shadow-md"
      )}>
        <header 
          className="w-full flex flex-col items-center"
          onMouseLeave={() => {
            setIsMegaMenuOpen(false);
            setIsBrandMenuOpen(false);
          }}
        >
          {/* Desktop Top Bar */}
          <div className="hidden lg:block bg-[#05111b] text-white/90 text-[12px] py-2 border-b border-white/5 w-full">
            <div className="px-6 flex justify-between items-center">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 group">
                  <PhoneCall className="w-3.5 h-3.5 text-[#ef233c]" />
                  <span className="font-bold">Call us between 8 AM - 10 PM / <a href="tel:+919737442444" className="text-white hover:text-[#ef233c] transition-colors">9737442444</a></span>
                </div>
                <div className="flex items-center gap-2 group border-l border-white/10 pl-8">
                  <MessageSquare className="w-3.5 h-3.5 text-[#ef233c]" />
                  <a href="https://wa.me/919737442444" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[#ef233c] transition-colors underline underline-offset-4 decoration-[#ef233c]/30">Live Chat / Chat with an Expert</a>
                </div>
              </div>
              <a href="/Catalogue.pdf" download className="flex items-center gap-2 hover:text-[#ef233c] transition-colors group">
                <FileDown className="w-3.5 h-3.5 text-[#ef233c]" />
                <span className="font-bold">Download Catalogue</span>
              </a>
            </div>
          </div>

          {/* Desktop Main Header */}
          <div className={cn("w-full py-5 border-b border-white/5 hidden lg:block transition-all", isSticky ? "bg-dark-blue/95 backdrop-blur-md" : "bg-dark-blue")}>
            <div className="container mx-auto px-4 flex items-center justify-between gap-8 text-white">
              <Link href="/" className="flex items-center shrink-0">
                <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain" />
              </Link>
              <div className="flex items-center gap-10 flex-1">
                <div 
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  className="flex items-center gap-3 bg-[#ef233c] text-white px-6 py-3 rounded-xl cursor-pointer font-black uppercase text-xs shadow-lg shadow-[#ef233c]/20 hover:scale-105 transition-all"
                >
                  <Menu className="w-4 h-4" />
                  <span className="border-b-2 border-dark-blue/20 pb-0.5">All categories</span>
                </div>
                <nav className="flex items-center gap-8 font-black text-[13px] uppercase tracking-wide">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href} 
                      onMouseEnter={() => link.name === 'Shop by brand' ? setIsBrandMenuOpen(true) : setIsBrandMenuOpen(false)}
                      className={cn(
                        "relative py-2 transition-all hover:text-[#ef233c]",
                        pathname === link.href ? "text-[#ef233c] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#ef233c]" : ""
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <Search className="w-5 h-5 text-white/70 hover:text-[#ef233c] cursor-pointer transition-colors" />
                <RotateCw className="w-5 h-5 text-white/70 hover:text-[#ef233c] cursor-pointer transition-colors" />
                <div className="relative cursor-pointer group">
                  <Heart className="w-5 h-5 text-white/70 group-hover:text-[#ef233c] transition-colors" />
                  <span className="absolute -top-2 -right-2 bg-[#ef233c] text-white w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center border border-dark-blue">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Sticky Part (Logo + Search) */}
          <div className="lg:hidden w-full bg-dark-blue text-white flex flex-col">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <Link href="/">
                <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain" />
              </Link>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingCart className="w-7 h-7 text-white" />
                  <span className="absolute -top-1 -right-2 bg-accent text-black rounded-full w-[18px] h-[18px] text-[10px] flex items-center justify-center font-black shadow-lg">0</span>
                </div>
                <button onClick={() => openMobileSideBar('categories')}>
                  <Menu size={28} className="text-white" />
                </button>
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="bg-white rounded-lg flex items-center h-[40px] px-4 shadow-inner overflow-hidden">
                <Search className="text-accent w-4 h-4 mr-3 shrink-0" />
                <input type="text" placeholder="What are you looking for?" className="flex-1 bg-transparent border-none outline-none text-gray-800 font-medium placeholder:text-gray-400 text-[13px]" />
                <Filter className="text-accent w-4 h-4 ml-2 shrink-0" />
              </div>
            </div>
          </div>
        </header>

        {/* Mega Menus Rendered inside the sticky container to persist hover */}
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
        <BrandMegaMenu isOpen={isBrandMenuOpen} onClose={() => setIsBrandMenuOpen(false)} />
      </div>

      {/* Mobile Non-Sticky Brand Icons */}
      {pathname !== '/shop' && (
        <div className="lg:hidden w-full bg-dark-blue border-t border-white/5 pb-8 pt-2">
          <div className="w-full overflow-x-auto no-scrollbar flex items-start gap-4 px-4 snap-x snap-mandatory">
            {[
              { name: 'JPM', img: '/assets/JPM.svg', pdf: '/assets/JPM.pdf' },
              { name: 'MK', img: '/assets/MK.png', pdf: '/assets/MK.pdf' },
              { name: 'ROYAL ENFIELD', img: '/assets/ROYALENFIELD.jpg', pdf: '/assets/ROYALENFIELD.pdf' },
              { name: 'SPACO', img: '/assets/SPACO.png', pdf: '/assets/SPACO.pdf' },
              { name: 'Varroc', img: '/assets/Varroc.webp', pdf: '/assets/Varroc.pdf' },
              { name: 'YANGO', img: '/assets/YANGO.png', pdf: '/assets/YANGO.pdf' },
            ].map((cat, i) => (
              <Link key={i} href={cat.pdf} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 shrink-0 snap-start min-w-[75px]">
                <div className="w-[75px] h-[75px] rounded-full bg-white/10 flex items-center justify-center p-2.5 border border-white/5 shadow-xl relative overflow-hidden group/cat active:scale-95 transition-all">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-contain z-10 transition-transform group-hover/cat:scale-110" />
                </div>
                <span className="text-white text-[11px] font-black uppercase tracking-wider text-center">{cat.name}</span>
              </Link>
            ))}
            <div className="w-8 shrink-0 h-1" />
          </div>
        </div>
      )}

      <MobileSideBar navLinks={navLinks} />
    </>
  );
};
