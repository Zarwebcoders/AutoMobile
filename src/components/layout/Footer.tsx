"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Send,
  MapPin,
  Phone,
  MessageSquare,
  ChevronUp,
  ChevronRight,
} from 'lucide-react';
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from '@/components/shared/SocialIcons';
import { cn } from '@/lib/utils';
 
export const Footer = ({ variant = 'main' }: { variant?: 'main' | 'product' }) => {
  const [openSection, setOpenSection] = useState<string>('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Desktop Footer (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Variant Main: Logo & Welcome Info */}
          {variant === 'main' ? (
            <div className="lg:col-span-4 space-y-8">
              <Link href="/" className="inline-flex items-center">
                <img src="/logo.png" alt="MOBEX" className="h-16 w-auto object-contain" />
              </Link>
              <div className="space-y-6">
                <p className="text-xl font-black text-white leading-tight max-w-[320px]">
                  With over 250+ branches nationwide and 130,000 parts available Mobex Auto Parts is the USA&apos;s number 1 supplier!
                </p>
                <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-[340px]">
                  We offer service parts at very competitive prices with Free Delivery across the whole of the USA.
                </p>
                <Link 
                  href="/shop" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-accent text-accent rounded-xl text-xs font-black uppercase tracking-widest hover:bg-accent hover:text-dark-blue transition-all"
                >
                  Discover more <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            /* Variant Product: Logo, Social & Newsletter */
            <div className="lg:col-span-3 space-y-8">
              <Link href="/" className="inline-flex items-center">
                <img src="/logo.png" alt="MOBEX" className="h-12 w-auto object-contain" />
              </Link>

              <div className="flex gap-4">
                {[
                  { name: 'Facebook',  Icon: Facebook  },
                  { name: 'Instagram', Icon: Instagram },
                  { name: 'Linkedin',  Icon: Linkedin  },
                  { name: 'Twitter',   Icon: Twitter   },
                  { name: 'Youtube',   Icon: Youtube   },
                ].map(({ name, Icon }) => (
                  <Link key={name} href="#" className="w-5 h-5 text-gray-500 hover:text-accent transition-colors" title={name}>
                    <Icon className="w-full h-full" strokeWidth={2} />
                  </Link>
                ))}
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-400 leading-relaxed max-w-[260px]">
                  What&apos;s inside: new arrivals, exclusive sales, truck news and more!
                </p>
                <div className="relative group max-w-[280px]">
                  <input 
                    type="email" 
                    placeholder="Email address"
                    className="w-full bg-[#1A1A1A] border-none rounded-xl h-14 pl-6 pr-14 text-sm font-medium focus:ring-2 focus:ring-accent transition-all outline-none"
                  />
                  <button className="absolute right-2 top-2 w-10 h-10 bg-dark-blue text-white rounded-lg flex items-center justify-center hover:bg-accent hover:text-dark-blue transition-all">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Menus Grid */}
          <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", variant === 'main' ? "lg:col-span-4" : "lg:col-span-5")}>
            {/* Account */}
            <div className="space-y-6">
              <h3 className="text-base font-black uppercase tracking-tight text-white mb-6">Account</h3>
              <ul className="space-y-3">
                {['Dashboard', 'Orders', 'Wishlist', 'My garage', 'Addresses'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-[13px] font-bold text-gray-500 hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Catalog */}
            <div className="space-y-6">
              <h3 className="text-base font-black uppercase tracking-tight text-white mb-6">Catalog</h3>
              <ul className="space-y-3">
                {['Shop by parts', 'Shop by brands', 'Shop by make', 'Promotions', 'Sitemap'].map((item) => (
                  <li key={item}>
                    <Link href="/shop" className="text-[13px] font-bold text-gray-500 hover:text-white transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div className="space-y-6">
              <h3 className="text-base font-black uppercase tracking-tight text-white mb-6">Help</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Features', href: '/elements' },
                  { name: 'FAQ', href: '/faq' },
                  { name: 'About us', href: '/about' },
                  { name: 'Career', href: '/career' },
                  { name: 'Contact us', href: '/contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-[13px] font-bold text-gray-500 hover:text-white transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className={cn("space-y-8", variant === 'main' ? "lg:col-span-4" : "lg:col-span-4")}>
             <div className="space-y-8">
                <div className="flex items-center opacity-20 grayscale select-none">
                  <img src="/logo.png" alt="MOBEX" className="h-20 w-auto object-contain" />
                </div>

                <div className="space-y-8">
                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 shrink-0 bg-[#1A1A1A] rounded-2xl flex items-center justify-center">
                      <MapPin size={24} className="text-accent group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-[14px] leading-snug font-medium text-gray-400">
                      <span className="block text-gray-200 font-bold mb-1">Our Location</span>
                      7031 N 35th Ave, Phoenix
                      <span className="block italic opacity-60">Arkansas United States</span>
                    </div>
                  </div>

                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 shrink-0 bg-[#1A1A1A] rounded-2xl flex items-center justify-center">
                      <Phone size={24} className="text-accent group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-[14px] leading-snug font-medium text-gray-400">
                      <span className="block text-gray-200 font-bold mb-1">Call us between 8 AM - 10 PM</span>
                      <span className="block font-black text-2xl text-accent tracking-tighter">6668 5555 8464</span>
                    </div>
                  </div>

                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 shrink-0 bg-[#1A1A1A] rounded-2xl flex items-center justify-center">
                      <MessageSquare size={24} className="text-accent group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h6 className="text-[16px] font-black text-white">Live chat</h6>
                      <p className="text-[13px] font-bold text-gray-500">Chat with an Expert</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Mobile-Only High Fidelity Static Footer (As per Image) */}
        <div className="md:hidden space-y-12">
          {/* Top Intro */}
          <div className="text-center space-y-4">
             <h4 className="text-[15px] font-black leading-tight px-4">
               With over 250+ branches nationwide and 130,000 parts available Mobex Auto Parts is the USA&apos;s number 1 supplier!
             </h4>
             <p className="text-[13px] font-medium text-gray-500 leading-relaxed px-4">
               We offer service parts at very competitive prices with Free Delivery across the whole of the USA.
             </p>
          </div>

          <div className="h-px bg-gray-800/50 mx-4" />

          {/* Menus Grid */}
          <div className="grid grid-cols-2 gap-8 px-6">
            <div className="space-y-5">
              <h3 className="text-lg font-black text-white">Account</h3>
              <ul className="space-y-2.5">
                {['Dashboard', 'Orders', 'Wishlist', 'My garage', 'Addresses'].map(item => (
                  <li key={item}><Link href="#" className="text-[14px] font-bold text-gray-400 hover:text-white">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <h3 className="text-lg font-black text-white">Catalog</h3>
              <ul className="space-y-2.5">
                {['Shop by parts', 'Shop by brands', 'Shop by make', 'Promotions', 'Sitemap'].map(item => (
                  <li key={item}><Link href="#" className="text-[14px] font-bold text-gray-400 hover:text-white">{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="h-px bg-gray-800/50 mx-4" />

          {/* Brand Info Block */}
          <div className="flex flex-col items-center space-y-8 px-4">
            <Link href="/" className="inline-flex items-center">
              <img src="/logo.png" alt="MOBEX" className="h-16 w-auto object-contain" />
            </Link>

            <div className="space-y-10 w-full max-w-xs mx-auto">
               <div className="flex items-start gap-4 justify-center text-center flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-dark-blue/20 flex items-center justify-center">
                    <MapPin size={24} className="text-accent" />
                  </div>
                  <div className="text-[14px] font-black text-white leading-tight">
                    7031 N 35th Ave, Phoenix <br />
                    <span className="text-gray-500 font-bold">Arkansas United States</span>
                  </div>
               </div>

               <div className="flex items-start gap-4 justify-center text-center flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-dark-blue/20 flex items-center justify-center">
                    <Phone size={24} className="text-accent" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[13px] font-bold text-gray-400">Call us between 8 AM - 10 PM</p>
                    <p className="text-2xl font-black text-accent tracking-tighter leading-none">6668 5555 8464</p>
                  </div>
               </div>

               <div className="flex items-start gap-4 justify-center text-center flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-dark-blue/20 flex items-center justify-center">
                    <MessageSquare size={24} className="text-accent" />
                  </div>
                  <div className="space-y-0.5">
                    <h6 className="text-[16px] font-black text-white">Live chat</h6>
                    <p className="text-[13px] font-bold text-gray-500">Chat with an Expert</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="h-px bg-gray-800/50 mx-4" />

          {/* Payment and Social Row */}
          <div className="flex flex-col items-center gap-8 py-4">
             <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 grayscale opacity-80 px-4">
                <img src="https://enovathemes.com/mobex/wp-content/plugins/enovathemes-addons/assets/img/payment/apple-pay.svg" className="h-4" alt="applepay" />
                <img src="https://enovathemes.com/mobex/wp-content/plugins/enovathemes-addons/assets/img/payment/google-pay.svg" className="h-4" alt="gpay" />
                <img src="https://enovathemes.com/mobex/wp-content/plugins/enovathemes-addons/assets/img/payment/mastercard.svg" className="h-4" alt="mastercard" />
                <img src="https://enovathemes.com/mobex/wp-content/plugins/enovathemes-addons/assets/img/payment/paypal.svg" className="h-4" alt="paypal" />
                <img src="https://enovathemes.com/mobex/wp-content/plugins/enovathemes-addons/assets/img/payment/paypal-credit.svg" className="h-4" alt="paypalcredit" />
                <img src="https://enovathemes.com/mobex/wp-content/plugins/enovathemes-addons/assets/img/payment/visa.svg" className="h-4" alt="visa" />
                <img src="https://enovathemes.com/mobex/wp-content/plugins/enovathemes-addons/assets/img/payment/american-express.svg" className="h-4" alt="amex" />
             </div>

             <div className="flex gap-8">
                {[Facebook, Instagram, Linkedin, Twitter, Youtube].map((Icon, idx) => (
                  <Link key={idx} href="#" className="w-5 h-5 text-gray-500 hover:text-white transition-colors">
                    <Icon className="w-full h-full" />
                  </Link>
                ))}
             </div>
          </div>

          {/* Mobile Copyright and Stacked Links */}
          <div className="bg-[#0A0A0A] -mx-4 py-8 px-4 text-center space-y-3">
             <p className="text-[13px] font-bold text-gray-500 mb-6">
               Copyright © 2026 <span className="text-white">Mobex</span>. All Rights Reserved
             </p>
             <div className="flex flex-col gap-4">
               {['Terms of Use', 'Privacy Policy', 'Interest-Based Ads', 'Accessibility'].map(item => (
                 <Link key={item} href="#" className="text-[13px] font-bold text-gray-500">{item}</Link>
               ))}
             </div>
          </div>
        </div>

        {/* Desktop Only Bottom Sections */}
        <div className="hidden md:block">
          {variant === 'main' && (
            <div className="border-t border-gray-800 py-20">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-9 gap-x-8 gap-y-12">
                {[
                  {
                    title: 'Air conditioning',
                    links: ['Condenser', 'Ac compressor', 'Heat exchanger', 'Receiver drier', 'Heater control valve']
                  },
                  {
                    title: 'Damping',
                    links: ['Coil spring', 'Leaf spring', 'Shock absorber', 'Springs', 'Hydraulic oil']
                  },
                  {
                    title: 'Brakes',
                    links: ['Brake discs', 'Brake pad wear sensor', 'Brake pads', 'Drum brake', 'Brake drum']
                  },
                  {
                    title: 'Body',
                    links: ['Bumper', 'Doors', 'Fuel tank', 'Wing mirror', 'Fender']
                  },
                  {
                    title: 'Interior',
                    links: ['Boot struts', 'Car mats', 'Gear shift knobs', 'Window crank', 'Cylinder lock']
                  },
                  {
                    title: 'Electrics',
                    links: ['Alternator', 'Battery', 'Relay starter', 'Starter', 'Headlight bulb']
                  },
                  {
                    title: 'Engine',
                    links: ['Engine electrics', 'Knock sensor', 'Lambda sensor', 'Oil cooler', 'Drive chain']
                  },
                  {
                    title: 'Steering',
                    links: ['Headlights', 'Lighting controls', 'Rear lights', 'Turn signal light', 'Indicator bulb']
                  },
                  {
                    title: 'Popular Brands',
                    links: ['VICMA', 'CASTROL', 'RAVENOL', 'ALANKO', 'TRICSAN', 'ABAKUS', 'BLIC', 'BOSCH', 'DAYCO', 'LEOPLAST', 'STARK', 'DT', 'RIDEX', 'PETEK']
                  }
                ].map((cat) => (
                  <div key={cat.title} className="space-y-6">
                    <h4 className="text-[15px] font-black uppercase tracking-tight text-white underline decoration-accent/30 decoration-2 underline-offset-8">{cat.title}</h4>
                    <ul className="space-y-2.5">
                      {cat.links.map((link) => (
                        <li key={link}>
                          <Link href={`/shop?query=${encodeURIComponent(link)}`} className="text-[13px] font-bold text-gray-500 hover:text-white transition-all hover:translate-x-1 inline-block">{link}</Link>
                        </li>
                      ))}
                      <li className="pt-2">
                        <Link href="/shop" className="text-[11px] font-black uppercase tracking-tight text-accent hover:text-white transition-colors">View all &gt;</Link>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-800 py-8 flex flex-wrap justify-between items-center gap-6">
             <div className="flex items-center gap-8">
                <div className="flex items-center gap-4 text-[13px] font-bold text-gray-500">
                   <span className="text-white">Languages</span>
                   <div className="flex gap-4 grayscale opacity-50">
                      <button className="hover:text-white flex items-center gap-1"><img src="https://flagcdn.com/us.svg" className="w-4 h-3 object-cover rounded-px" alt="en" /> English</button>
                      <button className="hover:text-white flex items-center gap-1"><img src="https://flagcdn.com/de.svg" className="w-4 h-3 object-cover rounded-px" alt="de" /> Deutsch</button>
                      <button className="hover:text-white flex items-center gap-1"><img src="https://flagcdn.com/fr.svg" className="w-4 h-3 object-cover rounded-px" alt="fr" /> Français</button>
                   </div>
                </div>
             </div>

             <div className="flex items-center gap-10">
                <div className="flex items-center gap-6">
                   <span className="text-[13px] font-bold text-gray-500">Payment options</span>
                   <div className="flex items-center gap-4 grayscale opacity-60">
                      <img src="https://enovathemes.com/mobex/wp-content/plugins/enovathemes-addons/assets/img/payment/visa.svg" className="h-4" alt="visa" />
                      <img src="https://enovathemes.com/mobex/wp-content/plugins/enovathemes-addons/assets/img/payment/mastercard.svg" className="h-4" alt="mastercard" />
                      <img src="https://enovathemes.com/mobex/wp-content/plugins/enovathemes-addons/assets/img/payment/paypal.svg" className="h-4" alt="paypal" />
                      <img src="https://enovathemes.com/mobex/wp-content/plugins/enovathemes-addons/assets/img/payment/american-express.svg" className="h-4" alt="amex" />
                   </div>
                </div>

                {variant === 'main' && (
                  <div className="flex gap-4 border-l border-gray-800 pl-10">
                    {[
                      { name: 'Facebook',  Icon: Facebook  },
                      { name: 'Instagram', Icon: Instagram },
                      { name: 'Linkedin',  Icon: Linkedin  },
                      { name: 'Twitter',   Icon: Twitter   },
                      { name: 'Youtube',   Icon: Youtube   },
                    ].map(({ name, Icon }) => (
                      <Link key={name} href="#" className="w-4 h-4 text-gray-500 hover:text-white transition-colors" title={name}>
                        <Icon className="w-full h-full" />
                      </Link>
                    ))}
                  </div>
                )}
             </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-wrap justify-between items-center gap-4">
             <p className="text-[13px] font-bold text-gray-500">
               Copyright © 2026 <span className="text-white">Mobex</span>. All Rights Reserved
             </p>
             <div className="flex gap-6">
                {['Terms of Use', 'Privacy Policy', 'Interest-Based Ads', 'Accessibility'].map((item) => (
                  <Link key={item} href="#" className="text-[13px] font-bold text-gray-500 hover:text-white transition-colors">{item}</Link>
                ))}
             </div>
          </div>
        </div>

      </div>

      {/* Scroll to Top */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-accent text-dark-blue rounded-xl flex items-center justify-center shadow-2xl hover:bg-white transition-all transform hover:-translate-y-2 z-50"
      >
        <ChevronUp size={24} />
      </button>
    </footer>
  );
};
