"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Calendar, Tag, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ContentHub = () => {
  return (
    <div className="space-y-0">
      {/* Blue Repair Section */}
      <section className="bg-dark-blue py-16 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-6 lg:space-y-8 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-black leading-tight">Car repairs have <br /> never been so easy</h2>
              <p className="text-white/60 text-sm font-medium leading-relaxed max-w-xs mx-auto lg:mx-0">
                Say no to complicated instructions and confusing diagrams. Use the practical and easy car repair tutorials.
              </p>
              <Button size="lg" className="bg-white text-dark-blue hover:bg-gray-100 font-black uppercase text-xs h-14 px-10 rounded-xl shadow-xl">
                Read more <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="lg:col-span-8">
               {/* Mobile horizontal scroll / Desktop flex */}
               <div className="flex overflow-x-auto lg:overflow-visible gap-6 pb-4 lg:pb-0 no-scrollbar snap-x snap-mandatory">
                  {[
                    { title: 'Fuel temperature sensor: function and failure symptoms', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=400' },
                    { title: 'Radial vs Cross Ply Tyres: What\'s The Difference?', img: 'https://images.unsplash.com/photo-1486006396193-471a2abc9302?q=80&w=400' },
                    { title: 'How to change parking brake cable on MERCEDES W201', img: 'https://images.unsplash.com/photo-1486262715619-67b85eb19ea3?q=80&w=400' }
                  ].map((item, i) => (
                    <div key={i} className="min-w-[280px] md:min-w-[340px] flex-1 group cursor-pointer space-y-4 snap-center shrink-0">
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                        <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-current" />
                          </div>
                        </div>
                      </div>
                      <h4 className="text-sm font-bold leading-tight group-hover:text-accent transition-colors line-clamp-2">{item.title}</h4>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Informed Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-dark-blue">Stay Informed @Mobex World</h3>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Latest offers, promos, product releases and industry news</p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {/* Subscribe Card - Visible only on Desktop as per design */}
            <div className="hidden lg:flex bg-[#ea1d22] rounded-[2.5rem] p-10 flex-col justify-between shadow-xl">
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-dark-blue">Get Exclusive Savings</h4>
                <p className="text-xs text-dark-blue/70 font-bold uppercase tracking-tighter">Join over half a million tools lovers</p>
              </div>
              <div className="space-y-3 mt-10">
                <input type="text" placeholder="First Name" className="w-full h-12 rounded-xl border-none px-5 text-sm font-bold shadow-inner" />
                <input type="email" placeholder="Email address" className="w-full h-12 rounded-xl border-none px-5 text-sm font-bold shadow-inner" />
                <Button className="w-full h-14 bg-dark-blue text-white hover:bg-black font-black uppercase text-xs rounded-xl shadow-lg mt-2">
                  Subscribe <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-dark-blue/60 font-bold mt-10 leading-tight">
                By signing up you agree to receive emails from MOBEX®
              </p>
            </div>

            {/* News Cards */}
            {[
              { date: '02 OCT', cat: 'News', title: 'The number of new cars sold over 20 years', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400' },
              { date: '02 OCT', cat: 'Usefull', title: 'Warning lights indicating activation of various systems', img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400' },
              { date: '02 OCT', cat: 'Premium', title: 'What to know about changing the engine oil and oil filters', img: 'https://images.unsplash.com/photo-1605341258814-22b069695028?q=80&w=400' },
              { date: '02 OCT', cat: 'News', title: 'Auto maintenance tips for long distance travel', img: 'https://images.unsplash.com/photo-1487754180451-c456f719c141?q=80&w=400' }
            ].map((news, i) => (
              <Link key={i} href="/blog" className="w-full flex">
                <motion.div whileHover={{ y: -10 }} className="flex flex-col group cursor-pointer shadow-sm rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-gray-100 h-full bg-white w-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={news.img} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#EA580C] text-white p-1.5 md:p-2.5 rounded-lg md:rounded-2xl flex flex-col items-center justify-center min-w-[35px] md:min-w-[55px] shadow-lg">
                      <span className="text-[10px] md:text-sm font-black leading-none">{news.date.split(' ')[0]}</span>
                      <span className="text-[7px] md:text-[9px] font-black uppercase tracking-tighter">{news.date.split(' ')[1]}</span>
                    </div>
                  </div>
                  <div className="p-4 md:p-8 flex flex-col gap-2 md:gap-4 flex-1">
                    <span className="text-[8px] md:text-[10px] font-black uppercase text-gray-400 tracking-widest">{news.cat}</span>
                    <h4 className="text-xs md:text-lg font-black text-dark-blue leading-tight line-clamp-2 uppercase h-8 md:h-14">
                      {news.title}
                    </h4>
                    <div className="mt-auto hidden md:block">
                      <span className="text-xs font-black text-primary uppercase underline underline-offset-4 flex items-center gap-2 group-hover:text-accent transition-all duration-300">
                        Read more <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="md:hidden mt-auto">
                       <span className="text-[10px] font-bold text-accent uppercase flex items-center gap-1">
                         Read <ArrowRight size={10} />
                       </span>
                    </div>
                  </div>
                </motion.div>
              </Link>

            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
