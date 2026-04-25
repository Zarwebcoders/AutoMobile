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
  LayoutGrid,
  Search,
  User,
  Settings,
  Filter,
  LogOut,
  FileDown
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductSearch } from './ProductSearch';
import { MobileSideBar } from './MobileSideBar';
import { MyGarageDropdown } from './MyGarageDropdown';
import { useUIStore } from '@/store/useUIStore';

const MegaMenu = dynamic(() => import('./MegaMenu').then(mod => mod.MegaMenu), { ssr: false });
const BrandMegaMenu = dynamic(() => import('./BrandMegaMenu').then(mod => mod.BrandMegaMenu), { ssr: false });

import { useAuth } from '@/context/AuthContext';

export const NavBar = () => {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isBrandMenuOpen, setIsBrandMenuOpen] = useState(false);
  const { openMobileSideBar } = useUIStore();
  const [isGarageOpen, setIsGarageOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { user, logout } = useAuth();

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
    { name: 'Shop', href: '/shop' },
    // { name: 'Demos', href: '#' },
    { name: 'Shop by brand', href: '#' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Elements', href: '/elements' },
  ];

  return (
    <header
      className={cn(
        "w-full flex flex-col items-center sticky top-0 z-[110] transition-all duration-300",
        isSticky ? "shadow-2xl lg:translate-y-[-40px]" : ""
      )}
    >
      {/* Top Bar - High Fidelity Desktop */}
      <div className="hidden lg:block bg-[#05111b] text-white/90 text-[11px] py-2 border-b border-white/5 w-full">
        <div className="px-6 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-accent" />
              <span className="font-bold">Call us between 8 AM - 10 PM / <strong className="text-white">6668 5555</strong></span>
            </div>
            <Link
              href="#"
              onMouseEnter={closeAllMenus}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-accent" />
              <span className="font-bold underline underline-offset-4 decoration-accent/30">Live Chat / Chat with an Expert</span>
            </Link>
            <a
              href="/Catalogue.pdf"
              download
              className="flex items-center gap-2 hover:text-white transition-colors border-l border-white/10 pl-8 ml-2"
            >
              <FileDown className="w-3.5 h-3.5 text-accent" />
              <span className="font-bold">Download Catalogue</span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 border-r border-white/10 pr-6 mr-2">
              <span
                onMouseEnter={closeAllMenus}
                className="cursor-pointer hover:text-white flex items-center gap-1 font-bold italic"
              >
                $ USD <ChevronDown size={10} />
              </span>
              <span
                onMouseEnter={closeAllMenus}
                className="cursor-pointer hover:text-white flex items-center gap-1 font-bold italic"
              >
                En <ChevronDown size={10} />
              </span>
            </div>

            <div className="relative group">
              <button
                onClick={() => setIsGarageOpen(!isGarageOpen)}
                onMouseEnter={closeAllMenus}
                className="flex items-center gap-2 bg-white/10 hover:bg-accent hover:text-dark-blue px-4 py-1.5 rounded-lg transition-all font-black uppercase text-[10px] tracking-widest"
              >
                <Settings size={14} className={isGarageOpen ? 'animate-spin' : ''} />
                <span>My Garage</span>
                <ChevronDown size={12} className={isGarageOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>
              <MyGarageDropdown isOpen={isGarageOpen} onClose={() => setIsGarageOpen(false)} />
            </div>

            {user ? (
              <div className="flex items-center gap-4">
                {(user.role === 'Admin' || user.role === 'Super Admin') && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-accent hover:text-dark-blue transition-all"
                  >
                    <LayoutGrid size={14} />
                    <span>Admin Panel</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-1.5 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onMouseEnter={closeAllMenus}
                className="flex items-center gap-2 bg-accent text-dark-blue px-4 py-1.5 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-white transition-colors shadow-lg shadow-accent/20"
              >
                <User size={14} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Bar - Consolidated Single Row as per Image */}
      <div className={cn(
        "w-full py-5 border-b border-white/5 shadow-sm hidden lg:block transition-colors duration-300",
        isSticky ? "bg-dark-blue/95 backdrop-blur-md" : "bg-dark-blue"
      )}>
        <div className="container mx-auto px-4 flex items-center justify-between gap-8 text-white">
          {/* Logo Section */}
          <Link
            href="/"
            onMouseEnter={closeAllMenus}
            className="flex items-center"
          >
            <img src="/logo.png" alt="MOBEX" className="h-18 w-28 object-contain" />
          </Link>

          {/* Navigation & Categories Group */}
          <div className="flex items-center gap-10 flex-1">
            {/* All Categories Trigger */}
            <div
              onMouseEnter={() => {
                closeAllMenus();
                setIsMegaMenuOpen(true);
              }}
              className="flex items-center gap-3 bg-accent text-dark-blue px-6 py-2.5 rounded-md cursor-pointer font-black uppercase text-xs hover:bg-white transition-all shadow-sm"
            >
              <Menu className="w-4 h-4" size={18} strokeWidth={3} />
              <span className="underline underline-offset-4 decoration-dark-blue/30">All categories</span>
            </div>

            {/* Nav Links */}
            <nav className="flex items-center gap-8 font-black text-[13px] uppercase tracking-wide">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => {
                    if (link.name === 'Shop by brand') {
                      setIsMegaMenuOpen(false);
                      setIsBrandMenuOpen(true);
                    } else {
                      closeAllMenus();
                    }
                  }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "transition-colors hover:text-accent",
                      pathname === link.href ? "text-accent" : "text-white"
                    )}
                  >
                    {link.name}
                    <span className={cn(
                      "absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300",
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-6 shrink-0">
            <div className="flex items-center gap-5 border-r border-white/10 pr-6">
              <Search className="w-5 h-5 text-white/50 hover:text-accent cursor-pointer transition-colors" />
              <RotateCw className="w-5 h-5 text-white/50 hover:text-accent cursor-pointer transition-colors" />
              <div className="relative group cursor-pointer">
                <Heart className="w-5 h-5 text-white/50 hover:text-accent transition-colors" />
                <span className="absolute -top-2 -right-2 bg-accent text-dark-blue w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center">0</span>
              </div>
            </div>

            <Link href="/cart" className="flex items-center gap-3 relative group text-white">
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-white group-hover:text-accent transition-colors" />
                <span className="absolute -top-2 -right-2 bg-accent text-dark-blue rounded-full w-4 h-4 text-[9px] flex items-center justify-center font-black shadow-md">0</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[9px] font-black uppercase tracking-wider opacity-60">My Cart</span>
                <span className="text-[13px] font-black text-accent">$0.00</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Bar - 100% SAME AS REFERENCE IMAGE */}
      <div className="lg:hidden w-full max-w-full overflow-hidden bg-[#004b7c] text-white flex flex-col shadow-2xl">
        {/* Top Row: Logo, Cart, Menu */}
        <div className="flex items-center justify-between px-4 pt-5 pb-3">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="MOBEX" className="h-12 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-5">
            <div className="relative">
              <ShoppingCart className="w-8 h-8 text-white" strokeWidth={1.5} />
              <span className="absolute -top-1 -right-2 bg-[#ea1d22] text-black rounded-full w-[22px] h-[22px] text-[12px] flex items-center justify-center font-black shadow-lg">0</span>
            </div>
            <button onClick={() => openMobileSideBar('menu')}>
              <Menu size={34} className="text-white" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Search Bar Row - High Fidelity */}
        <div className="px-4 pb-6">
          <div className="bg-white rounded-xl flex items-center h-[54px] px-5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden">
            <Search className="text-[#ea1d22] w-6 h-6 mr-3 shrink-0" strokeWidth={3} />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-1 bg-transparent border-none outline-none text-gray-800 font-medium placeholder:text-gray-400 text-[16px]"
            />
            <Filter className="text-[#ea1d22] w-6 h-6 ml-2 shrink-0" strokeWidth={2.5} />
          </div>
        </div>

        {/* Premium Categories Section with Smooth Scroll */}
        {pathname !== '/shop' && (
          <div className="bg-gradient-to-b from-[#004b7c] to-[#015a91] pb-10 pt-4 border-t border-white/5 relative">
            <div className="w-full overflow-x-auto no-scrollbar flex items-start gap-4 px-4 snap-x snap-mandatory scroll-smooth touch-pan-x">
              {[
                { name: 'Electrics', img: 'https://enovathemes.com/mobex/wp-content/uploads/Electrics.webp' },
                { name: 'Engine', img: 'https://enovathemes.com/mobex/wp-content/uploads/Engine.webp' },
                { name: 'Filters', img: 'https://enovathemes.com/mobex/wp-content/uploads/Air-conditioning.webp' },
                { name: 'Interior', img: 'https://enovathemes.com/mobex/wp-content/uploads/Interior.webp' },
                { name: 'Fluids', img: 'https://enovathemes.com/mobex/wp-content/uploads/Oils-and-fluids.webp' },
                { name: 'Brakes', img: 'https://enovathemes.com/mobex/wp-content/uploads/Brakes.webp' },
                { name: 'Body Parts', img: 'https://enovathemes.com/mobex/wp-content/uploads/Body.webp' },
              ].map((cat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 shrink-0 snap-start min-w-[100px]"
                >
                  <div className="w-[100px] h-[100px] rounded-full bg-white/10 flex items-center justify-center p-3 border border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group/cat active:scale-95 transition-all duration-300">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-contain z-10 drop-shadow-2xl transition-transform duration-500 group-hover/cat:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  </div>
                  <span className="text-white text-[12px] font-black uppercase tracking-wider font-sans text-center whitespace-nowrap leading-none">
                    {cat.name}
                  </span>
                </div>
              ))}
              <div className="w-10 shrink-0 h-1" />
            </div>
          </div>
        )}
      </div>

      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      <BrandMegaMenu isOpen={isBrandMenuOpen} onClose={() => setIsBrandMenuOpen(false)} />
      <MobileSideBar
        navLinks={navLinks}
      />
    </header>
  );
};
