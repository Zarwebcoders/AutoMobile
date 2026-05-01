"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  Truck, 
  Clock, 
  ChevronRight, 
  Target, 
  Eye, 
  Award,
  ArrowRight
} from 'lucide-react';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { label: 'Years in Industry', value: '15+', icon: Clock },
    { label: 'Global Partners', value: '250+', icon: Users },
    { label: 'Products Available', value: '130k+', icon: ShieldCheck },
    { label: 'Happy Customers', value: '500k+', icon: Award },
  ];

  const values = [
    {
      title: "Quality First",
      desc: "We only source genuine parts from certified manufacturers to ensure your ride's performance and safety.",
      icon: ShieldCheck,
      color: "text-red-500"
    },
    {
      title: "Fast Delivery",
      desc: "Our optimized logistics network ensures your parts arrive when you need them most.",
      icon: Truck,
      color: "text-blue-500"
    },
    {
      title: "Expert Support",
      desc: "Our team of 2-wheeler experts is available 24/7 to help you find the perfect match for your bike.",
      icon: Users,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-dark-blue">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/about-hero.png" 
            alt="About Baladex Global" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-blue/80 via-dark-blue/50 to-white" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-black uppercase tracking-[0.4em] text-xs md:text-sm mb-6 block"
          >
            Riding Excellence Since 2009
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase font-oswald leading-none mb-8"
          >
            WE ARE <span className="text-accent">BALADEX GLOBAL</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
          >
            The UK's leading independent supplier of premium motorcycle parts and accessories, dedicated to keeping you on two wheels.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center group hover:border-accent transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <stat.icon size={32} />
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-dark-blue mb-2 font-oswald italic">{stat.value}</h3>
                <p className="text-xs md:text-sm font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-accent font-black uppercase tracking-widest text-xs">Our Journey</span>
                <h2 className="text-4xl md:text-6xl font-black text-dark-blue leading-none tracking-tighter uppercase font-oswald italic">
                  Built on Passion <br /> and Reliability
                </h2>
              </div>
              <div className="prose max-w-none text-gray-500 space-y-6 font-medium leading-relaxed">
                <p>Founded in 2009, Baladex Global started with a simple mission: to provide bikers and 2-wheeler enthusiasts with the highest quality parts at fair prices. What began as a small local workshop has grown into a nationwide network of distribution centers specializing in performance and reliability.</p>
                <p>We understand that a motorcycle is more than just a machine; it's an extension of your freedom, your passion, and your lifestyle. That's why we never compromise on the quality of our stock, from high-performance engines to essential safety gear.</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-dark-blue">
                    <Target className="text-accent" />
                    <span className="font-black uppercase text-sm italic font-oswald">Our Mission</span>
                  </div>
                  <p className="text-xs text-gray-400 font-bold leading-relaxed">To be the most trusted source for 2-wheeler performance and parts in the UK.</p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-dark-blue">
                    <Eye className="text-accent" />
                    <span className="font-black uppercase text-sm italic font-oswald">Our Vision</span>
                  </div>
                  <p className="text-xs text-gray-400 font-bold leading-relaxed">Pioneering the future of motorcycle parts distribution with precision technology.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl">
                <img 
                  src="/images/about-bike.png" 
                  alt="Premium Performance Motorcycle" 
                  className="w-full h-auto"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl z-0" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-dark-blue/5 rounded-full blur-3xl z-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-dark-blue uppercase font-oswald italic tracking-tight">Our Core Values</h2>
            <p className="text-gray-500 font-medium">The principles that guide every decision we make at Baladex Global.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 md:p-12 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group"
              >
                <div className={cn("w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500", val.color.replace('text-', 'bg-').replace('-500', '-50'))}>
                  <val.icon className={val.color} size={32} />
                </div>
                <h4 className="text-xl font-black text-dark-blue uppercase mb-4 font-oswald italic">{val.title}</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-dark-blue rounded-[3rem] md:rounded-[5rem] p-12 md:p-24 text-center space-y-8 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('/images/about-cta.png')] bg-cover bg-center opacity-30" />
             <div className="relative z-10 space-y-4">
                <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter font-oswald leading-none">
                  Ready to upgrade <br /> your <span className="text-accent">Experience?</span>
                </h2>
                <p className="text-white/60 text-lg max-w-xl mx-auto font-medium">
                  Browse our extensive catalogue of 130,000+ parts today.
                </p>
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                   <Link 
                     href="/shop"
                     className="h-16 px-12 bg-accent text-dark-blue rounded-2xl font-black uppercase text-sm flex items-center gap-3 hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl"
                   >
                     Browse Shop <ArrowRight size={20} />
                   </Link>
                   <Link 
                     href="/contact"
                     className="h-16 px-12 bg-white/10 text-white rounded-2xl font-black uppercase text-sm flex items-center gap-3 hover:bg-white hover:text-dark-blue transition-all transform hover:-translate-y-1 border border-white/20"
                   >
                     Contact Us
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
