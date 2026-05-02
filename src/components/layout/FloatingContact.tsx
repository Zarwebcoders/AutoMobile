"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

export const FloatingContact = () => {
  return (
    <div className="fixed bottom-24 lg:bottom-10 right-4 lg:right-10 z-[9999] flex flex-col gap-3 lg:gap-4 items-center">
      {/* Call Button (Red) */}
      <motion.a
        href="tel:+919737442444"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 lg:w-14 lg:h-14 bg-[#FF3B30] text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-600/30 group relative"
        title="Call Us"
      >
        <Phone size={20} className="lg:hidden" />
        <Phone size={24} className="hidden lg:block" />
        <span className="absolute right-full mr-4 bg-dark-blue text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl hidden lg:block">
          Call Now
        </span>
      </motion.a>

      {/* WhatsApp Button (Green) */}
      <motion.a
        href="https://wa.me/919737442444"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 lg:w-14 lg:h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-600/30 group relative"
        title="WhatsApp Us"
      >
        <MessageCircle size={20} className="lg:hidden" />
        <MessageCircle size={24} className="hidden lg:block" />
        <span className="absolute right-full mr-4 bg-dark-blue text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl hidden lg:block">
          WhatsApp
        </span>
      </motion.a>
    </div>
  );
};
