"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from '@/components/shared/SocialIcons';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function ContactPage() {
  const contactInfo = [
    {
      title: "Call Us",
      value: "97374 42444",
      desc: "Available 8 AM - 10 PM",
      icon: Phone,
      color: "bg-red-50 text-red-500"
    },
    {
      title: "Email Us",
      value: "info@baladexglobal.com",
      desc: "24/7 Online Support",
      icon: Mail,
      color: "bg-blue-50 text-blue-500"
    },
    {
      title: "Visit Us",
      value: "Main Street, London",
      desc: "United Kingdom",
      icon: MapPin,
      color: "bg-green-50 text-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-dark-blue pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/contact-hero.png')] bg-cover bg-center opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-accent font-black uppercase tracking-[0.3em] text-xs mb-6"
          >
            <span className="w-8 h-[2px] bg-accent" />
            Connect with us
            <span className="w-8 h-[2px] bg-accent" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase font-oswald leading-none mb-6"
          >
            CONTACT <span className="text-accent">US</span>
          </motion.h1>
          <div className="flex items-center justify-center gap-3 text-white/40 text-sm font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Contact</span>
          </div>
        </div>
      </section>

      <section className="py-24 -mt-12 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {contactInfo.map((info, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500"
              >
                <div className={`w-20 h-20 rounded-3xl ${info.color} flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                  <info.icon size={36} />
                </div>
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{info.title}</h3>
                <p className="text-2xl font-black text-dark-blue mb-2 italic font-oswald">{info.value}</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{info.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-[4rem] p-8 md:p-16 space-y-10"
            >
              <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-black text-dark-blue uppercase italic font-oswald leading-none tracking-tight">
                  Send us a <span className="text-accent">Message</span>
                </h2>
                <p className="text-gray-500 font-medium text-sm">We&apos;ll get back to you within 24 hours.</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-dark-blue tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full h-14 bg-white rounded-2xl px-6 outline-none border border-transparent focus:border-accent transition-all font-bold text-sm text-dark-blue shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-dark-blue tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full h-14 bg-white rounded-2xl px-6 outline-none border border-transparent focus:border-accent transition-all font-bold text-sm text-dark-blue shadow-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-dark-blue tracking-widest ml-1">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Product Inquiry"
                    className="w-full h-14 bg-white rounded-2xl px-6 outline-none border border-transparent focus:border-accent transition-all font-bold text-sm text-dark-blue shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-dark-blue tracking-widest ml-1">Message</label>
                  <textarea 
                    placeholder="How can we help you?"
                    className="w-full bg-white rounded-2xl p-6 h-40 outline-none border border-transparent focus:border-accent transition-all font-bold text-sm text-dark-blue shadow-sm resize-none"
                  />
                </div>
                <button className="h-16 px-12 bg-dark-blue text-white rounded-2xl font-black uppercase text-xs flex items-center gap-3 hover:bg-accent hover:text-dark-blue transition-all transform active:scale-95 shadow-xl w-fit">
                  Send Message <Send size={18} />
                </button>
              </form>
            </motion.div>

            {/* Map & Other Info */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-6">
                 <h3 className="text-2xl font-black text-dark-blue font-oswald uppercase italic">Our Location</h3>
                 <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer">
                    <img 
                      src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000" 
                      alt="Map Location" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-accent/10 pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                       <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-dark-blue shadow-2xl animate-bounce">
                          <MapPin size={28} />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                   <h4 className="font-black text-dark-blue uppercase text-xs tracking-widest flex items-center gap-2">
                      <Clock size={16} className="text-accent" /> Working Hours
                   </h4>
                   <ul className="space-y-2 text-sm font-bold text-gray-500">
                      <li className="flex justify-between"><span>Mon - Fri</span> <span className="text-dark-blue">8:00 - 22:00</span></li>
                      <li className="flex justify-between"><span>Saturday</span> <span className="text-dark-blue">9:00 - 18:00</span></li>
                      <li className="flex justify-between"><span>Sunday</span> <span className="text-accent">Closed</span></li>
                   </ul>
                </div>
                <div className="space-y-4">
                   <h4 className="font-black text-dark-blue uppercase text-xs tracking-widest flex items-center gap-2">
                      <MessageSquare size={16} className="text-accent" /> Social Media
                   </h4>
                   <div className="flex gap-4">
                      {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                        <button key={idx} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1">
                          <Icon size={18} />
                        </button>
                      ))}
                   </div>
                </div>
              </div>

              <div className="bg-accent/5 p-10 rounded-[3rem] border border-accent/10 space-y-4">
                <h4 className="text-lg font-black text-dark-blue font-oswald uppercase italic">Corporate Inquiries</h4>
                <p className="text-xs font-bold text-gray-400 leading-relaxed uppercase tracking-wider">For partnership opportunities, distribution requests, or corporate sales, please reach out directly to our head office.</p>
                <div className="text-sm font-black text-dark-blue underline decoration-accent/30 underline-offset-4">info@baladexglobal.com</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
