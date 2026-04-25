"use client";

import React from 'react';
import {
  Truck, Recycle, MapPin,
  HelpCircle, Wrench, Wallet,
  Zap, Users, MessageSquare, Lightbulb,
  ChevronRight
} from 'lucide-react';

export const IconBoxes = () => {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 space-y-16 md:space-y-24">

        {/* Style 1: Small Feature Boxes */}
        <div className="space-y-8 md:space-y-12">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-2xl md:text-4xl font-black font-oswald text-dark-blue uppercase">Icon boxes</h3>
              <div className="h-1 w-16 bg-accent mt-3 md:mt-4" />
            </div>
            <div className="md:hidden flex items-center gap-2 text-[10px] font-black text-gray-400 animate-pulse uppercase tracking-widest">
                Scroll <ChevronRight size={12} />
            </div>
          </div>

          <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-6 pb-6 lg:pb-0 no-scrollbar snap-x snap-mandatory">
            {[
              { icon: Truck, title: 'In-Store Pickup', text: 'Buy your parts online and pick them up in-store in 30 minutes.' },
              { icon: Truck, title: 'Free Shipping Over $25', text: 'Receive free standard shipping on orders over $25 (US only).' },
              { icon: Wallet, title: 'Speed Perks', text: 'Spend $30, get $5 or spend $100, get $20 off your next purchase.' },
              { icon: Wrench, title: 'Free In-Store Services', text: 'Free battery installation, check engine light scanning.' },
              { icon: Recycle, title: 'Oil & Battery Recycling', text: 'Recycle motor oil and gear oil at no charge. Gift card for returning.' },
              { icon: MapPin, title: 'Store Locator', text: 'Use our store locator to find the closest store near you.' },
            ].map((box, i) => (
              <div key={i} className="min-w-[300px] lg:min-w-0 flex gap-6 p-8 bg-[#F8F9FA] rounded-[32px] group hover:bg-white hover:shadow-2xl transition-all duration-500 shadow-sm snap-center shrink-0">
                <div className="shrink-0 w-14 h-14 bg-white rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-dark-blue transition-colors shadow-sm">
                  <box.icon size={28} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-black font-oswald text-dark-blue uppercase tracking-tight italic">{box.title}</h4>
                  <p className="text-gray-400 text-[13px] leading-relaxed line-clamp-2">{box.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Style 2: Big Card Boxes */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 pb-6 lg:pb-0 no-scrollbar snap-x snap-mandatory">
          {[
            { icon: Users, title: 'Hard-Working Community', text: 'The diversity across our businesses makes us stronger.', color: 'bg-blue-600' },
            { icon: Users, title: 'Customers Come First', text: 'Every decision we make we always prioritizes our customers’ needs.', color: 'bg-sky-500' },
            { icon: MessageSquare, title: 'We Do What We Say', text: 'We’re a company built on ethics, integrity, inclusivity.', color: 'bg-indigo-600' },
            { icon: Lightbulb, title: 'Pursuit of Innovation', text: 'We are committed to making things better — we never stop.', color: 'bg-blue-900' },
          ].map((card, i) => (
            <div key={i} className="min-w-[280px] lg:min-w-0 bg-white border border-gray-100 rounded-[40px] p-10 text-center space-y-8 flex flex-col items-center hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 snap-center shrink-0 shadow-sm bg-gradient-to-b from-white to-slate-50">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl ${card.color}`}>
                <card.icon size={36} />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-black font-oswald text-dark-blue uppercase leading-tight italic">{card.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{card.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
